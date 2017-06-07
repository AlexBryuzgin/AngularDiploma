import React from 'react';
import Comments from './../Comments';
import Icon from './../../ui/Icon';
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
              <span>{advert.price}</span>
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
        </div>
        <div className="detailed-advert__comments">
          <h3 className="comments__title">Комментарии</h3>
          <Comments comments={this.state.comments} />
        </div>
      </div>
    )
  }
}

DetailedAdvert.defaultProps = {
  getAdvert: {},
};
