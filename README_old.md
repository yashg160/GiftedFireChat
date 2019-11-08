# React Native Gifted Fire Chat

React Native Gifted chat is an abstraction over React Native Gifted Chat and React Native Firebase. It provides a simpler API to integrate a chat component into a React Native app, using Firebase Realtime Database to store the chat data.

[Follow author on Github](https://github.com/yashg160)
[Follow author on LinkedIn](https://www.linkedin.com/in/yash-gupta-575679179/)

## Motivations and Aims
The idea behind this package was to simplify the process of integrating a chat component in a React Native app. While working on a personal project, I had trouble finding any documentation or resources to do this. So, I decided to create a module myself and share it so that anyone else who might face the same problem as I did, might stumble upon this package.

## Dependencies

- **react-native-gifted-chat** to provide the UI 
-  **react-native-firebase** to provide firebase connectivity

## IMPORTANT NOTES
- **Use version >= 1.2.4. Previous version contain several bugs and will not behave correctly**

- **This module was tested with react-native@0.59.9 and react-native-firebase@5.5.6. Using react-native-firebase >= 6.0.0 or react-native >= 0.60.0 might introduce breaking changes to your project.**
 
- **This module supports only Android right now. It has not been  tested on iOS. Using this module on iOS may result in unexpected behaviour.**

- **Module will not work without an internet connection(obviously). So remember to check for internet connection**

## Installation
1.  Install Gifted Chat UI
`yarn add react-native-gifted-chat` 
or
`npm install --save react-native-gifted-chat`

2. Get google-services.json file. Follow the instructions [here](https://rnfirebase.io/docs/v5.x.x/installation/initial-setup) to get your file.
3. Then follow the instructions for **Android** only setup [here](https://rnfirebase.io/docs/v5.x.x/installation/android). 
4. After you have completed the initial installation, add the realtime database module to your project. Follow the instructions [here](https://rnfirebase.io/docs/v5.x.x/database/android).
5. Then run the command `yarn add react-native-gifted-fire-chat` or `npm install --save react-native-gifted-fire-chat`.
6. Run your project by entering `react-native run-android`

After completing the installation, you are ready to use this package.

## Usage

    import GiftedFireChat from 'react-native-gifted-fire-chat';
	
	render() {
		return(
			<GiftedFireChat
				senderPhoneNumber='+11234567890'
				recieverPhoneNumber='+10987654321'
			/>
		)
	}

- **Required Props**: 
	- **senderPhoneNumber**: *(string)* The current user's phone number along with the country code. Eg: If you are providing a phone number from India, then it should be given as "+911234567890".
	-	**recieverPhoneNumber**: *(string)* The phone number of the other user. It should be provided in a similar manner as the sender's number.
	

- **Optional Props**
	- **userId**(*String*): A custom id passed to denote the sender's identity. Make sure that it is unique for each user. Default is the sender's phone number passed in senderPhoneNumber prop.
	- All other react-native-gifted-chat props. View documentation [here](https://www.npmjs.com/package/react-native-gifted-chat). Quick replies and system messages are not yet supported. 
	- **userAvatar** *(String)*: A url for the user image. It can be a local or a network image
	- **userName** *(String)*: Name of the user to enter into the message object
	- **messages** (*Array*): A custom array of messages can be passed in as prop to display initially before any messages are sent. Each message object should contain a text property, user object(for custom properties) and a time of creation.

## Tips
1. Use react-native-gifted-chat props [here](https://www.npmjs.com/package/react-native-gifted-chat) to customize the UI to suit your app. You can change almost everything to suit your needs.
2. To insert a header into your view, it is recommended to use `Header` from `react-native-elements`. View the [documentation](https://react-native-elements.github.io/react-native-elements/docs/header.html).
3. Use a navigation library such as `react-navigation` or `react-native-router-flux` to move from one screen to another. You can also user the header provided by these libraries if you wish so. View [react-navigation](https://reactnavigation.org/docs/en/getting-started.html). View [react-native-router-flux](https://www.npmjs.com/package/react-native-router-flux).
5. Use `@react-native-community/netinfo` to check for internet connectivity. View [here](https://www.npmjs.com/package/@react-native-community/netinfo).

## Limitations
This package is simply an abstraction over two existing modules.
Right now, only text messages are supported.

## Future Works
I plan to add support for sending images and videos using Firebase Storage, support for location sharing. I will also look to provide overriding of the onSend prop to allow for greater flexibility. If you want to contribute, ping me and I will add you as a collaborator.