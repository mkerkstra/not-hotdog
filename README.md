# Hotdog - Not Hotdog

This monorepo contains the code for the "Hotdog - Not Hotdog" app, which allows users to upload images and determine whether they contain hotdogs or not.

## Architecture

The app is composed of three main components:

    A Next.js client, which provides the user interface and allows users to upload images.
    A Nest.js API, which bridges the client and the ML API by processing the user's image and sending it to the ML API for prediction.
    A Flask API, which contains the ML model and returns predictions for whether an image contains a hotdog or not.

## Getting Started

To run the app, you will need to have the following dependencies installed:

    Docker
    VS Code (with the Remote - Containers extension installed)

To start the app, open the root folder in VS Code and run the following command:

```sh
pnpm dev
```

This will start the Flask API, the Nest.js API, and the client. You can then access the app by visiting http://localhost:3000 in your web browser.

## Deployment

To deploy the app, you can use a cloud provider such as AWS or Google Cloud Platform.

You will need to configure the following services:

    A Next.js deployment, which will host the client.
    A Nest.js deployment, which will host the API.
    A Flask deployment, which will host the ML API.

You will also need to configure the following infrastructure:

    A database, such as Postgres, to store user data.

## Goal

The "Hotdog - Not Hotdog" app is an example of how to build a monorepo that includes multiple components and services. By using Docker and VS Code's Remote - Containers extension, you can easily set up a development environment that includes all of the dependencies you need to run the app.