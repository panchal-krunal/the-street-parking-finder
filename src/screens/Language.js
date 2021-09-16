import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {SafeAreaView} from 'react-navigation';
import {RadioButton} from '../components';
import {default as colors, default as Colors} from '../helpers/colors';
import Fonts from '../helpers/fonts';
import Images from '../helpers/images';
import I from '../helpers/translations';

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
  title: {
    fontFamily: Fonts.SemiBold,
    fontSize: responsiveFontSize(4),
    color: Colors.white,
    position: 'absolute',
    top: 50,
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
    position: 'absolute',
    elevation: 5,
    top: '40%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  rdbContainer: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 10,
    padding: 10,
  },
});

const Language = props => {
  const {navigation} = props;
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const renderLanguageModal = () => {
    return (
      <View style={styles.modal}>
        <View style={styles.rdbContainer}>
          <RadioButton
            isSelected={selectedLanguage === 'en'}
            text="English"
            onPress={() => {
              setSelectedLanguage('en');
              navigation.navigate('VerifyOTP');
            }}
          />
        </View>
        <View style={styles.rdbContainer}>
          <RadioButton
            isSelected={selectedLanguage === 'es'}
            text="Spanish"
            onPress={() => {
              setSelectedLanguage('es');
              navigation.navigate('VerifyOTP');
            }}
          />
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView forceInset={{bottom: 'never'}} style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={Images.backgroundSphere}
          style={styles.backgroundImage}
        />
        <Text style={styles.title}>{I.t('label_select_language')}</Text>
        {renderLanguageModal()}
      </View>
    </SafeAreaView>
  );
};
export default Language;
