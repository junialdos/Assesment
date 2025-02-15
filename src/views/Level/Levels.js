import React, { Component } from 'react';
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row,
    Table,
    Modal, ModalBody, ModalFooter, ModalHeader
  } from 'reactstrap';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

import { withFirebase } from '../../firebase';
import MUIDataTable from "mui-datatables";

const columns = [
    {
        name: 'No.',
        options: {
        filter: false,
        sort: false,
        filterType: 'textField',
        },
    },
    {
        name: 'Level',
        options: {
        filter: true,
        sort: false,
        // display : 'excluded',
        // customBodyRender: (value, tableMeta, updateValue) => {

        //     const xy = tableMeta.rowData[2].props
        //     // .split('//**//')[1]
        //     // console.log(value,xy)
        //     // console.log(value,tableMeta.rowData[2].props.children[0].props.id, updateValue)
        //     return (
        //       <a href={value}>{value}</a>
        //     );
        //   }
        },
    },
    {
        name: 'Requirment',
        options: {
        filter: true,
        sort: false,
        },
    },
    {
        name: 'Action',
        options: {
        filter: false,
        sort: false,
        filterType: 'textField',
        },
    },
]

function UserRow(propss) {
  const kompeten = propss.kompeten
  const userLink = `/modelClusterAdd/${kompeten.uid}`
  const number =0;   
  const getBadge = (roles) => {
    return roles === 'ADMIN' ? 'success' :
            roles === 'EVALUATOR' ? 'secondary' :
            roles === 'USER' ? 'warning' :
            roles === '' ? 'danger' :
            'primary'
  }

  return (
    <tr >
      <td>{kompeten.key}</td>
      <th scope="row"><Link to={userLink}><Badge size="50" color="primary"><i className="fa fa-plus fa-lg mt-2"></i> Add Cluster</Badge></Link></th>
      <td>{kompeten.name_model}</td>
    </tr>
  )
}



