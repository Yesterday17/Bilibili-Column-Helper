import marked from 'marked'
import Prism from 'prismjs'
import * as languages from './languages'

// https://github.com/jGleitz/markdown-it-prism/blob/master/index.js

const cutoff = [
  '//i0.hdslb.com/bfs/article/',
  '0117cbba35e51b0bce5f8c2f6a838e8a087e8ee7.png',
  '4aa545dccf7de8d4a93c2b2b8e3265ac0a26d216.png',
  '71bf2cd56882a2e97f8b3477c9256f8b09f361d3.png',
  'db75225feabec8d8b64ee7d3c7165cd639554cbc.png',
  '4adb9255ada5b97061e610b682b8636764fe50ed.png',
  '02db465212d3c374a43c60fa2625cc1caeaab796.png'
]

function loadPrismLang (lang) {
  let langObject = Prism.languages[lang]
  if (langObject === undefined) {
    try {
      require('prismjs/components/prism-' + lang)
      return Prism.languages[lang]
    } catch (e) {
    }
  }
  return langObject
}

export function render (code) {
  const defaultOption = {
    hr: 3
  }

  let renderer = new marked.Renderer()

  renderer.hr = function () {
    return (
      '<figure class="img-box" contenteditable="false">' +
      `<img src="${cutoff[0]}${cutoff[defaultOption.hr]}" class="cut-off-${
        option.hr
      }" />` +
      '</figure>'
    )
  }

  renderer.code = (code, language, isEscaped) => {
    let lang = loadPrismLang(language)
    const rendered = Prism.highlight(code, lang)
    const dataLang = languages.languagesC.get(language.toUpperCase())
    return '<figure class="code-box focused" contenteditable="false">' +
    `<pre class="language-${language}" contenteditable="false" data-lang="${dataLang}"><code class="language-${language}"  contenteditable="false">${rendered}</code></pre>` +
    '</figure>'
  }

  return marked(code, {
    renderer: renderer
  })
}
