import { getManager } from "typeorm";
import { User } from "../entity/User";

export async function checkUserAllowed(userId: Number) {
    const userRepo = getManager().getRepository(User);
    const user = await userRepo.findOne({
        where: {
            id : userId
        }
    });

    return user ? user.role.includes("professor") : false
}