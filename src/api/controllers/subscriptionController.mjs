import { SubscriptionService } from "../services/subscriptionService.mjs";

export class SubscriptionController {
    static async createSubscription(req, res) {
        try {
            const { userID, subscriptionInfoID } = req.body;

            if (!userID || !subscriptionInfoID) {
                return res.status(400).json({ success: false, message: "Both userID and subscriptionInfoID are required" });
            }

            const result = await SubscriptionService.createSubscription(userID, subscriptionInfoID);

            if (result.success) {
                return res.status(200).json({ success: true, message: result.message });
            } else {
                return res.status(400).json({ success: false, message: result.message });
            }
        } catch (error) {
            console.error("Error creating subscription:", error);
            return res.status(500).json({ success: false, message: "An error occurred while creating subscription" });
        }
    }

    static async getSubscription(req, res) {
        try {
            const { userID } = req.params;
    
            if (!userID) {
                return res.status(400).json({ success: false, message: "userID is required" });
            }
    
            const result = await SubscriptionService.getSubscription(userID);
    
            if (result.success) {
                return res.status(200).json({ success: true, subscription: result.subscription });
            } else {
                return res.status(404).json({ success: false, message: result.message });
            }
        } catch (error) {
            console.error("Error retrieving subscription:", error);
            return res.status(500).json({ success: false, message: "An error occurred while retrieving subscription" });
        }
    }
}
