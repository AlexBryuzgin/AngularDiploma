import React from 'react';
import Comments from './../Comments';
import Icon from './../../ui/Icon';
import './detailedAdvert.scss';

export default class DetailedAdvert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      advert: '',
      comments: [],
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
          <div className="info__images">Here comes the iamges</div>
          <div className="info__information">
            <h2 className="information__title">{advert.title}</h2>
            <span className="information__location">{`${advert.country}, ${advert.city}`}</span>
          </div>
          <div className="info__description">
            <h3 className="description__title">Описание</h3>
            <p className="description__text">
              {advert.description}
            </p>
          </div>
        </div>
        <div className="detailed-advert__comments">
          <Comments comments={[
            {
              id: 1,
              user_id: 1,
              text: 'bla-bla-bla'
            },
            {
              id:2,
              user_id: 1,
              text: 'uasya',
            }
          ]} />
        </div>
      </div>
    )
  }
}

DetailedAdvert.defaultProps = {
  getAdvert: {},
};
