import React, { useEffect, useState } from "react";

import { getPassword } from "./services/passwordService";
import Config from "./Config";
import Password from "./Password";
import { ErrorList, Footer, Header, Pwned } from "./components";
import "./App.scss";

export const App = () => {
	const [config, setConfig] = useState({
		digits: 2,
		min: 8,
		max: 10,
	});
	const [errors, setErrors] = useState(null);
	const [loading, setLoading] = useState(true);
	const [{ password, pwned }, setPassword] = useState({ password: "" });

	const updatePassword = () => {
		let mounted = true;
		setLoading(true);
		setPassword("");
		setErrors(null);
		getPassword(config)
			.then((password) => {
				if (mounted) {
					setPassword(password);
					setLoading(false);
				}
			})
			.catch((errors) => {
				if (mounted) {
					setErrors(errors);
					setLoading(false);
				}
			});
		return () => mounted = false;
	};

	useEffect(updatePassword, [config]);

	return (
		<main role="main">
			<Header />

			<section className="section">
				<div className="container">
					<Password
						loading={loading}
						password={password}
						onUpdate={updatePassword}
					/>
					{pwned && <Pwned />}
				</div>
			</section>

			<section className="section">
				<div className="container">
					<Config
						config={config}
						errorFields={errors && errors.fields}
						onChange={setConfig}
					/>
					{errors && <ErrorList errors={errors} />}
				</div>
			</section>

			<Footer />
		</main>
	);
};

export default App;
