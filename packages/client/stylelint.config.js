'use strict'

module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-styled-components',
    'stylelint-config-prettier',
  ],
  plugins: ['stylelint-order'],
  processors: ['stylelint-processor-styled-components'],
  rules: {
    'declaration-empty-line-before': [
      'never',
      { ignore: ['after-comment', 'after-declaration'] },
    ],
    'order/order': [
      'custom-properties',
      'dollar-variables',
      'declarations',
      'rules',
      'at-rules',
    ],
  },
}
