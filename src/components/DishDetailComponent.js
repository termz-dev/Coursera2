import React, { Component } from "react";
import { CardBody, CardTitle, CardImg, Card, CardText } from "reactstrap";

class DishDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dish: this.props.dish
    };
  }

  renderDish(dish) {
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

  render() {
    const dish = this.props.dish;

    if (dish == null) {
      return <div></div>;
    }

    const rend = this.renderDish(dish);
    return <div className="row">{rend}</div>;
  }
}

export default DishDetail;
