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
import {Button} from '../../components';
import {default as colors, default as Colors} from '../../helpers/colors';
import fonts from '../../helpers/fonts';
import images from '../../helpers/images';
import Images from '../../helpers/images';
import I from '../../helpers/translations';
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: Colors.red,
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

  label: {
    fontFamily: fonts.Regular,
    fontSize: responsiveFontSize(2),
    color: '#a7a7a7',
  },
  contentCard: {
    width: '100%',
    marginTop: 30,
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  button: {
    position: 'absolute',
    width: '90%',
    bottom: 0,
    borderRadius: 0,
  },
  typeButton: {
    borderBottomWidth: 0.3,
    borderBottomColor: colors.darkGrey,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeItem: {
    flexDirection: 'row',
    height: 100,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  leftSection: {
    flex: 0.9,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  typeImage: {
    width: 80,
    height: 80,
  },
  typeText: {
    fontSize: responsiveFontSize(2.5),
    fontFamily: fonts.Regular,
    color: colors.black,
    marginLeft: 20,
  },
});

const Payment = props => {
  const {navigation} = props;

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
        <Text style={styles.title}>{I.t('payment')}</Text>
      </View>
    );
  };

  const renderContentContainer = () => {
    return (
      <View style={styles.contentCard}>
        {renderPaymentTypes(images.creditCard, 'Credit Card')}
        {renderPaymentTypes(images.debitCard, 'Debit Card')}
        {renderPaymentTypes(images.paypal, 'Pay Pal')}
        <Image
          source={images.protection}
          resizeMode="contain"
          style={{
            width: '100%',
            height: 100,
            alignSelf: 'center',
            marginTop: 20,
          }}
        />
        {renderNextButton()}
      </View>
    );
  };

  const renderPaymentTypes = (typeImage, typeName) => {
    return (
      <TouchableOpacity style={styles.typeButton}>
        <View style={styles.typeItem}>
          <View style={styles.leftSection}>
            <Image
              source={typeImage}
              resizeMode="contain"
              style={styles.typeImage}
            />
            <Text style={styles.typeText}>{typeName}</Text>
          </View>
          <TouchableOpacity style={{flex: 0.1}}>
            <Icon
              name="angle-right"
              color={colors.black}
              size={responsiveFontSize(3)}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };
  const renderNextButton = () => {
    return (
      <Button
        buttonStyle={styles.button}
        buttonText="SUBMIT"
        onPress={() => navigation.push('Thankyou')}
      />
    );
  };

  return (
    <SafeAreaView forceInset={{bottom: 'never'}} style={styles.safeArea}>
      <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {renderHeader()}
          {renderContentContainer()}
          {}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default Payment;
