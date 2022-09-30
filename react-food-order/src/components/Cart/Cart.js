import { useContext } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const addItemCartHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const removeItemCartHandler = (id) => {
    cartCtx.removeItem(id);
  };
  let cartItems;
  if (Array.isArray(cartCtx.items)) {
    cartItems = cartCtx.items.map((item) => {
      return (
        item && (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onAddItem={addItemCartHandler.bind(null, item)}
            onRemoveItem={removeItemCartHandler.bind(null, item.id)}
          ></CartItem>
        )
      );
    });
  }

  return (
    <Modal onClose={props.onClose}>
      <ul className={classes["cart-items"]}>{cartItems}</ul>

      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--all"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.order}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
