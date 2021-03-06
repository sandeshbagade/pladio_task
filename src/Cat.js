import React from 'react'
import {  Link, BrowserRouter as Router } from 'react-router-dom'
import { withRouter } from 'react-router';
import  {Card , CardColumns , Container ,Breadcrumb} from 'react-bootstrap';
class Cat extends React.Component {
    constructor(props) {
        super(props);
        this.state = { categories : [] };
      }
  render() {
    return <div style={{backgroundColor:'#282C34' , width:'100%'}}> 
                <Breadcrumb style={{backgroundColor:'#F8F8F8' , color:'#F8F8F8'}}>
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>
                    Categories
                    </Breadcrumb.Item>
                    <span href="#" style={{ color:'#000', marginLeft:'80%',cursor: 'pointer'}} onClick={this.logoutThem}>Logout </span>
                </Breadcrumb>
                <Container >
                    <CardColumns>
                     {this.state.categories.map(cat => (   
                        <Card key={cat.uuid} border='primary' style={{height:'400px'}}>
                        <Card.Img variant="top" src={cat.image_url} style={{height:'250px'}} />
                        <Card.Body>
                        <Card.Title>{cat.name}</Card.Title>
                        <Card.Text>
                            {cat.description}
                        </Card.Text>
                        </Card.Body>
                    </Card>
                     ))}
                  </CardColumns>
            </Container>
   </div>
     }

     logoutThem=()=>{
        localStorage.setItem('signOut', 'Yes');
        this.props.history.push('/')
     }
  async componentDidMount(){
    let token = localStorage.getItem('token')
    let categories = await fetch(`http://api.pladio.co/api/category/`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' :`Token ${token}`
      },
    })
    const cat = await categories.json();
    this.setState({categories:cat.data});
 
  }
}
export default withRouter(Cat);