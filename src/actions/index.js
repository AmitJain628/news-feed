export const FETCH_TOP_NEWS = 'FETCH_TOP_NEWS';
export const fetchTopNews = (page = 0) => async dispatch => {
    const response = await fetch("https://hn.algolia.com/api/v1/search?tags=front_page&page=" + page);
    const responseJson = await response.json();
    dispatch({
        type: FETCH_TOP_NEWS,
        payload: responseJson,
    })
};

export const FETCH_RECENT_NEWS = 'FETCH_RECENT_NEWS';
export const fetchRecentNews = (page = 0) => async dispatch => {
    const response = await fetch("https://hn.algolia.com/api/v1/search_by_date?tags=front_page&page=" + page);
    const responseJson = await response.json();
    dispatch({
        type: FETCH_RECENT_NEWS,
        payload: responseJson,
    })
};

export const UPVOTE_NEWS = 'UPVOTE_NEWS';
export const upvoteNews = (newsId) => async dispatch => {
    dispatch({
        type: UPVOTE_NEWS,
        payload: newsId,
    });
};

export const HIDE_NEWS = 'HIDE_NEWS';
export const hideNews = (newsId) => async dispatch => {
    dispatch({
        type: HIDE_NEWS,
        payload: newsId,
    });
};
