const expect = require('expect');
const {Users} = require('./alluser');

describe('users',() => {
var userproto;
    beforeEach(()=>{
     userproto = new Users();
       userproto.users =[{
           id :'1',
           name:'ravi',
           room:'home'
       },
       {
           id :'2',
           name:'golu',
           room:'apani dunia'
       },
       {
           id :'3',
           name:'bitti',
           room:'home'
       }];
    });


it('sholud add the new user',()=>{

  protouser = new Users();
     var a ={
       id:'1',
       name:'ravi',
       room:'all bad'
     }

  var res = protouser.addUser(a.id,a.name,a.room);

  expect(protouser.users).toEqual([a]);
})

it('should fetch the all userlist ',() =>{
    var userlistfetched = userproto.peopleList('home');

    expect(userlistfetched).toEqual(['ravi','bitti']);

});

it('should fetch the specified user',() => {
         var fetchusers = userproto.fetchUser('1');

         expect(fetchusers).toEqual(['ravi']);
});

it('should remove the user from the list',() =>{
  var userleaved= userproto.removeUser('1');

  expect(userleaved).toEqual([{
      id :'2',
      name:'golu',
      room:'apani dunia'
  },
  {
      id :'3',
      name:'bitti',
      room:'home'
  }]);

});


});;
