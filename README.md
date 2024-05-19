
# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.
# Screenshots
![React Native Logo](https://reactnative.dev/img/header_logo.svg)

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# Installation
npm install

# using npm
npm start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.


# TypeScript Integration

This project makes extensive use of TypeScript to ensure type safety and better developer experience. By using TypeScript, subsequent builds are faster as the type-checking happens during development.

# Redux and Mock API for State Management
## Login and Logout
We've implemented a mock API to manage the login and logout state using Redux. The login and logout actions are handled by async thunks to mimic asynchronous API calls, providing a realistic structure for handling authentication.

## Orders Management
Redux is also used for adding and deleting orders. This ensures that the state management is consistent and predictable throughout the application.

# Company Images with IEX Cloud
We use the IEX Cloud API to fetch images of companies. This enhances the visual appeal of the application by displaying relevant company logos and images.

>**Highlight**:  The API has a particular limit of requests allowed, so if you get some error, you might just want to check/change your API secret keys.

# Optimizing Search Queries with Lodash
To improve the performance of search queries, we use Lodash. Lodash provides utility functions for common programming tasks, making our search functionality more efficient and optimized.

#  Pagination
We've implemented pagination to manage large datasets effectively. This ensures that the application remains performant and user-friendly, even when dealing with a significant amount of data.
