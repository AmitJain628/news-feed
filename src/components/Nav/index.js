import React from 'react';
import { connect } from 'react-redux';
import { fetchTopNews, fetchRecentNews } from '../../actions';

import './index.css';

const onClick = (action) => {
    try {
        action();
    } catch (err) {
        console.log('error fetching news', err);
    }
}

const Nav = ({ fetchTopNews, fetchRecentNews }) => {
    return (
        <nav className="nav">
            <span className="logo"></span>
            <span onClick={() => onClick(fetchTopNews)}>top</span>
            <span>|</span>
            <span onClick={() => onClick(fetchRecentNews)}>new</span>
        </nav>
    );
};

export default connect(null, { fetchTopNews, fetchRecentNews })(Nav);
