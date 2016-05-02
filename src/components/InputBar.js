import React from "react"

export default class InputBar extends React.Component {
  render() {
    return (
      <div>
        <form className="pure-form" onSubmit={this.props.writeToFirebase}>
            <input type="text" id="inputBar" class="pure-input-rounded" defaultValue="add new word"/>
            <input type="submit" value="Add" class="pure-button" />
        </form> 
      </div>
    )
  }
}