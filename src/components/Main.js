import React from "react"
import { Link } from 'react-router'

export default class App extends React.Component {
  render() {
    return(
      <div>
        <h2>MetaLang phonetic search</h2>
        <Link to="/text">Text Search</Link>
        <Link to="/video">Video Search</Link>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}
