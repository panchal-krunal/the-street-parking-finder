import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {Button} from '../components';
import {default as colors, default as Colors} from '../helpers/colors';
import fonts from '../helpers/fonts';
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
  icon: {width: 70, height: 70},
  title: {
    marginVertical: 20,
    fontFamily: fonts.Bold,
    color: colors.white,
    fontSize: responsiveFontSize(3),
  },
  text: {
    marginBottom: 20,
    fontFamily: fonts.Regular,
    color: colors.white,
    fontSize: responsiveFontSize(2),
    width: '80%',
    textAlign: 'center',
    textTransform: 'uppercase',
    lineHeight: 30,
  },
});

const Action = props => {
  const {navigation} = props;
  return (
    <View style={styles.container}>
      <Image
        source={Images.attention}
        resizeMode="contain"
        style={styles.icon}
      />
      <Text style={styles.title}>{I.t('label_action_required')}</Text>
      <Text style={styles.text}>{I.t('text_action')}</Text>
      <Button
        buttonText={I.t('label_proceed')}
        onPress={() => navigation.push('Home')}
      />
    </View>
  );
};
export default Action;
