class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      frontIsVisible: true,
      registerIsVisible: false,
      loginIsVisible: false,
      userIsVisible: false,
      providedServicesIsVisible: false,
      employeeIsVisible: false,
      addServiceIsVisibile: false,
      editServiceIsVisible: false
    }
    this.toggleState = this.toggleState.bind(this)
  }

  toggleState(state){
    this.setState({
      [state]: !this.state[state]
    })
  }

  render(){
    return (
      <div className="app">

        {this.state.frontIsVisible ?
          <Front />
          : ''
        }

        {this.state.registerIsVisible ?
          <Register />
          : ''
        }

        {this.state.loginIsVisible ?
          <Login />
          : ''
        }

        {this.state.userIsVisible ?
          <User />
          : ''
        }

        {this.state.providedServicesIsVisible ?
          <ProvidedServices />
          : ''
        }

        {this.state.employeeIsVisible ?
          <Employee />
          : ''
        }

        {this.state.addServiceIsVisibile ?
          <AddService />
          : ''
        }

        {this.state.editServiceIsVisible ?
          <EditService />
          : ''
        }

      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector(".main")
)
