import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useState } from 'react';
import { StyleSheet, View , StatusBar, Alert } from 'react-native';
import { Login, Home } from './pages';
import sendForm from './communication/sendform';
const network = require('./configs/network.json');

async function lockOrientation(){
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
}

async function tryLogin(login){
  const resp = await sendForm(network.url+'login.php', login)
  console.log(resp)
  if(resp.access == 'granted'){
    Alert.alert('Acesso liberado')
    return true
  }else{
    Alert.alert('Acesso negado')
    return false
  }
}

function Page({logged, submit}){
  if(logged)
    return(<Home/>)
  else{
    return(
      <Login 
	onSubmit={
	  async data=>{
	    const logged = await tryLogin(data)
	    submit(logged)
	  }
	}
      />
    )
  }
}

export default function App(){
  const [logged, setLogged] = useState(false)
  lockOrientation()
  return (
    <View>
      <Page 
	logged={logged}
	submit={setLogged}
      />
      <StatusBar style="auto" />
    </View>
  );
}

