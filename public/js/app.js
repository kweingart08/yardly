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
      user: null,
      openUserRequests: [],
      currentJobsToDo: [],
      providedServices: []
    }
    this.toggleState = this.toggleState.bind(this);
    this.setUser = this.setUser.bind(this);
    this.deleteService = this.deleteService.bind(this);
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
  setUser(username, password){
    event.preventDefault()
    fetch('users/' + username, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log(data);
      this.setState({
        user: data,
        userIsVisible: true,
        loginIsVisible: false
      });
    }).catch(error => console.log(error))
  }

  deleteService(request, index){
    console.log(request);
    fetch('/jobs/' + request.job_id,
    {
      method: 'DELETE'
    })
    .then(data => {
      console.log(data);
      // deleting but not updating the page

    })
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
            setUser={this.setUser}
          />
          : ''
        }

        {this.state.userIsVisible ?
          <UserPage
            toggleState={this.toggleState}
            user={this.state.user}
            deleteService={this.deleteService}
          />
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
