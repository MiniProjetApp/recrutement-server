import SubscriptionInfo from "../models/subscriptionInfoModel.mjs";
import Subscription from "../models/subscriptionsModel.mjs";
import Post from "../models/postModel.mjs";
import { Op } from 'sequelize';
import moment from 'moment';


export class SubscriptionService {
    
    static async canPost(userID) {
        try {
            // Fetch the subscription information of the user
            const userSubscription = await Subscription.findOne({
                where: {
                    userID: userID
                },
                include: [{
                    model: SubscriptionInfo,
                    required: true
                }]
            });

            if (!userSubscription) {
                // User has no subscription, allow one post only
                const postCount = await Post.count({
                    where: {
                        userID: userID
                    }
                });

                if (postCount >= 1) {
                    return { canPost: false, message: "User without subscription has reached the post limit" };
                } else {
                    return { canPost: true, message: "User without subscription can post" };
                }
            }

            const subscriptionInfo = userSubscription.SubscriptionInfo;

            // Check if the subscription is unlimited
            if (subscriptionInfo.name.toLowerCase() === "unlimited") {
                return { canPost: true, message: "User can post without limit" };
            }

            // Check if the subscription is for 5 posts
            if (subscriptionInfo.name.toLowerCase() === "5") {
                // Fetch the number of posts made by the user
                const postCount = await Post.count({
                    where: {
                        userID: userID
                    }
                });

                // Check if the user has reached the limit of 5 posts
                if (postCount >= 5) {
                    return { canPost: false, message: "User has reached the post limit for the subscription" };
                } else {
                    return { canPost: true, message: "User can post more" };
                }
            }
        } catch (error) {
            console.error("Error checking if user can post:", error);
            return { canPost: false, message: "An error occurred while checking if user can post" };
        }
    }




    static async createSubscription(userID, subscriptionInfoID) {
        try {
            // Check if the user already has a subscription
            const existingSubscription = await Subscription.findOne({
                where: {
                    userID: userID
                }
            });

            if (existingSubscription) {
                return { success: false, message: "User already has a subscription" };
            }

            // Set the starting date to today and the ending date to a month from now
            const startingDate = moment().format('YYYY-MM-DD');
            const endingDate = moment().add(1, 'month').format('YYYY-MM-DD');

            // Create the subscription for the user
            await Subscription.create({
                userID: userID,
                subscriptionID: subscriptionInfoID,
                starting_date: startingDate,
                ending_date: endingDate
            });

            return { success: true, message: "Subscription created successfully" };
        } catch (error) {
            console.error("Error creating subscription:", error);
            return { success: false, message: "An error occurred while creating subscription" };
        }
    }
}
