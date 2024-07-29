import Player from "../../Business/Models/Player.Model.js";

export class PlayerService{
    
    static async findOnePlayer(id){
        return await Player.findOne({
            attributes:{
                exclude:['updatedAt']
            },
            where:{
                id:id
            }
        })
    }

    static async findOnePlayerRegister(username){
        return await Player.findOne({
            where:{
                username:username
            }
        })
    }

    static async findOneLogin(username,password){
        return await Player.findOne({
            where:{
                username:username,
                password:password
            }
        })
    }

    static async findAllPlayers(){
        return await Player.findAll()
    }

    static async updatePlayer(data,player){
        return await player.update(data)
    }

    static async CreatePlayer(data){
        return await Player.create(data)
    }

    static async deletePlayer(id){
        const player = await Player.findByPk(id);
        if(player){
            await player.destroy();
            return player;
        }
        return null;
    }
}