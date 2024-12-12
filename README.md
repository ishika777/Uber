# Backend API Documentation

## `/users/register` Endpoint

### Description

Register a new user by creating a user account with the provided information

### HTTP Method

`POST`

### Request Body

- `fullname` (object):
    - `firstname` (string, required): User's first name (minimun 3 characters)
    - `lastname` (string, optional): User's last name (minimun 3 characters)
- `email` (string, required): User's email address (must be valid email)
- `password` (string, required): User's password (minimun 6 characters)

### Example Response

- `user` (object):
    - `fullname` (object)
        - `firstname` (string): User's first name
        - `lastname` (string): User's last name
    - `email` (string): User's email address
    - `password` (string): User's password
- `token` (string): JWT Token




## `/users/login` Endpoint

### Description

Authenticate a user using their email and password, return a JWT Token upon success

### HTTP Method

`POST`

### Request Body

- `email` (string, required): User's email address (must be valid email)
- `password` (string, required): User's password (minimun 6 characters)

### Example Response

- `user` (object):
    - `fullname` (object)
        - `firstname` (string): User's first name
        - `lastname` (string): User's last name
    - `email` (string): User's email address 
    - `password` (string): User's password
- `token` (string): JWT Token





## `/users/profile` Endpoint

### Description

Retrives the profile information of currently authenticated user

### HTTP Method

`GET`

### Authentication

Requires a valid JWT Token in the Authorization Header or cookie
`Authorization: Beares <token>`

### Example Response

- `user` (object):
    - `fullname` (object)
        - `firstname` (string): User's first name 
        - `lastname` (string): User's last name 
    - `email` (string): User's email address





## `/users/logout` Endpoint

### Description

Logout the current user and blacklist the token provided in cookie or headers

### HTTP Method

`GET`

### Authentication

Requires a valid JWT Token in the Authorization Header or cookie
`Authorization: Beares <token>`





## `/captains/register` Endpoint

### Description

Registers a new captain creating a captain account with the provided information

### HTTP Method

`POST`

### Request Body

- `fullname` (object):
    - `firstname` (string, required): Captain 's first name (minimun 3 characters)
    - `lastname` (string, optional): Captain 's last name (minimun 3 characters)
- `email` (string, required): Captain 's email address (must be valid email)
- `password` (string, required): Captain 's password (minimun 6 characters)
- `vehicle` (object):
    - `color` (string, required): Vehicle color (minimun 3 characters)
    - `plate` (string, optional): Vehicle plate number (minimun 3 characters)
    - `capacity` (number, required): Vehicle passanger capacity (minimun 1)
    - `vehicleType` (string, optional): Type of vehicle (must be "car", "motorcycle", "auto")

### Example Response

- `captain` (object):
    - `fullname` (object)
        - `firstname` (string): Captain 's first name 
        - `lastname` (string): Captain 's last name 
    - `email` (string): Captain 's email address
    - `vehicle` (object):
        - `color` (string): Vehicle color 
        - `plate` (string): Vehicle plate number 
        - `capacity` (number): Vehicle passanger capacity
        - `vehicleType` (string): Type of vehicle
    - `token` (string): JWT Token



## `/captains/login` Endpoint

### Description

Authenticate a captain using their email and password, return a JWT Token upon success

### HTTP Method

`POST`

### Request Body

- `email` (string, required): Captain's email address (must be valid email)
- `password` (string, required): Captain's password (minimun 6 characters)

### Example Response

- `captain` (object):
    - `fullname` (object)
        - `firstname` (string): Captain's first name
        - `lastname` (string): Captain's last name
    - `email` (string): Captain's email address 
    - `password` (string): Captain's password
- `token` (string): JWT Token





## `/captains/profile` Endpoint

### Description

Retrives the profile information of currently authenticated captain

### HTTP Method

`GET`

### Authentication

Requires a valid JWT Token in the Authorization Header or cookie
`Authorization: Beares <token>`

### Example Response

- `captain` (object):
    - `fullname` (object)
        - `firstname` (string): User's first name 
        - `lastname` (string): User's last name 
    - `email` (string): User's email address





## `/captains/logout` Endpoint

### Description

Logout the current captain and blacklist the token provided in cookie or headers

### HTTP Method

`GET`

### Authentication

Requires a valid JWT Token in the Authorization Header or cookie
`Authorization: Beares <token>`