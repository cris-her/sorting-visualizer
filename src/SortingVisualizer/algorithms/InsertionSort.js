// O(n^2) time \ O(1) space
export function* insertionSortGen(array) {
  for (let i = 1; i < array.length; i++) {
    let j = i;
    while (j > 0 && array[j] < array[j - 1]) {
      [array[j - 1], array[j]] = [array[j], array[j - 1]];
      yield {currentIdx: j, previousIdx: j-1, currentArray: array};
      j--;
    };
    yield {currentIdx: i, previousIdx: i-1, currentArray: array};
  }
  return array;
}