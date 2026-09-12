import express from "express";

import { authMiddleware } from "../middleware/authMiddlewarePG.js";
import { validateRequest } from "../validators/validateRequests.js";
import { addtoWatchListItemSchema } from "../validators/watchlistValidators.js";

import {
   // getWatchlist,
    addToWatchlist,
    removeFromWatchlist,
    updateWatchlistItem
} from "../controllers/watchlistControllerPG.js";

const router = express.Router();

//router.get("/:userId", getWatchlist);

router.post(
    "/",
    authMiddleware,
    validateRequest(addtoWatchListItemSchema),
    addToWatchlist
);

router.delete("/:id", authMiddleware,removeFromWatchlist);
router.put("/:id", authMiddleware,validateRequest(addtoWatchListItemSchema),updateWatchlistItem);

export default router;