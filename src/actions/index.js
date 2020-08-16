//import history from '../history';
import  {getValueFromLocalStorage, setValueInLocalStorage }  from '../localstorageUtils'

export const FETCH_TOP_NEWS = 'FETCH_TOP_NEWS';
export const fetchTopNews = (page = 0) => async dispatch => {
    const response = await fetch("https://hn.algolia.com/api/v1/search?tags=front_page&page=" + page);
    const responseJson = await response.json();
    updateVoteList(responseJson);
    dispatch({
        type: FETCH_TOP_NEWS,
        payload: responseJson,
    })
  //  history.push(`/${responseJson.page+1}`)
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
export const upvoteNews = (newsId, newsPoint) => async dispatch => {
    setUpVoteInLocalStorage(newsId, ++newsPoint);    
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


const setUpVoteInLocalStorage = (newsId, newsPoint) => {
    console.log(1, newsPoint);
    let upvoteList = getValueFromLocalStorage('UP_VOTE_LIST');
    const newVote = {
        newsPoint: newsPoint,
        newsId
    };
        upvoteList = JSON.parse(upvoteList);
       if(upvoteList){
        const newsItem = upvoteList.find((vote) => vote.newsId === newsId);
         if(newsItem) {
           newsItem.newsPoint = newsPoint;
          } else {
            upvoteList.push(newVote);
          }
        }
         else {
          upvoteList = [];
          upvoteList.push(newVote);
        } 

    setValueInLocalStorage('UP_VOTE_LIST', JSON.stringify(upvoteList));

}

const updateVoteList = (responseJson) => {
    let upvoteList = getValueFromLocalStorage('UP_VOTE_LIST');

    if(upvoteList) {
        upvoteList = JSON.parse(upvoteList);

        upvoteList.forEach((vote) => {
            const newsItem = responseJson.hits.find(newsItem => newsItem.objectID === vote.newsId);
            newsItem.points = vote.newsPoint;
        });
    }
   
}

