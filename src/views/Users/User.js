import React, { Component, SomeCustomComponent, CustomToolbar,CustomToolbarSelect,TableRow, TableCell } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Badge} from 'reactstrap';
import { Link } from 'react-router-dom';

import Users from './Users'
import UsersData from './UsersData'
import { withFirebase } from '../../firebase';
// import '../assets/scss/mdb.scss'
// import '../../assets/scss/mdb.scss'
import { MDBDataTable } from 'mdbreact';
import DataTable from 'react-data-table-component';
// import datetime from 'node-datetime';
import MUIDataTable from "mui-datatables";
// import ReactExport from "react-data-export";
import ReactTable from 'react-table'
import ReactExport from "react-data-export";

const columns = [
  {
      Header: 'name',
      accessor: 'name', // String-based value accessors!
  },
  {
      Header: 'age',
      accessor: 'age',

 }]

 


class User extends Component {
  constructor(props) {
    super(props);
    // this.handleChange = this.
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      users : [],
      nama :'',
      jabatan :'',
      firstname :'',
      lastname :'',
      nip :'',
      phone :'',
      toggledClearRows: false,
    }
  }
  
  componentDidMount() {
    this.unsubscribe=  this.props.firebase.user(this.props.match.params.id)
      .onSnapshot(snapshot => {
          const data = snapshot.data()
          this.setState({
          firstname: data.firstname,
          lastname: data.lastname,
          nip: data.nip,
          jabatan: data.jabatan,
          email: data.email,
          phone: data.phone,
          });
        });
  }

  componentWillUnmount() {
    this.unsubscribe()
    // this.unsubscribe && this.unsubscribe();
}

handleChange(state) {
  console.log('Selected Rows: ', state.state);
  
}
  render() {
    const {jabatan, nip, firstname, lastname, email, phone} = this.state

    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
    // Toggle the state so React Table Table changes to `clearSelectedRows` are triggered
    const handleClearRows = () => {
      this.setState({ toggledClearRows: !this.state.toggledClearRows})
    }
    const transactions = this.props.allTransactions;
    const columns = [
              {
                name: 'Username',
                options: {
                  filter: false,
                  sort: false,
                  filterType: 'textField',
                  exportable: false,
                },
              },
         
              "Company", "City", "State"] /* <-- Table header columns. this is required */
const options = {
  selectableRows:false,
  downloadOptions : {filename: 'tableDownload.csv', separator: ';'},
  // renderExpandableRow: (rowData, rowMeta) => {
  //   console.log(rowData, rowMeta);
  //   return (
  //     <TableRow>
  //       <TableCell colSpan={rowData.length}>
  //         Custom expandable row option. Data: {JSON.stringify(rowData)}
  //       </TableCell>
  //     </TableRow>
  //   );
  // }
  /* <-- add your data first unique column name for this like _id, i used fname because i don't have a _id field in my array */
};
 
const data = [
 ["Joe James", "Test Corp", "Yonkers", "NY","action"],
 ["John Walsh", "Test Corp", "Hartford", "CT"],
 ["Bob Herm", "Test Corp", "Tampa", "FL"],
 ["James Houston", "Test Corp", "Dallas", "TX"],
];
    const dataSet1 = [
      {
          name: "Johson",
          amount: 30000,
          sex: 'M',
          is_married: true
      },
      {
          name: "Monika",
          amount: 355000,
          sex: 'F',
          is_married: false
      },
      {
          name: "John",
          amount: 250000,
          sex: 'M',
          is_married: false
      },
      {
          name: "Josef",
          amount: 450500,
          sex: 'M',
          is_married: true
      }
  ];
    var dataSet2 = [
      {
          name: "Johnson",
          total: 25,
          remainig: 16
      },
      {
          name: "Josef",
          total: 25,
          remainig: 7
      }
  ];

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
          <Card >
            <Row>
            <Col md={2}></Col>
            <Col md={8}>
            <br/>
            <Card >
            <CardHeader >
              Detail <small className="text-muted">Anggota</small>
              </CardHeader>
              <CardBody>
              <Row>
              <Col md="4">
              <img src={'../../assets/img/avatars/6.png'} className="img-avatar"/>
              </Col>
              <Col md="8" >
              <p>{nip}</p>
              <p >{firstname}</p>
              <p>{lastname}</p>
              <p>{jabatan}</p>
              <p>{email}</p>
              <p>{phone}</p>
              <hr/>
              </Col>
              </Row>
              </CardBody>
              </Card >
              </Col>
              <Col md={2}></Col>
              </Row>
            </Card>
          </Col>
        </Row>
        {/* <ExcelFile element={<Button color="primary"><i className="cui-cloud-download icons font-3xl"></i></Button>}>
                <ExcelSheet data={dataSet1} name="Employees">
                    <ExcelColumn label="Name" value="name"/>
                    <ExcelColumn label="Wallet Money" value="amount"/>
                    <ExcelColumn label="Gender" value="sex"/>
                    <ExcelColumn label="Marital Status"
                                 value={(col) => col.is_married ? "Married" : "Single"}/>
                </ExcelSheet>
                <ExcelSheet data={dataSet2} name="Leaves">
                    <ExcelColumn label="Name" value="name"/>
                    <ExcelColumn label="Total Leaves" value="total"/>
                    <ExcelColumn label="Remaining Leaves" value="remaining"/>
                </ExcelSheet>
            </ExcelFile>
            <div>
                    <button onClick={this.download}>
                        Download
                    </button>
                </div>
        <MUIDataTable
        title="Arnold Movies"
        columns={columns}
        data={data.map((item, index) => {
          return [
            <Button key={item} state={index} onClick={this.handleChange}>
              {index}
            </Button>,item[1],item[2]
          ];
        })}
        options={options}
      /> */}
       
        {/* <MDBDataTable
          striped
          bordered
          hover
        data={UsersData}
        /> */}
      </div>

    )
  }
}

export default withFirebase(User);
