import React, { useEffect, useState } from "react";

import { getPassword } from "./service";
import Config from "./Config";

export const App = () => {
	const [config, setConfig] = useState({
		digits: 2,
		min: 8,
		max: 10,
	});
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [password, setPassword] = useState(null);

	const updatePassword = () => {
		let mounted = true;
		setLoading(true);
		getPassword(config)
			.then((password) => {
				if (mounted) {
					setError(null);
					setLoading(false);
					setPassword(password);
				}
			})
			.catch((error) => {
				if (mounted) {
					setError(error);
					setLoading(false);
					setPassword("No password available");
				}
			});
		return () => mounted = false;
	};

	useEffect(updatePassword, [config]);

	return (
		<main role="main">
			<div>
				<h1 data-qa="title">Impasse</h1>
				<p data-qa="password">{loading ? "Loading..." : password}</p>
				{error && <p data-qa="error">{error}</p>}
				<button data-qa="refresh" onClick={updatePassword}>Refresh</button>
				<Config config={config} onChange={setConfig} />
			</div>
		</main>
	);
};

export default App;
