import React, { useState } from 'react';
import { View, Text } from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
const bootstrap = new BootstrapStyleSheet();
const { s, c } = bootstrap;

export default function AlertError({
  show,
  error,
  style,
  onShow
}){
  if(show==true){
    onShow() || null
    return(
      <View style={[s.alert, s.alertDanger, style]}>
	<Text style={[s.alertText, s.alertTextDanger]}>
	  {error||null}
	</Text>
      </View>
    )
  }else{
    return(null)
  }
}
