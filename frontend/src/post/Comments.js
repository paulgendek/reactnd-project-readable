import React, { Component } from 'react'
import { connect } from 'react-redux'
import { humanDate } from '../app/helpers'
import * as API from "../app/api";
import * as action from "./actions";
import uuid from "uuid/v4";
import Modal from 'react-modal'
import AddIcon from 'react-icons/lib/fa/plus-circle'
import ArrowRightIcon from 'react-icons/lib/fa/arrow-circle-right'
import EditIcon from 'react-icons/lib/fa/pencil-square'
import DeleteIcon from 'react-icons/lib/fa/trash-o'
import CloseIcon from 'react-icons/lib/fa/close'


class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commentModalOpen: false,
      comment: {
        body: '',
        author: '',
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  voteComment(commentId, option) {
    this.props.voteComment(commentId, option);
  }

  deleteComment(comment) {
    if (!comment.deleted) {
      this.props.deleteComment(comment);
    }
  }

  openModal = (comment) => {
    if (comment) {
      this.setState(() => ({
        comment
      }))
    }
    this.setState(() => ({
      commentModalOpen: true
    }))
  }

  closeModal = () => {
    this.setState(() => ({
      commentModalOpen: false
    }));
  }

  handleChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      comment: {
        ...this.state.comment,
        [name]: value
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const id = uuid();
    const timestamp = Date.now();
    const parentId = this.props.post.id;

    const comment = {
      id,
      parentId,
      timestamp,
      ...this.state.comment,
    }

    this.props.submitComment(comment);

    this.setState(() => ({
      commentModalOpen: false,
      comment: {
        body: '',
        author: '',
      }
    }));
  }

  render() {
    const { commentModalOpen } = this.state;
    const { post } = this.props;

    let count = 0;
    if (post.comments) {
      count = post.comments.length;
    }


    return (
        <div className='comments'>
          <button className='icon-btn add-comment' onClick={this.openModal}>
            <AddIcon size={30}/> ADD A COMMENT
          </button>

          <h4>Comments ({count})</h4>

          <ul className='comment-list'>
            {post.comments && post.comments.map((comment) => (
                <li key={comment.id}>
                  <p className='comment-body'>{comment.body}</p>
                  <pre>Submitted by <strong>{comment.author}</strong> on <em>{humanDate(comment.timestamp)}</em></pre>
                  <div className='vote-controls'>
                    <button className='icon-btn' onClick={() => this.voteComment(comment.id, 'upVote')}>+</button>
                    <button className='icon-btn' onClick={() => this.voteComment(comment.id, 'downVote')}>-</button>
                  </div>
                  <pre>Votes: {comment.voteScore}</pre>
                  <button className='icon-btn' onClick={() => this.openModal(comment)}>
                    <EditIcon size={15}/> EDIT
                  </button>

                  <button className='icon-btn' onClick={() => this.deleteComment(comment)}>
                    <DeleteIcon size={15}/> DELETE
                  </button>
                </li>
            ))}
          </ul>

          <Modal
              className='modal'
              overlayClassName='overlay'
              isOpen={commentModalOpen}
              onRequestClose={this.closeModal}
              contentLabel='Modal'
              appElement={document.getElementById('root')}
          >
            <form className='submit-comment' onSubmit={this.handleSubmit}>
              <input
                  name='body'
                  type='text'
                  placeholder='Body'
                  value={this.state.comment.body}
                  onChange={this.handleChange}
                  required
              />
              <input
                  name='author'
                  type='text'
                  placeholder='Author'
                  value={this.state.comment.author}
                  onChange={this.handleChange}
                  required
              />
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

function mapStateToProps({post}) {
  return { post }
}

function mapDispatchToProps(dispatch) {
  return {
    submitComment: (comment) => {
      API.submitComment(comment).then(() => {
        API.getComments(comment.parentId).then((comments) => {
          dispatch(action.getComments(comments))
        })
      })
    },
    deleteComment: (comment) => {
      API.deleteComment(comment.id).then(() => {
        API.getComments(comment.parentId).then((comments) => {
          dispatch(action.getComments(comments))
        })
      })
    },
    voteComment: (commentId, option) => {
      API.voteComment(commentId, option).then((comment) => {
        API.getComments(comment.parentId).then((comments) => {
          dispatch(action.getComments(comments))
        })
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)