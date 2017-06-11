import { connect } from 'react-redux';
import SignUp from './../../components/SignUp';
import { signUp } from './userActions';

const mapDispatchToProps = (dispatch) => ({
  signUp: data => dispatch(signUp(data)),
});

const mapStateToProps = state => ({
  message: state.users.user ? (
    state.users.user.message || state.users.user.error
  ) : null,
}) 

const SignUpContainer = connect(mapStateToProps, mapDispatchToProps)(SignUp);

export default SignUpContainer;