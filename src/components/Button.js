import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import colors from '../helpers/colors';
import fonts from '../helpers/fonts';

const styles = StyleSheet.create({
  button: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.red,
    marginVertical: 20,
    height: 50,
  },
  buttonText: {
    color: colors.white,
    fontFamily: fonts.SemiBold,
    fontSize: responsiveFontSize(2),
  },
});

const Button = ({
  buttonText,
  buttonStyle,
  showLoader,
  buttonTextStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{...styles.button, ...buttonStyle}}
      onPress={onPress}>
      {showLoader && <ActivityIndicator size="small" color={colors.white} />}
      {!showLoader && (
        <Text style={{...styles.buttonText, ...buttonTextStyle}}>
          {buttonText}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
