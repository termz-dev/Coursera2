import React from "react";
import { CardBody, CardTitle, CardImg, Card, CardText } from "reactstrap";



 function RenderDish({dish}) {
    if (dish != null) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-5">
              <Card>
                <CardImg src={dish.image} alt={dish.img} />
                <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <p>{dish.description}</p>
                </CardBody>
              </Card>
            </div>
            <div className="col-12 col-md-5">
              <Card>
                <h2>Comments</h2>
                <CardText>
                  {dish.comments.map((comment) => (
                    <div className="coms-row" key={comment.id}>
                      <p>{comment.comment}</p>
                      <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US',{year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    </div>
                  ))}
                </CardText>
              </Card>
            </div>
          </div>
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
    } else {

    return(
    <RenderDish dish={props.dish} />
    )
    }
  }


export default DishDetail;
