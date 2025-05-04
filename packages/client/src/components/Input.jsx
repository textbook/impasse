import clsx from "clsx";

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
							className={clsx("input", error && "is-danger")}
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
