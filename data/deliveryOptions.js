import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export function getDeliveryOption(deliveryOptionId)
{
    let deliveryOption;
    deliveryOptions.forEach((option) =>
        {
            if(option.id === deliveryOptionId)
            {
                deliveryOption = option
            }
        }
    );
    return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption)
{
    let deliveryDate = dayjs().add(deliveryOption.deliveryDays, 'days');
    if(deliveryDate.format('dddd') === 'Saturday')
    {
        deliveryDate = deliveryDate.add(2, 'days');
    }
    else if(deliveryDate.format('dddd') === 'Sunday')
    {
        deliveryDate = deliveryDate.add(1, 'days');
    }
    return deliveryDate;
}

export const deliveryOptions = [
    {
        id: '1',
        deliveryDays: 7,
        priceCents: 0
    },
    {
        id: '2',
        deliveryDays: 3,
        priceCents: 499
    },
    {
        id: '3',
        deliveryDays: 1,
        priceCents: 999
    }
];