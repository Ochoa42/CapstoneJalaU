import { Sequelize } from "sequelize";
import { envs } from "../../config/enviroments/enviroments.js";

export const sequelize = new Sequelize(envs.DB_URL,{
    dialect:'mysql',
    logging: console.log,
    define:{
        timestamps:false,
        freezeTableName:true
    }
});

export const authenticated = async()=>{
    try{
        await sequelize.authenticate()
        console.log("Connection has been successfull")
    }catch(error){
        console.error("Unable to connect to the database:", error);
    }
};

export const syncUp = async()=>{
    try{
        await sequelize.sync({
            /*force:true*/
            alter:true
        });
        console.log("Sync has been successful");
        console.log("Synced has been Successfull")
    }catch(error){
        console.error("Unable to sync the database:", error);
    }
}