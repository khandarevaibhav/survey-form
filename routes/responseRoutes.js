const express=require('express');

const auth=require('../middlewares/auth');
const authforadmin=require('../middlewares/authforadmin')


const {createResponse,getResponse,deleteResponse, updateResponse,getAllResponses}=require('../controllers/responseController');


const responseRouter=express.Router();






responseRouter.post('/res',auth,getResponse)

responseRouter.post('/',auth,createResponse)



responseRouter.delete("/:id",auth,deleteResponse);

responseRouter.put("/:id",auth,updateResponse);

//This is for getting all responses of a particular question by question id and form id of all users (only for admin...)
responseRouter.get('/allresponses/:id',auth,getAllResponses);




module.exports=responseRouter;

