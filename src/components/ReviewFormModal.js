import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ReviewForm from "./ReviewForm";

export default class ReviewFormModal extends Component {
  render() {
    return (
      <div>
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Leave a Review for <b>{this.props.name}!</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ReviewForm user_id={this.props.user_id}
            cart_id={this.props.cart_id}/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
