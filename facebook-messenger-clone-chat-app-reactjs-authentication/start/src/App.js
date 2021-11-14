import { useEffect, useState } from 'react';
import './App.css';
import ActiveChatContact from './components/ActiveChatContact/ActiveChatContact';
import Contact from './components/Contact/Contact';
import LogutButton from './components/LogoutButton/LogoutButton';
import Message from './components/Message/Message';
import SendMessage from './components/SendMessage/SendMessage';
import UserAvatar from './components/UserAvatar/UserAvatar';
import { fetchContacts, fetchLoggedInUser, fetchMessages } from './endpoints';

function App() {
    const [contacts, setContacts] = useState([]);
    const [messages, setMessages] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [selectedContact, setSelectedContact] = useState(null);

    useEffect(() => {
        (async () => {
            setContacts(await fetchContacts());
            setLoggedInUser(await fetchLoggedInUser());
        })()
    }, []);

    const displayMessages = async (contact) => {
        setSelectedContact(contact);

        let responseMessages = await fetchMessages({selectedContact: contact, loggedInUser});

        responseMessages = responseMessages.map(message => {
            const doesMessageBelongToLoggedInUser = message.userId === loggedInUser.id
            message.isOnTheRightSide = doesMessageBelongToLoggedInUser;

            message.avatar = doesMessageBelongToLoggedInUser ? 
                loggedInUser.image : contact.image;

            return message;
        })

        setMessages(responseMessages);
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
                            <div className="chat-messages">
                                {messages.map(message => <Message {...message} />)}
                            </div>
                        </div>

                        <div>
                            <SendMessage />
                        </div>
                    </> : <span className="start-conversation-text">Select a contact to start a conversation...</span>
            }
        </div>
      </>
  );
}

export default App;
