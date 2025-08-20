import { Injectable } from "@nestjs/common";
import { user } from "src/data";
import { userDTO } from "src/dto/dto";

@Injectable()
export class UserRepository{
    private user = user;

    getAll() : userDTO[]{
        return this.user
    }

    getUserById(id: string) : userDTO | undefined {
        return this.user.find(u => u.userId == id)
    }
}