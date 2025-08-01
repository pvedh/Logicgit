const express=require('express');
const app=express();
const mongoose=require('mongoose');
const passport = require('passport');
const session=require('express-session')
const cors=require('cors');
app.use(express.json());
require('dotenv').config();
app.use(cors());
app.use(session({secret:"teamunknown"}));
app.use(passport.initialize());
app.use(passport.session());
require('./apis/auth')
const dburl=process.env.DB_URL;
const port=process.env.PORT||4000;

mongoose.connect(dburl).then(()=>{
  console.log("database is connected to the backend sucessfully")
}).catch((e)=>{
  console.log(e);
})
function isLoggenIn(req,res,next){
req.user?next():res.status(401).send({
  message:"not loggen in"
})
}
app.get('/',(req,res)=>{
  res.send('<a href="/auth/google">Authenticate with Google</a>')
})

app.get('/auth/google', 
  passport.authenticate('google', { scope: ['email', 'profile'] })
);
app.get('/google/auth/callback',
  passport.authenticate('google',{
    successRedirect:'/protected',
    failureRedirect:'/auth/failure'
  })
);
app.get('/protected',isLoggenIn,(req,res)=>{
  res.send(`hello ${req.user.displayName}`)
})
app.get('/auth/failure',(req,res)=>{
  res.send("user credentials invalid")
})
app.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    req.session.destroy(() => {
      res.send("goodbye");
    });
  });
});

app.listen(port,()=>{
  console.log("the server is running on the port ",port);
})