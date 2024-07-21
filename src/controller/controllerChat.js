import fs from "fs"

class controllerChat {
    constructor (path){
        this.path = path
    }
    async getChat(){
        const chat = JSON.parse(
            await fs.promises.readFile(this.path, "utf-8")
          );
          return chat;
    }
    async addChat (data){
        const chat =  await this.getChat()
        chat.push(data)
      const chatActualized = JSON.stringify(chat,null, " ")
      await fs.promises.writeFile(this.path,chatActualized)
    }
    
}
export {controllerChat} 