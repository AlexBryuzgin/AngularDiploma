import { connect } from 'react-redux';
import App from './../components/App';
import { checkLogin } from './user/userActions';

const mapDispatchToProps = (dispatch) => ({
  checkLogin: () => dispatch(checkLogin()),
});

const AppContainer = connect(null, mapDispatchToProps)(App);

export default AppContainer;

