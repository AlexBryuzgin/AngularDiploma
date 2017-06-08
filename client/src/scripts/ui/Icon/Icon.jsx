import React from 'react';

export default function Icon(props) {
  return (
    <i
      className={`icon fa fa-${props.icon} ${props.className ? props.className : ''}`}
      title={props.title}
      onClick={props.onClick}
    />
  );
}

Icon.defaultProps = {
  icon: null,
  className: null,
  title: null,
};

Icon.propTypes = {
  icon: React.PropTypes.string,
  className: React.PropTypes.string,
  title: React.PropTypes.string,
};
