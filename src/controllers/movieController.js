import { prisma } from "../config/pgdb.js";

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

    return res.status(201).json({
      status: "Success",
      data: movie,
    });
  } catch (error) {
    console.log(error.message);
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
  } catch (error) {}
};

export { showMovies, addToMovies,addMoviesBulk };
