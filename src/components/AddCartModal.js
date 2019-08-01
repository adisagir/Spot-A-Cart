import Modal from "react-bootstrap/Modal";
import React, { Component } from "react";
import AddCartForm from "./AddCartForm";

export default class AddCartModal extends Component {
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
              <b>Add A Cart!</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddCartForm
              allCuisines={this.props.allCuisines}
              addCart={this.props.addCart}
            />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
