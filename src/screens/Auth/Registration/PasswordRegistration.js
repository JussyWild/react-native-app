import React from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert,
} from 'react-native';
import { ChText, ChTouchableOpacity, ChInput, THEME } from '../../../toolkit/components';
import { useDispatch, useSelector } from 'react-redux';
import { setPassword } from '../../../redux/actions/userInfo';
import * as securityService from '../../../services/security';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default (PasswordRegistration = ({ navigation }) => {
  const [showPass, setShowPass] = React.useState(true);
  const [press, setPress] = React.useState(false);
  const [confirm, setConfirm] = React.useState('');
  const [isShowError, setIsShowError] = React.useState(false);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.setUserInfo);

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
    if (userInfo.password === '') {
      Alert.alert(
        'Ошибка!',
        'Пароль не может быть пустым',
        [
          {
            text: 'OK',
            onPress: () => {
              setConfirm('');
            },
          },
        ],
        { cancelable: false },
      );
      return;
    }
    if (userInfo.password !== confirm) {
      Alert.alert(
        'Ошибка!',
        'Пароли не совпадают',
        [
          {
            text: 'OK',
            onPress: () => {
              setConfirm('');
              setIsShowError(true);
            },
          },
        ],
        { cancelable: false },
      );
      return;
    }

    securityService
      .signUpUser(userInfo.nickname, userInfo.password, userInfo.birthDate, userInfo.verifyToken)
      .then((response) => {
        console.log(response);
        setConfirm('');
        navigation.navigate('Home');
      })
      .catch((error) => console.log(error));
  };

  const opacityHandler = () => {
    dispatch(setPassword(''));
    setConfirm('');
    navigation.navigate('Nickname');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ChText style={styles.text}>Придумайте пароль</ChText>
        <View style={styles.view}>
          <ChInput
            secureTextEntry={showPass}
            style={styles.input}
            onChangeText={(text) => dispatch(setPassword(text))}
            value={userInfo.password}
          />
          <ChTouchableOpacity activeOpacity={0.7} style={styles.btnEye} onPress={visiblePass}>
            <Ionicons
              name={Platform.OS === 'android' ? 'md-eye' : 'ios-eye'}
              style={styles.iconEye}
            />
          </ChTouchableOpacity>
        </View>
        <ChText style={{ fontSize: 14, marginRight: '41%', marginBottom: 3 }}>
          Введите пароль ещё раз
        </ChText>
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
            onChangeText={(text) => setConfirm(text)}
            value={confirm}
          />
          <ChTouchableOpacity
            activeOpacity={0.5}
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
        <ChTouchableOpacity style={styles.button} onPress={validatePass}>
          <ChText style={{ fontSize: 16 }}>Зарегистрироваться</ChText>
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
    marginRight: '39%',
    marginBottom: 50,
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
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
