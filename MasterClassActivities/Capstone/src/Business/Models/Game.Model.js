import { DataTypes } from "sequelize";
import { sequelize } from "../../Data/Database/Connection.js";



const Game = sequelize.define('games',{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.INTEGER,
        allowNull:false
    },
    title:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    status:{
        type:DataTypes.ENUM('active', 'inactive'),
        allowNull:false,
        defaultValue:"active"
    },
    maxPlayers:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    rules:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    playerId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        field:'player_id'
    }

})

export default Game;