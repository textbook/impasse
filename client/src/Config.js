import PropTypes from "prop-types";
import React from "react";

import { NumberControl } from "./NumberControl";

export function Config(props) {
	const { config, onChange } = props;
	const handleChange = (prop) => (event) => {
		onChange({ ...config, [prop]: parseInt(event.target.value) });
	};
	return (
		<>
			<NumberControl
				id="minLength"
				label="Minimum word length"
				onChange={handleChange("min")}
				value={config.min}
			/>
			<NumberControl
				id="maxLength"
				label="Maximum word length"
				onChange={handleChange("max")}
				value={config.max}
			/>
			<NumberControl
				id="digits"
				label="Number of digits"
				onChange={handleChange("digits")}
				value={config.digits}
			/>
		</>
	);
}

Config.propTypes = {
	config: PropTypes.shape({
		digits: PropTypes.number,
		min: PropTypes.number,
		max: PropTypes.number,
	}).isRequired,
	onChange: PropTypes.func.isRequired,
};

export default Config;
