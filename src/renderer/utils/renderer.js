import marked from 'marked'

const cutoff = [
  '//i0.hdslb.com/bfs/article/',
  '0117cbba35e51b0bce5f8c2f6a838e8a087e8ee7.png',
  '4aa545dccf7de8d4a93c2b2b8e3265ac0a26d216.png',
  '71bf2cd56882a2e97f8b3477c9256f8b09f361d3.png',
  'db75225feabec8d8b64ee7d3c7165cd639554cbc.png',
  '4adb9255ada5b97061e610b682b8636764fe50ed.png',
  '02db465212d3c374a43c60fa2625cc1caeaab796.png'
]

export const defaultOption = {
  hr: 3
}

export let renderer = new marked.Renderer()

export function configure (options) {
  renderer.hr = function () {
    return '<figure class="img-box" contenteditable="false">' +
      `<img src="${cutoff[0]}${cutoff[option.hr]}" class="cut-off-${option.hr}" />` +
      '</figure>'
  }
}

export function render (code, renderer) {
  return marked(code, { renderer: renderer })
}
