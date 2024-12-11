  const cors = require("cors")
  const fs = require("fs")
  const path = require("path")
  const express = require("express")
  const jwt = require('jsonwebtoken')
  const JWT_SECRET = "aryanpachandi"
  const app = express();
  app.use(express.json());
  app.use(cors());  



  const filepath = path.join(__dirname,"user.json")

  const loaddata = () => {
    try {
        if (!fs.existsSync(filepath)) {
            fs.writeFileSync(filepath, JSON.stringify([])); // Initialize file if missing
        }
        const USERdata = fs.readFileSync(filepath, "utf8");
        return JSON.parse(USERdata);
    } catch (err) {
        console.error("Error found in file-system:", err);
        return [];
    }
};
  const savedata =(data)=>{
      try{
        fs.writeFileSync(filepath,JSON.stringify(data,null,2),"utf8")
      }catch(err){
          console.error("error found in saving file-system",err)
      }


  }


 
    function auth(req, res, next) {
      const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
      if (!token) {
          return res.status(401).json({ msg: "Token required" });
      }
      try {
          const decoded = jwt.verify(token, JWT_SECRET);
          req.username = decoded.username;
          next();
      } catch (err) {
          res.status(401).json({ msg: "Invalid or expired token" });
      }
    }
  
    app.post('/up',(req,res)=>{
      const username = req.body.username
      const password = req.body.password
      
      if(!username || !password){
        res.status(401).json({
          msg : "enter user and password "
        })
        return;
      }
      
      const users = loaddata(); 
      if (users.find(user => user.username === username)) {
     
        return res.status(400).json({ msg: "Username already exists. Please choose a different one." });
    } 
      users.push({
        username  :username,
        password : password 
      })
      savedata(users);
      
      console.log(users)
      res.json({
        msg: "you have sucessfully created acc "
      })
      
    
    })
    app.post('/in', (req, res) => {

      const username = req.body.username;
      const password = req.body.password;
    
    
      const user = loaddata();
      let foundUser = null;
     
      
      for (let i = 0; i < user.length; i++) {
        if (user[i].username === username && user[i].password === password) {
          foundUser = user[i];
          break; 
        }
      }
    
      if (foundUser){
      const token = jwt.sign({ username : username}, JWT_SECRET, { expiresIn: '1h' });
    
      
      res.json({
        token: token,
      });}else{
        res.status(403).send({
          message: "Invalid username or password"
      })
      }
    });
    
    app.get('/me',auth,(req,res)=>{
    
      const token = req.headers.authorization
      const users = loaddata();
    
      const user = users.find(u => u.username === req.username);


        if (user){
          res.status(200).json({
            user : user .username,
            pass: user.password
          })
        }else{
          return res.status(404).json({
            msg:"user not found"
          })
        }
    
      
    })
    
    app.listen(4000,()=>{
      console.log("working >>")
    })
