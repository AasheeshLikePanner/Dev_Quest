import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { Solution } from "../models/Solution.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";

const createSolution = asyncHandler(async (req, res) => {
    const { link, content, title } = req.body;
    console.log(link, content, title);

    if ([link, content, title].some((field) => field?.trim() === "")) {
        throw new ApiError(401, "All fields are required");
    }

    const solution  = await Solution.create({
        link,
        content,
        title,
        owner:req.user._id
    })
    if (!solution) {
        throw new ApiError(500, "Something went wrong while creating the Solution")
    }

   
    return res.status(201).json(
        new ApiResponse(200, solution, "Solution created successfully")
    )
})
 

const AddCommentInSolution  = asyncHandler(async(req, res) => {
    const {solutionId, commentId} = req.body;

    if(!solutionId || !commentId){
      throw new ApiError(401, "Something went wrong while creating adding comment to solution")
    }

    try {
      const solution = await Solution.findByIdAndUpdate(
          solutionId,
          {
              $push:{
                  comment:commentId
              }
          }
      )
      console.log(solutionId);
      return res.status(200)
      .json(
          new ApiResponse(200, solution, "Comment added successfully")
      )
    } catch (error) {
      return res.status(401)
      .json(
        new ApiError(401, "Error while adding the comment to the solution")
      )
    }
})

const getSolution  = asyncHandler(async (req, res) => {
    const {solutionId} = req.body;
    const solution = await Solution.aggregate(
      [
        {
          $match:
            {
              _id: new mongoose.Types.ObjectId(solutionId),
            },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'owner',
            foreignField: '_id',
            as: "userDetails",
            pipeline:[
              {
                $project:{
                  username:1,
                  avatar:1,
                  fullName:1,
                }
              }
            ]	
          }
        }
      ]
    )
    return  res
    .status(200)
    .json(new ApiResponse(
        200,
        solution,
        "Solution fetched successfully"
    ))
})

const getAllCommentOfSolution = asyncHandler(async(req, res) => {
    const {solutionId} = req.body;
    console.log(solutionId);
    const comment = await Solution.aggregate(
        [
            {
              $match: {
                _id:new mongoose.Types.ObjectId(solutionId)
              }
            },
            {
              $lookup: {
                from: "comments",
                localField: "comment",
                foreignField: "_id",
                as: "comment_Detail",
                pipeline:[
                  {
                    $lookup:{
                      from: "users",
                      localField: "owner",
                      foreignField: "_id",
                      as: "user_Detail",
                      pipeline:[
                        {
                          $project:{
                            username:1,
                            avatar:1
                            
                          }
                        }
                      ]
                    }
                  },
                  {
                    $project:{
                      content:1,
                      likeCount:1,
                      user_Detail:1,
                      comment:1,
                      updatedAt:1
                    }
                  }
                ]
              }
            }
          ]   
    )
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        comment,
        "Comment fetch Succefully fetched successfully"
    ))
})


export {
    createSolution,
    AddCommentInSolution,
    getSolution,
    getAllCommentOfSolution,
}