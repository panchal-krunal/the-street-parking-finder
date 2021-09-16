import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-navigation';
import {useSelector} from 'react-redux';
import {Button} from '../components';
import {default as colors, default as Colors} from '../helpers/colors';
import fonts from '../helpers/fonts';
import Images from '../helpers/images';
import I from '../helpers/translations';
import CountrySelectModal from './Modals/CountrySelectModal';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: 'flex-start',
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
    fontSize: responsiveFontSize(2),
    color: Colors.white,
    flex: 0.9,
    alignSelf: 'center',
    textAlign: 'center',
  },
  modal: {
    backgroundColor: colors.white,
    width: '90%',
    borderRadius: 10,
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
    marginTop: responsiveHeight(10),
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
  header: {
    flexDirection: 'row',
    height: 70,
    width: '100%',
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  backArrow: {
    width: 30,
  },
  inputContainer: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  label: {
    fontFamily: fonts.Regular,
    fontSize: responsiveFontSize(2),
    color: '#a7a7a7',
  },
  input: {
    width: '100%',
    alignSelf: 'center',
    padding: 10,
    paddingLeft: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
    height: 50,
    fontFamily: fonts.Regular,
    color: colors.black,
    fontSize: responsiveFontSize(2),
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
  },
});

const Profile = props => {
  const {navigation} = props;

  const state = useSelector(state => state);

  const insets = useSafeAreaInsets();

  const [showLoader, setShowLoader] = useState(false);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [showStateModal, setShowStateModal] = useState(false);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = () => {
    const {
      commonReducer: {countryList: country_list},
    } = state;
    let list = [];
    let i = 0;
    country_list &&
      country_list.length !== 0 &&
      country_list.forEach(c => {
        list.push({
          name: c.country,
          value: i,
        });
        i++;
      });
    setCountries(list);
  };

  const renderProfileImageContainer = () => {
    return (
      <View
        style={{
          width: 120,
          height: 120,
          borderRadius: 120,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.white,
          padding: 10,
          alignSelf: 'center',
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          position: 'absolute',
          zIndex: 1,
          top: -50,
        }}>
        <ImageBackground
          source={Images.profileOuter}
          resizeMode="contain"
          style={{
            width: 70,
            height: 70,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={Images.user}
            resizeMode="contain"
            style={{width: 40, height: 40}}
          />
        </ImageBackground>
        <Image
          source={Images.upload}
          resizeMode="contain"
          style={{
            width: 20,
            height: 20,
            position: 'absolute',
            right: 12,
            bottom: 30,
          }}
        />
      </View>
    );
  };

  const onSubmit = () => {
    if (!name || !mobile || !selectedCountry || !selectedState) {
      Toast.show('Please enter valid details');
      return;
    }
    navigation.navigate('VehicleInfo');
  };

  const renderProfileContainer = () => {
    return (
      <View style={styles.modal}>
        {renderProfileImageContainer()}
        <View style={[styles.inputContainer, {marginTop: 100}]}>
          <Text style={styles.label}>{I.t('label_name')}</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={v => setName(v)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{I.t('label_mobile')}</Text>
          <TextInput
            style={styles.input}
            value={mobile}
            keyboardType="number-pad"
            onChangeText={v => setMobile(v)}
          />
        </View>
        {renderCountryDropdown()}
        {renderStateDropdown()}

        <Button buttonText={I.t('label_submit')} onPress={onSubmit} />
      </View>
    );
  };

  const renderCountryDropdown = () => {
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{I.t('label_country')}</Text>
        <TouchableOpacity
          style={styles.dropdownContainer}
          onPress={() => setShowCountryModal(!showCountryModal)}>
          <Text style={[styles.input, {flex: 0.9, borderBottomWidth: 0}]}>
            {selectedCountry.name || ''}
          </Text>
          <Icon
            name="chevron-down"
            size={responsiveFontSize(2)}
            color={colors.black}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderStateDropdown = () => {
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{I.t('label_city')}</Text>
        <TouchableOpacity
          style={styles.dropdownContainer}
          onPress={() => setShowStateModal(!showStateModal)}>
          <Text style={[styles.input, {flex: 0.9, borderBottomWidth: 0}]}>
            {selectedState.name || ''}
          </Text>
          <Icon
            name="chevron-down"
            size={responsiveFontSize(2)}
            color={colors.black}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View style={[styles.header, {top: 0}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={Images.backArrow}
            resizeMode="contain"
            style={styles.backArrow}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{I.t('label_create_profile')}</Text>
      </View>
    );
  };

  const onDropdownValueSelect = (type, value) => {
    if (type === 'COUNTRY') {
      const {
        commonReducer: {countryList: country_list},
      } = state;
      setSelectedCountry(value);
      const stateList = country_list[value.value].state || [];
      let list = [],
        i = 0;
      stateList &&
        stateList.length !== 0 &&
        stateList.forEach(s => {
          list.push({
            name: s,
            value: i,
          });
          i++;
        });

      setStates(list);
    } else if (type === 'STATE') {
      setSelectedState(value);
    }
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
          {renderHeader()}
          {renderProfileContainer()}
        </View>
      </KeyboardAwareScrollView>
      <CountrySelectModal
        title={`Search for a ${showCountryModal ? 'Country' : 'City'}`}
        showModal={showCountryModal || showStateModal}
        items={showCountryModal ? countries : states}
        type={showCountryModal ? 'COUNTRY' : 'STATE'}
        closeModal={() => {
          setShowCountryModal(false);
          setShowStateModal(false);
        }}
        onItemSelect={onDropdownValueSelect}
      />
    </SafeAreaView>
  );
};
export default Profile;
