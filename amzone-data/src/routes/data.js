const router = require("express").Router();
const { Search, renewDataInDataBase } = require("../controller/dataFetch");
const { fetchDataByCategory } = require("../controller/dataGetFromDatabase");

router.get("/bestSeller", async (req, res) => {
  try {
    const URL = "TV";
    const data = await Search(URL);
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.get("/category/:data", async (req, res) => {
  try {
    console.log(req.params.data);
    const data = await fetchDataByCategory(req.params.data);
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});
router.get("/renewDataInDB/:id", async (req, res) => {
  try {
    const arrays1 = ["Men Clothes", "Women Clothes", "Watch"];
    const arrays2 = ["Footware", "Phone", "Grocery"];
    const arrays3 = ["Electronics", "Earburds", "Laptops", "Bags and Luggage"];
    let arrays = [];
    if (req.params.id == "1") {
      arrays = arrays1;
    } else if (req.params.id=="2") {
      arrays = arrays2;
    } else if (req.params.id=="3") {
      arrays = arrays3;
    }
    console.log(arrays);
    await renewDataInDataBase(arrays);
    res.status(200).send("data store sucessfully.");
  } catch (err) {
    res.status(400).send(err);
  }
});
module.exports = router;
