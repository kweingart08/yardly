class Front extends React.Component {
  render(){
    return (
      <div className="front-container">
        <p>Are you working hard or YARDLY working</p>
        <p>All of your yard work needs done by someone else</p>

        <button onClick={ () => this.props.toggleState( 'frontIsVisible', 'registerIsVisible' )}>Register</button>
        <button>SIGN IN</button>
      </div>
    )
  }
}