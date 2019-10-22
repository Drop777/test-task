/* eslint-disable react/jsx-filename-extension */
/* eslint-disable consistent-return */
/* eslint-disable react/state-in-constructor */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';

class Posts extends React.Component {
  state = {
    setOpen: false,
    postTitle: '',
    postBody: '',
  }

  componentDidMount() {
    const { match } = this.props;
    this.loadPosts(match.match.params.userId);
  }

  loadPosts = async (userId) => {
    const { getUsersPosts } = this.props;
    await getUsersPosts(userId);
  };

  postNewPost = async (newPost) => {
    const { postUserPost } = this.props;
    await postUserPost(newPost);
  }

  handleOpen = () => {
    this.setState({
      setOpen: true,
    });
  };

  handleClose = () => {
    this.setState({
      setOpen: false,
    });
  };

  handleChangeTitle = ({ target }) => {
    const { value } = target;

    this.setState({
      postTitle: value,
    });
  };

  handleChangeBody = ({ target }) => {
    const { value } = target;

    this.setState({
      postBody: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { match } = this.props;
    const { postTitle, postBody } = this.state;

    const newPost = {
      userId: parseInt(match.match.params.userId, 10),
      title: postTitle,
      body: postBody,
    };

    this.setState({
      postTitle: '',
      postBody: '',
    });

    this.handleClose();

    return this.postNewPost(newPost);
  }

  render() {
    const {
      posts, isLoading, isLoaded, userId,
    } = this.props;
    const { setOpen, postTitle, postBody } = this.state;
    if (isLoading) {
      return (
        <div className="lds-hourglass" />
      );
    }
    if (isLoaded) {
      return (
        <>
          <Paper>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell align="left">Body</TableCell>
                  <TableCell align="left">ID</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell component="th" scope="row">
                      {post.title}
                    </TableCell>
                    <TableCell align="left">{post.body}</TableCell>
                    <TableCell align="left">{post.id}</TableCell>
                    <TableCell><Link to={`/${userId}/posts/${post.id}/details`} style={{ color: 'black', textDecoration: 'none' }}><Button variant="contained">Details</Button></Link></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
          <div className="container">
            <Button type="button" variant="contained" color="primary" onClick={this.handleOpen}>Add new post</Button>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={setOpen}
              onClose={this.handleClose}
            >
              <div className="pop-up">
                <h2 id="simple-modal-title">Add new post</h2>
                <form onSubmit={this.handleSubmit}>
                  <TextField
                    onChange={this.handleChangeTitle}
                    id="outlined-full-width"
                    label="Title"
                    value={postTitle}
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    onChange={this.handleChangeBody}
                    id="outlined-full-width"
                    label="Body"
                    value={postBody}
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    multiline
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <div className="pop-up-buttons">
                    <Button type="submit" variant="contained" color="primary" style={{ marginRight: 15 }}>Add</Button>
                    <Button type="button" variant="contained" color="primary" onClick={this.handleClose}>Cancel</Button>
                  </div>
                </form>
              </div>
            </Modal>
          </div>
        </>
      );
    }
  }
}

Posts.propTypes = {
  match: PropTypes.object,
  getUsersPosts: PropTypes.func,
  postUserPost: PropTypes.func,
  posts: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  isLoaded: PropTypes.bool,
  userId: PropTypes.string,
}.isRequaired;

export default Posts;
