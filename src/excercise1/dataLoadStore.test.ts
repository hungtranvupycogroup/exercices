import loadData from './loadData'
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