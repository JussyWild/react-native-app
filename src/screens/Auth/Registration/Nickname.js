import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { ChText, ChInput, ChTouchableOpacity, THEME } from '../../../toolkit/components';
import { useDispatch, useSelector } from 'react-redux';
import { setNickname } from '../../../redux/actions/userInfo';

export default (Nickname = ({ navigation }) => {
  const [isShowError, setIsShowError] = React.useState(false);
  const dispatch = useDispatch();
  const nickname = useSelector((state) => state.setUserInfo.nickname);

  const buttonHandler = () => {
    if (nickname === '') {
      Alert.alert(
        'Ошибка!',
        'Никнейм не может быть пустым',
        [
          {
            text: 'OK',
            onPress: () => {
              dispatch(setNickname(''));
            },
          },
        ],
        { cancelable: false },
      );
      return;
    }
    if (nickname === 'ttt') {
      setIsShowError(true);
      return;
    }
    setIsShowError(false);
    navigation.navigate('PasswordRegistration');
  };

  const opacityHandler = () => {
    dispatch(setNickname(''));
    setIsShowError(false);
    navigation.navigate('DateEnter');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ChText style={styles.text}>Введите никнейм</ChText>
        <ChInput
          style={{
            ...styles.input,
            borderColor: isShowError
              ? THEME.AUTH_ERROR_INPUT_BORDER_COLOR
              : THEME.AUTH_INPUT_BORDER_COLOR,
            backgroundColor: isShowError
              ? THEME.AUTH_ERROR_INPUT_BACKGROUND_COLOR
              : THEME.AUTH_MAIN_BACKGROUND_COLOR,
          }}
          onChangeText={(text) => dispatch(setNickname(text))}
          value={nickname}
        />
        <ChText
          style={{
            ...styles.textError,
            color: isShowError ? THEME.AUTH_ERROR_TEXT_COLOR : THEME.AUTH_MAIN_BACKGROUND_COLOR,
          }}>
          Введённый никнейм занят
        </ChText>
        <ChTouchableOpacity style={styles.button} onPress={buttonHandler}>
          <ChText style={{ fontSize: 16 }}>Далее</ChText>
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
    marginRight: '43%',
    marginBottom: 50,
  },
  input: {
    width: '80%',
    marginBottom: 4,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: 45,
    marginBottom: 15,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: THEME.AUTH_BUTTON_COLOR,
    backgroundColor: THEME.AUTH_BUTTON_COLOR,
  },
  opacity: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textError: {
    marginRight: '37%',
    marginBottom: 25,
  },
});
