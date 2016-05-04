import React from "react"

export default class SearchBar extends React.Component {
    render() {
        return (
          <div>
            <form className="pure-form" onSubmit={this.props.searchWordTrie}>
              <input type="text" id="searchBar" className="pure-input-rounded" style={{marginRight:"10px"}}/>
              <input type="submit" value="Search" className="pure-button" />
            </form>
          </div> 
        )
    }
} 

