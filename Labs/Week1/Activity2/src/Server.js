import App from "./App.js";
import { envs } from "./config/enviroments/enviroments.js";


App.listen(envs.PORT, ()=>{
    console.log(`Server Running on Port ${envs.PORT}`)
})