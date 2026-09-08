import express from 'express';
import { getMainVideo, getCarouselVideos } from '../controllers/videoController.js';
const router = express.Router();
router.get('/main', getMainVideo);
router.get('/carousel', getCarouselVideos);
export default router;
