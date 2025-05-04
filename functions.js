

let defense = new Defense();
document.getElementById("money").innerText = 0;
document.addEventListener("DOMContentLoaded", getMoney);
let totalMoney = 0;


function Test(name) {

    this.name = name;

    this.getName = function(){
        return this.name;
    }
}


function classTest(){
    let testo = new Test("nameer");
    document.getElementById("tester").innerText = testo.getName();
}


// module class
function Module(cost, name, breachResist, physResist) {
    this.cost = cost;
    this.name = name;
    this.breachResist = breachResist;
    this.physResist = physResist;

    this.breachTest = function(breachVal) {
        let breacher = breachVal - this.breachResist;
        this.breachResist = this.breachResist * (breachVal - (breachVal/this.breachResist))/breachVal;
        return breacher; 
    }

    this.physTest = function(physVal) {
        let phys = physVal - this.physResist;
        this.physResist = this.physResist * (physVal - (physVal/this.physResist))/physVal;
        return phys;
    }

    this.getCost = function(){
        return this.cost;
    }
    
    this.getName = function() {
        return this.name;
    }

    this.getBreach = function() {
        return this.breachResist;
    }

    this.getPhysical = function(){
        return this.physResist;
    }    
}

// defense class
function Defense() {
    this.modules = []

    // Parameter: Module
    // Adds a module if no module exists with the current name
    // Returns true/false if adding was successful
    this.addModule = function(mod){
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

    this.hasModule = function(modName){
        let already = false;
        for (let i = 0; i < this.modules.length; i++)
            if (this.modules[i].getName() == modName)
                already = true;
        return already;
    }

    // Parameter: String
    // Removes module with modName from list and returns cost
    // Returns: Cost of removed module
    this.removeModuleByName = function(modName) {
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
    this.removeModule = function(mod) {
        let cost = 0;
        for (let i = 0; i < this.modules.length; i++) {
            if (this.modules[i].getName() == mod.getName()) {
                cost = this.modules[i].getCost();
            }
        }
        if (cost != 0) {
            this.modules = this.modules.filter((i) => i.getName() != mod.getName())
        }
    }

    // Parameter: Integer
    // Whittles down defenses
    // Returns: true
    this.breach = function(attackStrength) {
        for (let i = 0; i < this.modules.length; i++ ){
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

    this.phys = function(attackStrength) {
        for (let i = 0; i < this.modules.length; i++ ){
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

    this.getBreach = function() {
        
        let brrr = 0;
        for (let i = 0; i < this.modules.length; i++ ){
            brrr += this.modules[i].getBreach();
        }
        return brrr;
    }

    this.getPhys = function() {
        
        let brrr = 0;
        
        for (let i = 0; i < this.modules.length; i++){
            brrr += this.modules[i].getPhysical();
        }
        
        return brrr;
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
    totalMoney = document.getElementById("money").innerText;
    updateButtons();
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
    updateButtons();
}

function showMoney(){
    document.getElementById("money").innerText ;
}

// Types of modules



function addModule(name){
    
    let firewall    = new Module(120000, "Firewall", 9, 3);
    let encryption  = new Module(140000, "Encryption", 6, 6);
    let Network     = new Module(220000, "Network", 5, 9);
    let antivirus   = new Module(180000, "Antivirus", 7, 8);
    let two         = new Module(80000, "TwoStep", 5, 5);
    let scanners    = new Module(150000, "Scanners", 6, 5);
    let money = parseInt(document.getElementById("money").innerText);
    let cost = 0;

   
    
    if (name == "firewall" || name == "Firewall"){
        cost = firewall.getCost();
        
        if (defense.hasModule("Firewall")) {
            defense.removeModuleByName("Firewall");
            spendMoney(-1*cost);   
        }
        else if (money >= cost) {
            spendMoney(defense.addModule(firewall));
        }
    }
    else if (name == "encryption" || name == "Encryption"){
        cost = encryption.getCost();
        if (defense.hasModule("Encryption")) {
            defense.removeModuleByName("Encryption");
            spendMoney(-1*cost);   
        }
        else if (money >= cost) {
            spendMoney(defense.addModule(encryption));
        }    
    }
    else if (name == "network" || name == "Network"){
        cost = Network.getCost();
        if (defense.hasModule("Network")) {
            defense.removeModuleByName("Network");
            spendMoney(-1*cost);   
        }
        else if (money >= cost) {
            spendMoney(defense.addModule(Network));
        }   
    }
    else if (name == "antivirus" || name == "Antivirus"){
        cost = antivirus.getCost();
        if (defense.hasModule("Antivirus")) {
            defense.removeModuleByName("Antivirus");
            spendMoney(-1*cost);   
        }
        else if (money >= cost) {
            spendMoney(defense.addModule(antivirus));
        }    
    }
    else if (name == "twostep" || name == "TwoStep"){
        cost = two.getCost();
        if (defense.hasModule("TwoStep")) {
            defense.removeModuleByName("TwoStep");
            spendMoney(-1*cost);   
        }
        else if (money >= cost) {
            spendMoney(defense.addModule(two));
        }   
    }
    else if (name == "scanners" || name == "Scanners"){
        cost = scanners.getCost();
        if (defense.hasModule("Scanners")) {
            defense.removeModuleByName("Scanners");
            spendMoney(-1*cost);   
        }
        else if (money >= cost) {
            spendMoney(defense.addModule(scanners));
        }    
    }
}






// function to update our element classes when money no money

function updateBar() {
    let bar = document.getElementById("bar");
    let percent = ((document.getElementById("money").innerText/totalMoney)*100);
    bar.style.height = percent + "%";
    bar.style.backgroundColor = "rgb(" + (255-percent*2.55) +",200,70)";
    document.getElementById("tester").innerText = bar.style.backgroundColor;
}

function updateButtons(){    
    updateBar();
    

    let firewall    = new Module(120000, "Firewall", 10, 3);
    let encryption  = new Module(140000, "Encryption", 6, 6);
    let Network     = new Module(220000, "Network", 5, 10);
    let antivirus   = new Module(180000, "Antivirus", 7, 9);
    let two         = new Module(80000, "TwoStep", 5, 5);
    let scanners    = new Module(150000, "Scanners", 7, 6);
    // firewall
    if (defense.hasModule("Firewall")){
        document.getElementById("firewall").classList.add("boughtbutton");
    }
    else if (document.getElementById("money").innerText < firewall.getCost()) {
        document.getElementById("firewall").classList.add("deadbutton");
    }
    else {
        document.getElementById("firewall").classList.remove("boughtbutton");
        document.getElementById("firewall").classList.remove("deadbutton");
    }
    

    // encryption
    if (defense.hasModule("Encryption")){
        document.getElementById("encryption").classList.add("boughtbutton");
    }
    else if (document.getElementById("money").innerText < encryption.getCost()) {
        document.getElementById("encryption").classList.add("deadbutton");
    }
    else {
        document.getElementById("encryption").classList.remove("deadbutton");
        document.getElementById("encryption").classList.remove("boughtbutton");
    }

    // Network
    if (defense.hasModule("Network")){
        document.getElementById("network").classList.add("boughtbutton");
    }
    else if (document.getElementById("money").innerText < Network.getCost()) {
        document.getElementById("network").classList.add("deadbutton");
    }
    else {
        document.getElementById("network").classList.remove("deadbutton");
        document.getElementById("network").classList.remove("boughtbutton");
    }

    // antivirius
    if (defense.hasModule("Antivirus")){
        document.getElementById("antivirus").classList.add("boughtbutton");
    }
    else if (document.getElementById("money").innerText < antivirus.getCost()) {
        document.getElementById("antivirus").classList.add("deadbutton");
    }
    else {
        document.getElementById("antivirus").classList.remove("deadbutton");
        document.getElementById("antivirus").classList.remove("boughtbutton");
    }

    // two
    if (defense.hasModule("TwoStep")){
        document.getElementById("twostep").classList.add("boughtbutton");
    }
    else if (document.getElementById("money").innerText < two.getCost()) {
        document.getElementById("twostep").classList.add("deadbutton");
    }
    else {
        document.getElementById("twostep").classList.remove("deadbutton");
        document.getElementById("twostep").classList.remove("boughtbutton");
    }

    // scanners
    if (defense.hasModule("Scanners")){
        document.getElementById("scanners").classList.add("boughtbutton");
    }
    else if (document.getElementById("money").innerText < scanners.getCost()) {
        document.getElementById("scanners").classList.add("deadbutton");
    }
    else {
        document.getElementById("scanners").classList.remove("deadbutton");
        document.getElementById("scanners").classList.remove("boughtbutton");
    }


    document.getElementById("breach").innerText = defense.getBreach();
    document.getElementById("phys").innerText = defense.getPhys();
    
}
