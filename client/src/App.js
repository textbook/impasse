import React, { Component } from "react";

import { getMessage } from "./service";

export class App extends Component {
	state = { message: "Loading..." };

	componentDidMount() {
		getMessage().then((message) => this.setState({ message }));
	}

	render() {
		const { message } = this.state;
		return (
			<main role="main">
				<div>
					<h1 data-qa="title">Impasse</h1>
					<p data-qa="message">{message}</p>
				</div>
			</main>
		);
	}
}

export default App;
