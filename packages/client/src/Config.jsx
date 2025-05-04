import { Input } from "./components";

export function Config({ config, errorFields, onChange }) {
	const handleChange = ({ target: { name, value } }) => {
		onChange({ ...config, [name]: parseInt(value) });
	};
	return (
		<>
			<Input
				error={errorFields && errorFields.includes("min")}
				label="Minimum word length"
				name="min"
				onChange={handleChange}
				value={config.min}
			/>
			<Input
				error={errorFields && errorFields.includes("max")}
				label="Maximum word length"
				name="max"
				onChange={handleChange}
				value={config.max}
			/>
			<Input
				error={errorFields && errorFields.includes("digits")}
				label="Number of digits"
				name="digits"
				onChange={handleChange}
				value={config.digits}
			/>
		</>
	);
}

export default Config;
