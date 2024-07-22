import { DataTypes } from "sequelize";
import { sequelize } from "../../Data/Database/Connection.js";


const Score = sequelize.define("scores",{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.INTEGER,
        allowNull:false
    },
    playerId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        field:"player_id"
    },
    gameId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        field:"game_id"
    },
    score:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
})

export default Score;