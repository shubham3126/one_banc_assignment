import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const CustomButton = props => {
  const {onPress, title} = props;
  return (
    <TouchableOpacity onPress={onPress} style={Styles.btnContainer}>
      <Text style={Styles.titleTxt}>{title}</Text>
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  btnContainer: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  titleTxt: {
    fontSize: 16,
    color: 'black',
  },
});
export default CustomButton;
