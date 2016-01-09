import { createReducer } from 'cuz';

const FETCH_POSTS = 'fetch posts';

export function fetchPosts() {
  return {
    type: FETCH_POSTS,
    promise: (request) => request.get(`/articles?$top=50&$select=title, meta.author, date&$orderby=date desc`)
  };
}

const initState = {
  posts: [],
}

export default createReducer(initState, {
  [FETCH_POSTS](state, action) {
    return {
      ...state,
      posts: action.result.value,
    }
  }
});

