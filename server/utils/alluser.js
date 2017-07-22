class Users {
  constructor() {
    this.users =[];
  }

  addUser(id,name,room){

    var user={id,name,room};
    this.users.push(user);
    return user;
  };

  peopleList(room){
    var user = this.users.filter((user)=>user.room===room);
    var userArray = user.map((user) => user.name );
    return userArray;
  }

  fetchUser(id){
    var user = this.users.filter((user) =>user.id===id)[0];
    return user;

  }
  removeUser(id){
    var user = this.fetchUser(id);
    if(user){
      this.users = this.users.filter((user)=>user.id!==id);

  }
      return user;
 }

}


module.exports = {Users};
