import React from 'react';
import './detailedAdvert.scss';

export default class DetailedAdvert {
  render() {
    const { getAdvert } = this.props;
    return (
      <div className="detailed-advert">
        <div className="detailed-advert__info">
          <div className="info__images">Here comes the iamges</div>
          <div className="info__information"></div>
          <div className="info__description"></div>
        </div>
        <div className="detailed-advert__comments">LOL</div>
      </div>
    )
  }
}