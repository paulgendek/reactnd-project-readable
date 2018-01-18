import { combineReducers } from 'redux'
import { categories } from '../categories/reducer'
import { posts } from '../posts/reducer'
import { post } from '../post/reducer'

export default combineReducers({
  categories,
  posts,
  post,
})