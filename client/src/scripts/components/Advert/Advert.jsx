import React, { Component } from 'react';
import classnames from 'classnames';
import Icon from './../../ui/Icon';
import './advert.scss';

export default class Advert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleMenu: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu(e) {
    e.stopPropagation();
    this.setState({
      toggleMenu: !this.state.toggleMenu,
    })
  }
  
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
          <span className="price__amount">{data.price ? `${data.price} у.е.` : 'Нет цены'}</span>
          <div className="add-info">
            <div className="add-info__likes">
              <Icon icon="thumbs-o-up" />
              <span className="amount">{data.likes_array.length}</span>
            </div>
            <div className="add-info__comments">
              <Icon icon="comment-o" />
              <span className="amount">{data.comments_array.length}</span>
            </div>
            {/* <Icon icon='star' className='star' />*/}
            <Icon icon='star-o' className='star-o' />
          </div>
        </div>
        <Icon icon="bars" className='advert__menu_icon' onClick={this.toggleMenu} />
        <ul className={classnames("advert__menu", {
          advert__menu_hidden: !this.state.toggleMenu,
        })}>
          <li>Удалить</li>
        </ul>
      </div>
    );
  }
}