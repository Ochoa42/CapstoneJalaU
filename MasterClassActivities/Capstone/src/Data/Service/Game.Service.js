import Game from "../../Business/Models/Game.Model.js";
import PlayerGame from "../../Business/Models/PlayerGame.Model.js";

export class GameService{
    
    static async findOneGame(id){
        return await Game.findOne({
            attributes:{
                exclude:['updatedAt']
            },
            where:{
                id:id
            }
        })
    }
    static async findAllGames(){
        return await Game.findAll()
    }

    static async updateGame(data,game){
        return await game.update(data)
    }

    static async CreateGame(data){
        return await Game.create(data)
    }

    static async deleteGame(id){
        const game = await Game.findByPk(id);
        if(game){
            await game.destroy();
            return game;
        }
        return null;
    }

    static async startGame(gameId, playerId) {
        const game = await Game.findByPk(gameId);
        if (!game) {
            throw new Error("Game not found");
        }
        if (game.playerId !== playerId) {
            throw new Error("Player is not the creator of the game");
        }
        const players = await PlayerGame.findAll({ where: { gameId } });
        const allReady = players.every(player => player.is_Ready);
        if (!allReady) {
            throw new Error("Not all players are ready");
        }
        game.status = 'active';
        await game.save();
        return game;
    }
}