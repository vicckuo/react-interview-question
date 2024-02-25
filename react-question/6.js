/** Please write the sample code to debounce handleOnChange 
 
var SearchBox = React.createClass({
  render: function () {
    return (
      <input
        type='search'
        name='p'
        onChange={this.handleOnChange}
      />
    );
  },
  handleOnChange: function (event) {
    // make ajax call
  },
});

**/

var SearchBox = React.createClass({
  getInitialState: function () {
    return {
      timerId: null,
    };
  },
  render: function () {
    return (
      <input
        type='search'
        name='p'
        onChange={this.handleOnChange}
      />
    );
  },
  handleOnChange: function (event) {
    if (this.state.timerId !== null) {
      clearTimeout(this.state.timerId);
    }

    var timerId = setTimeout(() => {
      this.makeAjaxCall(event.target.value);
      this.setState({ timerId: null });
    }, 500);

    this.setState({ timerId: timerId });
  },

  makeAjaxCall: function () {
    console.log('500ms passed, make ajax call');
  },
});
