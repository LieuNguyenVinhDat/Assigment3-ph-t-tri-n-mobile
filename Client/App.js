
import { StyleSheet, Text, View } from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack'

import PageManage from './views/PageManage';
import { Provider } from 'react-redux';
import store from './Redux/Stores/Store';
import ListItemView from './views/ListItemView'
import ImagePickerDemo from './views/ImagePickerDemo';

export default function App() {
  return (
    
    <Provider store={store}>
      <PageManage/>
      {/* <ImagePickerDemo/> */}
     </Provider>

   );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    
  },
});
