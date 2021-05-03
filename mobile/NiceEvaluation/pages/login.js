import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Input from '../components/input';
import Button from '../components/button';

export default class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            nome: null,
            senha: null
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={[styles.title, styles.header]}>NiceEvaluation</Text>
                <Text style={[styles.title, styles.topic]}>Login</Text>
                <Input
                    textStyle={styles.text}
                    placeholder='Nome de usuário ou Email'                    
                    onChangeText={
                        value =>{
                            this.setState({nome:value})
                        }
                    }
                >
                    Nome de usuário/Email
                </Input>
                <Input
                    textStyle={styles.text}
                    placeholder='Senha'
                    secureTextEntry={true}
                    onChangeText={
                        value =>{
                            this.setState({senha:value})
                        }
                    }
                >
                    Senha
                </Input>
                <Button
                    style={{
                        borderRadius: 20
                    }}
                    textStyle={styles.text}
                    onPress={
                        ()=>{
                            this.props.onSubmit(this.state) || null
                        }
                    }
                >
                    Entrar
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        color: 'white',
        backgroundColor: '#0A053D',
        paddingTop: '25%',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    title:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
    },
    header:{
        fontStyle: 'italic',
        marginBottom: '10%'
    },
    topic:{
        fontSize: 26,
        marginBottom: '5%',
    },
    text: {
        color: 'white',
    },
})
