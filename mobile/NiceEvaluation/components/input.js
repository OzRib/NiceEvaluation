import React from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';

export default function Input({
    textStyle, 
    children,
    inputStyle,
    ...props
}){
    return(
        <>
            <Text style={[styles.text, textStyle]}>
                {children}
            </Text>
            <TextInput
                {...props}
                style={[styles.input, inputStyle]}
            />
        </>
    )
}

const styles = StyleSheet.create({
    input:{
        fontSize: 17,
        height: 40,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        borderRadius: 20,
        width: '65%',
        borderColor: '#0000003F',
        borderWidth: 1         
    },
    text: {
        fontSize: 20,
        marginVertical: 8,
    }
})