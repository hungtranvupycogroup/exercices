import findOptimalPathSum, {findOptimalPathSum2} from './findOptimalPathSum'

describe('findOptimalPathSum', () => {
  describe('findOptimalPathSum2', () => {
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
  
      const result = findOptimalPathSum2(vertices, edges, 'A')
      expect(result).toEqual(5)
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
  
      const result = findOptimalPathSum2(vertices, edges, 'A')
      expect(result).toEqual(5)
    })
  })
  
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

  it('check performance', () => {
    const vertices = {
      A: 1,
      B: 2,
      C: 2,
      D: 7
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
    },{
      from: 'C',
      to: 'D'
    }]

    const runOne = (fn) => {
      const begin = Date.now()
      fn(vertices, edges, 'A')
      return Date.now()-begin
    }
    const run = (name, fn) => {
      const runTime = Array(10000000).fill(runOne(fn)).reduce((t, c) => t+c, 0) / 100000
      console.log(`Demo run for ${name}:`, runTime)
    }
    run('findOptimalPathSum', findOptimalPathSum)
    run('findOptimalPathSum2', findOptimalPathSum2)
    expect(1).toEqual(1)
  })
})
