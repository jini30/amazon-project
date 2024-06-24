import {renderOrderSummary} from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
// import '../data/car.js';
// import '../data/backend-practice.js';
import {loadProducts, loadProductsFetch} from "../data/products.js";
import { loadCart } from "../data/cart.js";

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

Promise.all(
    [
        new Promise((resolve) => 
            {
                loadProducts(() => 
                    {
                        resolve();
                    }
                );
            }
        ),
        new Promise((resolve) => 
            {
                loadCart(() => 
                    {
                        resolve();
                    }
                );
            }
        )
    ]
).then(() => 
    {
        renderOrderSummary();
        renderPaymentSummary();
    }
);

// new Promise((resolve) => 
//     {
//         loadProducts(() => 
//             {
//                 resolve();
//             }
//         );
//     }
// ).then(() =>
//     {
//         return new Promise((resolve) => 
//             {
//                 loadCart(() => 
//                     {
//                         resolve();
//                     }
//                 );
//             }
//         );
//     }
// ).then(() =>
//     {
//         renderOrderSummary();
//         renderPaymentSummary();
//     }
// )

// loadProducts(() => 
//     {
//         loadCart(() =>
//             {
//                 renderOrderSummary();
//                 renderPaymentSummary();
//             }
//         );
//     }
// );