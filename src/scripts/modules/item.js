/**
 * Item
 * @public
 */
class Item {
  /**
   * Element
   * @type {Element}
   */
  #node

  /**
   * Fighter
   * @type {Fighter}
   */
  #fighter

  /**
   * X position
   * @type {number}
   */
  #posX = 100

  /**
   * Y position
   * @type {number}
   */
  #posY = 50

  /**
   * Speed in X direction
   * @type {number}
   */
  #speedX = 2

  /**
   * Speed in Y direction
   * @type {number}
   */
  #speedY = 1

  /**
   * Item type
   * @type {number}
   */
  #type

  /**
   * Item list
   * @type {string[]}
   */
  #itemList = [
    '💥',
    '🏥',
    '🆙',
    '🆙',
    '🆙',
    '🆙'
  ]

  /**
   * Item sound
   * @type {HTMLAudioElement}
   */
  #itemSound

  /**
   * @constructor
   */
  constructor (fighter) {
    this.#node = document.createElement('item')
    this.#itemSound = document.getElementById('text-shooting-item')
    this.#fighter = fighter
  }

  /**
   * Create
   * @returns {void}
   */
  create () {
    this.#type = Math.floor(Math.random() * this.#itemList.length)
    this.#node.innerHTML = this.#itemList[this.#type]
    document.body.appendChild(this.#node)
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
    this.#posX += this.#speedX
    this.#posY += this.#speedY
    const radius = (this.#node.clientWidth / 2)
    if (this.#posX < 0 + radius || this.#posX > window.innerWidth - radius) {
      this.#speedX = -this.#speedX
    }
    if (this.#posY < 0 + radius || this.#posY > window.innerHeight - radius) {
      this.#speedY = -this.#speedY
    }
    this.#node.style.top = this.#posY + 'px'
    this.#node.style.left = this.#posX + 'px'
    if (this.#hitTest()) {
      this.#remove()
      if (this.#type === 0) {
        this.#fighter.addBomber()
      } else if (this.#type === 1) {
        this.#fighter.addLife()
      } else {
        this.#fighter.addType()
      }
      return
    }
    requestAnimationFrame(this.#move.bind(this))
  }

  /**
   * Hit test
   * @returns {boolean} True if there is a collision
   */
  #hitTest () {
    if (!this.#node) {
      return false
    }
    const item = (() => {
      const rect = this.#node.getBoundingClientRect()
      return {
        top: rect.top,
        left: rect.left,
        right: rect.left + rect.width,
        bottom: rect.top + rect.height
      }
    })()
    const fighter = (() => {
      const rect = this.#fighter.node.getBoundingClientRect()
      return {
        top: rect.top,
        left: rect.left,
        right: rect.left + rect.width,
        bottom: rect.top + rect.height
      }
    })()
    if (item.left < fighter.right && item.top < fighter.bottom && item.right > fighter.left && item.bottom > fighter.top) {
      this.#itemSound.pause()
      this.#itemSound.currentTime = 0
      this.#itemSound.play()
      return true
    }
    return false
  }

  /**
   * Remove
   * @returns {void}
   */
  #remove () {
    try {
      document.body.removeChild(this.#node)
    } catch (e) {
      console.log(e)
    }
    this.#node = null
  }
}

export default Item
