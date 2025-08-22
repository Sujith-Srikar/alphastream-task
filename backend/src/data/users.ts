import { userDTO, UserType } from "../models/dto";

let user : userDTO[] = [
  {
    "userId": "user1",
    "name": "Alice",
    "type": UserType.ADMIN,
    "clientId": "client1"
  },
  {
    "userId": "user2",
    "name": "Bob",
    "type": UserType.NORMAL,
    "clientId": "client1"
  },
  {
    "userId": "user3",
    "name": "Charlie",
    "type": UserType.NORMAL,
    "clientId": "client2"
  }
]

export default user;