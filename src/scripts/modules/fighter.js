import Enemy from './enemy'
import ShotFighter from './shot-fighter'
import Status from './status'

/**
 * Fighter
 * @public
 */
class Fighter {
  /**
   * Element
   * @type {Element}
   */
  #node

  /**
   * Events
   * @type {{name: Function}}
   */
  #events

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
   * Fighter type
   * @type {number}
   */
  #type = 1

  /**
   * Shot speed
   * @type {number}
   */
  #shotSpeed = 100

  /**
   * Timeout ID
   * @type {NodeJS.Timeout | null}
   */
  #timeoutId = null

  /**
   * Timeout ID2
   * @type {NodeJS.Timeout | null}
   */
  #timeoutId2 = null

  /**
   * Boolean value indicating whether the event has started
   * @type {boolean}
   */
  #isStart = false

  /**
   * Boolean value of whether or not an attack is in progress
   * @type {boolean}
   */
  #isAttack = false

  /**
   * Boolean value for whether or not the bomb is in use
   * @type {boolean}
   */
  #isBomber = false

  /**
   * Shot sound
   * @type {HTMLAudioElement}
   */
  #shotSound

  /**
   * Bomb sound
   * @type {HTMLAudioElement}
   */
  #bomSound

  /**
   * Game over sound
   * @type {HTMLAudioElement}
   */
  #deadSound

