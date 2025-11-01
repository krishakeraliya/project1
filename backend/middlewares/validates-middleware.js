const validate=(schema)=>async(req,res,next)=>{

    try {
        const parseBody=await schema.parseAsync(req.body);
        req.body=parseBody;
        next()  //next middleware/controller ko call karo
    } catch (err) {
        console.log("ZOD ERROR", err); 

        const status=422;
        const message="Fill the input properly";
      const extraDetails =
      err?.errors && err.errors.length > 0
        ? err.errors[0].message
        : "Validation error";

        const error={
            status,
            message,
            extraDetails
        }
        
       
        console.log(error);
        // res.status(400).json({msg:message})
        next(error)
    }

}

module.exports=validate