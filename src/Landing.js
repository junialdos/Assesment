import React,{ Component } from 'react'
import { withFirebase } from './firebase';

// const Landing = () => (
  class Landing extends Component {
    render() {
    return (
  <div className="container">
    <h2>Landing Page</h2>
  </div>
// )
    )
  }
}
export default withFirebase(Landing)
