import { connect } from 'react-redux';
import UserBar from './../../components/Header/UserBar';
import { signOut } from './userActions';

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut()),
});

const mapStateToProps = state => ({
  username: state.users.user ? state.users.user.username : null,
  role: state.users.user ? state.users.user.role : null,
})

const UserBarContainer = connect(mapStateToProps, mapDispatchToProps)(UserBar);

export default UserBarContainer;