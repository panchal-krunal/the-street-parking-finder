import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import fonts from '../../helpers/fonts';
import Images from '../../helpers/images';
import I from '../../helpers/translations';
import {SafeAreaView} from 'react-navigation';
import colors from '../../helpers/colors';
import {Button} from '../../components';

const DEVICE_HEIGHT = Dimensions.get('window').height;
console.log(DEVICE_HEIGHT);

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
  header: {
    width: '100%',
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  backArrow: {
    width: 30,
  },
  card: {
    width: '90%',
    backgroundColor: colors.white,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  monthRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  monthBox: {
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.45,
    borderRadius: 10,
  },
  monthNumber: {
    fontSize: responsiveFontSize(3),
    color: colors.lightYellow,
    fontFamily: fonts.Regular,
    textAlign: 'center',
  },
  monthText: {
    fontSize: responsiveFontSize(3),
    color: colors.lightYellow,
    fontFamily: fonts.Regular,
    textAlign: 'center',
    marginTop: 10,
  },
  continueButton: {
    backgroundColor: colors.yellow,
    width: '90%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: 45,
    marginVertical: 30,
    borderRadius: 10,
  },
  continueButtonText: {
    fontFamily: fonts.Regular,
    fontSize: responsiveFontSize(2),
    color: colors.black,
  },
  content: {
    fontSize: responsiveFontSize(1.5),
    color: colors.black,
    fontFamily: fonts.Regular,
    marginTop: 20,
    textAlign: 'justify',
  },
  contentContainer: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: responsiveFontSize(2),
    color: colors.black,
    fontFamily: fonts.Bold,
  },
});

const Subscription = props => {
  const {navigation} = props;
  const [selectedMonth, setSelectedMonth] = useState(3);
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
        <View
          style={{
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: responsiveFontSize(3),
              fontFamily: fonts.Bold,
              color: colors.lightYellow,
              width: '60%',
            }}>
            {I.t('premium_service_subscription')}
          </Text>
        </View>
      </View>
    );
  };
  const renderSubscriptionCard = () => {
    return (
      <View style={styles.card}>
        <View style={styles.monthRow}>
          {renderSubscriptionItem(1)}
          {renderSubscriptionItem(3)}
        </View>
        <View style={styles.monthRow}>
          {renderSubscriptionItem(6)}
          {renderSubscriptionItem(12)}
        </View>
        {renderContinueButton()}
        {renderContent()}
      </View>
    );
  };
  const renderSubscriptionItem = number => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{flex: 0.45}}
        onPress={() => setSelectedMonth(number)}>
        <View
          style={[
            styles.monthBox,
            {
              backgroundColor:
                selectedMonth === number ? colors.brown : colors.white,
            },
          ]}>
          <Text style={styles.monthNumber}>{number}</Text>
          <Text style={styles.monthText}>{I.t('month')}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const renderContinueButton = () => {
    return (
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.push('Plan')}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    );
  };
  const renderContent = () => {
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{I.t('subscription_content_title')}</Text>
        <Text style={styles.content}>{I.t('subscription_content')}</Text>
      </View>
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
          {renderHeader()}
          {renderSubscriptionCard()}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Subscription;
