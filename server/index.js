import 'isomorphic-unfetch';
import express from 'express';
import serverRenderer from './middleware/renderer';

const PORT = 8080;
const path = require('path');

// Initialize the application and create the router
const app = express();
const router = express.Router();

// Root (/) should always serve our server rendered page
router.use('^/$', serverRenderer);

// Other static resources should just be served as they are
router.use(express.static(
    path.resolve(__dirname, '..', 'build'),
    { maxAge: '30d' },
));

// Since this application uses react-router
// Anything else should act as our index page
// React-router will take care of everything
router.use('*', serverRenderer);

// Configure the app to use the above router rules
app.use(router);

// Start the app
app.listen(PORT, (error) => {
    if (error) {
        return console.log('Failed to start application', error);
    }
    console.log(`Server is listening on ${PORT}...`);
});
