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
      availableServices: [],
      employee: null,
      user: null,
    }
    this.toggleState = this.toggleState.bind(this);
    this.setUser = this.setUser.bind(this);
    this.deleteRequest = this.deleteRequest.bind(this);
    this.getAvailableServices = this.getAvailableServices.bind(this);
  }
  /*======================
  page load
  ======================*/
  componentDidMount(){
    this.getAvailableServices();
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

  /*======================
  delete a user current requests
  ======================*/
  deleteRequest(request, index){
    event.preventDefault()
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

  /*======================
  get available services
  ======================*/
  getAvailableServices(){
    fetch('/services')
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      this.setState({
        availableServices: data
      })
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
            setUser={this.setUser}
          />
          : ''
        }

        {this.state.userIsVisible ?
          <UserPage
            toggleState={this.toggleState}
            user={this.state.user}
          />
          : ''
        }

        {this.state.providedServicesIsVisible ?
          <ProvidedServices
            toggleState={this.toggleState}
            user={this.state.user}
            availableServices={this.state.availableServices}
          />
          : ''
        }

        {this.state.employeeIsVisible ?
          <Employee />
          : ''
        }

        {this.state.addServiceIsVisibile ?
          <AddService
            toggleState={this.toggleState}
            user={this.state.user}
            addRequest={this.addRequest}
          />
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
