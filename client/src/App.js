import { useEffect, useState } from "react";

import { getPassword } from "./services/passwordService";
import Config from "./Config";
import Password from "./Password";
import { ErrorList, Footer, Header, Pwned } from "./components";
import "./App.scss";
import Strength from "./components/Strength";

const defaultValues = { password: "", pwned: false, words: 0 };

export const App = () => {
	const [config, setConfig] = useState({
		digits: 2,
		min: 8,
		max: 10,
	});
	const [errors, setErrors] = useState(null);
	const [loading, setLoading] = useState(true);
	const [{ password, pwned, words }, setData] = useState(defaultValues);

	const updatePassword = () => {
		let mounted = true;
		setData(defaultValues);
		setErrors(null);
		setLoading(true);
		getPassword(config)
			.then((data) => {
				if (mounted) {
					setData(data);
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
					{words && <Strength config={config} words={words} />}
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
