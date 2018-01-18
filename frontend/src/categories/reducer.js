import {GET_CATEGORIES} from "./actions";

export function categories(state = [], action) {
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