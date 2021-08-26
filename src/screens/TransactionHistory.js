import React, {useState, useEffect} from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import Card from '../utility/reusableComponents/Card';
import CustomButton from '../utility/reusableComponents/CustomButton';
import AppConstant from '../utility/appConstants/AppConstant';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getUrl} from '../utility/commonFunctions/CommonFunctions';

var lineDate = '';
const monthName = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const TransactionHistory = () => {
  const [data, setData] = useState({});

  const getTransactionData = async () => {
    const {TRANSACTION_HISTORY} = AppConstant.URLS;
    let paramObject = {
      userId: 1,
      recipientId: 2,
    };
    let url = getUrl(TRANSACTION_HISTORY, paramObject);
    try {
      let response = await fetch(url, {
        method: 'GET',
      });
      let jsonData = await response.json();
      setData(jsonData.transactions.reverse());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTransactionData();
  }, []);

  const getTime = (hours, minutes) => {
    let suffix = '';
    if (hours > 11) {
      suffix += 'PM';
    } else {
      suffix += 'AM';
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (hours > 12) {
      hours -= 12;
    } else if (hours === 0) {
      hours = 12;
    }
    let time = hours + ':' + minutes + ' ' + suffix;
    return time;
  };

  const dateTime = (showDate, hours, minutes) => {
    return (
      <Text style={styles.dateTimeTxt}>
        {`${showDate}  ${getTime(hours, minutes)}`}
      </Text>
    );
  };

  const changePreviousDate = showDateReceive => {
    lineDate = showDateReceive;
  };

  const dotLineContainer = showDate => {
    return (
      <View style={styles.lineDateContainer}>
        <View style={styles.dotLine} />
        <Text>{lineDate}</Text>
        <View style={styles.dotLine} />
        {changePreviousDate(showDate)}
      </View>
    );
  };

  const dotLineRender = (showDate, index) => {
    if (showDate !== lineDate && index) {
      return dotLineContainer(showDate);
    } else if (index === 0) {
      changePreviousDate(showDate);
    } else {
      return null;
    }
  };

  const renderItem = (item, index) => {
    const {amount, direction, startDate, type, id} = item;
    const {
      CONSTANT_MESSAGES: {
        YOU_PAID,
        YOU_REQUESTED,
        YOU_RECIEVED,
        REQUESTED_RECIEVED,
      },
      BTN_TITLE: {PAY, DECLINE, CANCEL},
    } = AppConstant;
    let date = new Date(startDate);
    let showDate = `${date.getDate()} ${
      monthName[date.getMonth()]
    } ${date.getFullYear()}`;
    return (
      <View>
        {index === data.length - 1 ? dotLineContainer(showDate) : null}
        {direction === 1 ? (
          <View style={styles.rightContainer}>
            <Card
              amount={amount}
              type={type}
              transactionType={type === 1 ? YOU_PAID : YOU_REQUESTED}>
              {type === 1 ? (
                <Text>{`Transaction ID\n${id}`}</Text>
              ) : (
                <CustomButton title={CANCEL} />
              )}
            </Card>
            {dateTime(showDate, date.getHours(), date.getMinutes())}
          </View>
        ) : (
          <View style={styles.leftCotainer}>
            <Card
              amount={amount}
              type={type}
              transactionType={type === 1 ? YOU_RECIEVED : REQUESTED_RECIEVED}>
              {type === 1 ? (
                <Text>{`Transaction ID\n${id}`}</Text>
              ) : (
                <View style={styles.payDeclineBtn}>
                  <CustomButton title={PAY} />
                  <CustomButton title={DECLINE} />
                </View>
              )}
            </Card>
            {dateTime(showDate, date.getHours(), date.getMinutes())}
          </View>
        )}
        {dotLineRender(showDate, index)}
      </View>
    );
  };

  const {NAME, CONTACT} = AppConstant.USER;
  return (
    <View style={styles.mainContainer}>
      <View style={styles.userContainer}>
        <MaterialIcons name={'keyboard-backspace'} size={30} />
        <View style={styles.userIcon}>
          <Text>{NAME[0]}</Text>
        </View>
        <Text>{`${NAME}\n+91 ${CONTACT}`}</Text>
      </View>
      <View style={styles.horizontalLine} />
      <FlatList
        data={data}
        inverted={-1}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => renderItem(item, index)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },
  userIcon: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  horizontalLine: {
    width: '100%',
    borderWidth: 1,
    marginBottom: 5,
  },
  lineDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dotLine: {
    borderWidth: 1,
    borderColor: 'black',
    flex: 1,
    borderStyle: 'dotted',
    borderRadius: 1,
  },
  rightContainer: {
    alignSelf: 'flex-end',
    flex: 1,
    marginRight: 20,
    marginVertical: 10,
  },
  leftCotainer: {
    alignSelf: 'flex-start',
    flex: 1,
    marginLeft: 20,
    marginVertical: 10,
  },
  dateTimeTxt: {
    textAlign: 'right',
  },
  payDeclineBtn: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default TransactionHistory;
