import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { ChText, ChInput, ChTouchableOpacity, THEME } from '../../../toolkit/components';

export default (AcceptRecovery = ({ route, navigation }) => {
  const [code, setCode] = React.useState('');
  const { phone } = route.params;

  const validateCode = () => {
    console.log(code);
    if (code === '7777') {
      setCode('');
      navigation.navigate('Home');
    } else {
      setCode('');
      Alert.alert('Ошибка!', 'Код введен не верно');
    }
  };

  const opacityHandler = () => {
    setCode('');
    navigation.navigate('Recovery');
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
      />
      <ChText style={styles.text}>Код отправлен на номер: {phone}</ChText>
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
