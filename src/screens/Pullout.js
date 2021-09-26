import Geolocation from '@react-native-community/geolocation';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
  Switch,
  Alert,
  Platform,
} from 'react-native';
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-navigation';
import {NavHeader} from '../components';
import colors from '../helpers/colors';
import fonts from '../helpers/fonts';
import images from '../helpers/images';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {debounce} from 'lodash';
import {log} from '../helpers/tron';
import {DrawerActions} from '@react-navigation/routers';

const DEVICE_HEIGHT = Dimensions.get('window').height;
console.log(DEVICE_HEIGHT);

const mapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#242f3e',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#746855',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#242f3e',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#263c3f',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#6b9a76',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#38414e',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#212a37',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9ca5b3',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#746855',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#1f2835',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#f3d19c',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [
      {
        color: '#2f3948',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#17263c',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#515c6d',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#17263c',
      },
    ],
  },
];

const Pullout = props => {
  log(props);
  const {navigation} = props;

  const [region, setRegion] = useState(null);

  const [showSideView, setShowSideView] = useState(true);

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const [pulloutDateTime, setPulloutDateTime] = useState(null);

  const [isReminderOn, setIsReminderOn] = useState(false);

  const [reminderDateTime, setReminderDateTime] = useState(null);

  const onRegionChange = region => {
    console.log('change', region);
    setRegion(region);
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      let granted;
      if (Platform.OS === 'android') {
        granted = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, {
          title: 'Location Access Required',
          message:
            'The Street Parking Finder requires access to your location to find parking spot',
        });
      } else {
        granted = await check(PERMISSIONS.IOS.LOCATION_ALWAYS, {
          title: 'Location Access Required',
          message:
            'The Street Parking Finder requires access to your location to find parking spot',
        });
      }
      console.log(granted);

      if (granted === RESULTS.GRANTED) {
        //To Check, If Permission is granted
        fetchLocation();
      } else {
        Alert.alert('Error', 'Error while fetching location permission', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }
    } catch (err) {
      console.log('err', err);
      Alert.alert('Error', 'Error while fetching location permission', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };

  const fetchLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        setRegion({
          latitude: position.coords.latitude,
          longitude: position?.coords?.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      error => console.log(JSON.stringify(error)),
      Platform.OS === 'android'
        ? {enableHighAccuracy: true, timeout: 20000, maximumAge: 3600000}
        : {enableHighAccuracy: true, timeout: 20000, maximumAge: 3600000},
    );
  };

  const renderEmptyView = () => {
    return (
      <View
        style={[styles.map, {justifyContent: 'center', alignItems: 'center'}]}>
        <Text style={styles.emptyView}>Loading map...</Text>
      </View>
    );
  };

  const renderMapView = () => {
    return (
      <MapView
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : ''}
        customMapStyle={mapStyle}
        onPress={e => console.log(e.nativeEvent.coordinate)}
        initialRegion={region}
        onRegionChange={onRegionChange}
        zoomControlEnabled={true}
        zoomEnabled={true}
        minZoomLevel={10}
        showsMyLocationButton={true}
        style={styles.map}>
        <Marker
          image={images.headerIcon1}
          coordinate={{
            latitude: region?.latitude,
            longitude: region?.longitude,
          }}
          pinColor={'red'}
        />
      </MapView>
    );
  };

  const renderSideView = () => {
    return (
      <View style={styles.sideView}>
        <TouchableOpacity
          style={styles.leftView}
          onPress={() => setShowSideView(!showSideView)}>
          <View></View>
        </TouchableOpacity>

        <View
          style={[
            styles.rightView,
            pulloutDateTime && {alignItems: 'flex-start', paddingLeft: 20},
          ]}>
          <TouchableOpacity
            style={styles.showHideButton}
            onPress={() => setShowSideView(false)}>
            <Icon
              name={showSideView ? 'angle-right' : 'angle-left'}
              color={colors.white}
              size={responsiveFontSize(3)}
            />
          </TouchableOpacity>
          {!pulloutDateTime && (
            <>
              <Text style={[styles.titleText, {color: colors.yellow}]}>
                SET / RESET
              </Text>
              <Text style={styles.titleText}>DATE / TIME</Text>
              <Text style={styles.titleText}>TO</Text>
              <TouchableOpacity
                style={styles.pullOutButton}
                onPress={() => setIsDatePickerVisible(true)}>
                <Text style={styles.pullOutButtonText}>Pull Out</Text>
              </TouchableOpacity>
              <Image
                source={images.headerIcon1}
                resizeMode="contain"
                style={styles.pulloutImage}
              />
            </>
          )}
          {pulloutDateTime && (
            <>
              <Text
                style={[
                  styles.titleText,
                  {color: colors.yellow, textAlign: 'center', width: '80%'},
                ]}>
                SCHEDULED PULL OUT
              </Text>
              <Text style={styles.titleText}>DATE</Text>
              <Text style={[styles.valueText, {marginTop: 0}]}>
                {moment(pulloutDateTime).format('ddd, DD MMM, YYYY')}
              </Text>
              <Text style={styles.titleText}>TIME</Text>
              <Text style={[styles.valueText, {marginTop: 0}]}>
                {moment(pulloutDateTime).format('hh:mm A')}
              </Text>
              <View style={styles.reminderContainer}>
                <Text style={[styles.titleText, styles.reminderText]}>
                  Set Reminder
                </Text>
                <Switch
                  // style={styles.toggleButton}
                  trackColor={{false: '#767577', true: '#FFCC33'}}
                  thumbColor={isReminderOn ? '#333' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  value={isReminderOn}
                  onValueChange={() => {
                    setIsReminderOn(!isReminderOn);
                  }}
                />
              </View>
              {reminderDateTime && (
                <Text
                  style={[
                    styles.valueText,
                    {color: colors.yellow, width: '70%'},
                  ]}
                  numberOfLines={2}>
                  {moment(reminderDateTime).format('ddd, DD MMM, YYYY hh:mm A')}
                </Text>
              )}
            </>
          )}
        </View>
      </View>
    );
  };

  useEffect(() => {
    if (isReminderOn) setIsDatePickerVisible(true);
    if (!isReminderOn) setReminderDateTime(null);
  }, [isReminderOn]);

  const renderDateTimePicker = () => {
    return (
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        display="spinner"
        onConfirm={handleConfirm}
        minimumDate={new Date()}
        onCancel={() => setIsDatePickerVisible(false)}
      />
    );
  };

  const handleConfirm = date => {
    console.log(date);
    setIsDatePickerVisible(false);
    if (!pulloutDateTime) setPulloutDateTime(date);
    else setReminderDateTime(date);
  };

  return (
    <SafeAreaView forceInset={{bottom: 'never'}} style={styles.safeArea}>
      <View style={styles.container}>
        {!showSideView && (
          <TouchableOpacity
            style={styles.showHideButtonScreen}
            onPress={() => setShowSideView(true)}>
            <Icon
              name={showSideView ? 'angle-right' : 'angle-left'}
              color={colors.white}
              size={responsiveFontSize(3)}
            />
          </TouchableOpacity>
        )}
        <NavHeader navigation={navigation} />
        {/* {renderMapView()} */}
        {!region && renderEmptyView()}
        {region && renderMapView()}
        <View style={styles.footer}>
          <TouchableOpacity>
            <Icon
              name="home"
              color={colors.white}
              size={responsiveFontSize(3)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(DrawerActions.toggleDrawer());
            }}>
            <Icon
              name="bars"
              color={colors.white}
              size={responsiveFontSize(3)}
            />
          </TouchableOpacity>
        </View>
        {showSideView && renderSideView()}
        {isDatePickerVisible && renderDateTimePicker()}
      </View>
    </SafeAreaView>
  );
};

