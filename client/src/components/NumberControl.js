import PropTypes from "prop-types";
import React from "react";

import "./NumberControl.scss";

export function NumberControl(props) {
	const { error, id, label, onChange, value } = props;
	return (
		<div className="control">
			<label className={error ? "error" : ""} htmlFor={id}>
				{label}
				<input
					className={error ? "error" : ""}
					data-qa={id}
					id={id}
					onChange={onChange}
					type="number"
					value={value}
				/>
			</label>
		</div>
	);
}

NumberControl.propTypes = {
	error: PropTypes.bool,
	id: PropTypes.string,
	label: PropTypes.string,
	onChange: PropTypes.func,
	value: PropTypes.number,
};
