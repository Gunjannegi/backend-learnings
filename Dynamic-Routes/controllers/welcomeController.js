const getParams = (req,res) =>{
   const username = req.params.username;
   const role = req.query.role;
   if(username){
   res.status(200).send(`Welcome ${username}. Your role is ${role ? role : "not provided."}`)
   }else{
    res.status(404).send('Username is required.')
   }
}

module.exports = getParams;