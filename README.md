# Project Title

Inventory Tracking Application 

## Description

A RESTful API web service that accepts HTTP requests and returns responses based on the request. Used to manage products in an inventory database with API calls to complete the following:

* C - Create a new product entry
* R - View all products in inventory
* U - Update a product entry
* D - Delete a product entry

Additional feature basic CRUD functionality for warehouses, along with assigning inventory to specific warehouse

## Getting Started

### Built With

* JavaScript
* Node.js
* MongoDB database
* Mongoose ODM
* Create React App


### Dependencies

* express
* cors
* dotenv
* mongoose
* axios
* bootstrap
* formik
* react
* react-bootstrap
* react-router-dom
* react-select
* yup

### Before Installing
* Can use MongoDB to host and manage data in the cloud and not locally. 
* Here is [Guide](https://www.mongodb.com/docs/atlas/getting-started/?_ga=2.105812355.1012571433.1653063759-826227366.1652645786) for setup.
* Also Node.js is required.
* Go to the [Node.js](https://nodejs.org/en/) site.
* Once MongoDB and Node.js are installed you start cloning the repository.

### Installing

* Clone repository git clone 

```
https://github.com/whitneyharper/inventory-tracker.git
```

* To install dependencies type [npm install] in the terminal 

```
npm install
```

### Executing program

* To start server type [npm start] in the terminal.

```
npm start
```

## API Calls

| Type     | URI            | Parameter     | Parameter Type  | Description   |
| -------- | -------------  | ------------  | --------------- | ------------- | 
| GET      | /inventory     | NewYork       | John            | Test1         | 
| POST     | /inventory     | Toronto       | John            | Test1         | 
| PUT      | /inventory/:id | NewYork       | John            | Test1         | 
| DELETE   | /inventory/:id | Toronto       | John            | Test1         | 

### Create a new product
- API <br> POST/ <localhost:3000/inventory>

- **Input** <br> 
  `{ "name": "Harry Potter t-shirt", "price": 20.99, "quantity": 100, "category": "apparel" }` <br>
  
- **Expected response** <br>
    ```
    {
        "message": "New product added to inventory",
        "product": {
            "id": 1,
            "name": "Harry Potter t-shirt",
            "price": 20.99,
            "quantity": 100,
            "category": "apparel"
        }
    }

### Get list of products in inventory
- API <br> GET/ <localhost:3000/inventory>

- **Expected response** <br>
    ```
    [
        {
            "id": 1,
            "name": "Harry Potter t-shirt",
            "price": 20.99,
            "quantity": 100,
            "category": "apparel"
        },
        {
            "id": ,
            "name": "Gold Hoop earrings",
            "price": 10.99,
            "quantity": 1000,
            "category": "jewelry"
        }
    ]
    
### Update a product entry 
- API <br> PUT/ <localhost:3000/inventory/2>

- **Input** <br> 
  `{ "quantity": 78 }` <br>
  
- **Expected response** <br>
    ```
    {
        "message": "Product is updated.",
        "updatedProduct": {
            "id": 1,
            "name": "Harry Potter t-shirt",
            "price": 20.99,
            "quantity": 78,
            "category": "apparel"
        }
    }   

### Delete a product entry
- API <br> DELETE/ <localhost:3000/inventory/2>

- **Expected response** <br>
    ```
    {
        "message": "Product deleted."
    }

### Get a csv file of inventory database
- API <br> GET/ <localhost:3000/inventory/download>

- **Expected response** <br>
    ```
    "id","name","price","quantity","category"
    1,"Harry Potter t-shirt",20.99,100,"apparel"
    2,"Gold Hoop earrings",20.99,100,"jewelry"
    3,"Square lens sunglasses",10.99,1,"accessories"
   
## Authors

Contributors names and contact info

ex. Whitney Harper  