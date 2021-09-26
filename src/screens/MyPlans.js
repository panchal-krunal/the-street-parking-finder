import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
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
  planCard: {
    width: '90%',
    alignSelf: 'center',
    elevation: 5,
    borderRadius: 10,
    backgroundColor: colors.white,
    height: 110,
    marginVertical: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 10,
  },
  topContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  planTitle: {
    fontSize: responsiveFontSize(2),
    fontFamily: fonts.SemiBold,
    color: colors.black,
  },
  planSubText: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: fonts.Regular,
    color: colors.black,
  },
  planStatusText: {
    fontSize: responsiveFontSize(1.5),
    textAlign: 'center',
    fontFamily: fonts.SemiBold,
    color: colors.white,
  },
  leftSection: {flex: 0.8},
  rightSection: {flex: 0.2},
  dateText: {
    fontSize: responsiveFontSize(1.5),
    textAlign: 'right',
    fontFamily: fonts.SemiBold,
    color: colors.darkGrey,
  },
});

const MyPlans = props => {
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
        <Text style={styles.title}>{I.t('my_plans')}</Text>
      </View>
    );
  };

  const renderContentContainer = () => {
    return (
      <View style={styles.contentCard}>
        <FlatList
          data={data}
          renderItem={renderPlans}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}
          style={{width: '100%'}}
        />
      </View>
    );
  };

  const renderPlans = () => {
    return (
      <View style={styles.planCard}>
        <View style={styles.topContainer}>
          <View style={styles.leftSection}>
            <Text style={styles.planTitle}>3 Months Premium Service</Text>
            <Text style={styles.planSubText}>(@ $5 per month)</Text>
          </View>
          <View
            style={[
              styles.rightSection,
              {backgroundColor: colors.red, padding: 3, borderRadius: 3},
            ]}>
            <Text style={styles.planStatusText}>Expired</Text>
          </View>
        </View>
        <View style={[styles.topContainer, {marginTop: 20}]}>
          <View style={[styles.leftSection, {flex: 0.6}]}>
            <Text style={styles.planTitle}>$30.00</Text>
          </View>
          <View style={[styles.rightSection, {flex: 0.4}]}>
            <Text style={styles.dateText}>20 June, 2021</Text>
          </View>
        </View>
      </View>
    );
  };
  const data = [{id: 1}, {id: 2}];
  return (
    <SafeAreaView forceInset={{bottom: 'never'}} style={styles.safeArea}>
      {/* <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}> */}
      <View style={styles.container}>
        {renderHeader()}

        {renderContentContainer()}
      </View>
      {/* </KeyboardAwareScrollView> */}
    </SafeAreaView>
  );
};
export default MyPlans;
