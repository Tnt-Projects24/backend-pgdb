//import oracledb from "oracledb";
import { success } from "zod/mini";
import { prisma } from "../config/pgdb.js";

const addToWatchlist = async (req, res) => {
  console.log("inside add to Watch");
  try {
    const { movieId, statusId, rating, notes } = req.body;

    //Verify Movie exists
    const movie = await prisma.movie.findUnique({
      where: { id: movieId },
    });

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    //Verify if movie is already in the watch list
    const existInWatchList = await prisma.watchlistItem.findUnique({
      where: {
        userId_movieId: {
          userId: req.user.id,
          movieId: movieId,
        },
      },
    });

    if (existInWatchList) {
      return res.status(400).json({
        error: "Movie already in the watchlist",
      });
    }
    const status = await prisma.watchlistStatus.findUnique({
      where: {
        id: req.body.statusId
      }
    });

    if (!status) {
      return res.status(400).json({
        error: `Invalid watchlist statusId: ${req.body.statusId}`,
      });
    }
    const watchlistItem = await prisma.watchlistItem.create({
      data: {
        userId: req.user.id,
        movieId,
        statusId: req.body.statusId, //: status || "PLANNED",
        rating,
        notes,
      },
    });

    return res.status(201).json({
      status: "Success",
      data: watchlistItem,
    });
  } catch (error) {}
};

const removeFromWatchlist = async (req, res) => {
  try {
    const id = req.params.id;
    const watchlistItem = await prisma.watchlistItem.findUnique({
      where: { id: req.params.id },
    });

    if (!watchlistItem) {
      return res.status(404).json({ error: "Watchlist Item not found" });
    }
    console.log(req.user);
    console.log(watchlistItem.userId, req.params.id);
    if (watchlistItem.userId != req.user.id) {
      return res
        .status(403)
        .json({ error: "Not allowed to delete the watchlist" });
    }

    await prisma.watchlistItem.delete({
      where: { id: req.params.id },
    });

    return res.status(200).json({
      message: "Movie removed from watchlist successfully",
    });
  } catch (error) {
    console.error("Error removing movie from watchlist:", error);

    return res.status(500).json({
      error: "Failed to remove movie from watchlist",
      details: error.message,
    });
  } finally {
    console.log("Finally: closing connection");
  }
};

const updateWatchlistItem = async (req, res) => {
  try {
    const id = req.params.id;
    const { movieId, statusId, rating, notes } = req.body;
    const watchlistItem = await prisma.watchlistItem.findUnique({
      where: { id: req.params.id },
    });

    if (!watchlistItem) {
      return res.status(404).json({ error: "Watchlist Item not found" });
    }
    console.log(req.user);
    console.log(watchlistItem.userId, req.params.id);
    if (watchlistItem.userId != req.user.id) {
      return res
        .status(403)
        .json({ error: "Not allowed to update the watchlist" });
    }

    const updateData = {};
    if (statusId != undefined) updateData.statusId = statusId;
    if (rating != undefined) updateData.rating = rating;
    if (notes != undefined) updateData.notes = notes;

    // Update watchlist item
    const updatedItem = await prisma.watchlistItem.update({
      where: { id: req.params.id },
      data: updateData,
    });

    res.status(200).json({
      status: "success",
      data: {
        watchlistItem: updatedItem,
      },
    });
  } catch (error) {
    console.error("Error updating movie from watchlist:", error);

    return res.status(500).json({
      error: "Failed to update movie from watchlist",
      details: error.message,
    });
  } finally {
    console.log("Finally: closing connection");
  }
};

export {
  //getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  updateWatchlistItem,
};
