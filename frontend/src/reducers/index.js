import { combineReducers } from 'redux'
import sortBy from 'sort-by'

import {
  GET_CATEGORIES,
  GET_POSTS,
  GET_POST,
  GET_COMMENTS,
  SORT_POSTS,
  VOTE_POST,
  VOTE_COMMENT,
} from "../actions"

function categories(state = [], action) {
  switch (action.type) {
    case GET_CATEGORIES:
      const { categories } = action;
      return [
        ...categories
      ]
    default:
      return state
  }
}

function posts(state = [], action) {
  switch (action.type) {
    case GET_POSTS:
      const { posts } = action;
      return [
        ...posts
      ]
    case SORT_POSTS:
      const { sortMethod } = action;
      return [
        ...state.sort(sortBy(sortMethod)).reverse()
      ]
    default:
      return state
  }
}

function post(state = {}, action) {
  switch (action.type) {
    case VOTE_COMMENT:
    case VOTE_POST:
    case GET_POST:
      const { post } = action;
      return {
        ...post
      }
    case GET_COMMENTS:
      const { comments } = action;
      return {
        ...state,
        comments
      }
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  post,
})