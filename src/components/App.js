import React from "react"
import { Link } from 'react-router'
import InputBar from "./InputBar"
import Firebase from "firebase"
import SearchBar from "./SearchBar"
import Axios from "axios"

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.firebaseRef = new Firebase("https://word-search-demo.firebaseio.com/word_search")
    this.state = {
      listOfWords: [],
      listOfAnswers: []
    }

    this.firebaseRef.on("child_added", (snapshot) => {

      this.state.listOfWords.unshift(snapshot.key())
      this.setState({
        listOfWords: this.state.listOfWords
      })
    })
  }

  writeToFirebase(event) {
    let word = document.getElementById("inputBar").value
    word = word.toUpperCase()
    let word_json = {}
    word_json[word] = ""

    this.firebaseRef.child(word).set("")

    event.preventDefault()
  }

  searchWordTrie(event) {
    let query = document.getElementById("searchBar").value

    if (query != "") {
      query = query.toUpperCase()
      Axios.get('http://localhost:8080/word_search/' + '?query=' + query)
        .then(response => {

          let filteredWords = response.data.filter(wordObj => {
            return wordObj.cost < 3
          }).map(wordObj => {
            return wordObj.wordId
          })

          this.setState({
            listOfAnswers: filteredWords
          })
        })
    }

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
    let listOfAnswers = this.state.listOfAnswers.map((word) => <li>{word}</li>)
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
            <div>
              <h3>Query</h3>
              <SearchBar searchWordTrie={this.searchWordTrie.bind(this)}/>
              <ul id="listOfAnswers">
                {listOfAnswers}
              </ul>
            </div>
            <div>
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
