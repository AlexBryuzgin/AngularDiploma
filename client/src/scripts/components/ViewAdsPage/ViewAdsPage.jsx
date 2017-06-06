import React, { Component } from 'react';
import 'react-select/scss/select.scss';
import { browserHistory } from 'react-router';
import Button from './../../ui/Button';
import Icon from './../../ui/Icon';
import Advert from './../Advert';
import './viewAdsPage.scss';

export default class ViewAdsPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      onpage: 20,
      page: 1,
      order: 'DESC',
      adverts: this.props.adverts || [],
      list: true,
    };
    this.renderAdverts = this.renderAdverts.bind(this);
    this.viewAdvert = this.viewAdvert.bind(this);
    this.getAdverts = this.getAdverts.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.onGrid = this.onGrid.bind(this);
    this.onList = this.onList.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onAdvertClick = this.onAdvertClick.bind(this);
  }

  componentDidMount() {
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
      }, () => this.getAdverts())
    } else {
      this.setState({
        ...this.state,
        page: page + 1,
      }, () => this.getAdverts())
    }
    console.log("page", page);
    // this.getAdverts();
    console.log(this.props.adverts.length)
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
  onAdvertClick(id) {
    this.props.getAdvertById(id);
  } 
  renderAdverts() {
    return this.props.adverts
    ? this.props.adverts.map(advert => {
      return (
        <Advert
          onClick={() => this.onAdvertClick(advert.id)}
          horizontal={!this.state.list}
          data={advert}
          id={advert.id}
        />
      );
    })
    : null;
  }

  onSelect(e) {
    this.setState({
      [e.target.name]: e.target.value,
    }, () => {
      console.log(this.state);
      this.getAdverts();
    })
  }
  
  onList() { this.setState({ list: true })}
  onGrid() { this.setState({ list: false })}

  render() {
    const adverts = this.renderAdverts();
    return (
      <div className="view-ads">
        <div className="view-ads__options">
          <div className="options__params">
            <div className="params__amount">
              <span>Количество записей на странице</span>
              <select name="onpage" onChange={this.onSelect}>
                <option selected value={20}>20</option>
                <option value={40}>40</option>
                <option value={60}>60</option>
                <option value={4}>4</option>
              </select>
            </div>
            <div className="params__order">
              <span>Порядок записей</span>
              <select name="order" onChange={this.onSelect}>
                <option value="DESC" selected>По убыванию</option>
                <option value="ASC">По возрастанию</option>
              </select>
            </div>
          </div>
          <div className="options__view">
            <span>Выберите вид:</span>
            <Button type="button" primary onClick={this.onList} className='view__button'><Icon icon="list" /></Button>
            <Button type="button" primary onClick={this.onGrid} className='view__button'><Icon icon="th" /></Button>
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
            disabled={!this.props.adverts || this.props.adverts.length < this.state.onpage}
            onClick={() => {this.paginate('forth')}}
          >
            Вперёд <Icon icon="forward" />
          </Button>
        </div>
      </div>
    )
  }
}