import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-navigation';
import {useDispatch} from 'react-redux';
import {Button} from '../components';
import Colors from '../helpers/colors';
import data from '../helpers/countryCodes.json';
import Fonts from '../helpers/fonts';
import Images from '../helpers/images';
import I from '../helpers/translations';
import {sendOTP} from '../redux/actions/userAction';
import CountrySelectModal from './Modals/CountrySelectModal';
import DisclaimerModal from './Modals/DisclaimerModal';

const Signup = props => {
  const {navigation} = props;

  const dispatch = useDispatch();

  const [acceptDisclaimer, setAcceptDisclaimer] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [showModal, setShowModal] = useState(false);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('US +1');
  const [search, setSearch] = useState('');

  const styles = StyleSheet.create({
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
    logo: {
      width: 190,
      height: 179,
      alignSelf: 'center',
      borderRadius: 200,
    },
    title: {
      fontFamily: Fonts.SemiBold,
      fontSize: responsiveFontSize(4),
      color: Colors.white,
      marginBottom: 50,
    },
    signupContainer: {
      backgroundColor: Colors.white,
      borderRadius: 20,
      padding: 10,
      width: responsiveWidth(90),
      alignSelf: 'center',
      height: 500,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    signupBg: {
      width: '90%',
      alignSelf: 'center',
      height: 300,
    },
    mobileInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '90%',
      alignSelf: 'center',
      borderRadius: 5,
      borderWidth: 0.7,
      borderColor: Colors.black,
      height: 50,
      marginVertical: 20,
    },
    countryInput: {
      flex: 0.25,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.lightGrey,
      height: 48,
      borderRadius: 5,
    },
    countryInputText: {
      fontFamily: Fonts.Regular,
      fontSize: responsiveFontSize(2),
    },
    mobileInput: {
      flex: 0.75,
      padding: 10,
      height: 48,
      fontSize: responsiveFontSize(2),
      color: Colors.black,
    },
    disclaimerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '90%',
      alignSelf: 'center',
      marginTop: 20,
    },
    checkbox: {
      borderRadius: 5,
      width: 25,
      height: 25,
      borderColor: Colors.black,
      borderWidth: 0.7,
      justifyContent: 'center',
      alignItems: 'center',
    },
    disclaimerText: {
      marginLeft: 20,
      textDecorationLine: 'underline',
      color: Colors.red,
      fontSize: responsiveFontSize(1.7),
    },
  });

  const renderSignupContainer = () => {
    return (
      <View style={styles.signupContainer}>
        <Image
          source={Images.signupBackground}
          style={styles.signupBg}
          resizeMode="contain"
        />
        {renderMobileInput()}
        {renderDisclaimer()}
      </View>
    );
  };

  const renderMobileInput = () => {
    return (
      <View style={styles.mobileInputContainer}>
        <TouchableOpacity
          style={styles.countryInput}
          onPress={() => setShowCountryModal(!showCountryModal)}>
          <Text style={styles.countryInputText} numberOfLines={1}>
            {selectedCountry}
          </Text>
        </TouchableOpacity>
        <TextInput
          keyboardType="phone-pad"
          placeholder={I.t('label_enter_mobile_number')}
          style={styles.mobileInput}
          value={mobileNumber}
          maxLength={10}
          selectionColor={Colors.red}
          onChangeText={v => setMobileNumber(v)}
        />
      </View>
    );
  };

  const renderDisclaimer = () => {
    return (
      <View style={styles.disclaimerContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setAcceptDisclaimer(!acceptDisclaimer)}>
          {acceptDisclaimer && (
            <Icon
              name="check"
              color={Colors.red}
              size={responsiveFontSize(2)}
            />
          )}
        </TouchableOpacity>
        <Text
          style={styles.disclaimerText}
          onPress={() => setShowModal(!showModal)}>
          {I.t('label_accept_disclaimer')}
        </Text>
      </View>
    );
  };

  const renderSubmitButton = () => {
    return (
      <Button
        buttonText={I.t('label_submit')}
        // buttonText="Proceed"
        showLoader={showLoader}
        onPress={onSubmitPress}
      />
    );
  };

  const onSubmitPress = async () => {
    if (!mobileNumber || !countryCode) {
      Toast.show('Please enter valid mobile number');
      return;
    }
    if (!acceptDisclaimer) {
      Toast.show('Please accept the disclaimer');
      return;
    }
    let data = {
      mobileNumber,
    };
    setShowLoader(true);
    let response = await dispatch(sendOTP(data));
    setShowLoader(false);
    if (response?.data?.success) {
      Toast.show('OTP sent successfully');
      navigation.navigate('Language');
    } else {
      Toast.show(
        response?.data?.error || 'Internal server error, please try again',
      );
    }
  };

  const onItemSelect = (name, code, dialCode) => {
    setSelectedCountry(`${code} ${dialCode}`);
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
          <Text style={styles.title}>{I.t('label_signup')}</Text>
          {renderSignupContainer()}
          {renderSubmitButton()}
        </View>
      </KeyboardAwareScrollView>
      <DisclaimerModal
        showModal={showModal}
        closeModal={() => setShowModal(!showModal)}
      />
      <CountrySelectModal
        title={I.t('label_search_for_a_country')}
        items={data}
        showModal={showCountryModal}
        closeModal={() => setShowCountryModal(!showCountryModal)}
        onItemSelect={onItemSelect}
        type="SIGNUP"
        search={search}
        setSearch={setSearch}
      />
    </SafeAreaView>
  );
};
export default Signup;
