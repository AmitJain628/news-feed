import React from 'react';
import { renderRoutes } from 'react-router-config';

import Nav from '../Nav';
import Routes from '../../routes';

const App = () => (
    <React.Fragment>
        <Nav />
        {renderRoutes(Routes)}
    </React.Fragment>
);

export default App;
