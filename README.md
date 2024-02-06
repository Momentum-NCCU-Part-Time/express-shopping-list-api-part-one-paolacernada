# Shopping List API Documentation

This document provides detailed information about the Shopping List API, which is designed to allow users to manage their shopping lists, including creating, updating, and deleting lists.

## Getting Started

To get the API up and running on your local machine, follow these steps:

### Prerequisites

- Node.js installed on your machine
- Access to MongoDB, either locally or through a cloud provider like MongoDB Atlas
- npm (Node Package Manager) for managing project dependencies

### Installation

1. **Clone the repository** to your local machine using:

    ```bash
    git clone <repository-url>
    ```

2. **Navigate to the project directory:**

    ```bash
    cd <project-directory-name>
    ```

3. **Install the necessary dependencies** by running:

    ```bash
    npm install
    ```

4. **Start the server** with:

    ```bash
    npm start
    ```

    The server should now be running and accessible via `http://localhost:3000/shopping-lists`.

## API Endpoints

The following sections describe the available endpoints, their methods, request bodies, and example responses.

### Create a New Shopping List

- **Method:** POST
- **Endpoint:** `/shopping-lists`
- **Request Body:**

    ```json
    {
      "name": "Grocery List"
    }
    ```

- **Success Response:**

    ```json
    {
      "_id": "601a5430f0b5f00d236a0aeb",
      "name": "Grocery List",
      "createdAt": "2024-02-07T12:00:00.000Z",
      "updatedAt": "2024-02-07T12:00:00.000Z"
    }
    ```

### Get All Shopping Lists

- **Method:** GET
- **Endpoint:** `/shopping-lists`

- **Success Response:**

    ```json
    [
      {
        "_id": "601a5430f0b5f00d236a0aeb",
        "name": "Grocery List",
        "createdAt": "2024-02-07T12:00:00.000Z",
        "updatedAt": "2024-02-07T12:00:00.000Z"
      }
    ]
    ```

### Get a Single Shopping List by ID

- **Method:** GET
- **Endpoint:** `/shopping-lists/:id`

- **Success Response:**

    ```json
    {
      "_id": "601a5430f0b5f00d236a0aeb",
      "name": "Grocery List",
      "createdAt": "2024-02-07T12:00:00.000Z",
      "updatedAt": "2024-02-07T12:00:00.000Z"
    }
    ```

### Update a Shopping List by ID

- **Method:** PUT
- **Endpoint:** `/shopping-lists/:id`
- **Request Body:**

    ```json
    {
      "name": "Updated Grocery List"
    }
    ```

- **Success Response:**

    ```json
    {
      "_id": "601a5430f0b5f00d236a0aeb",
      "name": "Updated Grocery List",
      "createdAt": "2024-02-07T12:00:00.000Z",
      "updatedAt": "2024-02-07T13:00:00.000Z"
    }
    ```

### Delete a Shopping List by ID

- **Method:** DELETE
- **Endpoint:** `/shopping-lists/:id`

- **Success Response:**

    ```json
    {
      "message": "Shopping list successfully deleted."
    }
    ```

## Error Handling

Responses to unsuccessful requests will include an appropriate HTTP status code and a JSON object with more information about the error.

- **400 Bad Request:** The request was invalid or cannot be served. Check the request syntax and retry.
- **404 Not Found:** The requested resource is not found. Check the request URL and try again.
- **500 Internal Server Error:** An error occurred on the server side. Please try the request again later.

