import React from "react"

export default class InputBar extends React.Component {
  render() {
    return (
      <div>
        <form className="pure-form" onSubmit={this.props.writeToFirebase}>
            <input type="text" class="pure-input-rounded" />
            <input type="submit" value="Add" class="pure-button" />
        </form>
      </div>
    )
  }
}