/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.{html,js}',
    '!./node_modules/**',
    '!./functions/**',
    '!./deploy/**',
    '!./temp/**',
    '!./shared/vendor/**',
    '!./tests/**',
  ],
  safelist: [
    { pattern: /^(bg|text)-(blue|emerald|green|violet|rose|amber|slate)-(50|100|600|700)$/ },
    { pattern: /^!(w|h|p|col-span)-/ },
  ],
};
