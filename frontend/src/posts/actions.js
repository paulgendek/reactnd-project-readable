export const GET_POSTS = 'GET_POSTS';
export const SORT_POSTS = 'SORT_POSTS';

export function getPosts(posts) {
  return {
    type: GET_POSTS,
    posts,
  }
}

export function sortPosts(sortMethod) {
  return {
    type: SORT_POSTS,
    sortMethod,
  }
}