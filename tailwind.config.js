module.exports = {
  content: [
    './src/**/*.css',
    './src/**/*.js',
    './src/**/*.html'
  ],
  theme: {
    extend: {
      screens: {
        xl: { min: '1280px' },
        'lg-over': { min: '1024px' },
        lg: { min: '1024px', max: '1279px' },
        'lg-under': { max: '1279px' },
        'md-over': { min: '768px' },
        md: { min: '768px', max: '1023px' },
        'md-under': { max: '1023px' },
        'sm-over': { min: '360px' },
        sm: { min: '360px', max: '767px' },
        'sm-under': { max: '767px' },
        xs: { max: '359px' }
      },
      colors: {
        text: '#000000',
        white: '#FFFFFF'
      },
      fontFamily: {
        base: ['YuGothic', '游ゴシック', 'Hiragino Kaku Gothic Pro', 'ヒラギノ角ゴ Pro W3', 'Noto Sans JP', 'メイリオ', 'Meiryo', 'sans-serif']
      },
      borderColor: theme => theme('colors'),
      placeholderColor: theme => theme('colors'),
      fontSize: (() => {
        let min = 1
        const max = 100
        const data = {}
        while (max >= min) {
          data[`${min}px`] = `${(min / 16) * (14 / 14)}rem`
          min++
        }
        return data
      })(),
      borderRadius: (() => {
        let min = 1
        const max = 100
        const data = {
          '50%': '50%'
        }
        while (max >= min) {
          data[`${min}px`] = `${min}px`
          min++
        }
        return data
      })(),
      width: (() => {
        let min = 1
        const max = 1280
        const data = {}
        while (max >= min) {
          data[`${min}px`] = `${min}px`
          min++
        }
        return data
      })(),
      maxWidth: (() => {
        let min = 1
        const max = 1280
        const data = {}
        while (max >= min) {
          data[`${min}px`] = `${min}px`
          min++
        }
        return data
      })(),
      minWidth: (() => {
        let min = 1
        const max = 1280
        const data = {}
        while (max >= min) {
          data[`${min}px`] = `${min}px`
          min++
        }
        return data
      })(),
      height: (() => {
        let min = 1
        const max = 1280
        const data = {}
        while (max >= min) {
          data[`${min}px`] = `${min}px`
          min++
        }
        return data
      })(),
      maxHeight: (() => {
        let min = 1
        const max = 1280
        const data = {}
        while (max >= min) {
          data[`${min}px`] = `${min}px`
          min++
        }
        return data
      })(),
      minHeight: (() => {
        let min = 1
        const max = 1280
        const data = {}
        while (max >= min) {
          data[`${min}px`] = `${min}px`
          min++
        }
        return data
      })(),
      margin: (() => {
        let min = -1000
        const max = 1000
        const data = {}
        while (max >= min) {
          data[`${min}px`] = `${min}px`
          min++
        }
        return data
      })(),
      padding: (() => {
        let min = -1000
        const max = 1000
        const data = {}
        while (max >= min) {
          data[`${min}px`] = `${min}px`
          min++
        }
        return data
      })(),
      inset: (() => {
        let min = -1000
        const max = 1000
        const data = {}
        while (max >= min) {
          data[`${min}px`] = `${min}px`
          min++
        }
        return data
      })(),
      zIndex: (() => {
        let min = 1
        const max = 100
        const data = {}
        while (max >= min) {
          data[min] = min
          min++
        }
        return data
      })()
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
