import Card from "../../Business/Models/Card.Model.js";

export class CardService{
    
    static async findOneCard(id){
        return await Card.findOne({
            attributes:{
                exclude:['updatedAt']
            },
            where:{
                id:id
            }
        })
    }
    static async findAllCards(){
        return await Card.findAll()
    }

    static async updateCard(data,card){
        return await card.update(data)
    }

    static async CreateCard(data){
        return await Card.create(data)
    }

    static async deleteCard(id){
        const card = await Card.findByPk(id);
        if(card){
            await card.destroy();
            return card;
        }
        return null;
    }
}