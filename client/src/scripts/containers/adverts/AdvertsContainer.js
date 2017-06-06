import { connect } from 'react-redux';
import { getAdverts, getAdvertById } from './advertActions';
import ViewAdsPage from './../../components/ViewAdsPage';

const mapStateToProps = state => ({
  adverts: state.adverts.advertsOnPage,
})

const mapDispatchToProps = dispatch => ({
  getAdverts: data => dispatch(getAdverts(data)),
  getAdvertById: id => dispatch(getAdvertById(id)),
});

const AdvertsContainer = connect(mapStateToProps, mapDispatchToProps)(ViewAdsPage);

export default AdvertsContainer;