export default Pullout;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  footer: {
    backgroundColor: colors.black,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 0.1,
    paddingHorizontal: 20,
  },
  emptyView: {
    fontFamily: fonts.Regular,
    fontSize: responsiveFontSize(2),
  },
  sideView: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    width: '100%',
    height: DEVICE_HEIGHT,
    marginTop: 80,
  },
  leftView: {
    flex: 0.3,
    backgroundColor: 'transparent',
  },
  rightView: {
    flex: 0.7,
    backgroundColor: colors.black,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleText: {
    color: colors.white,
    fontFamily: fonts.Bold,
    fontSize: responsiveFontSize(2.5),
    marginVertical: 10,
  },
  valueText: {
    color: colors.darkGrey,
    fontFamily: fonts.Regular,
    fontSize: responsiveFontSize(2.5),
    marginVertical: 10,
    textTransform: 'uppercase',
  },
  pullOutButton: {
    backgroundColor: colors.green,
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: '80%',
    marginTop: 30,
  },
  pullOutButtonText: {
    color: colors.white,
    fontFamily: fonts.Bold,
    fontSize: responsiveFontSize(2),
  },
  pulloutImage: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
  reminderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reminderText: {
    flex: 0.8,
    marginRight: 5,
    fontSize: responsiveFontSize(2.5),
  },
  toggleButton: {
    flex: 0.2,
    width: '100%',
  },
  showHideButton: {
    position: 'absolute',
    top: '40%',
    backgroundColor: colors.black,
    height: 70,
    width: 40,
    left: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  showHideButtonScreen: {
    position: 'absolute',
    top: '50%',
    backgroundColor: colors.black,
    height: 70,
    width: 40,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
});
