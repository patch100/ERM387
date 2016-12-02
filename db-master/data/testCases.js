  //Users
  endpoint.getUsers().then(users => {
    console.log(JSON.stringify(users))
  })

  endpoint.getUserById(1).then(user => {
    console.log(JSON.stringify(user))
  })

  var user = {first_name:"test", last_name:"bye",email:"byebye@hotmail.com",password:"bye", phone:"5142828282",is_admin:false}
  endpoint.addUser("End-User", user).then(aa => {
    console.log(JSON.stringify(aa))
  })

  endpoint.removeUser(1).then(aa => {
    console.log(JSON.stringify(aa))
  })

  endpoint.userLogin("byebye@hotmail.com","bye").then(aa => {
    console.log(JSON.stringify(aa))
  })

  //Rooms

  endpoint.getRooms().then(aa => {
    console.log(JSON.stringify(aa))
  })

  var room={reserveId:7,startTime:"2016-11-30 13:36:48",endTime:"2016-12-30 13:36:48",user:2}
  endpoint.addRoomReservation(room).then(aa => {
    console.log(JSON.stringify(aa));
  })

  endpoint.cancelRoomReservation(6).then(aa => {
    console.log(JSON.stringify(aa));
  })

  endpoint.getRooms("conference").then(aa => {
    console.log(JSON.stringify(aa))
  })

   endpoint.getRoomTypes().then(aa => {
    console.log(JSON.stringify(aa))
  })

    //resourceid
  endpoint.getRoomById(8).then(aa => {
    console.log(JSON.stringify(aa))
  })

  //Resources
  var resource={resourceId:4,startTime:"2017-7-30 13:36:48",endTime:"2017-8-30 13:36:48", user:1}
  endpoint.addResourceReservation(resource, null).then(aa => {
    console.log(JSON.stringify(aa));
  })

  endpoint.getResourceTypes().then(aa => {
    console.log(JSON.stringify(aa))
  })

  endpoint.getResourcesByType("Projector").then(aa => {
    console.log(JSON.stringify(aa))
  })

  endpoint.getResourcesByType("Computer").then(aa => {
    console.log(JSON.stringify(aa))
  })

  endpoint.getResourcesByType("Room").then(aa => {
    console.log(JSON.stringify(aa))
  })

  endpoint.getResourcesByType("WhiteBoard").then(aa => {
    console.log(JSON.stringify(aa))
  })

  endpoint.getResourceById(2).then(aa => {
    console.log(JSON.stringify(aa))
  })

  var resource={type:"Computer", ram:5,operating_system:"IOS",storage:256,is_it:false}
  endpoint.addResource(resource).then(aa => {
    console.log(JSON.stringify(aa))
  })

  endpoint.removeResource(1).then(aa => {
    console.log(JSON.stringify(aa))
  })

  endpoint.cancelResourceReservation(4).then(aa => {
    console.log(JSON.stringify(aa))
  })

  endpoint.updateResource(2, {storage:"344"}).then(aa => {
    console.log(JSON.stringify(aa))
  })








