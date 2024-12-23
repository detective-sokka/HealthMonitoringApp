/** @type {Detox.DetoxConfig} */
export const testRunner = {
  args: {
    '$0': 'jest',
    config: 'e2e/jest.config.js'
  },
  jest: {
    setupTimeout: 120000
  }
};
export const apps = {
  'ios.debug': {
    type: 'ios.app',
    binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/TDDReactNative.app',
    build: 'xcodebuild -workspace ios/TDDReactNative.xcworkspace -scheme TDDReactNative -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build'
  },
  'ios.release': {
    type: 'ios.app',
    binaryPath: 'ios/build/Build/Products/Release-iphonesimulator/TDDReactNative.app',
    build: 'xcodebuild -workspace ios/TDDReactNative.xcworkspace -scheme TDDReactNative -configuration Release -sdk iphonesimulator -derivedDataPath ios/build'
  },
  'android.debug': {
    type: 'android.apk',
    binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
    build: 'cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug',
    reversePorts: [
      8081
    ]
  },
  'android.release': {
    type: 'android.apk',
    binaryPath: 'android/app/build/outputs/apk/release/app-release.apk',
    build: 'cd android && ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release'
  }
};
export const devices = {
  simulator: {
    type: 'ios.simulator',
    device: {
      type: 'iPhone 16'
    }
  },
  attached: {
    type: 'android.attached',
    device: {
      adbName: '.*'
    }
  },
  emulator: {
    type: 'android.emulator',
    device: {
      avdName: 'Medium_Phone_API_35'
    }
  }
};
export const configurations = {
  'ios.sim.debug': {
    device: 'simulator',
    app: 'ios.debug'
  },
  'ios.sim.release': {
    device: 'simulator',
    app: 'ios.release'
  },
  'android.att.debug': {
    device: 'attached',
    app: 'android.debug'
  },
  'android.att.release': {
    device: 'attached',
    app: 'android.release'
  },
  'android.emu.debug': {
    device: 'emulator',
    app: 'android.debug'
  },
  'android.emu.release': {
    device: 'emulator',
    app: 'android.release'
  }
};