var sprintf = require('sprintf-js').sprintf;
var fs = require('fs');

// Acts as a server for now
var content = fs.readFileSync("rates.json");
multiplier = JSON.parse(content);

var base = 1000;

function generateRNG() {
    var rng = Math.random() * base;
    var ret = "none";

    if(rng < multiplier.COSMIC * base) {
        ret = "cosmic";
    }
    else if(rng < multiplier.EXTREMERARE * base) {
        ret = "extreme";
    }
    else if(rng < multiplier.VERYRARE * base) {
        ret = "very rare";
    }
    else if(rng < multiplier.RARE * base) {
        ret = "rare";
    }
    else if(rng < multiplier.UNCOMMON * base) {
        ret = "uncommon";
    }
    else if(rng < multiplier.COMMON * base) {
        ret = "common";
        multiplier.COSMIC += 0.010;
    }

    var string = "{ \"COMMON\": 0.75, \"UNCOMMON\": 0.25, \"RARE\": 0.15, \"VERYRARE\": 0.05, \"EXTREMERARE\": 0.025, \"COSMIC\": " + multiplier.COSMIC + "}";
    console.log(string);

    fs.writeFileSync("rates.json", JSON.stringify(string));

    return ret;
}

function dump(rng) {
    console.log(sprintf("\n%20s%s\n%20s%f\n%20s%f\n%20s%f\n%20s%f\n%20s%f\n%20s%s\n",
    "Result: ", rng,
    "Common Rate: ", multiplier.COMMON,
    "Uncommon Rate: ", multiplier.UNCOMMON,
    "Rare Rate: ", multiplier.RARE,
    "Very Rare Rate: ", multiplier.VERYRARE,
    "Extreme Rare Rate: ", multiplier.EXTREMERARE,
    "Cosmic Rate: ", multiplier.COSMIC)
    );
}

dump(generateRNG());