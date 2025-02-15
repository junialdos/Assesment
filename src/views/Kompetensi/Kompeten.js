import React, { Component } from 'react';
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
        name: 'Model Kompetensi',
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


class Kompetens extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.togglePrimary = this.togglePrimary.bind(this);
    this.togglePrimary2 = this.togglePrimary2.bind(this);
    
    this.state = {
      loading: false,
      kompetens: [],
      id_model:'',
      name_model:'',
      nama_cluster:'',
      modal: false,
      large: false,
      small: false,
      primary: false,
      primary2: false,
      action : '',
      url:this.props.location.pathname,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase
      .kompetens()
      .onSnapshot(snapshot => {
        let kompetens = [];
        snapshot.forEach(doc =>
            kompetens.push({ ...doc.data(), uid: doc.id }),
        );

        this.setState({
          id_model: this.props.match.params.id_model,
          id_cluster: this.props.match.params.id,
          kompetens,
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
        const { name_model} = this.state;
        // const data = new FormData(e.target);
        // const name_model = data.get('model_kompeten')

        if(name_model != ''){
            const addRef = this.props.firebase.kompetens();
            addRef.add({
            name_model,
            }).then((docRef) => {
            this.setState({
          primary: !this.state.primary,
          name_model: ''
            });
            // this.props.history.push("/Kompetens")
            swal("Success Add Data")
            })
            .catch((error) => {
            console.error("Error adding document: ", error);
            });
        }else{
            swal("Input Name Model")
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
          id_model : id,
          name_model : name,
          action : action,
        });
      }

    handleChange =event =>{
        event.preventDefault()
        this.setState({[event.target.name]: event.target.value});
    }

    handleEditDelete=event =>{
        event.preventDefault();
        const { id_model, name_model, action,primary2 } = this.state;
        if(action == "Edit"){
            const updateRef = this.props.firebase.kompetenModel(id_model);
            updateRef.set({
            name_model,
            }).then((docRef) => {
            this.setState({
                name_model: '',
                primary2: !this.state.primary2,
            })
            swal("Success", "Success Update Data", "success")
            })
            .catch((error) => {
            console.error("Error adding document: ", error);
            });
        }else{
            const updateRef = this.props.firebase.kompetenModel(id_model).delete()
                .then((docRef) =>  {
                this.setState({
                    name_model: '',
                    primary2: !this.state.primary2,
                })
                swal("Success", "Success Delete Data", "success")
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
        }
    }

    handleDelete=event =>{
        event.preventDefault();
        const { id_model} = this.state;

        const updateRef = this.props.firebase.kompetenModel(id_model).delete().then(function() {
            console.log("Document successfully deleted!");
            swal("Success", "Document successfully deleted!", "success")
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
        
    }
    cancel =event =>{
        event.preventDefault()
        const { name_model} = this.state;
        console.log(event.target)
        this.setState({
                    [event.target.name]: !event.target.name,
                    name_model:''
                    })
    }
    handleClick=e=>{
        // e.preventDefault()
        const {kompetens} = this.state
        const cell = e.dataIndex
        const id = kompetens[cell].uid
        const KompetenLink = `/kompetens/model/${id}`
        this.props.history.push({
                    pathname: KompetenLink,
                    })
    }
  render() {
    const { kompetens, loading, nama_cluster } = this.state;
    console.log(kompetens)
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
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> List <small className="text-muted">Kompeten</small>
              </CardHeader>
              <CardBody>
                    <Button color="primary" onClick={this.togglePrimary} className="mr-1"><i className="fa fa-plus fa-lg mt-2"></i> <small className="text-muted">Add</small> Model</Button>
            </CardBody>
              <CardBody>
                <MUIDataTable
                    title=""
                    columns={columns}
                    data={Object.values(kompetens).map((item, index) => {
                    return [
                        <div key={item.id_model}>{index+1}</div>,
                        item.name_model,
                        <div>
                        <i className="fa fa-edit font-2xl" onClick={this.togglePrimary2} id={[item.uid, item.name_model]}  data={item.nama_model} columns="1" action="Edit"></i>&nbsp;
                        <i className="fa fa-trash font-2xl" onClick={this.togglePrimary2} id={[item.uid, item.name_model]} name={item.name_model} action="Delete"></i>
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
                                    <Input type="text" id="name_model" name="name_model" placeholder="Nama Model" value={this.state.name_model} onChange={this.handleChange}/>
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
                                    <Input type="text" id="name_model" name="name_model" placeholder="Nama Kompeten" value={this.state.name_model} onChange={this.handleChange}/>
                                    </InputGroup>
                                    
                                </Col>
                            </FormGroup>
                            {/* <CardFooter >
                                <Button type="submit" size="sm" color="success"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                            </CardFooter> */}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" >Save</Button>{' '}
                        <Button color="secondary" name="primary" onClick={this.cancel}>Cancel</Button>
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

export default withFirebase(Kompetens);
