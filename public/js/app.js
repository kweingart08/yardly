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
      editServiceIsVisible: false,
      employee: null,
      openUserRequests: [],
      currentJobsToDo: [],
      providedServices: []
    }
    this.toggleState = this.toggleState.bind(this)
  }
  /*======================
  page load
  ======================*/
  componentDidMount(){

  }

  toggleState(state1, state2, state3){
    this.setState({
      [state1]: !this.state[state1],
      [state2]: !this.state[state2],
      [state3]: !this.state[state3]
    })
  }

  /*======================
  set user
  ======================*/
  setUser(user){
    this.setState({
      user: user
    })
    this.getUserRequests(user['id']);
  }

  setUserRequests(requests){
    console.log('requests', requests);
    if(requests.results.length > 0){
      this.setState({
        openUserRequests: requests.results
      })
    }
  }

  getUserRequests(id){
    console.log('getting job requests', id);
    fetch('/users/' + id, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(JSONdata => {
      console.log('jsondata', JSONdata);
      this.setUserRequests(JSONdata);
    }).catch(error => console.log(error))
  }


  render(){
    return (
      <div className="app">

        {this.state.frontIsVisible ?
          <Front
            toggleState={this.toggleState}
            user={this.state.user}

          />
          : ''
        }

        {this.state.registerIsVisible ?
          <Register
            toggleState={this.toggleState}
          />
          : ''
        }

        {this.state.loginIsVisible ?
          <Login
            toggleState={this.toggleState}
          />
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
