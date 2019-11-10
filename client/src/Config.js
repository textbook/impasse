import PropTypes from "prop-types";
import React from "react";

import Input from "./components/Input";

export function Config({ config, errorFields, onChange }) {
	const handleChange = (prop) => (event) => {
		onChange({ ...config, [prop]: parseInt(event.target.value) });
	};
	return (
		<>
			<Input
				error={errorFields && errorFields.includes("min")}
				id="minLength"
				label="Minimum word length"
				onChange={handleChange("min")}
				value={config.min}
			/>
			<Input
				error={errorFields && errorFields.includes("max")}
				id="maxLength"
				label="Maximum word length"
				onChange={handleChange("max")}
				value={config.max}
			/>
			<Input
				error={errorFields && errorFields.includes("digits")}
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
	errorFields: PropTypes.arrayOf(PropTypes.string),
	onChange: PropTypes.func.isRequired,
};

export default Config;
