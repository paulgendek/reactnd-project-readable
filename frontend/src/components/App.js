import React, { Component } from 'react'
import * as API from '../utils/api'
import { Switch, Route, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as action from '../actions'
import PostsList from './PostsList'
import PostDetail from './PostDetail'

class App extends Component {
  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    const { categories } = this.props;

    return (
      <div className='container'>
        <h1><Link to="/">Readable</Link></h1>
        <div className='categories'>
          <ul>
            {categories.map((category) => (
                <li key={category.name}><Link to={`/${category.path}`}>{category.name}</Link></li>
            ))}
          </ul>
        </div>

        <Switch>
          <Route path="/" exact component={PostsList} />
          <Route path="/:category" exact component={PostsList} />
          <Route path="/:category/:id" exact component={PostDetail} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
    posts: state.posts,
    post: state.post,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => {
      API.getCategories().then((categories) => {
        dispatch(action.getCategories(categories))
      });
    },
  }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(App)
);