import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { matchRoutes } from 'react-router-config';

// Redux store
import createStore from '../store';

// Import Routes
import Routes from '../../src/routes';
import App from '../../src/components/App';

const path = require("path");
const fs = require("fs");

export default (req, res, next) => {

    // Point to the html file created by CRA's build tool
    const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');

    fs.readFile(filePath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('err', err);
            return res.status(404).end();
        }

        // Create redux store
        const store = createStore();

        // Make network calls to fetch data required by component
        const promises = matchRoutes(Routes, req.path)
            .map(({ route }) => route.preloadData ? route.preloadData(store) : null);

        Promise.all(promises)
            .then(() => sendResponse(req, res, htmlData, store))
            .catch(() => sendResponse(req, res, htmlData, store));
    });
}

const sendResponse = (req, res, htmlData, store) => {
    const context = {};
    const html = ReactDOMServer.renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
                <App />
            </StaticRouter>
        </Provider>
    );

    if (context.url) {
        res.writeHead(301, {
            Location: context.url
        });
        return res.end();
    } else {
        return res.send(
            htmlData.replace(
                '<div id="root"></div>',
                `<div id="root">${html}</div>`
            )
        );
    }
}
