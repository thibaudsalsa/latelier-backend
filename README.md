# latelier-backend

# Technical Test - TypeScript Express App

This project is a TypeScript-based Express application that runs within Docker. The app provides API endpoints that can be tested using tools like Postman. Below are instructions for setting up, running, and testing the application.

## Prerequisites

Before getting started, make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 18 or above)
- [Docker](https://www.docker.com/get-started) (to run the app in a container)
- [Postman](https://www.postman.com/) (optional, for testing the API)

## Installation

1. Clone the repository:

```bash
git clone https://your-repo-url.git
cd your-project-folder
```

2. Install the dependencies:

```bash
npm install
```

## Development

### Running the app locally (without Docker)

To start the app locally using `ts-node`, run the following command:

```bash
npm start
```

 ### Running the app with Docker

To start the app suing docker, you need to install docker on your machine

```bash
npm run build
```

```bash
npm run run-docker
```

## Testing

you can run end to end tests using
```bash
npm run test
```

## Endpoints

the 3 endpoints are

GET /players
GET /player:id
GET /players-analystics

and the port is 3002.

you can test also only with this url:


Thibaud Salsa