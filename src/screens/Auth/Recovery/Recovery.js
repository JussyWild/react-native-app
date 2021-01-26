import React from 'react';
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { ChText, ChPhone, ChEmail, ChTouchableOpacity, THEME } from '../../../toolkit/components';

export default (Recovery = ({ navigation }) => {
  const [isEmailAuth, setIsEmailAuth] = React.useState(false);
  const [isShowError, setIsShowError] = React.useState(false);
  const [emailAddress, setEmailAddress] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');

  const validateEmail = (emailAddress) => {
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(emailAddress) === false) {
      return false;
    }
    return true;
  };

  const buttonHandler = () => {
    if (validatePhone(phoneNumber) || validateEmail(emailAddress)) {
      setIsShowError(false);
      if (isEmailAuth) {
        Alert.alert(
          'Восстановление пароля',
          'Мы выслали пароль на вашу электронную почту! Посмотрите письмо, чтобы восстановить пароль.',
          [
            {
              text: 'OK',
              onPress: () => {
                setIsShowError(false);
                setEmailAddress('');
                setPhoneNumber('');
                navigation.navigate('SignIn');
              },
            },
          ],
          { cancelable: false },
        );
      } else {
        console.log({ phone: phoneNumber.replace(/\D+/g, '') });
        navigation.navigate('AcceptRecovery', { phone: phoneNumber });
        return;
      }
    } else {
      setIsShowError(true);
    }
  };

  const validatePhone = (phoneNumber) => {
    if (phoneNumber.length < 18) {
      return false;
    }
    return true;
  };

  const opacityHandler = () => {
    setIsShowError(false);
    setEmailAddress('');
    setPhoneNumber('');
    navigation.navigate('PasswordEnter');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {isEmailAuth ? (
          <>
            <ChText style={styles.textEmail}>Введите почту</ChText>
            <ChEmail
              style={{
                ...styles.input,
                borderColor: isShowError
                  ? THEME.AUTH_ERROR_INPUT_BORDER_COLOR
                  : THEME.AUTH_INPUT_BORDER_COLOR,
                backgroundColor: isShowError
                  ? THEME.AUTH_ERROR_INPUT_BACKGROUND_COLOR
                  : THEME.AUTH_MAIN_BACKGROUND_COLOR,
              }}
              onChangeText={(text) => setEmailAddress(text)}
            />
            <ChText
              style={{
                ...styles.textError,
                color: isShowError ? THEME.AUTH_ERROR_TEXT_COLOR : THEME.AUTH_MAIN_BACKGROUND_COLOR,
              }}>
              Введите корректный адрес эл. почты
            </ChText>
            <ChTouchableOpacity style={styles.button} onPress={RecoveryButtonHandler}>
              <ChText style={{ fontSize: 16 }}>Далее</ChText>
            </ChTouchableOpacity>
            <ChTouchableOpacity
              style={styles.opacity}
              onPress={() => {
                setIsEmailAuth(false);
                setEmailAddress('');
              }}>
              <ChText style={styles.textOpacity}>Использовать номер телефона</ChText>
            </ChTouchableOpacity>
          </>
        ) : (
          <>
            <ChText style={styles.textPhone}>Введите номер телефона</ChText>
            <ChPhone
              style={{
                ...styles.input,
                borderColor: isShowError
                  ? THEME.AUTH_ERROR_INPUT_BORDER_COLOR
                  : THEME.AUTH_INPUT_BORDER_COLOR,
                backgroundColor: isShowError
                  ? THEME.AUTH_ERROR_INPUT_BACKGROUND_COLOR
                  : THEME.AUTH_MAIN_BACKGROUND_COLOR,
              }}
              onChangeText={setPhoneNumber}
              value={phoneNumber}
            />
            <ChText
              style={{
                ...styles.textError,
                color: isShowError ? THEME.AUTH_ERROR_TEXT_COLOR : THEME.AUTH_MAIN_BACKGROUND_COLOR,
              }}>
              Введите корректный номер телефона
            </ChText>
            <ChTouchableOpacity style={styles.button} onPress={buttonHandler}>
              <ChText style={{ fontSize: 16 }}>Далее</ChText>
            </ChTouchableOpacity>
            <ChTouchableOpacity
              style={styles.opacity}
              onPress={() => {
                setPhoneNumber('');
                setIsEmailAuth(true);
              }}>
              <ChText style={styles.textOpacity}>Использовать эл. почту</ChText>
            </ChTouchableOpacity>
          </>
        )}
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
  textPhone: {
    marginTop: 50,
    marginRight: '40%',
    marginBottom: 4,
  },
  textEmail: {
    marginTop: 50,
    marginRight: '57%',
    marginBottom: 4,
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
    backgroundColor: THEME.AUTH_BUTTON_COLOR,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: THEME.AUTH_BUTTON_COLOR,
  },
  opacity: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  textOpacity: {
    color: THEME.AUTH_BUTTON_COLOR,
  },
  textError: {
    marginRight: '19%',
    marginBottom: 20,
  },
});
