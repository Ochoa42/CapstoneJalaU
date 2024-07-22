import { DataTypes } from "sequelize";
import { sequelize } from "../../Data/Database/Connection.js";



const Card = sequelize.define("cards",{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    color:{
        type:DataTypes.STRING(30),
        allowNull:false
    },
    value:{
        type:DataTypes.STRING(30),
        allowNull:false
    },
    gameId:{
        type:DataTypes.INTEGER,
        field:'game_id',
        allowNull:false
    }
})

export default Card;