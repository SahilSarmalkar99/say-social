import express from 'express';
import {
  getCarouselVideos,
  upsertMainVideo,
  createCarouselVideo,
  updateCarouselVideo,
  deleteCarouselVideo,
  setCarouselStatus,
  reorderCarousel,
} from '../controllers/videoController.js';

const router = express.Router();

router.get('/carousel', (req, res, next) => getCarouselVideos(req, res, next));
router.put('/main', upsertMainVideo);
router.post('/carousel', createCarouselVideo);
router.put('/carousel/:id', updateCarouselVideo);
router.delete('/carousel/:id', deleteCarouselVideo);
router.patch('/carousel/:id/status', setCarouselStatus);
router.patch('/carousel/reorder', reorderCarousel);

export default router;
