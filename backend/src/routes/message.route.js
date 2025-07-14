import { Router } from 'express';
import { checkAuthMiddleware } from '../middleware/checkAuthMiddleware.js';

import { getUsers, getMessages, sendMessages } from '../controllers/message.controller.js';

const router = Router();

router.get('/users', checkAuthMiddleware, getUsers);
router.get('/:id', checkAuthMiddleware, getMessages);
router.post('/send/:id', checkAuthMiddleware, sendMessages);

export default router;