import React, { Component } from "react";
import { getInsertionSortAnimations } from "./algorithms/InsertionSort.js";
import * as SelectionSort from "./algorithms/SelectionSort.js";
import * as BubbleSort from "./algorithms/BubbleSort.js";
import { getMergeSortAnimations } from "./algorithms/MergeSort.js";
import "./SortingVisualizer.css";

const ANIMATION_SPEED_MS = 500;

const NUMBER_OF_ARRAY_BARS = 15;

const PRIMARY_COLOR = 'green';

const SECONDARY_COLOR = 'blue'

export default class SortingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: []
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({ array });
  }

  // O(n^2) time \ O(1) space
  insertionSort() {
    const animations = getInsertionSortAnimations(this.state.array);
    for(let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [ pointedBarIdx, previousBarIdx ] = animations[i];
      const pointedBarStyle = arrayBars[pointedBarIdx].style;
      const previousBarStyle = arrayBars[previousBarIdx].style;
      setTimeout(() => {
        pointedBarStyle.backgroundColor = PRIMARY_COLOR;
        previousBarStyle.backgroundColor = PRIMARY_COLOR;
      }, i * ANIMATION_SPEED_MS);
      if (pointedBarIdx < previousBarIdx) {
        setTimeout(() => {
          pointedBarStyle.backgroundColor = 'red';
          previousBarStyle.backgroundColor = 'red';
        }, i * ANIMATION_SPEED_MS);
        const arr = this.state.array;
        console.log(arr)
        //swap(arr, previousBarIdx, pointedBarIdx);
        
        this.setState({ arr });
        setTimeout(() => {
          //const arr = swap(this.state.array, previousBarIdx, pointedBarIdx);
          //console.log(arr)
          //this.setState({ arr });
          pointedBarStyle.backgroundColor = SECONDARY_COLOR;
          previousBarStyle.backgroundColor = SECONDARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
      }
      resetColor(pointedBarStyle, previousBarStyle, i)
    }
  }

  // O(n^2) time \ O(1) space
  selectionSort() {
    const sortedArray = SelectionSort.sort(this.state.array);
    this.setState({ sortedArray });
  }
  // O(n^2) time \ O(1) space
  bubbleSort() {
    const sortedArray = BubbleSort.sort(this.state.array);
    this.setState({ sortedArray });
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    getAnimations(animations);
  }

  render() {
    const { array } = this.state;

    return (
      <div className="dashboard">
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{ height: `${value}px` }}
            ></div>
          ))}
        </div>
        <div className="actions">
          <button className="button" onClick={() => this.resetArray()}>
            Generate a New Array
          </button>
          <button className="button" onClick={() => this.insertionSort(array)}>
            Insertion Sort
          </button>
          <button className="button" onClick={() => this.mergeSort(array)}>
            Merge Sort
          </button>
          <button className="button" onClick={() => this.selectionSort(array)}>
            Selection Sort
          </button>
          <button className="button" onClick={() => this.bubbleSort(array)}>
            Bubble Sort
          </button>
        </div>
      </div>
    );
  }
}

function getAnimations(animations) {
  for(let i = 0; i < animations.length; i++) {
    const arrayBars = document.getElementsByClassName('array-bar');
    const isColorChange = i % 3 !== 2;
    if (isColorChange) {
      const [barOneIdx, barTwoIdx] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
      setTimeout(() => {
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
      }, i * ANIMATION_SPEED_MS)
    } else {
      setTimeout(() => {
        const [barOneIdx, newHeight] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        barOneStyle.height = `${newHeight}px`;
      }, i * ANIMATION_SPEED_MS)
    }
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function resetColor(pointedBarStyle, previousBarStyle, i) {
  setTimeout(() => {
    pointedBarStyle.backgroundColor = 'brown';
    previousBarStyle.backgroundColor = 'brown';
  }, i * ANIMATION_SPEED_MS * 100);
}

function swap(array, i, j) {
  [array[i], array[j]] = [array[j], array[i]];
}