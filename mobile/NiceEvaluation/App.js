//Imports and initiation variables
import 'react-native-gesture-handler';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useState } from 'react';
import { StyleSheet, View , StatusBar, Alert } from 'react-native';
import { Login, Home } from './pages';
import sendForm from './communication/sendform';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator()
const network = require('./configs/network.json');

async function lockOrientation(){
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
}

async function tryLogin(login){
  const resp = await sendForm(network.url+'login.php', login)
  console.log(resp)
  return resp
}

//App
export default function App(){
  lockOrientation()
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" mode="modal">
	<Stack.Screen 
	  name="Login"
	  options={{
	    headerShown: false
	  }}
	>
	  {
	    ({navigation})=>(
	      <Login
		onSubmit={
		  async data =>{
		    const resp = await tryLogin(data)
		    if(resp.access == 'granted')
		      navigation.navigate('Home')
		    if(resp.error){
		     return({
			error: resp.error,
			showError: true
		      })
		    }else{
		      return({
			error: null,
			showError: false
		      })
		    }
		  }
		}
	      />
	    )
	  }
	</Stack.Screen>
	<Stack.Screen name="Home" component={Home}/>
      </Stack.Navigator>
      <StatusBar barStyle="auto"/>
    </NavigationContainer>
  );
}

