import PropTypes from "prop-types";
import React, { Component } from "react";

import { NumberControl } from "./NumberControl";

export class Config extends Component {
	static propTypes = {
		config: PropTypes.shape({
			digits: PropTypes.number,
			min: PropTypes.number,
			max: PropTypes.number,
		}).isRequired,
		onChange: PropTypes.func.isRequired,
	};

	handleChange = (prop) => (event) => {
		const { config, onChange } = this.props;
		onChange({ ...config, [prop]: parseInt(event.target.value) });
	};

	render() {
		const { config } = this.props;
		return (
			<>
				<NumberControl
					id="minLength"
					label="Minimum word length"
					onChange={this.handleChange("min")}
					value={config.min}
				/>
				<NumberControl
					id="maxLength"
					label="Maximum word length"
					onChange={this.handleChange("max")}
					value={config.max}
				/>
				<NumberControl
					id="digits"
					label="Number of digits"
					onChange={this.handleChange("digits")}
					value={config.digits}
				/>
			</>
		);
	}
}

export default Config;
