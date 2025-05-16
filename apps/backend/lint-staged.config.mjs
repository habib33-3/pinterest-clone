export default {
    "**/*.{js,ts,mjs}": ["eslint --fix", "prettier --write"],
    "**/*.{json,css,md}": ["prettier --write"],
};
