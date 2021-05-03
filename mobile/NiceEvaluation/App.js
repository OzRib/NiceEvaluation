import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useState } from 'react';
import { StyleSheet, View , StatusBar, Alert } from 'react-native';
import Login from './pages/login';
import Home from './pages/home';
const network = require('./configs/network.json');

async function lockOrientation(){
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
}

function sendLogin(login){
  return new Promise((resolve, reject)=>{
    let request = '';
    for(const key in login){
      request+= key+'='+login[key]+'&'
    }
    fetch(network.uri, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: request
    }).then(resp=>resp.json()).then(resp=>{
      resolve(resp)
    }).catch(()=>{
      reject('error fetch')
    })
  })
}

async function tryLogin(login){
  const resp = await sendLogin(login)
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

