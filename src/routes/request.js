import { Router } from "express";
import { userAuth } from "../middlewares/auth.js";
import { ConnectRequest } from "../models/connectionRequest.js";
import { User } from "../models/user.js";

const requestRouter = Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user?._id;
      const { toUserId, status } = req.params;

      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status))
        return res.status(400).json({ message: `Invalid status: ${status}` });

      const toUser = await User.findById(toUserId);
      if (!toUser)
        return res
          .status(404)
          .json({ message: `User: ${toUserId} does not exists` });

      const existingConnectionRequest = await ConnectRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest)
        return res
          .status(409)
          .json({ message: "Connection request already exists" });

      const connectionRequest = new ConnectRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();
      res.json({
        message: "Connection request sent successfully!",
        data,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

export default requestRouter;
