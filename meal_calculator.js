// Stores the diner name with what they ate
var diners = [
    {
        name: 'Ben',
        meal: ['chicken', 'broccoli', 'soup']
    },
    {
        name: 'Chrissy',
        meal: ['fish', 'carrots', 'wine']
    },
    {
        name: 'Deryk',
        meal: ['pasta', 'tea']
    }
];

var dishes = {
    // Stores dishes with the cost of the dish.  
    chicken: 10,
    broccoli: 2,
    soup: 4,
    fish: 12,
    carrots: 2,
    wine: 6,
    pasta: 11,
    tea: 1
};
function runMealCalculator(dinersArr, dishesArr, taxPercent, tipPercent) {
    getTotal(dinersArr, dishesArr, taxPercent, tipPercent);
    getBreakdown(dinersArr, dishesArr, taxPercent, tipPercent);
}

function getTotal(dinersArr, dishesArr, taxPercent, tipPercent) {
    var bill = calcBill(dinersArr, dishesArr);
    var tax = calcTax(bill, taxPercent);
    var totalBill = bill + tax;
    var tip = calcTip(totalBill, tipPercent);

    console.log('the total bill (including tax) is $' + totalBill);
    console.log('the total tip is $' + tip);
}

// Calculate the cost of the entire meal
function calcBill(dinersArr, dishesArr) {
    var meal = getEntireMeal(dinersArr);
    
    var pricesArr = meal.map(function(item) {
        return getProperty(item, dishesArr);
    });
    
    var bill = calcSum(pricesArr);
    
    return bill;
}

function getEntireMeal(dinersArr) {
    var entireMeal = [];

    dinersArr.map(function(obj) {
        obj.meal.map(function(item) {
            entireMeal.push(item); 
        });   
    });
    
    return entireMeal;
}

// retrieves the price of a single item
function getProperty(prop, array) {
    if(array.hasOwnProperty(prop)) {
        return array[prop];
    }
}

// function that sums up the total of an array of prices
function calcSum(array, currentTotal) {
    if (currentTotal === undefined) { currentTotal = 0};

    if(array.length > 0) {
        currentTotal += array[0];
        var remainingArray = array.slice(1);
        array = remainingArray;

        return calcSum(array, currentTotal);
    } else {
        return currentTotal;
    }
}

// Calculates the tax given a price and a tax percentage
function calcTax(bill, percent) {
    var tax = Math.round(bill * percent) / 100;
    return tax;
}

// Calculates the amount of a tip given a bill and a percentage
function calcTip(bill, percent) {
    var tip = Math.round(bill * percent) / 100;
    
    return tip;
}


function getBreakdown(dinersArr, dishesArr, taxPercent, tipPercent) {
    dinersArr.map(function(diner) {
        var dinerBill = calcDinerBill(diner, dishesArr);
        console.log(diner.name + '\'s bill: $' + dinerBill);
        
        var dinerTax = calcTax(dinerBill, taxPercent);
        console.log(diner.name + '\'s tax: $' + dinerTax); 
        
        var dinerTip = calcTip((dinerBill + dinerTax), tipPercent);
        console.log(diner.name + '\'s tip: $' + dinerTip);

        var dinerTotal = dinerBill + dinerTax + dinerTip;
        console.log(diner.name + '\'s total cost: $' + dinerTotal);
    });
}

function calcDinerBill(diner, dishesArr) {
    var dishPrices = [];
        
    diner.meal.map(function(item) {
        var itemPrice = getProperty(item, dishesArr);
        dishPrices.push(itemPrice);
    });
        
    var totalBill = calcSum(dishPrices);

    return totalBill;
}

// getTotal(diners, dishes, 8, 20);
runMealCalculator(diners, dishes, 7, 20);
// Calculate the cost per diner
// Calculate the tip per diner
// Calculate the tax per diner