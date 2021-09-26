import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../helpers/colors';
import fonts from '../../helpers/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: '90%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    height: '95%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  searchInputContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.lightGrey,
    height: 50,
    borderRadius: 10,
    marginVertical: 10,
  },
  searchInput: {
    padding: 10,
    marginLeft: 10,
    fontSize: responsiveFontSize(2),
    fontFamily: fonts.Regular,
    height: 45,
    color: colors.black,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.Bold,
    fontSize: responsiveFontSize(2.5),
  },
  listItem: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  listLeftItem: {
    flexDirection: 'row',
    flex: 0.9,
  },
  listRightItem: {
    flex: 0.3,
    textAlign: 'right',
    alignItems: 'flex-end',
  },
  flag: {
    fontSize: responsiveFontSize(4),
  },
  countryName: {
    fontFamily: fonts.Regular,
    fontSize: responsiveFontSize(2),
    marginLeft: 10,
  },
  subText: {
    fontFamily: fonts.Regular,
    fontSize: responsiveFontSize(1.5),
    color: colors.darkGrey,
    marginLeft: 10,
  },
});
const CountrySelectModal = ({
  showModal,
  closeModal,
  items,
  title,
  onItemSelect,
  type,
  search,
  setSearch,
}) => {
  const [list, setList] = useState(items);

  useEffect(() => {
    setList(items);
  }, [items]);

  const renderItem = item => {
    const {item: data} = item;
    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => {
          onItemSelect(data.name, data.code, data.dial_code);
          closeModal();
        }}>
        <View style={styles.listLeftItem}>
          <Text style={styles.flag}>{data.flag}</Text>
          <Text style={styles.countryName}>
            {data.name}({data.code})
          </Text>
        </View>
        <Text style={styles.listRightItem}>{data.dial_code}</Text>
      </TouchableOpacity>
    );
  };

  const renderList = item => {
    const {item: data} = item;
    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => {
          onItemSelect(type, data);
          closeModal();
        }}>
        <View style={styles.listLeftItem}>
          <Text style={styles.countryName}>{data.name}</Text>
          <Text style={styles.subText}>
            {data.subName ? `(${data.subName})` : ''}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const onSearch = val => {
    setSearch(val);
    if (!val) {
      setList(items);
      return;
    }
    let filterData = items.filter(
      item =>
        item.name
          .toString()
          .toLowerCase()
          .indexOf(val.toString().toLowerCase()) > -1,
    );
    setList(filterData);
  };

  return (
    <Modal visible={showModal} animationType="slide" transparent={true}>
      <View style={styles.container}>
        <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
          <Icon name="close" color={colors.red} size={responsiveFontSize(3)} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.searchInputContainer}>
          <Icon name="search" color={colors.red} size={responsiveFontSize(2)} />
          <TextInput
            placeholder={title}
            placeholderTextColor={colors.darkGrey}
            style={styles.searchInput}
            value={search}
            onChangeText={onSearch}
          />
        </View>
        {type === 'SIGNUP' && (
          <FlatList
            data={list || items}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        )}
        {type !== 'SIGNUP' && (
          <FlatList
            data={list || items}
            renderItem={renderList}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </Modal>
  );
};

export default CountrySelectModal;
