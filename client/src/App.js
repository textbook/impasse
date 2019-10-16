import React, { Component } from "react";

import { getPassword } from "./service";
import Config from "./Config";

export class App extends Component {
	state = {
		config: {
			min: 8,
			max: 10,
		},
		password: "Loading...",
	};

	componentDidMount () {
		this.updatePassword();
	}

	updateConfig = (config) => {
		this.setState({ config }, () => this.updatePassword());
	};

	updatePassword = () => {
		const { config } = this.state;
		getPassword(config).then((password) => this.setState({ password }));
	};

	render() {
		const { config, password } = this.state;
		return (
			<main role="main">
				<div>
					<h1 data-qa="title">Impasse</h1>
					<p data-qa="password">{password}</p>
					<Config config={config} onChange={this.updateConfig} />
				</div>
			</main>
		);
	}
}

export default App;
