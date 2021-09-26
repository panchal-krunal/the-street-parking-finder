import React, {useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import Toast from 'react-native-simple-toast';
import {SafeAreaView} from 'react-navigation';
import {Button} from '../components';
import {default as colors, default as Colors} from '../helpers/colors';
import fonts from '../helpers/fonts';
import Images from '../helpers/images';
import I from '../helpers/translations';

const styles = StyleSheet.create({
  timerText: {
    fontSize: responsiveFontSize(2),
    fontFamily: fonts.Bold,
    textAlign: 'center',
    alignSelf: 'center',
  },
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.red,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 500,
  },
  title: {
    fontFamily: Fonts.SemiBold,
    fontSize: responsiveFontSize(4),
    color: Colors.white,
    marginTop: 50,
  },
  modal: {
    backgroundColor: colors.white,
    width: '90%',
    borderRadius: 30,
    alignSelf: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 50,
  },
  mobileImage: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  text: {
    fontSize: responsiveFontSize(2),
    fontFamily: fonts.Regular,
    textAlign: 'center',
    width: '80%',
    alignSelf: 'center',
  },
  otpInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    marginVertical: 50,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.darkGrey,
    color: Colors.black,
    padding: 5,
    textAlign: 'center',
    fontSize: responsiveFontSize(2),
  },
  submitButton: {
    marginTop: 50,
  },
  resendButton: {
    backgroundColor: colors.black,
    width: 150,
    marginTop: 20,
  },
});

const VerifyOTP = props => {
  const {navigation} = props;

  const otpRef1 = useRef();
  const otpRef2 = useRef();
  const otpRef3 = useRef();
  const otpRef4 = useRef();

  const [otp1, setOTP1] = useState('');
  const [otp2, setOTP2] = useState('');
  const [otp3, setOTP3] = useState('');
  const [otp4, setOTP4] = useState('');

  const [showLoader, setShowLoader] = useState(false);
  const [timerValue, setTimerValue] = useState('05:00');

  let timerMins = 5,
    timerSec = 0,
    intervalId;

  useEffect(() => {
    intervalId = setInterval(startTimer, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const startTimer = () => {
    if (timerMins === 0) clearInterval(intervalId);
    if (timerSec === 0) {
      timerSec = 59;
      timerMins--;
    }
    timerSec--;

    let timerValue = `${
      timerMins.toString().length == 1 ? `0${timerMins}` : timerMins
    }:${timerSec.toString().length == 1 ? `0${timerSec}` : timerSec}`;

    setTimerValue(timerValue);
  };

  const renderVerifyOTPContainer = () => {
    return (
      <View style={styles.modal}>
        <Image
          source={Images.mobile}
          resizeMode="contain"
          style={styles.mobileImage}
        />
        <Text style={styles.text}>{I.t('text_mobile_verification')}</Text>
        {renderOTPInputs()}
      </View>
    );
  };

  const renderOTPInputs = () => {
    return (
      <>
        <View style={styles.otpInputContainer}>
          <TextInput
            style={styles.otpInput}
            maxLength={1}
            selectionColor={colors.red}
            returnKeyType="next"
            keyboardType="number-pad"
            ref={otpRef1}
            value={otp1}
            onChangeText={v => {
              setOTP1(v);
              otpRef2?.current?.focus();
            }}
            onSubmitEditing={() => otpRef2?.current?.focus()}
          />
          <TextInput
            style={styles.otpInput}
            maxLength={1}
            selectionColor={colors.red}
            returnKeyType="next"
            keyboardType="number-pad"
            ref={otpRef2}
            onSubmitEditing={() => otpRef3?.current?.focus()}
            value={otp2}
            onChangeText={v => {
              setOTP2(v);
              otpRef3?.current?.focus();
            }}
          />
          <TextInput
            style={styles.otpInput}
            maxLength={1}
            selectionColor={colors.red}
            returnKeyType="next"
            keyboardType="number-pad"
            ref={otpRef3}
            onSubmitEditing={() => otpRef4?.current?.focus()}
            value={otp3}
            onChangeText={v => {
              setOTP3(v);
              otpRef4?.current?.focus();
            }}
          />
          <TextInput
            style={styles.otpInput}
            maxLength={1}
            selectionColor={colors.red}
            keyboardType="number-pad"
            ref={otpRef4}
            returnKeyType="done"
            onSubmitEditing={() => onVerifyButtonPress()}
            value={otp4}
            onChangeText={v => setOTP4(v)}
          />
        </View>
        <Text style={styles.timerText}>{timerValue}</Text>
        {renderSubmitButton()}
      </>
    );
  };

  const onVerifyButtonPress = () => {
    if (!otp1 || !otp2 || !otp3 || !otp4) {
      Toast.show('Please enter valid OTP');
      return;
    }
    navigation.navigate('Profile');
  };

  const renderSubmitButton = () => {
    return (
      <Button
        buttonText={I.t('label_verify')}
        buttonStyle={styles.submitButton}
        onPress={onVerifyButtonPress}
        showLoader={showLoader}
      />
    );
  };

  const renderResendButton = () => {
    return (
      <Button
        buttonText={I.t('label_resend_otp')}
        buttonStyle={styles.resendButton}
      />
    );
  };

  return (
    <SafeAreaView forceInset={{bottom: 'never'}} style={styles.safeArea}>
      <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image
            source={Images.backgroundSphere}
            style={styles.backgroundImage}
          />
          <Text style={styles.title}>{I.t('label_verify_otp')}</Text>
          {renderVerifyOTPContainer()}
          {renderResendButton()}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default VerifyOTP;
