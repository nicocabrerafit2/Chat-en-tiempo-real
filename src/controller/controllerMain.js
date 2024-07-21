import fs from "fs"

class controllerMain {
    constructor (path){
        this.path = path
    }
    async getUsers(){
        const users = JSON.parse(
            await fs.promises.readFile(this.path, "utf-8")
          );
          return users;
    }
    async addUser (newUser){
        const users =  await this.getUsers()
      users.push(newUser)
      const userList = JSON.stringify(users,null, " ")
      await fs.promises.writeFile(this.path,userList)
    }
    
}
export {controllerMain} 