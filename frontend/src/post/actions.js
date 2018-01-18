export const GET_POST = 'GET_POST';
export const GET_COMMENTS = 'GET_COMMENTS';
export const VOTE_POST = 'VOTE_POST';
export const VOTE_COMMENT = 'VOTE_COMMENT';

export function getPost(post) {
  return {
    type: GET_POST,
    post,
  }
}

export function getComments(comments) {
  return {
    type: GET_COMMENTS,
    comments,
  }
}

export function votePost(post) {
  return {
    type: VOTE_POST,
    post,
  }
}

export function voteComment(comment) {
  return {
    type: VOTE_COMMENT,
    comment,
  }
}