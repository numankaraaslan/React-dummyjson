import React, { useContext } from "react";
import Modal from "react-modal";
import { CartContext } from "../utils/CartContext";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function CartModal() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const cartContext = useContext(CartContext);

  function removeItem(id: number) {
    cartContext.removeFromCartFunctionOfContext(id);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button type="button" className="btn btn-secondary" onClick={openModal}>
        Cart ({cartContext.cartItemsInsideContext.length})
      </button>
      <Modal isOpen={modalIsOpen} shouldCloseOnEsc onRequestClose={closeModal} style={customStyles} contentLabel="Cart">
        {cartContext.cartItemsInsideContext.map((cartItem, index) => {
          return (
            <div key={index}>
              <img src={cartItem.thumbnail} width={100} className="img-thumbnail me-2" />
              <label>{cartItem.title}</label>
              <label>{cartItem.description}</label>
              <button
                className="btn btn-danger"
                onClick={() => {
                  removeItem(cartItem.id);
                }}
              >
                Remove
              </button>
              <hr></hr>
            </div>
          );
        })}
        <button className="btn btn-danger" onClick={closeModal}>
          Close
        </button>
      </Modal>
    </div>
  );
}
