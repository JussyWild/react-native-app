import React from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ChText, ChTouchableOpacity, ChInput, THEME } from '../../../toolkit/components';
import { setPassword } from '../../../redux/actions/userInfo';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default (PasswordEnter = ({ navigation }) => {
  const [showPass, setShowPass] = React.useState(true);
  const [press, setPress] = React.useState(false);
  const [isShowError, setIsShowError] = React.useState(false);
  const dispatch = useDispatch();
  const password = useSelector((state) => state.setUserInfo.password);

  const visiblePass = () => {
    if (press === false) {
      setShowPass(false);
      setPress(true);
    } else {
      setShowPass(true);
      setPress(false);
    }
  };

  const validatePass = () => {
    if (password !== '7777') {
      Alert.alert(
        'Ошибка!',
        'Пароль введён неверно',
        [
          {
            text: 'OK',
            onPress: () => {
              setIsShowError(true);
            },
          },
        ],
        { cancelable: false },
      );
      return;
    }
    setIsShowError(false);
    dispatch(setPassword(password));
    navigation.navigate('Home');
  };

  const opacityHandler = () => {
    dispatch(setPassword(''));
    setIsShowError(false);
    navigation.navigate('SignIn');
  };

  const recoveryHandler = () => {
    dispatch(setPassword(''));
    setIsShowError(false);
    navigation.navigate('Recovery');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ChText style={styles.text}>Введите пароль</ChText>
        <View style={styles.view}>
          <ChInput
            secureTextEntry={showPass}
            style={{
              ...styles.input,
              borderColor: isShowError
                ? THEME.AUTH_ERROR_INPUT_BORDER_COLOR
                : THEME.AUTH_INPUT_BORDER_COLOR,
              backgroundColor: isShowError
                ? THEME.AUTH_ERROR_INPUT_BACKGROUND_COLOR
                : THEME.AUTH_MAIN_BACKGROUND_COLOR,
            }}
            onChangeText={(text) => dispatch(setPassword(text))}
          />
          <ChTouchableOpacity
            activeOpacity={0.7}
            style={{
              ...styles.btnEye,
              backgroundColor: isShowError
                ? THEME.AUTH_ERROR_INPUT_BACKGROUND_COLOR
                : THEME.AUTH_MAIN_BACKGROUND_COLOR,
            }}
            onPress={visiblePass}>
            <Ionicons
              name={Platform.OS === 'android' ? 'md-eye' : 'ios-eye'}
              style={styles.iconEye}
            />
          </ChTouchableOpacity>
        </View>
        <ChTouchableOpacity onPress={recoveryHandler}>
          <ChText
            style={{
              fontSize: 18,
              marginLeft: '27%',
              marginBottom: 30,
              color: 'gray',
            }}>
            Восстановление пароля
          </ChText>
        </ChTouchableOpacity>
        <ChTouchableOpacity style={styles.button} onPress={validatePass}>
          <ChText style={{ fontSize: 16 }}>Войти</ChText>
        </ChTouchableOpacity>
        <ChTouchableOpacity style={styles.opacity} onPress={opacityHandler}>
          <ChText style={{ color: THEME.AUTH_BUTTON_COLOR }}>Назад</ChText>
        </ChTouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.AUTH_MAIN_BACKGROUND_COLOR,
    alignItems: 'center',
  },
  text: {
    top: 45,
    fontSize: 18,
    marginRight: '47%',
    marginBottom: 50,
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    width: '80%',
    marginLeft: '5%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: 45,
    marginBottom: 15,
    backgroundColor: THEME.AUTH_BUTTON_COLOR,
    borderRadius: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: THEME.AUTH_BUTTON_COLOR,
  },
  opacity: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnEye: {
    backgroundColor: THEME.AUTH_MAIN_BACKGROUND_COLOR,
    right: 35,
  },
  iconEye: {
    fontSize: 25,
  },
});
