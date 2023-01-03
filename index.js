const express = require('express');
const app = express();

//const for time
const today = new Date();
const time = today.getHours() + ":" + today.getMinutes();


//answers ok step2
app.get('/', (req, res) => {
    res.send('ok');
});


// url "/test" step3
app.get('/test', (req, res) => {
    res.send({ status: 200, message: "ok" });
});


//url "/time" step3
app.get('/time', (req, res) => {
    res.send({ status: 200, message: time })
})


//url /hello/ID step 4
app.get('/hello/:ID', (req, res) => {
    const id = req.params.ID;
    res.send({ status: 200, message: "Hello", id })
})

// url /search step4
app.get('/search', (req, res) => {
    const search = req.query.s
    if (search) {
        res.send({ status: 200, message: "ok", data: search })
    }
    else {
        res.send({ status: 500, error: true, message: "you have to provide a search" })
    }
})


app.listen(3000, () => {
    console.log("Example app listening on 3000...")
})

//const port=process.env.PORT || 3000
//app.listen(port,()=>console.log(`listen ${port}`))
//export Port=5000