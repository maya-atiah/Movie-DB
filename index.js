const express = require('express');
const app = express();

//const for time
const today= new Date();
const time= today.getHours() + ":" + today.getMinutes();

//answers ok step2
app.get('/', (req, res) => {
    res.send('ok');
});

// url "/test" step3
app.get('/test', (req, res) => {
    res.send({ status: 200, message: "ok" });
});

//url "/time" step3
app.get('/time',(req,res)=>{
    res.send({status:200, message:time})
})

app.listen(3000, () => {
    console.log("Example app listening on 3000...")
})

//const port=process.env.PORT || 3000
//app.listen(port,()=>console.log(`listen ${port}`))
//export Port=5000