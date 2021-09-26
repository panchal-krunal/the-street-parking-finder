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
import images from '../helpers/images';
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
    textAlign: 'center',
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkText: {
    fontSize: responsiveFontSize(2),
    fontFamily: fonts.SemiBold,
    color: colors.black,
    textAlign: 'center',
    marginTop: 5,
  },
  lightText: {
    fontSize: responsiveFontSize(1.5),
    fontFamily: fonts.Regular,
    color: colors.black,
    textAlign: 'center',
  },
  item: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
});

const Support = props => {
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
        <Text style={styles.title}>{I.t('support')}</Text>
      </View>
    );
  };

  const renderContentContainer = () => {
    return (
      <View style={styles.contentCard}>
        <Text style={styles.darkText}>{I.t('support_detail')}</Text>
        <View style={styles.item}>
          <Text style={styles.lightText}>{I.t('website')}</Text>
          <Text style={styles.darkText}>{I.t('www')}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.lightText}>{I.t('phone')}</Text>
          <Text style={styles.darkText}>{I.t('number')}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.lightText}>{I.t('email_address')}</Text>
          <Text style={styles.darkText}>{I.t('reach_us')}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.lightText}>{I.t('toll_free')}</Text>
          <Text style={styles.darkText}>{I.t('toll_free_number')}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.lightText}>{I.t('follow_us')}</Text>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Image
              source={images.facebook}
              resizeMode="contain"
              style={{width: 30, height: 30, marginHorizontal: 5}}
            />
            <Image
              source={images.twitter}
              resizeMode="contain"
              style={{width: 30, height: 30, marginHorizontal: 5}}
            />
            <Image
              source={images.linkedin}
              resizeMode="contain"
              style={{width: 30, height: 30, marginHorizontal: 5}}
            />
            <Image
              source={images.instagram}
              resizeMode="contain"
              style={{width: 30, height: 30, marginHorizontal: 5}}
            />
          </View>
        </View>
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
export default Support;
