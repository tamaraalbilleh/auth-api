401 lab 08 Access Control
# LAB - 08
## Access Control
### Author: Tamara Al-billeh

* [deployment for main branch]() .
* [submission PR](https://github.com/tamaraalbilleh/auth-api/pulls) .
* [tests report](https://github.com/tamaraalbilleh/auth-api/actions) .
 
### Setup

#### `.env` requirements

- `PORT` - 5000

#### Running the app

- `npm start`
- Endpoint: `/`
  - Returns message

    ```

    'welcome to home page!';

    ```
  
- Endpoint: `/signup`
  - Gets the user password and username stored

  ```

  {
    "user": {
        "_id": "60ad4f55e6eb951da748d2c7",
        "username": "riva",
        "password": "$2b$10$p5IGzxjnC.HGVyDY9dXbRubl8zhLdslw2Aes1RUunx78IdlPnesV.",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJpdmEiLCJpYXQiOjE2MjE5NzA3NzR9.aMG46F_D87Dr7XoVxBmFNTTRvWu3khMDWEAnCjHR_Ng"
    }

  ```

- Endpoint: `/signin`
  - Gets the user password and username from database and compare them to the ones provided 

  ```

  {
    "user": {
        "_id": "60ad4fc9d8f6351ddfdb93af",
        "username": "riva",
        "password": "$2b$10$C1yP3vlEVeXdaq3CTRbXP..EJHklP9i7MTIp5pkTJLWIZvrh58okC",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJpdmExIiwiaWF0IjoxNjIxOTcxMjAyfQ.duCQ7iRnCu9xtp1gu81SdEteqSKujDT2VHpnJr1UjTk"
    }

  ```

- Endpoint: `/users`
  - Returns an Object

        ```

        {
            "user": "riva1"
        }

        ```
- Endpoint: `/secret`
  - Returns an Object

    ```

    'Welcome to the secret area!'

    ```
- Endpoint: **anything else ..**
  - Returns an error 404
  - Returns an Object

    ```

    {
        "status": 404,
        "message": "Sorry , Page not Found"
    }

    ```
- Endpoint: `/`
  - Returns message

    ```

    'welcome to home page!';

    ```
- Endpoint: `/food`
  - Gets the food Objects stored

  ```

  {
    "id": "21dd7d1c-4bc1-4dd8-8677-9d0cd213d614",
    "data": {
        "name": "cake",
        "type": "desert"
    },

    {
    "id": "21dd7d1c-4bc1-4dd8-8677-9d0cd213d614",
    "data": {
        "name": "candy",
        "type": "desert"
    }
  }

  ```
- Endpoint: `/food/21dd7d1c-4bc1-4dd8-8677-9d0cd213d614`
  - Gets the food Objects stored according to id

  ```

  {
    "id": "21dd7d1c-4bc1-4dd8-8677-9d0cd213d614",
    "data": {
        "name": "cake",
        "type": "desert"
    }

  }
  
  ```
- Endpoint: `/food/21dd7d1c-4bc1-4dd8-8677-9d0cd213d614`
  - Gets the food Objects stored and Updates it according to id
  > ```"name": "cheese cake","type": "desert"  ```
  
  

  ```

  {
    "id": "21dd7d1c-4bc1-4dd8-8677-9d0cd213d614",
    "data": {
        "name": "cheese cake",
        "type": "desert"
    }
  }

  ```
  - Endpoint: `/food/21dd7d1c-4bc1-4dd8-8677-9d0cd213d614`
  - Gets the food Objects stored and Deletes it according to id

  ```

  {
    {
    "id": "21dd7d1c-4bc1-4dd8-8677-9d0cd213d614",
    "data": {
        "name": "candy",
        "type": "desert"
    }
  }
```

  {
    "id": "21dd7d1c-4bc1-4dd8-8677-9d0cd213d614",
    "data": {
        "name": "cake",
        "color": "10"
    },

    {
    "id": "21dd7d1c-4bc1-4dd8-8677-9d0cd213d614",
    "data": {
        "name": "candy",
        "color": "5"
    },

    {
    "id": "21dd7d1c-4bc1-4dd8-8677-9d0cd213d614",
    "data": {
        "name": "pants",
        "color": "6"
    }
  }

  ```
  
- Endpoint: `/clothes`
  - Gets the clothes Objects stored

  ```

  {
    "id": "21dd7d1c-4bc1-4dd8-8677-9d0cd213d614",
    "data": {
        "name": "hat",
        "color": "green"
    },

    {
    "id": "21dd7d1c-4bc1-4dd8-8677-9d0cd213d614",
    "data": {
        "name": "scarf",
        "color": "red"
    }
  }

  ```
- Endpoint: `/clothes/21dd7d1c-4bc1-4dd8-8677-9d0cd213d614`
  - Gets the clothes Objects stored according to id

  ```

  {
    "id": "21dd7d1c-4bc1-4dd8-8677-9d0cd213d614",
    "data": {
        "name": "hat",
        "color": "green"
    }

  }
  
  ```
- Endpoint: `/clothes/21dd7d1c-4bc1-4dd8-8677-9d0cd213d614`
  - Gets the clothes Objects stored and Updates it according to id
  > ```"name": "hat","color": "yellow"  ```
  
  

  ```

  {
    "id": "21dd7d1c-4bc1-4dd8-8677-9d0cd213d614",
    "data": {
        "name": "hat",
        "color": "yellow"
    }
  }

  ```
- Endpoint: `/clothes/21dd7d1c-4bc1-4dd8-8677-9d0cd213d614`
  - Gets the clothes Objects stored and Deletes it according to id

  ```

  {
    {
    "id": "21dd7d1c-4bc1-4dd8-8677-9d0cd213d614",
    "data": {
        "name": "scarf",
        "color": "red"
    }
  }

  ```

- Endpoint: `/clothes`
  - Adds on the clothes Objects stored 

  ```

  {
    "id": "21dd7d1c-4bc1-4dd8-8677-9d0cd213d614",
    "data": {
        "name": "hat",
        "color": "10"
    },

    {
    "id": "21dd7d1c-4bc1-4dd8-8677-9d0cd213d614",
    "data": {
        "name": "scarf",
        "color": "red"
    },

    {
    "id": "21dd7d1c-4bc1-4dd8-8677-9d0cd213d614",
    "data": {
        "name": "pants",
        "color": "blue"
    }
  }

  ```
  
- Endpoint: `/bad`
  - Throws an error 500
  - Returns an Object

    ```

    {
        "status": 500,
        "message": "something went wrong ",
        "rout": "/bad",
    }

    ```
- Endpoint: **anything else ..**
  - Returns an error 404
  - Returns an Object

    ```

    {
        "status": 404,
        "message": "Sorry , Page not Found"
    }

    ```
#### Tests

- Unit Tests: `npm run test`
![tests](./assets/npm1.PNG)
- Lint Tests: `npm run lint`


#### UML

(Created with [diagrams](https://app.diagrams.net/))

![UML Diagram](./assets/uml.png)
[for more clear view](https://app.diagrams.net/?title=Copy%20of%20Untitled%20Diagram.drawio&client=1) 
