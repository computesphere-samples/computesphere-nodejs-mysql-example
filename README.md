<p align="right">
    <img src="public/assets/logo.svg" width="50px" />
</p>

# ComputeSphere NodeJS-MySQL Example

This example deploys a NodeJS application that uses a [MySQL datastore](https://docs.computesphere.com/docs/features/datastores/mysql) within ComputeSphere.

> [!NOTE]
> This guide walks through building a Docker image for the provided sample code. Please note that the version `v0.0.1` used in the example is for demonstration purposes only. You should replace it with a version that suits your specific setup and requirements.

## Prerequisites

- A [ComputeSphere](https://computesphere.com) account
- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download/package-manager) (includes npm) - To build the project
- [Docker](https://docs.docker.com/engine/install/) - To create and deploy the image
- [MySQL](https://www.mysql.com/) - To test the database locally

## Setup

1. Clone this repository.

    ```bash
    git clone https://github.com/computesphere-samples/computesphere-nodejs-mysql-example.git

    cd computesphere-nodejs-mysql-example
    ```

2. Install the required dependencies.

    ```bash
    npm install
    ```

3. Create the docker image.

    ```bash
    docker build -t computesphere-nodejs-mysql-example:v.0.0.1 .
    ```

    Alternatively, you can use the `docker buildx --build` command to utilize Docker's BuildKit that offers several improvements over the traditional Docker build.
    
    ```bash
    docker buildx build --platform=linux/amd64 --tag computesphere-nodejs-mysql-example:v0.0.1 .
    ``` 

4. Push the image to Docker Hub.

    ```bash
    docker tag computesphere-nodejs-mysql-example:v0.0.1 [REPOSITORY]/computesphere-nodejs-mysql-example:v0.0.1

    docker push [REPOSITORY]/computesphere-nodejs-mysql-example:v0.0.1
    ```

> [!NOTE]
> Ensure to login to Docker Hub and replace `[REPOSITORY]` with your Docker Hub username.

## Running the project locally

1. Ensure that you have MySQL running and a database called `user-management` created already.

1. Move into the project directory.

    ```bash
    cd computesphere-nodejs-mysql-example
    ```

1. Create an `.env` file with the following values:

    ```
    DB_HOST=
    DB_USER=
    DB_PASSWORD=
    DB_NAME=user_management
    ```

    Enter values based on your configuration for the `DB_HOST`, `DB_USER`, and `DB_PASSWORD` variables.

1. Run the server locally.

    ```bash
    npm start
    ```

This runs the server on `localhost:3000`.

## Testing the endpoints

### Create a user

Create a user by invoking the endpoint `localhost:3000/users` and submitting a `POST` request with the given request body:

```json
{
    "userName": "abel-baker",
    "emailId": "abel.baker@email.com"
}
```

You should get a response like this:

```json
{
    "userId": 1,
    "userName": "abel-baker",
    "emailId": "abel.baker@email.com"
}
```

### Get a user

To retrieve a user, invoke the `localhost:3000/users/{id}` endpoint with a `GET` request, replacing `{id}` with the id of the user.

### Get all users

To get all users, invoke the `localhost:3000/users` endpoint with a `GET` request.

```json
[
    {
        "userId": 1,
        "userName": "abel-baker",
        "emailId": "abel.baker@email.com"
    }
    {
        "userId": 2,
        "userName": "john-the-great",
        "emailId": "john.doe@email.com"
    }
]
```

## Deploy to ComputeSphere

See our guide on how to deploy this project to ComputeSphere.

<!-- Check if this is the right link to the dashboard -->
<a href="https://console.computesphere.com"> <img src="https://cdn.sanity.io/images/5jct4wv7/production/a3a823db7833f9274fc723b1223084b51c7ed160-1103x160.png" width="350px" alt="ComputeSphere Logo"> </a>

---
[Explore ComputeSphere Documentation](https://docs.computesphere.com)

**Contact Us:**  
[support@computesphere.com](mailto:support@computesphere.com)  
[Support Portal](https://support.computesphere.com/portal)

&copy; 2024 ComputeSphere LLC. All Rights Reserved.

---