import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const ACTION_TYPES = {
  START_LOADING: 'START_LOADING',
  HANDLE_SECCESS_USERS: 'HANDLE_SECCESS_USERS',
  HANDLE_ERROR: 'HANDLE_ERROR',
  HANDLE_SECCESS_POSTS: 'HANDLE_SECCESS_POSTS',
  HANDLE_SECCESS_DETAILS: 'HANDLE_SECCESS_DETAILS',
};

const BASE_URL = 'https://jsonplaceholder.typicode.com/';

const startLoading = () => ({
  type: ACTION_TYPES.START_LOADING,
});

const handleSeccessUsers = (users) => ({
  type: ACTION_TYPES.HANDLE_SECCESS_USERS,
  payload: users,
});

const handleSeccessPosts = (posts, userId) => ({
  type: ACTION_TYPES.HANDLE_SECCESS_POSTS,
  payload: {
    posts,
    userId,
  },
});

const handleSeccessDetails = (comments) => ({
  type: ACTION_TYPES.HANDLE_SECCESS_DETAILS,
  payload: comments,
});

const handleError = () => ({
  type: ACTION_TYPES.HANDLE_ERROR,
});


export const getUsersData = () => (dispatch) => {
  dispatch(startLoading());

  return (
    fetch(`${BASE_URL}users`)
      .then((response) => response.json())
      .then((data) => dispatch(handleSeccessUsers(data)))
      .catch(() => dispatch(handleError()))
  );
};

export const getUsersPosts = (userId) => (dispatch) => {
  dispatch(startLoading());

  return (
    fetch(`${BASE_URL}posts?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => dispatch(handleSeccessPosts(data, userId)))
      .catch(() => dispatch(handleError()))
  );
};

export const getPostDetails = (postId) => (dispatch) => {
  dispatch(startLoading());
  return (
    fetch(`${BASE_URL}comments/?postId=${postId}`)
      .then((response) => response.json())
      .then((data) => dispatch(handleSeccessDetails(data)))
      .catch(() => dispatch(handleError()))
  );
};

export const postUserPost = (newPost) => (dispatch) => fetch(`${BASE_URL}posts`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
  body: JSON.stringify({ ...newPost }),
})
  .then((response) => alert(`Status code: ${response.status}`));

export const putUserPost = (editPost, postId) => (dispatch) => fetch(`${BASE_URL}posts/${postId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
  body: JSON.stringify({ ...editPost }),
})
  .then((response) => alert(`Status code: ${response.status}`));

export const deleteUserPost = (postId) => (dispatch) => fetch(`${BASE_URL}posts/${postId}`, {
  method: 'DELETE',
})
  .then((response) => alert(`Status code: ${response.status}`));

const initialState = localStorage['redux-store']
  ? JSON.parse(localStorage['redux-store'])
  : {
    users: [],
    posts: [],
    comments: [],
    userId: null,
    isLoading: true,
    isLoaded: false,
    hasError: false,
  };


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.START_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ACTION_TYPES.HANDLE_SECCESS_USERS:
      return {
        ...state,
        hasError: false,
        isLoaded: true,
        isLoading: false,
        users: [...action.payload],
      };
    case ACTION_TYPES.HANDLE_SECCESS_POSTS:
      return {
        ...state,
        hasError: false,
        isLoaded: true,
        isLoading: false,
        posts: [...action.payload.posts],
        userId: action.payload.userId,
      };
    case ACTION_TYPES.HANDLE_SECCESS_DETAILS:
      return {
        ...state,
        hasError: false,
        isLoaded: true,
        isLoading: false,
        comments: [...action.payload],
      };
    case ACTION_TYPES.HANDLE_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    default:
      return state;
  }
};

export const store = createStore(reducer, applyMiddleware(thunk));

store.subscribe(() => {
  localStorage['redux-store'] = JSON.stringify(store.getState());
});
