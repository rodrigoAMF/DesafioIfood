import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import CenaInicial from './components/CenaInicial';
import CenaRecomendacao from './components/CenaRecomendacao';

const Rotas = () => (
    <Router>
        <Scene key='app'>
            <Scene key='inicio' component={CenaInicial} initil hideNavBar />
            <Scene key='recomendacao' component={CenaRecomendacao} title="Nossa recomendação" />
        </Scene>
    </Router>
);

export default Rotas;
