const cors = require("cors");

const express = require("express");
const app = express();
const { bots, playerRecord } = require("./data");
const { shuffleArray } = require("./utils");

app.use(express.json());
app.use(cors());

//This line of code makes my "index.html" file from "public" folder run on the "localhost:4000" url
app.use(express.static(`${__dirname}/public`))


//

app.get("/api/robots", (req, res) => {
  try {
    res.status(200).send(bots); //fixed the "see All Bots " button should work now
    rollbar.log("Bots were successfull");
    rollbar.log(bots);
  } catch (error) {
    console.log("ERROR GETTING BOTS", error);
    res.sendStatus(400);
  }
});

app.get("/api/robots/five", (req, res) => {
  try {
    let shuffled = shuffleArray(bots);
    let choices = shuffled.slice(0, 5);
    let compDuo = shuffled.slice(6, 8);
    res.status(200).send({ choices, compDuo });
  } catch (error) {
    console.log("ERROR GETTING FIVE BOTS", error);
    res.sendStatus(400);
  }
});

app.post("/api/duel", (req, res) => {
  try {
    // getting the duos from the front end
    let { compDuo, playerDuo } = req.body;

    // adding up the computer player's total health and attack damage
    let compHealth = compDuo[0].health + compDuo[1].health;
    let compAttack =
      compDuo[0].attacks[0].damage +
      compDuo[0].attacks[1].damage +
      compDuo[1].attacks[0].damage +
      compDuo[1].attacks[1].damage;

    // adding up the player's total health and attack damage
    let playerHealth = playerDuo[0].health + playerDuo[1].health;
    let playerAttack =
      playerDuo[0].attacks[0].damage +
      playerDuo[0].attacks[1].damage +
      playerDuo[1].attacks[0].damage +
      playerDuo[1].attacks[1].damage;

    // calculating how much health is left after the attacks on each other
    let compHealthAfterAttack = compHealth - playerAttack;
    let playerHealthAfterAttack = playerHealth - compAttack;

    // comparing the total health to determine a winner
    if (compHealthAfterAttack > playerHealthAfterAttack) {
      playerRecord.losses++;
      res.status(200).send("You lost!");
    } else {
      playerRecord.losses++;
      res.status(200).send("You won!");
    }
  } catch (error) {
    console.log("ERROR DUELING", error);
    res.sendStatus(400);
  }
});

app.get("/api/player", (req, res) => {
  try {
    res.status(200).send(playerRecord);
    rollbar.log("Successfully got player's status!");
    rollbar.log(playerRecord);

  } catch (error) {
    console.log("ERROR GETTING PLAYER STATS", error);
    res.sendStatus(400);
    rollbar.error(" Getting player status failed.");
    rollbar.error(error);
  }
});

app.listen(4000, () => {
  console.log(`Listening on 4000`);
});

//Rollbar Code (Access Key):
// include and initialize the rollbar library with your access token
var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: "f24b57c78bd7495fb1e47aa7c4771ddc",
  captureUncaught: true,
  captureUnhandledRejections: true,
});

// record  generic messages and send it to Rollbar
rollbar.log("Hello Whats up!");
rollbar.warning("This message is for when the api call fails");
rollbar.error(" At least one test failed");
rollbar.info("The test was a Success!");
