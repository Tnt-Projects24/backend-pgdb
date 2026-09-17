import express from 'express';
import { authMiddleware } from "../middleware/authMiddlewarePG.js";
//import oracledb from "oracledb";
import{showMovies,addToMovies,addMoviesBulk,getMovie} from "../controllers/movieController.js";

const router = express.Router();


router.get("/hello", (req,res) => {
    res.json({"message" : "Movies hello"});
} );

// router.get("/", (req,res) => {
//     res.json({"message" : "hello"});
// } );

// router.post("/", (req,res) => {
//     res.json({"message" : "post"});
// } )

router.post("/products", (req,res) => {
    res.json({"message" : "post"});
} )


router.get(
    "/getMovie/:id",
    getMovie
);
router.get(
    "/",
    showMovies
);

router.post(
    "/",
    authMiddleware,
    //validateRequest(addtoWatchListItemSchema),
    addToMovies
);

router.post(
    "/bulk",
    authMiddleware,
    //validateRequest(addtoWatchListItemSchema),
    addMoviesBulk
);
export default router;
