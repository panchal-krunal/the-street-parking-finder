import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import colors from '../helpers/colors';
import fonts from '../helpers/fonts';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 10,

    elevation: 5,
  },
  radioButton: {
    borderRadius: 30,
    height: 30,
    width: 30,
    borderColor: colors.red,
    borderWidth: 1.5,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  text: {
    marginLeft: 10,
    fontFamily: fonts.Regular,
    fontSize: responsiveFontSize(2),
  },
});

const RadioButton = ({isSelected, text, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.radioButton}>
        <View
          style={[
            styles.inner,
            isSelected && {backgroundColor: colors.red, borderRadius: 20},
          ]}></View>
      </View>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default RadioButton;
