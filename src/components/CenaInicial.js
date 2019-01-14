import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableHighlight,
    Text,
    Alert,
    TextInput
} from 'react-native';
import { Actions } from 'react-native-router-flux';

// Nomes de Cidades de seus respectivos IDs na API OpenWeather
const listaCidades = require('../json/cidades_ids.json');

export default class SobreJogo extends Component {
    constructor(props) {
		super(props);

        // Cria um state para guardar o nome da cidade digitado pelo usuário
        this.state = { cidade: '' };
	}

    /*
        Função chamada ao clicar no botão "Continuar"
        Verifica se cidade digitada existe:
        Caso exista passa o ID para próxima cena (CenaRecomendacao)
        Caso não exista retorna um alerta "Cidade não encontrada!"
    */
    enviarDados = () => {
        let cidade = this.state.cidade.toLowerCase();
        let id;

        /*
            Caso não encontre a cidade em "listaCidades[cidade]" o programa
            retorna um exception. Isso é tratado usando um try catch
        */
        try {
            id = listaCidades[cidade].id.toString();
        } catch (e) {
            /*
                Substitui os cedilhas do nome da cidade e busca novamente.
                Isso é necessário pois algumas cidades na API possuem o "ç"
                e outras não.
            */
            cidade = cidade.replace('ç', 'c');

            // Procura pelo ID da cidade novamente
            try {
                id = listaCidades[cidade].id.toString();
            } catch (ex) {
                Alert.alert('Cidade não encontrada!');
                return;
            }
        }

        // Chama a próxima cena (CenaRecomendacao)
        Actions.recomendacao({ cidade: id });
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
