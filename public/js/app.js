class App extends React.Component {
  render(){
    return (
      <div className="app">
        <Front />
        <Register />
        <Login />
        <User />
        <ProvidedServices />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector(".main")
)
