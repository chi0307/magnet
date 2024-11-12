import * as fs from 'fs'
import * as path from 'path'

import { Route } from './src/router/route'

const template = fs.readFileSync('index.html', 'utf-8')

for (const route of Object.values(Route)) {
  const fileName = route.replace(/^\//, '')
  if (fileName === '') {
    continue
  }
  if (fileName.includes('/')) {
    const folderPath = path.dirname(fileName)
    fs.mkdirSync(folderPath, { recursive: true })
  }
  console.log(`success copy index.html to ${fileName}.html`)
  fs.writeFileSync(`${fileName}.html`, template, 'utf-8')
}
