// O(n^2) time \ O(1) space
export const sort = (array) => {
  let currentIndex = 0
  while (currentIndex < array.length - 1) {
    let smallestIndex = currentIndex
    for (let i = currentIndex + 1; i < array.length; i++) {
      if (array[smallestIndex] > array[i]) {
        smallestIndex = i;
      }
    }
    swap(currentIndex, smallestIndex, array)
    currentIndex++
  }
  return array
}

function swap(i, j, array) {
    [array[i], array[j]] = [array[j], array[i]]
}