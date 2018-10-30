/*
 * MIT License
 *
 * Copyright (c) 2018 Yesterday17
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
*/

import * as fs from 'fs'
import * as path from 'path'
import * as rimraf from 'rimraf'
import * as sharp from 'sharp'
import * as constants from '../../utils/constants'

const state = {
  passageData: new Map(),
  passageContent: new Map(),
  passages: []
}

const mutations = {
  SAVE_PASSAGE (state, passage) {
    // TODO: Save files differently
    const content = state.passageContent.get(passage.name)
    state.passageContent.set(passage.name, {
      ...content,
      local: passage.text
    })
    fs.writeFileSync(constants.localMDPath(passage.name), passage.text, {
      encoding: 'utf-8'
    })
  },

  // Passage Library
  NEW_PASSAGE (state, passage) {
    fs.mkdirSync(constants.columnPath(passage.name))
    fs.mkdirSync(constants.imagePath(passage.name))
    fs.mkdirSync(constants.documentPath(passage.name))

    // Save File
    fs.writeFileSync(
      constants.indexJson(passage.name),
      JSON.stringify(passage, undefined, 2),
      { encoding: 'utf-8' }
    )
    // Set local empty
    fs.writeFileSync(constants.localMDPath(passage.name), '', {
      encoding: 'utf-8'
    })

    // Set remote empty
    fs.writeFileSync(constants.remoteMDPath(passage.name), '', {
      encoding: 'utf-8'
    })

    // Copy cover to relative path
    sharp(passage.image).toFile(constants.localCoverPath(passage.name))
    passage.image = './images/cover.png'

    // Resolve relative path
    passage.image = constants.localCoverPath(passage.name)

    state.passageData.set(passage.name, {
      // Deep copy passage and add to map
      ...JSON.parse(JSON.stringify(passage))
    })

    state.passageContent.set(passage.name, {
      local: '',
      remote: ''
    })
  },
  DEL_PASSAGE (state, passage) {
    state.passageData.delete(passage.name)
    rimraf.sync(constants.columnPath(passage.name))
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
