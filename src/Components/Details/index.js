/* eslint-disable import/prefer-default-export */
import { connect } from 'react-redux';
import Details from './Details';
import { getPostDetails, putUserPost, deleteUserPost } from '../../store/index';

const mapMethodsToProps = (dispatch) => ({
  getPostDetails: (postId) => dispatch(getPostDetails(postId)),
  putUserPost: (editedPost, postId) => dispatch(putUserPost(editedPost, postId)),
  deleteUserPost: (postId) => dispatch(deleteUserPost(postId)),
});

const marStateToProps = (state) => ({
  posts: state.posts,
  comments: state.comments,
  isLoading: state.isLoading,
  isLoaded: state.isLoaded,
});

const connectedDetails = connect(marStateToProps, mapMethodsToProps)(Details);

export {
  connectedDetails as Details,
};
