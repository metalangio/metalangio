import React from "react"
import { Link } from 'react-router'
import InputBar from "./InputBar"
import Firebase from "firebase"

export default class App extends React.Component {

  writeToFirebase(event) {
    let firebaseRef = new Firebase("https://word-search-demo.firebaseio.com/");

    console.log("EVENT TARGET VALUE:")
    console.log(event.target.value)

    return false
  }

  render() {

    return (
      <div>
        <InputBar writeToFirebase={this.writeToFirebase.bind(this)} />
      </div>
    )
  }
}
