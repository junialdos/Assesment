import React, { Component } from 'react';
import { BrowserRouter, Switch, Route,path, Link, Redirect } from 'react-router-dom'
import { compose } from 'recompose';
import './login.css';
import swal from 'sweetalert';
import { Button } from 'reactstrap';
import {input} from 'reactstrap';
import { withFirebase } from '../../../firebase';
import { AuthConsumer, AuthProvider } from '../../../AuthContext'
// import { compose } from 'recompose';

const Refresh = ({ path = '/' }) => (
  <Route
      path={path}
      component={({ history, location, match }) => {
          history.push({
              ...location,
              pathname:location.pathname.substring(match.path.length)
          });
          return null;
      }}
  />
);

class Login extends Component {

  constructor(props){
  super(props);
  this.handleChange = this.handleChange.bind(this);
  this.handleChange2 = this.handleChange2.bind(this);
  this.state = {
    nip:'',
    password:'',
    data:[],
    loading: true,
    dashboard:'',
    error:null,
    authUser:
    // JSON.parse(
            localStorage.getItem('authUser')
    // ),
    ,
    ...props.location.state,
    }
  }

  handleChange(event) {
    this.setState({nip: event.target.value});
  }

  handleChange2(event) {
    this.setState({password: event.target.value});
  }

  componentWillMount(){
    // const doc = this.props.firebase.users()
    // doc.onSnapshot(async(querySnapshot)=>{
      var data = []
        // querySnapshot.forEach((doc)=>{
        //   let item = data
        //   item.push({
        //     data : doc.data(),
        //   })
        // })
      this.setState({
        dashboard : data
      })
    // })
  }

  // login() {
  //   var {authUser} = this.state
  //   authUser = {
  //     uid: 'aldo',
  //     name: 'aldo',
  //     roles:["ADMIN"],
  //   };
  //   // isAuth = true
  //   this.setState(
  //                 { 
  //                   authUser:authUser ,
  //                 }
  //                );
  //   localStorage.setItem('authUser', JSON.stringify(authUser));
  // }

  // logout() {
  //   localStorage.removeItem('authUser');
  //   // this.setState({ authUser: null });
  //   // this.setState({ isAuth: false })
  // }

  render() {
    const { nip, password,error, data } = this.state;
    return (
      
        <div className="body">
      <div className="container h-100" style={{padding:150}}>
        <div className="d-flex justify-content-center h-100">
          <div className="user_card">
            <div className="d-flex justify-content-center">
              <div className="brand_logo_container">
                <img src="https://i.ibb.co/4R915BX/team.png" className="brand_logo" alt="Logo"/>
              </div>
            </div>
            <div className="d-flex justify-content-center form_container">
              <form>
                <div className="input-group mb-3">
                  <div className="input-group-append">
                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                  </div>
                  <input className="form-control input_user" type="text" placeholder="NIP" autoFocus="" value={this.state.nip} onChange={this.handleChange}/>
                </div>
                <div className="input-group mb-2">
                  <div className="input-group-append">
                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                  </div>
                  <input className="form-control input_user" type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange2}/>
                </div>
                <div className="form-group">
                  <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customControlInline"/>
                    <label className="custom-control-label" htmlFor="customControlInline">Remember me</label>
                  </div>
                </div>
              </form>
            </div>
            <div className="d-flex justify-content-center mt-3 login_container">
              <Button className="btn login_btn" onClick={this.login}>Login</Button>
            </div>
            {/* {error && <p>{error.message}</p>} */}
          </div>
        </div>
      </div>
      </div>
    );
  }

  // login() {
  //   // console.log(e.target)
  //   var {authUser} = this.state
  //   authUser = {
  //     uid: 'aldo',
  //     name: 'aldo',
  //     roles:["ADMIN"],
  //   };
  //   // isAuth = true
  //   this.setState(
  //                 { 
  //                   authUser:authUser ,
  //                 }
  //                );
  //   localStorage.setItem('authUser', JSON.stringify(authUser));
  // }

  // logout= event => {
  //   const {authUser} = this.state
  //   localStorage.removeItem('authUser');
  //   this.setState({ authUser: null });
  //   // this.setState({ isAuth: false })
  // }
  
  login = event => {
    const {nip,password, loading,authUser, data} = this.state
    
    
    if (nip === ''){
      swal('Isi NIP anda')
    }else if (password === ''){
      swal('Isi Password anda')
    }else{
      this.props.firebase.users().onSnapshot(querySnapshot=>{
        var data = []
          querySnapshot.forEach((doc)=>{
            let item = data
            data.push({
              ...doc.data(),
              uid:doc.id,
            })
            this.setState({
              data,
            });
          })
        var NIP  = data.find((itemm) => itemm.nip === nip && itemm.password === password)
        if(NIP){
            localStorage.setItem('authUser', JSON.stringify(NIP));
            // <Redirect to="/dashboard"/>
            this.props.history.push("/dashboard");
        }else{
          swal("Failed", "The password is invalid or the user does not have a password.", "error")
        }
        })
    }
    event.preventDefault();
    
  }

}

export default withFirebase(Login)
