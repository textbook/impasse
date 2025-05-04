import clsx from "clsx";

export default function Password(props) {
	const { loading, onUpdate, password } = props;
	return (
		<div className="field is-horizontal">
			<div className="field-label is-normal">
				<label htmlFor="password" className="label">
					Password
				</label>
			</div>
			<div className="field-body">
				<div className="field has-addons">
					<div
						className={clsx("control", "is-expanded", loading && "is-loading")}
						data-testid="password-wrapper"
					>
						<input
							className="input"
							id="password"
							placeholder={password ? "" : "No password available"}
							readOnly
							value={password}
						/>
					</div>
					<div className="control">
						<button className="button is-dark" onClick={onUpdate}>
							Refresh
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
