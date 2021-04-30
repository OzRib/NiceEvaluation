import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function Button({
    children,
    textStyle,
    style,
    ...props
}){
    return(
        <TouchableOpacity
            {...props}
            style={[styles.button, style]}
        >
            <Text style={[styles.text, textStyle]}>
                {children}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        margin: 10,
        padding: '5%',
        backgroundColor: '#004AAD',
    },
    text:{
        fontSize: 18,
        fontWeight: 'bold'
    },
})