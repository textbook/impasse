import React, { useEffect, useState } from "react";

import { getPassword } from "./service";
import Config from "./Config";

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

	const renderErrors = () => (
		<ul data-qa="error">
			{errors.map((err, index) => <li key={index}>{err.description}</li>)}
		</ul>
	);

	return (
		<main role="main">
			<div>
				<h1 data-qa="title">Impasse</h1>
				<p data-qa="password">{loading ? "Loading..." : password}</p>
				<button data-qa="refresh" onClick={updatePassword}>Refresh</button>
				<Config config={config} onChange={setConfig} />
				{errors && renderErrors()}
			</div>
		</main>
	);
};

export default App;
