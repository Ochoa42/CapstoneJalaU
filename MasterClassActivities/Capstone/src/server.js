import App from "./App.js"
import { envs } from "./config/enviroments/enviroments.js"
import { authenticated, syncUp } from "./Data/Database/Connection.js"
import { initModel } from "./Data/Database/initModel.js";

import Card from "./Business/Models/Card.Model.js";
import Game from "./Business/Models/Game.Model.js";
import Player from "./Business/Models/Player.Model.js";
import Score from "./Business/Models/Score.Model.js";
import PlayerGame from "./Business/Models/PlayerGame.Model.js";



async function main(){
    try{
        await authenticated();
        initModel()
        await syncUp();
        
        App.listen(envs.PORT,()=>{
        console.log(`Server Runing on Port ${envs.PORT}`)
        })  
    }catch(error){
        console.error("Error in main function:", error);
    }
}

main();