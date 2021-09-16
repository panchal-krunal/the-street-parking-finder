import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import colors from '../helpers/colors';
import images from '../helpers/images';
const NavHeader = ({}) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity>
        <Image
          source={images.headerIcon1}
          style={{width: 60, height: 60, marginTop: 10}}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={images.headerIcon2}
          style={{width: 50, height: 50, marginTop: 10}}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={images.headerIcon3}
          style={{width: 40, height: 40, marginTop: 10}}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={images.headerIcon4}
          style={{width: 40, height: 40, marginTop: 10}}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default NavHeader;

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    padding: 10,
    height: 80,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
