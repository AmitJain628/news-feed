import Home, { preloadData } from '../components/Home';

export default [
    {
        path: '/',
        exact: true,
        component: Home,
        preloadData,
    }
];
