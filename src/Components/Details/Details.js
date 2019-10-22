/* eslint-disable react/state-in-constructor */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import './Details.css';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';

class Details extends React.Component {
    state = {
      setOpen: false,
      editTitle: '',
      editBody: '',
    }

    componentDidMount() {
      const { match } = this.props;
      this.loadDetails(match.match.params.postId);
    }

    loadDetails = async (postId) => {
      const { getPostDetails } = this.props;
      await getPostDetails(postId);
    }

    putEditedPost = async (editedPost, postId) => {
      const { putUserPost } = this.props;
      await putUserPost(editedPost, postId);
    }

    deleteUserPost = async (postId) => {
      const { deleteUserPost } = this.props;
      await deleteUserPost(postId);
    }

    handleOpen = (currentPost) => {
      this.setState({
        editTitle: currentPost.title,
        editBody: currentPost.body,
        setOpen: true,
      });
    };

    handleClose = () => {
      this.setState({
        setOpen: false,
      });
    };

    handleEditTitle = ({ target }) => {
      const { value } = target;

      this.setState({
        editTitle: value,
      });
    };

    handleEditBody = ({ target }) => {
      const { value } = target;

      this.setState({
        editBody: value,
      });
    };

    handleSubmit = (currentPost) => {
      const { editTitle, editBody } = this.state;
      const editedPost = {
        id: currentPost.id,
        title: editTitle,
        body: editBody,
        userId: currentPost.userId,
      };
      this.handleClose();
      return this.putEditedPost(editedPost, currentPost.id);
    };

    render() {
      const {
        match, posts, comments, isLoading, isLoaded,
      } = this.props;
      const { editTitle, editBody, setOpen } = this.state;
      const currentPost = posts.find((post) => post.id === parseInt(match.match.params.postId, 10));
      if (isLoading) {
        return (
          <div className="lds-hourglass" />
        );
      }
      if (isLoaded) {
        return (
          <>
            <Paper>
              <Typography variant="h5" component="h3">
              Title:
                {currentPost.title}
              </Typography>
              <Typography component="p">
                Body:
                {currentPost.body}
              </Typography>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="left">Email</TableCell>
                    <TableCell align="left">Comment</TableCell>
                    <TableCell align="left">ID</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {comments.map((comment) => (
                    <TableRow key={comment.id}>
                      <TableCell component="th" scope="row">
                        {comment.name}
                      </TableCell>
                      <TableCell align="left">{comment.email}</TableCell>
                      <TableCell align="left">{comment.body}</TableCell>
                      <TableCell align="left">{comment.id}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
            <div className="container">
              <Button type="button" variant="contained" color="primary" onClick={() => this.handleOpen(currentPost)}>Edit post</Button>
              <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={setOpen}
                onClose={this.handleClose}
              >
                <div className="pop-up">
                  <h2 id="simple-modal-title">Edit post</h2>
                  <form onSubmit={() => this.handleSubmit(currentPost)}>
                    <TextField
                      onChange={this.handleEditTitle}
                      id="outlined-full-width"
                      label="Title"
                      value={editTitle}
                      style={{ margin: 8 }}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      onChange={this.handleEditBody}
                      id="outlined-full-width"
                      label="Body"
                      value={editBody}
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
              <Button type="button" variant="contained" color="primary" onClick={() => this.deleteUserPost(currentPost.id)}>Delete</Button>
            </div>
          </>
        );
      }
    }
}

Details.propTypes = {
  match: PropTypes.object,
  getPostDetails: PropTypes.func,
  putUserPost: PropTypes.func,
  deleteUserPost: PropTypes.func,
  comments: PropTypes.arrayOf(PropTypes.object),
  posts: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  isLoaded: PropTypes.bool,
}.isRequaired;

export default Details;
