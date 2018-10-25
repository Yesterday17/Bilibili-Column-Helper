import * as fs from 'fs'
import * as path from 'path'
import * as rimraf from 'rimraf'
import * as sharp from 'sharp'
import * as constants from '../../utils/constants'

const state = {
  passageData: new Map(),
  passageContent: new Map(),
  passages: [],

  currentPassage: {
    name: '',
    text: ''
  }
}

const mutations = {
  // For Editor
  SET_CONTENT (state, content) {
    state.currentPassage.text = content
  },
  SET_PASSAGE (state, payload) {
    state.currentPassage.name = payload.name

    // TODO: Optimize interface
    state.currentPassage.text = state.passageContent.get(payload.name).local
  },
  RESET_PASSAGE (state) {
    state.currentPassage = {
      name: '',
      text: ''
    }
  },
  SAVE_PASSAGE (state, text) {
    // TODO: Save files differently
    const content = state.passageContent.get(state.currentPassage.name)
    state.passageContent.set(state.currentPassage.name, {
      ...content,
      local: text
    })
    fs.writeFileSync(constants.localMDPath(state.currentPassage.name), text, {
      encoding: 'utf-8'
    })
  },

  // Passage Library
  NEW_PASSAGE (state, payload) {
    fs.mkdirSync(constants.columnPath(payload.name))
    fs.mkdirSync(constants.imagePath(payload.name))
    fs.mkdirSync(constants.documentPath(payload.name))

    // Save File
    fs.writeFileSync(
      constants.indexJson(payload.name),
      JSON.stringify(payload, undefined, 2),
      { encoding: 'utf-8' }
    )
    // Set local empty
    fs.writeFileSync(constants.localMDPath(payload.name), '', {
      encoding: 'utf-8'
    })

    // Set remote empty
    fs.writeFileSync(constants.remoteMDPath(payload.name), '', {
      encoding: 'utf-8'
    })

    // Copy cover to relative path
    sharp(payload.image).toFile(constants.localCoverPath(payload.name))
    payload.image = './images/cover.png'

    // Resolve relative path
    payload.image = constants.localCoverPath(payload.name)

    state.passageData.set(payload.name, {
      // Deep copy payload and add to map
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
      return
    }

    const dirStat = fs.readdirSync(constants.PATH)
    for (const d of dirStat) {
      if (fs.statSync(constants.columnPath(d)).isDirectory()) {
        try {
          // Load config
          const passage = JSON.parse(
            fs.readFileSync(
              path.resolve(constants.columnPath(d), 'index.json'),
              { encoding: 'utf-8' }
            )
          )
          // Load local passage
          const local = fs.readFileSync(constants.localMDPath(d), {
            encoding: 'utf-8'
          })
          // Load remote passage
          const remote = fs.readFileSync(constants.remoteMDPath(d), {
            encoding: 'utf-8'
          })
          // Load cover
          passage.image =
            passage.image[0] === '.'
              ? constants.localCoverPath(passage.name)
              : passage.image

          // Add to map
          state.passageData.set(d, passage)
          state.passageContent.set(d, {
            local: local,
            remote: remote
          })

          // Add to Array
          state.passages.push({ name: d, passage: local })
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
