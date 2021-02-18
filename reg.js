const str = "2021-02-18T16:15:58.095Z"
//const rxp = new RegExp('2021','ig')
let res = str.match( /((?<=-)\d.|(?<=[a-zA-Z])\d.|(?<=:)\d.{1})/gi );

let month = res[0];
let date = res[1];
let hour = res[2];
let minutes = res[3]

const time = `${month}/${date} ${hour}:${minutes}`

console.log(time)