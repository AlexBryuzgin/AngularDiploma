import { connect } from 'react-redux';
import { getAdvertById } from './advertActions';
import DetailedAdvert from './../../components/DetailedAdvert';

const mapStateToProps = state => ({
  advertData: state.adverts.currentAdvert,
});

const DetailedAdvertContainer = connect(mapStateToProps, null)(DetailedAdvert);

export default DetailedAdvertContainer;