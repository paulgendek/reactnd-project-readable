import React, { Component } from 'react'
import * as API from './api'
import { Switch, Route, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as action from '../categories/actions'
import PostsList from '../posts/PostsList'
import PostDetail from '../post/PostDetail'
import CategoryList from '../categories/CategoryList';

class App extends Component {
  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    const { categories } = this.props;

    return (
      <div className='container'>
        <h1><Link to="/">Readable</Link></h1>
        <CategoryList categories={categories} />

        <Switch>
          <Route path="/" exact component={PostsList} />
          <Route path="/:category" exact component={PostsList} />
          <Route path="/:category/:id" exact component={PostDetail} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps({categories, posts, post}) {
  return { categories, posts, post }
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