/**
 * Status
 * @public
 */
class Status {
  /**
   * Life
   * @type {number}
   */
  static life = 10

  /**
   * Score
   * @type {number}
   */
  static score = 10

  /**
   * Number of bombs
   * @type {number}
   */
  static bomber = 3

  /**
   * Target element
   * @type {Element}
   */
  #node

  /**
   * @constructor
   */
  constructor () {
    this.#node = document.createElement('status')
    const score = document.createElement('score')
    const point = document.createElement('point')
    const div1 = document.createElement('div')
    point.appendChild(div1)
    const start = document.createElement('start')
    const div2 = document.createElement('div')
    div2.innerHTML = '▶'
    start.appendChild(div2)
    const reset = document.createElement('reset')
    const div3 = document.createElement('div')
    div3.innerHTML = '■'
    const div4 = document.createElement('div')
    reset.appendChild(div3)
    score.appendChild(point)
    div4.appendChild(start)
    div4.appendChild(reset)
    score.appendChild(div4)
    const life = document.createElement('life')
    life.appendChild(document.createElement('div'))
    const bomber = document.createElement('bomber')
    bomber.appendChild(document.createElement('div'))
    this.#node.appendChild(life)
    this.#node.appendChild(score)
    this.#node.appendChild(bomber)
  }

  /**
   * Create
   * @returns {void}
   */
  create () {
    document.body.appendChild(this.#node)
  }

  /**
   * Show
   * @returns {void}
   */
  show () {
    this.#node.querySelector('status point div').innerHTML = 'SCORE &nbsp;<span>0</span>'
    this.#node.classList.add('is-show')
  }

  /**
   * Hide
   * @returns {void}
   */
  hide () {
    this.#node.classList.remove('is-show')
  }
}

export default Status
