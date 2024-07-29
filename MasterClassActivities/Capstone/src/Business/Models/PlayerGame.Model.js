import { DataTypes } from "sequelize";
import { sequelize } from "../../Data/Database/Connection.js";

const PlayerGame = sequelize.define("playersGames",{
    id:{
        primaryKey:true,
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false
    },
    is_Ready:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true
    },
    playerId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        field:'player_Id'
    },
    gameId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        field:'game_Id'
    }
    
})

export default PlayerGame;