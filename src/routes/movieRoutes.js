import express from 'express';
//import oracledb from "oracledb";
import{showMovies} from "../controllers/movieController.js";

const router = express.Router();


router.get("/hello", (req,res) => {
    res.json({"message" : "Movies hello"});
} );

// router.get("/", (req,res) => {
//     res.json({"message" : "hello"});
// } );

router.post("/", (req,res) => {
    res.json({"message" : "post"});
} )

router.post("/products", (req,res) => {
    res.json({"message" : "post"});
} )

router.get(
    "/",
    showMovies
);
export default router;
