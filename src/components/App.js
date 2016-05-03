import React from "react"
import { Link } from 'react-router'
import InputBar from "./InputBar"
import Firebase from "firebase"

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.firebaseRef = new Firebase("https://word-search-demo.firebaseio.com/")
    this.state = {
      listOfWords: []
    }

    this.firebaseRef.on("child_added", (snapshot) => {
      console.log(snapshot)
      console.log(snapshot.key())
      this.state.listOfWords.push(snapshot.key())
      this.setState({
        listOfWords: this.state.listOfWords
      })
    })

    this.firebaseRef.orderByKey().once("value", (snapshot) => {
      // Calling val on snapshot returns
      // a Javascript Object representation of the data
      let initialWords = Object.keys(snapshot.val())

      console.log("retrieving data from firebase:")
      console.log(initialWords)

      this.setState({
        listOfWords: initialWords
      })
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  }

  writeToFirebase(event) {
    let word = document.getElementById("inputBar").value
    let word_json = {}
    word_json[word] = "ghfhgf"
    this.firebaseRef.update(word_json)
    event.preventDefault()
  }

  render() {
    let listOfWords = this.state.listOfWords.map((word) => <li>{word}</li>)
    return (
      <div>
        <InputBar writeToFirebase={this.writeToFirebase.bind(this)}/>
        <ul id="listOfWords">
          {listOfWords}
        </ul>
      </div>
    )
  }

}
