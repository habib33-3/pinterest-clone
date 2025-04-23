/** @type {import("lint-staged").Config} */
export default {
  "apps/frontend/**": ["cd apps/frontend && lint-staged"],
  "apps/backend/**": ["cd apps/backend && lint-staged"],
  "**/*.{js,ts,jsx,tsx,mjs}": ["eslint --fix", "prettier --write"],
  "**/*.{json,css,md}": ["prettier --write"],
};
