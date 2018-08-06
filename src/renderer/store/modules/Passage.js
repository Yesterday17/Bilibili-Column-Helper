import * as fs from 'fs'
import * as path from 'path'
import * as rimraf from 'rimraf'
import * as constants from '../../utils/constants'

const state = {
  passageData: new Map(),
  passageContent: new Map(),

  currentPassage: {
    name: '',
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
  SAVE_PASSAGE (state, code) {
    // TODO: Save files differently
    fs.writeFileSync(constants.localMDPath(state.currentPassage.name), code, {encoding: 'utf-8'})
  },

  // Passage Library
  NEW_PASSAGE (state, payload) {
    fs.mkdirSync(constants.columnPath(payload.name))
    fs.mkdirSync(constants.imagePath(payload.name))
    fs.mkdirSync(constants.documentPath(payload.name))

    fs.writeFileSync(constants.indexJson(payload.name), JSON.stringify(payload, undefined, 2), {encoding: 'utf-8'})
    fs.writeFileSync(constants.localMDPath(payload.name), '', {encoding: 'utf-8'})
    fs.writeFileSync(constants.remoteMDPath(payload.name), '', {encoding: 'utf-8'})

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
    rimraf.sync(constants.columnPath(payload.name))
  },

  LOAD_PASSAGES (state) {
    if (!fs.existsSync(constants.PATH)) {
      fs.mkdirSync(constants.PATH)
    }

    const dirStat = fs.readdirSync(constants.PATH)
    for (const d of dirStat) {
      if (fs.statSync(constants.columnPath(d)).isDirectory()) {
        try {
          const passage = JSON.parse(
            fs.readFileSync(path.resolve(constants.columnPath(d), 'index.json'), {encoding: 'utf-8'})
          )
          const local = fs.readFileSync(constants.localMDPath(d), {encoding: 'utf-8'})
          const remote = fs.readFileSync(constants.remoteMDPath(d), {encoding: 'utf-8'})

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
