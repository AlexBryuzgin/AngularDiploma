import { connect } from 'react-redux';
import SignUp from './../../components/SignUp';
import { signUp } from './userActions';

const mapDispatchToProps = (dispatch) => ({
  signUp: data => dispatch(signUp(data)),
});

const SignUpContainer = connect(null, mapDispatchToProps)(SignUp);

export default SignUpContainer;