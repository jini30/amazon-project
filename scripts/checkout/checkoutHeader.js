import {cart} from "../../data/cart-class.js";

export function renderCheckoutHeader()
{
  let cartQuantity = cart.calculateCartQuantity();
  
  if(cartQuantity == 1)
  {
    document.querySelector('.js-checkout-header-quantity').innerHTML = `${cartQuantity} item`;
  }
    else
  {
    document.querySelector('.js-checkout-header-quantity').innerHTML = `${cartQuantity} items`;
  }
}