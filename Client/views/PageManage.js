import React from 'react';
import { Text, View,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListItemView from './ListItemView';
import Create from './Create';
import Edit from './Edit';
const Stack=createNativeStackNavigator();
const PageManage = ({
    params,
}) =>  {
    return (
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen options={{headerShown:false}}name='ViewAll'  component={ListItemView}/>
                <Stack.Screen name='Create' component={Create}/>
                <Stack.Screen name='Edit' component={Edit}/>

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default PageManage;
const styles = StyleSheet.create({
    
});