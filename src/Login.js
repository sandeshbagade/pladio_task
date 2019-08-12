import React from 'react';
import ReactDOM from 'react-dom';
import  {Card, Col, Form,
  FormGroup, InputGroup, FormLabel,FormControl,
  Button} from 'react-bootstrap';
  import { Redirect,Route, Link, BrowserRouter as Router } from 'react-router-dom'
  import { withRouter } from 'react-router';
import logo from './pladio-logo.png'

class Login extends React.Component {
    componentDidMount() {
        let googleScript = document.createElement('script')
        googleScript.setAttribute('src', 'https://apis.google.com/js/platform.js')
        document.head.appendChild(googleScript)
      
        this.renderButton();

    }
    render() {
      return   (
        <div style={{height:"100vh",width:"100%",backgroundColor:"#7289F2",
        display: 'flex', justifyContent: 'center' , alignItems: 'center'}}>

      <Card style={{ width: '15rem' }}>
  <Card.Img variant="top" src={logo} style={{ width: '5rem', marginLeft:'34%' }}/>
  <Card.Body>

   <div style={{ marginLeft:'25%' }}>
    <span id="my-signin2" ></span>
    </div>
  <br /> <div>--OR--</div> <br />
  <Link to="/cat">Contact</Link>
         <div style={{fontSize:'12px',float:'left',color:'#8E8E8E'}}> Email</div>
        <InputGroup size="sm" className="mb-3">
    <InputGroup.Prepend>
      {/* <InputGroup.Text id="inputGroup-sizing-sm">Small</InputGroup.Text> */}
    </InputGroup.Prepend>
    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
  </InputGroup>
  <div style={{fontSize:'12px',float:'left',color:'#8E8E8E'}}>Password</div>
        <InputGroup size="sm" className="mb-3">
    <InputGroup.Prepend>
      {/* <InputGroup.Text id="inputGroup-sizing-sm">Small</InputGroup.Text> */}
    </InputGroup.Prepend>
    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
  </InputGroup>
   
  </Card.Body>
  <Button variant="warning" block>Submit</Button>
</Card>
       
               </div>)
    }
    onSignIn(user){
        alert("done");
        console.log(user);
    }
     onSuccess= async (googleUser)=> {
      console.log( googleUser.getAuthResponse().id_token);
     let user = await fetch(`http://api.pladio.co/api/users/google/`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({access_token: googleUser.getAuthResponse().id_token})
      })
      const json = await user.json();
      console.log(json);
      localStorage.setItem('token', json.token);
      

        this.props.history.push('cat')
     
    }
    onFailure(error) {
      console.log(error);
    }
    renderButton() {
      window.gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 100,
        'height': 30,
        'onsuccess': this.onSuccess,
        'onfailure': this.onFailure,
        'redirect_uri':'http://pladio.co' 
      });
    }

  }
 

 
export default withRouter(Login);