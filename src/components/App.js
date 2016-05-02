import React from "react"
import { Link } from 'react-router'
import InputBar from "./InputBar"
import Firebase from "firebase"

export default class App extends React.Component {
  writeToFirebase(event) {

    console.log("Input VALUE:")
    let word = document.getElementById("inputBar").value
    console.log(word)
    let word_json = {}
    word_json[word] = ""
    console.log(word_json)
    this.firebaseRef.push(word_json)
    event.preventDefault()
  }

  render() {

    this.firebaseRef = new Firebase("https://word-search-demo.firebaseio.com/");

    return (
      <div>
        <InputBar writeToFirebase={this.writeToFirebase.bind(this)} />
      </div>
    )
  }
}
