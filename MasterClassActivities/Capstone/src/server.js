import App from "./App.js"
import { envs } from "./config/enviroments/enviroments.js"
import { authenticated, syncUp } from "./Data/Database/Connection.js"
import Card from "./Business/Models/Card.Model.js";
import Game from "./Business/Models/Game.Model.js";
import Player from "./Business/Models/Player.Model.js";
import Score from "./Business/Models/Score.Model.js";
import { initModel } from "./Data/Database/initModel.js";


async function main(){
    try{
        await authenticated();
        initModel()
        await syncUp();
        
        App.listen(envs.PORT,()=>{
        console.log(`Server Runing on Port ${envs.PORT}`)
      })  
    }catch(error){
        console.log(error)
    }
}

main();