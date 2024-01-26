import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'

export default function Header() {
  return (
    <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Alchimetis
      </Typography>
      {/* TODO: Show the below  button on ly if the user is not authenticated */}
    
      <Button color="inherit" variant="outlined" style={{marginRight: 8}}>Login</Button>
      <Button color="inherit" variant="outlined" style={{marginRight: 4}}>Sign Up</Button>
    
    </Toolbar>
  </AppBar>
  )
}
