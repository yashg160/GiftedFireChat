# React Native Gifted Fire Chat

React Native Gifted chat is an abstraction over React Native Gifted Chat and React Native Firebase. It provides a simpler API to integrate a chat component into a React Native app, using Firebase Realtime Database to store the chat data.

[Follow author on Github](https://github.com/yashg160)
[Follow author on LinkedIn](https://www.linkedin.com/in/yash-gupta-575679179/)

## Motivations and Aims
The idea behind this package was to simplify the process of integrating a chat component in a React Native app. While working on a personal project, I had trouble finding any documentation or resources to do this. So, I decided to create a module myself and share it so that anyone else who might face the same problem as I did, might stumble upon this package.

## IMPORTANT NOTES

- **If you are using react-native-firebase@5.x.x, then use version 1.2.4. Else, use version >= 2.0.0**

- **This module supports only Android right now. It has not been  tested on iOS. Using this module on iOS may result in unexpected behaviour.**

- **Module will not work without an internet connection(obviously). So remember to check for internet connection. Check Tips section**

## Installation

1. Initialize a react native app using [react-native-cli](https://facebook.github.io/react-native/docs/getting-started) if you dont have one already. **Use react-native version 0.60.x**

2.  Install Gifted Chat UI `yarn add react-native-gifted-chat` or `npm install --save react-native-gifted-chat`

3. Follow all the instructions [here](https://invertase.io/oss/react-native-firebase/quick-start/android-firebase-credentials) to integrate firebase credentials into your app. Don't build the project yet.

4. Add the core module to your project. `yarn add @react-native-firebase/app` or `npm install --save @react-native-firebase/app`

5. Add realtime database dependency to your app `yarn add @react-native-firebase/database` or `npm install --save @react-native-firebase/database`. 

6. Build your project by running `react-native run-android`

After completing the installation, you are ready to use this package.

## Usage

    import GiftedFireChat from 'react-native-gifted-fire-chat';
	
	render() {
	    return(
			<GiftedFireChat
				senderPhoneNumber='+11234567890'
				receiverPhoneNumber='+10987654321'
			/>
		)
	}

- **Required Props**: 
	- **senderPhoneNumber**: *(string)* The current user's phone number along with the country code. Eg: If you are providing a phone number from India, then it should be given as "+911234567890".
	-	**receiverPhoneNumber**: *(string)* The phone number of the other user. It should be provided in a similar format as the sender's number.
	

- **Optional Props**
	- **userId**(*String*): A custom id passed to denote the sender's identity. Make sure that it is unique for each user. Default is the sender's phone number passed in senderPhoneNumber prop.
	- **userAvatar** *(String)*: A url for the user image. It can be a local or a network image
	- **userName** *(String)*: Name of the user to enter into the message object
    - All other react-native-gifted-chat props. View documentation [here](https://www.npmjs.com/package/react-native-gifted-chat). Quick replies and system messages are not yet supported. 

## Tips
1. Use react-native-gifted-chat props [here](https://www.npmjs.com/package/react-native-gifted-chat) to customize the UI to suit your app. You can change almost everything to suit your needs.
2. To insert a header into your view, it is recommended to use `Header` from `react-native-elements`. View the [documentation](https://react-native-elements.github.io/react-native-elements/docs/header.html).
3. Use a navigation library such as `react-navigation` or `react-native-router-flux` to move from one screen to another. You can also user the header provided by these libraries if you wish so. View [react-navigation](https://reactnavigation.org/docs/en/getting-started.html). View [react-native-router-flux](https://www.npmjs.com/package/react-native-router-flux).
4. Use `@react-native-community/netinfo` to check for internet connectivity. View [here](https://www.npmjs.com/package/@react-native-community/netinfo).

## Future Works
I plan to add support for sending images and videos using Firebase Storage, support for location sharing. If you want to contribute, ping me and I will add you as a collaborator.