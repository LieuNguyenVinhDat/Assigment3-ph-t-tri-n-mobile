import React, { useState } from "react";
import {
  Platform,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { postClouth } from "../Redux/Actions/coursesAction";
import {
  getStorage,
  uploadString,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage"; 

import * as ImagePicker from "expo-image-picker";
// import { coursesReduce } from "../Redux/Reduces/coursesReduce";
// import store from "../Redux/Stores/Store";
// import IonIcons from "react-native-vector-icons/IonIcons";
// import Ionicons from '@expo/vector-icons/Ionicons';
//import { Ionicons } from "@expo/vector-icons";
const Create = ({navigation}) => {
  const dispatch = useDispatch();
  const db = useSelector((store) => store.courses);
  const [cateID, setcateID] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImage] = useState("");
  const save = () => {
    let newClouth = {
      // cateID: cateID,
      name: name,
      price: price,
      img: selectedImage.localURI,
    };
    dispatch(postClouth(newClouth));
    navigation.navigate("ViewAll");
  };
  const [selectedImage, setSelectedImage] = useState({ localURI: "" });
  const openImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ base64: true });
    if (result.cancelled) return;
    // console.log(result)
    let uri = result.uri;
    setSelectedImage({ localURI: result.uri });
    if (Platform.OS === "web") {
      let base64code = result.base64;
      //upload
      await uploadBase64(base64code);
    } else {
      let uri = result.uri;
      //step1 -> convert uri --> blob
      const blobFile = await convertURI2BlobFile(uri);
      //step2 --> upload to cloud
      await uploadFile(blobFile);
    }
  };
  const convertURI2BlobFile = async (uri) => {
    const result = await new Promise((resolve, reject) => {
      let xmlRequest = new XMLHttpRequest();
      xmlRequest.onload = function () {
        resolve(xmlRequest.response);
      };
      xmlRequest.onerror = function () {
        console.log("error");
      };
      xmlRequest.responseType = "blob";
      xmlRequest.open("GET", uri, true);
      xmlRequest.send(null);
    });
    return result;
  };
  const uploadFile = async (blobFile) => {
    let imgname = "img-android-" + new Date().getTime();
    //step2
    let storage = getStorage();
    let storageRef = ref(storage, `Image/${imgname}.jpg`);
    let metadata = { contentType: "image/jpeg" };

    const uploadTask = uploadBytesResumable(storageRef, blobFile, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("downloadURL", downloadURL);
          setSelectedImage({ localURI: downloadURL });
        });
      }
    );
  };
  const uploadBase64 = async (base64code) => {
    let imgname = "img-w-" + new Date().getTime();
    //step2
    let storage = getStorage();
    let storageRef = ref(storage, `Image/${imgname}.jpg`);
    let metadata = { contentType: "image/jpeg" };
    uploadString(storageRef, base64code, "base64", metadata).then(
      (snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          console.log("downloadURL", downloadURL);
          setSelectedImage({ localURI: downloadURL });
        });
      }
    );
  };

  return (
    <View style={styles.loginContainer}>
      <ImageBackground
        source={{
          uri: "https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000",
        }}
        resizeMode="cover"
        style={styles.bgContainer}
      >
        {/* <View style={styles.logoLogin}>
          <Ionicons name="cloud-upload-outline" color="#FFF" size={36} />
        </View> */}
        <Text style={styles.signinText}>Thêm sản phẩm</Text>
        <View style={styles.formContainer}>
          {/* <View style={styles.inputContainer}>
            <TextInput
              placeholder="ID danh mục"
              style={styles.inputText}
              onChangeText={(val) => setcateID(val)}
            />
          </View> */}
          {/* check val */}
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Tên sản phẩm"
              style={styles.inputText}
              onChangeText={(val) => setName(val)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Giá tiền"
              style={styles.inputText}
              onChangeText={(val) => setPrice(val)}
            />
          </View>
          <View style={styles.inputContainer}>
            {/* <IonIcons name = 'image' color ='black' size={25} /> */}
            <TextInput
              placeholder="Hình ảnh"
              style={styles.inputText}
              value={selectedImage.localURI}
            />
            </View>
            <TouchableOpacity style={styles.btn} onPress={openImage}>
              <Text style={styles.btnTxt1}>Choose Image</Text>
            </TouchableOpacity>
     
          <TouchableOpacity style={styles.btn} onPress={() => save()}>
            <Text style={styles.btnTxt}>Lưu</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};
export default Create;
const styles = StyleSheet.create({
  loginContainer: {
    backgroundColor:"white",
    flex: 1,
  },
  logoLogin: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  signinText: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginTop: 10,
  
  },
  formContainer: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  inputContainer: {
    width: "70%",
    marginBottom: 10,
  },
  inputText: {
    borderBottomWidth: 2,
    borderBottomColor: "#d81b60",
    paddingVertical: 10,
    color: "black",
    paddingLeft: 15,
  },
  btn: {
    backgroundColor: "#d81b60",
    width: "70%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 50,
  },
  btnTxt: {
    color: "#FFF",
    fontWeight:"bold"
  },
  btnTxt1: {
    color: "#FFF",
    fontWeight:"bold"
  },
  bgContainer: {
    flex: 1,
    alignItems: "center",
    width:"100%"
    
  },
});
