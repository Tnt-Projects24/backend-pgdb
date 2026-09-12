import { prisma } from "../config/pgdb.js";

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

export  {showMovies};