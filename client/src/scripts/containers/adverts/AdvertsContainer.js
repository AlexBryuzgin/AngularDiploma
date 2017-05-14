import { connect } from 'react-redux';
import { getAdverts } from './advertActions';
import ViewAdsPage from './../../components/ViewAdsPage';

const mapStateToProps = state => ({
  allAdverts: state.adverts.advertsOnPage || [],
})

const mapDispatchToProps = dispatch => ({
  getAdverts: data => dispatch(getAdverts(data)),
});

const AdvertsContainer = connect(mapStateToProps, mapDispatchToProps)(ViewAdsPage);

export default AdvertsContainer;