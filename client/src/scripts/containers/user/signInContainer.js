import { connect } from 'react-redux';
import SignIn from './../../components/SignIn';
import { signIn } from './userActions';

const mapDispatchToProps = (dispatch) => ({
  signIn: data => dispatch(signIn(data)),
});

const SignInContainer = connect(null, mapDispatchToProps)(SignIn);

export default SignInContainer;