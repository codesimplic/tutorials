import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import ActiveChatContact from './../ActiveChatContact/ActiveChatContact';
import Contact from './../Contact/Contact';
import LogutButton from './../LogoutButton/LogoutButton';
import Message from './../Message/Message';
import SendMessage from './../SendMessage/SendMessage';
import UserAvatar from './../UserAvatar/UserAvatar';
import { addUserToContacts, createImageMessage, createTextMessage, fetchContacts, fetchLoggedInUser, fetchMessages, searchUsersApi } from './../../endpoints';
import Search from '../Search/Search';
import { setupWorker } from 'msw';


const enrichMessage = (responseMessages, loggedInUser, contact) => {
    return responseMessages.map(message => {
        const doesMessageBelongToLoggedInUser = message.userId === loggedInUser.id
        message.isOnTheRightSide = doesMessageBelongToLoggedInUser;

        message.avatar = doesMessageBelongToLoggedInUser ? 
            loggedInUser.image : contact.image;

        return message;
    })
}

function App() {
    const chatContainer = useRef();
    const [contacts, setContacts] = useState([]);
    const [messages, setMessages] = useState([]);
    const [searchContactsValue, setSearchContactsValue] = useState([]);
    const [foundUsers, setFoundUsers] = useState([]);
    
    const [message, setMessage] = useState('Hi! How are you?');
    
    const [loggedInUser, setLoggedInUser] = useState({
        id: 1,
        image: 'photo2.jpeg'
    });
    const [selectedContact, setSelectedContact] = useState({
        id: 2,
        image: "photo3.jpeg",
        isActive: true,
        lastActiveDate: "1 min ago",
        name: "Oliver Williams",
        numberOfUnreadMessages: 10
    });

    const displayMessages = useCallback(async (contact, loggedInUser) => {
        
        console.log({displayMessages: contact, loggedInUser});
        setSelectedContact(contact);
        setFoundUsers([]);

        let responseMessages = await fetchMessages({selectedContact: contact, loggedInUser});

        setMessages(enrichMessage(responseMessages, loggedInUser, contact));
    }, []);

    useEffect(() => {
        (async () => {
            setContacts(await fetchContacts());
            setLoggedInUser(await fetchLoggedInUser());
            displayMessages(selectedContact, loggedInUser);
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmitTextMessage = async () => {
        const messageRespone = await createTextMessage({
            message,
            userId: loggedInUser.id,
            contactId: selectedContact.id
        });

        const messagesCloned = [...messages];
        messagesCloned.push(messageRespone);

        setMessages(enrichMessage(messagesCloned, loggedInUser, selectedContact));
        scrollToTheLastMessage();
    }

    const onSubmitImageMessage = async (event) => {
        const file = event.target.files[0];

        if (!file) return;

        const messageRespone = await createImageMessage({
            file,
            userId: loggedInUser.id,
            contactId: selectedContact.id
        });

        const messagesCloned = [...messages];
        messagesCloned.push(messageRespone);

        setMessages(enrichMessage(messagesCloned, loggedInUser, selectedContact));
        scrollToTheLastMessage();
    }

    const scrollToTheLastMessage = () => {
        const top = 
            chatContainer.current.scrollHeight - 
            chatContainer.current.clientHeight;

        chatContainer.current.scrollTo({
            left: 0,
            top,
            behavior: "smooth"
        });
    }

    const searchUsers = async (event) => {
        setFoundUsers([])
        const value = event.target.value
        setSearchContactsValue(value)

        if (!value) {
            return
        }

        const {decodedResponse} = await searchUsersApi(value)
        setFoundUsers(decodedResponse.users);
    }

    const startConversation = async (contact) => {
        const {decodedResponse} = await addUserToContacts(contact, loggedInUser);
        setFoundUsers([]);
        setContacts(decodedResponse.contacts);
        await displayMessages(contact, loggedInUser);
    }

    return (
      <>
        <div className="navigation-panel">
            <LogutButton />
            <UserAvatar 
                {...loggedInUser}
            />
            <Search 
                searchContactsValue={searchContactsValue} 
                searchUsers={searchUsers}
            />
            {foundUsers.length > 0 && <b className="search-results-header">Found users...</b>}
            {foundUsers.map(contact => 
                <Contact 
                    onContactSelected={async () => await startConversation(contact)}
                    {...contact} 
                />
            )}
            {foundUsers.length === 0 && contacts.map(contact => 
                <Contact 
                    onContactSelected={() => displayMessages(contact, loggedInUser)}
                    {...contact} 
                />
            )}
        </div>
        <div className="chat-panel">
            {
                selectedContact ?
                    <>
                        <div>
                            <div className="chat-header">
                                <ActiveChatContact 
                                    {...selectedContact}
                                />
                            </div>
                        </div>
 
                        <div className="chat">
                            <div className="chat-messages" ref={chatContainer}>
                                {messages.map(message => <Message {...message} />)}
                            </div>
                        </div>

                        <div>
                            <SendMessage 
                                message={message}
                                setMessage={setMessage}
                                onSubmitTextMessage={async () => await onSubmitTextMessage()}
                                onSubmitImageMessage={async (event) => await onSubmitImageMessage(event)}
                        
                            />
                        </div>
                    </> : <span className="start-conversation-text">Select a contact to start a conversation...</span>
            }
        </div>
      </>
  );
}

export default App;
