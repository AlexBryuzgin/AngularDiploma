import React from 'react';
import classnames from 'classnames';
import Icon from './../../ui/Icon';
import cats from './cats';
import './categories.scss';

export default class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.renderCats = this.renderCats.bind(this);
    this.toggleCat = this.toggleCat.bind(this);
    this.state = {
      cars: false,
      estate: false,
      tech: false,
      clothes: false,
    }
  }

  toggleCat(cat) {
    this.setState({
      [cat]: !this.state[cat]
    })
  }
  renderCats() {
    const categs = Object.keys(cats).map((cat) => {
      const catArr = cats[cat].children.map((child) => {
        return (
          <li className='children__item'>{child.name}</li>
        );
      });
      return (
        <div className="categories__category">
          <span className="category__parent" onClick={() => this.toggleCat(cat)}>
            <Icon
              icon={this.state[cat] ? 'minus' : 'plus'}
              onClick={() => this.toggleCat(cat)}
            />
            {cats[cat].name}
          </span>
          <ul className={classnames('category__children', {
            category__children_closed: !this.state[cat],
          })}>
            {catArr}
          </ul>
        </div>
      );
    });
    return categs;
  }

  render() {
    return (
      <div className="categories">
        {this.renderCats()}
      </div>
    )
  }
}