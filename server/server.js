const app = require('./app');


const port = process.env.PORT || 3000;

app.listen(port,(err)=>{
    console.log(`i'm listening at ${port}`);
})