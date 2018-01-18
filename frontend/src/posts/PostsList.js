import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostBrief from './PostBrief'
import * as API from "../app/api";
import * as action from "./actions";
import uuid from 'uuid/v4';
import Modal from 'react-modal'
import AddIcon from 'react-icons/lib/fa/plus-circle'
import ArrowRightIcon from 'react-icons/lib/fa/arrow-circle-right'
import CloseIcon from 'react-icons/lib/fa/close'
import EditIcon from 'react-icons/lib/fa/pencil-square'
import DeleteIcon from 'react-icons/lib/fa/trash-o'

class PostsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postModalOpen: false,
      post: {
        title: '',
        body: '',
        author: '',
        category: '',
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  componentDidMount() {
    this.props.getPosts();
  }

  votePost(postId, option) {
    this.props.votePost(postId, option);
  }

  deletePost(post) {
    if (!post.deleted) {
      this.props.deletePost(post);
    }
  }

  openModal = (post) => {
    if (post) {
      this.setState(() => ({
        post
      }))
    }
    this.setState(() => ({
      postModalOpen: true
    }))
  }

  closeModal = () => {
    this.setState(() => ({
      postModalOpen: false
    }));
  }

  handleChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      post: {
        ...this.state.post,
        [name]: value
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const id = uuid();
    const timestamp = Date.now();

    const post = {
      id,
      timestamp,
      ...this.state.post,
    }

    this.props.submitPost(post);

    this.setState(() => ({
      postModalOpen: false,
      post: {
        title: '',
        body: '',
        author: '',
        category: '',
      }
    }));
  }

  handleSort(sortMethod) {
    this.props.sortPosts(sortMethod);
  }

  render() {
    const { postModalOpen } = this.state;
    const { categories, match } = this.props;

    const posts = this.props.posts.filter((post) => {
      if (match.params.category) {
        return post.category === match.params.category;
      } else {
        return true;
      }
    });

    if (posts.length < 1) {
      return (
          <div className='posts'>
            <button className='icon-btn add-post' onClick={this.openModal}>
              <AddIcon size={30}/> SUBMIT POST
            </button>

            <h3>There are no posts.</h3>

            <Modal
                className='modal'
                overlayClassName='overlay'
                isOpen={postModalOpen}
                onRequestClose={this.closeModal}
                contentLabel='Modal'
                appElement={document.getElementById('root')}
            >
              <form className='submit-post' onSubmit={this.handleSubmit}>
                <input
                    name='title'
                    type='text'
                    placeholder='Title'
                    value={this.state.post.title}
                    onChange={this.handleChange}
                    required
                />
                <input
                    name='body'
                    type='text'
                    placeholder='Body'
                    value={this.state.post.body}
                    onChange={this.handleChange}
                    required
                />
                <input
                    name='author'
                    type='text'
                    placeholder='Author'
                    value={this.state.post.author}
                    onChange={this.handleChange}
                    required
                />
                <select
                    name='category'
                    value={this.state.post.category || ''}
                    onChange={this.handleChange}
                    required
                >
                  <option value="" disabled>- Category -</option>
                  {categories.map((category) => (
                      <option key={category.path}>{category.name}</option>
                  ))}
                </select>
                <button className='icon-btn' type='submit'>
                  SUBMIT <ArrowRightIcon size={30} />
                </button>
                <button className='icon-btn' onClick={this.closeModal}>
                  CANCEL <CloseIcon size={30} />
                </button>
              </form>
            </Modal>
          </div>
      )
    }

    return (
        <div className='posts'>
          <button className='icon-btn add-post' onClick={this.openModal}>
            <AddIcon size={30}/> SUBMIT POST
          </button>

          <div className='sort'>
            Sort by:
            <button onClick={() => this.handleSort('voteScore')}>Most Popular</button>
            <button onClick={() => this.handleSort('timestamp')}>Newest</button>
          </div>

          <ul className='post-list'>
            {posts.map((post) => (
                <li key={post.id}>
                  <div className='vote-controls'>
                    <button className='icon-btn' onClick={() => this.votePost(post.id, 'upVote')}>+</button>
                    <button className='icon-btn' onClick={() => this.votePost(post.id, 'downVote')}>-</button>
                  </div>
                  <PostBrief post={post} />
                  <button className='icon-btn' onClick={() => this.openModal(post)}>
                    <EditIcon size={30}/> EDIT
                  </button>

                  <button className='icon-btn' onClick={() => this.deletePost(post)}>
                    <DeleteIcon size={30}/> DELETE
                  </button>
                </li>
            ))}
          </ul>

          <Modal
              className='modal'
              overlayClassName='overlay'
              isOpen={postModalOpen}
              onRequestClose={this.closeModal}
              contentLabel='Modal'
              appElement={document.getElementById('root')}
          >
            <form className='submit-post' onSubmit={this.handleSubmit}>
              <input
                  name='title'
                  type='text'
                  placeholder='Title'
                  value={this.state.post.title}
                  onChange={this.handleChange}
                  required
              />
              <input
                  name='body'
                  type='text'
                  placeholder='Body'
                  value={this.state.post.body}
                  onChange={this.handleChange}
                  required
              />
              <input
                  name='author'
                  type='text'
                  placeholder='Author'
                  value={this.state.post.author}
                  onChange={this.handleChange}
                  required
              />
              <select
                  name='category'
                  value={this.state.post.category || ''}
                  onChange={this.handleChange}
                  required
              >
                <option value="" disabled>- Category -</option>
                {categories.map((category) => (
                    <option key={category.path}>{category.name}</option>
                ))}
              </select>
              <button className='icon-btn' type='submit'>
                SUBMIT <ArrowRightIcon size={30} />
              </button>
              <button className='icon-btn' onClick={this.closeModal}>
                CANCEL <CloseIcon size={30} />
              </button>
            </form>
          </Modal>
        </div>
    );
  }
}

function mapStateToProps({categories, posts}) {
  return { categories, posts }
}

function mapDispatchToProps(dispatch) {
  const getPosts = () => {
    API.getPosts().then((posts) => {
      dispatch(action.getPosts(posts))
    });
  }
  return {
    getPosts: () => {
      getPosts()
    },
    submitPost: (post) => {
      API.submitPost(post).then(() => {
        getPosts()
      })
    },
    deletePost: (post) => {
      API.deletePost(post.id).then(() => {
        getPosts()
      })
    },
    sortPosts: (sortMethod) => {
      dispatch(action.sortPosts(sortMethod))
    },
    votePost: (postId, option) => {
      API.votePost(postId, option).then((post) => {
        getPosts()
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList)