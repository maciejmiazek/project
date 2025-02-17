import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
	const navigate = useNavigate();

	const handleRedirect = (e) => {
		e.preventDefault()
		navigate("/planowanie")
	}

	return (
		<div className='login-page'>
			<h1>Logowanie</h1>
			<form onSubmit={handleRedirect}>
				<input type="text" name="login" id="login" placeholder="Login" defaultValue="administator" value={'administator'}/>
				<input type="password" name="pass" id="password" placeholder="Hasło" />
				<button type="submit">Zaloguj</button>
			</form>
		</div>
	);
}

export default LoginPage;
