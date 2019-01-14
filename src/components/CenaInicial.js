import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableHighlight,
    Text,
    Image,
    Alert,
    TextInput
} from 'react-native';
import { Actions } from 'react-native-router-flux';

// Nomes de Cidades de seus respectivos IDs na API OpenWeather
const listaCidades = require('../json/cidades-ids.json');

const imgDestaque = require('../imgs/img-destaque.png');

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
                <Image source={imgDestaque} style={styles.imgDestaque} />
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
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgDestaque: {
        width: 380,
        height: 80,
        marginBottom: 100
    },
    textInput: {
        backgroundColor: '#f5f5f5',
        width: 380,
        borderRadius: 10,
        fontSize: 26,
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#fd354a',
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
