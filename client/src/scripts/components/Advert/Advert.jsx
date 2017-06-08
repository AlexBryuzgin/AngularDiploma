import React, { Component } from 'react';
import classnames from 'classnames';
import Icon from './../../ui/Icon';
import './advert.scss';

export default class Advert extends Component {
  
  render() {
    const { data } = this.props;
    return (
      <div className={classnames('advert', {
        advert_vertical: !this.props.horizontal,
        advert_horizontal: this.props.horizontal,
        advert_auction: this.props.data.isAuction,
      }, this.props.className)} onClick={this.props.onClick}>
        <div className="advert__image">
          <img src={`${data.images[0] || './img/images.jpg'}`} alt="alt"/>
        </div>
        <div className="advert__info">
          <h3 className="info__title">{data.title}</h3>
          <span className="info__category">Авто</span>
          <p className="info__description">{data.description}</p>
          <span className="info__location">{`${data.city}, ${data.country}`}</span>
        </div>
        <div className="advert__price">
          <span className="price__amount">{data.price || 'Нет цены'}</span>
          <div className="add-info">
            <div className="add-info__likes">
              <Icon icon="thumbs-o-up" />
              <span className="amount">{data.likes_array.length}</span>
            </div>
            <div className="add-info__comments">
              <Icon icon="comment-o" />
              <span className="amount">{data.comments_array.length}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}