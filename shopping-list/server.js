/* create an express instance */
const express = require("express");
const app = express();

/* initialize application state */
let nextId = 1;
let shoppingList = [];

function getById(id) {
    for (let item of shoppingList) {
        if (item.id === parseInt(id)) {
            return item;
        }
    }
    return null;
}

/* automatically convert request / response bodies */
app.use(express.json());

/* create the web server */
app.listen(3000, () => {
    console.log("Listening on port 3000");
});

/* define routes */
app.get("/items", (req, res) => {
    res.send(shoppingList);
});

app.post("/items", (req, res) => {
    let item = req.body;
    item.id = nextId;
    nextId++;
    shoppingList.push(item);
    res.status(201);
    res.send("");
});

app.get("/items/:id", (req, res) => {
    let item = getById(req.params.id);
    if (item) {
        res.send(item);
    } else {
        res.sendStatus(404);
    }
});

app.patch("/items/:id", (req, res) => {
    let item = getById(req.params.id);
    if (item) {
        item["item"] = req.body.item; // use index operator to avoid item.item
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});


app.delete("/items/:id", (req, res) => {
    let item = getById(req.params.id);
    if (item) {
        shoppingList = shoppingList.filter((value) => {
            return value.id !== item.id;
        })
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});
