import biliZhuanLanMarkdown from 'bilibili-zhuanlan-markdown-tool'

export function getRenderer (option) {
  switch (option.module) {
    case 'biliZhuanlanMarkdownTool':
      return biliZhuanLanMarkdown.md2Html
    case 'default':
      // TODO: return vanilla renderer
      return null
  }
}
