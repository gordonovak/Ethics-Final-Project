let defense = new Defense();
document.getElementById("money").innerText = 0;
document.addEventListener("DOMContentLoaded", getMoney);
let totalMoney = 0;

// module class
function Module(cost, name, breachResist, physResist) {
  this.cost = cost;
  this.name = name;
  this.breachResist = breachResist;
  this.physResist = physResist;

  this.breachTest = function (breachVal) {
    let breacher = breachVal;
    breachVal -= this.breachResist;
    this.breachResist -= breacher / 2;
    return breachVal;
  };

  this.physTest = function (physVal) {
    let phys = physVal;
    physVal -= this.physResist;
    this.physResist -= phys / 2;
    return physVal;
  };

  this.getCost = function () {
    return this.cost;
  };

  this.getName = function () {
    return this.name;
  };

  this.getBreachy = function () {
    return this.breachResist;
  };

  this.getPhysical = function () {
    return this.physResist;
  };
}

// defense class
function Defense() {
  this.modules = [];

  this.origBreach = 0;
  this.origPhys = 0;

  this.setOrigBreach = function (input) {
    this.origBreach = input;
  };

  this.setOrigPhys = function (input) {
    this.origPhys = input;
  };

  // Parameter: Module
  // Adds a module if no module exists with the current name
  // Returns true/false if adding was successful
  this.addModule = function (mod) {
    let already = false;
    for (let i = 0; i < this.modules.length; i++)
      if (this.modules[i].getName() == mod.getName()) already = true;
    if (already) {
      document.getElementById("output").innerText =
        "Oops you already have that module";
      return 0;
    } else {
      this.modules.push(mod);
      document.getElementById("output").innerText =
        "Added module " + mod.getName() + "successfully.";
      return mod.getCost();
    }
  };

  this.hasModule = function (modName) {
    let already = false;
    for (let i = 0; i < this.modules.length; i++)
      if (this.modules[i].getName() == modName) already = true;
    return already;
  };

  // Parameter: String
  // Removes module with modName from list and returns cost
  // Returns: Cost of removed module
  this.removeModuleByName = function (modName) {
    let cost = 0;
    for (let i = 0; i < this.modules.length; i++) {
      if (this.modules[i].getName() == modName) {
        cost = this.modules[i].getCost();
      }
    }
    if (cost !== 0) {
      this.modules = this.modules.filter((i) => i.getName() != modName);
    }
  };

  // Parameter: Module
  // Removes module from list
  // Returns: Cost of removed module
  this.removeModule = function (mod) {
    let cost = 0;
    for (let i = 0; i < this.modules.length; i++) {
      if (this.modules[i].getName() == mod.getName()) {
        cost = this.modules[i].getCost();
      }
    }
    if (cost != 0) {
      this.modules = this.modules.filter((i) => i.getName() != mod.getName());
    }
  };

  // Parameter: Integer
  // Whittles down defenses
  // Returns: true
  this.breach = function (attackStrength) {
    
    for (let i = 0; i < this.modules.length; i++) {
        attackStrength = Math.abs(attackStrength);
      attackStrength = this.modules[i].breachTest(attackStrength);
    }
    let breachy = false;
    if (attackStrength > 0) {
      breachy = false;
    } else {
      breachy = true;
    }

    document.getElementById("breach").innerText =
      defense.getBreach() + " (" + (this.getBreach() - this.origBreach) + ")";
    return breachy;
  };

  this.phys = function (attackStrength) {
    
    for (let i = 0; i < this.modules.length; i++) {
      let as = attackStrength;
      if (this.modules[i].getPhysical() > 0) {
        attackStrength = Math.abs(attackStrength);
        as = this.modules[i].physTest(attackStrength);
      }
      attackStrength = as;
    }
    let breachy = false;
    if (attackStrength > 0) {
      breachy = false;
    } else {
      breachy = true;
    }
    document.getElementById("phys").innerText =
      defense.getPhys() + " (" + (this.getPhys() - this.origPhys) + ")";
    return breachy;
  };

  this.getBreach = function () {
    let brrr = 0;
    for (let i = 0; i < this.modules.length; i++) {
      brrr += this.modules[i].getBreachy();
    }
    return brrr;
  };

  this.getPhys = function () {
    let brrr = 0;

    for (let i = 0; i < this.modules.length; i++) {
      brrr += this.modules[i].getPhysical();
    }

    return brrr;
  };

  this.getLength = function () {
    return this.modules.length;
  };

  this.getIndex = function (i) {
    if (i >= 0 && i < this.modules.length) return this.modules[i];
    else return new Module(0, "VOID", 0, 0);
  };
}

