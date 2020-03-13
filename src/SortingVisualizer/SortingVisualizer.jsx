import React, { Component } from "react";
import * as InsertionSort from "./algorithms/InsertionSort.js";
import * as SelectionSort from "./algorithms/SelectionSort.js";
import "./SortingVisualizer.css";

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
    for (let i = 0; i < 310; i++) {
      array.push(randomIntFromInterval(5, 700));
    }
    this.setState({ array });
  }

  // O(n^2) time \ O(1) space
  insertionSort() {
    const sortedArray = InsertionSort.sort(this.state.array);
    this.setState({ sortedArray });
  }

  selectionSort() {
    const sortedArray = SelectionSort.sort(this.state.array);
    this.setState({ sortedArray });
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
          <button className="button" onClick={() => this.selectionSort(array)}>
            Selection Sort
          </button>
        </div>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
