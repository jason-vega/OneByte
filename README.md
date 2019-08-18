# OneByte
Code for SD Hacks 2018 project :)

## Prerequisites
### Software Tools
Make sure you have [Node 10+](https://nodejs.org/en/download/) installed. You can then install [Expo](https://expo.io/learn) using npm:
```
npm install -g expo-cli
```
Once you have installed Expo, initialize a new Expo project called OneByte and enter the project directory:
```
expo init OneByte
cd OneByte
```
This installs a dummy app that we will overwrite during installation.
### Running the App
To run the current app in the project directory, use:
```
expo start
```
Download the iOS or Android app to scan the QR code and view the project.
### React Native Packages
Our app also utilizes a few packages that you will need to install if you do not have them already. Some of them are for [React Navigation](https://reactnavigation.org/docs/en/getting-started.html):
```
npm install react-navigation
npm install react-native-gesture-handler
npm install react-native-reanimated
expo install react-native-gesture-handler react-native-reanimated
```
OneByte also make use of Google Firebase and Authentication packages:
```
npm install firebase
npm install expo-google-app-auth
```
Lastly, OneByte uses a package that allows the user to open a maps application on their phone to view an event location:
```
npm install react-native-open-maps
```

## Installation
First remove the default App.js file and assets folder that Expo provided:
```
rm App.js
rm -r assets
```
While still in the Expo project folder, clone the project from Github into a temporary directory:
```
git clone https://github.com/jason-vega/OneByte.git OneByte-temp
```
Now we will move over the OneByte source files to our Expo project folder and delete the temporary folder:
```
mv OneByte-temp/* .
rm -rf OneByte-temp
```

OneByte utilizes [Google Firebase](https://firebase.google.com/), and you will need credentials in order to run the app. Create a new project in the Firebase Console, and then add a web app to retrieve your credentials. Save the credentials as a JSON array into a file called auth.json.

After you have your Google Firebase credentials, you can finally run the app! Make sure the latest project builds; you may need to press the reload button in the Expo smartphone app.
