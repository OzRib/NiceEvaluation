import * as ScreenOrientation from 'expo-screen-orientation';
import React from 'react';
import { StyleSheet, View , StatusBar, Alert } from 'react-native';
import Login from './pages/login';
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
  if(resp.access == 'granted')
    Alert.alert('Acesso liberado')
  else
    Alert.alert('Acesso negado')
}

export default function App() {
  lockOrientation()
  return (
    <View style={styles.container}>
      <Login
        onSubmit={
          submit => {
            tryLogin(submit)
          }
        }
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
