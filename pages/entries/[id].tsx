import { ChangeEvent, useState } from 'react';
import {
  capitalize,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	Radio,
	RadioGroup,
	TextField,
  IconButton,
} from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {Layout} from "../../components/layouts";
import {EntryStatus} from "../../interfaces";

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

export const EntryPage = () => {

  const [inputValue, setInputValue] = useState('')
  const [status, setStatus] = useState<EntryStatus>('pending')
  const [touched, setTouched] = useState(false)

  // CUando el input de nueva entrada cambie
  const onInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
  };
  
  // Cuando el radio button cambie
  const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setStatus(event.target.value as EntryStatus);
  }

  // Salvar entrada
  const onSave = () => {
    console.log({inputValue, status});
  }

	return (
		<Layout title="... .... ...">
			<Grid container justifyContent="center" sx={{marginTop: 2}}>
				<Grid item xs={12} sm={8} md={6}>
					<Card>
						<CardHeader
							title={`Entrada: ${inputValue}`}
							subheader={`Creada hace: .... minutos`}
						/>
						<CardContent>
							<TextField
								sx={{marginBottom: 1, marginTop: 2}}
								fullWidth
								placeholder="Nueva Entrada"
								autoFocus
								multiline
                label="Nueva Entrada"
                value={inputValue}
                onChange={onInputValueChange}
							/>

							<FormControl>
								<FormLabel>Estado:</FormLabel>
                <RadioGroup
                  row
                  value={status}
                  onChange={onStatusChange}
                >
									{validStatus.map((option) => (
										<FormControlLabel
											key={option}
											value={option}
											control={<Radio />}
											label={capitalize(option)}
										/>
									))}
								</RadioGroup>
							</FormControl>
						</CardContent>
						<CardActions>
							<Button
								startIcon={<SaveOutlinedIcon />}
								variant="contained"
                fullWidth
                onClick={onSave}
							>
								Save
							</Button>
						</CardActions>
					</Card>
				</Grid>
      </Grid>
      <IconButton
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          backgroundColor: 'error.dark',
        }}
      >
        <DeleteOutlineOutlinedIcon />
      </IconButton>
		</Layout>
	);
};

export default EntryPage;
