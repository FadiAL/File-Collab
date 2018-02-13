import React from 'react';

class Dialog extends React.Component {
  render() {
    return(
    <form className={"pure-form pure-form-stacked " + (this.props.visible ? "visible" : "invisible")} onSubmit={this.props.createFile}>
    <h2>Create File</h2>
    {
      this.props.error &&
        <h5>Error, file name {this.props.error} taken</h5>
    }
    <input type="text" placeholder="File Name"/>
    <button type="submit" className="pure-button pure-button-primary">Create</button>
    </form>
    )
  }
}
Dialog.defaultProps = {};
export default Dialog;
