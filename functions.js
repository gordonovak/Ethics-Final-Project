
let defense = Defense();
document.getElementById("money") = 0;

// module class
class Module {
    constructor(cost, name, breachResist, physResist) {
        this.cost = cost;
        this.name = name;
        this.breachResist = breachResist;
        this.physResist = physResist;
    }

    breachTest(breachVal) {
        let breacher = breachVal - this.breachResist;
        this.breachResist = this.breachResist * (breachVal - (breachVal/this.breachResist))/breachVal;
        return breacher; 
    }

    physTest(physVal) {
        let phys = physVal - this.physResist;
        this.physResist = this.physResist * (physVal - (physVal/this.physResist))/physVal;
        return phys;
    }

    getCost(){
        return this.cost
    }
    
    getName() {
        return this.name
    }
}

// defense class
class Defense {
    constructor() {
        this.modules = []
    }

    // Parameter: Module
    // Adds a module if no module exists with the current name
    // Returns true/false if adding was successful
    addModule(mod){
        let already = false;
        for (let i = 0; i < this.modules.length; i++)
            if (this.modules[i].getName() == mod.getName())
                already = true;
        if (already) {
            document.getElementById("output").innerText = "Oops you already have that module";
            return 0;
        }
        else {
            this.modules.push(mod);
            document.getElementById("output").innerText = "Added module " + mod.getName() + "successfully.";
            return mod.getCost();
        }
    }

    // Parameter: String
    // Removes module with modName from list and returns cost
    // Returns: Cost of removed module
    removeModuleByName(modName) {
        let cost = 0;
        for (let i = 0; i < this.modules.length; i++) {
            if (this.modules[i].getName() == modName) {
                cost = this.modules[i].getCost();
            }
        }
        if (cost !== 0) {
            this.modules = this.modules.filter((i) => i.getName() != modName)
        }
    }

    // Parameter: Module
    // Removes module from list
    // Returns: Cost of removed module
    removeModule(mod) {
        let cost = 0;
        for (let i = 0; i < this.modules.length; i++) {
            if (this.modules[i].getName() == mod.getName()) {
                cost = this.modules[i].getCost();
            }
        }
        if (cost !== 0) {
            this.modules = this.modules.filter((i) => i.getName() != mod.getName())
        }
    }

    // Parameter: Integer
    // Whittles down defenses
    // Returns: true
    breach(attackStrength) {
        for (let i = 0; i < this.modules.length(); i++ ){
            attackStrength = this.modules[i].breachTest(attackStrength);
        }
        if (attackStrength > 0) {
            document.getElementById("breach").innerText = "Breached!";
            return false;
        }
        else {
            document.getElementById("breach").innerText = "Resisted Breach!";
            return true;
        }
    }

    phys(attackStrength) {
        for (let i = 0; i < this.modules.length(); i++ ){
            attackStrength = this.modules[i].physTest(attackStrength);
        }
        if (attackStrength > 0) {
            document.getElementById("phys").innerText = "Shut Down!";
            return false;
        }
        else {
            document.getElementById("breach").innerText = "Resisted Physical Attack!";
            return true;
        }
    }
}

// functions to help manage getElement by ID
function e(text){
    return document.getElementById(type).innerText;
}

// allows you to set element easier
function e(type, input){
    document.getElementById(type).innerText = input;
    return document.getElementById(type).innerText;
}

// gets the money, yay
function getMoney() {
    let moneyDecider = Math.random();
    if (moneyDecider < 0.3333)
        e("money", 380000)
    else if (moneyDecider < 0.6666)
        e("money", 520000);
    else
        e("money", 665000);
}

// Function to show the saved name
function spendMoney(dollars){
    if (dollars > parseInt(document.getElementById("money").innerText)) {
        e("output", "You don't have enough money for that!");
    }
    else {
        document.getElementById("money").innerText -= dollars;
        e("output", "You spent $" + dollars + "!");
    }
}

function showMoney(){
    document.getElementById("money").innerText ;
}

function addModule(name){

    if (name == "firewall" || name == "Firewall"){
        spendMoney(50000);
            
    }
    else if (name == "encryption" || name == "encryption"){
        
    }
}


