import React, { PropTypes } from 'react';
import './DropdownMenuItem.scss';

export default function DropdownMenuItem(props) {
  return (
    <li className="dropdown-menu-item" onClick={props.onClick}>
      {props.children}
    </li>
  );
}
DropdownMenuItem.defaultProps = {
  onClick: null,
};

DropdownMenuItem.propTypes = {
  onClick: PropTypes.func,
};
