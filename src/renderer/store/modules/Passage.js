import * as fs from 'fs'
import * as path from 'path'
import { remote } from 'electron'
import * as rimraf from 'rimraf'

const PATH = path.resolve(remote.app.getPath('userData'), 'Passages')

const state = {
  passageData: new Map(),
  passageContent: new Map(),

  currentPassage: {
    text: ''
  }
}

const mutations = {
  // For Editor
  SET_PASSAGE (state, payload) {
    state.currentPassage = payload

    // TODO: Optimize interface
    state.currentPassage.text = state.passageContent.get(payload.name).local
  },
  SET_TITLE (state, title) {
    state.currentPassage.name = title
  },
  SET_CONTENT (state, content) {
    state.currentPassage.text = content
  },
  LOAD_PASSAGE (state, payload) {
    state.currentPassage = state.passageData.get(payload.name)

    // TODO: Optimize interface
    state.currentPassage.text = state.passageContent.get(payload.name).local
  },
  RESET_PASSAGE (state) {
    state.currentPassage = {
      name: '',
      text: ''
    }
  },

  // Passage Library
  NEW_PASSAGE (state, payload) {
    const columnPath = path.resolve(PATH, payload.name)
    const imagePath = path.resolve(columnPath, 'images')
    const documentPath = path.resolve(columnPath, 'document')
    const indexJson = path.resolve(columnPath, 'index.json')
    const localMDPath = path.resolve(documentPath, 'local.md')
    const remoteMDPath = path.resolve(documentPath, 'remote.md')

    fs.mkdirSync(columnPath)
    fs.mkdirSync(imagePath)
    fs.mkdirSync(documentPath)

    fs.writeFileSync(indexJson, JSON.stringify(payload, undefined, 2), {encoding: 'utf-8'})
    fs.writeFileSync(localMDPath, '', {encoding: 'utf-8'})
    fs.writeFileSync(remoteMDPath, '', {encoding: 'utf-8'})

    state.passageData.set(payload.name, {
      ...JSON.parse(JSON.stringify(payload))
    })

    state.passageContent.set(payload.name, {
      local: '',
      remote: ''
    })
  },
  DEL_PASSAGE (state, payload) {
    state.passageData.delete(payload.name)
    rimraf.sync(path.resolve(PATH, payload.name))
  },

  LOAD_PASSAGES (state) {
    if (!fs.existsSync(PATH)) {
      fs.mkdirSync(PATH)
    }

    const dirStat = fs.readdirSync(PATH)
    for (const d of dirStat) {
      const dir = path.resolve(PATH, d)
      if (fs.statSync(dir).isDirectory()) {
        try {
          const passage = JSON.parse(
            fs.readFileSync(path.resolve(dir, 'index.json'), {encoding: 'utf-8'})
          )
          const documentPath = path.resolve(dir, 'document')
          const local = fs.readFileSync(path.resolve(documentPath, 'local.md'), {encoding: 'utf-8'})
          const remote = fs.readFileSync(path.resolve(documentPath, 'remote.md'), {encoding: 'utf-8'})

          state.passageData.set(d, passage)
          state.passageContent.set(d, {
            local: local,
            remote: remote
          })
        } catch (e) {
          console.error(e.message)
        }
      }
    }
  }
}

export default {
  state,
  mutations
}
