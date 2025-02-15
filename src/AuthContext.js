import React from 'react'
import swal from 'sweetalert';
import Firebase,{ withFirebase } from './firebase';

const AuthContext = React.createContext()
class AuthProvider extends React.Component {
  // state = { isAuth: false }

  constructor() {
    super()
    // this.authUser = JSON.parse(
    //   localStorage.getItem('authUser')
    // )
    this.state = {
      // this.
      authUser:
      JSON.parse(
        localStorage.getItem('authUser')
      )
    };
  }
  
  render() {
    console.log(this.state.authUser)
    return (
      <AuthContext.Provider
        value={{
          authUser: this.state.authUser,
          login: this.login,
          logout: this.logout,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

const AuthConsumer = AuthContext.Consumer
export { AuthProvider, AuthConsumer }
