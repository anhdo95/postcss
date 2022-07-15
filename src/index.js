import fs from 'fs'
import postcss from 'postcss'
import postcssPresetEnv from 'postcss-preset-env'

import corePlugins from './core/plugins'
import resolveConfig from './utils/resolveConfig'
import processPlugins from './utils/processPlugins'
import useAtRule from './libs/useAtRule'
import evaluateFunctions from './libs/evaluateFunctions'
import applyAtRule from './libs/applyAtRule'
import variantsAtRule from './libs/variantsAtRule'
import responsiveAtRule from './libs/responsiveAtRule'
import formatNodes from './libs/formatCSS'

export default postcss.plugin('fast', () => {
  function getConfig() {
    if (!fs.existsSync('./fast.config.js')) {
      return resolveConfig([require('./default.config.js')])
    }

    return resolveConfig([
      require('../fast.config.js'),
      require('./default.config.js'),
    ])
  }
  const config = getConfig()
  const plugins = processPlugins(
    [...corePlugins(config), ...config.plugins],
    config
  )

  return postcss([
    useAtRule(config, plugins),
    evaluateFunctions(config),
    variantsAtRule(config, plugins),
    responsiveAtRule(config),
    applyAtRule(config),
    formatNodes,
    postcssPresetEnv,
  ])
})
