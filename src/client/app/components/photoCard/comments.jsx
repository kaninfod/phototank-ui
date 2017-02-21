import React from 'react';
import {Header} from './header.jsx'

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = {
    }
  }

  handleKeyDown(e) {
    if (e.which == 13 && e.target.value.length > 0) {

      this.props.widgetHandlers.COMMENTS(e.target.value)
      e.target.value = ''
    }
  }

  render() {
    const comments = this.props.cardData.photo.comments
    const avatar = this.props.cardData.current_user.avatar.concat('?token=', localStorage.authKey)
    return (
      <div className="pt-widget">
        <Header handleClose={this.props.widgetHandlers.HIDE} title="Add comments to Photo"/>
        <div className="pt-widget content">
          <div className="pt-comments">
            <div className="comment">
              <div className="comment-container">
                <div className="card">
                  <p className="comment-date"></p>
                  <input onKeyDown={this.handleKeyDown}/>
                </div>
                <img className="circle responsive-img" src={avatar}/>
              </div>
            </div>

            {comments.slice().reverse().map(comment.bind(this))}

          </div>
        </div>
      </div>
    )
  }
}

var comment = function(comment){
  const avatar = comment.user_avatar.concat('?token=', localStorage.authKey)
  return (
    <div className="comment" key={comment.id}>
      <div className="comment-container">
        <div className="card">
          <p className="comment-date">{comment.created_at}</p>
          <p>{comment.comment}</p>
        </div>
        <img className="circle responsive-img" src={avatar}/>
      </div>
    </div>
  )
}
