import "./Pwned.scss";

const Pwned = () => (
	<div className="pwned">
		<div className="message is-warning">
			<div className="message-body">
				<strong>This password has been pwned.</strong>
				{" "}
				This password has been found in a data breach listed on
				{" "}
				<a href="https://haveibeenpwned.com/">have i been pwned?</a>
				{" "}
				We would therefore recommend not using it! Hit the Refresh button to try again.
			</div>
		</div>
	</div>
);

export default Pwned;
