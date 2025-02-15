import React, { Component } from 'react';
import { Bar, Doughnut, Line, Pie, Polar, Radar } from 'react-chartjs-2';
import { Card, CardBody, CardColumns, CardHeader } from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { withFirebase } from '../../firebase';

const line = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

const bar = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
        label: 'Hasil User',
        position: "top",
        backgroundColor: 'rgba(0, 0, 255)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(0, 0, 255)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [65, 59, 80, 81, 56, 55, 40],
        },
        {
        label: 'Hasil User2',
        position: "top",
        backgroundColor: 'rgba(255, 0, 0)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255, 0, 0)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [100, 100, 100, 100, 100, 100, 100],
        },
  ],
};

const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false
}
function UserRow(props) {
    const user = props.user
    // const userLink = `/users/${users.id}`
    const line = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'My First dataset',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
          },
        ],
      };
      
      const bar = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
              label: 'Hasil User',
              position: "top",
              backgroundColor: 'rgba(0, 0, 255)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(0, 0, 255)',
              hoverBorderColor: 'rgba(255,99,132,1)',
              data: [65, 59, 80, 81, 56, 55, 40],
              },
              {
              label: 'Hasil User2',
              position: "top",
              backgroundColor: 'rgba(255, 0, 0)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255, 0, 0)',
              hoverBorderColor: 'rgba(255,99,132,1)',
              data: [100, 100, 100, 100, 100, 100, 100],
              },
        ],
      };
  
    const getBadge = (status) => {
      return status === 'Active' ? 'success' :
        status === 'Inactive' ? 'secondary' :
          status === 'Pending' ? 'warning' :
            status === 'Banned' ? 'danger' :
              'primary'
    }
  
    return (
        <Bar data={bar} options={options} />
        
    //   <tr key={user.id.toString()}>
    //     <th scope="row"><Link to={userLink}>{user.id}</Link></th>
    //     <td><Link to={userLink}>{user.name}</Link></td>
    //     <td>{user.registered}</td>
    //     <td>{user.role}</td>
    //     <td><Link to={userLink}><Badge color={getBadge(user.status)}>{user.status}</Badge></Link></td>
    //   </tr>
    )
  }

class ChartWilayah extends Component {
    constructor(props) {
        super(props);
        // this.handleChange = this.
        // this.handleChange = this.handleChange.bind(this);
        this.state = {
          wialayahs : [],
          users: [],
        }
      }
    
      componentDidMount() {
        this.unsubscribe=  this.props.firebase.users()
        // .where("wilayah","==","PUSAT")
        
        .onSnapshot(snapshot => {
            let uid = '';
            // let messages = []
            // const myMesgs = snapshot.data()
            // if (snapshot.data()){
            // myMesgs.forEach(message => {
            //     console.log(message)
            // })
            // } 
            var users = [];
            snapshot.forEach(doc =>
                // users.push({ 
                    
                            // users.push({ id:doc.data()
                            
                            // })
                            this.props.firebase.kompeten(doc.data().id_model,doc.data().id_jabatan)
                            .onSnapshot(snapshot2 => {
                                snapshot2.forEach(doc2 =>
                                    // users.push({...doc2.data(), id_cluster:doc2.id })
                                    this.props.firebase.kompetensi(doc.data().id_model,doc.data().id_jabatan, doc2.id)
                                    .onSnapshot(snapshot3 => {
                                        snapshot3.forEach(doc3=>
                                            users.push({...doc3.data(), id_model:doc.data().id_model,id_jabatan:doc.data().id_jabatan, id_cluster:doc3.id, name:doc.data().firstname, wilayah:doc.data().wilayah, uid:doc.id 
                                            })
                                            
                                                // {...doc3.data(), id_model:doc.data().id_model,id_jabatan:doc.data().id_jabatan, id_cluster:doc3.id, name:doc.data().firstname, wilayah:doc.data().wilayah, key:doc.data() 
                                            // }
                                            // ),
                                            // {[users.doc.data().id_jabatan]: doc.data().id_jabatan}
                                            // users["doc.data().wilayah"]:doc.data().id_model,
                                            // this.props.firebase.HasilUser(doc.id, doc2.id)
                                            // .onSnapshot(snapshot4 => {
                                            //     snapshot4.forEach(doc4 =>
                                            //         users.push({...doc4.data(), id_kompetensi:doc4.id, name:doc.data().firstname })
                                            //     );
                                            // })
                                            
                                        );
                                        this.setState({
                                            users:users,
                                          });
                                    })
                                    
                                );
                            })
                            // id_model: doc.data().id_model, 
                            // id_jabatan: doc.data().id_jabatan,
                            // id_jabatanv: this.props.firebase.kompeten(doc.data().id_model, doc.data().id_jabatan)
                            // .onSnapshot(snapshot2 => {
                            //   let clusters = [];
                              
                            //   snapshot2.forEach(doc2 =>
                            //     clusters.push({ ...doc2.data(), uid: doc2.id }),
                            //   )
                            //    return clusters 
                            // }),
                        //     this.props.firebase.useradd()
                        //     .onSnapshot(snapshot => {
                        //         let users = [];

                        //         snapshot.forEach(doc =>
                        //         users.push({ 
                        //                         uid: doc.id, 
                        //                         id_model: doc.data().id_model, 
                        //                         id_jabatan: doc.data().id_jabatan, 
                        //                     }),
                        //         ); 
                        // }),
                    // }),
                    
            );
            
            
          })
            
        }
      componentWillUnmount() {
        this.unsubscribe()
        // this.unsubscribe && this.unsubscribe();
    }
  render() {
    var {users} = this.state
    var x = [];
    var y = [];
    var obj ={}
    var data ={}
    
    Object.values(users).map((item, index) => {
        // if(item)
            x.push({[item.wilayah] :[index]})  
            // var itemm = arr[i];

            //nama cabang
            obj[item.wilayah] = item.wilayah;   
            // obj[item.requirment] = item.requirment;
            // obj[item.requirment] = item.requirment;
            
    })
    // console.log(users, Object.values(obj),x, data)
    
    return (
      <div className="animated fadeIn">
            {users.map((user, index) =>
        <CardColumns className="cols-2">
          <Card>
            <CardHeader>
              Bar Chart
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader>
                    {/* //   <tr key={kompetensi.uid.toString()}>
                    //   <td>{index+1}</td>
                    //   <td>{kompetensi.name_kompetensi}</td>
                    //   <td>{kompetensi.range}</td>
                    //   <th scope="row">
                    //   <i className="fa fa-edit font-2xl" onClick={this.togglePrimary2} id={kompetensi.uid} name={kompetensi.name_kompetensi} action="Edit"></i> &nbsp;
                    //   <i className="fa fa-trash font-2xl" onClick={this.togglePrimary2} id={kompetensi.uid} name={kompetensi.name_kompetensi} action="Delete"></i></th>
                    // </tr> */}
                    <CardBody>
                    <div className="chart-wrapper">
                        <UserRow key={index} user={user}/>
                        {/* <Bar data={bar} options={options} /> */}
                    </div>
                    </CardBody>
            
          </Card>
        </CardColumns>
            )}
      </div>
    );
  }
}
export default withFirebase(ChartWilayah);

// export default ChartWilayah;
