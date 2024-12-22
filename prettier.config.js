/** @type {import("prettier").Config} */
module.exports = {
  printWidth: 80, // default: 80
  tabWidth: 2, // indent_size = 2 (default)
  useTabs: false, // indent_style = space (default)
  semi: true, // default: true
  singleQuote: true, // default: false
  trailingComma: 'es5', // default
  bracketSpacing: true, //default
  arrowParens: 'always', //default
  bracketSameLine: false, //default
  importOrder: [
    '^(react/(.*)$)|^(react$)',
    '^(next/(.*)$)|^(next$)',
    '<THIRD_PARTY_MODULES>',
    '',
    '^types$',
    '^@/env(.*)$',
    '^@/types/(.*)$',
    '^@/config/(.*)$',
    '^@/lib/(.*)$',
    '^@/hooks/(.*)$',
    '^@/components/ui/(.*)$',
    '^@/components/(.*)$',
    '^@/styles/(.*)$',
    '^@/app/(.*)$',
    '',
    '^[./]',
  ],
  // parser: "flow",
  endOfLine: 'lf', // end_of_line = lf (default)
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy']
};
