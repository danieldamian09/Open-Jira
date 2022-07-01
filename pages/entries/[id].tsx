import { ChangeEvent, FC, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next'
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
import { dbEntries } from '../../database';
import {Layout} from "../../components/layouts";
import {EntryStatus, Entry} from "../../interfaces";

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

interface Props {
	entry: Entry
}

export const EntryPage: FC<Props> = ({entry}) => {
	
	console.log({entry});

  const [inputValue, setInputValue] = useState(entry.description)
  const [status, setStatus] = useState<EntryStatus>(entry.status)
	const [touched, setTouched] = useState(false)
	
	// Validar el input es case de que esta vacio y haya sido tocado
	const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])


  // CUando el input de nueva entrada cambie
  const onInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
  };
  
  // Cuando el radio button cambie
  const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
		console.log(event.target.value);
		// Para  enviar el status debo indicar que es de tipo EntryStatus
    setStatus(event.target.value as EntryStatus);
  }

  // Salvar entrada
  const onSave = () => {
    console.log({inputValue, status});
  }

	return (
		<Layout title={inputValue.substring(0,10) + "..."}>
			<Grid container justifyContent="center" sx={{marginTop: 2}}>
				<Grid item xs={12} sm={8} md={6}>
					<Card>
						<CardHeader
							title={`Entrada:`}
							subheader={`Creada hace: ${entry.createdAt} minutos`}
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
								onBlur={() => setTouched(true)}
								onChange={onInputValueChange}
								helperText={isNotValid ? 'El campo no puede estar vacio' : ''}
								error={isNotValid}
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
								disabled={inputValue.length <= 0}
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


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({params}) => {
	
	// Obtener el id de la entrada
	// console.log(ctx.params);
	const { id } = params as { id: string };
	
	const entry =  await dbEntries.getEntrieByID(id);

	// Si el id no es valido no retornar la pagina, redireccionanda a la pagina de Home
	if (!entry) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			}
		}
	}

	return {
		props: {
			entry
		}
	}
}


export default EntryPage;
