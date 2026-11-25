// Import Express
import express from "express";
import { faker } from '@faker-js/faker';

// create app
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));


// Index
app.get("/", (req, res) => {
    res.render("index", { title: "AI Overview | Home", page: "home" });
});

// ML
app.get("/ml", (req, res) => {
    res.render("ml", { title: "AI Overview | Machine Learning", page: "ml" });
});

// LLM
app.get("/llm", (req, res) => {
    res.render("llm", { title: "AI Overview | Large Language Models", page: "llm" });
});

// Uses
app.get("/uses", (req, res) => {
    const team = [];
    for (let i = 0; i < 5; i++) {
        team.push({ name: faker.person.fullName(), role: faker.person.jobTitle(), company: faker.company.name() });
    }
    res.render("uses", { title: "AI Overview | Uses and Ethics", page: "uses", team });
});

app.get("/explore", async(req, res) => {
    const response = await fetch("https://en.wikipedia.org/api/rest_v1/page/summary/Artificial_intelligence");
    const data = await response.json();
    res.render("explore", { title: "AI Overview | Explore AI", page: "explore", data });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});