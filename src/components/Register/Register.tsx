import './Register.css';
import { TextField, Button, Typography, Box, Container } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';

export default function Register() {
	return (
		<Container fixed maxWidth="sm">
			<Typography
				variant="h1"
				component="h1"
				sx={{
					fontFamily: 'Ubuntu',
					fontSize: '26px',
					fontWeight: '400',
					lineHeight: '32px',
					mt: 4,
					ml: 0,
					marginTop: 3,
					mb: 1,
				}}
			>
				Регистрация
			</Typography>
			<Box
				component="form"
				sx={{
					'& > :not(style)': { m: 1, width: '100%', ml: 0, mb: 0 },
				}}
				noValidate
				autoComplete="off"
			>
				<TextField
					id="outlined-basic"
					variant="outlined"
					type="text"
					sx={{
						backgroundColor: '#FDFAF2',
						outline: 'none',
					}}
					placeholder="Имя, Фамилия"
				/>
				<TextField
					id="outlined-basic"
					variant="outlined"
					type="phone"
					style={{ backgroundColor: '#FDFAF2' }}
					placeholder="Моб.телефон"
				/>
				<TextField
					id="outlined-basic"
					type="email"
					variant="outlined"
					style={{ backgroundColor: '#FDFAF2' }}
					placeholder="Эл.почта"
				/>

				<TextField
					id="outlined-basic"
					type="password"
					variant="outlined"
					sx={{
						backgroundColor: '#FDFAF2',
					}}
					placeholder="Пароль"
				/>
				<TextField
					id="outlined-basic"
					type="password"
					variant="outlined"
					sx={{
						backgroundColor: '#FDFAF2',
					}}
					placeholder="Пароль повторно"
				/>
				<FormGroup>
					<FormControlLabel
						control={<Checkbox style={{ width: 41, height: 41 }} />}
						label="Соглашаюсь на обработку персональных данных"
					/>
				</FormGroup>
			</Box>

			<Stack direction="row" spacing={2}>
				<Button
					href="/"
					variant="contained"
					sx={{
						backgroundColor: '#fff',
						color: '#006C60',
						borderRadius: '100px',
						width: '50%',
						mt: 1,
						mb: 3,
						'&:active': {
							backgroundColor: '#C41A68',
						},
						'&:hover': {
							backgroundColor: '#fff',
						},
					}}
				>
					Отмена
				</Button>

				<Button
					variant="contained"
					sx={{
						backgroundColor: '#006C60',
						borderRadius: '100px',
						width: '50%',
						mt: 1,
						mb: 3,
						'&:disabled': {
							backgroundColor: '#1D1B201F',
							opacity: 0.12,
						},
						'&:hover': {
							backgroundColor: '#006C60',
						},
					}}
					// onClick={handleSubmit}
				>
					Зарегистрироваться
				</Button>
			</Stack>
		</Container>
	);
}
