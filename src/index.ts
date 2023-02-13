import express, {Request,Response} from 'express'
import bodyParser from "body-parser";
import {h2BlogsRouter} from "./routes/blogs.routes";
import {h2PostsRouter} from "./routes/posts.routes";
import {h2TestingRouter} from "./routes/testing.routes";

const app = express()
const port = process.env.PORT || 3333
const parserMiddleware = bodyParser({})

app.use(parserMiddleware)
app.use("/blogs", h2BlogsRouter)
app.use("/posts", h2PostsRouter)
app.use("/testing", h2TestingRouter)



app.listen(port, () => {console.log(`Example app listening on port ${port}`)})
