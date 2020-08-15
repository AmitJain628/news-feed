import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import {
    fetchTopNews,
    fetchRecentNews,
    upvoteNews,
    hideNews,
    FETCH_RECENT_NEWS
} from '../../actions';
import Loader from '../Loader';

import './index.css';

const Home = ({ news, fetchTopNews, fetchRecentNews, upvoteNews, hideNews }) => {

    useEffect(() => {
        news.type === FETCH_RECENT_NEWS ? fetchRecentNews() : fetchTopNews();
    }, [news.type, fetchTopNews, fetchRecentNews]);

    function loadMore() {
        const page = news.page + 1;
        news.type === FETCH_RECENT_NEWS ? fetchRecentNews(page) : fetchTopNews(page);
    };

    return (
        <main>
            {news && news.hits ? renderNews(news, { upvoteNews, hideNews }) : <Loader />}
            {news && news.hasMore && renderLoadMore(loadMore)}
        </main>
    );
};

const renderNews = (news, actions) => {
    const newsItems = _.get(news, 'hits', []);
    return (
        <React.Fragment>
            {newsItems.map((newsItem, index) => renderNewsItem(newsItem, index, actions))}
        </React.Fragment>
    );
};

const renderNewsItem = (newsItem, index, actions) => {
    const clazz = index % 2 === 0 ? "grid-container" : "grid-container grid-container-dark";
    return (
        <div className={clazz} key={index}>
            <div className="grid-item">
                {newsItem.points}
                <span onClick={() => actions.upvoteNews(newsItem.objectID)}>
                    <img alt="upvote" src="/arrow.png" width="10px" style={{ marginLeft: "5px" }} />
                </span>
            </div>
            <div className="grid-item">
                <a href={newsItem.url} target="_blank" rel="noopener noreferrer">
                    <span className="text-title">{newsItem.title}</span>
                    <span className="news-text-grey">({newsItem.url})</span>
                    <span className="news-author"><span className="news-text-grey">by</span>{newsItem.author}</span>
                </a>
            </div>
            <div className="grid-item">
                <span onClick={() => actions.hideNews(newsItem.objectID)}>[hide]</span>
            </div>
        </div>
    );
}

const renderLoadMore = (callback) => (
    <div className="load-more">
        <button onClick={callback}>Load More</button>
    </div>
);

const mapStateToProps = state => ({ news: state.news });

const preloadData = store => store.dispatch(fetchTopNews());

export { preloadData };
export default connect(mapStateToProps, { fetchTopNews, fetchRecentNews, upvoteNews, hideNews })(Home);
