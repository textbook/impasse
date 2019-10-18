export const validateConfig = (config) => {
	const { max, min } = config;
	const errors = [];
	const validatePositive = (field, name) => {
		if (config[field] < 1) {
			errors.push({ description: `${name} must be positive`, fields: [field] });
		}
	};
	const validateNumerical = (field, name) => {
		if (isNaN(config[field])) {
			errors.push({ description: `${name} must be a number`, fields: [field] });
		}
	};
	if (max < min) {
		errors.push({
			description: "Maximum length cannot be less than minimum length",
			fields: ["max", "min"],
		});
	}
	validatePositive("digits", "Number of digits");
	validatePositive("min", "Minimum length");
	validatePositive("max", "Maximum length");
	validateNumerical("digits", "Number of digits");
	validateNumerical("min", "Minimum length");
	validateNumerical("max", "Maximum length");
	return errors.length > 0 ? errors : null;
};
