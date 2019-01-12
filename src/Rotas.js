import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import CenaInicial from './components/CenaInicial';
import CenaRecomendacao from './components/CenaRecomendacao';

const Rotas = () => (
    <Router>
        <Scene key='app'>
            <Scene key='principal' component={CenaInicial} initil hideNavBar />
            <Scene key='sobrejogo' component={CenaRecomendacao} title="{cidade}" />
        </Scene>
    </Router>
);

export default Rotas;
