const marked = require('marked')

/**
 * Constants here.
 */
const cutoff = [
  '//i0.hdslb.com/bfs/article/',
  '0117cbba35e51b0bce5f8c2f6a838e8a087e8ee7.png',
  '4aa545dccf7de8d4a93c2b2b8e3265ac0a26d216.png',
  '71bf2cd56882a2e97f8b3477c9256f8b09f361d3.png',
  'db75225feabec8d8b64ee7d3c7165cd639554cbc.png',
  '4adb9255ada5b97061e610b682b8636764fe50ed.png',
  '02db465212d3c374a43c60fa2625cc1caeaab796.png'
]

const optionDefault = {
  hr: 1
}

let renderer = {
  local: new marked.Renderer(),
  remote: new marked.Renderer()
}

/**
 * initialize marked renderers
 * @param {*} option
 */
function initialize (option = optionDefault) {
  // hr, the difference is that the local one should be replaced
  renderer.local.hr = function () {
    return `<figure class="img-box" contenteditable="false">
      <img src="./assets/hr/${cutoff[option.hr]}" class="cut-off-${option.hr}" /></figure>`
  }

  renderer.remote.hr = function () {
    return `<figure class="img-box" contenteditable="false">
      <img src="${cutoff[0]}${cutoff[option.hr]}" class="cut-off-${option.hr}" /></figure>`
  }

  // Header
  renderer.local.heading = renderer.remote.heading = function (text, level, raw) {
    return `<h${level}>${text}</h${level}>`
  }

  // HTML
  renderer.local.html = function (html) {
    console.log(html)

    // <hr> replace
    if (html.match('<hr( )*(/)*>')) return renderer.local.hr()
    // Else
    else return html
  }

  // Text
  /*
    renderer.local.text = function(text){
        return `<p>${text}</p>`;
    }
  */
}

/**
 * Exports
 */

function getLocalRenderer () {
  return renderer.local
}

function getRemoteRenderer () {
  return renderer.remote
}

exports.getLocalRenderer = getLocalRenderer
exports.getRemoteRenderer = getRemoteRenderer
exports.initialize = initialize
