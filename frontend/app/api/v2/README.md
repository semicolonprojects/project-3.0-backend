**About File api/v2!**

---

**Deskripsi:**

File ini berfungsi untuk consume data yang nantinya digunakan di frontend.

---

**Route List**

# API Routes

---

## General Routes

- `GET|HEAD /`  
  **Description**: Retrieve some general information.

---

## Ignition Routes

- `POST _ignition/execute-solution`  
  **Description**: Execute a solution.

- `GET|HEAD _ignition/health-check`  
  **Description**: Check the health status.

- `POST _ignition/update-config`  
  **Description**: Update configuration.

---

## API v1 Routes

### Products

- `GET|HEAD api/v1/allProductsCategory`  
  **Description**: Get all product categories.

- `GET|HEAD api/v1/products`  
  **Description**: Get all products.

- `POST api/v1/products`  
  **Description**: Create a new product.

- `GET|HEAD api/v1/products/{product}`  
  **Description**: Get details of a specific product.

- `PUT|PATCH api/v1/products/{product}`  
  **Description**: Update details of a specific product.

- `DELETE api/v1/products/{product}`  
  **Description**: Delete a specific product.

### Artikels

- `GET|HEAD api/v1/artikel`  
  **Description**: Get all articles.

- `POST api/v1/artikel`  
  **Description**: Create a new article.

- `GET|HEAD api/v1/artikel/{artikel}`  
  **Description**: Get details of a specific article.

- `PUT|PATCH api/v1/artikel/{artikel}`  
  **Description**: Update details of a specific article.

- `DELETE api/v1/artikel/{artikel}`  
  **Description**: Delete a specific article.

### Artikel Categories

- `GET|HEAD api/v1/artikel_category`  
  **Description**: Get all article categories.

- `POST api/v1/artikel_category`  
  **Description**: Create a new article category.

- `GET|HEAD api/v1/artikel_category/{artikel_category}`  
  **Description**: Get details of a specific article category.

- `PUT|PATCH api/v1/artikel_category/{artikel_category}`  
  **Description**: Update details of a specific article category.

- `DELETE api/v1/artikel_category/{artikel_category}`  
  **Description**: Delete a specific article category.

### Cekresi

- `GET|HEAD api/v1/cekresi`  
  **Description**: Get all shipment tracking details.

- `POST api/v1/cekresi`  
  **Description**: Create a new shipment tracking.

- `GET|HEAD api/v1/cekresi/{cekresi}`  
  **Description**: Get details of a specific shipment tracking.

- `PUT|PATCH api/v1/cekresi/{cekresi}`  
  **Description**: Update details of a specific shipment tracking.

- `DELETE api/v1/cekresi/{cekresi}`  
  **Description**: Delete a specific shipment tracking.

### Nomors

- `GET|HEAD api/v1/nomors`  
  **Description**: Retrieve all nomors.

- `POST api/v1/nomors`  
  **Description**: Create a new nomor.

- `GET|HEAD api/v1/nomors/{nomor}`  
  **Description**: Retrieve details of a specific nomor.

- `PUT|PATCH api/v1/nomors/{nomor}`  
  **Description**: Update details of a specific nomor.

- `DELETE api/v1/nomors/{nomor}`  
  **Description**: Delete a specific nomor.

### Auth

- `POST api/v1/login`  
  **Description**: Authenticate user login.

- `POST api/v1/logout`  
  **Description**: Logout current user.

### Users

- `GET|HEAD api/v1/user`  
  **Description**: Get current user details.

- `GET|HEAD api/v1/users`  
  **Description**: Get all users.

- `POST api/v1/users`  
  **Description**: Create a new user.

- `GET|HEAD api/v1/users/{user}`  
  **Description**: Get details of a specific user.

- `PUT|PATCH api/v1/users/{user}`  
  **Description**: Update details of a specific user.

- `DELETE api/v1/users/{user}`  
  **Description**: Delete a specific user.

### Sanctum

- `GET|HEAD sanctum/csrf-cookie`  
  **Description**: Get the CSRF cookie for authentication.
