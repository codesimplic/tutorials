import { rest } from 'msw'

const contacts = [
    {
        id: 2,
        name: "Oliver",
        image: "photo3.jpeg",
        numberOfUnreadMessages: 10,
        isActive: true,
        lastActiveDate: '1 min ago',
    },
];


const users = [
    {
        id: 1,
        name: "Olivia",
        image: "photo2.jpeg",
        numberOfUnreadMessages: 10,
        isActive: true,
        lastActiveDate: '1 min ago',
        email: 'olivia@codesimplic.io',
        password: 'pass'
    },
    {
        id: 2,
        name: "Oliver",
        image: "photo3.jpeg",
        numberOfUnreadMessages: 10,
        isActive: true,
        lastActiveDate: '1 min ago',
        email: 'oliver@codesimplic.io',
        password: 'pass'
    },
    {
        id: 3,
        name: "Mia",
        image: "photo4.jpeg",
        numberOfUnreadMessages: null,
        isActive: true,
        lastActiveDate: '10 min ago',
        email: 'mia@codesimplic.io',
        password: 'pass'
    },
    {
        id: 4,
        name: "Sophia",
        image: "photo5.jpeg",
        numberOfUnreadMessages: 17,
        isActive: false,
        lastActiveDate: '5 min ago',
        email: 'sophia@codesimplic.io',
        password: 'pass'
    }
];


const messages = [
    {
        creationTime: "17 days ago",
        text: "Hi! How are you?",
        users: [1, 2],
        userId: 1,
        contactId: 2
    },
    {
        creationTime: "16 days ago",
        image: "p1.jpg",
        users: [1, 2],
        userId: 2,
        contactId: 1
    },
    {
        creationTime: "16 days ago",
        text: "Hi! I'm ok. And you?",
        users: [1, 2],
        userId: 2,
        contactId: 1
    },
    {
        creationTime: "16 days ago",
        text: "I started learning programming. There few cool YouTube Channels I am following.",
        users: [1, 2],
        userId: 1,
        contactId: 2
    },
    {
        creationTime: "16 days ago",
        text: "For example?",
        users: [1, 2],
        userId: 2,
        contactId: 1
    },
    {
        creationTime: "16 days ago",
        text: "For example CodeSimplic",
        users: [1, 2],
        userId: 1,
        contactId: 2
    },
    {
        creationTime: "16 days ago",
        image: "p1.jpg",
        users: [1,4 ],
        userId: 1,
        contactId: 4
    },
    {
        creationTime: "16 days ago",
        text: "How do you like it?",
        users: [1, 4],
        userId: 4,
        contactId: 1
    },
    {
        creationTime: "16 days ago",
        text: "Looks great! Here is from my phone.",
        users: [1, 4],
        userId: 4,
        contactId: 1
    },
    {
        creationTime: "16 days ago",
        image: "p2.jpg",
        users: [1, 4],
        userId: 4,
        contactId: 1
    },
]

const loggedInUser = {
    id: 1,
    name: "olivia",
    image: "photo2.jpeg",
    numberOfUnreadMessages: 10,
    isActive: true,
    lastActiveDate: '1 min ago'
};

export const handlers = [
  rest.get('/contacts', (req, res, ctx) => {
    return res(
      ctx.json(contacts)
    )
  }),
  rest.get('/messages', (req, res, ctx) => {
    const searchParams = req.url.searchParams;

    const selectedContactId = parseInt(searchParams.get('selectedContactId'));
    const loggedInUserId = parseInt(searchParams.get('loggedInUserId'));

    const filteredMessages = messages.filter(message => {
        return message.users.includes(loggedInUserId) &&
        message.users.includes(selectedContactId);
    })

    return res(
      ctx.json(filteredMessages)
    )
  }),

  rest.get('/logged-in-user', (req, res, ctx) => {
    return res(
      ctx.json(loggedInUser)
    )
  }),

  rest.post('/api/login', (req, res, ctx) => {
    const {email, password} = req.body;

    const user = users.find(user => user.email === email && 
        user.password === password
    );

    if (user) {
        return res(
            ctx.json({isLoggedIn: true} )
        )
    }

    return res(
        ctx.status(401),
        ctx.json({isLoggedIn: false, error: 'Wrong username or password!'})
    )
  }),

  rest.post('/api/register', (req, res, ctx) => {
    const {email, password} = req.body;

    const user = users.find(user => user.email === email && 
        user.password === password
    );

    if (user) {
        return res(
            ctx.status(400),
            ctx.json({error: 'User already exists!'} )
        )
    }

    users.push({email, password});

    return res(
        ctx.json({isLoggedIn: true})
    )
  }),

  rest.post('/api/text-message', (req, res, ctx) => {
    const {userId, contactId, message} = req.body;

    const createdMessage = {
        creationTime: "16 days ago",
        text: message,
        userId,
        contactId,
        users: [userId, contactId]
    };

    messages.push(createdMessage);

    return res(
        ctx.json(createdMessage)
    )
  }),
  rest.post('/api/image-message', (req, res, ctx) => {
    const {userId, contactId, file} = req.body;

    const createdMessage = {
        creationTime: "16 days ago",
        image: "p2.jpg",
        userId: parseInt(userId),
        contactId: parseInt(userId),
        users: [userId, contactId]
    };

    messages.push(createdMessage);

    return res(
        ctx.json(createdMessage)
    )
  }),
  rest.post('/api/search-users', (req, res, ctx) => {
    const {term} = req.body;

    let foundUsers = users.filter(user => user.name.toLowerCase().includes(term) && user.id !== loggedInUser.id);
    foundUsers = foundUsers.filter((user) => {
        return contacts.find(contact => contact.id !== user.id)
    })

    return res(
        ctx.json({users: foundUsers})
    )
  }),
  rest.post('/api/add-user-to-contacts', (req, res, ctx) => {
    const {userId, contactId} = req.body;

    let foundUser = users.find(user => user.id === contactId);
    contacts.push(foundUser);

    return res(
        ctx.json({contacts: contacts})
    )
  }),
] 
