import { orders } from "../data/orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { getProduct, loadProductsFetch } from "../data/products.js";

async function loadTrackingPage()
{
    await loadProductsFetch();  
    
    const url = new URL(window.location.href);
    const productId = url.searchParams.get('productId');
    const orderId = url.searchParams.get('orderId');

    let matchingOrder;

    orders.forEach((order) => 
        {
            if(order.id === orderId)
            {
                matchingOrder = order;
            }
        }
    );

    const matchingProduct = getProduct(productId);
    let matchingOrderProduct;

    matchingOrder.products.forEach((prod) => 
        {
            if(prod.productId === productId)
            {
                matchingOrderProduct = prod;
            }
        }
    );

    const deliveryDate = dayjs(matchingOrderProduct.estimatedDeliveryTime);

    const now = dayjs();
    const orderTime = dayjs(matchingOrder.orderTime);

    const progressWidth = ((now - orderTime) / (deliveryDate - orderTime)) * 100;

    let trackingHTML = `
        <a class="back-to-orders-link link-primary js-tracking-location" href="orders.html">
            View all orders
        </a>

        <div class="delivery-date">
            Arriving on ${deliveryDate.format('dddd, MMMM D')}
        </div>

        <div class="product-info">
            ${matchingProduct.name}
        </div>

        <div class="product-info">
            Quantity: ${matchingOrderProduct.quantity}
        </div>

        <img class="product-image" src="${matchingProduct.image}">

        <div class="progress-labels-container">
            <div class="progress-label ${progressWidth < 50? 'current-status': ''}">
            Preparing
            </div>
            <div class="progress-label ${progressWidth >= 50 && progressWidth < 100? 'current-status': ''}">
            Shipped
            </div>
            <div class="progress-label ${progressWidth >= 100? 'current-status': ''}">
            Delivered
            </div>
        </div>

        <div class="progress-bar-container">
            <div class="progress-bar" style="width:${progressWidth}%"></div>
        </div>
    `;

    document.querySelector('.js-order-tracking').innerHTML = trackingHTML;
}

loadTrackingPage();