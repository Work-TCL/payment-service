import { Request, Response } from "express";
import { PlanModel } from "../../database/model";
import { addPlanSchema } from "./validation";
import { createRazorpayPlan } from "../../lib/razorpay";
import sendApiResponse from "../../common";

export const addPlan = async (req: Request, res: Response) => {
    const { error } = addPlanSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { period, interval, name, amount, description } = req.body;

    try {

        // Check if the name already exists
        const findPlan = await PlanModel.findOne({ name, isActive: true });
        if (findPlan) {
            return sendApiResponse(res, 400, "Name already exists", findPlan);
        }

        // Create plan in Razorpay
        const razorpayPlan = await createRazorpayPlan(req.body)

        // Save plan to MongoDB
        let dataToSave = {
            name,
            description,
            amount: razorpayPlan?.item?.amount,
            currencyCode: razorpayPlan?.item?.currency,
            plan_id: razorpayPlan?.id
        }

        const plan = await PlanModel.create(dataToSave);
        return sendApiResponse(res, 200, "Plan Created successfully", plan);

    } catch (error) {
        return sendApiResponse(res, 500, "Error in Creating Plan", error);
    }
};


export const getAllPlans = async (req: Request, res: Response) => {
    try {
        let criteria = {
            isActive: true
        }
        const plans = await PlanModel.find(criteria); 
        return sendApiResponse(res, 200, "Plan get successfully", plans);
    } catch (error) {
        return sendApiResponse(res, 500, "Error in get plans", error);
    }
};


