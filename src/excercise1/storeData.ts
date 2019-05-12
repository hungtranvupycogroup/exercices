/**
 * store data to string
 * text = store(a)
 * text="key1=value1;key2=value2\nkeyA=valueA\n..."
 */
import {IData, IMap} from './dataModel'

const storeKeyVal = ([key, value]: [string, string]) => `${key}=${value}`

const storeMap = (m: IMap):string => Object.entries(m).map(storeKeyVal).join(';')

const store = (a:IData):string => a.map(storeMap).join('\n')

export default store