let currentUser = localStorage.getItem("currentUser");

if(currentUser){
    showApp();
}

function register(){

    let username =
    document.getElementById("username").value;

    if(username===""){
        alert("Kullanıcı adı gir");
        return;
    }

    let user = {
        coins:1000,
        history:[]
    };

    localStorage.setItem(
        "user_"+username,
        JSON.stringify(user)
    );

    alert("Kayıt başarılı!");
}

function login(){

    let username =
    document.getElementById("username").value;

    let user =
    localStorage.getItem("user_"+username);

    if(!user){
        alert("Önce kayıt ol");
        return;
    }

    localStorage.setItem(
        "currentUser",
        username
    );

    showApp();
}

function showApp(){

    currentUser =
    localStorage.getItem("currentUser");

    document.getElementById("loginPage").style.display="none";
    document.getElementById("appPage").style.display="block";

    document.getElementById("playerName").innerText =
    currentUser;

    loadUser();
    loadMatches();
}

function loadUser(){

    let user =
    JSON.parse(
        localStorage.getItem(
            "user_"+currentUser
        )
    );

    document.getElementById("coinAmount").innerText =
    user.coins;

    let html="";

    user.history.forEach(item=>{
        html += "<p>"+item+"</p>";
    });

    document.getElementById("history").innerHTML =
    html;
}

function saveUser(user){

    localStorage.setItem(
        "user_"+currentUser,
        JSON.stringify(user)
    );
}

function dailyBonus(){

    let user =
    JSON.parse(
        localStorage.getItem(
            "user_"+currentUser
        )
    );

    user.coins += 500;

    user.history.unshift(
        "🎁 Günlük Bonus +500"
    );

    saveUser(user);
    loadUser();
}

function bet(team){

    let amount =
    prompt("Kaç coin bahis yapmak istiyorsun?");

    if(!amount) return;

    amount = Number(amount);

    let user =
    JSON.parse(
        localStorage.getItem(
            "user_"+currentUser
        )
    );

    if(amount > user.coins){
        alert("Yetersiz coin");
        return;
    }

    if(Math.random() < 0.5){

        let win = amount * 2;

        user.coins += win;

        user.history.unshift(
            "✅ "+team+" +" + win
        );

        alert("Kazandın!");

    }else{

        user.coins -= amount;

        user.history.unshift(
            "❌ "+team+" -" + amount
        );

        alert("Kaybettin!");
    }

    saveUser(user);
    loadUser();
}

async function loadMatches(){

    try{

        const response =
        await fetch("/api/matches");

        const data =
        await response.json();

        let html = "";

        data.response
        .slice(0,20)
        .forEach(match=>{

            const home =
            match.teams.home.name;

            const away =
            match.teams.away.name;

            html += `
            <div class="match">

                <b>${home}</b>
                vs
                <b>${away}</b>

                <br><br>

                <button onclick="bet('${home}')">
                1
                </button>

                <button onclick="bet('Beraberlik')">
                X
                </button>

                <button onclick="bet('${away}')">
                2
                </button>

            </div>
            `;
        });

        document.getElementById(
            "matches"
        ).innerHTML = html;

    }catch(error){

        document.getElementById(
            "matches"
        ).innerHTML =
        "Maçlar yüklenemedi";

        console.log(error);
    }
}

function logout(){

    localStorage.removeItem(
        "currentUser"
    );

    location.reload();
}