// functions to help manage getElement by ID
function e(text) {
  return document.getElementById(type).innerText;
}

// allows you to set element easier
function e(type, input) {
  document.getElementById(type).innerText = input;
  return document.getElementById(type).innerText;
}

// gets the money, yay
function getMoney() {
  let moneyDecider = Math.random();
  if (moneyDecider < 0.3333) e("money", 380000);
  else if (moneyDecider < 0.6666) e("money", 520000);
  else e("money", 665000);
  totalMoney = document.getElementById("money").innerText;
  document.getElementById("totalMoney").innerText = totalMoney;
  updateButtons();
}

// Function to show the saved name
function spendMoney(dollars) {
  if (dollars > parseInt(document.getElementById("money").innerText)) {
    e("output", "You don't have enough money for that!");
  } else {
    document.getElementById("money").innerText -= dollars;
    e("output", "You spent $" + dollars + "!");
  }
  updateButtons();
}

function showMoney() {
  document.getElementById("money").innerText;
}

// Types of modules

function addModule(name) {
  let firewall = new Module(120000, "Firewall", 9, 3);
  let encryption = new Module(140000, "Encryption", 6, 6);
  let Network = new Module(220000, "Network", 5, 9);
  let antivirus = new Module(180000, "Antivirus", 7, 8);
  let two = new Module(80000, "TwoStep", 5, 5);
  let scanners = new Module(150000, "Scanners", 6, 5);
  let exec = new Module(37000, "Exec", -1, -1);
  let money = parseInt(document.getElementById("money").innerText);
  let cost = 0;

  if (document.getElementById("computer").style.display != "flex") {
    if (name == "firewall" || name == "Firewall") {
      cost = firewall.getCost();

      if (defense.hasModule("Firewall")) {
        defense.removeModuleByName("Firewall");
        spendMoney(-1 * cost);
      } else if (money >= cost) {
        spendMoney(defense.addModule(firewall));
      }
    } else if (name == "encryption" || name == "Encryption") {
      cost = encryption.getCost();
      if (defense.hasModule("Encryption")) {
        defense.removeModuleByName("Encryption");
        spendMoney(-1 * cost);
      } else if (money >= cost) {
        spendMoney(defense.addModule(encryption));
      }
    } else if (name == "network" || name == "Network") {
      cost = Network.getCost();
      if (defense.hasModule("Network")) {
        defense.removeModuleByName("Network");
        spendMoney(-1 * cost);
      } else if (money >= cost) {
        spendMoney(defense.addModule(Network));
      }
    } else if (name == "antivirus" || name == "Antivirus") {
      cost = antivirus.getCost();
      if (defense.hasModule("Antivirus")) {
        defense.removeModuleByName("Antivirus");
        spendMoney(-1 * cost);
      } else if (money >= cost) {
        spendMoney(defense.addModule(antivirus));
      }
    } else if (name == "twostep" || name == "TwoStep") {
      cost = two.getCost();
      if (defense.hasModule("TwoStep")) {
        defense.removeModuleByName("TwoStep");
        spendMoney(-1 * cost);
      } else if (money >= cost) {
        spendMoney(defense.addModule(two));
      }
    } else if (name == "scanners" || name == "Scanners") {
      cost = scanners.getCost();
      if (defense.hasModule("Scanners")) {
        defense.removeModuleByName("Scanners");
        spendMoney(-1 * cost);
      } else if (money >= cost) {
        spendMoney(defense.addModule(scanners));
      }
    } else if (name == "Exec" || name == "exec") {
      cost = exec.getCost();
      if (!defense.hasModule("Exec") && money >= cost) {
        spendMoney(defense.addModule(exec));
        document.getElementById("exectooltip").innerText = "No Refunds";
      }
    }
  }
}

// function to update our element classes when money no money

