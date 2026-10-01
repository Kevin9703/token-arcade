"use strict";(()=>{var st={vegetablefield:{kind:"vegetablefield",name:"\u8857\u574A\u83DC\u5730",description:"\u79CD\u80E1\u841D\u535C\u6216\u571F\u8C46\uFF0C\u6536\u6210\u9001\u5F80\u996D\u9986\u3002\u6625\u5B63\u80E1\u841D\u535C\u3001\u590F\u5B63\u571F\u8C46\u957F\u5F97\u66F4\u5FEB\uFF1B\u51AC\u5B63\u9732\u5730\u4FDD\u7559\u8FDB\u5EA6\u4F11\u8015\u3002",cost:6,w:3,d:2,category:"production",chapter:2},cowshed:{kind:"cowshed",name:"\u7267\u573A\u725B\u68DA",description:"\u7167\u6599\u5976\u725B\u4EA7\u9C9C\u5976\uFF0C\u4E5F\u80FD\u7528\u4E00\u74F6\u9C9C\u5976\u5236\u4F5C\u5976\u916A\u3002\u9001\u5F80\u996D\u9986\u6216\u5B8C\u6210\u90BB\u91CC\u8BA2\u5355\u3002",cost:24,w:3,d:2,category:"production",chapter:2},pigpen:{kind:"pigpen",name:"\u677E\u9732\u732A\u5708",description:"\u5C0F\u732A\u5728\u56F4\u680F\u91CC\u62F1\u571F\u5BFB\u627E\u677E\u9732\uFF0C\u4F9B\u79CB\u65E5\u4E30\u6536\u4F1A\u4F7F\u7528\u3002\u4E0D\u5BB0\u6740\u52A8\u7269\u3002",cost:18,w:3,d:2,category:"production",chapter:2},fishinghut:{kind:"fishinghut",name:"\u6CB3\u8FB9\u9493\u9C7C\u5C0F\u5C4B",description:"\u53EA\u5EFA\u5728\u6CB3\u5CB8\u9646\u5730\uFF0C\u95E8\u671D\u9646\u5730\u63A5\u8DEF\u3002\u6751\u6C11\u5728\u72EC\u7ACB\u7801\u5934\u629B\u7AFF\u6536\u9C7C\uFF0C\u518D\u9001\u5F80\u996D\u9986\u3002",cost:28,w:2,d:2,category:"production",chapter:2},restaurant:{kind:"restaurant",name:"\u6CB3\u8C37\u5C0F\u996D\u9986",description:"\u7528\u9001\u8FBE\u7684\u539F\u6599\u70F9\u996A\u571F\u8C46\u6D53\u6C64\u3001\u5976\u916A\u62FC\u76D8\u6216\u7096\u9C7C\uFF0C\u4F9B\u5E94\u90BB\u91CC\u8BA2\u5355\uFF1B\u4E5F\u63D0\u4F9B\u98DF\u7269\u670D\u52A1\u3002",cost:45,w:3,d:3,category:"services",chapter:2,service:"food",capacity:10,range:14},apronstand:{kind:"apronstand",name:"\u90BB\u91CC\u56F4\u88D9\u67B6",description:"\u9996\u6B21\u5B8C\u6210\u300C\u9001\u4E00\u7BEE\u9762\u5305\u300D\u89E3\u9501\u3002\u5C55\u793A\u90BB\u5C45\u4EEC\u7684\u5F69\u8272\u56F4\u88D9\u3002",cost:4,w:1,d:1,category:"decor",chapter:1},harvesttable:{kind:"harvesttable",name:"\u6CB3\u7554\u91CE\u9910\u957F\u684C",description:"\u9996\u6B21\u5B8C\u6210\u300C\u51C6\u5907\u6CB3\u7554\u91CE\u9910\u300D\u89E3\u9501\uFF0C\u6446\u7740\u679C\u7BEE\u548C\u9910\u5E03\u7684\u6728\u684C\u3002",cost:8,w:2,d:1,category:"decor",chapter:1},wheatbanner:{kind:"wheatbanner",name:"\u4E30\u6536\u9EA6\u7A57\u65D7",description:"\u9996\u6B21\u5B8C\u6210\u300C\u79CB\u65E5\u4E30\u6536\u4F1A\u300D\u89E3\u9501\uFF0C\u4E3A\u8857\u574A\u6302\u8D77\u9EA6\u7A57\u548C\u5F69\u65D7\u3002",cost:5,w:1,d:1,category:"decor",chapter:1},wheatfield:{kind:"wheatfield",name:"\u6CB3\u5CB8\u9EA6\u7530",description:"\u6751\u6C11\u64AD\u79CD\u3001\u6536\u5272\uFF0C\u518D\u6CBF\u9053\u8DEF\u628A\u9EA6\u5B50\u9001\u5230\u98CE\u8F66\u78E8\u574A\u3002\u9700\u8981\u4F4F\u5B85\u3001\u78E8\u574A\u548C\u9762\u5305\u5E97\u8FDE\u8DEF\uFF0C\u6700\u591A\u4E09\u4F4D\u6751\u6C11\u52A1\u519C\u3002",cost:6,w:3,d:2,category:"production",chapter:1},mill:{kind:"mill",name:"\u98CE\u8F66\u78E8\u574A",description:"\u63A5\u6536\u9EA6\u7530\u9001\u6765\u7684\u5C0F\u9EA6\uFF0C\u78E8\u6210\u9762\u7C89\uFF0C\u518D\u9001\u5F80\u9762\u5305\u5E97\u3002\u8FDE\u63A5\u4E09\u5904\u5165\u53E3\uFF0C\u7CAE\u98DF\u5C31\u4F1A\u6CBF\u8857\u6D41\u52A8\u3002",cost:32,w:3,d:3,category:"production",chapter:1},hall:{kind:"hall",name:"\u9547\u516C\u6240",description:"\u5C0F\u9547\u7684\u5FC3\u810F\u3002\u6240\u6709\u9053\u8DEF\u4ECE\u8FD9\u91CC\u8FDE\u63A5\u8D77\u6765\u3002",cost:0,w:3,d:3,category:"landmarks",chapter:1},house:{kind:"house",name:"\u6CB3\u8C37\u6728\u5C4B",description:"\u4F4F\u8FDB\u5341\u4F4D\u90BB\u5C45\u3002\u4E3A\u4ED6\u4EEC\u5B89\u6392\u597D\u9053\u8DEF\u3001\u98DF\u7269\u548C\u7EFF\u5730\u3002",cost:8,w:2,d:2,category:"homes",chapter:1},bakery:{kind:"bakery",name:"\u6668\u5149\u9762\u5305\u5E97",description:"\u516B\u683C\u6B65\u884C\u8DDD\u79BB\u5185\uFF0C\u4E3A\u516D\u680B\u4F4F\u5B85\u4F9B\u5E94\u65B0\u9C9C\u9762\u5305\u3002",cost:20,w:2,d:2,category:"services",chapter:1,service:"food",capacity:6,range:8},cafe:{kind:"cafe",name:"\u8F6C\u89D2\u5496\u5561\u9986",description:"\u5341\u516B\u683C\u6B65\u884C\u8DDD\u79BB\u5185\uFF0C\u4E3A\u516B\u680B\u4F4F\u5B85\u63D0\u4F9B\u4F11\u95F2\u670D\u52A1\u3002",cost:30,w:2,d:2,category:"services",chapter:3,service:"leisure",capacity:8,range:18},market:{kind:"market",name:"\u6CB3\u8C37\u96C6\u5E02",description:"\u5341\u4E8C\u683C\u6B65\u884C\u8DDD\u79BB\u5185\uFF0C\u4E3A\u5341\u4E8C\u680B\u4F4F\u5B85\u63D0\u4F9B\u98DF\u7269\u670D\u52A1\u3002",cost:50,w:3,d:3,category:"services",chapter:4,service:"food",capacity:12,range:12},park:{kind:"park",name:"\u7EFF\u836B\u5C0F\u516C\u56ED",description:"\u516D\u683C\u8303\u56F4\u5185\u7684\u4F4F\u5B85\u90FD\u80FD\u4EAB\u53D7\u7EFF\u5730\u3002\u516C\u56ED\u4E5F\u9700\u8981\u63A5\u901A\u9053\u8DEF\u3002",cost:12,w:2,d:2,category:"services",chapter:1,range:6},bridge:{kind:"bridge",name:"\u6CB3\u8C37\u77F3\u6865",description:"\u653E\u5728\u6CB3\u9053\u6807\u8BB0\u7684\u4F4D\u7F6E\uFF0C\u8FDE\u901A\u4E24\u5CB8\u7684\u9053\u8DEF\u3002",cost:40,w:1,d:2,category:"landmarks",chapter:4},clock:{kind:"clock",name:"\u6CB3\u8C37\u949F\u697C",description:"\u4E3A\u7E41\u8363\u7684\u5C0F\u9547\u7559\u4E0B\u4E00\u5EA7\u5171\u540C\u7684\u5730\u6807\u3002",cost:100,w:3,d:3,category:"landmarks",chapter:6},workshop:{kind:"workshop",name:"\u9879\u76EE\u5DE5\u574A",description:"\u5C5E\u4E8E\u4F60\u7684 AI \u9879\u76EE\uFF0C\u968F token \u7528\u91CF\u6210\u957F\u3002",cost:0,w:2,d:2,category:"landmarks",chapter:1},tree:{kind:"tree",name:"\u6986\u6811",description:"\u4E3A\u8857\u89D2\u6DFB\u4E00\u7247\u67D4\u8F6F\u7684\u7EFF\u836B\u3002\u7EAF\u88C5\u9970\u3002",cost:2,w:1,d:1,category:"decor",chapter:2},bench:{kind:"bench",name:"\u6728\u5236\u957F\u6905",description:"\u8BA9\u90BB\u5C45\u4EEC\u505C\u4E0B\u6765\u5750\u4E00\u4F1A\u513F\u3002\u7EAF\u88C5\u9970\u3002",cost:2,w:1,d:1,category:"decor",chapter:2},lamp:{kind:"lamp",name:"\u6696\u5149\u8DEF\u706F",description:"\u508D\u665A\u7684\u8857\u9053\u4E5F\u6709\u6E29\u6696\u7684\u5149\u3002\u7EAF\u88C5\u9970\u3002",cost:3,w:1,d:1,category:"decor",chapter:2},fountain:{kind:"fountain",name:"\u77F3\u780C\u5C0F\u55B7\u6CC9",description:"\u628A\u4E00\u5904\u7A7A\u5730\u5E03\u7F6E\u6210\u8857\u574A\u76F8\u805A\u7684\u5C0F\u5E7F\u573A\u3002\u7EAF\u88C5\u9970\u3002",cost:14,w:2,d:2,category:"decor",chapter:2},cart:{kind:"cart",name:"\u6728\u5236\u624B\u63A8\u8F66",description:"\u4E3A\u5E97\u94FA\u548C\u5EAD\u9662\u6DFB\u4E00\u70B9\u751F\u6D3B\u6C14\u606F\u3002\u7EAF\u88C5\u9970\u3002",cost:5,w:1,d:1,category:"decor",chapter:2},hedge:{kind:"hedge",name:"\u4FEE\u526A\u7EFF\u7BF1",description:"\u4E3A\u8857\u8FB9\u548C\u82B1\u56ED\u52FE\u52D2\u67D4\u8F6F\u7684\u8FB9\u754C\u3002\u7EAF\u88C5\u9970\u3002",cost:3,w:1,d:1,category:"decor",chapter:2},barrel:{kind:"barrel",name:"\u6A61\u6728\u6876",description:"\u6446\u5728\u5DE5\u574A\u8FB9\u7684\u6728\u6876\u4E0E\u67F4\u706B\u3002\u7EAF\u88C5\u9970\u3002",cost:2,w:1,d:1,category:"decor",chapter:2},planter:{kind:"planter",name:"\u9676\u76C6\u82B1\u7C07",description:"\u5728\u77F3\u677F\u8DEF\u65C1\u79CD\u4E0B\u660E\u4EAE\u7684\u5C0F\u82B1\u3002\u7EAF\u88C5\u9970\u3002",cost:4,w:1,d:1,category:"decor",chapter:2},gazebo:{kind:"gazebo",name:"\u6CB3\u5CB8\u51C9\u4EAD",description:"\u4E00\u5904\u6709\u6728\u67F1\u3001\u957F\u6905\u548C\u5761\u5C4B\u9876\u7684\u4F11\u61A9\u89D2\u843D\u3002\u7EAF\u88C5\u9970\u3002",cost:18,w:2,d:2,category:"decor",chapter:2},grocer:{kind:"grocer",name:"\u679C\u852C\u5C0F\u94FA",description:"\u4E5D\u683C\u6B65\u884C\u8303\u56F4\u5185\uFF0C\u4E3A\u516D\u6237\u4F9B\u5E94\u65B0\u9C9C\u98DF\u7269\u3002",cost:24,w:2,d:2,category:"services",chapter:2,service:"food",capacity:6,range:9},florist:{kind:"florist",name:"\u82B1\u827A\u5C0F\u94FA",description:"\u4E5D\u683C\u6B65\u884C\u8303\u56F4\u5185\uFF0C\u4E3A\u56DB\u6237\u63D0\u4F9B\u8D4F\u82B1\u4E0E\u4F11\u95F2\u3002",cost:26,w:2,d:2,category:"services",chapter:3,service:"leisure",capacity:4,range:9},library:{kind:"library",name:"\u6CB3\u8C37\u4E66\u5C4B",description:"\u5341\u683C\u6B65\u884C\u8303\u56F4\u5185\uFF0C\u4E3A\u516D\u6237\u63D0\u4F9B\u9605\u8BFB\u4F11\u95F2\u3002",cost:42,w:3,d:2,category:"services",chapter:3,service:"leisure",capacity:6,range:10},greenhouse:{kind:"greenhouse",name:"\u73BB\u7483\u6E29\u5BA4",description:"\u56DB\u5B63\u90FD\u80FD\u79CD\u80E1\u841D\u535C\u548C\u571F\u8C46\uFF0C\u51AC\u5929\u7EE7\u7EED\u4E3A\u996D\u9986\u4E0E\u90BB\u91CC\u8BA2\u5355\u4F9B\u5E94\u852C\u83DC\u3002",cost:18,w:3,d:2,category:"production",chapter:2},granary:{kind:"granary",name:"\u4E30\u6536\u7CAE\u4ED3",description:"\u5706\u5F62\u7CAE\u5854\u3001\u50A8\u85CF\u6728\u5C4B\u548C\u4E00\u6392\u5C0F\u9EA6\u888B\u3002\u7EAF\u88C5\u9970\u3002",cost:16,w:2,d:2,category:"decor",chapter:2},boathouse:{kind:"boathouse",name:"\u6CB3\u5CB8\u8239\u5C4B",description:"\u6728\u677F\u5E73\u53F0\u4E0A\u505C\u7740\u4E00\u8258\u5C0F\u8239\u3002\u653E\u5728\u6CB3\u5CB8\u9646\u5730\u4E0A\u5E03\u7F6E\u5EAD\u9662\uFF0C\u7EAF\u88C5\u9970\u3002",cost:22,w:3,d:2,category:"decor",chapter:2},flower:{kind:"flower",name:"\u7A97\u8FB9\u82B1\u7BB1",description:"\u5C11\u8D70\u5F2F\u8DEF \xB7 \u521D\u6B21\u901A\u5173\u84DD\u56FE\u3002",cost:8,w:1,d:1,category:"decor",chapter:1},picnic:{kind:"picnic",name:"\u91CE\u9910\u684C",description:"\u5F2F\u8DEF\u7684\u5C3D\u5934 \xB7 \u521D\u6B21\u901A\u5173\u84DD\u56FE\u3002",cost:10,w:1,d:1,category:"decor",chapter:1},birdhouse:{kind:"birdhouse",name:"\u5C0F\u9E1F\u4E4B\u5BB6",description:"\u4E00\u5E97\u591A\u7528 \xB7 \u521D\u6B21\u901A\u5173\u84DD\u56FE\u3002",cost:12,w:1,d:1,category:"decor",chapter:1},windmill:{kind:"windmill",name:"\u82B1\u56ED\u98CE\u8F66",description:"\u6070\u5230\u597D\u5904 \xB7 \u521D\u6B21\u901A\u5173\u84DD\u56FE\u3002",cost:18,w:1,d:1,category:"decor",chapter:1},statue:{kind:"statue",name:"\u6CB3\u8C37\u7EAA\u5FF5\u50CF",description:"\u4E00\u6865\u4E24\u5CB8 \xB7 \u521D\u6B21\u901A\u5173\u84DD\u56FE\u3002",cost:20,w:1,d:1,category:"decor",chapter:1},gardenlamp:{kind:"gardenlamp",name:"\u8424\u706B\u82B1\u56ED\u706F",description:"\u6865\u8FB9\u7684\u751F\u6D3B \xB7 \u521D\u6B21\u901A\u5173\u84DD\u56FE\u3002",cost:15,w:1,d:1,category:"decor",chapter:1}},qi=[{id:1,title:"\u5728\u8FD9\u91CC\u843D\u811A",story:"\u7ED9\u9547\u516C\u6240\u63A5\u4E0A\u6700\u540E\u4E00\u6BB5\u8DEF\u3002\u56DB\u6237\u90BB\u5C45\uFF0C\u7B49\u7740\u7B2C\u4E00\u7089\u9762\u5305\u3002",reward:"\u57FA\u7840\u88C5\u9970\u4E0E\u65B0\u7684\u8857\u574A\u76EE\u6807",subsidy:5},{id:2,title:"\u7EFF\u836B\u8857\u574A",story:"\u518D\u9080\u8BF7\u4E24\u6237\u90BB\u5C45\u3002\u8BA9\u8857\u574A\u4EEC\u51FA\u95E8\u5C31\u80FD\u9047\u89C1\u4E00\u7247\u7EFF\u3002",reward:"\u540C\u5CB8\u6269\u5730\u3001\u8F6C\u89D2\u5496\u5561\u9986",subsidy:10},{id:3,title:"\u70ED\u95F9\u5E02\u96C6",story:"\u9664\u4E86\u9762\u5305\uFF0C\u751F\u6D3B\u4E5F\u9700\u8981\u4E00\u676F\u5496\u5561\u548C\u670B\u53CB\u3002",reward:"\u96C6\u5E02\u3001\u77F3\u6865\u4E0E\u5BF9\u5CB8\u5148\u9063\u5EFA\u8BBE\u533A",subsidy:15},{id:4,title:"\u6CB3\u7684\u53E6\u4E00\u8FB9",story:"\u4E00\u5EA7\u6865\uFF0C\u628A\u6CB3\u4E24\u5CB8\u53D8\u6210\u540C\u4E00\u4E2A\u5BB6\u3002",reward:"\u5B8C\u6574\u5BF9\u5CB8\u5EFA\u8BBE\u533A\u3001\u8DE8\u6CB3\u7EAA\u5FF5\u914D\u8272",subsidy:20},{id:5,title:"\u8857\u574A\u7684\u597D\u65E5\u5B50",story:"\u8BA9\u5341\u4E8C\u6237\u90BB\u5C45\u8FC7\u4E0A\u8212\u9002\u7684\u751F\u6D3B\u3002\u9053\u8DEF\u81EA\u7531\u5EF6\u4F38\uFF0C\u7EFF\u836B\u4E0E\u670B\u53CB\u5C31\u5728\u5BB6\u95E8\u5916\u3002",reward:"\u6CB3\u8C37\u949F\u697C\u84DD\u56FE",subsidy:25},{id:6,title:"\u6211\u4EEC\u7684\u6CB3\u8C37",story:"\u5728\u949F\u58F0\u54CD\u8D77\u65F6\uFF0C\u4E3A\u8FD9\u5EA7\u5C0F\u9547\u7559\u4E0B\u4F60\u81EA\u5DF1\u7684\u6837\u5B50\u3002",reward:"\u5168\u56FE\u5F00\u653E\u3001\u81EA\u7531\u53D1\u5C55",subsidy:30}],Lh=["#a8b6ae","#6eabc0","#c9978b","#a296bf","#d9b362"],Qr=["tree","bench","lamp","park","bridge","clock"],nu=["\u6728\u5C4B","\u5DE5\u574A","\u5DE5\u4F5C\u5BA4","\u521B\u4F5C\u9986","\u6CB3\u8C37\u5730\u6807"];var _s=(i,e)=>(i.variant+(i.kind==="workshop"?Math.max(0,e.projects.findIndex(t=>t.id===i.projectId)):0))%4,ze=(i,e)=>`${i},${e}`,Mo=18,Xn=i=>i.terrain==="valley"?6:3,Ln=(i,e)=>e==="cafe"&&i.terrain!=="valley"?{...st[e],range:10,capacity:4}:st[e],qn=i=>{let[e,t]=i.split(",").map(Number);return{x:e,z:t}},li=i=>Math.min(6,i.chapterStars.findIndex(e=>e===0)<0?7:i.chapterStars.findIndex(e=>e===0)+1);function Ut(i){let e=st[i.kind];return i.rotation%2?{w:e.d,d:e.w}:{w:e.w,d:e.d}}function Wn(i){let{w:e,d:t}=Ut(i),n=[];for(let s=0;s<t;s++)for(let r=0;r<e;r++)n.push({x:i.x+r,z:i.z+s});return n}function pt(i){let{w:e,d:t}=st[i.kind],n=Math.floor(e/2),s=t,r=i.rotation===0?[n,s]:i.rotation===1?[t-1-s,n]:i.rotation===2?[e-1-n,t-1-s]:[s,e-1-n];return{x:i.x+r[0],z:i.z+r[1]}}function pn(i,e,t){return e>=0&&e<i.size&&(i.terrain==="valley"?t===11||t===12:i.terrain==="river"?t===5||t===6:!1)}var vs=i=>i.terrain==="valley"?[4,10,16,20]:i.terrain==="river"?[6]:[];function ea(i,e,t,n){return t<0||n<0||t>=e.size||n>=e.size?!1:e.terrain!=="valley"?!0:n>=13?t<Mo||i.chapterStars[1]>0:n>=11?i.chapterStars[2]>0:i.chapterStars[5]>0||t<12&&(i.chapterStars[3]>0||i.chapterStars[2]>0&&n>=3)}function iu(i,e){let t=pt(e);return e.rotation%2===0&&!pn(i,t.x,t.z)&&Wn(e).some(n=>[[1,0],[-1,0],[0,1],[0,-1]].some(([s,r])=>pn(i,n.x+s,n.z+r)))}function Js(i,e,t){if(!Number.isInteger(t.x)||!Number.isInteger(t.z)||!Number.isInteger(t.rotation)||t.rotation<0||t.rotation>3)return"\u8BF7\u4F7F\u7528\u5730\u56FE\u5185\u7684\u5B8C\u6574\u683C\u5B50\u548C\u56DB\u4E2A\u671D\u5411";let n=new Set(e.buildings.filter(s=>s.placed&&s.id!==t.id).flatMap(s=>Wn(s).map(r=>ze(r.x,r.z))));if(t.kind==="bridge"){let s=e.terrain==="valley"?11:5;if(e.terrain==="meadow"||t.rotation!==0||t.z!==s||!vs(e).includes(t.x))return"\u77F3\u6865\u9700\u8981\u653E\u5728\u6CB3\u9053\u6807\u8BB0\u7684\u6865\u4F4D\u4E0A"}if(t.kind==="fishinghut"&&!iu(e,t))return"\u9700\u8981\u9760\u6CB3\u7684\u9646\u5730\uFF0C\u95E8\u671D\u9646\u5730\u3001\u7801\u5934\u671D\u6CB3\u9762";for(let s of Wn(t)){if(!ea(i,e,s.x,s.z))return"\u8FD9\u7247\u571F\u5730\u8FD8\u6CA1\u6709\u5F00\u653E\uFF0C\u5148\u5B8C\u6210\u5F53\u524D\u59D4\u6258";if(pn(e,s.x,s.z)!==(t.kind==="bridge"))return"\u5EFA\u7B51\u8981\u653E\u5728\u9646\u5730\u4E0A\uFF0C\u8DE8\u6CB3\u8BF7\u4F7F\u7528\u77F3\u6865";if(n.has(ze(s.x,s.z)))return"\u8FD9\u91CC\u5DF2\u7ECF\u6709\u5EFA\u7B51\u4E86\uFF0C\u8BD5\u8BD5\u53E6\u4E00\u5757\u7A7A\u5730";if(e.roads.includes(ze(s.x,s.z)))return"\u5148\u64E6\u9664\u8FD9\u91CC\u7684\u9053\u8DEF\uFF0C\u518D\u653E\u7F6E\u5EFA\u7B51"}return null}function Dh(i,e,t,n){return Number.isInteger(t)&&Number.isInteger(n)&&ea(i,e,t,n)&&!pn(e,t,n)&&!e.buildings.some(s=>s.placed&&Wn(s).some(r=>r.x===t&&r.z===n))}function Ti(i,e){let t=new Map;if(!i.has(e))return t;let n=[e];t.set(e,0);for(let s=0;s<n.length;s++){let r=qn(n[s]),a=t.get(n[s]);for(let[o,c]of[[1,0],[-1,0],[0,1],[0,-1]]){let l=ze(r.x+o,r.z+c);i.has(l)&&!t.has(l)&&(t.set(l,a+1),n.push(l))}}return t}function ta(i,e){let t=Ut(i),n=Ut(e);return Math.max(0,i.x-(e.x+n.w-1),e.x-(i.x+t.w-1))+Math.max(0,i.z-(e.z+n.d-1),e.z-(i.z+t.d-1))}function ys(i){let e=i.buildings.filter(u=>u.placed).sort((u,d)=>u.id.localeCompare(d.id,"en")),t=new Set(e.filter(u=>u.kind!=="bridge").flatMap(u=>Wn(u).map(d=>ze(d.x,d.z)))),n=new Set(i.roads.filter(u=>!t.has(u)));for(let u of e.filter(d=>d.kind==="bridge"))for(let d of Wn(u))n.add(ze(d.x,d.z));let s=e.find(u=>u.kind==="hall"),r=s?pt(s):{x:-1,z:-1},a=new Set(Ti(n,ze(r.x,r.z)).keys()),o={buildings:{},connectedRoads:a,population:0,houses:0,food:0,leisure:0,green:0,satisfied:0,northFood:0,southFood:0,northSatisfied:0,southSatisfied:0,roadCount:i.roads.length,bridge:!1,clock:!1,serviceUsed:{}};for(let u of e){let d=pt(u);o.buildings[u.id]={connected:u.kind==="hall"?a.size>0:a.has(ze(d.x,d.z)),entrance:d,food:null,leisure:null,green:!1}}let c=e.filter(u=>u.kind==="house"&&o.buildings[u.id].connected);for(let u of["food","leisure"]){let d=e.filter(h=>st[h.kind].service===u&&o.buildings[h.id].connected),f=[];for(let h of d){let p=pt(h),x=Ti(a,ze(p.x,p.z));for(let m of c){let g=pt(m),b=x.get(ze(g.x,g.z));b!==void 0&&b<=Ln(i,h.kind).range&&f.push({home:m,shop:h,distance:b})}}f.sort((h,p)=>h.distance-p.distance||h.shop.id.localeCompare(p.shop.id,"en")||h.home.id.localeCompare(p.home.id,"en"));for(let{home:h,shop:p,distance:x}of f)o.buildings[h.id][u]||(o.serviceUsed[p.id]||0)>=Ln(i,p.kind).capacity||(o.buildings[h.id][u]=p.id,o.buildings[h.id][`${u}Distance`]=x,o.serviceUsed[p.id]=(o.serviceUsed[p.id]||0)+1)}let l=e.filter(u=>u.kind==="park"&&o.buildings[u.id].connected);for(let u of c){let d=o.buildings[u.id];d.green=l.some(f=>ta(u,f)<=Xn(i)),o.houses++,o.population+=10,d.food&&(o.food++,u.z<i.size/2?o.northFood++:o.southFood++),d.leisure&&o.leisure++,d.green&&o.green++,d.food&&d.leisure&&d.green&&(o.satisfied++,u.z<i.size/2?o.northSatisfied++:o.southSatisfied++)}return o.bridge=e.some(u=>u.kind==="bridge"&&Wn(u).some(d=>a.has(ze(d.x,d.z)))),o.clock=e.some(u=>u.kind==="clock"&&o.buildings[u.id].connected),o}var Lt=(i,e,t)=>({label:i,current:e,need:t,met:e>=t});function wo(i,e){switch(i){case 1:return{base:[Lt("\u56DB\u680B\u4F4F\u5B85\u63A5\u901A\u9053\u8DEF\u5E76\u83B7\u5F97\u9762\u5305",e.food,4)],bonus:[Lt("\u81F3\u5C11\u4E24\u680B\u4F4F\u5B85\u90BB\u8FD1\u516C\u56ED",e.green,2),Lt("\u9053\u8DEF\u4E0D\u8D85\u8FC7 16 \u683C",e.roadCount<=16?1:0,1)]};case 2:return{base:[Lt("\u516D\u680B\u4F4F\u5B85\u83B7\u5F97\u98DF\u7269\u670D\u52A1",e.food,6),Lt("\u56DB\u680B\u4F4F\u5B85\u90BB\u8FD1\u516C\u56ED",e.green,4)],bonus:[Lt("\u516D\u680B\u4F4F\u5B85\u90FD\u90BB\u8FD1\u516C\u56ED",e.green,6),Lt("\u9053\u8DEF\u4E0D\u8D85\u8FC7 24 \u683C",e.roadCount<=24?1:0,1)]};case 3:return{base:[Lt("\u516B\u680B\u4F4F\u5B85\u83B7\u5F97\u98DF\u7269\u670D\u52A1",e.food,8),Lt("\u516D\u680B\u4F4F\u5B85\u83B7\u5F97\u4F11\u95F2\u670D\u52A1",e.leisure,6)],bonus:[Lt("\u516B\u680B\u4F4F\u5B85\u83B7\u5F97\u4F11\u95F2\u670D\u52A1",e.leisure,8),Lt("\u516D\u680B\u4F4F\u5B85\u6EE1\u8DB3\u5168\u90E8\u9700\u6C42",e.satisfied,6)]};case 4:return{base:[Lt("\u4E00\u5EA7\u77F3\u6865\u8FDE\u901A\u4E24\u5CB8",e.bridge?1:0,1),Lt("\u5BF9\u5CB8\u4E24\u680B\u4F4F\u5B85\u83B7\u5F97\u98DF\u7269\u670D\u52A1",e.northFood,2),Lt("\u539F\u5CB8\u56DB\u680B\u4F4F\u5B85\u83B7\u5F97\u98DF\u7269\u670D\u52A1",e.southFood,4)],bonus:[Lt("\u5BF9\u5CB8\u56DB\u680B\u4F4F\u5B85\u83B7\u5F97\u98DF\u7269\u670D\u52A1",e.northFood,4),Lt("\u4E24\u5CB8\u5404\u6709\u4F4F\u5B85\u6EE1\u8DB3\u5168\u90E8\u9700\u6C42",e.northSatisfied>0&&e.southSatisfied>0?1:0,1)]};case 5:return{base:[Lt("\u5341\u4E8C\u680B\u4F4F\u5B85\u6EE1\u8DB3\u5168\u90E8\u9700\u6C42",e.satisfied,12)],bonus:[Lt("\u5341\u56DB\u680B\u4F4F\u5B85\u6EE1\u8DB3\u5168\u90E8\u9700\u6C42",e.satisfied,14),Lt("\u4E24\u5CB8\u5404\u6709\u56DB\u680B\u6EE1\u610F\u4F4F\u5B85",Math.min(e.northSatisfied,e.southSatisfied),4)]};default:return{base:[Lt("\u5341\u516D\u680B\u4F4F\u5B85\u6EE1\u8DB3\u5168\u90E8\u9700\u6C42",e.satisfied,16),Lt("\u4E24\u5CB8\u5404\u6709\u81F3\u5C11\u56DB\u680B\u6EE1\u610F\u4F4F\u5B85",Math.min(e.northSatisfied,e.southSatisfied),4),Lt("\u6CB3\u8C37\u949F\u697C\u63A5\u901A\u9053\u8DEF",e.clock?1:0,1)],bonus:[Lt("\u4E8C\u5341\u680B\u4F4F\u5B85\u6EE1\u8DB3\u5168\u90E8\u9700\u6C42",e.satisfied,20),Lt("\u9053\u8DEF\u4E0D\u8D85\u8FC7 64 \u683C",e.roadCount<=64?1:0,1)]}}}function na(i,e){let t=wo(i,e);return t.base.every(n=>n.met)?1+t.bonus.filter(n=>n.met).length:0}function ct(i,e,t,n,s=0){return{id:i,kind:e,x:t,z:n,rotation:s,placed:!0,variant:0}}function Nh(){return{size:24,terrain:"valley",buildings:[ct("hall","hall",5,19,2),...[1,3,8].map((e,t)=>({...ct(`home-${t+1}`,"house",e,14),variant:t})),{...ct("home-4","house",9,18,2),variant:3},ct("bakery-1","bakery",6,14),ct("park-1","park",1,18,2)],roads:[...Array.from({length:11},(e,t)=>ze(t+1,16)),ze(1,17),ze(9,17),ze(6,18)]}}function ia(i){return qi.reduce((e,t,n)=>e+(i.chapterStars[n]>0?t.subsidy:0),0)}var Yi={flour:"\u9762\u7C89",bread:"\u9762\u5305",carrot:"\u80E1\u841D\u535C",potato:"\u571F\u8C46",milk:"\u9C9C\u5976",cheese:"\u5976\u916A",truffle:"\u677E\u9732",fish:"\u9C9C\u9C7C",meal:"\u6599\u7406"},ru=()=>({stock:{},runs:{},completed:{},activeOrder:null,choices:{},celebration:0,activeSeconds:0}),$i=[{id:"soup",name:"\u571F\u8C46\u6D53\u6C64",ingredients:{potato:2,flour:1}},{id:"cheese",name:"\u7530\u56ED\u5976\u916A\u62FC\u76D8",ingredients:{carrot:2,cheese:1}},{id:"fish",name:"\u6CB3\u8C37\u7096\u9C7C",ingredients:{potato:1,fish:1}}],$n=[{id:"bread",name:"\u9001\u4E00\u7BEE\u9762\u5305",story:"\u7ED9\u521A\u642C\u6765\u7684\u90BB\u5C45\u9001\u56DB\u4E2A\u70ED\u9762\u5305\u3002",needs:{bread:4},reward:"apronstand",season:null},{id:"picnic",name:"\u51C6\u5907\u6CB3\u7554\u91CE\u9910",story:"\u4E24\u4EFD\u6599\u7406\u3001\u56DB\u4E2A\u9762\u5305\uFF0C\u518D\u5E26\u4E00\u74F6\u9C9C\u5976\u53BB\u6CB3\u8FB9\u3002",needs:{meal:2,bread:4,milk:1},reward:"harvesttable",season:null},{id:"harvest",name:"\u79CB\u65E5\u4E30\u6536\u4F1A",story:"\u79CB\u5929\u4E00\u8D77\u5206\u4EAB\u79CD\u690D\u4E0E\u517B\u6B96\u7684\u6536\u83B7\u3002",needs:{bread:8,carrot:2,potato:2,cheese:1,truffle:1},reward:"wheatbanner",season:"autumn"}],Qs=["vegetablefield","greenhouse","cowshed","pigpen","fishinghut","restaurant"],su=i=>typeof i=="number"&&Number.isSafeInteger(i)&&i>=0&&i<=1e5;function Fh(i){if(i&&!i.choices&&(i.choices={}),!i||typeof i!="object"||!i.stock||!i.runs||!i.completed||Array.isArray(i.stock)||Array.isArray(i.runs)||Array.isArray(i.completed))return!1;let e=t=>t&&typeof t=="object"&&!Array.isArray(t)&&Object.entries(t).every(([n,s])=>Object.prototype.hasOwnProperty.call(Yi,n)&&su(s));return typeof i.choices=="object"&&!Array.isArray(i.choices)&&Object.values(i.choices).every(t=>["milk","cheese","carrot","potato","soup","fish"].includes(t))&&Object.values(i.stock).every(e)&&Object.values(i.runs).every(t=>t&&["work","deliver","return"].includes(t.phase)&&Number.isFinite(t.elapsed)&&t.elapsed>=0&&typeof t.destination=="string"&&e(t.cargo)&&su(t.cycles)&&["milk","cheese","carrot","potato","soup","fish","flour"].includes(t.choice)&&(t.recipe===void 0||$i.some(n=>n.id===t.recipe))&&(t.nextChoice===void 0||["milk","cheese","carrot","potato","soup","fish"].includes(t.nextChoice)))&&Object.entries(i.completed).every(([t,n])=>$n.some(s=>s.id===t)&&su(n))&&(i.activeOrder===null||$n.some(t=>t.id===i.activeOrder))&&Number.isFinite(i.celebration)&&i.celebration>=0&&Number.isFinite(i.activeSeconds)&&i.activeSeconds>=0}function bs(i,e){return i.runs[e.id]||={phase:"work",elapsed:0,destination:"",cargo:{},cycles:0,choice:i.choices[e.id]||(e.kind==="cowshed"?"milk":e.kind==="restaurant"?"soup":"carrot")}}var sa=i=>{let e=pt(i);return{x:e.x+.5,z:e.z+.5}};function Oh(i){let e=Ut(i),t=-i.rotation*Math.PI/2;if(i.kind==="fishinghut")return{x:i.x+e.w/2-.35*Math.cos(t)-1.38*Math.sin(t),z:i.z+e.d/2+.35*Math.sin(t)-1.38*Math.cos(t)};if(i.kind==="restaurant"||i.kind==="mill"){let n=sa(i),s=i.x+e.w/2-n.x,r=i.z+e.d/2-n.z,a=Math.hypot(s,r);return{x:n.x+s/a*.48,z:n.z+r/a*.48}}return{x:i.x+e.w/2,z:i.z+e.d/2}}function Uh(i,e){let t=Oh(i),n=sa(i),s=Ut(i),r=i.x+s.w/2-n.x,a=i.z+s.d/2-n.z,o=Math.hypot(r,a),c=0;for(let u of e)c=c*31+u.charCodeAt(0)>>>0;let l=(c%2?1:-1)*.56;return{x:t.x-a/o*l,z:t.z+r/o*l}}function ra(i,e){let t={bread:i.town.buildings.some(n=>n.placed&&n.kind==="bakery"&&e.buildings[n.id]?.connected)?i.farm.bread:0};for(let[n,s]of Object.entries(i.village.stock))if(e.buildings[n]?.connected)for(let[r,a]of Object.entries(s))t[r]=(t[r]||0)+a;return t}function aa(i,e,t,n){let s=$n.find(o=>o.id===t);if(!s)return"\u8BA2\u5355\u4E0D\u5B58\u5728";if(s.season&&s.season!==n)return"\u79CB\u5929\u624D\u4E3E\u529E\u4E30\u6536\u4F1A\uFF0C\u6750\u6599\u53EF\u4EE5\u63D0\u524D\u51C6\u5907";if(!e.houses)return"\u9700\u8981\u8FDE\u8DEF\u7684\u4F4F\u5B85\u6765\u9080\u8BF7\u90BB\u5C45";let r=ra(i,e),a=Object.entries(s.needs).filter(([o,c])=>(r[o]||0)<c);return a.length?"\u8FD8\u7F3A "+a.map(([o,c])=>`${Yi[o]} ${c-(r[o]||0)}`).join("\u3001"):""}function kh(i,e,t,n){let s=aa(i,e,t,n);if(s)return s;let r=$n.find(a=>a.id===t);for(let[a,o]of Object.entries(r.needs)){let c=o;if(a==="bread"){let l=Math.min(c,i.farm.bread);i.farm.bread-=l,c-=l}for(let l of Object.keys(i.village.stock).sort()){if(!e.buildings[l]?.connected)continue;let u=i.village.stock[l],d=Math.min(c,u[a]||0);if(u[a]=(u[a]||0)-d,c-=d,!c)break}}return i.village.completed[t]=(i.village.completed[t]||0)+1,i.village.activeOrder=null,i.village.celebration=60,""}function Bh(i,e,t,n){if(!t.placed)return"\u5DF2\u6536\u7EB3\uFF0C\u4FDD\u7559\u5E93\u5B58\u548C\u8FD0\u8F93\u8FDB\u5EA6";if(!e.buildings[t.id]?.connected)return"\u5165\u53E3\u672A\u8FDE\u5230\u9547\u516C\u6240\uFF0C\u751F\u4EA7\u4E0E\u914D\u9001\u6682\u505C";if(!e.houses)return"\u9700\u8981\u8FDE\u8DEF\u4F4F\u5B85\u5B89\u6392\u6751\u6C11";let s=bs(i.village,t),r=i.village.stock[t.id]||{};if(t.kind==="restaurant"){let a=$i.find(o=>o.id===(s.recipe||s.choice))||$i[0];if(!Object.keys(s.cargo).length){let o=Object.entries(a.ingredients).filter(([c,l])=>(r[c]||0)<l);if(o.length)return"\u7F3A\u5C11\u539F\u6750\u6599\uFF1A"+o.map(([c,l])=>`${Yi[c]} ${l-(r[c]||0)}`).join("\u3001")}if((r.meal||0)>=30)return"\u6599\u7406\u5E93\u5B58\u5145\u8DB3\uFF0C\u5148\u5B8C\u6210\u90BB\u91CC\u8BA2\u5355"}else{if(s.phase==="work"&&t.kind==="vegetablefield"&&n==="winter")return"\u51AC\u5B63\u9732\u5730\u4F11\u8015\uFF1A\u6E29\u5BA4\u4ECD\u53EF\u79CD\u83DC\uFF0C\u73B0\u6709\u4F5C\u7269\u8FDB\u5EA6\u4FDD\u7559";if(s.phase==="work"&&t.kind==="cowshed"&&s.choice==="cheese"&&!Object.keys(s.cargo).length&&(r.milk||0)<1)return"\u7F3A\u5C11\u539F\u6750\u6599\uFF1A\u9C9C\u5976\uFF08\u5148\u9009\u62E9\u9C9C\u5976\u751F\u4EA7\uFF09";if(s.phase==="deliver"&&!e.buildings[s.destination]?.connected)return"\u914D\u9001\u76EE\u7684\u5730\u672A\u8FDE\u8DEF\uFF0C\u8D27\u7269\u4FDD\u7559\u5728\u6751\u6C11\u624B\u4E2D";if(s.phase==="work"&&!(t.kind==="cowshed"&&s.choice==="cheese")&&Object.values(r).reduce((a,o)=>a+o,0)>=24)return"\u5E93\u5B58\u5DF2\u6EE1\uFF1A\u63A5\u901A\u996D\u9986\u6216\u5B8C\u6210\u90BB\u91CC\u8BA2\u5355"}return""}function To(i,e,t){return i.kind==="vegetablefield"||i.kind==="greenhouse"?(i.kind==="greenhouse"?14:11)/{spring:e==="carrot"?1.3:1,summer:e==="potato"?1.4:1.15,autumn:1,winter:.8}[t]:i.kind==="cowshed"?e==="cheese"?5:8:i.kind==="pigpen"?10:i.kind==="fishinghut"?t==="summer"?8:12:4}function Ao(i,e,t,n,s){let r=Bh(i,e,t,n);if(r)return r;if(s)return"\u90BB\u5C45\u4F11\u606F\u4E2D \xB7 \u6E05\u6668\u7EE7\u7EED";let a=bs(i.village,t);return a.phase==="deliver"?`\u914D\u9001\u4E2D\uFF1A${Object.entries(a.cargo).map(([c,l])=>`${Yi[c]} ${l}`).join("\u3001")} \u2192 ${st[i.town.buildings.find(c=>c.id===a.destination).kind].name}`:a.phase==="return"?"\u8FD4\u56DE\u5DE5\u4F5C\u5730\u70B9":`${t.kind==="fishinghut"?"\u629B\u7AFF\u7B49\u5F85\u6536\u9C7C":t.kind==="cowshed"?a.choice==="cheese"?"\u5236\u4F5C\u5976\u916A":"\u7167\u6599\u5976\u725B\u3001\u6324\u5976":t.kind==="pigpen"?"\u5C0F\u732A\u5BFB\u677E\u9732":t.kind==="restaurant"?"\u70F9\u996A\u6599\u7406":`\u79CD\u690D${a.choice==="potato"?"\u571F\u8C46":"\u80E1\u841D\u535C"}`} \xB7 ${Math.round(Math.min(1,a.elapsed/To(t,a.choice,n))*100)}%`}function zh(i,e,t,n,s,r){if(n||!Number.isFinite(t)||t<0)return[];let a=i.village,o=[],c=a.celebration>0;a.celebration=Math.max(0,a.celebration-t);let l=i.town.buildings.filter(u=>u.placed&&Qs.includes(u.kind)).sort((u,d)=>u.id.localeCompare(d.id));for(let u of l){let d=bs(a,u),f=a.stock[u.id]||={};if(Bh(i,e,u,s))continue;let h=`village-${u.id}-${d.phase}`;if(r.has(h)){if(c=!0,u.kind==="restaurant"&&!Object.keys(d.cargo).length){let x=$i.find(m=>m.id===d.choice)||$i[0];d.recipe=x.id,d.cargo={...x.ingredients};for(let[m,g]of Object.entries(d.cargo))f[m]=(f[m]||0)-g}u.kind==="cowshed"&&d.choice==="cheese"&&!Object.keys(d.cargo).length&&d.phase==="work"&&(f.milk=(f.milk||0)-1,d.cargo={milk:1}),d.elapsed+=Math.min(t,1);let p=d.phase==="work"?To(u,d.recipe||d.choice,s):1;if(d.elapsed>=p)if(d.elapsed=0,d.phase==="deliver"){let x=a.stock[d.destination]||={};for(let[m,g]of Object.entries(d.cargo))x[m]=(x[m]||0)+g;d.cargo={},d.phase="return"}else if(d.phase==="return")d.phase="work",d.destination="",d.cycles++,d.nextChoice&&(d.choice=d.nextChoice,delete d.nextChoice);else if(u.kind==="restaurant")f.meal=(f.meal||0)+2,d.cargo={},delete d.recipe,d.cycles++,d.nextChoice&&(d.choice=d.nextChoice,delete d.nextChoice);else{let x=u.kind==="cowshed"?d.choice==="cheese"?"cheese":"milk":u.kind==="pigpen"?"truffle":u.kind==="fishinghut"?"fish":d.choice==="potato"?"potato":"carrot",m=x==="cheese"||x==="truffle"?1:s==="autumn"&&(x==="potato"||x==="carrot")?3:2;f[x]=(f[x]||0)+m,d.cargo={};let g=pt(u),b=Ti(e.connectedRoads,ze(g.x,g.z)),T=l.filter(_=>_.kind==="restaurant"&&e.buildings[_.id]?.connected&&(a.stock[_.id]?.[x]||0)<12).sort((_,M)=>(b.get(ze(pt(_).x,pt(_).z))||0)-(b.get(ze(pt(M).x,pt(M).z))||0))[0];if(T){let _=x==="milk"?Math.min(m,Math.max(0,f[x]-1)):m;f[x]-=_,d.cargo={[x]:_},d.destination=T.id,d.phase="deliver"}else d.cycles++,d.nextChoice&&(d.choice=d.nextChoice,delete d.nextChoice)}}o.push({fieldId:`village-${u.id}-${d.phase}`,cycles:d.cycles,phase:d.phase==="deliver"?"to-bakery":d.phase==="return"?"returning":"harvesting",target:d.phase==="deliver"?Uh(i.town.buildings.find(p=>p.id===d.destination),u.id):Oh(u),entrance:d.phase==="deliver"?sa(i.town.buildings.find(p=>p.id===d.destination)):sa(u),carrying:d.phase==="deliver"?Object.keys(d.cargo)[0]:null,harvesting:d.phase==="work"})}for(let u of l.filter(d=>d.kind==="restaurant"&&e.buildings[d.id]?.connected)){let d=`flour-${u.id}`,f=a.stock[u.id]||={},h=a.runs[d]||={phase:"work",elapsed:0,destination:u.id,cargo:{},cycles:0,choice:"flour"},p=i.town.buildings.find(g=>g.placed&&g.kind==="mill"&&e.buildings[g.id]?.connected);if(!p)continue;let x=Object.values(i.farm.runs).filter(g=>["to-bakery","baking"].includes(g.phase)).length*2;if(h.phase==="work"&&(i.farm.flour<=x||(f.flour||0)>=6))continue;let m=`village-${d}-${h.phase}`;r.has(m)&&(c=!0,h.elapsed+=Math.min(t,1),h.elapsed>=1&&(h.elapsed=0,h.phase==="work"?(i.farm.flour--,i.farm.activeSeconds+=.001,h.cargo={flour:1},h.phase="deliver"):(f.flour=(f.flour||0)+1,h.cargo={},h.phase="work",h.cycles++,h.nextChoice&&(h.choice=h.nextChoice,delete h.nextChoice)))),o.push({fieldId:`village-${d}-${h.phase}`,cycles:h.cycles,phase:h.phase==="deliver"?"to-bakery":"milling",target:Uh(h.phase==="deliver"?u:p,d),entrance:sa(h.phase==="deliver"?u:p),carrying:h.phase==="deliver"?"flour":null,harvesting:!1})}return c&&(a.activeSeconds+=Math.min(t,1)),o}var t0=["spring","summer","autumn","winter"],n0={spring:"\u6625",summer:"\u590F",autumn:"\u79CB",winter:"\u51AC"},er=(i,e,t)=>{let n=Math.max(0,Math.min(1,(t-i)/(e-i)));return n*n*(3-2*n)};function mn(i,e){let t=Math.max(0,i),n=t/360,s=e.clockMode==="fixed"?{day:12,sunset:19,night:23}[e.lighting]:(n+.375)%1*24,r=e.season==="cycle"?t0[Math.floor(n/3)%4]:e.season,a=er(5.5,8,s)*(1-er(18,21,s)),o=Math.max(er(16,18.5,s)*(1-er(19.5,21,s)),er(5,6.5,s)*(1-er(7,8.5,s))),c=Math.floor(n+.375)+1;return{hour:s,day:c,season:r,daylight:a,warmth:o,sleep:s>=20||s<6,label:`${n0[r]} \xB7 \u7B2C ${c} \u5929 \xB7 ${String(Math.floor(s)).padStart(2,"0")}:${String(Math.floor(s%1*60)).padStart(2,"0")}`}}function Gh(i,e){let t=Math.floor(i/360+.375);return t+e/24<.375&&t++,(t+e/24-.375)*360}var Ki=[[1,0],[2,8e3],[5,1e5],[10,1e6],[20,1e7],[35,5e7],[50,5e8]];function i0(){let i=[];for(let e=1;e<=50;e++){let t=Ki[0],n=Ki[Ki.length-1];for(let u=0;u<Ki.length-1;u++)if(e>=Ki[u][0]&&e<=Ki[u+1][0]){t=Ki[u],n=Ki[u+1];break}let[s,r]=t,[a,o]=n,c=(e-s)/(a-s),l=r<=0?Math.round(o*c):Math.round(r*Math.pow(o/r,c));i.push(l)}return i[0]=0,i}var oa=i0(),au=[{index:0,key:"starter",name:"STARTER",loLevel:1,hiLevel:4},{index:1,key:"powered",name:"POWERED",loLevel:5,hiLevel:9},{index:2,key:"deluxe",name:"DELUXE",loLevel:10,hiLevel:19},{index:3,key:"neon",name:"NEON",loLevel:20,hiLevel:34},{index:4,key:"legendary",name:"LEGENDARY",loLevel:35,hiLevel:50}];function Ss(i){let e=Math.max(1,Math.min(50,i));for(let t of au)if(e>=t.loLevel&&e<=t.hiLevel)return t;return au[au.length-1]}function Ms(i){let e=1;for(let t=0;t<oa.length;t++)i>=oa[t]&&(e=t+1);return e}function s0(i){return 1+(Math.max(1,Math.min(50,i))-1)/49*.5}function la(i){let e=Ms(i),t=oa[e-1],n=e<oa.length?oa[e]:null,s=Ss(e),r=s0(e);if(n==null)return{level:e,stage:s,base:t,next:null,progress:1,toNext:0,isMax:!0,multiplier:r};let a=Math.max(0,Math.min(1,(i-t)/(n-t)));return{level:e,stage:s,base:t,next:n,progress:a,toNext:Math.max(0,n-i),isMax:!1,multiplier:r}}function r0(){return{size:12,terrain:"meadow",buildings:[ct("hall","hall",5,5,2),...[1,3,7,9].map((i,e)=>ct(`h-${e}`,"house",i,1)),ct("bakery","bakery",5,1),ct("park-a","park",1,5,2),ct("park-b","park",8,5,2)],roads:[...Array.from({length:11},(i,e)=>ze(e+1,3)),ze(6,4),ze(1,4),ze(8,4)]}}function a0(){return{size:12,terrain:"meadow",buildings:[ct("hall","hall",9,7,2),...[0,2,4,6,8,10].map((i,e)=>ct(`h-${e}`,"house",i,1)),ct("bakery","bakery",3,4,2),ct("cafe-a","cafe",5,4,2),ct("cafe-b","cafe",9,4,2),ct("park-a","park",1,4,2),ct("park-b","park",7,4,2)],roads:[...Array.from({length:11},(i,e)=>ze(e+1,3)),ze(11,4),ze(11,5),ze(11,6),ze(10,6)]}}function o0(){return{size:12,terrain:"river",buildings:[ct("hall","hall",4,9,2),ct("h-a","house",0,1),ct("h-b","house",9,1),ct("h-c","house",0,8,2),ct("h-d","house",9,8,2),ct("bakery-a","bakery",4,1),ct("bakery-b","bakery",2,8,2),ct("cafe-a","cafe",7,1),ct("cafe-b","cafe",7,8,2),ct("park-a","park",2,1),ct("park-b","park",9,10,3),ct("bridge","bridge",6,5)],roads:[...Array.from({length:10},(i,e)=>ze(e+1,3)),...Array.from({length:12},(i,e)=>ze(e,7)),ze(6,4),ze(5,8),ze(11,8),ze(11,9),ze(11,10)]}}var Vh=r0(),Hh=a0(),Wh=o0(),Dn=[{id:"short-roads",title:"\u5C11\u8D70\u5F2F\u8DEF",description:"\u56DB\u6237\u90BB\u5C45\uFF0C\u4E00\u5BB6\u9762\u5305\u5E97\u3002\u627E\u5230\u4E00\u6761\u7B80\u5355\u53C8\u8212\u670D\u7684\u8857\u9053\u3002",family:"\u9053\u8DEF\u89C4\u5212",roadBudget:28,efficientBudget:14,required:4,greenGoal:2,leisureGoal:0,reward:"flower",solution:Vh},{id:"quiet-street",title:"\u5F2F\u8DEF\u7684\u5C3D\u5934",description:"\u540C\u6837\u7684\u5EFA\u7B51\uFF0C\u66F4\u5C11\u7684\u9053\u8DEF\u3002\u628A\u7A7A\u5730\u7559\u7ED9\u516C\u56ED\u3002",family:"\u9053\u8DEF\u89C4\u5212 \xB7 \u8FDB\u9636",roadBudget:20,efficientBudget:14,required:4,greenGoal:3,leisureGoal:0,reward:"picnic",solution:Vh},{id:"one-shop",title:"\u4E00\u5E97\u591A\u7528",description:"\u4E00\u5BB6\u9762\u5305\u5E97\u53EA\u80FD\u670D\u52A1\u516D\u6237\u3002\u4E24\u5BB6\u5496\u5561\u9986\u7684\u8DDD\u79BB\u4E5F\u5F88\u91CD\u8981\u3002",family:"\u670D\u52A1\u8986\u76D6",roadBudget:28,efficientBudget:16,required:6,greenGoal:2,leisureGoal:6,reward:"birdhouse",solution:Hh},{id:"just-enough",title:"\u6070\u5230\u597D\u5904",description:"\u8BA9\u516D\u6237\u90BB\u5C45\u90FD\u80FD\u559D\u5230\u5496\u5561\uFF0C\u8FD8\u8981\u7ED9\u7EFF\u836B\u7559\u4E2A\u4F4D\u7F6E\u3002",family:"\u670D\u52A1\u8986\u76D6 \xB7 \u8FDB\u9636",roadBudget:22,efficientBudget:16,required:6,greenGoal:4,leisureGoal:6,reward:"windmill",solution:Hh},{id:"one-bridge",title:"\u4E00\u6865\u4E24\u5CB8",description:"\u53EA\u6709\u4E00\u4E2A\u6865\u4F4D\u3002\u8BA9\u5357\u5317\u4E24\u5CB8\u7684\u90BB\u5C45\u5403\u4E0A\u65B0\u9C9C\u9762\u5305\u3002",family:"\u8DE8\u6CB3\u793E\u533A",roadBudget:38,efficientBudget:28,required:4,greenGoal:2,leisureGoal:0,reward:"statue",solution:Wh},{id:"riverside",title:"\u6865\u8FB9\u7684\u751F\u6D3B",description:"\u6865\u3001\u9762\u5305\u3001\u5496\u5561\u548C\u7EFF\u5730\u3002\u7528\u6709\u9650\u9053\u8DEF\u8FDE\u8D77\u5B8C\u6574\u7684\u751F\u6D3B\u3002",family:"\u8DE8\u6CB3\u793E\u533A \xB7 \u8FDB\u9636",roadBudget:32,efficientBudget:28,required:4,greenGoal:2,leisureGoal:4,reward:"gardenlamp",solution:Wh}];function ou(i){let e=structuredClone(i.solution);e.roads=[];for(let t of e.buildings)t.kind!=="hall"&&(t.placed=!1);return e}function lu(i,e){let t=(n,s,r)=>({label:n,current:s,need:r,met:s>=r});return[t(`${i.required} \u680B\u4F4F\u5B85\u63A5\u901A\u9053\u8DEF\u5E76\u83B7\u5F97\u98DF\u7269`,e.food,i.required),...i.solution.terrain==="river"?[t("\u77F3\u6865\u8FDE\u901A\u4E24\u5CB8",e.bridge?1:0,1),t("\u4E24\u5CB8\u90FD\u6709\u4F4F\u5B85\u83B7\u5F97\u98DF\u7269",e.northFood>0&&e.southFood>0?1:0,1)]:[],...i.leisureGoal>0?[t(`${i.leisureGoal} \u680B\u4F4F\u5B85\u83B7\u5F97\u4F11\u95F2\u670D\u52A1`,e.leisure,i.leisureGoal)]:[],t(`\u9053\u8DEF\u4E0D\u8D85\u8FC7 ${i.roadBudget} \u683C`,e.roadCount<=i.roadBudget?1:0,1)]}function ca(i,e){return lu(i,e).every(t=>t.met)?1+cu(i,e).filter(t=>t.met).length:0}function cu(i,e){return[{label:`\u9053\u8DEF\u4E0D\u8D85\u8FC7 ${i.efficientBudget} \u683C`,current:e.roadCount<=i.efficientBudget?1:0,need:1,met:e.roadCount<=i.efficientBudget},{label:`${i.greenGoal} \u680B\u4F4F\u5B85\u90BB\u8FD1\u516C\u56ED`,current:e.green,need:i.greenGoal,met:e.green>=i.greenGoal}]}var ua=["sowing","growing","harvesting","to-mill","milling","to-bakery","baking","returning"],fa={sowing:"\u64AD\u79CD",growing:"\u9EA6\u82D7\u751F\u957F",harvesting:"\u6536\u5272\u5C0F\u9EA6","to-mill":"\u628A\u9EA6\u5B50\u9001\u5F80\u78E8\u574A",milling:"\u98CE\u8F66\u78E8\u9762","to-bakery":"\u628A\u9762\u7C89\u9001\u5F80\u9762\u5305\u5E97",baking:"\u70D8\u7119\u9762\u5305",returning:"\u56DE\u9EA6\u7530\u51C6\u5907\u4E0B\u4E00\u5B63"},uu=()=>({runs:{},wheat:0,flour:0,bread:0,batches:0,activeSeconds:0});function Ro(i,e,t,n){if(n)return"\u591C\u95F4\u4F11\u606F\u4E2D";let s=e.filter(r=>r.bakery?.id===i&&!r.problem).map(r=>t.runs[r.field.id]).filter(Boolean);return s.some(r=>r.phase==="baking")?`\u70D8\u7119\u4E2D \xB7 ${Math.max(0,Math.min(100,Math.round(s.find(r=>r.phase==="baking").elapsed/3*100)))}% \xB7 \u70D8\u7119\u8FD8\u9700 ${Math.max(0,Math.ceil(3-s.find(r=>r.phase==="baking").elapsed))} \u79D2`:s.some(r=>r.phase==="to-bakery")?"\u9762\u7C89\u6B63\u5728\u9001\u6765":"\u7F3A\u5C11\u539F\u6750\u6599\uFF1A\u9762\u7C89"}function da(i,e,t){let n=ze(Math.floor(e.x),Math.floor(e.z)),s=ze(Math.floor(t.x),Math.floor(t.z));if(!i.has(n)||!i.has(s))return[];let r=[n],a=new Map([[n,null]]);for(let l=0;l<r.length&&!a.has(s);l++){let u=qn(r[l]);for(let[d,f]of[[1,0],[-1,0],[0,1],[0,-1]]){let h=ze(u.x+d,u.z+f);i.has(h)&&!a.has(h)&&(a.set(h,r[l]),r.push(h))}}if(!a.has(s))return[];let o=[],c=s;for(;c!==null;){let l=qn(c);o.unshift({x:l.x+.5,z:l.z+.5}),c=a.get(c)}return o}var Nn=i=>{let e=pt(i);return{x:e.x+.5,z:e.z+.5}},Eo=i=>{let e=Ut(i);return{x:i.x+e.w/2,z:i.z+e.d/2}};function ha(i,e,t){let n=a=>a.placed&&!!e.buildings[a.id]?.connected,s=i.buildings.filter(a=>a.kind==="mill"&&n(a)),r=i.buildings.filter(a=>a.kind==="bakery"&&n(a));return i.buildings.filter(a=>a.kind==="wheatfield"&&a.placed).sort((a,o)=>a.id.localeCompare(o.id,"en")).map((a,o)=>{let c=(m,g)=>{let b=pt(m),T=Ti(e.connectedRoads,ze(b.x,b.z));return[...g].sort((_,M)=>(T.get(ze(pt(_).x,pt(_).z))??1/0)-(T.get(ze(pt(M).x,pt(M).z))??1/0)||_.id.localeCompare(M.id,"en"))[0]},l=t.runs[a.id],u=l&&l.phase!=="sowing"?s.find(m=>m.id===l.millId):c(a,s),d=l&&l.phase!=="sowing"?r.find(m=>m.id===l.bakeryId):u?c(u,r):void 0,f=n(a)?o>=Math.min(3,e.houses)?"\u9700\u8981\u8FDE\u8DEF\u4F4F\u5B85\u5B89\u6392\u6751\u6C11\uFF0C\u6700\u591A\u4E09\u4EBA\u52A1\u519C":u?d?"":"\u9700\u8981\u4E00\u5EA7\u8FDE\u8DEF\u7684\u9762\u5305\u5E97":"\u9700\u8981\u4E00\u5EA7\u8FDE\u8DEF\u7684\u98CE\u8F66\u78E8\u574A":"\u9EA6\u7530\u5165\u53E3\u9700\u8981\u8FDE\u5230\u9547\u516C\u6240",h=u&&!f?[Eo(a),...da(e.connectedRoads,Nn(a),Nn(u))]:[],p=u&&d&&!f?da(e.connectedRoads,Nn(u),Nn(d)):[],x=d&&!f?[...da(e.connectedRoads,Nn(d),Nn(a)),Eo(a)]:[];return{field:a,mill:u,bakery:d,toMill:h,toBakery:p,returning:x,problem:f}})}function Xh(i){return i.reduce((e,t,n)=>n?e+Math.hypot(t.x-i[n-1].x,t.z-i[n-1].z):e,0)}function l0(i,e){let t=Xh(i)*Math.max(0,Math.min(1,e));for(let n=1;n<i.length;n++){let s=i[n-1],r=i[n],a=Math.hypot(r.x-s.x,r.z-s.z);if(t<=a)return{x:s.x+(r.x-s.x)*t/(a||1),z:s.z+(r.z-s.z)*t/(a||1)};t-=a}return i[i.length-1]||{x:0,z:0}}function Co(i,e,t){return e==="to-mill"||e==="to-bakery"||e==="returning"?Math.max(2,Xh(e==="to-mill"?i.toMill:e==="to-bakery"?i.toBakery:i.returning)/.5):{sowing:6,growing:24/{spring:1,summer:1.15,autumn:.85,winter:.45}[t],harvesting:5,milling:5,baking:3}[e]}function qh(i,e,t,n,s,r){if(n||!Number.isFinite(t)||t<0)return[];let a=[];for(let o of i){if(o.problem||!o.mill||!o.bakery)continue;let c=e.runs[o.field.id]||={phase:"sowing",elapsed:0,millId:o.mill.id,bakeryId:o.bakery.id,batches:0};c.phase==="sowing"&&(c.millId=o.mill.id,c.bakeryId=o.bakery.id);let l=!r||r.has(o.field.id)?Math.min(t,1):0;for(;l>0;){let p=Co(o,c.phase,s),x=Math.min(l,Math.max(0,p-c.elapsed));if(c.elapsed+=x,l-=x,c.elapsed<p)break;c.phase==="harvesting"&&(e.wheat+=2),c.phase==="milling"&&(e.wheat=Math.max(0,e.wheat-2),e.flour+=3),c.phase==="baking"&&(e.flour=Math.max(0,e.flour-2),e.bread+=4,e.batches++,c.batches++),c.phase=ua[(ua.indexOf(c.phase)+1)%ua.length],c.elapsed=0}let u=c.phase==="to-mill"?o.toMill:c.phase==="to-bakery"?o.toBakery:c.phase==="returning"?o.returning:[],d=u.length?l0(u,c.elapsed/Co(o,c.phase,s)):["milling"].includes(c.phase)?Nn(o.mill):c.phase==="baking"?Nn(o.bakery):Eo(o.field);if(c.phase==="milling"||c.phase==="baking"){let p=c.phase==="milling"?o.mill:o.bakery,x=-p.rotation*Math.PI/2,m=-Math.sin(x),g=-Math.cos(x),b=[-.38,0,.38][i.indexOf(o)%3];d.x+=m*.52-g*b,d.z+=g*.52+m*b}let f=Eo(o.field),h=c.phase==="milling"?Nn(o.mill):c.phase==="baking"?Nn(o.bakery):u.length&&[...u].filter(p=>Math.hypot(p.x-f.x,p.z-f.z)>.001).sort((p,x)=>Math.hypot(p.x-d.x,p.z-d.z)-Math.hypot(x.x-d.x,x.z-d.z))[0]||Nn(o.field);a.push({cycles:c.batches,fieldId:o.field.id,phase:c.phase,target:d,entrance:h,carrying:c.phase==="to-mill"?"wheat":c.phase==="to-bakery"?"flour":null,harvesting:c.phase==="harvesting"||c.phase==="sowing"})}return a.some(o=>!r||r.has(o.fieldId))&&(e.activeSeconds+=Math.min(t,1)),a}var Po={live:"tokenTown.slot.live.v1",demo:"tokenTown.slot.demo.v1"},$h="tokenTown.mode.v1",ws=i=>{let{revision:e,worldSeconds:t,settings:n,farm:s,village:r,...a}=i;return JSON.stringify({...a,villageProgress:{completed:r.completed,activeOrder:r.activeOrder,choices:r.choices}})};function Yh(i){return{version:1,mode:i,revision:0,coins:0,tokenCoins:0,residue:0,subsidyPaid:0,chapterStars:[0,0,0,0,0,0],puzzleStars:{},projects:[],town:Nh(),puzzleBoards:{},demoStep:0,nextId:20,tutorialDone:!1,history:"unscanned",worldSeconds:0,farm:uu(),village:ru(),settings:{music:!0,musicVolume:.28,clockMode:"cycle",season:"cycle",muted:!1,lighting:"day",quality:"medium",reducedMotion:!1,cameraInput:"trackpad"}}}function Kh(i){if(!i||!Number.isInteger(i.size)||i.size<8||i.size>24||!["valley","meadow","river"].includes(i.terrain)||!Array.isArray(i.buildings)||!Array.isArray(i.roads))return!1;let e=new Set,t=new Set;for(let n of i.buildings){if(!n||typeof n.id!="string"||e.has(n.id)||!st[n.kind]||!Number.isInteger(n.rotation)||n.rotation<0||n.rotation>3||!Number.isInteger(n.x)||!Number.isInteger(n.z)||typeof n.placed!="boolean"||!Number.isInteger(n.variant)||n.variant<0||n.variant>4||(e.add(n.id),n.placed&&n.kind==="bridge"&&(i.terrain==="meadow"||n.rotation!==0||n.z!==(i.terrain==="valley"?11:5)||!vs(i).includes(n.x)))||n.placed&&n.kind==="fishinghut"&&!iu(i,n))return!1;if(n.placed)for(let s of Wn(n)){let r=ze(s.x,s.z);if(s.x<0||s.z<0||s.x>=i.size||s.z>=i.size||t.has(r)||pn(i,s.x,s.z)!==(n.kind==="bridge"))return!1;t.add(r)}}return i.buildings.filter(n=>n.kind==="hall"&&n.placed).length!==1?!1:i.roads.every(n=>typeof n=="string"&&/^\d+,\d+$/.test(n)&&n.split(",").every(s=>Number(s)<i.size)&&!t.has(n)&&!pn(i,qn(n).x,qn(n).z))&&new Set(i.roads).size===i.roads.length}function Io(i,e){if(!i)return null;try{let t=JSON.parse(i);if(!t||t.version!==1||t.mode!==e||!Kh(t.town)||t.town.size!==24||t.town.terrain!=="valley")return null;for(let s of[t.coins,t.tokenCoins,t.residue,t.subsidyPaid,t.nextId,t.demoStep,t.revision])if(!Number.isSafeInteger(s)||s<0)return null;if(t.residue>=1e4||!Array.isArray(t.chapterStars)||t.chapterStars.length!==6||t.chapterStars.some(s=>!Number.isInteger(s)||s<0||s>3))return null;let n=t.chapterStars.indexOf(0);if(n>=0&&t.chapterStars.slice(n).some(s=>s>0)||!t.puzzleStars||!t.puzzleBoards||Object.values(t.puzzleStars).some(s=>!Number.isInteger(s)||s<0||s>3)||Object.values(t.puzzleBoards).some(s=>!Kh(s))||!Array.isArray(t.projects)||t.projects.some(s=>!s||typeof s.id!="string"||typeof s.name!="string"||!Number.isSafeInteger(s.credited)||s.credited<0||!Number.isSafeInteger(s.tokens)||s.tokens<s.credited)||new Set(t.projects.map(s=>s.id)).size!==t.projects.length||t.projects.some(s=>typeof s.provider!="string"||t.town.buildings.filter(r=>r.kind==="workshop"&&r.projectId===s.id).length!==1)||t.town.buildings.some(s=>s.kind==="workshop"&&!t.projects.some(r=>r.id===s.projectId))||typeof t.tutorialDone!="boolean"||!["unscanned","empty","ready"].includes(t.history)||Array.isArray(t.puzzleStars)||Array.isArray(t.puzzleBoards)||typeof t.puzzleStars!="object"||typeof t.puzzleBoards!="object")return null;for(let[s,r]of Object.entries(t.puzzleBoards)){let a=Dn.find(o=>o.id===s);if(!a||r.size!==a.solution.size||r.terrain!==a.solution.terrain||r.buildings.length!==a.solution.buildings.length||r.roads.length>a.roadBudget||r.buildings.some(o=>!a.solution.buildings.some(c=>c.id===o.id&&c.kind===o.kind)))return null}return Object.keys(t.puzzleStars).some(s=>!Dn.some(r=>r.id===s))||t.subsidyPaid>Math.min(Math.floor(t.tokenCoins/5),ia(t))||t.coins>t.tokenCoins+t.subsidyPaid||!t.settings||typeof t.settings.muted!="boolean"||typeof t.settings.reducedMotion!="boolean"||!["day","sunset","night"].includes(t.settings.lighting)||!["high","medium","low"].includes(t.settings.quality)||(t.settings.cameraInput??="trackpad",t.settings.clockMode??="cycle",t.settings.season??="cycle",t.worldSeconds??=0,!["cycle","fixed"].includes(t.settings.clockMode)||!["cycle","spring","summer","autumn","winter"].includes(t.settings.season)||!Number.isFinite(t.worldSeconds)||t.worldSeconds<0)||!["trackpad","mouse"].includes(t.settings.cameraInput)||(t.settings.music??=!0,t.settings.musicVolume??=.28,t.farm??=uu(),t.farm.activeSeconds??=0,typeof t.settings.music!="boolean"||!Number.isFinite(t.settings.musicVolume)||t.settings.musicVolume<0||t.settings.musicVolume>1)||!t.farm||!t.farm.runs||Array.isArray(t.farm.runs)||typeof t.farm.runs!="object"||[t.farm.wheat,t.farm.flour,t.farm.bread,t.farm.batches].some(s=>!Number.isSafeInteger(s)||s<0)||!Number.isFinite(t.farm.activeSeconds)||t.farm.activeSeconds<0||Object.values(t.farm.runs).some(s=>!s||!ua.includes(s.phase)||!Number.isFinite(s.elapsed)||s.elapsed<0||typeof s.millId!="string"||typeof s.bakeryId!="string"||!Number.isSafeInteger(s.batches)||s.batches<0)||(t.village??=ru(),!Fh(t.village))?null:t}catch{return null}}function Zh(i){let e=Math.min(ia(i),Math.floor(i.tokenCoins/5)),t=Math.max(0,e-i.subsidyPaid);return i.subsidyPaid+=t,i.coins+=t,t}function jh(i,e){let t=0,n=0,s=[],r=new Set;for(let l of e){if(!l||typeof l.id!="string"||typeof l.name!="string"||!Number.isFinite(l.tokens)||l.tokens<0||r.has(l.id))continue;r.add(l.id);let u=Math.min(Number.MAX_SAFE_INTEGER,Math.floor(l.tokens)),d=i.projects.find(h=>h.id===l.id);if(!d&&l.legacyId&&!i.projects.some(h=>h.id===l.id)&&(d=i.projects.find(h=>h.id===l.legacyId),d)){let h=d.id;d.id=l.id;for(let p of i.town.buildings)p.projectId===h&&(p.projectId=l.id)}d||(d={id:l.id,name:l.name,provider:l.provider,tokens:0,credited:0},i.projects.push(d),n++,i.town.buildings.push({...ct(`project-${i.nextId++}`,"workshop",0,0),placed:!1,projectId:l.id}));let f=Ms(d.tokens);t+=Math.max(0,u-d.credited),d.credited=Math.max(d.credited,u),d.tokens=Math.max(d.tokens,u),d.name=l.name,d.provider=l.provider,Ms(d.tokens)>f&&s.push(d.name)}let a=i.residue+t,o=Math.floor(a/1e4);i.residue=a%1e4,i.tokenCoins+=o,i.coins+=o;let c=Zh(i);return i.projects.length>0&&(i.history="ready"),{newTokens:t,coins:o,subsidy:c,newProjects:n,grown:s}}function c0(i){let e=[185e4,104e4,74e4,37e4];return["\u6CB3\u8C37\u7B14\u8BB0","\u7EB8\u98DE\u673A","\u5C0F\u5C0F\u661F\u56FE","\u53E3\u888B\u82B1\u56ED"].map((t,n)=>({id:`demo-project-${n}`,name:t,provider:n%2?"claude":"codex",tokens:e[n]+i*[27e4,23e4,18e4,12e4][n]}))}var Lo=class{constructor(e){this.activePuzzle=null;this.persistenceError="";this.conflict=!1;this.listeners=new Set;let t="live";try{localStorage.getItem($h)==="demo"&&(t="demo")}catch{}this.state=this.read(e||t),this.persistedProgress=ws(this.state),typeof window<"u"&&window.addEventListener("storage",n=>{if(n.key===Po[this.state.mode]&&n.newValue){let s=Io(n.newValue,this.state.mode);if(s&&s.revision>this.state.revision)if(ws(s)===this.persistedProgress){let r=JSON.stringify(this.state.settings)!==JSON.stringify(s.settings);this.state.revision=s.revision,this.state.worldSeconds=s.worldSeconds,s.farm.activeSeconds>this.state.farm.activeSeconds&&(this.state.farm=s.farm),s.village.activeSeconds>this.state.village.activeSeconds&&(this.state.village=s.village),this.state.settings=s.settings,r&&this.emit()}else this.state=s,this.persistedProgress=ws(s),this.conflict=!0,this.emit()}})}read(e){try{return Io(localStorage.getItem(Po[e]),e)||Yh(e)}catch{return Yh(e)}}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}emit(){for(let e of this.listeners)e()}commit(e=!0){try{let t=Io(localStorage.getItem(Po[this.state.mode]),this.state.mode);if(t&&t.revision>this.state.revision)if(ws(t)===this.persistedProgress)this.state.revision=t.revision,t.farm.activeSeconds>this.state.farm.activeSeconds&&(this.state.farm=t.farm),t.village.activeSeconds>this.state.village.activeSeconds&&(this.state.village=t.village);else return this.state=t,this.persistedProgress=ws(t),this.conflict=!0,this.emit(),!1;this.state.revision++,localStorage.setItem(Po[this.state.mode],JSON.stringify(this.state)),localStorage.setItem($h,this.state.mode),this.persistenceError="",this.persistedProgress=ws(this.state)}catch{this.persistenceError="\u6D4F\u89C8\u5668\u672A\u80FD\u4FDD\u5B58\u8FDB\u5EA6\uFF0C\u8BF7\u5728\u8BBE\u7F6E\u4E2D\u5BFC\u51FA\u5B58\u6863"}return e&&this.emit(),!this.persistenceError}setMode(e){e!==this.state.mode&&(this.state=this.read(e),this.persistedProgress=ws(this.state),this.activePuzzle=null,this.conflict=!1,this.commit())}get board(){return this.activePuzzle?this.state.puzzleBoards[this.activePuzzle]:this.state.town}get puzzle(){return Dn.find(e=>e.id===this.activePuzzle)}unlockedKind(e){if(this.activePuzzle)return this.board.buildings.some(s=>s.kind===e);let t=$n.find(s=>s.reward===e);if(t)return(this.state.village.completed[t.id]||0)>0;let n=Dn.find(s=>s.reward===e);return n?(this.state.puzzleStars[n.id]||0)>0:st[e].chapter<=li(this.state)}sync(e){let t=jh(this.state,e);return this.commit(),t}syncDemo(){let e=jh(this.state,c0(this.state.demoStep++));return this.commit(),e}road(e,t,n=!1){let s=ze(e,t),r=this.board.roads.indexOf(s);return n?(r>=0&&(this.board.roads.splice(r,1),this.commit()),null):r>=0?null:Dh(this.state,this.board,e,t)?this.puzzle&&this.board.roads.length>=this.puzzle.roadBudget?`\u672C\u5173\u6700\u591A\u4F7F\u7528 ${this.puzzle.roadBudget} \u683C\u9053\u8DEF\uFF0C\u53EF\u64E6\u9664\u6216\u91CD\u65B0\u89C4\u5212`:(this.board.roads.push(s),this.commit(),null):"\u9053\u8DEF\u9700\u8981\u94FA\u5728\u5DF2\u5F00\u653E\u7684\u7A7A\u5730\u4E0A"}place(e,t,n,s,r){if(!this.unlockedKind(e))return"\u5148\u5B8C\u6210\u5BF9\u5E94\u7684\u59D4\u6258\u6216\u89C4\u5212\u5173\uFF0C\u89E3\u9501\u8FD9\u5F20\u84DD\u56FE";let a=r?this.board.buildings.find(l=>l.id===r&&l.kind===e):void 0;if(r&&!a)return"\u8FD9\u680B\u5EFA\u7B51\u4E0D\u5728\u5F53\u524D\u5E93\u5B58\u4E2D";if(this.activePuzzle&&!a)return"\u89C4\u5212\u5173\u4F7F\u7528\u56FA\u5B9A\u5E93\u5B58\uFF0C\u8BF7\u9009\u62E9\u4E00\u4E2A\u5DF2\u6709\u5EFA\u7B51";let o=a?{...a,x:t,z:n,rotation:s,placed:!0}:{...ct(`building-${this.state.nextId}`,e,t,n,s),variant:e==="house"?this.state.nextId%4:0},c=Js(this.state,this.board,o);if(c)return c;if(a)Object.assign(a,o);else{if(e==="workshop"||e==="hall")return"\u8BF7\u4ECE\u5E93\u5B58\u9009\u62E9\u5DF2\u6709\u7684\u5EFA\u7B51";if(this.state.coins<st[e].cost)return"\u91D1\u5E01\u8FD8\u4E0D\u591F\u3002\u540C\u6B65 token\uFF0C\u6216\u5148\u8BD5\u8BD5\u514D\u8D39\u7684\u89C4\u5212\u5173";this.state.coins-=st[e].cost,this.state.nextId++,this.board.buildings.push(o)}return this.commit(),null}stash(e){let t=this.board.buildings.find(n=>n.id===e);return!t||t.kind==="hall"||!t.placed?!1:(t.placed=!1,this.commit(),!0)}rotate(e){let t=this.board.buildings.find(n=>n.id===e);return t?t.kind==="bridge"?"\u77F3\u6865\u6CBF\u6CB3\u9053\u65B9\u5411\u653E\u7F6E":this.place(t.kind,t.x,t.z,(t.rotation+1)%4,e):"\u5EFA\u7B51\u4E0D\u5B58\u5728"}recolor(e){let t=this.board.buildings.find(a=>a.id===e);if(!t)return!1;let n=Dn.find(a=>a.reward===t.kind);if(n&&(this.state.puzzleStars[n.id]||0)<3||this.activePuzzle)return!1;let s=Qr.indexOf(t.kind),r=this.state.chapterStars[s]||0;return s>=0&&r<2?!1:(t.variant=(t.variant+1)%(n||s>=0&&r===2?2:4),this.commit(),!0)}claimChapter(e){if(this.activePuzzle||e<0||e>=6||e>0&&this.state.chapterStars[e-1]===0)return null;let t=na(e+1,ys(this.state.town));if(t<=this.state.chapterStars[e])return null;this.state.chapterStars[e]=t,e===0&&(this.state.tutorialDone=!0);let n=Zh(this.state);return this.commit(),{stars:t,subsidy:n,improved:!0}}enterPuzzle(e){let t=Dn.find(n=>n.id===e);return t?(this.state.puzzleBoards[e]||(this.state.puzzleBoards[e]=ou(t)),this.activePuzzle=e,this.commit(),!0):!1}leavePuzzle(){this.activePuzzle=null,this.emit()}restartPuzzle(){this.puzzle&&(this.state.puzzleBoards[this.puzzle.id]=ou(this.puzzle),this.commit())}claimPuzzle(){let e=this.puzzle;if(!e)return null;let t=ca(e,ys(this.board)),n=this.state.puzzleStars[e.id]||0;return t<=n?null:(this.state.puzzleStars[e.id]=t,this.commit(),{stars:t,first:n===0})}chooseProduction(e,t){let n=this.state.village.runs[e];!n||!["milk","cheese","carrot","potato","soup","fish"].includes(t)||(this.state.village.choices[e]=t,n.phase==="work"&&n.elapsed===0&&!Object.keys(n.cargo).length?n.choice=t:n.nextChoice=t,this.commit())}selectOrder(e){this.activePuzzle||(e===null||$n.some(t=>t.id===e))&&(this.state.village.activeOrder=e,this.commit())}fulfillOrder(e){if(this.activePuzzle)return"\u8BF7\u56DE\u5230\u4E3B\u57CE\u5B8C\u6210\u8BA2\u5355";if(!this.commit(!1))return"\u57CE\u9547\u8BB0\u5F55\u5DF2\u66F4\u65B0\uFF0C\u8BF7\u518D\u8BD5\u4E00\u6B21";let t=kh(this.state,ys(this.state.town),e,mn(this.state.worldSeconds,this.state.settings).season);return t||(this.state.village.activeSeconds+=.001,this.commit()),t}updateSettings(e){Object.assign(this.state.settings,e),this.commit()}clock(e,t=!1){this.state.worldSeconds=e,t&&this.commit(!1)}visitHour(e){this.state.worldSeconds=Gh(this.state.worldSeconds,e),this.state.settings.clockMode="cycle",this.commit()}importSave(e){let t=Io(e,this.state.mode);return t?(t.revision=this.state.revision,this.state=t,this.activePuzzle=null,this.commit(),!0):!1}};function Jh(i,e,t,n=!0){return i.buildings.filter(s=>s.placed&&s.kind==="house").map(s=>{let r=e.buildings[s.id],a=[];return r?.connected?(r.food||a.push("\u98DF\u7269"),t>=2&&!r.green&&a.push("\u7EFF\u5730"),t>=3&&n&&!r.leisure&&a.push("\u4F11\u95F2")):a.push("\u9053\u8DEF"),{home:s,needs:a}}).filter(s=>s.needs.length)}function Qh(i,e,t=!1){return i=i.toLowerCase(),"wasd".includes(i)&&i.length===1?"pan":i==="r"&&e?t?null:"turn-right":i==="q"||i==="e"?e?t?null:i==="q"?"turn-left":"turn-right":"camera-turn":null}function ep(i){let e=Number(i.has("d"))-Number(i.has("a")),t=Number(i.has("w"))-Number(i.has("s")),n=Math.hypot(e,t)||1;return{x:e/n,y:t/n}}function du(i,e){return Math.max(0,i)*12/e}var tp={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};var np=([i,e,t])=>{let n=document.createElementNS("http://www.w3.org/2000/svg",i);return Object.keys(e).forEach(s=>{n.setAttribute(s,String(e[s]))}),t?.length&&t.forEach(s=>{let r=np(s);n.appendChild(r)}),n},fu=(i,e={})=>{let t="svg",n={...tp,...e};return np([t,n,i])};var hu=[["rect",{width:"20",height:"5",x:"2",y:"3",rx:"1"}],["path",{d:"M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"}],["path",{d:"M10 12h4"}]];var pu=[["path",{d:"m12 19-7-7 7-7"}],["path",{d:"M19 12H5"}]];var mu=[["path",{d:"M5 12h14"}],["path",{d:"m12 5 7 7-7 7"}]];var gu=[["path",{d:"M7 7h10v10"}],["path",{d:"M7 17 17 7"}]];var xu=[["path",{d:"M12 5v16"}],["path",{d:"M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z"}]];var _u=[["path",{d:"M20 6 9 17l-5-5"}]];var vu=[["path",{d:"m9 18 6-6-6-6"}]];var yu=[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"}],["path",{d:"M12 11h4"}],["path",{d:"M12 16h4"}],["path",{d:"M8 11h.01"}],["path",{d:"M8 16h.01"}]];var bu=[["path",{d:"M10 2v2"}],["path",{d:"M14 2v2"}],["path",{d:"M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"}],["path",{d:"M6 2v2"}]];var Su=[["path",{d:"M13.744 17.736a6 6 0 1 1-7.48-7.48"}],["path",{d:"M15 6h1v4"}],["path",{d:"m6.134 14.768.866-.5 2 3.464"}],["circle",{cx:"16",cy:"8",r:"6"}]];var Mu=[["path",{d:"M12 15V3"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["path",{d:"m7 10 5 5 5-5"}]];var wu=[["path",{d:"M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21"}],["path",{d:"m5.082 11.09 8.828 8.828"}]];var Tu=[["path",{d:"M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528"}]];var Au=[["circle",{cx:"12",cy:"12",r:"3"}],["path",{d:"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2"}]];var Eu=[["path",{d:"m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9"}],["path",{d:"m18 15 4-4"}],["path",{d:"m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"}]];var Do=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}]];var Cu=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 16v-4"}],["path",{d:"M12 8h.01"}]];var Ru=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4"}]];var Pu=[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"}],["circle",{cx:"12",cy:"10",r:"3"}]];var Iu=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"}]];var Lu=[["path",{d:"M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"}]];var Du=[["path",{d:"M12 2v20"}],["path",{d:"m15 19-3 3-3-3"}],["path",{d:"m19 9 3 3-3 3"}],["path",{d:"M2 12h20"}],["path",{d:"m5 9-3 3 3 3"}],["path",{d:"m9 5 3-3 3 3"}]];var Nu=[["path",{d:"M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z"}]];var Uu=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]];var Fu=[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}]];var Ou=[["circle",{cx:"6",cy:"19",r:"3"}],["path",{d:"M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"}],["circle",{cx:"18",cy:"5",r:"3"}]];var ku=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"}],["circle",{cx:"12",cy:"12",r:"3"}]];var No=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"}],["path",{d:"M20 2v4"}],["path",{d:"M22 4h-4"}],["circle",{cx:"4",cy:"20",r:"2"}]];var Bu=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"}]];var zu=[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 2v2"}],["path",{d:"M12 20v2"}],["path",{d:"m4.93 4.93 1.41 1.41"}],["path",{d:"m17.66 17.66 1.41 1.41"}],["path",{d:"M2 12h2"}],["path",{d:"M20 12h2"}],["path",{d:"m6.34 17.66-1.41 1.41"}],["path",{d:"m19.07 4.93-1.41 1.41"}]];var Gu=[["path",{d:"M12 2v8"}],["path",{d:"m4.93 10.93 1.41 1.41"}],["path",{d:"M2 18h2"}],["path",{d:"M20 18h2"}],["path",{d:"m19.07 10.93-1.41 1.41"}],["path",{d:"M22 22H2"}],["path",{d:"m8 6 4-4 4 4"}],["path",{d:"M16 18a4 4 0 0 0-8 0"}]];var Vu=[["path",{d:"M12 10V2"}],["path",{d:"m4.93 10.93 1.41 1.41"}],["path",{d:"M2 18h2"}],["path",{d:"M20 18h2"}],["path",{d:"m19.07 10.93-1.41 1.41"}],["path",{d:"M22 22H2"}],["path",{d:"m16 6-4 4-4-4"}],["path",{d:"M16 18a4 4 0 0 0-8 0"}]];var Hu=[["path",{d:"M8 19a4 4 0 0 1-2.24-7.32A3.5 3.5 0 0 1 9 6.03V6a3 3 0 1 1 6 0v.04a3.5 3.5 0 0 1 3.24 5.65A4 4 0 0 1 16 19Z"}],["path",{d:"M12 19v3"}]];var Wu=[["path",{d:"M12 3v12"}],["path",{d:"m17 8-5-5-5 5"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}]];var Xu=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"}],["path",{d:"M16 9a5 5 0 0 1 0 6"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728"}]];var qu=[["path",{d:"M11 4.702a.7.7 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.7.7 0 0 0 11 19.298z"}],["path",{d:"m16.5 14.5 5-5"}],["path",{d:"m16.5 9.5 5 5"}]];var $u=[["path",{d:"M2 22 16 8"}],["path",{d:"M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"}],["path",{d:"M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"}],["path",{d:"M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"}],["path",{d:"M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z"}],["path",{d:"M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"}],["path",{d:"M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"}],["path",{d:"M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"}]];var Yu=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];var Ku=[["circle",{cx:"11",cy:"11",r:"8"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65"}],["line",{x1:"11",x2:"11",y1:"8",y2:"14"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11"}]];var ju=[["circle",{cx:"11",cy:"11",r:"8"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11"}]];function pa(i){i=Math.floor(i||0);let e=Math.abs(i);return e<1e3?String(i):e<1e6?e<1e4?(i/1e3).toFixed(1)+"K":Math.round(i/1e3)+"K":e<1e9?e<1e7?(i/1e6).toFixed(2)+"M":Math.round(i/1e6)+"M":(i/1e9).toFixed(2)+"B"}async function ip(){try{let e=await(await fetch("/api/usage",{cache:"no-store"})).json(),t=(e.projects||[]).map(n=>({id:n.id||n.name,name:n.name,provider:n.provider||"claude",tokens:Math.max(0,Math.floor(n.tokens||0)),...n.legacyId?{legacyId:n.legacyId}:{}}));return{source:e.source,projects:t,totals:e.totals,warnings:Array.isArray(e.warnings)?e.warnings.filter(n=>typeof n=="string"):[]}}catch(i){return{source:"error",projects:[],error:String(i)}}}function ma(i,e,t){let n=Ln(i,t.kind),s=t.placed&&!!e.buildings[t.id]?.connected,r={active:s,cells:[],homes:[]};if(!t.placed||!n.service&&t.kind!=="park")return r;let a=pt(t),o=Ti(e.connectedRoads,ze(a.x,a.z));if(t.kind==="park"){let{w:c,d:l}=Ut(t),u=Xn(i);if(s)for(let d=Math.max(0,t.z-u);d<Math.min(i.size,t.z+l+u);d++)for(let f=Math.max(0,t.x-u);f<Math.min(i.size,t.x+c+u);f++)Math.max(0,t.x-f,f-(t.x+c-1))+Math.max(0,t.z-d,d-(t.z+l-1))<=u&&!pn(i,f,d)&&r.cells.push({x:f,z:d})}else s&&(r.cells=[...o].filter(([,c])=>c<=n.range).map(([c])=>qn(c)));for(let c of i.buildings.filter(l=>l.placed&&l.kind==="house")){let l=e.buildings[c.id],u=pt(c),d=t.kind==="park"?ta(c,t):o.get(ze(u.x,u.z));d===void 0||d>(t.kind==="park"?Xn(i):n.range)||r.homes.push({home:c,distance:d,connected:!!l?.connected,served:s&&!!l?.connected&&(t.kind==="park"||l?.[n.service]===t.id)})}return r.homes.sort((c,l)=>c.distance-l.distance||c.home.id.localeCompare(l.home.id,"en")),r}function tr(i){return`${st[i.kind].name} \xB7 \u6A2A ${i.x+1} / \u7EB5 ${i.z+1}`}function Zu(i,e,t,n){let s=e.buildings[t.id];if(!s?.connected)return"\u4F4F\u5B85\u95E8\u53E3\u7684\u9053\u8DEF\u5C1A\u672A\u8FDE\u5230\u9547\u516C\u6240";if(n!=="green"&&s[n]){let d=i.buildings.find(f=>f.id===s[n]);return`${st[d.kind].name} \xB7 \u6B65\u884C ${s[`${n}Distance`]} \u683C`}if(n==="green"&&s.green)return`\u5DF2\u5728\u8FDE\u8DEF\u516C\u56ED\u7684 ${Xn(i)} \u683C\u8303\u56F4\u5185`;let r=i.buildings.filter(d=>d.placed&&(n==="green"?d.kind==="park":st[d.kind].service===n));if(!r.length)return n==="green"?`\u8FD8\u6CA1\u6709\u516C\u56ED\uFF0C\u9700\u5728\u4F4F\u5B85 ${Xn(i)} \u683C\u5185\u5E03\u7F6E`:`\u8FD8\u6CA1\u6709${n==="food"?"\u98DF\u7269":"\u4F11\u95F2"}\u5546\u5E97`;if(n==="green")return r.some(d=>ta(t,d)<=Xn(i))?"\u9644\u8FD1\u516C\u56ED\u5165\u53E3\u5C1A\u672A\u8FDE\u8DEF\uFF0C\u7EFF\u5730\u672A\u751F\u6548":`\u6700\u8FD1\u516C\u56ED\u8DDD\u79BB ${Math.min(...r.map(d=>ta(t,d)))} \u683C\uFF0C\u9700\u4E0D\u8D85\u8FC7 ${Xn(i)} \u683C`;let a=r.filter(d=>e.buildings[d.id]?.connected);if(!a.length)return"\u5546\u5E97\u5165\u53E3\u5C1A\u672A\u8FDE\u5230\u9547\u516C\u6240";let o=pt(t),c=Ti(e.connectedRoads,ze(o.x,o.z)),l=a.map(d=>({b:d,distance:c.get(ze(pt(d).x,pt(d).z))}));if(l.some(({b:d,distance:f})=>f<=Ln(i,d.kind).range))return"\u8303\u56F4\u5185\u5546\u5E97\u7684\u5BB9\u91CF\u5DF2\u6EE1\uFF0C\u53EF\u642C\u8FD1\u5176\u4ED6\u5546\u5E97\u6216\u65B0\u589E\u4E00\u5BB6";l.sort((d,f)=>d.distance-Ln(i,d.b.kind).range-(f.distance-Ln(i,f.b.kind).range)||d.b.id.localeCompare(f.b.id,"en"));let u=l[0];return`${st[u.b.kind].name}\u9700\u8D70 ${u.distance} \u683C\uFF0C\u8D85\u8FC7 ${Ln(i,u.b.kind).range} \u683C\u8303\u56F4`}function Ju(i,e,t){if(i===4)return"\u76EE\u6807\u6309\u4E24\u5CB8\u83B7\u5F97\u670D\u52A1\u7684\u4F4F\u5B85\u8BA1\u7B97\uFF0C\u70B9\u51FB\u59D4\u6258\u67E5\u770B\u8BE6\u60C5";let n=[4,6,8,6,12,16][i-1],s=e.buildings.filter(r=>r.placed&&r.kind==="house").length;return s<n?`\u5DF2\u6446\u653E ${s} \u680B\u4F4F\u5B85\uFF0C\u8FD8\u9700\u81F3\u5C11 ${n-s} \u680B\uFF1B\u52A0\u5546\u5E97\u4E0D\u4F1A\u589E\u52A0\u4F4F\u5B85\u6570\u91CF`:t.houses<n?`${s-t.houses} \u680B\u4F4F\u5B85\u672A\u8FDE\u8DEF\uFF0C\u5148\u63A5\u901A\u95E8\u53E3\u5230\u9547\u516C\u6240`:t.food<n?"\u4F4F\u5B85\u98DF\u7269\u5C1A\u672A\u6EE1\u8DB3\uFF1A\u67E5\u770B\u5546\u5E97\u8FDE\u8DEF\u3001\u6B65\u884C\u8303\u56F4\u4E0E\u5BB9\u91CF":i===2&&t.green<4?"\u98DF\u7269\u5DF2\u6EE1\u8DB3\uFF0C\u9700\u8BA9\u56DB\u680B\u4F4F\u5B85\u8FDB\u5165\u8FDE\u8DEF\u516C\u56ED\u7684\u516D\u683C\u8303\u56F4":i>=3&&t.leisure<(i===3?6:n)?"\u4F4F\u5B85\u8FD8\u7F3A\u4F11\u95F2\uFF1A\u67E5\u770B\u5496\u5561\u9986\u7B49\u8BBE\u65BD\u7684\u6B65\u884C\u8303\u56F4\u4E0E\u5BB9\u91CF":i>=5&&t.green<n?"\u4F4F\u5B85\u8FD8\u7F3A\u7EFF\u5730\uFF1A\u516C\u56ED\u9700\u8FDE\u8DEF\uFF0C\u6700\u8FD1\u8FB9\u7F18\u8DDD\u79BB\u4E0D\u8D85\u8FC7\u516D\u683C":"\u76EE\u6807\u6309\u83B7\u5F97\u670D\u52A1\u7684\u4F4F\u5B85\u8BA1\u7B97\uFF0C\u540C\u4E00\u9700\u6C42\u6BCF\u680B\u53EA\u8BA1\u4E00\u6B21"}var Vl="186",yn={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},cs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Kp=0,Hd=1,jp=2;var zs=1,Zp=2,kr=3,_i=0,hn=1,rn=2,vi=0,Br=1,Wd=2,Xd=3,qd=4,Jp=5;var Gs=100,Qp=101,em=102,tm=103,nm=104,im=200,sm=201,rm=202,am=203,$d=204,Yd=205,om=206,lm=207,cm=208,um=209,dm=210,fm=211,hm=212,pm=213,mm=214,dl=0,fl=1,hl=2,xr=3,pl=4,ml=5,gl=6,xl=7,Kd=0,gm=1,xm=2,ni=0,jd=1,Zd=2,Jd=3,so=4,Qd=5,ef=6,tf=7,Ad="attached",_m="detached",nf=300,us=301,Vs=302,Hl=303,Wl=304,ro=306,is=1e3,Fn=1001,_r=1002,Bt=1003,Xl=1004;var Hs=1005;var zt=1006,zr=1007;var ii=1008;var bn=1009,sf=1010,rf=1011,Gr=1012,ql=1013,si=1014,Rn=1015,ri=1016,$l=1017,Yl=1018,Vr=1020,af=35902,of=35899,lf=1021,cf=1022,Pn=1023,di=1026,ds=1027,Kl=1028,jl=1029,fs=1030,Zl=1031;var Jl=1033,ao=33776,oo=33777,lo=33778,co=33779,Ql=35840,ec=35841,tc=35842,nc=35843,ic=36196,sc=37492,rc=37496,ac=37488,oc=37489,uo=37490,lc=37491,cc=37808,uc=37809,dc=37810,fc=37811,hc=37812,pc=37813,mc=37814,gc=37815,xc=37816,_c=37817,vc=37818,yc=37819,bc=37820,Sc=37821,Mc=36492,wc=36494,Tc=36495,Ac=36283,Ec=36284,fo=36285,Cc=36286;var Is=2300,Ls=2301,ll=2302,Ed=2303,Cd=2400,Rd=2401,Pd=2402,vm=2500;var uf=0,ho=1,Hr=2,ym=3200;var Rc=0,bm=1,Vi="",kt="srgb",dn="srgb-linear",Ra="linear",_t="srgb";var cl=7680;var Sm=519,Mm=512,wm=513,Tm=514,Pc=515,Am=516,Em=517,Ic=518,Cm=519,df=35044;var ff="300 es",Jn=2e3,vr=2001;function u0(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function d0(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function yr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Rm(){let i=yr("canvas");return i.style.display="block",i}var sp={},br=null;function Pa(...i){let e="THREE."+i.shift();br?br("log",e,...i):console.log(e,...i)}function Pm(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ne(...i){i=Pm(i);let e="THREE."+i.shift();if(br)br("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function We(...i){i=Pm(i);let e="THREE."+i.shift();if(br)br("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Ps(...i){let e=i.join(" ");e in sp||(sp[e]=!0,Ne(...i))}function Im(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Lm={[dl]:fl,[hl]:gl,[pl]:xl,[xr]:ml,[fl]:dl,[gl]:hl,[xl]:pl,[ml]:xr},Qn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},Qt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],rp=1234567,Ta=Math.PI/180,Ds=180/Math.PI;function On(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Qt[i&255]+Qt[i>>8&255]+Qt[i>>16&255]+Qt[i>>24&255]+"-"+Qt[e&255]+Qt[e>>8&255]+"-"+Qt[e>>16&15|64]+Qt[e>>24&255]+"-"+Qt[t&63|128]+Qt[t>>8&255]+"-"+Qt[t>>16&255]+Qt[t>>24&255]+Qt[n&255]+Qt[n>>8&255]+Qt[n>>16&255]+Qt[n>>24&255]).toLowerCase()}function Qe(i,e,t){return Math.max(e,Math.min(t,i))}function hf(i,e){return(i%e+e)%e}function f0(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function h0(i,e,t){return i!==e?(t-i)/(e-i):0}function Aa(i,e,t){return(1-t)*i+t*e}function p0(i,e,t,n){return Aa(i,e,1-Math.exp(-t*n))}function m0(i,e=1){return e-Math.abs(hf(i,e*2)-e)}function g0(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function x0(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function _0(i,e){return i+Math.floor(Math.random()*(e-i+1))}function v0(i,e){return i+Math.random()*(e-i)}function y0(i){return i*(.5-Math.random())}function b0(i){i!==void 0&&(rp=i);let e=rp+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function S0(i){return i*Ta}function M0(i){return i*Ds}function w0(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function T0(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function A0(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function E0(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),u=a((e+n)/2),d=r((e-n)/2),f=a((e-n)/2),h=r((n-e)/2),p=a((n-e)/2);switch(s){case"XYX":i.set(o*u,c*d,c*f,o*l);break;case"YZY":i.set(c*f,o*u,c*d,o*l);break;case"ZXZ":i.set(c*d,c*f,o*u,o*l);break;case"XZX":i.set(o*u,c*p,c*h,o*l);break;case"YXY":i.set(c*h,o*u,c*p,o*l);break;case"ZYZ":i.set(c*p,c*h,o*u,o*l);break;default:Ne("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Zn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function bt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var hs={DEG2RAD:Ta,RAD2DEG:Ds,generateUUID:On,clamp:Qe,euclideanModulo:hf,mapLinear:f0,inverseLerp:h0,lerp:Aa,damp:p0,pingpong:m0,smoothstep:g0,smootherstep:x0,randInt:_0,randFloat:v0,randFloatSpread:y0,seededRandom:b0,degToRad:S0,radToDeg:M0,isPowerOfTwo:w0,ceilPowerOfTwo:T0,floorPowerOfTwo:A0,setQuaternionFromProperEuler:E0,normalize:bt,denormalize:Zn},re=class i{static{i.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Qe(this.x,e.x,t.x),this.y=Qe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Qe(this.x,e,t),this.y=Qe(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Qe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},tn=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],u=n[s+2],d=n[s+3],f=r[a+0],h=r[a+1],p=r[a+2],x=r[a+3];if(d!==x||c!==f||l!==h||u!==p){let m=c*f+l*h+u*p+d*x;m<0&&(f=-f,h=-h,p=-p,x=-x,m=-m);let g=1-o;if(m<.9995){let b=Math.acos(m),T=Math.sin(b);g=Math.sin(g*b)/T,o=Math.sin(o*b)/T,c=c*g+f*o,l=l*g+h*o,u=u*g+p*o,d=d*g+x*o}else{c=c*g+f*o,l=l*g+h*o,u=u*g+p*o,d=d*g+x*o;let b=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=b,l*=b,u*=b,d*=b}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],c=n[s+1],l=n[s+2],u=n[s+3],d=r[a],f=r[a+1],h=r[a+2],p=r[a+3];return e[t]=o*p+u*d+c*h-l*f,e[t+1]=c*p+u*f+l*d-o*h,e[t+2]=l*p+u*h+o*f-c*d,e[t+3]=u*p-o*d-c*f-l*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(s/2),d=o(r/2),f=c(n/2),h=c(s/2),p=c(r/2);switch(a){case"XYZ":this._x=f*u*d+l*h*p,this._y=l*h*d-f*u*p,this._z=l*u*p+f*h*d,this._w=l*u*d-f*h*p;break;case"YXZ":this._x=f*u*d+l*h*p,this._y=l*h*d-f*u*p,this._z=l*u*p-f*h*d,this._w=l*u*d+f*h*p;break;case"ZXY":this._x=f*u*d-l*h*p,this._y=l*h*d+f*u*p,this._z=l*u*p+f*h*d,this._w=l*u*d-f*h*p;break;case"ZYX":this._x=f*u*d-l*h*p,this._y=l*h*d+f*u*p,this._z=l*u*p-f*h*d,this._w=l*u*d+f*h*p;break;case"YZX":this._x=f*u*d+l*h*p,this._y=l*h*d+f*u*p,this._z=l*u*p-f*h*d,this._w=l*u*d-f*h*p;break;case"XZY":this._x=f*u*d-l*h*p,this._y=l*h*d-f*u*p,this._z=l*u*p+f*h*d,this._w=l*u*d+f*h*p;break;default:Ne("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],d=t[10],f=n+o+d;if(f>0){let h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-c)*h,this._y=(r-l)*h,this._z=(a-s)*h}else if(n>o&&n>d){let h=2*Math.sqrt(1+n-o-d);this._w=(u-c)/h,this._x=.25*h,this._y=(s+a)/h,this._z=(r+l)/h}else if(o>d){let h=2*Math.sqrt(1+o-n-d);this._w=(r-l)/h,this._x=(s+a)/h,this._y=.25*h,this._z=(c+u)/h}else{let h=2*Math.sqrt(1+d-n-o);this._w=(a-s)/h,this._x=(r+l)/h,this._y=(c+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Qe(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+a*o+s*l-r*c,this._y=s*u+a*c+r*o-n*l,this._z=r*u+a*l+n*c-s*o,this._w=a*u-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){let l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},L=class i{static{i.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ap.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ap.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),u=2*(o*t-r*s),d=2*(r*n-a*t);return this.x=t+c*l+a*d-o*u,this.y=n+c*u+o*l-r*d,this.z=s+c*d+r*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Qe(this.x,e.x,t.x),this.y=Qe(this.y,e.y,t.y),this.z=Qe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Qe(this.x,e,t),this.y=Qe(this.y,e,t),this.z=Qe(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Qu.copy(this).projectOnVector(e),this.sub(Qu)}reflect(e){return this.sub(Qu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Qe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Qu=new L,ap=new tn,Ke=class i{static{i.prototype.isMatrix3=!0}constructor(e,t,n,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){let u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],d=n[7],f=n[2],h=n[5],p=n[8],x=s[0],m=s[3],g=s[6],b=s[1],T=s[4],_=s[7],M=s[2],A=s[5],R=s[8];return r[0]=a*x+o*b+c*M,r[3]=a*m+o*T+c*A,r[6]=a*g+o*_+c*R,r[1]=l*x+u*b+d*M,r[4]=l*m+u*T+d*A,r[7]=l*g+u*_+d*R,r[2]=f*x+h*b+p*M,r[5]=f*m+h*T+p*A,r[8]=f*g+h*_+p*R,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-n*r*u+n*o*c+s*r*l-s*a*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=u*a-o*l,f=o*c-u*r,h=l*r-a*c,p=t*d+n*f+s*h;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/p;return e[0]=d*x,e[1]=(s*l-u*n)*x,e[2]=(o*n-s*a)*x,e[3]=f*x,e[4]=(u*t-s*c)*x,e[5]=(s*r-o*t)*x,e[6]=h*x,e[7]=(n*c-l*t)*x,e[8]=(a*t-n*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return Ps("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ed.makeScale(e,t)),this}rotate(e){return Ps("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ed.makeRotation(-e)),this}translate(e,t){return Ps("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ed.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},ed=new Ke,op=new Ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),lp=new Ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function C0(){let i={enabled:!0,workingColorSpace:dn,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===_t&&(s.r=Li(s.r),s.g=Li(s.g),s.b=Li(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===_t&&(s.r=gr(s.r),s.g=gr(s.g),s.b=gr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Vi?Ra:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Ps("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Ps("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[dn]:{primaries:e,whitePoint:n,transfer:Ra,toXYZ:op,fromXYZ:lp,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:kt},outputColorSpaceConfig:{drawingBufferColorSpace:kt}},[kt]:{primaries:e,whitePoint:n,transfer:_t,toXYZ:op,fromXYZ:lp,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:kt}}}),i}var it=C0();function Li(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function gr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var nr,_l=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{nr===void 0&&(nr=yr("canvas")),nr.width=e.width,nr.height=e.height;let s=nr.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=nr}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=yr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Li(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Li(t[n]/255)*255):t[n]=Li(t[n]);return{data:t,width:e.width,height:e.height}}else return Ne("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},R0=0,Sr=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:R0++}),this.uuid=On(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(td(s[a].image)):r.push(td(s[a]))}else r=td(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function td(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?_l.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ne("Texture: Unable to serialize Texture."),{})}var P0=0,nd=new L,Zt=class i extends Qn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Fn,s=Fn,r=zt,a=ii,o=Pn,c=bn,l=i.DEFAULT_ANISOTROPY,u=Vi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:P0++}),this.uuid=On(),this.name="",this.source=new Sr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new re(0,0),this.repeat=new re(1,1),this.center=new re(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(nd).x}get height(){return this.source.getSize(nd).y}get depth(){return this.source.getSize(nd).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Ne(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ne(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==nf)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case is:e.x=e.x-Math.floor(e.x);break;case Fn:e.x=e.x<0?0:1;break;case _r:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case is:e.y=e.y-Math.floor(e.y);break;case Fn:e.y=e.y<0?0:1;break;case _r:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Zt.DEFAULT_IMAGE=null;Zt.DEFAULT_MAPPING=nf;Zt.DEFAULT_ANISOTROPY=1;var St=class i{static{i.prototype.isVector4=!0}constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,l=c[0],u=c[4],d=c[8],f=c[1],h=c[5],p=c[9],x=c[2],m=c[6],g=c[10];if(Math.abs(u-f)<.01&&Math.abs(d-x)<.01&&Math.abs(p-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+x)<.1&&Math.abs(p+m)<.1&&Math.abs(l+h+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let T=(l+1)/2,_=(h+1)/2,M=(g+1)/2,A=(u+f)/4,R=(d+x)/4,v=(p+m)/4;return T>_&&T>M?T<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(T),s=A/n,r=R/n):_>M?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=A/s,r=v/s):M<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(M),n=R/r,s=v/r),this.set(n,s,r,t),this}let b=Math.sqrt((m-p)*(m-p)+(d-x)*(d-x)+(f-u)*(f-u));return Math.abs(b)<.001&&(b=1),this.x=(m-p)/b,this.y=(d-x)/b,this.z=(f-u)/b,this.w=Math.acos((l+h+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Qe(this.x,e.x,t.x),this.y=Qe(this.y,e.y,t.y),this.z=Qe(this.z,e.z,t.z),this.w=Qe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Qe(this.x,e,t),this.y=Qe(this.y,e,t),this.z=Qe(this.z,e,t),this.w=Qe(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},vl=class extends Qn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:zt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new St(0,0,e,t),this.scissorTest=!1,this.viewport=new St(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:n.depth},r=new Zt(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:zt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Sr(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},nn=class extends vl{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Ia=class extends Zt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Bt,this.minFilter=Bt,this.wrapR=Fn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var yl=class extends Zt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Bt,this.minFilter=Bt,this.wrapR=Fn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var Ye=class i{static{i.prototype.isMatrix4=!0}constructor(e,t,n,s,r,a,o,c,l,u,d,f,h,p,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,u,d,f,h,p,x,m)}set(e,t,n,s,r,a,o,c,l,u,d,f,h,p,x,m){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=s,g[1]=r,g[5]=a,g[9]=o,g[13]=c,g[2]=l,g[6]=u,g[10]=d,g[14]=f,g[3]=h,g[7]=p,g[11]=x,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/ir.setFromMatrixColumn(e,0).length(),r=1/ir.setFromMatrixColumn(e,1).length(),a=1/ir.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let f=a*u,h=a*d,p=o*u,x=o*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=h+p*l,t[5]=f-x*l,t[9]=-o*c,t[2]=x-f*l,t[6]=p+h*l,t[10]=a*c}else if(e.order==="YXZ"){let f=c*u,h=c*d,p=l*u,x=l*d;t[0]=f+x*o,t[4]=p*o-h,t[8]=a*l,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=h*o-p,t[6]=x+f*o,t[10]=a*c}else if(e.order==="ZXY"){let f=c*u,h=c*d,p=l*u,x=l*d;t[0]=f-x*o,t[4]=-a*d,t[8]=p+h*o,t[1]=h+p*o,t[5]=a*u,t[9]=x-f*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let f=a*u,h=a*d,p=o*u,x=o*d;t[0]=c*u,t[4]=p*l-h,t[8]=f*l+x,t[1]=c*d,t[5]=x*l+f,t[9]=h*l-p,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let f=a*c,h=a*l,p=o*c,x=o*l;t[0]=c*u,t[4]=x-f*d,t[8]=p*d+h,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=h*d+p,t[10]=f-x*d}else if(e.order==="XZY"){let f=a*c,h=a*l,p=o*c,x=o*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=f*d+x,t[5]=a*u,t[9]=h*d-p,t[2]=p*d-h,t[6]=o*u,t[10]=x*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(I0,e,L0)}lookAt(e,t,n){let s=this.elements;return Mn.subVectors(e,t),Mn.lengthSq()===0&&(Mn.z=1),Mn.normalize(),ji.crossVectors(n,Mn),ji.lengthSq()===0&&(Math.abs(n.z)===1?Mn.x+=1e-4:Mn.z+=1e-4,Mn.normalize(),ji.crossVectors(n,Mn)),ji.normalize(),Uo.crossVectors(Mn,ji),s[0]=ji.x,s[4]=Uo.x,s[8]=Mn.x,s[1]=ji.y,s[5]=Uo.y,s[9]=Mn.y,s[2]=ji.z,s[6]=Uo.z,s[10]=Mn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],d=n[5],f=n[9],h=n[13],p=n[2],x=n[6],m=n[10],g=n[14],b=n[3],T=n[7],_=n[11],M=n[15],A=s[0],R=s[4],v=s[8],S=s[12],C=s[1],D=s[5],F=s[9],N=s[13],I=s[2],U=s[6],z=s[10],V=s[14],Z=s[3],q=s[7],J=s[11],ie=s[15];return r[0]=a*A+o*C+c*I+l*Z,r[4]=a*R+o*D+c*U+l*q,r[8]=a*v+o*F+c*z+l*J,r[12]=a*S+o*N+c*V+l*ie,r[1]=u*A+d*C+f*I+h*Z,r[5]=u*R+d*D+f*U+h*q,r[9]=u*v+d*F+f*z+h*J,r[13]=u*S+d*N+f*V+h*ie,r[2]=p*A+x*C+m*I+g*Z,r[6]=p*R+x*D+m*U+g*q,r[10]=p*v+x*F+m*z+g*J,r[14]=p*S+x*N+m*V+g*ie,r[3]=b*A+T*C+_*I+M*Z,r[7]=b*R+T*D+_*U+M*q,r[11]=b*v+T*F+_*z+M*J,r[15]=b*S+T*N+_*V+M*ie,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],d=e[6],f=e[10],h=e[14],p=e[3],x=e[7],m=e[11],g=e[15],b=c*h-l*f,T=o*h-l*d,_=o*f-c*d,M=a*h-l*u,A=a*f-c*u,R=a*d-o*u;return t*(x*b-m*T+g*_)-n*(p*b-m*M+g*A)+s*(p*T-x*M+g*R)-r*(p*_-x*A+m*R)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],c=e[2],l=e[6],u=e[10];return t*(a*u-o*l)-n*(r*u-o*c)+s*(r*l-a*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=e[9],f=e[10],h=e[11],p=e[12],x=e[13],m=e[14],g=e[15],b=t*o-n*a,T=t*c-s*a,_=t*l-r*a,M=n*c-s*o,A=n*l-r*o,R=s*l-r*c,v=u*x-d*p,S=u*m-f*p,C=u*g-h*p,D=d*m-f*x,F=d*g-h*x,N=f*g-h*m,I=b*N-T*F+_*D+M*C-A*S+R*v;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let U=1/I;return e[0]=(o*N-c*F+l*D)*U,e[1]=(s*F-n*N-r*D)*U,e[2]=(x*R-m*A+g*M)*U,e[3]=(f*A-d*R-h*M)*U,e[4]=(c*C-a*N-l*S)*U,e[5]=(t*N-s*C+r*S)*U,e[6]=(m*_-p*R-g*T)*U,e[7]=(u*R-f*_+h*T)*U,e[8]=(a*F-o*C+l*v)*U,e[9]=(n*C-t*F-r*v)*U,e[10]=(p*A-x*_+g*b)*U,e[11]=(d*_-u*A-h*b)*U,e[12]=(o*S-a*D-c*v)*U,e[13]=(t*D-n*S+s*v)*U,e[14]=(x*T-p*M-m*b)*U,e[15]=(u*M-d*T+f*b)*U,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,u=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,u*o+n,u*c-s*a,0,l*c-s*o,u*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,u=a+a,d=o+o,f=r*l,h=r*u,p=r*d,x=a*u,m=a*d,g=o*d,b=c*l,T=c*u,_=c*d,M=n.x,A=n.y,R=n.z;return s[0]=(1-(x+g))*M,s[1]=(h+_)*M,s[2]=(p-T)*M,s[3]=0,s[4]=(h-_)*A,s[5]=(1-(f+g))*A,s[6]=(m+b)*A,s[7]=0,s[8]=(p+T)*R,s[9]=(m-b)*R,s[10]=(1-(f+x))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=ir.set(s[0],s[1],s[2]).length(),o=ir.set(s[4],s[5],s[6]).length(),c=ir.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Yn.copy(this);let l=1/a,u=1/o,d=1/c;return Yn.elements[0]*=l,Yn.elements[1]*=l,Yn.elements[2]*=l,Yn.elements[4]*=u,Yn.elements[5]*=u,Yn.elements[6]*=u,Yn.elements[8]*=d,Yn.elements[9]*=d,Yn.elements[10]*=d,t.setFromRotationMatrix(Yn),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,s,r,a,o=Jn,c=!1){let l=this.elements,u=2*r/(t-e),d=2*r/(n-s),f=(t+e)/(t-e),h=(n+s)/(n-s),p,x;if(c)p=r/(a-r),x=a*r/(a-r);else if(o===Jn)p=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===vr)p=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=d,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Jn,c=!1){let l=this.elements,u=2/(t-e),d=2/(n-s),f=-(t+e)/(t-e),h=-(n+s)/(n-s),p,x;if(c)p=1/(a-r),x=a/(a-r);else if(o===Jn)p=-2/(a-r),x=-(a+r)/(a-r);else if(o===vr)p=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=d,l[9]=0,l[13]=h,l[2]=0,l[6]=0,l[10]=p,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},ir=new L,Yn=new Ye,I0=new L(0,0,0),L0=new L(1,1,1),ji=new L,Uo=new L,Mn=new L,cp=new Ye,up=new tn,Di=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],u=s[9],d=s[2],f=s[6],h=s[10];switch(t){case"XYZ":this._y=Math.asin(Qe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Qe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,h),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Qe(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,h),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Qe(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,h),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Qe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,h));break;case"XZY":this._z=Math.asin(-Qe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,h),this._y=0);break;default:Ne("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return cp.makeRotationFromQuaternion(e),this.setFromRotationMatrix(cp,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return up.setFromEuler(this),this.setFromQuaternion(up,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Di.DEFAULT_ORDER="XYZ";var Mr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},D0=0,dp=new L,sr=new tn,Ai=new Ye,Fo=new L,ga=new L,N0=new L,U0=new tn,fp=new L(1,0,0),hp=new L(0,1,0),pp=new L(0,0,1),mp={type:"added"},F0={type:"removed"},rr={type:"childadded",child:null},id={type:"childremoved",child:null},vt=class i extends Qn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:D0++}),this.uuid=On(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new L,t=new Di,n=new tn,s=new L(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ye},normalMatrix:{value:new Ke}}),this.matrix=new Ye,this.matrixWorld=new Ye,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Mr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return sr.setFromAxisAngle(e,t),this.quaternion.multiply(sr),this}rotateOnWorldAxis(e,t){return sr.setFromAxisAngle(e,t),this.quaternion.premultiply(sr),this}rotateX(e){return this.rotateOnAxis(fp,e)}rotateY(e){return this.rotateOnAxis(hp,e)}rotateZ(e){return this.rotateOnAxis(pp,e)}translateOnAxis(e,t){return dp.copy(e).applyQuaternion(this.quaternion),this.position.add(dp.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(fp,e)}translateY(e){return this.translateOnAxis(hp,e)}translateZ(e){return this.translateOnAxis(pp,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ai.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Fo.copy(e):Fo.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),ga.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ai.lookAt(ga,Fo,this.up):Ai.lookAt(Fo,ga,this.up),this.quaternion.setFromRotationMatrix(Ai),s&&(Ai.extractRotation(s.matrixWorld),sr.setFromRotationMatrix(Ai),this.quaternion.premultiply(sr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(We("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(mp),rr.child=e,this.dispatchEvent(rr),rr.child=null):We("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(F0),id.child=e,this.dispatchEvent(id),id.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ai.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ai.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ai),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(mp),rr.child=e,this.dispatchEvent(rr),rr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ga,e,N0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ga,U0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let d=c[l];r(e.shapes,d)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),d=a(e.shapes),f=a(e.skeletons),h=a(e.animations),p=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),h.length>0&&(n.animations=h),p.length>0&&(n.nodes=p)}return n.object=s,n;function a(o){let c=[];for(let l in o){let u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};vt.DEFAULT_UP=new L(0,1,0);vt.DEFAULT_MATRIX_AUTO_UPDATE=!0;vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ge=class extends vt{constructor(){super(),this.isGroup=!0,this.type="Group"}},O0={type:"move"},wr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ge,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ge,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ge,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let x of e.hand.values()){let m=t.getJointPose(x,n),g=this._getHandJoint(l,x);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}let u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],f=u.position.distanceTo(d.position),h=.02,p=.005;l.inputState.pinching&&f>h+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=h-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(O0)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new ge;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Dm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zi={h:0,s:0,l:0},Oo={h:0,s:0,l:0};function sd(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Se=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=kt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,it.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=it.workingColorSpace){return this.r=e,this.g=t,this.b=n,it.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=it.workingColorSpace){if(e=hf(e,1),t=Qe(t,0,1),n=Qe(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=sd(a,r,e+1/3),this.g=sd(a,r,e),this.b=sd(a,r,e-1/3)}return it.colorSpaceToWorking(this,s),this}setStyle(e,t=kt){function n(r){r!==void 0&&parseFloat(r)<1&&Ne("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ne("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Ne("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=kt){let n=Dm[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ne("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Li(e.r),this.g=Li(e.g),this.b=Li(e.b),this}copyLinearToSRGB(e){return this.r=gr(e.r),this.g=gr(e.g),this.b=gr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=kt){return it.workingToColorSpace(en.copy(this),e),Math.round(Qe(en.r*255,0,255))*65536+Math.round(Qe(en.g*255,0,255))*256+Math.round(Qe(en.b*255,0,255))}getHexString(e=kt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=it.workingColorSpace){it.workingToColorSpace(en.copy(this),t);let n=en.r,s=en.g,r=en.b,a=Math.max(n,s,r),o=Math.min(n,s,r),c,l,u=(o+a)/2;if(o===a)c=0,l=0;else{let d=a-o;switch(l=u<=.5?d/(a+o):d/(2-a-o),a){case n:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-n)/d+2;break;case r:c=(n-s)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=it.workingColorSpace){return it.workingToColorSpace(en.copy(this),t),e.r=en.r,e.g=en.g,e.b=en.b,e}getStyle(e=kt){it.workingToColorSpace(en.copy(this),e);let t=en.r,n=en.g,s=en.b;return e!==kt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Zi),this.setHSL(Zi.h+e,Zi.s+t,Zi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Zi),e.getHSL(Oo);let n=Aa(Zi.h,Oo.h,t),s=Aa(Zi.s,Oo.s,t),r=Aa(Zi.l,Oo.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},en=new Se;Se.NAMES=Dm;var La=class i{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Se(e),this.near=t,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Tr=class extends vt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Di,this.environmentIntensity=1,this.environmentRotation=new Di,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Kn=new L,Ei=new L,rd=new L,Ci=new L,ar=new L,or=new L,gp=new L,ad=new L,od=new L,ld=new L,cd=new St,ud=new St,dd=new St,ns=class i{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Kn.subVectors(e,t),s.cross(Kn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Kn.subVectors(s,t),Ei.subVectors(n,t),rd.subVectors(e,t);let a=Kn.dot(Kn),o=Kn.dot(Ei),c=Kn.dot(rd),l=Ei.dot(Ei),u=Ei.dot(rd),d=a*l-o*o;if(d===0)return r.set(0,0,0),null;let f=1/d,h=(l*c-o*u)*f,p=(a*u-o*c)*f;return r.set(1-h-p,p,h)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Ci)===null?!1:Ci.x>=0&&Ci.y>=0&&Ci.x+Ci.y<=1}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,Ci)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Ci.x),c.addScaledVector(a,Ci.y),c.addScaledVector(o,Ci.z),c)}static getInterpolatedAttribute(e,t,n,s,r,a){return cd.setScalar(0),ud.setScalar(0),dd.setScalar(0),cd.fromBufferAttribute(e,t),ud.fromBufferAttribute(e,n),dd.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(cd,r.x),a.addScaledVector(ud,r.y),a.addScaledVector(dd,r.z),a}static isFrontFacing(e,t,n,s){return Kn.subVectors(n,t),Ei.subVectors(e,t),Kn.cross(Ei).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Kn.subVectors(this.c,this.b),Ei.subVectors(this.a,this.b),Kn.cross(Ei).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;ar.subVectors(s,n),or.subVectors(r,n),ad.subVectors(e,n);let c=ar.dot(ad),l=or.dot(ad);if(c<=0&&l<=0)return t.copy(n);od.subVectors(e,s);let u=ar.dot(od),d=or.dot(od);if(u>=0&&d<=u)return t.copy(s);let f=c*d-u*l;if(f<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(n).addScaledVector(ar,a);ld.subVectors(e,r);let h=ar.dot(ld),p=or.dot(ld);if(p>=0&&h<=p)return t.copy(r);let x=h*l-c*p;if(x<=0&&l>=0&&p<=0)return o=l/(l-p),t.copy(n).addScaledVector(or,o);let m=u*p-h*d;if(m<=0&&d-u>=0&&h-p>=0)return gp.subVectors(r,s),o=(d-u)/(d-u+(h-p)),t.copy(s).addScaledVector(gp,o);let g=1/(m+x+f);return a=x*g,o=f*g,t.copy(n).addScaledVector(ar,a).addScaledVector(or,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Tn=class{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(jn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(jn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=jn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,jn):jn.fromBufferAttribute(r,a),jn.applyMatrix4(e.matrixWorld),this.expandByPoint(jn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ko.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ko.copy(n.boundingBox)),ko.applyMatrix4(e.matrixWorld),this.union(ko)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,jn),jn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(xa),Bo.subVectors(this.max,xa),lr.subVectors(e.a,xa),cr.subVectors(e.b,xa),ur.subVectors(e.c,xa),Ji.subVectors(cr,lr),Qi.subVectors(ur,cr),Ts.subVectors(lr,ur);let t=[0,-Ji.z,Ji.y,0,-Qi.z,Qi.y,0,-Ts.z,Ts.y,Ji.z,0,-Ji.x,Qi.z,0,-Qi.x,Ts.z,0,-Ts.x,-Ji.y,Ji.x,0,-Qi.y,Qi.x,0,-Ts.y,Ts.x,0];return!fd(t,lr,cr,ur,Bo)||(t=[1,0,0,0,1,0,0,0,1],!fd(t,lr,cr,ur,Bo))?!1:(zo.crossVectors(Ji,Qi),t=[zo.x,zo.y,zo.z],fd(t,lr,cr,ur,Bo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,jn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(jn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ri[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ri[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ri[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ri[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ri[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ri[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ri[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ri[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ri),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Ri=[new L,new L,new L,new L,new L,new L,new L,new L],jn=new L,ko=new Tn,lr=new L,cr=new L,ur=new L,Ji=new L,Qi=new L,Ts=new L,xa=new L,Bo=new L,zo=new L,As=new L;function fd(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){As.fromArray(i,r);let o=s.x*Math.abs(As.x)+s.y*Math.abs(As.y)+s.z*Math.abs(As.z),c=e.dot(As),l=t.dot(As),u=n.dot(As);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}var Ht=new L,Go=new re,k0=0,Wt=class extends Qn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:k0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=df,this.updateRanges=[],this.gpuType=Rn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Go.fromBufferAttribute(this,t),Go.applyMatrix3(e),this.setXY(t,Go.x,Go.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.applyMatrix3(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.applyMatrix4(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.applyNormalMatrix(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.transformDirection(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Zn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=bt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Zn(t,this.array)),t}setX(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Zn(t,this.array)),t}setY(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Zn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Zn(t,this.array)),t}setW(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),s=bt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),s=bt(s,this.array),r=bt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var Da=class extends Wt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Na=class extends Wt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var tt=class extends Wt{constructor(e,t,n){super(new Float32Array(e),t,n)}},B0=new Tn,_a=new L,hd=new L,gn=class{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):B0.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;_a.subVectors(e,this.center);let t=_a.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(_a,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(hd.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(_a.copy(e.center).add(hd)),this.expandByPoint(_a.copy(e.center).sub(hd))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},z0=0,Un=new Ye,pd=new vt,dr=new L,wn=new Tn,va=new Tn,Kt=new L,ft=class i extends Qn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:z0++}),this.uuid=On(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(u0(e)?Na:Da)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ke().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Un.makeRotationFromQuaternion(e),this.applyMatrix4(Un),this}rotateX(e){return Un.makeRotationX(e),this.applyMatrix4(Un),this}rotateY(e){return Un.makeRotationY(e),this.applyMatrix4(Un),this}rotateZ(e){return Un.makeRotationZ(e),this.applyMatrix4(Un),this}translate(e,t,n){return Un.makeTranslation(e,t,n),this.applyMatrix4(Un),this}scale(e,t,n){return Un.makeScale(e,t,n),this.applyMatrix4(Un),this}lookAt(e){return pd.lookAt(e),pd.updateMatrix(),this.applyMatrix4(pd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(dr).negate(),this.translate(dr.x,dr.y,dr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new tt(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ne("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Tn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){We("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];wn.setFromBufferAttribute(r),this.morphTargetsRelative?(Kt.addVectors(this.boundingBox.min,wn.min),this.boundingBox.expandByPoint(Kt),Kt.addVectors(this.boundingBox.max,wn.max),this.boundingBox.expandByPoint(Kt)):(this.boundingBox.expandByPoint(wn.min),this.boundingBox.expandByPoint(wn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&We('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new gn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){We("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){let n=this.boundingSphere.center;if(wn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];va.setFromBufferAttribute(o),this.morphTargetsRelative?(Kt.addVectors(wn.min,va.min),wn.expandByPoint(Kt),Kt.addVectors(wn.max,va.max),wn.expandByPoint(Kt)):(wn.expandByPoint(va.min),wn.expandByPoint(va.max))}wn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Kt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Kt));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)Kt.fromBufferAttribute(o,l),c&&(dr.fromBufferAttribute(e,l),Kt.add(dr)),s=Math.max(s,n.distanceToSquared(Kt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&We('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){We("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Wt(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],c=[];for(let v=0;v<n.count;v++)o[v]=new L,c[v]=new L;let l=new L,u=new L,d=new L,f=new re,h=new re,p=new re,x=new L,m=new L;function g(v,S,C){l.fromBufferAttribute(n,v),u.fromBufferAttribute(n,S),d.fromBufferAttribute(n,C),f.fromBufferAttribute(r,v),h.fromBufferAttribute(r,S),p.fromBufferAttribute(r,C),u.sub(l),d.sub(l),h.sub(f),p.sub(f);let D=1/(h.x*p.y-p.x*h.y);isFinite(D)&&(x.copy(u).multiplyScalar(p.y).addScaledVector(d,-h.y).multiplyScalar(D),m.copy(d).multiplyScalar(h.x).addScaledVector(u,-p.x).multiplyScalar(D),o[v].add(x),o[S].add(x),o[C].add(x),c[v].add(m),c[S].add(m),c[C].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let v=0,S=b.length;v<S;++v){let C=b[v],D=C.start,F=C.count;for(let N=D,I=D+F;N<I;N+=3)g(e.getX(N+0),e.getX(N+1),e.getX(N+2))}let T=new L,_=new L,M=new L,A=new L;function R(v){M.fromBufferAttribute(s,v),A.copy(M);let S=o[v];T.copy(S),T.sub(M.multiplyScalar(M.dot(S))).normalize(),_.crossVectors(A,S);let D=_.dot(c[v])<0?-1:1;a.setXYZW(v,T.x,T.y,T.z,D)}for(let v=0,S=b.length;v<S;++v){let C=b[v],D=C.start,F=C.count;for(let N=D,I=D+F;N<I;N+=3)R(e.getX(N+0)),R(e.getX(N+1)),R(e.getX(N+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Wt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,h=n.count;f<h;f++)n.setXYZ(f,0,0,0);let s=new L,r=new L,a=new L,o=new L,c=new L,l=new L,u=new L,d=new L;if(e)for(let f=0,h=e.count;f<h;f+=3){let p=e.getX(f+0),x=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,p),r.fromBufferAttribute(t,x),a.fromBufferAttribute(t,m),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),o.fromBufferAttribute(n,p),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,m),o.add(u),c.add(u),l.add(u),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,h=t.count;f<h;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Kt.fromBufferAttribute(e,t),Kt.normalize(),e.setXYZ(t,Kt.x,Kt.y,Kt.z)}toNonIndexed(){function e(o,c){let l=o.array,u=o.itemSize,d=o.normalized,f=new l.constructor(c.length*u),h=0,p=0;for(let x=0,m=c.length;x<m;x++){o.isInterleavedBufferAttribute?h=c[x]*o.data.stride+o.offset:h=c[x]*u;for(let g=0;g<u;g++)f[p++]=l[h++]}return new Wt(f,u,d)}if(this.index===null)return Ne("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let c=s[o],l=e(c,n);t.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let u=0,d=l.length;u<d;u++){let f=l[u],h=e(f,n);c.push(h)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let d=0,f=l.length;d<f;d++){let h=l[d];u.push(h.toJSON(e.data))}u.length>0&&(s[c]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let l in s){let u=s[l];this.setAttribute(l,u.clone(t))}let r=e.morphAttributes;for(let l in r){let u=[],d=r[l];for(let f=0,h=d.length;f<h;f++)u.push(d[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,u=a.length;l<u;l++){let d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ar=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=df,this.updateRanges=[],this.version=0,this.uuid=On()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=On()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=On()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},cn=new L,Er=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)cn.fromBufferAttribute(this,t),cn.applyMatrix4(e),this.setXYZ(t,cn.x,cn.y,cn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)cn.fromBufferAttribute(this,t),cn.applyNormalMatrix(e),this.setXYZ(t,cn.x,cn.y,cn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)cn.fromBufferAttribute(this,t),cn.transformDirection(e),this.setXYZ(t,cn.x,cn.y,cn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Zn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=bt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Zn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Zn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Zn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Zn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),s=bt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),s=bt(s,this.array),r=bt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Pa("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Wt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Pa("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},md=new L,G0=new L,V0=new Ke,un=class{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=md.subVectors(n,t).cross(G0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(md),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||V0.getNormalMatrix(e),s=this.coplanarPoint(md).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},H0=0,xn=class extends Qn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:H0++}),this.uuid=On(),this.name="",this.type="Material",this.blending=Br,this.side=_i,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=$d,this.blendDst=Yd,this.blendEquation=Gs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Se(0,0,0),this.blendAlpha=0,this.depthFunc=xr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Sm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=cl,this.stencilZFail=cl,this.stencilZPass=cl,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Ne(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ne(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Se().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new un().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new re().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new re().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var Pi=new L,gd=new L,Vo=new L,Ho=new L,fi=class{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Pi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Pi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Pi.copy(this.origin).addScaledVector(this.direction,t),Pi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){gd.copy(e).add(t).multiplyScalar(.5),Vo.copy(t).sub(e).normalize(),Ho.copy(this.origin).sub(gd);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Vo),o=Ho.dot(this.direction),c=-Ho.dot(Vo),l=Ho.lengthSq(),u=Math.abs(1-a*a),d,f,h,p;if(u>0)if(d=a*c-o,f=a*o-c,p=r*u,d>=0)if(f>=-p)if(f<=p){let x=1/u;d*=x,f*=x,h=d*(d+a*f+2*o)+f*(a*d+f+2*c)+l}else f=r,d=Math.max(0,-(a*f+o)),h=-d*d+f*(f+2*c)+l;else f=-r,d=Math.max(0,-(a*f+o)),h=-d*d+f*(f+2*c)+l;else f<=-p?(d=Math.max(0,-(-a*r+o)),f=d>0?-r:Math.min(Math.max(-r,-c),r),h=-d*d+f*(f+2*c)+l):f<=p?(d=0,f=Math.min(Math.max(-r,-c),r),h=f*(f+2*c)+l):(d=Math.max(0,-(a*r+o)),f=d>0?r:Math.min(Math.max(-r,-c),r),h=-d*d+f*(f+2*c)+l);else f=a>0?-r:r,d=Math.max(0,-(a*f+o)),h=-d*d+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(gd).addScaledVector(Vo,f),h}intersectSphere(e,t){if(e.radius<0)return null;Pi.subVectors(e.center,this.origin);let n=Pi.dot(this.direction),s=Pi.dot(Pi)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c,l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,s=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,s=(e.min.x-f.x)*l),u>=0?(r=(e.min.y-f.y)*u,a=(e.max.y-f.y)*u):(r=(e.max.y-f.y)*u,a=(e.min.y-f.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-f.z)*d,c=(e.max.z-f.z)*d):(o=(e.max.z-f.z)*d,c=(e.min.z-f.z)*d),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Pi)!==null}intersectTriangle(e,t,n,s,r){let a=this.origin,o=this.direction,c=o.x,l=o.y,u=o.z,d=e.x-a.x,f=e.y-a.y,h=e.z-a.z,p=t.x-a.x,x=t.y-a.y,m=t.z-a.z,g=n.x-a.x,b=n.y-a.y,T=n.z-a.z,_=Math.abs(c),M=Math.abs(l),A=Math.abs(u),R,v,S,C,D,F,N,I,U,z,V,Z;if(_>=M&&_>=A?(S=c,F=d,U=p,Z=g,c>=0?(R=l,v=u,C=f,D=h,N=x,I=m,z=b,V=T):(R=u,v=l,C=h,D=f,N=m,I=x,z=T,V=b)):M>=A?(S=l,F=f,U=x,Z=b,l>=0?(R=u,v=c,C=h,D=d,N=m,I=p,z=T,V=g):(R=c,v=u,C=d,D=h,N=p,I=m,z=g,V=T)):(S=u,F=h,U=m,Z=T,u>=0?(R=c,v=l,C=d,D=f,N=p,I=x,z=g,V=b):(R=l,v=c,C=f,D=d,N=x,I=p,z=b,V=g)),S===0)return null;let q=R/S,J=v/S,ie=1/S,Fe=C-q*F,Ee=D-J*F,ht=N-q*U,at=I-J*U,ut=z-q*Z,j=V-J*Z,te=ut*at-j*ht,ve=Fe*j-Ee*ut,Xe=ht*Ee-at*Fe;if(s){if(te<0||ve<0||Xe<0)return null}else if((te<0||ve<0||Xe<0)&&(te>0||ve>0||Xe>0))return null;let we=te+ve+Xe;if(we===0)return null;let qe=ie*(te*F+ve*U+Xe*Z);return(we>0?qe<0:qe>0)?null:this.at(qe/we,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},sn=class extends xn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Se(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Di,this.combine=Kd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},xp=new Ye,Es=new fi,Wo=new gn,_p=new L,Xo=new L,qo=new L,$o=new L,xd=new L,Yo=new L,vp=new L,Ko=new L,Ue=class extends vt{constructor(e=new ft,t=new sn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){Yo.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let u=o[c],d=r[c];u!==0&&(xd.fromBufferAttribute(d,e),a?Yo.addScaledVector(xd,u):Yo.addScaledVector(xd.sub(t),u))}t.add(Yo)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Wo.copy(n.boundingSphere),Wo.applyMatrix4(r),Es.copy(e.ray).recast(e.near),!(Wo.containsPoint(Es.origin)===!1&&(Es.intersectSphere(Wo,_p)===null||Es.origin.distanceToSquared(_p)>(e.far-e.near)**2))&&(xp.copy(r).invert(),Es.copy(e.ray).applyMatrix4(xp),!(n.boundingBox!==null&&Es.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Es)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,f=r.groups,h=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,x=f.length;p<x;p++){let m=f[p],g=a[m.materialIndex],b=Math.max(m.start,h.start),T=Math.min(o.count,Math.min(m.start+m.count,h.start+h.count));for(let _=b,M=T;_<M;_+=3){let A=o.getX(_),R=o.getX(_+1),v=o.getX(_+2);s=jo(this,g,e,n,l,u,d,A,R,v),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let p=Math.max(0,h.start),x=Math.min(o.count,h.start+h.count);for(let m=p,g=x;m<g;m+=3){let b=o.getX(m),T=o.getX(m+1),_=o.getX(m+2);s=jo(this,a,e,n,l,u,d,b,T,_),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let p=0,x=f.length;p<x;p++){let m=f[p],g=a[m.materialIndex],b=Math.max(m.start,h.start),T=Math.min(c.count,Math.min(m.start+m.count,h.start+h.count));for(let _=b,M=T;_<M;_+=3){let A=_,R=_+1,v=_+2;s=jo(this,g,e,n,l,u,d,A,R,v),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let p=Math.max(0,h.start),x=Math.min(c.count,h.start+h.count);for(let m=p,g=x;m<g;m+=3){let b=m,T=m+1,_=m+2;s=jo(this,a,e,n,l,u,d,b,T,_),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function W0(i,e,t,n,s,r,a,o){let c;if(e.side===hn?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===_i,o),c===null)return null;Ko.copy(o),Ko.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(Ko);return l<t.near||l>t.far?null:{distance:l,point:Ko.clone(),object:i}}function jo(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,Xo),i.getVertexPosition(c,qo),i.getVertexPosition(l,$o);let u=W0(i,e,t,n,Xo,qo,$o,vp);if(u){let d=new L;ns.getBarycoord(vp,Xo,qo,$o,d),s&&(u.uv=ns.getInterpolatedAttribute(s,o,c,l,d,new re)),r&&(u.uv1=ns.getInterpolatedAttribute(r,o,c,l,d,new re)),a&&(u.normal=ns.getInterpolatedAttribute(a,o,c,l,d,new L),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let f={a:o,b:c,c:l,normal:new L,materialIndex:0};ns.getNormal(Xo,qo,$o,f.normal),u.face=f,u.barycoord=d}return u}var ya=new St,yp=new St,bp=new St,X0=new St,Sp=new Ye,Zo=new L,_d=new gn,Mp=new Ye,vd=new fi,Ua=class extends Ue{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Ad,this.bindMatrix=new Ye,this.bindMatrixInverse=new Ye,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Tn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Zo),this.boundingBox.expandByPoint(Zo)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new gn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Zo),this.boundingSphere.expandByPoint(Zo)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),_d.copy(this.boundingSphere),_d.applyMatrix4(s),e.ray.intersectsSphere(_d)!==!1&&(Mp.copy(s).invert(),vd.copy(e.ray).applyMatrix4(Mp),!(this.boundingBox!==null&&vd.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,vd)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new St,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Ad?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===_m?this.bindMatrixInverse.copy(this.bindMatrix).invert():Ne("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,s=this.geometry;yp.fromBufferAttribute(s.attributes.skinIndex,e),bp.fromBufferAttribute(s.attributes.skinWeight,e),t.isVector4?(ya.copy(t),t.set(0,0,0,0)):(ya.set(...t,1),t.set(0,0,0)),ya.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let a=bp.getComponent(r);if(a!==0){let o=yp.getComponent(r);Sp.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(X0.copy(ya).applyMatrix4(Sp),a)}}return t.isVector4&&(t.w=ya.w),t.applyMatrix4(this.bindMatrixInverse)}},Cr=class extends vt{constructor(){super(),this.isBone=!0,this.type="Bone"}},Rr=class extends Zt{constructor(e=null,t=1,n=1,s,r,a,o,c,l=Bt,u=Bt,d,f){super(null,a,o,c,l,u,s,r,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},wp=new Ye,q0=new Ye,Fa=class i{constructor(e=[],t=[]){this.uuid=On(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Ne("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Ye)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Ye;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:q0;wp.multiplyMatrices(o,t[r]),wp.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Rr(t,e,e,Pn,Rn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){let r=e.bones[n],a=t[r];a===void 0&&(Ne("Skeleton: No bone found with UUID:",r),a=new Cr),this.bones.push(a),this.boneInverses.push(new Ye().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let a=t[s];e.bones.push(a.uuid);let o=n[s];e.boneInverses.push(o.toArray())}return e}},Ni=class extends Wt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},fr=new Ye,Tp=new Ye,Jo=[],Ap=new Tn,$0=new Ye,ba=new Ue,Sa=new gn,An=class extends Ue{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ni(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,$0)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Tn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,fr),Ap.copy(e.boundingBox).applyMatrix4(fr),this.boundingBox.union(Ap)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new gn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,fr),Sa.copy(e.boundingSphere).applyMatrix4(fr),this.boundingSphere.union(Sa)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(ba.geometry=this.geometry,ba.material=this.material,ba.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Sa.copy(this.boundingSphere),Sa.applyMatrix4(n),e.ray.intersectsSphere(Sa)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,fr),Tp.multiplyMatrices(n,fr),ba.matrixWorld=Tp,ba.raycast(e,Jo);for(let a=0,o=Jo.length;a<o;a++){let c=Jo[a];c.instanceId=r,c.object=this,t.push(c)}Jo.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Ni(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Rr(new Float32Array(s*this.count),s,this.count,Kl,Rn));let r=this.morphTexture.source.data.data,a=0;for(let l=0;l<n.length;l++)a+=n[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=s*e;return r[c]=o,r.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Cs=new gn,Y0=new re(.5,.5),Qo=new L,Pr=class{constructor(e=new un,t=new un,n=new un,s=new un,r=new un,a=new un){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Jn,n=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],u=r[4],d=r[5],f=r[6],h=r[7],p=r[8],x=r[9],m=r[10],g=r[11],b=r[12],T=r[13],_=r[14],M=r[15];if(s[0].setComponents(l-a,h-u,g-p,M-b).normalize(),s[1].setComponents(l+a,h+u,g+p,M+b).normalize(),s[2].setComponents(l+o,h+d,g+x,M+T).normalize(),s[3].setComponents(l-o,h-d,g-x,M-T).normalize(),n)s[4].setComponents(c,f,m,_).normalize(),s[5].setComponents(l-c,h-f,g-m,M-_).normalize();else if(s[4].setComponents(l-c,h-f,g-m,M-_).normalize(),t===Jn)s[5].setComponents(l+c,h+f,g+m,M+_).normalize();else if(t===vr)s[5].setComponents(c,f,m,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Cs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Cs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Cs)}intersectsSprite(e){Cs.center.set(0,0,0);let t=Y0.distanceTo(e.center);return Cs.radius=.7071067811865476+t,Cs.applyMatrix4(e.matrixWorld),this.intersectsSphere(Cs)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Qo.x=s.normal.x>0?e.max.x:e.min.x,Qo.y=s.normal.y>0?e.max.y:e.min.y,Qo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Qo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var hi=class extends xn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Se(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},bl=new L,Sl=new L,Ep=new Ye,Ma=new fi,el=new gn,yd=new L,Cp=new L,kn=class extends vt{constructor(e=new ft,t=new hi){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)bl.fromBufferAttribute(t,s-1),Sl.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=bl.distanceTo(Sl);e.setAttribute("lineDistance",new tt(n,1))}else Ne("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),el.copy(n.boundingSphere),el.applyMatrix4(s),el.radius+=r,e.ray.intersectsSphere(el)===!1)return;Ep.copy(s).invert(),Ma.copy(e.ray).applyMatrix4(Ep);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){let h=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let x=h,m=p-1;x<m;x+=l){let g=u.getX(x),b=u.getX(x+1),T=tl(this,e,Ma,c,g,b,x);T&&t.push(T)}if(this.isLineLoop){let x=u.getX(p-1),m=u.getX(h),g=tl(this,e,Ma,c,x,m,p-1);g&&t.push(g)}}else{let h=Math.max(0,a.start),p=Math.min(f.count,a.start+a.count);for(let x=h,m=p-1;x<m;x+=l){let g=tl(this,e,Ma,c,x,x+1,x);g&&t.push(g)}if(this.isLineLoop){let x=tl(this,e,Ma,c,p-1,h,p-1);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function tl(i,e,t,n,s,r,a){let o=i.geometry.attributes.position;if(bl.fromBufferAttribute(o,s),Sl.fromBufferAttribute(o,r),t.distanceSqToSegment(bl,Sl,yd,Cp)>n)return;yd.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(yd);if(!(l<e.near||l>e.far))return{distance:l,point:Cp.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var Rp=new L,Pp=new L,Ns=class extends kn{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Rp.fromBufferAttribute(t,s),Pp.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Rp.distanceTo(Pp);e.setAttribute("lineDistance",new tt(n,1))}else Ne("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Us=class extends kn{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},ss=class extends xn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Se(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Ip=new Ye,Id=new fi,nl=new gn,il=new L,Fs=class extends vt{constructor(e=new ft,t=new ss){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),nl.copy(n.boundingSphere),nl.applyMatrix4(s),nl.radius+=r,e.ray.intersectsSphere(nl)===!1)return;Ip.copy(s).invert(),Id.copy(e.ray).applyMatrix4(Ip);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,d=n.attributes.position;if(l!==null){let f=Math.max(0,a.start),h=Math.min(l.count,a.start+a.count);for(let p=f,x=h;p<x;p++){let m=l.getX(p);il.fromBufferAttribute(d,m),Lp(il,m,c,s,e,t,this)}}else{let f=Math.max(0,a.start),h=Math.min(d.count,a.start+a.count);for(let p=f,x=h;p<x;p++)il.fromBufferAttribute(d,p),Lp(il,p,c,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Lp(i,e,t,n,s,r,a){let o=Id.distanceSqToPoint(i);if(o<t){let c=new L;Id.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Oa=class extends Zt{constructor(e=[],t=us,n,s,r,a,o,c,l,u){super(e,t,n,s,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var rs=class extends Zt{constructor(e,t,n=si,s,r,a,o=Bt,c=Bt,l,u=di,d=1){if(u!==di&&u!==ds)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:e,height:t,depth:d};super(f,s,r,a,o,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Sr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Ml=class extends rs{constructor(e,t=si,n=us,s,r,a=Bt,o=Bt,c,l=di){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,s,r,a,o,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},ka=class extends Zt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Bn=class i extends ft{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],u=[],d=[],f=0,h=0;p("z","y","x",-1,-1,n,t,e,a,r,0),p("z","y","x",1,-1,n,t,-e,a,r,1),p("x","z","y",1,1,e,n,t,s,a,2),p("x","z","y",1,-1,e,n,-t,s,a,3),p("x","y","z",1,-1,e,t,n,s,r,4),p("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new tt(l,3)),this.setAttribute("normal",new tt(u,3)),this.setAttribute("uv",new tt(d,2));function p(x,m,g,b,T,_,M,A,R,v,S){let C=_/R,D=M/v,F=_/2,N=M/2,I=A/2,U=R+1,z=v+1,V=0,Z=0,q=new L;for(let J=0;J<z;J++){let ie=J*D-N;for(let Fe=0;Fe<U;Fe++){let Ee=Fe*C-F;q[x]=Ee*b,q[m]=ie*T,q[g]=I,l.push(q.x,q.y,q.z),q[x]=0,q[m]=0,q[g]=A>0?1:-1,u.push(q.x,q.y,q.z),d.push(Fe/R),d.push(1-J/v),V+=1}}for(let J=0;J<v;J++)for(let ie=0;ie<R;ie++){let Fe=f+ie+U*J,Ee=f+ie+U*(J+1),ht=f+(ie+1)+U*(J+1),at=f+(ie+1)+U*J;c.push(Fe,Ee,at),c.push(Ee,ht,at),Z+=6}o.addGroup(h,Z,S),h+=Z,f+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Ba=class i extends ft{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);let r=[],a=[],o=[],c=[],l=new L,u=new re;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let d=0,f=3;d<=t;d++,f+=3){let h=n+d/t*s;l.x=e*Math.cos(h),l.y=e*Math.sin(h),a.push(l.x,l.y,l.z),o.push(0,0,1),u.x=(a[f]/e+1)/2,u.y=(a[f+1]/e+1)/2,c.push(u.x,u.y)}for(let d=1;d<=t;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new tt(a,3)),this.setAttribute("normal",new tt(o,3)),this.setAttribute("uv",new tt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Ui=class i extends ft{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let u=[],d=[],f=[],h=[],p=0,x=[],m=n/2,g=0;b(),a===!1&&(e>0&&T(!0),t>0&&T(!1)),this.setIndex(u),this.setAttribute("position",new tt(d,3)),this.setAttribute("normal",new tt(f,3)),this.setAttribute("uv",new tt(h,2));function b(){let _=new L,M=new L,A=0,R=(t-e)/n;for(let v=0;v<=r;v++){let S=[],C=v/r,D=C*(t-e)+e;for(let F=0;F<=s;F++){let N=F/s,I=N*c+o,U=Math.sin(I),z=Math.cos(I);M.x=D*U,M.y=-C*n+m,M.z=D*z,d.push(M.x,M.y,M.z),_.set(U,R,z).normalize(),f.push(_.x,_.y,_.z),h.push(N,1-C),S.push(p++)}x.push(S)}for(let v=0;v<s;v++)for(let S=0;S<r;S++){let C=x[S][v],D=x[S+1][v],F=x[S+1][v+1],N=x[S][v+1];(e>0||S!==0)&&(u.push(C,D,N),A+=3),(t>0||S!==r-1)&&(u.push(D,F,N),A+=3)}l.addGroup(g,A,0),g+=A}function T(_){let M=p,A=new re,R=new L,v=0,S=_===!0?e:t,C=_===!0?1:-1;for(let F=1;F<=s;F++)d.push(0,m*C,0),f.push(0,C,0),h.push(.5,.5),p++;let D=p;for(let F=0;F<=s;F++){let I=F/s*c+o,U=Math.cos(I),z=Math.sin(I);R.x=S*z,R.y=m*C,R.z=S*U,d.push(R.x,R.y,R.z),f.push(0,C,0),A.x=U*.5+.5,A.y=z*.5*C+.5,h.push(A.x,A.y),p++}for(let F=0;F<s;F++){let N=M+F,I=D+F;_===!0?u.push(I,I+1,N):u.push(I+1,I,N),v+=3}l.addGroup(g,v,_===!0?1:2),g+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Ir=class i extends Ui{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},za=class i extends ft{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};let r=[],a=[];o(s),l(n),u(),this.setAttribute("position",new tt(r,3)),this.setAttribute("normal",new tt(r.slice(),3)),this.setAttribute("uv",new tt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(b){let T=new L,_=new L,M=new L;for(let A=0;A<t.length;A+=3)h(t[A+0],T),h(t[A+1],_),h(t[A+2],M),c(T,_,M,b)}function c(b,T,_,M){let A=M+1,R=[];for(let v=0;v<=A;v++){R[v]=[];let S=b.clone().lerp(_,v/A),C=T.clone().lerp(_,v/A),D=A-v;for(let F=0;F<=D;F++)F===0&&v===A?R[v][F]=S:R[v][F]=S.clone().lerp(C,F/D)}for(let v=0;v<A;v++)for(let S=0;S<2*(A-v)-1;S++){let C=Math.floor(S/2);S%2===0?(f(R[v][C+1]),f(R[v+1][C]),f(R[v][C])):(f(R[v][C+1]),f(R[v+1][C+1]),f(R[v+1][C]))}}function l(b){let T=new L;for(let _=0;_<r.length;_+=3)T.x=r[_+0],T.y=r[_+1],T.z=r[_+2],T.normalize().multiplyScalar(b),r[_+0]=T.x,r[_+1]=T.y,r[_+2]=T.z}function u(){let b=new L;for(let T=0;T<r.length;T+=3){b.x=r[T+0],b.y=r[T+1],b.z=r[T+2];let _=m(b)/2/Math.PI+.5,M=g(b)/Math.PI+.5;a.push(_,1-M)}p(),d()}function d(){for(let b=0;b<a.length;b+=6){let T=a[b+0],_=a[b+2],M=a[b+4],A=Math.max(T,_,M),R=Math.min(T,_,M);A>.9&&R<.1&&(T<.2&&(a[b+0]+=1),_<.2&&(a[b+2]+=1),M<.2&&(a[b+4]+=1))}}function f(b){r.push(b.x,b.y,b.z)}function h(b,T){let _=b*3;T.x=e[_+0],T.y=e[_+1],T.z=e[_+2]}function p(){let b=new L,T=new L,_=new L,M=new L,A=new re,R=new re,v=new re;for(let S=0,C=0;S<r.length;S+=9,C+=6){b.set(r[S+0],r[S+1],r[S+2]),T.set(r[S+3],r[S+4],r[S+5]),_.set(r[S+6],r[S+7],r[S+8]),A.set(a[C+0],a[C+1]),R.set(a[C+2],a[C+3]),v.set(a[C+4],a[C+5]),M.copy(b).add(T).add(_).divideScalar(3);let D=m(M);x(A,C+0,b,D),x(R,C+2,T,D),x(v,C+4,_,D)}}function x(b,T,_,M){M<0&&b.x===1&&(a[T]=b.x-1),_.x===0&&_.z===0&&(a[T]=M/2/Math.PI+.5)}function m(b){return Math.atan2(b.z,-b.x)}function g(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.detail)}},Ga=class i extends za{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var En=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ne("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,a;t?a=t:a=e*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=n[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===a)return s/(r-1);let u=n[s],f=n[s+1]-u,h=(a-u)/f;return(s+h)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),c=t||(a.isVector2?new re:new L);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new L,s=[],r=[],a=[],o=new L,c=new Ye;for(let h=0;h<=e;h++){let p=h/e;s[h]=this.getTangentAt(p,new L)}r[0]=new L,a[0]=new L;let l=Number.MAX_VALUE,u=Math.abs(s[0].x),d=Math.abs(s[0].y),f=Math.abs(s[0].z);u<=l&&(l=u,n.set(1,0,0)),d<=l&&(l=d,n.set(0,1,0)),f<=l&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let h=1;h<=e;h++){if(r[h]=r[h-1].clone(),a[h]=a[h-1].clone(),o.crossVectors(s[h-1],s[h]),o.length()>Number.EPSILON){o.normalize();let p=Math.acos(Qe(s[h-1].dot(s[h]),-1,1));r[h].applyMatrix4(c.makeRotationAxis(o,p))}a[h].crossVectors(s[h],r[h])}if(t===!0){let h=Math.acos(Qe(r[0].dot(r[e]),-1,1));h/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(h=-h);for(let p=1;p<=e;p++)r[p].applyMatrix4(c.makeRotationAxis(s[p],h*p)),a[p].crossVectors(s[p],r[p])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Lr=class extends En{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new re){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+e*r,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),f=c-this.aX,h=l-this.aY;c=f*u-h*d+this.aX,l=f*d+h*u+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},wl=class extends Lr{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function pf(){let i=0,e=0,t=0,n=0;function s(r,a,o,c){i=r,e=o,t=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){s(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,u,d){let f=(a-r)/l-(o-r)/(l+u)+(o-a)/u,h=(o-a)/u-(c-a)/(u+d)+(c-o)/d;f*=u,h*=u,s(a,o,f,h)},calc:function(r){let a=r*r,o=a*r;return i+e*r+t*a+n*o}}}var Dp=new L,Np=new L,bd=new pf,Sd=new pf,Md=new pf,Tl=class extends En{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new L){let n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e,o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,u;this.closed||o>0?l=s[(o-1)%r]:(Np.subVectors(s[0],s[1]).add(s[0]),l=Np);let d=s[o%r],f=s[(o+1)%r];if(this.closed||o+2<r?u=s[(o+2)%r]:(Dp.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=Dp),this.curveType==="centripetal"||this.curveType==="chordal"){let h=this.curveType==="chordal"?.5:.25,p=Math.pow(l.distanceToSquared(d),h),x=Math.pow(d.distanceToSquared(f),h),m=Math.pow(f.distanceToSquared(u),h);x<1e-4&&(x=1),p<1e-4&&(p=x),m<1e-4&&(m=x),bd.initNonuniformCatmullRom(l.x,d.x,f.x,u.x,p,x,m),Sd.initNonuniformCatmullRom(l.y,d.y,f.y,u.y,p,x,m),Md.initNonuniformCatmullRom(l.z,d.z,f.z,u.z,p,x,m)}else this.curveType==="catmullrom"&&(bd.initCatmullRom(l.x,d.x,f.x,u.x,this.tension),Sd.initCatmullRom(l.y,d.y,f.y,u.y,this.tension),Md.initCatmullRom(l.z,d.z,f.z,u.z,this.tension));return n.set(bd.calc(c),Sd.calc(c),Md.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new L().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Up(i,e,t,n,s){let r=(n-e)*.5,a=(s-t)*.5,o=i*i,c=i*o;return(2*t-2*n+r+a)*c+(-3*t+3*n-2*r-a)*o+r*i+t}function K0(i,e){let t=1-i;return t*t*e}function j0(i,e){return 2*(1-i)*i*e}function Z0(i,e){return i*i*e}function Ea(i,e,t,n){return K0(i,e)+j0(i,t)+Z0(i,n)}function J0(i,e){let t=1-i;return t*t*t*e}function Q0(i,e){let t=1-i;return 3*t*t*i*e}function ex(i,e){return 3*(1-i)*i*i*e}function tx(i,e){return i*i*i*e}function Ca(i,e,t,n,s){return J0(i,e)+Q0(i,t)+ex(i,n)+tx(i,s)}var Va=class extends En{constructor(e=new re,t=new re,n=new re,s=new re){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new re){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ca(e,s.x,r.x,a.x,o.x),Ca(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Al=class extends En{constructor(e=new L,t=new L,n=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new L){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ca(e,s.x,r.x,a.x,o.x),Ca(e,s.y,r.y,a.y,o.y),Ca(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ha=class extends En{constructor(e=new re,t=new re){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new re){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new re){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},El=class extends En{constructor(e=new L,t=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new L){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new L){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Wa=class extends En{constructor(e=new re,t=new re,n=new re){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new re){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Ea(e,s.x,r.x,a.x),Ea(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Cl=class extends En{constructor(e=new L,t=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new L){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Ea(e,s.x,r.x,a.x),Ea(e,s.y,r.y,a.y),Ea(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Xa=class extends En{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new re){let n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,c=s[a===0?a:a-1],l=s[a],u=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return n.set(Up(o,c.x,l.x,u.x,d.x),Up(o,c.y,l.y,u.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new re().fromArray(s))}return this}},Ld=Object.freeze({__proto__:null,ArcCurve:wl,CatmullRomCurve3:Tl,CubicBezierCurve:Va,CubicBezierCurve3:Al,EllipseCurve:Lr,LineCurve:Ha,LineCurve3:El,QuadraticBezierCurve:Wa,QuadraticBezierCurve3:Cl,SplineCurve:Xa}),Rl=class extends En{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ld[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){let u=c[l];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new Ld[s.type]().fromJSON(s))}return this}},qa=class extends Rl{constructor(e){super(),this.type="Path",this.currentPoint=new re,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Ha(this.currentPoint.clone(),new re(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new Wa(this.currentPoint.clone(),new re(e,t),new re(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){let o=new Va(this.currentPoint.clone(),new re(e,t),new re(n,s),new re(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Xa(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,o,c){let l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+l,t+u,n,s,r,a,o,c),this}absellipse(e,t,n,s,r,a,o,c){let l=new Lr(e,t,n,s,r,a,o,c);if(this.curves.length>0){let d=l.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(l);let u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},pi=class extends qa{constructor(e){super(e),this.uuid=On(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(new qa().fromJSON(s))}return this}};function nx(i,e,t=2){let n=e&&e.length,s=n?e[0]*t:i.length,r=Nm(i,0,s,t,!0),a=[];if(!r||r.next===r.prev)return a;let o,c,l;if(n&&(r=ox(i,e,r,t)),i.length>80*t){o=i[0],c=i[1];let u=o,d=c;for(let f=t;f<s;f+=t){let h=i[f],p=i[f+1];h<o&&(o=h),p<c&&(c=p),h>u&&(u=h),p>d&&(d=p)}l=Math.max(u-o,d-c),l=l!==0?32767/l:0}return $a(r,a,t,o,c,l,0),a}function Nm(i,e,t,n,s){let r;if(s===_x(i,e,t,n)>0)for(let a=e;a<t;a+=n)r=Fp(a/n|0,i[a],i[a+1],r);else for(let a=t-n;a>=e;a-=n)r=Fp(a/n|0,i[a],i[a+1],r);return r&&Dr(r,r.next)&&(Ka(r),r=r.next),r}function Os(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Dr(t,t.next)||Nt(t.prev,t,t.next)===0)){if(Ka(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function $a(i,e,t,n,s,r,a){if(!i)return;!a&&r&&fx(i,n,s,r);let o=i;for(;i.prev!==i.next;){let c=i.prev,l=i.next;if(r?sx(i,n,s,r):ix(i)){e.push(c.i,i.i,l.i),Ka(i),i=l.next,o=l.next;continue}if(i=l,i===o){a?a===1?(i=rx(Os(i),e),$a(i,e,t,n,s,r,2)):a===2&&ax(i,e,t,n,s,r):$a(Os(i),e,t,n,s,r,1);break}}}function ix(i){let e=i.prev,t=i,n=i.next;if(Nt(e,t,n)>=0)return!1;let s=e.x,r=t.x,a=n.x,o=e.y,c=t.y,l=n.y,u=Math.min(s,r,a),d=Math.min(o,c,l),f=Math.max(s,r,a),h=Math.max(o,c,l),p=n.next;for(;p!==e;){if(p.x>=u&&p.x<=f&&p.y>=d&&p.y<=h&&wa(s,o,r,c,a,l,p.x,p.y)&&Nt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function sx(i,e,t,n){let s=i.prev,r=i,a=i.next;if(Nt(s,r,a)>=0)return!1;let o=s.x,c=r.x,l=a.x,u=s.y,d=r.y,f=a.y,h=Math.min(o,c,l),p=Math.min(u,d,f),x=Math.max(o,c,l),m=Math.max(u,d,f),g=Dd(h,p,e,t,n),b=Dd(x,m,e,t,n),T=i.prevZ,_=i.nextZ;for(;T&&T.z>=g&&_&&_.z<=b;){if(T.x>=h&&T.x<=x&&T.y>=p&&T.y<=m&&T!==s&&T!==a&&wa(o,u,c,d,l,f,T.x,T.y)&&Nt(T.prev,T,T.next)>=0||(T=T.prevZ,_.x>=h&&_.x<=x&&_.y>=p&&_.y<=m&&_!==s&&_!==a&&wa(o,u,c,d,l,f,_.x,_.y)&&Nt(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;T&&T.z>=g;){if(T.x>=h&&T.x<=x&&T.y>=p&&T.y<=m&&T!==s&&T!==a&&wa(o,u,c,d,l,f,T.x,T.y)&&Nt(T.prev,T,T.next)>=0)return!1;T=T.prevZ}for(;_&&_.z<=b;){if(_.x>=h&&_.x<=x&&_.y>=p&&_.y<=m&&_!==s&&_!==a&&wa(o,u,c,d,l,f,_.x,_.y)&&Nt(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function rx(i,e){let t=i;do{let n=t.prev,s=t.next.next;!Dr(n,s)&&Fm(n,t,t.next,s)&&Ya(n,s)&&Ya(s,n)&&(e.push(n.i,t.i,s.i),Ka(t),Ka(t.next),t=i=s),t=t.next}while(t!==i);return Os(t)}function ax(i,e,t,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&mx(a,o)){let c=Om(a,o);a=Os(a,a.next),c=Os(c,c.next),$a(a,e,t,n,s,r,0),$a(c,e,t,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function ox(i,e,t,n){let s=[];for(let r=0,a=e.length;r<a;r++){let o=e[r]*n,c=r<a-1?e[r+1]*n:i.length,l=Nm(i,o,c,n,!1);l===l.next&&(l.steiner=!0),s.push(px(l))}s.sort(lx);for(let r=0;r<s.length;r++)t=cx(s[r],t);return t}function lx(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function cx(i,e){let t=ux(i,e);if(!t)return e;let n=Om(t,i);return Os(n,n.next),Os(t,t.next)}function ux(i,e){let t=e,n=i.x,s=i.y,r=-1/0,a;if(Dr(i,t))return t;do{if(Dr(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let d=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=n&&d>r&&(r=d,a=t.x<t.next.x?t:t.next,d===n))return a}t=t.next}while(t!==e);if(!a)return null;let o=a,c=a.x,l=a.y,u=1/0;t=a;do{if(n>=t.x&&t.x>=c&&n!==t.x&&Um(s<l?n:r,s,c,l,s<l?r:n,s,t.x,t.y)){let d=Math.abs(s-t.y)/(n-t.x);Ya(t,i)&&(d<u||d===u&&(t.x>a.x||t.x===a.x&&dx(a,t)))&&(a=t,u=d)}t=t.next}while(t!==o);return a}function dx(i,e){return Nt(i.prev,i,e.prev)<0&&Nt(e.next,i,i.next)<0}function fx(i,e,t,n){let s=i;do s.z===0&&(s.z=Dd(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,hx(s)}function hx(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let a=n,o=0;for(let l=0;l<t&&(o++,a=a.nextZ,!!a);l++);let c=t;for(;o>0||c>0&&a;)o!==0&&(c===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,t*=2}while(e>1);return i}function Dd(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function px(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Um(i,e,t,n,s,r,a,o){return(s-a)*(e-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(n-o)}function wa(i,e,t,n,s,r,a,o){return!(i===a&&e===o)&&Um(i,e,t,n,s,r,a,o)}function mx(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!gx(i,e)&&(Ya(i,e)&&Ya(e,i)&&xx(i,e)&&(Nt(i.prev,i,e.prev)||Nt(i,e.prev,e))||Dr(i,e)&&Nt(i.prev,i,i.next)>0&&Nt(e.prev,e,e.next)>0)}function Nt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Dr(i,e){return i.x===e.x&&i.y===e.y}function Fm(i,e,t,n){let s=rl(Nt(i,e,t)),r=rl(Nt(i,e,n)),a=rl(Nt(t,n,i)),o=rl(Nt(t,n,e));return!!(s!==r&&a!==o||s===0&&sl(i,t,e)||r===0&&sl(i,n,e)||a===0&&sl(t,i,n)||o===0&&sl(t,e,n))}function sl(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function rl(i){return i>0?1:i<0?-1:0}function gx(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Fm(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Ya(i,e){return Nt(i.prev,i,i.next)<0?Nt(i,e,i.next)>=0&&Nt(i,i.prev,e)>=0:Nt(i,e,i.prev)<0||Nt(i,i.next,e)<0}function xx(i,e){let t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Om(i,e){let t=Nd(i.i,i.x,i.y),n=Nd(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Fp(i,e,t,n){let s=Nd(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Ka(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Nd(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function _x(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}var Ud=class{static triangulate(e,t,n=2){return nx(e,t,n)}},Rs=class i{static area(e){let t=e.length,n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],s=[],r=[];Op(e),kp(n,e);let a=e.length;t.forEach(Op);for(let c=0;c<t.length;c++)s.push(a),a+=t[c].length,kp(n,t[c]);let o=Ud.triangulate(n,s);for(let c=0;c<o.length;c+=3)r.push(o.slice(c,c+3));return r}};function Op(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function kp(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var Fi=class i extends ft{constructor(e=new pi([new re(.5,.5),new re(-.5,.5),new re(-.5,-.5),new re(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,s=[],r=[];for(let o=0,c=e.length;o<c;o++){let l=e[o];a(l)}this.setAttribute("position",new tt(s,3)),this.setAttribute("uv",new tt(r,2)),this.computeVertexNormals();function a(o){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,d=t.depth!==void 0?t.depth:1,f=t.bevelEnabled!==void 0?t.bevelEnabled:!0,h=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:h-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3,g=t.extrudePath,b=t.UVGenerator!==void 0?t.UVGenerator:vx,T,_=!1,M,A,R,v;if(g){T=g.getSpacedPoints(u),_=!0,f=!1;let ne=g.isCatmullRomCurve3?g.closed:!1;M=g.computeFrenetFrames(u,ne),A=new L,R=new L,v=new L}f||(m=0,h=0,p=0,x=0);let S=o.extractPoints(l),C=S.shape,D=S.holes;if(!Rs.isClockWise(C)){C=C.reverse();for(let ne=0,ae=D.length;ne<ae;ne++){let oe=D[ne];Rs.isClockWise(oe)&&(D[ne]=oe.reverse())}}function N(ne){let oe=10000000000000001e-36,le=ne[0];for(let de=1;de<=ne.length;de++){let Ve=de%ne.length,Ge=ne[Ve],$e=Ge.x-le.x,je=Ge.y-le.y,O=$e*$e+je*je,mt=Math.max(Math.abs(Ge.x),Math.abs(Ge.y),Math.abs(le.x),Math.abs(le.y)),ot=oe*mt*mt;if(O<=ot){ne.splice(Ve,1),de--;continue}le=Ge}}N(C),D.forEach(N);let I=D.length,U=C;for(let ne=0;ne<I;ne++){let ae=D[ne];C=C.concat(ae)}function z(ne,ae,oe){return ae||We("ExtrudeGeometry: vec does not exist"),ne.clone().addScaledVector(ae,oe)}let V=C.length;function Z(ne,ae,oe){let le,de,Ve,Ge=ne.x-ae.x,$e=ne.y-ae.y,je=oe.x-ne.x,O=oe.y-ne.y,mt=Ge*Ge+$e*$e,ot=Ge*O-$e*je;if(Math.abs(ot)>Number.EPSILON){let P=Math.sqrt(mt),y=Math.sqrt(je*je+O*O),G=ae.x-$e/P,X=ae.y+Ge/P,Y=oe.x-O/y,ce=oe.y+je/y,ue=((Y-G)*O-(ce-X)*je)/(Ge*O-$e*je);le=G+Ge*ue-ne.x,de=X+$e*ue-ne.y;let K=le*le+de*de;if(K<=2)return new re(le,de);Ve=Math.sqrt(K/2)}else{let P=!1;Ge>Number.EPSILON?je>Number.EPSILON&&(P=!0):Ge<-Number.EPSILON?je<-Number.EPSILON&&(P=!0):Math.sign($e)===Math.sign(O)&&(P=!0),P?(le=-$e,de=Ge,Ve=Math.sqrt(mt)):(le=Ge,de=$e,Ve=Math.sqrt(mt/2))}return new re(le/Ve,de/Ve)}let q=[];for(let ne=0,ae=U.length,oe=ae-1,le=ne+1;ne<ae;ne++,oe++,le++)oe===ae&&(oe=0),le===ae&&(le=0),q[ne]=Z(U[ne],U[oe],U[le]);let J=[],ie,Fe=q.concat();for(let ne=0,ae=I;ne<ae;ne++){let oe=D[ne];ie=[];for(let le=0,de=oe.length,Ve=de-1,Ge=le+1;le<de;le++,Ve++,Ge++)Ve===de&&(Ve=0),Ge===de&&(Ge=0),ie[le]=Z(oe[le],oe[Ve],oe[Ge]);J.push(ie),Fe=Fe.concat(ie)}let Ee;if(m===0)Ee=Rs.triangulateShape(U,D);else{let ne=[],ae=[];for(let oe=0;oe<m;oe++){let le=oe/m,de=h*Math.cos(le*Math.PI/2),Ve=p*Math.sin(le*Math.PI/2)+x;for(let Ge=0,$e=U.length;Ge<$e;Ge++){let je=z(U[Ge],q[Ge],Ve);ve(je.x,je.y,-de),le===0&&ne.push(je)}for(let Ge=0,$e=I;Ge<$e;Ge++){let je=D[Ge];ie=J[Ge];let O=[];for(let mt=0,ot=je.length;mt<ot;mt++){let P=z(je[mt],ie[mt],Ve);ve(P.x,P.y,-de),le===0&&O.push(P)}le===0&&ae.push(O)}}Ee=Rs.triangulateShape(ne,ae)}let ht=Ee.length,at=p+x;for(let ne=0;ne<V;ne++){let ae=f?z(C[ne],Fe[ne],at):C[ne];_?(R.copy(M.normals[0]).multiplyScalar(ae.x),A.copy(M.binormals[0]).multiplyScalar(ae.y),v.copy(T[0]).add(R).add(A),ve(v.x,v.y,v.z)):ve(ae.x,ae.y,0)}for(let ne=1;ne<=u;ne++)for(let ae=0;ae<V;ae++){let oe=f?z(C[ae],Fe[ae],at):C[ae];_?(R.copy(M.normals[ne]).multiplyScalar(oe.x),A.copy(M.binormals[ne]).multiplyScalar(oe.y),v.copy(T[ne]).add(R).add(A),ve(v.x,v.y,v.z)):ve(oe.x,oe.y,d/u*ne)}for(let ne=m-1;ne>=0;ne--){let ae=ne/m,oe=h*Math.cos(ae*Math.PI/2),le=p*Math.sin(ae*Math.PI/2)+x;for(let de=0,Ve=U.length;de<Ve;de++){let Ge=z(U[de],q[de],le);ve(Ge.x,Ge.y,d+oe)}for(let de=0,Ve=D.length;de<Ve;de++){let Ge=D[de];ie=J[de];for(let $e=0,je=Ge.length;$e<je;$e++){let O=z(Ge[$e],ie[$e],le);_?ve(O.x,O.y+T[u-1].y,T[u-1].x+oe):ve(O.x,O.y,d+oe)}}}ut(),j();function ut(){let ne=s.length/3;if(f){let ae=0,oe=V*ae;for(let le=0;le<ht;le++){let de=Ee[le];Xe(de[2]+oe,de[1]+oe,de[0]+oe)}ae=u+m*2,oe=V*ae;for(let le=0;le<ht;le++){let de=Ee[le];Xe(de[0]+oe,de[1]+oe,de[2]+oe)}}else{for(let ae=0;ae<ht;ae++){let oe=Ee[ae];Xe(oe[2],oe[1],oe[0])}for(let ae=0;ae<ht;ae++){let oe=Ee[ae];Xe(oe[0]+V*u,oe[1]+V*u,oe[2]+V*u)}}n.addGroup(ne,s.length/3-ne,0)}function j(){let ne=s.length/3,ae=0;te(U,ae),ae+=U.length;for(let oe=0,le=D.length;oe<le;oe++){let de=D[oe];te(de,ae),ae+=de.length}n.addGroup(ne,s.length/3-ne,1)}function te(ne,ae){let oe=ne.length;for(;--oe>=0;){let le=oe,de=oe-1;de<0&&(de=ne.length-1);for(let Ve=0,Ge=u+m*2;Ve<Ge;Ve++){let $e=V*Ve,je=V*(Ve+1),O=ae+le+$e,mt=ae+de+$e,ot=ae+de+je,P=ae+le+je;we(O,mt,ot,P)}}}function ve(ne,ae,oe){c.push(ne),c.push(ae),c.push(oe)}function Xe(ne,ae,oe){qe(ne),qe(ae),qe(oe);let le=s.length/3,de=b.generateTopUV(n,s,le-3,le-2,le-1);yt(de[0]),yt(de[1]),yt(de[2])}function we(ne,ae,oe,le){qe(ne),qe(ae),qe(le),qe(ae),qe(oe),qe(le);let de=s.length/3,Ve=b.generateSideWallUV(n,s,de-6,de-3,de-2,de-1);yt(Ve[0]),yt(Ve[1]),yt(Ve[3]),yt(Ve[1]),yt(Ve[2]),yt(Ve[3])}function qe(ne){s.push(c[ne*3+0]),s.push(c[ne*3+1]),s.push(c[ne*3+2])}function yt(ne){r.push(ne.x),r.push(ne.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return yx(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,a=e.shapes.length;r<a;r++){let o=t[e.shapes[r]];n.push(o)}let s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new Ld[s.type]().fromJSON(s)),new i(n,e.options)}},vx={generateTopUV:function(i,e,t,n,s){let r=e[t*3],a=e[t*3+1],o=e[n*3],c=e[n*3+1],l=e[s*3],u=e[s*3+1];return[new re(r,a),new re(o,c),new re(l,u)]},generateSideWallUV:function(i,e,t,n,s,r){let a=e[t*3],o=e[t*3+1],c=e[t*3+2],l=e[n*3],u=e[n*3+1],d=e[n*3+2],f=e[s*3],h=e[s*3+1],p=e[s*3+2],x=e[r*3],m=e[r*3+1],g=e[r*3+2];return Math.abs(o-u)<Math.abs(a-l)?[new re(a,1-c),new re(l,1-d),new re(f,1-p),new re(x,1-g)]:[new re(o,1-c),new re(u,1-d),new re(h,1-p),new re(m,1-g)]}};function yx(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var mi=class i extends za{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var ei=class i extends ft{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,u=c+1,d=e/o,f=t/c,h=[],p=[],x=[],m=[];for(let g=0;g<u;g++){let b=g*f-a;for(let T=0;T<l;T++){let _=T*d-r;p.push(_,-b,0),x.push(0,0,1),m.push(T/o),m.push(1-g/c)}}for(let g=0;g<c;g++)for(let b=0;b<o;b++){let T=b+l*g,_=b+l*(g+1),M=b+1+l*(g+1),A=b+1+l*g;h.push(T,_,A),h.push(_,M,A)}this.setIndex(h),this.setAttribute("position",new tt(p,3)),this.setAttribute("normal",new tt(x,3)),this.setAttribute("uv",new tt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var Nr=class i extends ft{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,u=[],d=new L,f=new L,h=[],p=[],x=[],m=[];for(let g=0;g<=n;g++){let b=[],T=g/n,_=a+T*o,M=e*Math.cos(_),A=Math.sqrt(e*e-M*M),R=0;g===0&&a===0?R=.5/t:g===n&&c===Math.PI&&(R=-.5/t);for(let v=0;v<=t;v++){let S=v/t,C=s+S*r;d.x=-A*Math.cos(C),d.y=M,d.z=A*Math.sin(C),p.push(d.x,d.y,d.z),f.copy(d).normalize(),x.push(f.x,f.y,f.z),m.push(S+R,1-T),b.push(l++)}u.push(b)}for(let g=0;g<n;g++)for(let b=0;b<t;b++){let T=u[g][b+1],_=u[g][b],M=u[g+1][b],A=u[g+1][b+1];(g!==0||a>0)&&h.push(T,_,A),(g!==n-1||c<Math.PI)&&h.push(_,M,A)}this.setIndex(h),this.setAttribute("position",new tt(p,3)),this.setAttribute("normal",new tt(x,3)),this.setAttribute("uv",new tt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};function Ws(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(Bp(s))s.isRenderTargetTexture?(Ne("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(Bp(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function an(i){let e={};for(let t=0;t<i.length;t++){let n=Ws(i[t]);for(let s in n)e[s]=n[s]}return e}function Bp(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function bx(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function mf(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:it.workingColorSpace}var km={clone:Ws,merge:an},Sx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Mx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Cn=class extends xn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Sx,this.fragmentShader=Mx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ws(e.uniforms),this.uniformsGroups=bx(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new Se().setHex(s.value);break;case"v2":this.uniforms[n].value=new re().fromArray(s.value);break;case"v3":this.uniforms[n].value=new L().fromArray(s.value);break;case"v4":this.uniforms[n].value=new St().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Ke().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Ye().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Pl=class extends Cn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},fn=class extends xn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Se(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Se(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Rc,this.normalScale=new re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Di,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},_n=class extends fn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new re(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Qe(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Se(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Se(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Se(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Il=class extends xn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ym,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ll=class extends xn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function ts(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function ul(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}function wx(i){function e(s,r){return i[s]-i[r]}let t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function zp(i,e,t){let n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){let o=t[r]*e;for(let c=0;c!==e;++c)s[a++]=i[o+c]}return s}function Tx(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=i[s++];while(r!==void 0)}var gi=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Dl=class extends gi{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Cd,endingEnd:Cd}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Rd:r=e,o=2*t-n;break;case Pd:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Rd:a=e,c=2*n-t;break;case Pd:a=1,c=n+s[1]-s[0];break;default:a=e-1,c=t}let l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,h=this._weightNext,p=(n-t)/(s-t),x=p*p,m=x*p,g=-f*m+2*f*x-f*p,b=(1+f)*m+(-1.5-2*f)*x+(-.5+f)*p+1,T=(-1-h)*m+(1.5+h)*x+.5*p,_=h*m-h*x;for(let M=0;M!==o;++M)r[M]=g*a[u+M]+b*a[l+M]+T*a[c+M]+_*a[d+M];return r}},Nl=class extends gi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=(n-t)/(s-t),d=1-u;for(let f=0;f!==o;++f)r[f]=a[l+f]*d+a[c+f]*u;return r}},Ul=class extends gi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},Fl=class extends gi{interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=this.inTangents,d=this.outTangents;if(!u||!d){let p=(n-t)/(s-t),x=1-p;for(let m=0;m!==o;++m)r[m]=a[l+m]*x+a[c+m]*p;return r}let f=o*2,h=e-1;for(let p=0;p!==o;++p){let x=a[l+p],m=a[c+p],g=h*f+p*2,b=d[g],T=d[g+1],_=e*f+p*2,M=u[_],A=u[_+1],R=Ex(n,t,b,M,s);r[p]=Bm(R,x,T,A,m)}return r}};function Bm(i,e,t,n,s){let r=1-i;return r*r*r*e+3*r*r*i*t+3*r*i*i*n+i*i*i*s}function Ax(i,e,t,n,s){let r=1-i;return 3*r*r*(t-e)+6*r*i*(n-t)+3*i*i*(s-n)}function Ex(i,e,t,n,s){let r=(i-e)/(s-e);for(let a=0;a<8;a++){let o=Bm(r,e,t,n,s)-i;if(Math.abs(o)<1e-10)break;let c=Ax(r,e,t,n,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-o/c))}return r}var vn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ts(t,this.TimeBufferType),this.values=ts(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ts(e.times,Array),values:ts(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s),ul(e.settings)&&(n.settings={inTangents:ts(e.settings.inTangents,Array),outTangents:ts(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ul(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Nl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Dl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Fl(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Is:t=this.InterpolantFactoryMethodDiscrete;break;case Ls:t=this.InterpolantFactoryMethodLinear;break;case ll:t=this.InterpolantFactoryMethodSmooth;break;case Ed:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ne("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Is;case this.InterpolantFactoryMethodLinear:return Ls;case this.InterpolantFactoryMethodSmooth:return ll;case this.InterpolantFactoryMethodBezier:return Ed}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e;ul(this.settings)&&(Gp(this.settings.inTangents,e),Gp(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(We("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(We("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){We("KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){We("KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(s!==void 0&&d0(s))for(let o=0,c=s.length;o!==c;++o){let l=s[o];if(isNaN(l)){We("KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===ll,r=e.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=e[o],u=e[o+1];if(l!==u&&(o!==1||l!==e[0]))if(s)c=!0;else{let d=o*n,f=d-n,h=d+n;for(let p=0;p!==n;++p){let x=t[d+p];if(x!==t[f+p]||x!==t[h+p]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let d=o*n,f=a*n;for(let h=0;h!==n;++h)t[f+h]=t[d+h]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,ul(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Gp(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}vn.prototype.ValueTypeName="";vn.prototype.TimeBufferType=Float32Array;vn.prototype.ValueBufferType=Float32Array;vn.prototype.DefaultInterpolation=Ls;var Oi=class extends vn{constructor(e,t,n){super(e,t,n)}};Oi.prototype.ValueTypeName="bool";Oi.prototype.ValueBufferType=Array;Oi.prototype.DefaultInterpolation=Is;Oi.prototype.InterpolantFactoryMethodLinear=void 0;Oi.prototype.InterpolantFactoryMethodSmooth=void 0;var ja=class extends vn{constructor(e,t,n,s){super(e,t,n,s)}};ja.prototype.ValueTypeName="color";var ki=class extends vn{constructor(e,t,n,s){super(e,t,n,s)}};ki.prototype.ValueTypeName="number";var Ol=class extends gi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(s-t),l=e*o;for(let u=l+o;l!==u;l+=4)tn.slerpFlat(r,0,a,l-o,a,l,c);return r}},Bi=class extends vn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new Ol(this.times,this.values,this.getValueSize(),e)}};Bi.prototype.ValueTypeName="quaternion";Bi.prototype.InterpolantFactoryMethodSmooth=void 0;var zi=class extends vn{constructor(e,t,n){super(e,t,n)}};zi.prototype.ValueTypeName="string";zi.prototype.ValueBufferType=Array;zi.prototype.DefaultInterpolation=Is;zi.prototype.InterpolantFactoryMethodLinear=void 0;zi.prototype.InterpolantFactoryMethodSmooth=void 0;var as=class extends vn{constructor(e,t,n,s){super(e,t,n,s)}};as.prototype.ValueTypeName="vector";var Za=class{constructor(e="",t=-1,n=[],s=vm){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=On(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,s=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(Rx(n[a]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(vn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){let r=t.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);let u=wx(c);c=zp(c,1,u),l=zp(l,1,u),!s&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new ki(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){let l=e[o],u=l.name.match(r);if(u&&u.length>1){let d=u[1],f=s[d];f||(s[d]=f=[]),f.push(l)}}let a=[];for(let o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,n));return a}resetDuration(){let e=this.tracks,t=0;for(let n=0,s=e.length;n!==s;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function Cx(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ki;case"vector":case"vector2":case"vector3":case"vector4":return as;case"color":return ja;case"quaternion":return Bi;case"bool":case"boolean":return Oi;case"string":return zi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function Rx(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=Cx(i.type);if(i.times===void 0){let n=[],s=[];Tx(i.keys,n,s,"value"),i.times=n,i.values=s}let t;return e.parse!==void 0?t=e.parse(i):t=new e(i.name,i.times,i.values,i.interpolation),ul(i.settings)&&(t.settings={inTangents:ts(i.settings.inTangents,Float32Array),outTangents:ts(i.settings.outTangents,Float32Array)}),t}var ui={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(Vp(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!Vp(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function Vp(i){try{let e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var kl=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,d){return l.push(u,d),this},this.removeHandler=function(u){let d=l.indexOf(u);return d!==-1&&l.splice(d,2),this},this.getHandler=function(u){for(let d=0,f=l.length;d<f;d+=2){let h=l[d],p=l[d+1];if(h.global&&(h.lastIndex=0),h.test(u))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},zm=new kl,xi=class{constructor(e){this.manager=e!==void 0?e:zm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};xi.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ii={},Fd=class extends Error{constructor(e,t){super(e),this.response=t}},Ur=class extends xi{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=ui.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(Ii[e]!==void 0){Ii[e].push({onLoad:t,onProgress:n,onError:s});return}Ii[e]=[],Ii[e].push({onLoad:t,onProgress:n,onError:s});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&Ne("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let u=Ii[e],d=l.body.getReader(),f=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),h=f?parseInt(f):0,p=h!==0,x=0,m=new ReadableStream({start(g){b();function b(){d.read().then(({done:T,value:_})=>{if(T)g.close();else{x+=_.byteLength;let M=new ProgressEvent("progress",{lengthComputable:p,loaded:x,total:h});for(let A=0,R=u.length;A<R;A++){let v=u[A];v.onProgress&&v.onProgress(M)}g.enqueue(_),b()}},T=>{g.error(T)})}}});return new Response(m)}else throw new Fd(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return l.json();default:if(o==="")return l.text();{let d=/charset="?([^;"\s]*)"?/i.exec(o),f=d&&d[1]?d[1].toLowerCase():void 0,h=new TextDecoder(f);return l.arrayBuffer().then(p=>h.decode(p))}}}).then(l=>{ui.add(`file:${e}`,l);let u=Ii[e];delete Ii[e];for(let d=0,f=u.length;d<f;d++){let h=u[d];h.onLoad&&h.onLoad(l)}}).catch(l=>{let u=Ii[e];if(u===void 0)throw this.manager.itemError(e),l;delete Ii[e];for(let d=0,f=u.length;d<f;d++){let h=u[d];h.onError&&h.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var hr=new WeakMap,Bl=class extends xi{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=ui.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let d=hr.get(a);d===void 0&&(d=[],hr.set(a,d)),d.push({onLoad:t,onError:s})}return a}let o=yr("img");function c(){u(),t&&t(this);let d=hr.get(this)||[];for(let f=0;f<d.length;f++){let h=d[f];h.onLoad&&h.onLoad(this)}hr.delete(this),r.manager.itemEnd(e)}function l(d){u(),s&&s(d),ui.remove(`image:${e}`);let f=hr.get(this)||[];for(let h=0;h<f.length;h++){let p=f[h];p.onError&&p.onError(d)}hr.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),ui.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}};var Ja=class extends xi{constructor(e){super(e)}load(e,t,n,s){let r=new Zt,a=new Bl(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}},ks=class extends vt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Se(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Fr=class extends ks{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Se(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},wd=new Ye,Hp=new L,Wp=new L,Or=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new re(512,512),this.mapType=bn,this.map=null,this.mapPass=null,this.matrix=new Ye,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Pr,this._frameExtents=new re(1,1),this._viewportCount=1,this._viewports=[new St(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Hp.setFromMatrixPosition(e.matrixWorld),t.position.copy(Hp),Wp.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Wp),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){wd.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(wd,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;e.coordinateSystem===vr||e.reversedDepth?t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),t.multiply(wd)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},al=new L,ol=new tn,ci=new L,Qa=class extends vt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ye,this.projectionMatrix=new Ye,this.projectionMatrixInverse=new Ye,this.coordinateSystem=Jn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(al,ol,ci),ci.x===1&&ci.y===1&&ci.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(al,ol,ci.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(al,ol,ci),ci.x===1&&ci.y===1&&ci.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(al,ol,ci.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},es=new L,Xp=new re,qp=new re,jt=class extends Qa{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Ds*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ta*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ds*2*Math.atan(Math.tan(Ta*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){es.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(es.x,es.y).multiplyScalar(-e/es.z),es.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(es.x,es.y).multiplyScalar(-e/es.z)}getViewSize(e,t){return this.getViewBounds(e,Xp,qp),t.subVectors(qp,Xp)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ta*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Od=class extends Or{constructor(){super(new jt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=Ds*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},eo=class extends ks{constructor(e,t,n=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.target=new vt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Od}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},kd=class extends Or{constructor(){super(new jt(90,1,.5,500)),this.isPointLightShadow=!0}},Bs=class extends ks{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new kd}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},ti=class extends Qa{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Bd=class extends Or{constructor(){super(new ti(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},os=class extends ks{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.target=new vt,this.shadow=new Bd}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var Gi=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var Td=new WeakMap,to=class extends xi{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Ne("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Ne("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=ui.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(l=>{Td.has(a)===!0?(s&&s(Td.get(a)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(l),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);return}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(l){return ui.add(`image-bitmap:${e}`,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),Td.set(c,l),ui.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});ui.add(`image-bitmap:${e}`,c),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var pr=-90,mr=1,zl=class extends vt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new jt(pr,mr,e,t);s.layers=this.layers,this.add(s);let r=new jt(pr,mr,e,t);r.layers=this.layers,this.add(r);let a=new jt(pr,mr,e,t);a.layers=this.layers,this.add(a);let o=new jt(pr,mr,e,t);o.layers=this.layers,this.add(o);let c=new jt(pr,mr,e,t);c.layers=this.layers,this.add(c);let l=new jt(pr,mr,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(let l of t)this.remove(l);if(e===Jn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===vr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,f,h),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Gl=class extends jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var gf="\\[\\]\\.:\\/",Px=new RegExp("["+gf+"]","g"),xf="[^"+gf+"]",Ix="[^"+gf.replace("\\.","")+"]",Lx=/((?:WC+[\/:])*)/.source.replace("WC",xf),Dx=/(WCOD+)?/.source.replace("WCOD",Ix),Nx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",xf),Ux=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",xf),Fx=new RegExp("^"+Lx+Dx+Nx+Ux+"$"),Ox=["material","materials","bones","map"],zd=class{constructor(e,t,n){let s=n||Ct.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Ct=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Px,"")}static parseTrackName(e){let t=Fx.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Ox.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ne("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){We("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){We("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){We("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){We("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){We("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){We("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){We("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let a=e[s];if(a===void 0){let l=t.nodeName;We("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){We("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){We("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ct.Composite=zd;Ct.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ct.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ct.prototype.GetterByBindingType=[Ct.prototype._getValue_direct,Ct.prototype._getValue_array,Ct.prototype._getValue_arrayElement,Ct.prototype._getValue_toArray];Ct.prototype.SetterByBindingTypeAndVersioning=[[Ct.prototype._setValue_direct,Ct.prototype._setValue_direct_setNeedsUpdate,Ct.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ct.prototype._setValue_array,Ct.prototype._setValue_array_setNeedsUpdate,Ct.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ct.prototype._setValue_arrayElement,Ct.prototype._setValue_arrayElement_setNeedsUpdate,Ct.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ct.prototype._setValue_fromArray,Ct.prototype._setValue_fromArray_setNeedsUpdate,Ct.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var pw=new Float32Array(1);var $p=new Ye,no=class{constructor(e,t,n=0,s=1/0){this.ray=new fi(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Mr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):We("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return $p.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4($p),this}intersectObject(e,t=!0,n=[]){return Gd(e,this,n,t),n.sort(Yp),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Gd(e[s],this,n,t);return n.sort(Yp),n}};function Yp(i,e){return i.distance-e.distance}function Gd(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let a=0,o=r.length;a<o;a++)Gd(r[a],e,t,!0)}}var ls=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Qe(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Qe(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Vd=class i{static{i.prototype.isMatrix2=!0}constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};var io=class extends Qn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function _f(i,e,t,n){let s=kx(n);switch(t){case lf:return i*e;case Kl:return i*e/s.components*s.byteLength;case jl:return i*e/s.components*s.byteLength;case fs:return i*e*2/s.components*s.byteLength;case Zl:return i*e*2/s.components*s.byteLength;case cf:return i*e*3/s.components*s.byteLength;case Pn:return i*e*4/s.components*s.byteLength;case Jl:return i*e*4/s.components*s.byteLength;case ao:case oo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case lo:case co:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ec:case nc:return Math.max(i,16)*Math.max(e,8)/4;case Ql:case tc:return Math.max(i,8)*Math.max(e,8)/2;case ic:case sc:case ac:case oc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case rc:case uo:case lc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case cc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case uc:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case dc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case fc:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case hc:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case pc:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case mc:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case gc:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case xc:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case _c:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case vc:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case yc:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case bc:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Sc:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Mc:case wc:case Tc:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Ac:case Ec:return Math.ceil(i/4)*Math.ceil(e/4)*8;case fo:case Cc:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function kx(i){switch(i){case bn:case sf:return{byteLength:1,components:1};case Gr:case rf:case ri:return{byteLength:2,components:1};case $l:case Yl:return{byteLength:2,components:4};case si:case ql:case Rn:return{byteLength:4,components:1};case af:case of:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Vl}}));typeof window<"u"&&(window.__THREE__?Ne("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Vl);function lg(){let i=null,e=!1,t=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Bx(i){let e=new WeakMap;function t(o,c){let l=o.array,u=o.usage,d=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,u),o.onUploadCallback();let h;if(l instanceof Float32Array)h=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)h=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?h=i.HALF_FLOAT:h=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)h=i.SHORT;else if(l instanceof Uint32Array)h=i.UNSIGNED_INT;else if(l instanceof Int32Array)h=i.INT;else if(l instanceof Int8Array)h=i.BYTE;else if(l instanceof Uint8Array)h=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)h=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:h,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,c,l){let u=c.array,d=c.updateRanges;if(i.bindBuffer(l,o),d.length===0)i.bufferSubData(l,0,u);else{d.sort((h,p)=>h.start-p.start);let f=0;for(let h=1;h<d.length;h++){let p=d[f],x=d[h];x.start<=p.start+p.count+1?p.count=Math.max(p.count,x.start+x.count-p.start):(++f,d[f]=x)}d.length=f+1;for(let h=0,p=d.length;h<p;h++){let x=d[h];i.bufferSubData(l,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var zx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Gx=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Vx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Hx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Wx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Xx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,qx=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,$x=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Yx=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Kx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,jx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Zx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Jx=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Qx=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,e_=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,t_=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,n_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,i_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,s_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,r_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,a_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,o_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,l_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,c_=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,u_=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,d_=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,f_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,h_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,p_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,m_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,g_="gl_FragColor = linearToOutputTexel( gl_FragColor );",x_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,__=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,v_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,y_=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,b_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,S_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,M_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,w_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,T_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,A_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,E_=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,C_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,R_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,P_=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,I_=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,L_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,D_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,N_=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,U_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,F_=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,O_=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,k_=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,B_=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,z_=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,G_=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,V_=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,H_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,W_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,X_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,q_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,$_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Y_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,K_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,j_=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Z_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,J_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Q_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ev=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,tv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,nv=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,iv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,sv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,rv=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,av=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ov=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,cv=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,uv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,dv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,fv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,hv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,pv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,mv=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,gv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,xv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,_v=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,vv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,yv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,bv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Sv=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Mv=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,wv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Tv=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Av=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ev=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Cv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Rv=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Pv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Iv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Lv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Dv=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Nv=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Uv=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Fv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ov=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,kv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Bv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,zv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Gv=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hv=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Xv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,$v=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Yv=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Kv=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,jv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Zv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jv=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Qv=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ey=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ty=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ny=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,iy=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sy=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,ry=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ay=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,oy=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,ly=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cy=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uy=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,dy=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fy=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hy=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,py=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,my=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,gy=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xy=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,_y=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,vy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,nt={alphahash_fragment:zx,alphahash_pars_fragment:Gx,alphamap_fragment:Vx,alphamap_pars_fragment:Hx,alphatest_fragment:Wx,alphatest_pars_fragment:Xx,aomap_fragment:qx,aomap_pars_fragment:$x,batching_pars_vertex:Yx,batching_vertex:Kx,begin_vertex:jx,beginnormal_vertex:Zx,bsdfs:Jx,iridescence_fragment:Qx,bumpmap_pars_fragment:e_,clipping_planes_fragment:t_,clipping_planes_pars_fragment:n_,clipping_planes_pars_vertex:i_,clipping_planes_vertex:s_,color_fragment:r_,color_pars_fragment:a_,color_pars_vertex:o_,color_vertex:l_,common:c_,cube_uv_reflection_fragment:u_,defaultnormal_vertex:d_,displacementmap_pars_vertex:f_,displacementmap_vertex:h_,emissivemap_fragment:p_,emissivemap_pars_fragment:m_,colorspace_fragment:g_,colorspace_pars_fragment:x_,envmap_fragment:__,envmap_common_pars_fragment:v_,envmap_pars_fragment:y_,envmap_pars_vertex:b_,envmap_physical_pars_fragment:L_,envmap_vertex:S_,fog_vertex:M_,fog_pars_vertex:w_,fog_fragment:T_,fog_pars_fragment:A_,gradientmap_pars_fragment:E_,lightmap_pars_fragment:C_,lights_lambert_fragment:R_,lights_lambert_pars_fragment:P_,lights_pars_begin:I_,lights_toon_fragment:D_,lights_toon_pars_fragment:N_,lights_phong_fragment:U_,lights_phong_pars_fragment:F_,lights_physical_fragment:O_,lights_physical_pars_fragment:k_,lights_fragment_begin:B_,lights_fragment_maps:z_,lights_fragment_end:G_,lightprobes_pars_fragment:V_,logdepthbuf_fragment:H_,logdepthbuf_pars_fragment:W_,logdepthbuf_pars_vertex:X_,logdepthbuf_vertex:q_,map_fragment:$_,map_pars_fragment:Y_,map_particle_fragment:K_,map_particle_pars_fragment:j_,metalnessmap_fragment:Z_,metalnessmap_pars_fragment:J_,morphinstance_vertex:Q_,morphcolor_vertex:ev,morphnormal_vertex:tv,morphtarget_pars_vertex:nv,morphtarget_vertex:iv,normal_fragment_begin:sv,normal_fragment_maps:rv,normal_pars_fragment:av,normal_pars_vertex:ov,normal_vertex:lv,normalmap_pars_fragment:cv,clearcoat_normal_fragment_begin:uv,clearcoat_normal_fragment_maps:dv,clearcoat_pars_fragment:fv,iridescence_pars_fragment:hv,opaque_fragment:pv,packing:mv,premultiplied_alpha_fragment:gv,project_vertex:xv,dithering_fragment:_v,dithering_pars_fragment:vv,roughnessmap_fragment:yv,roughnessmap_pars_fragment:bv,shadowmap_pars_fragment:Sv,shadowmap_pars_vertex:Mv,shadowmap_vertex:wv,shadowmask_pars_fragment:Tv,skinbase_vertex:Av,skinning_pars_vertex:Ev,skinning_vertex:Cv,skinnormal_vertex:Rv,specularmap_fragment:Pv,specularmap_pars_fragment:Iv,tonemapping_fragment:Lv,tonemapping_pars_fragment:Dv,transmission_fragment:Nv,transmission_pars_fragment:Uv,uv_pars_fragment:Fv,uv_pars_vertex:Ov,uv_vertex:kv,worldpos_vertex:Bv,background_vert:zv,background_frag:Gv,backgroundCube_vert:Vv,backgroundCube_frag:Hv,cube_vert:Wv,cube_frag:Xv,depth_vert:qv,depth_frag:$v,distance_vert:Yv,distance_frag:Kv,equirect_vert:jv,equirect_frag:Zv,linedashed_vert:Jv,linedashed_frag:Qv,meshbasic_vert:ey,meshbasic_frag:ty,meshlambert_vert:ny,meshlambert_frag:iy,meshmatcap_vert:sy,meshmatcap_frag:ry,meshnormal_vert:ay,meshnormal_frag:oy,meshphong_vert:ly,meshphong_frag:cy,meshphysical_vert:uy,meshphysical_frag:dy,meshtoon_vert:fy,meshtoon_frag:hy,points_vert:py,points_frag:my,shadow_vert:gy,shadow_frag:xy,sprite_vert:_y,sprite_frag:vy},_e={common:{diffuse:{value:new Se(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ke}},envmap:{envMap:{value:null},envMapRotation:{value:new Ke},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ke},normalScale:{value:new re(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Se(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new L},probesMax:{value:new L},probesResolution:{value:new L}},points:{diffuse:{value:new Se(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0},uvTransform:{value:new Ke}},sprite:{diffuse:{value:new Se(16777215)},opacity:{value:1},center:{value:new re(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}}},bi={basic:{uniforms:an([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.fog]),vertexShader:nt.meshbasic_vert,fragmentShader:nt.meshbasic_frag},lambert:{uniforms:an([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new Se(0)},envMapIntensity:{value:1}}]),vertexShader:nt.meshlambert_vert,fragmentShader:nt.meshlambert_frag},phong:{uniforms:an([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new Se(0)},specular:{value:new Se(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:nt.meshphong_vert,fragmentShader:nt.meshphong_frag},standard:{uniforms:an([_e.common,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.roughnessmap,_e.metalnessmap,_e.fog,_e.lights,{emissive:{value:new Se(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:nt.meshphysical_vert,fragmentShader:nt.meshphysical_frag},toon:{uniforms:an([_e.common,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.gradientmap,_e.fog,_e.lights,{emissive:{value:new Se(0)}}]),vertexShader:nt.meshtoon_vert,fragmentShader:nt.meshtoon_frag},matcap:{uniforms:an([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,{matcap:{value:null}}]),vertexShader:nt.meshmatcap_vert,fragmentShader:nt.meshmatcap_frag},points:{uniforms:an([_e.points,_e.fog]),vertexShader:nt.points_vert,fragmentShader:nt.points_frag},dashed:{uniforms:an([_e.common,_e.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:nt.linedashed_vert,fragmentShader:nt.linedashed_frag},depth:{uniforms:an([_e.common,_e.displacementmap]),vertexShader:nt.depth_vert,fragmentShader:nt.depth_frag},normal:{uniforms:an([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,{opacity:{value:1}}]),vertexShader:nt.meshnormal_vert,fragmentShader:nt.meshnormal_frag},sprite:{uniforms:an([_e.sprite,_e.fog]),vertexShader:nt.sprite_vert,fragmentShader:nt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:nt.background_vert,fragmentShader:nt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ke}},vertexShader:nt.backgroundCube_vert,fragmentShader:nt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:nt.cube_vert,fragmentShader:nt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:nt.equirect_vert,fragmentShader:nt.equirect_frag},distance:{uniforms:an([_e.common,_e.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:nt.distance_vert,fragmentShader:nt.distance_frag},shadow:{uniforms:an([_e.lights,_e.fog,{color:{value:new Se(0)},opacity:{value:1}}]),vertexShader:nt.shadow_vert,fragmentShader:nt.shadow_frag}};bi.physical={uniforms:an([bi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ke},clearcoatNormalScale:{value:new re(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ke},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ke},sheen:{value:0},sheenColor:{value:new Se(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ke},transmissionSamplerSize:{value:new re},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ke},attenuationDistance:{value:0},attenuationColor:{value:new Se(0)},specularColor:{value:new Se(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ke},anisotropyVector:{value:new re},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ke}}]),vertexShader:nt.meshphysical_vert,fragmentShader:nt.meshphysical_frag};var Lc={r:0,b:0,g:0},yy=new Ye,cg=new Ke;cg.set(-1,0,0,0,1,0,0,0,1);function by(i,e,t,n,s,r){let a=new Se(0),o=s===!0?0:1,c,l,u=null,d=0,f=null;function h(b){let T=b.isScene===!0?b.background:null;if(T&&T.isTexture){let _=b.backgroundBlurriness>0;T=e.get(T,_)}return T}function p(b){let T=!1,_=h(b);_===null?m(a,o):_&&_.isColor&&(m(_,1),T=!0);let M=i.xr.getEnvironmentBlendMode();M==="additive"?t.buffers.color.setClear(0,0,0,1,r):M==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||T)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function x(b,T){let _=h(T);_&&(_.isCubeTexture||_.mapping===ro)?(l===void 0&&(l=new Ue(new Bn(1,1,1),new Cn({name:"BackgroundCubeMaterial",uniforms:Ws(bi.backgroundCube.uniforms),vertexShader:bi.backgroundCube.vertexShader,fragmentShader:bi.backgroundCube.fragmentShader,side:hn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(M,A,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=_,l.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(yy.makeRotationFromEuler(T.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(cg),l.material.toneMapped=it.getTransfer(_.colorSpace)!==_t,(u!==_||d!==_.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,u=_,d=_.version,f=i.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new Ue(new ei(2,2),new Cn({name:"BackgroundMaterial",uniforms:Ws(bi.background.uniforms),vertexShader:bi.background.vertexShader,fragmentShader:bi.background.fragmentShader,side:_i,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.toneMapped=it.getTransfer(_.colorSpace)!==_t,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(u!==_||d!==_.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=_,d=_.version,f=i.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function m(b,T){b.getRGB(Lc,mf(i)),t.buffers.color.setClear(Lc.r,Lc.g,Lc.b,T,r)}function g(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,T=1){a.set(b),o=T,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(b){o=b,m(a,o)},render:p,addToRenderList:x,dispose:g}}function Sy(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null),r=s,a=!1;function o(D,F,N,I,U){let z=!1,V=d(D,I,N,F);r!==V&&(r=V,l(r.object)),z=h(D,I,N,U),z&&p(D,I,N,U),U!==null&&e.update(U,i.ELEMENT_ARRAY_BUFFER),(z||a)&&(a=!1,_(D,F,N,I),U!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(U).buffer))}function c(){return i.createVertexArray()}function l(D){return i.bindVertexArray(D)}function u(D){return i.deleteVertexArray(D)}function d(D,F,N,I){let U=I.wireframe===!0,z=n[F.id];z===void 0&&(z={},n[F.id]=z);let V=D.isInstancedMesh===!0?D.id:0,Z=z[V];Z===void 0&&(Z={},z[V]=Z);let q=Z[N.id];q===void 0&&(q={},Z[N.id]=q);let J=q[U];return J===void 0&&(J=f(c()),q[U]=J),J}function f(D){let F=[],N=[],I=[];for(let U=0;U<t;U++)F[U]=0,N[U]=0,I[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:N,attributeDivisors:I,object:D,attributes:{},index:null}}function h(D,F,N,I){let U=r.attributes,z=F.attributes,V=0,Z=N.getAttributes();for(let q in Z)if(Z[q].location>=0){let ie=U[q],Fe=z[q];if(Fe===void 0&&(q==="instanceMatrix"&&D.instanceMatrix&&(Fe=D.instanceMatrix),q==="instanceColor"&&D.instanceColor&&(Fe=D.instanceColor)),ie===void 0||ie.attribute!==Fe||Fe&&ie.data!==Fe.data)return!0;V++}return r.attributesNum!==V||r.index!==I}function p(D,F,N,I){let U={},z=F.attributes,V=0,Z=N.getAttributes();for(let q in Z)if(Z[q].location>=0){let ie=z[q];ie===void 0&&(q==="instanceMatrix"&&D.instanceMatrix&&(ie=D.instanceMatrix),q==="instanceColor"&&D.instanceColor&&(ie=D.instanceColor));let Fe={};Fe.attribute=ie,ie&&ie.data&&(Fe.data=ie.data),U[q]=Fe,V++}r.attributes=U,r.attributesNum=V,r.index=I}function x(){let D=r.newAttributes;for(let F=0,N=D.length;F<N;F++)D[F]=0}function m(D){g(D,0)}function g(D,F){let N=r.newAttributes,I=r.enabledAttributes,U=r.attributeDivisors;N[D]=1,I[D]===0&&(i.enableVertexAttribArray(D),I[D]=1),U[D]!==F&&(i.vertexAttribDivisor(D,F),U[D]=F)}function b(){let D=r.newAttributes,F=r.enabledAttributes;for(let N=0,I=F.length;N<I;N++)F[N]!==D[N]&&(i.disableVertexAttribArray(N),F[N]=0)}function T(D,F,N,I,U,z,V){V===!0?i.vertexAttribIPointer(D,F,N,U,z):i.vertexAttribPointer(D,F,N,I,U,z)}function _(D,F,N,I){x();let U=I.attributes,z=N.getAttributes(),V=F.defaultAttributeValues;for(let Z in z){let q=z[Z];if(q.location>=0){let J=U[Z];if(J===void 0&&(Z==="instanceMatrix"&&D.instanceMatrix&&(J=D.instanceMatrix),Z==="instanceColor"&&D.instanceColor&&(J=D.instanceColor)),J!==void 0){let ie=J.normalized,Fe=J.itemSize,Ee=e.get(J);if(Ee===void 0)continue;let ht=Ee.buffer,at=Ee.type,ut=Ee.bytesPerElement,j=at===i.INT||at===i.UNSIGNED_INT||J.gpuType===ql;if(J.isInterleavedBufferAttribute){let te=J.data,ve=te.stride,Xe=J.offset;if(te.isInstancedInterleavedBuffer){for(let we=0;we<q.locationSize;we++)g(q.location+we,te.meshPerAttribute);D.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let we=0;we<q.locationSize;we++)m(q.location+we);i.bindBuffer(i.ARRAY_BUFFER,ht);for(let we=0;we<q.locationSize;we++)T(q.location+we,Fe/q.locationSize,at,ie,ve*ut,(Xe+Fe/q.locationSize*we)*ut,j)}else{if(J.isInstancedBufferAttribute){for(let te=0;te<q.locationSize;te++)g(q.location+te,J.meshPerAttribute);D.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let te=0;te<q.locationSize;te++)m(q.location+te);i.bindBuffer(i.ARRAY_BUFFER,ht);for(let te=0;te<q.locationSize;te++)T(q.location+te,Fe/q.locationSize,at,ie,Fe*ut,Fe/q.locationSize*te*ut,j)}}else if(V!==void 0){let ie=V[Z];if(ie!==void 0)switch(ie.length){case 2:i.vertexAttrib2fv(q.location,ie);break;case 3:i.vertexAttrib3fv(q.location,ie);break;case 4:i.vertexAttrib4fv(q.location,ie);break;default:i.vertexAttrib1fv(q.location,ie)}}}}b()}function M(){S();for(let D in n){let F=n[D];for(let N in F){let I=F[N];for(let U in I){let z=I[U];for(let V in z)u(z[V].object),delete z[V];delete I[U]}}delete n[D]}}function A(D){if(n[D.id]===void 0)return;let F=n[D.id];for(let N in F){let I=F[N];for(let U in I){let z=I[U];for(let V in z)u(z[V].object),delete z[V];delete I[U]}}delete n[D.id]}function R(D){for(let F in n){let N=n[F];for(let I in N){let U=N[I];if(U[D.id]===void 0)continue;let z=U[D.id];for(let V in z)u(z[V].object),delete z[V];delete U[D.id]}}}function v(D){for(let F in n){let N=n[F],I=D.isInstancedMesh===!0?D.id:0,U=N[I];if(U!==void 0){for(let z in U){let V=U[z];for(let Z in V)u(V[Z].object),delete V[Z];delete U[z]}delete N[I],Object.keys(N).length===0&&delete n[F]}}}function S(){C(),a=!0,r!==s&&(r=s,l(r.object))}function C(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:S,resetDefaultState:C,dispose:M,releaseStatesOfGeometry:A,releaseStatesOfObject:v,releaseStatesOfProgram:R,initAttributes:x,enableAttribute:m,disableUnusedAttributes:b}}function My(i,e,t){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function a(c,l,u){u!==0&&(i.drawArraysInstanced(n,c,l,u),t.update(l,n,u))}function o(c,l,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,u);let f=0;for(let h=0;h<u;h++)f+=l[h];t.update(f,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function wy(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let R=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(R){return!(R!==Pn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){let v=R===ri&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==bn&&R!==Rn&&!v&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",u=c(l);u!==l&&(Ne("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let d=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&f===!1&&Ne("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),T=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),M=i.getParameter(i.MAX_SAMPLES),A=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:h,maxVertexTextures:p,maxTextureSize:x,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:b,maxVaryings:T,maxFragmentUniforms:_,maxSamples:M,samples:A}}function Ty(i){let e=this,t=null,n=0,s=!1,r=!1,a=new un,o=new Ke,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){let h=d.length!==0||f||n!==0||s;return s=f,n=d.length,h},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,h){let p=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,g=i.get(d);if(!s||p===null||p.length===0||r&&!m)r?u(null):l();else{let b=r?0:n,T=b*4,_=g.clippingState||null;c.value=_,_=u(p,f,T,h);for(let M=0;M!==T;++M)_[M]=t[M];g.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,f,h,p){let x=d!==null?d.length:0,m=null;if(x!==0){if(m=c.value,p!==!0||m===null){let g=h+x*4,b=f.matrixWorldInverse;o.getNormalMatrix(b),(m===null||m.length<g)&&(m=new Float32Array(g));for(let T=0,_=h;T!==x;++T,_+=4)a.copy(d[T]).applyMatrix4(b,o),a.normal.toArray(m,_),m[_+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}var Xr=4,Ay=6,Ey=20,Cy=256,po=new ti,Gm=new Se,vf=null,yf=0,bf=0,Sf=!1,Ry=new L,Xs=new L,Nc=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:a=256,position:o=Ry}=r;vf=this._renderer.getRenderTarget(),yf=this._renderer.getActiveCubeFace(),bf=this._renderer.getActiveMipmapLevel(),Sf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Wm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Hm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(vf,yf,bf),this._renderer.xr.enabled=Sf,e.scissorTest=!1,Wr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===us||e.mapping===Vs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),vf=this._renderer.getRenderTarget(),yf=this._renderer.getActiveCubeFace(),bf=this._renderer.getActiveMipmapLevel(),Sf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:zt,minFilter:zt,generateMipmaps:!1,type:ri,format:Pn,colorSpace:dn,depthBuffer:!1},s=Vm(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Vm(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Py(r)),this._blurMaterial=Ly(r,e,t),this._ggxMaterial=Iy(r,e,t)}return s}_compileMaterial(e){let t=new Ue(new ft,e);this._renderer.compile(t,po)}_sceneToCubeUV(e,t,n,s,r){let c=new jt(90,1,t,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,h=d.toneMapping;d.getClearColor(Gm),d.toneMapping=ni,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ue(new Bn,new sn({name:"PMREM.Background",side:hn,depthWrite:!1,depthTest:!1})));let x=this._backgroundBox,m=x.material,g=!1,b=e.background;b?b.isColor&&(m.color.copy(b),e.background=null,g=!0):(m.color.copy(Gm),g=!0);for(let T=0;T<6;T++){let _=T%3;_===0?(c.up.set(0,l[T],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[T],r.y,r.z)):_===1?(c.up.set(0,0,l[T]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[T],r.z)):(c.up.set(0,l[T],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[T]));let M=this._cubeSize;Wr(s,_*M,T>2?M:0,M,M),d.setRenderTarget(s),g&&d.render(x,c),d.render(e,c)}d.toneMapping=h,d.autoClear=f,e.background=b}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===us||e.mapping===Vs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Wm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Hm());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let c=this._cubeSize;Wr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,po)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let c=a.uniforms,l=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-u*u),f=l*1.25,h=d*f,{_lodMax:p}=this,x=this._sizeLods[n],m=3*x*(n>p-Xr?n-p+Xr:0),g=4*(this._cubeSize-x);c.envMap.value=e.texture,c.roughness.value=h,c.mipInt.value=p-t,Wr(r,m,g,3*x,2*x),s.setRenderTarget(r),s.render(o,po),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=p-n,Wr(e,m,g,3*x,2*x),s.setRenderTarget(e),s.render(o,po)}_blur(e,t,n,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,a),this._blurPass(r,e,n,n,a)}_blurPass(e,t,n,s,r){let a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[s];c.material=o;let l=o.uniforms;l.envMap.value=e.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-n;let u=this._sizeLods[s],d=3*u*(s>this._lodMax-Xr?s-this._lodMax+Xr:0),f=4*(this._cubeSize-u);Wr(t,d,f,3*u,2*u),a.setRenderTarget(t),a.render(c,po)}};function Py(i){let e=[],t=[],n=i,s=i-Xr+1+Ay;for(let r=0;r<s;r++){let a=Math.pow(2,n);e.push(a);let o=1/(a-2),c=-o,l=1+o,u=[c,c,l,c,l,l,c,c,l,l,c,l],d=6,f=6,h=3,p=new Float32Array(h*f*d),x=new Float32Array(h*f*d);for(let g=0;g<d;g++){let b=g%3*2/3-1,T=g>2?0:-1,_=[b,T,0,b+2/3,T,0,b+2/3,T+1,0,b,T,0,b+2/3,T+1,0,b,T+1,0];p.set(_,h*f*g);for(let M=0;M<f;M++){let A=u[M*2]*2-1,R=u[M*2+1]*2-1;g===0?Xs.set(1,R,A):g===1?Xs.set(-A,1,-R):g===2?Xs.set(-A,R,1):g===3?Xs.set(-1,R,-A):g===4?Xs.set(-A,-1,R):Xs.set(A,R,-1),Xs.toArray(x,(g*f+M)*h)}}let m=new ft;m.setAttribute("position",new Wt(p,h)),m.setAttribute("outputDirection",new Wt(x,h)),t.push(new Ue(m,null)),n>Xr&&n--}return{lodMeshes:t,sizeLods:e}}function Vm(i,e,t){let n=new nn(i,e,t);return n.texture.mapping=ro,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Wr(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Iy(i,e,t){return new Cn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Cy,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Oc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:vi,depthTest:!1,depthWrite:!1})}function Ly(i,e,t){return new Cn({name:"SphericalGaussianBlur",defines:{SAMPLES:Ey,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Oc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:vi,depthTest:!1,depthWrite:!1})}function Hm(){return new Cn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Oc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:vi,depthTest:!1,depthWrite:!1})}function Wm(){return new Cn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Oc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:vi,depthTest:!1,depthWrite:!1})}function Oc(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Uc=class extends nn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Oa(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Bn(5,5,5),r=new Cn({name:"CubemapFromEquirect",uniforms:Ws(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:hn,blending:vi});r.uniforms.tEquirect.value=t;let a=new Ue(s,r),o=t.minFilter;return t.minFilter===ii&&(t.minFilter=zt),new zl(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}};function Dy(i){let e=new WeakMap,t=new WeakMap,n=null;function s(f,h=!1){return f==null?null:h?a(f):r(f)}function r(f){if(f&&f.isTexture){let h=f.mapping;if(h===Hl||h===Wl)if(e.has(f)){let p=e.get(f).texture;return o(p,f.mapping)}else{let p=f.image;if(p&&p.height>0){let x=new Uc(p.height);return x.fromEquirectangularTexture(i,f),e.set(f,x),f.addEventListener("dispose",l),o(x.texture,f.mapping)}else return null}}return f}function a(f){if(f&&f.isTexture){let h=f.mapping,p=h===Hl||h===Wl,x=h===us||h===Vs;if(p||x){let m=t.get(f),g=m!==void 0?m.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==g)return n===null&&(n=new Nc(i)),m=p?n.fromEquirectangular(f,m):n.fromCubemap(f,m),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),m.texture;if(m!==void 0)return m.texture;{let b=f.image;return p&&b&&b.height>0||x&&b&&c(b)?(n===null&&(n=new Nc(i)),m=p?n.fromEquirectangular(f):n.fromCubemap(f),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),f.addEventListener("dispose",u),m.texture):null}}}return f}function o(f,h){return h===Hl?f.mapping=us:h===Wl&&(f.mapping=Vs),f}function c(f){let h=0,p=6;for(let x=0;x<p;x++)f[x]!==void 0&&h++;return h===p}function l(f){let h=f.target;h.removeEventListener("dispose",l);let p=e.get(h);p!==void 0&&(e.delete(h),p.dispose())}function u(f){let h=f.target;h.removeEventListener("dispose",u);let p=t.get(h);p!==void 0&&(t.delete(h),p.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function Ny(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&Ps("WebGLRenderer: "+n+" extension not supported."),s}}}function Uy(i,e,t,n){let s={},r=new WeakMap;function a(d){let f=d.target;f.index!==null&&e.remove(f.index);for(let p in f.attributes)e.remove(f.attributes[p]);f.removeEventListener("dispose",a),delete s[f.id];let h=r.get(f);h&&(e.remove(h),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(d,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,t.memory.geometries++),f}function c(d){let f=d.attributes;for(let h in f)e.update(f[h],i.ARRAY_BUFFER)}function l(d){let f=[],h=d.index,p=d.attributes.position,x=0;if(p===void 0)return;if(h!==null){let b=h.array;x=h.version;for(let T=0,_=b.length;T<_;T+=3){let M=b[T+0],A=b[T+1],R=b[T+2];f.push(M,A,A,R,R,M)}}else{let b=p.array;x=p.version;for(let T=0,_=b.length/3-1;T<_;T+=3){let M=T+0,A=T+1,R=T+2;f.push(M,A,A,R,R,M)}}let m=new(p.count>=65535?Na:Da)(f,1);m.version=x;let g=r.get(d);g&&e.remove(g),r.set(d,m)}function u(d){let f=r.get(d);if(f){let h=d.index;h!==null&&f.version<h.version&&l(d)}else l(d);return r.get(d)}return{get:o,update:c,getWireframeAttribute:u}}function Fy(i,e,t){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function c(d,f){i.drawElements(n,f,r,d*a),t.update(f,n,1)}function l(d,f,h){h!==0&&(i.drawElementsInstanced(n,f,r,d*a,h),t.update(f,n,h))}function u(d,f,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,h);let x=0;for(let m=0;m<h;m++)x+=f[m];t.update(x,n,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Oy(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:We("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function ky(i,e,t){let n=new WeakMap,s=new St;function r(a,o,c){let l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0,f=n.get(o);if(f===void 0||f.count!==d){let S=function(){R.dispose(),n.delete(o),o.removeEventListener("dispose",S)};f!==void 0&&f.texture.dispose();let h=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],b=o.morphAttributes.color||[],T=0;h===!0&&(T=1),p===!0&&(T=2),x===!0&&(T=3);let _=o.attributes.position.count*T,M=1;_>e.maxTextureSize&&(M=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let A=new Float32Array(_*M*4*d),R=new Ia(A,_,M,d);R.type=Rn,R.needsUpdate=!0;let v=T*4;for(let C=0;C<d;C++){let D=m[C],F=g[C],N=b[C],I=_*M*4*C;for(let U=0;U<D.count;U++){let z=U*v;h===!0&&(s.fromBufferAttribute(D,U),A[I+z+0]=s.x,A[I+z+1]=s.y,A[I+z+2]=s.z,A[I+z+3]=0),p===!0&&(s.fromBufferAttribute(F,U),A[I+z+4]=s.x,A[I+z+5]=s.y,A[I+z+6]=s.z,A[I+z+7]=0),x===!0&&(s.fromBufferAttribute(N,U),A[I+z+8]=s.x,A[I+z+9]=s.y,A[I+z+10]=s.z,A[I+z+11]=N.itemSize===4?s.w:1)}}f={count:d,texture:R,size:new re(_,M)},n.set(o,f),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let h=0;for(let x=0;x<l.length;x++)h+=l[x];let p=o.morphTargetsRelative?1:1-h;c.getUniforms().setValue(i,"morphTargetBaseInfluence",p),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function By(i,e,t,n,s){let r=new WeakMap;function a(l){let u=s.render.frame,d=l.geometry,f=e.get(l,d);if(r.get(f)!==u&&(e.update(f),r.set(f,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==u&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){let h=l.skeleton;r.get(h)!==u&&(h.update(),r.set(h,u))}return f}function o(){r=new WeakMap}function c(l){let u=l.target;u.removeEventListener("dispose",c),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}var zy={[jd]:"LINEAR_TONE_MAPPING",[Zd]:"REINHARD_TONE_MAPPING",[Jd]:"CINEON_TONE_MAPPING",[so]:"ACES_FILMIC_TONE_MAPPING",[ef]:"AGX_TONE_MAPPING",[tf]:"NEUTRAL_TONE_MAPPING",[Qd]:"CUSTOM_TONE_MAPPING"};function Gy(i,e,t,n,s,r){let a=new nn(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,c=null,l=new ft;l.setAttribute("position",new tt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new tt([0,2,0,0,2,0],2));let u=new Pl({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Ue(l,u),f=new ti(-1,1,1,-1,0,1),h=null,p=null,x=!1,m,g=null,b=[],T=!1;this.setSize=function(_,M){a.setSize(_,M),o!==null&&o.setSize(_,M),c!==null&&c.setSize(_,M);for(let A=0;A<b.length;A++){let R=b[A];R.setSize&&R.setSize(_,M)}},this.setEffects=function(_){b=_,T=b.length>0&&b[0].isRenderPass===!0;let M=a.width,A=a.height;b.length>0&&o===null&&(o=new nn(M,A,{type:ri,depthBuffer:!1,stencilBuffer:!1}),c=new nn(M,A,{type:ri,depthBuffer:!1,stencilBuffer:!1}));for(let R=0;R<b.length;R++){let v=b[R];v.setSize&&v.setSize(M,A)}},this.begin=function(_,M){if(x||_.toneMapping===ni&&b.length===0)return!1;if(g=M,M!==null){let A=M.width,R=M.height;(a.width!==A||a.height!==R)&&this.setSize(A,R)}return T===!1&&_.setRenderTarget(a),m=_.toneMapping,_.toneMapping=ni,!0},this.hasRenderPass=function(){return T},this.end=function(_,M){_.toneMapping=m,x=!0;let A=a,R=o;for(let v=0;v<b.length;v++){let S=b[v];S.enabled!==!1&&(S.render(_,R,A,M),S.needsSwap!==!1&&(A=R,R=R===o?c:o))}if(h!==_.outputColorSpace||p!==_.toneMapping){h=_.outputColorSpace,p=_.toneMapping,u.defines={},it.getTransfer(h)===_t&&(u.defines.SRGB_TRANSFER="");let v=zy[p];v&&(u.defines[v]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=A.texture,_.setRenderTarget(g),_.render(d,f),g=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var ug=new Zt,Tf=new rs(1,1),dg=new Ia,fg=new yl,hg=new Oa,Xm=[],qm=[],$m=new Float32Array(16),Ym=new Float32Array(9),Km=new Float32Array(4);function $r(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=Xm[s];if(r===void 0&&(r=new Float32Array(s),Xm[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function qt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function $t(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function kc(i,e){let t=qm[e];t===void 0&&(t=new Int32Array(e),qm[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Vy(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Hy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(qt(t,e))return;i.uniform2fv(this.addr,e),$t(t,e)}}function Wy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(qt(t,e))return;i.uniform3fv(this.addr,e),$t(t,e)}}function Xy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(qt(t,e))return;i.uniform4fv(this.addr,e),$t(t,e)}}function qy(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(qt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),$t(t,e)}else{if(qt(t,n))return;Km.set(n),i.uniformMatrix2fv(this.addr,!1,Km),$t(t,n)}}function $y(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(qt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),$t(t,e)}else{if(qt(t,n))return;Ym.set(n),i.uniformMatrix3fv(this.addr,!1,Ym),$t(t,n)}}function Yy(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(qt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),$t(t,e)}else{if(qt(t,n))return;$m.set(n),i.uniformMatrix4fv(this.addr,!1,$m),$t(t,n)}}function Ky(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function jy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(qt(t,e))return;i.uniform2iv(this.addr,e),$t(t,e)}}function Zy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(qt(t,e))return;i.uniform3iv(this.addr,e),$t(t,e)}}function Jy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(qt(t,e))return;i.uniform4iv(this.addr,e),$t(t,e)}}function Qy(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function eb(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(qt(t,e))return;i.uniform2uiv(this.addr,e),$t(t,e)}}function tb(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(qt(t,e))return;i.uniform3uiv(this.addr,e),$t(t,e)}}function nb(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(qt(t,e))return;i.uniform4uiv(this.addr,e),$t(t,e)}}function ib(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Tf.compareFunction=t.isReversedDepthBuffer()?Ic:Pc,r=Tf):r=ug,t.setTexture2D(e||r,s)}function sb(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||fg,s)}function rb(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||hg,s)}function ab(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||dg,s)}function ob(i){switch(i){case 5126:return Vy;case 35664:return Hy;case 35665:return Wy;case 35666:return Xy;case 35674:return qy;case 35675:return $y;case 35676:return Yy;case 5124:case 35670:return Ky;case 35667:case 35671:return jy;case 35668:case 35672:return Zy;case 35669:case 35673:return Jy;case 5125:return Qy;case 36294:return eb;case 36295:return tb;case 36296:return nb;case 35678:case 36198:case 36298:case 36306:case 35682:return ib;case 35679:case 36299:case 36307:return sb;case 35680:case 36300:case 36308:case 36293:return rb;case 36289:case 36303:case 36311:case 36292:return ab}}function lb(i,e){i.uniform1fv(this.addr,e)}function cb(i,e){let t=$r(e,this.size,2);i.uniform2fv(this.addr,t)}function ub(i,e){let t=$r(e,this.size,3);i.uniform3fv(this.addr,t)}function db(i,e){let t=$r(e,this.size,4);i.uniform4fv(this.addr,t)}function fb(i,e){let t=$r(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function hb(i,e){let t=$r(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function pb(i,e){let t=$r(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function mb(i,e){i.uniform1iv(this.addr,e)}function gb(i,e){i.uniform2iv(this.addr,e)}function xb(i,e){i.uniform3iv(this.addr,e)}function _b(i,e){i.uniform4iv(this.addr,e)}function vb(i,e){i.uniform1uiv(this.addr,e)}function yb(i,e){i.uniform2uiv(this.addr,e)}function bb(i,e){i.uniform3uiv(this.addr,e)}function Sb(i,e){i.uniform4uiv(this.addr,e)}function Mb(i,e,t){let n=this.cache,s=e.length,r=kc(t,s);qt(n,r)||(i.uniform1iv(this.addr,r),$t(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Tf:a=ug;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function wb(i,e,t){let n=this.cache,s=e.length,r=kc(t,s);qt(n,r)||(i.uniform1iv(this.addr,r),$t(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||fg,r[a])}function Tb(i,e,t){let n=this.cache,s=e.length,r=kc(t,s);qt(n,r)||(i.uniform1iv(this.addr,r),$t(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||hg,r[a])}function Ab(i,e,t){let n=this.cache,s=e.length,r=kc(t,s);qt(n,r)||(i.uniform1iv(this.addr,r),$t(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||dg,r[a])}function Eb(i){switch(i){case 5126:return lb;case 35664:return cb;case 35665:return ub;case 35666:return db;case 35674:return fb;case 35675:return hb;case 35676:return pb;case 5124:case 35670:return mb;case 35667:case 35671:return gb;case 35668:case 35672:return xb;case 35669:case 35673:return _b;case 5125:return vb;case 36294:return yb;case 36295:return bb;case 36296:return Sb;case 35678:case 36198:case 36298:case 36306:case 35682:return Mb;case 35679:case 36299:case 36307:return wb;case 35680:case 36300:case 36308:case 36293:return Tb;case 36289:case 36303:case 36311:case 36292:return Ab}}var Af=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=ob(t.type)}},Ef=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Eb(t.type)}},Cf=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},Mf=/(\w+)(\])?(\[|\.)?/g;function jm(i,e){i.seq.push(e),i.map[e.id]=e}function Cb(i,e,t){let n=i.name,s=n.length;for(Mf.lastIndex=0;;){let r=Mf.exec(n),a=Mf.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){jm(t,l===void 0?new Af(o,i,e):new Ef(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new Cf(o),jm(t,d)),t=d}}}var qr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);Cb(o,c,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function Zm(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var Rb=37297,Pb=0;function Ib(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var Jm=new Ke;function Lb(i){it._getMatrix(Jm,it.workingColorSpace,i);let e=`mat3( ${Jm.elements.map(t=>t.toFixed(4))} )`;switch(it.getTransfer(i)){case Ra:return[e,"LinearTransferOETF"];case _t:return[e,"sRGBTransferOETF"];default:return Ne("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Qm(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Ib(i.getShaderSource(e),o)}else return r}function Db(i,e){let t=Lb(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var Nb={[jd]:"Linear",[Zd]:"Reinhard",[Jd]:"Cineon",[so]:"ACESFilmic",[ef]:"AgX",[tf]:"Neutral",[Qd]:"Custom"};function Ub(i,e){let t=Nb[e];return t===void 0?(Ne("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Dc=new L;function Fb(){it.getLuminanceCoefficients(Dc);let i=Dc.x.toFixed(4),e=Dc.y.toFixed(4),t=Dc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ob(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(go).join(`
`)}function kb(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Bb(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function go(i){return i!==""}function eg(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function tg(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var zb=/^[ \t]*#include +<([\w\d./]+)>/gm;function Rf(i){return i.replace(zb,Vb)}var Gb=new Map;function Vb(i,e){let t=nt[e];if(t===void 0){let n=Gb.get(e);if(n!==void 0)t=nt[n],Ne('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Rf(t)}var Hb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ng(i){return i.replace(Hb,Wb)}function Wb(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ig(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var Xb={[zs]:"SHADOWMAP_TYPE_PCF",[kr]:"SHADOWMAP_TYPE_VSM"};function qb(i){return Xb[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var $b={[us]:"ENVMAP_TYPE_CUBE",[Vs]:"ENVMAP_TYPE_CUBE",[ro]:"ENVMAP_TYPE_CUBE_UV"};function Yb(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":$b[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Kb={[Vs]:"ENVMAP_MODE_REFRACTION"};function jb(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Kb[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Zb={[Kd]:"ENVMAP_BLENDING_MULTIPLY",[gm]:"ENVMAP_BLENDING_MIX",[xm]:"ENVMAP_BLENDING_ADD"};function Jb(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Zb[i.combine]||"ENVMAP_BLENDING_NONE"}function Qb(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function eS(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,c=qb(t),l=Yb(t),u=jb(t),d=Jb(t),f=Qb(t),h=Ob(t),p=kb(r),x=s.createProgram(),m,g,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(go).join(`
`),m.length>0&&(m+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(go).join(`
`),g.length>0&&(g+=`
`)):(m=[ig(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(go).join(`
`),g=[ig(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ni?"#define TONE_MAPPING":"",t.toneMapping!==ni?nt.tonemapping_pars_fragment:"",t.toneMapping!==ni?Ub("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",nt.colorspace_pars_fragment,Db("linearToOutputTexel",t.outputColorSpace),Fb(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(go).join(`
`)),a=Rf(a),a=eg(a,t),a=tg(a,t),o=Rf(o),o=eg(o,t),o=tg(o,t),a=ng(a),o=ng(o),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,g=["#define varying in",t.glslVersion===ff?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ff?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let T=b+m+a,_=b+g+o,M=Zm(s,s.VERTEX_SHADER,T),A=Zm(s,s.FRAGMENT_SHADER,_);s.attachShader(x,M),s.attachShader(x,A),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function R(D){if(i.debug.checkShaderErrors){let F=s.getProgramInfoLog(x)||"",N=s.getShaderInfoLog(M)||"",I=s.getShaderInfoLog(A)||"",U=F.trim(),z=N.trim(),V=I.trim(),Z=!0,q=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(Z=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,M,A);else{let J=Qm(s,M,"vertex"),ie=Qm(s,A,"fragment");We("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+U+`
`+J+`
`+ie)}else U!==""?Ne("WebGLProgram: Program Info Log:",U):(z===""||V==="")&&(q=!1);q&&(D.diagnostics={runnable:Z,programLog:U,vertexShader:{log:z,prefix:m},fragmentShader:{log:V,prefix:g}})}s.deleteShader(M),s.deleteShader(A),v=new qr(s,x),S=Bb(s,x)}let v;this.getUniforms=function(){return v===void 0&&R(this),v};let S;this.getAttributes=function(){return S===void 0&&R(this),S};let C=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=s.getProgramParameter(x,Rb)),C},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Pb++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=M,this.fragmentShader=A,this}var tS=0,Pf=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new If(e),t.set(e,n)),n}},If=class{constructor(e){this.id=tS++,this.code=e,this.usedTimes=0}};function nS(i){return i===fs||i===uo||i===fo}function iS(i,e,t,n,s,r){let a=new Mr,o=new Pf,c=new Set,l=[],u=new Map,d=n.logarithmicDepthBuffer,f=n.precision,h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(v){return c.add(v),v===0?"uv":`uv${v}`}function x(v,S,C,D,F,N){let I=D.fog,U=F.geometry,z=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?D.environment:null,V=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,Z=e.get(v.envMap||z,V),q=Z&&Z.mapping===ro?Z.image.height:null,J=h[v.type];v.precision!==null&&(f=n.getMaxPrecision(v.precision),f!==v.precision&&Ne("WebGLProgram.getParameters:",v.precision,"not supported, using",f,"instead."));let ie=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,Fe=ie!==void 0?ie.length:0,Ee=0;U.morphAttributes.position!==void 0&&(Ee=1),U.morphAttributes.normal!==void 0&&(Ee=2),U.morphAttributes.color!==void 0&&(Ee=3);let ht,at,ut,j;if(J){let Rt=bi[J];ht=Rt.vertexShader,at=Rt.fragmentShader}else{ht=v.vertexShader,at=v.fragmentShader;let Rt=o.getVertexShaderStage(v),gt=o.getFragmentShaderStage(v);o.update(v,Rt,gt),ut=Rt.id,j=gt.id}let te=i.getRenderTarget(),ve=i.state.buffers.depth.getReversed(),Xe=F.isInstancedMesh===!0,we=F.isBatchedMesh===!0,qe=!!v.map,yt=!!v.matcap,ne=!!Z,ae=!!v.aoMap,oe=!!v.lightMap,le=!!v.bumpMap&&v.wireframe===!1,de=!!v.normalMap,Ve=!!v.displacementMap,Ge=!!v.emissiveMap,$e=!!v.metalnessMap,je=!!v.roughnessMap,O=v.anisotropy>0,mt=v.clearcoat>0,ot=v.dispersion>0,P=v.retroreflectivity>0,y=v.iridescence>0,G=v.sheen>0,X=v.transmission>0,Y=O&&!!v.anisotropyMap,ce=mt&&!!v.clearcoatMap,ue=mt&&!!v.clearcoatNormalMap,K=mt&&!!v.clearcoatRoughnessMap,ee=y&&!!v.iridescenceMap,fe=y&&!!v.iridescenceThicknessMap,Oe=G&&!!v.sheenColorMap,xe=G&&!!v.sheenRoughnessMap,he=!!v.specularMap,ke=!!v.specularColorMap,He=!!v.specularIntensityMap,Je=X&&!!v.transmissionMap,B=X&&!!v.thicknessMap,pe=!!v.gradientMap,Q=!!v.alphaMap,me=v.alphaTest>0,Me=!!v.alphaHash,se=!!v.extensions,Be=ni;v.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(Be=i.toneMapping);let Le={shaderID:J,shaderType:v.type,shaderName:v.name,vertexShader:ht,fragmentShader:at,defines:v.defines,customVertexShaderID:ut,customFragmentShaderID:j,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:f,batching:we,batchingColor:we&&F._colorsTexture!==null,instancing:Xe,instancingColor:Xe&&F.instanceColor!==null,instancingMorph:Xe&&F.morphTexture!==null,outputColorSpace:te===null?i.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:it.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:qe,matcap:yt,envMap:ne,envMapMode:ne&&Z.mapping,envMapCubeUVHeight:q,aoMap:ae,lightMap:oe,bumpMap:le,normalMap:de,displacementMap:Ve,emissiveMap:Ge,normalMapObjectSpace:de&&v.normalMapType===bm,normalMapTangentSpace:de&&v.normalMapType===Rc,packedNormalMap:de&&v.normalMapType===Rc&&nS(v.normalMap.format),metalnessMap:$e,roughnessMap:je,anisotropy:O,anisotropyMap:Y,clearcoat:mt,clearcoatMap:ce,clearcoatNormalMap:ue,clearcoatRoughnessMap:K,dispersion:ot,retroreflection:P,iridescence:y,iridescenceMap:ee,iridescenceThicknessMap:fe,sheen:G,sheenColorMap:Oe,sheenRoughnessMap:xe,specularMap:he,specularColorMap:ke,specularIntensityMap:He,transmission:X,transmissionMap:Je,thicknessMap:B,gradientMap:pe,opaque:v.transparent===!1&&v.blending===Br&&v.alphaToCoverage===!1,alphaMap:Q,alphaTest:me,alphaHash:Me,combine:v.combine,mapUv:qe&&p(v.map.channel),aoMapUv:ae&&p(v.aoMap.channel),lightMapUv:oe&&p(v.lightMap.channel),bumpMapUv:le&&p(v.bumpMap.channel),normalMapUv:de&&p(v.normalMap.channel),displacementMapUv:Ve&&p(v.displacementMap.channel),emissiveMapUv:Ge&&p(v.emissiveMap.channel),metalnessMapUv:$e&&p(v.metalnessMap.channel),roughnessMapUv:je&&p(v.roughnessMap.channel),anisotropyMapUv:Y&&p(v.anisotropyMap.channel),clearcoatMapUv:ce&&p(v.clearcoatMap.channel),clearcoatNormalMapUv:ue&&p(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:K&&p(v.clearcoatRoughnessMap.channel),iridescenceMapUv:ee&&p(v.iridescenceMap.channel),iridescenceThicknessMapUv:fe&&p(v.iridescenceThicknessMap.channel),sheenColorMapUv:Oe&&p(v.sheenColorMap.channel),sheenRoughnessMapUv:xe&&p(v.sheenRoughnessMap.channel),specularMapUv:he&&p(v.specularMap.channel),specularColorMapUv:ke&&p(v.specularColorMap.channel),specularIntensityMapUv:He&&p(v.specularIntensityMap.channel),transmissionMapUv:Je&&p(v.transmissionMap.channel),thicknessMapUv:B&&p(v.thicknessMap.channel),alphaMapUv:Q&&p(v.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(de||O),vertexNormals:!!U.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!U.attributes.uv&&(qe||Q),fog:!!I,useFog:v.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||U.attributes.normal===void 0&&de===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ve,skinning:F.isSkinnedMesh===!0,hasPositionAttribute:U.attributes.position!==void 0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:Fe,morphTextureStride:Ee,numSunLights:S.sun.length,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numSunLightShadows:S.sunShadowMap.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:N.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:Be,decodeVideoTexture:qe&&v.map.isVideoTexture===!0&&it.getTransfer(v.map.colorSpace)===_t,decodeVideoTextureEmissive:Ge&&v.emissiveMap.isVideoTexture===!0&&it.getTransfer(v.emissiveMap.colorSpace)===_t,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===rn,flipSided:v.side===hn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:se&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(se&&v.extensions.multiDraw===!0||we)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Le.vertexUv1s=c.has(1),Le.vertexUv2s=c.has(2),Le.vertexUv3s=c.has(3),c.clear(),Le}function m(v){let S=[];if(v.shaderID?S.push(v.shaderID):(S.push(v.customVertexShaderID),S.push(v.customFragmentShaderID)),v.defines!==void 0)for(let C in v.defines)S.push(C),S.push(v.defines[C]);return v.isRawShaderMaterial===!1&&(g(S,v),b(S,v),S.push(i.outputColorSpace)),S.push(v.customProgramCacheKey),S.join()}function g(v,S){v.push(S.precision),v.push(S.outputColorSpace),v.push(S.envMapMode),v.push(S.envMapCubeUVHeight),v.push(S.mapUv),v.push(S.alphaMapUv),v.push(S.lightMapUv),v.push(S.aoMapUv),v.push(S.bumpMapUv),v.push(S.normalMapUv),v.push(S.displacementMapUv),v.push(S.emissiveMapUv),v.push(S.metalnessMapUv),v.push(S.roughnessMapUv),v.push(S.anisotropyMapUv),v.push(S.clearcoatMapUv),v.push(S.clearcoatNormalMapUv),v.push(S.clearcoatRoughnessMapUv),v.push(S.iridescenceMapUv),v.push(S.iridescenceThicknessMapUv),v.push(S.sheenColorMapUv),v.push(S.sheenRoughnessMapUv),v.push(S.specularMapUv),v.push(S.specularColorMapUv),v.push(S.specularIntensityMapUv),v.push(S.transmissionMapUv),v.push(S.thicknessMapUv),v.push(S.combine),v.push(S.fogExp2),v.push(S.sizeAttenuation),v.push(S.morphTargetsCount),v.push(S.morphAttributeCount),v.push(S.numSunLights),v.push(S.numDirLights),v.push(S.numPointLights),v.push(S.numSpotLights),v.push(S.numSpotLightMaps),v.push(S.numHemiLights),v.push(S.numRectAreaLights),v.push(S.numSunLightShadows),v.push(S.numDirLightShadows),v.push(S.numPointLightShadows),v.push(S.numSpotLightShadows),v.push(S.numSpotLightShadowsWithMaps),v.push(S.numLightProbes),v.push(S.shadowMapType),v.push(S.toneMapping),v.push(S.numClippingPlanes),v.push(S.numClipIntersection),v.push(S.depthPacking)}function b(v,S){a.disableAll(),S.instancing&&a.enable(0),S.instancingColor&&a.enable(1),S.instancingMorph&&a.enable(2),S.matcap&&a.enable(3),S.envMap&&a.enable(4),S.normalMapObjectSpace&&a.enable(5),S.normalMapTangentSpace&&a.enable(6),S.clearcoat&&a.enable(7),S.iridescence&&a.enable(8),S.alphaTest&&a.enable(9),S.vertexColors&&a.enable(10),S.vertexAlphas&&a.enable(11),S.vertexUv1s&&a.enable(12),S.vertexUv2s&&a.enable(13),S.vertexUv3s&&a.enable(14),S.vertexTangents&&a.enable(15),S.anisotropy&&a.enable(16),S.alphaHash&&a.enable(17),S.batching&&a.enable(18),S.dispersion&&a.enable(19),S.retroreflection&&a.enable(24),S.batchingColor&&a.enable(20),S.gradientMap&&a.enable(21),S.packedNormalMap&&a.enable(22),S.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),S.numLightProbeGrids>0&&a.enable(22),S.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function T(v){let S=h[v.type],C;if(S){let D=bi[S];C=km.clone(D.uniforms)}else C=v.uniforms;return C}function _(v,S){let C=u.get(S);return C!==void 0?++C.usedTimes:(C=new eS(i,S,v,s),l.push(C),u.set(S,C)),C}function M(v){if(--v.usedTimes===0){let S=l.indexOf(v);l[S]=l[l.length-1],l.pop(),u.delete(v.cacheKey),v.destroy()}}function A(v){o.remove(v)}function R(){o.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:T,acquireProgram:_,releaseProgram:M,releaseShaderCache:A,programs:l,dispose:R}}function sS(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function rS(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function sg(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function rg(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(f){let h=0;return f.isInstancedMesh&&(h+=2),f.isSkinnedMesh&&(h+=1),h}function o(f,h,p,x,m,g){let b=i[e];return b===void 0?(b={id:f.id,object:f,geometry:h,material:p,materialVariant:a(f),groupOrder:x,renderOrder:f.renderOrder,z:m,group:g},i[e]=b):(b.id=f.id,b.object=f,b.geometry=h,b.material=p,b.materialVariant=a(f),b.groupOrder=x,b.renderOrder=f.renderOrder,b.z=m,b.group=g),e++,b}function c(f,h,p,x,m,g,b){b.reversedDepth===!0&&(m=-m);let T=o(f,h,p,x,m,g);p.transmission>0?n.push(T):p.transparent===!0?s.push(T):t.push(T)}function l(f,h,p,x,m,g){let b=o(f,h,p,x,m,g);p.transmission>0?n.unshift(b):p.transparent===!0?s.unshift(b):t.unshift(b)}function u(f,h){t.length>1&&t.sort(f||rS),n.length>1&&n.sort(h||sg),s.length>1&&s.sort(h||sg)}function d(){for(let f=e,h=i.length;f<h;f++){let p=i[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:d,sort:u}}function aS(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new rg,i.set(n,[a])):s>=r.length?(a=new rg,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function oS(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new L,color:new Se};break;case"SpotLight":t={position:new L,direction:new L,color:new Se,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new Se,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new Se,groundColor:new Se};break;case"RectAreaLight":t={color:new Se,position:new L,halfWidth:new L,halfHeight:new L};break}return i[e.id]=t,t}}}function lS(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var cS=0;function uS(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function dS(i){let e=new oS,t=lS(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new L);let s=new L,r=new Ye,a=new Ye;function o(l){let u=0,d=0,f=0;for(let F=0;F<9;F++)n.probe[F].set(0,0,0);let h=0,p=0,x=0,m=0,g=0,b=0,T=0,_=0,M=0,A=0,R=0,v=0,S=0,C=0;l.sort(uS);for(let F=0,N=l.length;F<N;F++){let I=l[F],U=I.color,z=I.intensity,V=I.distance,Z=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===fs?Z=I.shadow.map.texture:Z=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)u+=U.r*z,d+=U.g*z,f+=U.b*z;else if(I.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(I.sh.coefficients[q],z);C++}else if(I.isSunLight){let q=e.get(I);if(q.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let J=I.shadow,ie=t.get(I);ie.shadowIntensity=J.intensity,ie.shadowBias=J.bias,ie.shadowNormalBias=J.normalBias,ie.shadowRadius=J.radius,ie.shadowMapSize.copy(J.mapSize).multiply(J.getFrameExtents()),n.sunShadow[p]=ie,n.sunShadowMap[p]=Z;let Fe=J.getViewportCount();for(let Ee=0;Ee<Fe;Ee++)n.sunShadowMatrix[x+Ee]=J.getMatrix(Ee),n.sunShadowCascade[x+Ee]=J._cascadeData[Ee];x+=Fe,p++}n.sun[h]=q,h++}else if(I.isDirectionalLight){let q=e.get(I);if(q.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let J=I.shadow,ie=t.get(I);ie.shadowIntensity=J.intensity,ie.shadowBias=J.bias,ie.shadowNormalBias=J.normalBias,ie.shadowRadius=J.radius,ie.shadowMapSize=J.mapSize,n.directionalShadow[m]=ie,n.directionalShadowMap[m]=Z,n.directionalShadowMatrix[m]=I.shadow.matrix,M++}n.directional[m]=q,m++}else if(I.isSpotLight){let q=e.get(I);q.position.setFromMatrixPosition(I.matrixWorld),q.color.copy(U).multiplyScalar(z),q.distance=V,q.coneCos=Math.cos(I.angle),q.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),q.decay=I.decay,n.spot[b]=q;let J=I.shadow;if(I.map&&(n.spotLightMap[v]=I.map,v++,J.updateMatrices(I),I.castShadow&&S++),n.spotLightMatrix[b]=J.matrix,I.castShadow){let ie=t.get(I);ie.shadowIntensity=J.intensity,ie.shadowBias=J.bias,ie.shadowNormalBias=J.normalBias,ie.shadowRadius=J.radius,ie.shadowMapSize=J.mapSize,n.spotShadow[b]=ie,n.spotShadowMap[b]=Z,R++}b++}else if(I.isRectAreaLight){let q=e.get(I);q.color.copy(U).multiplyScalar(z),q.halfWidth.set(I.width*.5,0,0),q.halfHeight.set(0,I.height*.5,0),n.rectArea[T]=q,T++}else if(I.isPointLight){let q=e.get(I);if(q.color.copy(I.color).multiplyScalar(I.intensity),q.distance=I.distance,q.decay=I.decay,I.castShadow){let J=I.shadow,ie=t.get(I);ie.shadowIntensity=J.intensity,ie.shadowBias=J.bias,ie.shadowNormalBias=J.normalBias,ie.shadowRadius=J.radius,ie.shadowMapSize=J.mapSize,ie.shadowCameraNear=J.camera.near,ie.shadowCameraFar=J.camera.far,n.pointShadow[g]=ie,n.pointShadowMap[g]=Z,n.pointShadowMatrix[g]=I.shadow.matrix,A++}n.point[g]=q,g++}else if(I.isHemisphereLight){let q=e.get(I);q.skyColor.copy(I.color).multiplyScalar(z),q.groundColor.copy(I.groundColor).multiplyScalar(z),n.hemi[_]=q,_++}}T>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=_e.LTC_FLOAT_1,n.rectAreaLTC2=_e.LTC_FLOAT_2):(n.rectAreaLTC1=_e.LTC_HALF_1,n.rectAreaLTC2=_e.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=f;let D=n.hash;(D.sunLength!==h||D.directionalLength!==m||D.pointLength!==g||D.spotLength!==b||D.rectAreaLength!==T||D.hemiLength!==_||D.numSunShadows!==p||D.numDirectionalShadows!==M||D.numPointShadows!==A||D.numSpotShadows!==R||D.numSpotMaps!==v||D.numLightProbes!==C)&&(n.sun.length=h,n.directional.length=m,n.spot.length=b,n.rectArea.length=T,n.point.length=g,n.hemi.length=_,n.sunShadow.length=p,n.sunShadowMap.length=p,n.sunShadowMatrix.length=x,n.sunShadowCascade.length=x,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.directionalShadowMatrix.length=M,n.pointShadow.length=A,n.pointShadowMap.length=A,n.pointShadowMatrix.length=A,n.spotShadow.length=R,n.spotShadowMap.length=R,n.spotLightMatrix.length=R+v-S,n.spotLightMap.length=v,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=C,D.sunLength=h,D.directionalLength=m,D.pointLength=g,D.spotLength=b,D.rectAreaLength=T,D.hemiLength=_,D.numSunShadows=p,D.numDirectionalShadows=M,D.numPointShadows=A,D.numSpotShadows=R,D.numSpotMaps=v,D.numLightProbes=C,n.version=cS++)}function c(l,u){let d=0,f=0,h=0,p=0,x=0,m=0,g=u.matrixWorldInverse;for(let b=0,T=l.length;b<T;b++){let _=l[b];if(_.isSunLight){let M=n.sun[d];M.direction.setFromMatrixPosition(_.matrixWorld),M.direction.transformDirection(g),d++}else if(_.isDirectionalLight){let M=n.directional[f];M.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(g),f++}else if(_.isSpotLight){let M=n.spot[p];M.position.setFromMatrixPosition(_.matrixWorld),M.position.applyMatrix4(g),M.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(g),p++}else if(_.isRectAreaLight){let M=n.rectArea[x];M.position.setFromMatrixPosition(_.matrixWorld),M.position.applyMatrix4(g),a.identity(),r.copy(_.matrixWorld),r.premultiply(g),a.extractRotation(r),M.halfWidth.set(_.width*.5,0,0),M.halfHeight.set(0,_.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),x++}else if(_.isPointLight){let M=n.point[h];M.position.setFromMatrixPosition(_.matrixWorld),M.position.applyMatrix4(g),h++}else if(_.isHemisphereLight){let M=n.hemi[m];M.direction.setFromMatrixPosition(_.matrixWorld),M.direction.transformDirection(g),m++}}}return{setup:o,setupView:c,state:n}}function ag(i){let e=new dS(i),t=[],n=[],s=[];function r(f){d.camera=f,t.length=0,n.length=0,s.length=0}function a(f){t.push(f)}function o(f){n.push(f)}function c(f){s.push(f)}function l(){e.setup(t)}function u(f){e.setupView(t,f)}let d={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:l,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function fS(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new ag(i),e.set(s,[o])):r>=a.length?(o=new ag(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var hS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,pS=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,mS=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],gS=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],og=new Ye,mo=new L,wf=new L;function xS(i,e,t){let n=new Pr,s=new re,r=new re,a=new St,o=new Il,c=new Ll,l={},u=t.maxTextureSize,d={[_i]:hn,[hn]:_i,[rn]:rn},f=new Cn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new re},radius:{value:4}},vertexShader:hS,fragmentShader:pS}),h=f.clone();h.defines.HORIZONTAL_PASS=1;let p=new ft;p.setAttribute("position",new Wt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Ue(p,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=zs;let g=this.type;this.render=function(A,R,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;this.type===Zp&&(Ne("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=zs);let S=i.getRenderTarget(),C=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),F=i.state;F.setBlending(vi),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let N=g!==this.type;N&&R.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(U=>U.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,U=A.length;I<U;I++){let z=A[I],V=z.shadow;if(V===void 0){Ne("WebGLShadowMap:",z,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);let Z=V.getFrameExtents();s.multiply(Z),r.copy(V.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/Z.x),s.x=r.x*Z.x,V.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/Z.y),s.y=r.y*Z.y,V.mapSize.y=r.y));let q=i.state.buffers.depth.getReversed();if(V.camera._reversedDepth=q,V.map===null||N===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===kr){if(z.isPointLight){Ne("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new nn(s.x,s.y,{format:fs,type:ri,minFilter:zt,magFilter:zt,generateMipmaps:!1}),V.map.texture.name=z.name+".shadowMap",V.map.depthTexture=new rs(s.x,s.y,Rn),V.map.depthTexture.name=z.name+".shadowMapDepth",V.map.depthTexture.format=di,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Bt,V.map.depthTexture.magFilter=Bt}else z.isPointLight?(V.map=new Uc(s.x),V.map.depthTexture=new Ml(s.x,si)):(V.map=new nn(s.x,s.y),V.map.depthTexture=new rs(s.x,s.y,si)),V.map.depthTexture.name=z.name+".shadowMap",V.map.depthTexture.format=di,this.type===zs?(V.map.depthTexture.compareFunction=q?Ic:Pc,V.map.depthTexture.minFilter=zt,V.map.depthTexture.magFilter=zt):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Bt,V.map.depthTexture.magFilter=Bt);V.camera.updateProjectionMatrix()}V.map.isWebGLCubeRenderTarget!==!0&&(V.map.width!==s.x||V.map.height!==s.y)&&V.map.setSize(s.x,s.y);let J=V.map.isWebGLCubeRenderTarget?6:V.getViewportCount();z.isPointLight!==!0&&V.updateMatrices(z,v);for(let ie=0;ie<J;ie++){let Fe=V.getCamera(ie);if(z.isPointLight){let Ee=V.camera,ht=V.matrix,at=z.distance||Ee.far;at!==Ee.far&&(Ee.far=at,Ee.updateProjectionMatrix()),mo.setFromMatrixPosition(z.matrixWorld),Ee.position.copy(mo),wf.copy(Ee.position),wf.add(mS[ie]),Ee.up.copy(gS[ie]),Ee.lookAt(wf),Ee.updateMatrixWorld(),ht.makeTranslation(-mo.x,-mo.y,-mo.z),og.multiplyMatrices(Ee.projectionMatrix,Ee.matrixWorldInverse),V._frustum.setFromProjectionMatrix(og,Ee.coordinateSystem,Ee.reversedDepth)}if(V.map.isWebGLCubeRenderTarget)i.setRenderTarget(V.map,ie),i.clear();else{ie===0&&(i.setRenderTarget(V.map),i.clear());let Ee=V.getViewport(ie);a.set(r.x*Ee.x,r.y*Ee.y,r.x*Ee.z,r.y*Ee.w),F.viewport(a)}n=V.getFrustum(ie),_(R,v,Fe,z,this.type)}V.isPointLightShadow!==!0&&this.type===kr&&b(V,v),V.needsUpdate=!1}g=this.type,m.needsUpdate=!1,i.setRenderTarget(S,C,D)};function b(A,R){let v=e.update(x);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,h.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),A.mapPass===null?A.mapPass=new nn(s.x,s.y,{format:fs,type:ri}):(A.mapPass.width!==A.map.width||A.mapPass.height!==A.map.height)&&A.mapPass.setSize(A.map.width,A.map.height),f.uniforms.shadow_pass.value=A.map.depthTexture,f.uniforms.resolution.value.set(A.map.width,A.map.height),f.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(R,null,v,f,x,null),h.uniforms.shadow_pass.value=A.mapPass.texture,h.uniforms.resolution.value.set(A.map.width,A.map.height),h.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(R,null,v,h,x,null)}function T(A,R,v,S){let C=null,D=v.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(D!==void 0)C=D;else if(C=v.isPointLight===!0?c:o,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let F=C.uuid,N=R.uuid,I=l[F];I===void 0&&(I={},l[F]=I);let U=I[N];U===void 0&&(U=C.clone(),I[N]=U,R.addEventListener("dispose",M)),C=U}if(C.visible=R.visible,C.wireframe=R.wireframe,S===kr?C.side=R.shadowSide!==null?R.shadowSide:R.side:C.side=R.shadowSide!==null?R.shadowSide:d[R.side],C.alphaMap=R.alphaMap,C.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,C.map=R.map,C.clipShadows=R.clipShadows,C.clippingPlanes=R.clippingPlanes,C.clipIntersection=R.clipIntersection,C.displacementMap=R.displacementMap,C.displacementScale=R.displacementScale,C.displacementBias=R.displacementBias,C.wireframeLinewidth=R.wireframeLinewidth,C.linewidth=R.linewidth,v.isPointLight===!0&&C.isMeshDistanceMaterial===!0){let F=i.properties.get(C);F.light=v}return C}function _(A,R,v,S,C){if(A.visible===!1)return;if(A.layers.test(R.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&C===kr)&&(!A.frustumCulled||A.intersectsFrustum(n))){A.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,A.matrixWorld);let N=e.update(A),I=A.material;if(Array.isArray(I)){let U=N.groups;for(let z=0,V=U.length;z<V;z++){let Z=U[z],q=I[Z.materialIndex];if(q&&q.visible){let J=T(A,q,S,C);A.onBeforeShadow(i,A,R,v,N,J,Z),i.renderBufferDirect(v,null,N,J,A,Z),A.onAfterShadow(i,A,R,v,N,J,Z)}}}else if(I.visible){let U=T(A,I,S,C);A.onBeforeShadow(i,A,R,v,N,U,null),i.renderBufferDirect(v,null,N,U,A,null),A.onAfterShadow(i,A,R,v,N,U,null)}}let F=A.children;for(let N=0,I=F.length;N<I;N++)_(F[N],R,v,S,C)}function M(A){A.target.removeEventListener("dispose",M);for(let v in l){let S=l[v],C=A.target.uuid;C in S&&(S[C].dispose(),delete S[C])}}}function _S(i,e){function t(){let B=!1,pe=new St,Q=null,me=new St(0,0,0,0);return{setMask:function(Me){Q!==Me&&!B&&(i.colorMask(Me,Me,Me,Me),Q=Me)},setLocked:function(Me){B=Me},setClear:function(Me,se,Be,Le,Rt){Rt===!0&&(Me*=Le,se*=Le,Be*=Le),pe.set(Me,se,Be,Le),me.equals(pe)===!1&&(i.clearColor(Me,se,Be,Le),me.copy(pe))},reset:function(){B=!1,Q=null,me.set(-1,0,0,0)}}}function n(){let B=!1,pe=!1,Q=null,me=null,Me=null;return{setReversed:function(se){if(pe!==se){let Be=e.get("EXT_clip_control");se?Be.clipControlEXT(Be.LOWER_LEFT_EXT,Be.ZERO_TO_ONE_EXT):Be.clipControlEXT(Be.LOWER_LEFT_EXT,Be.NEGATIVE_ONE_TO_ONE_EXT),pe=se;let Le=Me;Me=null,this.setClear(Le)}},getReversed:function(){return pe},setTest:function(se){se?te(i.DEPTH_TEST):ve(i.DEPTH_TEST)},setMask:function(se){Q!==se&&!B&&(i.depthMask(se),Q=se)},setFunc:function(se){if(pe&&(se=Lm[se]),me!==se){switch(se){case dl:i.depthFunc(i.NEVER);break;case fl:i.depthFunc(i.ALWAYS);break;case hl:i.depthFunc(i.LESS);break;case xr:i.depthFunc(i.LEQUAL);break;case pl:i.depthFunc(i.EQUAL);break;case ml:i.depthFunc(i.GEQUAL);break;case gl:i.depthFunc(i.GREATER);break;case xl:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}me=se}},setLocked:function(se){B=se},setClear:function(se){Me!==se&&(Me=se,pe&&(se=1-se),i.clearDepth(se))},reset:function(){B=!1,Q=null,me=null,Me=null,pe=!1}}}function s(){let B=!1,pe=null,Q=null,me=null,Me=null,se=null,Be=null,Le=null,Rt=null;return{setTest:function(gt){B||(gt?te(i.STENCIL_TEST):ve(i.STENCIL_TEST))},setMask:function(gt){pe!==gt&&!B&&(i.stencilMask(gt),pe=gt)},setFunc:function(gt,Hn,ai){(Q!==gt||me!==Hn||Me!==ai)&&(i.stencilFunc(gt,Hn,ai),Q=gt,me=Hn,Me=ai)},setOp:function(gt,Hn,ai){(se!==gt||Be!==Hn||Le!==ai)&&(i.stencilOp(gt,Hn,ai),se=gt,Be=Hn,Le=ai)},setLocked:function(gt){B=gt},setClear:function(gt){Rt!==gt&&(i.clearStencil(gt),Rt=gt)},reset:function(){B=!1,pe=null,Q=null,me=null,Me=null,se=null,Be=null,Le=null,Rt=null}}}let r=new t,a=new n,o=new s,c=new WeakMap,l=new WeakMap,u={},d={},f={},h=new WeakMap,p=[],x=null,m=!1,g=null,b=null,T=null,_=null,M=null,A=null,R=null,v=new Se(0,0,0),S=0,C=!1,D=null,F=null,N=null,I=null,U=null,z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),V=!1,Z=0,q=i.getParameter(i.VERSION);q.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(q)[1]),V=Z>=1):q.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),V=Z>=2);let J=null,ie={},Fe=i.getParameter(i.SCISSOR_BOX),Ee=i.getParameter(i.VIEWPORT),ht=new St().fromArray(Fe),at=new St().fromArray(Ee);function ut(B,pe,Q,me){let Me=new Uint8Array(4),se=i.createTexture();i.bindTexture(B,se),i.texParameteri(B,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(B,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Be=0;Be<Q;Be++)B===i.TEXTURE_3D||B===i.TEXTURE_2D_ARRAY?i.texImage3D(pe,0,i.RGBA,1,1,me,0,i.RGBA,i.UNSIGNED_BYTE,Me):i.texImage2D(pe+Be,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Me);return se}let j={};j[i.TEXTURE_2D]=ut(i.TEXTURE_2D,i.TEXTURE_2D,1),j[i.TEXTURE_CUBE_MAP]=ut(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[i.TEXTURE_2D_ARRAY]=ut(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),j[i.TEXTURE_3D]=ut(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),te(i.DEPTH_TEST),a.setFunc(xr),le(!1),de(Hd),te(i.CULL_FACE),ae(vi);function te(B){u[B]!==!0&&(i.enable(B),u[B]=!0)}function ve(B){u[B]!==!1&&(i.disable(B),u[B]=!1)}function Xe(B,pe){return f[B]!==pe?(i.bindFramebuffer(B,pe),f[B]=pe,B===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=pe),B===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=pe),!0):!1}function we(B,pe){let Q=p,me=!1;if(B){Q=h.get(pe),Q===void 0&&(Q=[],h.set(pe,Q));let Me=B.textures;if(Q.length!==Me.length||Q[0]!==i.COLOR_ATTACHMENT0){for(let se=0,Be=Me.length;se<Be;se++)Q[se]=i.COLOR_ATTACHMENT0+se;Q.length=Me.length,me=!0}}else Q[0]!==i.BACK&&(Q[0]=i.BACK,me=!0);me&&i.drawBuffers(Q)}function qe(B){return x!==B?(i.useProgram(B),x=B,!0):!1}let yt={[Gs]:i.FUNC_ADD,[Qp]:i.FUNC_SUBTRACT,[em]:i.FUNC_REVERSE_SUBTRACT};yt[tm]=i.MIN,yt[nm]=i.MAX;let ne={[im]:i.ZERO,[sm]:i.ONE,[rm]:i.SRC_COLOR,[$d]:i.SRC_ALPHA,[dm]:i.SRC_ALPHA_SATURATE,[cm]:i.DST_COLOR,[om]:i.DST_ALPHA,[am]:i.ONE_MINUS_SRC_COLOR,[Yd]:i.ONE_MINUS_SRC_ALPHA,[um]:i.ONE_MINUS_DST_COLOR,[lm]:i.ONE_MINUS_DST_ALPHA,[fm]:i.CONSTANT_COLOR,[hm]:i.ONE_MINUS_CONSTANT_COLOR,[pm]:i.CONSTANT_ALPHA,[mm]:i.ONE_MINUS_CONSTANT_ALPHA};function ae(B,pe,Q,me,Me,se,Be,Le,Rt,gt){if(B===vi){m===!0&&(ve(i.BLEND),m=!1);return}if(m===!1&&(te(i.BLEND),m=!0),B!==Jp){if(B!==g||gt!==C){if((b!==Gs||M!==Gs)&&(i.blendEquation(i.FUNC_ADD),b=Gs,M=Gs),gt)switch(B){case Br:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Wd:i.blendFunc(i.ONE,i.ONE);break;case Xd:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case qd:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:We("WebGLState: Invalid blending: ",B);break}else switch(B){case Br:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Wd:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Xd:We("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case qd:We("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:We("WebGLState: Invalid blending: ",B);break}T=null,_=null,A=null,R=null,v.set(0,0,0),S=0,g=B,C=gt}return}Me=Me||pe,se=se||Q,Be=Be||me,(pe!==b||Me!==M)&&(i.blendEquationSeparate(yt[pe],yt[Me]),b=pe,M=Me),(Q!==T||me!==_||se!==A||Be!==R)&&(i.blendFuncSeparate(ne[Q],ne[me],ne[se],ne[Be]),T=Q,_=me,A=se,R=Be),(Le.equals(v)===!1||Rt!==S)&&(i.blendColor(Le.r,Le.g,Le.b,Rt),v.copy(Le),S=Rt),g=B,C=!1}function oe(B,pe){B.side===rn?ve(i.CULL_FACE):te(i.CULL_FACE);let Q=B.side===hn;pe&&(Q=!Q),le(Q),B.blending===Br&&B.transparent===!1?ae(vi):ae(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),a.setFunc(B.depthFunc),a.setTest(B.depthTest),a.setMask(B.depthWrite),r.setMask(B.colorWrite);let me=B.stencilWrite;o.setTest(me),me&&(o.setMask(B.stencilWriteMask),o.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),o.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),Ge(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?te(i.SAMPLE_ALPHA_TO_COVERAGE):ve(i.SAMPLE_ALPHA_TO_COVERAGE)}function le(B){D!==B&&(B?i.frontFace(i.CW):i.frontFace(i.CCW),D=B)}function de(B){B!==Kp?(te(i.CULL_FACE),B!==F&&(B===Hd?i.cullFace(i.BACK):B===jp?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ve(i.CULL_FACE),F=B}function Ve(B){B!==N&&(V&&i.lineWidth(B),N=B)}function Ge(B,pe,Q){B?(te(i.POLYGON_OFFSET_FILL),(I!==pe||U!==Q)&&(I=pe,U=Q,a.getReversed()&&(pe=-pe),i.polygonOffset(pe,Q))):ve(i.POLYGON_OFFSET_FILL)}function $e(B){B?te(i.SCISSOR_TEST):ve(i.SCISSOR_TEST)}function je(B){B===void 0&&(B=i.TEXTURE0+z-1),J!==B&&(i.activeTexture(B),J=B)}function O(B,pe,Q){Q===void 0&&(J===null?Q=i.TEXTURE0+z-1:Q=J);let me=ie[Q];me===void 0&&(me={type:void 0,texture:void 0},ie[Q]=me),(me.type!==B||me.texture!==pe)&&(J!==Q&&(i.activeTexture(Q),J=Q),i.bindTexture(B,pe||j[B]),me.type=B,me.texture=pe)}function mt(){let B=ie[J];B!==void 0&&B.type!==void 0&&(i.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function ot(){try{i.compressedTexImage2D(...arguments)}catch(B){We("WebGLState:",B)}}function P(){try{i.compressedTexImage3D(...arguments)}catch(B){We("WebGLState:",B)}}function y(){try{i.texSubImage2D(...arguments)}catch(B){We("WebGLState:",B)}}function G(){try{i.texSubImage3D(...arguments)}catch(B){We("WebGLState:",B)}}function X(){try{i.compressedTexSubImage2D(...arguments)}catch(B){We("WebGLState:",B)}}function Y(){try{i.compressedTexSubImage3D(...arguments)}catch(B){We("WebGLState:",B)}}function ce(){try{i.texStorage2D(...arguments)}catch(B){We("WebGLState:",B)}}function ue(){try{i.texStorage3D(...arguments)}catch(B){We("WebGLState:",B)}}function K(){try{i.texImage2D(...arguments)}catch(B){We("WebGLState:",B)}}function ee(){try{i.texImage3D(...arguments)}catch(B){We("WebGLState:",B)}}function fe(B){return d[B]!==void 0?d[B]:i.getParameter(B)}function Oe(B,pe){d[B]!==pe&&(i.pixelStorei(B,pe),d[B]=pe)}function xe(B){ht.equals(B)===!1&&(i.scissor(B.x,B.y,B.z,B.w),ht.copy(B))}function he(B){at.equals(B)===!1&&(i.viewport(B.x,B.y,B.z,B.w),at.copy(B))}function ke(B,pe){let Q=l.get(pe);Q===void 0&&(Q=new WeakMap,l.set(pe,Q));let me=Q.get(B);me===void 0&&(me=i.getUniformBlockIndex(pe,B.name),Q.set(B,me))}function He(B,pe){let me=l.get(pe).get(B);c.get(pe)!==me&&(i.uniformBlockBinding(pe,me,B.__bindingPointIndex),c.set(pe,me))}function Je(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},d={},J=null,ie={},f={},h=new WeakMap,p=[],x=null,m=!1,g=null,b=null,T=null,_=null,M=null,A=null,R=null,v=new Se(0,0,0),S=0,C=!1,D=null,F=null,N=null,I=null,U=null,ht.set(0,0,i.canvas.width,i.canvas.height),at.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:te,disable:ve,bindFramebuffer:Xe,drawBuffers:we,useProgram:qe,setBlending:ae,setMaterial:oe,setFlipSided:le,setCullFace:de,setLineWidth:Ve,setPolygonOffset:Ge,setScissorTest:$e,activeTexture:je,bindTexture:O,unbindTexture:mt,compressedTexImage2D:ot,compressedTexImage3D:P,texImage2D:K,texImage3D:ee,pixelStorei:Oe,getParameter:fe,updateUBOMapping:ke,uniformBlockBinding:He,texStorage2D:ce,texStorage3D:ue,texSubImage2D:y,texSubImage3D:G,compressedTexSubImage2D:X,compressedTexSubImage3D:Y,scissor:xe,viewport:he,reset:Je}}function vS(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new re,u=new WeakMap,d=new Set,f,h=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(P,y){return p?new OffscreenCanvas(P,y):yr("canvas")}function m(P,y,G){let X=1,Y=ot(P);if((Y.width>G||Y.height>G)&&(X=G/Math.max(Y.width,Y.height)),X<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){let ce=Math.floor(X*Y.width),ue=Math.floor(X*Y.height);f===void 0&&(f=x(ce,ue));let K=y?x(ce,ue):f;return K.width=ce,K.height=ue,K.getContext("2d").drawImage(P,0,0,ce,ue),Ne("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+ce+"x"+ue+")."),K}else return"data"in P&&Ne("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),P;return P}function g(P){return P.generateMipmaps}function b(P){i.generateMipmap(P)}function T(P){return P.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?i.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(P,y,G,X,Y,ce=!1){if(P!==null){if(i[P]!==void 0)return i[P];Ne("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let ue;X&&(ue=e.get("EXT_texture_norm16"),ue||Ne("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let K=y;if(y===i.RED&&(G===i.FLOAT&&(K=i.R32F),G===i.HALF_FLOAT&&(K=i.R16F),G===i.UNSIGNED_BYTE&&(K=i.R8),G===i.UNSIGNED_SHORT&&ue&&(K=ue.R16_EXT),G===i.SHORT&&ue&&(K=ue.R16_SNORM_EXT)),y===i.RED_INTEGER&&(G===i.UNSIGNED_BYTE&&(K=i.R8UI),G===i.UNSIGNED_SHORT&&(K=i.R16UI),G===i.UNSIGNED_INT&&(K=i.R32UI),G===i.BYTE&&(K=i.R8I),G===i.SHORT&&(K=i.R16I),G===i.INT&&(K=i.R32I)),y===i.RG&&(G===i.FLOAT&&(K=i.RG32F),G===i.HALF_FLOAT&&(K=i.RG16F),G===i.UNSIGNED_BYTE&&(K=i.RG8),G===i.UNSIGNED_SHORT&&ue&&(K=ue.RG16_EXT),G===i.SHORT&&ue&&(K=ue.RG16_SNORM_EXT)),y===i.RG_INTEGER&&(G===i.UNSIGNED_BYTE&&(K=i.RG8UI),G===i.UNSIGNED_SHORT&&(K=i.RG16UI),G===i.UNSIGNED_INT&&(K=i.RG32UI),G===i.BYTE&&(K=i.RG8I),G===i.SHORT&&(K=i.RG16I),G===i.INT&&(K=i.RG32I)),y===i.RGB_INTEGER&&(G===i.UNSIGNED_BYTE&&(K=i.RGB8UI),G===i.UNSIGNED_SHORT&&(K=i.RGB16UI),G===i.UNSIGNED_INT&&(K=i.RGB32UI),G===i.BYTE&&(K=i.RGB8I),G===i.SHORT&&(K=i.RGB16I),G===i.INT&&(K=i.RGB32I)),y===i.RGBA_INTEGER&&(G===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),G===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),G===i.UNSIGNED_INT&&(K=i.RGBA32UI),G===i.BYTE&&(K=i.RGBA8I),G===i.SHORT&&(K=i.RGBA16I),G===i.INT&&(K=i.RGBA32I)),y===i.RGB&&(G===i.UNSIGNED_SHORT&&ue&&(K=ue.RGB16_EXT),G===i.SHORT&&ue&&(K=ue.RGB16_SNORM_EXT),G===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),G===i.UNSIGNED_INT_10F_11F_11F_REV&&(K=i.R11F_G11F_B10F)),y===i.RGBA){let ee=ce?Ra:it.getTransfer(Y);G===i.FLOAT&&(K=i.RGBA32F),G===i.HALF_FLOAT&&(K=i.RGBA16F),G===i.UNSIGNED_BYTE&&(K=ee===_t?i.SRGB8_ALPHA8:i.RGBA8),G===i.UNSIGNED_SHORT&&ue&&(K=ue.RGBA16_EXT),G===i.SHORT&&ue&&(K=ue.RGBA16_SNORM_EXT),G===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),G===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function M(P,y){let G;return P?y===null||y===si||y===Vr?G=i.DEPTH24_STENCIL8:y===Rn?G=i.DEPTH32F_STENCIL8:y===Gr&&(G=i.DEPTH24_STENCIL8,Ne("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===si||y===Vr?G=i.DEPTH_COMPONENT24:y===Rn?G=i.DEPTH_COMPONENT32F:y===Gr&&(G=i.DEPTH_COMPONENT16),G}function A(P,y){return g(P)===!0||P.isFramebufferTexture&&P.minFilter!==Bt&&P.minFilter!==zt?Math.log2(Math.max(y.width,y.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?y.mipmaps.length:1}function R(P){let y=P.target;y.removeEventListener("dispose",R),S(y),y.isVideoTexture&&u.delete(y),y.isHTMLTexture&&d.delete(y)}function v(P){let y=P.target;y.removeEventListener("dispose",v),D(y)}function S(P){let y=n.get(P);if(y.__webglInit===void 0)return;let G=P.source,X=h.get(G);if(X){let Y=X[y.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&C(P),Object.keys(X).length===0&&h.delete(G)}n.remove(P)}function C(P){let y=n.get(P);i.deleteTexture(y.__webglTexture);let G=P.source,X=h.get(G);delete X[y.__cacheKey],a.memory.textures--}function D(P){let y=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(y.__webglFramebuffer[X]))for(let Y=0;Y<y.__webglFramebuffer[X].length;Y++)i.deleteFramebuffer(y.__webglFramebuffer[X][Y]);else i.deleteFramebuffer(y.__webglFramebuffer[X]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[X])}else{if(Array.isArray(y.__webglFramebuffer))for(let X=0;X<y.__webglFramebuffer.length;X++)i.deleteFramebuffer(y.__webglFramebuffer[X]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let X=0;X<y.__webglColorRenderbuffer.length;X++)y.__webglColorRenderbuffer[X]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[X]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let G=P.textures;for(let X=0,Y=G.length;X<Y;X++){let ce=n.get(G[X]);ce.__webglTexture&&(i.deleteTexture(ce.__webglTexture),a.memory.textures--),n.remove(G[X])}n.remove(P)}let F=0;function N(){F=0}function I(){return F}function U(P){F=P}function z(){let P=F;return P>=s.maxTextures&&Ne("WebGLTextures: Trying to use "+(P+1)+" texture units while this GPU supports only "+s.maxTextures),F+=1,P}function V(P){let y=[];return y.push(P.wrapS),y.push(P.wrapT),y.push(P.wrapR||0),y.push(P.magFilter),y.push(P.minFilter),y.push(P.anisotropy),y.push(P.internalFormat),y.push(P.format),y.push(P.type),y.push(P.generateMipmaps),y.push(P.premultiplyAlpha),y.push(P.flipY),y.push(P.unpackAlignment),y.push(P.colorSpace),y.join()}function Z(P,y){let G=n.get(P);if(P.isVideoTexture&&O(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&G.__version!==P.version){let X=P.image;if(X===null)Ne("WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)Ne("WebGLRenderer: Texture marked for update but image is incomplete");else{ve(G,P,y);return}}else P.isExternalTexture&&(G.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,G.__webglTexture,i.TEXTURE0+y)}function q(P,y){let G=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&G.__version!==P.version){ve(G,P,y);return}else P.isExternalTexture&&(G.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,G.__webglTexture,i.TEXTURE0+y)}function J(P,y){let G=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&G.__version!==P.version){ve(G,P,y);return}t.bindTexture(i.TEXTURE_3D,G.__webglTexture,i.TEXTURE0+y)}function ie(P,y){let G=n.get(P);if(P.isCubeDepthTexture!==!0&&P.version>0&&G.__version!==P.version){Xe(G,P,y);return}t.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture,i.TEXTURE0+y)}let Fe={[is]:i.REPEAT,[Fn]:i.CLAMP_TO_EDGE,[_r]:i.MIRRORED_REPEAT},Ee={[Bt]:i.NEAREST,[Xl]:i.NEAREST_MIPMAP_NEAREST,[Hs]:i.NEAREST_MIPMAP_LINEAR,[zt]:i.LINEAR,[zr]:i.LINEAR_MIPMAP_NEAREST,[ii]:i.LINEAR_MIPMAP_LINEAR},ht={[Mm]:i.NEVER,[Cm]:i.ALWAYS,[wm]:i.LESS,[Pc]:i.LEQUAL,[Tm]:i.EQUAL,[Ic]:i.GEQUAL,[Am]:i.GREATER,[Em]:i.NOTEQUAL};function at(P,y){if(y.type===Rn&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===zt||y.magFilter===zr||y.magFilter===Hs||y.magFilter===ii||y.minFilter===zt||y.minFilter===zr||y.minFilter===Hs||y.minFilter===ii)&&Ne("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(P,i.TEXTURE_WRAP_S,Fe[y.wrapS]),i.texParameteri(P,i.TEXTURE_WRAP_T,Fe[y.wrapT]),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,Fe[y.wrapR]),i.texParameteri(P,i.TEXTURE_MAG_FILTER,Ee[y.magFilter]),i.texParameteri(P,i.TEXTURE_MIN_FILTER,Ee[y.minFilter]),y.compareFunction&&(i.texParameteri(P,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(P,i.TEXTURE_COMPARE_FUNC,ht[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Bt||y.minFilter!==Hs&&y.minFilter!==ii||y.type===Rn&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){let G=e.get("EXT_texture_filter_anisotropic");i.texParameterf(P,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function ut(P,y){let G=!1;P.__webglInit===void 0&&(P.__webglInit=!0,y.addEventListener("dispose",R));let X=y.source,Y=h.get(X);Y===void 0&&(Y={},h.set(X,Y));let ce=V(y);if(ce!==P.__cacheKey){Y[ce]===void 0&&(Y[ce]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,G=!0),Y[ce].usedTimes++;let ue=Y[P.__cacheKey];ue!==void 0&&(Y[P.__cacheKey].usedTimes--,ue.usedTimes===0&&C(y)),P.__cacheKey=ce,P.__webglTexture=Y[ce].texture}return G}function j(P,y,G){return Math.floor(Math.floor(P/G)/y)}function te(P,y,G,X){let ce=P.updateRanges;if(ce.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,y.width,y.height,G,X,y.data);else{ce.sort((Oe,xe)=>Oe.start-xe.start);let ue=0;for(let Oe=1;Oe<ce.length;Oe++){let xe=ce[ue],he=ce[Oe],ke=xe.start+xe.count,He=j(he.start,y.width,4),Je=j(xe.start,y.width,4);he.start<=ke+1&&He===Je&&j(he.start+he.count-1,y.width,4)===He?xe.count=Math.max(xe.count,he.start+he.count-xe.start):(++ue,ce[ue]=he)}ce.length=ue+1;let K=t.getParameter(i.UNPACK_ROW_LENGTH),ee=t.getParameter(i.UNPACK_SKIP_PIXELS),fe=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,y.width);for(let Oe=0,xe=ce.length;Oe<xe;Oe++){let he=ce[Oe],ke=Math.floor(he.start/4),He=Math.ceil(he.count/4),Je=ke%y.width,B=Math.floor(ke/y.width),pe=He,Q=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Je),t.pixelStorei(i.UNPACK_SKIP_ROWS,B),t.texSubImage2D(i.TEXTURE_2D,0,Je,B,pe,Q,G,X,y.data)}P.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,K),t.pixelStorei(i.UNPACK_SKIP_PIXELS,ee),t.pixelStorei(i.UNPACK_SKIP_ROWS,fe)}}function ve(P,y,G){let X=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(X=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(X=i.TEXTURE_3D);let Y=ut(P,y),ce=y.source;t.bindTexture(X,P.__webglTexture,i.TEXTURE0+G);let ue=n.get(ce);if(ce.version!==ue.__version||Y===!0){if(t.activeTexture(i.TEXTURE0+G),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){let Q=it.getPrimaries(it.workingColorSpace),me=y.colorSpace===Vi?null:it.getPrimaries(y.colorSpace),Me=y.colorSpace===Vi||Q===me?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me)}t.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment);let ee=m(y.image,!1,s.maxTextureSize);ee=mt(y,ee);let fe=r.convert(y.format,y.colorSpace),Oe=r.convert(y.type),xe=_(y.internalFormat,fe,Oe,y.normalized,y.colorSpace,y.isVideoTexture);at(X,y);let he,ke=y.mipmaps,He=y.isVideoTexture!==!0,Je=ue.__version===void 0||Y===!0,B=ce.dataReady,pe=A(y,ee);if(y.isDepthTexture)xe=M(y.format===ds,y.type),Je&&(He?t.texStorage2D(i.TEXTURE_2D,1,xe,ee.width,ee.height):t.texImage2D(i.TEXTURE_2D,0,xe,ee.width,ee.height,0,fe,Oe,null));else if(y.isDataTexture)if(ke.length>0){He&&Je&&t.texStorage2D(i.TEXTURE_2D,pe,xe,ke[0].width,ke[0].height);for(let Q=0,me=ke.length;Q<me;Q++)he=ke[Q],He?B&&t.texSubImage2D(i.TEXTURE_2D,Q,0,0,he.width,he.height,fe,Oe,he.data):t.texImage2D(i.TEXTURE_2D,Q,xe,he.width,he.height,0,fe,Oe,he.data);y.generateMipmaps=!1}else He?(Je&&t.texStorage2D(i.TEXTURE_2D,pe,xe,ee.width,ee.height),B&&te(y,ee,fe,Oe)):t.texImage2D(i.TEXTURE_2D,0,xe,ee.width,ee.height,0,fe,Oe,ee.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){He&&Je&&t.texStorage3D(i.TEXTURE_2D_ARRAY,pe,xe,ke[0].width,ke[0].height,ee.depth);for(let Q=0,me=ke.length;Q<me;Q++)if(he=ke[Q],y.format!==Pn)if(fe!==null)if(He){if(B)if(y.layerUpdates.size>0){let Me=_f(he.width,he.height,y.format,y.type);for(let se of y.layerUpdates){let Be=he.data.subarray(se*Me/he.data.BYTES_PER_ELEMENT,(se+1)*Me/he.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,se,he.width,he.height,1,fe,Be)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,0,he.width,he.height,ee.depth,fe,he.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Q,xe,he.width,he.height,ee.depth,0,he.data,0,0);else Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else He?B&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,0,he.width,he.height,ee.depth,fe,Oe,he.data):t.texImage3D(i.TEXTURE_2D_ARRAY,Q,xe,he.width,he.height,ee.depth,0,fe,Oe,he.data);y.layerUpdates.size>0&&y.clearLayerUpdates()}else{He&&Je&&t.texStorage2D(i.TEXTURE_2D,pe,xe,ke[0].width,ke[0].height);for(let Q=0,me=ke.length;Q<me;Q++)he=ke[Q],y.format!==Pn?fe!==null?He?B&&t.compressedTexSubImage2D(i.TEXTURE_2D,Q,0,0,he.width,he.height,fe,he.data):t.compressedTexImage2D(i.TEXTURE_2D,Q,xe,he.width,he.height,0,he.data):Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):He?B&&t.texSubImage2D(i.TEXTURE_2D,Q,0,0,he.width,he.height,fe,Oe,he.data):t.texImage2D(i.TEXTURE_2D,Q,xe,he.width,he.height,0,fe,Oe,he.data)}else if(y.isDataArrayTexture)if(He){if(Je&&t.texStorage3D(i.TEXTURE_2D_ARRAY,pe,xe,ee.width,ee.height,ee.depth),B)if(y.layerUpdates.size>0){let Q=_f(ee.width,ee.height,y.format,y.type);for(let me of y.layerUpdates){let Me=ee.data.subarray(me*Q/ee.data.BYTES_PER_ELEMENT,(me+1)*Q/ee.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,me,ee.width,ee.height,1,fe,Oe,Me)}y.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,fe,Oe,ee.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,xe,ee.width,ee.height,ee.depth,0,fe,Oe,ee.data);else if(y.isData3DTexture)He?(Je&&t.texStorage3D(i.TEXTURE_3D,pe,xe,ee.width,ee.height,ee.depth),B&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,fe,Oe,ee.data)):t.texImage3D(i.TEXTURE_3D,0,xe,ee.width,ee.height,ee.depth,0,fe,Oe,ee.data);else if(y.isFramebufferTexture){if(Je)if(He)t.texStorage2D(i.TEXTURE_2D,pe,xe,ee.width,ee.height);else{let Q=ee.width,me=ee.height;for(let Me=0;Me<pe;Me++)t.texImage2D(i.TEXTURE_2D,Me,xe,Q,me,0,fe,Oe,null),Q>>=1,me>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in i){let Q=i.canvas;if(Q.hasAttribute("layoutsubtree")||Q.setAttribute("layoutsubtree","true"),ee.parentNode!==Q){Q.appendChild(ee),d.add(y),Q.onpaint=me=>{let Me=me.changedElements;for(let se of d)Me.includes(se.image)&&(se.needsUpdate=!0)},Q.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ee);else{let Me=i.RGBA,se=i.RGBA,Be=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Me,se,Be,ee)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(ke.length>0){if(He&&Je){let Q=ot(ke[0]);t.texStorage2D(i.TEXTURE_2D,pe,xe,Q.width,Q.height)}for(let Q=0,me=ke.length;Q<me;Q++)he=ke[Q],He?B&&t.texSubImage2D(i.TEXTURE_2D,Q,0,0,fe,Oe,he):t.texImage2D(i.TEXTURE_2D,Q,xe,fe,Oe,he);y.generateMipmaps=!1}else if(He){if(Je){let Q=ot(ee);t.texStorage2D(i.TEXTURE_2D,pe,xe,Q.width,Q.height)}B&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,fe,Oe,ee)}else t.texImage2D(i.TEXTURE_2D,0,xe,fe,Oe,ee);g(y)&&b(X),ue.__version=ce.version,y.onUpdate&&y.onUpdate(y)}P.__version=y.version}function Xe(P,y,G){if(y.image.length!==6)return;let X=ut(P,y),Y=y.source;t.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+G);let ce=n.get(Y);if(Y.version!==ce.__version||X===!0){t.activeTexture(i.TEXTURE0+G);let ue=it.getPrimaries(it.workingColorSpace),K=y.colorSpace===Vi?null:it.getPrimaries(y.colorSpace),ee=y.colorSpace===Vi||ue===K?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ee);let fe=y.isCompressedTexture||y.image[0].isCompressedTexture,Oe=y.image[0]&&y.image[0].isDataTexture,xe=[];for(let se=0;se<6;se++)!fe&&!Oe?xe[se]=m(y.image[se],!0,s.maxCubemapSize):xe[se]=Oe?y.image[se].image:y.image[se],xe[se]=mt(y,xe[se]);let he=xe[0],ke=r.convert(y.format,y.colorSpace),He=r.convert(y.type),Je=_(y.internalFormat,ke,He,y.normalized,y.colorSpace),B=y.isVideoTexture!==!0,pe=ce.__version===void 0||X===!0,Q=Y.dataReady,me=A(y,he);at(i.TEXTURE_CUBE_MAP,y);let Me;if(fe){B&&pe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,me,Je,he.width,he.height);for(let se=0;se<6;se++){Me=xe[se].mipmaps;for(let Be=0;Be<Me.length;Be++){let Le=Me[Be];y.format!==Pn?ke!==null?B?Q&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Be,0,0,Le.width,Le.height,ke,Le.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Be,Je,Le.width,Le.height,0,Le.data):Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):B?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Be,0,0,Le.width,Le.height,ke,He,Le.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Be,Je,Le.width,Le.height,0,ke,He,Le.data)}}}else{if(Me=y.mipmaps,B&&pe){Me.length>0&&me++;let se=ot(xe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,me,Je,se.width,se.height)}for(let se=0;se<6;se++)if(Oe){B?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,xe[se].width,xe[se].height,ke,He,xe[se].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,Je,xe[se].width,xe[se].height,0,ke,He,xe[se].data);for(let Be=0;Be<Me.length;Be++){let Rt=Me[Be].image[se].image;B?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Be+1,0,0,Rt.width,Rt.height,ke,He,Rt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Be+1,Je,Rt.width,Rt.height,0,ke,He,Rt.data)}}else{B?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,ke,He,xe[se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,Je,ke,He,xe[se]);for(let Be=0;Be<Me.length;Be++){let Le=Me[Be];B?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Be+1,0,0,ke,He,Le.image[se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Be+1,Je,ke,He,Le.image[se])}}}g(y)&&b(i.TEXTURE_CUBE_MAP),ce.__version=Y.version,y.onUpdate&&y.onUpdate(y)}P.__version=y.version}function we(P,y,G,X,Y,ce){let ue=r.convert(G.format,G.colorSpace),K=r.convert(G.type),ee=_(G.internalFormat,ue,K,G.normalized,G.colorSpace),fe=n.get(y),Oe=n.get(G);if(Oe.__renderTarget=y,!fe.__hasExternalTextures){let xe=Math.max(1,y.width>>ce),he=Math.max(1,y.height>>ce);Y===i.TEXTURE_3D||Y===i.TEXTURE_2D_ARRAY?t.texImage3D(Y,ce,ee,xe,he,y.depth,0,ue,K,null):t.texImage2D(Y,ce,ee,xe,he,0,ue,K,null)}t.bindFramebuffer(i.FRAMEBUFFER,P),je(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,X,Y,Oe.__webglTexture,0,$e(y)):(Y===i.TEXTURE_2D||Y>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,X,Y,Oe.__webglTexture,ce),t.bindFramebuffer(i.FRAMEBUFFER,null)}function qe(P,y,G){if(i.bindRenderbuffer(i.RENDERBUFFER,P),y.depthBuffer){let X=y.depthTexture,Y=X&&X.isDepthTexture?X.type:null,ce=M(y.stencilBuffer,Y),ue=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;je(y)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,$e(y),ce,y.width,y.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,$e(y),ce,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,ce,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ue,i.RENDERBUFFER,P)}else{let X=y.textures;for(let Y=0;Y<X.length;Y++){let ce=X[Y],ue=r.convert(ce.format,ce.colorSpace),K=r.convert(ce.type),ee=_(ce.internalFormat,ue,K,ce.normalized,ce.colorSpace);je(y)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,$e(y),ee,y.width,y.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,$e(y),ee,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,ee,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function yt(P,y,G){let X=y.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,P),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Y=n.get(y.depthTexture);if(Y.__renderTarget=y,(!Y.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),X){if(Y.__webglInit===void 0&&(Y.__webglInit=!0,y.depthTexture.addEventListener("dispose",R)),Y.__webglTexture===void 0){Y.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),at(i.TEXTURE_CUBE_MAP,y.depthTexture);let fe=r.convert(y.depthTexture.format),Oe=r.convert(y.depthTexture.type),xe;y.depthTexture.format===di?xe=i.DEPTH_COMPONENT24:y.depthTexture.format===ds&&(xe=i.DEPTH24_STENCIL8);for(let he=0;he<6;he++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,xe,y.width,y.height,0,fe,Oe,null)}}else Z(y.depthTexture,0);let ce=Y.__webglTexture,ue=$e(y),K=X?i.TEXTURE_CUBE_MAP_POSITIVE_X+G:i.TEXTURE_2D,ee=y.depthTexture.format===ds?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(y.depthTexture.format===di)je(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ee,K,ce,0,ue):i.framebufferTexture2D(i.FRAMEBUFFER,ee,K,ce,0);else if(y.depthTexture.format===ds)je(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ee,K,ce,0,ue):i.framebufferTexture2D(i.FRAMEBUFFER,ee,K,ce,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ne(P){let y=n.get(P),G=P.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==P.depthTexture){let X=P.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),X){let Y=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,X.removeEventListener("dispose",Y)};X.addEventListener("dispose",Y),y.__depthDisposeCallback=Y}y.__boundDepthTexture=X}if(P.depthTexture&&!y.__autoAllocateDepthBuffer)if(G)for(let X=0;X<6;X++)yt(y.__webglFramebuffer[X],P,X);else{let X=P.texture.mipmaps;X&&X.length>0?yt(y.__webglFramebuffer[0],P,0):yt(y.__webglFramebuffer,P,0)}else if(G){y.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[X]),y.__webglDepthbuffer[X]===void 0)y.__webglDepthbuffer[X]=i.createRenderbuffer(),qe(y.__webglDepthbuffer[X],P,!1);else{let Y=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ce=y.__webglDepthbuffer[X];i.bindRenderbuffer(i.RENDERBUFFER,ce),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,ce)}}else{let X=P.texture.mipmaps;if(X&&X.length>0?t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),qe(y.__webglDepthbuffer,P,!1);else{let Y=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ce=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ce),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,ce)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function ae(P,y,G){let X=n.get(P);y!==void 0&&we(X.__webglFramebuffer,P,P.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),G!==void 0&&ne(P)}function oe(P){let y=P.texture,G=n.get(P),X=n.get(y);P.addEventListener("dispose",v);let Y=P.textures,ce=P.isWebGLCubeRenderTarget===!0,ue=Y.length>1;if(ue||(X.__webglTexture===void 0&&(X.__webglTexture=i.createTexture()),X.__version=y.version,a.memory.textures++),ce){G.__webglFramebuffer=[];for(let K=0;K<6;K++)if(y.mipmaps&&y.mipmaps.length>0){G.__webglFramebuffer[K]=[];for(let ee=0;ee<y.mipmaps.length;ee++)G.__webglFramebuffer[K][ee]=i.createFramebuffer()}else G.__webglFramebuffer[K]=i.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){G.__webglFramebuffer=[];for(let K=0;K<y.mipmaps.length;K++)G.__webglFramebuffer[K]=i.createFramebuffer()}else G.__webglFramebuffer=i.createFramebuffer();if(ue)for(let K=0,ee=Y.length;K<ee;K++){let fe=n.get(Y[K]);fe.__webglTexture===void 0&&(fe.__webglTexture=i.createTexture(),a.memory.textures++)}if(P.samples>0&&je(P)===!1){G.__webglMultisampledFramebuffer=i.createFramebuffer(),G.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let K=0;K<Y.length;K++){let ee=Y[K];G.__webglColorRenderbuffer[K]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,G.__webglColorRenderbuffer[K]);let fe=r.convert(ee.format,ee.colorSpace),Oe=r.convert(ee.type),xe=_(ee.internalFormat,fe,Oe,ee.normalized,ee.colorSpace,P.isXRRenderTarget===!0),he=$e(P);i.renderbufferStorageMultisample(i.RENDERBUFFER,he,xe,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+K,i.RENDERBUFFER,G.__webglColorRenderbuffer[K])}i.bindRenderbuffer(i.RENDERBUFFER,null),P.depthBuffer&&(G.__webglDepthRenderbuffer=i.createRenderbuffer(),qe(G.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ce){t.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture),at(i.TEXTURE_CUBE_MAP,y);for(let K=0;K<6;K++)if(y.mipmaps&&y.mipmaps.length>0)for(let ee=0;ee<y.mipmaps.length;ee++)we(G.__webglFramebuffer[K][ee],P,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ee);else we(G.__webglFramebuffer[K],P,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0);g(y)&&b(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ue){for(let K=0,ee=Y.length;K<ee;K++){let fe=Y[K],Oe=n.get(fe),xe=i.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(xe=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(xe,Oe.__webglTexture),at(xe,fe),we(G.__webglFramebuffer,P,fe,i.COLOR_ATTACHMENT0+K,xe,0),g(fe)&&b(xe)}t.unbindTexture()}else{let K=i.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(K=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(K,X.__webglTexture),at(K,y),y.mipmaps&&y.mipmaps.length>0)for(let ee=0;ee<y.mipmaps.length;ee++)we(G.__webglFramebuffer[ee],P,y,i.COLOR_ATTACHMENT0,K,ee);else we(G.__webglFramebuffer,P,y,i.COLOR_ATTACHMENT0,K,0);g(y)&&b(K),t.unbindTexture()}P.depthBuffer&&ne(P)}function le(P){let y=P.textures;for(let G=0,X=y.length;G<X;G++){let Y=y[G];if(g(Y)){let ce=T(P),ue=n.get(Y).__webglTexture;t.bindTexture(ce,ue),b(ce),t.unbindTexture()}}}let de=[],Ve=[];function Ge(P){if(P.samples>0){if(je(P)===!1){let y=P.textures,G=P.width,X=P.height,Y=i.COLOR_BUFFER_BIT,ce=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ue=n.get(P),K=y.length>1;if(K)for(let fe=0;fe<y.length;fe++)t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ue.__webglMultisampledFramebuffer);let ee=P.texture.mipmaps;ee&&ee.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ue.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ue.__webglFramebuffer);for(let fe=0;fe<y.length;fe++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(Y|=i.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(Y|=i.STENCIL_BUFFER_BIT)),K){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ue.__webglColorRenderbuffer[fe]);let Oe=n.get(y[fe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Oe,0)}i.blitFramebuffer(0,0,G,X,0,0,G,X,Y,i.NEAREST),c===!0&&(de.length=0,Ve.length=0,de.push(i.COLOR_ATTACHMENT0+fe),P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&(de.push(ce),Ve.push(ce),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ve)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,de))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),K)for(let fe=0;fe<y.length;fe++){t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.RENDERBUFFER,ue.__webglColorRenderbuffer[fe]);let Oe=n.get(y[fe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.TEXTURE_2D,Oe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ue.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&c){let y=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function $e(P){return Math.min(s.maxSamples,P.samples)}function je(P){let y=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function O(P){let y=a.render.frame;u.get(P)!==y&&(u.set(P,y),P.update())}function mt(P,y){let G=P.colorSpace,X=P.format,Y=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||G!==dn&&G!==Vi&&(it.getTransfer(G)===_t?(X!==Pn||Y!==bn)&&Ne("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):We("WebGLTextures: Unsupported texture color space:",G)),y}function ot(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(l.width=P.naturalWidth||P.width,l.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(l.width=P.displayWidth,l.height=P.displayHeight):(l.width=P.width,l.height=P.height),l}this.allocateTextureUnit=z,this.resetTextureUnits=N,this.getTextureUnits=I,this.setTextureUnits=U,this.setTexture2D=Z,this.setTexture2DArray=q,this.setTexture3D=J,this.setTextureCube=ie,this.rebindTextures=ae,this.setupRenderTarget=oe,this.updateRenderTargetMipmap=le,this.updateMultisampleRenderTarget=Ge,this.setupDepthRenderbuffer=ne,this.setupFrameBufferTexture=we,this.useMultisampledRTT=je,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function yS(i,e){function t(n,s=Vi){let r,a=it.getTransfer(s);if(n===bn)return i.UNSIGNED_BYTE;if(n===$l)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Yl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===af)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===of)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===sf)return i.BYTE;if(n===rf)return i.SHORT;if(n===Gr)return i.UNSIGNED_SHORT;if(n===ql)return i.INT;if(n===si)return i.UNSIGNED_INT;if(n===Rn)return i.FLOAT;if(n===ri)return i.HALF_FLOAT;if(n===lf)return i.ALPHA;if(n===cf)return i.RGB;if(n===Pn)return i.RGBA;if(n===di)return i.DEPTH_COMPONENT;if(n===ds)return i.DEPTH_STENCIL;if(n===Kl)return i.RED;if(n===jl)return i.RED_INTEGER;if(n===fs)return i.RG;if(n===Zl)return i.RG_INTEGER;if(n===Jl)return i.RGBA_INTEGER;if(n===ao||n===oo||n===lo||n===co)if(a===_t)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ao)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===oo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===lo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===co)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ao)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===oo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===lo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===co)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ql||n===ec||n===tc||n===nc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ql)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ec)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===tc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===nc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ic||n===sc||n===rc||n===ac||n===oc||n===uo||n===lc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ic||n===sc)return a===_t?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===rc)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===ac)return r.COMPRESSED_R11_EAC;if(n===oc)return r.COMPRESSED_SIGNED_R11_EAC;if(n===uo)return r.COMPRESSED_RG11_EAC;if(n===lc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===cc||n===uc||n===dc||n===fc||n===hc||n===pc||n===mc||n===gc||n===xc||n===_c||n===vc||n===yc||n===bc||n===Sc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===cc)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===uc)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===dc)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===fc)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===hc)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===pc)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===mc)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===gc)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===xc)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===_c)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===vc)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===yc)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===bc)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Sc)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Mc||n===wc||n===Tc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Mc)return a===_t?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===wc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Tc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ac||n===Ec||n===fo||n===Cc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ac)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ec)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===fo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Cc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Vr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var bS=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,SS=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Lf=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new ka(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Cn({vertexShader:bS,fragmentShader:SS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ue(new ei(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Df=class extends Qn{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,d=null,f=null,h=null,p=null,x=typeof XRWebGLBinding<"u",m=new Lf,g={},b=t.getContextAttributes(),T=null,_=null,M=[],A=[],R=new re,v=null,S=null,C=new jt;C.viewport=new St;let D=new jt;D.viewport=new St;let F=[C,D],N=new Gl,I=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let te=M[j];return te===void 0&&(te=new wr,M[j]=te),te.getTargetRaySpace()},this.getControllerGrip=function(j){let te=M[j];return te===void 0&&(te=new wr,M[j]=te),te.getGripSpace()},this.getHand=function(j){let te=M[j];return te===void 0&&(te=new wr,M[j]=te),te.getHandSpace()};function z(j){let te=A.indexOf(j.inputSource);if(te===-1)return;let ve=M[te];ve!==void 0&&(ve.update(j.inputSource,j.frame,l||a),ve.dispatchEvent({type:j.type,data:j.inputSource}))}function V(){s.removeEventListener("select",z),s.removeEventListener("selectstart",z),s.removeEventListener("selectend",z),s.removeEventListener("squeeze",z),s.removeEventListener("squeezestart",z),s.removeEventListener("squeezeend",z),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",Z);for(let j=0;j<M.length;j++){let te=A[j];te!==null&&(A[j]=null,M[j].disconnect(te))}I=null,U=null,m.reset();for(let j in g)delete g[j];if(e.setRenderTarget(T),h=null,f=null,d=null,s=null,_=null,ut.stop(),n.isPresenting=!1,e.setPixelRatio(v),e.setSize(R.width,R.height,!1),S!==null){let j=S.camera;j.fov=S.fov,j.zoom=S.zoom,j.updateProjectionMatrix(),S=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,n.isPresenting===!0&&Ne("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){o=j,n.isPresenting===!0&&Ne("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(j){l=j},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(T=e.getRenderTarget(),s.addEventListener("select",z),s.addEventListener("selectstart",z),s.addEventListener("selectend",z),s.addEventListener("squeeze",z),s.addEventListener("squeezestart",z),s.addEventListener("squeezeend",z),s.addEventListener("end",V),s.addEventListener("inputsourceschange",Z),b.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(R),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let ve=null,Xe=null,we=null;b.depth&&(we=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ve=b.stencil?ds:di,Xe=b.stencil?Vr:si);let qe={colorFormat:t.RGBA8,depthFormat:we,scaleFactor:r};d=this.getBinding(),f=d.createProjectionLayer(qe),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),_=new nn(f.textureWidth,f.textureHeight,{format:Pn,type:bn,depthTexture:new rs(f.textureWidth,f.textureHeight,Xe,void 0,void 0,void 0,void 0,void 0,void 0,ve),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let ve={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:r};h=new XRWebGLLayer(s,t,ve),s.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),_=new nn(h.framebufferWidth,h.framebufferHeight,{format:Pn,type:bn,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),ut.setContext(s),ut.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function Z(j){for(let te=0;te<j.removed.length;te++){let ve=j.removed[te],Xe=A.indexOf(ve);Xe>=0&&(A[Xe]=null,M[Xe].disconnect(ve))}for(let te=0;te<j.added.length;te++){let ve=j.added[te],Xe=A.indexOf(ve);if(Xe===-1){for(let qe=0;qe<M.length;qe++)if(qe>=A.length){A.push(ve),Xe=qe;break}else if(A[qe]===null){A[qe]=ve,Xe=qe;break}if(Xe===-1)break}let we=M[Xe];we&&we.connect(ve)}}let q=new L,J=new L;function ie(j,te,ve){q.setFromMatrixPosition(te.matrixWorld),J.setFromMatrixPosition(ve.matrixWorld);let Xe=q.distanceTo(J),we=te.projectionMatrix.elements,qe=ve.projectionMatrix.elements,yt=we[14]/(we[10]-1),ne=we[14]/(we[10]+1),ae=(we[9]+1)/we[5],oe=(we[9]-1)/we[5],le=(we[8]-1)/we[0],de=(qe[8]+1)/qe[0],Ve=yt*le,Ge=yt*de,$e=Xe/(-le+de),je=$e*-le;if(te.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(je),j.translateZ($e),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),we[10]===-1)j.projectionMatrix.copy(te.projectionMatrix),j.projectionMatrixInverse.copy(te.projectionMatrixInverse);else{let O=yt+$e,mt=ne+$e,ot=Ve-je,P=Ge+(Xe-je),y=ae*ne/mt*O,G=oe*ne/mt*O;j.projectionMatrix.makePerspective(ot,P,y,G,O,mt),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function Fe(j,te){te===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(te.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let te=j.near,ve=j.far;m.texture!==null&&(m.depthNear>0&&(te=m.depthNear),m.depthFar>0&&(ve=m.depthFar)),N.near=D.near=C.near=te,N.far=D.far=C.far=ve,(I!==N.near||U!==N.far)&&(s.updateRenderState({depthNear:N.near,depthFar:N.far}),I=N.near,U=N.far),N.layers.mask=j.layers.mask|6,C.layers.mask=N.layers.mask&-5,D.layers.mask=N.layers.mask&-3;let Xe=j.parent,we=N.cameras;Fe(N,Xe);for(let qe=0;qe<we.length;qe++)Fe(we[qe],Xe);we.length===2?ie(N,C,D):N.projectionMatrix.copy(C.projectionMatrix),S===null&&j.isPerspectiveCamera&&(S={camera:j,fov:j.fov,zoom:j.zoom}),Ee(j,N,Xe)};function Ee(j,te,ve){ve===null?j.matrix.copy(te.matrixWorld):(j.matrix.copy(ve.matrixWorld),j.matrix.invert(),j.matrix.multiply(te.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(te.projectionMatrix),j.projectionMatrixInverse.copy(te.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Ds*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(f===null&&h===null))return c},this.setFoveation=function(j){c=j,f!==null&&(f.fixedFoveation=j),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=j)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(N)},this.getCameraTexture=function(j){return g[j]};let ht=null;function at(j,te){if(u=te.getViewerPose(l||a),p=te,u!==null){let ve=u.views;h!==null&&(e.setRenderTargetFramebuffer(_,h.framebuffer),e.setRenderTarget(_));let Xe=!1;ve.length!==N.cameras.length&&(N.cameras.length=0,Xe=!0);for(let ne=0;ne<ve.length;ne++){let ae=ve[ne],oe=null;if(h!==null)oe=h.getViewport(ae);else{let de=d.getViewSubImage(f,ae);oe=de.viewport,ne===0&&(e.setRenderTargetTextures(_,de.colorTexture,de.depthStencilTexture),e.setRenderTarget(_))}let le=F[ne];le===void 0&&(le=new jt,le.layers.enable(ne),le.viewport=new St,F[ne]=le),le.matrix.fromArray(ae.transform.matrix),le.matrix.decompose(le.position,le.quaternion,le.scale),le.projectionMatrix.fromArray(ae.projectionMatrix),le.projectionMatrixInverse.copy(le.projectionMatrix).invert(),le.viewport.set(oe.x,oe.y,oe.width,oe.height),ne===0&&(N.matrix.copy(le.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),Xe===!0&&N.cameras.push(le)}let we=s.enabledFeatures;if(we&&we.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){d=n.getBinding();let ne=d.getDepthInformation(ve[0]);ne&&ne.isValid&&ne.texture&&m.init(ne,s.renderState)}if(we&&we.includes("camera-access")&&x){e.state.unbindTexture(),d=n.getBinding();for(let ne=0;ne<ve.length;ne++){let ae=ve[ne].camera;if(ae){let oe=g[ae];oe||(oe=new ka,g[ae]=oe);let le=d.getCameraImage(ae);oe.sourceTexture=le}}}}for(let ve=0;ve<M.length;ve++){let Xe=A[ve],we=M[ve];Xe!==null&&we!==void 0&&we.update(Xe,te,l||a)}ht&&ht(j,te),te.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:te}),p=null}let ut=new lg;ut.setAnimationLoop(at),this.setAnimationLoop=function(j){ht=j},this.dispose=function(){}}},MS=new Ye,pg=new Ke;pg.set(-1,0,0,0,1,0,0,0,1);function wS(i,e){function t(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function n(m,g){g.color.getRGB(m.fogColor.value,mf(i)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function s(m,g,b,T,_){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(m,g):g.isMeshLambertMaterial?(r(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(m,g),d(m,g)):g.isMeshPhongMaterial?(r(m,g),u(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(m,g),f(m,g),g.isMeshPhysicalMaterial&&h(m,g,_)):g.isMeshMatcapMaterial?(r(m,g),p(m,g)):g.isMeshDepthMaterial?r(m,g):g.isMeshDistanceMaterial?(r(m,g),x(m,g)):g.isMeshNormalMaterial?r(m,g):g.isLineBasicMaterial?(a(m,g),g.isLineDashedMaterial&&o(m,g)):g.isPointsMaterial?c(m,g,b,T):g.isSpriteMaterial?l(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,t(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===hn&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,t(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===hn&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,t(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,t(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);let b=e.get(g),T=b.envMap,_=b.envMapRotation;T&&(m.envMap.value=T,m.envMapRotation.value.setFromMatrix4(MS.makeRotationFromEuler(_)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(pg),m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,m.aoMapTransform))}function a(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform))}function o(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function c(m,g,b,T){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*b,m.scale.value=T*.5,g.map&&(m.map.value=g.map,t(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function l(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function u(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function d(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function f(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function h(m,g,b){m.ior.value=g.ior,g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===hn&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.retroreflectivity>0&&(m.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function x(m,g){let b=e.get(g).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function TS(i,e,t,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(_,M){let A=M.program;n.uniformBlockBinding(_,A)}function l(_,M){let A=s[_.id];A===void 0&&(m(_),A=u(_),s[_.id]=A,_.addEventListener("dispose",b));let R=M.program;n.updateUBOMapping(_,R);let v=e.render.frame;r[_.id]!==v&&(f(_),r[_.id]=v)}function u(_){let M=d();_.__bindingPointIndex=M;let A=i.createBuffer(),R=_.__size,v=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,A),i.bufferData(i.UNIFORM_BUFFER,R,v),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,A),A}function d(){for(let _=0;_<o;_++)if(a.indexOf(_)===-1)return a.push(_),_;return We("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(_){let M=s[_.id],A=_.uniforms,R=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let v=0,S=A.length;v<S;v++){let C=A[v];if(Array.isArray(C))for(let D=0,F=C.length;D<F;D++)h(C[D],v,D,R);else h(C,v,0,R)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(_,M,A,R){if(x(_,M,A,R)===!0){let v=_.__offset,S=_.value;if(Array.isArray(S)){let C=0;for(let D=0;D<S.length;D++){let F=S[D],N=g(F);p(F,_.__data,C),typeof F!="number"&&typeof F!="boolean"&&!F.isMatrix3&&!ArrayBuffer.isView(F)&&(C+=N.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(S,_.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,v,_.__data)}}function p(_,M,A){typeof _=="number"||typeof _=="boolean"?M[0]=_:_.isMatrix3?(M[0]=_.elements[0],M[1]=_.elements[1],M[2]=_.elements[2],M[3]=0,M[4]=_.elements[3],M[5]=_.elements[4],M[6]=_.elements[5],M[7]=0,M[8]=_.elements[6],M[9]=_.elements[7],M[10]=_.elements[8],M[11]=0):ArrayBuffer.isView(_)?M.set(new _.constructor(_.buffer,_.byteOffset,M.length)):_.toArray(M,A)}function x(_,M,A,R){let v=_.value,S=M+"_"+A;if(R[S]===void 0)return typeof v=="number"||typeof v=="boolean"?R[S]=v:ArrayBuffer.isView(v)?R[S]=v.slice():R[S]=v.clone(),!0;{let C=R[S];if(typeof v=="number"||typeof v=="boolean"){if(C!==v)return R[S]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(C.equals(v)===!1)return C.copy(v),!0}}return!1}function m(_){let M=_.uniforms,A=0,R=16;for(let S=0,C=M.length;S<C;S++){let D=Array.isArray(M[S])?M[S]:[M[S]];for(let F=0,N=D.length;F<N;F++){let I=D[F],U=Array.isArray(I.value)?I.value:[I.value];for(let z=0,V=U.length;z<V;z++){let Z=U[z],q=g(Z),J=A%R,ie=J%q.boundary,Fe=J+ie;A+=ie,Fe!==0&&R-Fe<q.storage&&(A+=R-Fe),I.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=A,A+=q.storage}}}let v=A%R;return v>0&&(A+=R-v),_.__size=A,_.__cache={},this}function g(_){let M={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(M.boundary=4,M.storage=4):_.isVector2?(M.boundary=8,M.storage=8):_.isVector3||_.isColor?(M.boundary=16,M.storage=12):_.isVector4?(M.boundary=16,M.storage=16):_.isMatrix3?(M.boundary=48,M.storage=48):_.isMatrix4?(M.boundary=64,M.storage=64):_.isTexture?Ne("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(M.boundary=16,M.storage=_.byteLength):Ne("WebGLRenderer: Unsupported uniform value type.",_),M}function b(_){let M=_.target;M.removeEventListener("dispose",b);let A=a.indexOf(M.__bindingPointIndex);a.splice(A,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function T(){for(let _ in s)i.deleteBuffer(s[_]);a=[],s={},r={}}return{bind:c,update:l,dispose:T}}var AS=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),yi=null;function ES(){return yi===null&&(yi=new Rr(AS,16,16,fs,ri),yi.name="DFG_LUT",yi.minFilter=zt,yi.magFilter=zt,yi.wrapS=Fn,yi.wrapT=Fn,yi.generateMipmaps=!1,yi.needsUpdate=!0),yi}var Fc=class{constructor(e={}){let{canvas:t=Rm(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1,outputBufferType:h=bn}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;let x=h,m=new Set([Jl,Zl,jl]),g=new Set([bn,si,Gr,Vr,$l,Yl]),b=new Uint32Array(4),T=new Int32Array(4),_=new L,M=null,A=null,R=[],v=[],S=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ni,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let C=this,D=!1,F=null,N=null,I=null,U=null;this._outputColorSpace=kt;let z=0,V=0,Z=null,q=-1,J=null,ie=new St,Fe=new St,Ee=null,ht=new Se(0),at=0,ut=t.width,j=t.height,te=1,ve=null,Xe=null,we=new St(0,0,ut,j),qe=new St(0,0,ut,j),yt=!1,ne=new Pr,ae=!1,oe=!1,le=new Ye,de=new L,Ve=new St,Ge={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},$e=!1;function je(){return Z===null?te:1}let O=n;function mt(w,k){return t.getContext(w,k)}let ot,P,y,G,X,Y,ce,ue,K,ee,fe,Oe,xe,he,ke,He,Je,B,pe,Q,me,Me,se;try{let w={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Vl}`),t.addEventListener("webglcontextlost",Rt,!1),t.addEventListener("webglcontextrestored",gt,!1),t.addEventListener("webglcontextcreationerror",Hn,!1),O===null){let k="webgl2";if(O=mt(k,w),O===null)throw mt(k)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Be()}catch(w){throw t.removeEventListener("webglcontextlost",Rt,!1),t.removeEventListener("webglcontextrestored",gt,!1),t.removeEventListener("webglcontextcreationerror",Hn,!1),We("WebGLRenderer: "+w.message),w}function Be(){ot=new Ny(O),ot.init(),me=new yS(O,ot),P=new wy(O,ot,e,me),y=new _S(O,ot),P.reversedDepthBuffer&&f&&y.buffers.depth.setReversed(!0),N=O.createFramebuffer(),I=O.createFramebuffer(),U=O.createFramebuffer(),G=new Oy(O),X=new sS,Y=new vS(O,ot,y,X,P,me,G),ce=new Dy(C),ue=new Bx(O),Me=new Sy(O,ue),K=new Uy(O,ue,G,Me),ee=new By(O,K,ue,Me,G),B=new ky(O,P,Y),ke=new Ty(X),fe=new iS(C,ce,ot,P,Me,ke),Oe=new wS(C,X),xe=new aS,he=new fS(ot),Je=new by(C,ce,y,ee,p,c),He=new xS(C,ee,P),se=new TS(O,G,P,y),pe=new My(O,ot,G),Q=new Fy(O,ot,G),G.programs=fe.programs,C.capabilities=P,C.extensions=ot,C.properties=X,C.renderLists=xe,C.shadowMap=He,C.state=y,C.info=G}x!==bn&&(S=new Gy(x,t.width,t.height,o,s,r));let Le=new Df(C,O);this.xr=Le,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){let w=ot.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=ot.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return te},this.setPixelRatio=function(w){w!==void 0&&(te=w,this.setSize(ut,j,!1))},this.getSize=function(w){return w.set(ut,j)},this.setSize=function(w,k,$=!0){if(Le.isPresenting){Ne("WebGLRenderer: Can't change size while VR device is presenting.");return}ut=w,j=k,t.width=Math.floor(w*te),t.height=Math.floor(k*te),$===!0&&(t.style.width=w+"px",t.style.height=k+"px"),S!==null&&S.setSize(t.width,t.height),this.setViewport(0,0,w,k)},this.getDrawingBufferSize=function(w){return w.set(ut*te,j*te).floor()},this.setDrawingBufferSize=function(w,k,$){ut=w,j=k,te=$,t.width=Math.floor(w*$),t.height=Math.floor(k*$),this.setViewport(0,0,w,k)},this.setEffects=function(w){if(x===bn){We("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let k=0;k<w.length;k++)if(w[k].isOutputPass===!0){Ne("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}S.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(ie)},this.getViewport=function(w){return w.copy(we)},this.setViewport=function(w,k,$,H){w.isVector4?we.set(w.x,w.y,w.z,w.w):we.set(w,k,$,H),y.viewport(ie.copy(we).multiplyScalar(te).round())},this.getScissor=function(w){return w.copy(qe)},this.setScissor=function(w,k,$,H){w.isVector4?qe.set(w.x,w.y,w.z,w.w):qe.set(w,k,$,H),y.scissor(Fe.copy(qe).multiplyScalar(te).round())},this.getScissorTest=function(){return yt},this.setScissorTest=function(w){y.setScissorTest(yt=w)},this.setOpaqueSort=function(w){ve=w},this.setTransparentSort=function(w){Xe=w},this.getClearColor=function(w){return w.copy(Je.getClearColor())},this.setClearColor=function(){Je.setClearColor(...arguments)},this.getClearAlpha=function(){return Je.getClearAlpha()},this.setClearAlpha=function(){Je.setClearAlpha(...arguments)},this.clear=function(w=!0,k=!0,$=!0){let H=0;if(w){let W=!1;if(Z!==null){let be=Z.texture.format;W=m.has(be)}if(W){let be=Z.texture.type,Ae=g.has(be),ye=Je.getClearColor(),Ce=Je.getClearAlpha(),De=ye.r,et=ye.g,lt=ye.b;Ae?(b[0]=De,b[1]=et,b[2]=lt,b[3]=Ce,O.clearBufferuiv(O.COLOR,0,b)):(T[0]=De,T[1]=et,T[2]=lt,T[3]=Ce,O.clearBufferiv(O.COLOR,0,T))}else H|=O.COLOR_BUFFER_BIT}k&&(H|=O.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),$&&(H|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&O.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),F=w},this.dispose=function(){t.removeEventListener("webglcontextlost",Rt,!1),t.removeEventListener("webglcontextrestored",gt,!1),t.removeEventListener("webglcontextcreationerror",Hn,!1),Je.dispose(),xe.dispose(),he.dispose(),X.dispose(),ce.dispose(),ee.dispose(),Me.dispose(),se.dispose(),fe.dispose(),Le.dispose(),Le.removeEventListener("sessionstart",Mh),Le.removeEventListener("sessionend",wh),xs.stop()};function Rt(w){w.preventDefault(),Pa("WebGLRenderer: Context Lost."),D=!0}function gt(){Pa("WebGLRenderer: Context Restored."),D=!1;let w=G.autoReset,k=He.enabled,$=He.autoUpdate,H=He.needsUpdate,W=He.type;Be(),G.autoReset=w,He.enabled=k,He.autoUpdate=$,He.needsUpdate=H,He.type=W}function Hn(w){We("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function ai(w){let k=w.target;k.removeEventListener("dispose",ai),Yg(k)}function Yg(w){Kg(w),X.remove(w)}function Kg(w){let k=X.get(w).programs;k!==void 0&&(k.forEach(function($){fe.releaseProgram($)}),w.isShaderMaterial&&fe.releaseShaderCache(w))}this.renderBufferDirect=function(w,k,$,H,W,be){k===null&&(k=Ge);let Ae=W.isMesh&&W.matrixWorld.determinantAffine()<0,ye=Jg(w,k,$,H,W);y.setMaterial(H,Ae);let Ce=$.index,De=1;if(H.wireframe===!0){if(Ce=K.getWireframeAttribute($),Ce===void 0)return;De=2}let et=$.drawRange,lt=$.attributes.position,Re=et.start*De,xt=(et.start+et.count)*De;be!==null&&(Re=Math.max(Re,be.start*De),xt=Math.min(xt,(be.start+be.count)*De)),Ce!==null?(Re=Math.max(Re,0),xt=Math.min(xt,Ce.count)):lt!=null&&(Re=Math.max(Re,0),xt=Math.min(xt,lt.count));let Vt=xt-Re;if(Vt<0||Vt===1/0)return;Me.setup(W,H,ye,$,Ce);let It,Et=pe;if(Ce!==null&&(It=ue.get(Ce),Et=Q,Et.setIndex(It)),W.isMesh)H.wireframe===!0?(y.setLineWidth(H.wireframeLinewidth*je()),Et.setMode(O.LINES)):Et.setMode(O.TRIANGLES);else if(W.isLine){let Jt=H.linewidth;Jt===void 0&&(Jt=1),y.setLineWidth(Jt*je()),W.isLineSegments?Et.setMode(O.LINES):W.isLineLoop?Et.setMode(O.LINE_LOOP):Et.setMode(O.LINE_STRIP)}else W.isPoints?Et.setMode(O.POINTS):W.isSprite&&Et.setMode(O.TRIANGLES);if(W.isBatchedMesh)if(ot.get("WEBGL_multi_draw"))Et.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{let Jt=W._multiDrawStarts,Te=W._multiDrawCounts,ln=W._multiDrawCount,dt=Ce?ue.get(Ce).bytesPerElement:1,In=X.get(H).currentProgram.getUniforms();for(let oi=0;oi<ln;oi++)In.setValue(O,"_gl_DrawID",oi),Et.render(Jt[oi]/dt,Te[oi])}else if(W.isInstancedMesh)Et.renderInstances(Re,Vt,W.count);else if($.isInstancedBufferGeometry){let Jt=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,Te=Math.min($.instanceCount,Jt);Et.renderInstances(Re,Vt,Te)}else Et.render(Re,Vt)};function Sh(w,k,$,H){F!==null&&w.isNodeMaterial&&F.setObject(H,w),ae===!0&&ke.setState(w,$,!1),w.transparent===!0&&w.side===rn&&w.forceSinglePass===!1?(w.side=hn,w.needsUpdate=!0,So(w,k,H),w.side=_i,w.needsUpdate=!0,So(w,k,H),w.side=rn):So(w,k,H)}this.compile=function(w,k,$=null){$===null&&($=w),F!==null&&F.renderStart(w,k,$),A=he.get($),A.init(k),v.push(A),$.traverseVisible(function(W){W.isLight&&W.layers.test(k.layers)&&(A.pushLight(W),W.castShadow&&A.pushShadow(W))}),w!==$&&w.traverseVisible(function(W){W.isLight&&W.layers.test(k.layers)&&(A.pushLight(W),W.castShadow&&A.pushShadow(W))}),A.setupLights(),F!==null&&F.updateLights(A.state.lightsArray),oe=this.localClippingEnabled,ae=ke.init(this.clippingPlanes,oe),ae===!0&&ke.setGlobalState(this.clippingPlanes,k),F!==null&&He.render(A.state.shadowsArray,$,k);let H=new Set;return w.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;let be=W.material;if(be)if(Array.isArray(be))for(let Ae=0;Ae<be.length;Ae++){let ye=be[Ae];Sh(ye,$,k,W),H.add(ye)}else Sh(be,$,k,W),H.add(be)}),A=v.pop(),F!==null&&F.renderEnd(),H},this.compileAsync=function(w,k,$=null){let H=this.compile(w,k,$);return new Promise(W=>{function be(){if(H.forEach(function(Ae){let Ce=X.get(Ae).currentProgram;(Ce===void 0||Ce.isReady())&&H.delete(Ae)}),H.size===0){W(w);return}setTimeout(be,10)}ot.get("KHR_parallel_shader_compile")!==null?be():setTimeout(be,10)})};let eu=null;function jg(w){eu&&eu(w)}function Mh(){xs.stop()}function wh(){xs.start()}let xs=new lg;xs.setAnimationLoop(jg),typeof self<"u"&&xs.setContext(self),this.setAnimationLoop=function(w){eu=w,Le.setAnimationLoop(w),w===null?xs.stop():xs.start()},Le.addEventListener("sessionstart",Mh),Le.addEventListener("sessionend",wh),this.render=function(w,k){if(k!==void 0&&k.isCamera!==!0){We("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;F!==null&&F.renderStart(w,k);let $=Le.enabled===!0&&Le.isPresenting===!0,H=S!==null&&(Z===null||$)&&S.begin(C,Z);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),Le.enabled===!0&&Le.isPresenting===!0&&(S===null||S.isCompositing()===!1)&&(Le.cameraAutoUpdate===!0&&Le.updateCamera(k),k=Le.getCamera()),w.isScene===!0&&w.onBeforeRender(C,w,k,Z),A=he.get(w,v.length),A.init(k),A.state.textureUnits=Y.getTextureUnits(),v.push(A),le.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),ne.setFromProjectionMatrix(le,Jn,k.reversedDepth),oe=this.localClippingEnabled,ae=ke.init(this.clippingPlanes,oe),M=xe.get(w,R.length),M.init(),R.push(M),Le.enabled===!0&&Le.isPresenting===!0){let Ae=C.xr.getDepthSensingMesh();Ae!==null&&tu(Ae,k,-1/0,C.sortObjects)}tu(w,k,0,C.sortObjects),M.finish(),F!==null&&F.updateLights(A.state.lightsArray),C.sortObjects===!0&&M.sort(ve,Xe),$e=Le.enabled===!1||Le.isPresenting===!1||Le.hasDepthSensing()===!1,$e&&Je.addToRenderList(M,w),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ae===!0&&ke.beginShadows();let W=A.state.shadowsArray;if(He.render(W,w,k),ae===!0&&ke.endShadows(),(H&&S.hasRenderPass())===!1){let Ae=M.opaque,ye=M.transmissive;if(A.setupLights(),k.isArrayCamera){let Ce=k.cameras;if(ye.length>0)for(let De=0,et=Ce.length;De<et;De++){let lt=Ce[De];Ah(Ae,ye,w,lt)}$e&&Je.render(w);for(let De=0,et=Ce.length;De<et;De++){let lt=Ce[De];Th(M,w,lt,lt.viewport)}}else ye.length>0&&Ah(Ae,ye,w,k),$e&&Je.render(w),Th(M,w,k)}Z!==null&&V===0&&(Y.updateMultisampleRenderTarget(Z),Y.updateRenderTargetMipmap(Z)),H&&S.end(C),w.isScene===!0&&w.onAfterRender(C,w,k),Me.resetDefaultState(),q=-1,J=null,v.pop(),v.length>0?(A=v[v.length-1],Y.setTextureUnits(A.state.textureUnits),ae===!0&&ke.setGlobalState(C.clippingPlanes,A.state.camera)):A=null,R.pop(),R.length>0?M=R[R.length-1]:M=null,F!==null&&F.renderEnd()};function tu(w,k,$,H){if(w.visible===!1)return;if(w.layers.test(k.layers)){if(w.isGroup)$=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(k);else if(w.isLightProbeGrid)A.pushLightProbeGrid(w);else if(w.isLight)A.pushLight(w),w.castShadow&&A.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||w.intersectsFrustum(ne)){H&&Ve.setFromMatrixPosition(w.matrixWorld).applyMatrix4(le);let Ae=ee.update(w),ye=w.material;ye.visible&&M.push(w,Ae,ye,$,Ve.z,null,k)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||w.intersectsFrustum(ne))){let Ae=ee.update(w),ye=w.material;if(H&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Ve.copy(w.boundingSphere.center)):(Ae.boundingSphere===null&&Ae.computeBoundingSphere(),Ve.copy(Ae.boundingSphere.center)),Ve.applyMatrix4(w.matrixWorld).applyMatrix4(le)),Array.isArray(ye)){let Ce=Ae.groups;for(let De=0,et=Ce.length;De<et;De++){let lt=Ce[De],Re=ye[lt.materialIndex];Re&&Re.visible&&M.push(w,Ae,Re,$,Ve.z,lt,k)}}else ye.visible&&M.push(w,Ae,ye,$,Ve.z,null,k)}}let be=w.children;for(let Ae=0,ye=be.length;Ae<ye;Ae++)tu(be[Ae],k,$,H)}function Th(w,k,$,H){let{opaque:W,transmissive:be,transparent:Ae}=w;A.setupLightsView($),ae===!0&&ke.setGlobalState(C.clippingPlanes,$),H&&y.viewport(ie.copy(H)),W.length>0&&bo(W,k,$),be.length>0&&bo(be,k,$),Ae.length>0&&bo(Ae,k,$),y.buffers.depth.setTest(!0),y.buffers.depth.setMask(!0),y.buffers.color.setMask(!0),y.setPolygonOffset(!1)}function Ah(w,k,$,H){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[H.id]===void 0){let Re=ot.has("EXT_color_buffer_half_float")||ot.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[H.id]=new nn(1,1,{generateMipmaps:!0,type:Re?ri:bn,minFilter:ii,samples:Math.max(4,P.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:it.workingColorSpace})}let be=A.state.transmissionRenderTarget[H.id],Ae=H.viewport||ie;be.setSize(Ae.z*C.transmissionResolutionScale,Ae.w*C.transmissionResolutionScale);let ye=C.getRenderTarget(),Ce=C.getActiveCubeFace(),De=C.getActiveMipmapLevel();C.setRenderTarget(be),C.getClearColor(ht),at=C.getClearAlpha(),at<1&&C.setClearColor(16777215,.5),C.clear(),$e&&Je.render($);let et=C.toneMapping;C.toneMapping=ni;let lt=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),A.setupLightsView(H),ae===!0&&ke.setGlobalState(C.clippingPlanes,H),bo(w,$,H),Y.updateMultisampleRenderTarget(be),Y.updateRenderTargetMipmap(be),ot.has("WEBGL_multisampled_render_to_texture")===!1){let Re=!1;for(let xt=0,Vt=k.length;xt<Vt;xt++){let It=k[xt],{object:Et,geometry:Jt,material:Te,group:ln}=It;if(Te.side===rn&&Et.layers.test(H.layers)){let dt=Te.side;Te.side=hn,Te.needsUpdate=!0,Eh(Et,$,H,Jt,Te,ln),Te.side=dt,Te.needsUpdate=!0,Re=!0}}Re===!0&&(Y.updateMultisampleRenderTarget(be),Y.updateRenderTargetMipmap(be))}C.setRenderTarget(ye,Ce,De),C.setClearColor(ht,at),lt!==void 0&&(H.viewport=lt),C.toneMapping=et}function bo(w,k,$){let H=k.isScene===!0?k.overrideMaterial:null;for(let W=0,be=w.length;W<be;W++){let Ae=w[W],{object:ye,geometry:Ce,group:De}=Ae,et=Ae.material;et.allowOverride===!0&&H!==null&&(et=H),ye.layers.test($.layers)&&Eh(ye,k,$,Ce,et,De)}}function Eh(w,k,$,H,W,be){F!==null&&W.isNodeMaterial&&F.setObject(w,W),w.onBeforeRender(C,k,$,H,W,be),w.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),W.onBeforeRender(C,k,$,H,w,be),W.transparent===!0&&W.side===rn&&W.forceSinglePass===!1?(W.side=hn,W.needsUpdate=!0,C.renderBufferDirect($,k,H,W,w,be),W.side=_i,W.needsUpdate=!0,C.renderBufferDirect($,k,H,W,w,be),W.side=rn):C.renderBufferDirect($,k,H,W,w,be),w.onAfterRender(C,k,$,H,W,be)}function So(w,k,$){k.isScene!==!0&&(k=Ge);let H=X.get(w),W=A.state.lights,be=A.state.shadowsArray,Ae=W.state.version,ye=fe.getParameters(w,W.state,be,k,$,A.state.lightProbeGridArray),Ce=fe.getProgramCacheKey(ye),De=H.programs;H.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?k.environment:null,H.fog=k.fog;let et=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;H.envMap=ce.get(w.envMap||H.environment,et),H.envMapRotation=H.environment!==null&&w.envMap===null?k.environmentRotation:w.envMapRotation,De===void 0&&(w.addEventListener("dispose",ai),De=new Map,H.programs=De);let lt=De.get(Ce);if(lt!==void 0){if(H.currentProgram===lt&&H.lightsStateVersion===Ae)return Rh(w,ye),lt}else ye.uniforms=fe.getUniforms(w),F!==null&&w.isNodeMaterial&&F.build(w,$,ye),w.onBeforeCompile(ye,C),lt=fe.acquireProgram(ye,Ce),De.set(Ce,lt),H.uniforms=ye.uniforms;let Re=H.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Re.clippingPlanes=ke.uniform),Rh(w,ye),H.needsLights=e0(w),H.lightsStateVersion=Ae,H.needsLights&&(Re.ambientLightColor.value=W.state.ambient,Re.lightProbe.value=W.state.probe,Re.sunLights.value=W.state.sun,Re.sunLightShadows.value=W.state.sunShadow,Re.directionalLights.value=W.state.directional,Re.directionalLightShadows.value=W.state.directionalShadow,Re.spotLights.value=W.state.spot,Re.spotLightShadows.value=W.state.spotShadow,Re.rectAreaLights.value=W.state.rectArea,Re.ltc_1.value=W.state.rectAreaLTC1,Re.ltc_2.value=W.state.rectAreaLTC2,Re.pointLights.value=W.state.point,Re.pointLightShadows.value=W.state.pointShadow,Re.hemisphereLights.value=W.state.hemi,Re.sunShadowMatrix.value=W.state.sunShadowMatrix,Re.sunShadowCascade.value=W.state.sunShadowCascade,Re.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Re.spotLightMatrix.value=W.state.spotLightMatrix,Re.spotLightMap.value=W.state.spotLightMap,Re.pointShadowMatrix.value=W.state.pointShadowMatrix),H.lightProbeGrid=A.state.lightProbeGridArray.length>0,H.currentProgram=lt,H.uniformsList=null,lt}function Ch(w){if(w.uniformsList===null){let k=w.currentProgram.getUniforms();w.uniformsList=qr.seqWithValue(k.seq,w.uniforms)}return w.uniformsList}function Rh(w,k){let $=X.get(w);$.outputColorSpace=k.outputColorSpace,$.batching=k.batching,$.batchingColor=k.batchingColor,$.instancing=k.instancing,$.instancingColor=k.instancingColor,$.instancingMorph=k.instancingMorph,$.skinning=k.skinning,$.morphTargets=k.morphTargets,$.morphNormals=k.morphNormals,$.morphColors=k.morphColors,$.morphTargetsCount=k.morphTargetsCount,$.numClippingPlanes=k.numClippingPlanes,$.numIntersection=k.numClipIntersection,$.vertexAlphas=k.vertexAlphas,$.vertexTangents=k.vertexTangents,$.toneMapping=k.toneMapping}function Zg(w,k){if(w.length===0)return null;if(w.length===1)return w[0].texture!==null?w[0]:null;_.setFromMatrixPosition(k.matrixWorld);for(let $=0,H=w.length;$<H;$++){let W=w[$];if(W.texture!==null&&W.boundingBox.containsPoint(_))return W}return null}function Jg(w,k,$,H,W){k.isScene!==!0&&(k=Ge),Y.resetTextureUnits();let be=k.fog,Ae=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?k.environment:null,ye=Z===null?C.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:it.workingColorSpace,Ce=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,De=ce.get(H.envMap||Ae,Ce),et=H.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,lt=!!$.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Re=!!$.morphAttributes.position,xt=!!$.morphAttributes.normal,Vt=!!$.morphAttributes.color,It=ni;H.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(It=C.toneMapping);let Et=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,Jt=Et!==void 0?Et.length:0,Te=X.get(H),ln=A.state.lights;if(ae===!0&&(oe===!0||w!==J)){let Pt=w===J&&H.id===q;ke.setState(H,w,Pt)}let dt=!1;H.version===Te.__version?(Te.needsLights&&Te.lightsStateVersion!==ln.state.version||Te.outputColorSpace!==ye||W.isBatchedMesh&&Te.batching===!1||!W.isBatchedMesh&&Te.batching===!0||W.isBatchedMesh&&Te.batchingColor===!0&&W._colorsTexture===null||W.isBatchedMesh&&Te.batchingColor===!1&&W._colorsTexture!==null||W.isInstancedMesh&&Te.instancing===!1||!W.isInstancedMesh&&Te.instancing===!0||W.isSkinnedMesh&&Te.skinning===!1||!W.isSkinnedMesh&&Te.skinning===!0||W.isInstancedMesh&&Te.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Te.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Te.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Te.instancingMorph===!1&&W.morphTexture!==null||Te.envMap!==De||H.fog===!0&&Te.fog!==be||Te.numClippingPlanes!==void 0&&(Te.numClippingPlanes!==ke.numPlanes||Te.numIntersection!==ke.numIntersection)||Te.vertexAlphas!==et||Te.vertexTangents!==lt||Te.morphTargets!==Re||Te.morphNormals!==xt||Te.morphColors!==Vt||Te.toneMapping!==It||Te.morphTargetsCount!==Jt||!!Te.lightProbeGrid!=A.state.lightProbeGridArray.length>0)&&(dt=!0):(dt=!0,Te.__version=H.version);let In=Te.currentProgram;dt===!0&&(In=So(H,k,W),F&&H.isNodeMaterial&&F.onUpdateProgram(H,In,Te));let oi=!1,Hi=!1,js=!1,wt=In.getUniforms(),Ot=Te.uniforms;if(y.useProgram(In.program)&&(oi=!0,Hi=!0,js=!0),H.id!==q&&(q=H.id,Hi=!0),Te.needsLights){let Pt=Zg(A.state.lightProbeGridArray,W);Te.lightProbeGrid!==Pt&&(Te.lightProbeGrid=Pt,Hi=!0)}if(oi||J!==w){y.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),wt.setValue(O,"projectionMatrix",w.projectionMatrix),wt.setValue(O,"viewMatrix",w.matrixWorldInverse);let Xi=wt.map.cameraPosition;Xi!==void 0&&Xi.setValue(O,de.setFromMatrixPosition(w.matrixWorld)),P.logarithmicDepthBuffer&&wt.setValue(O,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&wt.setValue(O,"isOrthographic",w.isOrthographicCamera===!0),J!==w&&(J=w,Hi=!0,js=!0)}if(Te.needsLights&&(ln.state.sunShadowMap.length>0&&wt.setValue(O,"sunShadowMap",ln.state.sunShadowMap,Y),ln.state.directionalShadowMap.length>0&&wt.setValue(O,"directionalShadowMap",ln.state.directionalShadowMap,Y),ln.state.spotShadowMap.length>0&&wt.setValue(O,"spotShadowMap",ln.state.spotShadowMap,Y),ln.state.pointShadowMap.length>0&&wt.setValue(O,"pointShadowMap",ln.state.pointShadowMap,Y)),W.isSkinnedMesh){wt.setOptional(O,W,"bindMatrix"),wt.setOptional(O,W,"bindMatrixInverse");let Pt=W.skeleton;Pt&&(Pt.boneTexture===null&&Pt.computeBoneTexture(),wt.setValue(O,"boneTexture",Pt.boneTexture,Y))}W.isBatchedMesh&&(wt.setOptional(O,W,"batchingTexture"),wt.setValue(O,"batchingTexture",W._matricesTexture,Y),wt.setOptional(O,W,"batchingIdTexture"),wt.setValue(O,"batchingIdTexture",W._indirectTexture,Y),wt.setOptional(O,W,"batchingColorTexture"),W._colorsTexture!==null&&wt.setValue(O,"batchingColorTexture",W._colorsTexture,Y));let Wi=$.morphAttributes;if((Wi.position!==void 0||Wi.normal!==void 0||Wi.color!==void 0)&&B.update(W,$,In),(Hi||Te.receiveShadow!==W.receiveShadow)&&(Te.receiveShadow=W.receiveShadow,wt.setValue(O,"receiveShadow",W.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&k.environment!==null&&(Ot.envMapIntensity.value=k.environmentIntensity),Ot.dfgLUT!==void 0&&(Ot.dfgLUT.value=ES()),Hi){if(wt.setValue(O,"toneMappingExposure",C.toneMappingExposure),Te.needsLights&&Qg(Ot,js),be&&H.fog===!0&&Oe.refreshFogUniforms(Ot,be),Oe.refreshMaterialUniforms(Ot,H,te,j,A.state.transmissionRenderTarget[w.id]),Te.needsLights&&Te.lightProbeGrid){let Pt=Te.lightProbeGrid;Ot.probesSH.value=Pt.texture,Ot.probesMin.value.copy(Pt.boundingBox.min),Ot.probesMax.value.copy(Pt.boundingBox.max),Ot.probesResolution.value.copy(Pt.resolution)}qr.upload(O,Ch(Te),Ot,Y)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(qr.upload(O,Ch(Te),Ot,Y),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&wt.setValue(O,"center",W.center),wt.setValue(O,"modelViewMatrix",W.modelViewMatrix),wt.setValue(O,"normalMatrix",W.normalMatrix),wt.setValue(O,"modelMatrix",W.matrixWorld),H.uniformsGroups!==void 0){let Pt=H.uniformsGroups;for(let Xi=0,Zs=Pt.length;Xi<Zs;Xi++){let Ih=Pt[Xi];se.update(Ih,In),se.bind(Ih,In)}}return In}function Qg(w,k){w.ambientLightColor.needsUpdate=k,w.lightProbe.needsUpdate=k,w.sunLights.needsUpdate=k,w.sunLightShadows.needsUpdate=k,w.directionalLights.needsUpdate=k,w.directionalLightShadows.needsUpdate=k,w.pointLights.needsUpdate=k,w.pointLightShadows.needsUpdate=k,w.spotLights.needsUpdate=k,w.spotLightShadows.needsUpdate=k,w.rectAreaLights.needsUpdate=k,w.hemisphereLights.needsUpdate=k}function e0(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return Z},this.setRenderTargetTextures=function(w,k,$){let H=X.get(w);H.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),X.get(w.texture).__webglTexture=k,X.get(w.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:$,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,k){let $=X.get(w);$.__webglFramebuffer=k,$.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(w,k=0,$=0){Z=w,z=k,V=$;let H=null,W=!1,be=!1;if(w){let ye=X.get(w);if(ye.__useDefaultFramebuffer!==void 0){y.bindFramebuffer(O.FRAMEBUFFER,ye.__webglFramebuffer),ie.copy(w.viewport),Fe.copy(w.scissor),Ee=w.scissorTest,y.viewport(ie),y.scissor(Fe),y.setScissorTest(Ee),q=-1;return}else if(ye.__webglFramebuffer===void 0)Y.setupRenderTarget(w);else if(ye.__hasExternalTextures)Y.rebindTextures(w,X.get(w.texture).__webglTexture,X.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let et=w.depthTexture;if(ye.__boundDepthTexture!==et){if(et!==null&&X.has(et)&&(w.width!==et.image.width||w.height!==et.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Y.setupDepthRenderbuffer(w)}}let Ce=w.texture;(Ce.isData3DTexture||Ce.isDataArrayTexture||Ce.isCompressedArrayTexture)&&(be=!0);let De=X.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(De[k])?H=De[k][$]:H=De[k],W=!0):w.samples>0&&Y.useMultisampledRTT(w)===!1?H=X.get(w).__webglMultisampledFramebuffer:Array.isArray(De)?H=De[$]:H=De,ie.copy(w.viewport),Fe.copy(w.scissor),Ee=w.scissorTest}else ie.copy(we).multiplyScalar(te).floor(),Fe.copy(qe).multiplyScalar(te).floor(),Ee=yt;if($!==0&&(H=N),y.bindFramebuffer(O.FRAMEBUFFER,H)&&y.drawBuffers(w,H),y.viewport(ie),y.scissor(Fe),y.setScissorTest(Ee),W){let ye=X.get(w.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+k,ye.__webglTexture,$)}else if(be){let ye=k;for(let Ce=0;Ce<w.textures.length;Ce++){let De=X.get(w.textures[Ce]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+Ce,De.__webglTexture,$,ye)}}else if(w!==null&&$!==0){let ye=X.get(w.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,ye.__webglTexture,$)}q=-1};function Ph(w){let k=X.get(w);return(k.__readFormat!==w.format||k.__readType!==w.type)&&(k.__readFormat=w.format,k.__readType=w.type,k.__formatReadable=P.textureFormatReadable(w.format),k.__typeReadable=P.textureTypeReadable(w.type)),k}this.readRenderTargetPixels=function(w,k,$,H,W,be,Ae,ye=0){if(!(w&&w.isWebGLRenderTarget)){We("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=X.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Ae!==void 0&&(Ce=Ce[Ae]),Ce){y.bindFramebuffer(O.FRAMEBUFFER,Ce);try{let De=w.textures[ye],et=De.format,lt=De.type;w.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+ye);let Re=Ph(De);if(Re.__formatReadable===!1){We("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Re.__typeReadable===!1){We("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=w.width-H&&$>=0&&$<=w.height-W&&O.readPixels(k,$,H,W,me.convert(et),me.convert(lt),be)}finally{let De=Z!==null?X.get(Z).__webglFramebuffer:null;y.bindFramebuffer(O.FRAMEBUFFER,De)}}},this.readRenderTargetPixelsAsync=async function(w,k,$,H,W,be,Ae,ye=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ce=X.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Ae!==void 0&&(Ce=Ce[Ae]),Ce)if(k>=0&&k<=w.width-H&&$>=0&&$<=w.height-W){y.bindFramebuffer(O.FRAMEBUFFER,Ce);let De=w.textures[ye],et=De.format,lt=De.type;w.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+ye);let Re=Ph(De);if(Re.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Re.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let xt=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,xt),O.bufferData(O.PIXEL_PACK_BUFFER,be.byteLength,O.STREAM_READ),O.readPixels(k,$,H,W,me.convert(et),me.convert(lt),0),O.bindBuffer(O.PIXEL_PACK_BUFFER,null);let Vt=Z!==null?X.get(Z).__webglFramebuffer:null;y.bindFramebuffer(O.FRAMEBUFFER,Vt);let It=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await Im(O,It,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,xt),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,be),O.bindBuffer(O.PIXEL_PACK_BUFFER,null),O.deleteBuffer(xt),O.deleteSync(It),be}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,k=null,$=0){let H=Math.pow(2,-$),W=Math.floor(w.image.width*H),be=Math.floor(w.image.height*H),Ae=k!==null?k.x:0,ye=k!==null?k.y:0;Y.setTexture2D(w,0),O.copyTexSubImage2D(O.TEXTURE_2D,$,0,0,Ae,ye,W,be),y.unbindTexture()},this.copyTextureToTexture=function(w,k,$=null,H=null,W=0,be=0){let Ae,ye,Ce,De,et,lt,Re,xt,Vt,It=w.isCompressedTexture?w.mipmaps[be]:w.image;if($!==null)Ae=$.max.x-$.min.x,ye=$.max.y-$.min.y,Ce=$.isBox3?$.max.z-$.min.z:1,De=$.min.x,et=$.min.y,lt=$.isBox3?$.min.z:0;else{let Ot=Math.pow(2,-W);Ae=Math.floor(It.width*Ot),ye=Math.floor(It.height*Ot),w.isDataArrayTexture?Ce=It.depth:w.isData3DTexture?Ce=Math.floor(It.depth*Ot):Ce=1,De=0,et=0,lt=0}H!==null?(Re=H.x,xt=H.y,Vt=H.z):(Re=0,xt=0,Vt=0);let Et=me.convert(k.format),Jt=me.convert(k.type),Te;k.isData3DTexture?(Y.setTexture3D(k,0),Te=O.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(Y.setTexture2DArray(k,0),Te=O.TEXTURE_2D_ARRAY):(Y.setTexture2D(k,0),Te=O.TEXTURE_2D),y.activeTexture(O.TEXTURE0),y.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,k.flipY),y.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),y.pixelStorei(O.UNPACK_ALIGNMENT,k.unpackAlignment);let ln=y.getParameter(O.UNPACK_ROW_LENGTH),dt=y.getParameter(O.UNPACK_IMAGE_HEIGHT),In=y.getParameter(O.UNPACK_SKIP_PIXELS),oi=y.getParameter(O.UNPACK_SKIP_ROWS),Hi=y.getParameter(O.UNPACK_SKIP_IMAGES);y.pixelStorei(O.UNPACK_ROW_LENGTH,It.width),y.pixelStorei(O.UNPACK_IMAGE_HEIGHT,It.height),y.pixelStorei(O.UNPACK_SKIP_PIXELS,De),y.pixelStorei(O.UNPACK_SKIP_ROWS,et),y.pixelStorei(O.UNPACK_SKIP_IMAGES,lt);let js=w.isDataArrayTexture||w.isData3DTexture,wt=k.isDataArrayTexture||k.isData3DTexture;if(w.isDepthTexture){let Ot=X.get(w),Wi=X.get(k),Pt=X.get(Ot.__renderTarget),Xi=X.get(Wi.__renderTarget);y.bindFramebuffer(O.READ_FRAMEBUFFER,Pt.__webglFramebuffer),y.bindFramebuffer(O.DRAW_FRAMEBUFFER,Xi.__webglFramebuffer);for(let Zs=0;Zs<Ce;Zs++)js&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,X.get(w).__webglTexture,W,lt+Zs),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,X.get(k).__webglTexture,be,Vt+Zs)),O.blitFramebuffer(De,et,Ae,ye,Re,xt,Ae,ye,O.DEPTH_BUFFER_BIT,O.NEAREST);y.bindFramebuffer(O.READ_FRAMEBUFFER,null),y.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(W!==0||w.isRenderTargetTexture||X.has(w)){let Ot=X.get(w),Wi=X.get(k);y.bindFramebuffer(O.READ_FRAMEBUFFER,I),y.bindFramebuffer(O.DRAW_FRAMEBUFFER,U);for(let Pt=0;Pt<Ce;Pt++)js?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ot.__webglTexture,W,lt+Pt):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Ot.__webglTexture,W),wt?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Wi.__webglTexture,be,Vt+Pt):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Wi.__webglTexture,be),W!==0?O.blitFramebuffer(De,et,Ae,ye,Re,xt,Ae,ye,O.COLOR_BUFFER_BIT,O.NEAREST):wt?O.copyTexSubImage3D(Te,be,Re,xt,Vt+Pt,De,et,Ae,ye):O.copyTexSubImage2D(Te,be,Re,xt,De,et,Ae,ye);y.bindFramebuffer(O.READ_FRAMEBUFFER,null),y.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else wt?w.isDataTexture||w.isData3DTexture?O.texSubImage3D(Te,be,Re,xt,Vt,Ae,ye,Ce,Et,Jt,It.data):k.isCompressedArrayTexture?O.compressedTexSubImage3D(Te,be,Re,xt,Vt,Ae,ye,Ce,Et,It.data):O.texSubImage3D(Te,be,Re,xt,Vt,Ae,ye,Ce,Et,Jt,It):w.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,be,Re,xt,Ae,ye,Et,Jt,It.data):w.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,be,Re,xt,It.width,It.height,Et,It.data):O.texSubImage2D(O.TEXTURE_2D,be,Re,xt,Ae,ye,Et,Jt,It);y.pixelStorei(O.UNPACK_ROW_LENGTH,ln),y.pixelStorei(O.UNPACK_IMAGE_HEIGHT,dt),y.pixelStorei(O.UNPACK_SKIP_PIXELS,In),y.pixelStorei(O.UNPACK_SKIP_ROWS,oi),y.pixelStorei(O.UNPACK_SKIP_IMAGES,Hi),be===0&&k.generateMipmaps&&O.generateMipmap(Te),y.unbindTexture()},this.initRenderTarget=function(w){X.get(w).__webglFramebuffer===void 0&&Y.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?Y.setTextureCube(w,0):w.isData3DTexture?Y.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?Y.setTexture2DArray(w,0):Y.setTexture2D(w,0),y.unbindTexture()},this.resetState=function(){z=0,V=0,Z=null,y.reset(),Me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Jn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=it._getDrawingBufferColorSpace(e),t.unpackColorSpace=it._getUnpackColorSpace()}};function mg(i,e){let t=(a,o)=>(a.cycles||0)-(o.cycles||0)||a.fieldId.localeCompare(o.fieldId),n=[...i].sort(t),s=[...e].sort(t),r=s.length?1:3;return[...n.slice(0,r),...s.slice(0,3-Math.min(r,n.length))]}var gg={type:"change"},Uf={type:"start"},_g={type:"end"},Bc=new fi,xg=new un,CS=Math.cos(70*hs.DEG2RAD),Yt=new L,Sn=2*Math.PI,Mt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Nf=1e-6,zc=class extends io{constructor(e,t=null){super(e,t),this.state=Mt.NONE,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:yn.ROTATE,MIDDLE:yn.DOLLY,RIGHT:yn.PAN},this.touches={ONE:cs.ROTATE,TWO:cs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new tn,this._lastTargetPosition=new L,this._quat=new tn().setFromUnitVectors(e.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ls,this._sphericalDelta=new ls,this._scale=1,this._panOffset=new L,this._rotateStart=new re,this._rotateEnd=new re,this._rotateDelta=new re,this._panStart=new re,this._panEnd=new re,this._panDelta=new re,this._dollyStart=new re,this._dollyEnd=new re,this._dollyDelta=new re,this._dollyDirection=new L,this._mouse=new re,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=PS.bind(this),this._onPointerDown=RS.bind(this),this._onPointerUp=IS.bind(this),this._onContextMenu=kS.bind(this),this._onMouseWheel=NS.bind(this),this._onKeyDown=US.bind(this),this._onTouchStart=FS.bind(this),this._onTouchMove=OS.bind(this),this._onMouseDown=LS.bind(this),this._onMouseMove=DS.bind(this),this._interceptControlDown=BS.bind(this),this._interceptControlUp=zS.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=Mt.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let e=this.domElement.getRootNode();e.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),e.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(gg),this.update(),this.state=Mt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;Yt.copy(t).sub(this.target),Yt.applyQuaternion(this._quat),this._spherical.setFromVector3(Yt),this.autoRotate&&this.state===Mt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Sn:n>Math.PI&&(n-=Sn),s<-Math.PI?s+=Sn:s>Math.PI&&(s-=Sn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Yt.setFromSpherical(this._spherical),Yt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Yt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=Yt.length();a=this._clampDistance(o*this._scale);let c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let o=new L(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let l=new L(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=Yt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Bc.origin.copy(this.object.position),Bc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Bc.direction))<CS?this.object.lookAt(this.target):(xg.setFromNormalAndCoplanarPoint(this.object.up,this.target),Bc.intersectPlane(xg,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Nf||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Nf||this._lastTargetPosition.distanceToSquared(this.target)>Nf?(this.dispatchEvent(gg),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Sn/60*this.autoRotateSpeed*e:Sn/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Yt.setFromMatrixColumn(t,0),Yt.multiplyScalar(-e),this._panOffset.add(Yt)}_panUp(e,t){this.screenSpacePanning===!0?Yt.setFromMatrixColumn(t,1):(Yt.setFromMatrixColumn(t,0),Yt.crossVectors(this.object.up,Yt)),Yt.multiplyScalar(e),this._panOffset.add(Yt)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Yt.copy(s).sub(this.target);let r=Yt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Sn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Sn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Sn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Sn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new re,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function RS(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function PS(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function IS(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(_g),this.state=Mt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function LS(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case yn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=Mt.DOLLY;break;case yn.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Mt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Mt.ROTATE}break;case yn.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Mt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Mt.PAN}break;default:this.state=Mt.NONE}this.state!==Mt.NONE&&this.dispatchEvent(Uf)}function DS(i){switch(this.state){case Mt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case Mt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case Mt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function NS(i){this.enabled===!1||this.enableZoom===!1||this.state!==Mt.NONE||(i.preventDefault(),this.dispatchEvent(Uf),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(_g))}function US(i){this.enabled!==!1&&this._handleKeyDown(i)}function FS(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case cs.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=Mt.TOUCH_ROTATE;break;case cs.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=Mt.TOUCH_PAN;break;default:this.state=Mt.NONE}break;case 2:switch(this.touches.TWO){case cs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=Mt.TOUCH_DOLLY_PAN;break;case cs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=Mt.TOUCH_DOLLY_ROTATE;break;default:this.state=Mt.NONE}break;default:this.state=Mt.NONE}this.state!==Mt.NONE&&this.dispatchEvent(Uf)}function OS(i){switch(this._trackPointer(i),this.state){case Mt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case Mt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case Mt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case Mt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=Mt.NONE}}function kS(i){this.enabled!==!1&&i.preventDefault()}function BS(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function zS(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function yg(i,e=!1){let t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,c=new ft,l=0;for(let u=0;u<i.length;++u){let d=i[u],f=0;if(t!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let h in d.attributes){if(!n.has(h))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+h+'" attribute exists among all geometries, or in none of them.'),null;r[h]===void 0&&(r[h]=[]),r[h].push(d.attributes[h]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let h in d.morphAttributes){if(!s.has(h))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;a[h]===void 0&&(a[h]=[]),a[h].push(d.morphAttributes[h])}if(e){let h;if(t)h=d.index.count;else if(d.attributes.position!==void 0)h=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,h,u),l+=h}}if(t){let u=0,d=[];for(let f=0;f<i.length;++f){let h=i[f].index;for(let p=0;p<h.count;++p)d.push(h.getX(p)+u);u+=i[f].attributes.position.count}c.setIndex(d)}for(let u in r){let d=vg(r[u]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,d)}for(let u in a){let d=a[u][0].length;if(d!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let f=0;f<d;++f){let h=[];for(let x=0;x<a[u].length;++x)h.push(a[u][x][f]);let p=vg(h);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(p)}}}return c}function vg(i){let e,t,n,s=-1,r=0;for(let l=0;l<i.length;++l){let u=i[l];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*t}let a=new e(r),o=new Wt(a,t,n),c=0;for(let l=0;l<i.length;++l){let u=i[l];if(u.isInterleavedBufferAttribute){let d=c/t;for(let f=0,h=u.count;f<h;f++)for(let p=0;p<t;p++){let x=u.getComponent(f,p);o.setComponent(f+d,p,x)}}else a.set(u.array,c);c+=u.count*t}return s!==void 0&&(o.gpuType=s),o}function bg(i,e=1e-4){e=Math.max(e,Number.EPSILON);let t={},n=i.getIndex(),s=i.getAttribute("position"),r=n?n.count:s.count,a=0,o=Object.keys(i.attributes),c={},l={},u=[],d=["getX","getY","getZ","getW"],f=["setX","setY","setZ","setW"];for(let b=0,T=o.length;b<T;b++){let _=o[b],M=i.attributes[_];c[_]=new M.constructor(new M.array.constructor(M.count*M.itemSize),M.itemSize,M.normalized);let A=i.morphAttributes[_];A&&(l[_]||(l[_]=[]),A.forEach((R,v)=>{let S=new R.array.constructor(R.count*R.itemSize);l[_][v]=new R.constructor(S,R.itemSize,R.normalized)}))}let h=e*.5,p=Math.log10(1/e),x=Math.pow(10,p),m=h*x;for(let b=0;b<r;b++){let T=n?n.getX(b):b,_="";for(let M=0,A=o.length;M<A;M++){let R=o[M],v=i.getAttribute(R),S=v.itemSize;for(let C=0;C<S;C++)_+=`${Math.trunc(v[d[C]](T)*x+m)},`}if(_ in t)u.push(t[_]);else{for(let M=0,A=o.length;M<A;M++){let R=o[M],v=i.getAttribute(R),S=i.morphAttributes[R],C=v.itemSize,D=c[R],F=l[R];for(let N=0;N<C;N++){let I=d[N],U=f[N];if(D[U](a,v[I](T)),S)for(let z=0,V=S.length;z<V;z++)F[z][U](a,S[z][I](T))}}t[_]=a,u.push(a),a++}}let g=i.clone();for(let b in i.attributes){let T=c[b];if(g.setAttribute(b,new T.constructor(T.array.slice(0,a*T.itemSize),T.itemSize,T.normalized)),b in l)for(let _=0;_<l[b].length;_++){let M=l[b][_];g.morphAttributes[b][_]=new M.constructor(M.array.slice(0,a*M.itemSize),M.itemSize,M.normalized)}}return g.setIndex(u),g}function Ff(i,e){if(e===uf)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Hr||e===ho){let t=i.getIndex();if(t===null){let r=[],a=i.getAttribute("position");if(a!==void 0){for(let o=0;o<a.count;o++)r.push(o);i.setIndex(r),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,s=[];if(e===Hr)for(let r=1;r<=n;r++)s.push(t.getX(0)),s.push(t.getX(r)),s.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(s.push(t.getX(r)),s.push(t.getX(r+1)),s.push(t.getX(r+2))):(s.push(t.getX(r+2)),s.push(t.getX(r+1)),s.push(t.getX(r)));return s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),i.setIndex(s),i.clearGroups(),i}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}function Sg(i){let e=new Map,t=new Map,n=i.clone();return Mg(i,n,function(s,r){e.set(r,s),t.set(s,r)}),n.traverse(function(s){if(!s.isSkinnedMesh)return;let r=s,a=e.get(s),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function Mg(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)Mg(i.children[n],e.children[n],t)}var _o=class extends xi{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Hf(t)}),this.register(function(t){return new Wf(t)}),this.register(function(t){return new Qf(t)}),this.register(function(t){return new eh(t)}),this.register(function(t){return new th(t)}),this.register(function(t){return new qf(t)}),this.register(function(t){return new $f(t)}),this.register(function(t){return new Yf(t)}),this.register(function(t){return new Kf(t)}),this.register(function(t){return new Vf(t)}),this.register(function(t){return new jf(t)}),this.register(function(t){return new Xf(t)}),this.register(function(t){return new Jf(t)}),this.register(function(t){return new Zf(t)}),this.register(function(t){return new zf(t)}),this.register(function(t){return new Gc(t,rt.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new Gc(t,rt.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new nh(t)})}load(e,t,n,s){let r=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let l=Gi.extractUrlBase(e);a=Gi.resolveURL(l,this.path)}else a=Gi.extractUrlBase(e);this.manager.itemStart(e);let o=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new Ur(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,a,function(u){t(u),r.manager.itemEnd(e)},o)}catch(u){o(u)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r,a={},o={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Cg){try{a[rt.KHR_BINARY_GLTF]=new ih(e)}catch(d){s&&s(d);return}r=JSON.parse(a[rt.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new uh(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let d=this.pluginCallbacks[u](l);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[d.name]=d,a[d.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){let d=r.extensionsUsed[u],f=r.extensionsRequired||[];switch(d){case rt.KHR_MATERIALS_UNLIT:a[d]=new Gf;break;case rt.KHR_DRACO_MESH_COMPRESSION:a[d]=new sh(r,this.dracoLoader);break;case rt.KHR_TEXTURE_TRANSFORM:a[d]=new rh;break;case rt.KHR_MESH_QUANTIZATION:a[d]=new ah;break;default:f.indexOf(d)>=0&&o[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,s)}parseAsync(e,t){let n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}};function GS(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}function Gt(i,e,t){let n=i.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}var rt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},zf=class{constructor(e){this.parser=e,this.name=rt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,s=t.cache.get(n);if(s)return s;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,u=new Se(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],dn);let d=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new os(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Bs(u),l.distance=d;break;case"spot":l=new eo(u),l.distance=d,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),Si(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}},Gf=class{constructor(){this.name=rt.KHR_MATERIALS_UNLIT}getMaterialType(){return sn}extendParams(e,t,n){let s=[];e.color=new Se(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],dn),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,kt))}return Promise.all(s)}},Vf=class{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=Gt(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},Hf=class{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?_n:null}extendMaterialParams(e,t){let n=Gt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(s.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let r=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new re(r,r)}return Promise.all(s)}},Wf=class{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?_n:null}extendMaterialParams(e,t){let n=Gt(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}},Xf=class{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?_n:null}extendMaterialParams(e,t){let n=Gt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(s)}},qf=class{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_SHEEN}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?_n:null}extendMaterialParams(e,t){let n=Gt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(t.sheenColor=new Se(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let r=n.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],dn)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,kt)),n.sheenRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(s)}},$f=class{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?_n:null}extendMaterialParams(e,t){let n=Gt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&s.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(s)}},Yf=class{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_VOLUME}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?_n:null}extendMaterialParams(e,t){let n=Gt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let r=n.attenuationColor||[1,1,1];return t.attenuationColor=new Se().setRGB(r[0],r[1],r[2],dn),Promise.all(s)}},Kf=class{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_IOR}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?_n:null}extendMaterialParams(e,t){let n=Gt(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},jf=class{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?_n:null}extendMaterialParams(e,t){let n=Gt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));let r=n.specularColorFactor||[1,1,1];return t.specularColor=new Se().setRGB(r[0],r[1],r[2],dn),n.specularColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,kt)),Promise.all(s)}},Zf=class{constructor(e){this.parser=e,this.name=rt.EXT_MATERIALS_BUMP}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?_n:null}extendMaterialParams(e,t){let n=Gt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&s.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(s)}},Jf=class{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Gt(this.parser,e,this.name)!==null?_n:null}extendMaterialParams(e,t){let n=Gt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&s.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(s)}},Qf=class{constructor(e){this.parser=e,this.name=rt.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}},eh=class{constructor(e){this.parser=e,this.name=rt.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}},th=class{constructor(e){this.parser=e,this.name=rt.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}},Gc=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){let c=s.byteOffset||0,l=s.byteLength||0,u=s.count,d=s.byteStride,f=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(u,d,f,s.mode,s.filter).then(function(h){return h.buffer}):a.ready.then(function(){let h=new ArrayBuffer(u*d);return a.decodeGltfBuffer(new Uint8Array(h),u,d,f,s.mode,s.filter),h})})}else return null}},nh=class{constructor(e){this.name=rt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=t.meshes[n.mesh];for(let l of s.primitives)if(l.mode!==zn.TRIANGLES&&l.mode!==zn.TRIANGLE_STRIP&&l.mode!==zn.TRIANGLE_FAN&&l.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],c={};for(let l in a)o.push(this.parser.getDependency("accessor",a[l]).then(u=>(c[l]=u,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{let u=l.pop(),d=u.isGroup?u.children:[u],f=l[0].count,h=[];for(let p of d){let x=new Ye,m=new L,g=new tn,b=new L(1,1,1),T=new An(p.geometry,p.material,f);for(let M=0;M<f;M++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,M),c.ROTATION&&g.fromBufferAttribute(c.ROTATION,M),c.SCALE&&b.fromBufferAttribute(c.SCALE,M),T.setMatrixAt(M,x.compose(m,g,b));let _=null;for(let M in c)if(M==="_COLOR_0"){let A=c[M];T.instanceColor=new Ni(A.array,A.itemSize,A.normalized)}else if(M!=="TRANSLATION"&&M!=="ROTATION"&&M!=="SCALE"){if(_===null){let R=T.geometry;_=new ft,_.name=R.name;for(let v in R.attributes)_.setAttribute(v,R.attributes[v]);for(let v in R.morphAttributes)_.morphAttributes[v]=R.morphAttributes[v];R.index!==null&&_.setIndex(R.index),_.morphTargetsRelative=R.morphTargetsRelative;for(let v of R.groups)_.addGroup(v.start,v.count,v.materialIndex);R.boundingBox!==null&&(_.boundingBox=R.boundingBox.clone()),R.boundingSphere!==null&&(_.boundingSphere=R.boundingSphere.clone()),_.drawRange.start=R.drawRange.start,_.drawRange.count=R.drawRange.count,_.userData=Object.assign({},R.userData),T.geometry=_}let A=c[M];_.setAttribute(M,new Ni(A.array,A.itemSize,A.normalized))}vt.prototype.copy.call(T,p),this.parser.assignFinalMaterial(T),h.push(T)}return u.isGroup?(u.clear(),u.add(...h),u):h[0]}))}},Cg="glTF",xo=12,wg={JSON:1313821514,BIN:5130562},ih=class{constructor(e){this.name=rt.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,xo),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Cg)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-xo,r=new DataView(e,xo),a=0;for(;a<s;){let o=r.getUint32(a,!0);a+=4;let c=r.getUint32(a,!0);if(a+=4,c===wg.JSON){let l=new Uint8Array(e,xo+a,o);this.content=n.decode(l)}else if(c===wg.BIN){let l=xo+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},sh=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=rt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(let u in a){let d=lh[u]||u.toLowerCase();o[d]=a[u]}for(let u in e.attributes){let d=lh[u]||u.toLowerCase();if(a[u]!==void 0){let f=n.accessors[e.attributes[u]],h=Kr[f.componentType];l[d]=h.name,c[d]=f.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(d,f){s.decodeDracoFile(u,function(h){for(let p in h.attributes){let x=h.attributes[p],m=c[p];m!==void 0&&(x.normalized=m)}d(h)},o,l,dn,f)})})}},rh=class{constructor(){this.name=rt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let n=Math.cos(e.rotation),s=Math.sin(e.rotation);e.matrix.set(e.repeat.x*n,e.repeat.y*s,e.offset.x,-e.repeat.x*s,e.repeat.y*n,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},ah=class{constructor(){this.name=rt.KHR_MESH_QUANTIZATION}},Vc=class extends gi{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,u=s-t,d=(n-t)/u,f=d*d,h=f*d,p=e*l,x=p-l,m=-2*h+3*f,g=h-f,b=1-m,T=g-f+d;for(let _=0;_!==o;_++){let M=a[x+_+o],A=a[x+_+c]*u,R=a[p+_+o],v=a[p+_]*u;r[_]=b*M+T*A+m*R+g*v}return r}},VS=new tn,oh=class extends Vc{interpolate_(e,t,n,s){let r=super.interpolate_(e,t,n,s);return VS.fromArray(r).normalize().toArray(r),r}},zn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Kr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Tg={9728:Bt,9729:zt,9984:Xl,9985:zr,9986:Hs,9987:ii},Ag={33071:Fn,33648:_r,10497:is},Of={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},lh={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},ps={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},HS={CUBICSPLINE:void 0,LINEAR:Ls,STEP:Is},kf={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function WS(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new fn({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:_i})),i.DefaultMaterial}function qs(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Si(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function XS(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,u=e.length;l<u;l++){let d=e[l];if(d.POSITION!==void 0&&(n=!0),d.NORMAL!==void 0&&(s=!0),d.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);let a=[],o=[],c=[];for(let l=0,u=e.length;l<u;l++){let d=e[l];if(n){let f=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):i.attributes.position;a.push(f)}if(s){let f=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):i.attributes.normal;o.push(f)}if(r){let f=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):i.attributes.color;c.push(f)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){let u=l[0],d=l[1],f=l[2];return n&&(i.morphAttributes.position=u),s&&(i.morphAttributes.normal=d),r&&(i.morphAttributes.color=f),i.morphTargetsRelative=!0,i})}function qS(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function $S(i){let e,t=i.extensions&&i.extensions[rt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Bf(t.attributes):e=i.indices+":"+Bf(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+Bf(i.targets[n]);return e}function Bf(i){let e="",t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function ch(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function YS(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var KS=new Ye,uh=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new GS,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let c=o.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&a<98?this.textureLoader=new Ja(this.options.manager):this.textureLoader=new to(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Ur(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:n,userData:{}};return qs(r,o,s),Si(o,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(let c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let a=t[s].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let s=n.clone(),r=(a,o)=>{let c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(let[l,u]of a.children.entries())r(u,o.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let s=e(t[n]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[rt.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,a){n.load(Gi.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){let t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let a=Of[s.type],o=Kr[s.componentType],c=s.normalized===!0,l=new o(s.count*a);return Promise.resolve(new Wt(l,a,c))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){let o=a[0],c=Of[s.type],l=Kr[s.componentType],u=l.BYTES_PER_ELEMENT,d=u*c,f=s.byteOffset||0,h=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,p=s.normalized===!0,x,m;if(h&&h!==d){let g=Math.floor(f/h),b="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+g+":"+s.count,T=t.cache.get(b);T||(x=new l(o,g*h,s.count*h/u),T=new Ar(x,h/u),t.cache.add(b,T)),m=new Er(T,c,f%h/u,p)}else o===null?x=new l(s.count*c):x=new l(o,f,s.count*c),m=new Wt(x,c,p);if(s.sparse!==void 0){let g=Of.SCALAR,b=Kr[s.sparse.indices.componentType],T=s.sparse.indices.byteOffset||0,_=s.sparse.values.byteOffset||0,M=new b(a[1],T,s.sparse.count*g),A=new l(a[2],_,s.sparse.count*c);o!==null&&(m=new Wt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let R=0,v=M.length;R<v;R++){let S=M[R];if(m.setX(S,A[R*c]),c>=2&&m.setY(S,A[R*c+1]),c>=3&&m.setZ(S,A[R*c+2]),c>=4&&m.setW(S,A[R*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=p}return m})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r],o=this.textureLoader;if(a.uri){let c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){let s=this,r=this.json,a=r.textures[e],o=r.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=a.name||o.name||"",u.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(u.name=o.uri);let f=(r.samplers||{})[a.sampler]||{};return u.magFilter=Tg[f.magFilter]||zt,u.minFilter=Tg[f.minFilter]||ii,u.wrapS=Ag[f.wrapS]||is,u.wrapT=Ag[f.wrapT]||is,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Bt&&u.minFilter!==zt,s.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());let a=s.images[e],o=self.URL||self.webkitURL,c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(d){l=!0;let f=new Blob([d],{type:a.mimeType});return c=o.createObjectURL(f),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let u=Promise.resolve(c).then(function(d){return new Promise(function(f,h){let p=f;t.isImageBitmapLoader===!0&&(p=function(x){let m=new Zt(x);m.needsUpdate=!0,f(m)}),t.load(Gi.resolveURL(d,r.path),p,void 0,h)})}).then(function(d){return l===!0&&o.revokeObjectURL(c),Si(d,a),d.userData.mimeType=a.mimeType||YS(a.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),d});return this.sourceCache[e]=u,u}assignTexture(e,t,n,s){let r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[rt.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[rt.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let c=r.associations.get(a);a=r.extensions[rt.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new ss,xn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new hi,xn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(s||r||a){let o="ClonedMaterial:"+n.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return fn}loadMaterial(e){let t=this,n=this.json,s=this.extensions,r=n.materials[e],a,o={},c=r.extensions||{},l=[];if(c[rt.KHR_MATERIALS_UNLIT]){let d=s[rt.KHR_MATERIALS_UNLIT];a=d.getMaterialType(),l.push(d.extendParams(o,r,t))}else{let d=r.pbrMetallicRoughness||{};if(o.color=new Se(1,1,1),o.opacity=1,Array.isArray(d.baseColorFactor)){let f=d.baseColorFactor;o.color.setRGB(f[0],f[1],f[2],dn),o.opacity=f[3]}d.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",d.baseColorTexture,kt)),o.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,o.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",d.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",d.metallicRoughnessTexture))),a=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=rn);let u=r.alphaMode||kf.OPAQUE;if(u===kf.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===kf.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==sn&&(l.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new re(1,1),r.normalTexture.scale!==void 0)){let d=r.normalTexture.scale;o.normalScale.set(d,d)}if(r.occlusionTexture!==void 0&&a!==sn&&(l.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==sn){let d=r.emissiveFactor;o.emissive=new Se().setRGB(d[0],d[1],d[2],dn)}return r.emissiveTexture!==void 0&&a!==sn&&l.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,kt)),Promise.all(l).then(function(){let d=new a(o);return r.name&&(d.name=r.name),Si(d,r),t.associations.set(d,{materials:e}),r.extensions&&qs(s,d,r),d})}createUniqueName(e){let t=Ct.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,s=this.primitiveCache;function r(o){return n[rt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return Eg(c,o,t)})}let a=[];for(let o=0,c=e.length;o<c;o++){let l=e[o],u=$S(l),d=s[u];if(d)a.push(d.promise);else{let f;l.extensions&&l.extensions[rt.KHR_DRACO_MESH_COMPRESSION]?f=r(l):f=Eg(new ft,l,t),l.mode===zn.TRIANGLE_STRIP?f=f.then(h=>Ff(h,ho)):l.mode===zn.TRIANGLE_FAN&&(f=f.then(h=>Ff(h,Hr))),s[u]={primitive:l,promise:f},a.push(f)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,s=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){let u=a[c].material===void 0?WS(this.cache):this.getDependency("material",a[c].material);o.push(u)}return o.push(t.loadGeometries(a)),Promise.all(o).then(async function(c){let l=c.slice(0,c.length-1),u=c[c.length-1],d=[];for(let h=0,p=u.length;h<p;h++){let x=u[h],m=a[h],g,b=l[h];if(m.mode===zn.TRIANGLES||m.mode===zn.TRIANGLE_STRIP||m.mode===zn.TRIANGLE_FAN||m.mode===void 0){let T=r.isSkinnedMesh===!0,_=x.hasAttribute("skinIndex")&&x.hasAttribute("skinWeight");T&&_===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),g=T&&_?new Ua(x,b):new Ue(x,b),g.isSkinnedMesh===!0&&g.normalizeSkinWeights()}else if(m.mode===zn.LINES)g=new Ns(x,b);else if(m.mode===zn.LINE_STRIP)g=new kn(x,b);else if(m.mode===zn.LINE_LOOP)g=new Us(x,b);else if(m.mode===zn.POINTS)g=new Fs(x,b);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(g.geometry.morphAttributes).length>0&&qS(g,r),g.name=t.createUniqueName(r.name||"mesh_"+e),Si(g,r),m.extensions&&qs(s,g,m),t.assignFinalMaterial(g),d.push(g)}for(let h=0,p=d.length;h<p;h++)t.associations.set(d[h],{meshes:e,primitives:h});if(d.length===1)return r.extensions&&qs(s,d[0],r),d[0];let f=new ge;r.extensions&&qs(s,f,r),t.associations.set(f,{meshes:e});for(let h=0,p=d.length;h<p;h++)f.add(d[h]);return f})}loadCamera(e){let t,n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new jt(hs.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new ti(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Si(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let r=s.pop(),a=s,o=[],c=[];for(let l=0,u=a.length;l<u;l++){let d=a[l];if(d){o.push(d);let f=new Ye;r!==null&&f.fromArray(r.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Fa(o,c)})}loadAnimation(e){let t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,a=[],o=[],c=[],l=[],u=[];for(let d=0,f=s.channels.length;d<f;d++){let h=s.channels[d],p=s.samplers[h.sampler],x=h.target,m=x.node,g=s.parameters!==void 0?s.parameters[p.input]:p.input,b=s.parameters!==void 0?s.parameters[p.output]:p.output;x.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",g)),c.push(this.getDependency("accessor",b)),l.push(p),u.push(x))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(d){let f=d[0],h=d[1],p=d[2],x=d[3],m=d[4],g=[];for(let T=0,_=f.length;T<_;T++){let M=f[T],A=h[T],R=p[T],v=x[T],S=m[T];if(M===void 0)continue;M.updateMatrix&&M.updateMatrix();let C=n._createAnimationTracks(M,A,R,v,S);if(C)for(let D=0;D<C.length;D++)g.push(C[D])}let b=new Za(r,void 0,g);return Si(b,s),b})}createNodeMesh(e){let t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){let a=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=s.weights.length;c<l;c++)o.morphTargetInfluences[c]=s.weights[c]}),a})}loadNode(e){let t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=s.children||[];for(let l=0,u=o.length;l<u;l++)a.push(n.getDependency("node",o[l]));let c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){let u=l[0],d=l[1],f=l[2];f!==null&&u.traverse(function(h){h.isSkinnedMesh&&h.bind(f,KS)});for(let h=0,p=d.length;h<p;h++)u.add(d[h]);if(u.userData.pivot!==void 0&&d.length>0){let h=u.userData.pivot,p=d[0];u.pivot=new L().fromArray(h),u.position.x-=h[0],u.position.y-=h[1],u.position.z-=h[2],p.position.set(0,0,0),delete u.userData.pivot}return u})}_loadNodeShallow(e){let t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"",o=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let u;if(r.isBone===!0?u=new Cr:l.length>1?u=new ge:l.length===1?u=l[0]:u=new vt,u!==l[0])for(let d=0,f=l.length;d<f;d++)u.add(l[d]);if(r.name&&(u.userData.name=r.name,u.name=a),Si(u,r),r.extensions&&qs(n,u,r),r.matrix!==void 0){let d=new Ye;d.fromArray(r.matrix),u.applyMatrix4(d)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);if(!s.associations.has(u))s.associations.set(u,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){let d=s.associations.get(u);s.associations.set(u,{...d})}return s.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],s=this,r=new ge;n.name&&(r.name=s.createUniqueName(n.name)),Si(r,n),n.extensions&&qs(t,r,n);let a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(s.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let u=0,d=c.length;u<d;u++){let f=c[u];f.parent!==null?r.add(Sg(f)):r.add(f)}let l=u=>{let d=new Map;for(let[f,h]of s.associations)(f instanceof xn||f instanceof Zt)&&d.set(f,h);return u.traverse(f=>{let h=s.associations.get(f);h!=null&&d.set(f,h)}),d};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){let a=[],o=e.name?e.name:e.uuid,c=[];function l(h){h.morphTargetInfluences&&c.push(h.name?h.name:h.uuid)}ps[r.path]===ps.weights?(l(e),e.isGroup&&e.children.forEach(l)):c.push(o);let u;switch(ps[r.path]){case ps.weights:u=ki;break;case ps.rotation:u=Bi;break;case ps.translation:case ps.scale:u=as;break;default:switch(n.itemSize){case 1:u=ki;break;case 2:case 3:default:u=as;break}break}let d=s.interpolation!==void 0?HS[s.interpolation]:Ls,f=this._getArrayFromAccessor(n);for(let h=0,p=c.length;h<p;h++){let x=new u(c[h]+"."+ps[r.path],t.array,f,d);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(x),a.push(x)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=ch(t.constructor),s=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let s=this instanceof Bi?oh:Vc;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function jS(i,e,t){let n=e.attributes,s=new Tn;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(s.set(new L(c[0],c[1],c[2]),new L(l[0],l[1],l[2])),o.normalized){let u=ch(Kr[o.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let o=new L,c=new L;for(let l=0,u=r.length;l<u;l++){let d=r[l];if(d.POSITION!==void 0){let f=t.json.accessors[d.POSITION],h=f.min,p=f.max;if(h!==void 0&&p!==void 0){if(c.setX(Math.max(Math.abs(h[0]),Math.abs(p[0]))),c.setY(Math.max(Math.abs(h[1]),Math.abs(p[1]))),c.setZ(Math.max(Math.abs(h[2]),Math.abs(p[2]))),f.normalized){let x=ch(Kr[f.componentType]);c.multiplyScalar(x)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}i.boundingBox=s;let a=new gn;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=a}function Eg(i,e,t){let n=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(c){i.setAttribute(o,c)})}for(let a in n){let o=lh[a]||a.toLowerCase();o in i.attributes||s.push(r(n[a],o))}if(e.indices!==void 0&&!i.index){let a=t.getDependency("accessor",e.indices).then(function(o){i.setIndex(o)});s.push(a)}return it.workingColorSpace!==dn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${it.workingColorSpace}" not supported.`),Si(i,e),jS(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?XS(i,e.targets,t):i})}var on="#77593d",ZS="#b4ab91";function Rg(i,e,t){for(let n of[-e/2,e/2])for(let s of[-t/2,t/2])E(i,n,.29,s,.055,.55,.055,on);for(let n of[-t/2,t/2])for(let s of[.2,.43])E(i,0,s,n,e,.04,.04,on);for(let n of[-e/2,e/2])for(let s of[.2,.43])E(i,n,s,0,.04,.04,t,on)}function Pg(i,e,t){let n=new ge;n.name=`${e?"pig":"cow"}-${t}`,n.userData.movingPart=!0,n.position.set(t?.65:-.65,.15,.15),i.add(n);let s=e?"#d9a693":"#ece2cb";E(n,0,.25,0,e?.45:.57,e?.28:.42,e?.27:.36,s),E(n,0,.29,.22,.25,.25,.24,s),E(n,0,.24,.36,.2,.12,.08,e?"#bd8878":"#897c6b");for(let r of[-.1,.1])E(n,r,.43,.24,.08,.08,.06,e?"#c58d7d":"#b8a380");for(let r of[-.16,.16])for(let a of[-.08,.08])E(n,r,.08,a,.05,.17,.06,e?"#b48170":"#605447");e||(E(n,.18,.32,-.08,.22,.23,.38,"#726553"),E(n,-.21,.4,.03,.12,.19,.31,"#796b58")),E(n,0,.24,-.19,.025,.1,.08,on)}function Ig(i,e,t){let n=["#98734d","#789779","#708d9b","#ad8565"],s=n[t%4];if(e==="vegetablefield"){E(i,0,.035,0,2.88,.07,1.86,"#866849"),Rg(i,2.8,1.8);let r=new ge;r.name="vegetable-crops",r.userData.movingPart=!0,i.add(r);for(let a of[-1.13,-.82,.82,1.13])for(let o=-.65;o<=.66;o+=.26){E(i,a,.09,o,.08,.06,.19,"#a18a5e"),Ze(r,a,.16,o,.045,.16,"#c58449",.03);for(let c of[-1,1]){let l=E(r,a+c*.045,.26,o,.025,.17,.06,"#709157");l.rotation.z=c*.38}}}else if(e==="cowshed"||e==="pigpen"){E(i,0,.055,0,2.9,.11,1.9,e==="cowshed"?"#a2a077":"#a6906d"),Rg(i,2.8,1.8),E(i,0,.45,-.58,2.12,.78,.52,e==="cowshed"?"#ddcaa3":"#a88a60"),Xt(i,2.35,.86,.86,s);for(let r of[-1.05,0,1.05])E(i,r,.42,-.28,.06,.7,.06,on);Pg(i,e==="pigpen",0),Pg(i,e==="pigpen",1),E(i,1.1,.13,.63,.4,.16,.23,on),E(i,1.1,.22,.63,.32,.03,.18,"#bfc59b");for(let r=0;r<3;r++)E(i,-1.1,.2+r*.1,-.67,.35,.1,.31,"#d2b565")}else if(e==="restaurant"){E(i,0,.06,0,2.9,.12,2.9,ZS),E(i,0,.75,-.45,2.35,1.35,1.75,"#dfc6a0");for(let o of[-1.15,1.15])E(i,o,.81,-.45,.085,1.47,1.76,on);Xt(i,2.65,2.1,1.47,["#a06b49","#7e8261","#7f9091","#9b6c5f"][t%4]),Dt(i,-.64,.9,.48),Dt(i,.67,.9,.48);let r=new ge;r.rotation.y=Math.PI,r.position.z=-1.33,i.add(r),Dt(r,0,.89,0),Dt(i,1.2,.89,-.4,!0);let a=new ge;a.rotation.y=-Math.PI/2,a.position.x=-1.2,i.add(a),Dt(a,0,.89,0);for(let o=-1.1;o<.35;o+=.27)E(i,1.18,.2,o,.08,.11,.23,"#b6a08a");E(i,0,.59,.5,.47,.9,.07,on),E(i,0,1.2,.56,.85,.16,.05,s),Ze(i,.92,1.8,-.94,.12,.8,"#a39982");for(let o of[-.78,.78]){Ze(i,o,.32,1.03,.27,.06,"#ab8861");for(let c of[.73,1.3])E(i,o,.14,c,.3,.22,.21,on);Ze(i,o,.38,1.03,.08,.025,"#ede2bb")}E(i,-1.18,.26,1.04,.2,.31,.23,"#a6825f");for(let o of[.9,1.13])Ze(i,-1.18,.51,o,.09,.15,"#879e66");E(i,1.04,.41,-.58,.2,.45,.65,"#a79f8b")}else if(e==="fishinghut"){E(i,0,.045,0,1.85,.09,1.85,"#ae9a75"),E(i,.26,.57,.2,1.15,.97,1.22,"#a38762");for(let a=.19;a<1.08;a+=.13)E(i,.26,a,.84,1.19,.027,.04,"#7e644b");Xt(i,1.4,1.45,1.07,s),Dt(i,.4,.64,.84),E(i,-.12,.46,.85,.27,.74,.06,on);for(let a=0;a<9;a++)E(i,-.35,.09,-.6-a*.14,.75,.055,.12,"#b29366");for(let a of[-.68,.02])for(let o of[-.75,-1.7])E(i,a,-.1,o,.055,.5,.055,on);Ze(i,.78,.24,-.66,.16,.36,"#997b55"),E(i,.74,.43,-.69,.24,.03,.13,"#c6c9b1");let r=new ge;r.rotation.z=.24,i.add(r);for(let a=0;a<6;a++)E(r,-.72+a*.08,.58,.42,.013,.62,.014,"#a4a68d"),E(r,-.52,.28+a*.11,.42,.44,.012,.012,"#a4a68d")}else if(e==="apronstand"){for(let r of[-.38,.38])E(i,r,.57,0,.055,1.1,.055,on);E(i,0,1.08,0,.84,.04,.045,on);for(let[r,a]of["#c99979","#819d86","#7593a5"].entries())E(i,(r-1)*.23,.77,0,.15,.29,.02,a),E(i,(r-1)*.23,.94,0,.08,.1,.02,a)}else if(e==="harvesttable"){E(i,0,.38,0,1.8,.08,.74,on);for(let r of[-.65,.65])for(let a of[-.24,.24])E(i,r,.18,a,.08,.35,.08,on);E(i,0,.43,0,.84,.017,.76,s);for(let r of[-.52,.52]){E(i,r,.49,0,.33,.1,.25,"#b0905c");for(let a=0;a<3;a++)E(i,r-.1+a*.1,.58,0,.09,.1,.13,["#bd8c53","#adac6b","#cd865d"][a])}}else if(e==="wheatbanner"){Ze(i,0,.72,0,.035,1.4,on),E(i,.25,1.14,0,.48,.4,.025,s);for(let r=0;r<3;r++){let a=E(i,.14+r*.09,1.14,.022,.022,.25,.025,"#e1c480");a.rotation.z=-.22;for(let o of[1.08,1.17])E(i,.14+r*.09,o,.025,.065,.06,.027,"#d6b266")}}}var vo=new L;function Gn(i,e,t,n,s,r){let a=2*Math.PI*s/4,o=Math.max(r-2*s,0),c=Math.PI/4;vo.copy(e),vo[n]=0,vo.normalize();let l=.5*a/(a+o),u=1-vo.angleTo(i)/c;return Math.sign(vo[t])===1?u*l:o/(a+o)+l+l*(1-u)}var $s=class i extends Bn{constructor(e=1,t=1,n=1,s=2,r=.1){let a=s*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:s,radius:r},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let c=new L,l=new L,u=new L(e,t,n).divideScalar(2).subScalar(r),d=this.attributes.position.array,f=this.attributes.normal.array,h=this.attributes.uv.array,p=d.length/6,x=new L,m=.5/a;for(let g=0,b=0;g<d.length;g+=3,b+=2)switch(c.fromArray(d,g),l.copy(c),l.x-=Math.sign(l.x)*m,l.y-=Math.sign(l.y)*m,l.z-=Math.sign(l.z)*m,l.normalize(),d[g+0]=u.x*Math.sign(c.x)+l.x*r,d[g+1]=u.y*Math.sign(c.y)+l.y*r,d[g+2]=u.z*Math.sign(c.z)+l.z*r,f[g+0]=l.x,f[g+1]=l.y,f[g+2]=l.z,Math.floor(g/p)){case 0:x.set(1,0,0),h[b+0]=Gn(x,l,"z","y",r,n),h[b+1]=1-Gn(x,l,"y","z",r,t);break;case 1:x.set(-1,0,0),h[b+0]=1-Gn(x,l,"z","y",r,n),h[b+1]=1-Gn(x,l,"y","z",r,t);break;case 2:x.set(0,1,0),h[b+0]=1-Gn(x,l,"x","z",r,e),h[b+1]=Gn(x,l,"z","x",r,n);break;case 3:x.set(0,-1,0),h[b+0]=1-Gn(x,l,"x","z",r,e),h[b+1]=1-Gn(x,l,"z","x",r,n);break;case 4:x.set(0,0,1),h[b+0]=1-Gn(x,l,"x","y",r,e),h[b+1]=1-Gn(x,l,"y","x",r,t);break;case 5:x.set(0,0,-1),h[b+0]=Gn(x,l,"x","y",r,e),h[b+1]=1-Gn(x,l,"y","x",r,t);break}}static fromJSON(e){return new i(e.width,e.height,e.depth,e.segments,e.radius)}};var Lg=Array.from({length:9},(i,e)=>({z:-.96+e*.24,y:.19+.075*Math.sin(e/8*Math.PI),height:.07,depth:.23}));function dh(i,e){for(let t of i){if(!t.placed||t.kind!=="fishinghut")continue;let n=t.rotation*Math.PI/2,s=Math.cos(n),r=Math.sin(n),a=e.x-t.x-1,o=e.z-t.z-1,c=a*s-o*r,l=a*r+o*s;if(c<-.725||c>.025||l<-1.8||l>-.5)continue;let u=Math.max(0,Math.min(1,(-l-.5)/.2)),d=u*u*(3-2*u);return{...e,y:.105+(.16-.105)*d}}for(let t of i){if(!t.placed||t.kind!=="bridge")continue;let n=(t.rotation%4+4)%4,s=n%2,r=e.x-t.x-(s?1:.5),a=e.z-t.z-(s?.5:1),o=n*Math.PI/2,c=Math.cos(o),l=Math.sin(o),u=r*c-a*l,d=r*l+a*c,f=Math.abs(d);if(Math.abs(u)>.51||f>=1.5)continue;let h=Math.min(1,Math.max(0,(1.5-f)/.4)),p=h*h*(3-2*h),x=Math.max(-.19,Math.min(.19,u)),m=u+(x-u)*p,g=Math.max(0,Math.min(.96,f-.13)),b=.04+.225+.075*Math.cos(g/.96*Math.PI/2);return{x:t.x+(s?1:.5)+m*c+d*l,z:t.z+(s?.5:1)-m*l+d*c,y:.105+(b+.006-.105)*p}}return{...e,y:.105}}var Wc=new $s(1,1,1,1,.025),Ks=new Map,Ug=i=>Array.from(Ks.values()).includes(i);function Tt(i,e=!1){let t=i+e;return Ks.has(t)||Ks.set(t,new fn({color:i,roughness:.88,metalness:0,...e?{emissive:i,emissiveIntensity:.65}:{}})),Ks.get(t)}function ms(i,e){let t=`${i}:${e}`;if(!Ks.has(t)){let n=Tt(i).clone();n.userData.seasonRole=e,Ks.set(t,n)}return Ks.get(t)}function E(i,e,t,n,s,r,a,o,c=!1){let l=new Ue(Wc,Tt(o,c));return l.position.set(e,t,n),l.scale.set(s,r,a),l.castShadow=!0,l.receiveShadow=!0,i.add(l),l}function Ze(i,e,t,n,s,r,a,o=s){let c=new Ue(new Ui(o,s,r,8),Tt(a));return c.position.set(e,t,n),c.castShadow=!0,c.receiveShadow=!0,i.add(c),c}var Pe={wood:"#69543e",beam:"#544536",stone:"#ada58d",cream:"#ead6b0",window:"#f6d590",roof:"#9f533b",green:"#526b51",iron:"#535e55"},Fg=.2135,JS=.235;function Og(i){let e=(t,n=1)=>t+Fg*n+.042-JS;return i==="bench"?[{position:[0,e(0),0],yaw:0}]:i==="park"?[{position:[.4,e(.13,.85),.55],yaw:0}]:i==="gazebo"?[{position:[0,e(.16),-.55],yaw:0}]:[]}function Dt(i,e,t,n,s=!1){let r=new ge;r.position.set(e,t,n),s&&(r.rotation.y=Math.PI/2),i.add(r),E(r,0,0,0,.48,.56,.08,Pe.beam),E(r,0,0,.045,.37,.44,.05,Pe.window,!0),E(r,0,0,.08,.035,.46,.025,Pe.cream),E(r,0,0,.085,.38,.035,.025,Pe.cream),E(r,0,-.31,0,.6,.075,.16,Pe.wood)}function Xt(i,e,t,n,s){let a=e*.62,o=new pi;o.moveTo(-e*.43,-.12),o.lineTo(e*.43,-.12),o.lineTo(0,e*.31),o.closePath();let c=new Ue(new Fi(o,{depth:t*.86,bevelEnabled:!1}),Tt("#dfcba7"));c.position.set(0,n,-t*.43),c.castShadow=!0,c.receiveShadow=!0,i.add(c);for(let l of[-1,1]){let u=E(i,l*e*.25,n+e*.155,0,a,.11,t+.3,s);u.material=ms(s,"roof"),u.rotation.z=-l*.58;for(let d=0;d<5;d++){let f=l*(d+.5)*e/10,h=n+e*(.155+.25*Math.tan(.58))-Math.abs(f)*Math.tan(.58);for(let p=0;p<5;p++){let x=d%2?s:new Se(s).multiplyScalar(1.07).getStyle(),m=E(i,f,h+.085,(p-2)*(t+.28)/5,e/10+.025,.045,(t+.28)/5-.018,x);m.material=ms(x,"roof"),m.rotation.z=-l*.58}}}E(i,0,n+e*.325,0,.13,.11,t+.34,Pe.beam);for(let l of[-e*.49,e*.49])E(i,l,n+.04,0,.075,.09,t+.31,"#74644e");for(let l of[-t/2,t/2]){E(i,0,n+.15,l,.08,.52,.08,Pe.beam);for(let u of[-1,1]){let d=E(i,u*e*.21,n+.07,l,e*.53,.055,.06,Pe.beam);d.rotation.z=-u*.58}}}function Dg(i,e,t){let n=["#a6553c","#637969","#637e87","#ae884d"],s=["#ead8b6","#e5d8c3","#c6d0b1","#d9c4a3"];E(i,0,.08,0,1.88,.16,1.88,"#b1ab91"),E(i,0,1.2/2+.15,0,1.58,1.2,1.5,s[e%4]);for(let c of[-.785,.785])for(let l=0;l<7;l++)E(i,(l-3)*.22,.23,c,.212,.14,.045,l%2?"#b5a890":"#c2b59b"),E(i,(l-3)*.22,.38,c,.212,.13,.045,l%2?"#c2b59b":"#b5a890");for(let c of[-.79,.79])for(let l of[-.76,.76])E(i,c,.78,l,.075,1.27,.075,Pe.beam);for(let c of[.25,1.27])E(i,0,c,.765,1.65,.07,.065,Pe.wood);E(i,.18,.55,.798,.45,.88,.018,"#322f2b");let a=new ge;a.name="door-hinge",a.userData.movingPart=!0,a.position.set(-.03,.55,.85),i.add(a),E(a,.21,0,0,.42,.86,.055,Pe.wood);for(let c of[-.26,.26])E(a,.21,c,.032,.34,.045,.025,"#8f7655");E(a,.34,0,.047,.045,.045,.032,"#ccb36c"),E(i,.18,.13,.91,.62,.13,.25,Pe.stone),Dt(i,-.48,.81,.8),Dt(i,.8,.81,-.2,!0);for(let c of[-.76,-.2]){E(i,c,.83,.84,.1,.52,.06,["#7b8d70","#8a9c86","#829ca2","#ac9370"][e%4]);for(let l=0;l<5;l++)E(i,c,.62+l*.09,.88,.09,.022,.02,"#65725b")}let o=new ge;o.rotation.y=Math.PI,i.add(o),Dt(o,.37,.88,.79),Dt(o,-.36,.88,.79);for(let c of[-.6,.43])E(i,-.79,.8,c,.035,1.15,.065,Pe.beam);Xt(i,1.72,1.67,1.4,n[e%4]),E(i,-.52,1.7,-.44,.22,.82,.26,"#aa9f85"),E(i,-.52,2.14,-.44,.3,.1,.32,"#787864");for(let c=0;c<5;c++)E(i,-.52,1.42+c*.13,-.577,.24,.017,.035,"#867c69"),E(i,-.66,1.49+c*.13,-.44,.035,.017,.26,"#867c69");if(t==="house"){let c=E(i,.18,1.13,.99,.69,.065,.48,n[e%4]);c.rotation.x=.15;for(let u of[-.11,.47])E(i,u,.57,1.09,.055,1.02,.055,Pe.wood);if(E(i,.18,.08,1.04,.76,.075,.35,"#c5b89c"),e===1||e===3){let u=new ge;u.position.set(.34,1.6,.55),u.scale.setScalar(.48),i.add(u),E(u,0,.48,0,.82,.9,.6,"#e9d6b4"),Dt(u,0,.53,.33),Xt(u,1,.82,.95,n[e%4])}if(e===2)for(let u=0;u<5;u++)E(i,-.835,.35+u*.17,-.3+Math.sin(u)*.17,.085,.14,.12,u%2?"#789366":"#91a977");let l=new ge;l.position.set(.6,1.07,.85),l.scale.setScalar(.32),i.add(l),E(l,0,0,0,.27,.38,.27,"#f0c176",!0),E(l,0,.22,0,.37,.07,.37,"#616958"),E(l,0,-.24,0,.29,.06,.29,"#616958")}if(t==="bakery"||t==="cafe"){let c=t==="bakery"?"#c78b47":"#688978",l=new ge;i.add(l),l.position.set(0,1.05,.92);for(let d=0;d<8;d++){let f=E(l,(d-3.5)*.19,0,.06,.185,.07,.46,d%2?"#f0e4c8":c);f.rotation.x=.15,E(l,(d-3.5)*.19,-.085,.275,.185,.13,.035,d%2?"#f0e4c8":c)}if(E(i,0,.36,.91,1.42,.14,.24,Pe.wood),t==="bakery")for(let d=0;d<4;d++)Ze(i,(d-1.5)*.24,.49,1,.1,.11,"#c69051");else Ze(i,-.52,.5,1,.1,.12,"#e3ddd0"),E(i,-.32,.55,1,.12,.03,.12,"#d8b986");let u=new ge;u.position.set(-.83,1.1,.95),i.add(u),E(u,0,.12,0,.04,.4,.04,Pe.iron),E(u,0,-.15,0,.36,.24,.07,"#f1e4bc"),Ze(u,0,-.145,.06,.065,.03,c).rotation.x=Math.PI/2}E(i,-.48,.42,.88,.5,.14,.17,"#826049");for(let c=0;c<3;c++)E(i,-.63+c*.15,.57,.9,.04,.16,.04,"#748055"),E(i,-.63+c*.15,.66,.9,.105,.07,.1,e%2?"#dfb66a":"#d39889")}function Hc(i=0){let e=new ge;Ze(e,0,.49,0,.09,.98,"#77604a",.06);let t=["#73915d","#86a26e","#58775a","#b69b5d"];for(let[n,s,r,a]of[[0,1.33,0,.49],[-.28,1.06,.12,.37],[.29,1.12,-.06,.38],[.03,1.68,-.07,.32]]){let o=new Ue(new mi(a,1),ms(t[i%4],"foliage"));o.position.set(n,s,r),o.scale.set(1.08,1.12,1.04),o.rotation.y=i*.23,o.castShadow=!0,o.receiveShadow=!0,e.add(o)}return e}function fh(i,e="#ab8352"){for(let t of[-.31,.31])E(i,t,.102,0,.07,.205,.38,Pe.iron),E(i,t,.33,-.17,.06,.32,.06,Pe.iron);for(let t of[-.13,0,.13])E(i,0,Fg-.0325,t,.83,.065,.09,e);for(let t of[.305,.42])E(i,0,t,-.19,.83,.095,.06,e)}function QS(i,e){Ze(i,0,.05,0,.16,.1,Pe.iron),E(i,0,.65,0,.06,1.2,.06,Pe.iron),E(i,0,1.38,0,.25,.3,.25,["#f7d391","#abd3b6","#acc6da","#e8b6ab"][e%4],!0);for(let t of[-.13,.13])for(let n of[-.13,.13])E(i,t,1.38,n,.035,.32,.035,Pe.iron);E(i,0,1.58,0,.35,.08,.35,Pe.iron)}function Ys(i,e,t,n,s=1){let r=new ge;r.position.set(e,.14,t),r.scale.setScalar(s),i.add(r),Ze(r,0,.1,0,.13,.2,"#ad7357",.17),Ze(r,0,.205,0,.15,.018,"#62513c");for(let a=0;a<4;a++){let o=a*2.4;E(r,Math.cos(o)*.08,.31,Math.sin(o)*.08,.022,.23,.022,"#698159");let c=new Ue(new mi(.068,1),Tt(n));c.position.set(Math.cos(o)*.08,.43+a%2*.04,Math.sin(o)*.08),r.add(c)}}function jr(i,e,t,n,s,r){let a=new pi;a.moveTo(-s/2,0),a.lineTo(s/2,0),a.lineTo(s/2,r-s/2),a.absarc(0,r-s/2,s/2,0,Math.PI,!1),a.closePath();let o=new Ue(new Fi(a,{depth:.05,bevelEnabled:!1}),Tt(Pe.wood));o.position.set(e,t,n),i.add(o);let c=new Ue(o.geometry,Tt(Pe.window,!0));c.position.set(e,t+.055,n+.055),c.scale.set(.84,.87,.5),i.add(c),E(i,e,t+r*.42,n+.092,.035,r*.72,.024,Pe.cream),E(i,e,t+r*.4,n+.09,s*.82,.035,.022,Pe.cream)}function Ng(i,e,t,n,s,r){let a=e/2,o=t/2,c=e*.23,l=[-a,0,-o,a,0,-o,-c,s,0,a,0,-o,c,s,0,-c,s,0,a,0,-o,a,0,o,c,s,0,a,0,o,-a,0,o,c,s,0,-a,0,o,-c,s,0,c,s,0,-a,0,o,-a,0,-o,-c,s,0];for(let f=0;f<l.length;f+=9)for(let h=0;h<3;h++){let p=l[f+3+h];l[f+3+h]=l[f+6+h],l[f+6+h]=p}let u=new ft().setAttribute("position",new tt(l,3));u.computeVertexNormals();let d=new Ue(u,ms(r,"roof"));d.position.y=n,d.castShadow=!0,d.receiveShadow=!0,i.add(d);for(let f of[-o,o])E(i,0,n,f,e+.03,.09,.075,Pe.wood);for(let f of[-a,a])E(i,f,n,0,.075,.09,t,Pe.wood);E(i,0,n+s,0,c*2+.07,.08,.1,Pe.wood);for(let f of[-1,1])for(let h=1;h<4;h++)E(i,0,n+s*(1-h/4)+.012,f*o*h/4,e*(.46+.54*h/4),.02,.025,new Se(r).multiplyScalar(1.1).getStyle())}function eM(i,e,t){if(E(i,0,.07,0,1.9,.14,1.9,"#b4ad97"),e==="bakery"){E(i,-.12,.71,-.15,1.47,1.12,1.22,"#cfb798");for(let l=.27;l<1.17;l+=.15)for(let u=0;u<6;u++)E(i,-.76+u*.245+Math.round(l/.15)%2*.035,l,.47,.224,.12,.035,u%2?"#c49d81":"#d7b89b");jr(i,-.48,.41,.51,.63,.64),E(i,.4,.53,.51,.38,.75,.065,Pe.wood),E(i,.49,.53,.56,.04,.04,.026,"#c5a25d"),Xt(i,1.62,1.35,1.3,["#ad6448","#967b58","#737f72","#aa8259"][t%4]),E(i,.7,.56,-.26,.37,.82,1.01,"#b68a6b"),E(i,.68,1.38,-.46,.28,1.22,.29,"#a78066");for(let l=.9;l<1.9;l+=.14)E(i,.68,l,-.612,.29,.022,.027,"#d6b394");E(i,.68,2.04,-.46,.38,.12,.37,"#7c7062");for(let l=0;l<6;l++){let u=E(i,-.22+(l-2.5)*.2,1.06,.79,.194,.07,.53,l%2?"#ede0c0":"#bb874c");u.rotation.x=.17,E(i,-.22+(l-2.5)*.2,.98,1.06,.19,.12,.035,l%2?"#ede0c0":"#bb874c")}E(i,-.36,.43,.88,.85,.07,.32,"#95744e");for(let l=0;l<4;l++){let u=Ze(i,-.65+l*.18,.52,.88,.082,.1,"#c99a60");u.scale.z=.65,E(i,-.65+l*.18,.576,.88,.018,.012,.08,"#ead2a2")}let c=new ge;c.rotation.y=Math.PI,i.add(c),jr(c,.28,.43,.775,.55,.52),E(c,-.5,.29,.79,.32,.24,.24,"#927956");for(let l=0;l<3;l++)E(c,-.51+l*.085,.39,.79,.04,.035,.22,"#bea779");for(let l of[.25,.4])E(i,-.12,l,-.78,1.48,.025,.04,"#b18d70");Ys(i,.72,.89,"#d9bc73",.65);return}if(e==="cafe"){E(i,-.16,1.14,-.18,1.25,1.98,1.22,["#d9d0b6","#d2c2b1","#c7cdbf","#e1d1b2"][t%4]);for(let d of[-.81,.46])E(i,d,1.16,.44,.075,2.03,.09,Pe.beam);E(i,-.16,2.17,-.18,1.44,.13,1.39,"#657c75").material=ms("#657c75","roof"),E(i,-.16,2.28,-.72,1.4,.21,.07,"#c7bc9f");for(let d of[-.84,.52])E(i,d,2.28,-.18,.07,.21,1.15,"#c7bc9f");jr(i,-.47,.35,.47,.48,.7),E(i,.2,.65,.49,.36,1.02,.06,Pe.wood),Dt(i,-.17,1.65,.47),E(i,-.18,1.32,.67,1.21,.07,.45,Pe.wood);for(let d=0;d<6;d++)E(i,-.73+d*.22,1.49,.84,.035,.34,.035,"#536b62");E(i,-.18,1.67,.84,1.2,.045,.045,"#536b62");let c=E(i,.7,.53,-.22,.32,.77,1.2,"#d9ccb1");c.name="coffee-wing",E(i,.7,.96,-.22,.44,.1,1.36,"#657c75"),Ze(i,-.64,.41,.99,.21,.045,"#8c7657"),Ze(i,-.64,.23,.99,.025,.33,Pe.iron),Ze(i,-.65,.48,.99,.045,.08,"#eee2c7"),E(i,-.77,.25,.97,.11,.04,.21,Pe.wood),E(i,.61,1.36,.65,.42,.39,.06,"#5d776e"),Ze(i,.6,1.39,.704,.084,.028,"#e7d3ac").rotation.x=Math.PI/2,E(i,.6,1.23,.705,.18,.035,.025,"#e7d3ac"),Ys(i,.56,.94,"#c29190",.8);let l=new ge;l.rotation.y=Math.PI,i.add(l),Dt(l,.16,1.62,.82),jr(l,.16,.36,.82,.65,.71);let u=new ge;u.rotation.y=-Math.PI/2,i.add(u),Dt(u,.25,1.61,.85),E(i,-.17,.3,-.815,1.27,.17,.07,"#b2a38a");return}if(e==="grocer"){E(i,0,.64,-.57,1.66,.99,.43,"#c0ac83");for(let c=0;c<8;c++)E(i,(c-3.5)*.22,.69,-.34,.03,.95,.025,"#957c57");for(let c of[-.82,.82])for(let l of[-.73,.67])E(i,c,.73,l,.095,1.23,.095,Pe.wood);Ng(i,1.97,1.83,1.4,.4,["#75816b","#a7804e","#748991","#a28560"][t%4]);for(let c of[-.59,.59]){E(i,c,.39,.18,.42,.5,1.09,"#a07d52");for(let l=0;l<4;l++){E(i,c,.67,-.2+l*.26,.37,.13,.23,"#b99a69");for(let u=0;u<3;u++){let d=new Ue(new mi(.061,1),Tt(["#cf9c5f","#a8b86c","#bf7860","#d5ba73"][l]));d.position.set(c+(u-1)*.095,.77,-.2+l*.26),i.add(d)}}}for(let c=.27;c<1.17;c+=.15)E(i,0,c,-.795,1.68,.026,.03,"#9f895f");E(i,.3,.56,-.805,.41,.67,.04,"#8d7654"),E(i,.43,.57,-.84,.045,.045,.025,"#c4ad73"),E(i,0,1.11,.76,.58,.24,.06,"#e8d8b3");for(let c=0;c<3;c++)Ze(i,(c-1)*.12,1.12,.8,.053,.025,["#cda16b","#a2ae75","#c07d61"][c]).rotation.x=Math.PI/2;Ze(i,-.78,.29,.92,.14,.29,"#c1ae85"),E(i,-.78,.47,.92,.15,.07,.16,"#82996f");return}let n=["#6f897a","#857989","#758b98","#94906b"][t%4],s=["#dabda9","#d4cbb1","#c9d1c7","#e1ceb0"][t%4];E(i,-.58,.89,-.12,.49,1.48,1.42,s);for(let c=.3;c<1.55;c+=.18)E(i,-.58,c,.6,.51,.022,.026,"#b69382");let r=Tt("#b9d1c5").clone();Object.assign(r,{transparent:!0,opacity:.62,roughness:.24,depthWrite:!1});let a=(c,l,u,d,f,h)=>{let p=E(i,c,l,u,d,f,h,"#b9d1c5");return p.material=r,p};for(let c of[-.28,.82])a(c,.87,-.12,.025,1.35,1.44);a(.27,.87,.6,1.09,1.35,.025),a(.27,.87,-.83,1.09,1.35,.025);for(let c of[-.3,.26,.83])for(let l of[-.85,.62])E(i,c,.9,l,.055,1.54,.055,n);for(let c of[.25,1.05,1.6])E(i,.27,c,.63,1.17,.04,.05,n);let o=a(.26,1.76,-.12,1.25,.04,1.53);o.rotation.z=-.2;for(let c of[-.86,-.13,.63]){let l=E(i,.26,1.79,c,1.28,.06,.05,n);l.rotation.z=-.2}E(i,-.59,1.73,-.12,.66,.12,1.61,"#866b58"),E(i,-.58,2,-.41,.5,.39,.47,"#d3b79d"),Ng(i,.67,.66,2.23,.23,"#82786d"),E(i,.18,.59,.66,.37,.91,.038,"#839d8a"),a(.18,.75,.7,.26,.49,.015),E(i,-.52,.44,.83,.68,.05,.28,"#a68661");for(let[c,l]of[-.75,-.43,.65].entries())Ys(i,l,.85,["#d399aa","#c4b1d2","#e2bf7c"][c],.82);Ys(i,.59,-.42,"#d5b875",1),Ys(i,.12,-.48,"#c69baa",.7),E(i,-.59,1.32,.67,.32,.29,.04,"#e7d9bd");for(let c=0;c<5;c++){let l=c*Math.PI*2/5;Ze(i,-.59+Math.cos(l)*.054,1.33+Math.sin(l)*.054,.706,.038,.022,"#c18e9b").rotation.x=Math.PI/2}Ze(i,-.59,1.33,.721,.031,.02,"#d9bc6c").rotation.x=Math.PI/2}function tM(i,e,t){let n=["#718477","#9d6250","#718894","#ae925d"],s=n[t%4],r=["library","greenhouse","boathouse"].includes(e);if(E(i,0,.07,0,r?2.8:1.9,.14,1.9,"#b4ad97"),e==="library"){E(i,0,.86,-.12,2.48,1.44,1.44,"#e3d5b6");for(let u of[-1.21,-.43,.43,1.21])E(i,u,.88,.61,.07,1.5,.06,Pe.beam);for(let u of[.3,1.55])E(i,0,u,.63,2.51,.08,.08,Pe.beam);Dt(i,-.82,.91,.66),Dt(i,.83,.91,.66),E(i,0,.67,.68,.43,1,.09,Pe.wood),Xt(i,2.62,1.62,1.65,s),E(i,0,1.57,.92,.87,.075,.39,s);for(let u of[-.36,.36])E(i,u,.88,1.02,.06,1.5,.06,Pe.wood);E(i,-.75,.42,.9,.69,.05,.23,Pe.wood);for(let u=0;u<6;u++)E(i,-1+u*.09,.54+u%2*.025,.91,.065,.23+u%2*.05,.16,["#8fa591","#b28068","#a9bbbf"][u%3]);let o=new ge;o.position.set(.7,1.5,.72),i.add(o),E(o,0,0,0,.49,.31,.04,"#e9dfc1");for(let u of[-.1,.1]){let d=E(o,u,0,.034,.19,.2,.025,"#b39666");d.rotation.z=u<0?-.14:.14}Ys(i,1.05,.87,"#d2b473",.72);let c=new ge;c.rotation.y=Math.PI,i.add(c);for(let u of[-.74,.74])Dt(c,u,.98,.87);E(c,0,.34,.89,2.47,.19,.04,"#baac8f");let l=new ge;l.rotation.y=-Math.PI/2,i.add(l),jr(l,.1,.55,1.27,.66,.89);return}if(e==="greenhouse"){let o=["#698479","#897e6c","#718898","#94916a"][t%4],c=Tt(["#b5d4c4","#d5c8d4","#b6ccd6","#d6d6b2"][t%4]).clone();Object.assign(c,{transparent:!0,opacity:.45,roughness:.28,metalness:.08,depthWrite:!1,side:rn});let l=(u,d,f,h,p,x)=>{let m=new Ue(Wc,c);return m.position.set(u,d,f),m.scale.set(h,p,x),m.receiveShadow=!0,i.add(m),m};for(let u of[-1.26,1.26]){l(u,.8,0,.035,1.25,1.56);for(let d of[-.76,0,.76])E(i,u,.8,d,.065,1.29,.065,o)}for(let u of[-.76,.76]){l(0,.8,u,2.47,1.25,.035);for(let d of[-1.26,-.63,0,.63,1.26])E(i,d,.8,u,.055,1.29,.06,o);E(i,0,.28,u,2.55,.06,.07,o)}for(let u of[-1,1]){let d=l(u*.64,1.65,0,1.57,.04,1.64);d.rotation.z=-u*.42;for(let f of[-.8,-.4,0,.4,.8]){let h=E(i,u*.64,1.65,f,1.61,.045,.045,o);h.rotation.z=-u*.42}}E(i,0,1.975,0,.07,.075,1.66,o);for(let u of[-.83,.83]){E(i,u,.42,0,.45,.55,1.18,"#a28159");for(let d=0;d<4;d++)Ys(i,u,-.48+d*.3,t%2?"#d2b26b":"#cf9894",.77)}E(i,0,.64,.79,.46,1.02,.045,"#7a958a"),l(0,.78,.82,.37,.58,.026);return}if(e==="granary"){Ze(i,-.43,.91,-.16,.43,1.55,"#c2a97e");for(let l=0;l<12;l++){let u=l*Math.PI/6;E(i,-.43+Math.cos(u)*.432,.9,-.16+Math.sin(u)*.432,.03,1.52,.035,"#947958")}for(let l of[.4,1.17,1.56])Ze(i,-.43,l,-.16,.443,.055,"#747d70");let o=new Ue(new Ir(.54,.48,12),ms(s,"roof"));o.position.set(-.43,1.92,-.16),o.castShadow=!0,i.add(o);let c=new ge;c.position.set(.48,0,.06),i.add(c),E(c,0,.63,0,.62,.96,1.31,"#b69971"),Xt(c,.77,1.4,1.17,s),E(c,0,.52,.69,.36,.73,.06,Pe.wood);for(let l of[-.71,-.38,-.03])Ze(i,l,.31,.74,.135,.33,"#d2be8e",.11),E(i,l,.5,.74,.12,.035,.11,"#a68b58");return}if(e==="boathouse"){for(let l=0;l<12;l++)E(i,(l-5.5)*.225,.18,0,.214,.08,1.7,l%2?"#b19a71":"#bea67b");for(let l of[-1.16,1.16])for(let u of[-.72,.72])E(i,l,.87,u,.095,1.54,.095,Pe.wood);E(i,0,.79,-.74,2.38,1.16,.09,"#a99069"),Xt(i,2.51,1.7,1.64,s);let o=new pi;o.moveTo(-1.02,0);for(let[l,u]of[[-.67,-.29],[.66,-.24],[1.02,0],[.66,.24],[-.67,.29]])o.lineTo(l,u);o.closePath();let c=new Ue(new Fi(o,{depth:.22,bevelEnabled:!0,bevelSize:.025,bevelThickness:.025,bevelSegments:1,steps:1}),Tt("#718b89"));c.rotation.x=Math.PI/2,c.position.set(0,.48,.22),c.castShadow=!0,i.add(c),E(i,0,.49,.22,1.6,.03,.37,"#a18761");for(let l of[-.4,.2,.67])E(i,l,.55,.22,.16,.06,.46,"#d2bd91");for(let l of[-.19,.67]){let u=E(i,-.03,.65,l,1.64,.038,.05,"#c6ac7c");u.rotation.y=l<0?.15:-.15,E(i,-.89,.65,l,.23,.04,.13,"#baa074")}Ze(i,-1.04,.36,.73,.14,.3,"#957750");return}}function nM(i,e,t){if(e==="wheatfield"){E(i,0,.045,0,2.9,.09,1.9,"#927554");for(let l of[-.88,.88])E(i,0,.1,l,2.85,.085,.055,"#af9872");for(let l of[-1.4,1.4])for(let u of[-.88,.88])E(i,l,.24,u,.065,.46,.065,Pe.wood),E(i,l,.46,u,.1,.05,.1,"#b29771");let o=new ge;o.name="crop-patch",o.userData.movingPart=!0,o.position.y=.1,i.add(o);for(let l of[-1,1])for(let u=0;u<4;u++)for(let d=0;d<5;d++){let f=l*(.4+u*.23),h=(d-2)*.31;E(i,f,.098,h,.028,.018,.22,"#70593f");for(let p of[-.04,.035]){E(o,f+p,.21,h,.017,.4,.017,"#96a55b");let x=E(o,f+p,.41,h,.06,.15,.048,["#dfbb6c","#d6aa56","#d9bd7a","#e1c78b"][t%4]);x.rotation.z=l*.13}}E(i,1.11,.23,.69,.38,.16,.28,"#987953");for(let l=0;l<3;l++)E(i,1.11,.35+l*.02,.68,.3,.08,.2,"#d6b777");let c=E(i,-1.34,.33,.68,.022,.58,.023,Pe.wood);c.rotation.z=.25,E(i,-1.4,.56,.68,.2,.024,.065,"#7b8272");return}E(i,0,.09,0,2.86,.18,2.86,"#b9b09a");let n=new Ue(new Ui(.56,.81,1.9,16),Tt("#ddccb0"));n.position.set(-.18,1.03,-.22),n.castShadow=!0,n.receiveShadow=!0,i.add(n);for(let o=0;o<8;o++)for(let c=0;c<16;c++){let l=c*Math.PI/8+o%2*Math.PI/16,u=.81-o*.026,d=E(i,-.18+Math.sin(l)*u,.25+o*.2,-.22+Math.cos(l)*u,Math.PI*u/8*.87,.17,.055,o%2?"#c6b79d":"#bcae96");d.rotation.y=l}let s=new Ue(new Ir(.84,.85,8),ms(["#8f6550","#778771","#6b8290","#a48a62"][t%4],"roof"));s.position.set(-.18,2.4,-.22),s.castShadow=!0,i.add(s),E(i,-.18,.57,.55,.4,.81,.065,Pe.wood),E(i,-.18,.16,.74,.65,.11,.36,"#a79c87"),jr(i,-.18,1.14,.49,.36,.47);let r=new ge;r.name="mill-fan",r.userData.movingPart=!0,r.position.set(-.18,2.2,.71),i.add(r);for(let o=0;o<4;o++){let c=new ge;c.rotation.z=o*Math.PI/2,r.add(c),E(c,0,.72,0,.055,1.55,.055,Pe.beam),E(c,.12,.92,.025,.28,.9,.035,"#e0d1ab");for(let l=0;l<5;l++)E(c,.12,.58+l*.17,.052,.29,.027,.02,"#a89062")}Ze(r,0,0,.06,.11,.14,"#897358").rotation.x=Math.PI/2;let a=new ge;a.position.set(.85,0,-.35),i.add(a),E(a,0,.49,0,.68,.82,1.4,"#a58860"),Xt(a,.8,1.51,.99,"#8c7759");for(let o of[.85,1.09])Ze(i,.63,.24,o,.14,.39,"#cbbc93",.11),E(i,.63,.44,o,.13,.08,.13,"#a59475");E(i,-1.02,.3,-.99,.47,.47,.42,"#97764c");for(let o of[.14,.3,.46])E(i,-1.02,o,-.76,.5,.055,.055,"#b29870")}function kg(i,e=0,t=0){let n=new ge;if(n.name=`${i}-${e}-${t}`,["vegetablefield","cowshed","pigpen","fishinghut","restaurant","apronstand","harvesttable","wheatbanner"].includes(i))Ig(n,i,e);else if(i==="wheatfield"||i==="mill")nM(n,i,e);else if(["bakery","cafe","grocer","florist"].includes(i))eM(n,i,e);else if(["library","greenhouse","granary","boathouse"].includes(i))tM(n,i,e);else if(i==="house")Dg(n,e,i);else if(i==="hall"){E(n,0,.1,0,2.8,.2,2.8,"#b3aa90"),E(n,0,.96,0,2.28,1.72,2.02,"#e3d4b1");for(let a of[-1.13,1.13])E(n,a,1,1.02,.09,1.8,.09,Pe.beam);Dt(n,-.7,1.12,1.04),Dt(n,.7,1.12,1.04);let s=new ge;s.rotation.y=Math.PI,n.add(s),Dt(s,-.7,1.12,1.04),Dt(s,.7,1.12,1.04);for(let a of[-1.18,1.18]){let o=new ge;o.rotation.y=a<0?-Math.PI/2:Math.PI/2,n.add(o),Dt(o,0,1.05,1.17)}E(n,0,.62,1.037,.57,1.06,.02,"#322f2b");let r=new ge;r.name="door-hinge",r.userData.movingPart=!0,r.position.set(-.275,.62,1.1),n.add(r),E(r,.275,0,0,.55,1.04,.06,Pe.wood),E(r,.45,0,.045,.05,.05,.03,"#ccb36c");for(let a=0;a<3;a++)E(n,0,.06+a*.08,1.24-a*.1,.94,.12,.38,Pe.stone);Xt(n,2.55,2.25,1.95,"#63745b"),E(n,0,2.36,-.15,.64,.74,.65,"#e6dbb7"),Xt(n,.87,.87,2.76,"#546d54"),E(n,0,2.42,.19,.35,.35,.03,"#f5e9c8"),E(n,0,2.44,.215,.022,.12,.02,Pe.beam),E(n,.055,2.385,.22,.12,.02,.02,Pe.beam),Ze(n,-1.29,.85,1.2,.025,1.65,Pe.iron),E(n,-1.07,1.4,1.2,.4,.28,.025,"#c3a36b")}else if(i==="market"){E(n,0,.06,0,2.8,.12,2.8,"#b1aa90");for(let s of[-1.1,1.1])for(let r of[-1,1])E(n,s,.75,r,.1,1.5,.1,Pe.wood);Xt(n,2.52,2.5,1.52,"#a77e47");for(let s of[-.75,.75]){E(n,s,.43,.25,.7,.66,1.35,"#9d7951");for(let r=0;r<6;r++)for(let a=0;a<2;a++)E(n,s-.2+a*.3,.82,-.26+r*.19,.15,.12,.14,["#bb7447","#8d9b58","#d2b066"][r%3])}E(n,0,.53,-.85,2.05,.7,.35,"#b0976a")}else if(i==="park"){E(n,0,.055,0,1.93,.11,1.93,"#a8ba7f").material=ms("#a8ba7f","ground");for(let a of[-.91,.91])E(n,a,.18,-.1,.065,.25,1.7,"#e1d2ac");let s=Hc(e);s.scale.setScalar(.82),s.position.set(-.38,.08,-.36),n.add(s);let r=new ge;r.position.set(.4,.13,.55),fh(r),r.scale.setScalar(.85),n.add(r),E(n,0,.12,.42,1.7,.035,.34,"#cbbc98");for(let a=0;a<5;a++)E(n,-.6+a*.27,.19,-.79,.13,.12,.13,a%2?"#d9b674":"#b4797c")}else if(i==="bridge"){E(n,0,.08,0,.97,.18,2.28,"#b6ab91");for(let[s,r]of Lg.entries())E(n,0,r.y,r.z,.9,r.height,r.depth,s%2?"#c8bfa5":"#beb499");for(let s of[-.43,.43]){E(n,s,.38,0,.13,.29,2.25,"#ada18a");for(let r of[-.94,0,.94])E(n,s,.48,r,.2,.47,.19,"#b9ad94")}if(e)for(let s of[-.43,.43])for(let r of[-.94,.94])E(n,s,.74,r,.2,.045,.19,["#b9ad94","#718879","#83989e","#bb9c6c"][e%4])}else if(i==="workshop"){Dg(n,e%4,"house");let s=["#a8b6ae","#6eabc0","#c9978b","#a296bf","#d9b362"];if(E(n,0,1.17,.84,.7,.16,.07,s[t],!0),t>0&&(E(n,0,2.05,0,1.06,.75,1.05,"#e6d5b8"),Xt(n,1.3,1.3,2.48,s[t]),Dt(n,0,2.08,.56)),t>1){let r=E(n,0,1.7,.88,1.64,.12,.38,Pe.wood);r.name="balcony";for(let a=0;a<5;a++)E(n,(a-2)*.33,1.9,1.03,.04,.32,.04,s[t])}if(t>2&&(E(n,-.78,2.17,-.45,.38,1.8,.38,"#ccbfa7"),Xt(n,.55,.55,3.1,s[t])),t===4){Ze(n,0,3,0,.11,.7,"#d8b466",.04);for(let r of[-.39,.39])E(n,r,2.82,0,.12,.45,.12,"#d8b466");E(n,0,2.78,0,.86,.12,.12,"#d8b466")}}else if(i==="clock"){E(n,0,.1,0,2.65,.2,2.65,Pe.stone);for(let s=0;s<3;s++)E(n,0,.23+s*.12,.1,2.1-s*.25,.15,2.1-s*.25,"#b9b099");E(n,0,1.75,0,1.17,2.8,1.17,"#d4c6a5");for(let s=.6;s<3;s+=.28)E(n,0,s,.592,1.19,.025,.04,"#c1b495");for(let s=0;s<4;s++){let r=new ge;r.rotation.y=s*Math.PI/2,n.add(r),Ze(r,0,2.64,.64,.37,.07,"#f2e4b9").rotation.x=Math.PI/2,E(r,0,2.72,.7,.035,.2,.035,Pe.iron),E(r,.1,2.64,.7,.23,.035,.03,Pe.iron)}Xt(n,1.6,1.5,3.23,["#687b63","#8a6867","#728999","#ba965c"][e%4]),Ze(n,0,3.94,0,.045,.5,"#bda262")}else if(i==="tree")n.add(Hc(e));else if(i==="bench")fh(n,["#ab8352","#869b7c","#99a9b1","#c5bca4"][e%4]);else if(i==="lamp"||i==="gardenlamp"){if(QS(n,e),i==="gardenlamp")for(let s=0;s<6;s++){let r=s*Math.PI/3;E(n,Math.cos(r)*.28,.08,Math.sin(r)*.28,.18,.12,.18,"#87a36d")}}else if(i==="flower"){E(n,0,.2,0,.85,.36,.45,"#a57b54");for(let s=0;s<5;s++)E(n,(s-2)*.14,.42,0,.04,.2,.04,"#71835a"),E(n,(s-2)*.14,.55,0,.12,.08,.12,e%2?"#c48da1":"#e1b65e")}else if(i==="picnic"){E(n,0,.55,0,.82,.07,.65,e%2?"#839981":"#a58352");for(let s of[-.33,.33])E(n,s,.28,0,.07,.5,.08,Pe.wood),E(n,s*1.2,.29,0,.14,.06,.68,e%2?"#acbaa0":"#b79763");E(n,-.15,.62,.05,.18,.06,.18,"#d6c3a2")}else if(i==="birdhouse")E(n,0,.6,0,.08,1.2,.08,Pe.wood),E(n,0,1.12,0,.45,.43,.4,"#d6b273"),Xt(n,.61,.51,1.34,e%2?"#88a182":"#ab6952"),Ze(n,0,1.14,.225,.09,.025,Pe.beam).rotation.x=Math.PI/2;else if(i==="windmill"){E(n,0,.6,0,.39,1.12,.39,"#d4c2a4"),Xt(n,.61,.56,1.2,e%2?"#889cac":"#797e5e");let s=new ge;s.name="fan",s.position.set(0,1.05,.3),n.add(s);for(let r=0;r<4;r++){let a=E(s,0,0,0,.11,1.15,.045,e%2?"#becbd0":"#d9bf91");a.rotation.z=r*Math.PI/4}}else if(i==="statue"){let s=e%2?"#9cbbac":"#c9c4af";E(n,0,.17,0,.72,.34,.72,"#b0ac96"),E(n,0,.7,0,.31,.8,.31,s),E(n,0,1.21,0,.37,.37,.37,s),E(n,-.23,.88,0,.45,.12,.12,s)}else if(i==="barrel"){Ze(n,0,.3,0,.23,.58,"#92704c",.21);for(let s of[.1,.46])Ze(n,0,s,0,.239,.045,"#62675d");E(n,.29,.08,.05,.13,.14,.46,"#b49a72")}else if(i==="planter"){Ze(n,0,.14,0,.3,.28,"#b57958",.35),Ze(n,0,.29,0,.3,.025,"#625541");for(let s=0;s<7;s++){let r=s*2.4;E(n,Math.cos(r)*.17,.4,Math.sin(r)*.17,.025,.23,.025,"#6b8b5a");let a=new Ue(new mi(.074,1),Tt(s%2?"#ddb968":"#c69391"));a.position.set(Math.cos(r)*.17,.54,Math.sin(r)*.17),n.add(a)}}else if(i==="hedge")E(n,0,.25,0,.92,.5,.5,"#65845f"),E(n,0,.51,0,.88,.08,.47,"#7b986b");else if(i==="cart"){E(n,0,.32,0,.6,.15,.7,"#a6885c");for(let s of[-.36,.36])Ze(n,s,.18,0,.18,.065,"#6d5d46").rotation.z=Math.PI/2;for(let s of[-.32,.32])E(n,0,.49,s,.64,.24,.06,"#b59b74")}else if(i==="fountain")Ze(n,0,.12,0,.87,.22,"#b1b4a5"),Ze(n,0,.24,0,.7,.026,"#7aabb0"),Ze(n,0,.43,0,.15,.5,"#c6c6b2"),Ze(n,0,.67,0,.4,.09,"#c6c6b2");else if(i==="gazebo"){E(n,0,.08,0,1.86,.16,1.86,"#b8b5a5");for(let r of[-.7,.7])for(let a of[-.7,.7])E(n,r,.75,a,.08,1.5,.08,"#967a56");Xt(n,1.77,1.77,1.5,"#798c77");let s=new ge;s.position.set(0,.16,-.55),fh(s),n.add(s)}if(i==="greenhouse"){let s=new ge;s.name="vegetable-crops",s.userData.movingPart=!0,s.position.y=.7,n.add(s);for(let r of[-.85,.85])for(let a of[-.45,-.15,.15,.45])E(s,r,.12,a,.05,.24,.05,"#7f9e61"),E(s,r+.06,.24,a,.16,.07,.11,"#8ead72")}return n}function hh(i,e=0,t=!1){let n=new ge,s=new ge,r=["#d6aa85","#b88c6a","#e2b99a"][e%3];E(s,0,.35,0,.19,.25,.14,i),E(s,0,.54,0,.18,.18,.17,r),E(s,0,.635,-.018,.195,.065,.19,e%2?"#5a493d":"#a47b50"),E(s,0,.56,-.075,.18,.1,.035,e%2?"#5a493d":"#a47b50");for(let a of[-.04,.04])E(s,a,.55,.087,.018,.023,.012,"#47443c");E(s,0,.245,0,.2,.035,.145,"#706650"),n.add(Mi(s));for(let[a,o]of[["left",-.055],["right",.055]]){let c=new ge;c.name=`leg-${a}`,c.position.set(o,.235,0);let l=new ge;t?(E(l,0,-.004,.064,.073,.078,.145,"#53616a"),E(l,0,-.108,.125,.068,.2,.072,"#53616a"),E(l,0,-.218,.149,.084,.055,.12,"#5a483c")):(E(l,0,-.105,0,.073,.2,.085,"#53616a"),E(l,0,-.208,.027,.084,.055,.14,"#5a483c")),c.add(Mi(l)),n.add(c);let u=new ge;u.name=`arm-${a}`,u.position.set(o<0?-.137:.137,.43,0);let d=new ge;E(d,0,-.073,0,.065,.15,.085,i),E(d,0,-.169,0,.06,.068,.071,r),u.add(Mi(d)),t&&(u.rotation.x=-.38),n.add(u)}return n}function Mi(i){i.updateMatrixWorld(!0);let e=new ge;e.name=i.name,e.userData={...i.userData};let t=[];i.traverse(r=>{r.userData.movingPart&&t.push(r)});let n=r=>{let a=r;for(;a&&a!==i;){if(a.userData.movingPart)return a;a=a.parent}},s=(r,a,o)=>{let c=r.matrixWorld.clone().invert(),l=new Map;r.traverse(u=>{if(!(u instanceof Ue)||Array.isArray(u.material)||n(u)!==o)return;let d=u.geometry.index?u.geometry.toNonIndexed():u.geometry.clone();d.applyMatrix4(new Ye().multiplyMatrices(c,u.matrixWorld));let f=l.get(u.material)||[];f.push(d),l.set(u.material,f)});for(let[u,d]of l){let f=yg(d,!1);if(!f)continue;let h=new Ue(bg(f),u);f.dispose(),h.castShadow=!0,h.receiveShadow=!0,a.add(h),d.forEach(p=>p.dispose())}};s(i,e);for(let r of t){let a=new ge;a.name=r.name,a.userData={...r.userData},new Ye().multiplyMatrices(i.matrixWorld.clone().invert(),r.matrixWorld).decompose(a.position,a.quaternion,a.scale),s(r,a,r),e.add(a)}return e}function Bg(i,e,t=new Map){let n=i.size,s=new ge,r=new ge,a=new ge,o=4703+n,c=()=>(o=Math.imul(o,1664525)+1013904223>>>0,o/4294967296),l=i.terrain==="meadow"?-1:i.terrain==="valley"?11:5;E(a,n/2,-1.37,n/2,n+.1,.5,n+.1,"#756b54"),E(a,n/2,-.91,n/2,n+.08,.46,n+.08,"#9b8767"),E(a,n/2,-.61,n/2,n+.12,.17,n+.12,"#b1a080");let u=(S,C)=>E(a,n/2,-.29,S,n+.06,.55,C,"#b8a887");l<0?u(n/2,n):(u(l/2,l),u((l+2+n)/2,n-l-2));for(let S=0;S<n;S++)for(let C of[0,n])S%3===0&&E(a,S+.5,-.78,C,.85,.17+c()*.12,.035,"#88775d"),S%2===0&&E(a,S+.7,-1.14,C,.48,.11,.04,"#ab9474");for(let S=0;S<n;S++)for(let C of[0,n])pn(i,.5,S)||E(a,C,-.83,S+.4,.04,.2,.68+c()*.2,"#8e7c62");let d=[],f=[],h=new Se,p=(S,C)=>{let D=.94+Math.sin(S*.34+C*.12)*.035+Math.cos(C*.43-S*.17)*.025,F=ea(e,i,Math.min(n-1,Math.floor(S)),Math.min(n-1,Math.floor(C)));return h.set(F?"#91b474":"#729b71"),l>=0&&h.lerp(new Se("#8fa581"),Math.max(0,1-Math.min(Math.abs(C-l),Math.abs(C-l-2))/1.6)*.3),h.multiplyScalar(D)};for(let S=0;S<n;S++)for(let C=0;C<n;C++)if(!pn(i,C,S))for(let[D,F]of[[C,S],[C,S+1],[C+1,S],[C+1,S],[C,S+1],[C+1,S+1]]){d.push(D,.026,F);let N=p(D,F);f.push(N.r,N.g,N.b)}let x=new ft().setAttribute("position",new tt(d,3)).setAttribute("color",new tt(f,3));x.computeVertexNormals();let m=new Ue(x,new fn({vertexColors:!0,roughness:.95}));m.material.userData.seasonRole="ground",m.receiveShadow=!0,s.add(m);let g=Tt("#d6decf").clone();g.userData.seasonRole="ground";let b=new Ue(new ei(240,240),g);b.rotation.x=-Math.PI/2,b.position.set(n/2,-1.65,n/2),b.receiveShadow=!0,s.add(b);let T={value:0},_=[],M=(S,C,D,F,N=1,I=0)=>{let U=t.get(S);if(!U)return;let z=U.clone();return z.position.set(C,D,F),z.scale.setScalar(N),z.rotation.y=I,s.add(z),z},A=(S,C,D,F)=>{let N=[];for(let z=0;z<n*4;z++){let V=z/4,Z=(z+1)/4;for(let[q,J]of[[V,S(V)],[V,C(V)],[Z,S(Z)],[Z,S(Z)],[V,C(V)],[Z,C(Z)]])N.push(q,D,J)}let I=new ft().setAttribute("position",new tt(N,3));I.computeVertexNormals();let U=new Ue(I,Tt(F));U.receiveShadow=!0,s.add(U)};if(l>=0){E(a,n/2,-.43,l+1,n+.17,.12,2.05,"#457b7c");let S=new fn({color:"#499a9e",roughness:.23,metalness:.06,transparent:!1,opacity:1});S.onBeforeCompile=N=>{N.uniforms.townTime=T,N.vertexShader=`uniform float townTime; varying vec3 townPosition;
`+N.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
transformed.z += sin(position.x * 2.1 - townTime * .65) * .006 + sin(position.x * .72 + position.y * 8.3 - townTime * .38) * .003;`).replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
townPosition = (modelMatrix * vec4(transformed, 1.0)).xyz;`),N.fragmentShader=`uniform float townTime; varying vec3 townPosition;
`+N.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
        float depth = min(abs(townPosition.z - ${l.toFixed(1)}), abs(townPosition.z - ${(l+2).toFixed(1)}));
        float flow = sin(townPosition.x * .9 - townTime * .38 + sin(townPosition.z * 5.0)) * .035;
        float ripple = pow(max(0.0, sin(townPosition.x * 3.2 - townTime * .65 + sin(townPosition.z * 12.0) * .4)), 32.0);
        diffuseColor.rgb *= .95 + flow;
        diffuseColor.rgb += vec3(.10,.19,.13) * (1.0 - smoothstep(.1,.48,depth));
        diffuseColor.rgb += vec3(.17,.20,.18) * ripple * .13;`)};let C=new Ue(new ei(n+.15,2,n*6,10),S);C.rotation.x=-Math.PI/2,C.position.set(n/2,-.19,l+1),s.add(C);let D=vs(i);for(let N of[-1,1]){let I=N<0?l:l+2,U=-N;A(z=>I+U*(.06+Math.sin(z*.78)*.035),z=>I+U*(.25+Math.sin(z*.78)*.06+Math.sin(z*1.9)*.04),-.16,"#92b6a4"),A(()=>I,z=>I+U*(.14+Math.sin(z*.78)*.035),-.045,"#b0b29a")}for(let N=0;N<n;N++)for(let I of[-1,1]){let U=I<0?l:l+2,z=Math.sin(N*.85)*.05;if(!D.includes(N)&&N%3!==1){for(let V=0;V<4;V++){let Z=N+.08+c()*.82,q=U-I*(.06+c()*.14)+z;if(t.has("rock"))M("rock",Z,-.15,q,.35+c()*.35,c()*6);else{let J=new Ue(new Ga(.12+c()*.06,0),Tt(V%2?"#a5b2a0":"#bec2ab"));J.position.set(Z,-.12,q),J.scale.y=.55,a.add(J)}}for(let V=0;V<6;V++){let Z=E(a,N+.18+V*.07,.055+V%2*.025,U-I*.08,.018,.21+c()*.15,.018,"#657f56");Z.rotation.z=(c()-.5)*.3,V%2===0&&E(a,Z.position.x,.22,U-I*.08,.033,.075,.033,"#927b4e")}}}for(let N of D){let I=new Ue(new ei(.65,1.65),new sn({color:"#e2dbc0",transparent:!0,opacity:.2,side:rn}));I.rotation.x=-Math.PI/2,I.position.set(N+.5,-.18,l+1),s.add(I)}for(let N=0;N<5;N++)E(a,-.36,-.1,l+.1+N*.13,.6,.05,.115,"#a7895c");for(let N of[l+.08,l+.69])E(a,-.63,-.21,N,.09,.47,.09,"#806d51");let F=new ge;F.name="river-boat",F.position.set(n-5.4,-.15,l+1.14),E(F,0,0,0,.68,.1,.34,"#9d7550");for(let N of[-.33,.33])E(F,N,.07,0,.06,.12,.36,"#b48a5c");for(let N of[-.16,.16])E(F,0,.08,N,.65,.13,.05,"#ac8055");E(F,0,.09,0,.12,.045,.3,"#d0ac75"),s.add(Mi(F));for(let N=0;N<3;N++){let I=new ge,U=new Ue(new Nr(.08,10,6),Tt(N?"#e2d7b5":"#eee4c9"));U.scale.set(1.6,.8,1),I.add(U);let z=new Ue(new Nr(.047,8,6),Tt("#ece1c2"));z.position.set(.095,.068,0),I.add(z),E(I,.14,.064,0,.055,.022,.035,"#c49a56"),s.add(I),_.push(I)}for(let N=0;N<8;N++){let I=new Ue(new Ba(.045+c()*.035,8),Tt("#6a976d"));I.rotation.x=-Math.PI/2,I.position.set(2+c()*(n-4),-.178,l+(N%2?.29:1.7)),s.add(I)}}let R=[];if(i.terrain==="valley"){let S=(I,U)=>{let z=Math.max(0,1-Math.hypot((I-3)/8,(U+7)/7)),V=Math.max(0,1-Math.hypot((I-20)/10,(U+8)/7));return-1.64+Math.max(z*z*4.2,V*V*5.5)},C=[],D=[];for(let I=-14;I<-1;I++)for(let U=-6;U<n+7;U++)for(let[z,V]of[[U,I],[U,I+1],[U+1,I],[U+1,I],[U,I+1],[U+1,I+1]]){let Z=S(z,V);C.push(z,Z,V);let q=new Se("#879e75").multiplyScalar(.9+Math.max(0,Z+1.64)*.035);D.push(q.r,q.g,q.b)}let F=new ft().setAttribute("position",new tt(C,3)).setAttribute("color",new tt(D,3));F.computeVertexNormals();let N=new Ue(F,new fn({vertexColors:!0,roughness:.95}));N.material.userData.seasonRole="ground",N.receiveShadow=!0,s.add(N);for(let I=-13;I<-1;I+=2)for(let U=-5;U<n+7;U+=2)if(!(S(U+1,I+1)<=-1.6)){if(c()>.39){let V=U+.5+c(),Z=I+.4+c();R.push({x:V,y:S(V,Z)+.035,z:Z,scale:.75+c()*.65,variant:(U+I+100)%3})}c()>.73&&M("boulder",U+.8,S(U+.8,I+.8),I+.8,.8,c()*6)}for(let I of[{x:5,z:4},{x:18,z:4},{x:19,z:19}])for(let U=0;U<22;U++){let z=c()*Math.PI*2,V=Math.sqrt(c())*4.3,Z=I.x+Math.cos(z)*V,q=I.z+Math.sin(z)*V;Z<.7||q<.7||Z>n-.7||q>n-.7||pn(i,Math.floor(Z),Math.floor(q))||Math.abs(q-12)<2.5||ea(e,i,Z,q)||R.push({x:Z,y:.03,z:q,scale:.64+c()*.65,variant:U%3})}}else for(let S of[-1.1,n+1.1])for(let C=0;C<5;C++)R.push({x:S,y:-1.62,z:1+C*2.2,scale:.75,variant:C%3});let v=new vt;for(let S=0;S<3;S++){let C=t.get(["tree-0","pine","birch"][S]),D=Mi(C||Hc(S)),F=R.filter(N=>N.variant===S);for(let N of D.children){let I=N.material.clone();I.userData.seasonRole="grove";let U=new An(N.geometry,I,F.length);U.name="curated-grove",F.forEach((z,V)=>{v.position.set(z.x,z.y,z.z),v.scale.setScalar(z.scale),v.rotation.y=V*1.73,v.updateMatrix(),U.setMatrixAt(V,v.matrix)}),U.castShadow=!0,U.receiveShadow=!0,r.add(U)}}for(let S=0;S<n*3;S++){let C=.3+c()*(n-.6),D=.3+c()*(n-.6);if(!(pn(i,Math.floor(C),Math.floor(D))||i.roads.includes(`${Math.floor(C)},${Math.floor(D)}`)||i.buildings.some(F=>F.placed&&Math.abs(F.x+1-C)<1.6&&Math.abs(F.z+1-D)<1.6)))for(let F=0;F<3;F++){let N=C+(c()-.5)*.35,I=D+(c()-.5)*.35;E(a,N,.08,I,.018,.1,.018,"#74865a"),E(a,N,.145,I,.05,.025,.05,S%3?"#decb91":"#c894a0")}}if(i.terrain==="valley"){if(!e.chapterStars[1])for(let S=14;S<24;S+=2){for(let C of[S,S+1.85])E(a,Mo+.05,.3,C,.075,.58,.075,"#9a8767");for(let C of[.23,.46])E(a,Mo+.05,C,S+.93,.045,.055,1.8,"#b4a280")}if(!e.chapterStars[2]){for(let S=1;S<24;S+=2)if(!(vs(i).includes(S)||vs(i).includes(S-1))){for(let C of[S,S+1.8])E(a,C,.29,10.65,.075,.56,.075,"#9a8767");for(let C of[.23,.43])E(a,S+.9,C,10.65,1.7,.055,.04,"#b4a280")}}}return s.add(Mi(a)),{world:s,forest:r,update(S){T.value=S/1e3,_.forEach((C,D)=>{let F=S*65e-6;C.position.set(n*.28+Math.sin(F)*n*.19-D*.25,-.12+Math.sin(S*.002+D)*.007,l+1+Math.sin(F*1.3)*.28+D*.09),C.rotation.y=Math.cos(F)>0?0:Math.PI})}}}var ph=Math.PI*26/180,mh=Math.PI*72/180,gh=Math.PI*40/180,xh=i=>Math.max(ph,Math.min(mh,i)),zg=i=>Math.max(.52,Math.min(3.2,i));function Gg(i,e,t){let n=i.deltaMode===1?16:i.deltaMode===2?Math.max(1,t):1,s=Number.isFinite(i.deltaX)?i.deltaX*n:0,r=Number.isFinite(i.deltaY)?i.deltaY*n:0,a=Math.hypot(s,r);return a>120&&(s*=120/a,r*=120/a),i.ctrlKey||i.metaKey?{kind:"zoom",x:0,y:-r*.01}:i.shiftKey?{kind:"pan",x:s,y:r}:e==="mouse"?{kind:"zoom",x:0,y:-r*.0025}:{kind:"orbit",x:-s*.0035,y:-r*.0028}}function Xc(i,e=!1,t=18){return e?1:1-Math.exp(-Math.max(0,i)*t)}var _h=i=>`${i.x},${i.z}`,Zr=(i,e)=>(i%e+e)%e,Vg=i=>({x:-i.z,z:i.x}),qc=(i,e)=>{let t=Math.hypot(e.x-i.x,e.z-i.z);return{x:(e.x-i.x)/t,z:(e.z-i.z)/t}};function iM(i,e,t){return e.every((n,s)=>s===t||Math.hypot(n.x-i.x,n.z-i.z)>=.35)}function Wg(i,e,t){let n=e+i/.32*Math.PI*2,s=t?Math.sin(n):0;return{phase:n,leg:s*.58,arm:t?-s*.35:0,bob:t?Math.abs(Math.sin(n*2))*.009:0}}function Hg(i){let e=[];for(let u of i){let[d,f]=u.split(",").map(Number);for(let[h,p,x,m]of[[0,-1,{x:d,z:f},{x:d+1,z:f}],[1,0,{x:d+1,z:f},{x:d+1,z:f+1}],[0,1,{x:d+1,z:f+1},{x:d,z:f+1}],[-1,0,{x:d,z:f+1},{x:d,z:f}]])i.has(`${d+h},${f+p}`)||e.push({a:x,b:m})}let t=new Map;e.forEach((u,d)=>{let f=t.get(_h(u.a))||[];f.push(d),t.set(_h(u.a),f)});let n=new Set,s=[];for(let u=0;u<e.length;u++){if(n.has(u))continue;let d=[],f=u;for(;!n.has(f);){n.add(f);let h=e[f];d.push(h.a);let p=qc(h.a,h.b),x=(t.get(_h(h.b))||[]).filter(m=>!n.has(m)||m===u);if(x.sort((m,g)=>{let b=T=>{let _=qc(e[T].a,e[T].b);return p.x*_.z-p.z*_.x===1?0:p.x*_.x+p.z*_.z===1?1:2};return b(m)-b(g)||m-g}),!x.length)break;f=x[0]}f===u&&d.length>=4&&s.push(d)}let r=u=>u.reduce((d,f,h)=>{let p=u[(h+1)%u.length];return d+f.x*p.z-p.x*f.z},0),a=s.sort((u,d)=>r(d)-r(u))[0];if(!a)return{points:[],lengths:[],length:0};let o=a.filter((u,d)=>{let f=a[(d+a.length-1)%a.length],h=a[(d+1)%a.length];return(u.x-f.x)*(h.z-u.z)!==(u.z-f.z)*(h.x-u.x)}),c=[];o.forEach((u,d)=>{let f=o[(d+o.length-1)%o.length],h=o[(d+1)%o.length],p=qc(f,u),x=qc(u,h),m=Vg(p),g=Vg(x),b={x:u.x+(m.x+g.x)*.24,z:u.z+(m.z+g.z)*.24},T={x:b.x-p.x*.12,z:b.z-p.z*.12},_={x:b.x+x.x*.12,z:b.z+x.z*.12};for(let M=0;M<=8;M++){let A=M/8,R=1-A;c.push({x:R*R*T.x+2*R*A*b.x+A*A*_.x,z:R*R*T.z+2*R*A*b.z+A*A*_.z})}});let l=[0];return c.forEach((u,d)=>{let f=c[(d+1)%c.length];l.push(l[d]+Math.hypot(f.x-u.x,f.z-u.z))}),{points:c,lengths:l,length:l.at(-1)}}function Vn(i,e){if(!i.length)return{x:0,z:0,angle:0};let t=Zr(e,i.length),n=0,s=i.points.length-1;for(;n<s;){let c=n+s+1>>1;i.lengths[c]<=t?n=c:s=c-1}let r=i.points[n],a=i.points[(n+1)%i.points.length],o=(t-i.lengths[n])/(i.lengths[n+1]-i.lengths[n]);return{x:r.x+(a.x-r.x)*o,z:r.z+(a.z-r.z)*o,angle:Math.atan2(a.x-r.x,a.z-r.z)}}function sM(i,e){let t=1/0,n=0;return i.points.forEach((s,r)=>{let a=i.points[(r+1)%i.points.length],o=a.x-s.x,c=a.z-s.z,l=Math.hypot(o,c);if(!l)return;let u=Math.max(0,Math.min(1,((e.x-s.x)*o+(e.z-s.z)*c)/(l*l))),d=Math.hypot(s.x+o*u-e.x,s.z+c*u-e.z);d<t&&(t=d,n=i.lengths[r]+u*l)}),n}var $c=class{constructor(e,t,n=32){this.people=[];this.blockers=[];this.track=Hg(e),this.random=()=>(n=Math.imul(n,1664525)+1013904223>>>0,n/4294967296);let s=Math.min(t,Math.floor(this.track.length/2.5));for(let r=0;r<s;r++){let a=(r+.37)/s*this.track.length,o=Vn(this.track,a);this.people.push({...o,active:!0,distance:a,speed:0,cruiseSpeed:.44+this.random()*.12,travelled:0,totalTravelled:0,pause:this.random(),untilPause:12+this.random()*16,phase:this.random()*6})}}retarget(e){this.track=Hg(e);for(let t of this.people)t.distance=sM(this.track,t),t.retargeting=this.track.length>0&&Math.hypot(t.x-Vn(this.track,t.distance).x,t.z-Vn(this.track,t.distance).z)>.005;this.blockers=[]}update(e){if(this.people.forEach(s=>{s.travelled=0}),!this.track.length)return;let t=this.people.filter(s=>s.active).sort((s,r)=>s.distance-r.distance),n=t.map(s=>s.distance);this.people.forEach(s=>{s.travelled=0}),t.forEach((s,r)=>{if(s.retargeting){let d=Vn(this.track,s.distance),f=Math.hypot(d.x-s.x,d.z-s.z),h=Math.min(f,e*.54),p={x:s.x+(d.x-s.x)*h/(f||1),z:s.z+(d.z-s.z)*h/(f||1)};if(iM(p,t,r)){if(h>1e-5){let x=Math.atan2(d.x-s.x,d.z-s.z),m=Math.atan2(Math.sin(x-s.angle),Math.cos(x-s.angle));s.angle+=Math.max(-e*4,Math.min(e*4,m))}s.x=p.x,s.z=p.z,s.travelled=h,s.totalTravelled+=h,f<=h+.005&&(s.retargeting=!1)}return}s.pause=Math.max(0,s.pause-e),s.untilPause-=e,s.untilPause<=0&&s.pause===0&&(s.pause=.6+this.random()*1.1,s.untilPause=14+this.random()*18);let a=Math.min(t.length>1?Zr(n[(r+1)%n.length]-n[r],this.track.length):1/0,...this.blockers.map(d=>Zr(d-n[r],this.track.length))),o=Math.max(0,a-.82),c=s.pause?0:Math.min(s.cruiseSpeed,o*1.5);s.speed+=Math.max(-e*1.2,Math.min(e*1.2,c-s.speed)),s.travelled=Math.min(o,s.speed*e),s.totalTravelled+=s.travelled,s.distance=Zr(s.distance+s.travelled,this.track.length);let l=Vn(this.track,s.distance);s.x=l.x,s.z=l.z;let u=Math.atan2(Math.sin(l.angle-s.angle),Math.cos(l.angle-s.angle));s.angle+=Math.max(-e*4,Math.min(e*4,u*(1-Math.exp(-e*12))))})}canJoin(e,t=.72){return this.people.filter(n=>n.active).every(n=>Math.min(Zr(n.distance-e,this.track.length),Zr(e-n.distance,this.track.length))>=t)}join(e,t){let n=this.people[e];Object.assign(n,Vn(this.track,t),{distance:t,active:!0,speed:0,pause:0,untilPause:20})}};function Xg(i,e){let t=new ge,n=new Set(i.roads),s=new Set(i.buildings.filter(f=>f.placed).flatMap(f=>Wn(f).map(h=>ze(h.x,h.z)))),r=new vt,a=["#b9b6a9","#aaa99d","#c6c1b1","#a9b2a9","#b6ae9e"],o=new An(new $s(1,1,1,1,.09),Tt("#ffffff"),i.roads.length*16),c=new An(new Bn(.99,.035,.99),Tt("#898e7f"),i.roads.length),l=[],u=0;for(let[f,h]of i.roads.entries()){let p=qn(h);r.position.set(p.x+.5,.046,p.z+.5),r.scale.setScalar(1),r.rotation.set(0,0,0),r.updateMatrix(),c.setMatrixAt(f,r.matrix);for(let x=0;x<4;x++)for(let m=0;m<4;m++){let g=Math.abs(Math.imul(p.x*19+p.z*43+x*7+m*13,2654435761))>>>0;r.position.set(p.x+.125+m*.25+(g%5-2)*.004,.07+g%3*.002,p.z+.125+x*.25),r.scale.set(.226+g%4*.002,.055,.221+g%3*.003),r.rotation.y=(g%5-2)*.018,r.updateMatrix(),o.setMatrixAt(u,r.matrix);let b=new Se(a[g%a.length]);e.connectedRoads.has(h)||b.multiplyScalar(.77),o.setColorAt(u++,b)}for(let[x,m]of[[1,0],[-1,0],[0,1],[0,-1]])if(!n.has(ze(p.x+x,p.z+m))&&!s.has(ze(p.x+x,p.z+m)))for(let g=0;g<4;g++)l.push({x:p.x+.5+x*.47+(m?(g-1.5)*.245:0),z:p.z+.5+m*.47+(x?(g-1.5)*.245:0),horizontal:m!==0})}let d=new An(new $s(1,1,1,1,.08),Tt("#cfcbba"),l.length);l.forEach((f,h)=>{r.position.set(f.x,.085,f.z),r.rotation.set(0,0,0),r.scale.set(f.horizontal?.235:.075,.09,f.horizontal?.075:.235),r.updateMatrix(),d.setMatrixAt(h,r.matrix)});for(let f of[c,o,d])f.receiveShadow=!0,t.add(f);return t.name="connected-stone-streets",t}var Yc=class{constructor(){this.uniforms={spring:{value:0},autumn:{value:0},winter:{value:0}};this.installed=new WeakSet}install(e,t){e.traverse(n=>{if(n instanceof Ue)for(let s of Array.isArray(n.material)?n.material:[n.material]){if(!(s instanceof fn)||this.installed.has(s))continue;let r=s.userData.seasonRole||t;r&&(this.installed.add(s),s.onBeforeCompile=a=>{a.uniforms.townSpring=this.uniforms.spring,a.uniforms.townAutumn=this.uniforms.autumn,a.uniforms.townWinter=this.uniforms.winter,a.fragmentShader=`uniform float townSpring; uniform float townAutumn; uniform float townWinter;
`+a.fragmentShader;let c=r==="roof"?"diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.78,.85,.88),townWinter*.90);":`float leaf=${r==="grove"?"step(diffuseColor.r*1.12,diffuseColor.g)*step(diffuseColor.b*.95,diffuseColor.g)":"1.0"}; diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.46,.63,.32),townSpring*leaf*.25); diffuseColor.rgb=mix(diffuseColor.rgb,vec3(${r==="ground"?".48,.40,.20":".64,.28,.075"}),townAutumn*leaf*.75); diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.76,.83,.86),townWinter*leaf*.94);`;a.fragmentShader=a.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
`+c)},s.customProgramCacheKey=()=>`town-season-${r}`,s.needsUpdate=!0)}})}update(e,t){for(let n of["spring","autumn","winter"])this.uniforms[n].value+=(+(e===n)-this.uniforms[n].value)*(1-Math.exp(-t*1.8))}get snow(){return this.uniforms.winter.value}};function vh(i){let e=Ut(i),t=-i.rotation*Math.PI/2,n=i.kind==="hall",s=(r,a)=>({x:i.x+e.w/2+r*Math.cos(t)+a*Math.sin(t),z:i.z+e.d/2-r*Math.sin(t)+a*Math.cos(t)});return{id:i.id,outside:s(n?0:.18,n?1.78:1.32),inside:s(n?0:.18,n?.91:.65),yaw:t}}var gs=(i,e)=>Math.hypot(i.x-e.x,i.z-e.z),Jr=(i,e)=>(i%e+e)%e;function wi(i,e){let t=1/0,n=0;return i.points.forEach((s,r)=>{let a=i.points[(r+1)%i.points.length],o=a.x-s.x,c=a.z-s.z,l=Math.hypot(o,c),u=Math.max(0,Math.min(1,((e.x-s.x)*o+(e.z-s.z)*c)/(l*l))),d=Math.hypot(s.x+o*u-e.x,s.z+c*u-e.z);d<t&&(t=d,n=i.lengths[r]+u*l)}),n}var Kc=class{constructor(e,t,n=!1,s=new Map){this.traffic=e;this.jobs=new Map;this.routesDirty=!1;this.places=[];this.pavement=new Set;this.randomSeed=479;this.doors=t.map(r=>({...r,exit:wi(e.track,r.outside),open:0,busy:null})),this.residents=e.people.map((r,a)=>{let o=s.get(a),c=this.doors.length?a%this.doors.length:-1,l=n&&c>=0?"sleeping":o?"seated":"walking";return r.active=l==="walking",l==="sleeping"?Object.assign(r,this.doors[c].inside):o&&Object.assign(r,o.position,{angle:o.yaw}),{mode:l,visible:l!=="sleeping",home:c,seat:o,path:[],wait:0,travelled:0,seated:l==="seated",nextVisit:4+a*1.7}})}random(){return this.randomSeed=Math.imul(this.randomSeed,1664525)+1013904223>>>0,this.randomSeed/4294967296}setPlaces(e,t){let n=this.pavement.size!==t.size||[...this.pavement].some(r=>!t.has(r)),s=e.filter(r=>r.id.startsWith("festival-"));if(s.length&&!this.places.some(r=>r.id.startsWith("festival-")))for(let r of this.residents)r.nextVisit=Math.min(r.nextVisit,3);this.places=s.length?s:e,this.pavement=t;for(let r of this.residents)r.visitId&&(n||!e.some(a=>a.id===r.visitId))&&(r.mode="joining",r.path=[],r.joinArc=void 0,r.visitId=void 0)}assignJobs(e,t){this.workRoute=t;let n=this.residents.map((r,a)=>({r,i:a})).filter(({r})=>!r.seat),s=new Map;e.forEach((r,a)=>{let o=n[a];if(!o)return;let{r:c,i:l}=o,u=this.traffic.people[l];s.set(l,r),(["walking","visiting","lingering"].includes(c.mode)||c.mode==="working"&&(this.routesDirty||this.jobs.get(l)?.fieldId!==r.fieldId))&&(c.visitId=void 0,c.mode="working",u.active=!1,u.speed=0,c.path=[...t(u,r.entrance),r.target])}),this.residents.forEach((r,a)=>{r.mode==="working"&&!s.has(a)&&(r.mode="joining",r.path=[],r.joinArc=void 0)}),this.jobs=s,this.routesDirty=!1}retarget(e,t){this.routesDirty=!0;let n=this.residents.map(r=>this.doors[r.home]?.id),s=e.map(r=>{let a=this.doors.find(o=>o.id===r.id);return a?Object.assign(a,r,{exit:wi(this.traffic.track,r.outside)}):{...r,exit:wi(this.traffic.track,r.outside),open:0,busy:null}});this.doors.splice(0,this.doors.length,...s),this.residents.forEach((r,a)=>{let o=this.doors.findIndex(c=>c.id===n[a]);if(r.home=o>=0?o:this.doors.length?a%this.doors.length:-1,r.mode==="joining"?(r.joinArc=void 0,r.path=[]):r.joinArc!==void 0&&(r.joinArc=wi(this.traffic.track,this.traffic.people[a])),r.seat?.id){let c=t.find(l=>l.id===r.seat.id);c?r.seat=c:(r.seated&&(r.seated=!1,r.mode="joining",r.path=[Vn(this.traffic.track,wi(this.traffic.track,this.traffic.people[a]))]),r.seat=void 0)}})}update(e,t){this.traffic.blockers=[],this.residents.forEach((n,s)=>{let r=this.traffic.people[s];if(r.active||(n.joinArc!==void 0&&this.traffic.blockers.push(n.joinArc),!n.visible||n.seated))return;let a=wi(this.traffic.track,r);gs(r,Vn(this.traffic.track,a))<(["visiting","lingering"].includes(n.mode)?.22:.46)&&this.traffic.blockers.push(a)}),this.traffic.update(e),this.doors.forEach(n=>{let s=n.busy!==null?1:0;n.open+=Math.max(-e*1.8,Math.min(e*1.8,s-n.open))}),this.residents.forEach((n,s)=>{let r=this.traffic.people[s],a=this.doors[n.home];if(n.travelled=r.travelled,n.wait=Math.max(0,n.wait-e),n.nextVisit=Math.max(0,n.nextVisit-e),["visiting","lingering"].includes(n.mode)&&t&&(n.mode="joining",n.path=[],n.joinArc=void 0,n.visitId=void 0),n.mode==="walking"&&!t&&!n.seat&&!this.jobs.has(s)&&!n.nextVisit&&this.workRoute){let o=new Set(this.residents.map(l=>l.visitId).filter(Boolean)),c=this.places.filter(l=>!o.has(l.id)&&gs(r,l.position)>.8);if(c.length&&o.size<3&&!this.residents.some(l=>l.mode==="visiting")){let l=c[Math.floor(this.random()*c.length)],u=this.workRoute(r,l.position);u.length&&(n.visitId=l.id,n.mode="visiting",n.path=[...u,l.target||l.position],r.active=!1,r.speed=0)}n.nextVisit=20+this.random()*35}if(n.mode==="joining"&&n.joinArc===void 0&&this.traffic.track.length){let o=t&&a?Jr(a.exit-.3,this.traffic.track.length):wi(this.traffic.track,r);for(let c=0;c<this.traffic.track.length;c+=.5){let l=Jr(o+c,this.traffic.track.length);if(!this.joinAvailable(l,1.5,s))continue;n.joinArc=l;let u=Vn(this.traffic.track,l);n.path=[...this.workRoute?.(r,u)||[],u];break}if(n.joinArc===void 0)return}if(n.mode==="working"&&!n.path.length){let o=this.jobs.get(s);o&&gs(r,o.target)>.015&&(n.path=[o.target])}if(n.mode==="seated"&&t&&a&&(n.mode="standing",n.wait=.45),n.mode==="standing"&&n.wait===0){let o=wi(this.traffic.track,n.seat.via);this.joinAvailable(o,1.5,s)&&(n.joinArc=o,n.seated=!1,n.mode="joining",n.path=[n.seat.via,Vn(this.traffic.track,o)])}if(n.mode==="walking"&&t&&a&&(n.mode="going-home",r.pause=0,r.untilPause=999),n.mode==="walking"&&!t&&n.seat&&(n.mode="going-seat"),n.mode==="going-home"&&!t&&(n.mode="walking"),n.mode==="going-seat"&&t&&(n.mode="going-home"),n.mode==="going-home"&&a&&a.busy===null){let o=this.workRoute?.(r,a.outside)||[];(o.length||this.atExit(r.distance,a.exit,r.travelled))&&(a.busy=s,r.active=!1,r.speed=0,n.mode="approaching",n.path=[...o,a.outside])}if(n.mode==="going-seat"&&n.seat&&this.atExit(r.distance,wi(this.traffic.track,n.seat.via),r.travelled)&&(r.active=!1,n.mode="sitting",n.path=[n.seat.via,n.seat.position]),n.mode==="sleeping"&&!t&&a&&a.busy===null&&this.joinAvailable(a.exit,1.5,s)&&(a.busy=s,n.joinArc=a.exit,n.mode="opening-out",Object.assign(r,a.inside,{angle:a.yaw})),n.mode==="opening-out"&&a.open>=.99&&(n.visible=!0,n.mode="leaving",n.path=[a.outside]),n.path.length){let o=n.path[0],c=gs(r,o),l=Math.min(c,e*.54);if(c>1e-4){let u={x:r.x+(o.x-r.x)*l/c,z:r.z+(o.z-r.z)*l/c};if(["working","visiting"].includes(n.mode)||n.mode==="approaching"&&n.path.length>1){let h=this.traffic.people.filter((x,m)=>m!==s&&this.residents[m].visible&&!this.residents[m].seated),p=x=>Math.min(1/0,...h.map(m=>gs(x,m)));if(p(u)<.28){let x=(o.x-r.x)/c,m=(o.z-r.z)/c,g=p(r),b=[0,.65,-.65,1.15,-1.15,1.65,-1.65].map(T=>({x:r.x+(x*Math.cos(T)-m*Math.sin(T))*l,z:r.z+(x*Math.sin(T)+m*Math.cos(T))*l})).filter(T=>this.pavement.has(`${Math.floor(T.x)},${Math.floor(T.z)}`)&&p(T)>=Math.min(.235,g+.002));if(b.sort((T,_)=>gs(T,o)-Math.min(.3,p(T))*.8-(gs(_,o)-Math.min(.3,p(_))*.8)),b.length)u.x=b[0].x,u.z=b[0].z;else if(p(u)<.23)return}if(p(u)<Math.min(.23,p(r)))return}let d=Math.atan2(o.x-r.x,o.z-r.z),f=Math.atan2(Math.sin(d-r.angle),Math.cos(d-r.angle));r.angle+=Math.max(-e*4,Math.min(e*4,f)),r.x=u.x,r.z=u.z,n.travelled=l,r.totalTravelled+=l}gs(r,o)<=(n.mode==="working"||n.mode==="visiting"||n.mode==="approaching"&&n.path.length>1?n.path.length>1?.2:.12:11e-5)&&n.path.shift()}if(!n.path.length)if(n.mode==="visiting"?(n.mode="lingering",n.wait=n.visitId?.startsWith("festival-")?20+this.random()*8:4+this.random()*8):n.mode==="lingering"&&!n.wait&&(n.mode="joining",n.visitId=void 0,n.joinArc=void 0),n.mode==="approaching"&&a.open>=.99)n.mode="entering",n.path=[a.inside];else if(n.mode==="entering")n.mode="sleeping",n.visible=!1,a.busy=null;else if(n.mode==="leaving")n.mode="joining",n.path=[Vn(this.traffic.track,a.exit)];else if(n.mode==="joining"){let o=wi(this.traffic.track,r);this.joinAvailable(o,.72,s)&&(this.traffic.join(s,o),n.joinArc=void 0,a?.busy===s&&(a.busy=null),n.mode=t?"going-home":n.seat?"going-seat":"walking")}else n.mode==="sitting"&&(n.mode="seated",n.seated=!0,r.angle=n.seat.yaw)})}joinAvailable(e,t,n){let s=this.traffic.track.length;return this.traffic.canJoin(e,t)&&this.residents.every((r,a)=>a===n||r.joinArc===void 0||Math.min(Jr(r.joinArc-e,s),Jr(e-r.joinArc,s))>=t)}atExit(e,t,n){let s=this.traffic.track.length;return Math.min(Jr(t-e,s),Jr(e-t,s))<Math.max(.045,n*1.5)}};var yh={spring:{title:"Heartwarming",source:"./assets/town/audio/spring.mp3"},summer:{title:"Carefree",source:"./assets/town/audio/summer.mp3"},autumn:{title:"At Rest",source:"./assets/town/audio/autumn.mp3"},winter:{title:"Relaxing Piano Music",source:"./assets/town/audio/winter.mp3"}},jc=class{constructor(){this.unlocked=!1;let e=()=>{this.unlocked=!0;for(let t of[this.current,this.incoming])t&&(t.blocked=!1);this.latest&&this.update(this.latest.season,this.latest.settings,0)};document.addEventListener("pointerdown",e,{passive:!0}),document.addEventListener("keydown",e),document.addEventListener("visibilitychange",()=>{document.hidden&&(this.current?.audio.pause(),this.incoming?.audio.pause())})}channel(e,t){let n=document.createElement("audio");n.src=yh[e].source,n.preload="auto",n.volume=0,n.dataset.season=e,n.setAttribute("aria-label",`\u5B63\u8282\u97F3\u4E50 ${yh[e].title}`),document.body.append(n);let s={audio:n,season:e,gain:t,failed:!1,blocked:!1,pending:!1};return n.addEventListener("error",()=>{s.failed=!0}),s}update(e,t,n){if(this.latest={season:e,settings:t},!(this.unlocked&&t.music&&!t.muted&&!document.hidden)){this.current?.audio.pause(),this.incoming?.audio.pause(),this.status(!t.music||t.muted?"\u97F3\u4E50\u5DF2\u5173\u95ED":this.unlocked?"\u97F3\u4E50\u5DF2\u6682\u505C":"\u70B9\u51FB\u57CE\u9547\u5F00\u542F\u97F3\u4E50");return}this.current||(this.current=this.channel(e,1)),this.incoming&&this.incoming.season!==e&&(this.incoming.audio.remove(),this.incoming.audio.pause(),this.incoming=void 0);let r=this.current;!this.incoming&&(r.season!==e||r.audio.ended||Number.isFinite(r.audio.duration)&&r.audio.duration-r.audio.currentTime<3)&&(this.incoming=this.channel(e,0));for(let o of[this.current,this.incoming])o&&!o.failed&&!o.blocked&&!o.pending&&o.audio.paused&&!(o===this.current&&o.audio.ended&&this.incoming)&&(o.pending=!0,o.audio.play().catch(()=>{o.blocked=!0}).finally(()=>{o.pending=!1}));if(this.incoming&&!this.incoming.audio.paused&&this.incoming.audio.readyState>=2){let o=n/3;this.incoming.gain=Math.min(1,this.incoming.gain+o),r.gain=Math.max(0,1-this.incoming.gain),this.incoming.gain>=1&&(r.audio.pause(),r.audio.remove(),this.current=this.incoming,this.incoming=void 0)}for(let o of[this.current,this.incoming])o&&(o.audio.volume=Math.max(0,Math.min(1,t.musicVolume*o.gain)));let a=this.incoming||this.current;this.status(a.failed?"\u97F3\u4E50\u6682\u65F6\u65E0\u6CD5\u64AD\u653E":a.audio.paused?"\u70B9\u51FB\u57CE\u9547\u5F00\u542F\u97F3\u4E50":`\u6B63\u5728\u64AD\u653E \xB7 ${yh[a.season].title}`)}status(e){let t=document.getElementById("music-status");t&&t.textContent!==e&&(t.textContent=e)}};var aM=(i,e)=>!!(i&&e.buildings.some(t=>t.kind==="fishinghut"&&i.startsWith(`village-${t.id}-`))),yo=new vt,Zc=class{constructor(e,t){this.canvas=e;this.events=t;this.scene=new Tr;this.camera=new ti(-16,16,12,-12,.1,250);this.sun=new os("#fff2d6",3.2);this.ambient=new Fr("#dbe9eb","#958c63",1.9);this.world=new ge;this.buildings=new ge;this.roadGroup=new ge;this.overlay=new ge;this.forest=new ge;this.walkers=[];this.particles=[];this.smoke=new ge;this.shoreHints=new ge;this.extras=new ge;this.landings=new Map;this.pulseUntil=0;this.modelCache=new Map;this.modelsLoading=new Set;this.buildingMeshes=new Map;this.sceneryModels=new Map;this.seasons=new Yc;this.clockTick=0;this.clockSave=0;this.porchLights=[];this.farms=[];this.music=new jc;this.signature="";this.roadsSignature="";this.terrainSignature="";this.selection=null;this.raycaster=new no;this.pointer=new re;this.plane=new un(new L(0,1,0),0);this.painting=!1;this.cursor=new ge;this.previewKind=null;this.previewRotation=0;this.previewStage=0;this.previewVariant=0;this.tool="inspect";this.lastTime=0;this.lastFrame=0;this.orbitDirection=0;this.orbitSpeed=0;this.orbitStep=0;this.initialFocus=!0;this.reduced=!1;this.pitchStep=0;this.panStep=new re;this.zoomTarget=1;this.pointerInside=!1;this.thumbnails=new Map;this.running=!0;this.paused=!1;this.fps=0;this.frameCount=0;this.fpsTime=0;this.keyboardMove=new re;this.keyboardApplied=!1;this.renderer=new Fc({canvas:e,antialias:!0,alpha:!1,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=zs,this.renderer.outputColorSpace=kt,this.renderer.toneMapping=so,this.renderer.toneMappingExposure=1.06,this.scene.background=new Se("#d9e0ce"),this.scene.fog=new La("#d9e0ce",80,160),this.sun.position.set(-18,28,14),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048),Object.assign(this.sun.shadow.camera,{left:-24,right:24,top:24,bottom:-24,near:1,far:90}),this.sun.shadow.normalBias=.032,this.sun.shadow.bias=-4e-4,this.scene.add(this.sun,this.ambient,this.world,this.buildings,this.roadGroup,this.overlay,this.forest,this.smoke,this.cursor,this.extras,this.shoreHints),this.camera.position.set(30,29,44),this.controls=new zc(this.camera,e),this.controls.target.set(9,0,17),this.controls.enableRotate=!1,this.controls.enableDamping=!0,this.controls.dampingFactor=.12,this.controls.enableZoom=!1,this.controls.minPolarAngle=Math.PI/2-mh,this.controls.maxPolarAngle=Math.PI/2-ph,this.controls.minZoom=.52,this.controls.maxZoom=3.2,this.controls.screenSpacePanning=!1,this.controls.mouseButtons.LEFT=yn.PAN,this.controls.mouseButtons.RIGHT=yn.PAN,this.controls.update(),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(e),e.addEventListener("contextmenu",n=>{n.preventDefault(),this.tool!=="inspect"&&this.events.cancel()}),e.addEventListener("pointerdown",n=>this.down(n)),e.addEventListener("pointermove",n=>this.move(n)),e.addEventListener("pointerup",n=>this.up(n)),e.addEventListener("pointercancel",()=>this.endStroke()),e.addEventListener("wheel",n=>this.wheel(n),{passive:!1}),e.addEventListener("pointerleave",()=>{this.pointerInside=!1,this.painting||(this.cursor.visible=!1,this.events.hover(null))}),document.addEventListener("visibilitychange",()=>{this.paused=document.hidden,this.lastTime=performance.now(),this.paused&&this.stopGesture()}),window.addEventListener("blur",()=>this.stopGesture()),e.addEventListener("webglcontextlost",n=>{n.preventDefault(),this.running=!1,document.getElementById("graphics-error")?.classList.remove("hidden")}),e.addEventListener("webglcontextrestored",()=>{this.running=!0,requestAnimationFrame(n=>this.frame(n)),document.getElementById("graphics-error")?.classList.add("hidden")}),this.resize(),requestAnimationFrame(n=>this.frame(n)),Promise.allSettled(["tree-0","pine","birch","rock","boulder","cart","hedge","fountain","stall"].map(async n=>{let s=await new _o().loadAsync(`./assets/town/curated/${n}.glb`);s.scene.traverse(r=>{r instanceof Ue&&(r.castShadow=!0,r.receiveShadow=!0)}),this.sceneryModels.set(n,s.scene)})).then(()=>{this.board&&this.state&&this.buildTerrain()})}resize(){let e=this.canvas.getBoundingClientRect(),t=e.width/Math.max(1,e.height),n=t<1?16:13;this.camera.left=-n*t,this.camera.right=n*t,this.camera.top=n,this.camera.bottom=-n,this.camera.updateProjectionMatrix(),this.renderer.setSize(e.width,e.height,!1)}setTool(e,t,n,s=this.previewStage,r=this.previewVariant){if(this.tool=e,this.previewKind=t,this.previewRotation=n,this.previewStage=s,this.previewVariant=r,this.canvas.dataset.previewRotation=String(n),this.clearTransient(this.shoreHints),t==="fishinghut"&&this.state&&this.board)for(let a=0;a<this.board.size-1;a++)for(let[o,c]of[[13,0],[9,2]])Js(this.state,this.board,ct("shore-preview","fishinghut",a,o,c))||this.outline(this.shoreHints,a,o,2,2,"#77b4a2",.13);if(this.controls.mouseButtons.LEFT=e==="inspect"||e==="move"&&!t?yn.PAN:null,this.controls.mouseButtons.RIGHT=e==="inspect"?yn.PAN:null,this.controls.mouseButtons.MIDDLE=yn.PAN,this.canvas.style.cursor=e==="inspect"?"grab":"crosshair",this.grid&&(this.grid.visible=e!=="inspect"),this.ghost&&(this.ghost.traverse(a=>{a instanceof Ue&&a.material.dispose()}),this.cursor.remove(this.ghost),this.ghost=void 0),t&&(this.ghost=this.model(t,r,s).clone(),this.ghost.traverse(a=>{a instanceof Ue&&(a.material=a.material.clone(),Object.assign(a.material,{transparent:!0,opacity:.82,depthWrite:!0}),a.castShadow=!1)}),this.cursor.add(this.ghost),this.ghost.rotation.y=-n*Math.PI/2),this.cursorCell)this.showCursor(this.cursorCell),this.cursor.visible=t!==null;else if(t&&this.board){let a=this.controls.target;this.cursorCell={x:Math.max(0,Math.floor(a.x)),z:Math.max(0,Math.floor(a.z))},this.showCursor(this.cursorCell),this.cursor.visible=!0}}setPreviewValid(e){this.cursor.traverse(t=>{t instanceof kn&&t.material.color.set(e?"#467b57":"#d86d55")}),this.ghost?.traverse(t=>{if(t instanceof Ue){let n=t.material;n.emissive.set(e?"#16371e":"#ae3020"),n.emissiveIntensity=e?.1:.35}})}setWorld(e,t,n){this.state=e,this.board=t,this.evaluation=n,this.reduced=e.settings.reducedMotion||matchMedia("(prefers-reduced-motion: reduce)").matches,this.farms=t===e.town?ha(t,n,e.farm):[];let s=`${t.size}:${t.terrain}:${e.chapterStars.map(o=>o>0).join()}`;s!==this.terrainSignature&&(this.terrainSignature=s,this.buildTerrain());let r=JSON.stringify(t.buildings)+e.chapterStars.join()+e.projects.map(o=>`${o.id}:${Ss(Ms(o.tokens)).index}`).join();if(r!==this.signature){this.signature=r,this.buildings.clear(),this.buildingMeshes.clear(),this.porchLights=[];for(let o of t.buildings.filter(c=>c.placed)){let c=e.projects.find(f=>f.id===o.projectId),l=c?Ss(Ms(c.tokens)).index:0,u=this.model(o.kind,_s(o,e),l).clone(),d=Ut(o);if(u.position.set(o.x+d.w/2,.04,o.z+d.d/2),u.rotation.y=-o.rotation*Math.PI/2,u.userData.buildingId=o.id,u.traverse(f=>{f.userData.buildingId=o.id}),this.buildings.add(u),this.buildingMeshes.set(o.id,u),o.kind==="house"&&this.porchLights.length<3){let f=new Bs("#ffc47c",0,2.7,2);f.position.set(.52,.87,1.04),u.add(f),this.porchLights.push(f)}}this.seasons.install(this.buildings),this.buildExtras()}let a=e.mode+t.terrain+JSON.stringify(t.buildings.map(o=>[o.id,o.kind,o.x,o.z,o.rotation,o.placed]))+t.roads.join("|")+Array.from(n.connectedRoads).join("|");a!==this.roadsSignature&&(this.roadsSignature=a,this.buildRoads(),this.buildWalkers()),this.drawSelection(),this.renderer.setPixelRatio(e.settings.quality==="low"?1:Math.min(Math.max(devicePixelRatio,e.settings.quality==="high"?1.5:1.25),e.settings.quality==="high"?2.5:2)),this.renderer.shadowMap.enabled=e.settings.quality!=="low",this.initialFocus&&(this.initialFocus=!1,this.focus(t.terrain==="valley"?{x:6,z:17}:{x:6,z:6}))}model(e,t,n){let s=`${e}-${e==="workshop"?`${n}-${t}`:t}`;if(this.modelCache.has(s)||this.modelCache.set(s,Mi(kg(e,t,n))),!this.modelsLoading.has(s)){this.modelsLoading.add(s);let r=null;new _o().load(`./assets/town/${r?"curated/"+r:"models/"+s}.glb`,a=>{a.scene.traverse(o=>{o instanceof Ue&&(o.castShadow=!0,o.receiveShadow=!0)}),this.thumbnails.delete(`${e}-${t}-${n}`),this.modelCache.set(s,a.scene),this.signature="",this.state&&this.board&&this.evaluation&&this.setWorld(this.state,this.board,this.evaluation),this.previewKind===e&&this.previewStage===n&&this.previewVariant===t&&this.setTool(this.tool,this.previewKind,this.previewRotation,n,t),this.events.assetsReady?.()},void 0,()=>{})}return this.modelCache.get(s)}thumbnail(e,t=0,n=0){let s=`${e}-${t}-${n}`,r=this.thumbnails.get(s);if(r)return r;let a=new Tr;a.background=null,a.add(new Fr("#fff5d9","#7b805e",3));let o=new os("#fff4df",3);o.position.set(-3,6,5),a.add(o);let c=this.model(e,t,n).clone();a.add(c);let l=e==="mill"?3.8:e==="clock"?4.2:e==="workshop"&&n>0?3.6:2.4,u=Math.max(st[e].w,st[e].d,l)*.7,d=new ti(-u,u,u,-u,.1,40);d.position.set(5,5,7),d.lookAt(0,l*.42,0);let f=384,h=new nn(f,f);h.samples=4;let p=this.renderer.getRenderTarget();this.renderer.setRenderTarget(h),this.renderer.setClearColor("#ffffff",0),this.renderer.render(a,d);let x=new Uint8Array(f*f*4);this.renderer.readRenderTargetPixels(h,0,0,f,f,x),this.renderer.setRenderTarget(p),h.dispose();let m=document.createElement("canvas");m.width=f,m.height=f;let g=m.getContext("2d"),b=g.createImageData(f,f);for(let _=0;_<f;_++)b.data.set(x.subarray((f-1-_)*f*4,(f-_)*f*4),_*f*4);g.putImageData(b,0,0);let T=m.toDataURL();return this.thumbnails.set(s,T),T}buildTerrain(){let e=this.board,t=e.size;this.clearTransient(this.world),this.clearTransient(this.forest);let n=Bg(e,this.state,this.sceneryModels);this.world.add(n.world),this.forest.add(n.forest),this.animateLandscape=n.update,this.seasons.install(this.world),this.seasons.install(this.forest),this.snow&&(this.scene.remove(this.snow),this.snow.geometry.dispose(),this.snow.material.dispose());let s=[];for(let a=0;a<160;a++)s.push(a*7.319%t,a*1.771%8,a*11.931%t);this.snow=new Fs(new ft().setAttribute("position",new tt(s,3)),new ss({color:"#e6edf1",size:.045,transparent:!0,opacity:0,depthWrite:!1})),this.scene.add(this.snow);let r=[];for(let a=0;a<=t;a++)r.push(0,.037,a,t,.037,a);for(let a=0;a<=t;a++)r.push(a,.037,0,a,.037,t);this.grid=new Ns(new ft().setAttribute("position",new tt(r,3)),new hi({color:"#536c51",transparent:!0,opacity:.16})),this.grid.visible=this.tool!=="inspect",this.world.add(this.grid)}buildRoads(){this.clearTransient(this.roadGroup),this.roadGroup.add(Xg(this.board,this.evaluation))}buildWalkers(){let e=this.evaluation.connectedRoads,t=[];for(let a of this.board.buildings.filter(o=>o.placed&&this.evaluation.buildings[o.id]?.connected))for(let[o,c]of Og(a.kind).entries()){let l=this.buildingMeshes.get(a.id);l.updateMatrixWorld(!0);let u=l.localToWorld(new L(...c.position)),d=pt(a);t.push({id:`${a.id}:${o}`,position:{x:u.x,z:u.z},via:{x:d.x+.5,z:d.z+.5},y:u.y,yaw:l.rotation.y+c.yaw})}let n=Math.min(12,Math.max(2,this.evaluation.houses*2)),s=this.board.buildings.filter(a=>a.placed&&a.kind==="house"&&this.evaluation.buildings[a.id]?.connected).map(vh);if(s.length||s.push(vh(this.board.buildings.find(a=>a.placed&&a.kind==="hall"))),this.traffic&&this.walkerBoard===this.board){this.traffic.retarget(e),this.life.retarget(s,t);return}for(let a of this.walkers)this.scene.remove(a.group),this.clearTransient(a.group);if(this.walkers=[],this.traffic=void 0,this.life=void 0,this.walkerBoard=this.board,e.size<2)return;this.traffic=new $c(e,n+Math.min(t.length,3));let r=new Map;t.slice(0,Math.min(t.length,3,this.traffic.people.length-2)).forEach((a,o)=>r.set(this.traffic.people.length-1-o,a)),this.life=new Kc(this.traffic,s,mn(this.state.worldSeconds,this.state.settings).sleep,r);for(let[a,o]of this.traffic.people.entries()){let c=hh(["#748b9c","#bb976a","#ba8174","#819373","#ac9ab4"][a%5],a),l=new ge;l.add(c);let u=dh(this.board.buildings,o);l.position.set(u.x,u.y,u.z),l.rotation.y=o.angle,this.scene.add(l);let d=["leg-left","leg-right","arm-left","arm-right"].map(m=>c.getObjectByName(m)),f=new ge;f.name="fishing-rod",f.visible=!1,l.add(f),f.position.set(.12,.33,.16),E(f,0,.48,0,.015,.95,.015,"#987751"),f.rotation.x=0;let h=new kn(new ft().setFromPoints([new L(0,.94,0),new L(.16,-.68,.75)]),new hi({color:"#e1d9ba"}));f.add(h),E(f,.16,-.68,.75,.045,.06,.045,"#c68f75");let p=new ge;p.visible=!1,l.add(p),E(p,0,.26,.16,.18,.18,.13,"#ceb981"),E(p,0,.36,.16,.13,.05,.11,"#e0d1ae");let x;r.has(a)&&(x=Mi(hh("#a28273",a,!0)),l.add(x)),this.walkers.push({group:l,body:c,cargo:p,seated:x,phase:o.phase,limbs:d})}}select(e){this.selection=e,this.drawSelection()}drawSelection(){if(this.clearTransient(this.overlay),!this.board||!this.evaluation)return;let e=this.board.buildings.find(a=>a.id===this.selection&&a.placed);if(!e)return;let{w:t,d:n}=Ut(e);this.outline(this.overlay,e.x,e.z,t,n,"#376844",.22,-.035);let s=pt(e);this.outline(this.overlay,s.x,s.z,1,1,this.evaluation.buildings[e.id]?.connected?"#5e9070":"#bf805c",.13);let r=st[e.kind];if(r.service||e.kind==="park"){let a=ma(this.board,this.evaluation,e);if(a.cells.length){let c=e.kind==="park"?"#82b659":r.service==="food"?"#edce87":"#81bcb3",l=new An(new ei(.88,.88),new sn({color:c,transparent:!0,opacity:.38,depthWrite:!1}),a.cells.length);a.cells.forEach((u,d)=>{yo.position.set(u.x+.5,.14,u.z+.5),yo.rotation.set(-Math.PI/2,0,0),yo.updateMatrix(),l.setMatrixAt(d,yo.matrix)}),yo.rotation.set(0,0,0),this.overlay.add(l)}let o=new Set(a.homes.filter(c=>c.served).map(c=>c.home.id));for(let c of this.board.buildings.filter(l=>l.placed&&l.kind==="house")){let l=this.evaluation.buildings[c.id],u=Ut(c),d=e.kind==="park"?l?.green:l?.[r.service];(o.has(c.id)||!d)&&this.outline(this.overlay,c.x,c.z,u.w,u.d,o.has(c.id)?"#376844":"#c47c42",.23,-.035)}}}outline(e,t,n,s,r,a,o=.08,c=.05){let l=[new L(t+c,o,n+c),new L(t+s-c,o,n+c),new L(t+s-c,o,n+r-c),new L(t+c,o,n+r-c)];e.add(new Us(new ft().setFromPoints(l),new hi({color:a})))}point(e){let t=this.canvas.getBoundingClientRect();this.pointer.set((e.clientX-t.left)/t.width*2-1,-(e.clientY-t.top)/t.height*2+1),this.raycaster.setFromCamera(this.pointer,this.camera);let n=new L;if(!this.raycaster.ray.intersectPlane(this.plane,n))return null;let s=Math.floor(n.x),r=Math.floor(n.z);return this.board&&s>=0&&r>=0&&s<this.board.size&&r<this.board.size?{x:s,z:r}:null}previewAt(e,t){this.lastPointer={clientX:e,clientY:t};let n=this.canvas.getBoundingClientRect();this.pointerInside=e>=n.left&&e<=n.right&&t>=n.top&&t<=n.bottom;let s=this.point({clientX:e,clientY:t});this.cursor.visible=!!s,this.canvas.dataset.previewCell=s?`${s.x},${s.z}`:"",s&&((s.x!==this.cursorCell?.x||s.z!==this.cursorCell?.z)&&(this.cursorCell=s,this.showCursor(s)),this.events.hover(s))}placeAt(e,t){let n=this.point({clientX:e,clientY:t});n&&this.events.cell(n.x,n.z)}down(e){if(this.focusTarget=void 0,this.pointerDown={x:e.clientX,y:e.clientY,button:e.button},!(e.button!==0||e.shiftKey)&&(this.tool==="road"||this.tool==="erase")){this.painting=!0,this.canvas.setPointerCapture(e.pointerId);let t=this.point(e);t&&(this.events.cell(t.x,t.z),this.lastCell=t)}}move(e){this.lastPointer={clientX:e.clientX,clientY:e.clientY},this.pointerInside=!0;let t=this.point(e);if(this.cursor.visible=!!t&&this.tool!=="inspect"&&!(this.tool==="move"&&!this.previewKind),t&&(this.cursorCell=t,this.showCursor(t)),this.events.hover(t),this.painting&&t&&this.lastCell&&(t.x!==this.lastCell.x||t.z!==this.lastCell.z)){let n=this.lastCell.x,s=this.lastCell.z;for(;n!==t.x;)n+=Math.sign(t.x-n),this.events.cell(n,s);for(;s!==t.z;)s+=Math.sign(t.z-s),this.events.cell(n,s);this.lastCell=t}}up(e){if(this.painting){this.endStroke();return}let t=this.pointerDown;if(this.pointerDown=void 0,!(!t||t.button!==0||Math.hypot(e.clientX-t.x,e.clientY-t.y)>6))if(this.tool==="place"||this.tool==="move"&&this.previewKind){let n=this.point(e);n&&this.events.cell(n.x,n.z)}else{this.point(e);let n=this.raycaster.intersectObjects(this.buildings.children,!0).find(s=>s.object.userData.buildingId);this.events.select(n?.object.userData.buildingId||null)}}endStroke(){this.painting&&this.events.strokeEnd(),this.painting=!1,this.pointerDown=void 0,this.lastCell=void 0}showCursor(e){for(let n of this.cursor.children.filter(s=>s!==this.ghost))this.cursor.remove(n),n instanceof kn&&(n.geometry.dispose(),n.material.dispose());let t=this.previewKind?Ut({kind:this.previewKind,rotation:this.previewRotation}):{w:1,d:1};if(this.cursor.position.set(e.x,.03,e.z),this.outline(this.cursor,0,0,t.w,t.d,"#4e805e",.1),this.ghost&&this.previewKind){this.ghost.position.set(t.w/2,.03,t.d/2);let n=pt(ct("preview",this.previewKind,0,0,this.previewRotation));this.outline(this.cursor,n.x,n.z,1,1,"#a4874f",.11)}}focus(e){let t=e||(this.board?.terrain==="valley"?{x:6,z:17}:{x:6,z:6});this.focusTarget=new L(t.x,0,t.z),this.zoomTarget=this.board?.terrain!=="valley"?1.15:1.45,this.pitchStep=gh-this.elevation(),this.orbitStep=0,this.panStep.set(0,0)}overview(){this.board&&(this.focusTarget=new L(this.board.size/2,0,this.board.size/2),this.zoomTarget=this.camera.right/this.camera.top<1?.66:.92,this.pitchStep=gh-this.elevation(),this.orbitStep=0,this.panStep.set(0,0))}rotate(e){this.orbitStep+=e*.16}holdRotate(e){this.orbitDirection=e,this.orbitStep=0,e||(this.orbitSpeed=0)}holdPan(e,t){!e&&!t&&this.keyboardMove.lengthSq()&&!this.keyboardApplied&&this.panKeyboard(du(1/120,this.camera.zoom)),(this.keyboardMove.x!==e||this.keyboardMove.y!==t)&&(this.keyboardApplied=!1),this.keyboardMove.set(e,t),(e||t)&&(this.focusTarget=void 0)}panKeyboard(e){let t=new L().setFromMatrixColumn(this.camera.matrix,0);t.y=0,t.normalize();let n=new L().crossVectors(this.camera.up,t).normalize(),s=t.multiplyScalar(this.keyboardMove.x).addScaledVector(n,this.keyboardMove.y).multiplyScalar(e);this.controls.target.add(s),this.camera.position.add(s),this.keyboardApplied=!0}zoom(e){this.zoomTarget=zg(this.zoomTarget*e)}elevation(){let e=this.camera.position.clone().sub(this.controls.target);return Math.atan2(e.y,Math.hypot(e.x,e.z))}stopGesture(){this.orbitStep=0,this.pitchStep=0,this.panStep.set(0,0),this.zoomTarget=this.camera.zoom}wheel(e){if(e.preventDefault(),this.painting)return;this.lastPointer={clientX:e.clientX,clientY:e.clientY},this.pointerInside=!0,this.focusTarget=void 0;let t=Gg(e,this.state?.settings.cameraInput||"trackpad",this.canvas.clientHeight);t.kind==="zoom"?this.zoom(Math.exp(t.y)):t.kind==="pan"?this.panStep.add(new re(t.x,t.y)):(this.orbitStep=hs.clamp(this.orbitStep+t.x,-.6,.6),this.pitchStep=xh(this.elevation()+this.pitchStep+t.y)-this.elevation())}environment(e,t){if(!this.state)return;let n=this.state;n.settings.clockMode==="cycle"&&(n.worldSeconds+=e);let s=mn(n.worldSeconds,n.settings),r=1-Math.exp(-e*2);this.music.update(s.season,n.settings,e),this.sun.color.lerp(new Se("#9fb9d2").lerp(new Se("#fff2d6"),s.daylight).lerp(new Se("#ffb879"),s.warmth*.65),r),this.sun.intensity+=(.62+s.daylight*2.88-this.sun.intensity)*r,this.ambient.intensity+=(.75+s.daylight*1.15-this.ambient.intensity)*r,this.ambient.color.lerp(new Se("#91add3").lerp(new Se("#dbe9eb"),s.daylight),r),this.ambient.groundColor.lerp(new Se("#344358").lerp(new Se("#958c63"),s.daylight),r),this.porchLights.forEach(h=>{h.intensity+=(2.4*(1-s.daylight)-h.intensity)*r}),document.getElementById("town-ui")?.classList.toggle("night",s.daylight<.35);let a=new Se("#34465d").lerp(new Se("#d9e0ce"),s.daylight).lerp(new Se("#d8b49a"),s.warmth*.35);if(this.scene.background.lerp(a,r),this.scene.fog.color.copy(this.scene.background),this.seasons.update(s.season,e),this.snow){this.snow.visible=this.seasons.snow>.02&&!this.reduced;let h=this.snow.material;h.opacity=this.seasons.snow*.7;let p=this.snow.geometry.getAttribute("position");for(let x=0;x<p.count;x++)p.setY(x,(p.getY(x)-e*.35+8)%8);p.needsUpdate=!0}let o=new Set;for(let[h,p]of this.life?.jobs||[]){let x=this.traffic.people[h],m=this.life.residents[h];m.mode==="working"&&!m.path.length&&Math.hypot(x.x-p.target.x,x.z-p.target.z)<.15&&o.add(p.fieldId)}let c=qh(this.farms,n.farm,e,s.sleep,s.season,o),l=this.board===n.town?zh(n,this.evaluation,e,s.sleep,s.season,o):[],u=mg(c,l);this.life?.assignJobs(u,(h,p)=>{let x=this.evaluation.connectedRoads;if(!x.size)return[];let m=[...x].map(g=>{let[b,T]=g.split(",").map(Number);return{x:b+.5,z:T+.5}}).sort((g,b)=>Math.hypot(g.x-h.x,g.z-h.z)-Math.hypot(b.x-h.x,b.z-h.z))[0];return da(x,m,p)});let d=n.village.celebration>0,f=this.board.buildings.filter(h=>h.placed&&this.evaluation.buildings[h.id]?.connected&&(st[h.kind].service||h.kind==="park")).map(h=>{let p=pt(h),x=Ut(h),m={x:p.x+.5,z:p.z+.5},g=h.x+x.w/2-m.x,b=h.z+x.d/2-m.z,T=Math.hypot(g,b);return{id:h.id,position:m,target:{x:m.x+g/T*.48,z:m.z+b/T*.48}}});if(d){let h=this.board.buildings.find(_=>_.kind==="hall"),p=pt(h),x=Ut(h),m={x:p.x+.5,z:p.z+.5},g=h.x+x.w/2-m.x,b=h.z+x.d/2-m.z,T=Math.hypot(g,b);for(let _=0;_<3;_++)f.push({id:`festival-${_}`,position:m,target:{x:m.x+g/T*.45-b/T*(_-1)*.65,z:m.z+b/T*.45+g/T*(_-1)*.65}})}this.life?.setPlaces(f,this.evaluation.connectedRoads),this.life?.update(e,s.sleep);for(let h of this.farms){let p=n.farm.runs[h.field.id],x=this.buildingMeshes.get(h.field.id)?.getObjectByName("crop-patch");if(x){let m=p?.phase==="growing"?Math.min(1,p.elapsed/Co(h,"growing",s.season)):p?.phase==="sowing"?.12:p?.phase==="harvesting"?1:.06;x.scale.y=.12+m*.88}if(h.mill){let m=this.buildingMeshes.get(h.mill.id)?.getObjectByName("mill-fan");m&&!this.reduced&&(m.rotation.z+=e*(p?.phase==="milling"&&!s.sleep?1.2:.13))}}for(let h of this.board.buildings.filter(p=>p.placed&&Qs.includes(p.kind))){let p=this.buildingMeshes.get(h.id),x=bs(n.village,h);for(let g of["cow-0","cow-1","pig-0","pig-1"]){let b=p.getObjectByName(g);b&&!this.reduced&&(b.rotation.y=Math.sin(t*25e-5+h.x+g.length)*.18,b.position.y=.15+Math.sin(t*.0015+h.z)*.008)}let m=p.getObjectByName("vegetable-crops");m&&(m.scale.y=.2+Math.min(1,x.elapsed/To(h,x.choice,s.season))*.8)}for(let h of this.life?.doors||[]){let p=this.buildingMeshes.get(h.id)?.getObjectByName("door-hinge");p&&(p.rotation.y=-h.open*Math.PI*.46)}for(let[h,p]of this.walkers.entries()){let x=this.traffic.people[h],m=this.life.residents[h],g=Wg(m.travelled,p.phase,!this.reduced&&m.travelled>1e-4);p.phase=g.phase,p.group.visible=m.visible,p.body.visible=!m.seated,p.seated&&(p.seated.visible=m.seated);let b=dh(this.board.buildings,x),T=b.y+g.bob,_=this.life.doors[m.home];_&&["entering","leaving","opening-out"].includes(m.mode)&&(T+=.12*Math.min(1,Math.hypot(x.x-_.outside.x,x.z-_.outside.z)/.5)),p.group.position.set(m.seated?x.x:b.x,m.seated?m.seat.y:T,m.seated?x.z:b.z),p.group.rotation.y=x.angle;let M=this.life.jobs.get(h),A=m.mode==="working",R=p.group.getObjectByName("fishing-rod");R.visible=A&&M?.phase==="harvesting"&&aM(M?.fieldId,this.board)&&!m.path.length,R.visible&&!this.reduced&&(R.rotation.x=Math.sin(t*.002)*.035),p.cargo.visible=A&&!!M?.carrying,p.cargo.children.forEach(v=>{v instanceof Ue&&(v.material=Tt(M?.carrying==="flour"?"#e9dfc1":M?.carrying==="fish"?"#87b8b2":M?.carrying==="carrot"?"#cb925d":M?.carrying==="milk"?"#ebe3cb":"#c8a769"))}),p.limbs.forEach((v,S)=>{let C=S>=2&&A&&M?.carrying?-.85:S>=2&&A&&M?.harvesting&&!m.path.length&&!this.reduced?-.45+Math.sin(t*.004+h)*.3:(S<2?g.leg:g.arm)*(S%2?-1:1);v.rotation.x+=(C-v.rotation.x)*(1-Math.exp(-e*16))})}if(t-this.clockTick>1e3){this.clockTick=t;let h=t-this.clockSave>2e4;h&&(this.clockSave=t),this.events.clock?.(n.worldSeconds,h);let p=document.getElementById("world-clock");p&&(p.textContent=s.label),this.updateFarmLabels(s.sleep)}this.canvas.dataset.village=JSON.stringify(n.village),this.canvas.dataset.workers=JSON.stringify([...this.life?.jobs.entries()||[]].map(([h,p])=>({resident:h,id:p.fieldId,target:p.target,path:this.life.residents[h].path.length,mode:this.life.residents[h].mode}))),this.canvas.dataset.worldHour=s.hour.toFixed(2),this.canvas.dataset.season=s.season,this.canvas.dataset.residentActivities=JSON.stringify(this.life?.residents.map(h=>h.mode)||[]),this.canvas.dataset.doorAngles=JSON.stringify(this.life?.doors.map(h=>({id:h.id,open:+h.open.toFixed(2)}))||[]),this.canvas.dataset.farm=JSON.stringify(n.farm),this.canvas.dataset.residents=JSON.stringify(this.traffic?.people.map((h,p)=>({id:p,x:+h.x.toFixed(3),z:+h.z.toFixed(3),y:+this.walkers[p].group.position.y.toFixed(3),travelled:+h.totalTravelled.toFixed(3)}))||[])}updateFarmLabels(e){if(this.state){for(let t of["wheat","flour","bread"])document.querySelectorAll(`[data-farm-stock="${t}"]`).forEach(n=>n.textContent=String(this.state.farm[t]));for(let t of this.farms){let n=this.state.farm.runs[t.field.id];document.querySelectorAll("[data-farm-field]").forEach(s=>{s.dataset.farmField===t.field.id&&(s.textContent=t.problem||(e?"\u90BB\u5C45\u4F11\u606F\u4E2D \xB7 \u6E05\u6668\u7EE7\u7EED":n?fa[n.phase]:"\u51C6\u5907\u64AD\u79CD"))})}document.querySelectorAll("[data-village-station]").forEach(t=>{let n=this.state.town.buildings.find(s=>s.id===t.dataset.villageStation);if(n){let s=Ao(this.state,this.evaluation,n,mn(this.state.worldSeconds,this.state.settings).season,e),r=[...this.life?.jobs.entries()||[]].find(([,a])=>a.fieldId.startsWith(`village-${n.id}-`));t.textContent=!e&&!s.includes("\u7F3A\u5C11")&&!s.includes("\u6682\u505C")&&!s.includes("\u51AC\u5B63")?r?this.life.residents[r[0]].path.length?"\u90BB\u5C45\u6B63\u5728\u524D\u5F80 \xB7 "+s:s:"\u7B49\u5F85\u7A7A\u95F2\u90BB\u5C45 \xB7 "+s:s}}),document.querySelectorAll("[data-village-stock]").forEach(t=>{let[n,s]=t.dataset.villageStock.split("|");t.textContent=String(this.state.village.stock[n]?.[s]||0)}),document.querySelectorAll("[data-order-stock]").forEach(t=>{let n=ra(this.state,this.evaluation);t.textContent=String(n[t.dataset.orderStock]||0)}),document.querySelectorAll("[data-order-status]").forEach(t=>{t.textContent=aa(this.state,this.evaluation,t.dataset.orderStatus,mn(this.state.worldSeconds,this.state.settings).season)||"\u6750\u6599\u9F50\u4E86\uFF0C\u53EF\u4EE5\u9080\u8BF7\u90BB\u5C45\u5206\u4EAB\uFF01"}),document.querySelectorAll("[data-bakery-material]").forEach(t=>{let n=t.dataset.bakeryMaterial,s=[...this.life?.jobs.entries()||[]].find(([,a])=>a.phase==="baking"&&this.farms.some(o=>o.field.id===a.fieldId&&o.bakery?.id===n)),r=Ro(n,this.farms,this.state.farm,e);t.textContent=!e&&r.startsWith("\u70D8\u7119\u4E2D")&&(!s||this.life.residents[s[0]].path.length)?"\u7B49\u5F85\u90BB\u5C45\u5230\u7089\u8FB9 \xB7 \u70D8\u7119\u8017\u65F6 3 \u79D2":r})}}positionHomeBubbles(e=document){this.camera.updateMatrixWorld(),e.querySelectorAll("[data-home-need]").forEach(t=>{let n=this.board?.buildings.find(c=>c.id===t.dataset.homeNeed);if(!n?.placed){t.style.visibility="hidden";return}let s=Ut(n),r=new L(n.x+s.w/2,2.5,n.z+s.d/2).project(this.camera),a=(r.x+1)*this.canvas.clientWidth/2,o=(1-r.y)*this.canvas.clientHeight/2;t.style.transform=`translate(${a}px,${o}px) translate(-50%,-100%)`,t.style.visibility=r.z>1||a<10||a>this.canvas.clientWidth-10||o<90||o>this.canvas.clientHeight-100?"hidden":"visible"})}celebrate(e,t){if(!this.board||this.reduced)return;let n=this.board.buildings.find(r=>r.kind==="hall"),s=t||{x:n.x+1.5,z:n.z+1.5};if(e==="coin"&&(this.pulseUntil=performance.now()+2200),e==="building"&&t)for(let r of this.board.buildings.filter(a=>a.placed&&a.x===Math.floor(t.x)&&a.z===Math.floor(t.z)))this.landings.set(r.id,performance.now());e==="chapter"&&this.zoom(.88);for(let r=0;r<(e==="chapter"?50:e==="coin"?24:14);r++){let a=e==="coin"?new Ui(.09,.09,.04,8):new Bn(.065,.065,.065),o=new Ue(a,Tt(e==="coin"?"#e7be59":e==="chapter"?["#ddbc77","#8ca579","#b98973"][r%3]:"#c7bd9c"));o.position.set(s.x+(Math.random()-.5)*1.5,e==="coin"?3.5+Math.random()*2:.3,s.z+(Math.random()-.5)),o.castShadow=!0,this.scene.add(o),this.particles.push({mesh:o,velocity:new L((Math.random()-.5)*1.5,e==="coin"?-.8:1+Math.random()*3,(Math.random()-.5)*1.5),life:0,duration:1.7+Math.random()*.7})}this.sound(e==="coin"?740:520)}sound(e){if(!this.state?.settings.muted)try{this.sounds||=new AudioContext,this.sounds.resume();let t=this.sounds.createOscillator(),n=this.sounds.createGain();t.type="sine",t.frequency.setValueAtTime(e,this.sounds.currentTime),n.gain.setValueAtTime(.035,this.sounds.currentTime),n.gain.exponentialRampToValueAtTime(1e-4,this.sounds.currentTime+.25),t.connect(n).connect(this.sounds.destination),t.start(),t.stop(this.sounds.currentTime+.26)}catch{}}frame(e){if(!this.running||(requestAnimationFrame(l=>this.frame(l)),this.paused||e-this.lastFrame<1e3/(this.state?.settings.quality==="low"?30:60)-1))return;let t=Math.min(.06,(e-(this.lastTime||e))/1e3);this.lastTime=e,this.lastFrame=e,this.environment(t,e);let n=this.camera.position.clone(),s=this.controls.target.clone(),r=this.camera.zoom,a=Xc(t,this.reduced);if(this.keyboardMove.lengthSq()&&this.panKeyboard(du(t,this.camera.zoom)),this.focusTarget){let l=this.focusTarget.clone().sub(this.controls.target).multiplyScalar(Xc(t,this.reduced,10));this.controls.target.add(l),this.camera.position.add(l),this.focusTarget.distanceToSquared(this.controls.target)<25e-8&&(this.focusTarget=void 0)}this.orbitDirection&&(this.orbitSpeed=hs.lerp(this.orbitSpeed,this.orbitDirection*.85,1-Math.exp(-t*12)));let o=this.orbitSpeed*t;if(Math.abs(this.orbitStep)>1e-5){let l=this.orbitStep*a;this.orbitStep-=l,o+=l}else this.orbitStep=0;let c=Math.abs(this.pitchStep)>1e-5?this.pitchStep*a:this.pitchStep;if(this.pitchStep-=c,o||c){let l=this.camera.position.clone().sub(this.controls.target),u=xh(this.elevation()+c),d=new ls(l.length(),Math.PI/2-u,Math.atan2(l.x,l.z)+o);this.camera.position.copy(this.controls.target).add(l.setFromSpherical(d))}if(this.panStep.lengthSq()>1e-4){let l=this.panStep.clone().multiplyScalar(a);this.panStep.sub(l);let u=new L().setFromMatrixColumn(this.camera.matrix,0),d=new L().crossVectors(this.camera.up,u),f=u.multiplyScalar(-l.x*(this.camera.right-this.camera.left)/this.camera.zoom/this.canvas.clientWidth).addScaledVector(d,l.y*(this.camera.top-this.camera.bottom)/this.camera.zoom/this.canvas.clientHeight);this.controls.target.add(f),this.camera.position.add(f)}else this.panStep.set(0,0);if(Math.abs(Math.log(this.zoomTarget/this.camera.zoom))>1e-5?this.camera.zoom*=Math.exp(Math.log(this.zoomTarget/this.camera.zoom)*a):this.camera.zoom=this.zoomTarget,r!==this.camera.zoom&&this.camera.updateProjectionMatrix(),this.controls.dampingFactor=Xc(t,this.reduced,12),this.controls.update(),this.camera.updateMatrixWorld(),this.previewKind&&this.pointerInside&&this.lastPointer&&(n.distanceToSquared(this.camera.position)>1e-8||s.distanceToSquared(this.controls.target)>1e-8||r!==this.camera.zoom)&&this.previewAt(this.lastPointer.clientX,this.lastPointer.clientY),!this.reduced){for(let l of this.board?.buildings||[]){let u=this.buildingMeshes.get(l.id);if(!u)continue;l.kind==="tree"&&(u.rotation.z=Math.sin(e*8e-4+l.x)*.012),l.kind==="workshop"&&u.scale.setScalar(e<this.pulseUntil?1+Math.sin((this.pulseUntil-e)*.012)*.025:1);let d=this.landings.get(l.id);if(d!==void 0){let f=Math.min(1,(e-d)/550);u.position.y=.04+.4*(1-f)**2,u.scale.y=1-.08*Math.sin(f*Math.PI),f===1&&(this.landings.delete(l.id),u.scale.y=1)}}this.animateLandscape?.(e);for(let l of this.particles)l.life+=t,l.velocity.y-=t*2.4,l.mesh.position.addScaledVector(l.velocity,t),l.mesh.rotation.x+=t*3,l.mesh.rotation.z+=t*2,l.mesh.scale.setScalar(Math.max(0,1-Math.max(0,l.life/l.duration-.6)*2.5));if(this.particles=this.particles.filter(l=>l.life<l.duration&&l.mesh.position.y>-.1?!0:(this.scene.remove(l.mesh),l.mesh.geometry.dispose(),!1)),Math.random()<t*2&&this.board)for(let l of this.board.buildings.filter(u=>u.placed&&["bakery","restaurant"].includes(u.kind))){let u=this.buildingMeshes.get(l.id).localToWorld(l.kind==="bakery"?new L(-.52,2.16,-.44):new L(.92,2.21,-.94)),d=new Ue(new mi(.06,0),new sn({color:"#e7e7d6",transparent:!0,opacity:.45,depthWrite:!1}));d.position.copy(u),this.smoke.add(d),d.userData.life=0}for(let l of[...this.smoke.children])l.userData.life+=t,l.position.y+=t*.26,l.position.x+=t*.12,l.scale.setScalar(1+l.userData.life*.6),l.material.opacity=Math.max(0,.45-l.userData.life*.14),l.userData.life>3.2&&(this.smoke.remove(l),l.geometry.dispose(),l.material.dispose())}if(this.renderer.render(this.scene,this.camera),this.positionHomeBubbles(),this.events.rendered?.(e),this.canvas.dataset.cameraAngle=String(Math.round(Math.atan2(this.camera.position.x-this.controls.target.x,this.camera.position.z-this.controls.target.z)*1800/Math.PI)/10),this.canvas.dataset.cameraElevation=String(Math.round(this.elevation()*1800/Math.PI)/10),this.canvas.dataset.cameraZoom=this.camera.zoom.toFixed(4),this.canvas.dataset.cameraTarget=`${this.controls.target.x.toFixed(3)},${this.controls.target.z.toFixed(3)}`,this.fpsTime||(this.fpsTime=e),this.frameCount++,e-this.fpsTime>1500){this.fps=Math.round(this.frameCount*1e3/(e-this.fpsTime)),this.frameCount=0,this.fpsTime=e,this.canvas.dataset.fps=String(this.fps),this.canvas.dataset.triangles=String(this.renderer.info.render.triangles),this.canvas.dataset.pixelRatio=String(this.renderer.getPixelRatio()),this.canvas.dataset.drawCalls=String(this.renderer.info.render.calls);let l=1/0;for(let u=0;u<this.walkers.length;u++)for(let d=u+1;d<this.walkers.length;d++)this.walkers[u].group.visible&&this.walkers[d].group.visible&&(l=Math.min(l,Math.hypot(this.walkers[u].group.position.x-this.walkers[d].group.position.x,this.walkers[u].group.position.z-this.walkers[d].group.position.z)));this.canvas.dataset.npcCount=String(this.walkers.length),this.canvas.dataset.npcMinDistance=Number.isFinite(l)?l.toFixed(3):"none",this.canvas.dataset.npcSample=JSON.stringify(this.walkers.slice(0,3).map(u=>({x:+u.group.position.x.toFixed(3),z:+u.group.position.z.toFixed(3),leg:+u.limbs[0].rotation.x.toFixed(3),arm:+u.limbs[2].rotation.x.toFixed(3)}))),this.canvas.dataset.curatedScenery=String(this.sceneryModels.size),this.canvas.dataset.npcTravel=JSON.stringify(this.traffic?.people.map(u=>+u.totalTravelled.toFixed(2))||[])}}clearTransient(e){let t=new Set,n=new Set;e.traverse(s=>{if(s instanceof Ue||s instanceof kn){s.geometry!==Wc&&t.add(s.geometry);for(let r of Array.isArray(s.material)?s.material:[s.material])Ug(r)||n.add(r)}}),e.clear();for(let s of t)s.dispose();for(let s of n)s.dispose()}buildExtras(){if(this.clearTransient(this.extras),this.board.terrain!=="valley")return;let e=this.board.buildings.find(s=>s.kind==="hall"),t=this.buildingMeshes.get(e.id),n=new ge;n.position.copy(t.position),n.rotation.copy(t.rotation),this.extras.add(n);for(let[s,r]of this.state.chapterStars.entries())if(r){let a=s<3?-1.04+s*.3:.44+(s-3)*.3;E(n,a,.15,1.31,.25,.3,.2,"#a99e83");for(let o=0;o<r;o++){let c=new pi;for(let u=0;u<10;u++){let d=Math.PI/2+u*Math.PI/5,f=u%2?.05:.105;u===0?c.moveTo(Math.cos(d)*f,Math.sin(d)*f):c.lineTo(Math.cos(d)*f,Math.sin(d)*f)}c.closePath();let l=new Ue(new Fi(c,{depth:.03,bevelEnabled:!1}),Tt("#d6b467",!0));l.position.set(a,.4+o*.19,1.31),n.add(l)}}}};var oM={Coins:Su,RefreshCw:Uu,House:Do,Route:Ou,Move:Du,ClipboardList:yu,Puzzle:Nu,BookOpen:xu,Settings:ku,X:Yu,ArrowLeft:pu,ArrowRight:mu,RotateCw:Fu,ZoomIn:Ku,ZoomOut:ju,Focus:Au,Check:_u,Lock:Ru,Star:Bu,TreeDeciduous:Hu,Coffee:bu,Wheat:$u,ArrowUpRight:gu,Volume2:Xu,VolumeX:qu,Sun:zu,Moon:Iu,Sunset:Vu,Sunrise:Gu,Download:Mu,Upload:Wu,Archive:hu,MousePointer2:Lu,Eraser:wu,Flag:Tu,Hammer:Eu,ChevronRight:vu,Sparkles:No,MapPin:Pu,Info:Cu},bh=new Map;function At(i){return bh.has(i)||bh.set(i,fu(oM[i],{width:20,height:20,"stroke-width":1.65,"aria-hidden":"true"}).outerHTML),bh.get(i)}var Ft=i=>String(i).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),Jc=i=>`<span class="stars" aria-label="${i} \u9897\u661F">${[0,1,2].map(e=>`<span class="${e<i?"earned":""}">${At("Star")}</span>`).join("")}</span>`,Ie=(i,e,t="",n="",s="")=>`<button type="button" data-action="${i}" class="${n}" ${n.includes("icon-only")?`aria-label="${Ft(e)}"`:""} ${s}>${t?At(t):""}<span>${e}</span></button>`,Qc=class{constructor(e,t,n){this.root=e;this.store=t;this.panel=null;this.category="homes";this.selectedId=null;this.tool="inspect";this.pendingKind=null;this.rotation=0;this.hoverCell={x:6,z:17};this.busy=!1;this.toastTimer=0;this.coordinateOpen=!1;this.toastMessage="";this.toastUntil=0;this.progressPanel=0;this.notice="";this.modeChanged=!1;this.heldKeys=new Set;this.heldCameraButton=!1;this.ignoreCameraClickUntil=0;this.e=ys(t.board),this.scene=new Zc(n,{select:a=>this.select(a),cell:(a,o)=>this.onCell(a,o),hover:a=>this.onHover(a),strokeEnd:()=>this.scene.sound(390),cancel:()=>{this.resetTool(),this.panel=null,this.render()},assetsReady:()=>this.render(),clock:(a,o)=>this.store.clock(a,o)}),t.subscribe(()=>{this.e=ys(t.board),t.conflict&&(this.notice="\u5DF2\u8F7D\u5165\u53E6\u4E00\u4E2A\u7A97\u53E3\u4FDD\u5B58\u7684\u6700\u65B0\u8FDB\u5EA6\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u64CD\u4F5C",t.conflict=!1,this.resetTool()),this.render()}),e.addEventListener("click",a=>{let o=a.target.closest("[data-action]");o&&!o.disabled&&this.action(o.dataset.action,o)}),e.addEventListener("focusin",a=>{a.target.closest("input,select,textarea,[contenteditable]")&&(this.heldKeys.clear(),this.syncCameraKeys())}),e.addEventListener("change",a=>this.change(a)),e.addEventListener("pointerdown",a=>{let o=a.target.closest("[data-action]");a.button===0&&/^camera-(left|right)$/.test(o?.dataset.action||"")&&(a.preventDefault(),this.heldCameraButton=!0,this.scene.holdRotate(o.dataset.action==="camera-left"?-1:1))});let s=()=>{this.heldCameraButton&&(this.heldCameraButton=!1,this.ignoreCameraClickUntil=Date.now()+400,this.syncCameraKeys())};window.addEventListener("pointerup",s),window.addEventListener("pointercancel",s);let r=null;e.addEventListener("pointerdown",a=>{let o=a.target.closest("[data-action]");a.button===0&&o&&!o.disabled&&/^(buy|place-owned):/.test(o.dataset.action)&&(r={x:a.clientX,y:a.clientY,action:o.dataset.action,started:!1})}),window.addEventListener("pointermove",a=>{r&&(!r.started&&Math.hypot(a.clientX-r.x,a.clientY-r.y)>8&&(r.started=!0,this.action(r.action,document.createElement("button"))),r.started&&(a.preventDefault(),this.scene.previewAt(a.clientX,a.clientY)))}),window.addEventListener("pointerup",a=>{let o=r;r=null,o?.started&&(a.preventDefault(),this.scene.placeAt(a.clientX,a.clientY))}),window.addEventListener("pointercancel",()=>{r=null}),window.addEventListener("keydown",a=>this.keydown(a)),window.addEventListener("keyup",a=>{this.heldKeys.delete(a.key.toLowerCase()),this.syncCameraKeys()}),window.addEventListener("blur",()=>{this.heldKeys.clear(),this.heldCameraButton=!1,this.scene.holdRotate(0),this.scene.holdPan(0,0)}),document.addEventListener("visibilitychange",()=>{document.hidden&&(this.heldKeys.clear(),this.heldCameraButton=!1,this.scene.holdRotate(0),this.scene.holdPan(0,0))}),window.addEventListener("pagehide",()=>this.store.commit(!1)),this.render()}thumbnail(e,t=0,n=0){return`<img class="model-preview" src="${this.scene.thumbnail(e,t,n)}" alt="${st[e].name}" draggable="false"/>`}resetTool(){this.tool="inspect",this.pendingKind=null,this.pendingId=void 0,this.rotation=0,this.coordinateOpen=!1,this.syncCameraKeys(),this.scene.setTool("inspect",null,0)}setTool(e,t=null,n){this.tool=e,this.pendingKind=t,this.pendingId=n,this.syncCameraKeys();let s=n?this.store.board.buildings.find(a=>a.id===n):void 0;this.rotation=s?.rotation||0;let r=s?.projectId?this.store.state.projects.find(a=>a.id===s.projectId):void 0;this.scene.setTool(e,t,this.rotation,r?Ss(la(r.tokens).level).index:0,s?_s(s,this.store.state):0),(e==="road"||e==="erase")&&(this.panel=null),this.render()}select(e){if(!e){this.selectedId=null,this.scene.select(null),this.panel==="detail"&&(this.panel=null),this.render();return}if(this.selectedId=e,this.scene.select(e),this.tool==="move"){let t=this.store.board.buildings.find(n=>n.id===e);this.setTool("move",t.kind,e),this.panel=null}else this.resetTool(),this.panel="detail";this.render()}onHover(e){e&&(this.hoverCell=e);let t=document.getElementById("placement-status");if(!t||!e)return;let n=this.pendingKind?{id:this.pendingId||"preview",kind:this.pendingKind,x:e.x,z:e.z,rotation:this.rotation,placed:!0,variant:0}:null,s=n?Js(this.store.state,this.store.board,n):null;t.textContent=s||`\u6A2A ${e.x+1} \xB7 \u7EB5 ${e.z+1}${n?" \xB7 \u70B9\u51FB\u653E\u7F6E":" \xB7 \u62D6\u52A8\u94FA\u8DEF"}`,t.classList.toggle("invalid",!!s),this.scene.setPreviewValid(!s)}onCell(e,t){if(this.tool==="road"||this.tool==="erase"){let n=this.store.road(e,t,this.tool==="erase");n?this.toast(n):e===6&&t===17&&this.store.board.terrain==="valley"&&this.e.food>=4&&this.toast("\u9053\u8DEF\u63A5\u901A\u4E86\uFF0C\u9762\u5305\u5DF2\u7ECF\u9001\u5230\u56DB\u6237\u90BB\u5C45\u5BB6")}else if(this.pendingKind){let n=this.pendingId,s=this.store.place(this.pendingKind,e,t,this.rotation,n);if(s){this.toast(s);return}if(this.scene.celebrate("building",{x:e+.5,z:t+.5}),n){let r=this.store.activePuzzle&&this.store.board.buildings.find(a=>a.kind===this.pendingKind&&!a.placed);this.resetTool(),this.panel=null,r&&this.setTool("move",r.kind,r.id)}this.selectedId=null,this.scene.select(null),this.render(),this.toast("\u843D\u6210\u4E86\u3002\u63A5\u4E0A\u95E8\u524D\u7684\u9053\u8DEF\uFF0C\u8BA9\u751F\u6D3B\u5F00\u59CB")}}toolbar(){return`<nav class="town-toolbar" aria-label="\u57CE\u9547\u5DE5\u5177">${Ie("inspect","\u6D4F\u89C8","MousePointer2",this.tool==="inspect"&&!this.panel?"active":"")}${Ie("build",this.store.activePuzzle?"\u5EFA\u7B51":"\u5EFA\u8BBE","House",this.panel==="build"||this.panel==="inventory"?"active":"")}${Ie("road","\u94FA\u8DEF","Route",this.tool==="road"?"active":"")}${Ie("move","\u642C\u8FC1","Move",this.tool==="move"?"active":"")}<i class="toolbar-divider"></i>${Ie("quests","\u59D4\u6258","ClipboardList",this.panel==="quests"?"active":"")}${Ie("puzzles","\u89C4\u5212\u5173","Puzzle",this.panel==="puzzles"?"active":"")}${this.store.activePuzzle?"":Ie("production","\u519C\u4E8B","Wheat",this.panel==="production"?"active":"")}${this.store.activePuzzle?"":Ie("orders","\u90BB\u91CC","ClipboardList",this.panel==="orders"?"active":"")}${Ie("book","\u56FE\u9274","BookOpen",this.panel==="book"?"active":"")}</nav>`}goalHTML(e){return`<ul class="goal-list">${e.map(t=>`<li class="${t.met?"met":""}"><span class="goal-check">${At(t.met?"Check":"Flag")}</span><span>${t.label}</span><small>${t.need>1?`${Math.min(t.current,t.need)}/${t.need}`:t.met?"\u5B8C\u6210":"\u5F85\u5B8C\u6210"}</small></li>`).join("")}</ul>`}currentGoal(){let e=this.store.puzzle;if(e)return`<aside class="goal-card puzzle-goal"><span class="small-label">${At("Puzzle")} \u514D\u8D39\u89C4\u5212\u5173</span><h2>${e.title}</h2>${this.goalHTML(lu(e,this.e))}<div class="goal-meta"><span>\u9053\u8DEF <b>${this.e.roadCount}/${e.roadBudget}</b></span>${Jc(ca(e,this.e))}</div>${Ie("claim-puzzle","\u8BC4\u5B9A\u8FD9\u4E2A\u65B9\u6848","Check","primary small",ca(e,this.e)<=(this.store.state.puzzleStars[e.id]||0)?"disabled":"")}<p class="quiet-note">\u4F7F\u7528\u56FA\u5B9A\u5E93\u5B58\uFF0C\u4E0D\u6D88\u8017\u4E3B\u57CE\u91D1\u5E01</p></aside>`;let t=this.store.state.chapterStars.every(a=>a>0),n=li(this.store.state),s=qi[n-1],r=wo(n,this.e);return`<aside class="goal-card"><div class="chapter-row"><span class="small-label">${At("Flag")} ${t?"\u81EA\u7531\u53D1\u5C55":`\u7B2C ${n} \u7AE0 / 6`}</span>${Ie("quests","\u67E5\u770B\u59D4\u6258","ArrowUpRight","icon-only")}</div><h2>${t?"\u8FD9\u5C31\u662F\u6211\u4EEC\u7684\u6CB3\u8C37":s.title}</h2>${t?"<p>\u7EE7\u7EED\u5EFA\u9020\u3001\u6311\u6218\u4E09\u661F\uFF0C\u7ED9\u6BCF\u4E2A\u9879\u76EE\u7559\u4E00\u4E2A\u597D\u4F4D\u7F6E\u3002</p>":this.goalHTML(r.base)}<div class="chapter-progress">${[1,2,3,4,5,6].map(a=>`<span class="${this.store.state.chapterStars[a-1]?"done":a===n?"current":""}"></span>`).join("")}</div>${!t&&na(n,this.e)>this.store.state.chapterStars[n-1]?Ie("claim-current","\u5B8C\u6210\u59D4\u6258","Check","primary small"):`<p class="quiet-note">${this.e.population} \u4F4D\u90BB\u5C45 \xB7 ${this.e.food} \u680B\u4F4F\u5B85\u83B7\u5F97\u98DF\u7269</p><p class="goal-hint">${t?"":Ju(n,this.store.board,this.e)}</p>`}</aside>`}onboarding(){return this.store.state.tutorialDone||this.store.activePuzzle?"":`<aside class="welcome-card"><button class="welcome-close icon-only" data-action="dismiss-tutorial" aria-label="\u5173\u95ED\u5F15\u5BFC">${At("X")}</button><span class="small-label">\u7B2C\u4E00\u6B21\u6765\u5230\u6CB3\u8C37</span><h3>\u4E00\u6BB5\u5DE5\u4F5C\uFF0C\u4E00\u70B9\u5C0F\u9547\u7684\u53D8\u5316\u3002</h3><p>token \u6362\u6210\u91D1\u5E01\uFF0C\u91D1\u5E01\u4E70\u6765\u5EFA\u7B51\u3002\u63A5\u597D\u9053\u8DEF\u3001\u7167\u987E\u90BB\u5C45\uFF0C\u518D\u628A\u6CB3\u8C37\u6162\u6162\u53D8\u6210\u4F60\u7684\u6837\u5B50\u3002</p><div class="welcome-steps"><span>${At("RefreshCw")} \u540C\u6B65</span>${At("ChevronRight")}<span>${At("House")} \u5EFA\u8BBE</span>${At("ChevronRight")}<span>${At("Flag")} \u89E3\u9501</span></div><div class="welcome-actions">${Ie("connect-start",this.e.food>=4?"\u770B\u770B\u7B2C\u4E00\u4EFD\u59D4\u6258":"\u63A5\u901A\u95E8\u524D\u6700\u540E\u4E00\u683C\u8DEF","Route","primary small")}${this.store.state.mode==="live"?Ie("demo","\u5148\u73A9\u6F14\u793A","","text-button"):""}</div><small>\u53EF\u968F\u65F6\u79BB\u5F00\uFF0C\u8FDB\u5EA6\u4F1A\u81EA\u52A8\u4FDD\u5B58\u3002</small></aside>`}toolRibbon(){if(this.tool==="inspect")return"";let e={inspect:"\u6D4F\u89C8",road:"\u94FA\u8BBE\u9053\u8DEF",erase:"\u64E6\u9664\u9053\u8DEF",place:"\u653E\u7F6E\u5EFA\u7B51",move:"\u642C\u8FC1\u5EFA\u7B51"};return`<section class="tool-ribbon"><div><b>${this.pendingKind?`${this.pendingId?"\u6446\u653E":"\u5EFA\u8BBE"}${st[this.pendingKind].name}`:e[this.tool]}</b><span id="placement-status">${this.tool==="move"&&!this.pendingKind?"\u5148\u70B9\u51FB\u4F60\u60F3\u642C\u8FC1\u7684\u5EFA\u7B51":"\u79FB\u52A8\u9F20\u6807\u9884\u89C8 \xB7 \u5DE6\u952E\u843D\u5730 \xB7 \u53F3\u952E\u53D6\u6D88"}</span></div>${this.pendingKind?`<small class="rotation-hint">Q / E \xB7 \u671D${["\u5357","\u897F","\u5317","\u4E1C"][this.rotation]}</small>`:""}${this.pendingKind?Ie("rotate-preview","\u65CB\u8F6C","RotateCw","ribbon-button"):this.tool==="road"||this.tool==="erase"?Ie("toggle-erase",this.tool==="erase"?"\u94FA\u8DEF":"\u64E6\u9664",this.tool==="erase"?"Route":"Eraser","ribbon-button"):""}${Ie("coordinates","\u7CBE\u786E\u5B9A\u4F4D","MapPin","ribbon-button")}${Ie("inspect","\u5B8C\u6210","Check","ribbon-button")} ${this.coordinateOpen?`<form id="placement-form"><label>\u6A2A\u683C<input name="x" aria-label="\u6A2A\u683C" type="number" min="1" max="${this.store.board.size}" value="${this.hoverCell.x+1}" /></label><label>\u7EB5\u683C<input name="z" aria-label="\u7EB5\u683C" type="number" min="1" max="${this.store.board.size}" value="${this.hoverCell.z+1}" /></label>${Ie("place-coordinates",this.pendingKind?"\u5728\u6B64\u653E\u7F6E":this.tool==="erase"?"\u64E6\u9664\u6B64\u683C":"\u94FA\u8BBE\u6B64\u683C","","primary small")}<small>\u5EFA\u7B51\u5DE6\u4E0A\u89D2\u7684\u683C\u5B50\uFF1BQ / E \u65CB\u8F6C\uFF0CEsc \u7ED3\u675F</small></form>`:""}</section>`}header(){let e=this.store.state;return`<header class="town-header"><div class="brand">${At("House")}<div><h1>Token Town</h1><span>${this.store.activePuzzle?"\u6CB3\u8C37\u89C4\u5212\u684C":"\u4F60\u7684\u6CB3\u8C37\u5C0F\u9547"}</span></div></div><div class="header-actions">${this.store.activePuzzle?Ie("leave-puzzle","\u56DE\u5230\u5C0F\u9547","ArrowLeft","back-town"):""}<div class="coin-wallet" aria-label="\u91D1\u5E01\u4F59\u989D">${At("Coins")}<strong data-testid="coin-balance">${e.coins.toLocaleString("zh-CN")}</strong><span>\u91D1\u5E01</span></div>${Ie("sync",this.busy?"\u8BFB\u53D6\u4E2D":e.mode==="demo"?"\u6536\u96C6\u6F14\u793A token":"\u540C\u6B65 token","RefreshCw","sync-button",`aria-label="${this.busy?"\u8BFB\u53D6\u4E2D":e.mode==="demo"?"\u6536\u96C6\u6F14\u793A token":"\u540C\u6B65 token"}" ${this.busy?"disabled":""}`)}${Ie("settings","\u8BBE\u7F6E","Settings","icon-only settings-button")}</div></header><div class="mode-indicator">${e.mode==="demo"?'<span class="mode-dot demo-dot"></span>\u6F14\u793A\u57CE\u9547':'<span class="mode-dot"></span>\u672C\u5730\u57CE\u9547'}${Ie(e.mode==="demo"?"live":"demo",e.mode==="demo"?"\u5207\u6362\u771F\u5B9E\u8BB0\u5F55":"\u8BD5\u8BD5\u6F14\u793A","","text-button")}${e.history==="ready"?`<span class="last-sync">${e.projects.length} \u4E2A\u9879\u76EE\u4E3A\u8FD9\u91CC\u4F9B\u80FD</span>`:""}<span id="world-clock" class="world-clock">${mn(e.worldSeconds,e.settings).label}</span></div>`}cameraControls(){return`<div class="camera-controls" aria-label="\u955C\u5934\u63A7\u5236">${Ie("camera-left","\u5DE6\u8F6C\u955C\u5934","ArrowLeft","icon-only")}${Ie("camera-right","\u53F3\u8F6C\u955C\u5934","ArrowRight","icon-only")}<i></i>${Ie("zoom-in","\u653E\u5927","ZoomIn","icon-only")}${Ie("zoom-out","\u7F29\u5C0F","ZoomOut","icon-only")}${Ie("overview","\u4FEF\u77B0\u6CB3\u8C37","MapPin","icon-only")}${Ie("focus","\u56DE\u5230\u5C0F\u9547","Focus","icon-only")}</div><span class="camera-hint">${this.store.state.settings.cameraInput==="trackpad"?"WASD \u79FB\u52A8 \xB7 \u4E24\u6307\u8F6C\u52A8 \xB7 \u634F\u5408\u7F29\u653E":"WASD \u79FB\u52A8 \xB7 \u6EDA\u8F6E\u7F29\u653E \xB7 Q / E \u8F6C\u955C\u5934"}</span>`}render(){let e=this.root.querySelector(".town-panel"),t=e?.getAttribute("aria-label"),n=e?.querySelector(".panel-content")?.scrollTop||0,s=document.activeElement?.dataset.setting,r=this.store.board;this.scene.setWorld(this.store.state,r,this.e),this.root.innerHTML=`${this.header()}${this.homeBubbles()}${this.currentGoal()}${this.onboarding()}${this.toolbar()}${this.toolRibbon()}${this.cameraControls()}${this.panel?this.panelHTML():""}<div id="town-toast" class="${Date.now()<this.toastUntil?"visible":""}" role="status" aria-live="polite">${Date.now()<this.toastUntil?`${At("Sparkles")}<span>${Ft(this.toastMessage)}</span>`:""}</div>${this.store.persistenceError||this.notice?`<div class="save-notice" role="alert">${Ft(this.store.persistenceError||this.notice)}</div>`:""}`,this.scene.positionHomeBubbles(this.root),this.scene.select(this.selectedId),this.onHover(this.hoverCell);let a=this.root.querySelector(".town-panel");if(a&&a.getAttribute("aria-label")===t){let o=a.querySelector(".panel-content");o&&(o.scrollTop=n),s&&this.root.querySelector(`[data-setting="${s}"]`)?.focus({preventScroll:!0})}}homeBubbles(){let e={\u9053\u8DEF:"Route",\u98DF\u7269:"Wheat",\u7EFF\u5730:"TreeDeciduous",\u4F11\u95F2:"Coffee"},t=this.store.puzzle?3:li(this.store.state);return`<div class="home-needs-layer" aria-label="\u4F4F\u5B85\u7F3A\u5931\u9700\u6C42">${Jh(this.store.board,this.e,t,!this.store.puzzle||this.store.puzzle.leisureGoal>0).map(({home:n,needs:s})=>`<button class="home-need-bubble" data-home-need="${Ft(n.id)}" data-action="find:${Ft(n.id)}" title="${Ft(tr(n))}\uFF1A\u7F3A\u5C11${s.join("\u3001")}" aria-label="${Ft(tr(n))}\uFF1A\u7F3A\u5C11${s.join("\u3001")}">${s.map(r=>At(e[r])).join("")}</button>`).join("")}</div>`}panelHTML(){let e={build:"\u5EFA\u4E00\u70B9\u65B0\u751F\u6D3B",inventory:"\u5DF2\u7ECF\u5C5E\u4E8E\u4F60\u7684",quests:"\u6CB3\u8C37\u59D4\u6258",puzzles:"\u6CB3\u8C37\u89C4\u5212\u684C",book:"\u5C0F\u9547\u56FE\u9274",production:"\u4ECE\u7530\u91CE\u5230\u9910\u684C",orders:"\u90BB\u91CC\u5FC3\u613F",settings:"\u5C0F\u9547\u8BBE\u7F6E",detail:"\u5EFA\u7B51\u8BE6\u60C5",history:"\u8BA9\u5DE5\u4F5C\u70B9\u4EAE\u6CB3\u8C37"},t="";return this.panel==="build"?t=this.buildPanel():this.panel==="inventory"?t=this.inventoryPanel():this.panel==="quests"?t=this.questPanel():this.panel==="puzzles"?t=this.puzzlePanel():this.panel==="book"?t=this.bookPanel():this.panel==="production"?t=this.productionPanel()+this.villagePanel():this.panel==="orders"?t=this.orderPanel():this.panel==="settings"?t=this.settingsPanel():this.panel==="detail"?t=this.detailPanel():t=`<div class="empty-records">${At("RefreshCw")}<h3>${this.notice?"\u8FD9\u6B21\u8FD8\u6CA1\u6709\u8BFB\u5230\u8BB0\u5F55":"\u8FD8\u6CA1\u627E\u5230\u672C\u5730 token \u5386\u53F2"}</h3><p>\u8D77\u6B65\u5EFA\u7B51\u548C\u89C4\u5212\u5173\u90FD\u80FD\u7EE7\u7EED\u73A9\u3002\u6709 Claude Code\u3001Codex\u3001Kimi Code \u6216 DeepSeek Harness \u7684\u672C\u5730\u4F7F\u7528\u8BB0\u5F55\u65F6\uFF0C\u518D\u540C\u6B65\u5230\u8FD9\u5EA7\u57CE\u9547\u3002</p>${Ie("sync","\u91CD\u65B0\u8BFB\u53D6\u672C\u5730\u8BB0\u5F55","RefreshCw","primary")}${Ie("demo","\u8FDB\u5165\u72EC\u7ACB\u6F14\u793A\u57CE\u9547","Puzzle","secondary")}<small>\u6F14\u793A\u91D1\u5E01\u4E0E\u771F\u5B9E\u5B58\u6863\u5206\u5F00\u4FDD\u5B58\u3002</small></div>`,`<aside class="town-panel ${this.panel==="settings"?"settings-panel":""}" aria-label="${e[this.panel]}"><div class="panel-heading"><div><span class="small-label">${this.store.activePuzzle?"\u89C4\u5212\u5173":"\u6CB3\u8C37\u5C0F\u9547"}</span><h2>${e[this.panel]}</h2></div>${Ie("close-panel","\u5173\u95ED\u9762\u677F","X","icon-only")}</div><div class="panel-content">${t}</div></aside>`}buildPanel(){return`<div class="panel-tabs">${[["homes","\u4F4F\u5B85"],["production","\u519C\u4E8B"],["services","\u670D\u52A1"],["landmarks","\u5730\u6807"],["decor","\u88C5\u9970"]].map(([e,t])=>Ie(`category:${e}`,t,"",this.category===e?"active":"")).join("")}</div><p class="panel-note">\u70B9\u51FB\u5EFA\u7B51\uFF0C\u6A21\u578B\u4F1A\u8DDF\u968F\u9F20\u6807\uFF1B\u4E5F\u53EF\u4EE5\u76F4\u63A5\u62D6\u5230\u7A7A\u5730\u3002\u5DE6\u952E\u653E\u7F6E\uFF0CQ / E \u65CB\u8F6C\uFF0C\u53F3\u952E\u53D6\u6D88\u3002</p><div class="catalog-grid">${Object.values(st).filter(e=>e.category===this.category&&e.kind!=="hall"&&e.kind!=="workshop").map(e=>{let t=this.store.unlockedKind(e.kind),n=Dn.find(r=>r.reward===e.kind),s=$n.find(r=>r.reward===e.kind);return`<button data-action="buy:${e.kind}" class="catalog-item ${t?"":"locked"} ${this.pendingKind===e.kind&&!this.pendingId?"selected":""}" ${t?"":"disabled"}>${this.thumbnail(e.kind)}<b>${e.name}</b><span class="catalog-price">${At(t?"Coins":"Lock")}${t?e.cost:s?"\u90BB\u91CC\u5FC3\u613F":n?`\u89C4\u5212\u5173 ${Dn.indexOf(n)+1}`:`\u7B2C ${e.chapter} \u7AE0`}</span><small>${e.w} \xD7 ${e.d} \u683C${e.service?` \xB7 ${Ln(this.store.board,e.kind).capacity} \u6237`:""}</small></button>`}).join("")}</div>${Ie("inventory",`\u5DF2\u6536\u7EB3 ${this.store.board.buildings.filter(e=>!e.placed).length} \u680B \xB7 \u514D\u8D39\u6446\u653E`,"Archive","inventory-link")}`}inventoryPanel(){let e=this.store.board,t=e.buildings.filter(s=>!s.placed),n=Array.from(new Set(t.map(s=>s.kind)));return`<p class="panel-note">${this.store.activePuzzle?"\u672C\u5173\u6240\u6709\u5EFA\u7B51\u5DF2\u7ECF\u51C6\u5907\u597D\u3002\u81EA\u7531\u6446\u653E\u3001\u642C\u8FC1\uFF1B\u94FA\u8DEF\u4E5F\u514D\u8D39\u3002":"\u6536\u7EB3\u53EA\u662F\u628A\u5EFA\u7B51\u6682\u65F6\u653E\u56DE\u4ED3\u5E93\u3002\u5DF2\u6709\u5EFA\u7B51\u53EF\u4EE5\u514D\u8D39\u518D\u6B21\u6446\u653E\u3002"}</p>${n.length?`<div class="inventory-list">${n.map(s=>{let r=t.filter(c=>c.kind===s),a=r[0],o=a.projectId?this.store.state.projects.find(c=>c.id===a.projectId):void 0;return`<button data-action="place-owned:${a.id}" class="inventory-row">${this.thumbnail(s,_s(a,this.store.state),o?Ss(la(o.tokens).level).index:0)}<span><b>${o?Ft(o.name):st[s].name}</b><small>${r.length} \u680B\u53EF\u6446\u653E \xB7 \u514D\u8D39</small></span>${At("ArrowUpRight")}</button>`}).join("")}</div>`:`<div class="empty-state">${At("Archive")}<p>\u73B0\u5728\u6CA1\u6709\u6536\u7EB3\u7684\u5EFA\u7B51\u3002</p><small>\u70B9\u51FB\u57CE\u9547\u4E2D\u7684\u5EFA\u7B51\uFF0C\u5373\u53EF\u514D\u8D39\u642C\u8FC1\u6216\u6536\u7EB3\u3002</small></div>`}${this.store.activePuzzle?`<div class="puzzle-help"><h3>\u518D\u4E89\u53D6\u4E24\u9897\u661F</h3>${this.goalHTML(cu(this.store.puzzle,this.e))}<h3>\u89C4\u5212\u63D0\u793A</h3><p>\u5EFA\u7B51\u95E8\u53E3\u7684\u9AD8\u4EAE\u683C\u8981\u63A5\u4E0A\u9053\u8DEF\u3002\u9547\u516C\u6240\u662F\u9053\u8DEF\u8D77\u70B9\uFF0C\u98DF\u7269\u4E0E\u4F11\u95F2\u670D\u52A1\u6CBF\u9053\u8DEF\u4F20\u9012\u3002</p>${Ie("puzzle-hint","\u7ED9\u6211\u4E00\u70B9\u63D0\u793A","Info","secondary")}${Ie("restart-puzzle","\u91CD\u65B0\u5E03\u7F6E\u8FD9\u4E00\u5173","RotateCw","text-button")}</div>`:Ie("build","\u770B\u770B\u65B0\u7684\u5EFA\u7B51","House","secondary")}`}questPanel(){let e=li(this.store.state),t=this.progressPanel||e,n=qi[t-1],s=wo(t,this.e),r=na(t,this.e),a=this.store.state.chapterStars[t-1];return this.store.activePuzzle?this.puzzlePanel():`<div class="chapter-selector">${qi.map(o=>Ie(`chapter:${o.id}`,String(o.id),"",o.id===t?"active":"",o.id>e?"disabled":"")).join("")}</div><div class="chapter-title"><h3>${n.title}</h3>${Jc(a)}</div><p class="story">${n.story}</p><h4>\u8FD9\u4E00\u7AE0\u7684\u76EE\u6807</h4>${this.goalHTML(s.base)}${this.coverageAudit(t)}<h4>\u518D\u597D\u4E00\u70B9</h4>${this.goalHTML(s.bonus)}<div class="reward-line">${At("Sparkles")}<span>${n.reward}<small>\u9996\u6B21\u5B8C\u6210\u8865\u8D34 ${n.subsidy} \u91D1\u5E01</small><small>\u989D\u5916\u661F\u7EA7\uFF1A\u89E3\u9501${st[Qr[t-1]].name}\u914D\u8272\uFF0C\u8363\u8A89\u82B1\u56ED\u4EAE\u8D77\u7EAA\u5FF5\u661F</small></span></div>${Ie(`claim-chapter:${t-1}`,r>a?"\u5B8C\u6210\u76EE\u6807\u5E76\u9886\u53D6\u5956\u52B1":a?"\u5DF2\u8BB0\u5F55\u8FD9\u4EFD\u6210\u679C":"\u5148\u8BA9\u76EE\u6807\u4EAE\u8D77\u6765","Check","primary",r<=a?"disabled":"")}<p class="panel-note">\u5DF2\u83B7\u5F97\u7684\u661F\u7EA7\u4E0D\u4F1A\u6D88\u5931\u3002\u91D1\u5E01\u8865\u8D34\u6700\u591A\u4E3A token \u91D1\u5E01\u7684 20%\uFF0C\u672A\u7ED3\u7B97\u90E8\u5206\u4F1A\u5728\u540E\u7EED\u540C\u6B65\u65F6\u8865\u53D1\u3002</p>`}puzzlePanel(){return`<p class="panel-note">\u4E09\u4E94\u5206\u949F\uFF0C\u4E00\u9053\u5C0F\u5C0F\u7684\u89C4\u5212\u9898\u3002\u56FA\u5B9A\u5E93\u5B58\uFF0C\u4E0D\u6D88\u8017\u91D1\u5E01\uFF0C\u4E5F\u4E0D\u7528\u7B49\u5F85 token\u3002</p><div class="puzzle-list">${Dn.map((e,t)=>`<button data-action="puzzle:${e.id}" class="puzzle-row"><span class="puzzle-number">${t+1}</span><span class="puzzle-copy"><small>${e.family}</small><b>${e.title}</b><span>${e.description}</span>${Jc(this.store.state.puzzleStars[e.id]||0)}</span>${At("ChevronRight")}</button>`).join("")}</div><div class="reward-explanation">${At("Sparkles")}<p>\u9996\u6B21\u901A\u5173\u89E3\u9501\u88C5\u9970\u84DD\u56FE\uFF0C\u4E09\u661F\u89E3\u9501\u65B0\u914D\u8272\u3002\u84DD\u56FE\u5E26\u56DE\u4E3B\u57CE\uFF0C\u7528\u91D1\u5E01\u5EFA\u9020\u3002</p></div>`}bookPanel(){let e=this.store.state;return`<section class="book-section"><h3>\u9879\u76EE\u5DE5\u574A <span>${e.projects.length}</span></h3><p class="panel-note">\u4E0B\u9762\u8FD9\u4E9B\u662F AI \u9879\u76EE\u5DE5\u574A\uFF0C\u4E0D\u662F\u4F4F\u5B85\u6216\u5546\u5E97\u3002\u6BCF\u4E2A\u540D\u79F0\u6765\u81EA\u4F60\u7684\u9879\u76EE\u6587\u4EF6\u5939\uFF0C\u70B9\u51FB\u53EF\u5B9A\u4F4D\u6216\u6446\u653E\u3002\u5DE5\u574A\u968F\u9879\u76EE token \u5347\u7EA7\uFF0C\u5171 50 \u7EA7\u3001\u4E94\u4E2A\u5916\u89C2\u9636\u6BB5\uFF1B\u4E0D\u63D0\u4F9B\u4F4F\u5B85\u670D\u52A1\u6216\u91D1\u5E01\u500D\u7387\u3002</p>${e.projects.length?e.projects.map(t=>{let n=la(t.tokens),s=e.town.buildings.find(r=>r.projectId===t.id);return`<article class="project-row">${this.thumbnail("workshop",_s(s,e),n.stage.index)}<div><b>${Ft(t.name)}</b><span class="project-level" style="color:${Lh[n.stage.index]}">\u9879\u76EE\u5DE5\u574A \xB7 Lv.${n.level} \xB7 ${nu[n.stage.index]}</span><small>${pa(t.tokens)} token \xB7 ${Ft(t.provider)}</small><div class="level-progress"><span style="width:${n.progress*100}%"></span></div>${Ie(s.placed?`find:${s.id}`:`place-owned:${s.id}`,s.placed?"\u53BB\u770B\u770B":"\u514D\u8D39\u6446\u653E","ArrowUpRight","text-button")}</div></article>`}).join(""):`<div class="empty-state">${At("House")}<p>\u540C\u6B65 token \u540E\uFF0C\u9879\u76EE\u5DE5\u574A\u4F1A\u6765\u5230\u8FD9\u91CC\u3002</p>${Ie("sync",e.mode==="demo"?"\u6536\u96C6\u6F14\u793A token":"\u540C\u6B65 token","RefreshCw","secondary")}</div>`}</section><section class="book-section"><h3>\u89C4\u5212\u6536\u85CF</h3><div class="collection-grid">${Dn.map(t=>`<div class="collection-item ${e.puzzleStars[t.id]?"":"locked"}">${this.thumbnail(t.reward)}<b>${st[t.reward].name}</b><small>${(e.puzzleStars[t.id]||0)>0?(e.puzzleStars[t.id]||0)===3?"\u539F\u8272\u4E0E\u4E09\u661F\u914D\u8272\u5DF2\u89E3\u9501":"\u84DD\u56FE\u5DF2\u89E3\u9501":`\u901A\u5173\u300C${t.title}\u300D`}</small></div>`).join("")}</div></section><section class="book-section"><h3>\u90BB\u91CC\u56DE\u5FC6</h3><div class="collection-grid">${$n.map(t=>`<div class="collection-item ${e.village.completed[t.id]?"":"locked"}">${this.thumbnail(t.reward)}<b>${t.name}</b><small>${e.village.completed[t.id]||0} \u6B21\u5206\u4EAB \xB7 ${(e.village.completed[t.id]||0)>0?st[t.reward].name+"\u5DF2\u89E3\u9501":"\u9996\u6B21\u5206\u4EAB\u89E3\u9501\u84DD\u56FE"}</small></div>`).join("")}</div></section><section class="book-section"><h3>\u6CB3\u8C37\u8363\u8A89</h3><div class="honor-list">${qi.map((t,n)=>`<div><span>${t.title}<small class="honor-reward">${st[Qr[n]].name} \xB7 ${e.chapterStars[n]>=2?e.chapterStars[n]===3?"\u5168\u90E8\u7EAA\u5FF5\u914D\u8272\u5DF2\u89E3\u9501":"\u9996\u6B3E\u7EAA\u5FF5\u914D\u8272\u5DF2\u89E3\u9501":"\u989D\u5916\u661F\u7EA7\u89E3\u9501\u914D\u8272"}</small></span>${Jc(e.chapterStars[n])}</div>`).join("")}</div></section>`}coverageAudit(e){let t=this.store.board,n=t.buildings.filter(a=>a.placed&&a.kind==="house"),s=e>=3?["food","green","leisure"]:e>=2?["food","green"]:["food"],r={food:"\u98DF\u7269",green:"\u7EFF\u5730",leisure:"\u4F11\u95F2"};return`<section class="coverage-audit" aria-label="\u670D\u52A1\u4E0E\u76EE\u6807\u8BA1\u7B97"><h4>\u8FDB\u5EA6\u4E3A\u4EC0\u4E48\u6CA1\u589E\u52A0\uFF1F</h4><p class="panel-note">${Ju(e,t,this.e)}</p><div class="coverage-totals"><span>\u5DF2\u6446\u4F4F\u5B85 <b>${n.length}</b></span><span>\u63A5\u901A\u9053\u8DEF <b>${this.e.houses}</b></span><span>\u98DF\u7269\u6EE1\u8DB3 <b>${this.e.food}</b></span><span>\u7EFF\u5730\u6EE1\u8DB3 <b>${this.e.green}</b></span></div><p class="panel-note">\u8FDB\u5EA6\u6570\u7684\u662F\u83B7\u5F97\u670D\u52A1\u7684\u4F4F\u5B85\u3002\u540C\u4E00\u680B\u4F4F\u5B85\u88AB\u591A\u5BB6\u5E97\u6216\u591A\u4E2A\u516C\u56ED\u8986\u76D6\uFF0C\u540C\u4E00\u9879\u9700\u6C42\u4E5F\u53EA\u8BA1\u4E00\u6B21\u3002\u9879\u76EE\u5DE5\u574A\u3001\u5546\u5E97\u90FD\u4E0D\u7B97\u4F4F\u5B85\u3002</p>${Ie("build-homes","\u5EFA\u4F4F\u5B85","House","secondary small")}<details><summary>\u9010\u680B\u67E5\u770B\u4F4F\u5B85\u9700\u6C42 \xB7 \u70B9\u51FB\u5B9A\u4F4D</summary><div class="coverage-homes">${n.map(a=>`<button data-action="find:${Ft(a.id)}" class="coverage-home"><b>${tr(a)}</b>${s.map(o=>`<span class="${this.e.buildings[a.id]?.[o]?"met":"missing"}">${r[o]}\uFF1A${Zu(t,this.e,a,o)}</span>`).join("")}</button>`).join("")}</div></details><details><summary>\u67E5\u770B\u6BCF\u4E2A\u670D\u52A1\u8BBE\u65BD \xB7 \u70B9\u51FB\u770B\u8303\u56F4</summary><div class="coverage-homes">${t.buildings.filter(a=>a.placed&&(st[a.kind].service||a.kind==="park")).map(a=>{let o=Ln(this.store.board,a.kind),c=ma(t,this.e,a),l=c.homes.filter(u=>u.served).length;return`<button data-action="find:${Ft(a.id)}" class="coverage-home"><b>${tr(a)}</b><span class="${c.active?"met":"missing"}">${c.active?`\u5DF2\u670D\u52A1 ${l}${o.capacity?`/${o.capacity}`:""} \u680B \xB7 ${a.kind==="park"?`\u8FB9\u7F18 ${Xn(t)} \u683C`:`\u6B65\u884C ${o.range} \u683C`}`:"\u5165\u53E3\u672A\u8FDE\u8DEF\uFF0C\u670D\u52A1\u672A\u751F\u6548"}</span></button>`}).join("")}</div></details></section>`}coveragePanel(e){let t=Ln(this.store.board,e.kind),n=ma(this.store.board,this.e,e),s=n.homes.filter(a=>a.served).length,r=n.active?n.homes.filter(a=>a.connected).length:0;return`<div class="service-summary"><span>\u5DF2\u670D\u52A1\u4F4F\u5B85 <b>${s}${t.capacity?`/${t.capacity}`:""} \u680B</b></span><span>\u8303\u56F4\u5185\u8FDE\u8DEF\u4F4F\u5B85 <b>${r} \u680B</b></span><span>${e.kind==="park"?"\u6700\u8FD1\u5360\u5730\u8FB9\u7F18":"\u6700\u8FDC\u9053\u8DEF\u6B65\u884C"} <b>${e.kind==="park"?Xn(this.store.board):t.range} \u683C</b></span></div><p class="panel-note">${n.active?e.kind==="park"?"\u6D45\u7EFF\u683C\u662F\u516C\u56ED\u8986\u76D6\u8303\u56F4\u3002\u7EFF\u6846\u4F4F\u5B85\u5DF2\u83B7\u5F97\u7EFF\u5730\uFF1B\u6A59\u6846\u4F4F\u5B85\u4ECD\u7F3A\u7EFF\u5730\u3002\u516C\u56ED\u6CA1\u6709\u5BB9\u91CF\u4E0A\u9650\uFF0C\u591A\u5EA7\u8986\u76D6\u540C\u4E00\u680B\u53EA\u8BA1\u4E00\u6B21\u3002":"\u4EAE\u8D77\u7684\u9053\u8DEF\u662F\u5B9E\u9645\u6B65\u884C\u8303\u56F4\u3002\u7EFF\u6846\u7531\u672C\u5E97\u670D\u52A1\uFF1B\u6A59\u6846\u4ECD\u7F3A\u8FD9\u9879\u670D\u52A1\u3002\u591A\u5BB6\u5E97\u670D\u52A1\u540C\u4E00\u680B\u53EA\u8BA1\u4E00\u6B21\u3002":"\u5165\u53E3\u672A\u8FDE\u5230\u9547\u516C\u6240\uFF0C\u5F53\u524D\u670D\u52A1\u6CA1\u6709\u751F\u6548\u3002\u95E8\u53E3\u6A59\u6846\u9700\u8981\u63A5\u4E0A\u9053\u8DEF\u3002"}${n.active&&s===0?"<br>\u5C1A\u672A\u670D\u52A1\u65B0\u4F4F\u5B85\uFF1A\u9644\u8FD1\u6CA1\u6709\u7B26\u5408\u6761\u4EF6\u7684\u4F4F\u5B85\uFF0C\u6216\u5B83\u4EEC\u5DF2\u7531\u5176\u4ED6\u5546\u5E97\u6EE1\u8DB3\u3002":""}</p>${n.homes.length?`<div class="coverage-homes">${n.homes.map(a=>`<button data-action="find:${Ft(a.home.id)}" class="coverage-home"><b>${tr(a.home)}</b><span class="${a.served?"met":"missing"}">${a.distance} \u683C \xB7 ${a.served?"\u5DF2\u7531\u672C\u8BBE\u65BD\u670D\u52A1":a.connected?n.active?this.e.buildings[a.home.id][t.service]?"\u5DF2\u7531\u5176\u4ED6\u5546\u5E97\u670D\u52A1\uFF0C\u4E0D\u91CD\u590D\u589E\u52A0\u8FDB\u5EA6":"\u672C\u5E97\u5BB9\u91CF\u5DF2\u6EE1":"\u672C\u8BBE\u65BD\u5165\u53E3\u672A\u8FDE\u8DEF":"\u4F4F\u5B85\u5165\u53E3\u672A\u8FDE\u8DEF"}</span></button>`).join("")}</div>`:""}`}detailPanel(){let e=this.store.board.buildings.find(a=>a.id===this.selectedId);if(!e)return"<p>\u70B9\u51FB\u4E00\u680B\u5EFA\u7B51\uFF0C\u770B\u770B\u5B83\u7684\u751F\u6D3B\u3002</p>";let t=st[e.kind],n=this.e.buildings[e.id],s=this.store.state.projects.find(a=>a.id===e.projectId),r=s?la(s.tokens):null;return`<div class="detail-model">${this.thumbnail(e.kind,_s(e,this.store.state),r?.stage.index||0)}</div><h3 class="detail-name">${s?Ft(s.name):t.name}</h3><p class="story">${s?`${nu[r.stage.index]} \xB7 Lv.${r.level} / 50`:t.description}</p>${n?`<div class="connection-status ${n.connected?"connected":""}">${At(n.connected?"Check":"Route")}${n.connected?"\u95E8\u524D\u9053\u8DEF\u5DF2\u63A5\u901A":"\u95E8\u53E3\u9700\u8981\u8FDE\u63A5\u5230\u9547\u516C\u6240\u7684\u9053\u8DEF"}</div>`:""}${e.kind==="house"&&n?`<h4>\u90BB\u5C45\u4EEC\u7684\u751F\u6D3B</h4><div class="needs-list">${[["food","Wheat","\u98DF\u7269"],["green","TreeDeciduous","\u7EFF\u5730"],["leisure","Coffee","\u4F11\u95F2"]].filter(([a])=>a==="food"||a==="green"&&(this.store.activePuzzle||li(this.store.state)>=2)||a==="leisure"&&(this.store.puzzle?this.store.puzzle.leisureGoal>0:li(this.store.state)>=3)).map(([a,o,c])=>`<div class="${n[a]?"met":""}">${At(o)}<span><b>${c}</b><small>${Zu(this.store.board,this.e,e,a)}</small></span>${At(n[a]?"Check":"Info")}</div>`).join("")}</div>`:""}${Qs.includes(e.kind)&&!this.store.activePuzzle?this.villageDetail(e):""}${["wheatfield","mill","bakery"].includes(e.kind)&&!this.store.activePuzzle?this.productionDetail(e):""}${t.service||e.kind==="park"?this.coveragePanel(e):""}${s?`<div class="project-detail"><div><span>\u7D2F\u8BA1 token</span><b>${pa(s.tokens)}</b></div><div class="level-progress"><span style="width:${r.progress*100}%"></span></div><p>${r.isMax?"\u8FD9\u680B\u5DE5\u574A\u5DF2\u7ECF\u6210\u4E3A\u6CB3\u8C37\u5730\u6807\u3002":`\u8DDD\u79BB Lv.${r.level+1} \u8FD8\u6709 ${pa(r.toNext)} token`}</p></div>`:""}<div class="detail-actions">${Ie(`move-building:${e.id}`,"\u514D\u8D39\u642C\u8FC1","Move","secondary")}${e.kind!=="bridge"?Ie(`rotate-building:${e.id}`,"\u65CB\u8F6C","RotateCw","secondary"):""}${e.kind!=="hall"?Ie(`stash:${e.id}`,"\u6536\u7EB3","Archive","secondary"):""}${Ie(`recolor:${e.id}`,"\u6362\u4E2A\u914D\u8272","Sparkles","text-button")}</div>`}productionPanel(){let e=this.store.state,t=ha(e.town,this.e,e.farm),n=mn(e.worldSeconds,e.settings).sleep;return`<p class="story">\u9EA6\u7530\u3001\u98CE\u8F66\u78E8\u574A\u548C\u9762\u5305\u5E97\u90FD\u63A5\u4E0A\u9053\u8DEF\uFF0C\u90BB\u5C45\u5C31\u4F1A\u4ECE\u64AD\u79CD\u5FD9\u5230\u70D8\u7119\u3002</p><div class="farm-flow"><span>\u9EA6\u7530</span><b>\u2192</b><span>\u98CE\u8F66\u78E8\u574A</span><b>\u2192</b><span>\u9762\u5305\u5E97</span></div><div class="farm-stocks">${[["wheat","\u5C0F\u9EA6"],["flour","\u9762\u7C89"],["bread","\u9762\u5305"]].map(([s,r])=>`<div><span>${r}</span><b data-farm-stock="${s}">${e.farm[s]}</b></div>`).join("")}</div>${t.length?`<div class="farm-list">${t.map(s=>`<button class="farm-row" data-action="find:${Ft(s.field.id)}">${this.thumbnail("wheatfield")}<span><b>\u6CB3\u5CB8\u9EA6\u7530</b><small data-farm-field="${Ft(s.field.id)}">${s.problem||(n?"\u90BB\u5C45\u4F11\u606F\u4E2D \xB7 \u6E05\u6668\u7EE7\u7EED":e.farm.runs[s.field.id]?fa[e.farm.runs[s.field.id].phase]:"\u51C6\u5907\u64AD\u79CD")}</small></span>${At("ArrowUpRight")}</button>`).join("")}</div>`:'<div class="empty-state"><p>\u7B2C\u4E00\u5757\u9EA6\u7530\uFF0C\u8FD8\u7B49\u7740\u4F60\u64AD\u79CD\u3002</p><small>\u9EA6\u7530 6 \u91D1\u5E01\uFF0C\u98CE\u8F66\u78E8\u574A 32 \u91D1\u5E01\uFF1B\u73B0\u6709\u9762\u5305\u5E97\u53EF\u4EE5\u76F4\u63A5\u4F7F\u7528\u3002</small></div>'}<p class="panel-note">\u6BCF\u8F6E\u6536\u83B7 2 \u4EFD\u9EA6\u5B50\uFF0C\u78E8\u6210 3 \u4EFD\u9762\u7C89\uFF0C2 \u4EFD\u7528\u4E8E\u70E4\u51FA 4 \u4E2A\u9762\u5305\uFF0C1 \u4EFD\u53EF\u9001\u5F80\u996D\u9986\u3002\u6700\u591A\u4E09\u4F4D\u90BB\u5C45\u8F6E\u6D41\u52A1\u519C\u4E0E\u914D\u9001\uFF1B\u591C\u95F4\u6682\u505C\uFF0C\u6E05\u6668\u63A5\u7740\u5E72\u3002\u590F\u5929\u9EA6\u82D7\u957F\u5F97\u66F4\u5FEB\uFF0C\u51AC\u5929\u66F4\u6162\u3002</p>${Ie("orders","\u770B\u770B\u90BB\u91CC\u5FC3\u613F","ClipboardList","secondary")}${Ie("build-farms","\u5E03\u7F6E\u9EA6\u7530\u4E0E\u78E8\u574A","Wheat","primary")}<p class="panel-note">\u519C\u4E8B\u6536\u83B7\u4FDD\u5B58\u5728\u672C\u5730\uFF0C\u4E0D\u6D88\u8017\u91D1\u5E01\uFF0C\u4E0D\u4EA7\u751F\u989D\u5916\u91D1\u5E01\u3002\u9762\u5305\u5E97\u539F\u6709\u7684\u4F4F\u5B85\u670D\u52A1\u7EE7\u7EED\u6709\u6548\u3002</p>`}productionDetail(e){let t=this.store.state.farm,n=ha(this.store.state.town,this.e,t),s=n.find(o=>o.field.id===e.id||o.mill?.id===e.id||o.bakery?.id===e.id),r=s&&t.runs[s.field.id],a=s?.problem||(mn(this.store.state.worldSeconds,this.store.state.settings).sleep?"\u90BB\u5C45\u4F11\u606F\u4E2D \xB7 \u6E05\u6668\u7EE7\u7EED":r?fa[r.phase]:"\u51C6\u5907\u64AD\u79CD");return`<h4>\u9EA6\u7530\u5230\u9910\u684C</h4><div class="production-status">${e.kind==="bakery"?`<span data-bakery-material="${Ft(e.id)}">${Ro(e.id,n,t,mn(this.store.state.worldSeconds,this.store.state.settings).sleep)}</span>`:""}${s?`<small data-farm-field="${Ft(s.field.id)}">${a}</small>`:"<small>\u5E03\u7F6E\u9EA6\u7530\u4E0E\u98CE\u8F66\u78E8\u574A\uFF0C\u63A5\u901A\u5B83\u4EEC\u95E8\u524D\u7684\u9053\u8DEF\u3002</small>"}</div>${Ie("production","\u67E5\u770B\u519C\u4E8B\u6D41\u7A0B","Wheat","text-button")}`}villageDetail(e){let t=this.store.state,n=bs(t.village,e),s=mn(t.worldSeconds,t.settings),r=e.kind==="restaurant"?$i.map(a=>[a.id,a.name]):e.kind==="cowshed"?[["milk","\u9C9C\u5976"],["cheese","\u5976\u916A\uFF08\u6D88\u8017 1 \u9C9C\u5976\uFF09"]]:["vegetablefield","greenhouse"].includes(e.kind)?[["carrot","\u80E1\u841D\u535C \xB7 \u6625\u5B63\u66F4\u5FEB"],["potato","\u571F\u8C46 \xB7 \u590F\u5B63\u66F4\u5FEB"]]:[];return`<section class="village-detail"><p class="farm-status" data-village-station="${Ft(e.id)}">${Ao(t,this.e,e,s.season,s.sleep)}</p>${r.length?`<label class="setting-row"><span>${e.kind==="restaurant"?"\u83DC\u8C31":"\u672C\u6B21\u751F\u4EA7"}</span><select aria-label="${st[e.kind].name}\u751F\u4EA7\u9009\u62E9" data-production="${Ft(e.id)}">${r.map(([a,o])=>`<option value="${a}" ${(n.nextChoice||n.choice)===a?"selected":""}>${o}</option>`).join("")}</select></label>${n.nextChoice?"<small>\u5F53\u524D\u6279\u6B21\u5B8C\u6210\u540E\u5207\u6362\uFF0C\u539F\u6599\u4E0D\u4F1A\u6D6A\u8D39\u3002</small>":""}`:""}${e.kind==="restaurant"?`<p class="panel-note">${$i.map(a=>`${a.name}\uFF1A${Object.entries(a.ingredients).map(([o,c])=>`${Yi[o]} ${c}`).join(" + ")} \u2192 \u6599\u7406 2`).join("<br>")}</p>`:""}<div class="village-stocks">${Object.entries(Yi).filter(([a])=>e.kind==="restaurant"?a!=="bread":e.kind==="cowshed"?["milk","cheese"].includes(a):e.kind==="pigpen"?a==="truffle":e.kind==="fishinghut"?a==="fish":["carrot","potato"].includes(a)).map(([a,o])=>`<span>${o} <b data-village-stock="${Ft(e.id)}|${a}">${t.village.stock[e.id]?.[a]||0}</b></span>`).join("")}</div><p class="panel-note">\u5E93\u5B58\u4FDD\u5B58\u5728\u8FD9\u5904\u8BBE\u65BD\uFF1B\u8FD0\u8F93\u4E2D\u7684\u6750\u6599\u7531\u6751\u6C11\u643A\u5E26\u3002\u65AD\u8DEF\u6216\u591C\u665A\u4F1A\u6682\u505C\uFF0C\u6062\u590D\u540E\u7EE7\u7EED\u3002</p></section>`}villagePanel(){return`<h3>\u79CD\u690D\u3001\u517B\u6B96\u4E0E\u9493\u9C7C</h3><p class="story">\u81F3\u591A\u4E09\u4F4D\u90BB\u5C45\u8F6E\u6D41\u5DE5\u4F5C\u3002\u9762\u5305\u4E0E\u6599\u7406\u7528\u6765\u5B8C\u6210\u90BB\u91CC\u5FC3\u613F\uFF1B\u4E0D\u6D88\u8017\u91D1\u5E01\u6765\u751F\u4EA7\uFF0C\u4E5F\u6CA1\u6709\u79BB\u7EBF\u60E9\u7F5A\u3002</p><p class="panel-note">\u6625\u5929\u80E1\u841D\u535C\u3001\u590F\u5929\u571F\u8C46\u751F\u957F\u66F4\u5FEB\uFF0C\u79CB\u5929\u6536\u83B7\u66F4\u591A\uFF0C\u51AC\u5929\u6E29\u5BA4\u7167\u5E38\u79CD\u83DC\u3002\u725B\u68DA\u53EF\u5728\u9C9C\u5976\u4E0E\u5976\u916A\u95F4\u9009\u62E9\uFF0C\u5C0F\u732A\u5BFB\u627E\u677E\u9732\uFF0C\u9493\u9C7C\u5C0F\u5C4B\u590F\u5929\u6536\u9C7C\u66F4\u5FEB\u3002</p>${this.store.state.town.buildings.filter(e=>e.placed&&Qs.includes(e.kind)).map(e=>`<article class="village-card"><h4>${Ie("find:"+e.id,st[e.kind].name,"MapPin","text-button")}</h4>${this.villageDetail(e)}</article>`).join("")}${Ie("orders","\u53BB\u51C6\u5907\u4E00\u4EFD\u90BB\u91CC\u5FC3\u613F","ClipboardList","primary")}`}orderPanel(){if(this.store.activePuzzle)return'<p class="story">\u90BB\u91CC\u8BA2\u5355\u5C5E\u4E8E\u4E3B\u57CE\u3002\u89C4\u5212\u5173\u7684\u5E93\u5B58\u4E0E\u91D1\u5E01\u4FDD\u6301\u72EC\u7ACB\u3002</p>';let e=this.store.state,t=mn(e.worldSeconds,e.settings),n=ra(e,this.e);return`<p class="story">\u6CA1\u6709\u671F\u9650\uFF0C\u7F3A\u6750\u6599\u5C31\u6162\u6162\u51C6\u5907\u3002\u9009\u62E9\u5FC3\u613F\u540E\u5728\u7530\u91CE\u4E0E\u996D\u9986\u5B89\u6392\u751F\u4EA7\uFF0C\u5B8C\u6210\u65F6\u5206\u4EAB\u5B9E\u9645\u5E93\u5B58\u3002</p>${$n.map(s=>`<article class="order-card ${e.village.activeOrder===s.id?"active":""}"><h3>${s.name}</h3><p>${s.story}</p><div class="village-stocks">${Object.entries(s.needs).map(([r,a])=>`<span>${Yi[r]} <b data-order-stock="${r}">${n[r]||0}</b> / ${a}</span>`).join("")}</div><p class="farm-status" data-order-status="${s.id}">${aa(e,this.e,s.id,t.season)||"\u6750\u6599\u9F50\u4E86\uFF0C\u53EF\u4EE5\u9080\u8BF7\u90BB\u5C45\u5206\u4EAB\uFF01"}</p><small>\u9996\u6B21\u5956\u52B1\uFF1A${st[s.reward].name}\u84DD\u56FE \xB7 \u5DF2\u5206\u4EAB ${e.village.completed[s.id]||0} \u6B21</small><div class="order-actions">${Ie("order:"+s.id,e.village.activeOrder===s.id?"\u6B63\u5728\u51C6\u5907":"\u51C6\u5907\u8FD9\u4EFD\u5FC3\u613F","Flag","secondary")}${Ie("fulfill-order:"+s.id,"\u9080\u8BF7\u90BB\u5C45\u5206\u4EAB","Check","primary")}</div></article>`).join("")}${e.village.activeOrder?Ie("cancel-order","\u53D6\u6D88\u5F53\u524D\u5FC3\u613F\uFF0C\u4FDD\u7559\u6750\u6599","X","text-button"):""}<p class="panel-note">\u84DD\u56FE\u89E3\u9501\u540E\uFF0C\u5728\u5EFA\u8BBE \u2192 \u88C5\u9970\u4E2D\u8D2D\u4E70\u3002\u6BCF\u6B21\u5206\u4EAB\u90FD\u6D88\u8017\u6750\u6599\uFF0C\u91CD\u590D\u5B8C\u6210\u4E0D\u589E\u52A0\u91D1\u5E01\u3002</p>`}settingsPanel(){let e=this.store.state;return`<h3>\u6CB3\u8C37\u7684\u65F6\u5149</h3><label class="setting-row"><span>\u663C\u591C\u81EA\u52A8\u53D8\u5316</span><input type="checkbox" aria-label="\u663C\u591C\u81EA\u52A8\u53D8\u5316" data-setting="clock" ${e.settings.clockMode==="cycle"?"checked":""} /></label><p class="panel-note">\u516D\u5206\u949F\u8FC7\u4E00\u5929\uFF0C\u6BCF\u4E09\u5929\u6362\u4E00\u5B63\u3002\u665A\u4E0A\u90BB\u5C45\u4F1A\u56DE\u5BB6\u7761\u89C9\uFF0C\u6E05\u6668\u518D\u51FA\u95E8\u3002\u79BB\u5F00\u6E38\u620F\u65F6\uFF0C\u65F6\u95F4\u4F1A\u6682\u505C\u3002</p><div class="lighting-buttons">${[["day","Sun","\u767D\u663C"],["sunset","Sunset","\u508D\u665A"],["night","Moon","\u591C\u665A"]].map(([t,n,s])=>Ie(`lighting:${t}`,s,n,e.settings.clockMode==="fixed"&&e.settings.lighting===t?"active":"")).join("")}</div><div class="lighting-buttons">${Ie("visit-hour:20","\u770B\u90BB\u5C45\u56DE\u5BB6","Moon")}${Ie("visit-hour:6","\u8FCE\u63A5\u6E05\u6668","Sunrise")}</div><label class="setting-row"><span>\u5B63\u8282</span><select aria-label="\u5B63\u8282" data-setting="season">${[["cycle","\u968F\u65F6\u95F4\u53D8\u5316"],["spring","\u6625 \xB7 \u65B0\u82BD"],["summer","\u590F \xB7 \u6D53\u7EFF"],["autumn","\u79CB \xB7 \u91D1\u53F6"],["winter","\u51AC \xB7 \u843D\u96EA"]].map(([t,n])=>`<option value="${t}" ${e.settings.season===t?"selected":""}>${n}</option>`).join("")}</select></label><h3>\u56DB\u5B63\u8F7B\u97F3\u4E50</h3><label class="setting-row"><span>\u80CC\u666F\u97F3\u4E50</span><input type="checkbox" aria-label="\u80CC\u666F\u97F3\u4E50" data-setting="music" ${e.settings.music?"checked":""} /></label><label class="setting-row"><span>\u97F3\u4E50\u97F3\u91CF</span><input type="range" aria-label="\u97F3\u4E50\u97F3\u91CF" data-setting="music-volume" min="0" max="100" step="1" value="${Math.round(e.settings.musicVolume*100)}" /></label><p id="music-status" class="panel-note">\u70B9\u51FB\u57CE\u9547\u5F00\u542F\u97F3\u4E50</p><p class="panel-note">\u6625\u65E5\u94A2\u7434\u3001\u590F\u65E5\u6C11\u8C23\u3001\u79CB\u65E5\u6162\u65CB\u5F8B\u3001\u51AC\u65E5\u8F7B\u94A2\u7434\u3002\u6362\u5B63\u4F1A\u6E10\u53D8\u5207\u6362\u3002</p><p class="music-credit">\u97F3\u4E50\uFF1AKevin MacLeod (incompetech.com) \xB7 <a href="./assets/town/audio/credits.html" target="_blank" rel="noopener">\u66F2\u76EE\u4E0E CC BY 4.0 \u6388\u6743</a></p><label class="setting-row"><span>\u5168\u90E8\u58F0\u97F3</span><input type="checkbox" data-setting="sound" ${e.settings.muted?"":"checked"} /></label><label class="setting-row"><span>\u51CF\u5C11\u52A8\u6001\u6548\u679C</span><input type="checkbox" data-setting="motion" ${e.settings.reducedMotion?"checked":""} /></label><label class="setting-row"><span>\u753B\u9762\u8D28\u91CF</span><select aria-label="\u753B\u9762\u8D28\u91CF" data-setting="quality"><option value="high" ${e.settings.quality==="high"?"selected":""}>\u7CBE\u7EC6 \xB7 Retina \u6E05\u6670\u753B\u9762</option><option value="medium" ${e.settings.quality==="medium"?"selected":""}>\u4E2D\u7B49 \xB7 \u67D4\u548C\u9634\u5F71</option><option value="low" ${e.settings.quality==="low"?"selected":""}>\u8F7B\u91CF \xB7 \u7701\u7535</option></select></label><h3>\u955C\u5934\u64CD\u4F5C</h3><label class="setting-row"><span>\u63A7\u5236\u65B9\u5F0F</span><select aria-label="\u955C\u5934\u63A7\u5236\u65B9\u5F0F" data-setting="camera"><option value="trackpad" ${e.settings.cameraInput==="trackpad"?"selected":""}>\u89E6\u63A7\u677F</option><option value="mouse" ${e.settings.cameraInput==="mouse"?"selected":""}>\u9F20\u6807</option></select></label><p class="panel-note">${e.settings.cameraInput==="trackpad"?"\u4E24\u6307\u4E0A\u4E0B\u6ED1\u6539\u53D8\u4FEF\u4EF0\uFF0C\u5DE6\u53F3\u6ED1\u65CB\u8F6C\uFF1B\u634F\u5408\u7F29\u653E\uFF0CShift + \u4E24\u6307\u6ED1\u52A8\u5E73\u79FB\u3002":"\u62D6\u52A8\u5E73\u79FB\uFF0C\u6EDA\u8F6E\u7F29\u653E\uFF1B\u6309\u4F4F Q / E \u6216\u955C\u5934\u7BAD\u5934\u8FDE\u7EED\u65CB\u8F6C\u3002"} \u70B9\u51FB\u300C\u56DE\u5230\u5C0F\u9547\u300D\u53EF\u6062\u590D\u8212\u9002\u89C6\u89D2\u3002</p><h3>\u4F60\u7684\u8BB0\u5F55</h3><p class="panel-note">${e.mode==="live"?"\u672C\u5730\u57CE\u9547":"\u6F14\u793A\u57CE\u9547"}\u3002\u8BFB\u53D6\u53EA\u5728\u8FD9\u53F0\u7535\u8111\u4E0A\u8FDB\u884C\uFF0C\u65E0\u9700\u8D26\u53F7\u3002</p>${Ie(e.mode==="live"?"demo":"live",e.mode==="live"?"\u8FDB\u5165\u72EC\u7ACB\u6F14\u793A\u57CE\u9547":"\u56DE\u5230\u771F\u5B9E\u8BB0\u5F55\u57CE\u9547","RefreshCw","secondary")}<div class="ledger-summary"><div><span>token \u94F8\u5E01</span><b>${e.tokenCoins}</b></div><div><span>\u7ECF\u8425\u8865\u8D34</span><b>${e.subsidyPaid} / ${ia(e)}</b></div><div><span>\u4E0B\u4E00\u679A\u91D1\u5E01</span><b>${e.residue.toLocaleString()} / 10,000</b></div></div><h3>\u5B58\u6863\u4E0E\u5907\u4EFD</h3><p class="panel-note">\u8FDB\u5EA6\u81EA\u52A8\u4FDD\u5B58\u5728\u5F53\u524D\u6D4F\u89C8\u5668\u3002\u6362\u6D4F\u89C8\u5668\u6216\u8BBE\u5907\u524D\uFF0C\u53EF\u4EE5\u5BFC\u51FA\u5907\u4EFD\u3002\u65E7\u8857\u673A\u7248\u5B58\u6863\u4FDD\u7559\u3002</p><div class="save-actions">${Ie("export","\u5BFC\u51FA\u5B58\u6863","Download","secondary")}${Ie("import","\u5BFC\u5165\u5B58\u6863","Upload","secondary")}<input id="save-file" type="file" accept="application/json,.json" hidden /></div><h3>\u600E\u4E48\u73A9</h3><p class="panel-note">\u70B9\u51FB\u5EFA\u7B51\u67E5\u770B\u9700\u6C42\uFF1B\u5EFA\u8BBE\u540E\u4E3A\u95E8\u53E3\u63A5\u8DEF\u3002\u94FA\u8DEF\u3001\u642C\u8FC1\u4E0E\u6536\u7EB3\u90FD\u514D\u8D39\u3002\u6309\u4F4F Q / E \u6216\u955C\u5934\u6309\u94AE\u6301\u7EED\u65CB\u8F6C\uFF0C\u677E\u5F00\u505C\u6B62\uFF0C\u6446\u653E\u65F6 Q / E \u65CB\u8F6C\u5EFA\u7B51\uFF0CWASD \u79FB\u52A8\u955C\u5934\uFF0CEsc \u7ED3\u675F\u64CD\u4F5C\u3002</p>${Ie("show-tutorial","\u518D\u770B\u4E00\u6B21\u8D77\u6B65\u5F15\u5BFC","Info","text-button")}`}async action(e,t){let[n,s]=e.split(":");switch(n){case"inspect":this.resetTool(),this.panel=null;break;case"build":this.panel=this.store.activePuzzle?"inventory":"build";break;case"build-homes":this.category="homes",this.panel="build";break;case"inventory":this.panel="inventory";break;case"road":this.setTool("road");return;case"move":this.selectedId=null,this.panel=null,this.setTool("move");return;case"toggle-erase":this.setTool(this.tool==="erase"?"road":"erase");return;case"quests":this.panel="quests",this.progressPanel=li(this.store.state);break;case"puzzles":this.panel="puzzles";break;case"book":this.panel="book";break;case"settings":this.panel="settings";break;case"orders":this.panel="orders";break;case"order":this.store.selectOrder(s),this.panel="orders";break;case"cancel-order":this.store.selectOrder(null),this.toast("\u8BA2\u5355\u5DF2\u53D6\u6D88\uFF0C\u5E93\u5B58\u5168\u90E8\u4FDD\u7559");return;case"fulfill-order":{let r=this.store.fulfillOrder(s);r?this.toast(r):(this.scene.celebrate("chapter"),this.toast("\u90BB\u5C45\u6765\u5206\u4EAB\u6536\u83B7\u4E86\uFF01\u9996\u6B21\u5B8C\u6210\u4F1A\u89E3\u9501\u65B0\u7684\u88C5\u9970\u84DD\u56FE",5500));return}case"production":this.panel="production";break;case"build-farms":this.category="production",this.panel="build";break;case"close-panel":this.panel=null;break;case"category":this.category=s;break;case"buy":this.selectedId=null,this.panel=null,this.setTool("place",s);return;case"place-owned":case"move-building":{let r=this.store.board.buildings.find(a=>a.id===s);if(!r){this.toast("\u8BF7\u5148\u56DE\u5230\u4E3B\u57CE\u6446\u653E\u9879\u76EE\u5DE5\u574A");return}this.selectedId=null,this.panel=null,this.setTool("move",r.kind,r.id);return}case"stash":this.store.stash(s),this.selectedId=null,this.panel="inventory",this.toast("\u5DF2\u653E\u56DE\u5E93\u5B58\uFF0C\u968F\u65F6\u53EF\u4EE5\u514D\u8D39\u6446\u56DE\u6765");break;case"rotate-building":{let r=this.store.rotate(s);r&&this.toast(r);break}case"recolor":this.store.recolor(s)||this.toast("\u7EAA\u5FF5\u914D\u8272\u9700\u8981\u5BF9\u5E94\u59D4\u6258\u7684\u989D\u5916\u661F\u7EA7\uFF0C\u89C4\u5212\u88C5\u9970\u9700\u8981\u5BF9\u5E94\u5173\u5361\u4E09\u661F");break;case"rotate-preview":this.pendingKind!=="bridge"&&(this.rotation=(this.rotation+1)%4,this.scene.setTool(this.tool,this.pendingKind,this.rotation));break;case"coordinates":this.coordinateOpen=!this.coordinateOpen;break;case"place-coordinates":{let r=document.getElementById("placement-form"),a=new FormData(r),o=Number(a.get("x"))-1,c=Number(a.get("z"))-1;if(!Number.isInteger(o)||!Number.isInteger(c)||o<0||c<0||o>=this.store.board.size||c>=this.store.board.size){this.toast("\u8BF7\u9009\u62E9\u5730\u56FE\u5185\u7684\u683C\u5B50");return}this.hoverCell={x:o,z:c},this.onCell(o,c);return}case"chapter":this.progressPanel=Number(s);break;case"claim-current":this.claimChapter(li(this.store.state)-1);return;case"claim-chapter":this.claimChapter(Number(s));return;case"puzzle":this.resetTool(),this.selectedId=null,this.hoverCell={x:1,z:1},this.store.enterPuzzle(s),this.panel="inventory",this.scene.focus({x:6,z:6});break;case"leave-puzzle":this.resetTool(),this.selectedId=null,this.store.leavePuzzle(),this.panel=null,this.scene.focus();break;case"restart-puzzle":this.resetTool(),this.selectedId=null,this.store.restartPuzzle(),this.panel="inventory";break;case"puzzle-hint":this.toast(this.store.puzzle?.solution.terrain==="river"?"\u6865\u4F4D\u5728\u6A2A\u7B2C 7 \u683C\u3002\u6CBF\u4E24\u5CB8\u94FA\u4E00\u6761\u8857\uFF0C\u628A\u9547\u516C\u6240\u95E8\u53E3\u63A5\u8FC7\u6765\u3002":"\u8BD5\u8BD5\u628A\u4F4F\u5B85\u95E8\u53E3\u671D\u5411\u540C\u4E00\u6761\u8857\uFF0C\u5546\u5E97\u9760\u8FD1\u8857\u9053\u4E2D\u95F4\u3002\u516C\u56ED\u4E5F\u8981\u63A5\u4E0A\u8DEF\u3002",6500);return;case"claim-puzzle":{let r=this.store.puzzle,a=this.store.claimPuzzle();if(!a||!r)return;this.scene.celebrate("chapter"),this.toast(a.first?`${a.stars} \u661F\u65B9\u6848\uFF01\u300C${st[r.reward].name}\u300D\u84DD\u56FE\u5DF2\u5E26\u56DE\u4E3B\u57CE`:`${a.stars} \u661F\u65B9\u6848\u5DF2\u8BB0\u5F55${a.stars===3?"\uFF0C\u65B0\u914D\u8272\u4E5F\u89E3\u9501\u4E86":""}`,5e3),this.render();return}case"find":{let r=this.store.board.buildings.find(a=>a.id===s);if(r){let a=Ut(r);this.scene.focus({x:r.x+a.w/2,z:r.z+a.d/2}),this.select(s)}return}case"connect-start":this.e.food>=4?this.panel="quests":(this.store.road(6,17),this.scene.celebrate("building",{x:6.5,z:17.5}),this.toast("\u7B2C\u4E00\u6761\u8857\u63A5\u901A\u4E86\uFF01\u56DB\u6237\u90BB\u5C45\u90FD\u80FD\u4E70\u5230\u9762\u5305"));break;case"dismiss-tutorial":this.store.state.tutorialDone=!0,this.store.commit();return;case"show-tutorial":this.store.state.tutorialDone=!1,this.panel=null,this.store.commit();return;case"demo":case"live":this.resetTool(),this.panel=null,this.selectedId=null,this.modeChanged=!0,this.store.setMode(n),this.scene.focus(),this.toast(n==="demo"?"\u8FDB\u5165\u72EC\u7ACB\u6F14\u793A\u57CE\u9547\uFF0C\u70B9\u51FB\u6536\u96C6\u6F14\u793A token \u83B7\u5F97\u5EFA\u8BBE\u8D44\u91D1":"\u56DE\u5230\u4F60\u7684\u672C\u5730\u57CE\u9547");break;case"sync":await this.sync();return;case"camera-left":Date.now()>=this.ignoreCameraClickUntil&&this.scene.rotate(-1);return;case"camera-right":Date.now()>=this.ignoreCameraClickUntil&&this.scene.rotate(1);return;case"zoom-in":this.scene.zoom(1.2);return;case"zoom-out":this.scene.zoom(1/1.2);return;case"focus":this.scene.focus();return;case"overview":this.scene.overview();return;case"visit-hour":this.store.visitHour(Number(s));return;case"lighting":this.store.updateSettings({clockMode:"fixed",lighting:s});return;case"export":{let r=URL.createObjectURL(new Blob([JSON.stringify(this.store.state,null,2)],{type:"application/json"})),a=document.createElement("a");a.href=r,a.download=`token-town-${this.store.state.mode}.json`,a.click(),setTimeout(()=>URL.revokeObjectURL(r),1e3),this.toast("\u5F53\u524D\u57CE\u9547\u5B58\u6863\u5DF2\u5BFC\u51FA");return}case"import":document.getElementById("save-file")?.click();return}this.render()}claimChapter(e){let t=this.store.claimChapter(e);t&&(this.progressPanel=Math.min(6,e+2),this.scene.celebrate("chapter"),this.toast(`${qi[e].title} \xB7 ${t.stars} \u661F\u6210\u679C\u5DF2\u8BB0\u5F55${t.subsidy?`\uFF0C\u8865\u8D34 +${t.subsidy} \u91D1\u5E01`:"\uFF0C\u7ECF\u8425\u8865\u8D34\u5C06\u5728 token \u989D\u5EA6\u8DB3\u591F\u65F6\u5230\u8D26"}`,5e3),this.render())}async sync(){if(this.busy)return;this.busy=!0,this.modeChanged=!1;let e=this.store.state.mode;this.render();try{let t=e==="demo"?null:await ip();if(this.modeChanged||this.store.state.mode!==e)return;if(t&&(t.error||t.source==="error")){this.notice="\u8BFB\u53D6\u672C\u5730\u8BB0\u5F55\u5931\u8D25\uFF0C\u8BF7\u786E\u8BA4\u672C\u5730\u670D\u52A1\u6B63\u5728\u8FD0\u884C\u540E\u91CD\u8BD5",this.panel="history";return}if(t&&t.projects.length===0){this.store.state.history="empty",this.store.commit(),this.panel="history",this.notice=t.warnings?.join("\uFF1B")||"";return}let n=e==="demo"?this.store.syncDemo():this.store.sync(t.projects);this.notice=t?.warnings?.join("\uFF1B")||"",(n.coins||n.subsidy)&&this.scene.celebrate("coin"),this.toast(n.newTokens?`\u53D1\u73B0 ${pa(n.newTokens)} \u65B0 token \xB7 +${n.coins} \u91D1\u5E01${n.subsidy?` \xB7 \u8865\u8D34 +${n.subsidy}`:""}${n.newProjects?` \xB7 ${n.newProjects} \u680B\u9879\u76EE\u5DE5\u574A\u5DF2\u5165\u5E93`:""}`:"\u8BB0\u5F55\u5DF2\u7ECF\u540C\u6B65\u8FC7\u4E86\uFF0C\u6CA1\u6709\u91CD\u590D\u53D1\u653E\u91D1\u5E01",5500)}finally{this.busy=!1,this.render()}}change(e){let t=e.target;if(t.dataset.setting==="clock"&&this.store.updateSettings({clockMode:t.checked?"cycle":"fixed"}),t.dataset.production){this.store.chooseProduction(t.dataset.production,t.value);return}t.dataset.setting==="season"&&this.store.updateSettings({season:t.value}),t.dataset.setting==="music"&&this.store.updateSettings({music:t.checked}),t.dataset.setting==="music-volume"&&this.store.updateSettings({musicVolume:Number(t.value)/100}),t.dataset.setting==="sound"&&this.store.updateSettings({muted:!t.checked}),t.dataset.setting==="motion"&&this.store.updateSettings({reducedMotion:t.checked}),t.dataset.setting==="camera"&&this.store.updateSettings({cameraInput:t.value}),t.dataset.setting==="quality"&&this.store.updateSettings({quality:t.value}),t.id==="save-file"&&t.files?.[0]&&t.files[0].text().then(n=>{this.resetTool(),this.selectedId=null,this.store.importSave(n)?this.toast("\u5B58\u6863\u5DF2\u5BFC\u5165"):this.toast("\u6587\u4EF6\u4E0D\u662F\u5F53\u524D\u6A21\u5F0F\u7684\u6709\u6548\u6CB3\u8C37\u5C0F\u9547\u5B58\u6863\uFF0C\u539F\u8FDB\u5EA6\u5DF2\u4FDD\u7559")})}syncCameraKeys(){this.heldCameraButton||this.scene.holdRotate(this.pendingKind?0:this.heldKeys.has("q")?-1:this.heldKeys.has("e")?1:0);let e=ep(this.heldKeys);this.scene.holdPan(e.x,e.y)}keydown(e){if(e.target.closest('input, select, textarea, [contenteditable="true"]')||e.isComposing||e.metaKey||e.ctrlKey||e.altKey)return;if(e.key==="Escape"){this.resetTool(),this.panel=null,this.render();return}let t=e.key.toLowerCase(),n=Qh(t,!!this.pendingKind,e.repeat);if(n){if(e.preventDefault(),n==="turn-left"||n==="turn-right"){if(this.pendingKind==="bridge")return;this.rotation=(this.rotation+(n==="turn-left"?3:1))%4,this.scene.setTool(this.tool,this.pendingKind,this.rotation),this.render();return}this.heldKeys.add(t),this.syncCameraKeys()}}toast(e,t=3800){this.toastMessage=e,this.toastUntil=Date.now()+t,clearTimeout(this.toastTimer);let n=document.getElementById("town-toast");n&&(n.innerHTML=`${At("Sparkles")}<span>${Ft(e)}</span>`,n.classList.add("visible"),this.toastTimer=window.setTimeout(()=>document.getElementById("town-toast")?.classList.remove("visible"),t))}};var qg=document.getElementById("town-scene"),$g=document.getElementById("town-ui");if(!(qg instanceof HTMLCanvasElement)||!$g)throw new Error("Token Town: missing town surface");var lM=new URLSearchParams(location.search).get("demo")==="1"||location.hostname.endsWith("github.io");try{let i=new Lo(lM?"demo":void 0);new Qc($g,i,qg),document.getElementById("town-loading")?.remove()}catch(i){let e=document.getElementById("town-loading");e&&(e.innerHTML='<h1>\u6CB3\u8C37\u8FD8\u6CA1\u51C6\u5907\u597D</h1><p>\u8BF7\u4F7F\u7528\u652F\u6301 WebGL 2 \u7684\u6D4F\u89C8\u5668\uFF0C\u5E76\u5F00\u542F\u786C\u4EF6\u52A0\u901F\u3002</p><button onclick="location.reload()">\u91CD\u65B0\u6253\u5F00</button>'),console.error(i)}})();
/*! Bundled license information:

lucide/dist/esm/defaultAttributes.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/createElement.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/archive.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/arrow-left.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/arrow-right.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/arrow-up-right.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/book-open.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/check.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/chevron-right.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/clipboard-list.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/coffee.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/coins.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/download.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/eraser.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/flag.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/focus.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/hammer.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/house.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/info.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/lock.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/map-pin.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/moon.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/mouse-pointer-2.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/move.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/puzzle.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/refresh-cw.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/rotate-cw.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/route.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/settings.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/sparkles.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/star.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/sun.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/sunrise.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/sunset.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/tree-deciduous.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/upload.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/volume-2.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/volume-x.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/wheat.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/x.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/zoom-in.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/zoom-out.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/lucide.mjs:
  (**
   * @license lucide v1.49.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

three/build/three.core.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
//# sourceMappingURL=app.js.map
