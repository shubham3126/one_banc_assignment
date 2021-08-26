import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Card = props => {
  const {amount, children, transactionType, type} = props;
  return (
    <View style={styles.card}>
      <View style={styles.amountAndType}>
        <Text style={styles.amountTxt}>{`₹ ${amount}`}</Text>
        <Text>
          {type === 1 ? (
            <Entypo name={'check'} color="green" />
          ) : (
            <MaterialCommunityIcons name={'eye-outline'} />
          )}
          {transactionType}
        </Text>
      </View>
      <View style={styles.childrenAndRight}>
        {children}
        <Entypo name={'chevron-thin-right'} size={20} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 120,
    width: 250,
    backgroundColor: 'white',
    elevation: 5,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  amountAndType: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amountTxt: {
    fontSize: 28,
  },
  typeTxt: {
    fontSize: 18,
  },
  childrenAndRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default Card;
