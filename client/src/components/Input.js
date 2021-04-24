import PropTypes from "prop-types";

export default function Input({ error, label, name, onChange, value }) {
	const id = `${name}-input`;
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
							name={name}
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
	label: PropTypes.string,
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.number.isRequired,
};
