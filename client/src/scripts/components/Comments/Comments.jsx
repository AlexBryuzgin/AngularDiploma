import React from 'react';
import classnames from 'classnames';

import Button from './../../ui/Button';

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
          <span className="user__name">{`#${comment.user_id}`}</span>
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
    })
  }
  buttonNewComment() {
    this.setState({
      ...this.state,
      showNewArea: true,
    });
    console.log('New Comment');
  }
  buttonSubmitComment() { console.log('Submit comment') }
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
            onChange={() => {}}
            onKeyDown={() => {}}
            className={classnames({
              new__textarea: this.state.showNewArea,
              new__textarea_closed: !this.state.showNewArea,
            })}
          />
          <Button
            type='button'
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