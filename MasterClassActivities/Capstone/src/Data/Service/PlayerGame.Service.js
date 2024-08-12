import Player from '../../Business/Models/Player.Model.js'
import PlayerGame from '../../Business/Models/PlayerGame.Model.js'
import playerGame from '../../Business/Models/PlayerGame.Model.js'


export class playerGameService{
    
    static async createPlayerGame(data){
        return await playerGame.create(data)
    }

    static async findOnePlayerGame(playerId,gameId){
        return await playerGame.findOne({
            attributes:{
                exclude:['updatedAt']
            },
            where:{
                playerId:playerId,
                gameId:gameId
            }
        })
    }

    static async findAllPlayerGame(){
        return await PlayerGame.findAll()
    }

    static async DeleteGamePlayer(playerId,gameId){
        return await playerGame.destroy({
            where:{
                player_Id:playerId,
                game_Id:gameId
            }
        })
    }

    static async findPlayersByGameId(gameId) {
        return await PlayerGame.findAll({
            where: {
                gameId: gameId
            },
            include: [{
                model: Player, 
                attributes: ['id', 'username', 'email'] 
            }]
        });
    }
}