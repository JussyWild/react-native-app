import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View, Alert } from 'react-native';
import { ChText, ChInput, ChTouchableOpacity, THEME } from '../../../toolkit/components';
import * as verifyService from '../../../services/verify';

export default (AcceptRegistration = ({ route, navigation }) => {
  const [code, setCode] = React.useState('');
  const { isEmailAuth } = route.params;
  const destination = isEmailAuth
    ? `почту: ${useSelector((state) => state.setUserInfo.email)}`
    : `номер: ${useSelector((state) => state.setUserInfo.phone)}`;
  const verifyToken = useSelector((state) => state.setUserInfo.verifyToken);

  const validateCode = () => {
    verifyService
      .confirmVerifyCode(code, verifyToken)
      .then((response) => {
        console.log(response);
        if (response['is_success']) {
          navigation.navigate('DateEnter');
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

  const opacityHandler = () => {
    setCode('');
    navigation.navigate('SignIn');
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
      <ChText style={styles.text}>Код отправлен на {destination}</ChText>
      <ChText style={styles.text}>Таймер</ChText>
      <ChTouchableOpacity style={styles.opacity} onPress={opacityHandler}>
        <ChText style={{ color: THEME.AUTH_BUTTON_COLOR }}>Изменить номер</ChText>
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
  },
});
