import {React, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";

function LoginPage() {
	const navigate = useNavigate();
	const [error, setError] = useState(null);

	const [formData, setFormData] = useState({
		login: "administrator",
		pass: "",
	});

	const handleRedirect = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post('/api/logowanie', formData);
			
			if (response.status === 200) {
				console.log(response.data);
				
			 	navigate("/planowanie");
			}else{
				console.log('esz');
			}

		} catch (e) {
			setError(e)
		}
	};

	return (
		<div className='login-page'>
			<h1>Logowanie</h1>
			<form onSubmit={handleRedirect}>
				<input
					type='text'
					name='login'
					id='login'
					placeholder='Login'
					defaultValue='administrator'
					onChange={(e) => setFormData({ ...formData, login: e.target.value })}
				/>
				<input
					type="password"
					name="pass"
					id="password"
					placeholder="Hasło"
					onChange={(e) => setFormData({ ...formData, pass: e.target.value })}
				/>
				{error && <p>Wprowadzono błędne dane</p>}
				<button type='submit'>Zaloguj</button>
			</form>
		</div>
	);
}

export default LoginPage;
