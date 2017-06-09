import React from 'react';
import classnames from 'classnames';
import Comments from './../Comments';
import Icon from './../../ui/Icon';
import Button from './../../ui/Button';
import './detailedAdvert.scss';

export default class DetailedAdvert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      advert: '',
      comments: [
        {
          id: 1,
          user_id: 1,
          text: 'Интересный товар',
          likes: 2,
        },
        {
          id:2,
          user_id: 1,
          text: 'Я бы купил',
          likes: 5,
          liked: true,
        }
      ],
      likes: [],
    }
  }
  componentDidMount() {
    this.setState({
      ...this.props.advertData,
    });
  }
  render() {
    const { advert, comments, likes } = this.state;
    return (
      <div className="detailed-advert">
        <div className="detailed-advert__info">
          <div className="info__images">
            <div className="images__image">
              <img src='../img/images.jpg' alt="lol" />
            </div>
          </div>
          <div className="info__information">
            <h2 className="information__title">{advert.title}</h2>
            <span className="information__category">Автомобили</span>
            <span className="information__location">{`Местоположение: ${advert.country}, ${advert.city}`}</span>
            <div className="information__price">
              <span className='price__actual'>{advert.price ? `${advert.price} у.е.` : 'Нет цены'}</span>
              <div className={classnames("price__bet", {
                price__bet_hidden: !advert.isAuction
              })}>
                <input type="number"/>
                <Button type='button' primary>
                  Сделать ставку
                </Button>
                <span>Последняя ставка: Пользователь #2, 10 у.е., 10 минут назад</span>
              </div>
            </div>
          </div>
          <div className="info__description">
            <div className="description__title">
              <span>Описание</span>
            </div>
            <p className="description__text">
              {advert.description}
            </p>
          </div>
          <div className="info__likes">
            <Button
              primary transparent
            >Оценить</Button>
            <Icon icon='heart-o' />
            <span>0</span>
          </div>
        </div>
        <div className="detailed-advert__comments">
          <h3 className="comments__title">Комментарии</h3>
          <Comments comments={this.state.comments} disabled={this.props.disabled}/>
        </div>
      </div>
    )
  }
}

DetailedAdvert.defaultProps = {
  getAdvert: {},
};
