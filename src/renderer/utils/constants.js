import { remote } from 'electron'
import * as path from 'path'

export const PATH = path.resolve(remote.app.getPath('userData'), 'Passages')

export let columnPath = (name) => path.resolve(PATH, name)
export let imagePath = (name) => path.resolve(columnPath(name), 'images')
export let documentPath = (name) => path.resolve(columnPath(name), 'document')
export let indexJson = (name) => path.resolve(columnPath(name), 'index.json')

export let localMDPath = (name) => path.resolve(documentPath(name), 'local.md')
export let remoteMDPath = (name) => path.resolve(documentPath(name), 'remote.md')
export let localCoverPath = (name) => path.resolve(imagePath(name), 'cover.png')

export let resolveImagePath = (name, path)
