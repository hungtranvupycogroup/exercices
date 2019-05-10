# Code environment:
- node
- typescript

# How to run test
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

# Time and memory complexity analysis
## Exercise 1:
- loadData: read string char by char to construct data, no re-loop, complexity is O(n)
- storeData: store data to string, run from key-value to object to array, complexity is O(m**n**2)

## Exercise 2:
- findOptimalPathSum: must travel all possible path to get maximum value, complexity is O(2^n)

# Other notes
## Exercise 3:
- main function: Retail.getNetPayableAmount()