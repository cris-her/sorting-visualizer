export function getInsertionSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  insertionSort(array, animations);
  return animations;
}

// O(n^2) time \ O(1) space
function insertionSort (array, animations) {
  for (let i = 1; i < array.length; i++) {
    let j = i;
    animations.push([j, j-1]);
    while (j > 0 && array[j] < array[j - 1]) {
      [array[j - 1], array[j]] = [array[j], array[j - 1]];
      animations.push([j-1, j]);
      j--;
    }
  }
  return array;
}