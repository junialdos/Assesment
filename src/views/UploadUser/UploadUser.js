import React, { Component } from 'react';
import { withFirebase } from '../../firebase';

import Dropzone from 'react-dropzone';
import csv from 'csv';
// import * as ROLES from '../../constants/roles';
import swal from 'sweetalert';

class UploadUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
        roles: [],
      wilayahs: [],
      kompetens: [],
      firstname : '',
      lastname : '',
      nip : '',
      email : '',
      phone : '',
      role:'',
      isAdmin:'',
      wilayah:'',
      password:'',
      status:false,
        }
    }

    onDrop(files) {

    this.setState({ files });

    var file = files[0];

    const reader = new FileReader();
    reader.onload = () => {
      csv.parse(reader.result, (err, data) => {

        var userList = [];
        
        for (var i = 0; i < data.length; i++) {
    const {firstname, lastname, nip,email,phone, role,roles, wilayah, isAdmin, password, status} = this.state;
            
         firstname = data[i][1];
          lastname = data[i][2];
          nip = data[i][3];
          email = data[i][4];
          wilayah = data[i][5];
          password = data[i][6];
          isAdmin = data[i][7];
          roles[0] = isAdmin;

          const newUser = { "firstname": firstname,"lastname": lastname,"nip": nip,
                            "email": email,"wilayah": wilayah, "password": password, "roles": roles,
                            "id_model":'xyz123', "id_jabatan": 'abc123', "jabatan": '', "roles": roles
                          };
        //   console.log(newUser)
          userList.push(newUser);

        //   fetch('https://assesment-803ef.firebaseio.com/user.json', {
          // fetch('https://assesment-803ef.firebaseio.com/users.json', {
          //   method: 'POST',
          //   headers: {
          //     'Accept': 'application/json',
          //     'Content-Type': 'application/json',
          //   },
          //   body: JSON.stringify(newUser)
          // })
        // this.props.firebase.doCreateUserWithEmailAndPassword(email, password)
        // .then(authUser => {
        //   // Create a user in your Firebase realtime database
          this.props.firebase
            .users()
            .add(newUser)
        //     { merge: true },
        //     )
        //     .then(() => {
        //       this.setState({ 
        //       firstname:'',
        //       lastname:'',
        //       nip:'',
        //       email:'',
        //       wilayah:'',
        //       isAdmin:'',
        //       password:'',
        //       roles:[],
        //       });
        //     })
        //     .catch(error => {
        //       this.setState({ error });
        //     swal("Failed Add User")
              
        //     });
        // })
        // .catch(error => {
        //   this.setState({ error });
        // });
            }
        
      });
    };

    reader.readAsBinaryString(file);
    swal("Success","Success Add Users", "success")
    this.props.history.push("/users");
  }

  render() {

    const wellStyles = { maxWidth: 400, margin: '0 auto 10px' };
    const fontSize = 5;

    return (
      <div align="center" oncontextmenu="return false">
        <br /><br /><br />
        <div className="dropzone">
          <Dropzone accept=".csv" onDropAccepted={this.onDrop.bind(this)}>            
          </Dropzone>
          <br /><br /><br />
        </div>
        <h2>Upload or drop your <font size={fontSize} color="#00A4FF">CSV</font><br /> file here.</h2>
      </div>
    )
  }
}

export default withFirebase(UploadUser);