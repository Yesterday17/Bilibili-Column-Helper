import biliZhuanLanMarkdown from 'bilibili-zhuanlan-markdown-tool'
import * as defaultRenderer from './renderer'

export function getRenderer (option) {
  switch (option.module) {
    case 'biliZhuanlanMarkdownTool':
      return biliZhuanLanMarkdown.md2Html
    case 'default':
      return (code) => {
        defaultRenderer.configure(defaultRenderer.defaultOption)
        return (code) => defaultRenderer.render(code, defaultRenderer.renderer)
      }
  }
}
