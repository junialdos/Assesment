import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

import Dropzone from 'react-dropzone';
import csv from 'csv';
import * as ROLES from '../../constants/roles';

class UploadUser extends Component {
    constructor(props) {
        super(props);
    }

    onDrop(files) {

    this.setState({ files });

    var file = files[0];

    const reader = new FileReader();
    reader.onload = () => {
      csv.parse(reader.result, (err, data) => {

        var userList = [];
        
        for (var i = 0; i < data.length; i++) {
          const username = data[i][0];
          const email = data[i][1];
          const password = data[i][2];
          const isAdmin = data[i][3];
          const roles = {};

          roles[0] = isAdmin;

          const newUser = { "username": username, "email": email, "password": password, "roles": roles};
          userList.push(newUser);

          fetch('https://assesment-803ef.firebaseio.com/users.json', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser)
          })

        };
      });
    };

    reader.readAsBinaryString(file);
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

export default UploadUser;