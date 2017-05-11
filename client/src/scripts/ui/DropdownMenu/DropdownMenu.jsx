import React from 'react';
import classNames from 'classnames';
import Button from './../Button';
import Icon from './../Icon';
import './DropdownMenu.scss';

export default function DropdownMenu(props) {
  const { className, title, children, openOnHover, primary, transparent, disabled } = props;
  const DropdownMenuClassNames = classNames('dropdown-menu', className, {
    'dropdown-menu_hover': openOnHover,
    'dropdown-menu_primary': primary,
    'dropdown-menu_transparent': transparent,
    'dropdown-menu_disabled': disabled,
  });

  return (
    <div className={DropdownMenuClassNames} >
      <Button
        type="button"
        className="dropdown-menu__button"
        primary={primary}
        transparent={transparent}
        disabled={disabled}
      >
        {title}
        <Icon icon="angle-down" className="dropdown-menu__button_icon-down" />
      </Button>
      <ul className="dropdown-menu__content">
        {children}
      </ul>
    </div>
  );
}

DropdownMenu.propTypes = {
  className: React.PropTypes.string,
  title: React.PropTypes.node.isRequired,
  disabled: React.PropTypes.bool,
  transparent: React.PropTypes.bool,
  primary: React.PropTypes.bool,
  openOnHover: React.PropTypes.bool,
};

DropdownMenu.defaultProps = {
  className: '',
  disabled: false,
  transparent: false,
  primary: false,
  openOnHover: false,
};
