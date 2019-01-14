import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Image,
	Text,
	Alert
 } from 'react-native';
import axios from 'axios';

const apiKey = 'c0544f1f7b891a6e5b4e5c2d1e2140b3';
const loadingGIF = require('../imgs/loading-icon.gif');
const imgSorvete = require('../imgs/sorvete.png');
const imgPizza = require('../imgs/pizza.png');

export default class CenaRecomendacao extends Component {
	constructor(props) {
		super(props);

		this.state = { informacoesClima: -1.0 };
	}

	componentWillMount() {
		const url = 'https://api.openweathermap.org/data/2.5/weather?id=' + this.props.id + '&appid=' + apiKey;

		axios.get(url)
			.then(response => { this.setState({ informacoesClima: response.data.weather[0].id }); })
			.catch(() => { Alert.alert('Erro ao recuperar os dados'); });
	}

	render() {
		return (
			<View style={styles.cena}>
				{this.state.informacoesClima === -1.0 ?
					<Image style={styles.loadingGIF} source={loadingGIF} />
					:
					<View
						style={styles.imgRecomendacao}
					>
						<Image
							style={styles.imgRecomendacao}
							source={this.state.informacoesClima < 600.0 ?
							imgPizza : imgSorvete}
						/>
						<Text
							style={styles.textoRecomendacao}
						>{this.state.informacoesClima < 600.0 ? 'Pizza' : 'Sorvete'}</Text>
					</View>
				}
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
	itemRecomendacao: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	loadingGIF: {
		width: 200,
		height: 300
	},
	imgRecomendacao: {
		width: 360,
		height: 300
	},
	textoRecomendacao: {
		marginTop: 20,
		fontSize: 36,
		textAlign: 'center',
		color: '#000'
	}
});
