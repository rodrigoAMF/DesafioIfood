import React, { Component } from 'react';
import { Text } from 'react-native';

import axios from 'axios';

export default class SobreJogo extends Component {
	render() {
		return (
			<Text>
                {this.props.cidade}
			</Text>
		);
	}
}
