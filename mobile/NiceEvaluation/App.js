//Imports and initiation variables
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
  return resp
}

//Page rendered in app
function Page({logged, submit}){
  if(logged)
    return(<Home/>)
  else{
    return(
      <Login 
	onSubmit={
	  async data=>{
	    const resp = await tryLogin(data)
	    submit(resp.access == 'granted')
	    if(resp.error){
	      return({
		error: resp.error,
		showError:true
	      })
	    }else{
	      return null
	    }
	  }
	}
      />
    )
  }
}

//App
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

