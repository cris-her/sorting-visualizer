// O(n^2) time | O(1) space
export const sort = (arr) => {
  let isSorted = false
  let counter = 0
  while (!isSorted) {
      isSorted = true
      for (let i=0; i < arr.length - 1 - counter; i++) {
          if (arr[i] > arr[i+1]) {
              [arr[i], arr[i+1]] = [arr[i+1], arr[i]]
              isSorted = false
          }
      }
      counter++
  }
  return arr
}