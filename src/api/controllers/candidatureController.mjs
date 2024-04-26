import {candidatureService} from "../services/candidatureService.mjs"

export class candidatureController{
    static async new(req,res){
        candidatureService.new(req.body)
    }
}