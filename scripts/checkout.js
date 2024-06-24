import {renderOrderSummary} from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
// import '../data/car.js';
// import '../data/backend-practice.js';
import {loadProducts, loadProductsFetch} from "../data/products.js";

async function loadPage()
{
    try
    {
        //  throw 'error1';
        await loadProductsFetch();
        renderOrderSummary();
        renderPaymentSummary();
    }
    catch(error)
    {
        console.log('error');
    }
}

loadPage();

// loadProductsFetch().then(() => 
//     {
//         renderOrderSummary();
//         renderPaymentSummary();
//     }
// );

// loadProducts(() => 
//     {
//         renderOrderSummary();
//         renderPaymentSummary();
//     }
// );