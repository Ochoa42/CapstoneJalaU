import Card from "../../Business/Models/Card.Model.js"
import Game from "../../Business/Models/Game.Model.js"
import Player from "../../Business/Models/Player.Model.js"
import PlayerGame from "../../Business/Models/PlayerGame.Model.js"
import Score from "../../Business/Models/Score.Model.js"


export const initModel =()=>{
    // Asociación de muchos a muchos entre Player y Game a través de PlayerGame
    Player.belongsToMany(Game, { through: PlayerGame, foreignKey: 'playerId', onDelete: 'CASCADE' });
    Game.belongsToMany(Player, { through: PlayerGame, foreignKey: 'gameId', onDelete: 'CASCADE' });

    // Asociación de uno a muchos entre Player y Score
    Player.hasMany(Score, { foreignKey: 'playerId', onDelete: 'CASCADE' });
    Score.belongsTo(Player, { foreignKey: 'playerId', onDelete: 'CASCADE' });

    // Asociación de uno a muchos entre Game y Score
    Game.hasMany(Score, { foreignKey: 'gameId', onDelete: 'CASCADE' });
    Score.belongsTo(Game, { foreignKey: 'gameId', onDelete: 'CASCADE' });

    // Asociación de uno a muchos entre Game y Card
    Game.hasMany(Card, { foreignKey: 'gameId', onDelete: 'CASCADE' });
    Card.belongsTo(Game, { foreignKey: 'gameId', onDelete: 'CASCADE' });

    // Asociación de uno a muchos entre Player y Game
    PlayerGame.belongsTo(Player, { foreignKey: 'playerId', onDelete: 'CASCADE' });
    PlayerGame.belongsTo(Game, { foreignKey: 'gameId', onDelete: 'CASCADE' });
}