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

export const createTextMessage = async ({message, userId, contactId}) => {
    const data = {message, userId, contactId};

    const url = 'http://localhost:3000/api/text-message';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    const response = await fetch(url, options);
    const decodedResponse = await response.json();

    return decodedResponse;
}

export const createImageMessage = async ({file, userId, contactId}) => {
  const formData = new FormData();

  formData.append(
    "file",
    file,
    file.name
  );
  formData.append('userId', userId)
  formData.append('contactId', contactId)

  const url = 'http://localhost:3000/api/image-message';
  const options = {
    method: 'POST',
    body: formData
  }

  const response = await fetch(url, options);
  const decodedResponse = await response.json();

  return decodedResponse;
}

export const login = async(email, password) => {
  const data = {email, password};

  const url = 'http://localhost:3000/api/login';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }

  const response = await fetch(url, options);
  const decodedResponse = await response.json();

  return {response, decodedResponse};
}

export const searchUsersApi = async(term) => {
  const data = {term};

  const url = 'http://localhost:3000/api/search-users';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }

  const response = await fetch(url, options);
  const decodedResponse = await response.json();

  return {response, decodedResponse};
}

export const addUserToContacts = async (contact, loggedInUser) => {
  const data = {userId: loggedInUser.id, contactId: contact.id};

  const url = 'http://localhost:3000/api/add-user-to-contacts';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }

  const response = await fetch(url, options);
  const decodedResponse = await response.json();

  return {response, decodedResponse};
}