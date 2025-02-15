import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom'
import { compose } from 'recompose';
import './login.css';
import swal from 'sweetalert';
import { Button } from 'reactstrap';
import {input} from 'reactstrap';
// import { AuthConsumer } from '../../AuthContext'
// import { withFirebase } from '../../firebase';


class login extends Component {

  // constructor(props){
  // super(props);
  // this.handleChange = this.handleChange.bind(this);
  // this.handleChange2 = this.handleChange2.bind(this);
  // this.state = {
  //   nip:'',
  //   password:'',
  //   loading: true,
  //   dashboard:''
  //   }
  // }

  // handleChange(event) {
  //   this.setState({nip: event.target.value});
  // }

  // handleChange2(event) {
  //   this.setState({password: event.target.value});
  // }

  // componentWillMount(){
  //   const doc = this.props.firebase.users()
  //   doc.onSnapshot(async(querySnapshot)=>{
  //     var data = []
  //       querySnapshot.forEach((doc)=>{
  //         let item = data
  //         item.push({
  //           data : doc.data(),
  //         })
  //       })
  //     this.setState({
  //       dashboard : data
  //     })
  //   })
  // }


  render() {
    return (
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
                  <input className="form-control input_user" type="text" placeholder="NIP" autoFocus="" />
                </div>
                <div className="input-group mb-2">
                  <div className="input-group-append">
                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                  </div>
                  <input className="form-control input_user" type="password" placeholder="Password" />
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
          </div>
        </div>
      </div>
    );
  }

  // login = () => {
  //   const {nip,password, loading} = this.state
    
    
  //   if (nip === ''){
  //     swal('Isi NIP anda')
  //   }else if (password === ''){
  //     swal('Isi Password anda')
  //   }else{
  //     this.props.firebase.doLogin(nip, password)
  //     this.props.history.push("/admin");
  //     //   console.log(this.state)
  //   }
  // }

}

export default login
// export default withFirebase(login)
