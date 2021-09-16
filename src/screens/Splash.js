import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../helpers/colors';
import Images from '../helpers/images';
import {getCarList, getCountryList} from '../redux/actions/commonAction';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: 'center',
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
  logo: {
    width: 190,
    height: 179,
    alignSelf: 'center',
    borderRadius: 200,
  },
});

const Splash = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  useEffect(() => {
    fetchCountryList();
  }, []);
  const navigateNext = () => {
    const isOnboardingComplete = state?.commonReducer?.isOnboardingComplete;
    let page;
    if (isOnboardingComplete) {
      page = 'Home';
    } else {
      page = 'Signup';
    }
    setTimeout(() => {
      navigation.navigate(page);
    }, 2000);
  };
  const fetchCountryList = async () => {
    await dispatch(getCountryList());
    fetchCarList();
  };
  const fetchCarList = async () => {
    await dispatch(getCarList());
    navigateNext();
  };
  return (
    <SafeAreaView forceInset={{bottom: 'never'}} style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={Images.backgroundSphere}
          style={styles.backgroundImage}
        />
        <Image source={Images.logo} resizeMode="contain" style={styles.logo} />
      </View>
    </SafeAreaView>
  );
};
export default Splash;
