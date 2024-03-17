import {useSelector} from 'react-redux'
import { Box, Button, Card, CardActions, CardContent, IconButton, Modal, Tooltip, Typography } from '@mui/material'
import { useState } from 'react'


const WarnningModal = () => {
  const [open, setOpen] = useState(false)
  return (
    <div>
    <Tooltip
      onClick={(e)=>setOpen(true)}
      title="showtask">
      <Button size="small" variant='contained' color='error'>Delete Account</Button>
    </Tooltip>
    <Modal
      open={open}
      onClose={()=>setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{display: 'flex', justifyContent:"center", alignItems:"center"}}
    >
    <Box p={5} sx={{backgroundColor: 'white', textAlign: 'center', display: 'flex',
      flexDirection: 'column', gap: 2, borderRadius:3
      }}>
      <Typography>
        Are you sure you want to delete your account?<br/>
        <i>This action can't be undo</i>
      </Typography>
      <div style={{display: 'flex', justifyContent: 'center', gap:'2rem'}}>
        <Button variant='contained'>Cancel</Button>
        <Button variant='contained' color='error'>Delete Acc</Button>
      </div>
    </Box>
    </Modal>
  </div>
  )
}
const Profile = () => {

  const {user, isLoading} = useSelector((state)=>state.user)
  const {tasks} = useSelector((state) => state.tasks)

  console.log(user)
  if (isLoading) {
    <div>Loading...</div>
  }
  return (
    <div>
      {
        user ? <Box sx={{display: 'flex', 
        height: '80vh', justifyContent: 'center', alignItems: 'center'}}>
          <Card sx={{display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'center', gap: 2, padding: '3rem'}}>
            <CardContent>
              <Typography p={1} variant='h5'>
                <b>Name:</b> {user.name}
              </Typography>
              <Typography p={1} variant='h5'>
                <b>Email:</b> {user.email}
              </Typography>
              <Typography p={1} variant='h5'>
                <b>Total Tasks:</b> {tasks.length}
              </Typography>
              <Typography p={1} variant='h5'>
              <b>Account Created:</b> {
                  new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })
                }
              </Typography>
            </CardContent>
            <CardActions>
                <WarnningModal />
            </CardActions>
          </Card> 
        </Box>
        : 
        <div>No user found</div>
      }
    </div>
  )
}

export default Profile