// eslint-disable-next-line @typescript-eslint/no-var-requires,max-len
const withTM = require('next-transpile-modules')([
  'react-datepicker',
  'react-loader-spinner',
]); // pass the modules you would like to see transpiled

module.exports = withTM({});
