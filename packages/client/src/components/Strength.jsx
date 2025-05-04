import PropTypes from "prop-types";

import "./Strength.scss";

const CHARACTERS = 44;

export default function Strength({ config: { digits, max, min }, words }) {
	const minLength = min + digits + min + 1;
	const maxLength = max + digits + max + 1;
	const minNaive = Math.log2(CHARACTERS ** minLength);
	const maxNaive = Math.log2(CHARACTERS ** maxLength);
	const actual = Math.log2(words * (10 ** digits) * (words - 1) * 8);
	const equivalent = Math.round(Math.log(2 ** actual) / Math.log(CHARACTERS));

	const length = min !== max
		? `between ${minLength} and ${maxLength} characters`
		: `${minLength} characters`;

	const naive = min !== max
		? `between ${minNaive.toFixed(2)} and ${maxNaive.toFixed(2)}`
		: minNaive.toFixed(2);

	return (
		<div className="message is-info">
			<div className="message-body">
				These passwords are only
				{" "}
				<em>moderately</em>
				{" "}
				secure.
				{" "}
				Given a character set of
				{" "}
				{CHARACTERS}
				{" "}
				characters and a password length of
				{" "}
				{length}
				{" "}
				you would calculate
				{" "}
				<span>
					a naive entropy of
					{" "}
					{naive}
				</span>
				.
				{" "}
				However, the structure of these passwords (word, digit(s), word, symbol) means that the
				{" "}
				<span>
					actual entropy is
					{" "}
					{actual.toFixed(2)}
					{" "}
					(equivalent to
					{" "}
					{equivalent}
					{" "}
					character
					{equivalent === 1 ? "" : "s"}
					)
				</span>
				.
			</div>
		</div>
	);
}

Strength.propTypes = {
	config: PropTypes.shape({
		digits: PropTypes.number.isRequired,
		max: PropTypes.number.isRequired,
		min: PropTypes.number.isRequired,
	}).isRequired,
	words: PropTypes.number.isRequired,
};
