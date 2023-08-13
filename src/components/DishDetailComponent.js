import { React, useState } from "react";
import { CardBody, CardTitle, Col, Label, Row, CardImg, Card, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from 'react-redux-form'


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);



const CommentForm = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div>
      <Button color="white" onClick={toggleModal}>
        Submit Comments
      </Button>

      <Modal isOpen={modalOpen} toggle={toggleModal}>
           <ModalHeader toggle={toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                     <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                          <Row className="form-group">
                                <Label htmlFor="firstname" md={4}>Rating</Label>
                                <Col md={{size:12}}>
                                    <Control.select model=".contactType" name='contactType'
                                    className='form-control' >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>

                                 <Row className="form-group">
                                 <Label htmlFor="Your name" md={4}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".yourname" id="yourname" name="yourname"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".yourname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="message" md={2}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".message" id="message" name="message"
                                        rows="7"
                                        className="form-control" />
                                </Col>
                            </Row>

                            <Row className="form-group">
                            <Col md={{size:12}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                              </Col>
                              </Row>

                            
                      </LocalForm>
                  </ModalBody>
            </Modal>
    </div>
  );
};



function RenderDish({ dish }) {
  if (dish != null) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Card>
              <CardImg src={dish.image} alt={dish.img} />
              <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <p>{dish.description}</p>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

function RenderComments({ comments }) {



  if (comments != null) {
    return (
      <div className="col-12">
        <h4>Comments</h4>
        <ul className="list-unstyled">
          {comments.map((comment) => (
            <li key={comment.id}>
              <p>{comment.comment}</p>
              <p>
                {comment.author},{" "}
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit"
                }).format(new Date(Date.parse(comment.date)))}
              </p>
            </li>
          ))}
        </ul>
        <CommentForm />
      </div>
    );
  } else {
    return <div></div>;
  }
}

const DishDetail = (props) => {
  const dish = props.dish;

  if (dish == null) {
    return <div></div>;
  }

  return (
    <div className="container">
    <div className="row">
        <Breadcrumb>

            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
        </div>                
    </div>
    <div className="row">
        <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
        </div>
        <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.comments} />
        </div>
    </div>
    </div>


  );
};

export default DishDetail;
