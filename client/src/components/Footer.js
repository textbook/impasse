import React from "react";
import madeWithBulma from "./made-with-bulma.png";

export default function Footer() {
	return (
		<footer className="footer">
			<div className="content has-text-centered">
				<p>
					Developed by <a href="https://github.com/textbook">Jonathan Sharpe</a>.
					<a className="bulma-logo" href="https://bulma.io">
						<img src={madeWithBulma} alt="Made with Bulma" />
					</a>
				</p>
			</div>
		</footer>
	);
}
