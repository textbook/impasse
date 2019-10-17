import PropTypes from "prop-types";
import React from "react";

export function NumberControl(props) {
	const { label, id, onChange, value } = props;
	return (
		<div>
			<label htmlFor={id}>
				{label}
				<input data-qa={id} id={id} onChange={onChange} type="number" value={value} />
			</label>
		</div>
	);
}

NumberControl.propTypes = {
	id: PropTypes.string,
	label: PropTypes.string,
	onChange: PropTypes.func,
	value: PropTypes.number,
};
