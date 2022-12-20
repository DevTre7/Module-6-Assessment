const { shuffleArray } = require("./utils");

describe("shuffleArray should", () => {
  //check that it returns an array of the same length as the argument sent in

  test("check that it returns an array of the same length as the argument sent in", () => {
    expect(shuffleArray([1, 2, 3, 4, 5]).length).toBe(5);
  });
//--------------------------------------------
//Global variables that we are testing:
let newArray = [1, 2, 3, 4, 5];
let randomArray = shuffleArray(newArray);
let counter = 0;
//--------------------------------------------
//
test("check that it 'shuffleArray' is actually an Array (data type)", () => {
    expect(Array.isArray(shuffleArray(newArray))).toBe(true);
  });

//--------------------------------------------

  test("check that the numbers in the array are same regardless of order", () => {
    // let newArray = [1, 2, 3, 4, 5];
    // let randomArray = shuffleArray(newArray);
    // let counter = 0;

    //In order to do this we go 
    for (let i = 0; i < randomArray.length; i++) {
      //console.log(shuffledArray[i])

      for (let c = 0; c < newArray.length; c++) {
        if (randomArray[i] === newArray[c]) {
          counter++;
        }
      }
    }
    console.log(counter);
    expect(randomArray.length === counter ).toBe(true);
  });
  //---------------------------------------------------------
});
