import { prisma } from "../config/pgdb.js";
import { redis } from "../config/redis.js";

const addMoviesBulk = async (req, res) => {
  try {
    const movies = req.body.movies;

    if (!Array.isArray(movies) || movies.length === 0) {
      return res.status(400).json({
        error: "movies must be a non-empty array",
      });
    }

    // const movieData = movies.map((movie) => ({
    //   title: movie.title,
    //   overview: movie.overview,
    //   release_year: movie.release_year,
    //   genres: movie.genres,
    //   runtime: movie.runtime,
    //   posterUrl: movie.posterUrl,
    //   createdBy: req.user.id,
    // }));
    const movieData = movies.map((movie) => ({
      ...movie,
      createdBy: req.user.id,
    }));
    const result = await prisma.movie.createMany({
      data: movieData,
      skipDuplicates: true,
    });

    return res.status(201).json({
      status: "Success",
      count: result.count,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to add movies",
    });
  }
};
//addToMovies
const addToMovies = async (req, res) => {
  console.log("insid add movies");
  try {
    const paramMovie = {
      title: req.body.title,
      overview: req.body.overview,
      release_year: req.body.release_year,
      genres: req.body.genres,
      runtime: req.body.runtime,
      posterUrl: req.body.posterUrl,
      createdBy: req.user.id,
    };

    console.log("insid add movies userid siva");

    const chkMovie = await prisma.movie.findFirst({
      where: { title: paramMovie.title },
    });

    if (chkMovie) {
      return res.status(400).json({
        error: "Movie already in the table",
      });
    }
    console.log("new data: ", { ...req.body, createdBy: req.user.id });
    const movie = await prisma.movie.create({
      data: paramMovie,
    });

    // Save to Redis
    console.log("Saving to Redis");
    await redis.set(`movie:${movie.id}`, JSON.stringify(movie));

    return res.status(201).json({
      status: "Success",
      data: movie,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const getMovie = async (req, res) => {
  try {
    const movieId = req.params.id;

    // 1. Check Redis first
    console.log("Checking in Redis");

    //const movie = await redis.get(`movie:${movieId}`);
   let movie ="";
   let RedisError = false;
    try {
       movie = await redis.get(`movie:${movieId}`);
       console.log("Movie found in redis");
    } catch (redisError) {
      console.error("Redis GET failed:", redisError.message);
      console.log("Redis is unavailable. Continuing with database...");
      RedisError = true;
    }
    // Movie found in Redis
    if (movie) {
      console.log("Return data from Redis");

      return res.status(200).json({
        status: "Success",
        source: "redis",
        data: JSON.parse(movie),
      });
    }

    // 2. Movie not found in Redis, check PostgreSQL
    console.log("Movie not found in Redis");
    console.log("Checking in database");

    const pgmovie = await prisma.movie.findUnique({
      where: { id: movieId },
    });

    // Movie not found in either Redis or PostgreSQL
    if (!pgmovie) {
      console.log("Movie not found in database");

      return res.status(404).json({
        error: "Movie not found in DB",
      });
    }

    // Movie found in PostgreSQL
    console.log("Found in Database");
    //console.log("Saving to Redis");
 console.log ("Redis status",RedisError);
 if (!RedisError) {
  try {
    console.log("Saving movie to Redis");

    await redis.set(
      `movie:${pgmovie.id}`,
      JSON.stringify(pgmovie)
    );

    console.log("Movie saved to Redis");

  } catch (error) {
    console.error("Redis SET failed:", error.message);
    console.log("Ignoring Redis SET error. Returning movie from database.");
  }
} else {
  console.log(
    "Redis error encountered while retrieving. Not trying to save it to Redis."
  );
}

  
    return res.status(200).json({
      status: "Success",
      source: "DB",
      data: pgmovie,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to get movie",
    });
  }
};

const showMovies = async (req, res) => {
  console.log("inside add to show movies");
  try {
    const movie = await prisma.movie.findMany();

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    //Verify if movie is already in the watch list

    return res.status(200).json({
      status: "Success",
      data: movie,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to retrieve movies",
    });
  }
};

export { showMovies, addToMovies, getMovie, addMoviesBulk };
