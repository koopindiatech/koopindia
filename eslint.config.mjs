import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextVitals,
  {
    ignores: [".next/**", "out/**", "build/**", "node_modules/**", "test-results/**", "analyze/**"],
  },
];

export default eslintConfig;
