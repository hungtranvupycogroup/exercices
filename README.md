CI status: [![CircleCI](https://circleci.com/gh/hungtranvupycogroup/exercises/tree/master.svg?style=svg)](https://circleci.com/gh/hungtranvupycogroup/exercises/tree/master)

## Code environment:
- node
- typescript

## How to run test
- use npm
```
npm i
npm run test:coverage
```

- use yarn
```
yarn
yarn test:coverage
```

## Time and memory complexity analysis
### Exercise 1:
- loadData: read string char by char to construct data, no re-loop, complexity is O(n)
- storeData: store data to string, run from key-value to object to array, complexity is O(m\*n)

### Exercise 2:
- findOptimalPathSum: use depth-first search to travel all possible edges to get maximum path sum, with extra function to transform edges to map, and conditions to skip visited point and skip path with the weight less than the weight of other already-visited path, complexity 0(e\*v).

## Other notes
### Exercise 3:
- main function: Retail.getNetPayableAmount()
