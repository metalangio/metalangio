import React from "react"
import { Link } from 'react-router'
import InputBar from "./InputBar"
import Firebase from "firebase"
import SearchBar from "./SearchBar"

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.firebaseRef = new Firebase("https://word-search-demo.firebaseio.com/")
    this.state = {
      listOfWords: []
    }

    // this.firebaseRef.orderByKey().once("value", (snapshot) => {
    //   // Calling val on snapshot returns
    //   // a Javascript Object representation of the data
    //   let initialWords = Object.keys(snapshot.val())

    //   this.setState({
    //     listOfWords: initialWords
    //   })
    // }, function (errorObject) {
    //   console.log("The read failed: " + errorObject.code);
    // });

    this.firebaseRef.on("child_added", (snapshot) => {
      console.log("child_added")
      this.state.listOfWords.unshift(snapshot.key())
      this.setState({
        listOfWords: this.state.listOfWords
      })
    })
  }

  writeToFirebase(event) {
    let word = document.getElementById("inputBar").value
    let word_json = {}
    word_json[word] = ""
    this.firebaseRef.update(word_json)
    event.preventDefault()
  }

  searchWordTrie(event) {
    let word = document.getElementById("searchBar").value
    console.log("search value")
    console.log(word)
    event.preventDefault()
  }

  render() {
    let mainDiv = {
      marginTop: '80px',
      fontFamily: 'Noto Sans'
    }

    let title = {
      textAlign:'center',
      color:'#1E69A6'
    }

    let body = {
      display: 'flex',
      justifyContent: 'space-around'
    }

    let description = {
      width: '60%',
      textAlign: 'center',
      margin: 'auto'
    }

    let listOfWords = this.state.listOfWords.map((word) => <li>{word}</li>)
    return (
      <div style={mainDiv}>
        <h2 style={title}>MetaLang phonetics search</h2>
          <div style={description}>
            <p>MetaLang is a multi-language phonetic search engine. 
            For example, searching for "Mohammed" will match against "محمد" "Muhammed", "Mahamed", "Mohamed" because all the terms are phonetically the same! </p>
            <p>Instructions:</p>
            <p> 1. Add new words that are phonetically similar into the database </p>
            <p> 2. Search for the word under the Query bar </p>
          </div>

          <div style={body}>
            <div id="rightPane">
              <h3>Query</h3>
              <SearchBar searchWordTrie={this.searchWordTrie.bind(this)}/>
            </div>
            <div id="leftPane">
              <h3>Database</h3>
              <InputBar writeToFirebase={this.writeToFirebase.bind(this)}/>
              <ul id="listOfWords">
                {listOfWords}
              </ul>
            </div>

        </div>
      </div>
    )
  }

}
