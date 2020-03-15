import React, { Component } from "react";
import {insertionSortGen} from "./algorithms/InsertionSort.js";
import * as SelectionSort from "./algorithms/SelectionSort.js";
import * as BubbleSort from "./algorithms/BubbleSort.js";
import { getMergeSortAnimations } from "./algorithms/MergeSort.js";
import "./SortingVisualizer.css";

const ANIMATION_SPEED_MS = 500;

const NUMBER_OF_ARRAY_BARS = 10;

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
    const array = [40, 55, 60, 190, 100];
    //for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
    //  array.push(randomIntFromInterval(5, 730));
    //}
    this.setState({ array });
  }

  // O(n^2) time \ O(1) space
  insertionSort(array) {
    const sort = insertionSortGen(array);
    console.log(sort);
    for (let i = 0; i < array; i++) {
      const {currentIdx, previousIdx, currentArray} = sort.next().value;
      const arrayBars = document.getElementsByClassName('array-bar');
      const barOneStyle = arrayBars[previousIdx].style;
      const barTwoStyle = arrayBars[currentIdx].style;
      setTimeout(() => {
        barOneStyle.backgroundColor = SECONDARY_COLOR;
        barTwoStyle.backgroundColor = SECONDARY_COLOR;
        this.setState({currentArray});
      }, i * ANIMATION_SPEED_MS)
      setTimeout(() => {
        barOneStyle.backgroundColor = PRIMARY_COLOR;
        barTwoStyle.backgroundColor = PRIMARY_COLOR;
      }, i * ANIMATION_SPEED_MS)
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
          <button className="button" onClick={() => this.mergeSort()}>
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

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
