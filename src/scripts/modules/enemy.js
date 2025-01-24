import ShotEnemy from './shot-enemy'

/**
 * Enemy
 * @public
 */
class Enemy {
  /**
   * Boolean value of attack presence/absence
   * @type {boolean}
   */
  static attackState = true

  /**
   * Enemy list
   * @type {Element[]}
   */
  #enemyList = []

  /**
   * Fighter
   * @type {Fighter}
   */
  #fighter

  /**
   * Attack interval
   * @type {number}
   */
  #attackInterval

  /**
   * Boolean value indicating whether the event has started
   * @type {boolean}
   */
  #isStart = false

  /**
   * @constructor
   * @param {Fighter} fighter Fighter
   * @param {number} attackInterval Attack interval
   */
  constructor (fighter, attackInterval) {
    this.#fighter = fighter
    this.#attackInterval = attackInterval
    document.querySelectorAll('char').forEach((node) => {
      this.#enemyList.push(node)
    })
  }

  /**
   * Create
   * @returns {void}
   */
  create () {
    this.#isStart = true
    this.#attack()
  }

  /**
   * Boolean value indicating whether the event has started
   * @returns {boolean} True if the event is started
   */
  isStart () {
    return this.#isStart
  }

  /**
   * Remove
   * @returns {void}
   */
  remove () {
    Enemy.attackState = false
    this.#enemyList.forEach((node) => {
      node.classList.remove('is-hide')
    })
    document.querySelectorAll('shot-enemy').forEach((node) => {
      node.classList.add('is-hide')
    })
  }

  /**
   * Start
   * @returns {void}
   */
  start () {
    Enemy.attackState = true
    this.#attack()
  }

  /**
   * Attack
   * @returns {void}
   */
  #attack () {
    if (!Enemy.attackState) {
      return
    }
    const list = document.querySelectorAll('char[data-target="true"]')
    if (list.length === 0) {
      setTimeout(() => {
        this.#attack()
      }, this.#attackInterval)
      return
    }
    const index = Math.floor(Math.random() * list.length)
    const enemy = list[index]
    if (enemy.classList.contains('is-hide')) {
      this.#attack()
      return
    }
    const rect = enemy.getBoundingClientRect()
    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
      enemy.classList.add('is-fire')
      const shot = new ShotEnemy(enemy, this.#fighter)
      setTimeout(() => {
        shot.create()
      }, 500)
    }
    setTimeout(() => {
      this.#attack()
    }, this.#attackInterval)
  }
}

export default Enemy
