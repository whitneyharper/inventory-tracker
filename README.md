# Project Title

Inventory Tracking Application

## Description

A REST API web service that accepts HTTP requests and returns responses based on the request. Used to manage products in an inventory database with API calls to complete the following:

C - Create a new product entry
R - View all products in inventory
U - Update a product entry
D - Delete a product entry

Additional feature of exporting inventory data into a csv file.

## Getting Started

### Built With

* JavaScript
* Node.js
* SQLite
* Sequelize ORM

### Dependencies

* express
* json2csv
* sqlite3
* sequelize

### Before Installing
* SQLite is required and need to be on local machine.
* Go to the [SQLite](https://www.sqlite.org/index.html) site.
* Here is [Guide](https://www.sqlite.org/quickstart.html) for setup.
* Also Node.js is required.
* Go to the [Node.js](https://nodejs.org/en/) site.
* DB Browser for SQLite is a great tool to visually see your tables      without needing to use SQL commands and shell/DOS prompts. It formats your tables into a spreadsheet-like form.
* I suggest to download this to see the changes made to the database.
* Go to the [DB Browser for SQLite](https://sqlitebrowser.org/) site to download the tool.
* Once SQLite and Node.js are installed and setup you can start cloning the repository.

### Installing

* Clone repository git clone 

```
git@github.com:whitneyharper/fetch-rewards-assessment.git
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

## Testing the API
Use POSTMAN to test routes.

* Go to the [Postman](https://www.postman.com/) site.
* Create an account or log in.
* From your account's home screen, create a workspace by clicking on `Workspace` in the top left menu bar, next to `Home`.
* Upon clicking on `Workspace` you will see a button label `Create Workspace`, click that button.
![This is an image](/views/images/create-workspace.jpeg)
* A Create workspace form will appear. Fill out to form and under Visibility select personal. Once the form is complete click the `Create Workspace` button at the bottom of the form.
![This is an image](/views/images/workspace-form.jpeg)
* Once you're in a workspace, click on `+` to start a request.
![This is an image](/views/images/create-request.jpeg)
* Choose the method needed for your request and input request URL.
![This is an image](/views/images/select-method.jpeg)
* Click on `Send` button.


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

## View Database using DB Browser for SQLite


* Launch DB Browser for SQLite
* Click on `Open Database`.
![This is an image](/views/images/open-database.jpeg)
* Select inventory.db.
![This is an image](/views/images/select-method.jpeg)
* To view data in a spreadsheet-like form, click on `Browse Data`. There is a dropbox menu label `Table`. Select Products and the table should appear as a spreadsheet. When you make changes to the data through the API calls just click on the refresh button to see the updated changes.
![This is an image](/views/images/browse-data.jpeg)

    
 
## Authors

Contributors names and contact info

ex. Whitney Harper  