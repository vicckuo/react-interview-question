/** Can you explain the problem with the following code, and how to fix
it. 

handleAddCount方法中連續調用了三次setState，但是只有最後一次生效，因為React會將多次的setState合併成一次，所以只有最後一次的結果會生效。
所以結果會是 1，而不是 3。

解決方法： 如果是要點一次 Add 按鈕就加三次的話，可以
handleAddCount() {
  this.setState((prevState) => ({ count: prevState.count + 3 }));
}

如果是要點一次 Add 按鈕就加一次的話，可以
handleAddCount() {
  this.setState((prevState) => ({ count: prevState.count + 1 }));
}

**/
class Count extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.handleAddCount = this.handleAddCount.bind(this);
  }
  handleAddCount() {
    this.setState({ count: this.state.count + 1 });
    this.setState({ count: this.state.count + 1 });
    this.setState({ count: this.state.count + 1 });
  }
  render() {
    return (
      <div>
        <h2>{this.state.count}</h2>
        <button onClick={this.handleAddCount}>Add</button>
      </div>
    );
  }
}
ReactDOM.render(<Count />, document.getElementById('root'));
