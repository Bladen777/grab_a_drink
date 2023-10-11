import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3001;
const API_URL="https://www.thecocktaildb.com/api/json/v1/1/random.php";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", async (req,res)=>{
try{
const response = await axios.get(API_URL);
const drink         = response.data.drinks[0];


const drink_name    =drink.strDrink;
const drink_instr   =drink.strInstructions;
const drink_img     =drink.strDrinkThumb;

var ingredients_amt         =[];
var scan =1;

while (drink["strIngredient"+scan]){
    ingredients_amt.push(
        drink["strMeasure"+scan] + " " + drink["strIngredient"+scan]
    );
    scan ++
};

console.log(ingredients_amt);
console.log(drink_name);
res.render("index.ejs",{
    drink_name:drink_name,
    drink_instr:drink_instr,
    drink_img:drink_img,
    ingredients_amt:ingredients_amt

});
}
catch(error){
    console.error(error);
    res.status(500);

}

});




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });