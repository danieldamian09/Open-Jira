import { Button, Card, CardActions, CardContent, CardHeader, Grid, TextField } from "@mui/material";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import {Layout} from "../../components/layouts";

export const EntryPage = () => {
	return (
		<Layout title="... .... ...">
			<Grid container justifyContent="center" sx={{marginTop: 2}}>
				<Grid item xs={12} sm={8} md={6}>
					<Card>
						<CardHeader
							title="Entrda:"
							subheader={`Creada hace: .... minutos`}
            />
            <CardContent>
              <TextField
                sx={{ marginBottom: 1, marginTop: 2 }}
                fullWidth
                placeholder='Nueva Entrada'
                autoFocus
                multiline
                label='Nueva Entrada'
              />

              {/* TODO: Radio */}

            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveOutlinedIcon />}
                variant="contained"
                fullWidth
              >
                Save
              </Button>
            </CardActions>
					</Card>
				</Grid>
			</Grid>
		</Layout>
	);
};

export default EntryPage;
