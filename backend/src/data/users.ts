import { userDTO } from "src/dto/dto";

let user : userDTO[] = [
  {
    "userId": "user1",
    "name": "Alice",
    "type": "ADMIN",
    "clientId": "client1"
  },
  {
    "userId": "user2",
    "name": "Bob",
    "type": "NORMAL",
    "clientId": "client1"
  },
  {
    "userId": "user3",
    "name": "Charlie",
    "type": "NORMAL",
    "clientId": "client2"
  }
]

export default user;