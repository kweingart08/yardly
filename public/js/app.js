class App extends React.Component {
  render(){
    return (
      <div className="app">
        <Front />
        <Register />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector(".main")
)
