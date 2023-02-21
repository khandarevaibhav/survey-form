const express = require("express");

const responseModel=require('../models/response')
const formModel=require('../models/form');


//FOR CREATING A RESPONSE TO THE FORM...
const createResponse = async (req, res) => {

responseModel.create( { // 'responseContent': req.body.responseContent, 
                        'title':req.body.title,
                        'userId':req.userId,
                        'formId':req.body.formId,
                        // 'questionId':req.body.questionId,
                        'survey':req.body.survey,
                        'email': req.body.email
                    }, 
    (err, result ) => {
        if (err) {
            console.log('error', err)
            res.send('Something went wrong...')
        } else {
            res.status(200).send(result);
        }
    })


};



//FOR GETTING RESPONSE --> it only returns response of that user
const getResponse = async (req, res) => {
    // let qid=req.body.questionId;
    let fid=req.body.formId;
    try {
      // const response = await responseModel.find({
      //   userId: req.userId,
      //   questionId:req.body.questionId,
      //   formId:req.body.formId
      // });
      console.log(fid)
      const requiredForm=await responseModel.find({formId:fid});
      console.log(requiredForm)
    res.status(200).json({
      requiredForm
    });

    
      
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong..." });
    }
  };



  // FOR GETTING ALL RESPONSES OF A QUESTION (ONLY FOR ADMIN)
  const getAllResponses = async (req,res)=>{
    // //let qid=req.body.questionId;
    // let fid=req;
   
    // try{
    //   const responses=await responseModel.find({"questionId":qid ,  "formId":fid})
    //   // const responses = await responseModel.find({"formId":fid})
    //   //res.status(200).json(responses);
    //   console.log(responses)
  
    // }
    // catch(error){
    //   console.log(error);
    //   //res.status(500).json({message:"Something went wrong..."});
    // }
   let fid=req.params.id;
   console.log(fid)
  //  let fid=req
    try {
      
      console.log(fid)
      const requiredForm=await responseModel.find({formId:fid});
      console.log(requiredForm)
      console.log(requiredForm[0].survey)
      q=["email"]
      a=[]
      for (let question of requiredForm[0].survey){
        q.push(question.question)
      }
      for(let i of requiredForm){
        dummy=[i.email]
        for(let j of i.survey){
         
          dummy.push(j.answer)
        }
        a.push(dummy)
      }
      console.log(a)
      console.log(q)
  obj={question:q, answer:a}

    res.status(200).json({
     obj
   });

    
      
      
    } catch (error) {
      console.log(error);
     // res.status(500).json({ message: "Something went wrong..." });
    }
  };




  
  






//FOR DELETING A RESPONSE BY USING ID 
const deleteResponse = async (req, res) => {
  const id = req.params.id;

    const response = await responseModel.findByIdAndRemove(id);
    res.status(202).json(response);
  

};


// FOR UPDATING A RESPONSE BY USING ID


const updateResponse = async (req, res) => {
  const id = req.params.id;
  const { responseContent,questionId,formId } = req.body;
  const newResponse = {
   responseContent: responseContent,
    questionId:questionId ,
    formId:formId
  };
  try {
    await responseModel.findByIdAndUpdate(id, newResponse, { new: true });
    res.status(200).json(newResponse);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong.." });
  }
};




module.exports= {
    createResponse,
    getResponse,
    deleteResponse,
    updateResponse,
    getAllResponses
}







