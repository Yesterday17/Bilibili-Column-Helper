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
  columnData: new Map(),
  columnContent: new Map()
}

const mutations = {
  SAVE_COLUMN (state, column) {
    // TODO: Save files differently
    const content = state.columnContent.get(column.name)
    state.columnContent.set(column.name, {
      ...content,
      local: column.text
    })
    fs.writeFileSync(constants.localMDPath(column.name), column.text, {
      encoding: 'utf-8'
    })
  },

  // Passage Library
  NEW_COLUMN (state, column) {
    fs.mkdirSync(constants.columnPath(column.name))
    fs.mkdirSync(constants.imagePath(column.name))
    fs.mkdirSync(constants.documentPath(column.name))

    // Save File
    fs.writeFileSync(
      constants.indexJson(column.name),
      JSON.stringify(column, undefined, 2),
      { encoding: 'utf-8' }
    )
    // Set local empty
    fs.writeFileSync(constants.localMDPath(column.name), '', {
      encoding: 'utf-8'
    })

    // Set remote empty
    fs.writeFileSync(constants.remoteMDPath(column.name), '', {
      encoding: 'utf-8'
    })

    // Copy cover to relative path
    sharp(column.image).toFile(constants.localCoverPath(column.name))
    column.image = './images/cover.png'

    // Resolve relative path
    column.image = constants.localCoverPath(column.name)

    state.columnData.set(column.name, {
      // Deep copy column and add to map
      ...JSON.parse(JSON.stringify(column))
    })

    state.columnContent.set(column.name, {
      local: '',
      remote: ''
    })
  },
  DEL_COLUMN (state, column) {
    state.columnData.delete(column.name)
    rimraf.sync(constants.columnPath(column.name))
  },

  LOAD_COLUMNS (state) {
    if (!fs.existsSync(constants.PATH)) {
      fs.mkdirSync(constants.PATH)
      return
    }

    const dirStat = fs.readdirSync(constants.PATH)
    for (const d of dirStat) {
      if (fs.statSync(constants.columnPath(d)).isDirectory()) {
        try {
          // Load config
          const column = JSON.parse(
            fs.readFileSync(
              path.resolve(constants.columnPath(d), 'index.json'),
              { encoding: 'utf-8' }
            )
          )
          // Load local column
          const local = fs.readFileSync(constants.localMDPath(d), {
            encoding: 'utf-8'
          })
          // Load remote column
          const remote = fs.readFileSync(constants.remoteMDPath(d), {
            encoding: 'utf-8'
          })
          // Load cover
          column.image =
            column.image[0] === '.'
              ? constants.localCoverPath(column.name)
              : column.image

          // Add to map
          state.columnData.set(d, column)
          state.columnContent.set(d, {
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
