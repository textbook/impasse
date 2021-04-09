import React, { useEffect, useState } from "react";

import { getPassword } from "./services/passwordService";
import Config from "./Config";
import Password from "./Password";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./App.scss";

const renderErrors = (descriptions) => (
	<ul className="error-list">
		{descriptions.map((description, index) => <li key={index}>{description}</li>)}
	</ul>
);

export const App = () => {
	const [config, setConfig] = useState({
		digits: 2,
		min: 8,
		max: 10,
	});
	const [errors, setErrors] = useState(null);
	const [loading, setLoading] = useState(true);
	const [password, setPassword] = useState("");

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
				</div>
			</section>

			<section className="section">
				<div className="container">
					<Config
						config={config}
						errorFields={errors && errors.fields}
						onChange={setConfig}
					/>
					{errors && renderErrors(errors.descriptions)}
				</div>
			</section>

			<Footer />
		</main>
	);
};

export default App;
