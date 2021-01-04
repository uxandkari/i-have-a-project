import React, { useEffect } from 'react';
import {connect} from 'react-redux'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function AddTeamMember(props) {
  const [open, setOpen] = React.useState(false);
  const [event, setName] = React.useState('');
  const [inviteData, setInviteData] = React.useState({
    invitees: [
      {
        name: '',
        email: '',
        rate: 0,
      },
    ],
    message: '',
  })

  // potential to pass probs and trigger modal this way
  useEffect(() => {

  }, [event])

  const handleClickOpen = () => {
    setName('')
    setOpen(true);
  };

  const handleClose = () => {
    setName('')
    setOpen(false);
  };

  const handleAddPlaylist = () => {
      //dispatch
    setOpen(false)
    setName('')
  }

  const handleChange = (event) => {
    setName(event.target.value)
  }
  const handleDateChange = (event) => {
    console.log(event.target.value);
  }

  return (
    <div>

    <button onClick={handleClickOpen}>Invite Team Member</button> 

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Enter Team Member Info</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Designer Name"
            type="text"
            fullWidth
            onChange={(event) => handleChange(event)}
            required={true}
          />
        </DialogContent>
        <DialogContent>
          <DialogContentText>
             
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <DialogContentText>
            Select Project or Event Type 
          </DialogContentText>
            <input type="date" onChange={handleDateChange}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddPlaylist} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default connect()(AddTeamMember);