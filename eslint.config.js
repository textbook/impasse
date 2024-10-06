import vitest from "@vitest/eslint-plugin";
import cyf from "@codeyourfuture/eslint-config-standard";
import cypress from "eslint-plugin-cypress/flat";
import jest from "eslint-plugin-jest";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

/** @type {import("eslint").Linter.FlatConfig} */
export default [
	cyf,
	{
		files: ["packages/client/**/*.js{,x}"],
		languageOptions: {
			...react.configs.flat.recommended.languageOptions,
			globals: globals.browser,
		},
		plugins: {
			"jsx-a11y": jsxA11y,
			react,
			"react-hooks": reactHooks,
		},
		rules: {
			...react.configs.flat.recommended.rules,
			...react.configs.flat["jsx-runtime"].rules,
			...jsxA11y.flatConfigs.strict.rules,
			"react/jsx-tag-spacing": "error",
			"react/no-unused-prop-types": "error",
			"react-hooks/rules-of-hooks": "error",
			"react-hooks/exhaustive-deps": "error",
			"no-console": "error",
		},
		settings: {
			react: {
				version: "detect",
			},
		},
	},
	{
		files: [
			"packages/client/src/**/*.test.js{,x}",
			"packages/client/src/setupTests.js",
		],
		languageOptions: {
			globals: vitest.environments.env.globals,
		},
		...vitest.configs.recommended,
	},
	{
		files: ["packages/e2e/{integration,support}/**/*.js"],
		...cypress.configs.recommended,
		rules: {
			...cypress.configs.recommended.rules,
			"cypress/unsafe-to-chain-command": "off",
		},
	},
	{
		files: [
			"packages/server/**/*.js",
		],
		languageOptions: {
			globals: globals.node,
		},
		rules: {
			"no-console": "error",
		},
	},
	{
		files: [
			"packages/client/vite.config.js",
			"packages/e2e/cypress.config.js",
		],
		languageOptions: {
			globals: globals.node,
		},
	},
	{
		files: ["packages/server/__tests__/**/*.js"],
		...jest.configs["flat/recommended"],
		rules: {
			...jest.configs["flat/recommended"].rules,
			"jest/expect-expect": [
				"error",
				{
					"assertFunctionNames": [
						"expect",
						"request.**.expect",
					],
				},
			],
			"jest/no-disabled-tests": "error",
			"jest/no-focused-tests": "error",
		},
	},
	{ ignores: ["dist/"] },
];
