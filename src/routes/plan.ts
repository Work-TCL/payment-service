import { Router } from 'express';
import { planController, subscriptionController } from '../controller';
import { VendorAuthMiddleware } from '../middleware/vendorAuth.middleware';

const router = Router();

router.post('/add', planController.addPlan); // add new plan
router.get('/all', planController.getAllPlans); // getting all plans
router.post('/subscribe',VendorAuthMiddleware, subscriptionController.subscribePlan);
router.post('/cancel', subscriptionController.cancelSubscription); // New route for canceling a subscription




export { router as planRouter };