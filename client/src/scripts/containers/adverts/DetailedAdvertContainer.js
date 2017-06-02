import { connect } from 'react-redux';
import { getAdvertById } from './advertActions';
import DetailedAdvert from './../../components/DetailedAdvert';

const mapDispatchToProps = dispatch => ({
  getAdvert: id => dispatch(getAdvertById(id)),
});

const mapStateToProps = state => ({
  advertData: state.adverts.currentAdvert,
});

const DetailedAdvertContainer = connect(mapStateToProps, mapDispatchToProps)(DetailedAdvert);

export default DetailedAdvertContainer;