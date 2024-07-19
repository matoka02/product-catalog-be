# Usage  

## Endpoints

Request

- **GET /products**

Query

- **`page`** _(optional)_: Page number for products. Defaults to 1.
- **`perPage`** _(optional)_: Number of products per page. Defaults to 4.
- **`sortBy`** _(optional)_: Sort by date of updating the product. Defaults to Newest. Possible variants is: `Newest`, `Oldest`

Example:

```http
GET /products?page=2&perPage=10&sortBy=Newest
```

Response

The `/products` endpoint returns a list of products in JSON format. Example response:

```json
{
  "totalProducts": 71,
  "data": [
    {
      "id": "string",
      "priceDiscount": 1000,
      "name": "string"
      // ...
    }
    // Other products...
  ]
}
```

Request

- **GET /products/:id**

Params

 - **`:id`**: Product id

Example:

```http
GET /products/productId
```

Response

The `/products/:id` endpoint returns a list of products in JSON format. Example response:

```json
{
  "id": "string",
  "priceDiscount": 1000,
  "name": "string"
  // ...
}
```
