module.exports = {
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest'
  },
  globals: {
    require: true,
    location: true,
    window: true,
    document: true,
    setTimeout: true,
    clearTimeout: true,
    setInterval: true,
    navigator: true,
    NodeList: true,
    HTMLElement: true,
    CSSStyleSheet: true,
    alert: true,
    console: true,
    IntersectionObserver: true,
    sessionStorage: true,
    requestAnimationFrame: true,
    getComputedStyle: true,
    chrome: true
  }
}
