import bcrypt from 'bcryptjs'; 

const users = [
  {
    name: "admin",
    email: "satyamkumar2302@gmail.com",
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true
  },
  {
    name: "John Doe",
    email: "johndoe@example.com",
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: "Jane Doe",
    email: "janedoe@example.com",
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users;
