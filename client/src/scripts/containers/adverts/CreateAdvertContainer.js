import { connect } from 'react-redux';
import { createAdvert } from './advertActions';

import CreateAdvert from './../../components/createAdvert/CreateAdvert';

const mapDispatchToProps = dispatch => ({
  postAdvert: data => dispatch(createAdvert(data))
})

const CreateAdvertContainer = connect(null, mapDispatchToProps)(CreateAdvert);

export default CreateAdvertContainer;

