module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order'
  ],
  rules: {
    'order/properties-order': null,
    'rule-empty-line-before': null,
    'at-rule-empty-line-before': null,
    'declaration-empty-line-before': null,
    'number-max-precision': null,
    'color-hex-alpha': null,
    'color-hex-length': null,
    'color-function-notation': null,
    'value-no-vendor-prefix': null,
    'selector-class-pattern': null,
    'no-descending-specificity': null,
    'keyframes-name-pattern': null,
    'keyframe-selector-notation': null,
    'length-zero-no-unit': null,
    'keyframe-block-no-duplicate-selectors': null,
    'selector-type-no-unknown': null,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'mixin',
          'define-mixin'
        ]
      }
    ]
  }
}
