/* eslint-disable react/jsx-filename-extension */
/* eslint-disable consistent-return */
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

class Users extends React.Component {
  componentDidMount() {
    this.load();
  }

    load = async () => {
      const { getUsersData } = this.props;
      await getUsersData();
    }

    render() {
      const { users, isLoading, isLoaded } = this.props;
      if (isLoading) {
        return (
          <div className="lds-hourglass" />
        );
      }

      if (isLoaded) {
        return (
          <Paper>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="left">Csername</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">City</TableCell>
                  <TableCell align="left" />
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.name}>
                    <TableCell component="th" scope="row">
                      {user.name}
                    </TableCell>
                    <TableCell align="left">{user.username}</TableCell>
                    <TableCell align="left">{user.email}</TableCell>
                    <TableCell align="left">{user.address.city}</TableCell>
                    <TableCell align="left"><Link to={`/users/${user.id}/posts`} style={{ color: 'black', textDecoration: 'none' }}><Button variant="contained">Posts</Button></Link></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        );
      }
    }
}

Users.propTypes = {
  getUsersData: PropTypes.func,
  users: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  isLoaded: PropTypes.bool,
}.isRequaired;

export default Users;
