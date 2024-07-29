import { Sequelize } from "sequelize";
import { envs } from "../../config/enviroments/enviroments.js";

export const sequelize = new Sequelize(envs.DB_URL,{
    dialect:'mysql',
    logging:false,
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
        console.log(error)
    }
};

export const syncUp = async()=>{
    try{
        await sequelize.sync({
            /*force:true*/
        });
        console.log("Synced has been Successfull")
    }catch(error){
        console.log(error)
    }
}