import { List, Paper } from '@mui/material'
import React from 'react'
import { EntryCard } from './';

export const EntryList = () => {

  // overflowY: 'scroll',

  return (
    // TODO: aqui haremos drop
    <div>
      <Paper sx={{ height: 'calc(100vh - 180px)', overflowY: 'scroll',  backgroundColor: 'transparent', padding: '1px 5px' }}>
        {/* TODO: cambiara si estoy haciano drag o no */}
        <List sx={{opacity: '1'}}>
          <EntryCard />
          <EntryCard />
          <EntryCard />
          <EntryCard />
          <EntryCard />
          <EntryCard />
          <EntryCard />
        </List>
      </Paper>
    </div>
  )
}
