import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { ChText, ChInput, ChTouchableOpacity, THEME } from '../../../toolkit/components';
import { useSelector } from 'react-redux';
import * as verifyService from '../../../services/verify';

export default (AcceptEnter = ({ navigation }) => {
  const [code, setCode] = React.useState('');
  const phone = useSelector((state) => state.setUserInfo.phone);
  const verifyToken = useSelector((state) => state.setUserInfo.verifyToken);

  const validateCode = () => {
    verifyService
      .confirmVerifyCode(code, verifyToken)
      .then((response) => {
        console.log(response);
        if (response['is_success']) {
          navigation.navigate('Home');
        } else {
          if (response['allow_count_attempts'] > 0) {
            setCode('');
            Alert.alert(
              'Ошибка!',
              `Код введен неверно.\nОсталось попыток: ${response['allow_count_attempts']}`,
            );
          } else {
            setCode('');
            navigation.navigate('SignIn');
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const phoneHandler = () => {
    setCode('');
    navigation.navigate('SignIn');
  };

  const passwordHandler = () => {
    setCode('');
    navigation.navigate('PasswordEnter');
  };

  return (
    <View style={styles.center}>
      <ChText style={{ ...styles.textInput, fontSize: 18 }}>Введите код подтверждения</ChText>
      <ChInput
        style={styles.codeInput}
        placeholder="6666"
        keyboardType="number-pad"
        onChangeText={(text) => setCode(text)}
        onSubmitEditing={validateCode}
        maxLength={4}
        value={code}
      />
      <ChText style={styles.text}>Код отправлен на номер: {phone}</ChText>
      <ChText style={styles.text}>Таймер</ChText>
      <ChTouchableOpacity style={styles.opacity} onPress={phoneHandler}>
        <ChText style={styles.opacityColor}>Изменить номер</ChText>
      </ChTouchableOpacity>
      <ChTouchableOpacity style={styles.opacity} onPress={passwordHandler}>
        <ChText style={styles.opacityColor}>Ввести пароль</ChText>
      </ChTouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: THEME.AUTH_MAIN_BACKGROUND_COLOR,
  },
  codeInput: {
    marginLeft: '10%',
    width: '70%',
    marginBottom: 4,
  },
  textInput: {
    marginLeft: '10%',
    marginBottom: 50,
    top: 45,
  },
  text: {
    marginLeft: '10%',
    marginBottom: 4,
  },
  opacity: {
    marginLeft: '10%',
    marginBottom: 4,
  },
  opacityColor: {
    color: THEME.AUTH_BUTTON_COLOR,
  },
});
