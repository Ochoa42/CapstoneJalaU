import Card from "../../Business/Models/Card.Model.js"
import Game from "../../Business/Models/Game.Model.js"
import Player from "../../Business/Models/Player.Model.js"
import PlayerGame from "../../Business/Models/PlayerGame.Model.js"
import Score from "../../Business/Models/Score.Model.js"


export const initModel =()=>{
    // relacion de uno a muchos entre game y card (un game tiene muchos card)

    // relacion de uno a muchos con las tablas player , game y escore
    // player tiene muchos scores
    // game tiene muchos scores
    // Relación de muchos a muchos entre player y game usando la tabla intermedia PlayerGame
    Player.belongsToMany(Game, { through: PlayerGame, foreignKey: 'playerId', onDelete: 'CASCADE' });
    Game.belongsToMany(Player, { through: PlayerGame, foreignKey: 'gameId', onDelete: 'CASCADE' });

    // Relación de uno a muchos con las tablas player, game y score
    Player.hasMany(Score);
    Game.hasMany(Score);

    // Relación de uno a muchos entre game y card
    Game.hasMany(Card);

    // Relación para reflejar quién creó el juego
    Game.belongsTo(Player, { foreignKey: 'playerId', targetKey:'id', onDelete: 'CASCADE' });

    // Relaciones inversas
    Score.belongsTo(Player, { foreignKey: 'playerId', targetKey: 'id', onDelete: 'CASCADE' });
    Score.belongsTo(Game, { foreignKey: 'gameId', targetKey: 'id', onDelete: 'CASCADE' });
    Card.belongsTo(Game, { foreignKey: 'gameId', targetKey: 'id', onDelete: 'CASCADE' });
    
}