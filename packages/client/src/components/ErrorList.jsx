import "./ErrorList.scss";

const ErrorList = ({ errors: { descriptions } }) => (
	<div className="message is-danger">
		<div className="message-body">
			<ul className="error-list">
				{descriptions.map((description, index) => <li key={index}>{description}</li>)}
			</ul>
		</div>
	</div>
);

export default ErrorList;
