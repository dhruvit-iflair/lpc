function crosPermission(){
    this.permission=function(req,res,next){
      res.header('Access-Control-Allow-Origin','*');
      res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, x-access-token');
      //res.header('Access-Control-Allow-Methods','GET','POST','PUT','DELETE','OPTIONS');
      res.header('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, OPTIONS');
      next();
    }
}
  
module.exports= new crosPermission();