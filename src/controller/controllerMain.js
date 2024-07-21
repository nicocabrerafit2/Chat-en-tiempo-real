import fs from "fs"

class controller {
    constructor (path){
        this.path = path
    }
    async getUsers(){
        const users = JSON.parse(
            await fs.promises.readFile(this.path, "utf-8")
          );
          return users;
    }

   


}
export {controller} 