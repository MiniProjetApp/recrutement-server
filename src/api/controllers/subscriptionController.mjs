import { SubscriptionService } from "../services/subscriptionService.mjs";

export class SubscriptionController {
    static async createSubscription(req, res) {
        try {
            const { userID, subscriptionInfoID } = req.body;

            // Check if both userID and subscriptionInfoID are provided
            if (!userID || !subscriptionInfoID) {
                return res.status(400).json({ success: false, message: "Both userID and subscriptionInfoID are required" });
            }

            const result = await SubscriptionService.createSubscription(userID, subscriptionInfoID);

            // Send response based on the result from the service
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
}
