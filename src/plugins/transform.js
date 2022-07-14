module.exports = function transform({ variants }) {
  return function ({ addUtilities }) {
    addUtilities(
      {
        '.transform': {
          '--transform-translate-x': 0,
          '--transform-translate-y': 0,
          '--transform-rotate': 0,
          transform: [
            'translateX(var(--transform-translate-x))',
            'translateY(var(--transform-translate-y))',
            'rotate(var(--transform-rotate))',
          ].join(' '),
        },
      },
      variants
    )
  }
}
