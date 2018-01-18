import {
  GET_POST,
  GET_COMMENTS,
  VOTE_POST,
  VOTE_COMMENT,
} from "./actions"

export function post(state = {}, action) {
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