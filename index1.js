// Inbuild Package
// Custom Package
// Thirparty Package

const os = require("os");
const fs = require("fs");
const {add,sub} = require("./calculator");
// console.log(os.platform());
// console.log(os.cpus().length);
// console.log(os.arch());
// console.log(os.homedir());
// console.log(os.hostname());
// console.log(os.uptime());
// console.log(os.version());
let word = `${os.platform()}, ${os.cpus().length}, ${os.arch()}, ${os.homedir()}, ${os.hostname()}, ${os.uptime()}, ${os.version()}`

// fs.writeFile("message.txt",word,function(err){
//     if(err) throw err;
//     console.log("File created")
// })


fs.readdir("../",{withFileTypes : true},function(err,data){
    if(err) throw err;
    let files = data.map((file) => {
        return {
            name : file.name,
            type : file.isDirectory() ? 'Folder' : 'File'
        }
    })
    console.log(files)
})

let res = add(3,4);

console.log(res)