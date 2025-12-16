import { Sequelize } from "sequelize";
import Expense from "../models/expense.js";
import User from "../models/user.js";

export const getLeaderboardData = async (req, res) => {
  try {
    const leaderboard = await Expense.findAll({
      attributes: [
        "UserId",
        [Sequelize.fn("SUM", Sequelize.col("amount")), "totalExpense"]
      ],
      include: [
        {
          model: User,
          attributes: ["id", "username"]
        }
      ],
      group: ["UserId", "User.id"],
      order: [[Sequelize.literal("totalExpense"), "DESC"]]
    });

    if (leaderboard.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No data found"
      });
    }

    res.status(200).json({
      success: true,
      data: leaderboard,
      message: "Data is successfully fetched"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
