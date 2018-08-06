import biliZhuanLanMarkdown from 'bilibili-zhuanlan-markdown-tool'
import * as constants from './constants'

export function getPoster (option) {
  switch (option.module) {
    case 'biliZhuanlanMarkdownTool':
      return (title, cookies) => {
        biliZhuanLanMarkdown.initStatus(cookies)
        biliZhuanLanMarkdown.sendArticle(constants.localMDPath(title))
      }
    case 'default':
      return (title, cookies) => {
        // TODO: Implement default behavior
      }
  }
}
