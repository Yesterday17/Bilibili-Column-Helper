import marked from 'marked'
import Prism from 'prismjs'
import * as languages from './languages'

// https://github.com/jGleitz/markdown-it-prism/blob/master/index.js

function RendererException (message) {
  this.message = message
}

const cutoff = [
  '//i0.hdslb.com/bfs/article/',
  '0117cbba35e51b0bce5f8c2f6a838e8a087e8ee7.png',
  '4aa545dccf7de8d4a93c2b2b8e3265ac0a26d216.png',
  '71bf2cd56882a2e97f8b3477c9256f8b09f361d3.png',
  'db75225feabec8d8b64ee7d3c7165cd639554cbc.png',
  '4adb9255ada5b97061e610b682b8636764fe50ed.png',
  '02db465212d3c374a43c60fa2625cc1caeaab796.png'
]

function loadPrismLang (lang, oriLang) {
  let langObject = Prism.languages[lang]
  try {
    if (langObject === undefined) {
      if (
        languages.unSupported.indexOf(lang) !== -1 ||
        (!languages.languagesC.has(lang.toUpperCase()) &&
          !languages.languagesC.has(oriLang.toUpperCase()))
      ) {
        throw new RendererException(lang)
      }
      require('prismjs/components/prism-' + lang)
      return { isSupported: true, content: Prism.languages[lang] }
    }
    return { isSupported: true, content: langObject }
  } catch (e) {
    return { isSupported: false, content: e.message }
  }
}

export function render (code) {
  const defaultOption = {
    hr: 3
  }

  let renderer = new marked.Renderer()

  renderer.hr = () => {
    return (
      '<figure class="img-box" contenteditable="false">' +
      `<img src="${cutoff[0]}${cutoff[defaultOption.hr]}" class="cut-off-${
        defaultOption.hr
      }" />` +
      '</figure>'
    )
  }

  renderer.heading = (text, level, raw) => {
    if (level === 1) {
      return `<h1>${text}</h1>`
    }
    return `<p>${raw}</p>`
  }

  renderer.code = (code, language, isEscaped) => {
    // 4-space codeblock
    if (language === undefined) {
      return `<p>&nbsp;&nbsp;&nbsp;&nbsp;${code}</p>`
    }

    // Others
    try {
      // shell-like problem
      let oriLang = language
      if (languages.translate.has(language.toUpperCase())) {
        language = languages.translate.get(language.toUpperCase())
      } else if (languages.renderName.has(language.toUpperCase())) {
        oriLang = languages.renderName.get(language.toUpperCase()).render
        language = languages.renderName.get(language.toUpperCase()).ori
      }

      let lang = loadPrismLang(language, oriLang)

      if (!lang.isSupported) {
        throw new RendererException(lang.content)
      }
      const rendered = Prism.highlight(code, lang.content)
      const dataLang = languages.languagesC.get(oriLang.toUpperCase())

      return (
        '<figure class="code-box focused" contenteditable="false">' +
        `<pre class="language-${oriLang}" contenteditable="false" data-lang="${dataLang}"><code class="language-${oriLang}"  contenteditable="false">${rendered}</code></pre>` +
        '</figure>'
      )
    } catch (e) {
      return `<h1>此段代码块出现渲染错误！不支持语言：${
        e.message
      }！请检查代码块是否书写正确！</h1>`
    }
  }

  return marked(code, {
    renderer: renderer,
    gfm: true,
    breaks: true,
    mangle: false,
    silent: true
  })
}
