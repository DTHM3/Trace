# Trace - Powerlifter Tracking

## About
An app built using react native for powerlifters to organize their workouts and lifting programs. It allows integration with google sheets for coaches to easily see how the powerlifter performs in real time.

## Use on virtual Android Device
### Step 1: Installing Android Studio and Android Emulator on Windows
1. Download android studio from https://developer.android.com/studio?gclid=CNGLu6jeuYIDFU4LiAkdn_gDeA&gclsrc=ds
2. Install android studio ensuring that the following are selected:
  - `Android SDK`
  - `Android SDK Platform`
  - `Android Virtual Device`
  - `Performance (Intel ® HAXM)`
3. Once installed, navigate to **More Actions** > **SDK Manager**. Ensure Show Package Details is checked. Under `Android 13.0 Tiramisu`, ensure the following are checked:
  - `Android SDK Platform 33`
  - `Google Play Intel x86_64 Atom System Image`
  - `33.0.0` under `Android SDK Build-Tools`
4. Allow them to install, then open **Windows Control Panel** > **User Accounts** > **User Accounts** again > **Change my environment variables** > **New** then insert the following:
  - Variable Name: `ANDROID_HOME`
  - Variable Value: `%LOCALAPPDATA%\Android\Sdk` _Note: This is the default location of the SDK_
5. Ensure it is installed through `Get-ChildItem -Path Env:\` in Powershell.
6. In **Windows Control Panel** > **User Accounts** > **User Accounts** again > **Change my environment variables** > **Path** > **Edit** > **New**, add:
  - `%LOCALAPPDATA%\Android\Sdk\platform-tools` to add the path for platform-tools.
7. In Android Studio, navigate to **More Actions** > **Virtual Device Emulator**.
8. Select whichever device you prefer with SDK: `Tiramasu (googleAPIS)`.
9. Allow install.

## Step 2: Download Project and ensure it is up to date
1. Ensure Node.js is installed.
2. In the folder of the project run `npm install` to update all packages.
3. If java is installed with jdk version 11, run `npm run android` in terminal, otherwise complete step 3.

## Step 3: Change Java version through WSL
1. Recommended to use Windows Subsystem for Linux Terminal.
2. In terminal paste the following commands:
   - `sudo apt install default-jre`
   - `sudo apt install default-jdk`
   - `java -version` and ensure it has jdk version of Java 11.
3. App should be able to be run with `npm run android` in this terminal so long as you are in the project directory.
