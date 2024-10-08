import { Sequelize } from "sequelize";
import { envs } from "../enviroments/enviroments.js";

export const sequelize = new Sequelize(envs.DB_URL,{
    dialect:'mysql',
    logging:console.log,
    define:{
        timestamps:false,
        freezeTableName:true
    }
})

export const authenticated = async() =>{
    try{
        await sequelize.authenticate()
        console.log('Connection has been sucessfull.')
    }catch(error){
        console.log(error)
    }
}


export const syncUp = async()=>{
 try{
    await sequelize.sync({/*force:true*/});
    console.log('Synced has been sucessfull')
 }catch(error){
    console.log(error)
 } 
}