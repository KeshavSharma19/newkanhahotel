const USER = require('../../models/userModel');
const ROOMBOOKING = require('../../models/roomBooking');
const mongoose = require('mongoose');

exports.getAllUsers = async (req) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await USER.countDocuments();

    const users = await USER.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-password -token'); // hide sensitive data

    return {
      status: true,
      message: 'Users fetched successfully',
      data: {
        users,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      }
    };
  } catch (error) {
    console.error('Service Error - viewAllUsers:', error);
    return {
      status: false,
      message: 'Failed to fetch users'
    };
  }
};


exports.getUserBookings = async (req) => {
  try {
    const { userId } = req.params;

    const bookings = await ROOMBOOKING.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId)
        }
      },
      {
        $sort: { checkIn: -1 }
      },
      {
        $lookup: {
          from: "rooms",
          localField: "roomId",
          foreignField: "_id",
          as: "room"
        }
      },
      {
        $unwind: {
          path: "$room",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "payments",
          localField: "paymentId",
          foreignField: "_id",
          as: "payment"
        }
      },
      {
        $unwind: {
          path: "$payment",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          userId: 1,
          guestName: 1,
          phone: 1,
          checkIn: 1,
          checkOut: 1,
          status: 1,
          totalAmount: 1,
          createdBy: 1,
          createdAt: 1,
          room: {
            roomNumber: "$room.roomNumber",
            roomTypeId: "$room.roomTypeId" // ✅ fixed
          },
          payment: {
            amount: "$payment.amount",
            mode: "$payment.mode",
            method: "$payment.method",
            status: "$payment.status",
            createdAt: "$payment.createdAt"
          }
        }
      },
      {
        $group: {
          _id: "$userId",
          rooms: { $push: "$$ROOT" }
        }
      },
      {
        $lookup: {
          from: "banquetbookings",
          localField: "_id",
          foreignField: "userId",
          pipeline: [
            {
              $lookup: {
                from: "banquets",
                localField: "hallId",
                foreignField: "_id",
                pipeline: [
                  {
                    $project: {
                      name: 1,
                      capacity: 1
                    }
                  }
                ],
                as: "banquetData"
              }
            },
            {
              $unwind: "$banquetData"
            },
            {
              $lookup: {
                from: "payments",
                localField: "paymentId",
                foreignField: "_id",
                as: "payment"
              }
            },
            {
              $unwind: {
                path: "$payment",
                preserveNullAndEmptyArrays: true
              }
            }, // ✅ missing comma fixed here
            {
              $project: {
                userId: 1,
                guestName: 1,
                phone: 1,
                checkIn: {
                  $dateFromString: {
                    dateString: {
                      $concat: [
                        { $dateToString: { format: "%Y-%m-%d", date: "$eventDate" } },
                        " ",
                        "$startTime"
                      ]
                    }
                  }
                },
                checkOut: {
                  $dateFromString: {
                    dateString: {
                      $concat: [
                        { $dateToString: { format: "%Y-%m-%d", date: "$eventDate" } },
                        " ",
                        "$endTime"
                      ]
                    }
                  }
                },
                status: 1,
                totalAmount: 1,
                createdBy: 1,
                createdAt: 1,
                room: {
                  roomNumber: "$banquetData.name",
                  roomTypeId: "banquet"
                },
                payment: {
                  amount: "$payment.amount",
                  mode: "$payment.mode",
                  method: "$payment.method",
                  status: "$payment.status",
                  createdAt: "$payment.createdAt"
                }
              }
            }
          ],
          as: "banquets"
        }
      }
    ]
    );

    return {
      status: true,
      message: 'User bookings fetched successfully',
      data: bookings
    };
  } catch (error) {
    console.error('Service Error - viewUserBookings:', error);
    return {
      status: false,
      message: 'Failed to fetch bookings for user'
    };
  }
};
