import Modal from "react-bootstrap/Modal";
import React, { Component } from "react";
import ReviewForm from "./ReviewForm";

export default class ReviewFormModal extends Component {
  render() {
    return (
      <div>
        <Modal
          {...this.props}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Leave a Review for <b>{this.props.name}!</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ReviewForm
              user_id={this.props.user_id}
              cart_id={this.props.cart_id}
              addReview={this.props.addReview}
              getAvgStars={this.props.getAvgStars}
            />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
