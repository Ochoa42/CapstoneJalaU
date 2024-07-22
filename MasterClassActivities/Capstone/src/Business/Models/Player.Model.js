import { DataTypes } from "sequelize";
import { sequelize } from "../../Data/Database/Connection.js";

const Player = sequelize.define("players",{
    id:{
        primaryKey:true,
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING(40),
        allowNull:false
    },
    age:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

export default Player;