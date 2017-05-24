import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/scss/select.scss';
import { browserHistory } from 'react-router';
import Button from './../../ui/Button';
import Icon from './../../ui/Icon';
import Advert from './../Advert';
import  './viewAdsPage.scss';

const amountOptions = [
  { value: 4, label: '4' },
  { value: 12, label: '12' },
  { value: 20, label: '20' }
];

const orderOptions = [
  { value: 'DESC', label: 'По убыванию'},
  { value: 'ASC', label: 'По возрастанию'}
];

export default class ViewAdsPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      onpage: 4,
      page: 1,
      order: 'DESC',
    };
    this.renderAdverts = this.renderAdverts.bind(this);
    this.viewAdvert = this.viewAdvert.bind(this);
    this.getAdverts = this.getAdverts.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentWillMount() {
    this.getAdverts();
  }
  getAdverts() {
    this.props.getAdverts(this.state);
  }
  paginate(where) {
    let { page } = this.state;
    if (where === 'back') {
      this.setState({
        ...this.state,
        page: page - 1,
      }, () => page = this.state.page)
    } else {
      this.setState({
        ...this.state,
        page: page + 1,
      }, () => page = this.state.page)
    }
    console.log("page", page);
    this.getAdverts();
    console.log(this.props.allAdvetrs.length)
  }

  viewAdvert(id) {
    return browserHistory.push(`/adverts/${id}`);
  }

  handleSelectChange(e) {
    const { value, name } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
      page: 1,
    })
  }

  renderAdverts() {
    return this.props.allAdvetrs
    ? this.props.allAdvetrs.map(advert => {
      console.log(advert);
      return (
        <Advert
          data={advert}
          onClick={() => { this.viewAdvert(advert.id) }}
        />
      );
    })
    : null;
  }

  render() {
    const adverts = this.renderAdverts();
    return (
      <div className="view-ads">
        <div className="view-ads__options">
          <div className="options__params">
            <div className="params__amount">
              <Select
                autosize
                name="onpage"
                value={4}
                options={amountOptions}
                onChange={this.handleSelectChange}
              />
            </div>
            <div className="params__order">
              <Select
                name="order"
                value="DESC"
                options={orderOptions}
                onChange={this.handleSelectChange}
              />
            </div>
          </div>
        </div>
        <div className="view-ads__ads">{this.renderAdverts()}</div>
        <div className="view-ads__pagination">
          <Button
            className="pagination__back"
            primary
            disabled={this.state.page === 1}
            onClick={() => {this.paginate('back')}}
          >
            <Icon icon="backward" /> Назад
          </Button>
          <Button
            className="pagination__forward"
            primary
            disabled={!this.props.allAdvetrs || this.props.allAdvetrs.length < this.state.onpage}
            onClick={() => {this.paginate('forth')}}
          >
            <Icon icon="forward" /> Вперёд
          </Button>
        </div>
      </div>
    )
  }
}