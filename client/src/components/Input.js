import PropTypes from "prop-types";
import React from "react";

export default function Input(props) {
	const { error, id, label, onChange, value } = props;
	return (
		<div className="field is-horizontal">
			{label && (
				<div className="field-label is-normal">
					<label htmlFor={id} className="label">
						{label}
					</label>
				</div>
			)}
			<div className="field-body">
				<div className="field">
					<div className="control">
						<input
							className={`${error ? "is-danger " : ""}input`}
							id={id}
							onChange={onChange}
							type="number"
							value={value}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

Input.propTypes = {
	error: PropTypes.bool,
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.number.isRequired,
};
