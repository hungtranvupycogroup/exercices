/**
 * find a path such that the sum of the weights of all vertices on the path is maximized
 * directed graph can be acyclic or cyclic
 * Input: n vertices, m edges, origin vertex
 * Output: sum of the optimal path
 */

import { IEdge, IVertices, IDirections } from './graphModel'

interface IDirections {
  [from: string]: string[]
}

interface IVisited {
  [name: string]: boolean
}

const getDirectionsFromEdges = (edges: IEdge[]): IDirections => {
  const directions:IDirections = {}
  edges.forEach(edge => {
    if (!directions[edge.from]) {
      directions[edge.from] = [edge.to]
    } else {
      directions[edge.from].push(edge.to)
    }
  })
  return directions
}

const findOptimalPathSumByDirections = (vertices: IVertices, directions: IDirections, origin: string, visited: IVisited = {}) => {
  const ownWeight = vertices[origin]
  // avoid infinite loop of cyclic graph by ignore visited point
  const nextPointsToVisit = directions[origin] ? directions[origin].filter(point => !visited[point]) : []
  if (nextPointsToVisit.length === 0) {
    // when no point to visit, total weight is weight of the point itself
    return ownWeight
  }

  const possiblePathsSums = nextPointsToVisit.map(point => findOptimalPathSumByDirections(vertices, directions, point, {
    ...visited,
    [origin]: true
  }))

  return ownWeight + Math.max(...possiblePathsSums)
}

const findOptimalPathSum = (vertices: IVertices, edges: IEdge[], origin: string): number => {
  return findOptimalPathSumByDirections(vertices, getDirectionsFromEdges(edges), origin, {})
}

const findOptimalPathSum2 = (vertices: IVertices, edges: IEdge[], origin: string): number => {
  const ownWeight = vertices[origin]
  
  const nextPointsToVisit = edges.filter(edge => edge.from === origin).map(edge => edge.to)
  if (nextPointsToVisit.length === 0) {
    // when no point to visit, total weight is weight of the point itself
    return ownWeight
  }

  // avoid infinite loop of cyclic graph by reduce edges that lead to visited point
  // also reduce edges that used above
  const nextEdgesCanGo = edges.filter(edge => edge.to !== origin && edge.from !== origin)

  const possiblePathsSums = nextPointsToVisit.map(point => findOptimalPathSum(vertices, nextEdgesCanGo, point))

  return ownWeight + Math.max(...possiblePathsSums)
}

export { findOptimalPathSum2 }

export default findOptimalPathSum