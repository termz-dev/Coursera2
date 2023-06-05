import React, { Component } from "react";
import { Card, CardText, CardImg, CardBody, CardTitle } from "reactstrap";


class DishDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dish: this.props.dish
        }
    }

    renderDish(dish) {
        if(dish!= null) {
            return (
                <div className="row">
                <div className="col-12 col-md-5">
                    <Card>
                        <CardImg src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
                </div>
            );
        } else {
            return(
                <div></div>
            );
        }
    }


    renderComment(comments) {
        if (comments == null) {
            return(
                <div></div>
            );
        }
        const comt = 
            comments.map(comment => {
                return (  
                    <div key={comment.id}>
                        <p> {comment.comment} </p>
                        <p> -- {comment.author} {comment.date} </p>
                    </div>
                );
            })
       return (
        <div className="col-12 col-md-5">
            <h4>Comments</h4>
            {comt}
        </div>
       )
    }

    render() {
        const dish = this.props.dish
        if(dish == null) {
            return(
                <div></div>
            );
        }
        const rend = this.renderDish(dish);
        const coms = this.renderComment(dish.comments); 
   

    return (
       <div className="row">
       {rend}
       {coms}
       </div>
    );

}

}

export default DishDetail;