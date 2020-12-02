import React from "react";

// reactstrap components
import {
  Button,
  Card,
  Form,
  FormGroup,
  Input,
  Label,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  UncontrolledAlert
} from "reactstrap";

// core components
import emailjs from 'emailjs-com';

function ContactUs() {
const [isSent, setIsSent] = React.useState(false)
const sendEmail = (e)  =>{
    e.preventDefault();    //This is important, i'm not sure why, but the email won't send without it

    emailjs.sendForm('service_f2jl94f', 'template_ozokvni', e.target, 'user_n8HPizU5dZNXCSCNlIAks')
        .then((result) => {
            setIsSent(true)
            document.getElementById("create-course-form").reset();
            // window.location.reload()  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior) 
        }, (error) => {
            console.log(error.text);
        });
      
    }
  return (
    <>
     
    <div className="section section-dark">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto text-center" md="8">
              <h2 className="title">Questions? Contact Us</h2>
              <p className="description">
                In case you have any questions regarding movies, showtimes, rewards, your account or any other generic questions, send us an email.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <div
        className="section section-image section-login"
        style={{
          backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")",
        }}
      >
        <Container>
          <Row>
            <Col className="mx-auto" lg="4" md="6">
              <Card className="card-register">
                <h3 className="title mx-auto">Welcome</h3>
                <form className="register-form" onSubmit={sendEmail} id="create-course-form">
                <label>Name</label>
                  <InputGroup className="form-group-no-border">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-circle-10" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Name" name="from_name"/>
                  </InputGroup>
                  <label>Email</label>
                  <InputGroup className="form-group-no-border">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-email-85" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="email" name="from_email"/>
                  </InputGroup>
                  <label>Subject</label>
                  <InputGroup className="form-group-no-border">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-single-copy-04" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Subject" name="subject"/>
                  </InputGroup>
                  <label>Message</label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-paper" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="textarea" placeholder="Message" name="html_message" style = {{border: '1px solid gray !important'}}/>
                  </InputGroup>
                  <Button
                    block
                    className="btn-round"
                    color="danger"
                    type="button"
                    type="submit" value="Send"
                    style = {{color: 'white',
                    background: '#ef8157'}}
                  >
                    Send email
                  </Button>
                </form>
                {isSent ? 
                <UncontrolledAlert color="info" fade={false}>
                <span>
                  Your email has been sent. Sit back and relax, our team will respond within a couple of hours.
                </span>
              </UncontrolledAlert>
              : null}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>{" "}
    </>
  );
}

export default ContactUs;



// import React from 'react';
// import emailjs from 'emailjs-com';

// export default function ContactUs() {

//   function sendEmail(e) {
//     e.preventDefault();    //This is important, i'm not sure why, but the email won't send without it

//     emailjs.sendForm('service_f2jl94f', 'template_ozokvni', e.target, 'user_n8HPizU5dZNXCSCNlIAks')
//       .then((result) => {
//           window.location.reload()  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior) 
//       }, (error) => {
//           console.log(error.text);
//       });
//   }

//   return (
//     <form className="contact-form" onSubmit={sendEmail}>
//       <input type="hidden" name="contact_number" />
//       <label>Name</label>
//       <input type="text" name="from_name" />
//       <label>Email</label>
//       <input type="email" name="from_email" />
//       <label>Subject</label>
//       <input type="text" name="subject" />
//       <label>Message</label>
//       <textarea name="html_message" />
//       <input type="submit" value="Send" />
//     </form>
//   );
// }