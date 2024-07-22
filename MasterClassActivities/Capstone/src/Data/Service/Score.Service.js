import Score from "../../Business/Models/Score.Model.js";

export class ScoreService{
    
    static async findOneScore(id){
        return await Score.findOne({
            attributes:{
                exclude:['updatedAt']
            },
            where:{
                id:id
            }
        })
    }
    static async findAllScores(){
        return await Score.findAll()
    }

    static async updateScore(data,score){
        return await score.update(data)
    }

    static async CreateScore(data){
        return await Score.create(data)
    }

    static async deleteScore(id){
        const score = await Score.findByPk(id);
        if(score){
            await score.destroy();
            return score;
        }
        return null;
    }
}