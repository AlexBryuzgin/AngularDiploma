import React from 'react';

import './imageInfo.scss';

export default function ImageInfo(props) {
  return (
    <div className="image-info">
      <div className="thumbnail">
        <img src={props.src} alt={props.alt} />
      </div>
      <span>{props.photoName} - {Math.round(props.size / 1024)}КБ</span>
      {props.children}
    </div>
  );
}