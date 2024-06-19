import {addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption} from "../../data/cart.js";

describe('test suite: addToCart', () =>
    {
        beforeEach(() =>
            {
                spyOn(localStorage, 'setItem').and.callFake(() =>
                    {
                        return JSON.stringify([]);
                    }
                );
                
            }
        );
        
        it('adds an existing product to the cart', () =>
            {
                spyOn(localStorage, 'getItem').and.callFake(() =>
                    {
                        return JSON.stringify(
                            [
                                {
                                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                                    quantity: 1,
                                    deliveryOptionId: '1'
                                }
                            ]
                        );
                    }
                );
                loadFromStorage();
                addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
                expect(localStorage.setItem).toHaveBeenCalledWith('cart', 
                    JSON.stringify(
                        [
                            {
                                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                                quantity: 2,
                                deliveryOptionId: '1'
                            }
                        ]
                    )
                );
                expect(cart.length).toEqual(1);
                expect(localStorage.setItem).toHaveBeenCalledTimes(1);
                expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
                expect(cart[0].quantity).toEqual(2);
            }
        );

        it('adds a new product to the cart', () =>
            {
                spyOn(localStorage, 'getItem').and.callFake(() =>
                    {
                        return JSON.stringify([]);
                    }
                );
                loadFromStorage();
                addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
                expect(cart.length).toEqual(1);
                expect(localStorage.setItem).toHaveBeenCalledTimes(1);
                expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
                expect(cart[0].quantity).toEqual(1);
                expect(localStorage.setItem).toHaveBeenCalledWith('cart', 
                    JSON.stringify(
                        [
                            {
                                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                                quantity: 1,
                                deliveryOptionId: '1'
                            }
                        ]
                    )
                );
            }
        );
    }
);

describe('test suite: removeFromCart', () =>
    {
        const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
        const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
        
        beforeEach(() =>
            {
                spyOn(localStorage, 'setItem').and.callFake(() =>
                    {
                        return JSON.stringify([]);
                    }
                );
                
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
            }
        );

        it('removes a product present in the cart', () =>
            {
                removeFromCart(productId1);
                expect(cart.length).toEqual(1);
                expect(localStorage.setItem).toHaveBeenCalledWith('cart',
                    JSON.stringify(
                        [
                            {
                                productId: productId2, 
                                quantity: 1,
                                deliveryOptionId: '2'
                            }
                        ]
                    )
                );
                expect(localStorage.setItem).toHaveBeenCalledTimes(1);
                expect(cart[0].productId).toEqual(productId2);
            }
        )

        it('removes a product not present in the cart', () =>
            {
                removeFromCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
                expect(cart.length).toEqual(2);
                expect(localStorage.setItem).toHaveBeenCalledWith('cart',
                    JSON.stringify(
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
                    )
                );
                expect(localStorage.setItem).toHaveBeenCalledTimes(1);
            }   
        )
    }
);

describe('test suite: updateDeliveryOption', () => 
    {
        const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
        const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
        
        beforeEach(() =>
            {
                spyOn(localStorage, 'setItem').and.callFake(() =>
                    {
                        return JSON.stringify([]);
                    }
                );
                
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
            }
        );

        it('updates delivery option of product in cart', () => 
            {
                updateDeliveryOption(productId1, '3');
                expect(cart.length).toEqual(2);
                expect(cart[0].deliveryOptionId).toEqual('3');
                expect(localStorage.setItem).toHaveBeenCalledTimes(1);
                expect(localStorage.setItem).toHaveBeenCalledWith('cart', 
                    JSON.stringify(
                        [
                            {
                                productId: productId1,
                                quantity: 2,
                                deliveryOptionId: '3'
                            },
                            {
                                productId: productId2, 
                                quantity: 1,
                                deliveryOptionId: '2'
                            }
                        ]
                    )
                );
            }
        );

        it('does nothing for product not in cart', () => 
            {
                updateDeliveryOption('83d4ca15-0f35-48f5-b7a3-1ea210004f2e', '2');
                expect(cart.length).toEqual(2);
                expect(localStorage.setItem).toHaveBeenCalledTimes(0);
            }
        );

        it('does nothing if delivery option does not exist', () => 
            {
                updateDeliveryOption(productId1, '4');
                expect(cart.length).toEqual(2);
                // expect(cart[0].deliveryOptionId).toEqual('1');
                expect(localStorage.setItem).toHaveBeenCalledTimes(0);
            }
        );
    }
);