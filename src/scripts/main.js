/**
 *  Load module
 */
import Enemy from './modules/enemy'
import Fighter from './modules/fighter'
import Stage from './modules/stage'
import Status from './modules/status'

/**
 * Execution class
 * @public
 */
class Main {
  /**
   * Boolean value of whether the reset was performed
   * @type {boolean}
   */
  #isReset = true

  /**
   * Timeout ID
   * @type {NodeJS.Timeout | null}
   */
  #timeoutId = null

  /**
   * Status
   * @type {Status}
   */
  #status

  /**
   * Stage
   * @type {Stage}
   */
  #stage

  /**
   * Fighter
   * @type {Fighter}
   */
  #fighter

  /**
   * Enemy
   * @type {Enemy}
   */
  #enemy

  /**
   * Reset button
   * @type {HTMLDivElement}
   */
  #reset

  /**
   * Start button
   * @type {HTMLDivElement}
   */
  #start

  /**
   * URL
   * @type {string}
   */
  #url

  /**
   * Mouse X position
   * @type {number}
   */
  #mouseX = 0

  /**
   * Mouse Y position
   * @type {number}
   */
  #mouseY = 0

  /**
   * Start sound
   * @type {HTMLAudioElement}
   */
  #startSound

  /**
   * @constructor
   */
  constructor () {
    window.addEventListener('load', () => {
      if (window._wpemojiSettings) {
        window.twemoji = null
        window._wpemojiSettings = null
      }
      this.#status = new Status()
      this.#status.create()
      this.#reset = document.querySelector('status reset div')
      this.#start = document.querySelector('status start div')
      this.#startSound = document.getElementById('text-shooting-start')
      document.addEventListener('mousemove', (event) => {
        this.#mouseX = event.clientX
        this.#mouseY = event.clientY
      })
      this.#reset.addEventListener('click', () => {
        if (this.#isReset) {
          return
        }
        this.#isReset = true
        this.#status.hide()
        this.#fighter.remove()
        this.#enemy.remove()
        this.#stage.remove()
        document.querySelectorAll('start-text').forEach((node) => {
          try {
            document.body.removeChild(node)
          } catch (e) {
            console.log(e)
          }
        })
        document.querySelectorAll('item').forEach((node) => {
          try {
            document.body.removeChild(node)
          } catch (e) {
            console.log(e)
          }
        })
        document.querySelectorAll('shot-fighter').forEach((node) => {
          try {
            document.body.removeChild(node)
          } catch (e) {
            console.log(e)
          }
        })
        document.querySelectorAll('shot-enemy').forEach((node) => {
          try {
            document.body.removeChild(node)
          } catch (e) {
            console.log(e)
          }
        })
      })
      this.#start.addEventListener('click', () => {
        if (!this.#isReset) {
          return
        }
        this.#isReset = false
        this.#url = location.href
        if (!this.#stage) {
          this.#stage = new Stage()
          this.#stage.create()
          this.#stage.setTarget()
        } else {
          this.#stage.create()
          this.#stage.setTarget()
        }
        this.#status.show()
        if (!this.#fighter) {
          this.#fighter = new Fighter()
          this.#fighter.create(this.#mouseX, this.#mouseY)
        } else {
          this.#fighter.start(this.#mouseX, this.#mouseY)
        }
        if (!this.#enemy) {
          this.#enemy = new Enemy(this.#fighter, 300)
          this.#enemy.create()
        } else {
          this.#enemy.start()
        }
        this.#startSound.pause()
        this.#startSound.currentTime = 0
        this.#startSound.play()
      })
      document.addEventListener('keydown', (event) => {
        if (event.ctrlKey) {
          if (event.code === 'KeyS') {
            this.#start.click()
          } else if (event.code === 'KeyR') {
            this.#reset.click()
          }
        }
      })
      document.addEventListener('wheel', () => {
        clearTimeout(this.#timeoutId)
        this.#timeoutId = setTimeout(() => {
          if (this.#stage) {
            this.#stage.setTarget()
          }
        }, 300)
      })
      setInterval(() => {
        if (this.#isReset) {
          return
        }
        if (this.#url !== location.href) {
          this.#reset.click()
        }
      }, 1000)
      setInterval(() => {
        document.querySelectorAll('shot-fighter.is-hide').forEach((node) => {
          try {
            document.body.removeChild(node)
          } catch (e) {
            console.log(e)
          }
        })
        document.querySelectorAll('shot-enemy.is-hide').forEach((node) => {
          try {
            document.body.removeChild(node)
          } catch (e) {
            console.log(e)
          }
        })
      }, 60000)
    })
  }
}

new Main()
