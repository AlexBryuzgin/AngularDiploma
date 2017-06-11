import { connect } from 'react-redux';
import SignIn from './../../components/SignIn';
import { signIn } from './userActions';

const mapDispatchToProps = (dispatch) => ({
  signIn: data => dispatch(signIn(data)),
});

const mapStateToProps = state => ({
  error: state.users.error,
})

const SignInContainer = connect(mapStateToProps, mapDispatchToProps)(SignIn);

export default SignInContainer;