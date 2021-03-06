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
      serviceToEdit: null,
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
    this.deleteService = this.deleteService.bind(this);
    this.addNewService = this.addNewService.bind(this);
    this.updateService = this.updateService.bind(this);
    this.createUser = this.createUser.bind(this);
    this.editService = this.editService.bind(this);
  }

  /*======================
  set the service that was clicked in order to send to edit service

  ======================*/
  editService(service){
    this.setState({
      serviceToEdit: service
    })
  }

  /*======================
  create a user and log in

  ======================*/
  createUser(username, password, address){

    fetch('/users', {
      body: JSON.stringify({
        "username": username,
        "password": password,
        "address": address
      }),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(createdUser => {
      return createdUser.json()
    })
    .then(jsonedUser => {
      // this.handleCreateJob(jsonedJob)
      console.log("jsoned", jsonedUser);
    })
    .catch(error => console.log(error))

    this.setUser(username, password);

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
    console.log(username, password);
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
        loginIsVisible: false,
        registerIsVisible: false,
        editServiceIsVisible: false
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
      //update state
      fetch('users/' + this.state.user.username, {
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
      //run get or go in array
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
      console.log("jsoned", jsonedJob);


      fetch('users/' + this.state.user.username, {
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

  /*======================
  add a new service
  ======================*/
  addNewService(serviceName, price, employee_id){
    // console.log('adding service', serviceName, price, employee_id);
    console.log(event);
    fetch('/services', {
      body: JSON.stringify({
        "service_type": serviceName,
        "service_price": price,
        "employee_id": employee_id
      }),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(createdService => {
      return createdService.json()
    })
    .then(jsonedService => {
      // this.handleCreateJob(jsonedJob)
      console.log("jsoned", jsonedService);

      fetch('users/' + this.state.user.username, {
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
        this.getAvailableServices();
        this.setState({
          user: data,
          userIsVisible: true,
          loginIsVisible: false,
          addServiceIsVisibile: false
        })
        if(data.employee_id !==0){
          this.setEmployee(data.employee_id);
        }
      }).catch(error => console.log(error))


      if(employeeID !==0){
        this.toggleState('userIsVisible', 'providedServicesIsVisible', 'employeeIsVisible')
      } else {
      this.toggleState('userIsVisible', 'providedServicesIsVisible')
      }


  })
  .catch(error=> console.log(error))
}

  /*======================
  update a new service
  ======================*/
  updateService(service_type, service_price){
    console.log('service to edit', this.state.serviceToEdit);
    console.log('service to edit', this.state.employee);
    //for the put request to update the service
    fetch('/services/' + this.state.serviceToEdit.service_id, {
      body: JSON.stringify({
        "service_type": service_type,
        "service_price": service_price,
        "employee_id": this.state.employee.employee_id
      }),
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(updatedService => {
      return updatedService.json()
    })
    .then(jsonedService => {

      fetch('users/' + this.state.user.username, {
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
        this.getAvailableServices();
        this.setState({
          user: data,
          userIsVisible: true,
          loginIsVisible: false,
          addServiceIsVisibile: false,
          editServiceIsVisible: false
        })
        if(data.employee_id !==0){
          this.setEmployee(data.employee_id);
        }
      }).catch(error => console.log(error))


      if(employeeID !==0){
        this.toggleState('userIsVisible', 'providedServicesIsVisible', 'employeeIsVisible')
      } else {
      this.toggleState('userIsVisible', 'providedServicesIsVisible')
      }


    })
    .catch(error => console.log(error))
  }


  /*======================
  delete a new service
  ======================*/
  deleteService(service, index){
    console.log('deleting service', service, index);

    fetch('/services/' + service.service_id,
    {
      method: 'DELETE'
    })
    .then(data => {
      console.log(data);
      //deletes but need page to reload
      //update state
      fetch('users/' + this.state.user.username, {
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
        this.getAvailableServices();
        this.setState({
          user: data,
          userIsVisible: true,
          loginIsVisible: false
        })
        if(data.employee_id !==0){
          this.setEmployee(data.employee_id);
        }
      }).catch(error => console.log(error))
      //run get or go in array
    })

  }

  /*======================
  delete a Job
  ======================*/
  deleteJob(){

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
            createUser={this.createUser}
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
            updateService={this.updateService}
            deleteService={this.deleteService}
            deleteRequest={this.deleteRequest}
            editService={this.editService}
          />
          : ''
        }

        {this.state.addServiceIsVisibile ?
          <AddService
            toggleState={this.toggleState}
            user={this.state.user}
            employee={this.state.employee}
            addNewService={this.addNewService}
          />
          : ''
        }

        {this.state.editServiceIsVisible ?
          <EditService
            toggleState={this.toggleState}
            updateService={this.updateService}
            serviceToEdit={this.state.serviceToEdit}
            employee={this.state.employee}
          />
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
