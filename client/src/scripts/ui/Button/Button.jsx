import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import './Button.scss';

export default function Button(props) {
  const btnClassNames = classNames('button', props.className, {
    button_link: props.link,
    button_transparent: props.transparent,
    button_disabled: props.disabled,
    button_primary: props.primary,
  });
  if (props.href && !props.disabled) {
    return (
      <Link
        to={props.href}
        target={props.target}
        className={btnClassNames}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.children}
      </Link>
    );
  }
  return (
    <button
      type={props.type}
      className={btnClassNames}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}

Button.defaultProps = {
  className: null,
  link: false,
  transparent: false,
  disabled: false,
  primary: false,
  href: null,
  target: null,
  onClick: null,
  type: 'submit',
};

Button.propTypes = {
  className: React.PropTypes.string,
  link: React.PropTypes.bool,
  transparent: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  primary: React.PropTypes.bool,
  href: React.PropTypes.string,
  target: React.PropTypes.string,
  onClick: React.PropTypes.func,
  type: React.PropTypes.string,
};
