import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';
import {useContext, useEffect, useState} from 'react';

const HeaderCartButton = (props) => {

    const cartCtx = useContext(CartContext);
    const [btnHighlighted, setBtnHighlighted] = useState(false);

    const {items} = cartCtx;

    const noOfCartItems = items.reduce((currentNo, item) => {
        return currentNo + item.amount;
    }, 0);

    

    const btnClasses = `${classes.button} ${btnHighlighted? classes.bump: ''}`;
    useEffect(()=>{
        if(items.length === 0) {
            return;
        }
        setBtnHighlighted(true);

       const timer = setTimeout(()=> {
            setBtnHighlighted(false);
        }, 300)

        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    return (
    <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>
            {noOfCartItems}
        </span>
    </button>
    )
}

export default HeaderCartButton;