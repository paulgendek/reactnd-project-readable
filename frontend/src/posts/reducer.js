import {GET_POSTS, SORT_POSTS} from "./actions";
import sortBy from "sort-by";

export function posts(state = [], action) {
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