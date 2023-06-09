const blogsRouter = require("express").Router()
const jwt = require("jsonwebtoken")
const { SECRET } = require("../utlis/config")
const Blog = require("../models/Blog")
const User = require("../models/User")
const { userExtractor } = require("../utlis/middleware")
const { default: mongoose } = require("mongoose")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
    .populate("user", { blogs: 0 })
    .populate({
      path: "comments",
      populate: {
        path: "user",
        model: "User",
        select: "username",
      },
    })
  //blogs.map((b) => console.log(b.toJSON()));
  response.json(blogs)
})

blogsRouter.post("/", userExtractor, async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" })
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({ ...request.body, user: user._id })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete("/:id", userExtractor, async (request, response, next) => {
  const { id } = request.params
  try {
    const blog = await Blog.findById(id)
    if (!blog) response.status(404).end()
    if (request.user.toString() === blog.user.toString()) {
      ;(await blog.deleteOne())
        ? response.status(204).end()
        : response.status(404).end()
    } else {
      const Authorization = new Error("Only allowed to delete your own blogs")
      Authorization.name = "Authorization"
      throw Authorization
    }
  } catch (error) {
    next(error)
  }
})

blogsRouter.put("/:id", userExtractor, async (request, response, next) => {
  const { id } = request.params
  const { body } = request
  try {
    const blog = await Blog.findById(id)
    if (!blog) response.status(404).end()
    if (blog.user.toString() === request.user.toString()) {
      const result = await Blog.findByIdAndUpdate(
        id,
        { ...body },
        { runValidators: true, new: true }
      )
      result ? response.status(200).json(result) : response.status(404).end()
    } else {
      const Authorization = new Error("Only allowed to update your own blogs")
      Authorization.name = "Authorization"
      throw Authorization
    }
  } catch (error) {
    next(error)
  }
})

blogsRouter.put(
  "/:id/likes",
  userExtractor,
  async (request, response, next) => {
    const id = request.params.id
    try {
      const findUser = await User.findById(request.user)
      if (!findUser) {
        const mustLogin = new Error("Must be logged in to like a blog")
        mustLogin.name = "LoginRequired"
        throw mustLogin
      } else {
        const result = await Blog.findByIdAndUpdate(id, {
          runValidators: true,
          new: true,
          $inc: { likes: 1 },
        })
        result ? response.status(200).json(result) : response.status(404).end()
      }
    } catch (error) {
      next(error)
    }
  }
)

blogsRouter.put(
  "/:id/comments",
  userExtractor,
  async (request, response, next) => {
    const id = request.params.id
    try {
      const findUser = await User.findById(request.user)
      if (!findUser) {
        const mustLogin = new Error("Must be logged in to leave a comment")
        mustLogin.name = "LoginRequired"
        throw mustLogin
      } else {
        const result = await Blog.findByIdAndUpdate(id, {
          runValidators: true,
          new: true,
          $push: {
            comments: { user: findUser._id, comment: request.body.comment },
          },
        })
        result ? response.status(200).json(result) : response.status(404).end()
      }
    } catch (error) {
      next(error)
    }
  }
)

module.exports = blogsRouter
