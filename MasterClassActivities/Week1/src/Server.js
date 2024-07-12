import App from "./App.js";
import { authenticated, syncUp } from "./config/database/database.js";
import { envs } from "./config/enviroments/enviroments.js";
import Juego from "./Module/Juego/Juego.model.js";

async function main(){
    try{
        await authenticated();
        await syncUp();

        App.listen(envs.PORT,()=>{
            console.log(`Server Running on Port ${envs.PORT}`)
        })
        
    }catch(error){
        console.log(error)
    }
}

main();
