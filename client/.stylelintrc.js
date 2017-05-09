module.exports = {
  "extends": "stylelint-config-standard",
  "defaultSeverity": "error",
  "plugins": ["stylelint-order"],
  "rules": {
    // "order/declaration-block-properties-alphabetical-order": true,
    "function-comma-space-after": "always-single-line",
    "selector-pseudo-element-colon-notation": "single",
    "declaration-block-no-duplicate-properties": [
      true, {
        "ignore": "consecutive-duplicates"
      }
    ],
    "number-leading-zero": "always",
    "color-hex-case": "upper"
  }
}
