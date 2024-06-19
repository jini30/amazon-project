import {renderOrderSummary} from "../../scripts/checkout/orderSummary.js";
import {cart, loadFromStorage} from "../../data/cart.js";

describe('test suite: renderOrderSummary', () =>
    {
        const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
        const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
                
        beforeEach(() =>
            {
                spyOn(localStorage, 'setItem');
                
                document.querySelector('.js-test-container').innerHTML = `
                    <div class="js-checkout-header-quantity"></div>
                    <div class="js-order-summary"></div>
                    <div class="js-payment-summary"></div>
                `;

                spyOn(localStorage, 'getItem').and.callFake(() =>
                    {
                        return JSON.stringify(
                            [
                                {
                                    productId: productId1,
                                    quantity: 2,
                                    deliveryOptionId: '1'
                                },
                                {
                                    productId: productId2, 
                                    quantity: 1,
                                    deliveryOptionId: '2'
                                }
                            ]
                        );
                    }
                );
                loadFromStorage();
                renderOrderSummary();
            }
        );

        afterEach(() =>
            {
                document.querySelector('.js-test-container').innerHTML = '';
            }
        );
        
        it('displays the cart', () =>
            {
                expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
                expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2');
                expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 1');
            }
        );

        it('removes a product', () =>
            {
                document.querySelector(`.js-delete-link-${productId1}`).click();
                expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
                expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);
                expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);
                expect(cart.length).toEqual(1);
                expect(cart[0].productId).toEqual(productId2);
            }
        );

        it('product name displayed correctly', () =>
            {
                const productName1 = 'Black and Gray Athletic Cotton Socks - 6 Pairs';
                const productName2 = 'Intermediate Size Basketball';
                
                expect(document.querySelector(`.js-product-name-${productId1}`).innerHTML).toContain(productName1);
                expect(document.querySelector(`.js-product-name-${productId2}`).innerHTML).toContain(productName2);
            }
        );

        it('product prices displayed correctly', () =>
            {
                const productPrice1 = '$10.90';
                const productPrice2 = '$20.95';
                
                expect(document.querySelector(`.js-product-price-${productId1}`).innerHTML).toContain(productPrice1);
                expect(document.querySelector(`.js-product-price-${productId2}`).innerHTML).toContain(productPrice2);
            }
        );

        it('updates the delivery option', () =>
            {
                document.querySelector(`.js-delivery-option-${productId1}-3`).click();
                const deliveryOption = document.querySelector(`.js-delivery-option-${productId1}-3`);
                expect(deliveryOption.checked).toEqual(true);
                expect(cart.length).toEqual(2);
                expect(cart[0].deliveryOptionId).toEqual('3');
                expect(document.querySelector('.js-shipping-price').innerHTML).toEqual('$14.98');
                expect(document.querySelector('.js-total-price').innerHTML).toEqual('$63.50');
            }
        );
    }
);