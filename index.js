import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;
let todoList = [];
let check = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

const generateListTodo = (req, res, next) => {
    console.log(req.body);
    if("item" in req.body && req.body.item !== ""){
        let todo = req.body.item;
        todoList.push(todo);
        
        // console.log(todo);
        // console.log(todoList);
        // console.log("console true",req.body);
    }
    else{
        check = {...req.body};
        delete check["item"];
        console.log(check);
    }
    next();
}

app.use(generateListTodo);

// todoList.forEach((element, index) => {
//     document.querySelector("#item"+index+"[checked]").text.strike();
// });

app.get("/", (req, res) => {
    todoList = []
    res.render("index.ejs");
});

app.post("/", (req, res) => {
    res.render("index.ejs", {todoArr : todoList, check:check})
})

app.listen(PORT, (req, res) => {
    console.log(`Server is running on Port : ${PORT}`);
});