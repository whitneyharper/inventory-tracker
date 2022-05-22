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

* To install dependencies type [npm i or npm install] in the terminal 

```
npm i 
```
```
npm install
```

### Executing program

* To start [npm run dev] in the terminal. This will run backend (node.js) on port 5000 and frontend (react.js) on port 3000.

```
npm start
```

## API Calls

| Type     | URI            | Parameter    | Description                       |
| -------- | -------------  | ------------ | --------------------------------- | 
| GET      | /inventory     |              | return all products in db         | 
| POST     | /inventory     |              | create a new product              |  
| PUT      | /inventory/:id | product id   | update product by specific id     |  
| DELETE   | /inventory/:id | product id   | delete product by specific id     | 
| GET      | /warehouse     |              | return all warehouses in db       | 
| POST     | /warehouse     |              | create a new warehouse            | 
| PUT      | /warehouse/:id | warehouse id | update a warehouse by specific id |  
| DELETE   | /warehouse/:id | warehouse id | delete a warehouse by specific id |  

  
## Authors

Contributors names and contact info

ex. Whitney Harper  