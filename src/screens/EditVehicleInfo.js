import React, {useEffect, useState} from 'react';
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
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-navigation';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from '../components';
import {default as colors, default as Colors} from '../helpers/colors';
import ColorsList from '../helpers/colors-list.json';
import fonts from '../helpers/fonts';
import Images from '../helpers/images';
import I from '../helpers/translations';
import {saveUserStep} from '../redux/actions/commonAction';
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
    marginTop: responsiveHeight(5),
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
    fontFamily: fonts.SemiBold,
    fontSize: responsiveFontSize(2),
    color: '#333',
  },
  input: {
    width: '100%',
    alignSelf: 'center',
    padding: 10,
    paddingLeft: 0,
    height: 50,
    fontFamily: fonts.Regular,
    color: colors.black,
    fontSize: responsiveFontSize(2),
    backgroundColor: colors.lightGrey,
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.lightGrey,
    borderRadius: 5,
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

const EditVehicleInfo = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  const insets = useSafeAreaInsets();

  const [showLoader, setShowLoader] = useState(false);
  const [showModal, setShowModal] = useState(null);

  const [colors, setColors] = useState(ColorsList);
  const [makeModel, setMakeModel] = useState([]);
  const [make, setMake] = useState([]);
  const [model, setModel] = useState([]);

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');

  const [licensePlate, setLicensePlate] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    designMakeModel();
  }, []);

  const designMakeModel = () => {
    const {
      commonReducer: {carList: car_list},
    } = state;
    let list = [],
      makeList = [];
    let i = 0;
    car_list &&
      car_list.length !== 0 &&
      car_list[0].data.forEach(c => {
        list.push({
          make: c.make,
          model: c.model,
          value: i,
        });
        makeList.push({
          name: c.make,
          subName: c.model,
          value: i,
        });
        i++;
      });
    setMakeModel(list);
    setMake(makeList);
  };

  const onSubmit = async () => {
    await dispatch(
      saveUserStep({
        isOnboardingComplete: true,
      }),
    );
    // navigation.navigate('Action');
  };

  const renderProfileContainer = () => {
    return (
      <View style={styles.modal}>
        <View style={[styles.inputContainer]}>
          {renderColorDropdown()}
          {renderMakeDropdown()}
          {renderModelDropdown()}
          <View style={styles.inputContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.label}>{I.t('label_license_plate')}</Text>
              <Text
                style={[
                  styles.label,
                  {
                    fontSize: responsiveFontSize(1.5),
                    color: Colors.red,
                    fontFamily: fonts.Regular,
                  },
                ]}>
                {I.t('label_optional')}
              </Text>
            </View>
            <TextInput
              style={[
                styles.input,
                {
                  marginTop: 20,
                  height: 60,
                  padding: 10,
                  paddingLeft: 10,
                  borderRadius: 5,
                },
              ]}
              value={licensePlate}
              onChangeText={v => setLicensePlate(v)}
            />
          </View>
        </View>
        <Button buttonText={I.t('save_changes')} onPress={onSubmit} />
      </View>
    );
  };

  const renderColorDropdown = () => {
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{I.t('label_color')}</Text>
        <TouchableOpacity
          style={styles.dropdownContainer}
          onPress={() => setShowModal('COLOR')}>
          <Text style={[styles.input, {flex: 0.9, borderBottomWidth: 0}]}>
            {selectedColor || ''}
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

  const renderMakeDropdown = () => {
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{I.t('label_make')}</Text>
        <TouchableOpacity
          style={styles.dropdownContainer}
          onPress={() => setShowModal('MAKE')}>
          <Text style={[styles.input, {flex: 0.9, borderBottomWidth: 0}]}>
            {selectedMake || ''}
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

  const renderModelDropdown = () => {
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{I.t('label_model')}</Text>
        <TouchableOpacity
          style={styles.dropdownContainer}
          onPress={() => setShowModal('MODEL')}>
          <Text style={[styles.input, {flex: 0.9, borderBottomWidth: 0}]}>
            {selectedModel || ''}
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
        <Text style={styles.title}>{I.t('edit_vehicle_information')}</Text>
      </View>
    );
  };

  const onDropdownValueSelect = (type, value) => {
    if (type === 'COLOR') {
      setSelectedColor(value.name);
    } else if (type === 'MAKE') {
      setSelectedMake(value.name);
      setSelectedModel(value.subName);
      let list = makeModel.filter(
        item =>
          item.make.toString().toLowerCase() ===
          value.name.toString().toLowerCase(),
      );
      let modelList = [],
        i = 0;
      list &&
        list.length !== 0 &&
        list.forEach(v => {
          modelList.push({
            name: v.model,
            value: i,
          });
          i++;
        });

      setModel(modelList);
    } else if (type === 'MODEL') {
      setSelectedModel(value.name);
    }
  };

  let selectText =
    showModal === 'COLOR'
      ? 'Color'
      : showModal === 'MAKE'
      ? 'Make-Model'
      : 'Model';
  let items =
    showModal === 'COLOR' ? colors : showModal === 'MAKE' ? make : model;
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
        title={`Search for a ${selectText}`}
        showModal={!!showModal}
        items={items}
        type={showModal}
        closeModal={() => {
          setShowModal('');
          setSearch('');
        }}
        onItemSelect={onDropdownValueSelect}
        search={search}
        setSearch={setSearch}
      />
    </SafeAreaView>
  );
};
export default EditVehicleInfo;
