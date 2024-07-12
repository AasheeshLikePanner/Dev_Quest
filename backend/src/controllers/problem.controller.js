import {Problem} from '../models/problem.model.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import {GoogleGenerativeAI} from '@google/generative-ai'
import mongoose, { Mongoose } from 'mongoose'

const createProblem = asyncHandler(async(req, res) => {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const prompt = 
    "Here is a detailed prompt you can use for Gemini AI to generate realistic and useful problems for users to solve by creating websites:" + 
    "Prompt for Gemini AI:" + 
    "You are an AI tasked with creating engaging, real-life problems for web developers. Each problem should be something that can be addressed by creating a website and should be useful in a real-world context. For each problem, generate a compelling title and a detailed description." + 
    "Requirements: " +
    "Title: A catchy, concise title that summarizes the problem." +
    "Description: A detailed description of the problem, including:" +
    "The context and background of the problem." +
    "The target audience who would benefit from the solution." +
    "The specific requirements and features that the website should have." +
    "Any additional information or constraints that developers need to consider." +
    "only create one problem and give discription and title";

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    const result = await model.generateContent(prompt);
    const response = await result.response.text();
    const parts = response.split(/\n+/);

    // Extract title (first line) and description (remaining lines joined)
    const title = parts[0];
    const description = parts.slice(1).join("\n");
    const problem = await Problem.create({
        title, 
        content:description
    })
    if(!problem){
        throw new ApiError(401, "There was someProblem when creating problem")
    }

    return res.status(201).json(
        new ApiResponse(200, problem, "Problem created successfully")
    )
})

const getProblem = asyncHandler(async(req, res) => {

    const {problemId} = req.body;

    if(!problemId){
        throw new ApiError(401, "ProblemId is required!")
    }

    const problem = await Problem.findById(problemId)
    if(!problem){
        throw new ApiError(401, "There was a problem while fetching Problem")
    }
    return  res
    .status(200)
    .json(new ApiResponse(
        200,
        problem,
        "Problem fetched successfully"
    ))
})

const AddCommentInProblem  = asyncHandler(async(req, res) => {
    const {problemId, commentId} = req.body;

    if(!problemId || !commentId){
        throw new ApiError(401, "ProblemId and CommentId is required!")
    }


    const problem = await Problem.findByIdAndUpdate(
        problemId,
        {
            $push:{
                comment:commentId
            }
        }
    )

    if(!problem){
        throw new ApiError(401, "there was some Error while adding Comment to Problem")
    }

    return res.status(200)
    .json(
        new ApiResponse(200, problem, "Comment added successfully")
    )
})

const getAllCommentOfProblem = asyncHandler(async(req, res) => {
    const {problemId} = req.body;

    if(!problemId){
        throw new ApiError(401, "ProblemId is required!")
    }

    const problem = await Problem.aggregate(
        [
            {
              $match:
                {
                  _id: new mongoose.Types.ObjectId(problemId),
                },
            },
            {
              $lookup: {
                from: "comments",
                localField: "comment",
                foreignField: "_id",
                as: "comment_Detail",
                pipeline: [
                  {
                    $lookup: {
                      from: "users",
                      localField: "owner",
                      foreignField: "_id",
                      as: "user_Detail",
                      pipeline: [
                        {
                          $project: {
                            username: 1,
                          },
                        },
                      ],
                    },
                  },
                  {
                    $project: {
                      content: 1,
                      user_Detail: 1,
                      comment: 1,
                      updatedAt: 1,
                      likeCount:1,
                    },
                  },
                ],
              },
            },
          ]
    )

    if (!problem) {
        throw new ApiError(401, "There was while fetching comments for problem")
    }

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        problem,
        "Comments fetched successfully"
    ))
})

const addSolution = asyncHandler(async(req, res) => {
    const { problemId,solutionId} = req.body;

    const problem = await Problem.findByIdAndUpdate(
        problemId,
        {
            $push:{
                solution:solutionId
            }
        }
    )
    return res.status(200)
    .json(
        new ApiResponse(200, problem, "Comment added successfully")
    )
})

const getAllSolution = asyncHandler(async(req, res) => {
    const {problemId} = req.body;

    const problem = await Problem.findById(problemId).populate('solution')

    return res.status(200)
    .json(
        new ApiResponse(200, problem.solution, "Comment added successfully")
    )

})


const getSolutionByLike = asyncHandler(async (req , res) => {
    const { problemId } = req.body;

    const problem = await Problem.aggregate(
      [
        {
          $match: {
            _id: new mongoose.Types.ObjectId(problemId)
          }
        },
        {
          $lookup: {
            from: "solutions",
            localField: 'solution',
            foreignField: '_id',
            as: "solutionDetail",
            pipeline:[
              {
                $lookup:{
                  from:"users",
                  localField: 'owner',
                  foreignField:'_id',
                  as:'userDetail',
                  pipeline:[
                    {
                      $project:{
                        avatar:1,
                        username:1
                      }
                    }
                  ]
                },
                
              },
            ]
          },
          
        },
        {
          $project: {
            solutionDetail:1
          }
        }
        
      ]
    )

    console.log(problem);
  return res.status(200).json(
    new ApiResponse(200, problem, "Most Liked Solutions fetched")
  );

})

const mostLikedSolution = asyncHandler(async (req , res) => {
    const { problemId } = req.body;

    if (!problemId) {
        throw new ApiError(401, "problemId not found")
    }
    console.log(problemId);
    
  const problem = await Problem.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(problemId)
      }
    },
    {
      $lookup: {
        from: "solutions",
        localField: "solution",
        foreignField: "_id",
        as: "result"
      }
    },
    {
      $unwind: "$result"
    },
    {
      $sort: {
        "result.likeCount": -1
      }
    },
    {
      $group: {
        _id: "$_id",
        maxLikeCountSolution: { $first: "$result" }
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "maxLikeCountSolution.owner",
        foreignField: "_id",
        as: "user"
      }
    },
    {
      $project: {
        _id: 1,
        userId: { $arrayElemAt: ["$user._id", 0] }
      }
    }
  ]);


    return res.status(200).json(
      new ApiResponse(200, problem, "Most Liked Solutions fetched")
    );

})


export {
    createProblem,
    getProblem,
    AddCommentInProblem,
    getAllCommentOfProblem,
    addSolution,
    getAllSolution,
    mostLikedSolution,
    getSolutionByLike,
}