// let {google} = require('googleapis');

// const creds = require('./cred.json')
 
// // ダウンロードしたJSON の鍵ファイルの中身をコピーアンドペースト
// // JSON Web Token(JWT)の設定
// let jwtClient = new google.auth.JWT(
//   creds.client_email,
//   null,
//   creds.private_key,
//   'https://www.googleapis.com/auth/spreadsheets'
// );
 
// // シートのURLから抽出したID = {{SheetID}}
// // 仮に以下のURLの場合は ABCDEFGABCDEFGABCDEFGABCDEFGABCDEFG の部分
// // https://docs.google.com/spreadsheets/d/ABCDEFGABCDEFGABCDEFGABCDEFGABCDEFG/edit#gid=0
 
// const sheet = '17kJtBTdBd1UIfrpcQGdDRIfOX5_L7liVFygyR_3OxNM';
 
// // スプレッドシートのセルの指定
// let cells = 'A2:C';
 
// // スプレッドシートAPIはv4を使う
// let sheets = google.sheets('v4');
 
// exports.getSheetRequest = async (who, when, what, how) => {
 
//   // JSON Web Token(JWT) の認証
//   let resultJwtClient;
//   try {
//     resultJwtClient = await jwtClient.authorize();
//     //console.log(resultJwtClient);
//   } catch (error) {
//     console.log("Auth Error: " + error);
//   }
 
//   // シートを読み込む
//   let responseGetSheet;

//   let values = [
//       [
//         who,when,what,how
//       ],
//   ];

//   let resource = {
//       values,
//   }

//   try {
//     responseGetSheet = await sheets.spreadsheets.values.append({
//       auth: jwtClient,
//       spreadsheetId: sheet,
//       valueInputOption:"USER_ENTERED",
//       range: cells,
//       resource,
//     });
//     // Must fix
//     console.log(responseGetSheet.data.values);
//   } catch (error) {
//     console.log('The API returned an error: ' + error);
//   }
// }


// async function getAuth(){
//   // JSON Web Token(JWT) の認証
//   let resultJwtClient;
//   try {
//     resultJwtClient = await jwtClient.authorize();
//     console.log(resultJwtClient);
//   } catch (error) {
//     console.log("Auth Error: " + error);
//   }
// }

// exports.dataLatest = async (x) => {
//   const sheets = google.sheets({version: "v4"});
//     const param = {
//         spreadsheetId: sheet,
//         range: cells,
//         auth : jwtClient
//     };

//     const response = (await sheets.spreadsheets.values.get(param)).data
//     console.log(response,null,2);

//     //console.log(data.values.pop())
// }
