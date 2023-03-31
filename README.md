This is a [Next.js] project with Bootstrap/Reactstrap and my submission to bcgov code challenge (req97073).

# Description

 A project management system that allows user to add new projects, edit existing one or search for a specific developer in the project list.

# Backend
 
 The backend is built using a JSON file acting as a database. Backend consists of a few RESTful API endpoints that manipulate data and update the JSON file.  
 
 These endpoints are:
 
 ## GET All
 
| Endpoint | GET /api/products |
| Usage | Retrieve all products stored |
| Response | A list of all products stored |

 ## GET ONE
 
| Endpoint | GET /api/products/:productId |
| Usage | Retrieve a product based on it's id  |
| Parameters | 'productId' - the id of the product to retrieve |
| Response | A product with 'productId' |

## POST

| Endpoint | POST /api/products |
| Purpose | Create a new product |
| Parameters | A JSON string with informations for the new product |
| Response |  |

 ## PATCH
 
| Endpoint | PATCH /api/products|
| Purpose | Update a boat's information |
| Request parameters | A JSON string with informations for the updated product |
| Response |  |


# Frontend
 
 ## User Story 1
 
 Descr: List of all products with a total number of all products. 
 
 1. Start the project with npm run dev
 2. Wait for it to load. You should be in the homepage.
 3. The list should be displayed alongside with a counter on the top left.

 ## User Story 2
 
 Descr: Creating a new product using a pop up form. 
 
 1. Click on the add product button.
 2. A form should pop up for you to fill.
 3. For the developers section, the form allows you to add or delete a developer you just added.
 4. Whenever the form is filled with valid information, click on submit and the product should be saved onto the list.

## User Story 3

Descr: Updating an existing product using a pop up form. 

 1. Click on the edit product button located at the end of the row of the product you want to edit.
 2. A form should pop up which contains data of the selected product.
 3. Edit the data on the form and click save when you are finished.
 4. The product should update with the new data you provided.

 ## User Story 4 and 5

 1. Select a type of person you are searching for (Scum Master or Developer).
 2. Enter their name into the input field.
 3. The product list as well as the project counter on the top left should update accoding to your input.


# Running locally

    1. Clone this repo
    2. At the top level of the repo run 'npm install' this should install all required dependencies. 
    3. Start the application by running 'npm run dev'
