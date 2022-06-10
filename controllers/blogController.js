const Blog = require("../models/blogs")

const blogIndex = (req, res) =>{
    Blog.find().sort({createdAt : -1})
        .then((result) => {
            res.render("index", {title: "All Blogs", blogs: result})
        })
        .catch(err => console.log(err))
    
}

const blogCreatePost = (req, res) => {
    const blog =  new Blog(req.body)

    blog.save()
        .then(result => res.redirect("/blogs"))
        .catch(err => console.log(err))
}

const blogCreateGet = (req, res) => {
    res.render("create", { title : "Create a new blog" })
}

const blogDetails = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => res.render("details", { blogs: result, title: "Blog Details" }))
        .catch(err =>  res.status(404).render("404", {title : "404"}))
}

const blogDelete = (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => res.json({redirect: "/blogs"}))
        .catch(err => console.log(err))
}

module.exports = {
    blogIndex,
    blogCreatePost,
    blogCreateGet,
    blogDetails,
    blogDelete
}