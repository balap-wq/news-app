import {findTopHeadlines} from '../repositories/articleRepository.js';

export async function getHeadlines (req,res){
    try{

        const {limit,offset,category} = req.query;

        const headlines = await findTopHeadlines({
            limit: limit?parseInt(limit) : 10,
            offset: offset ? parseInt(offset) : 0,
            category,
        });

        res.status(200).json({
            success:true,
            data: headlines,
        });
    } catch(error){
        res.status(500).json({
            success:false,
        message:"failed to fetch data",
        });
        
    }
}