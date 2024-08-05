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
}