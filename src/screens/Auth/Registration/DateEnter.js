import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { ChText, ChTouchableOpacity, THEME } from '../../../toolkit/components';
import { setBirthDate } from '../../../redux/actions/userInfo';
import DatePicker from 'react-native-date-picker';

export default (DateEnter = ({ navigation }) => {
  const [date, setDate] = React.useState(new Date());
  const dispatch = useDispatch();

  const buttonHandler = () => {
    const month = date.getMonth() > 9 ? date.getMonth() : '0' + date.getMonth();
    const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
    dispatch(setBirthDate(`${date.getFullYear()}-${month}-${day}`));
    navigation.navigate('Nickname');
  };

  return (
    <View style={styles.container}>
      <ChText style={styles.text}>Введите дату своего рождения</ChText>
      <View style={styles.date}>
        <DatePicker date={date} mode="date" onDateChange={setDate} locale="ru" />
      </View>
      <ChTouchableOpacity style={styles.button} onPress={buttonHandler}>
        <ChText style={{ fontSize: 16 }}>Далее</ChText>
      </ChTouchableOpacity>
    </View>
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
    fontSize: 16,
    marginRight: '25%',
    marginBottom: 70,
  },
  date: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: THEME.AUTH_INPUT_BORDER_COLOR,
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
    marginTop: 50,
  },
});
