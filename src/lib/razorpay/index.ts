import { Router, Request, Response } from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';

// Create Razorpay instance
const razorpay = new Razorpay({
  key_id: "rzp_test_ucj89vYunIEtNY",  // Replace with your Razorpay Key ID
  key_secret: "ydJcUoQ0RLpwZcI0cbIxeJus",  // Replace with your Razorpay Key Secret
});


// -----------------------------
// Create Razorpay Plan
// -----------------------------
export const createRazorpayPlan = async (planData: any) => {
  try {
    const {
      period,
      interval,
      name,
      amount,
      currency = 'INR',
      description = '',
    } = planData;

    const plan = await razorpay.plans.create({
      period,
      interval,
      item: {
        name,
        amount,
        currency,
        description,
      },
    });

    console.log('✅ Plan created:', plan);
    return plan;
  } catch (error: any) {
    console.error('❌ Plan creation failed:', error);
    throw new Error(error?.error?.description || 'Failed to create Razorpay plan');
  }
};

// -----------------------------
// Fetch All Plans
// -----------------------------
export const fetchAllPlans = async (options: any = {}): Promise<any> => {
  try {
    const plans = await razorpay.plans.all(options);
    return plans;
  } catch (error: any) {
    console.error('❌ Error fetching plans:', error?.error || error);
    throw new Error(error?.error?.description || 'Failed to fetch Razorpay plans');
  }
};

// -----------------------------
// Create Subscription
// -----------------------------
export const createSubscription = async (data: any) => {
  const {
    plan_id,
    type = 'recurring', // 'recurring' or 'one_time'
    customer_notify = true,
    quantity = 1,
    start_at, // optional UNIX timestamp
    addons = [],
    notes = {} // custom info like user ID, plan type, etc.
  } = data;

  const isRecurring = type === 'recurring';

  const subscriptionPayload: any = {
    plan_id,
    quantity,
    customer_notify,
    auto_collection: isRecurring ? '1' : '0',
    notes,
  };

  // Optional: Set total_count to 1 for one-time payment
  if (!isRecurring) {
    subscriptionPayload.total_count = 1;
  }

  if (start_at) {
    subscriptionPayload.start_at = start_at; // Optional start time
  }

  if (addons.length > 0) {
    subscriptionPayload.addons = addons;
  }

  try {
    const subscription = await razorpay.subscriptions.create(subscriptionPayload);
    return subscription;
  } catch (error: any) {
    console.error('❌ Subscription creation failed:', error?.error || error);
    throw new Error(error?.error?.description || 'Subscription creation failed');
  }
};

// Cancel Subscription
export const cancelPlanSubscription = async (subscription_id: string): Promise<any> => {
  try {
    const subscription = await razorpay.subscriptions.cancel(subscription_id);
    console.log('✅ Subscription cancelled:', subscription);
    return subscription;
  } catch (error: any) {
    console.error('❌ Subscription cancellation failed:', error?.error || error);
    throw new Error(error?.error?.description || 'Failed to cancel Razorpay subscription');
  }
};
