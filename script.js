const week = ["日", "月", "火", "水", "木", "金", "土"];
const today = new Date();
// 月末だとずれる可能性があるため、1日固定で取得
var showDate = new Date(today.getFullYear(), today.getMonth(), 1);


// 前の月表示
function prev(){
    showDate.setMonth(showDate.getMonth() - 1);
    showProcess(showDate);
}

// 次の月表示
function next(){
    showDate.setMonth(showDate.getMonth() + 1);
    showProcess(showDate);
}

// カレンダー表示
function showProcess(date) {
    var year = date.getFullYear();
    var month = date.getMonth();
    document.querySelector('#header').innerHTML = year + "年 " + (month + 1) + "月";

    var calendar = createProcess(year, month);
    document.querySelector('#calendar').innerHTML = calendar;
}

// カレンダー作成
function createProcess(year, month) {
    // 曜日
    var calendar = "<table><tr class='dayOfWeek'>";
    for (var i = 0; i < week.length; i++) {
        calendar += "<th>" + week[i] + "</th>";
    }
    calendar += "</tr>";

    var count = 0;
    var startDayOfWeek = new Date(year, month, 1).getDay();
    var endDate = new Date(year, month + 1, 0).getDate();
    var lastMonthEndDate = new Date(year, month, 0).getDate();
    var row = Math.ceil((startDayOfWeek + endDate) / week.length);

    // 1行ずつ設定
    for (var i = 0; i < row; i++) {
        calendar += "<tr>";
        // 1colum単位で設定
        for (var j = 0; j < week.length; j++) {
            if (i == 0 && j < startDayOfWeek) {
                // 1行目で1日まで先月の日付を設定
                calendar += "<td class='disabled'>" + (lastMonthEndDate - startDayOfWeek + j + 1) + "</td>";
            } else if (count >= endDate) {
                // 最終行で最終日以降、翌月の日付を設定
                count++;
                calendar += "<td class='disabled'>" + (count - endDate) + "</td>";
            } else {
                // 当月の日付を曜日に照らし合わせて設定
                count++;
                if(year == today.getFullYear()
                  && month == (today.getMonth())
                  && count == today.getDate()){
                    calendar += "<td class='today'><div class=papa><button id='"+count+"' onclick=taion(this.id)>" + count + "</button></div></td>";
                    document.getElementById( "calendar" ).value = count;
                } else {
                    calendar += "<td><div class=papa><button id = '"+count+"' onclick=taion(this.id)>" + count + "</button></div></td>";
                    
                }
            }
        }
        calendar += "</tr>";
    }
    return calendar;
}

//当日体温設定時の確認用
function getValue(temperture){
  var result = document.getElementById(temperture).value;
  if(result<50 && result!=""){
    alert("今日の体温を「" + result + "℃」に設定しました");
    location.href = "calender.html";
  }else if(result==""){
    document.getElementById('errorText').innerHTML = "※入力してください"
  }else{
    document.getElementById('temperture').value="";
    document.getElementById('errorText').innerHTML = "※半角数字で入力してください"
  }
}

//体温の振り返り
function taion(a){ 
  var tateishi=document.getElementById("souta")
  tateishi.innerHTML= a + "日の体温は℃です。";
}


//ログイン
function roguin(){
  var username=document.getElementById("username").value;    /*ユーザーネームを取得*/
  var password=document.getElementById("password").value;    /*パスワードを取得*/

  if(username == "a" && password == "a"){
    /* 処理成功 */
    alert("ログインに成功しました");
    location.href = "taion.html";     /*hontai.htmlに遷移*/
  }
  else {
    /*処理失敗*/
    alert("ログインに失敗しました");
  }
}


/*新規登録関数*/
function sinki(){

    var username=document.getElementById("username").value;     //ユーザーネームを取得

    var password=document.getElementById("password").value;     //パスワードを取得
    var numb
 
    numb = ("0000000" + (Math.floor(Math.random() * 9999999) + 1)).slice(-5);

    Email.send({
      SecureToken : "17792034-0196-4d67-8dad-04392b10c5d4",
      To : 'tatsuruyazawa@gmail.com',
      From : "s201036@kashiwanoha.ed.jp",
      Subject : "セキュリティコードです",
      Body : "こちらがセキュリティコードです。『"+numb+"』"
      }).then(function (message) {
        alert("mail sent successfully")
        var mes="セキュリティコードを入力してください";
        var i=1;
        do{
          var UserInput = prompt(mes+":","");

          if(UserInput==numb && UserInput!=""){
            alert("登録に成功しました！");
            location.href = "index.html";
            i=1;
          }else if(UserInput==""){
            mes = "※入力してください";
            i=2;
          }else{
            mes = "※セキュリティコードが間違っています";
            i=2;
          }
        }while(i==2)
    });
    
    
    

    /*
    var user = new ncmb.User();         //二フクラに新しいユーザーを設定
// [NCMB] ID / PW で新規登録
user.set("userName", username)      //ユーザーネームをセット
    .set("password", password)      //パスワードをセット
    .signUpByAccount()              //セットした情報でサインアップ
    .then(function(user) {          //サインアップに成功した場合の処理
        //処理成功
        // [NCMB] userインスタンスでログイン
        ncmb.User.login(user)       //二フクラのログインメソッド
                 .then(function(user) {     //ログインに成功した場合の処理
                     //処理成功
                     alert("新規登録に成功しました");
                     location.href = "hontai.html";     //hontai.htmlに遷移
                 })
                 .catch(function(error) {       //ログインに失敗した場合の処理
                     //処理失敗
                     alert("新規登録に失敗しました");
                 });
    })
    .catch(function(error) {    //サインアップに失敗した場合の処理
        
        alert("すでにアカウントが存在しています");
    });
    */
    
}
