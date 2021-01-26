import React from 'react';
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ServiceEnter from './ServiceEnter';
import { ChText, ChPhone, ChEmail, ChTouchableOpacity, THEME } from '../../../toolkit/components';
import { setPhone, setEmail, setVerifyToken } from '../../../redux/actions/userInfo';
import * as verifyService from '../../../services/verify';

export default (SignIn = ({ navigation }) => {
  const [isEmailAuth, setIsEmailAuth] = React.useState(false);
  const [isShowError, setIsShowError] = React.useState(false);
  const dispatch = useDispatch();
  const email = useSelector((state) => state.setUserInfo.email);
  const phone = useSelector((state) => state.setUserInfo.phone);

  const validateEmail = (emailAddress) => {
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(emailAddress) === false) {
      return false;
    }
    return true;
  };

  const signInButtonHandler = () => {
    if (validatePhone(phone) || validateEmail(email)) {
      setIsShowError(false);
      if (isEmailAuth) {
        if (email === 't@t.com') {
          navigation.navigate('PasswordEnter');
          return;
        }
        Alert.alert(
          'Проверьте почту',
          'Мы выслали код на вашу электронную почту! Посмотрите письмо, чтобы ввести код.',
          [
            {
              text: 'OK',
              onPress: () => {
                dispatch(setPhone(''));
              },
            },
          ],
          { cancelable: false },
        );
      } else {
        if (phone === '+7 (916) 270-58-39') {
          navigation.navigate('AcceptEnter');
          return;
        }
      }

      verifyService
        .createVerifyToken(phone)
        .then((response) => {
          dispatch(setVerifyToken(response.token));
        })
        .catch((error) => console.log(error));

      navigation.navigate('AcceptRegistration', {
        isEmailAuth,
      });
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ChText style={{ margin: '10%' }}>
          Авторизируйтесь, чтобы оставлять лайки, комментарии, общаться с другими и пользоваться
          всеми функциями
        </ChText>
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
              value={email}
              onChangeText={(text) => dispatch(setEmail(text))}
            />
            <ChText
              style={{
                ...styles.textError,
                color: isShowError ? THEME.AUTH_ERROR_TEXT_COLOR : THEME.AUTH_MAIN_BACKGROUND_COLOR,
              }}>
              Введите корректный адрес эл. почты
            </ChText>
            <ChTouchableOpacity style={styles.button} onPress={signInButtonHandler}>
              <ChText style={{ fontSize: 16 }}>Войти</ChText>
            </ChTouchableOpacity>
            <ChTouchableOpacity
              style={styles.opacity}
              onPress={() => {
                dispatch(setEmail(''));
                setIsEmailAuth(false);
              }}>
              <ChText style={styles.textOpacity}>С помощью телефона</ChText>
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
              onChangeText={(text) => dispatch(setPhone(text))}
              value={phone}
            />
            <ChText
              style={{
                ...styles.textError,
                color: isShowError ? THEME.AUTH_ERROR_TEXT_COLOR : THEME.AUTH_MAIN_BACKGROUND_COLOR,
              }}>
              Введите корректный номер телефона
            </ChText>
            <ChTouchableOpacity style={styles.button} onPress={signInButtonHandler}>
              <ChText style={{ fontSize: 16 }}>Войти</ChText>
            </ChTouchableOpacity>
            <ChTouchableOpacity
              style={styles.opacity}
              onPress={() => {
                dispatch(setPhone(''));
                setIsEmailAuth(true);
              }}>
              <ChText style={styles.textOpacity}>С помощью эл. почты</ChText>
            </ChTouchableOpacity>
          </>
        )}
        <ServiceEnter style={{ marginRight: '40%' }} />
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
    marginRight: '40%',
    marginBottom: 4,
  },
  textEmail: {
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
    marginBottom: 55,
  },
  textOpacity: {
    color: THEME.AUTH_BUTTON_COLOR,
  },
  textError: {
    marginRight: '19%',
    marginBottom: 20,
  },
});
