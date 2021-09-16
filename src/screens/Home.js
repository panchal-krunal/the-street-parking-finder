import Geolocation from '@react-native-community/geolocation';
import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {SafeAreaView} from 'react-navigation';
import {Button, NavHeader} from '../components';
import colors from '../helpers/colors';
import fonts from '../helpers/fonts';
import images from '../helpers/images';
import I from '../helpers/translations';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  headerContainer: {
    width: '100%',
    padding: 10,
    height: 80,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    width: 220,
    height: 220,
    borderRadius: 220,
    padding: 10,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  contentContainer: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: responsiveFontSize(3),
    color: colors.white,
    marginVertical: 20,
  },
  userText: {
    fontSize: responsiveFontSize(2),
    color: colors.white,
    marginBottom: 20,
  },
  userImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 120,
    padding: 10,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImage: {
    width: 100,
    height: 100,
  },
  logoImage: {
    width: 150,
    height: 150,
  },
  confirmationModal: {
    width: '80%',
    height: 200,
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: 30,
    borderRadius: 5,
    padding: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmationText: {
    fontSize: responsiveFontSize(2),
    fontFamily: fonts.Regular,
    textAlign: 'center',
  },
});

const Home = props => {
  const {navigation} = props;
  useEffect(() => {
    fetchLocation();
  }, []);
  const fetchLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const initialPosition = JSON.stringify(position);
        console.log(initialPosition);
      },
      error => console.log(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };
  const renderHeader = () => {
    return <NavHeader navigation={navigation} />;
  };
  const renderContent = () => {
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.userText}>John</Text>
        <View style={styles.userImageContainer}>
          <Image
            source={images.welcomeUser}
            resizeMode="contain"
            style={styles.userImage}
          />
        </View>
        <View style={styles.logoContainer}>
          <Image
            source={images.logo}
            resizeMode="contain"
            style={styles.logoImage}
          />
        </View>
      </View>
    );
  };
  const renderConfirmation = () => {
    return (
      <View style={styles.confirmationModal}>
        <Text style={styles.confirmationText}>{I.t('text_confirmation')}</Text>
        <Button
          buttonText="CONFIRM"
          onPress={() => navigation.push('Pullout')}
        />
      </View>
    );
  };
  return (
    <SafeAreaView forceInset={{bottom: 'never'}} style={styles.safeArea}>
      <View style={styles.container}>
        {renderHeader()}
        {renderContent()}
        {renderConfirmation()}
      </View>
    </SafeAreaView>
  );
};
export default Home;
