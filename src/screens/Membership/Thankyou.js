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
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 180,
    height: 180,
    borderRadius: 180,
    borderColor: colors.brown,
    borderWidth: 3,
    backgroundColor: colors.brown,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerCircle: {
    width: 200,
    height: 200,
    borderRadius: 200,
    borderColor: colors.yellow,
    borderWidth: 3,
    backgroundColor: colors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  titleText: {
    fontSize: responsiveFontSize(2),
    fontFamily: fonts.Bold,
    color: colors.black,
  },
  content: {
    fontSize: responsiveFontSize(2),
    fontFamily: fonts.Regular,
    color: colors.black,
    marginTop: 10,
  },
  linkButton: {
    borderBottomColor: colors.red,
    borderBottomWidth: 0.7,
    marginTop: 50,
  },
  linkButtonText: {
    fontFamily: fonts.Regular,
    color: colors.red,
    fontSize: responsiveFontSize(2),
  },
});

const Thankyou = props => {
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
        <Text style={styles.title}>{I.t('thankyou')}</Text>
      </View>
    );
  };

  const renderContentContainer = () => {
    return (
      <View style={styles.contentCard}>
        {renderCircle()}
        {renderText()}
        {renderLinkButton()}
      </View>
    );
  };
  const renderCircle = () => {
    return (
      <View style={styles.outerCircle}>
        <View style={styles.innerCircle}>
          <Icon
            name="check"
            color={colors.white}
            size={responsiveFontSize(7)}
          />
        </View>
      </View>
    );
  };
  const renderText = () => {
    return (
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{I.t('payment_successful')}</Text>
        <Text style={styles.content}>{I.t('payment_successful_content')}</Text>
      </View>
    );
  };
  const renderLinkButton = () => {
    return (
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.push('Pullout')}>
        <Text style={styles.linkButtonText}>{I.t('back_to_home')}</Text>
      </TouchableOpacity>
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
export default Thankyou;
