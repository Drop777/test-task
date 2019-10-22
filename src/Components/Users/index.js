/* eslint-disable import/prefer-default-export */
import { connect } from 'react-redux';
import Users from './Users';
import { getUsersData } from '../../store/index';

const mapMethodsToProps = (dispatch) => ({
  getUsersData: () => dispatch(getUsersData()),
});

const mapStateToProps = (state) => ({
  users: state.users,
  isLoading: state.isLoading,
  isLoaded: state.isLoaded,
});

const connectedUsers = connect(mapStateToProps, mapMethodsToProps)(Users);

export {
  connectedUsers as Users,
};
