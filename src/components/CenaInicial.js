import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableHighlight,
    Text,
    TextInput
} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class SobreJogo extends Component {
    state = { cidade: '' }

    enviarDados = () => {
        const cidade = this.state.cidade;
        Actions.recomendacao({ cidade });
    };

    render() {
		return (
            <View style={styles.cena}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(value) => this.setState({ cidade: value })}
                    value={this.state.cidade}
                    placeholder="Em qual cidade estou?"
                    onSubmitEditing={this.enviarDados}
                />
                <TouchableHighlight
                     style={styles.button}
                     onPress={this.enviarDados}
                     accessibilityLabel="Confirmar cidade e seguir para próxima tela"
                >
                     <Text style={styles.buttonText}>Continuar</Text>
                </TouchableHighlight>
            </View>
		);
	}
}

const styles = StyleSheet.create({
    cena: {
        backgroundColor: '#FFF',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        fontSize: 32,
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#178AFF',
        marginTop: 20,
        height: 50,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 20,
        color: '#FFF'
    }
});
