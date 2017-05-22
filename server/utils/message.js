  const moment = require('moment');
var generatemessage = (from,text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf()
  };
};
var generatelocationmessage = (from,latitude,longitude) =>{
  return {
    from,
    url:`https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt:moment().valueOf()
  };
};

module.exports = {generatemessage,generatelocationmessage};
