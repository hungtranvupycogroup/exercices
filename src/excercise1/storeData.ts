/**
 * store data to string
 * text = store(a)
 * text="key1=value1;key2=value2\nkeyA=valueA\n..."
 */
import {IData, IMap} from './dataModel'

const storeMap = (m: IMap):string => Object.entries(m).map(([key, value]) => `${key}=${value}`).join(';')

const store = (a:IData):string => a.map(storeMap).join('\n')

export default store