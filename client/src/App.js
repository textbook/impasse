import React, { useEffect, useState } from "react";

import { getPassword } from "./services/passwordService";
import Config from "./Config";
import "./App.scss";

export const App = () => {
	const [config, setConfig] = useState({
		digits: 2,
		min: 8,
		max: 10,
	});
	const [errors, setErrors] = useState(null);
	const [loading, setLoading] = useState(true);
	const [password, setPassword] = useState(null);

	const updatePassword = () => {
		let mounted = true;
		setLoading(true);
		getPassword(config)
			.then((password) => {
				if (mounted) {
					setErrors(null);
					setLoading(false);
					setPassword(password);
				}
			})
			.catch((errors) => {
				if (mounted) {
					setErrors(errors);
					setLoading(false);
					setPassword("No password available");
				}
			});
		return () => mounted = false;
	};

	useEffect(updatePassword, [config]);

	const renderErrors = (descriptions) => (
		<ul className="error-list" data-qa="error">
			{descriptions.map((description, index) => <li key={index}>{description}</li>)}
		</ul>
	);

	return (
		<main role="main">
			<div>
				<h1 data-qa="title">Impasse</h1>
				<div className="password">
					<span data-qa="password">{loading ? "Loading..." : password}</span>
				</div>
				<button data-qa="refresh" onClick={updatePassword}>Refresh</button>
				<Config config={config} errorFields={errors && errors.fields} onChange={setConfig} />
				{errors && renderErrors(errors.descriptions)}
			</div>
		</main>
	);
};

export default App;
