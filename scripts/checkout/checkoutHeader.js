import {calculateCartQuantity} from "../../data/cart.js";

export function renderCheckoutHeader()
{
    let cartQuantity = calculateCartQuantity();
  
  if(cartQuantity == 1)
  {
    document.querySelector('.js-checkout-header-quantity').innerHTML = `${cartQuantity} item`;
  }
    else
  {
    document.querySelector('.js-checkout-header-quantity').innerHTML = `${cartQuantity} items`;
  }
}