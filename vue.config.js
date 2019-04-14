module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './.'
    : '/',
  pluginOptions: {
    i18n: {
      locale: 'zh_cn',
      fallbackLocale: 'zh_cn',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
