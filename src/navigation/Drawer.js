import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../helpers/colors';
import fonts from '../helpers/fonts';

const styles = StyleSheet.create({
  container: {flex: 1},
  menuHeader: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    borderBottomColor: colors.red,
    borderBottomWidth: 2,
  },
  menuItemContainer: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemLeftSection: {
    flex: 0.9,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: responsiveFontSize(2),
    fontFamily: fonts.Regular,
  },
  headerText: {
    fontSize: responsiveFontSize(2),
    fontFamily: fonts.Regular,
  },
});

const Drawer = props => {
  const {navigation} = props;
  const renderMenuItems = item => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(item?.item?.navigate || '')}>
        <View style={styles.menuItemContainer}>
          <View style={styles.menuItemLeftSection}>
            <Icon
              name={item.item.icon}
              color={colors.red}
              size={responsiveFontSize(2.5)}
              style={{width: 35, textAlign: 'left'}}
            />
            <Text style={styles.menuItemText}>{item.item.name}</Text>
          </View>
          <Icon
            name="angle-right"
            color={colors.darkGrey}
            size={responsiveFontSize(2.5)}
          />
        </View>
      </TouchableOpacity>
    );
  };
  const data = [
    {id: 1, name: 'Profile', icon: 'user', navigate: 'EditProfile'},
    {
      id: 2,
      name: 'Vehicle Information',
      icon: 'car',
      navigate: 'EditVehicleInfo',
    },
    {id: 3, name: 'Subscription', icon: 'dollar', navigate: 'Subscription'},
    {id: 4, name: 'Notification', icon: 'bell'},
    {id: 5, name: 'My Plans', icon: 'list', navigate: 'MyPlans'},
    {id: 6, name: 'Select Country', icon: 'globe'},
    {id: 4, name: 'Select Language', icon: 'flag'},
    {id: 4, name: 'Share', icon: 'share'},
    {id: 4, name: 'Support', icon: 'headphones', navigate: 'Support'},
    {
      id: 4,
      name: 'Disclaimer',
      icon: 'exclamation-circle',
      navigate: 'Disclaimer',
    },
    {
      id: 4,
      name: 'Terms & Conditions',
      icon: 'file-text',
      navigate: 'Terms',
    },
    {id: 4, name: 'Logout', icon: 'sign-out'},
  ];
  return (
    <View style={{flex: 1}}>
      <View style={styles.menuHeader}>
        <Text style={styles.headerText}>Hello, John</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderMenuItems}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Drawer;
