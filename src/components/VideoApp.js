import React from "react"
import { Link } from 'react-router'
import InputBar from "./InputBar"
import Firebase from "firebase"
import SearchBar from "./SearchBar"

export default class VideoApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listOfAnswers: []
    }
  }

  searchWordTrie(event) {
    let query = document.getElementById("searchBar").value

    if (query != "") {
      query = query.toUpperCase()
      Axios.get('http://localhost:8080/video_search/' + '?query=' + query)
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

  componentDidMount() {
    this.player = new YT.Player('video', {
        width: 600,
        height: 400,
        videoId: 'Ks-_Mh1QhMc'
    })
  }

  seek() {
    this.player.seekTo(60)
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

    return (
      <div style={mainDiv}>
        <p>MetaLang Video App searches through a video phonetically</p>
        <p>Instructions:</p>
        <p> 1. Search for terms that might be in the video</p>
        <p> 2. Click on one of the returned timestamps</p>
        <a onClick={this.seek.bind(this)}>Skip to 1 minute</a>

        <div style={body}>
          <div id="rightPane">
            <h3>Query</h3>
            <SearchBar searchWordTrie={this.searchWordTrie.bind(this)}/>
          </div>
          <div id="leftPane">
            <div id="video">
            </div>
          </div>
        </div>
      </div>
    )
  }

}
