import React, { Component } from 'react';
import { Top } from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { 
    View, 
    Button, 
    Text, 
    TextInput, 
    StyleSheet, 
    TouchableWithoutFeedback,
    TouchableOpacity,
    Keyboard, 
    BackHandler, 
    StatusBar ,
} from 'react-native';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',

    },
    texto: {
        fontSize: 20,
        fontWeight: 'bold',
        fontSize: 50,
        textAlign: 'left',
        color: '#000',
        marginLeft: 20,
    },
    digiteValor: {
        fontStyle: 'italic',
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#C0C0C0',
        marginLeft: 20,
        marginRight: 20,
        lineHeight: 50,
        paddingTop: 2,
    },
});

export default class Main extends Component {
    state = {
        response: ''
    };

    saveValue = async () => {
        const value = this.state.value;
        const response = await fetch('http://localhost:9000/values', value)
    }

    Saindo = () => {
        BackHandler.exitApp();
    };

    render() {
        return (
            <DismissKeyboard>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    backgroundColor: '#FFFFFF',
                    justifyContent: 'center',
                }}>
                    <StatusBar barStyle="light-content" backgroundColor="#FF1493" />
                    <Top>
                        <Icon name="arrow-back" size={35} color="#000000" onPress={this.Saindo} />
                    </Top>

                    <View style={styles.container}>
                        <Text style={styles.texto}>Quanto você gostaria de juntar?</Text>
                        <TextInput 
                            style={styles.digiteValor} 
                            placeholder="Digite aqui" 
                            onChangeText={(value) => { this.setState({ value }) }}
                            keyboardType={"numbers-and-punctuation"}
                            />
                    </View>
                    <TouchableOpacity style={{height: 50, backgroundColor: "#42426F", justifyContent: "center"}}>
                        <Text
                            style={{
                                fontWeight:'bold',
                                color: "#FFF",
                                textAlign: "center"
                            }}
                            onChangeText={this.saveValue}
                        >
                            CONTINUAR
                        </Text>
                    </TouchableOpacity>
                    
                </View>
            </DismissKeyboard>
        );
    };
};


//<Button color="#42426F" title="CONTINUAR" onPress={this.saveValue} style={styles.botaoConfirmar}/>