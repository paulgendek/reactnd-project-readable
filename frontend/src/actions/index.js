export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_POSTS = 'GET_POSTS';
export const GET_POST = 'GET_POST';
export const GET_COMMENTS = 'GET_COMMENTS';
export const SORT_POSTS = 'SORT_POSTS';
export const VOTE_POST = 'VOTE_POST';
export const VOTE_COMMENT = 'VOTE_COMMENT';

export function getCategories(categories) {
  return {
    type: GET_CATEGORIES,
    categories,
  }
}

export function getPosts(posts) {
  return {
    type: GET_POSTS,
    posts,
  }
}

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

export function sortPosts(sortMethod) {
  return {
    type: SORT_POSTS,
    sortMethod,
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