import React, { Component } from 'react';
import { 
    Redirect, 
   } from 'react-router-dom';
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Fade,
    Form,
    FormGroup,
    FormText,
    FormFeedback,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,
    InputGroupText,
    Label,
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
        name: 'Wilayah',
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

function LinkUserList(kompeten){
  const Kompeten = kompeten.kompeten
  const KompetenLink = `/kompetens/model/${Kompeten.uid}`
  return (
    
    <Link to={{
        state:  Kompeten ,
        pathname: KompetenLink,
      }}>{Kompeten.name_model}</Link>
  )
}

const mySubcomponentRenderer = (kompeten) => {
    const Kompeten = kompeten.kompeten
    const KompetenLink = `/kompetens/model/${Kompeten.uid}`
    return (
        
        <Link to={{
            state:  Kompeten ,
            pathname: KompetenLink,
        }}>{Kompeten.name_model}</Link>
    )
  }


class Wilayah extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.togglePrimary = this.togglePrimary.bind(this);
    this.togglePrimary2 = this.togglePrimary2.bind(this);
    
    this.state = {
      loading: false,
      wilayahs: [],
      id_wilayah:'',
      wilayah:'',
      modal: false,
      large: false,
      small: false,
      primary: false,
      primary2: false,
      action : '',
      url:this.props.location.pathname,
      authUser: 
      JSON.parse(localStorage.getItem('authUser')),
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase
      .wilayahs()
      .onSnapshot(snapshot => {
        let wilayahs = [];
        snapshot.forEach(doc =>
            wilayahs.push({ ...doc.data(), uid: doc.id }),
        );

        this.setState({
          wilayahs,
          loading: false,
        });
        
        // console.log(kompetens, columns)
        // this.setState({
        //   kompetens,
        //   loading: false,
        // });
    });
  }

    componentWillUnmount() {
        this.unsubscribe()
    }

    handleSubmit (e) {
        e.preventDefault();
        const { wilayah} = this.state;

        if(wilayah != ''){
            const addRef = this.props.firebase.wilayahs();
            addRef.add({
            wilayah,
            }).then((docRef) => {
            this.setState({
          primary: !this.state.primary,
          wilayah: ''
            });
            // this.props.history.push("/Kompetens")
            swal("Success", "Success Add Data", "success")
            })
            .catch((error) => {
            console.error("Error adding document: ", error);
            swal("Error", error.message, "error")
            });
        }else{
            swal("Info", "Input Jabatan", "info")
        }
    }

    togglePrimary(e) {
        e.preventDefault();
        this.setState({
          primary: !this.state.primary,
        });
      }

    togglePrimary2(e) {
        e.preventDefault();
        const attribute = document.getElementsByClassName(e.target.className)[0]; 
        const data = e.target.id; 
        let action = attribute.getAttribute("action")
        var array = data.split(",")
        var id = array[0]
        var name = array[1]
        this.setState({
          primary2: !this.state.primary2,
          id_wilayah : id,
          wilayah : name,
          action : action,
        });
      }

    handleChange =event =>{
        event.preventDefault()
        this.setState({[event.target.name]: event.target.value});
    }

    handleEditDelete=event =>{
        event.preventDefault();
        const { id_wilayah, wilayah, action,primary2 } = this.state;
        if(action == "Edit"){
            const updateRef = this.props.firebase.wilayah(id_wilayah);
            updateRef.set({
            wilayah,
            }).then((docRef) => {
            this.setState({
                wilayah: '',
                primary2: !this.state.primary2,
            })
            swal("Success", "Success Update Data", "success")
            })
            .catch((error) => {
            console.error("Error adding document: ", error);
            });
        }else{
            const updateRef = this.props.firebase.wilayah(id_wilayah).delete()
                .then((docRef) =>  {
                this.setState({
                    wilayah: '',
                    primary2: !this.state.primary2,
                })
                swal("Success", "Success Delete Data", "success")
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
        }
    }

    
    cancel =event =>{
        event.preventDefault()
        const { jabatan} = this.state;
        this.setState({
                    [event.target.name]: !event.target.name,
                    wilayah:''
                    })
    }
    // handleClick=e=>{
    //     // e.preventDefault()
    //     const {wilayahs} = this.state
    //     const cell = e.dataIndex
    //     const id = wilayahs[cell].uid
    //     const KompetenLink = `/Jabatan/model/${id}`
    //     this.props.history.push({
    //                 pathname: KompetenLink,
    //                 })
    // }
  render() {
    const { wilayahs, loading, wilayah, authUser } = this.state;
    const options2 = {
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
        <div >
          {authUser  ? (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> List <small className="text-muted">Wilayah</small>
              </CardHeader>
              <CardBody>
                    <Button color="primary" onClick={this.togglePrimary} className="mr-1"><i className="fa fa-plus fa-lg mt-2"></i> <small className="text-muted">Add</small> Wilayah</Button>
            </CardBody>
              <CardBody>
                <MUIDataTable
                    title=""
                    columns={columns}
                    data={Object.values(wilayahs).map((item, index) => {
                    return [
                        <div key={item.id_wilayah}>{index+1}</div>,
                        item.wilayah,
                        <div>
                        <i className="fa fa-edit font-2xl" onClick={this.togglePrimary2} id={[item.uid, item.wilayah]}  data={item.wilayah} columns="1" action="Edit"></i>&nbsp;
                        <i className="fa fa-trash font-2xl" onClick={this.togglePrimary2} id={[item.uid, item.wilayah]} name={item.wilayah} action="Delete"></i>
                        </div>
                    ];
                    })}
                    options={options2}
                />  
              </CardBody>
                    <Modal isOpen={this.state.primary2} toggle={this.togglePrimary2}
                        className={'modal-primary ' + this.props.className}>
                    <ModalHeader >{this.state.action} Cluster</ModalHeader>
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
                                    <Input type="text" id="wilayah" name="wilayah" placeholder="Wilayah" value={this.state.wilayah} onChange={this.handleChange}/>
                                    </InputGroup>
                                    
                                </Col>
                            </FormGroup>
                            {/* <CardFooter >
                                <Button type="submit" size="sm" color="success"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                            </CardFooter> */}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" >Do Something</Button>{' '}
                        <Button color="secondary" name="primary2" onClick={this.cancel}>Cancel</Button>
                    </ModalFooter>
                    </Form>
                    </Modal>
                    <Modal isOpen={this.state.primary} toggle={this.togglePrimary}
                        className={'modal-primary ' + this.props.className}>
                    <ModalHeader name="primary" >Add Cluster</ModalHeader>
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
                                    <Input type="text" id="wilayah" name="wilayah" placeholder="Wilayah" value={this.state.wilayah} onChange={this.handleChange}/>
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
            </Card>
          </Col>
          
        </Row>
        
    </div>
    ) 
    : (
    <Redirect to="/login" />
    )}
    </div>
    )
  }
}

export default withFirebase(Wilayah);