function updateBar() {
  let bar = document.getElementById("bar");
  let percent = (document.getElementById("money").innerText / totalMoney) * 100;
  bar.style.height = percent + "%";
  bar.style.backgroundColor = "rgb(" + (255 - percent * 2.55) + ",200,70)";
  document.getElementById("tester").innerText = bar.style.backgroundColor;
}

function updateButtons() {
  updateBar();

  let firewall = new Module(120000, "Firewall", 10, 3);
  let encryption = new Module(140000, "Encryption", 6, 6);
  let Network = new Module(220000, "Network", 5, 10);
  let antivirus = new Module(180000, "Antivirus", 7, 9);
  let two = new Module(80000, "TwoStep", 5, 5);
  let scanners = new Module(150000, "Scanners", 7, 6);

  document.getElementById("output").innerText =
    document.getElementById("computer").style.display;
  if (document.getElementById("computer").style.display == "flex") {
    document.getElementById("firewall").classList.add("disablebutton");
    document.getElementById("encryption").classList.add("disablebutton");
    document.getElementById("network").classList.add("disablebutton");
    document.getElementById("antivirus").classList.add("disablebutton");
    document.getElementById("twostep").classList.add("disablebutton");
    document.getElementById("scanners").classList.add("disablebutton");
    if (!defense.hasModule("Exec")) {
      document.getElementById("exec").classList.add("disablebutton");
      document.getElementById("exectooltip").innerText = "Good Choice";
    }
  } else {
    // firewall
    if (defense.hasModule("Firewall")) {
      document.getElementById("firewall").classList.add("boughtbutton");
    } else if (
      document.getElementById("money").innerText < firewall.getCost()
    ) {
      document.getElementById("firewall").classList.add("deadbutton");
    } else {
      document.getElementById("firewall").classList.remove("boughtbutton");
      document.getElementById("firewall").classList.remove("deadbutton");
    }

    // encryption
    if (defense.hasModule("Encryption")) {
      document.getElementById("encryption").classList.add("boughtbutton");
    } else if (
      document.getElementById("money").innerText < encryption.getCost()
    ) {
      document.getElementById("encryption").classList.add("deadbutton");
    } else {
      document.getElementById("encryption").classList.remove("deadbutton");
      document.getElementById("encryption").classList.remove("boughtbutton");
    }

    // Network
    if (defense.hasModule("Network")) {
      document.getElementById("network").classList.add("boughtbutton");
    } else if (document.getElementById("money").innerText < Network.getCost()) {
      document.getElementById("network").classList.add("deadbutton");
    } else {
      document.getElementById("network").classList.remove("deadbutton");
      document.getElementById("network").classList.remove("boughtbutton");
    }

    // antivirius
    if (defense.hasModule("Antivirus")) {
      document.getElementById("antivirus").classList.add("boughtbutton");
    } else if (
      document.getElementById("money").innerText < antivirus.getCost()
    ) {
      document.getElementById("antivirus").classList.add("deadbutton");
    } else {
      document.getElementById("antivirus").classList.remove("deadbutton");
      document.getElementById("antivirus").classList.remove("boughtbutton");
    }

    // two
    if (defense.hasModule("TwoStep")) {
      document.getElementById("twostep").classList.add("boughtbutton");
    } else if (document.getElementById("money").innerText < two.getCost()) {
      document.getElementById("twostep").classList.add("deadbutton");
    } else {
      document.getElementById("twostep").classList.remove("deadbutton");
      document.getElementById("twostep").classList.remove("boughtbutton");
    }

    // scanners
    if (defense.hasModule("Scanners")) {
      document.getElementById("scanners").classList.add("boughtbutton");
    } else if (
      document.getElementById("money").innerText < scanners.getCost()
    ) {
      document.getElementById("scanners").classList.add("deadbutton");
    } else {
      document.getElementById("scanners").classList.remove("deadbutton");
      document.getElementById("scanners").classList.remove("boughtbutton");
    }

    //exec
    if (defense.hasModule("Exec")) {
      document.getElementById("exec").classList.add("badbutton");
    }

    document.getElementById("breach").innerText = defense.getBreach();
    document.getElementById("phys").innerText = defense.getPhys();
  }
}

