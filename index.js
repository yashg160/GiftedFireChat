import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import database, {firebase} from '@react-native-firebase/database';

export default class GiftedFireChat extends Component {

    constructor() {
        super();
        this.state = {
            messages: [],
            loading: true,
            uniRef: null
        }
    }

    TAG = 'GiftedFireChat:';
    messagesRef = null;

    async setRef() {

        let userNumber = this.props.senderPhoneNumber
        let personNumber = this.props.receiverPhoneNumber;

        let slicePerson = personNumber.slice(3, 8);
        let sliceUser = userNumber.slice(3, 8);

        const k1 = Number(slicePerson);
        const k2 = Number(sliceUser);

        const uniRef = (k1 + k2) * (k1 + k2 + 1) / 2 + k2;
        this.setState({ uniRef });

        console.log(this.TAG, `Chatting between ${userNumber} and ${personNumber}`);
        return;
    }

    async loadMessages(callback) {
        const { uniRef } = this.state;
        this.messagesRef = database().ref(`messages-${uniRef}`);
        this.messagesRef.off();

        const onReceive = (data) => {
            const message = data.val();
            callback({
                _id: data.key,
                text: message.text,
                createdAt: new Date(message.createdAt),
                user: {
                    _id: message.user._id,
                    name: message.user.name,
                    avatar: message.user.avatar
                }
            });
        };
        this.messagesRef.limitToLast(20).on('child_added', onReceive);
        return;

    }

    sendMessage = (message) => {
        for (let i = 0; i < message.length; i++) {
            this.messagesRef.push({
                text: message[i].text,
                user: message[i].user,
                createdAt: firebase.database.getServerTime()
            });
        }
    }

    async closeChat() {
        if (this.messagesRef) {
            await this.messagesRef.off();
        }
    }

    componentDidMount() {
        this.setRef()
            .then(() => this.loadMessages(message => {
                this.setState((previousState) => {
                    return {
                        messages: GiftedChat.append(previousState.messages, message)
                    }
                });
            }))
            .catch(error => {
                console.log(this.TAG, error);
            });
        this.setState({ loading: false });
    }

    render() {
        if (this.state.loading) {
            this.props.renderLoading === null ? <ActivityIndicator /> : this.props.renderLoading
        }

        return (
            <View style={{ flex: 1 }}>

                <GiftedChat
                    renderLoading={() => this.props.renderLoading == null ? <ActivityIndicator /> : this.props.renderLoading}
                    messages={this.state.messages}   //messages can be passed as prop
                    onSend={message => this.sendMessage(message)}   //Options for overriding
                    user={{
                        _id: this.props.userId === null ? this.props.senderPhoneNumber : this.props.userId,
                        name: this.props.userName === null ? 'User Name' : this.props.userName,
                        avatar: this.props.userAvatar === null ? null : this.props.userAvatar
                    }}
                    text={this.props.text}
                    placeholder={this.props.placeholder}
                    messageIdGenerator={this.props.messageIdGenerator}
                    alwaysShowSend={this.props.alwaysShowSend}
                    locale={this.props.locale}
                    timeFormat={this.props.timeFormat}
                    dateFormat={this.props.dateFormat}
                    isAnimated={this.props.isAnimated}
                    loadEarlier={this.props.loadEarlier}
                    isLoadingEarlier={this.props.isLoadingEarlier}
                    renderLoadEarlier={this.props.renderLoadEarlier}
                    renderAvatar={this.props.renderAvatar}
                    showUserAvatar={this.props.showUserAvatar}
                    showAvatarForEveryMessage={this.props.showAvatarForEveryMessage}
                    onPressAvatar={this.props.onPressAvatar}
                    onLongPressAvatar={this.props.onLongPressAvatar}
                    renderAvatarOnTop={this.props.renderAvatarOnTop}
                    renderBubble={this.props.renderBubble}
                    renderSystemMessage={this.props.renderSystemMessage}
                    onLongPress={this.props.onLongPress}
                    inverted={this.props.inverted}
                    renderUsernameOnMessage={this.props.renderUsernameOnMessage}
                    renderMessage={this.props.renderMessage}
                    renderMessageText={this.props.renderMessageText}
                    /* renderMessageImage={this.props.renderMessageImage}
                    renderMessageVideo={this.props.renderMessageVideo} */
                    videoProps={this.props.videoProps}
                    lightboxProps={this.props.lightboxProps}
                    isCustomViewBottom={this.props.isCustomViewBottom}
                    renderCustomView={this.props.renderCustomView}
                    renderDay={this.props.renderDay}
                    renderTime={this.props.renderTime}
                    renderFooter={this.props.renderFooter}
                    renderChatFooter={this.props.renderChatFooter}
                    renderInputToolbar={this.props.renderInputToolbar}
                    renderComposer={this.props.renderComposer}
                    renderActions={this.props.renderActions}
                    renderSend={this.props.renderSend}
                    renderAccessory={this.props.renderAccessory}
                    onPressActionButton={this.props.onPressActionButton}
                    bottomOffset={this.props.bottomOffset}
                    minInputToolbarHeight={this.props.minInputToolbarHeight}
                    listViewProps={this.props.listViewProps}
                    textInputProps={this.props.textInputProps}
                    keyboardShouldPersistTaps={this.props.keyboardShouldPersistTaps}
                    onInputTextChanged={this.props.onInputTextChanged}
                    maxInputLength={this.props.maxInputLength}
                    parsePatterns={this.props.parsePatterns}
                    extraData={this.props.extraData}
                    minComposerHeight={this.props.minComposerHeight}
                    maxComposerHeight={this.props.maxComposerHeight}
                    scrollToBottom={this.props.scrollToBottom}
                    scrollToBottomComponent={this.props.scrollToBottomComponent}
                    scrollToBottomOffset={this.props.scrollToBottomOffset}
                    scrollToBottomStyle={this.props.scrollToBottomStyle}
                    alignTop={this.props.alignTop}
                    /* onQuickReply={this.props.onQuickReply}
                    renderQuickReplies={this.props.renderQuickReplies}
                    quickReplyStyle={this.props.quickReplyStyle}
                    renderQuickReplySend={this.props.renderQuickReplySend} */
                    shouldUpdateMessage={this.props.shouldUpdateMessage}

                />
            </View>

        );
    }

    componentWillUnmount() {
        this.closeChat()
            .then(() => console.log(this.TAG, 'Chat closed'))
            .catch(error => console.log(this.TAG, error));
    }
}