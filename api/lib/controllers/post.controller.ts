import { checkPostCount } from '../middlewares/checkPostCount.middleware';
import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router, response } from 'express';
import DataService from '../modules/services/data.service';

let testArr = [4,5,6,3,5,3,7,5,13,5,6,4,3,6,3,6];

class PostController implements Controller {
    public path = '/api/data';
    public router = Router();
    public dataService = new DataService();

   constructor() {
       this.initializeRoutes();

   }

   private initializeRoutes() {

        this.router.get(`${this.path}/:id`, this.getElementById);
        this.router.get(`${this.path}/`, this.getData);

        this.router.post(`${this.path}/add`, this.addData);

        this.router.delete(`${this.path}/:id`, this.removePost);
        this.router.delete(`${this.path}/`, this.removeAllPosts);
   }

    private addData = async (request: Request, response: Response, next: NextFunction) => {
        const {title, text, image} = request.body;
    
        const readingData = {
            title,
            text,
            image
        };
    
        try {
            await this.dataService.createPost(readingData);
            response.status(200).json(readingData);
        } catch (error) {
            console.log('eeee', error)
    
            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({error: 'Invalid input data.'});
        }
    }

    private getElementById = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const allData = await this.dataService.query({_id: id});
        response.status(200).json(allData);
     }

    private getData = async (request: Request, response: Response, next: NextFunction) => {
        const data = await this.dataService.fetchPosts();
        response.status(200).json(data);
    }
     
     private removePost = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        await this.dataService.deleteData({_id: id});
        response.sendStatus(200);
     };

    private removeAllPosts = async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    await this.dataService.deleteAllPosts();
    response.sendStatus(200);
    };
     

}

export default PostController;