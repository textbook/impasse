import PropTypes from "prop-types";
import React from "react";

import { NumberControl } from "./NumberControl";

const summarise = (errors) => {
	const fields = [];
	(errors || []).forEach((error) => {
		error.fields.forEach((field) => {
			if (!fields.includes(field)) {
				fields.push(field);
			}
		});
	});
	return fields;
};

export function Config({ config, errors, onChange }) {
	const handleChange = (prop) => (event) => {
		onChange({ ...config, [prop]: parseInt(event.target.value) });
	};
	const errorFields = summarise(errors);
	return (
		<>
			<NumberControl
				error={errorFields.includes("min")}
				id="minLength"
				label="Minimum word length"
				onChange={handleChange("min")}
				value={config.min}
			/>
			<NumberControl
				error={errorFields.includes("max")}
				id="maxLength"
				label="Maximum word length"
				onChange={handleChange("max")}
				value={config.max}
			/>
			<NumberControl
				error={errorFields.includes("digits")}
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
	errors: PropTypes.arrayOf(PropTypes.shape({
		description: PropTypes.string,
		fields: PropTypes.arrayOf(PropTypes.string),
	})),
	onChange: PropTypes.func.isRequired,
};

export default Config;
