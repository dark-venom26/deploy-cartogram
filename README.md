
# CARTOGRAM

This is an E-commerce web app made by using MERN Stack.


## API Reference

### Authentication

#### Register user

```http
  POST /api/v1/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Your name |
| `email` | `string` | **Required**. Your email |
| `password` | `string` | **Required**. Your password |
| `avatar` | `object` |  Parameter 'public_id', 'url' |

#### Login user

```http
  POST /api/v1/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Your email |
| `password` | `string` | **Required**. Your password |

#### Logout user

```http
  GET /api/v1/logout
```
#### Forget password

```http
  POST /api/v1/password/forgot
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Your email |

#### Reset password

```http
  PUT /api/v1/password/reset/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `password` | `string` | **Required**. New password |
| `confirmPassword` | `string` | **Required**. Confirm password |

### User

#### Get logged in user details 

```http
  GET /api/v1/me
```

#### Update user profile

```http
  PUT /api/v1/me/update
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Your new email |
| `name` | `string` | **Required**. Your new name |

#### Update password

```http
  PUT /api/v1/password/update
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `oldPassword` | `string` | **Required**. Your old password |
| `newPassword` | `string` | **Required**. Your new password |
| `confirmPassword` | `string` | **Required**. Confirm your password |

### Product

#### Get all product

```http
  GET /api/v1/products
```

#### Get product by id

```http
  GET /api/v1/product/${id}
```

#### Create/Update product review

```http
  PUT /api/v1/review
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `productId` | `string` | **Required**. Product Id |
| `comment` | `string` | **Required**. Give your review |
| `rating` | `string` | **Required**. Give rating to the product out of 5 |

#### Delete product review

```http
  DEL /api/v1/reviews?id=${id}&productId=${productId}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Id of the Review |
| `productId` | `string` | **Required**. Id of the product |

#### Get review by Id

```http
  GET /api/v1/reviews?id=${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Id of the Review |

### Order

#### New order

```http
  POST /api/v1/order/new
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `itemsPrice` | `number` | **Required**. Price of the product |
| `taxPrice` | `number` | **Required**. Tax price |
| `shippingPrice` | `number` | **Required**. Shipping price of the product |
| `totalPrice` | `number` | **Required**. Total price of the product |
| `orderItems` | `array` | **Required**. Objects of the product details including 'product', 'name', 'price', 'image', 'quantity' |
| `shippingInfo` | `object` | **Required**. Enter shipping details including 'address', 'city', 'state', 'country', 'pinCode', 'phoneNo' |
| `paymentInfo` | `object` | **Required**. Parameter 'id', 'status' |

#### Get logged in user orders

```http
  GET /api/v1/orders/me
```

#### Get order by Id

```http
  GET /api/v1/order/${id}
```

#### Cancel order

```http
  DEL /api/v1/order/${id}
```

### Admin

#### Create product

```http
  POST /api/v1/admin/product/new
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Name of the product |
| `description` | `string` | **Required**. Description of the product |
| `price` | `number` | **Required**. Price of the product |
| `rating` | `number` | Average rating of the product |
| `images` | `object` | **Required**. Parameter 'public_id', 'url' |
| `category` | `string` | **Required**. Category of the product |


#### Delete product

```http
  DEL /api/v1/admin/product/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Id of the product |

#### Update product

```http
  PUT /api/v1/admin/product/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Id of the product |
| `stock` | `string` | **Required**. Current stock of the product |

#### Update user role

```http
  PUT /api/v1/admin/user/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Name of the user |
| `email` | `string` | **Required**. Email of the user |
| `role` | `string` | **Required**. Role of the user accepted value is "admin", "user" |

#### Get details of the user by Id

```http
  GET /api/v1/admin/user/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Id of the user |

#### Delete user by Id

```http
  DEL /api/v1/admin/user/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Id of the user |

#### Get all orders

```http
  GET /api/v1/admin/orders
```

#### Update order status

```http
  PUT /api/v1/admin/order/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Id of the order |
| `status` | `string` | **Required**. Order status accepted value is "Delivered" or "Processing" |

#### Delete order

```http
  DEL /api/v1/admin/order/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Id of the order |

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`FRONTEND_URL`

`DATABASE_PASSWORD`

`JWT_SECRET`

`JWT_EXPIRE`

`COOKIE_EXPIRE`

`STRIPE_API_KEY`

`STRIPE_SECRET_KEY`

`SMPT_HOST`

`SMPT_PORT`

`SMPT_SERVICE`

`SMPT_MAIL`

`SMPT_PASSWORD`

`CLOUDINARY_CLOUD_NAME`

`CLOUDINARY_API_KEY`

`CLOUDINARY_API_SECRET`


## Authors

- [@dark-venom26](https://github.com/dark-venom26/)


## Run Locally

Clone the project

```bash
  git clone https://github.com/dark-venom26/Cartogram
```

Go to the project directory

```bash
  cd Cartogram
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Deployment

To deploy this project run

```bash
  npm run deploy
```


## Support

For support, email vishal26vish@gmail.com

