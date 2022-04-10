const res = require("express/lib/response");

fs = require("fs")

function Signup(entry){
  fs.writeFile('./models/users.txt', entry, { flag: 'a+' }, err => {
    console.log(err);
  })

}

function Login(id, pass){

  try {
    const data = fs.readFileSync('./models/users.txt', 'utf8')
    let user = data.indexOf(`${id} ${pass}`)
    return user != -1? true:false;
  } catch (err) {
    console.error(err)
    return false;
  }
}

module.exports = {
  signup: Signup,
  login: Login
}


