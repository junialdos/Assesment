import React, { Component, SomeCustomComponent, CustomToolbar,CustomToolbarSelect,TableRow, TableCell } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Badge} from 'reactstrap';
import { Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';

import Hasil from './Hasil'
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
 
class HasilUser extends Component {
  constructor(props) {
    super(props);
    // this.handleChange = this.
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      users : [],
      kompetens:[],
      hasiluser:[],
      nama :'',
      jabatan :'',
      firstname :'',
      lastname :'',
      nip :'',
      phone :'',
      id_model:'',
      id_jabatan:'',
      name_model:'',
      toggledClearRows: false,
    }
  }
  
  componentDidMount() {
    this.unsubscribe=  
    this.props.firebase.user(this.props.match.params.id)
      .onSnapshot(snapshot => {
          const data = snapshot.data()
          
          this.props.firebase.kompetenModel(data.id_model)
                    .onSnapshot(snapshot2 => {
                        const model2 = snapshot2.data()

                        this.setState({
                        name_model: model2.name_model,
                        });
                    }); 
          this.setState({
          firstname: data.firstname,
          lastname: data.lastname,
          nip: data.nip,
          jabatan: data.jabatan,
          id_model: data.id_model,
          id_jabatan: data.id_jabatan,
          email: data.email,
          phone: data.phone,
          });
        })
        this.props.firebase.UserHasil(this.props.match.params.id)
        .onSnapshot(snapshot => {
          let hasiluser = [];
          
          snapshot.forEach(doc =>
            hasiluser.push({ ...doc.data(), uid: doc.id }),
          );
  
          this.setState({
            hasiluser,
          });
          
        });

        this.props.firebase.kompetens()
        .onSnapshot(snapshot => {
            let kompetens = [];
            
            snapshot.forEach(doc =>
                kompetens.push({ ...doc.data(), uid: doc.id }),
            );
    
            this.setState({
                kompetens,
                loading: false,
            });
            
          });

          // const refModel = 
          //           this.props.firebase.kompetenModel(this.state.id)
          //           .onSnapshot(snapshot => {
          //               const model = snapshot.data()

          //               this.setState({
          //               name_model: model.name_model,
          //               });
          //           }); 
  }

  componentWillUnmount() {
    this.unsubscribe()
    // this.unsubscribe && this.unsubscribe();
}

handleChange(state) {
  console.log('Selected Rows: ', state.state);
  
}
  render() {
    const {jabatan, nip, firstname, lastname, email, phone, hasiluser, name_model} = this.state
    const groupBy = key => array =>
    array.reduce(
      (objectsByKeyValue, obj) => ({
        ...objectsByKeyValue,
        [obj[key]]: (objectsByKeyValue[obj[key]] || []).concat(obj)
      }),
      {}
    );
    const groupByNama = groupBy('nama');
    const groupByNilai = groupBy('nilai');

    var nama =[];
    var nilai =[];
    hasiluser.forEach(item => {
      nama.push(item.nama);
      nilai.push(item.nilai);
    });

    const valueGroupByNama = groupByNama(hasiluser);
    const valueGroupByNilai = groupByNilai(hasiluser);

    // console.log(hasiluser, Object.values(valueGroupByNama))

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
    const bar = {
    labels: nama,
    datasets: [
        {
        label: 'Nama Kompetensi',
        position: "top",
        backgroundColor: 'rgba(0, 0, 255)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(0, 0, 255)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: nilai,
        },
    ],
    };
const options = {
  selectableRows:false,
  responsive: 'scroll',
  downloadOptions : {filename: 'tableDownload.csv', separator: ';'},
  scales: {
    yAxes: [{
        ticks: {
            beginAtZero: true
        }
    }]
}
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
              <small className="text-muted">Anggota</small>
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
              <CardHeader>
              {jabatan}
              <div className="card-header-actions">
              <small className="text-muted">{name_model}</small>
              </div>
            </CardHeader>
            <CardBody>
            <Col md="12">
              <div className="chart-wrapper" style={{ height: 350 + 'px', marginTop: 40 + 'px' }}>
                <Bar data={bar}
                // height={200}
                width={400}
                 options={options} />
              </div>
              </Col>
            </CardBody>
            </Card>
          </Col>
          <CardBody>
        </CardBody>
          
        </Row>
      </div>
    )
  }
}

export default withFirebase(HasilUser);
