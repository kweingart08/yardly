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
      user: null,
      employee: null
    }
    this.toggleState = this.toggleState.bind(this);
    this.setUser = this.setUser.bind(this);
    this.deleteRequest = this.deleteRequest.bind(this);
    this.getAvailableServices = this.getAvailableServices.bind(this);
    this.addJob = this.addJob.bind(this);
    this.logout = this.logout.bind(this);
    this.setEmployee = this.setEmployee.bind(this);
  }
  /*======================
  on page load - get all of the available services
  ======================*/
  componentDidMount(){
    this.getAvailableServices();
  }

  /*======================
  toggle state for different views
  ======================*/
  toggleState(state1, state2, state3){
    this.setState({
      [state1]: !this.state[state1],
      [state2]: !this.state[state2],
      [state3]: !this.state[state3]
    })
  }

  /*======================
  set user with the login information coming from Login.js
  check if the user is an employee
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
      // console.log(data);
      this.setState({
        user: data,
        userIsVisible: true,
        loginIsVisible: false
      })
      if(data.employee_id !==0){
        this.setEmployee(data.employee_id);
      }
    }).catch(error => console.log(error))
  }

  /*======================
  if the user is an employee, set the employee state to get all the employee information
  show the Employee.js
  ======================*/
  setEmployee(id){
    fetch('employees/' + id, {
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
      // console.log(data);
      this.setState({
        employee: data,
        employeeIsVisible: true
      })
    }).catch(error => console.log(error))
  }

  /*======================
  logout user

  ======================*/
  logout(){
    if(this.state.employeeIsVisible === true){
      this.setState({
        employee: null,
        employeeIsVisible: false
      })
    }
    this.setState({
      user: null,
      userIsVisible: false,
      frontIsVisible: true
    })
  }

  /*======================
  delete a user current requests
  ======================*/
  deleteRequest(request, index){
    console.log(request);
    fetch('/jobs/' + request.job_id,
    {
      method: 'DELETE'
    })
    .then(data => {
      console.log(data);
      //deletes but need page to reload

    })
  }


  // handleCreateJob(job){
  //   console.log(job);
  // }

  /*======================
  add a job to the user
  ======================*/
  addJob(serviceID, userID, employeeID){
    console.log('added', serviceID, userID);

    fetch('/jobs', {
      body: JSON.stringify({
        "services_id": serviceID,
        "requested_user_id": userID
      }),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(createdJob => {
      return createdJob.json()
    })
    .then(jsonedJob => {
      // this.handleCreateJob(jsonedJob)
      console.log(jsonedJob);
      //creates the job but doesn't refresh the users page and render??
      if(employeeID !==0){
        this.toggleState('userIsVisible', 'providedServicesIsVisible', 'employeeIsVisible')
      } else {
      this.toggleState('userIsVisible', 'providedServicesIsVisible')
      }
    })
    .catch(error=>console.log(error))
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
            deleteRequest={this.deleteRequest}
            logout={this.logout}
          />
          : ''
        }

        {this.state.providedServicesIsVisible ?
          <ProvidedServices
            toggleState={this.toggleState}
            user={this.state.user}
            availableServices={this.state.availableServices}
            addJob={this.addJob}
          />
          : ''
        }

        {this.state.employeeIsVisible ?
          <Employee
            toggleState={this.toggleState}
            user={this.state.user}
            employee={this.state.employee}
          />
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
