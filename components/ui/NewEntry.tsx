import {Box, Button, TextField} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export const NewEntry = () => {
	return (
    <Box sx={{marginBottom:2, paddingX: 2}}>
      <Button
        startIcon={<AddCircleOutlineIcon />}
        fullWidth
        variant='outlined'

      >
        Agregar Tarea
      </Button>

      <TextField
        fullWidth
        sx={{ marginTop: 2, marginBottom: 1 }}
        placeholder="Nueva entrada"
        autoFocus
        multiline
        label="Nueva entrada"
        helperText="Escribe aquí tu nueva entrada"
      />

			<Box display="flex" justifyContent="space-between">
				<Button
					variant="text"
					// color="secondary"
					// endIcon={<HighlightOffIcon />}
				>
					Cancelar
				</Button>
				<Button variant="outlined" color="secondary" endIcon={<SaveIcon />}>
					Guardar
				</Button>
			</Box>
		</Box>
	);
};
