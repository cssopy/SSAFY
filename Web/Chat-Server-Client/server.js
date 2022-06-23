var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

// client가 최초 접속 시 보여지는 화면
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

// 서버 실행
http.listen(3000, function () {
  console.log("server listening on port : 3000");
});

var userList = [];
var joinedUser = false;

io.on("connection", function (socket) {
  // 유저 입장
  socket.on("join", function (data) {
    // 유저 리스트 갱신
    userList.push({
      id: socket.id,
      name: data,
    });
    io.emit("userlist", userList);

    // 유저 최초 입장
    if (!joinedUser) {
      joinedUser = !joinedUser;
      io.emit("log", `${data}님 환영합니다.`);
    }
    // 최초 유저 이후 입장
    else {
      io.emit("log", `${data}님이 입장하셨습니다.`);
    }
  });

  // 메시지 전달
  socket.on("msg", function (data) {
    io.emit("msg", data);
  });

  // 접속 종료
  socket.on("disconnect", function () {
    let name;

    for (let i = 0; i < userList.length; i++) {
      if (userList[i].id == socket.id) {
        name = userList[i].name;
        userList.splice(i, 1);
        break;
      }
    }

    if (userList.length == 0) {
      joinedUser = false;
    }

    io.emit("log", `${name}님이 퇴장하셨습니다.`);
    io.emit("userlist", userList);
  });
});
