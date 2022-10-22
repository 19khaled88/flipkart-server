module.exports =(...role)=>{
    return (req, res,next)=>{
     const userRole = req.user?.role 
     if(!role.includes(userRole)){
         return res.status(403).json({
             success:false ,
             error:'you are not authorized to access this resource'
         })
     }
 
     next()
     }
 }