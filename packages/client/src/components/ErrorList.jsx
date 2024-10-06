import PropTypes from "prop-types";

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

ErrorList.propTypes = {
	errors: PropTypes.shape({
		descriptions: PropTypes.arrayOf(PropTypes.string),
	}).isRequired,
};

export default ErrorList;
