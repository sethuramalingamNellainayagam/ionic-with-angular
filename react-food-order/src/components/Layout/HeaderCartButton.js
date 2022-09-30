import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";
import { useContext, useEffect, useState } from "react";
const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [isBtnHighlight, setIsBtnHighlight] = useState(false);
  const noOfItems = Array.isArray(cartCtx.items)
    ? cartCtx.items.reduce((currNum, item) => {
        return currNum + item.amount;
      }, 0)
    : 0;

  const btnClasses = `${classes.button} ${isBtnHighlight ? classes.bump : ""}`;
  const { items } = cartCtx;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setIsBtnHighlight(true);
    const timer = setTimeout(() => {
      setIsBtnHighlight(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon></CartIcon>
      </span>
      <span>Your cart</span>
      <span className={classes.badge}>{noOfItems}</span>
    </button>
  );
};

export default HeaderCartButton;
