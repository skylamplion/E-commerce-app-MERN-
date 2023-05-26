const bcrypt = require('bcryptjs')
const users=[
    {
        name:'admin',
        email:'admin@gmail.com',
        password:bcrypt.hashSync('123456',11),
        isAdmin:true
    },

    {
        name:'previous',
        email:'preyea@gmail.com',
        password:bcrypt.hashSync('123456',10)
    },

    {
        name:'user',
        email:'real@gmail.com',
        password:bcrypt.hashSync('123456',10)
    },
    {
        name:'ughser',
        email:'rgregeal@gmail.com',
        password:bcrypt.hashSync('123456',10)
    }
]

module.exports = users;