class Levels extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditDelete = this.handleEditDelete.bind(this);
    this.togglePrimary = this.togglePrimary.bind(this);
    this.togglePrimary2 = this.togglePrimary2.bind(this);
    
    this.state = {
      loading: false,
      cluster: [],
      level: [],
      id_model:'',
      name_model:'',
      nama_cluster:'',
      name_kompetensi:'',
      name_level:'',
      requirment:'',
      id_kompeten:'',
      kompeten:null,
      id_kompetensi:'',
      id_level:'',
      range:'',
      modal: false,
      large: false,
      small: false,
      primary: false,
      primary2: false,
      action: '',
      clusters : [],
      ...props.location.state,
    };
  }

  componentDidMount() {
    const refModel = 
                    this.props.firebase.kompetensiRange(this.props.match.params.id_model, this.props.match.params.id,this.props.match.params.id_kompetensi)
                    .onSnapshot(snapshot => {
                        const data = snapshot.data()
                        this.setState({
                            name_kompetensi: data.name_kompetensi,
                        });
                    });
    this.unsubscribe = this.props.firebase.kompetensiLevel(this.props.match.params.id_model, this.props.match.params.id,this.props.match.params.id_kompetensi)
                    .onSnapshot(snapshot => {
                        let level = [];
                        
                        snapshot.forEach(doc =>
                            level.push({ ...doc.data(), uid: doc.id }),
                        );
                
                        this.setState({
                          id_model: this.props.match.params.id_model,
                          id_cluster: this.props.match.params.id,
                          id_kompetensi: this.props.match.params.id_kompetensi,
                          level,
                          loading: false,
                        });
                      });  
  }

    componentWillUnmount() {
        this.unsubscribe()
        // this.unsubscribe && this.unsubscribe();
    }

    handleSubmit (e) {
    e.preventDefault();
    const { id_model,id_cluster,id_kompetensi, name_level, requirment } = this.state;
        if( name_level =='' || requirment == ''){
            swal("Data Belum Lengkap")
        }else{
            this.props.firebase
            .kompetensiLevel(id_model, id_cluster, id_kompetensi)
            .add({
                name_level,
                requirment,
            }).then((docRef) => {
                this.setState({
                    primary: !this.state.primary,
                    name_level: '',
                    requirment:'',
                });
                // this.props.history.push("/")
                swal("Success Add Data")
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        }
    }

    handleEditDelete (e) {
        e.preventDefault();
        const { id_model, id_cluster, id_kompetensi, id_level, name_model, nama_cluster, name_kompetensi, name_level, requirment, action } = this.state;
        if(action == 'Edit'){
            if( name_level =='' || requirment ==''){
                    swal("Data Belum Lengkap")
                }else{
                    this.props.firebase
                    .kompetensiLevelRequirment(id_model, id_cluster, id_kompetensi, id_level)
                    .set({
                        name_level,
                        requirment
                    }).then((docRef) => {
                        this.setState({
                            primary2: !this.state.primary2,
                            name_level: '',
                            requirment: '',
                        });
                        // this.props.history.push("/")
                        swal("Success", "Success Update Data", "success")
                    })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                    });
            }
        }else{
            this.props.firebase.kompetensiLevelRequirment(id_model, id_cluster, id_kompetensi, id_level).delete()
                .then((docRef) =>  {
                this.setState({
                    name_level: '',
                    requirment: '',
                    primary2: !this.state.primary2,
                })
                swal("Success", "Success Delete Data", "success")
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
        }
    }

    handleEdit=event =>{
        event.preventDefault();
        const { id_model, name_model } = this.state;

        const updateRef = this.props.firebase.kompetenModel(id_model);
        updateRef.set({
        name_model,
        }).then((docRef) => {
        this.setState({
            name_model: '',
            primary: !this.state.primary,
        })
        
        })
        .catch((error) => {
        console.error("Error adding document: ", error);
        });
    }

    togglePrimary(e) {
        e.preventDefault();
        // const r = document.getElementsByClassName("mr-1")[0].getAttribute("id");
        const {id_cluster, nama_cluster, name_kompetensi} =  this.state
        this.setState({
          primary: !this.state.primary,
          id_cluster : id_cluster,
          nama_cluster : nama_cluster,
          name_kompetensi : name_kompetensi,
        });
        
    }

    togglePrimary2(e) {
        e.preventDefault();
        const {nama_cluster, name_kompetensi} = this.state
        const attribute = document.getElementsByClassName(e.target.className)[0]; 
        let action = attribute.getAttribute("action")
        const data = e.target.id; 
        var array = data.split(",")
        var id = array[0]
        var namelevel = array[1]
        var requirment_ = array[2]
        console.log(array)
        this.setState({
          primary2: !this.state.primary2,
          id_level : id,
          nama_cluster : nama_cluster,
          name_kompetensi : this.state.name_kompetensi,
          name_level : namelevel,
          requirment : requirment_,
          action : action,
        });
    }

    handleChange = event =>{
        event.preventDefault()
        this.setState({[event.target.name]: event.target.value});

    }

    cancel = event =>{
        const name_primary = event.target.name
        if(name_primary == "primary"){
            this.setState({
                    [event.target.name]: !this.state.primary,
                    name_kompetensi: '',
                    });
        }else{
            this.setState({
                [event.target.name]: !this.state.primary2,
                name_kompetensi: '',
            });
        }
    }
    handleClick=e=>{
        // e.preventDefault()
        const {kompetensi} = this.state
        const cell = e.dataIndex
        const id_model = this.state.id_model
        const id_cluster = this.state.id_model
        const id = kompetensi[cell].uid
        const url=this.props.match.url
        console.log(id_model, id_cluster, id)
        // `${cluster.url}/cluster/${cluster.id_model}/${Cluster.uid}`
        // const KompetenLink = `${url}/cluster/${id_model}/${id}`
        // this.props.history.push({
        //             pathname: KompetenLink,
        //             })
    }

  render() {
    const { id_model, level, loading, nama_cluster, name_kompetensi } = this.state
    const options = {
        selectableRows:false,
        selectableonRowClick: false,
        // downloadOptions : {filename: 'tableDownload.csv', separator: ';'},
        // hasIndex: true, /* <-- use numbers for rows*/
        searchBox: false, /* <-- search true or false */
        download: false, /* <-- csv download true or false */
        print:false,
        responsive: 'scroll',
        onCellClick: (cellIndex,RowIndex, kompetens) => {
            const cell = RowIndex.colIndex;
            if(cell == 1){
                this.handleClick(RowIndex);
            }
        },
    }
  return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
              {/* {console.log(this.props)} */}
                  
                {/* <Link to={urlback}><i className="fa fa-arrow-left font-1xl"></i></Link>&nbsp; */}
                 List <small className="text-muted">Level</small>
              </CardHeader>
              <CardBody>
                    <Button color="primary" onClick={this.togglePrimary} className="mr-1"><i className="fa fa-plus fa-lg mt-2"></i> <small className="text-muted">Add</small> Level</Button>
                </CardBody>
              <CardBody>
                {/* <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Nama Kompetensi</th>
                      <th scope="col">Range</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kompetensi.map((kompetensi, index) =>
                      <tr key={kompetensi.uid.toString()}>
                      <td>{index+1}</td>
                      <td>{kompetensi.name_kompetensi}</td>
                      <td>{kompetensi.range}</td>
                      <th scope="row">
                      <i className="fa fa-edit font-2xl" onClick={this.togglePrimary2} id={kompetensi.uid} name={kompetensi.name_kompetensi} action="Edit"></i> &nbsp;
                      <i className="fa fa-trash font-2xl" onClick={this.togglePrimary2} id={kompetensi.uid} name={kompetensi.name_kompetensi} action="Delete"></i></th>
                    </tr>
                    )}
                  </tbody>
                </Table> */}
                <MUIDataTable
                    title=""
                    columns={columns}
                    data={Object.values(level).map((item, index) => {
                    return [
                        <div key={item.uid}>{index+1}</div>,
                        item.name_level,
                        item.requirment,
                        <div>
                        <i className="fa fa-edit font-2xl" onClick={this.togglePrimary2} id={[item.uid, item.name_level, item.requirment]}  name={item.name_level} columns="1" action="Edit"></i>&nbsp;
                        <i className="fa fa-trash font-2xl" onClick={this.togglePrimary2} id={[item.uid, item.name_level, item.requirment]} name={item.name_level} action="Delete"></i>
                        </div>
                    ];
                    })}
                    options={options}
                />
              </CardBody>
              <Modal isOpen={this.state.primary} toggle={this.togglePrimary}
                        className={'modal-primary ' + this.props.className}>
                    <ModalHeader >Add Level</ModalHeader>
                    <Form onSubmit={this.handleSubmit}>
                    <ModalBody>
                            <FormGroup row>
                            
                                <Col md="12">
                                    <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="fa fa-align-justify"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" id="name_kompetensi" name="name_kompetensi" placeholder="Nama Kompetensi" value={this.state.name_kompetensi} onChange={this.handleChange} disabled/>
                                    </InputGroup>
                                    
                                </Col>
                                <Col md="12">
                                    <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="fa fa-align-justify"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" id="name_level" name="name_level" placeholder="Level" value={this.state.name_level} onChange={this.handleChange}/>
                                    </InputGroup>
                                    
                                </Col>
                                <Col md="12">
                                    <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="fa fa-align-justify"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" id="requirment" name="requirment" placeholder="Requirment" value={this.state.requirment} onChange={this.handleChange}/>
                                    </InputGroup>
                                    
                                </Col>
                            </FormGroup>
                            {/* <CardFooter >
                                <Button type="submit" size="sm" color="success"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                            </CardFooter> */}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" >Do Something</Button>{' '}
                        <Button color="secondary" name="primary" onClick={this.cancel}>Cancel</Button>
                    </ModalFooter>
                    </Form>
                    </Modal>

                    <Modal isOpen={this.state.primary2} toggle={this.togglePrimary2}
                        className={'modal-primary ' + this.props.className}>
                    <ModalHeader >{this.state.action} Kompetensi</ModalHeader>
                    <Form onSubmit={this.handleEditDelete}>
                    <ModalBody>
                            <FormGroup row>
                                <Col md="12">
                                    <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="fa fa-align-justify"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" id="name_kompetensi" name="name_kompetensi" placeholder="Nama Cluster" value={this.state.name_kompetensi} onChange={this.handleChange} disabled/>
                                    </InputGroup>
                                </Col>
                                <Col md="12">
                                    <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="fa fa-align-justify"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" id="name_level" name="name_level" placeholder="Level" value={this.state.name_level} onChange={this.handleChange}/>
                                    </InputGroup>
                                    
                                </Col>
                                <Col md="12">
                                    <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="fa fa-align-justify"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" id="requirment" name="requirment" placeholder="Requirment" value={this.state.requirment} onChange={this.handleChange}/>
                                    </InputGroup>
                                    
                                </Col>
                            </FormGroup>
                            {/* <CardFooter >
                                <Button type="submit" size="sm" color="success"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                            </CardFooter> */}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" >{this.state.action}</Button>{' '}
                        <Button color="secondary" name="primary2" onClick={this.cancel}>Cancel</Button>
                    </ModalFooter>
                    </Form>
                    </Modal>
            </Card>
          </Col>
        </Row>
    </div>
    )
  }
}

export default withFirebase(Levels);
