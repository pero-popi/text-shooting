/**
 * Head element
 */
const head = document.head

/**
 * Body element
 */
const body = document.body

/**
 * Place style.css on the web page
 */
const link = document.createElement('link')
link.rel = 'stylesheet'
link.type = 'text/css'
link.href = chrome.runtime.getURL('style.css')
link.charset = 'UTF-8'
head.appendChild(link)

/**
 * Place main.js on the web page
 */
const script = document.createElement('script')
script.src = chrome.runtime.getURL('main.js')
script.charset = 'UTF-8'
body.appendChild(script)

/**
 * Place beam.mp3 on the web page
 */
const shot = document.createElement('audio')
shot.setAttribute('id', 'text-shooting-shot')
const shotSource = shot.appendChild(document.createElement('source'))
shotSource.setAttribute('src', chrome.runtime.getURL('sounds/beam.mp3'))
shot.appendChild(shotSource)
body.appendChild(shot)

/**
 * Place damage1.mp3 on the web page
 */
const damage1 = document.createElement('audio')
damage1.setAttribute('id', 'text-shooting-damage1')
const damageSource1 = damage1.appendChild(document.createElement('source'))
damageSource1.setAttribute('src', chrome.runtime.getURL('sounds/damage1.mp3'))
damage1.appendChild(damageSource1)
body.appendChild(damage1)

/**
 * Place damage2.mp3 on the web page
 */
const damage2 = document.createElement('audio')
damage2.setAttribute('id', 'text-shooting-damage2')
const damageSource2 = damage2.appendChild(document.createElement('source'))
damageSource2.setAttribute('src', chrome.runtime.getURL('sounds/damage2.mp3'))
damage2.appendChild(damageSource2)
body.appendChild(damage2)

/**
 * Place bom.mp3 on the web page
 */
const bom = document.createElement('audio')
bom.setAttribute('id', 'text-shooting-bom')
const bomSource = bom.appendChild(document.createElement('source'))
bomSource.setAttribute('src', chrome.runtime.getURL('sounds/bom.mp3'))
bom.appendChild(bomSource)
body.appendChild(bom)

/**
 * Place item.mp3 on the web page
 */
const item = document.createElement('audio')
item.setAttribute('id', 'text-shooting-item')
const itemSource = item.appendChild(document.createElement('source'))
itemSource.setAttribute('src', chrome.runtime.getURL('sounds/item.mp3'))
item.appendChild(itemSource)
body.appendChild(item)

/**
 * Place start.mp3 on the web page
 */
const start = document.createElement('audio')
start.setAttribute('id', 'text-shooting-start')
const startSource = item.appendChild(document.createElement('source'))
startSource.setAttribute('src', chrome.runtime.getURL('sounds/start.mp3'))
start.appendChild(startSource)
body.appendChild(start)

/**
 * Place dead.mp3 on the web page
 */
const dead = document.createElement('audio')
dead.setAttribute('id', 'text-shooting-dead')
const deadSource = item.appendChild(document.createElement('source'))
deadSource.setAttribute('src', chrome.runtime.getURL('sounds/dead.mp3'))
dead.appendChild(deadSource)
body.appendChild(dead)
