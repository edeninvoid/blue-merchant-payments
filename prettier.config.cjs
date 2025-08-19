/** @type {import("prettier").Config} */
module.exports = {
    semi: true,
    singleQuote: true,
    trailingComma: 'all',
    printWidth: 80,
    tabWidth: 2,
    arrowParens: 'avoid',
    plugins: [
        require.resolve('prettier-plugin-tailwindcss'),
    ],
};
