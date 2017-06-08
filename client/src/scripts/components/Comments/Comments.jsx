import React from 'react';
import classnames from 'classnames';

import Button from './../../ui/Button';
import Icon from './../../ui/Icon';

import './comments.scss';

export default class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: props.comments || [],
      showNewArea: false,
    };
    this.renderComments = this.renderComments.bind(this);
    this.onTextareaChange = this.onTextareaChange.bind(this);
    this.buttonActionHandler = this.buttonActionHandler.bind(this);
  }

  renderComments() {
    return this.state.comments.map((comment, i) => {
      return (<div className="all__comment" key={comment.id}>
        <div className="comment__user">
          <span className="user__name">{`Пользователь #${comment.user_id}`}</span>
        </div>
        <div className="comment__likes">
          <Icon icon={comment.liked ? 'heart' : 'heart-o'} className="likes__like" />
          <span className="likes__amount">
            {comment.likes}
          </span>
        </div>
        <p className="comment__text">{comment.text}</p>
      </div>)
    })
  }
  onTextareaChange(e) {
    const { value, name } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    }, () => console.log(this.state));
  }
  buttonNewComment() {
    this.setState({
      ...this.state,
      showNewArea: true,
    });
    console.log('New Comment');
  }
  buttonSubmitComment() {
    this.setState({
      ...this.state,
      comments: [ ...this.state.comments, {
        id: this.state.comments.length+1,
        user_id: 2,
        text: this.state.commentText,
        likes: 0,
      }],
      showNewArea: false,
      commentText: '',
    })
  }
  buttonActionHandler() {
    this.state.showNewArea
      ? this.buttonSubmitComment()
      : this.buttonNewComment()
  }
  render() {
    return (
      <div className="comments">
        <div className="comments__all">
          {this.renderComments()}
        </div>
        <div className="comments__new">
          <textarea
            name="commentText"
            value={this.state.commentText}
            onChange={this.onTextareaChange}
            onKeyDown={() => {}}
            className={classnames('new__textarea', {
              new__textarea_closed: !this.state.showNewArea,
            })}
          />
          <Button
            type='button'
            className='comments__button'
            onClick={this.buttonActionHandler}
            primary
            transparent={!this.state.showNewArea}
          >
            {this.state.showNewArea ? 'Отправить комментарий' : 'Оставить новый комментарий'}
          </Button>
        </div>
      </div>
    )
  }
}