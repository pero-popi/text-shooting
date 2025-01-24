/**
 * Stage
 * @public
 */
class Stage {
  /**
   * Exclude tag list
   * @type {string[]}
   */
  #nodeNames = [
    'script',
    'style',
    'iframe',
    'canvas',
    'video',
    'audio',
    'textarea',
    'embed',
    'object',
    'select',
    'area',
    'map',
    'input'
  ]

  /**
   * Create
   * @returns {void}
   */
  create () {
    this.#splitNodes(document.body.childNodes)
  }

  /**
   * Remove
   * @returns {void}
   */
  remove () {
    document.querySelectorAll('wrap').forEach((wrap) => {
      wrap.innerHTML = wrap.innerHTML.replace(/<char(?: .+?)?>/g, '').replace(/<\/char>/g, '')
    })
    document.querySelectorAll('wrap').forEach((wrap) => {
      while (wrap.firstChild) {
        wrap.parentNode.insertBefore(wrap.firstChild, wrap)
      }
      wrap.remove()
    })
  }

  /**
   * Set the target
   * @returns {void}
   */
  setTarget () {
    this.#splitNodes(document.body.childNodes)
    document.querySelectorAll('char').forEach((node) => {
      const rect = node.getBoundingClientRect()
      if ((rect.top >= 0 && rect.bottom <= window.innerHeight) && node.offsetWidth !== 0 
      && node.offsetHeight !== 0 && !node.classList.contains('is-hide')) {
        node.dataset.target = true
      } else {
        node.dataset.target = false
      }
    })
  }

  /**
   * Split characters from a node list
   * @param {Element[]} nodes Node list
   * @returns {void}
   */
  #splitNodes (nodes) {
    nodes.forEach((node) => {
      if (!node.tagName) {
        this.#splitNode(node)
      } else if (node.tagName.toLowerCase() !== 'point' && node.tagName.toLowerCase() !== 'bomber' 
      && node.tagName.toLowerCase() !== 'wrap' && node.tagName.toLowerCase() !== 'char' 
      && node.tagName.toLowerCase() !== 'item' && node.tagName.toLowerCase() !== 'start' 
      && node.tagName.toLowerCase() !== 'reset' && node.tagName.toLowerCase() !== 'start-text') {
        this.#splitNode(node)
      }
    })
  }

  /**
   * Split characters from a node
   * @param {Element} node Node
   * @returns {void}
   */
  #splitNode (node) {
    if (this.#nodeNames.indexOf(node.nodeName.toLowerCase()) !== -1) {
      return
    }
    if (node.nodeType === 1) {
      this.#splitNodes(node.childNodes)
    } else if (node.nodeType === 3) {
      if (!/^\s*$/.test(node.nodeValue)) {
        const newNode = document.createElement('wrap')
        newNode.innerHTML = this.#splitText(node.nodeValue)
        node.parentNode.replaceChild(newNode, node)
      }
    }
  }

  /**
   * Wrap the string in char tags
   * @param {string} str string
   * @returns {string} A string enclosed in char tags
   */
  #splitText (str) {
    const chars = ((results) => {
      const strings = str.split('')
      strings.forEach((char) => {
        if (!/^\s*$/.test(char)) {
          results.push(`<char>${char}</char>`)
        } else {
          results.push('&nbsp;')
        }
      })
      return results.join('')
    })([])
    return ((results) => {
      const strings = chars.split('&nbsp;')
      strings.forEach((char) => {
        results.push(char)
      })
      return results.join(' ')
    })([])
  }
}

export default Stage