function time(t) {
  return t * 0.5;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let t = 0;
let physSurvive = 0;
let physTotal = 0;
let breachSurvive = 0;
let breachTotal = 0;


function computerGuy() {
  const box = document.getElementById("computer");
  box.style.display = "flex";
  document.getElementById("submitbutton").style.display = "none";
  updateButtons();

  defense.setOrigBreach(defense.getBreach());
  defense.setOrigPhys(defense.getPhys());

  t += 2000;
  setTimeout(function () {
    document.getElementById("hacking").innerText = "Tabulating Modules...";
  }, time(t));

  let mod = 0;
  let es = "";
  t += 2000;
  if (defense.hasModule("Exec")) {
    mod--;
  }
  if (defense.getLength() + mod != 1) {
    es = "s";
  }
  setTimeout(function () {
    document.getElementById("hacking").innerText =
      "You Have: " + (defense.getLength() + mod) + " Module" + es;
  }, time(t));
  if (defense.hasModule("Exec")) {
    t += 1500;
    setTimeout(function () {
      document.getElementById("hacking").style.color = "red";
      document.getElementById("hacking").innerText =
        "Plus an executive vacation...";
    }, time(t));
  }

  if (defense.getLength() + mod != 0) {
    // local tests
    if (true) {
      /////////////////////
      // Test 1
      // test message
      t += 1000;
      setTimeout(function () {
        document.getElementById("hacking").innerText =
          "Running Local Breach Test (1)...";
      }, time(t));
      t += 1000;
      let rand = Math.abs(getRandomInt(2, 7));
      survive = false;
      // Initial test
      setTimeout(function () {
        document.getElementById("hacking").innerText =
          "Local Strength Test: " + rand;
        survive = defense.phys(rand);
      }, time(t));

      // Procedure pass/fail
      t += 1000;
      setTimeout(function () {
        if (survive) {
          document.getElementById("hacking").innerText = "Passed";
          physSurvive++;
          physTotal += rand;
        } else {
          document.getElementById("hacking").innerText = "Failed";
        }
      }, time(t));

      /////////////////////
      // Test 2
      // test message
      t += 1000;
      setTimeout(function () {
        document.getElementById("hacking").innerText =
          "Running Local Breach Test (2)...";
      }, time(t));
      t += 2000;
      rand = Math.abs(getRandomInt(2, 7));
      survive = false;
      // Initial test
      setTimeout(function () {
        document.getElementById("hacking").innerText =
          "Local Strength Test: " + rand;
        survive = defense.phys(rand);
      }, time(t));

      // Procedure pass/fail
      t += 1000;
      setTimeout(function () {
        if (survive) {
          document.getElementById("hacking").innerText = "Passed";
          physSurvive++;
          physTotal += rand;
        } else {
          document.getElementById("hacking").innerText = "Failed";
        }
      }, time(t));

      /////////////////////
      // Test 3
      // test message
      t += 1000;
      setTimeout(function () {
        document.getElementById("hacking").innerText =
          "Running Local Breach Test (3)...";
      }, time(t));
      t += 1000;
      rand = Math.abs(getRandomInt(2, 7));
      survive = false;
      // Initial test
      setTimeout(function () {
        document.getElementById("hacking").innerText =
          "Local Strength Test: " + rand;
        survive = defense.phys(rand);
      }, time(t));

      // Procedure pass/fail
      t += 1000;
      setTimeout(function () {
        if (survive) {
          document.getElementById("hacking").innerText = "Passed";
          physSurvive++;
          physTotal += rand;
        } else {
          document.getElementById("hacking").innerText = "Failed";
        }
      }, time(t));

      //Final result
      t += 1000;
      setTimeout(function () {
        document.getElementById("hacking").innerText =
          "Passed " + physSurvive + "/3 Local Tests";
      }, time(t));
    }

    // external tests
    if (true) {
      /////////////////////
      // Test 1
      // test message
      t += 1000;
      setTimeout(function () {
        document.getElementById("hacking").innerText =
          "Running External Breach Test (1)...";
      }, time(t));
      t += 1000;
      let rand = Math.abs(getRandomInt(2, 7));
      survive = false;
      // Initial test
      setTimeout(function () {
        document.getElementById("hacking").innerText =
          "External Strength Test: " + rand;
        survive = defense.breach(rand);
      }, time(t));

      // Procedure pass/fail
      t += 1000;
      setTimeout(function () {
        if (survive) {
          document.getElementById("hacking").innerText = "Passed";
          breachSurvive++;
          breachTotal += rand;
        } else {
          document.getElementById("hacking").innerText = "Failed";
        }
      }, time(t));

      /////////////////////
      // Test 2
      // test message
      t += 1000;
      setTimeout(function () {
        document.getElementById("hacking").innerText =
          "Running External Breach Test (2)...";
      }, time(t));
      t += 1000;
        rand = Math.abs(getRandomInt(2, 7));
      survive = false;
      // Initial test
      setTimeout(function () {
        document.getElementById("hacking").innerText =
          "External Strength Test: " + rand;
        survive = defense.breach(rand);
      }, time(t));

      // Procedure pass/fail
      t += 1000;
      setTimeout(function () {
        if (survive) {
          document.getElementById("hacking").innerText = "Passed";
          breachSurvive++;
          breachTotal += rand;
        } else {
          document.getElementById("hacking").innerText = "Failed";
        }
      }, time(t));

      /////////////////////
      // Test 3
      // test message
      t += 1000;
      setTimeout(function () {
        document.getElementById("hacking").innerText =
          "Running External Breach Test (3)...";
      }, time(t));
      t += 1000;
        rand = Math.abs(Math.abs(getRandomInt(2, 7)));
      survive = false;
      // Initial test
      setTimeout(function () {
        document.getElementById("hacking").innerText =
          "External Strength Test: " + rand;
        survive = defense.breach(rand);
      }, time(t));

      // Procedure pass/fail
      t += 1000;
      setTimeout(function () {
        if (survive) {
          document.getElementById("hacking").innerText = "Passed";
          breachSurvive++;
          breachTotal += rand;
        } else {
          document.getElementById("hacking").innerText = "Failed";
        }
      }, time(t));


      //Final result
      t += 1000;
      setTimeout(function () {
        document.getElementById("hacking").innerText =
          "Passed " + breachSurvive + "/3 Local Tests (Strength: " + breachTotal+ ")";
      }, time(t));
    }

    // results screen
    t+=1000;
    setTimeout(function () {
        document.getElementById("computer").style.display = 'none';
        document.getElementById("results").style.display = 'block';
        document.getElementById("passing").innerText = "You installed " + (defense.getLength() + mod) + " modules.";
        document.getElementById("rflavor1").innerText = "Out of all 3 local breach tests, you survived " + physSurvive + ", with a total strength of "+physTotal;
        document.getElementById("rflavor2").innerText = "This resulted in "+(5340000*physSurvive/3) + " patient records being compromised.";

        document.getElementById("rflavor3").innerText = "Out of all 3 external breach tests, you survived " + breachSurvive + ", with a total strength of "+breachTotal;
        document.getElementById("rflavor4").innerText = "This resulted in "+(2505000*breachSurvive/breachTotal) + " patient records being compromised.";

        if (physSurvive+breachSurvive==6){
            document.getElementById("finresult").style.color = "green";
            document.getElementById("finresult").innerText = "Complete Success. You survived all attacks.";
        }
        else if (physSurvive+breachSurvive>=3){
            document.getElementById("finresult").style.color = "orange";
            document.getElementById("finresult").innerText = "Partial Failure. Many patient records were compromised";
        }
        else if (physSurvive+breachSurvive>=1){
            document.getElementById("finresult").style.color = "rgb(205, 50, 76)";
            document.getElementById("finresult").innerText = "Failure. A majority of patient records were compromised";
        }
        else {
            document.getElementById("finresult").style.color = "red";
            document.getElementById("finresult").innerText = "Complete Failure. You did not survive a single test.";
        }
    }, time(t));
  }
  else {
    t+=1000;
    setTimeout(function () {
        document.getElementById("computer").style.display = 'none';
        document.getElementById("results").style.display = 'block';
        document.getElementById("passing").innerText = "No modules installed...";
        document.getElementById("rflavor1").innerText = "All 5 million instances of patient data breached.";
        document.getElementById("rflavor2").innerText = "You were supposed to spend your budget.";

        if (defense.hasModule("Exec")){
            document.getElementById("rflavor3").style.color = "red";
            document.getElementById("rflavor3").innerText = "And not just on a vacation...";
        }

        document.getElementById("finresult").style.color = "red";
        document.getElementById("finresult").innerText = "Complete Failure.";
      }, time(t));
  }
}
