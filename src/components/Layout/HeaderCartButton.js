import { useEffect, useState, useContext } from 'react';

import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [btnIsHighlighted, setbtnIsHighLighted] = useState(false);
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`
  const {items} = cartCtx
  console.log(btnIsHighlighted);
  useEffect(()=>{
    if(items.length === 0) return;
    setbtnIsHighLighted(true);
    const timer = setTimeout(()=> {
      setbtnIsHighLighted(false)
    },300)
    return () => {
      clearInterval(timer);
    }
  },[items])
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
