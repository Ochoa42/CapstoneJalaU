import Card from "../../Business/Models/Card.Model.js"
import Game from "../../Business/Models/Game.Model.js"
import Player from "../../Business/Models/Player.Model.js"
import Score from "../../Business/Models/Score.Model.js"


export const initModel =()=>{
    // relacion de uno a muchos entre game y card (un game tiene muchos card)
    Game.hasMany(Card)
    Card.belongsTo(Game,{foreignKey:'gameId',targetKey:'id'})

    // relacion de uno a muchos con las tablas player , game y escore
    // player tiene muchos scores
    // game tiene muchos scores
    Player.hasMany(Score)
    Game.hasMany(Score)

    Score.belongsTo(Player,{foreignKey:'playerId',targetKey:'id'})
    Score.belongsTo(Game,{foreignKey:'gameId',targetKey:'id'})
}