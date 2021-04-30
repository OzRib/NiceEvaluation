import * as ScreenOrientation from 'expo-screen-orientation';
import React from 'react';
import { StyleSheet, Text, View , StatusBar } from 'react-native';
import Login from './pages/login';

async function lockOrientation(){
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
}

export default function App() {
  lockOrientation()
  return (
    <View style={styles.container}>
      <Login/>
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
