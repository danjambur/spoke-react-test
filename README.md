Thanks for your time working on the tech test for Spoke!

The data for you to work on will be provided by our graphQL endpoint (see env file). We would like you to fetch this data so that you can receive a list of products similar to this:

```
{
    "data": {
        "products": {
            "edges": [
                {
                    "node": {
                        "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzE3MDU0MjY3MTQ2OTM=",
                        "priceRange": {
                            "maxVariantPrice": {
                                "amount": "62.0"
                            }
                        },
                        "images": {
                            "edges": [
                                {
                                    "node": {
                                        "originalSrc": "https://cdn.shopify.com/s/files/1/0057/7260/7557/products/1.Brushed_Smoked_Navy_Flat.jpg?v=1573339343"
                                    }
                                },
                                {
                                    "node": {
                                        "originalSrc": "https://cdn.shopify.com/s/files/1/0057/7260/7557/products/3.Brushed_Smoked_Navy_Mode_Front.jpg?v=1573339343"
                                    }
                                }
                            ]
                        },
                        "productType": "Heroes",
                        "title": "Clay",
                        "tags": [
                            "fabric: 30% off",
                            "feed",
                            "feed-trousers",
                            "hidden sale item",
                            "Published",
                            "sale",
                            "stock-feed"
                        ],
                        "updatedAt": "2020-06-22T13:48:02Z"
                    }
                },
                {...}
            ]
        }
    }
}
```

### API Call

- POST method
- Url: [url provided]
- X-Shopify-Storefront-Access-Token: [token provided]
- Content-Type: application/json

### Notes on this data:

We need to retrieve the following data for each product:
- ID
- Images
- ProductType
- Title
- Tags
- Price
- UpdatedAt

We would like to fetch the first 50 products from the endpoint and only fetch those product with the following productTypes (product_type):
- Heroes
- Sharps
- Polos (notice that the collection Polos (plural) contains products with a type of Polo (singular))

We assume that all the products have inventory and can be added to the basket.

Please visit this url for more information on shopify graphql: ```[https://shopify.dev/docs/admin-api/graphql/reference/object/product?api[version]=2020-04]```

### Requirements
- Please use React.js and a state management library (ie. Redux, Hooks) of your preference.
- Please write relevant tests preferably using Jest
- Feel free to experiment with different styles but at a minimum please provide a basic responsive UI that represents the designs provided.

# Views
Notes:
- Click on cart button will take the user to the cart page
### Products List page:
* Lists all products in given category (productType)
* Shows the first image for each product in the list
* Highlights the products with the new badge
* Includes a button for each product that adds the product to cart

### Product page:
* Renders the second image from the data provided
* Shows the product price
* Adds the product to cart

### Cart page:
* Lists the products that are added to the cart
* User can delete item from cart individually
* Shows the cart total

Happy hacking!
