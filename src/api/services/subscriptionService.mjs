import SubscriptionInfo from "../models/subscriptionInfoModel.mjs";
import Subscription from "../models/subscriptionsModel.mjs";
import Post from "../models/postModel.mjs";
import { Op } from 'sequelize';
import moment from 'moment';


export class SubscriptionService {
    
    static async canPost(userID) {
        try {
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

            if (subscriptionInfo.name.toLowerCase() === "unlimited") {
                return { canPost: true, message: "User can post without limit" };
            }

            if (subscriptionInfo.name.toLowerCase() === "5") {
                // Fetch the number of posts made by the user
                const postCount = await Post.count({
                    where: {
                        userID: userID
                    }
                });

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
            const existingSubscription = await Subscription.findOne({
                where: {
                    userID: userID
                }
            });

            if (existingSubscription) {
                await Subscription.destroy({
                    where: {
                        userID: userID
                    }
                });
            }

            const startingDate = moment().format('YYYY-MM-DD');
            const endingDate = moment().add(1, 'month').format('YYYY-MM-DD');

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

    static async getSubscription(userID) {
        try {
            const subscription = await Subscription.findOne({
                where: {
                    userID: userID
                }
            });

            if (subscription) {
                return { success: true, subscription };
            } else {
                return { success: false, message: "No subscription found for this user" };
            }
        } catch (error) {
            console.error("Error retrieving subscription:", error);
            return { success: false, message: "An error occurred while retrieving subscription" };
        }
    }
}
