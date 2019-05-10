/**
 * load string string data
 * a = load(text)
 * text="key1=value1;key2=value2\nkeyA=valueA\n..."
 */
import { IData, IMap } from "./dataModel";

const loadLineToMap = (line: string): IMap => {
  const m: IMap = {}
  line.split(';').forEach((entryText: string) => {
    const [key, value] = entryText.split('=')
    m[key] = value
  })
  return m
}

const loadBySplit = (text: string): IData => text.split('\n').map(
  line => loadLineToMap(line)
)

const loadAsync = (text: string): Promise<IData> => Promise.all(text.split('\n').map(
  async (line) => loadLineToMap(line)
))

const loadByJSON = (text: string): IData => JSON.parse(`[{"${text.replace(/\n/g, '"},{"').replace(/\;/g, '","').replace(/\=/g,'":"')}"}]`)

const load = (text: string): IData => {
  const result:IData = []
  let key='', value=''
  let isKey = true
  let isValue = false
  let m = {}
  for (let i = 0; i < text.length; i++) {
    const a = text[i]
    if (a === '=') {
      isKey = false
      isValue = true
      continue
    }
    if (a === ';') {
      isKey = true
      isValue = false
      m[key] = value
      key=''
      value=''
      continue
    }
    if (a === '\n') {
      isKey = true
      isValue = false
      m[key] = value
      key=''
      value=''
      result.push(m)
      m = {}
      continue
    }
    if (i === text.length - 1) {
      m[key] = value + a
      result.push(m)
      continue
    }

    if (isKey) {
      key += a
      continue
    }
    if (isValue) {
      value += a
      continue
    }
  }
  return result
}

export { loadAsync, loadByJSON, loadBySplit }

export default load