  /**
   * @constructor
   */
  constructor () {
    this.#shotSound = document.getElementById('text-shooting-shot')
    this.#bomSound = document.getElementById('text-shooting-bom')
    this.#deadSound = document.getElementById('text-shooting-dead')
    this.#events = {
      keydown: (event) => {
        if (event.code === 'KeyZ') {
          this.#attack()
        } else if (event.code === 'KeyX') {
          this.#bomber()
        }
      },
      keyup: (event) => {
        if (event.code === 'KeyZ') {
          this.#cancel()
        }
      },
      mouseover: (event) => {
        this.#setPosition(event)
      },
      mousemove: (event) => {
        this.#setPosition(event)
      },
      mouseout: () => {
        this.#node.classList.add('is-hide')
      }
    }
  }

  /**
   * Create
   * @param {number} mouseX Mouse X position
   * @param {number} mouseY Mouse Y position
   * @returns {void}
   */
  create (mouseX, mouseY) {
    this.#mouseX = mouseX
    this.#mouseY = mouseY
    this.#node = document.createElement('fighter')
    document.body.appendChild(this.#node)
    this.#createBomber()
    this.start(mouseX, mouseY)
  }

  /**
   * Start
   * @param {number} mouseX Mouse X position
   * @param {number} mouseY Mouse Y position
   * @returns {void}
   */
  start (mouseX, mouseY) {
    this.#mouseX = mouseX
    this.#mouseY = mouseY
    this.#node.classList.remove('is-hide')
    document.body.classList.add('is-active')
    document.addEventListener('keydown', this.#events.keydown)
    document.addEventListener('keyup', this.#events.keyup)
    document.addEventListener('mouseover', this.#events.mouseover)
    document.addEventListener('mousemove', this.#events.mousemove)
    document.addEventListener('mouseout', this.#events.mouseout)
    this.#node.style.top = this.#mouseY - (this.#node.clientWidth / 2) + 'px'
    this.#node.style.left = this.#mouseX - (this.#node.clientHeight / 2) + 'px'
  }

  /**
   * Get fighter type
   * @returns {number} Fighter type
   */
  get type () {
    return this.#type
  }

  /**
   * Set fighter type
   * @returns {void}
   */
  set type (type) {
    this.#type = type
  }

  /**
   * Get element
   * @returns {Element} Element
   */
  get node () {
    return this.#node
  }

  /**
   * Damage
   * @returns {void}
   */
  damage () {
    if (this.#node.classList.contains('is-hide')) {
      return
    }
    clearTimeout(this.#timeoutId2)
    this.#node.classList.add('is-damage')
    const status = document.querySelector('status')
    status.classList.remove(`is-${Status.life}`)
    Status.life--
    status.classList.add(`is-${Status.life}`)
    this.#timeoutId2 = setTimeout(() => {
      this.#node.classList.remove('is-damage')
    }, 300)
    if (Status.life <= 0) {
      const score = Status.score
      this.remove()
      const endText = document.createElement('start-text')
      endText.innerHTML = `GAME OVER<br><span>SCORE ${score.toLocaleString()}</span>`
      document.body.appendChild(endText)
      this.#deadSound.pause()
      this.#deadSound.currentTime = 0
      this.#deadSound.play()
    }
    if (this.#type > 0) {
      this.#type--
    }
  }

  /**
   * Remove
   * @returns {void}
   */
  remove () {
    document.removeEventListener('keydown', this.#events.keydown)
    document.removeEventListener('keyup', this.#events.keyup)
    document.removeEventListener('mouseover', this.#events.mouseover)
    document.removeEventListener('mousemove', this.#events.mousemove)
    document.removeEventListener('mouseout', this.#events.mouseout)
    this.#cancel()
    this.#node.classList.add('is-hide')
    document.body.classList.remove('is-active')
    Status.score = 0
    Status.bomber = 3
    Status.life = 10
    ShotFighter.score = 0
    this.#type = 1
    this.#createBomber()
    const status = document.querySelector('status')
    if (status.classList.length !== 0) {
      status.classList.remove('is-show')
      status.classList.remove('is-0')
      status.classList.remove('is-1')
      status.classList.remove('is-2')
      status.classList.remove('is-3')
      status.classList.remove('is-4')
      status.classList.remove('is-5')
      status.classList.remove('is-6')
      status.classList.remove('is-7')
      status.classList.remove('is-8')
      status.classList.remove('is-9')
      status.classList.remove('is-10')
    }
    Enemy.attackState = false
  }

  /**
   * Boolean value indicating whether the event has started
   * @returns {boolean}
   */
  isStart () {
    return this.#isStart
  }

  /**
   * Add bomb
   * @returns {void}
   */
  addBomber () {
    Status.bomber++
    this.#createBomber()
  }

  /**
   * Add life
   * @returns {void}
   */
  addLife () {
    const status = document.querySelector('status')
    status.classList.remove(`is-${Status.life}`)
    Status.life++
    if (Status.life > 10) {
      Status.life = 10
    }
    status.classList.add(`is-${Status.life}`)
  }

  /**
   * Add fighter type
   * @returns {void}
   */
  addType () {
    if (this.#type === 2) {
      return
    }
    this.#type++
  }

  /**
   * Mouse position setting
   * @param {MouseEvent}
   * @returns {void}
   */
  #setPosition (event) {
    if (!this.#isStart) {
      this.#isStart = true
      document.body.classList.add('is-active')
      this.#move()
    }
    if (this.#node.classList.contains('is-hide')) {
      this.#node.classList.remove('is-hide')
    }
    this.#mouseX = event.clientX
    this.#mouseY = event.clientY
  }

  /**
   * Move
   * @returns {void}
   */
  #move () {
    this.#node.style.top = this.#mouseY - (this.#node.clientWidth / 2) + 'px'
    this.#node.style.left = this.#mouseX - (this.#node.clientHeight / 2) + 'px'
    requestAnimationFrame(this.#move.bind(this))
  }

  /**
   * Attack
   * @returns {void}
   */
  #attack () {
    if (!this.#isAttack) {
      this.#isAttack = true
      this.#shot()
    }
  }

  /**
   * Shot
   * @returns {void}
   */
  #shot () {
    if (this.#node.classList.contains('is-hide')) {
      return
    }
    if (this.#type === 0) {
      const shot1 = new ShotFighter(this, 1)
      shot1.create()
    } else if (this.#type === 1) {
      const shot1 = new ShotFighter(this, 1)
      const shot5 = new ShotFighter(this, 5)
      const shot6 = new ShotFighter(this, 6)
      shot1.create()
      shot5.create()
      shot6.create()
    } else if (this.#type === 2) {
      const shot1 = new ShotFighter(this, 1)
      const shot2 = new ShotFighter(this, 2)
      const shot5 = new ShotFighter(this, 5)
      const shot6 = new ShotFighter(this, 6)
      const shot7 = new ShotFighter(this, 7)
      const shot8 = new ShotFighter(this, 8)
      shot1.create()
      shot2.create()
      shot5.create()
      shot6.create()
      shot7.create()
      shot8.create()
    }
    this.#shotSound.pause()
    this.#shotSound.currentTime = 0
    this.#shotSound.play()
    if (this.#isAttack) {
      this.#timeoutId = setTimeout(() => {
        this.#shot()
      }, this.#shotSpeed)
    }
  }

  /**
   * Cancel
   * @returns {void}
   */
  #cancel () {
    clearTimeout(this.#timeoutId)
    this.#isAttack = false
  }

  /**
   * Bomb making
   * @returns {void}
   */
  #createBomber () {
    const bomber = document.querySelector('status bomber div')
    bomber.innerHTML = ''
    let html = ''
    for (let i = 0; i < Status.bomber; i++) {
      html += '<div>💥</div>'
    }
    bomber.innerHTML = html
  }

  /**
   * Bomber
   * @returns {void}
   */
  #bomber () {
    if (this.#node.classList.contains('is-hide')) {
      return
    }
    if (Status.bomber <= 0) {
      return
    }
    if (!this.#isBomber) {
      this.#isBomber = true
      Status.bomber--
      this.#createBomber()
      document.body.classList.add('is-bomber')
      document.querySelectorAll('shot-enemy').forEach((node) => {
        node.classList.add('is-hide')
      })
      document.querySelectorAll('char[data-target="true"]').forEach((node) => {
        node.classList.add('is-hide')
        node.dataset.target = false
      })
      this.#isBomber = false
      this.#bomSound.pause()
      this.#bomSound.currentTime = 0
      this.#bomSound.play()
      setTimeout(() => {
        document.body.classList.remove('is-bomber')
      }, 500)
    }
  }
}

export default Fighter
