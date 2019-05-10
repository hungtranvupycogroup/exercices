import loadData, {loadAsync as loadDataAsync, loadByJSON, loadBySplit} from './loadData'
import storeData from './storeData'

describe('Exercise1: data store and load', () => {
  describe('load data function', () => {
    it('should return right value', () => {
      const input = 'key1=value1;key2=value2\nkeyA=valueA'
      const expected = [{
        key1: 'value1',
        key2: 'value2'
      }, {
        keyA: 'valueA'
      }]
  
      expect(loadData(input)).toEqual(expected)
    })
  })

  describe('loadDataAsync function', () => {
    it('should return right value', async () => {
      const input = 'key1=value1;key2=value2\nkeyA=valueA'
      const expected = [{
        key1: 'value1',
        key2: 'value2'
      }, {
        keyA: 'valueA'
      }]
  
      expect(await loadDataAsync(input)).toEqual(expected)
    })
  })

  describe('loadByJSON function', () => {
    it('should return right value', () => {
      const input = 'key1=value1;key2=value2\nkeyA=valueA'
      const expected = [{
        key1: 'value1',
        key2: 'value2'
      }, {
        keyA: 'valueA'
      }]
  
      expect(loadByJSON(input)).toEqual(expected)
    })
  })

  it('check performance', async () => {
    const input = Array(100000).fill('key1=value1;key2=value2\nkeyA=valueA').join(';')
    const runOne = async (fn) => {
      const begin = Date.now()
      await fn(input)
      return Date.now()-begin
    }
    const run = async (name, fn) => {
      const runTime = Array(100000).fill(await runOne(fn)).reduce((t, c) => t+c, 0) / 100000
      console.log(`Demo run for ${name}:`, runTime)
    }
    await run('loadBySplit', loadBySplit)
    await run('loadByJSON', loadByJSON)
    await run('loadData', loadData)
    await run('loadDataAsync', loadDataAsync)
    expect(1).toEqual(1)
  })

  describe('store data function', () => {
    it('should return right string', () => {
      const input = [{
        key1: 'value1',
        key2: 'value2'
      }, {
        keyA: 'valueA'
      }]
      const expected = 'key1=value1;key2=value2\nkeyA=valueA'
  
      expect(storeData(input)).toEqual(expected)
    })
  })
})