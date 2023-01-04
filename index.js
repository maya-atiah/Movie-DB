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
        res.send({ status: 500, error: true, message: "you have t provide a search" })
    }
})



//array of movies
const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
];




//url movies/create step 8
app.get('/movie/add', (req, res) => {
    const title = req.query.title;
    const year = req.query.year;
    const rating = req.query.rating;
    if (!title || !year || year.length > 4 || year.length < 4) {
        res.status(403).send({ status: 403, error: true, message: 'you cannot create a movie without providing a title and a year' });

    }
    
    else if (!rating) {
        res.send({
            title: title,
            year: year,
            rating: 4
        })
    }
    else {
       const  movie = {
            title: title,
            year: year,
            rating: rating,
        };
        movies.push(movie);
        res.send({ status: 200, message: movies });
    }
})



// app.post('/movies/add', (req, res) => {
//     const movie = {
//         title: req.body.title,
//         year: req.body.year,
//         rating: req.body.rating
//     }
//     movies.push(movie);
//     res.send(movie);
// });





//url movies/read step5
app.get("/movies/get", (req, res) => {
    res.json({ status: 200, data: movies })

});



//url movies/update 
app.get('/movies/edit', (req, res) => { })




//url movies/delete
app.get('/movies/delete', (req, res) => { })




//url /movies/read/by-date step 6
app.get('/movies/read/by-date', (req, res) => {
    movies.sort(function (a, b) { return a.year - b.year });
    res.json({ status: 200, data: movies })
})



//url /movies/read/by-title step 6
app.get('/movies/read/by-title', (req, res) => {
    movies.sort(function (a, b) {
        if (a.title < b.title) {
            return -1;
        }
        if (a.title > b.title) {
            return 1;
        }
        return 0;
    });
    res.json({ status: 200, data: movies })
})





//url /movies/read/by-rating step 6
app.get('/movies/read/by-rating', (req, res) => {
    movies.sort(function (a, b) { return a.rating- b.rating});
    res.json({ status: 200, data: movies })
})





//url /movies/read/id/<ID> step 7
app.get('/movies/read/id/:id', (res, req) => {
    const ID =req.params.id;
  if (ID>0 && ID<=movies.length) {
         
   
            res.json({ status: 200, data: movies[ID-1] });
          
        }
        else res.json({ status: 404, error: true, message: 'the movie' +ID + 'does not exist' }) 
    }

)





app.listen(2000, () => {
    console.log("Example app listening on 2000...")
})

//const port=process.env.PORT || 3000
//app.listen(port,()=>console.log(`listen ${port}`))
//export Port=5000

// app.get('/movies/read/id/:ID', (res,req)=>{
//     const moviesId= movies.find(c => c.id ===parseInt(req.params.id))
//      if(!moviesId) res.status(404).send({status:404, error:true, message:'the movie <ID> does not exist'})
//      else res.send(moviesId)
//  })