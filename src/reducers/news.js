import {
    FETCH_TOP_NEWS,
    FETCH_RECENT_NEWS,
    UPVOTE_NEWS,
    HIDE_NEWS,
} from '../actions';
import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_TOP_NEWS:
        case FETCH_RECENT_NEWS:
            const payload = action.payload;
            const currentNewsItems = _.get(payload, 'hits', []);
            payload.hasMore = currentNewsItems.length !== 0;

            if (payload.page !== 0) {
                const previousNewsItems = _.get(state, 'hits', []);
                payload.hits = [...previousNewsItems, ...currentNewsItems];
            }

            // refresh news list based on hidden list
            payload.hits = visibleNews(payload.hits)
            payload.type = action.type;

            return payload;
        case UPVOTE_NEWS:
            const newsItem = state.hits.find(newsItem => newsItem.objectID === action.payload);
            if (newsItem) newsItem.points++;
            return { ...state };
        case HIDE_NEWS:
            // append hidden news id
            const news = JSON.parse(localStorage.getItem("news.hide")) || [];
            news.push(action.payload);
            localStorage.setItem("news.hide", JSON.stringify(news));
            // refresh news list based on hidden list
            const responseState = { ...state };
            responseState.hits = visibleNews(responseState.hits);
            return responseState;
        default:
            return state;
    }
};

const visibleNews = (newsItems) => {
    if (typeof (Storage) !== "undefined") {
        const hiddenNews = JSON.parse(localStorage.getItem("news.hide")) || [];
        if (hiddenNews && hiddenNews.length) {
            return newsItems.filter(newsItem => !hiddenNews.includes(newsItem.objectID));
        }
    }
    return newsItems;
}
