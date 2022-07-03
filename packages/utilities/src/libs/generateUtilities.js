const responsive = require('../directives/responsive')
const flex = require('../generators/flex')
const textColors = require('../generators/textColors')
const backgroundColors = require('../generators/backgroundColors')
const sizing = require('../generators/sizing')

module.exports = function generateUtilities(root, opts) {
  root.walkAtRules('use', atRule => {
    if (atRule.params === 'utilities') {
      const utilities = [
        flex(opts),
        textColors(opts),
        backgroundColors(opts),
        sizing(opts),
      ].flat()

      atRule.before(responsive(utilities))
      atRule.remove()
    }
  })
}
