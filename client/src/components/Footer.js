import packageData from "../../../package.json";
import "./Footer.scss";
import madeWithBulma from "./made-with-bulma.png";

const { author: { name, url }, version } = packageData;

export default function Footer() {
	return (
		<footer className="footer">
			<div className="content has-text-centered">
				<p>
					<span>Version {version}</span>, developed by <a href={url}>{name}</a>.
					<a className="bulma-logo" href="https://bulma.io">
						<img src={madeWithBulma} alt="Made with Bulma" />
					</a>
				</p>
			</div>
		</footer>
	);
}
