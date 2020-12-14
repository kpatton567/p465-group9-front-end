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
    <div className="section section-dark" style = {{paddingBottom : '0'}}>
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
              <Card className="card-register" style = {{maxWidth: "40rem", width: "40rem", marginLeft: '14rem', paddingTop : '0'}}>
                <h3 className="mx-auto" style = {{color: 'black!important',marginTop: '30px',
    marginBottom: '9px', minHeight: '32px', fontWeight : '700'}}>Contact Us</h3>
                <form className="" onSubmit={sendEmail} id="create-course-form">
                <label>Name</label>
                  <InputGroup className="form-group-no-border" >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-circle-10" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Name" name="from_name" style = {{ border: '1px solid #DDDDDD !important;'}}/>
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
                        <i className="nc-icon nc-single-copy-04"/>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Subject" name="subject"/>
                  </InputGroup>
                  <label>Message</label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-paper" style = {{ marginBottom: '1.75rem'}}/>
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
                    background: '#EF8157', marginLeft: '14rem', width : '10rem'}}
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
        </Container>
      </div>{" "}
    </>
  );
}
export default ContactUs;