import { Box, Button, Card, CardActions, CardContent, Checkbox, IconButton, Typography } from '@mui/material'
import { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {getTasks, removeTask, reset} from '../features/tasks/taskSlice'
import {toast} from 'react-toastify'
import { updatedTask } from '../features/tasks/taskSlice'
import { Delete, Edit, Favorite, FavoriteBorder, Share } from '@mui/icons-material'
import UpdateForm from './UpdateForm'

const AllTasks = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {tasks, isLoading, isError, message} = useSelector((state) => state.tasks)
  const {user} = useSelector((state)=> state.user)

  useEffect(()=> {
    if (isError) {
      toast.error(message)
    }

    if (!user) {
      navigate('/signin')
    }
    dispatch(getTasks())

    return () => {
      dispatch(reset())
    }
  }, [dispatch, user, navigate, isError, message])

  if (isLoading) {
    return <Box flex={4} sx={{height: '100vh', textAlign:'center'}}>Loading</Box>
  }

  return (
    <>
      <Box flex={4}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap:2}}>
        {tasks.length > 0 ? (

            tasks.map((task) => {
              return (
                <div key={task._id}>
                  <Box sx={{ minWidth: 275 }}>
                    <Card variant="outlined" sx={{boxShadow: '1px 1px 2px gray',
                      backgroundColor: task.taskCompleted ? 'lightgrey' : task.priority === 'high' && !task.taskCompleted ? 'lightyellow' :
                      task.priority === 'urgent' && !task.taskCompleted ? 'lightpink' : 'white'
                    }}
                    >
                    <CardContent>
                    <Checkbox sx={{ml: -2}}
                      checked={task.taskCompleted ? 'checked' : ''}
                      onClick={() => dispatch(updatedTask({ taskId: task._id, taskData: { taskCompleted: !task.taskCompleted } }))}
                    /> Mark as complete
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Task Details
                      </Typography>
                      <Typography variant="p" component="div">
                        {task.taskItem}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {task.taskCompleted ? 'Completed' : 'Not completed'}
                      </Typography>
                      </CardContent>
                      <CardActions>
                        <Checkbox icon={task.favorite ? <Favorite sx={{color: 'red'}}/> : <FavoriteBorder />} 
                        checkedIcon={task.favorite ? <Favorite sx={{color: 'red'}}/> : <FavoriteBorder />}
                          onClick={() => dispatch(updatedTask({ taskId: task._id, taskData: { favorite: !task.favorite } }))}
                        />
                        <UpdateForm taskToUpdate={task}/>
                        <IconButton aria-label="delete"
                          onClick={()=>{dispatch(removeTask(task._id))}}
                        >
                          <Delete />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Box>
                </div>
              );
            })
            ) : (
              <div>No Task</div>
              )}
        </div>
      </Box>
    </>
  )
}

export default AllTasks