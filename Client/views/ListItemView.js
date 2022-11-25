import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { fetchAllCourses, getAllCourses } from "../Redux/Actions/coursesAction";
import store from "../Redux/Stores/Store";
import { useEffect } from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../src/const/colors';

const ListItemView = ({ navigation }) => {
  const db = useSelector((store) => store.courses);
  const dispatch = useDispatch();
  console.log(db);
  const [data, setData] = useState([]);
  useEffect(() => {
    dispatch(fetchAllCourses());
    // setData(db.courses)
    console.log(data);
  }, []);
  const HeaderComponent = () => {
    return (
      <View style={styles.headerListComponent}>
        <Text style={styles.headerComponetTitle}>Shop clothes</Text>
        
        <View style={styles.searchInputContainer}>
            <Icon name="magnify" size={24} color={COLORS.grey} />
            <TextInput
              placeholderTextColor={COLORS.grey}
              placeholder="Search pet to adopt"
              style={{flex: 1}}
            />
            <Icon name="sort-ascending" size={24} color={COLORS.grey} />
          </View>
          <TouchableOpacity
          style={styles.btnAdd}
          onPress={() => navigation.navigate("Create")}
        >
          <Text
            style={{
              color:"white",
              justifyContent: "center",
              alignSelf: "center",
              fontSize: 15,
              fontWeight:"bold",
            }}
          >
            Thêm 
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const ItemComponent = ({ item }) => {
    return (
      <TouchableOpacity
        key={item.docId}
        style={styles.ItemComponent}
        onPress={() => {
          navigation.navigate("Edit", {
            productId: item.docId,
            productImg: item.img,
            productName: item.name,
            productPrice: item.price,
          });
        }}
      >
      <View style={styles.Iteminfo}>
        <View>
          <Image source={{ uri: item.img }} style={styles.imgItem} />
        </View>
        <View style={styles.ItemDetail}>
          <Text style={styles.nameTxt}>{item.name}</Text>
          <Text style={{ color: "black" }}>Giá: {item.price} VND</Text>
        </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.ListItemContainer}>
       <ImageBackground
        source={{
          uri: "https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000",
        }}
        resizeMode="cover"
        style={styles.bgContainer}
      >
        <FlatList
          numColumns={2}
          data={db.clouths}
          renderItem={ItemComponent}
          ListHeaderComponent={HeaderComponent}
        ></FlatList>

      </ImageBackground>
    </View>
  );
};

export default ListItemView;
const width = Dimensions.get("window").width - 20;
const styles = StyleSheet.create({
  ListItemContainer: {
    flex: 1,
    backgroundColor: "#eeeeee",
  },
  background: {
    flex: 1,
    padding: 20,
  },
  btnAdd: {
    alignItems:"center",
    justifyContent:"center",
    width: 60,
    height: 30,
    marginTop:5,
    borderRadius: 15,
    backgroundColor: "#d81b60",
    opacity: 0.8,
  },
  ItemComponent: {
    borderRadius: 15,
    marginTop: 10,
    margin:5,
    width: width / 2,
    padding: 5,

    // borderColor: "#000",
    // borderWidth: 1,\
    backgroundColor:"white",
    shadowColor: "#e65100",
    shadowOffset: {
      width: 5,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  imgItem: {
    width: 120,
    height: 120,
    borderRadius: 20,
  },
  ItemDetail: {
    textAlign: "center",
    width: "100%",
  },
  nameTxt: {
    color: "Black",
    marginTop: 5,
    textAlign:"center",
    fontSize: 18,
 
  },
  priceTxt: {
    color: "#64b5f6",
    fontSize: 18,
  },
  detailTxt: {
    color: "black",
    fontSize: 15,
  },
  rating: {
    color: "black",
  },
  headerComponetTitle: {
    color: "black",
    fontSize: 50,
    fontWeight: "bold",
    paddingTop: 10,
  },
  headerListComponent: {
    textAlign: "center",
  },

  // Search
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: 7,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  // background
  bgContainer: {
    flex: 1,
    width: "100%",
    
    alignItems: "center",
  },

  //Styles info
  // Iteminfo:{
  //   margin:10
  // }

});
