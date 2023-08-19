import React, { Component } from 'react';
import { 
  Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, 
  Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';



const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

  constructor (props) {
    super(props);
   
    this.toggleModal = this.toggleModal.bind( this );
    this.handleSubmit = this.handleSubmit.bind( this );
  
    this.state = {
      isModalOpen: false
    };
  }

  toggleModal () {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleSubmit( values ) {
    this.toggleModal();
    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
  }

  render () {
    return(
      <React.Fragment>
        <Button outline onClick={this.toggleModal}>
          <span class="fa fa-pencil"> Submit Comment </span> 
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}> Submit Comment </ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={ (values) => this.handleSubmit(values) }>
              <Row  className="form-group">
                <Label for="rating" md={12}> Rating </Label>
                <Col  md={12}>
                  <Control.select defaultValue="5" model=".rating" id="rating" name="rating" className="form-control" >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="author"  md={12}> Your Name </Label>
                <Col  md={12}>
                  <Control.text model=".author" id="author" name="author" placeholder="Your Name" className="form-control"
                    validators={{ required, minLength: minLength(3), maxLength: maxLength(15) }} />
                  <Errors className="text-danger" model=".author" show="touched"
                    messages={{ required: 'Required', minLength: 'Must be greater than 2 characters', maxLength: 'Must be 15 charaters or less' }} />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment"  md={12}> Comment </Label>
                <Col  md={12}>
                  <Control.textarea model=".comment" id="comment" name="comment" resize="none" rows="6" className="form-control" />
                </Col>
              </Row>
              <Button type="submit" value="submit" color="primary">Submit</Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    )
  }

}

function RenderDish( {dish} ) {
  if (dish != null) {
    return(
      <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  } else {
    return( <div></div> );
  }
}

function RenderComments({comments, addComment, dishId}) {
  if (comments != null) {
    const commentsItems =  comments.map( ( comment ) => {
        return (
          <li key={comment.id}> 
            <p> {comment.comment} </p>
            <p>-- {comment.author},&nbsp;
              { new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'})
                  .format(new Date(Date.parse(comment.date))) } 
            </p> 
          </li>
        );
    } );
    return(
      <div>
        <h4>Comments</h4>
        <ul className="list-unstyled">
          {commentsItems}
        </ul>
        <CommentForm dishId={dishId} addComment={addComment} />
      </div>
    );
  } else {
    return( <div></div> );
  }
}

const  DishDetail = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }
  else if (props.errMess) {
    return(
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  }
 else if ( props.dish !=null ) {
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
          <RenderComments comments={props.comments}
        addComment={props.addComment}
        dishId={props.dish.id}
      />
          </div>
        </div>
        </div>
    );
  } else {
    return (
      <div />
    );
  }
}

export default DishDetail;