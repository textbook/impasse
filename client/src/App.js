import React, { Component } from "react";

import { getPassword } from "./service";
import Config from "./Config";

export class App extends Component {
	state = {
		config: {
			min: 8,
			max: 10,
		},
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
			getPassword(config).then((password) => this.setState({ loading: false, password }));
		});
	};

	render() {
		const { config, loading, password } = this.state;
		return (
			<main role="main">
				<div>
					<h1 data-qa="title">Impasse</h1>
					<p data-qa="password">{loading ? "Loading..." : password}</p>
					<button data-qa="refresh" onClick={this.updatePassword}>Refresh</button>
					<Config config={config} onChange={this.updateConfig} />
				</div>
			</main>
		);
	}
}

export default App;
