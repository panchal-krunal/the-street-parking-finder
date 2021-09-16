import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../helpers/colors';
import fonts from '../../helpers/fonts';
import I from '../../helpers/translations';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disclaimerContainer: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  title: {
    fontFamily: fonts.Bold,
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
  },
  text: {
    fontFamily: fonts.Regular,
    fontSize: responsiveFontSize(2),
    marginVertical: 20,
    textAlign: 'justify',
  },
});

const DisclaimerModal = ({showModal, closeModal}) => {
  return (
    <Modal visible={showModal} animationType="slide">
      <View style={styles.container}>
        <View style={styles.disclaimerContainer}>
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Icon
              name="close"
              size={responsiveFontSize(3)}
              color={colors.red}
            />
          </TouchableOpacity>
          <Text style={styles.title}>{I.t('label_app_disclaimer')}</Text>
          <Text style={styles.text}>{I.t('text_disclaimer')}</Text>
        </View>
      </View>
    </Modal>
  );
};
export default DisclaimerModal;
