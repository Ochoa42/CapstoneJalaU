import Juego from "./Juego.model.js";

export class GameService{

    static async findGame(id){
        return await Juego.findOne({
            attributes:{
                exclude:[
                    'createdAt',
                    'updatedAt',
                ]
            },
            where: {
                id:id
            }
        })
    }

    static async findAllGames(){
        return await Juego.findAll({
            attributes:{
                exclude:[
                    'createdAt',
                    'updatedAt',
                ]
            }
        })
    }

    static async createGame(data) {
        return await Juego.create(data)
    }

    static async updateGame(juego,data){
        return await juego.update(data)
    }

    static async deleteGame(id){
        const juego = await Juego.findByPk(id);
        if (juego) {
          await juego.destroy();
          return juego;
        }
        return null;
    }
}