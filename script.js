
let moneyDecider = Math.random();
let money = 0;

// gets the money, yay
function getMoney() {
    if (moneyDecider < 0.3333)
        money = 380000;
    else if (moneyDecider < 0.6666)
        money = 520000;
    else
        money = 665000;
    document.getElementById("output").innerText = "You have $" + moneyDecider;
}

@WebServlet("/money")
public class MoneyServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Module module = new Module();
        int money = module.money(); // <-- notice it's "money()" not "getMoney()"

        response.setContentType("text/plain");
        response.getWriter().write(String.valueOf(money));
    }
}



// Function to show the saved name
function spendMoney(dollars){
    if (dollars > money) {
        document.getElementById("output").innerText = "You don't have enough money for that!";
    }
    else {
        money = money - dollars;
        document.getElementById("output").innerText = "You spent $" + dollars + "!";
    }
}

