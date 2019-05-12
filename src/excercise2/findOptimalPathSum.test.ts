import findOptimalPathSum from './findOptimalPathSum'

describe('findOptimalPathSum', () => {
  describe('findOptimalPathSum', () => {
    it('should return sum of the optimal path', () => {
      const vertices = {
        A: 1,
        B: 2,
        C: 2
      }
      const edges = [{
        from: 'A',
        to: 'B'
      },{
        from: 'B',
        to: 'C'
      },{
        from: 'A',
        to: 'C'
      }]
  
      const result = findOptimalPathSum(vertices, edges, 'A')
      expect(result).toEqual(5)
    })

    it('should return sum of the optimal path (2)', () => {
      const vertices = {
        A: 1,
        B: 2,
        C: 4,
        D: 3
      }
      const edges = [{
        from: 'A',
        to: 'B'
      },{
        from: 'B',
        to: 'D'
      },{
        from: 'A',
        to: 'C'
      },{
        from: 'C',
        to: 'D'
      }]
  
      const result = findOptimalPathSum(vertices, edges, 'A')
      expect(result).toEqual(8)
    })
  
    it('should not loop forever graph is cyclic', () => {
      const vertices = {
        A: 1,
        B: 2,
        C: 2
      }
      const edges = [{
        from: 'A',
        to: 'B'
      },{
        from: 'B',
        to: 'C'
      },{
        from: 'A',
        to: 'C'
      },{
        from: 'C',
        to: 'A'
      },{
        from: 'B',
        to: 'A'
      }]
  
      const result = findOptimalPathSum(vertices, edges, 'A')
      expect(result).toEqual(5)
    })
  })
})
