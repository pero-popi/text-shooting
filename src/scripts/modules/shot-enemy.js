/**
 * Enemy shot
 * @public
 */
class ShotEnemy {
  /**
   * Damage sound
   * @type {HTMLAudioElement}
   */
  static damageSound

  /**
   * Enemy
   * @type {Enemy}
   */
  #enemy

  /**
   * Fighter
   * @type {Fighter}
   */
  #fighter

  /**
   * Fighter position
   * @type {DOMRect}
   */
  #fighterRect

  /**
   * Element
   * @type {Element}
   */
  #node

  /**
   * Element position
   * @type {DOMRect}
   */
  #nodeRect

  /**
   * Angle
   * @type {number}
   */
  #angle

  /**
   * Movement speed
   * @type {number}
   */
  #speed = 5

  /**
   * Static initialization
   * @static
   */
  static {
    ShotEnemy.damageSound = document.getElementById('text-shooting-damage2')
  }

  /**
   * @constructor
   * @param {Enemy} enemy Enemy
   * @param {Fighter} fighter Fighter
   */
  constructor (enemy, fighter) {
    this.#enemy = enemy
    this.#fighter = fighter
    this.#node = document.createElement('shot-enemy')
    this.#node.innerHTML = '●'
    document.body.appendChild(this.#node)
  }

  /**
   * Create
   * @returns {void}
   */
  create () {
    const rect = this.#enemy.getBoundingClientRect()
    this.#node.style.top = rect.top + (rect.height / 2) - (rect.height / 2) - 2 + 'px'
    this.#node.style.left = rect.left + (rect.width / 2) - (rect.width / 2) - 2 + 'px'
    this.#node.classList.add('is-active')
    this.#fighterRect = this.#fighter.node.getBoundingClientRect()
    this.#nodeRect = this.#node.getBoundingClientRect()
    this.#angle = Math.atan2((this.#fighterRect.top - this.#nodeRect.top), (this.#fighterRect.left - this.#nodeRect.left))
    if (this.#nodeRect.top !== -2 && this.#nodeRect.left !== -2) {
      this.#move()
    } else {
      this.#remove()
    }
  }

  /**
   * Move
   * @returns {void}
   */
  #move () {
    if (!this.#node || this.#node.classList.contains('is-hide')) {
      return
    }
    const rect = this.#node.getBoundingClientRect()
    this.#node.style.top = rect.top + (Math.sin(this.#angle) * this.#speed) + 'px'
    this.#node.style.left = rect.left + (Math.cos(this.#angle) * this.#speed) + 'px'
    if (!this.#hitTest()) {
      requestAnimationFrame(this.#move.bind(this))
    }
  }

  /**
   * Hit test
   * @returns {boolean} True if there is a collision
   */
  #hitTest () {
    if (!this.#node) {
      return true
    }
    const shot = (() => {
      const rect = this.#node.getBoundingClientRect()
      return {
        top: rect.top,
        left: rect.left,
        right: rect.left + rect.width,
        bottom: rect.top + rect.height
      }
    })()
    if (shot.top < 0 || shot.top > window.innerHeight || shot.left < 0 || shot.left > window.innerWidth) {
      this.#remove()
      return true
    }
    const fighter = (() => {
      const rect = this.#fighter.node.getBoundingClientRect()
      return {
        top: rect.top,
        left: rect.left,
        right: rect.left + rect.width,
        bottom: rect.top + rect.height
      }
    })()
    if (shot.left < fighter.right && shot.top < fighter.bottom && shot.right > fighter.left && shot.bottom > fighter.top) {
      this.#remove()
      this.#fighter.damage()
      ShotEnemy.damageSound.pause()
      ShotEnemy.damageSound.currentTime = 0
      ShotEnemy.damageSound.play()
      return true
    }
    return false
  }

  /**
   * Remove
   * @returns {void}
   */
  #remove () {
    this.#node.classList.add('is-hide')
    this.#node.innerHTML = ''
    this.#node = null
  }
}

export default ShotEnemy
