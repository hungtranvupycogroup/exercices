/**
 * find a path such that the sum of the weights of all vertices on the path is maximized
 * directed graph can be acyclic or cyclic
 * Input: n vertices, m edges, origin vertex
 * Output: sum of the optimal path
 */

import { IEdge, IVertices,  } from './graphModel'

interface IAllBranchesVisitedSum {
  [name: string]: number
}

interface IVisited {
  [name: string]: boolean
}

class Graph {
  vertices: IVertices
  directions: {
    [from: string]: string[]
  }

  constructor(vertices: IVertices, edges: IEdge[]) {
    this.vertices = vertices
    this.directions = {}
    for (let edge of edges) {
      if (!this.directions[edge.from]) {
        this.directions[edge.from] = [edge.to]
      } else {
        this.directions[edge.from].push(edge.to)
      }
    }
  }

  public findOptimalPathSum(origin: string, visited: IVisited = {}, visitedPrevSum: IAllBranchesVisitedSum = {}) {
    const ownWeight = this.vertices[origin]
    const currentSum = visitedPrevSum[origin] ? visitedPrevSum[origin] + ownWeight : ownWeight

    if (!this.directions[origin]) {
      // when no point to visit: total weight is sum of prevMax and the current point's weight
      return currentSum
    }

    const optimalSums: number[] = [currentSum] // weight is positive, so currentSum will be safe to use for all skipping cases below

    const nextVisited = { // visited is immutable
      ...visited,
      [origin]: true
    }
    for (let nextPoint of this.directions[origin]) {
      // each nextPoint create a different path
      if (visited[nextPoint]) {
        // if next point is visited by this current path: skip to go further
        continue
      }

      if (visitedPrevSum[nextPoint] && visitedPrevSum[nextPoint] >= currentSum) {
        // if next point already visited with other bigger or equal paths: skip to go further
        continue
      }

      visitedPrevSum[nextPoint] = currentSum
      optimalSums.push(this.findOptimalPathSum(nextPoint, nextVisited, visitedPrevSum))
    }

    return Math.max(...optimalSums)
  }
}

const findOptimalPathSum = (vertices: IVertices, edges: IEdge[], origin: string): number => {
  const graph = new Graph(vertices, edges)
  return graph.findOptimalPathSum(origin)
}

export default findOptimalPathSum