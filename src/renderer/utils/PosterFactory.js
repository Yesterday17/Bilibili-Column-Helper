import biliZhuanLanMarkdown from 'bilibili-zhuanlan-markdown-tool'
import * as biliNetwork from './biliNetwork'
import * as constants from './constants'

export function getPoster (option) {
  switch (option.module) {
    case 'biliZhuanlanMarkdownTool':
      return (passage, cookies) => {
        biliZhuanLanMarkdown.initStatus(cookies)
        biliZhuanLanMarkdown.sendArticle(constants.localMDPath(passage.data.name))
      }
    case 'default':
      return (passage, cookies) => {
        biliNetwork.addUpdate(passage, cookies, option.renderer)
      }
  }
}
