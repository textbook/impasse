import React, { Component } from "react";

import { getPassword } from "./service";

export class App extends Component {
	state = { password: "Loading..." };

	componentDidMount() {
		getPassword().then((password) => this.setState({ password }));
	}

	render() {
		const { password } = this.state;
		return (
			<main role="main">
				<div>
					<h1 data-qa="title">Impasse</h1>
					<p data-qa="password">{password}</p>
				</div>
			</main>
		);
	}
}

export default App;
