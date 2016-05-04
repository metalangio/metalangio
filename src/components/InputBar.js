import React from "react"

export default class InputBar extends React.Component {
  render() {
    return (
      <div>
        <form className="pure-form" onSubmit={this.props.writeToFirebase}>
            <input type="text" id="inputBar" className="pure-input-rounded" style={{marginRight:"10px"}}/>
            <input type="submit" value="Add" className="pure-button" />
        </form> 
      </div>
    )
  }
}