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
  checkbox: {
    borderRadius: 5,
    width: 25,
    height: 25,
    borderColor: Colors.black,
    borderWidth: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsText: {
    marginLeft: 20,
    width: '80%',
    textAlign: 'left',
    fontSize: responsiveFontSize(1.5),
    fontFamily: fonts.Regular,
  },
  termsContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30,
  },
  planCard: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 30,
  },
  planItem: {
    width: '100%',
    borderBottomWidth: 0.3,
    borderBottomColor: colors.darkGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 90,
  },
  planItemText: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: fonts.Regular,
    color: colors.black,
  },
  planItemSmallText: {
    fontSize: responsiveFontSize(1.5),
    fontFamily: fonts.Regular,
    color: colors.black,
  },
  priceText: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: fonts.Regular,
    color: colors.black,
    flex: 0.2,
    textAlign: 'right',
    marginRight: 10,
  },
  leftContainer: {
    flex: 0.8,
    padding: 10,
  },
});

const Plan = props => {
  const {navigation} = props;
  const [acceptTerms, setAcceptTerms] = useState(false);

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
        <Text style={styles.title}>{I.t('review_plan')}</Text>
      </View>
    );
  };

  const renderContentContainer = () => {
    return (
      <View style={styles.contentCard}>
        {renderTerms()}
        {renderPlan()}
        {renderNextButton()}
      </View>
    );
  };
  const renderTerms = () => {
    return (
      <View style={styles.termsContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setAcceptTerms(!acceptTerms)}>
          {acceptTerms && (
            <Icon
              name="check"
              color={Colors.black}
              size={responsiveFontSize(2)}
            />
          )}
        </TouchableOpacity>
        <Text style={styles.termsText}>{I.t('plan_text')}</Text>
      </View>
    );
  };

  const renderPlan = () => {
    return (
      <View style={styles.planCard}>
        <View style={styles.planItem}>
          <View style={styles.leftContainer}>
            <Text style={styles.planItemText}>3 Months Premium Service</Text>
            <Text style={styles.planItemSmallText}>(@ $5 per month)</Text>
          </View>
          <Text style={styles.priceText}>$15.00</Text>
        </View>
        <View style={[styles.planItem, {height: 60}]}>
          <View style={styles.leftContainer}>
            <Text style={styles.planItemText}>Processing Fees</Text>
          </View>
          <Text style={styles.priceText}>$0.00</Text>
        </View>
        <View style={[styles.planItem, {height: 60}]}>
          <View style={styles.leftContainer}>
            <Text
              style={[
                styles.planItemText,
                {fontSize: responsiveFontSize(2.5)},
              ]}>
              Total
            </Text>
          </View>
          <Text style={[styles.priceText, {fontSize: responsiveFontSize(2.5)}]}>
            $15.00
          </Text>
        </View>
      </View>
    );
  };

  const renderNextButton = () => {
    return (
      <Button
        buttonStyle={styles.button}
        buttonText="NEXT"
        onPress={() => navigation.push('Payment')}
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
export default Plan;
