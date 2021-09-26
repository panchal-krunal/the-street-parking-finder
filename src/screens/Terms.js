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
import {default as colors, default as Colors} from '../helpers/colors';
import fonts from '../helpers/fonts';
import Images from '../helpers/images';
import I from '../helpers/translations';

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
    textAlign: 'justify',
    width: '90%',
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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  titleText: {
    fontSize: responsiveFontSize(2),
    fontFamily: fonts.SemiBold,
    marginVertical: 5,
  },
  middleTextContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
});

const Terms = props => {
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
        <Text style={styles.title}>{I.t('terms')}</Text>
      </View>
    );
  };
  const renderMiddleText = () => {
    return (
      <View style={styles.middleTextContainer}>
        <Text style={styles.titleText}>{I.t('the_daily_driver')}</Text>
        <Text style={styles.titleText}>{I.t('app_terms')}</Text>
        <Text style={styles.titleText}>{I.t('user_agreement')}</Text>
      </View>
    );
  };

  const renderContentContainer = () => {
    return (
      <View style={styles.contentCard}>
        {renderMiddleText()}
        <Text style={styles.text}>{I.t('terms_text')}</Text>
      </View>
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
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default Terms;
