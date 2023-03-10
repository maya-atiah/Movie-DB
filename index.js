// const Joi=require('joi');

const express = require('express');


//init app & middleware
const app = express();
app.use(express.json());

module.exports = app;
const blogRouter = require("./moviesdoc/movieRoutes");
app.use("/api/blogs", blogRouter);
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://maya-test:test@test.zvc5zyu.mongodb.net/?retryWrites=true&w=majority/movies', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Mongodb connected...');
    })

  
app.listen(2000, () => {
    console.log("Example app listening on 2000...")
})



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



//url step11 HTTP Verbs post
app.post('/movies/create', (req, res) => {



    const title = req.body.title;
    const year = req.body.year;
    const rating = req.body.rating;

    if (!title || !year || year.toString().length > 4 || year.toString().length < 4) {
        res.status(403).send({ status: 403, error: true, message: 'you cannot create a movie without providing a title and a year' });
    }
    else if (!rating) {
        res.send({
            title: title, year: year, rating: 4
        })
    }
    else {
        const movie = {
            title: title, year: year, rating: rating
        };
        // movies.push(movie); 

        db.collection('testData').insertOne(movie);

        res.send({ status: 200, message: movies });
    }
});





//url movies/read step5
app.get("/movies/get", (req, res) => {
    db.collection('movies')
        .find()//cursor toArray forEach
    res.json({ status: 200, data: movies })

});




//url movies/update 
//url movie/edit  HTTP VERBS STEP 11
app.put('/movies/edit/:id', (req, res) => {
    const num = req.params.id;
    const title = req.body.title;
    const year = req.body.year;
    const rating = req.body.rating;
    if (num <= movies.length) {
        if (!title) {
            if (!year) {
                movies[num - 1].rating = rating;
                res.json({ status: 200, data: movies });
            }
            else if (!rating && year.length == 4) {
                movies[num - 1].year = year;
                res.json({ status: 200, data: movies });
            }
            else {
                movies[num - 1].year = year;
                movies[num - 1].rating = rating;
                res.json({ status: 200, data: movies });
            }
        }
        else if (!year) {
            if (!title) {
                movies[num - 1].rating = rating;
            }
            else if (!rating) {
                movies[num - 1].title = title;
                res.json({ status: 200, data: movies });
            }
            else {
                movies[num - 1].title = title;
                movies[num - 1].rating = rating;
                res.json({ status: 200, data: movies });
            }
        }
        else if (!rating) {
            if (!title && year.length == 4) {
                movies[num - 1].year = year;
                res.json({ status: 200, data: movies });
            }
            else if (!year) {
                movies[num - 1].title = title;
                res.json({ status: 200, data: movies });
            }
            else {
                movies[num - 1].title = title;
                movies[num - 1].year = year;
                res.json({ status: 200, data: movies });
            }
        }
        else {
            movies[num - 1].title = title;
            movies[num - 1].year = year;
            movies[num - 1].rating = rating;
            res.json({ status: 200, data: movies });
        }
    } else res.send({ status: 404, error: true, message: 'the movie ' + num + ' does not exist' })
})




//url movies/delete
app.delete("/movies/delete/:id", (req, res) => {
    const number = req.params.id;
    if (number <= movies.length) {
        movies.splice(number - 1, 1);
        res.json({ status: 200, message: movies })
    }
    else res.status(404).send({
        status: 404, error: true, message: "the movie id does not exist",
    });

})



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
    movies.sort(function (a, b) { return a.rating - b.rating });
    res.json({ status: 200, data: movies })
})


//url /movies/read/id/<ID> step 7
app.get('/movies/read/id/:id', (res, req) => {
    const ID = req.params.id;
    if (ID > 0 && ID <= movies.length) {
        res.json({ status: 200, data: movies[ID - 1] });
    }
    else res.json({ status: 404, error: true, message: 'the movie' + ID + 'does not exist' })
}
)










//url movies/create step 8
// app.get('/movies/add', (req, res) => {
//     const title = req.query.title;
//     const year = req.query.year;
//     const rating = req.query.rating;
//     if (!title || !year || year.length > 4 || year.length < 4) {
//         res.status(403).send({ status: 403, error: true, message: 'you cannot create a movie without providing a title and a year' });
//     }
//     else if (!rating) {
//         res.send({ title: title,year: year,rating: 4
//         })
//     }
//     else {
//         const movie = {title: title, year: year, rating: rating,
//         };
//         movies.push(movie);
//         res.send({ status: 200, message: movies });
//     }
// })



//const port=process.env.PORT || 3000
//app.listen(port,()=>console.log(`listen ${port}`))
//export Port=5000


// app.get('/movies/read/id/:ID', (res,req)=>{
//     const moviesId= movies.find(c => c.id ===parseInt(req.params.id))
//      if(!moviesId) res.status(404).send({status:404, error:true, message:'the movie <ID> does not exist'})
//      else res.send(moviesId)
//  })


// app.put('/movie/update/:id',(req,res)=>{
//     //look up the course
//     //if not existing return 404
//   const moviesId= movies.find(c => c.id ===parseInt(req.params.id))
//   if(!moviesId) res.status(404).send({status:404, error:true, message:'the movie <ID> does not exist'})
// })