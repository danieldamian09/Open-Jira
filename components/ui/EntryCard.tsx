import { DragEvent, FC } from 'react';
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { Entry } from '../../interfaces';

interface Props {
  entry: Entry
}

export const EntryCard: FC<Props> = ({ entry }) => {
  
  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    // Informacion de cual es el elemento que se va a mover
    // console.log(event)
    // Agregar un identificador al elemento
    event.dataTransfer.setData('text', entry._id)

    //TODO: modificar el estado para indicar que se esta arrastrando

  }

  const onDragEnd = () => {
  // TODO: terminar de arrastrar el elemento
    
  
  }

  return (
    <Card
      sx={{ marginBottom: 1 }}
      // TODO: eventos de drag and drog
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>{ entry.description}</Typography>
        </CardContent>
        <CardActions sx={{display: 'flex', justifyContent: 'end', paddingRight: '2'}}>
          <Typography variant='body2'>hace 30 minutos</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
