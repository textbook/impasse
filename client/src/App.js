import React, { Component } from "react";

import { getPassword } from "./service";
import Config from "./Config";

export class App extends Component {
	state = {
		config: {
			min: 8,
			max: 10,
		},
		error: null,
		loading: true,
		password: null,
	};

	componentDidMount () {
		this.updatePassword();
	}

	updateConfig = (config) => {
		this.setState({ config }, () => this.updatePassword());
	};

	updatePassword = () => {
		const { config } = this.state;
		this.setState({ loading: true }, () => {
			getPassword(config)
				.then((password) => this.setState({ error: null, loading: false, password }))
				.catch((error) => this.setState({ error, loading: false, password: "No password available" }));
		});
	};

	render() {
		const { config, error, loading, password } = this.state;
		return (
			<main role="main">
				<div>
					<h1 data-qa="title">Impasse</h1>
					<p data-qa="password">{loading ? "Loading..." : password}</p>
					{error && <p data-qa="error">{error}</p>}
					<button data-qa="refresh" onClick={this.updatePassword}>Refresh</button>
					<Config config={config} onChange={this.updateConfig} />
				</div>
			</main>
		);
	}
}

export default App;
