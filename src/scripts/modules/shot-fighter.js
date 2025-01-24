import Item from './item'
import Status from './status'

/**
 * Fighter shot
 * @public
 */
class ShotFighter {
  /**
   * Score
   * @type {number}
   */
  static score = 0

  /**
   * Damage sound
   * @type {HTMLAudioElement}
   */
  static damageSound

  /**
   * Enemy list
   * @type {Array<{node: Element, top: number, left: number, right: number, bottom: number}>}
   */
  #enemyList = []

  /**
   * Fighter
   * @type {Fighter}
   */
  #fighter

  /**
   * Element
   * @type {Element}
   */
  #node

  /**
   * Current position
   * @type {number}
   */
  #position = 0

  /**
   * Movement speed
   * @type {number}
   */
  #speed = 5

  /**
   * Type
   * @type {number}
   */
  #type = 0

  /**
   * Static initialization
   * @static
   */
  static {
    ShotFighter.damageSound = document.getElementById('text-shooting-damage1')
  }

  /**
   * @constructor
   * @param {Fighter} fighter Fighter
   * @param {number} type Type
   */
  constructor (fighter, type) {
    this.#fighter = fighter
    this.#type = type
    this.#node = document.createElement('shot-fighter')
    this.#node.innerHTML = '●'
    document.body.appendChild(this.#node)
    document.querySelectorAll('char[data-target="true"]').forEach((node) => {
      const rect = node.getBoundingClientRect()
      this.#enemyList.push({
        node,
        top: rect.top,
        left: rect.left,
        right: rect.left + rect.width,
        bottom: rect.top + rect.height
      })
    })
  }

  /**
   * Create
   * @returns {void}
   */
  create () {
    this.#node.style.top = parseInt(this.#fighter.node.style.top) + (this.#fighter.node.clientHeight / 2) - (this.#node.clientHeight / 2) - 6 + 'px'
    this.#node.style.left = parseInt(this.#fighter.node.style.left) + (this.#fighter.node.clientWidth / 2) - (this.#node.clientWidth / 2) - 6 + 'px'
    this.#node.classList.add('is-active')
    this.#move()
  }

  /**
   * Move
   * @returns {void}
   */
  #move () {
    if (!this.#node) {
      return
    }
    this.#position += this.#speed
    if (this.#type === 1) {
      this.#node.style.transform = `translateY(-${this.#position}px)`
    } else if (this.#type === 2) {
      this.#node.style.transform = `translateY(${this.#position}px)`
    } else if (this.#type === 3) {
      this.#node.style.transform = `translateX(-${this.#position}px)`
    } else if (this.#type === 4) {
      this.#node.style.transform = `translateX(${this.#position}px)`
    } else if (this.#type === 5) {
      this.#node.style.transform = `translateY(-${this.#position}px) translateX(-${(this.#position / 4)}px)`
    } else if (this.#type === 6) {
      this.#node.style.transform = `translateY(-${this.#position}px) translateX(${(this.#position / 4)}px)`
    } else if (this.#type === 7) {
      this.#node.style.transform = `translateY(${this.#position}px) translateX(-${(this.#position / 4)}px)`
    } else if (this.#type === 8) {
      this.#node.style.transform = `translateY(${this.#position}px) translateX(${(this.#position / 4)}px)`
    }
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
    if (this.#type === 1 && shot.top < 0) {
      this.#remove()
      return true
    }
    if (this.#type === 2 && shot.top > window.innerHeight) {
      this.#remove()
      return true
    }
    if (this.#type === 3 && shot.left < 0) {
      this.#remove()
      return true
    }
    if (this.#type === 4 && shot.left > window.innerWidth) {
      this.#remove()
      return true
    }
    if (this.#type === 5 && shot.top < 0) {
      this.#remove()
      return true
    }
    if (this.#type === 6 && shot.top < 0) {
      this.#remove()
      return true
    }
    if (this.#type === 7 && shot.top > window.innerHeight) {
      this.#remove()
      return true
    }
    if (this.#type === 8 && shot.top > window.innerHeight) {
      this.#remove()
      return true
    }
    for (const enemy of this.#enemyList) {
      if (enemy.node.classList.contains('is-hide')) {
        continue
      }
      if (shot.left < enemy.right && shot.top < enemy.bottom && shot.right > enemy.left && shot.bottom > enemy.top) {
        enemy.node.classList.add('is-hide')
        enemy.node.dataset.target = false
        this.#remove()
        const point = document.querySelector('point div span')
        Status.score++
        ShotFighter.score++
        if (Status.score < 99999999999) {
          point.innerHTML = Status.score.toLocaleString()
        }
        if (ShotFighter.score >= 200) {
          ShotFighter.score = 0
          const item = new Item(this.#fighter)
          item.create()
        }
        ShotFighter.damageSound.pause()
        ShotFighter.damageSound.currentTime = 0
        ShotFighter.damageSound.play()
        return true
      }
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

export default ShotFighter
