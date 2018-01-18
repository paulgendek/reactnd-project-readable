import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Comments from './Comments'
import * as API from "../app/api";
import * as action from "./actions";
import { humanDate } from '../app/helpers'
import uuid from "uuid/v4";
import Modal from 'react-modal'
import ArrowRightIcon from 'react-icons/lib/fa/arrow-circle-right'
import EditIcon from 'react-icons/lib/fa/pencil-square'
import DeleteIcon from 'react-icons/lib/fa/trash-o'
import CloseIcon from 'react-icons/lib/fa/close'

class PostDetail extends Component {
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
  }

  componentDidMount() {
    const postId = this.props.match.params.id;
    this.props.getPost(postId);
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

  render() {
    const { postModalOpen } = this.state;
    const { categories, post } = this.props;

    if (!post.id || post.deleted) {
      return (
          <div className='post'>
            <h3>404: Page Not Found</h3>
            <p>The post you are looking for may have been deleted.</p>
          </div>
      )
    }

    return (
        <div className='post'>
          <div className='vote-controls'>
            <button className='icon-btn' onClick={() => this.votePost(post.id, 'upVote')}>+</button>
            <button className='icon-btn' onClick={() => this.votePost(post.id, 'downVote')}>-</button>
          </div>
          <h3>{post.title}</h3>

          <p className='post-body'>{post.body}</p>

          <pre>Submitted by <strong>{post.author}</strong> on <em>{humanDate(post.timestamp)}</em> to <Link to={`/${post.category}`}>{post.category}</Link></pre>
          <pre>Votes: {post.voteScore}</pre>

          <button className='icon-btn' onClick={() => this.openModal(post)}>
            <EditIcon size={30}/> EDIT
          </button>

          <button className='icon-btn' onClick={() => this.deletePost(post)}>
            <DeleteIcon size={30}/> DELETE
          </button>

          <Comments />

          <Modal
              className='modal'
              overlayClassName='overlay'
              isOpen={postModalOpen}
              onRequestClose={this.closePostModal}
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
};

function mapStateToProps({categories, post}) {
  return { categories, post }
}

function mapDispatchToProps(dispatch) {
  return {
    getPost: (postId) => {
      API.getPost(postId).then((post) => {
        dispatch(action.getPost(post));
        API.getComments(post.id).then((comments) => {
          dispatch(action.getComments(comments))
        });
      })
    },
    deletePost: (post) => {
      API.deletePost(post.id).then(() => {
        window.location = '/'
      })
    },
    submitPost: (post) => {
      API.submitPost(post).then(() => {
        API.getPost(post.id).then((post) => {
          dispatch(action.getPost(post))
          API.getComments(post.id).then((comments) => {
            dispatch(action.getComments(comments))
          });
        })
      })
    },
    votePost: (postId, option) => {
      API.votePost(postId, option).then((post) => {
        dispatch(action.getPost(post));
        API.getComments(post.id).then((comments) => {
          dispatch(action.getComments(comments))
        });
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)