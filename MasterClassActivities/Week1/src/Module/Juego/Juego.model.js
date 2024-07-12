import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database/database.js";

const Juego =  sequelize.define("Juegos",{
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull:false
    },
    name: {
        type: DataTypes.STRING(60),
        allowNull:false
    },
    description:{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    genre: {
        type:DataTypes.ENUM('Adventure','Racing'),
        allowNull:false,
    },
    platform:{
        type: DataTypes.ENUM('Mobile','PC'),
        allowNull:false
    }
});


export default Juego;