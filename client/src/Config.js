import React, { Component } from "react";
import PropTypes from "prop-types";

export class Config extends Component {
	static propTypes = {
		config: PropTypes.shape({
			min: PropTypes.number,
			max: PropTypes.number,
		}).isRequired,
		onChange: PropTypes.func.isRequired,
	};

	handleChange = (prop) => (event) => {
		const { config, onChange } = this.props;
		onChange({ ...config, [prop]: parseInt(event.target.value) });
	};

	render() {
		const { config } = this.props;
		return (
			<div>
				<div>
					<label htmlFor="minLength">
						Minimum word length
						<input
							data-qa="minLength"
							id="minLength"
							onChange={this.handleChange("min")}
							type="number"
							value={config.min}
						/>
					</label>
				</div>
				<div>
					<label htmlFor="maxLength">
						Maximum word length
						<input
							data-qa="maxLength"
							id="maxLength"
							onChange={this.handleChange("max")}
							type="number"
							value={config.max}
						/>
					</label>
				</div>
			</div>
		);
	}
}

export default Config;
