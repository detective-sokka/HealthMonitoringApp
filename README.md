# HealthMonitoringApp
This is a cross-platform healthcare application built to give the user situational awareness of their surrounding. 

## How to setup?

This application is made using React-native. To run it on ios you will need XCode installed and for Android you will need Android studio. 
Make sure the developer environment is setup using this link (https://reactnative.dev/docs/environment-setup). 

Here are the steps for Android:
- `cd healthcare-app`
- `npx expo run:android`

To run unit tests:
- `npm test`

To run detox integration tests:
- `detox build --configuration android.emu.debug`
- `detox test --configuration android.emu.debug`

The `documentation` directory contains the IEC 62304 documentation.