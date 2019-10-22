/* eslint-disable import/prefer-default-export */
import { connect } from 'react-redux';
import Posts from './Posts';
import { getUsersPosts, postUserPost } from '../../store/index';

const mapMethodsToProps = (dispatch) => ({
  getUsersPosts: (userId) => dispatch(getUsersPosts(userId)),
  postUserPost: (newPost) => dispatch(postUserPost(newPost)),
});

const marStateToProps = (state) => ({
  posts: state.posts,
  isLoading: state.isLoading,
  isLoaded: state.isLoaded,
  userId: state.userId,
});

const connectedPosts = connect(marStateToProps, mapMethodsToProps)(Posts);

export {
  connectedPosts as Posts,
};
