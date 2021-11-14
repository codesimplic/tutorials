export const fetchContacts = async () => {
    const url = 'http://localhost:3000/contacts';
    const response = await fetch(url);
    
    return await response.json();
}

export const fetchMessages = async ({selectedContact, loggedInUser}) => {
    const url = `http://localhost:3000/messages?selectedContactId=${selectedContact.id}&loggedInUserId=${loggedInUser.id}`;
    const response = await fetch(url);
    
    return await response.json();
}

export const fetchLoggedInUser = async () => {
    const url = 'http://localhost:3000/logged-in-user';
    const response = await fetch(url);
    
    return await response.json();
}
