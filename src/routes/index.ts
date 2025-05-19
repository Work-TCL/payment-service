import { Router } from 'express';
import { planRouter } from './plan';

const router = Router()

router.use('/plan', planRouter)


export { router }