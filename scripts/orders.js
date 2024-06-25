import {orders} from "../data/orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import formatCurrency from "./utils/money.js";
import {getProduct, loadProductsFetch} from "../data/products.js";
import { addToCart, calculateCartQuantity } from "../data/cart.js";

document.querySelector('.js-orders-cart-quantity').innerHTML = calculateCartQuantity();

async function loadOrdersPage()
{
    await loadProductsFetch();
    
    let orderHTML = '';

    orders.forEach((order) => 
        {
            console.log(order);
            if(order.errorMessage != 'Error: cart is not an array.')
            {
                const orderDate = dayjs(order.orderTime);
                orderHTML += `
                    <div class="order-container">
                        
                        <div class="order-header">
                            <div class="order-header-left-section">
                            <div class="order-date">
                                <div class="order-header-label">Order Placed:</div>
                                <div>${orderDate.format('MMMM D')}</div>
                            </div>
                            <div class="order-total">
                                <div class="order-header-label">Total:</div>
                                <div>$${formatCurrency(order.totalCostCents)}</div>
                            </div>
                            </div>

                            <div class="order-header-right-section">
                            <div class="order-header-label">Order ID:</div>
                            <div>${order.id}</div>
                            </div>
                        </div>

                        <div class="order-details-grid">
                            ${generateProductDetails(order)}
                        </div>
                        </div>
                `;
            }
        }
    );

    document.querySelector('.js-orders-grid').innerHTML = orderHTML;

    function generateProductDetails(order)
    {
        let productDetailHTML = '';
        order.products.forEach((product) => 
            {
                const productId = product.productId;
                const matchingProduct = getProduct(productId);
                const deliveryDate = dayjs(product.estimatedDeliveryTime);
                productDetailHTML += `
                <div class="product-image-container">
                    <img src="${matchingProduct.image}">
                </div>
            
                <div class="product-details">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-delivery-date">
                        Arriving on: ${deliveryDate.format('MMMM D')}
                    </div>
                    <div class="product-quantity">
                        Quantity: ${product.quantity}
                    </div>
                    <button class="buy-again-button button-primary js-buy-again" data-product-id="${productId}">
                        <img class="buy-again-icon" src="images/icons/buy-again.png">
                        <span class="buy-again-message">Buy it again</span>
                    </button>
                </div>
            
                <div class="product-actions">
                <a href="tracking.html?orderId=${order.id}&productId=${product.productId}">
                    <button class="track-package-button button-secondary">
                    Track package
                    </button>
                </a>
                </div>
            `;
            }
        );

        return productDetailHTML;
    }

    document.querySelectorAll('.js-buy-again').forEach((button) =>
        {
            button.addEventListener('click', () => 
                {
                    console.log('click');
                    addToCart(button.dataset.productId);
                    document.querySelector('.js-orders-cart-quantity').innerHTML = calculateCartQuantity();
                }
            );
        }
    );
}

loadOrdersPage();