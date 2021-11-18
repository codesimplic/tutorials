import { useEffect, useRef, useState } from 'react';
import './App.css';
import ActiveChatContact from './components/ActiveChatContact/ActiveChatContact';
import Contact from './components/Contact/Contact';
import LogutButton from './components/LogoutButton/LogoutButton';
import Message from './components/Message/Message';
import SendMessage from './components/SendMessage/SendMessage';
import UserAvatar from './components/UserAvatar/UserAvatar';
import { createTextMessage, fetchContacts, fetchLoggedInUser, fetchMessages } from './endpoints';


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

    useEffect(() => {
        (async () => {
            setContacts(await fetchContacts());
            setLoggedInUser(await fetchLoggedInUser());
            displayMessages(selectedContact);
        })()
    }, []);

    const displayMessages = async (contact) => {
        setSelectedContact(contact);

        let responseMessages = await fetchMessages({selectedContact: contact, loggedInUser});

        setMessages(enrichMessage(responseMessages, loggedInUser, contact));
    }

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

    return (
      <>
        <div className="navigation-panel">
            <LogutButton />
            <UserAvatar 
                {...loggedInUser}
            />
            {contacts.map(contact => 
                <Contact 
                    onContactSelected={() => displayMessages(contact)}
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
                            />
                        </div>
                    </> : <span className="start-conversation-text">Select a contact to start a conversation...</span>
            }
        </div>
      </>
  );
}

export default App;
