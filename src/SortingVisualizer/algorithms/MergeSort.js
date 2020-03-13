export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliarArray = array.slice();
  mergeSortHelper(array, 0, array.length -1, auxiliarArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliarArray,
  animations
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliarArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliarArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliarArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliarArray,
  animations
  ) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values we are comparing; we push them once to change 
    // their color.
    animations.push([i, j]);
    // These are the values we are comparing; we push them a second time 
    // to revert their color
    animations.push([i, j]);
    if (auxiliarArray[i] <= auxiliarArray[j]) {
      // We overwrite the value at index k in the original array whit the
      // value at index i in the auxiliar array.
      animations.push([k, auxiliarArray[i]]);
      mainArray[k++] = auxiliarArray[i++];
    } else {
      // We overwrite the value at index k in the original array whit the
      // value at index j in the auxiliar array.
      animations.push([k, auxiliarArray[j]]);
      mainArray[k++] = auxiliarArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxiliarArray[i]]);
    mainArray[k++] = auxiliarArray[i++];
  }
  while (j <= endIdx) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxiliarArray[j]]);
    mainArray[k++] = auxiliarArray[j++];
  }
}