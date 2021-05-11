//Imports and initiation variables 
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input, Button, AlertError } from '../components';

export default class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            id: null,
            senha: null,
	    showError: false,
	    error: null
        }
    }
    async onRender(){
      if(this.props.onRender)
	this.setState(this.props.onRender(this.state))
    }
    render(){
	this.onRender()
        return(
            <View style={styles.container}>
                <Text style={[styles.title, styles.header]}>NiceEvaluation</Text>
                <Text style={[styles.title, styles.topic]}>Login</Text>
                <Input
                    textStyle={styles.text}
                    placeholder='Nome de usuário ou Email'
                    onChangeText={
                        value =>{
                            this.setState({id:value})
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
                        async ()=>{
			  if(this.props.onSubmit)
                            this.setState(
			      await this.props.onSubmit(this.state)
			    )
			  console.log(this.state)
                        }
                    }
                >
                    Entrar
                </Button>
		<AlertError
		  show={this.state.showError}
		  onShow={
		    ()=>{
		      setTimeout(()=>{
			this.setState({showError:false})
			console.log(this.state)
		      }, 2500)
		    }  
		  }
		  error={this.state.error}
		/>
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
