import * as fs from 'fs'
import * as path from 'path'
import { remote } from 'electron'
import * as rimraf from 'rimraf'

const PATH = path.resolve(remote.app.getPath('userData'), 'Passages')

const state = {
  namelist: [],
  passages: [],
  passage: {
    text: ''
  }
}

const mutations = {
  // For Editor
  SET_PASSAGE (state, payload) {
    state.passage = payload
  },
  SET_TITLE (state, title) {
    state.passage.name = title
  },
  SET_COVER (state, cover) {
    state.passage.cover = cover
  },
  SET_CONTENT (state, content) {
    if (!content) return
    state.passage.text = content
  },
  LOAD_PASSAGE (state, payload) {
    state.passage = state.passages.indexOf(payload)
  },

  // Passage Library
  NEW_PASSAGE (state, payload) {
    const columnPath = path.resolve(PATH, payload.name)
    const imagePath = path.resolve(columnPath, 'images')
    const indexJson = path.resolve(columnPath, 'index.json')
    fs.mkdirSync(columnPath)
    fs.mkdirSync(imagePath)
    fs.writeFileSync(indexJson, JSON.stringify(payload, undefined, 2))

    state.passages.push({
      ...JSON.parse(JSON.stringify(payload))
    })
  },
  DEL_PASSAGE (state, payload) {
    state.passages.splice(state.passages.indexOf(payload), 1)
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
        const passage = JSON.parse(fs.readFileSync(path.resolve(dir, 'index.json')))
        state.passages.push(passage)
        state.namelist.push(d)
      }
    }
  }
}

export default {
  state,
  mutations
}
