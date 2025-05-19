import { Request, Response } from "express";
import { cancelPlanSubscription, createSubscription } from "../../lib/razorpay"; // Import the function to create a subscription
import { SubscriptionModel } from "../../database/model"; // Import your Subscription model
import { subscribePlanSchema } from "./validation";
import { AuthRequest } from "../../types/authRequest";
import sendApiResponse from "../../common";

export const subscribePlan = async (req: AuthRequest, res: Response) => {

    try {

    const { error } = subscribePlanSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    // Extract vendor ID from the authenticated user
    const { _id: vendorId } = req.user;
    const { planId, type } = req.body;

    const subscription = await SubscriptionModel.findOne({ planId, vendorId, status: "active"});
    if (subscription) {
        return sendApiResponse(res, 400, "Already subsribe this plan");
    }

        
    // const subscription = await createSubscription(subscriptionData);

        // // Save subscription details to the database
        // const newSubscription = new SubscriptionModel({
        //     subscription_id: subscription.id,
        //     plan_id,
        //     customer_id,
        //     status: subscription.status,
        //     created_at: new Date(),
        // });

        // await newSubscription.save();

        // return res.status(201).json({ subscription: newSubscription });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to subscribe to plan', details: error });
    }
};

export const cancelSubscription = async (req: Request, res: Response) => {
    // const { subscription_id } = req.body;

    // // Validate request body
    // if (!subscription_id) {
    //     return res.status(400).json({ error: "Subscription ID is required." });
    // }

    // try {
    //     // Cancel subscription with Razorpay
    //     const canceledSubscription = await cancelPlanSubscription(subscription_id);

    //     // Optionally, update the subscription status in your database
    //     await SubscriptionModel.updateOne(
    //         { subscription_id },
    //         { status: canceledSubscription.status } // Update the status to reflect cancellation
    //     );

    //     return res.status(200).json({ message: "Subscription canceled successfully", canceledSubscription });
    // } catch (error) {
    //     return res.status(500).json({ error: 'Failed to cancel subscription', details: error });
    // }
};