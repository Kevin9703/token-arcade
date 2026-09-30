"use strict";(()=>{var Di=[[1,0],[2,8e3],[5,1e5],[10,1e6],[20,1e7],[35,5e7],[50,5e8]];function ng(){let i=[];for(let e=1;e<=50;e++){let t=Di[0],n=Di[Di.length-1];for(let u=0;u<Di.length-1;u++)if(e>=Di[u][0]&&e<=Di[u+1][0]){t=Di[u],n=Di[u+1];break}let[s,r]=t,[a,o]=n,c=(e-s)/(a-s),l=r<=0?Math.round(o*c):Math.round(r*Math.pow(o/r,c));i.push(l)}return i[0]=0,i}var Dr=ng(),Ec=[{index:0,key:"starter",name:"STARTER",loLevel:1,hiLevel:4},{index:1,key:"powered",name:"POWERED",loLevel:5,hiLevel:9},{index:2,key:"deluxe",name:"DELUXE",loLevel:10,hiLevel:19},{index:3,key:"neon",name:"NEON",loLevel:20,hiLevel:34},{index:4,key:"legendary",name:"LEGENDARY",loLevel:35,hiLevel:50}];function rs(i){let e=Math.max(1,Math.min(50,i));for(let t of Ec)if(e>=t.loLevel&&e<=t.hiLevel)return t;return Ec[Ec.length-1]}function as(i){let e=1;for(let t=0;t<Dr.length;t++)i>=Dr[t]&&(e=t+1);return e}function ig(i){return 1+(Math.max(1,Math.min(50,i))-1)/49*.5}function Nr(i){let e=as(i),t=Dr[e-1],n=e<Dr.length?Dr[e]:null,s=rs(e),r=ig(e);if(n==null)return{level:e,stage:s,base:t,next:null,progress:1,toNext:0,isMax:!0,multiplier:r};let a=Math.max(0,Math.min(1,(i-t)/(n-t)));return{level:e,stage:s,base:t,next:n,progress:a,toNext:Math.max(0,n-i),isMax:!1,multiplier:r}}var Pt={hall:{kind:"hall",name:"\u9547\u516C\u6240",description:"\u5C0F\u9547\u7684\u5FC3\u810F\u3002\u6240\u6709\u9053\u8DEF\u4ECE\u8FD9\u91CC\u8FDE\u63A5\u8D77\u6765\u3002",cost:0,w:3,d:3,category:"landmarks",chapter:1},house:{kind:"house",name:"\u6CB3\u8C37\u6728\u5C4B",description:"\u4F4F\u8FDB\u5341\u4F4D\u90BB\u5C45\u3002\u4E3A\u4ED6\u4EEC\u5B89\u6392\u597D\u9053\u8DEF\u3001\u98DF\u7269\u548C\u7EFF\u5730\u3002",cost:8,w:2,d:2,category:"homes",chapter:1},bakery:{kind:"bakery",name:"\u6668\u5149\u9762\u5305\u5E97",description:"\u516B\u683C\u6B65\u884C\u8DDD\u79BB\u5185\uFF0C\u4E3A\u516D\u680B\u4F4F\u5B85\u4F9B\u5E94\u65B0\u9C9C\u9762\u5305\u3002",cost:20,w:2,d:2,category:"services",chapter:1,service:"food",capacity:6,range:8},cafe:{kind:"cafe",name:"\u8F6C\u89D2\u5496\u5561\u9986",description:"\u5341\u683C\u6B65\u884C\u8DDD\u79BB\u5185\uFF0C\u4E3A\u56DB\u680B\u4F4F\u5B85\u63D0\u4F9B\u4F11\u95F2\u670D\u52A1\u3002",cost:30,w:2,d:2,category:"services",chapter:3,service:"leisure",capacity:4,range:10},market:{kind:"market",name:"\u6CB3\u8C37\u96C6\u5E02",description:"\u5341\u4E8C\u683C\u6B65\u884C\u8DDD\u79BB\u5185\uFF0C\u4E3A\u5341\u4E8C\u680B\u4F4F\u5B85\u63D0\u4F9B\u98DF\u7269\u670D\u52A1\u3002",cost:50,w:3,d:3,category:"services",chapter:4,service:"food",capacity:12,range:12},park:{kind:"park",name:"\u7EFF\u836B\u5C0F\u516C\u56ED",description:"\u4E09\u683C\u8303\u56F4\u5185\u7684\u4F4F\u5B85\u90FD\u80FD\u4EAB\u53D7\u7EFF\u5730\u3002\u516C\u56ED\u4E5F\u9700\u8981\u63A5\u901A\u9053\u8DEF\u3002",cost:12,w:2,d:2,category:"services",chapter:1},bridge:{kind:"bridge",name:"\u6CB3\u8C37\u77F3\u6865",description:"\u653E\u5728\u6CB3\u9053\u6807\u8BB0\u7684\u4F4D\u7F6E\uFF0C\u8FDE\u901A\u4E24\u5CB8\u7684\u9053\u8DEF\u3002",cost:40,w:1,d:2,category:"landmarks",chapter:4},clock:{kind:"clock",name:"\u6CB3\u8C37\u949F\u697C",description:"\u4E3A\u7E41\u8363\u7684\u5C0F\u9547\u7559\u4E0B\u4E00\u5EA7\u5171\u540C\u7684\u5730\u6807\u3002",cost:100,w:3,d:3,category:"landmarks",chapter:6},workshop:{kind:"workshop",name:"\u9879\u76EE\u5DE5\u574A",description:"\u5C5E\u4E8E\u4F60\u7684 AI \u9879\u76EE\uFF0C\u968F token \u7528\u91CF\u6210\u957F\u3002",cost:0,w:2,d:2,category:"landmarks",chapter:1},tree:{kind:"tree",name:"\u6986\u6811",description:"\u4E3A\u8857\u89D2\u6DFB\u4E00\u7247\u67D4\u8F6F\u7684\u7EFF\u836B\u3002\u7EAF\u88C5\u9970\u3002",cost:2,w:1,d:1,category:"decor",chapter:2},bench:{kind:"bench",name:"\u6728\u5236\u957F\u6905",description:"\u8BA9\u90BB\u5C45\u4EEC\u505C\u4E0B\u6765\u5750\u4E00\u4F1A\u513F\u3002\u7EAF\u88C5\u9970\u3002",cost:2,w:1,d:1,category:"decor",chapter:2},lamp:{kind:"lamp",name:"\u6696\u5149\u8DEF\u706F",description:"\u508D\u665A\u7684\u8857\u9053\u4E5F\u6709\u6E29\u6696\u7684\u5149\u3002\u7EAF\u88C5\u9970\u3002",cost:3,w:1,d:1,category:"decor",chapter:2},fountain:{kind:"fountain",name:"\u77F3\u780C\u5C0F\u55B7\u6CC9",description:"\u628A\u4E00\u5904\u7A7A\u5730\u5E03\u7F6E\u6210\u8857\u574A\u76F8\u805A\u7684\u5C0F\u5E7F\u573A\u3002\u7EAF\u88C5\u9970\u3002",cost:14,w:2,d:2,category:"decor",chapter:2},cart:{kind:"cart",name:"\u6728\u5236\u624B\u63A8\u8F66",description:"\u4E3A\u5E97\u94FA\u548C\u5EAD\u9662\u6DFB\u4E00\u70B9\u751F\u6D3B\u6C14\u606F\u3002\u7EAF\u88C5\u9970\u3002",cost:5,w:1,d:1,category:"decor",chapter:2},hedge:{kind:"hedge",name:"\u4FEE\u526A\u7EFF\u7BF1",description:"\u4E3A\u8857\u8FB9\u548C\u82B1\u56ED\u52FE\u52D2\u67D4\u8F6F\u7684\u8FB9\u754C\u3002\u7EAF\u88C5\u9970\u3002",cost:3,w:1,d:1,category:"decor",chapter:2},barrel:{kind:"barrel",name:"\u6A61\u6728\u6876",description:"\u6446\u5728\u5DE5\u574A\u8FB9\u7684\u6728\u6876\u4E0E\u67F4\u706B\u3002\u7EAF\u88C5\u9970\u3002",cost:2,w:1,d:1,category:"decor",chapter:2},planter:{kind:"planter",name:"\u9676\u76C6\u82B1\u7C07",description:"\u5728\u77F3\u677F\u8DEF\u65C1\u79CD\u4E0B\u660E\u4EAE\u7684\u5C0F\u82B1\u3002\u7EAF\u88C5\u9970\u3002",cost:4,w:1,d:1,category:"decor",chapter:2},gazebo:{kind:"gazebo",name:"\u6CB3\u5CB8\u51C9\u4EAD",description:"\u4E00\u5904\u6709\u6728\u67F1\u3001\u957F\u6905\u548C\u5761\u5C4B\u9876\u7684\u4F11\u61A9\u89D2\u843D\u3002\u7EAF\u88C5\u9970\u3002",cost:18,w:2,d:2,category:"decor",chapter:2},grocer:{kind:"grocer",name:"\u679C\u852C\u5C0F\u94FA",description:"\u4E5D\u683C\u6B65\u884C\u8303\u56F4\u5185\uFF0C\u4E3A\u516D\u6237\u4F9B\u5E94\u65B0\u9C9C\u98DF\u7269\u3002",cost:24,w:2,d:2,category:"services",chapter:2,service:"food",capacity:6,range:9},florist:{kind:"florist",name:"\u82B1\u827A\u5C0F\u94FA",description:"\u4E5D\u683C\u6B65\u884C\u8303\u56F4\u5185\uFF0C\u4E3A\u56DB\u6237\u63D0\u4F9B\u8D4F\u82B1\u4E0E\u4F11\u95F2\u3002",cost:26,w:2,d:2,category:"services",chapter:3,service:"leisure",capacity:4,range:9},library:{kind:"library",name:"\u6CB3\u8C37\u4E66\u5C4B",description:"\u5341\u683C\u6B65\u884C\u8303\u56F4\u5185\uFF0C\u4E3A\u516D\u6237\u63D0\u4F9B\u9605\u8BFB\u4F11\u95F2\u3002",cost:42,w:3,d:2,category:"services",chapter:3,service:"leisure",capacity:6,range:10},greenhouse:{kind:"greenhouse",name:"\u73BB\u7483\u6E29\u5BA4",description:"\u5E26\u79CD\u690D\u53F0\u3001\u73BB\u7483\u5C4B\u9876\u548C\u722C\u85E4\u7684\u5C0F\u82B1\u623F\u3002\u7EAF\u88C5\u9970\u3002",cost:18,w:3,d:2,category:"decor",chapter:2},granary:{kind:"granary",name:"\u4E30\u6536\u7CAE\u4ED3",description:"\u5706\u5F62\u7CAE\u5854\u3001\u50A8\u85CF\u6728\u5C4B\u548C\u4E00\u6392\u5C0F\u9EA6\u888B\u3002\u7EAF\u88C5\u9970\u3002",cost:16,w:2,d:2,category:"decor",chapter:2},boathouse:{kind:"boathouse",name:"\u6CB3\u5CB8\u8239\u5C4B",description:"\u6728\u677F\u5E73\u53F0\u4E0A\u505C\u7740\u4E00\u8258\u5C0F\u8239\u3002\u653E\u5728\u6CB3\u5CB8\u9646\u5730\u4E0A\u5E03\u7F6E\u5EAD\u9662\uFF0C\u7EAF\u88C5\u9970\u3002",cost:22,w:3,d:2,category:"decor",chapter:2},flower:{kind:"flower",name:"\u7A97\u8FB9\u82B1\u7BB1",description:"\u5C11\u8D70\u5F2F\u8DEF \xB7 \u521D\u6B21\u901A\u5173\u84DD\u56FE\u3002",cost:8,w:1,d:1,category:"decor",chapter:1},picnic:{kind:"picnic",name:"\u91CE\u9910\u684C",description:"\u5F2F\u8DEF\u7684\u5C3D\u5934 \xB7 \u521D\u6B21\u901A\u5173\u84DD\u56FE\u3002",cost:10,w:1,d:1,category:"decor",chapter:1},birdhouse:{kind:"birdhouse",name:"\u5C0F\u9E1F\u4E4B\u5BB6",description:"\u4E00\u5E97\u591A\u7528 \xB7 \u521D\u6B21\u901A\u5173\u84DD\u56FE\u3002",cost:12,w:1,d:1,category:"decor",chapter:1},windmill:{kind:"windmill",name:"\u82B1\u56ED\u98CE\u8F66",description:"\u6070\u5230\u597D\u5904 \xB7 \u521D\u6B21\u901A\u5173\u84DD\u56FE\u3002",cost:18,w:1,d:1,category:"decor",chapter:1},statue:{kind:"statue",name:"\u6CB3\u8C37\u7EAA\u5FF5\u50CF",description:"\u4E00\u6865\u4E24\u5CB8 \xB7 \u521D\u6B21\u901A\u5173\u84DD\u56FE\u3002",cost:20,w:1,d:1,category:"decor",chapter:1},gardenlamp:{kind:"gardenlamp",name:"\u8424\u706B\u82B1\u56ED\u706F",description:"\u6865\u8FB9\u7684\u751F\u6D3B \xB7 \u521D\u6B21\u901A\u5173\u84DD\u56FE\u3002",cost:15,w:1,d:1,category:"decor",chapter:1}},Ni=[{id:1,title:"\u5728\u8FD9\u91CC\u843D\u811A",story:"\u7ED9\u9547\u516C\u6240\u63A5\u4E0A\u6700\u540E\u4E00\u6BB5\u8DEF\u3002\u56DB\u6237\u90BB\u5C45\uFF0C\u7B49\u7740\u7B2C\u4E00\u7089\u9762\u5305\u3002",reward:"\u57FA\u7840\u88C5\u9970\u4E0E\u65B0\u7684\u8857\u574A\u76EE\u6807",subsidy:5},{id:2,title:"\u7EFF\u836B\u8857\u574A",story:"\u518D\u9080\u8BF7\u4E24\u6237\u90BB\u5C45\u3002\u8BA9\u8857\u574A\u4EEC\u51FA\u95E8\u5C31\u80FD\u9047\u89C1\u4E00\u7247\u7EFF\u3002",reward:"\u540C\u5CB8\u6269\u5730\u3001\u8F6C\u89D2\u5496\u5561\u9986",subsidy:10},{id:3,title:"\u70ED\u95F9\u5E02\u96C6",story:"\u9664\u4E86\u9762\u5305\uFF0C\u751F\u6D3B\u4E5F\u9700\u8981\u4E00\u676F\u5496\u5561\u548C\u670B\u53CB\u3002",reward:"\u96C6\u5E02\u3001\u77F3\u6865\u4E0E\u5BF9\u5CB8\u5148\u9063\u5EFA\u8BBE\u533A",subsidy:15},{id:4,title:"\u6CB3\u7684\u53E6\u4E00\u8FB9",story:"\u4E00\u5EA7\u6865\uFF0C\u628A\u6CB3\u4E24\u5CB8\u53D8\u6210\u540C\u4E00\u4E2A\u5BB6\u3002",reward:"\u5B8C\u6574\u5BF9\u5CB8\u5EFA\u8BBE\u533A\u3001\u8DE8\u6CB3\u7EAA\u5FF5\u914D\u8272",subsidy:20},{id:5,title:"\u7D27\u51D1\u800C\u8212\u9002",story:"\u5341\u4E8C\u6237\u90BB\u5C45\uFF0C\u56DB\u5341\u683C\u9053\u8DEF\u3002\u5C11\u7ED5\u4E00\u70B9\u8DEF\uFF0C\u591A\u7559\u4E00\u70B9\u7EFF\u3002",reward:"\u6CB3\u8C37\u949F\u697C\u84DD\u56FE",subsidy:25},{id:6,title:"\u6211\u4EEC\u7684\u6CB3\u8C37",story:"\u5728\u949F\u58F0\u54CD\u8D77\u65F6\uFF0C\u4E3A\u8FD9\u5EA7\u5C0F\u9547\u7559\u4E0B\u4F60\u81EA\u5DF1\u7684\u6837\u5B50\u3002",reward:"\u5168\u56FE\u5F00\u653E\u3001\u81EA\u7531\u53D1\u5C55",subsidy:30}],Yd=["#a8b6ae","#6eabc0","#c9978b","#a296bf","#d9b362"],Ur=["tree","bench","lamp","park","bridge","clock"],Cc=["\u6728\u5C4B","\u5DE5\u574A","\u5DE5\u4F5C\u5BA4","\u521B\u4F5C\u9986","\u6CB3\u8C37\u5730\u6807"];var je=(i,e)=>`${i},${e}`,Fi=i=>{let[e,t]=i.split(",").map(Number);return{x:e,z:t}},di=i=>Math.min(6,i.chapterStars.findIndex(e=>e===0)<0?7:i.chapterStars.findIndex(e=>e===0)+1);function xn(i){let e=Pt[i.kind];return i.rotation%2?{w:e.d,d:e.w}:{w:e.w,d:e.d}}function Zn(i){let{w:e,d:t}=xn(i),n=[];for(let s=0;s<t;s++)for(let r=0;r<e;r++)n.push({x:i.x+r,z:i.z+s});return n}function Ui(i){let{w:e,d:t}=Pt[i.kind],n=Math.floor(e/2),s=t,r=i.rotation===0?[n,s]:i.rotation===1?[t-1-s,n]:i.rotation===2?[e-1-n,t-1-s]:[s,e-1-n];return{x:i.x+r[0],z:i.z+r[1]}}function jn(i,e,t){return e>=0&&e<i.size&&(i.terrain==="valley"?t===11||t===12:i.terrain==="river"?t===5||t===6:!1)}var os=i=>i.terrain==="valley"?[4,10,16,20]:i.terrain==="river"?[6]:[];function Fr(i,e,t,n){return t<0||n<0||t>=e.size||n>=e.size?!1:e.terrain!=="valley"?!0:n>=13?t<12||i.chapterStars[1]>0:n>=11?i.chapterStars[2]>0:i.chapterStars[5]>0||t<12&&(i.chapterStars[3]>0||i.chapterStars[2]>0&&n>=3)}function Qa(i,e,t){if(!Number.isInteger(t.x)||!Number.isInteger(t.z)||!Number.isInteger(t.rotation)||t.rotation<0||t.rotation>3)return"\u8BF7\u4F7F\u7528\u5730\u56FE\u5185\u7684\u5B8C\u6574\u683C\u5B50\u548C\u56DB\u4E2A\u671D\u5411";let n=new Set(e.buildings.filter(s=>s.placed&&s.id!==t.id).flatMap(s=>Zn(s).map(r=>je(r.x,r.z))));if(t.kind==="bridge"){let s=e.terrain==="valley"?11:5;if(e.terrain==="meadow"||t.rotation!==0||t.z!==s||!os(e).includes(t.x))return"\u77F3\u6865\u9700\u8981\u653E\u5728\u6CB3\u9053\u6807\u8BB0\u7684\u6865\u4F4D\u4E0A"}for(let s of Zn(t)){if(!Fr(i,e,s.x,s.z))return"\u8FD9\u7247\u571F\u5730\u8FD8\u6CA1\u6709\u5F00\u653E\uFF0C\u5148\u5B8C\u6210\u5F53\u524D\u59D4\u6258";if(jn(e,s.x,s.z)!==(t.kind==="bridge"))return"\u5EFA\u7B51\u8981\u653E\u5728\u9646\u5730\u4E0A\uFF0C\u8DE8\u6CB3\u8BF7\u4F7F\u7528\u77F3\u6865";if(n.has(je(s.x,s.z)))return"\u8FD9\u91CC\u5DF2\u7ECF\u6709\u5EFA\u7B51\u4E86\uFF0C\u8BD5\u8BD5\u53E6\u4E00\u5757\u7A7A\u5730";if(e.roads.includes(je(s.x,s.z)))return"\u5148\u64E6\u9664\u8FD9\u91CC\u7684\u9053\u8DEF\uFF0C\u518D\u653E\u7F6E\u5EFA\u7B51"}return null}function Kd(i,e,t,n){return Number.isInteger(t)&&Number.isInteger(n)&&Fr(i,e,t,n)&&!jn(e,t,n)&&!e.buildings.some(s=>s.placed&&Zn(s).some(r=>r.x===t&&r.z===n))}function Ja(i,e){let t=new Map;if(!i.has(e))return t;let n=[e];t.set(e,0);for(let s=0;s<n.length;s++){let r=Fi(n[s]),a=t.get(n[s]);for(let[o,c]of[[1,0],[-1,0],[0,1],[0,-1]]){let l=je(r.x+o,r.z+c);i.has(l)&&!t.has(l)&&(t.set(l,a+1),n.push(l))}}return t}function Rc(i,e){let t=xn(i),n=xn(e);return Math.max(0,i.x-(e.x+n.w-1),e.x-(i.x+t.w-1))+Math.max(0,i.z-(e.z+n.d-1),e.z-(i.z+t.d-1))}function Bs(i){let e=i.buildings.filter(u=>u.placed).sort((u,f)=>u.id.localeCompare(f.id,"en")),t=new Set(e.filter(u=>u.kind!=="bridge").flatMap(u=>Zn(u).map(f=>je(f.x,f.z)))),n=new Set(i.roads.filter(u=>!t.has(u)));for(let u of e.filter(f=>f.kind==="bridge"))for(let f of Zn(u))n.add(je(f.x,f.z));let s=e.find(u=>u.kind==="hall"),r=s?Ui(s):{x:-1,z:-1},a=new Set(Ja(n,je(r.x,r.z)).keys()),o={buildings:{},connectedRoads:a,population:0,houses:0,food:0,leisure:0,green:0,satisfied:0,northFood:0,southFood:0,northSatisfied:0,southSatisfied:0,roadCount:i.roads.length,bridge:!1,clock:!1,serviceUsed:{}};for(let u of e){let f=Ui(u);o.buildings[u.id]={connected:u.kind==="hall"?a.size>0:a.has(je(f.x,f.z)),entrance:f,food:null,leisure:null,green:!1}}let c=e.filter(u=>u.kind==="house"&&o.buildings[u.id].connected);for(let u of["food","leisure"]){let f=e.filter(h=>Pt[h.kind].service===u&&o.buildings[h.id].connected),d=[];for(let h of f){let m=Ui(h),y=Ja(a,je(m.x,m.z));for(let g of c){let p=Ui(g),S=y.get(je(p.x,p.z));S!==void 0&&S<=Pt[h.kind].range&&d.push({home:g,shop:h,distance:S})}}d.sort((h,m)=>h.distance-m.distance||h.shop.id.localeCompare(m.shop.id,"en")||h.home.id.localeCompare(m.home.id,"en"));for(let{home:h,shop:m,distance:y}of d)o.buildings[h.id][u]||(o.serviceUsed[m.id]||0)>=Pt[m.kind].capacity||(o.buildings[h.id][u]=m.id,o.buildings[h.id][`${u}Distance`]=y,o.serviceUsed[m.id]=(o.serviceUsed[m.id]||0)+1)}let l=e.filter(u=>u.kind==="park"&&o.buildings[u.id].connected);for(let u of c){let f=o.buildings[u.id];f.green=l.some(d=>Rc(u,d)<=3),o.houses++,o.population+=10,f.food&&(o.food++,u.z<i.size/2?o.northFood++:o.southFood++),f.leisure&&o.leisure++,f.green&&o.green++,f.food&&f.leisure&&f.green&&(o.satisfied++,u.z<i.size/2?o.northSatisfied++:o.southSatisfied++)}return o.bridge=e.some(u=>u.kind==="bridge"&&Zn(u).some(f=>a.has(je(f.x,f.z)))),o.clock=e.some(u=>u.kind==="clock"&&o.buildings[u.id].connected),o}var It=(i,e,t)=>({label:i,current:e,need:t,met:e>=t});function eo(i,e){switch(i){case 1:return{base:[It("\u56DB\u680B\u4F4F\u5B85\u63A5\u901A\u9053\u8DEF\u5E76\u83B7\u5F97\u9762\u5305",e.food,4)],bonus:[It("\u81F3\u5C11\u4E24\u680B\u4F4F\u5B85\u90BB\u8FD1\u516C\u56ED",e.green,2),It("\u9053\u8DEF\u4E0D\u8D85\u8FC7 16 \u683C",e.roadCount<=16?1:0,1)]};case 2:return{base:[It("\u516D\u680B\u4F4F\u5B85\u83B7\u5F97\u98DF\u7269\u670D\u52A1",e.food,6),It("\u56DB\u680B\u4F4F\u5B85\u90BB\u8FD1\u516C\u56ED",e.green,4)],bonus:[It("\u516D\u680B\u4F4F\u5B85\u90FD\u90BB\u8FD1\u516C\u56ED",e.green,6),It("\u9053\u8DEF\u4E0D\u8D85\u8FC7 24 \u683C",e.roadCount<=24?1:0,1)]};case 3:return{base:[It("\u516B\u680B\u4F4F\u5B85\u83B7\u5F97\u98DF\u7269\u670D\u52A1",e.food,8),It("\u516D\u680B\u4F4F\u5B85\u83B7\u5F97\u4F11\u95F2\u670D\u52A1",e.leisure,6)],bonus:[It("\u516B\u680B\u4F4F\u5B85\u83B7\u5F97\u4F11\u95F2\u670D\u52A1",e.leisure,8),It("\u516D\u680B\u4F4F\u5B85\u6EE1\u8DB3\u5168\u90E8\u9700\u6C42",e.satisfied,6)]};case 4:return{base:[It("\u4E00\u5EA7\u77F3\u6865\u8FDE\u901A\u4E24\u5CB8",e.bridge?1:0,1),It("\u5BF9\u5CB8\u4E24\u680B\u4F4F\u5B85\u83B7\u5F97\u98DF\u7269\u670D\u52A1",e.northFood,2),It("\u539F\u5CB8\u56DB\u680B\u4F4F\u5B85\u83B7\u5F97\u98DF\u7269\u670D\u52A1",e.southFood,4)],bonus:[It("\u5BF9\u5CB8\u56DB\u680B\u4F4F\u5B85\u83B7\u5F97\u98DF\u7269\u670D\u52A1",e.northFood,4),It("\u4E24\u5CB8\u5404\u6709\u4F4F\u5B85\u6EE1\u8DB3\u5168\u90E8\u9700\u6C42",e.northSatisfied>0&&e.southSatisfied>0?1:0,1)]};case 5:return{base:[It("\u5341\u4E8C\u680B\u4F4F\u5B85\u6EE1\u8DB3\u5168\u90E8\u9700\u6C42",e.satisfied,12),It("\u9053\u8DEF\u4E0D\u8D85\u8FC7 40 \u683C",e.roadCount<=40?1:0,1)],bonus:[It("\u9053\u8DEF\u4E0D\u8D85\u8FC7 36 \u683C",e.roadCount<=36?1:0,1),It("\u5341\u56DB\u680B\u4F4F\u5B85\u6EE1\u8DB3\u5168\u90E8\u9700\u6C42",e.satisfied,14)]};default:return{base:[It("\u5341\u516D\u680B\u4F4F\u5B85\u6EE1\u8DB3\u5168\u90E8\u9700\u6C42",e.satisfied,16),It("\u4E24\u5CB8\u5404\u6709\u81F3\u5C11\u56DB\u680B\u6EE1\u610F\u4F4F\u5B85",Math.min(e.northSatisfied,e.southSatisfied),4),It("\u6CB3\u8C37\u949F\u697C\u63A5\u901A\u9053\u8DEF",e.clock?1:0,1)],bonus:[It("\u4E8C\u5341\u680B\u4F4F\u5B85\u6EE1\u8DB3\u5168\u90E8\u9700\u6C42",e.satisfied,20),It("\u9053\u8DEF\u4E0D\u8D85\u8FC7 64 \u683C",e.roadCount<=64?1:0,1)]}}}function Or(i,e){let t=eo(i,e);return t.base.every(n=>n.met)?1+t.bonus.filter(n=>n.met).length:0}function ot(i,e,t,n,s=0){return{id:i,kind:e,x:t,z:n,rotation:s,placed:!0,variant:0}}function Zd(){return{size:24,terrain:"valley",buildings:[ot("hall","hall",5,19,2),...[1,3,8].map((e,t)=>({...ot(`home-${t+1}`,"house",e,14),variant:t})),{...ot("home-4","house",9,18,2),variant:3},ot("bakery-1","bakery",6,14),ot("park-1","park",1,18,2)],roads:[...Array.from({length:11},(e,t)=>je(t+1,16)),je(1,17),je(9,17),je(6,18)]}}function Br(i){return Ni.reduce((e,t,n)=>e+(i.chapterStars[n]>0?t.subsidy:0),0)}function sg(){return{size:12,terrain:"meadow",buildings:[ot("hall","hall",5,5,2),...[1,3,7,9].map((i,e)=>ot(`h-${e}`,"house",i,1)),ot("bakery","bakery",5,1),ot("park-a","park",1,5,2),ot("park-b","park",8,5,2)],roads:[...Array.from({length:11},(i,e)=>je(e+1,3)),je(6,4),je(1,4),je(8,4)]}}function rg(){return{size:12,terrain:"meadow",buildings:[ot("hall","hall",9,7,2),...[0,2,4,6,8,10].map((i,e)=>ot(`h-${e}`,"house",i,1)),ot("bakery","bakery",3,4,2),ot("cafe-a","cafe",5,4,2),ot("cafe-b","cafe",9,4,2),ot("park-a","park",1,4,2),ot("park-b","park",7,4,2)],roads:[...Array.from({length:11},(i,e)=>je(e+1,3)),je(11,4),je(11,5),je(11,6),je(10,6)]}}function ag(){return{size:12,terrain:"river",buildings:[ot("hall","hall",4,9,2),ot("h-a","house",0,1),ot("h-b","house",9,1),ot("h-c","house",0,8,2),ot("h-d","house",9,8,2),ot("bakery-a","bakery",4,1),ot("bakery-b","bakery",2,8,2),ot("cafe-a","cafe",7,1),ot("cafe-b","cafe",7,8,2),ot("park-a","park",2,1),ot("park-b","park",9,10,3),ot("bridge","bridge",6,5)],roads:[...Array.from({length:10},(i,e)=>je(e+1,3)),...Array.from({length:12},(i,e)=>je(e,7)),je(6,4),je(5,8),je(11,8),je(11,9),je(11,10)]}}var jd=sg(),Jd=rg(),Qd=ag(),En=[{id:"short-roads",title:"\u5C11\u8D70\u5F2F\u8DEF",description:"\u56DB\u6237\u90BB\u5C45\uFF0C\u4E00\u5BB6\u9762\u5305\u5E97\u3002\u627E\u5230\u4E00\u6761\u7B80\u5355\u53C8\u8212\u670D\u7684\u8857\u9053\u3002",family:"\u9053\u8DEF\u89C4\u5212",roadBudget:28,efficientBudget:14,required:4,greenGoal:2,leisureGoal:0,reward:"flower",solution:jd},{id:"quiet-street",title:"\u5F2F\u8DEF\u7684\u5C3D\u5934",description:"\u540C\u6837\u7684\u5EFA\u7B51\uFF0C\u66F4\u5C11\u7684\u9053\u8DEF\u3002\u628A\u7A7A\u5730\u7559\u7ED9\u516C\u56ED\u3002",family:"\u9053\u8DEF\u89C4\u5212 \xB7 \u8FDB\u9636",roadBudget:20,efficientBudget:14,required:4,greenGoal:3,leisureGoal:0,reward:"picnic",solution:jd},{id:"one-shop",title:"\u4E00\u5E97\u591A\u7528",description:"\u4E00\u5BB6\u9762\u5305\u5E97\u53EA\u80FD\u670D\u52A1\u516D\u6237\u3002\u4E24\u5BB6\u5496\u5561\u9986\u7684\u8DDD\u79BB\u4E5F\u5F88\u91CD\u8981\u3002",family:"\u670D\u52A1\u8986\u76D6",roadBudget:28,efficientBudget:16,required:6,greenGoal:2,leisureGoal:6,reward:"birdhouse",solution:Jd},{id:"just-enough",title:"\u6070\u5230\u597D\u5904",description:"\u8BA9\u516D\u6237\u90BB\u5C45\u90FD\u80FD\u559D\u5230\u5496\u5561\uFF0C\u8FD8\u8981\u7ED9\u7EFF\u836B\u7559\u4E2A\u4F4D\u7F6E\u3002",family:"\u670D\u52A1\u8986\u76D6 \xB7 \u8FDB\u9636",roadBudget:22,efficientBudget:16,required:6,greenGoal:4,leisureGoal:6,reward:"windmill",solution:Jd},{id:"one-bridge",title:"\u4E00\u6865\u4E24\u5CB8",description:"\u53EA\u6709\u4E00\u4E2A\u6865\u4F4D\u3002\u8BA9\u5357\u5317\u4E24\u5CB8\u7684\u90BB\u5C45\u5403\u4E0A\u65B0\u9C9C\u9762\u5305\u3002",family:"\u8DE8\u6CB3\u793E\u533A",roadBudget:38,efficientBudget:28,required:4,greenGoal:2,leisureGoal:0,reward:"statue",solution:Qd},{id:"riverside",title:"\u6865\u8FB9\u7684\u751F\u6D3B",description:"\u6865\u3001\u9762\u5305\u3001\u5496\u5561\u548C\u7EFF\u5730\u3002\u7528\u6709\u9650\u9053\u8DEF\u8FDE\u8D77\u5B8C\u6574\u7684\u751F\u6D3B\u3002",family:"\u8DE8\u6CB3\u793E\u533A \xB7 \u8FDB\u9636",roadBudget:32,efficientBudget:28,required:4,greenGoal:2,leisureGoal:4,reward:"gardenlamp",solution:Qd}];function Pc(i){let e=structuredClone(i.solution);e.roads=[];for(let t of e.buildings)t.kind!=="hall"&&(t.placed=!1);return e}function Ic(i,e){let t=(n,s,r)=>({label:n,current:s,need:r,met:s>=r});return[t(`${i.required} \u680B\u4F4F\u5B85\u63A5\u901A\u9053\u8DEF\u5E76\u83B7\u5F97\u98DF\u7269`,e.food,i.required),...i.solution.terrain==="river"?[t("\u77F3\u6865\u8FDE\u901A\u4E24\u5CB8",e.bridge?1:0,1),t("\u4E24\u5CB8\u90FD\u6709\u4F4F\u5B85\u83B7\u5F97\u98DF\u7269",e.northFood>0&&e.southFood>0?1:0,1)]:[],...i.leisureGoal>0?[t(`${i.leisureGoal} \u680B\u4F4F\u5B85\u83B7\u5F97\u4F11\u95F2\u670D\u52A1`,e.leisure,i.leisureGoal)]:[],t(`\u9053\u8DEF\u4E0D\u8D85\u8FC7 ${i.roadBudget} \u683C`,e.roadCount<=i.roadBudget?1:0,1)]}function kr(i,e){return Ic(i,e).every(t=>t.met)?1+Lc(i,e).filter(t=>t.met).length:0}function Lc(i,e){return[{label:`\u9053\u8DEF\u4E0D\u8D85\u8FC7 ${i.efficientBudget} \u683C`,current:e.roadCount<=i.efficientBudget?1:0,need:1,met:e.roadCount<=i.efficientBudget},{label:`${i.greenGoal} \u680B\u4F4F\u5B85\u90BB\u8FD1\u516C\u56ED`,current:e.green,need:i.greenGoal,met:e.green>=i.greenGoal}]}var og=["spring","summer","autumn","winter"],lg={spring:"\u6625",summer:"\u590F",autumn:"\u79CB",winter:"\u51AC"},ks=(i,e,t)=>{let n=Math.max(0,Math.min(1,(t-i)/(e-i)));return n*n*(3-2*n)};function zr(i,e){let t=Math.max(0,i),n=t/360,s=e.clockMode==="fixed"?{day:12,sunset:19,night:23}[e.lighting]:(n+.375)%1*24,r=e.season==="cycle"?og[Math.floor(n/3)%4]:e.season,a=ks(5.5,8,s)*(1-ks(18,21,s)),o=Math.max(ks(16,18.5,s)*(1-ks(19.5,21,s)),ks(5,6.5,s)*(1-ks(7,8.5,s))),c=Math.floor(n+.375)+1;return{hour:s,day:c,season:r,daylight:a,warmth:o,sleep:s>=20||s<6,label:`${lg[r]} \xB7 \u7B2C ${c} \u5929 \xB7 ${String(Math.floor(s)).padStart(2,"0")}:${String(Math.floor(s%1*60)).padStart(2,"0")}`}}function eh(i,e){let t=Math.floor(i/360+.375);return t+e/24<.375&&t++,(t+e/24-.375)*360}var to={live:"tokenTown.slot.live.v1",demo:"tokenTown.slot.demo.v1"},th="tokenTown.mode.v1",ls=i=>{let{revision:e,worldSeconds:t,settings:n,...s}=i;return JSON.stringify(s)};function nh(i){return{version:1,mode:i,revision:0,coins:0,tokenCoins:0,residue:0,subsidyPaid:0,chapterStars:[0,0,0,0,0,0],puzzleStars:{},projects:[],town:Zd(),puzzleBoards:{},demoStep:0,nextId:20,tutorialDone:!1,history:"unscanned",worldSeconds:0,settings:{clockMode:"cycle",season:"cycle",muted:!1,lighting:"day",quality:"medium",reducedMotion:!1,cameraInput:"trackpad"}}}function ih(i){if(!i||!Number.isInteger(i.size)||i.size<8||i.size>24||!["valley","meadow","river"].includes(i.terrain)||!Array.isArray(i.buildings)||!Array.isArray(i.roads))return!1;let e=new Set,t=new Set;for(let n of i.buildings){if(!n||typeof n.id!="string"||e.has(n.id)||!Pt[n.kind]||!Number.isInteger(n.rotation)||n.rotation<0||n.rotation>3||!Number.isInteger(n.x)||!Number.isInteger(n.z)||typeof n.placed!="boolean"||!Number.isInteger(n.variant)||n.variant<0||n.variant>4||(e.add(n.id),n.placed&&n.kind==="bridge"&&(i.terrain==="meadow"||n.rotation!==0||n.z!==(i.terrain==="valley"?11:5)||!os(i).includes(n.x))))return!1;if(n.placed)for(let s of Zn(n)){let r=je(s.x,s.z);if(s.x<0||s.z<0||s.x>=i.size||s.z>=i.size||t.has(r)||jn(i,s.x,s.z)!==(n.kind==="bridge"))return!1;t.add(r)}}return i.buildings.filter(n=>n.kind==="hall"&&n.placed).length!==1?!1:i.roads.every(n=>typeof n=="string"&&/^\d+,\d+$/.test(n)&&n.split(",").every(s=>Number(s)<i.size)&&!t.has(n)&&!jn(i,Fi(n).x,Fi(n).z))&&new Set(i.roads).size===i.roads.length}function no(i,e){if(!i)return null;try{let t=JSON.parse(i);if(!t||t.version!==1||t.mode!==e||!ih(t.town)||t.town.size!==24||t.town.terrain!=="valley")return null;for(let s of[t.coins,t.tokenCoins,t.residue,t.subsidyPaid,t.nextId,t.demoStep,t.revision])if(!Number.isSafeInteger(s)||s<0)return null;if(t.residue>=1e4||!Array.isArray(t.chapterStars)||t.chapterStars.length!==6||t.chapterStars.some(s=>!Number.isInteger(s)||s<0||s>3))return null;let n=t.chapterStars.indexOf(0);if(n>=0&&t.chapterStars.slice(n).some(s=>s>0)||!t.puzzleStars||!t.puzzleBoards||Object.values(t.puzzleStars).some(s=>!Number.isInteger(s)||s<0||s>3)||Object.values(t.puzzleBoards).some(s=>!ih(s))||!Array.isArray(t.projects)||t.projects.some(s=>!s||typeof s.id!="string"||typeof s.name!="string"||!Number.isSafeInteger(s.credited)||s.credited<0||!Number.isSafeInteger(s.tokens)||s.tokens<s.credited)||new Set(t.projects.map(s=>s.id)).size!==t.projects.length||t.projects.some(s=>typeof s.provider!="string"||t.town.buildings.filter(r=>r.kind==="workshop"&&r.projectId===s.id).length!==1)||t.town.buildings.some(s=>s.kind==="workshop"&&!t.projects.some(r=>r.id===s.projectId))||typeof t.tutorialDone!="boolean"||!["unscanned","empty","ready"].includes(t.history)||Array.isArray(t.puzzleStars)||Array.isArray(t.puzzleBoards)||typeof t.puzzleStars!="object"||typeof t.puzzleBoards!="object")return null;for(let[s,r]of Object.entries(t.puzzleBoards)){let a=En.find(o=>o.id===s);if(!a||r.size!==a.solution.size||r.terrain!==a.solution.terrain||r.buildings.length!==a.solution.buildings.length||r.roads.length>a.roadBudget||r.buildings.some(o=>!a.solution.buildings.some(c=>c.id===o.id&&c.kind===o.kind)))return null}return Object.keys(t.puzzleStars).some(s=>!En.some(r=>r.id===s))||t.subsidyPaid>Math.min(Math.floor(t.tokenCoins/5),Br(t))||t.coins>t.tokenCoins+t.subsidyPaid||!t.settings||typeof t.settings.muted!="boolean"||typeof t.settings.reducedMotion!="boolean"||!["day","sunset","night"].includes(t.settings.lighting)||!["high","medium","low"].includes(t.settings.quality)||(t.settings.cameraInput??="trackpad",t.settings.clockMode??="cycle",t.settings.season??="cycle",t.worldSeconds??=0,!["cycle","fixed"].includes(t.settings.clockMode)||!["cycle","spring","summer","autumn","winter"].includes(t.settings.season)||!Number.isFinite(t.worldSeconds)||t.worldSeconds<0)||!["trackpad","mouse"].includes(t.settings.cameraInput)?null:t}catch{return null}}function rh(i){let e=Math.min(Br(i),Math.floor(i.tokenCoins/5)),t=Math.max(0,e-i.subsidyPaid);return i.subsidyPaid+=t,i.coins+=t,t}function sh(i,e){let t=0,n=0,s=[],r=new Set;for(let l of e){if(!l||typeof l.id!="string"||typeof l.name!="string"||!Number.isFinite(l.tokens)||l.tokens<0||r.has(l.id))continue;r.add(l.id);let u=Math.min(Number.MAX_SAFE_INTEGER,Math.floor(l.tokens)),f=i.projects.find(h=>h.id===l.id);if(!f&&l.legacyId&&!i.projects.some(h=>h.id===l.id)&&(f=i.projects.find(h=>h.id===l.legacyId),f)){let h=f.id;f.id=l.id;for(let m of i.town.buildings)m.projectId===h&&(m.projectId=l.id)}f||(f={id:l.id,name:l.name,provider:l.provider,tokens:0,credited:0},i.projects.push(f),n++,i.town.buildings.push({...ot(`project-${i.nextId++}`,"workshop",0,0),placed:!1,projectId:l.id}));let d=as(f.tokens);t+=Math.max(0,u-f.credited),f.credited=Math.max(f.credited,u),f.tokens=Math.max(f.tokens,u),f.name=l.name,f.provider=l.provider,as(f.tokens)>d&&s.push(f.name)}let a=i.residue+t,o=Math.floor(a/1e4);i.residue=a%1e4,i.tokenCoins+=o,i.coins+=o;let c=rh(i);return i.projects.length>0&&(i.history="ready"),{newTokens:t,coins:o,subsidy:c,newProjects:n,grown:s}}function cg(i){let e=[185e4,104e4,74e4,37e4];return["\u6CB3\u8C37\u7B14\u8BB0","\u7EB8\u98DE\u673A","\u5C0F\u5C0F\u661F\u56FE","\u53E3\u888B\u82B1\u56ED"].map((t,n)=>({id:`demo-project-${n}`,name:t,provider:n%2?"claude":"codex",tokens:e[n]+i*[27e4,23e4,18e4,12e4][n]}))}var io=class{constructor(e){this.activePuzzle=null;this.persistenceError="";this.conflict=!1;this.listeners=new Set;let t="live";try{localStorage.getItem(th)==="demo"&&(t="demo")}catch{}this.state=this.read(e||t),this.persistedProgress=ls(this.state),typeof window<"u"&&window.addEventListener("storage",n=>{if(n.key===to[this.state.mode]&&n.newValue){let s=no(n.newValue,this.state.mode);if(s&&s.revision>this.state.revision)if(ls(s)===this.persistedProgress){let r=JSON.stringify(this.state.settings)!==JSON.stringify(s.settings);this.state.revision=s.revision,this.state.worldSeconds=s.worldSeconds,this.state.settings=s.settings,r&&this.emit()}else this.state=s,this.persistedProgress=ls(s),this.conflict=!0,this.emit()}})}read(e){try{return no(localStorage.getItem(to[e]),e)||nh(e)}catch{return nh(e)}}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}emit(){for(let e of this.listeners)e()}commit(e=!0){try{let t=no(localStorage.getItem(to[this.state.mode]),this.state.mode);if(t&&t.revision>this.state.revision)if(ls(t)===this.persistedProgress)this.state.revision=t.revision;else{this.state=t,this.persistedProgress=ls(t),this.conflict=!0,this.emit();return}this.state.revision++,localStorage.setItem(to[this.state.mode],JSON.stringify(this.state)),localStorage.setItem(th,this.state.mode),this.persistenceError="",this.persistedProgress=ls(this.state)}catch{this.persistenceError="\u6D4F\u89C8\u5668\u672A\u80FD\u4FDD\u5B58\u8FDB\u5EA6\uFF0C\u8BF7\u5728\u8BBE\u7F6E\u4E2D\u5BFC\u51FA\u5B58\u6863"}e&&this.emit()}setMode(e){e!==this.state.mode&&(this.state=this.read(e),this.persistedProgress=ls(this.state),this.activePuzzle=null,this.conflict=!1,this.commit())}get board(){return this.activePuzzle?this.state.puzzleBoards[this.activePuzzle]:this.state.town}get puzzle(){return En.find(e=>e.id===this.activePuzzle)}unlockedKind(e){if(this.activePuzzle)return this.board.buildings.some(n=>n.kind===e);let t=En.find(n=>n.reward===e);return t?(this.state.puzzleStars[t.id]||0)>0:Pt[e].chapter<=di(this.state)}sync(e){let t=sh(this.state,e);return this.commit(),t}syncDemo(){let e=sh(this.state,cg(this.state.demoStep++));return this.commit(),e}road(e,t,n=!1){let s=je(e,t),r=this.board.roads.indexOf(s);return n?(r>=0&&(this.board.roads.splice(r,1),this.commit()),null):r>=0?null:Kd(this.state,this.board,e,t)?this.puzzle&&this.board.roads.length>=this.puzzle.roadBudget?`\u672C\u5173\u6700\u591A\u4F7F\u7528 ${this.puzzle.roadBudget} \u683C\u9053\u8DEF\uFF0C\u53EF\u64E6\u9664\u6216\u91CD\u65B0\u89C4\u5212`:(this.board.roads.push(s),this.commit(),null):"\u9053\u8DEF\u9700\u8981\u94FA\u5728\u5DF2\u5F00\u653E\u7684\u7A7A\u5730\u4E0A"}place(e,t,n,s,r){if(!this.unlockedKind(e))return"\u5148\u5B8C\u6210\u5BF9\u5E94\u7684\u59D4\u6258\u6216\u89C4\u5212\u5173\uFF0C\u89E3\u9501\u8FD9\u5F20\u84DD\u56FE";let a=r?this.board.buildings.find(l=>l.id===r&&l.kind===e):void 0;if(r&&!a)return"\u8FD9\u680B\u5EFA\u7B51\u4E0D\u5728\u5F53\u524D\u5E93\u5B58\u4E2D";if(this.activePuzzle&&!a)return"\u89C4\u5212\u5173\u4F7F\u7528\u56FA\u5B9A\u5E93\u5B58\uFF0C\u8BF7\u9009\u62E9\u4E00\u4E2A\u5DF2\u6709\u5EFA\u7B51";let o=a?{...a,x:t,z:n,rotation:s,placed:!0}:{...ot(`building-${this.state.nextId}`,e,t,n,s),variant:e==="house"?this.state.nextId%4:0},c=Qa(this.state,this.board,o);if(c)return c;if(a)Object.assign(a,o);else{if(e==="workshop"||e==="hall")return"\u8BF7\u4ECE\u5E93\u5B58\u9009\u62E9\u5DF2\u6709\u7684\u5EFA\u7B51";if(this.state.coins<Pt[e].cost)return"\u91D1\u5E01\u8FD8\u4E0D\u591F\u3002\u540C\u6B65 token\uFF0C\u6216\u5148\u8BD5\u8BD5\u514D\u8D39\u7684\u89C4\u5212\u5173";this.state.coins-=Pt[e].cost,this.state.nextId++,this.board.buildings.push(o)}return this.commit(),null}stash(e){let t=this.board.buildings.find(n=>n.id===e);return!t||t.kind==="hall"||!t.placed?!1:(t.placed=!1,this.commit(),!0)}rotate(e){let t=this.board.buildings.find(n=>n.id===e);return t?t.kind==="bridge"?"\u77F3\u6865\u6CBF\u6CB3\u9053\u65B9\u5411\u653E\u7F6E":this.place(t.kind,t.x,t.z,(t.rotation+1)%4,e):"\u5EFA\u7B51\u4E0D\u5B58\u5728"}recolor(e){let t=this.board.buildings.find(a=>a.id===e);if(!t)return!1;let n=En.find(a=>a.reward===t.kind);if(n&&(this.state.puzzleStars[n.id]||0)<3||this.activePuzzle)return!1;let s=Ur.indexOf(t.kind),r=this.state.chapterStars[s]||0;return s>=0&&r<2?!1:(t.variant=(t.variant+1)%(n||s>=0&&r===2?2:4),this.commit(),!0)}claimChapter(e){if(this.activePuzzle||e<0||e>=6||e>0&&this.state.chapterStars[e-1]===0)return null;let t=Or(e+1,Bs(this.state.town));if(t<=this.state.chapterStars[e])return null;this.state.chapterStars[e]=t,e===0&&(this.state.tutorialDone=!0);let n=rh(this.state);return this.commit(),{stars:t,subsidy:n,improved:!0}}enterPuzzle(e){let t=En.find(n=>n.id===e);return t?(this.state.puzzleBoards[e]||(this.state.puzzleBoards[e]=Pc(t)),this.activePuzzle=e,this.commit(),!0):!1}leavePuzzle(){this.activePuzzle=null,this.emit()}restartPuzzle(){this.puzzle&&(this.state.puzzleBoards[this.puzzle.id]=Pc(this.puzzle),this.commit())}claimPuzzle(){let e=this.puzzle;if(!e)return null;let t=kr(e,Bs(this.board)),n=this.state.puzzleStars[e.id]||0;return t<=n?null:(this.state.puzzleStars[e.id]=t,this.commit(),{stars:t,first:n===0})}updateSettings(e){Object.assign(this.state.settings,e),this.commit()}clock(e,t=!1){this.state.worldSeconds=e,t&&this.commit(!1)}visitHour(e){this.state.worldSeconds=eh(this.state.worldSeconds,e),this.state.settings.clockMode="cycle",this.commit()}importSave(e){let t=no(e,this.state.mode);return t?(t.revision=this.state.revision,this.state=t,this.activePuzzle=null,this.commit(),!0):!1}};var ah={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};var oh=([i,e,t])=>{let n=document.createElementNS("http://www.w3.org/2000/svg",i);return Object.keys(e).forEach(s=>{n.setAttribute(s,String(e[s]))}),t?.length&&t.forEach(s=>{let r=oh(s);n.appendChild(r)}),n},Dc=(i,e={})=>{let t="svg",n={...ah,...e};return oh([t,n,i])};var Nc=[["rect",{width:"20",height:"5",x:"2",y:"3",rx:"1"}],["path",{d:"M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"}],["path",{d:"M10 12h4"}]];var Uc=[["path",{d:"m12 19-7-7 7-7"}],["path",{d:"M19 12H5"}]];var Fc=[["path",{d:"M5 12h14"}],["path",{d:"m12 5 7 7-7 7"}]];var Oc=[["path",{d:"M7 7h10v10"}],["path",{d:"M7 17 17 7"}]];var Bc=[["path",{d:"M12 5v16"}],["path",{d:"M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z"}]];var kc=[["path",{d:"M20 6 9 17l-5-5"}]];var zc=[["path",{d:"m9 18 6-6-6-6"}]];var Gc=[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"}],["path",{d:"M12 11h4"}],["path",{d:"M12 16h4"}],["path",{d:"M8 11h.01"}],["path",{d:"M8 16h.01"}]];var Vc=[["path",{d:"M10 2v2"}],["path",{d:"M14 2v2"}],["path",{d:"M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"}],["path",{d:"M6 2v2"}]];var Hc=[["path",{d:"M13.744 17.736a6 6 0 1 1-7.48-7.48"}],["path",{d:"M15 6h1v4"}],["path",{d:"m6.134 14.768.866-.5 2 3.464"}],["circle",{cx:"16",cy:"8",r:"6"}]];var Wc=[["path",{d:"M12 15V3"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["path",{d:"m7 10 5 5 5-5"}]];var Xc=[["path",{d:"M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21"}],["path",{d:"m5.082 11.09 8.828 8.828"}]];var qc=[["path",{d:"M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528"}]];var $c=[["circle",{cx:"12",cy:"12",r:"3"}],["path",{d:"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2"}]];var Yc=[["path",{d:"m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9"}],["path",{d:"m18 15 4-4"}],["path",{d:"m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"}]];var so=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}]];var Kc=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 16v-4"}],["path",{d:"M12 8h.01"}]];var Zc=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4"}]];var jc=[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"}],["circle",{cx:"12",cy:"10",r:"3"}]];var Jc=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"}]];var Qc=[["path",{d:"M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"}]];var eu=[["path",{d:"M12 2v20"}],["path",{d:"m15 19-3 3-3-3"}],["path",{d:"m19 9 3 3-3 3"}],["path",{d:"M2 12h20"}],["path",{d:"m5 9-3 3 3 3"}],["path",{d:"m9 5 3-3 3 3"}]];var tu=[["path",{d:"M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z"}]];var nu=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]];var iu=[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}]];var su=[["circle",{cx:"6",cy:"19",r:"3"}],["path",{d:"M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"}],["circle",{cx:"18",cy:"5",r:"3"}]];var ru=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"}],["circle",{cx:"12",cy:"12",r:"3"}]];var ro=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"}],["path",{d:"M20 2v4"}],["path",{d:"M22 4h-4"}],["circle",{cx:"4",cy:"20",r:"2"}]];var au=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"}]];var ou=[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 2v2"}],["path",{d:"M12 20v2"}],["path",{d:"m4.93 4.93 1.41 1.41"}],["path",{d:"m17.66 17.66 1.41 1.41"}],["path",{d:"M2 12h2"}],["path",{d:"M20 12h2"}],["path",{d:"m6.34 17.66-1.41 1.41"}],["path",{d:"m19.07 4.93-1.41 1.41"}]];var lu=[["path",{d:"M12 10V2"}],["path",{d:"m4.93 10.93 1.41 1.41"}],["path",{d:"M2 18h2"}],["path",{d:"M20 18h2"}],["path",{d:"m19.07 10.93-1.41 1.41"}],["path",{d:"M22 22H2"}],["path",{d:"m16 6-4 4-4-4"}],["path",{d:"M16 18a4 4 0 0 0-8 0"}]];var cu=[["path",{d:"M8 19a4 4 0 0 1-2.24-7.32A3.5 3.5 0 0 1 9 6.03V6a3 3 0 1 1 6 0v.04a3.5 3.5 0 0 1 3.24 5.65A4 4 0 0 1 16 19Z"}],["path",{d:"M12 19v3"}]];var uu=[["path",{d:"M12 3v12"}],["path",{d:"m17 8-5-5-5 5"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}]];var fu=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"}],["path",{d:"M16 9a5 5 0 0 1 0 6"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728"}]];var du=[["path",{d:"M11 4.702a.7.7 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.7.7 0 0 0 11 19.298z"}],["path",{d:"m16.5 14.5 5-5"}],["path",{d:"m16.5 9.5 5 5"}]];var hu=[["path",{d:"M2 22 16 8"}],["path",{d:"M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"}],["path",{d:"M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"}],["path",{d:"M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"}],["path",{d:"M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z"}],["path",{d:"M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"}],["path",{d:"M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"}],["path",{d:"M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"}]];var pu=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];var mu=[["circle",{cx:"11",cy:"11",r:"8"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65"}],["line",{x1:"11",x2:"11",y1:"8",y2:"14"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11"}]];var gu=[["circle",{cx:"11",cy:"11",r:"8"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11"}]];function Gr(i){i=Math.floor(i||0);let e=Math.abs(i);return e<1e3?String(i):e<1e6?e<1e4?(i/1e3).toFixed(1)+"K":Math.round(i/1e3)+"K":e<1e9?e<1e7?(i/1e6).toFixed(2)+"M":Math.round(i/1e6)+"M":(i/1e9).toFixed(2)+"B"}async function lh(){try{let e=await(await fetch("/api/usage",{cache:"no-store"})).json(),t=(e.projects||[]).map(n=>({id:n.id||n.name,name:n.name,provider:n.provider||"claude",tokens:Math.max(0,Math.floor(n.tokens||0)),...n.legacyId?{legacyId:n.legacyId}:{}}));return{source:e.source,projects:t,totals:e.totals}}catch(i){return{source:"error",projects:[],error:String(i)}}}var pl="186",pn={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},ji={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},ep=0,lf=1,tp=2;var ws=1,np=2,br=3,ai=0,ln=1,en=2,oi=0,Sr=1,cf=2,uf=3,ff=4,ip=5;var Ts=100,sp=101,rp=102,ap=103,op=104,lp=200,cp=201,up=202,fp=203,df=204,hf=205,dp=206,hp=207,pp=208,mp=209,gp=210,xp=211,_p=212,vp=213,yp=214,Oo=0,Bo=1,ko=2,tr=3,zo=4,Go=5,Vo=6,Ho=7,pf=0,bp=1,Sp=2,Wn=0,mf=1,gf=2,xf=3,Ia=4,_f=5,vf=6,yf=7,Wu="attached",Mp="detached",bf=300,Ji=301,As=302,ml=303,gl=304,La=306,Wi=1e3,Rn=1001,nr=1002,Ut=1003,xl=1004;var Es=1005;var Ft=1006,Mr=1007;var Xn=1008;var mn=1009,Sf=1010,Mf=1011,wr=1012,_l=1013,qn=1014,wn=1015,$n=1016,vl=1017,yl=1018,Tr=1020,wf=35902,Tf=35899,Af=1021,Ef=1022,Tn=1023,ei=1026,Qi=1027,bl=1028,Sl=1029,es=1030,Ml=1031;var wl=1033,Da=33776,Na=33777,Ua=33778,Fa=33779,Tl=35840,Al=35841,El=35842,Cl=35843,Rl=36196,Pl=37492,Il=37496,Ll=37488,Dl=37489,Oa=37490,Nl=37491,Ul=37808,Fl=37809,Ol=37810,Bl=37811,kl=37812,zl=37813,Gl=37814,Vl=37815,Hl=37816,Wl=37817,Xl=37818,ql=37819,$l=37820,Yl=37821,Kl=36492,Zl=36494,jl=36495,Jl=36283,Ql=36284,Ba=36285,ec=36286;var ms=2300,gs=2301,No=2302,Xu=2303,qu=2400,$u=2401,Yu=2402,wp=2500;var Cf=0,ka=1,Ar=2,Tp=3200;var tc=0,Ap=1,Ri="",Nt="srgb",an="srgb-linear",ta="linear",gt="srgb";var Uo=7680;var Ep=519,Cp=512,Rp=513,Pp=514,nc=515,Ip=516,Lp=517,ic=518,Dp=519,Rf=35044;var Pf="300 es",kn=2e3,ir=2001;function ug(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function fg(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function sr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Np(){let i=sr("canvas");return i.style.display="block",i}var ch={},rr=null;function na(...i){let e="THREE."+i.shift();rr?rr("log",e,...i):console.log(e,...i)}function Up(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Le(...i){i=Up(i);let e="THREE."+i.shift();if(rr)rr("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Ve(...i){i=Up(i);let e="THREE."+i.shift();if(rr)rr("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function ps(...i){let e=i.join(" ");e in ch||(ch[e]=!0,Le(...i))}function Fp(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Op={[Oo]:Bo,[ko]:Vo,[zo]:Ho,[tr]:Go,[Bo]:Oo,[Vo]:ko,[Ho]:zo,[Go]:tr},zn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},Kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],uh=1234567,jr=Math.PI/180,xs=180/Math.PI;function Pn(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Kt[i&255]+Kt[i>>8&255]+Kt[i>>16&255]+Kt[i>>24&255]+"-"+Kt[e&255]+Kt[e>>8&255]+"-"+Kt[e>>16&15|64]+Kt[e>>24&255]+"-"+Kt[t&63|128]+Kt[t>>8&255]+"-"+Kt[t>>16&255]+Kt[t>>24&255]+Kt[n&255]+Kt[n>>8&255]+Kt[n>>16&255]+Kt[n>>24&255]).toLowerCase()}function Je(i,e,t){return Math.max(e,Math.min(t,i))}function If(i,e){return(i%e+e)%e}function dg(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function hg(i,e,t){return i!==e?(t-i)/(e-i):0}function Jr(i,e,t){return(1-t)*i+t*e}function pg(i,e,t,n){return Jr(i,e,1-Math.exp(-t*n))}function mg(i,e=1){return e-Math.abs(If(i,e*2)-e)}function gg(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function xg(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function _g(i,e){return i+Math.floor(Math.random()*(e-i+1))}function vg(i,e){return i+Math.random()*(e-i)}function yg(i){return i*(.5-Math.random())}function bg(i){i!==void 0&&(uh=i);let e=uh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Sg(i){return i*jr}function Mg(i){return i*xs}function wg(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Tg(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Ag(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Eg(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),u=a((e+n)/2),f=r((e-n)/2),d=a((e-n)/2),h=r((n-e)/2),m=a((n-e)/2);switch(s){case"XYX":i.set(o*u,c*f,c*d,o*l);break;case"YZY":i.set(c*d,o*u,c*f,o*l);break;case"ZXZ":i.set(c*f,c*d,o*u,o*l);break;case"XZX":i.set(o*u,c*m,c*h,o*l);break;case"YXY":i.set(c*h,o*u,c*m,o*l);break;case"ZYZ":i.set(c*m,c*h,o*u,o*l);break;default:Le("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Bn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function vt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var ts={DEG2RAD:jr,RAD2DEG:xs,generateUUID:Pn,clamp:Je,euclideanModulo:If,mapLinear:dg,inverseLerp:hg,lerp:Jr,damp:pg,pingpong:mg,smoothstep:gg,smootherstep:xg,randInt:_g,randFloat:vg,randFloatSpread:yg,seededRandom:bg,degToRad:Sg,radToDeg:Mg,isPowerOfTwo:wg,ceilPowerOfTwo:Tg,floorPowerOfTwo:Ag,setQuaternionFromProperEuler:Eg,normalize:vt,denormalize:Bn},re=class i{static{i.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},jt=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],u=n[s+2],f=n[s+3],d=r[a+0],h=r[a+1],m=r[a+2],y=r[a+3];if(f!==y||c!==d||l!==h||u!==m){let g=c*d+l*h+u*m+f*y;g<0&&(d=-d,h=-h,m=-m,y=-y,g=-g);let p=1-o;if(g<.9995){let S=Math.acos(g),A=Math.sin(S);p=Math.sin(p*S)/A,o=Math.sin(o*S)/A,c=c*p+d*o,l=l*p+h*o,u=u*p+m*o,f=f*p+y*o}else{c=c*p+d*o,l=l*p+h*o,u=u*p+m*o,f=f*p+y*o;let S=1/Math.sqrt(c*c+l*l+u*u+f*f);c*=S,l*=S,u*=S,f*=S}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],c=n[s+1],l=n[s+2],u=n[s+3],f=r[a],d=r[a+1],h=r[a+2],m=r[a+3];return e[t]=o*m+u*f+c*h-l*d,e[t+1]=c*m+u*d+l*f-o*h,e[t+2]=l*m+u*h+o*d-c*f,e[t+3]=u*m-o*f-c*d-l*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(s/2),f=o(r/2),d=c(n/2),h=c(s/2),m=c(r/2);switch(a){case"XYZ":this._x=d*u*f+l*h*m,this._y=l*h*f-d*u*m,this._z=l*u*m+d*h*f,this._w=l*u*f-d*h*m;break;case"YXZ":this._x=d*u*f+l*h*m,this._y=l*h*f-d*u*m,this._z=l*u*m-d*h*f,this._w=l*u*f+d*h*m;break;case"ZXY":this._x=d*u*f-l*h*m,this._y=l*h*f+d*u*m,this._z=l*u*m+d*h*f,this._w=l*u*f-d*h*m;break;case"ZYX":this._x=d*u*f-l*h*m,this._y=l*h*f+d*u*m,this._z=l*u*m-d*h*f,this._w=l*u*f+d*h*m;break;case"YZX":this._x=d*u*f+l*h*m,this._y=l*h*f+d*u*m,this._z=l*u*m-d*h*f,this._w=l*u*f-d*h*m;break;case"XZY":this._x=d*u*f-l*h*m,this._y=l*h*f-d*u*m,this._z=l*u*m+d*h*f,this._w=l*u*f+d*h*m;break;default:Le("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],f=t[10],d=n+o+f;if(d>0){let h=.5/Math.sqrt(d+1);this._w=.25/h,this._x=(u-c)*h,this._y=(r-l)*h,this._z=(a-s)*h}else if(n>o&&n>f){let h=2*Math.sqrt(1+n-o-f);this._w=(u-c)/h,this._x=.25*h,this._y=(s+a)/h,this._z=(r+l)/h}else if(o>f){let h=2*Math.sqrt(1+o-n-f);this._w=(r-l)/h,this._x=(s+a)/h,this._y=.25*h,this._z=(c+u)/h}else{let h=2*Math.sqrt(1+f-n-o);this._w=(a-s)/h,this._x=(r+l)/h,this._y=(c+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Je(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+a*o+s*l-r*c,this._y=s*u+a*c+r*o-n*l,this._z=r*u+a*l+n*c-s*o,this._w=a*u-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){let l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},L=class i{static{i.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(fh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(fh.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),u=2*(o*t-r*s),f=2*(r*n-a*t);return this.x=t+c*l+a*f-o*u,this.y=n+c*u+o*l-r*f,this.z=s+c*f+r*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this.z=Je(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this.z=Je(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return xu.copy(this).projectOnVector(e),this.sub(xu)}reflect(e){return this.sub(xu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},xu=new L,fh=new jt,Ye=class i{static{i.prototype.isMatrix3=!0}constructor(e,t,n,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){let u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],f=n[7],d=n[2],h=n[5],m=n[8],y=s[0],g=s[3],p=s[6],S=s[1],A=s[4],_=s[7],w=s[2],T=s[5],C=s[8];return r[0]=a*y+o*S+c*w,r[3]=a*g+o*A+c*T,r[6]=a*p+o*_+c*C,r[1]=l*y+u*S+f*w,r[4]=l*g+u*A+f*T,r[7]=l*p+u*_+f*C,r[2]=d*y+h*S+m*w,r[5]=d*g+h*A+m*T,r[8]=d*p+h*_+m*C,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-n*r*u+n*o*c+s*r*l-s*a*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],f=u*a-o*l,d=o*c-u*r,h=l*r-a*c,m=t*f+n*d+s*h;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/m;return e[0]=f*y,e[1]=(s*l-u*n)*y,e[2]=(o*n-s*a)*y,e[3]=d*y,e[4]=(u*t-s*c)*y,e[5]=(s*r-o*t)*y,e[6]=h*y,e[7]=(n*c-l*t)*y,e[8]=(a*t-n*r)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return ps("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(_u.makeScale(e,t)),this}rotate(e){return ps("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(_u.makeRotation(-e)),this}translate(e,t){return ps("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(_u.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},_u=new Ye,dh=new Ye().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),hh=new Ye().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Cg(){let i={enabled:!0,workingColorSpace:an,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===gt&&(s.r=vi(s.r),s.g=vi(s.g),s.b=vi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===gt&&(s.r=er(s.r),s.g=er(s.g),s.b=er(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ri?ta:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ps("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ps("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[an]:{primaries:e,whitePoint:n,transfer:ta,toXYZ:dh,fromXYZ:hh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Nt},outputColorSpaceConfig:{drawingBufferColorSpace:Nt}},[Nt]:{primaries:e,whitePoint:n,transfer:gt,toXYZ:dh,fromXYZ:hh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Nt}}}),i}var nt=Cg();function vi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function er(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var zs,Wo=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{zs===void 0&&(zs=sr("canvas")),zs.width=e.width,zs.height=e.height;let s=zs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=zs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=sr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=vi(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(vi(t[n]/255)*255):t[n]=vi(t[n]);return{data:t,width:e.width,height:e.height}}else return Le("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Rg=0,ar=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Rg++}),this.uuid=Pn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(vu(s[a].image)):r.push(vu(s[a]))}else r=vu(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function vu(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Wo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Le("Texture: Unable to serialize Texture."),{})}var Pg=0,yu=new L,qt=class i extends zn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Rn,s=Rn,r=Ft,a=Xn,o=Tn,c=mn,l=i.DEFAULT_ANISOTROPY,u=Ri){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Pg++}),this.uuid=Pn(),this.name="",this.source=new ar(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new re(0,0),this.repeat=new re(1,1),this.center=new re(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ye,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(yu).x}get height(){return this.source.getSize(yu).y}get depth(){return this.source.getSize(yu).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Le(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Le(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==bf)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Wi:e.x=e.x-Math.floor(e.x);break;case Rn:e.x=e.x<0?0:1;break;case nr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Wi:e.y=e.y-Math.floor(e.y);break;case Rn:e.y=e.y<0?0:1;break;case nr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};qt.DEFAULT_IMAGE=null;qt.DEFAULT_MAPPING=bf;qt.DEFAULT_ANISOTROPY=1;var yt=class i{static{i.prototype.isVector4=!0}constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,l=c[0],u=c[4],f=c[8],d=c[1],h=c[5],m=c[9],y=c[2],g=c[6],p=c[10];if(Math.abs(u-d)<.01&&Math.abs(f-y)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+d)<.1&&Math.abs(f+y)<.1&&Math.abs(m+g)<.1&&Math.abs(l+h+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let A=(l+1)/2,_=(h+1)/2,w=(p+1)/2,T=(u+d)/4,C=(f+y)/4,x=(m+g)/4;return A>_&&A>w?A<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(A),s=T/n,r=C/n):_>w?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=T/s,r=x/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=C/r,s=x/r),this.set(n,s,r,t),this}let S=Math.sqrt((g-m)*(g-m)+(f-y)*(f-y)+(d-u)*(d-u));return Math.abs(S)<.001&&(S=1),this.x=(g-m)/S,this.y=(f-y)/S,this.z=(d-u)/S,this.w=Math.acos((l+h+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this.z=Je(this.z,e.z,t.z),this.w=Je(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this.z=Je(this.z,e,t),this.w=Je(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Xo=class extends zn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ft,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new yt(0,0,e,t),this.scissorTest=!1,this.viewport=new yt(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:n.depth},r=new qt(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Ft,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new ar(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Jt=class extends Xo{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},ia=class extends qt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ut,this.minFilter=Ut,this.wrapR=Rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var qo=class extends qt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ut,this.minFilter=Ut,this.wrapR=Rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var $e=class i{static{i.prototype.isMatrix4=!0}constructor(e,t,n,s,r,a,o,c,l,u,f,d,h,m,y,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,u,f,d,h,m,y,g)}set(e,t,n,s,r,a,o,c,l,u,f,d,h,m,y,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=u,p[10]=f,p[14]=d,p[3]=h,p[7]=m,p[11]=y,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/Gs.setFromMatrixColumn(e,0).length(),r=1/Gs.setFromMatrixColumn(e,1).length(),a=1/Gs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){let d=a*u,h=a*f,m=o*u,y=o*f;t[0]=c*u,t[4]=-c*f,t[8]=l,t[1]=h+m*l,t[5]=d-y*l,t[9]=-o*c,t[2]=y-d*l,t[6]=m+h*l,t[10]=a*c}else if(e.order==="YXZ"){let d=c*u,h=c*f,m=l*u,y=l*f;t[0]=d+y*o,t[4]=m*o-h,t[8]=a*l,t[1]=a*f,t[5]=a*u,t[9]=-o,t[2]=h*o-m,t[6]=y+d*o,t[10]=a*c}else if(e.order==="ZXY"){let d=c*u,h=c*f,m=l*u,y=l*f;t[0]=d-y*o,t[4]=-a*f,t[8]=m+h*o,t[1]=h+m*o,t[5]=a*u,t[9]=y-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let d=a*u,h=a*f,m=o*u,y=o*f;t[0]=c*u,t[4]=m*l-h,t[8]=d*l+y,t[1]=c*f,t[5]=y*l+d,t[9]=h*l-m,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let d=a*c,h=a*l,m=o*c,y=o*l;t[0]=c*u,t[4]=y-d*f,t[8]=m*f+h,t[1]=f,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=h*f+m,t[10]=d-y*f}else if(e.order==="XZY"){let d=a*c,h=a*l,m=o*c,y=o*l;t[0]=c*u,t[4]=-f,t[8]=l*u,t[1]=d*f+y,t[5]=a*u,t[9]=h*f-m,t[2]=m*f-h,t[6]=o*u,t[10]=y*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ig,e,Lg)}lookAt(e,t,n){let s=this.elements;return _n.subVectors(e,t),_n.lengthSq()===0&&(_n.z=1),_n.normalize(),Oi.crossVectors(n,_n),Oi.lengthSq()===0&&(Math.abs(n.z)===1?_n.x+=1e-4:_n.z+=1e-4,_n.normalize(),Oi.crossVectors(n,_n)),Oi.normalize(),ao.crossVectors(_n,Oi),s[0]=Oi.x,s[4]=ao.x,s[8]=_n.x,s[1]=Oi.y,s[5]=ao.y,s[9]=_n.y,s[2]=Oi.z,s[6]=ao.z,s[10]=_n.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],f=n[5],d=n[9],h=n[13],m=n[2],y=n[6],g=n[10],p=n[14],S=n[3],A=n[7],_=n[11],w=n[15],T=s[0],C=s[4],x=s[8],b=s[12],E=s[1],D=s[5],F=s[9],N=s[13],P=s[2],U=s[6],z=s[10],V=s[14],j=s[3],q=s[7],J=s[11],ie=s[15];return r[0]=a*T+o*E+c*P+l*j,r[4]=a*C+o*D+c*U+l*q,r[8]=a*x+o*F+c*z+l*J,r[12]=a*b+o*N+c*V+l*ie,r[1]=u*T+f*E+d*P+h*j,r[5]=u*C+f*D+d*U+h*q,r[9]=u*x+f*F+d*z+h*J,r[13]=u*b+f*N+d*V+h*ie,r[2]=m*T+y*E+g*P+p*j,r[6]=m*C+y*D+g*U+p*q,r[10]=m*x+y*F+g*z+p*J,r[14]=m*b+y*N+g*V+p*ie,r[3]=S*T+A*E+_*P+w*j,r[7]=S*C+A*D+_*U+w*q,r[11]=S*x+A*F+_*z+w*J,r[15]=S*b+A*N+_*V+w*ie,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],f=e[6],d=e[10],h=e[14],m=e[3],y=e[7],g=e[11],p=e[15],S=c*h-l*d,A=o*h-l*f,_=o*d-c*f,w=a*h-l*u,T=a*d-c*u,C=a*f-o*u;return t*(y*S-g*A+p*_)-n*(m*S-g*w+p*T)+s*(m*A-y*w+p*C)-r*(m*_-y*T+g*C)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],c=e[2],l=e[6],u=e[10];return t*(a*u-o*l)-n*(r*u-o*c)+s*(r*l-a*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],f=e[9],d=e[10],h=e[11],m=e[12],y=e[13],g=e[14],p=e[15],S=t*o-n*a,A=t*c-s*a,_=t*l-r*a,w=n*c-s*o,T=n*l-r*o,C=s*l-r*c,x=u*y-f*m,b=u*g-d*m,E=u*p-h*m,D=f*g-d*y,F=f*p-h*y,N=d*p-h*g,P=S*N-A*F+_*D+w*E-T*b+C*x;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let U=1/P;return e[0]=(o*N-c*F+l*D)*U,e[1]=(s*F-n*N-r*D)*U,e[2]=(y*C-g*T+p*w)*U,e[3]=(d*T-f*C-h*w)*U,e[4]=(c*E-a*N-l*b)*U,e[5]=(t*N-s*E+r*b)*U,e[6]=(g*_-m*C-p*A)*U,e[7]=(u*C-d*_+h*A)*U,e[8]=(a*F-o*E+l*x)*U,e[9]=(n*E-t*F-r*x)*U,e[10]=(m*T-y*_+p*S)*U,e[11]=(f*_-u*T-h*S)*U,e[12]=(o*b-a*D-c*x)*U,e[13]=(t*D-n*b+s*x)*U,e[14]=(y*A-m*w-g*S)*U,e[15]=(u*w-f*A+d*S)*U,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,u=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,u*o+n,u*c-s*a,0,l*c-s*o,u*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,u=a+a,f=o+o,d=r*l,h=r*u,m=r*f,y=a*u,g=a*f,p=o*f,S=c*l,A=c*u,_=c*f,w=n.x,T=n.y,C=n.z;return s[0]=(1-(y+p))*w,s[1]=(h+_)*w,s[2]=(m-A)*w,s[3]=0,s[4]=(h-_)*T,s[5]=(1-(d+p))*T,s[6]=(g+S)*T,s[7]=0,s[8]=(m+A)*C,s[9]=(g-S)*C,s[10]=(1-(d+y))*C,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=Gs.set(s[0],s[1],s[2]).length(),o=Gs.set(s[4],s[5],s[6]).length(),c=Gs.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Un.copy(this);let l=1/a,u=1/o,f=1/c;return Un.elements[0]*=l,Un.elements[1]*=l,Un.elements[2]*=l,Un.elements[4]*=u,Un.elements[5]*=u,Un.elements[6]*=u,Un.elements[8]*=f,Un.elements[9]*=f,Un.elements[10]*=f,t.setFromRotationMatrix(Un),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,s,r,a,o=kn,c=!1){let l=this.elements,u=2*r/(t-e),f=2*r/(n-s),d=(t+e)/(t-e),h=(n+s)/(n-s),m,y;if(c)m=r/(a-r),y=a*r/(a-r);else if(o===kn)m=-(a+r)/(a-r),y=-2*a*r/(a-r);else if(o===ir)m=-a/(a-r),y=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=f,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=y,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=kn,c=!1){let l=this.elements,u=2/(t-e),f=2/(n-s),d=-(t+e)/(t-e),h=-(n+s)/(n-s),m,y;if(c)m=1/(a-r),y=a/(a-r);else if(o===kn)m=-2/(a-r),y=-(a+r)/(a-r);else if(o===ir)m=-1/(a-r),y=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=f,l[9]=0,l[13]=h,l[2]=0,l[6]=0,l[10]=m,l[14]=y,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Gs=new L,Un=new $e,Ig=new L(0,0,0),Lg=new L(1,1,1),Oi=new L,ao=new L,_n=new L,ph=new $e,mh=new jt,yi=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],u=s[9],f=s[2],d=s[6],h=s[10];switch(t){case"XYZ":this._y=Math.asin(Je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Je(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,h),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Je(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,h),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Je(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,h),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Je(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,h));break;case"XZY":this._z=Math.asin(-Je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,h),this._y=0);break;default:Le("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ph.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ph,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return mh.setFromEuler(this),this.setFromQuaternion(mh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};yi.DEFAULT_ORDER="XYZ";var or=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Dg=0,gh=new L,Vs=new jt,hi=new $e,oo=new L,Vr=new L,Ng=new L,Ug=new jt,xh=new L(1,0,0),_h=new L(0,1,0),vh=new L(0,0,1),yh={type:"added"},Fg={type:"removed"},Hs={type:"childadded",child:null},bu={type:"childremoved",child:null},xt=class i extends zn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Dg++}),this.uuid=Pn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new L,t=new yi,n=new jt,s=new L(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new $e},normalMatrix:{value:new Ye}}),this.matrix=new $e,this.matrixWorld=new $e,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new or,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Vs.setFromAxisAngle(e,t),this.quaternion.multiply(Vs),this}rotateOnWorldAxis(e,t){return Vs.setFromAxisAngle(e,t),this.quaternion.premultiply(Vs),this}rotateX(e){return this.rotateOnAxis(xh,e)}rotateY(e){return this.rotateOnAxis(_h,e)}rotateZ(e){return this.rotateOnAxis(vh,e)}translateOnAxis(e,t){return gh.copy(e).applyQuaternion(this.quaternion),this.position.add(gh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(xh,e)}translateY(e){return this.translateOnAxis(_h,e)}translateZ(e){return this.translateOnAxis(vh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(hi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?oo.copy(e):oo.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Vr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?hi.lookAt(Vr,oo,this.up):hi.lookAt(oo,Vr,this.up),this.quaternion.setFromRotationMatrix(hi),s&&(hi.extractRotation(s.matrixWorld),Vs.setFromRotationMatrix(hi),this.quaternion.premultiply(Vs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ve("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(yh),Hs.child=e,this.dispatchEvent(Hs),Hs.child=null):Ve("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Fg),bu.child=e,this.dispatchEvent(bu),bu.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),hi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),hi.multiply(e.parent.matrixWorld)),e.applyMatrix4(hi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(yh),Hs.child=e,this.dispatchEvent(Hs),Hs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vr,e,Ng),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vr,Ug,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let f=c[l];r(e.shapes,f)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),f=a(e.shapes),d=a(e.skeletons),h=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),d.length>0&&(n.skeletons=d),h.length>0&&(n.animations=h),m.length>0&&(n.nodes=m)}return n.object=s,n;function a(o){let c=[];for(let l in o){let u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};xt.DEFAULT_UP=new L(0,1,0);xt.DEFAULT_MATRIX_AUTO_UPDATE=!0;xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ee=class extends xt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Og={type:"move"},lr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ee,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ee,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ee,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let y of e.hand.values()){let g=t.getJointPose(y,n),p=this._getHandJoint(l,y);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let u=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],d=u.position.distanceTo(f.position),h=.02,m=.005;l.inputState.pinching&&d>h+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=h-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Og)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Ee;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Bp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Bi={h:0,s:0,l:0},lo={h:0,s:0,l:0};function Su(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var be=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Nt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,nt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=nt.workingColorSpace){return this.r=e,this.g=t,this.b=n,nt.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=nt.workingColorSpace){if(e=If(e,1),t=Je(t,0,1),n=Je(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Su(a,r,e+1/3),this.g=Su(a,r,e),this.b=Su(a,r,e-1/3)}return nt.colorSpaceToWorking(this,s),this}setStyle(e,t=Nt){function n(r){r!==void 0&&parseFloat(r)<1&&Le("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Le("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Le("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Nt){let n=Bp[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Le("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=vi(e.r),this.g=vi(e.g),this.b=vi(e.b),this}copyLinearToSRGB(e){return this.r=er(e.r),this.g=er(e.g),this.b=er(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Nt){return nt.workingToColorSpace(Zt.copy(this),e),Math.round(Je(Zt.r*255,0,255))*65536+Math.round(Je(Zt.g*255,0,255))*256+Math.round(Je(Zt.b*255,0,255))}getHexString(e=Nt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=nt.workingColorSpace){nt.workingToColorSpace(Zt.copy(this),t);let n=Zt.r,s=Zt.g,r=Zt.b,a=Math.max(n,s,r),o=Math.min(n,s,r),c,l,u=(o+a)/2;if(o===a)c=0,l=0;else{let f=a-o;switch(l=u<=.5?f/(a+o):f/(2-a-o),a){case n:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-n)/f+2;break;case r:c=(n-s)/f+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=nt.workingColorSpace){return nt.workingToColorSpace(Zt.copy(this),t),e.r=Zt.r,e.g=Zt.g,e.b=Zt.b,e}getStyle(e=Nt){nt.workingToColorSpace(Zt.copy(this),e);let t=Zt.r,n=Zt.g,s=Zt.b;return e!==Nt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Bi),this.setHSL(Bi.h+e,Bi.s+t,Bi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Bi),e.getHSL(lo);let n=Jr(Bi.h,lo.h,t),s=Jr(Bi.s,lo.s,t),r=Jr(Bi.l,lo.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Zt=new be;be.NAMES=Bp;var sa=class i{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new be(e),this.near=t,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},cr=class extends xt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new yi,this.environmentIntensity=1,this.environmentRotation=new yi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Fn=new L,pi=new L,Mu=new L,mi=new L,Ws=new L,Xs=new L,bh=new L,wu=new L,Tu=new L,Au=new L,Eu=new yt,Cu=new yt,Ru=new yt,Hi=class i{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Fn.subVectors(e,t),s.cross(Fn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Fn.subVectors(s,t),pi.subVectors(n,t),Mu.subVectors(e,t);let a=Fn.dot(Fn),o=Fn.dot(pi),c=Fn.dot(Mu),l=pi.dot(pi),u=pi.dot(Mu),f=a*l-o*o;if(f===0)return r.set(0,0,0),null;let d=1/f,h=(l*c-o*u)*d,m=(a*u-o*c)*d;return r.set(1-h-m,m,h)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,mi)===null?!1:mi.x>=0&&mi.y>=0&&mi.x+mi.y<=1}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,mi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,mi.x),c.addScaledVector(a,mi.y),c.addScaledVector(o,mi.z),c)}static getInterpolatedAttribute(e,t,n,s,r,a){return Eu.setScalar(0),Cu.setScalar(0),Ru.setScalar(0),Eu.fromBufferAttribute(e,t),Cu.fromBufferAttribute(e,n),Ru.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Eu,r.x),a.addScaledVector(Cu,r.y),a.addScaledVector(Ru,r.z),a}static isFrontFacing(e,t,n,s){return Fn.subVectors(n,t),pi.subVectors(e,t),Fn.cross(pi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Fn.subVectors(this.c,this.b),pi.subVectors(this.a,this.b),Fn.cross(pi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;Ws.subVectors(s,n),Xs.subVectors(r,n),wu.subVectors(e,n);let c=Ws.dot(wu),l=Xs.dot(wu);if(c<=0&&l<=0)return t.copy(n);Tu.subVectors(e,s);let u=Ws.dot(Tu),f=Xs.dot(Tu);if(u>=0&&f<=u)return t.copy(s);let d=c*f-u*l;if(d<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(n).addScaledVector(Ws,a);Au.subVectors(e,r);let h=Ws.dot(Au),m=Xs.dot(Au);if(m>=0&&h<=m)return t.copy(r);let y=h*l-c*m;if(y<=0&&l>=0&&m<=0)return o=l/(l-m),t.copy(n).addScaledVector(Xs,o);let g=u*m-h*f;if(g<=0&&f-u>=0&&h-m>=0)return bh.subVectors(r,s),o=(f-u)/(f-u+(h-m)),t.copy(s).addScaledVector(bh,o);let p=1/(g+y+d);return a=y*p,o=d*p,t.copy(n).addScaledVector(Ws,a).addScaledVector(Xs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},yn=class{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(On.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(On.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=On.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,On):On.fromBufferAttribute(r,a),On.applyMatrix4(e.matrixWorld),this.expandByPoint(On);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),co.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),co.copy(n.boundingBox)),co.applyMatrix4(e.matrixWorld),this.union(co)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,On),On.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Hr),uo.subVectors(this.max,Hr),qs.subVectors(e.a,Hr),$s.subVectors(e.b,Hr),Ys.subVectors(e.c,Hr),ki.subVectors($s,qs),zi.subVectors(Ys,$s),cs.subVectors(qs,Ys);let t=[0,-ki.z,ki.y,0,-zi.z,zi.y,0,-cs.z,cs.y,ki.z,0,-ki.x,zi.z,0,-zi.x,cs.z,0,-cs.x,-ki.y,ki.x,0,-zi.y,zi.x,0,-cs.y,cs.x,0];return!Pu(t,qs,$s,Ys,uo)||(t=[1,0,0,0,1,0,0,0,1],!Pu(t,qs,$s,Ys,uo))?!1:(fo.crossVectors(ki,zi),t=[fo.x,fo.y,fo.z],Pu(t,qs,$s,Ys,uo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,On).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(On).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(gi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),gi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),gi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),gi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),gi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),gi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),gi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),gi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(gi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},gi=[new L,new L,new L,new L,new L,new L,new L,new L],On=new L,co=new yn,qs=new L,$s=new L,Ys=new L,ki=new L,zi=new L,cs=new L,Hr=new L,uo=new L,fo=new L,us=new L;function Pu(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){us.fromArray(i,r);let o=s.x*Math.abs(us.x)+s.y*Math.abs(us.y)+s.z*Math.abs(us.z),c=e.dot(us),l=t.dot(us),u=n.dot(us);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}var kt=new L,ho=new re,Bg=0,zt=class extends zn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Bg++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Rf,this.updateRanges=[],this.gpuType=wn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ho.fromBufferAttribute(this,t),ho.applyMatrix3(e),this.setXY(t,ho.x,ho.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyMatrix3(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyMatrix4(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyNormalMatrix(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.transformDirection(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Bn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=vt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Bn(t,this.array)),t}setX(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Bn(t,this.array)),t}setY(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Bn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Bn(t,this.array)),t}setW(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=vt(t,this.array),n=vt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=vt(t,this.array),n=vt(n,this.array),s=vt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=vt(t,this.array),n=vt(n,this.array),s=vt(s,this.array),r=vt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var ra=class extends zt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var aa=class extends zt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var et=class extends zt{constructor(e,t,n){super(new Float32Array(e),t,n)}},kg=new yn,Wr=new L,Iu=new L,un=class{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):kg.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Wr.subVectors(e,this.center);let t=Wr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Wr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Iu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Wr.copy(e.center).add(Iu)),this.expandByPoint(Wr.copy(e.center).sub(Iu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},zg=0,Cn=new $e,Lu=new xt,Ks=new L,vn=new yn,Xr=new yn,Wt=new L,ft=class i extends zn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:zg++}),this.uuid=Pn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ug(e)?aa:ra)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ye().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Cn.makeRotationFromQuaternion(e),this.applyMatrix4(Cn),this}rotateX(e){return Cn.makeRotationX(e),this.applyMatrix4(Cn),this}rotateY(e){return Cn.makeRotationY(e),this.applyMatrix4(Cn),this}rotateZ(e){return Cn.makeRotationZ(e),this.applyMatrix4(Cn),this}translate(e,t,n){return Cn.makeTranslation(e,t,n),this.applyMatrix4(Cn),this}scale(e,t,n){return Cn.makeScale(e,t,n),this.applyMatrix4(Cn),this}lookAt(e){return Lu.lookAt(e),Lu.updateMatrix(),this.applyMatrix4(Lu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ks).negate(),this.translate(Ks.x,Ks.y,Ks.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new et(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Le("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new yn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ve("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];vn.setFromBufferAttribute(r),this.morphTargetsRelative?(Wt.addVectors(this.boundingBox.min,vn.min),this.boundingBox.expandByPoint(Wt),Wt.addVectors(this.boundingBox.max,vn.max),this.boundingBox.expandByPoint(Wt)):(this.boundingBox.expandByPoint(vn.min),this.boundingBox.expandByPoint(vn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ve('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new un);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ve("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){let n=this.boundingSphere.center;if(vn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Xr.setFromBufferAttribute(o),this.morphTargetsRelative?(Wt.addVectors(vn.min,Xr.min),vn.expandByPoint(Wt),Wt.addVectors(vn.max,Xr.max),vn.expandByPoint(Wt)):(vn.expandByPoint(Xr.min),vn.expandByPoint(Xr.max))}vn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Wt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Wt));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)Wt.fromBufferAttribute(o,l),c&&(Ks.fromBufferAttribute(e,l),Wt.add(Ks)),s=Math.max(s,n.distanceToSquared(Wt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ve('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ve("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new zt(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],c=[];for(let x=0;x<n.count;x++)o[x]=new L,c[x]=new L;let l=new L,u=new L,f=new L,d=new re,h=new re,m=new re,y=new L,g=new L;function p(x,b,E){l.fromBufferAttribute(n,x),u.fromBufferAttribute(n,b),f.fromBufferAttribute(n,E),d.fromBufferAttribute(r,x),h.fromBufferAttribute(r,b),m.fromBufferAttribute(r,E),u.sub(l),f.sub(l),h.sub(d),m.sub(d);let D=1/(h.x*m.y-m.x*h.y);isFinite(D)&&(y.copy(u).multiplyScalar(m.y).addScaledVector(f,-h.y).multiplyScalar(D),g.copy(f).multiplyScalar(h.x).addScaledVector(u,-m.x).multiplyScalar(D),o[x].add(y),o[b].add(y),o[E].add(y),c[x].add(g),c[b].add(g),c[E].add(g))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let x=0,b=S.length;x<b;++x){let E=S[x],D=E.start,F=E.count;for(let N=D,P=D+F;N<P;N+=3)p(e.getX(N+0),e.getX(N+1),e.getX(N+2))}let A=new L,_=new L,w=new L,T=new L;function C(x){w.fromBufferAttribute(s,x),T.copy(w);let b=o[x];A.copy(b),A.sub(w.multiplyScalar(w.dot(b))).normalize(),_.crossVectors(T,b);let D=_.dot(c[x])<0?-1:1;a.setXYZW(x,A.x,A.y,A.z,D)}for(let x=0,b=S.length;x<b;++x){let E=S[x],D=E.start,F=E.count;for(let N=D,P=D+F;N<P;N+=3)C(e.getX(N+0)),C(e.getX(N+1)),C(e.getX(N+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new zt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,h=n.count;d<h;d++)n.setXYZ(d,0,0,0);let s=new L,r=new L,a=new L,o=new L,c=new L,l=new L,u=new L,f=new L;if(e)for(let d=0,h=e.count;d<h;d+=3){let m=e.getX(d+0),y=e.getX(d+1),g=e.getX(d+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,y),a.fromBufferAttribute(t,g),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),o.fromBufferAttribute(n,m),c.fromBufferAttribute(n,y),l.fromBufferAttribute(n,g),o.add(u),c.add(u),l.add(u),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(y,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let d=0,h=t.count;d<h;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Wt.fromBufferAttribute(e,t),Wt.normalize(),e.setXYZ(t,Wt.x,Wt.y,Wt.z)}toNonIndexed(){function e(o,c){let l=o.array,u=o.itemSize,f=o.normalized,d=new l.constructor(c.length*u),h=0,m=0;for(let y=0,g=c.length;y<g;y++){o.isInterleavedBufferAttribute?h=c[y]*o.data.stride+o.offset:h=c[y]*u;for(let p=0;p<u;p++)d[m++]=l[h++]}return new zt(d,u,f)}if(this.index===null)return Le("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let c=s[o],l=e(c,n);t.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let u=0,f=l.length;u<f;u++){let d=l[u],h=e(d,n);c.push(h)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let f=0,d=l.length;f<d;f++){let h=l[f];u.push(h.toJSON(e.data))}u.length>0&&(s[c]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let l in s){let u=s[l];this.setAttribute(l,u.clone(t))}let r=e.morphAttributes;for(let l in r){let u=[],f=r[l];for(let d=0,h=f.length;d<h;d++)u.push(f[d].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,u=a.length;l<u;l++){let f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},ur=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Rf,this.updateRanges=[],this.version=0,this.uuid=Pn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Pn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Pn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},sn=new L,fr=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)sn.fromBufferAttribute(this,t),sn.applyMatrix4(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)sn.fromBufferAttribute(this,t),sn.applyNormalMatrix(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)sn.fromBufferAttribute(this,t),sn.transformDirection(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Bn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=vt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=vt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=vt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=vt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=vt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Bn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Bn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Bn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Bn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=vt(t,this.array),n=vt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=vt(t,this.array),n=vt(n,this.array),s=vt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=vt(t,this.array),n=vt(n,this.array),s=vt(s,this.array),r=vt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){na("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new zt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){na("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Du=new L,Gg=new L,Vg=new Ye,rn=class{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Du.subVectors(n,t).cross(Gg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(Du),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Vg.getNormalMatrix(e),s=this.coplanarPoint(Du).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Hg=0,fn=class extends zn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Hg++}),this.uuid=Pn(),this.name="",this.type="Material",this.blending=Sr,this.side=ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=df,this.blendDst=hf,this.blendEquation=Ts,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new be(0,0,0),this.blendAlpha=0,this.depthFunc=tr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ep,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Uo,this.stencilZFail=Uo,this.stencilZPass=Uo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Le(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Le(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new be().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new rn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new re().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new re().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var xi=new L,Nu=new L,po=new L,mo=new L,ti=class{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,xi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=xi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(xi.copy(this.origin).addScaledVector(this.direction,t),xi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Nu.copy(e).add(t).multiplyScalar(.5),po.copy(t).sub(e).normalize(),mo.copy(this.origin).sub(Nu);let r=e.distanceTo(t)*.5,a=-this.direction.dot(po),o=mo.dot(this.direction),c=-mo.dot(po),l=mo.lengthSq(),u=Math.abs(1-a*a),f,d,h,m;if(u>0)if(f=a*c-o,d=a*o-c,m=r*u,f>=0)if(d>=-m)if(d<=m){let y=1/u;f*=y,d*=y,h=f*(f+a*d+2*o)+d*(a*f+d+2*c)+l}else d=r,f=Math.max(0,-(a*d+o)),h=-f*f+d*(d+2*c)+l;else d=-r,f=Math.max(0,-(a*d+o)),h=-f*f+d*(d+2*c)+l;else d<=-m?(f=Math.max(0,-(-a*r+o)),d=f>0?-r:Math.min(Math.max(-r,-c),r),h=-f*f+d*(d+2*c)+l):d<=m?(f=0,d=Math.min(Math.max(-r,-c),r),h=d*(d+2*c)+l):(f=Math.max(0,-(a*r+o)),d=f>0?r:Math.min(Math.max(-r,-c),r),h=-f*f+d*(d+2*c)+l);else d=a>0?-r:r,f=Math.max(0,-(a*d+o)),h=-f*f+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Nu).addScaledVector(po,d),h}intersectSphere(e,t){if(e.radius<0)return null;xi.subVectors(e.center,this.origin);let n=xi.dot(this.direction),s=xi.dot(xi)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c,l=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,s=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,s=(e.min.x-d.x)*l),u>=0?(r=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(e.min.z-d.z)*f,c=(e.max.z-d.z)*f):(o=(e.max.z-d.z)*f,c=(e.min.z-d.z)*f),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,xi)!==null}intersectTriangle(e,t,n,s,r){let a=this.origin,o=this.direction,c=o.x,l=o.y,u=o.z,f=e.x-a.x,d=e.y-a.y,h=e.z-a.z,m=t.x-a.x,y=t.y-a.y,g=t.z-a.z,p=n.x-a.x,S=n.y-a.y,A=n.z-a.z,_=Math.abs(c),w=Math.abs(l),T=Math.abs(u),C,x,b,E,D,F,N,P,U,z,V,j;if(_>=w&&_>=T?(b=c,F=f,U=m,j=p,c>=0?(C=l,x=u,E=d,D=h,N=y,P=g,z=S,V=A):(C=u,x=l,E=h,D=d,N=g,P=y,z=A,V=S)):w>=T?(b=l,F=d,U=y,j=S,l>=0?(C=u,x=c,E=h,D=f,N=g,P=m,z=A,V=p):(C=c,x=u,E=f,D=h,N=m,P=g,z=p,V=A)):(b=u,F=h,U=g,j=A,u>=0?(C=c,x=l,E=f,D=d,N=m,P=y,z=p,V=S):(C=l,x=c,E=d,D=f,N=y,P=m,z=S,V=p)),b===0)return null;let q=C/b,J=x/b,ie=1/b,De=E-q*F,Ae=D-J*F,dt=N-q*U,st=P-J*U,ct=z-q*j,Z=V-J*j,te=ct*st-Z*dt,_e=De*Z-Ae*ct,We=dt*Ae-st*De;if(s){if(te<0||_e<0||We<0)return null}else if((te<0||_e<0||We<0)&&(te>0||_e>0||We>0))return null;let Me=te+_e+We;if(Me===0)return null;let Xe=ie*(te*F+_e*U+We*j);return(Me>0?Xe<0:Xe>0)?null:this.at(Xe/Me,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Qt=class extends fn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yi,this.combine=pf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Sh=new $e,fs=new ti,go=new un,Mh=new L,xo=new L,_o=new L,vo=new L,Uu=new L,yo=new L,wh=new L,bo=new L,Be=class extends xt{constructor(e=new ft,t=new Qt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){yo.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let u=o[c],f=r[c];u!==0&&(Uu.fromBufferAttribute(f,e),a?yo.addScaledVector(Uu,u):yo.addScaledVector(Uu.sub(t),u))}t.add(yo)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),go.copy(n.boundingSphere),go.applyMatrix4(r),fs.copy(e.ray).recast(e.near),!(go.containsPoint(fs.origin)===!1&&(fs.intersectSphere(go,Mh)===null||fs.origin.distanceToSquared(Mh)>(e.far-e.near)**2))&&(Sh.copy(r).invert(),fs.copy(e.ray).applyMatrix4(Sh),!(n.boundingBox!==null&&fs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,fs)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,d=r.groups,h=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,y=d.length;m<y;m++){let g=d[m],p=a[g.materialIndex],S=Math.max(g.start,h.start),A=Math.min(o.count,Math.min(g.start+g.count,h.start+h.count));for(let _=S,w=A;_<w;_+=3){let T=o.getX(_),C=o.getX(_+1),x=o.getX(_+2);s=So(this,p,e,n,l,u,f,T,C,x),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let m=Math.max(0,h.start),y=Math.min(o.count,h.start+h.count);for(let g=m,p=y;g<p;g+=3){let S=o.getX(g),A=o.getX(g+1),_=o.getX(g+2);s=So(this,a,e,n,l,u,f,S,A,_),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let m=0,y=d.length;m<y;m++){let g=d[m],p=a[g.materialIndex],S=Math.max(g.start,h.start),A=Math.min(c.count,Math.min(g.start+g.count,h.start+h.count));for(let _=S,w=A;_<w;_+=3){let T=_,C=_+1,x=_+2;s=So(this,p,e,n,l,u,f,T,C,x),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let m=Math.max(0,h.start),y=Math.min(c.count,h.start+h.count);for(let g=m,p=y;g<p;g+=3){let S=g,A=g+1,_=g+2;s=So(this,a,e,n,l,u,f,S,A,_),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}};function Wg(i,e,t,n,s,r,a,o){let c;if(e.side===ln?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===ai,o),c===null)return null;bo.copy(o),bo.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(bo);return l<t.near||l>t.far?null:{distance:l,point:bo.clone(),object:i}}function So(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,xo),i.getVertexPosition(c,_o),i.getVertexPosition(l,vo);let u=Wg(i,e,t,n,xo,_o,vo,wh);if(u){let f=new L;Hi.getBarycoord(wh,xo,_o,vo,f),s&&(u.uv=Hi.getInterpolatedAttribute(s,o,c,l,f,new re)),r&&(u.uv1=Hi.getInterpolatedAttribute(r,o,c,l,f,new re)),a&&(u.normal=Hi.getInterpolatedAttribute(a,o,c,l,f,new L),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let d={a:o,b:c,c:l,normal:new L,materialIndex:0};Hi.getNormal(xo,_o,vo,d.normal),u.face=d,u.barycoord=f}return u}var qr=new yt,Th=new yt,Ah=new yt,Xg=new yt,Eh=new $e,Mo=new L,Fu=new un,Ch=new $e,Ou=new ti,oa=class extends Be{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Wu,this.bindMatrix=new $e,this.bindMatrixInverse=new $e,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new yn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Mo),this.boundingBox.expandByPoint(Mo)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new un),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Mo),this.boundingSphere.expandByPoint(Mo)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Fu.copy(this.boundingSphere),Fu.applyMatrix4(s),e.ray.intersectsSphere(Fu)!==!1&&(Ch.copy(s).invert(),Ou.copy(e.ray).applyMatrix4(Ch),!(this.boundingBox!==null&&Ou.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Ou)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new yt,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Wu?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Mp?this.bindMatrixInverse.copy(this.bindMatrix).invert():Le("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,s=this.geometry;Th.fromBufferAttribute(s.attributes.skinIndex,e),Ah.fromBufferAttribute(s.attributes.skinWeight,e),t.isVector4?(qr.copy(t),t.set(0,0,0,0)):(qr.set(...t,1),t.set(0,0,0)),qr.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let a=Ah.getComponent(r);if(a!==0){let o=Th.getComponent(r);Eh.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Xg.copy(qr).applyMatrix4(Eh),a)}}return t.isVector4&&(t.w=qr.w),t.applyMatrix4(this.bindMatrixInverse)}},dr=class extends xt{constructor(){super(),this.isBone=!0,this.type="Bone"}},hr=class extends qt{constructor(e=null,t=1,n=1,s,r,a,o,c,l=Ut,u=Ut,f,d){super(null,a,o,c,l,u,s,r,f,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Rh=new $e,qg=new $e,la=class i{constructor(e=[],t=[]){this.uuid=Pn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Le("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new $e)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new $e;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:qg;Rh.multiplyMatrices(o,t[r]),Rh.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new hr(t,e,e,Tn,wn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){let r=e.bones[n],a=t[r];a===void 0&&(Le("Skeleton: No bone found with UUID:",r),a=new dr),this.bones.push(a),this.boneInverses.push(new $e().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let a=t[s];e.bones.push(a.uuid);let o=n[s];e.boneInverses.push(o.toArray())}return e}},bi=class extends zt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Zs=new $e,Ph=new $e,wo=[],Ih=new yn,$g=new $e,$r=new Be,Yr=new un,bn=class extends Be{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new bi(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,$g)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new yn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Zs),Ih.copy(e.boundingBox).applyMatrix4(Zs),this.boundingBox.union(Ih)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new un),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Zs),Yr.copy(e.boundingSphere).applyMatrix4(Zs),this.boundingSphere.union(Yr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){let n=this.matrixWorld,s=this.count;if($r.geometry=this.geometry,$r.material=this.material,$r.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Yr.copy(this.boundingSphere),Yr.applyMatrix4(n),e.ray.intersectsSphere(Yr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Zs),Ph.multiplyMatrices(n,Zs),$r.matrixWorld=Ph,$r.raycast(e,wo);for(let a=0,o=wo.length;a<o;a++){let c=wo[a];c.instanceId=r,c.object=this,t.push(c)}wo.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new bi(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new hr(new Float32Array(s*this.count),s,this.count,bl,wn));let r=this.morphTexture.source.data.data,a=0;for(let l=0;l<n.length;l++)a+=n[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=s*e;return r[c]=o,r.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},ds=new un,Yg=new re(.5,.5),To=new L,pr=class{constructor(e=new rn,t=new rn,n=new rn,s=new rn,r=new rn,a=new rn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=kn,n=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],u=r[4],f=r[5],d=r[6],h=r[7],m=r[8],y=r[9],g=r[10],p=r[11],S=r[12],A=r[13],_=r[14],w=r[15];if(s[0].setComponents(l-a,h-u,p-m,w-S).normalize(),s[1].setComponents(l+a,h+u,p+m,w+S).normalize(),s[2].setComponents(l+o,h+f,p+y,w+A).normalize(),s[3].setComponents(l-o,h-f,p-y,w-A).normalize(),n)s[4].setComponents(c,d,g,_).normalize(),s[5].setComponents(l-c,h-d,p-g,w-_).normalize();else if(s[4].setComponents(l-c,h-d,p-g,w-_).normalize(),t===kn)s[5].setComponents(l+c,h+d,p+g,w+_).normalize();else if(t===ir)s[5].setComponents(c,d,g,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ds.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ds.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ds)}intersectsSprite(e){ds.center.set(0,0,0);let t=Yg.distanceTo(e.center);return ds.radius=.7071067811865476+t,ds.applyMatrix4(e.matrixWorld),this.intersectsSphere(ds)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(To.x=s.normal.x>0?e.max.x:e.min.x,To.y=s.normal.y>0?e.max.y:e.min.y,To.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(To)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Si=class extends fn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new be(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},$o=new L,Yo=new L,Lh=new $e,Kr=new ti,Ao=new un,Bu=new L,Dh=new L,Gn=class extends xt{constructor(e=new ft,t=new Si){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)$o.fromBufferAttribute(t,s-1),Yo.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=$o.distanceTo(Yo);e.setAttribute("lineDistance",new et(n,1))}else Le("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ao.copy(n.boundingSphere),Ao.applyMatrix4(s),Ao.radius+=r,e.ray.intersectsSphere(Ao)===!1)return;Lh.copy(s).invert(),Kr.copy(e.ray).applyMatrix4(Lh);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){let h=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let y=h,g=m-1;y<g;y+=l){let p=u.getX(y),S=u.getX(y+1),A=Eo(this,e,Kr,c,p,S,y);A&&t.push(A)}if(this.isLineLoop){let y=u.getX(m-1),g=u.getX(h),p=Eo(this,e,Kr,c,y,g,m-1);p&&t.push(p)}}else{let h=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let y=h,g=m-1;y<g;y+=l){let p=Eo(this,e,Kr,c,y,y+1,y);p&&t.push(p)}if(this.isLineLoop){let y=Eo(this,e,Kr,c,m-1,h,m-1);y&&t.push(y)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Eo(i,e,t,n,s,r,a){let o=i.geometry.attributes.position;if($o.fromBufferAttribute(o,s),Yo.fromBufferAttribute(o,r),t.distanceSqToSegment($o,Yo,Bu,Dh)>n)return;Bu.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(Bu);if(!(l<e.near||l>e.far))return{distance:l,point:Dh.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var Nh=new L,Uh=new L,_s=class extends Gn{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Nh.fromBufferAttribute(t,s),Uh.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Nh.distanceTo(Uh);e.setAttribute("lineDistance",new et(n,1))}else Le("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},vs=class extends Gn{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Xi=class extends fn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new be(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Fh=new $e,Ku=new ti,Co=new un,Ro=new L,ys=class extends xt{constructor(e=new ft,t=new Xi){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Co.copy(n.boundingSphere),Co.applyMatrix4(s),Co.radius+=r,e.ray.intersectsSphere(Co)===!1)return;Fh.copy(s).invert(),Ku.copy(e.ray).applyMatrix4(Fh);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,f=n.attributes.position;if(l!==null){let d=Math.max(0,a.start),h=Math.min(l.count,a.start+a.count);for(let m=d,y=h;m<y;m++){let g=l.getX(m);Ro.fromBufferAttribute(f,g),Oh(Ro,g,c,s,e,t,this)}}else{let d=Math.max(0,a.start),h=Math.min(f.count,a.start+a.count);for(let m=d,y=h;m<y;m++)Ro.fromBufferAttribute(f,m),Oh(Ro,m,c,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Oh(i,e,t,n,s,r,a){let o=Ku.distanceSqToPoint(i);if(o<t){let c=new L;Ku.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var ca=class extends qt{constructor(e=[],t=Ji,n,s,r,a,o,c,l,u){super(e,t,n,s,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var qi=class extends qt{constructor(e,t,n=qn,s,r,a,o=Ut,c=Ut,l,u=ei,f=1){if(u!==ei&&u!==Qi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:f};super(d,s,r,a,o,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ar(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Ko=class extends qi{constructor(e,t=qn,n=Ji,s,r,a=Ut,o=Ut,c,l=ei){let u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,t,n,s,r,a,o,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},ua=class extends qt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},In=class i extends ft{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],u=[],f=[],d=0,h=0;m("z","y","x",-1,-1,n,t,e,a,r,0),m("z","y","x",1,-1,n,t,-e,a,r,1),m("x","z","y",1,1,e,n,t,s,a,2),m("x","z","y",1,-1,e,n,-t,s,a,3),m("x","y","z",1,-1,e,t,n,s,r,4),m("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new et(l,3)),this.setAttribute("normal",new et(u,3)),this.setAttribute("uv",new et(f,2));function m(y,g,p,S,A,_,w,T,C,x,b){let E=_/C,D=w/x,F=_/2,N=w/2,P=T/2,U=C+1,z=x+1,V=0,j=0,q=new L;for(let J=0;J<z;J++){let ie=J*D-N;for(let De=0;De<U;De++){let Ae=De*E-F;q[y]=Ae*S,q[g]=ie*A,q[p]=P,l.push(q.x,q.y,q.z),q[y]=0,q[g]=0,q[p]=T>0?1:-1,u.push(q.x,q.y,q.z),f.push(De/C),f.push(1-J/x),V+=1}}for(let J=0;J<x;J++)for(let ie=0;ie<C;ie++){let De=d+ie+U*J,Ae=d+ie+U*(J+1),dt=d+(ie+1)+U*(J+1),st=d+(ie+1)+U*J;c.push(De,Ae,st),c.push(Ae,dt,st),j+=6}o.addGroup(h,j,b),h+=j,d+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var fa=class i extends ft{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);let r=[],a=[],o=[],c=[],l=new L,u=new re;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let f=0,d=3;f<=t;f++,d+=3){let h=n+f/t*s;l.x=e*Math.cos(h),l.y=e*Math.sin(h),a.push(l.x,l.y,l.z),o.push(0,0,1),u.x=(a[d]/e+1)/2,u.y=(a[d+1]/e+1)/2,c.push(u.x,u.y)}for(let f=1;f<=t;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new et(a,3)),this.setAttribute("normal",new et(o,3)),this.setAttribute("uv",new et(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},$i=class i extends ft{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let u=[],f=[],d=[],h=[],m=0,y=[],g=n/2,p=0;S(),a===!1&&(e>0&&A(!0),t>0&&A(!1)),this.setIndex(u),this.setAttribute("position",new et(f,3)),this.setAttribute("normal",new et(d,3)),this.setAttribute("uv",new et(h,2));function S(){let _=new L,w=new L,T=0,C=(t-e)/n;for(let x=0;x<=r;x++){let b=[],E=x/r,D=E*(t-e)+e;for(let F=0;F<=s;F++){let N=F/s,P=N*c+o,U=Math.sin(P),z=Math.cos(P);w.x=D*U,w.y=-E*n+g,w.z=D*z,f.push(w.x,w.y,w.z),_.set(U,C,z).normalize(),d.push(_.x,_.y,_.z),h.push(N,1-E),b.push(m++)}y.push(b)}for(let x=0;x<s;x++)for(let b=0;b<r;b++){let E=y[b][x],D=y[b+1][x],F=y[b+1][x+1],N=y[b][x+1];(e>0||b!==0)&&(u.push(E,D,N),T+=3),(t>0||b!==r-1)&&(u.push(D,F,N),T+=3)}l.addGroup(p,T,0),p+=T}function A(_){let w=m,T=new re,C=new L,x=0,b=_===!0?e:t,E=_===!0?1:-1;for(let F=1;F<=s;F++)f.push(0,g*E,0),d.push(0,E,0),h.push(.5,.5),m++;let D=m;for(let F=0;F<=s;F++){let P=F/s*c+o,U=Math.cos(P),z=Math.sin(P);C.x=b*z,C.y=g*E,C.z=b*U,f.push(C.x,C.y,C.z),d.push(0,E,0),T.x=U*.5+.5,T.y=z*.5*E+.5,h.push(T.x,T.y),m++}for(let F=0;F<s;F++){let N=w+F,P=D+F;_===!0?u.push(P,P+1,N):u.push(P+1,P,N),x+=3}l.addGroup(p,x,_===!0?1:2),p+=x}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},da=class i extends $i{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},ha=class i extends ft{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};let r=[],a=[];o(s),l(n),u(),this.setAttribute("position",new et(r,3)),this.setAttribute("normal",new et(r.slice(),3)),this.setAttribute("uv",new et(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(S){let A=new L,_=new L,w=new L;for(let T=0;T<t.length;T+=3)h(t[T+0],A),h(t[T+1],_),h(t[T+2],w),c(A,_,w,S)}function c(S,A,_,w){let T=w+1,C=[];for(let x=0;x<=T;x++){C[x]=[];let b=S.clone().lerp(_,x/T),E=A.clone().lerp(_,x/T),D=T-x;for(let F=0;F<=D;F++)F===0&&x===T?C[x][F]=b:C[x][F]=b.clone().lerp(E,F/D)}for(let x=0;x<T;x++)for(let b=0;b<2*(T-x)-1;b++){let E=Math.floor(b/2);b%2===0?(d(C[x][E+1]),d(C[x+1][E]),d(C[x][E])):(d(C[x][E+1]),d(C[x+1][E+1]),d(C[x+1][E]))}}function l(S){let A=new L;for(let _=0;_<r.length;_+=3)A.x=r[_+0],A.y=r[_+1],A.z=r[_+2],A.normalize().multiplyScalar(S),r[_+0]=A.x,r[_+1]=A.y,r[_+2]=A.z}function u(){let S=new L;for(let A=0;A<r.length;A+=3){S.x=r[A+0],S.y=r[A+1],S.z=r[A+2];let _=g(S)/2/Math.PI+.5,w=p(S)/Math.PI+.5;a.push(_,1-w)}m(),f()}function f(){for(let S=0;S<a.length;S+=6){let A=a[S+0],_=a[S+2],w=a[S+4],T=Math.max(A,_,w),C=Math.min(A,_,w);T>.9&&C<.1&&(A<.2&&(a[S+0]+=1),_<.2&&(a[S+2]+=1),w<.2&&(a[S+4]+=1))}}function d(S){r.push(S.x,S.y,S.z)}function h(S,A){let _=S*3;A.x=e[_+0],A.y=e[_+1],A.z=e[_+2]}function m(){let S=new L,A=new L,_=new L,w=new L,T=new re,C=new re,x=new re;for(let b=0,E=0;b<r.length;b+=9,E+=6){S.set(r[b+0],r[b+1],r[b+2]),A.set(r[b+3],r[b+4],r[b+5]),_.set(r[b+6],r[b+7],r[b+8]),T.set(a[E+0],a[E+1]),C.set(a[E+2],a[E+3]),x.set(a[E+4],a[E+5]),w.copy(S).add(A).add(_).divideScalar(3);let D=g(w);y(T,E+0,S,D),y(C,E+2,A,D),y(x,E+4,_,D)}}function y(S,A,_,w){w<0&&S.x===1&&(a[A]=S.x-1),_.x===0&&_.z===0&&(a[A]=w/2/Math.PI+.5)}function g(S){return Math.atan2(S.z,-S.x)}function p(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.detail)}},pa=class i extends ha{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var Sn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Le("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,a;t?a=t:a=e*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=n[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===a)return s/(r-1);let u=n[s],d=n[s+1]-u,h=(a-u)/d;return(s+h)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),c=t||(a.isVector2?new re:new L);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new L,s=[],r=[],a=[],o=new L,c=new $e;for(let h=0;h<=e;h++){let m=h/e;s[h]=this.getTangentAt(m,new L)}r[0]=new L,a[0]=new L;let l=Number.MAX_VALUE,u=Math.abs(s[0].x),f=Math.abs(s[0].y),d=Math.abs(s[0].z);u<=l&&(l=u,n.set(1,0,0)),f<=l&&(l=f,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let h=1;h<=e;h++){if(r[h]=r[h-1].clone(),a[h]=a[h-1].clone(),o.crossVectors(s[h-1],s[h]),o.length()>Number.EPSILON){o.normalize();let m=Math.acos(Je(s[h-1].dot(s[h]),-1,1));r[h].applyMatrix4(c.makeRotationAxis(o,m))}a[h].crossVectors(s[h],r[h])}if(t===!0){let h=Math.acos(Je(r[0].dot(r[e]),-1,1));h/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(h=-h);for(let m=1;m<=e;m++)r[m].applyMatrix4(c.makeRotationAxis(s[m],h*m)),a[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},mr=class extends Sn{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new re){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+e*r,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let u=Math.cos(this.aRotation),f=Math.sin(this.aRotation),d=c-this.aX,h=l-this.aY;c=d*u-h*f+this.aX,l=d*f+h*u+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Zo=class extends mr{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Lf(){let i=0,e=0,t=0,n=0;function s(r,a,o,c){i=r,e=o,t=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){s(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,u,f){let d=(a-r)/l-(o-r)/(l+u)+(o-a)/u,h=(o-a)/u-(c-a)/(u+f)+(c-o)/f;d*=u,h*=u,s(a,o,d,h)},calc:function(r){let a=r*r,o=a*r;return i+e*r+t*a+n*o}}}var Bh=new L,kh=new L,ku=new Lf,zu=new Lf,Gu=new Lf,jo=class extends Sn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new L){let n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e,o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,u;this.closed||o>0?l=s[(o-1)%r]:(kh.subVectors(s[0],s[1]).add(s[0]),l=kh);let f=s[o%r],d=s[(o+1)%r];if(this.closed||o+2<r?u=s[(o+2)%r]:(Bh.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=Bh),this.curveType==="centripetal"||this.curveType==="chordal"){let h=this.curveType==="chordal"?.5:.25,m=Math.pow(l.distanceToSquared(f),h),y=Math.pow(f.distanceToSquared(d),h),g=Math.pow(d.distanceToSquared(u),h);y<1e-4&&(y=1),m<1e-4&&(m=y),g<1e-4&&(g=y),ku.initNonuniformCatmullRom(l.x,f.x,d.x,u.x,m,y,g),zu.initNonuniformCatmullRom(l.y,f.y,d.y,u.y,m,y,g),Gu.initNonuniformCatmullRom(l.z,f.z,d.z,u.z,m,y,g)}else this.curveType==="catmullrom"&&(ku.initCatmullRom(l.x,f.x,d.x,u.x,this.tension),zu.initCatmullRom(l.y,f.y,d.y,u.y,this.tension),Gu.initCatmullRom(l.z,f.z,d.z,u.z,this.tension));return n.set(ku.calc(c),zu.calc(c),Gu.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new L().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function zh(i,e,t,n,s){let r=(n-e)*.5,a=(s-t)*.5,o=i*i,c=i*o;return(2*t-2*n+r+a)*c+(-3*t+3*n-2*r-a)*o+r*i+t}function Kg(i,e){let t=1-i;return t*t*e}function Zg(i,e){return 2*(1-i)*i*e}function jg(i,e){return i*i*e}function Qr(i,e,t,n){return Kg(i,e)+Zg(i,t)+jg(i,n)}function Jg(i,e){let t=1-i;return t*t*t*e}function Qg(i,e){let t=1-i;return 3*t*t*i*e}function ex(i,e){return 3*(1-i)*i*i*e}function tx(i,e){return i*i*i*e}function ea(i,e,t,n,s){return Jg(i,e)+Qg(i,t)+ex(i,n)+tx(i,s)}var ma=class extends Sn{constructor(e=new re,t=new re,n=new re,s=new re){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new re){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(ea(e,s.x,r.x,a.x,o.x),ea(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Jo=class extends Sn{constructor(e=new L,t=new L,n=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new L){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(ea(e,s.x,r.x,a.x,o.x),ea(e,s.y,r.y,a.y,o.y),ea(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ga=class extends Sn{constructor(e=new re,t=new re){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new re){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new re){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Qo=class extends Sn{constructor(e=new L,t=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new L){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new L){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},xa=class extends Sn{constructor(e=new re,t=new re,n=new re){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new re){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Qr(e,s.x,r.x,a.x),Qr(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},el=class extends Sn{constructor(e=new L,t=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new L){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Qr(e,s.x,r.x,a.x),Qr(e,s.y,r.y,a.y),Qr(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},_a=class extends Sn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new re){let n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,c=s[a===0?a:a-1],l=s[a],u=s[a>s.length-2?s.length-1:a+1],f=s[a>s.length-3?s.length-1:a+2];return n.set(zh(o,c.x,l.x,u.x,f.x),zh(o,c.y,l.y,u.y,f.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new re().fromArray(s))}return this}},Zu=Object.freeze({__proto__:null,ArcCurve:Zo,CatmullRomCurve3:jo,CubicBezierCurve:ma,CubicBezierCurve3:Jo,EllipseCurve:mr,LineCurve:ga,LineCurve3:Qo,QuadraticBezierCurve:xa,QuadraticBezierCurve3:el,SplineCurve:_a}),tl=class extends Sn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Zu[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){let u=c[l];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new Zu[s.type]().fromJSON(s))}return this}},va=class extends tl{constructor(e){super(),this.type="Path",this.currentPoint=new re,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new ga(this.currentPoint.clone(),new re(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new xa(this.currentPoint.clone(),new re(e,t),new re(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){let o=new ma(this.currentPoint.clone(),new re(e,t),new re(n,s),new re(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new _a(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,o,c){let l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+l,t+u,n,s,r,a,o,c),this}absellipse(e,t,n,s,r,a,o,c){let l=new mr(e,t,n,s,r,a,o,c);if(this.curves.length>0){let f=l.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(l);let u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},ni=class extends va{constructor(e){super(e),this.uuid=Pn(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(new va().fromJSON(s))}return this}};function nx(i,e,t=2){let n=e&&e.length,s=n?e[0]*t:i.length,r=kp(i,0,s,t,!0),a=[];if(!r||r.next===r.prev)return a;let o,c,l;if(n&&(r=ox(i,e,r,t)),i.length>80*t){o=i[0],c=i[1];let u=o,f=c;for(let d=t;d<s;d+=t){let h=i[d],m=i[d+1];h<o&&(o=h),m<c&&(c=m),h>u&&(u=h),m>f&&(f=m)}l=Math.max(u-o,f-c),l=l!==0?32767/l:0}return ya(r,a,t,o,c,l,0),a}function kp(i,e,t,n,s){let r;if(s===_x(i,e,t,n)>0)for(let a=e;a<t;a+=n)r=Gh(a/n|0,i[a],i[a+1],r);else for(let a=t-n;a>=e;a-=n)r=Gh(a/n|0,i[a],i[a+1],r);return r&&gr(r,r.next)&&(Sa(r),r=r.next),r}function bs(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(gr(t,t.next)||Lt(t.prev,t,t.next)===0)){if(Sa(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function ya(i,e,t,n,s,r,a){if(!i)return;!a&&r&&dx(i,n,s,r);let o=i;for(;i.prev!==i.next;){let c=i.prev,l=i.next;if(r?sx(i,n,s,r):ix(i)){e.push(c.i,i.i,l.i),Sa(i),i=l.next,o=l.next;continue}if(i=l,i===o){a?a===1?(i=rx(bs(i),e),ya(i,e,t,n,s,r,2)):a===2&&ax(i,e,t,n,s,r):ya(bs(i),e,t,n,s,r,1);break}}}function ix(i){let e=i.prev,t=i,n=i.next;if(Lt(e,t,n)>=0)return!1;let s=e.x,r=t.x,a=n.x,o=e.y,c=t.y,l=n.y,u=Math.min(s,r,a),f=Math.min(o,c,l),d=Math.max(s,r,a),h=Math.max(o,c,l),m=n.next;for(;m!==e;){if(m.x>=u&&m.x<=d&&m.y>=f&&m.y<=h&&Zr(s,o,r,c,a,l,m.x,m.y)&&Lt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function sx(i,e,t,n){let s=i.prev,r=i,a=i.next;if(Lt(s,r,a)>=0)return!1;let o=s.x,c=r.x,l=a.x,u=s.y,f=r.y,d=a.y,h=Math.min(o,c,l),m=Math.min(u,f,d),y=Math.max(o,c,l),g=Math.max(u,f,d),p=ju(h,m,e,t,n),S=ju(y,g,e,t,n),A=i.prevZ,_=i.nextZ;for(;A&&A.z>=p&&_&&_.z<=S;){if(A.x>=h&&A.x<=y&&A.y>=m&&A.y<=g&&A!==s&&A!==a&&Zr(o,u,c,f,l,d,A.x,A.y)&&Lt(A.prev,A,A.next)>=0||(A=A.prevZ,_.x>=h&&_.x<=y&&_.y>=m&&_.y<=g&&_!==s&&_!==a&&Zr(o,u,c,f,l,d,_.x,_.y)&&Lt(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;A&&A.z>=p;){if(A.x>=h&&A.x<=y&&A.y>=m&&A.y<=g&&A!==s&&A!==a&&Zr(o,u,c,f,l,d,A.x,A.y)&&Lt(A.prev,A,A.next)>=0)return!1;A=A.prevZ}for(;_&&_.z<=S;){if(_.x>=h&&_.x<=y&&_.y>=m&&_.y<=g&&_!==s&&_!==a&&Zr(o,u,c,f,l,d,_.x,_.y)&&Lt(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function rx(i,e){let t=i;do{let n=t.prev,s=t.next.next;!gr(n,s)&&Gp(n,t,t.next,s)&&ba(n,s)&&ba(s,n)&&(e.push(n.i,t.i,s.i),Sa(t),Sa(t.next),t=i=s),t=t.next}while(t!==i);return bs(t)}function ax(i,e,t,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&mx(a,o)){let c=Vp(a,o);a=bs(a,a.next),c=bs(c,c.next),ya(a,e,t,n,s,r,0),ya(c,e,t,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function ox(i,e,t,n){let s=[];for(let r=0,a=e.length;r<a;r++){let o=e[r]*n,c=r<a-1?e[r+1]*n:i.length,l=kp(i,o,c,n,!1);l===l.next&&(l.steiner=!0),s.push(px(l))}s.sort(lx);for(let r=0;r<s.length;r++)t=cx(s[r],t);return t}function lx(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function cx(i,e){let t=ux(i,e);if(!t)return e;let n=Vp(t,i);return bs(n,n.next),bs(t,t.next)}function ux(i,e){let t=e,n=i.x,s=i.y,r=-1/0,a;if(gr(i,t))return t;do{if(gr(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let f=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=n&&f>r&&(r=f,a=t.x<t.next.x?t:t.next,f===n))return a}t=t.next}while(t!==e);if(!a)return null;let o=a,c=a.x,l=a.y,u=1/0;t=a;do{if(n>=t.x&&t.x>=c&&n!==t.x&&zp(s<l?n:r,s,c,l,s<l?r:n,s,t.x,t.y)){let f=Math.abs(s-t.y)/(n-t.x);ba(t,i)&&(f<u||f===u&&(t.x>a.x||t.x===a.x&&fx(a,t)))&&(a=t,u=f)}t=t.next}while(t!==o);return a}function fx(i,e){return Lt(i.prev,i,e.prev)<0&&Lt(e.next,i,i.next)<0}function dx(i,e,t,n){let s=i;do s.z===0&&(s.z=ju(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,hx(s)}function hx(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let a=n,o=0;for(let l=0;l<t&&(o++,a=a.nextZ,!!a);l++);let c=t;for(;o>0||c>0&&a;)o!==0&&(c===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,t*=2}while(e>1);return i}function ju(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function px(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function zp(i,e,t,n,s,r,a,o){return(s-a)*(e-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(n-o)}function Zr(i,e,t,n,s,r,a,o){return!(i===a&&e===o)&&zp(i,e,t,n,s,r,a,o)}function mx(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!gx(i,e)&&(ba(i,e)&&ba(e,i)&&xx(i,e)&&(Lt(i.prev,i,e.prev)||Lt(i,e.prev,e))||gr(i,e)&&Lt(i.prev,i,i.next)>0&&Lt(e.prev,e,e.next)>0)}function Lt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function gr(i,e){return i.x===e.x&&i.y===e.y}function Gp(i,e,t,n){let s=Io(Lt(i,e,t)),r=Io(Lt(i,e,n)),a=Io(Lt(t,n,i)),o=Io(Lt(t,n,e));return!!(s!==r&&a!==o||s===0&&Po(i,t,e)||r===0&&Po(i,n,e)||a===0&&Po(t,i,n)||o===0&&Po(t,e,n))}function Po(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Io(i){return i>0?1:i<0?-1:0}function gx(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Gp(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function ba(i,e){return Lt(i.prev,i,i.next)<0?Lt(i,e,i.next)>=0&&Lt(i,i.prev,e)>=0:Lt(i,e,i.prev)<0||Lt(i,i.next,e)<0}function xx(i,e){let t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Vp(i,e){let t=Ju(i.i,i.x,i.y),n=Ju(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Gh(i,e,t,n){let s=Ju(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Sa(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Ju(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function _x(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}var Qu=class{static triangulate(e,t,n=2){return nx(e,t,n)}},hs=class i{static area(e){let t=e.length,n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],s=[],r=[];Vh(e),Hh(n,e);let a=e.length;t.forEach(Vh);for(let c=0;c<t.length;c++)s.push(a),a+=t[c].length,Hh(n,t[c]);let o=Qu.triangulate(n,s);for(let c=0;c<o.length;c+=3)r.push(o.slice(c,c+3));return r}};function Vh(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Hh(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var Mi=class i extends ft{constructor(e=new ni([new re(.5,.5),new re(-.5,.5),new re(-.5,-.5),new re(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,s=[],r=[];for(let o=0,c=e.length;o<c;o++){let l=e[o];a(l)}this.setAttribute("position",new et(s,3)),this.setAttribute("uv",new et(r,2)),this.computeVertexNormals();function a(o){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,f=t.depth!==void 0?t.depth:1,d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,h=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:h-.1,y=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3,p=t.extrudePath,S=t.UVGenerator!==void 0?t.UVGenerator:vx,A,_=!1,w,T,C,x;if(p){A=p.getSpacedPoints(u),_=!0,d=!1;let ne=p.isCatmullRomCurve3?p.closed:!1;w=p.computeFrenetFrames(u,ne),T=new L,C=new L,x=new L}d||(g=0,h=0,m=0,y=0);let b=o.extractPoints(l),E=b.shape,D=b.holes;if(!hs.isClockWise(E)){E=E.reverse();for(let ne=0,ae=D.length;ne<ae;ne++){let oe=D[ne];hs.isClockWise(oe)&&(D[ne]=oe.reverse())}}function N(ne){let oe=10000000000000001e-36,le=ne[0];for(let fe=1;fe<=ne.length;fe++){let ze=fe%ne.length,ke=ne[ze],qe=ke.x-le.x,Ke=ke.y-le.y,O=qe*qe+Ke*Ke,ht=Math.max(Math.abs(ke.x),Math.abs(ke.y),Math.abs(le.x),Math.abs(le.y)),rt=oe*ht*ht;if(O<=rt){ne.splice(ze,1),fe--;continue}le=ke}}N(E),D.forEach(N);let P=D.length,U=E;for(let ne=0;ne<P;ne++){let ae=D[ne];E=E.concat(ae)}function z(ne,ae,oe){return ae||Ve("ExtrudeGeometry: vec does not exist"),ne.clone().addScaledVector(ae,oe)}let V=E.length;function j(ne,ae,oe){let le,fe,ze,ke=ne.x-ae.x,qe=ne.y-ae.y,Ke=oe.x-ne.x,O=oe.y-ne.y,ht=ke*ke+qe*qe,rt=ke*O-qe*Ke;if(Math.abs(rt)>Number.EPSILON){let R=Math.sqrt(ht),v=Math.sqrt(Ke*Ke+O*O),G=ae.x-qe/R,X=ae.y+ke/R,Y=oe.x-O/v,ce=oe.y+Ke/v,ue=((Y-G)*O-(ce-X)*Ke)/(ke*O-qe*Ke);le=G+ke*ue-ne.x,fe=X+qe*ue-ne.y;let K=le*le+fe*fe;if(K<=2)return new re(le,fe);ze=Math.sqrt(K/2)}else{let R=!1;ke>Number.EPSILON?Ke>Number.EPSILON&&(R=!0):ke<-Number.EPSILON?Ke<-Number.EPSILON&&(R=!0):Math.sign(qe)===Math.sign(O)&&(R=!0),R?(le=-qe,fe=ke,ze=Math.sqrt(ht)):(le=ke,fe=qe,ze=Math.sqrt(ht/2))}return new re(le/ze,fe/ze)}let q=[];for(let ne=0,ae=U.length,oe=ae-1,le=ne+1;ne<ae;ne++,oe++,le++)oe===ae&&(oe=0),le===ae&&(le=0),q[ne]=j(U[ne],U[oe],U[le]);let J=[],ie,De=q.concat();for(let ne=0,ae=P;ne<ae;ne++){let oe=D[ne];ie=[];for(let le=0,fe=oe.length,ze=fe-1,ke=le+1;le<fe;le++,ze++,ke++)ze===fe&&(ze=0),ke===fe&&(ke=0),ie[le]=j(oe[le],oe[ze],oe[ke]);J.push(ie),De=De.concat(ie)}let Ae;if(g===0)Ae=hs.triangulateShape(U,D);else{let ne=[],ae=[];for(let oe=0;oe<g;oe++){let le=oe/g,fe=h*Math.cos(le*Math.PI/2),ze=m*Math.sin(le*Math.PI/2)+y;for(let ke=0,qe=U.length;ke<qe;ke++){let Ke=z(U[ke],q[ke],ze);_e(Ke.x,Ke.y,-fe),le===0&&ne.push(Ke)}for(let ke=0,qe=P;ke<qe;ke++){let Ke=D[ke];ie=J[ke];let O=[];for(let ht=0,rt=Ke.length;ht<rt;ht++){let R=z(Ke[ht],ie[ht],ze);_e(R.x,R.y,-fe),le===0&&O.push(R)}le===0&&ae.push(O)}}Ae=hs.triangulateShape(ne,ae)}let dt=Ae.length,st=m+y;for(let ne=0;ne<V;ne++){let ae=d?z(E[ne],De[ne],st):E[ne];_?(C.copy(w.normals[0]).multiplyScalar(ae.x),T.copy(w.binormals[0]).multiplyScalar(ae.y),x.copy(A[0]).add(C).add(T),_e(x.x,x.y,x.z)):_e(ae.x,ae.y,0)}for(let ne=1;ne<=u;ne++)for(let ae=0;ae<V;ae++){let oe=d?z(E[ae],De[ae],st):E[ae];_?(C.copy(w.normals[ne]).multiplyScalar(oe.x),T.copy(w.binormals[ne]).multiplyScalar(oe.y),x.copy(A[ne]).add(C).add(T),_e(x.x,x.y,x.z)):_e(oe.x,oe.y,f/u*ne)}for(let ne=g-1;ne>=0;ne--){let ae=ne/g,oe=h*Math.cos(ae*Math.PI/2),le=m*Math.sin(ae*Math.PI/2)+y;for(let fe=0,ze=U.length;fe<ze;fe++){let ke=z(U[fe],q[fe],le);_e(ke.x,ke.y,f+oe)}for(let fe=0,ze=D.length;fe<ze;fe++){let ke=D[fe];ie=J[fe];for(let qe=0,Ke=ke.length;qe<Ke;qe++){let O=z(ke[qe],ie[qe],le);_?_e(O.x,O.y+A[u-1].y,A[u-1].x+oe):_e(O.x,O.y,f+oe)}}}ct(),Z();function ct(){let ne=s.length/3;if(d){let ae=0,oe=V*ae;for(let le=0;le<dt;le++){let fe=Ae[le];We(fe[2]+oe,fe[1]+oe,fe[0]+oe)}ae=u+g*2,oe=V*ae;for(let le=0;le<dt;le++){let fe=Ae[le];We(fe[0]+oe,fe[1]+oe,fe[2]+oe)}}else{for(let ae=0;ae<dt;ae++){let oe=Ae[ae];We(oe[2],oe[1],oe[0])}for(let ae=0;ae<dt;ae++){let oe=Ae[ae];We(oe[0]+V*u,oe[1]+V*u,oe[2]+V*u)}}n.addGroup(ne,s.length/3-ne,0)}function Z(){let ne=s.length/3,ae=0;te(U,ae),ae+=U.length;for(let oe=0,le=D.length;oe<le;oe++){let fe=D[oe];te(fe,ae),ae+=fe.length}n.addGroup(ne,s.length/3-ne,1)}function te(ne,ae){let oe=ne.length;for(;--oe>=0;){let le=oe,fe=oe-1;fe<0&&(fe=ne.length-1);for(let ze=0,ke=u+g*2;ze<ke;ze++){let qe=V*ze,Ke=V*(ze+1),O=ae+le+qe,ht=ae+fe+qe,rt=ae+fe+Ke,R=ae+le+Ke;Me(O,ht,rt,R)}}}function _e(ne,ae,oe){c.push(ne),c.push(ae),c.push(oe)}function We(ne,ae,oe){Xe(ne),Xe(ae),Xe(oe);let le=s.length/3,fe=S.generateTopUV(n,s,le-3,le-2,le-1);_t(fe[0]),_t(fe[1]),_t(fe[2])}function Me(ne,ae,oe,le){Xe(ne),Xe(ae),Xe(le),Xe(ae),Xe(oe),Xe(le);let fe=s.length/3,ze=S.generateSideWallUV(n,s,fe-6,fe-3,fe-2,fe-1);_t(ze[0]),_t(ze[1]),_t(ze[3]),_t(ze[1]),_t(ze[2]),_t(ze[3])}function Xe(ne){s.push(c[ne*3+0]),s.push(c[ne*3+1]),s.push(c[ne*3+2])}function _t(ne){r.push(ne.x),r.push(ne.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return yx(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,a=e.shapes.length;r<a;r++){let o=t[e.shapes[r]];n.push(o)}let s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new Zu[s.type]().fromJSON(s)),new i(n,e.options)}},vx={generateTopUV:function(i,e,t,n,s){let r=e[t*3],a=e[t*3+1],o=e[n*3],c=e[n*3+1],l=e[s*3],u=e[s*3+1];return[new re(r,a),new re(o,c),new re(l,u)]},generateSideWallUV:function(i,e,t,n,s,r){let a=e[t*3],o=e[t*3+1],c=e[t*3+2],l=e[n*3],u=e[n*3+1],f=e[n*3+2],d=e[s*3],h=e[s*3+1],m=e[s*3+2],y=e[r*3],g=e[r*3+1],p=e[r*3+2];return Math.abs(o-u)<Math.abs(a-l)?[new re(a,1-c),new re(l,1-f),new re(d,1-m),new re(y,1-p)]:[new re(o,1-c),new re(u,1-f),new re(h,1-m),new re(g,1-p)]}};function yx(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var ii=class i extends ha{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var Vn=class i extends ft{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,u=c+1,f=e/o,d=t/c,h=[],m=[],y=[],g=[];for(let p=0;p<u;p++){let S=p*d-a;for(let A=0;A<l;A++){let _=A*f-r;m.push(_,-S,0),y.push(0,0,1),g.push(A/o),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let S=0;S<o;S++){let A=S+l*p,_=S+l*(p+1),w=S+1+l*(p+1),T=S+1+l*p;h.push(A,_,T),h.push(_,w,T)}this.setIndex(h),this.setAttribute("position",new et(m,3)),this.setAttribute("normal",new et(y,3)),this.setAttribute("uv",new et(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var xr=class i extends ft{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,u=[],f=new L,d=new L,h=[],m=[],y=[],g=[];for(let p=0;p<=n;p++){let S=[],A=p/n,_=a+A*o,w=e*Math.cos(_),T=Math.sqrt(e*e-w*w),C=0;p===0&&a===0?C=.5/t:p===n&&c===Math.PI&&(C=-.5/t);for(let x=0;x<=t;x++){let b=x/t,E=s+b*r;f.x=-T*Math.cos(E),f.y=w,f.z=T*Math.sin(E),m.push(f.x,f.y,f.z),d.copy(f).normalize(),y.push(d.x,d.y,d.z),g.push(b+C,1-A),S.push(l++)}u.push(S)}for(let p=0;p<n;p++)for(let S=0;S<t;S++){let A=u[p][S+1],_=u[p][S],w=u[p+1][S],T=u[p+1][S+1];(p!==0||a>0)&&h.push(A,_,T),(p!==n-1||c<Math.PI)&&h.push(_,w,T)}this.setIndex(h),this.setAttribute("position",new et(m,3)),this.setAttribute("normal",new et(y,3)),this.setAttribute("uv",new et(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};function Cs(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(Wh(s))s.isRenderTargetTexture?(Le("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(Wh(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function tn(i){let e={};for(let t=0;t<i.length;t++){let n=Cs(i[t]);for(let s in n)e[s]=n[s]}return e}function Wh(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function bx(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Df(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:nt.workingColorSpace}var Hp={clone:Cs,merge:tn},Sx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Mx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Mn=class extends fn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Sx,this.fragmentShader=Mx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Cs(e.uniforms),this.uniformsGroups=bx(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new be().setHex(s.value);break;case"v2":this.uniforms[n].value=new re().fromArray(s.value);break;case"v3":this.uniforms[n].value=new L().fromArray(s.value);break;case"v4":this.uniforms[n].value=new yt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Ye().fromArray(s.value);break;case"m4":this.uniforms[n].value=new $e().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},nl=class extends Mn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},on=class extends fn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new be(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=tc,this.normalScale=new re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},dn=class extends on{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new re(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Je(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new be(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new be(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new be(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var il=class extends fn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Tp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},sl=class extends fn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Vi(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Fo(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}function wx(i){function e(s,r){return i[s]-i[r]}let t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function Xh(i,e,t){let n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){let o=t[r]*e;for(let c=0;c!==e;++c)s[a++]=i[o+c]}return s}function Tx(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=i[s++];while(r!==void 0)}var si=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},rl=class extends si{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:qu,endingEnd:qu}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case $u:r=e,o=2*t-n;break;case Yu:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case $u:a=e,c=2*n-t;break;case Yu:a=1,c=n+s[1]-s[0];break;default:a=e-1,c=t}let l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=this._offsetPrev,f=this._offsetNext,d=this._weightPrev,h=this._weightNext,m=(n-t)/(s-t),y=m*m,g=y*m,p=-d*g+2*d*y-d*m,S=(1+d)*g+(-1.5-2*d)*y+(-.5+d)*m+1,A=(-1-h)*g+(1.5+h)*y+.5*m,_=h*g-h*y;for(let w=0;w!==o;++w)r[w]=p*a[u+w]+S*a[l+w]+A*a[c+w]+_*a[f+w];return r}},al=class extends si{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=(n-t)/(s-t),f=1-u;for(let d=0;d!==o;++d)r[d]=a[l+d]*f+a[c+d]*u;return r}},ol=class extends si{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},ll=class extends si{interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=this.inTangents,f=this.outTangents;if(!u||!f){let m=(n-t)/(s-t),y=1-m;for(let g=0;g!==o;++g)r[g]=a[l+g]*y+a[c+g]*m;return r}let d=o*2,h=e-1;for(let m=0;m!==o;++m){let y=a[l+m],g=a[c+m],p=h*d+m*2,S=f[p],A=f[p+1],_=e*d+m*2,w=u[_],T=u[_+1],C=Ex(n,t,S,w,s);r[m]=Wp(C,y,A,T,g)}return r}};function Wp(i,e,t,n,s){let r=1-i;return r*r*r*e+3*r*r*i*t+3*r*i*i*n+i*i*i*s}function Ax(i,e,t,n,s){let r=1-i;return 3*r*r*(t-e)+6*r*i*(n-t)+3*i*i*(s-n)}function Ex(i,e,t,n,s){let r=(i-e)/(s-e);for(let a=0;a<8;a++){let o=Wp(r,e,t,n,s)-i;if(Math.abs(o)<1e-10)break;let c=Ax(r,e,t,n,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-o/c))}return r}var hn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Vi(t,this.TimeBufferType),this.values=Vi(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Vi(e.times,Array),values:Vi(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s),Fo(e.settings)&&(n.settings={inTangents:Vi(e.settings.inTangents,Array),outTangents:Vi(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new ol(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new al(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new rl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new ll(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case ms:t=this.InterpolantFactoryMethodDiscrete;break;case gs:t=this.InterpolantFactoryMethodLinear;break;case No:t=this.InterpolantFactoryMethodSmooth;break;case Xu:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Le("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ms;case this.InterpolantFactoryMethodLinear:return gs;case this.InterpolantFactoryMethodSmooth:return No;case this.InterpolantFactoryMethodBezier:return Xu}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e;Fo(this.settings)&&(qh(this.settings.inTangents,e),qh(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ve("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Ve("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){Ve("KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){Ve("KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(s!==void 0&&fg(s))for(let o=0,c=s.length;o!==c;++o){let l=s[o];if(isNaN(l)){Ve("KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===No,r=e.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=e[o],u=e[o+1];if(l!==u&&(o!==1||l!==e[0]))if(s)c=!0;else{let f=o*n,d=f-n,h=f+n;for(let m=0;m!==n;++m){let y=t[f+m];if(y!==t[d+m]||y!==t[h+m]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let f=o*n,d=a*n;for(let h=0;h!==n;++h)t[d+h]=t[f+h]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,Fo(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function qh(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}hn.prototype.ValueTypeName="";hn.prototype.TimeBufferType=Float32Array;hn.prototype.ValueBufferType=Float32Array;hn.prototype.DefaultInterpolation=gs;var wi=class extends hn{constructor(e,t,n){super(e,t,n)}};wi.prototype.ValueTypeName="bool";wi.prototype.ValueBufferType=Array;wi.prototype.DefaultInterpolation=ms;wi.prototype.InterpolantFactoryMethodLinear=void 0;wi.prototype.InterpolantFactoryMethodSmooth=void 0;var Ma=class extends hn{constructor(e,t,n,s){super(e,t,n,s)}};Ma.prototype.ValueTypeName="color";var Ti=class extends hn{constructor(e,t,n,s){super(e,t,n,s)}};Ti.prototype.ValueTypeName="number";var cl=class extends si{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(s-t),l=e*o;for(let u=l+o;l!==u;l+=4)jt.slerpFlat(r,0,a,l-o,a,l,c);return r}},Ai=class extends hn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new cl(this.times,this.values,this.getValueSize(),e)}};Ai.prototype.ValueTypeName="quaternion";Ai.prototype.InterpolantFactoryMethodSmooth=void 0;var Ei=class extends hn{constructor(e,t,n){super(e,t,n)}};Ei.prototype.ValueTypeName="string";Ei.prototype.ValueBufferType=Array;Ei.prototype.DefaultInterpolation=ms;Ei.prototype.InterpolantFactoryMethodLinear=void 0;Ei.prototype.InterpolantFactoryMethodSmooth=void 0;var Yi=class extends hn{constructor(e,t,n,s){super(e,t,n,s)}};Yi.prototype.ValueTypeName="vector";var wa=class{constructor(e="",t=-1,n=[],s=wp){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=Pn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,s=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(Rx(n[a]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(hn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){let r=t.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);let u=wx(c);c=Xh(c,1,u),l=Xh(l,1,u),!s&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new Ti(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){let l=e[o],u=l.name.match(r);if(u&&u.length>1){let f=u[1],d=s[f];d||(s[f]=d=[]),d.push(l)}}let a=[];for(let o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,n));return a}resetDuration(){let e=this.tracks,t=0;for(let n=0,s=e.length;n!==s;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function Cx(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Ti;case"vector":case"vector2":case"vector3":case"vector4":return Yi;case"color":return Ma;case"quaternion":return Ai;case"bool":case"boolean":return wi;case"string":return Ei}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function Rx(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=Cx(i.type);if(i.times===void 0){let n=[],s=[];Tx(i.keys,n,s,"value"),i.times=n,i.values=s}let t;return e.parse!==void 0?t=e.parse(i):t=new e(i.name,i.times,i.values,i.interpolation),Fo(i.settings)&&(t.settings={inTangents:Vi(i.settings.inTangents,Float32Array),outTangents:Vi(i.settings.outTangents,Float32Array)}),t}var Qn={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&($h(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!$h(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function $h(i){try{let e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var ul=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,f){return l.push(u,f),this},this.removeHandler=function(u){let f=l.indexOf(u);return f!==-1&&l.splice(f,2),this},this.getHandler=function(u){for(let f=0,d=l.length;f<d;f+=2){let h=l[f],m=l[f+1];if(h.global&&(h.lastIndex=0),h.test(u))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Xp=new ul,ri=class{constructor(e){this.manager=e!==void 0?e:Xp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};ri.DEFAULT_MATERIAL_NAME="__DEFAULT";var _i={},ef=class extends Error{constructor(e,t){super(e),this.response=t}},_r=class extends ri{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=Qn.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(_i[e]!==void 0){_i[e].push({onLoad:t,onProgress:n,onError:s});return}_i[e]=[],_i[e].push({onLoad:t,onProgress:n,onError:s});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&Le("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let u=_i[e],f=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),h=d?parseInt(d):0,m=h!==0,y=0,g=new ReadableStream({start(p){S();function S(){f.read().then(({done:A,value:_})=>{if(A)p.close();else{y+=_.byteLength;let w=new ProgressEvent("progress",{lengthComputable:m,loaded:y,total:h});for(let T=0,C=u.length;T<C;T++){let x=u[T];x.onProgress&&x.onProgress(w)}p.enqueue(_),S()}},A=>{p.error(A)})}}});return new Response(g)}else throw new ef(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return l.json();default:if(o==="")return l.text();{let f=/charset="?([^;"\s]*)"?/i.exec(o),d=f&&f[1]?f[1].toLowerCase():void 0,h=new TextDecoder(d);return l.arrayBuffer().then(m=>h.decode(m))}}}).then(l=>{Qn.add(`file:${e}`,l);let u=_i[e];delete _i[e];for(let f=0,d=u.length;f<d;f++){let h=u[f];h.onLoad&&h.onLoad(l)}}).catch(l=>{let u=_i[e];if(u===void 0)throw this.manager.itemError(e),l;delete _i[e];for(let f=0,d=u.length;f<d;f++){let h=u[f];h.onError&&h.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var js=new WeakMap,fl=class extends ri{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=Qn.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let f=js.get(a);f===void 0&&(f=[],js.set(a,f)),f.push({onLoad:t,onError:s})}return a}let o=sr("img");function c(){u(),t&&t(this);let f=js.get(this)||[];for(let d=0;d<f.length;d++){let h=f[d];h.onLoad&&h.onLoad(this)}js.delete(this),r.manager.itemEnd(e)}function l(f){u(),s&&s(f),Qn.remove(`image:${e}`);let d=js.get(this)||[];for(let h=0;h<d.length;h++){let m=d[h];m.onError&&m.onError(f)}js.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Qn.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}};var Ta=class extends ri{constructor(e){super(e)}load(e,t,n,s){let r=new qt,a=new fl(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}},Ss=class extends xt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new be(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},vr=class extends Ss{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(xt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new be(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Vu=new $e,Yh=new L,Kh=new L,yr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new re(512,512),this.mapType=mn,this.map=null,this.mapPass=null,this.matrix=new $e,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new pr,this._frameExtents=new re(1,1),this._viewportCount=1,this._viewports=[new yt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Yh.setFromMatrixPosition(e.matrixWorld),t.position.copy(Yh),Kh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Kh),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){Vu.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Vu,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;e.coordinateSystem===ir||e.reversedDepth?t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),t.multiply(Vu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Lo=new L,Do=new jt,Jn=new L,Aa=class extends xt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new $e,this.projectionMatrix=new $e,this.projectionMatrixInverse=new $e,this.coordinateSystem=kn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Lo,Do,Jn),Jn.x===1&&Jn.y===1&&Jn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Lo,Do,Jn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Lo,Do,Jn),Jn.x===1&&Jn.y===1&&Jn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Lo,Do,Jn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Gi=new L,Zh=new re,jh=new re,Xt=class extends Aa{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=xs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(jr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return xs*2*Math.atan(Math.tan(jr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Gi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Gi.x,Gi.y).multiplyScalar(-e/Gi.z),Gi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Gi.x,Gi.y).multiplyScalar(-e/Gi.z)}getViewSize(e,t){return this.getViewBounds(e,Zh,jh),t.subVectors(jh,Zh)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(jr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},tf=class extends yr{constructor(){super(new Xt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=xs*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},Ea=class extends Ss{constructor(e,t,n=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(xt.DEFAULT_UP),this.updateMatrix(),this.target=new xt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new tf}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},nf=class extends yr{constructor(){super(new Xt(90,1,.5,500)),this.isPointLightShadow=!0}},Ms=class extends Ss{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new nf}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Hn=class extends Aa{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},sf=class extends yr{constructor(){super(new Hn(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ki=class extends Ss{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(xt.DEFAULT_UP),this.updateMatrix(),this.target=new xt,this.shadow=new sf}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var Ci=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var Hu=new WeakMap,Ca=class extends ri{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Le("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Le("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=Qn.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(l=>{Hu.has(a)===!0?(s&&s(Hu.get(a)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(l),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);return}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(l){return Qn.add(`image-bitmap:${e}`,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),Hu.set(c,l),Qn.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});Qn.add(`image-bitmap:${e}`,c),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Js=-90,Qs=1,dl=class extends xt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Xt(Js,Qs,e,t);s.layers=this.layers,this.add(s);let r=new Xt(Js,Qs,e,t);r.layers=this.layers,this.add(r);let a=new Xt(Js,Qs,e,t);a.layers=this.layers,this.add(a);let o=new Xt(Js,Qs,e,t);o.layers=this.layers,this.add(o);let c=new Xt(Js,Qs,e,t);c.layers=this.layers,this.add(c);let l=new Xt(Js,Qs,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(let l of t)this.remove(l);if(e===kn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===ir)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,u]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(f,d,h),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},hl=class extends Xt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Nf="\\[\\]\\.:\\/",Px=new RegExp("["+Nf+"]","g"),Uf="[^"+Nf+"]",Ix="[^"+Nf.replace("\\.","")+"]",Lx=/((?:WC+[\/:])*)/.source.replace("WC",Uf),Dx=/(WCOD+)?/.source.replace("WCOD",Ix),Nx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Uf),Ux=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Uf),Fx=new RegExp("^"+Lx+Dx+Nx+Ux+"$"),Ox=["material","materials","bones","map"],rf=class{constructor(e,t,n){let s=n||wt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},wt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Px,"")}static parseTrackName(e){let t=Fx.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Ox.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Le("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){Ve("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ve("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ve("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ve("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ve("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Ve("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){Ve("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let a=e[s];if(a===void 0){let l=t.nodeName;Ve("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Ve("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ve("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};wt.Composite=rf;wt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};wt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};wt.prototype.GetterByBindingType=[wt.prototype._getValue_direct,wt.prototype._getValue_array,wt.prototype._getValue_arrayElement,wt.prototype._getValue_toArray];wt.prototype.SetterByBindingTypeAndVersioning=[[wt.prototype._setValue_direct,wt.prototype._setValue_direct_setNeedsUpdate,wt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[wt.prototype._setValue_array,wt.prototype._setValue_array_setNeedsUpdate,wt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[wt.prototype._setValue_arrayElement,wt.prototype._setValue_arrayElement_setNeedsUpdate,wt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[wt.prototype._setValue_fromArray,wt.prototype._setValue_fromArray_setNeedsUpdate,wt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var YM=new Float32Array(1);var Jh=new $e,Ra=class{constructor(e,t,n=0,s=1/0){this.ray=new ti(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new or,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ve("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Jh.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Jh),this}intersectObject(e,t=!0,n=[]){return af(e,this,n,t),n.sort(Qh),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)af(e[s],this,n,t);return n.sort(Qh),n}};function Qh(i,e){return i.distance-e.distance}function af(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let a=0,o=r.length;a<o;a++)af(r[a],e,t,!0)}}var Zi=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Je(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Je(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var of=class i{static{i.prototype.isMatrix2=!0}constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};var Pa=class extends zn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function Ff(i,e,t,n){let s=Bx(n);switch(t){case Af:return i*e;case bl:return i*e/s.components*s.byteLength;case Sl:return i*e/s.components*s.byteLength;case es:return i*e*2/s.components*s.byteLength;case Ml:return i*e*2/s.components*s.byteLength;case Ef:return i*e*3/s.components*s.byteLength;case Tn:return i*e*4/s.components*s.byteLength;case wl:return i*e*4/s.components*s.byteLength;case Da:case Na:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ua:case Fa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Al:case Cl:return Math.max(i,16)*Math.max(e,8)/4;case Tl:case El:return Math.max(i,8)*Math.max(e,8)/2;case Rl:case Pl:case Ll:case Dl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Il:case Oa:case Nl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ul:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Fl:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Ol:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Bl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case kl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case zl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Gl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Vl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Hl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Wl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Xl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case ql:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case $l:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Yl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Kl:case Zl:case jl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Jl:case Ql:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ba:case ec:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Bx(i){switch(i){case mn:case Sf:return{byteLength:1,components:1};case wr:case Mf:case $n:return{byteLength:2,components:1};case vl:case yl:return{byteLength:2,components:4};case qn:case _l:case wn:return{byteLength:4,components:1};case wf:case Tf:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:pl}}));typeof window<"u"&&(window.__THREE__?Le("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=pl);function hm(){let i=null,e=!1,t=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function kx(i){let e=new WeakMap;function t(o,c){let l=o.array,u=o.usage,f=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,u),o.onUploadCallback();let h;if(l instanceof Float32Array)h=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)h=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?h=i.HALF_FLOAT:h=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)h=i.SHORT;else if(l instanceof Uint32Array)h=i.UNSIGNED_INT;else if(l instanceof Int32Array)h=i.INT;else if(l instanceof Int8Array)h=i.BYTE;else if(l instanceof Uint8Array)h=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)h=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:h,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,c,l){let u=c.array,f=c.updateRanges;if(i.bindBuffer(l,o),f.length===0)i.bufferSubData(l,0,u);else{f.sort((h,m)=>h.start-m.start);let d=0;for(let h=1;h<f.length;h++){let m=f[d],y=f[h];y.start<=m.start+m.count+1?m.count=Math.max(m.count,y.start+y.count-m.start):(++d,f[d]=y)}f.length=d+1;for(let h=0,m=f.length;h<m;h++){let y=f[h];i.bufferSubData(l,y.start*u.BYTES_PER_ELEMENT,u,y.start,y.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var zx=`#ifdef USE_ALPHAHASH
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
#endif`,Zx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,jx=`vec3 objectNormal = vec3( normal );
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
#endif`,e0=`#ifdef USE_BUMPMAP
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
#endif`,t0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,n0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,i0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,s0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,r0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,a0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,o0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,l0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,c0=`#define PI 3.141592653589793
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
} // validated`,u0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,f0=`vec3 transformedNormal = objectNormal;
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
#endif`,d0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,h0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,p0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,m0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,g0="gl_FragColor = linearToOutputTexel( gl_FragColor );",x0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,_0=`#ifdef USE_ENVMAP
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
#endif`,v0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,y0=`#ifdef USE_ENVMAP
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
#endif`,b0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,S0=`#ifdef USE_ENVMAP
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
#endif`,M0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,w0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,T0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,A0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,E0=`#ifdef USE_GRADIENTMAP
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
}`,C0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,R0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,P0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,I0=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,L0=`#ifdef USE_ENVMAP
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
#endif`,D0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,N0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,U0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,F0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,O0=`PhysicalMaterial material;
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
#endif`,B0=`uniform sampler2D dfgLUT;
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
}`,k0=`
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
#endif`,z0=`#if defined( RE_IndirectDiffuse )
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
#endif`,G0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,V0=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,H0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,W0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,X0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,q0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,$0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Y0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,K0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Z0=`#if defined( USE_POINTS_UV )
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
#endif`,j0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,J0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Q0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,e_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,t_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,n_=`#ifdef USE_MORPHTARGETS
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
#endif`,i_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,s_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,r_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,a_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,o_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,l_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,c_=`#ifdef USE_NORMALMAP
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
#endif`,u_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,f_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,d_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,h_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,p_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,m_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,g_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,x_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,__=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,v_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,y_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,b_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,S_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,M_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,w_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,T_=`float getShadowMask() {
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
}`,A_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,E_=`#ifdef USE_SKINNING
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
#endif`,C_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,R_=`#ifdef USE_SKINNING
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
#endif`,P_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,I_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,L_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,D_=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,N_=`#ifdef USE_TRANSMISSION
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
#endif`,U_=`#ifdef USE_TRANSMISSION
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
#endif`,F_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,O_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,B_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,k_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,z_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,G_=`uniform sampler2D t2D;
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
}`,V_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,H_=`#ifdef ENVMAP_TYPE_CUBE
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
}`,W_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,X_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,q_=`#include <common>
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
}`,$_=`#if DEPTH_PACKING == 3200
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
}`,Y_=`#define DISTANCE
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
}`,K_=`#define DISTANCE
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
}`,Z_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,j_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,J_=`uniform float scale;
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
}`,Q_=`uniform vec3 diffuse;
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
}`,ev=`#include <common>
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
}`,tv=`uniform vec3 diffuse;
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
}`,nv=`#define LAMBERT
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
}`,iv=`#define LAMBERT
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
}`,sv=`#define MATCAP
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
}`,rv=`#define MATCAP
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
}`,av=`#define NORMAL
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
}`,ov=`#define NORMAL
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
}`,lv=`#define PHONG
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
}`,cv=`#define PHONG
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
}`,uv=`#define STANDARD
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
}`,fv=`#define STANDARD
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
}`,dv=`#define TOON
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
}`,hv=`#define TOON
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
}`,pv=`uniform float size;
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
}`,mv=`uniform vec3 diffuse;
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
}`,gv=`#include <common>
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
}`,xv=`uniform vec3 color;
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
}`,_v=`uniform float rotation;
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
}`,vv=`uniform vec3 diffuse;
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
}`,tt={alphahash_fragment:zx,alphahash_pars_fragment:Gx,alphamap_fragment:Vx,alphamap_pars_fragment:Hx,alphatest_fragment:Wx,alphatest_pars_fragment:Xx,aomap_fragment:qx,aomap_pars_fragment:$x,batching_pars_vertex:Yx,batching_vertex:Kx,begin_vertex:Zx,beginnormal_vertex:jx,bsdfs:Jx,iridescence_fragment:Qx,bumpmap_pars_fragment:e0,clipping_planes_fragment:t0,clipping_planes_pars_fragment:n0,clipping_planes_pars_vertex:i0,clipping_planes_vertex:s0,color_fragment:r0,color_pars_fragment:a0,color_pars_vertex:o0,color_vertex:l0,common:c0,cube_uv_reflection_fragment:u0,defaultnormal_vertex:f0,displacementmap_pars_vertex:d0,displacementmap_vertex:h0,emissivemap_fragment:p0,emissivemap_pars_fragment:m0,colorspace_fragment:g0,colorspace_pars_fragment:x0,envmap_fragment:_0,envmap_common_pars_fragment:v0,envmap_pars_fragment:y0,envmap_pars_vertex:b0,envmap_physical_pars_fragment:L0,envmap_vertex:S0,fog_vertex:M0,fog_pars_vertex:w0,fog_fragment:T0,fog_pars_fragment:A0,gradientmap_pars_fragment:E0,lightmap_pars_fragment:C0,lights_lambert_fragment:R0,lights_lambert_pars_fragment:P0,lights_pars_begin:I0,lights_toon_fragment:D0,lights_toon_pars_fragment:N0,lights_phong_fragment:U0,lights_phong_pars_fragment:F0,lights_physical_fragment:O0,lights_physical_pars_fragment:B0,lights_fragment_begin:k0,lights_fragment_maps:z0,lights_fragment_end:G0,lightprobes_pars_fragment:V0,logdepthbuf_fragment:H0,logdepthbuf_pars_fragment:W0,logdepthbuf_pars_vertex:X0,logdepthbuf_vertex:q0,map_fragment:$0,map_pars_fragment:Y0,map_particle_fragment:K0,map_particle_pars_fragment:Z0,metalnessmap_fragment:j0,metalnessmap_pars_fragment:J0,morphinstance_vertex:Q0,morphcolor_vertex:e_,morphnormal_vertex:t_,morphtarget_pars_vertex:n_,morphtarget_vertex:i_,normal_fragment_begin:s_,normal_fragment_maps:r_,normal_pars_fragment:a_,normal_pars_vertex:o_,normal_vertex:l_,normalmap_pars_fragment:c_,clearcoat_normal_fragment_begin:u_,clearcoat_normal_fragment_maps:f_,clearcoat_pars_fragment:d_,iridescence_pars_fragment:h_,opaque_fragment:p_,packing:m_,premultiplied_alpha_fragment:g_,project_vertex:x_,dithering_fragment:__,dithering_pars_fragment:v_,roughnessmap_fragment:y_,roughnessmap_pars_fragment:b_,shadowmap_pars_fragment:S_,shadowmap_pars_vertex:M_,shadowmap_vertex:w_,shadowmask_pars_fragment:T_,skinbase_vertex:A_,skinning_pars_vertex:E_,skinning_vertex:C_,skinnormal_vertex:R_,specularmap_fragment:P_,specularmap_pars_fragment:I_,tonemapping_fragment:L_,tonemapping_pars_fragment:D_,transmission_fragment:N_,transmission_pars_fragment:U_,uv_pars_fragment:F_,uv_pars_vertex:O_,uv_vertex:B_,worldpos_vertex:k_,background_vert:z_,background_frag:G_,backgroundCube_vert:V_,backgroundCube_frag:H_,cube_vert:W_,cube_frag:X_,depth_vert:q_,depth_frag:$_,distance_vert:Y_,distance_frag:K_,equirect_vert:Z_,equirect_frag:j_,linedashed_vert:J_,linedashed_frag:Q_,meshbasic_vert:ev,meshbasic_frag:tv,meshlambert_vert:nv,meshlambert_frag:iv,meshmatcap_vert:sv,meshmatcap_frag:rv,meshnormal_vert:av,meshnormal_frag:ov,meshphong_vert:lv,meshphong_frag:cv,meshphysical_vert:uv,meshphysical_frag:fv,meshtoon_vert:dv,meshtoon_frag:hv,points_vert:pv,points_frag:mv,shadow_vert:gv,shadow_frag:xv,sprite_vert:_v,sprite_frag:vv},xe={common:{diffuse:{value:new be(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ye}},envmap:{envMap:{value:null},envMapRotation:{value:new Ye},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ye}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ye}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ye},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ye},normalScale:{value:new re(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ye},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ye}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ye}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ye}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new be(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new L},probesMax:{value:new L},probesResolution:{value:new L}},points:{diffuse:{value:new be(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0},uvTransform:{value:new Ye}},sprite:{diffuse:{value:new be(16777215)},opacity:{value:1},center:{value:new re(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}}},ci={basic:{uniforms:tn([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.fog]),vertexShader:tt.meshbasic_vert,fragmentShader:tt.meshbasic_frag},lambert:{uniforms:tn([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new be(0)},envMapIntensity:{value:1}}]),vertexShader:tt.meshlambert_vert,fragmentShader:tt.meshlambert_frag},phong:{uniforms:tn([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new be(0)},specular:{value:new be(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:tt.meshphong_vert,fragmentShader:tt.meshphong_frag},standard:{uniforms:tn([xe.common,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.roughnessmap,xe.metalnessmap,xe.fog,xe.lights,{emissive:{value:new be(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag},toon:{uniforms:tn([xe.common,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.gradientmap,xe.fog,xe.lights,{emissive:{value:new be(0)}}]),vertexShader:tt.meshtoon_vert,fragmentShader:tt.meshtoon_frag},matcap:{uniforms:tn([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,{matcap:{value:null}}]),vertexShader:tt.meshmatcap_vert,fragmentShader:tt.meshmatcap_frag},points:{uniforms:tn([xe.points,xe.fog]),vertexShader:tt.points_vert,fragmentShader:tt.points_frag},dashed:{uniforms:tn([xe.common,xe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:tt.linedashed_vert,fragmentShader:tt.linedashed_frag},depth:{uniforms:tn([xe.common,xe.displacementmap]),vertexShader:tt.depth_vert,fragmentShader:tt.depth_frag},normal:{uniforms:tn([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,{opacity:{value:1}}]),vertexShader:tt.meshnormal_vert,fragmentShader:tt.meshnormal_frag},sprite:{uniforms:tn([xe.sprite,xe.fog]),vertexShader:tt.sprite_vert,fragmentShader:tt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ye},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:tt.background_vert,fragmentShader:tt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ye}},vertexShader:tt.backgroundCube_vert,fragmentShader:tt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:tt.cube_vert,fragmentShader:tt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:tt.equirect_vert,fragmentShader:tt.equirect_frag},distance:{uniforms:tn([xe.common,xe.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:tt.distance_vert,fragmentShader:tt.distance_frag},shadow:{uniforms:tn([xe.lights,xe.fog,{color:{value:new be(0)},opacity:{value:1}}]),vertexShader:tt.shadow_vert,fragmentShader:tt.shadow_frag}};ci.physical={uniforms:tn([ci.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ye},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ye},clearcoatNormalScale:{value:new re(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ye},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ye},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ye},sheen:{value:0},sheenColor:{value:new be(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ye},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ye},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ye},transmissionSamplerSize:{value:new re},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ye},attenuationDistance:{value:0},attenuationColor:{value:new be(0)},specularColor:{value:new be(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ye},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ye},anisotropyVector:{value:new re},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ye}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag};var sc={r:0,b:0,g:0},yv=new $e,pm=new Ye;pm.set(-1,0,0,0,1,0,0,0,1);function bv(i,e,t,n,s,r){let a=new be(0),o=s===!0?0:1,c,l,u=null,f=0,d=null;function h(S){let A=S.isScene===!0?S.background:null;if(A&&A.isTexture){let _=S.backgroundBlurriness>0;A=e.get(A,_)}return A}function m(S){let A=!1,_=h(S);_===null?g(a,o):_&&_.isColor&&(g(_,1),A=!0);let w=i.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||A)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function y(S,A){let _=h(A);_&&(_.isCubeTexture||_.mapping===La)?(l===void 0&&(l=new Be(new In(1,1,1),new Mn({name:"BackgroundCubeMaterial",uniforms:Cs(ci.backgroundCube.uniforms),vertexShader:ci.backgroundCube.vertexShader,fragmentShader:ci.backgroundCube.fragmentShader,side:ln,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,T,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=_,l.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(yv.makeRotationFromEuler(A.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(pm),l.material.toneMapped=nt.getTransfer(_.colorSpace)!==gt,(u!==_||f!==_.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,u=_,f=_.version,d=i.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new Be(new Vn(2,2),new Mn({name:"BackgroundMaterial",uniforms:Cs(ci.background.uniforms),vertexShader:ci.background.vertexShader,fragmentShader:ci.background.fragmentShader,side:ai,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.toneMapped=nt.getTransfer(_.colorSpace)!==gt,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(u!==_||f!==_.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,u=_,f=_.version,d=i.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function g(S,A){S.getRGB(sc,Df(i)),t.buffers.color.setClear(sc.r,sc.g,sc.b,A,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,A=1){a.set(S),o=A,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(S){o=S,g(a,o)},render:m,addToRenderList:y,dispose:p}}function Sv(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null),r=s,a=!1;function o(D,F,N,P,U){let z=!1,V=f(D,P,N,F);r!==V&&(r=V,l(r.object)),z=h(D,P,N,U),z&&m(D,P,N,U),U!==null&&e.update(U,i.ELEMENT_ARRAY_BUFFER),(z||a)&&(a=!1,_(D,F,N,P),U!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(U).buffer))}function c(){return i.createVertexArray()}function l(D){return i.bindVertexArray(D)}function u(D){return i.deleteVertexArray(D)}function f(D,F,N,P){let U=P.wireframe===!0,z=n[F.id];z===void 0&&(z={},n[F.id]=z);let V=D.isInstancedMesh===!0?D.id:0,j=z[V];j===void 0&&(j={},z[V]=j);let q=j[N.id];q===void 0&&(q={},j[N.id]=q);let J=q[U];return J===void 0&&(J=d(c()),q[U]=J),J}function d(D){let F=[],N=[],P=[];for(let U=0;U<t;U++)F[U]=0,N[U]=0,P[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:N,attributeDivisors:P,object:D,attributes:{},index:null}}function h(D,F,N,P){let U=r.attributes,z=F.attributes,V=0,j=N.getAttributes();for(let q in j)if(j[q].location>=0){let ie=U[q],De=z[q];if(De===void 0&&(q==="instanceMatrix"&&D.instanceMatrix&&(De=D.instanceMatrix),q==="instanceColor"&&D.instanceColor&&(De=D.instanceColor)),ie===void 0||ie.attribute!==De||De&&ie.data!==De.data)return!0;V++}return r.attributesNum!==V||r.index!==P}function m(D,F,N,P){let U={},z=F.attributes,V=0,j=N.getAttributes();for(let q in j)if(j[q].location>=0){let ie=z[q];ie===void 0&&(q==="instanceMatrix"&&D.instanceMatrix&&(ie=D.instanceMatrix),q==="instanceColor"&&D.instanceColor&&(ie=D.instanceColor));let De={};De.attribute=ie,ie&&ie.data&&(De.data=ie.data),U[q]=De,V++}r.attributes=U,r.attributesNum=V,r.index=P}function y(){let D=r.newAttributes;for(let F=0,N=D.length;F<N;F++)D[F]=0}function g(D){p(D,0)}function p(D,F){let N=r.newAttributes,P=r.enabledAttributes,U=r.attributeDivisors;N[D]=1,P[D]===0&&(i.enableVertexAttribArray(D),P[D]=1),U[D]!==F&&(i.vertexAttribDivisor(D,F),U[D]=F)}function S(){let D=r.newAttributes,F=r.enabledAttributes;for(let N=0,P=F.length;N<P;N++)F[N]!==D[N]&&(i.disableVertexAttribArray(N),F[N]=0)}function A(D,F,N,P,U,z,V){V===!0?i.vertexAttribIPointer(D,F,N,U,z):i.vertexAttribPointer(D,F,N,P,U,z)}function _(D,F,N,P){y();let U=P.attributes,z=N.getAttributes(),V=F.defaultAttributeValues;for(let j in z){let q=z[j];if(q.location>=0){let J=U[j];if(J===void 0&&(j==="instanceMatrix"&&D.instanceMatrix&&(J=D.instanceMatrix),j==="instanceColor"&&D.instanceColor&&(J=D.instanceColor)),J!==void 0){let ie=J.normalized,De=J.itemSize,Ae=e.get(J);if(Ae===void 0)continue;let dt=Ae.buffer,st=Ae.type,ct=Ae.bytesPerElement,Z=st===i.INT||st===i.UNSIGNED_INT||J.gpuType===_l;if(J.isInterleavedBufferAttribute){let te=J.data,_e=te.stride,We=J.offset;if(te.isInstancedInterleavedBuffer){for(let Me=0;Me<q.locationSize;Me++)p(q.location+Me,te.meshPerAttribute);D.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let Me=0;Me<q.locationSize;Me++)g(q.location+Me);i.bindBuffer(i.ARRAY_BUFFER,dt);for(let Me=0;Me<q.locationSize;Me++)A(q.location+Me,De/q.locationSize,st,ie,_e*ct,(We+De/q.locationSize*Me)*ct,Z)}else{if(J.isInstancedBufferAttribute){for(let te=0;te<q.locationSize;te++)p(q.location+te,J.meshPerAttribute);D.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let te=0;te<q.locationSize;te++)g(q.location+te);i.bindBuffer(i.ARRAY_BUFFER,dt);for(let te=0;te<q.locationSize;te++)A(q.location+te,De/q.locationSize,st,ie,De*ct,De/q.locationSize*te*ct,Z)}}else if(V!==void 0){let ie=V[j];if(ie!==void 0)switch(ie.length){case 2:i.vertexAttrib2fv(q.location,ie);break;case 3:i.vertexAttrib3fv(q.location,ie);break;case 4:i.vertexAttrib4fv(q.location,ie);break;default:i.vertexAttrib1fv(q.location,ie)}}}}S()}function w(){b();for(let D in n){let F=n[D];for(let N in F){let P=F[N];for(let U in P){let z=P[U];for(let V in z)u(z[V].object),delete z[V];delete P[U]}}delete n[D]}}function T(D){if(n[D.id]===void 0)return;let F=n[D.id];for(let N in F){let P=F[N];for(let U in P){let z=P[U];for(let V in z)u(z[V].object),delete z[V];delete P[U]}}delete n[D.id]}function C(D){for(let F in n){let N=n[F];for(let P in N){let U=N[P];if(U[D.id]===void 0)continue;let z=U[D.id];for(let V in z)u(z[V].object),delete z[V];delete U[D.id]}}}function x(D){for(let F in n){let N=n[F],P=D.isInstancedMesh===!0?D.id:0,U=N[P];if(U!==void 0){for(let z in U){let V=U[z];for(let j in V)u(V[j].object),delete V[j];delete U[z]}delete N[P],Object.keys(N).length===0&&delete n[F]}}}function b(){E(),a=!0,r!==s&&(r=s,l(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:b,resetDefaultState:E,dispose:w,releaseStatesOfGeometry:T,releaseStatesOfObject:x,releaseStatesOfProgram:C,initAttributes:y,enableAttribute:g,disableUnusedAttributes:S}}function Mv(i,e,t){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function a(c,l,u){u!==0&&(i.drawArraysInstanced(n,c,l,u),t.update(l,n,u))}function o(c,l,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,u);let d=0;for(let h=0;h<u;h++)d+=l[h];t.update(d,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function wv(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let C=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==Tn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){let x=C===$n&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==mn&&C!==wn&&!x&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",u=c(l);u!==l&&(Le("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let f=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Le("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),A=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=i.getParameter(i.MAX_SAMPLES),T=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:h,maxVertexTextures:m,maxTextureSize:y,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:S,maxVaryings:A,maxFragmentUniforms:_,maxSamples:w,samples:T}}function Tv(i){let e=this,t=null,n=0,s=!1,r=!1,a=new rn,o=new Ye,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){let h=f.length!==0||d||n!==0||s;return s=d,n=f.length,h},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,d){t=u(f,d,0)},this.setState=function(f,d,h){let m=f.clippingPlanes,y=f.clipIntersection,g=f.clipShadows,p=i.get(f);if(!s||m===null||m.length===0||r&&!g)r?u(null):l();else{let S=r?0:n,A=S*4,_=p.clippingState||null;c.value=_,_=u(m,d,A,h);for(let w=0;w!==A;++w)_[w]=t[w];p.clippingState=_,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(f,d,h,m){let y=f!==null?f.length:0,g=null;if(y!==0){if(g=c.value,m!==!0||g===null){let p=h+y*4,S=d.matrixWorldInverse;o.getNormalMatrix(S),(g===null||g.length<p)&&(g=new Float32Array(p));for(let A=0,_=h;A!==y;++A,_+=4)a.copy(f[A]).applyMatrix4(S,o),a.normal.toArray(g,_),g[_+3]=a.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,g}}var Cr=4,Av=6,Ev=20,Cv=256,za=new Hn,qp=new be,Of=null,Bf=0,kf=0,zf=!1,Rv=new L,Rs=new L,ac=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:a=256,position:o=Rv}=r;Of=this._renderer.getRenderTarget(),Bf=this._renderer.getActiveCubeFace(),kf=this._renderer.getActiveMipmapLevel(),zf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Kp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Yp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Of,Bf,kf),this._renderer.xr.enabled=zf,e.scissorTest=!1,Er(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ji||e.mapping===As?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Of=this._renderer.getRenderTarget(),Bf=this._renderer.getActiveCubeFace(),kf=this._renderer.getActiveMipmapLevel(),zf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ft,minFilter:Ft,generateMipmaps:!1,type:$n,format:Tn,colorSpace:an,depthBuffer:!1},s=$p(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=$p(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Pv(r)),this._blurMaterial=Lv(r,e,t),this._ggxMaterial=Iv(r,e,t)}return s}_compileMaterial(e){let t=new Be(new ft,e);this._renderer.compile(t,za)}_sceneToCubeUV(e,t,n,s,r){let c=new Xt(90,1,t,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,d=f.autoClear,h=f.toneMapping;f.getClearColor(qp),f.toneMapping=Wn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Be(new In,new Qt({name:"PMREM.Background",side:ln,depthWrite:!1,depthTest:!1})));let y=this._backgroundBox,g=y.material,p=!1,S=e.background;S?S.isColor&&(g.color.copy(S),e.background=null,p=!0):(g.color.copy(qp),p=!0);for(let A=0;A<6;A++){let _=A%3;_===0?(c.up.set(0,l[A],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[A],r.y,r.z)):_===1?(c.up.set(0,0,l[A]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[A],r.z)):(c.up.set(0,l[A],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[A]));let w=this._cubeSize;Er(s,_*w,A>2?w:0,w,w),f.setRenderTarget(s),p&&f.render(y,c),f.render(e,c)}f.toneMapping=h,f.autoClear=d,e.background=S}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===Ji||e.mapping===As;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Kp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Yp());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let c=this._cubeSize;Er(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,za)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let c=a.uniforms,l=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),f=Math.sqrt(l*l-u*u),d=l*1.25,h=f*d,{_lodMax:m}=this,y=this._sizeLods[n],g=3*y*(n>m-Cr?n-m+Cr:0),p=4*(this._cubeSize-y);c.envMap.value=e.texture,c.roughness.value=h,c.mipInt.value=m-t,Er(r,g,p,3*y,2*y),s.setRenderTarget(r),s.render(o,za),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=m-n,Er(e,g,p,3*y,2*y),s.setRenderTarget(e),s.render(o,za)}_blur(e,t,n,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,a),this._blurPass(r,e,n,n,a)}_blurPass(e,t,n,s,r){let a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[s];c.material=o;let l=o.uniforms;l.envMap.value=e.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-n;let u=this._sizeLods[s],f=3*u*(s>this._lodMax-Cr?s-this._lodMax+Cr:0),d=4*(this._cubeSize-u);Er(t,f,d,3*u,2*u),a.setRenderTarget(t),a.render(c,za)}};function Pv(i){let e=[],t=[],n=i,s=i-Cr+1+Av;for(let r=0;r<s;r++){let a=Math.pow(2,n);e.push(a);let o=1/(a-2),c=-o,l=1+o,u=[c,c,l,c,l,l,c,c,l,l,c,l],f=6,d=6,h=3,m=new Float32Array(h*d*f),y=new Float32Array(h*d*f);for(let p=0;p<f;p++){let S=p%3*2/3-1,A=p>2?0:-1,_=[S,A,0,S+2/3,A,0,S+2/3,A+1,0,S,A,0,S+2/3,A+1,0,S,A+1,0];m.set(_,h*d*p);for(let w=0;w<d;w++){let T=u[w*2]*2-1,C=u[w*2+1]*2-1;p===0?Rs.set(1,C,T):p===1?Rs.set(-T,1,-C):p===2?Rs.set(-T,C,1):p===3?Rs.set(-1,C,-T):p===4?Rs.set(-T,-1,C):Rs.set(T,C,-1),Rs.toArray(y,(p*d+w)*h)}}let g=new ft;g.setAttribute("position",new zt(m,h)),g.setAttribute("outputDirection",new zt(y,h)),t.push(new Be(g,null)),n>Cr&&n--}return{lodMeshes:t,sizeLods:e}}function $p(i,e,t){let n=new Jt(i,e,t);return n.texture.mapping=La,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Er(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Iv(i,e,t){return new Mn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Cv,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:cc(),fragmentShader:`

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
		`,blending:oi,depthTest:!1,depthWrite:!1})}function Lv(i,e,t){return new Mn({name:"SphericalGaussianBlur",defines:{SAMPLES:Ev,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:cc(),fragmentShader:`

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
		`,blending:oi,depthTest:!1,depthWrite:!1})}function Yp(){return new Mn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:cc(),fragmentShader:`

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
		`,blending:oi,depthTest:!1,depthWrite:!1})}function Kp(){return new Mn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:cc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:oi,depthTest:!1,depthWrite:!1})}function cc(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var oc=class extends Jt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new ca(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new In(5,5,5),r=new Mn({name:"CubemapFromEquirect",uniforms:Cs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:ln,blending:oi});r.uniforms.tEquirect.value=t;let a=new Be(s,r),o=t.minFilter;return t.minFilter===Xn&&(t.minFilter=Ft),new dl(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}};function Dv(i){let e=new WeakMap,t=new WeakMap,n=null;function s(d,h=!1){return d==null?null:h?a(d):r(d)}function r(d){if(d&&d.isTexture){let h=d.mapping;if(h===ml||h===gl)if(e.has(d)){let m=e.get(d).texture;return o(m,d.mapping)}else{let m=d.image;if(m&&m.height>0){let y=new oc(m.height);return y.fromEquirectangularTexture(i,d),e.set(d,y),d.addEventListener("dispose",l),o(y.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){let h=d.mapping,m=h===ml||h===gl,y=h===Ji||h===As;if(m||y){let g=t.get(d),p=g!==void 0?g.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==p)return n===null&&(n=new ac(i)),g=m?n.fromEquirectangular(d,g):n.fromCubemap(d,g),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),g.texture;if(g!==void 0)return g.texture;{let S=d.image;return m&&S&&S.height>0||y&&S&&c(S)?(n===null&&(n=new ac(i)),g=m?n.fromEquirectangular(d):n.fromCubemap(d),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),d.addEventListener("dispose",u),g.texture):null}}}return d}function o(d,h){return h===ml?d.mapping=Ji:h===gl&&(d.mapping=As),d}function c(d){let h=0,m=6;for(let y=0;y<m;y++)d[y]!==void 0&&h++;return h===m}function l(d){let h=d.target;h.removeEventListener("dispose",l);let m=e.get(h);m!==void 0&&(e.delete(h),m.dispose())}function u(d){let h=d.target;h.removeEventListener("dispose",u);let m=t.get(h);m!==void 0&&(t.delete(h),m.dispose())}function f(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:f}}function Nv(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&ps("WebGLRenderer: "+n+" extension not supported."),s}}}function Uv(i,e,t,n){let s={},r=new WeakMap;function a(f){let d=f.target;d.index!==null&&e.remove(d.index);for(let m in d.attributes)e.remove(d.attributes[m]);d.removeEventListener("dispose",a),delete s[d.id];let h=r.get(d);h&&(e.remove(h),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(f,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,t.memory.geometries++),d}function c(f){let d=f.attributes;for(let h in d)e.update(d[h],i.ARRAY_BUFFER)}function l(f){let d=[],h=f.index,m=f.attributes.position,y=0;if(m===void 0)return;if(h!==null){let S=h.array;y=h.version;for(let A=0,_=S.length;A<_;A+=3){let w=S[A+0],T=S[A+1],C=S[A+2];d.push(w,T,T,C,C,w)}}else{let S=m.array;y=m.version;for(let A=0,_=S.length/3-1;A<_;A+=3){let w=A+0,T=A+1,C=A+2;d.push(w,T,T,C,C,w)}}let g=new(m.count>=65535?aa:ra)(d,1);g.version=y;let p=r.get(f);p&&e.remove(p),r.set(f,g)}function u(f){let d=r.get(f);if(d){let h=f.index;h!==null&&d.version<h.version&&l(f)}else l(f);return r.get(f)}return{get:o,update:c,getWireframeAttribute:u}}function Fv(i,e,t){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function c(f,d){i.drawElements(n,d,r,f*a),t.update(d,n,1)}function l(f,d,h){h!==0&&(i.drawElementsInstanced(n,d,r,f*a,h),t.update(d,n,h))}function u(f,d,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,h);let y=0;for(let g=0;g<h;g++)y+=d[g];t.update(y,n,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Ov(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:Ve("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Bv(i,e,t){let n=new WeakMap,s=new yt;function r(a,o,c){let l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0,d=n.get(o);if(d===void 0||d.count!==f){let b=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",b)};d!==void 0&&d.texture.dispose();let h=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,y=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],S=o.morphAttributes.color||[],A=0;h===!0&&(A=1),m===!0&&(A=2),y===!0&&(A=3);let _=o.attributes.position.count*A,w=1;_>e.maxTextureSize&&(w=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let T=new Float32Array(_*w*4*f),C=new ia(T,_,w,f);C.type=wn,C.needsUpdate=!0;let x=A*4;for(let E=0;E<f;E++){let D=g[E],F=p[E],N=S[E],P=_*w*4*E;for(let U=0;U<D.count;U++){let z=U*x;h===!0&&(s.fromBufferAttribute(D,U),T[P+z+0]=s.x,T[P+z+1]=s.y,T[P+z+2]=s.z,T[P+z+3]=0),m===!0&&(s.fromBufferAttribute(F,U),T[P+z+4]=s.x,T[P+z+5]=s.y,T[P+z+6]=s.z,T[P+z+7]=0),y===!0&&(s.fromBufferAttribute(N,U),T[P+z+8]=s.x,T[P+z+9]=s.y,T[P+z+10]=s.z,T[P+z+11]=N.itemSize===4?s.w:1)}}d={count:f,texture:C,size:new re(_,w)},n.set(o,d),o.addEventListener("dispose",b)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let h=0;for(let y=0;y<l.length;y++)h+=l[y];let m=o.morphTargetsRelative?1:1-h;c.getUniforms().setValue(i,"morphTargetBaseInfluence",m),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function kv(i,e,t,n,s){let r=new WeakMap;function a(l){let u=s.render.frame,f=l.geometry,d=e.get(l,f);if(r.get(d)!==u&&(e.update(d),r.set(d,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==u&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){let h=l.skeleton;r.get(h)!==u&&(h.update(),r.set(h,u))}return d}function o(){r=new WeakMap}function c(l){let u=l.target;u.removeEventListener("dispose",c),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}var zv={[mf]:"LINEAR_TONE_MAPPING",[gf]:"REINHARD_TONE_MAPPING",[xf]:"CINEON_TONE_MAPPING",[Ia]:"ACES_FILMIC_TONE_MAPPING",[vf]:"AGX_TONE_MAPPING",[yf]:"NEUTRAL_TONE_MAPPING",[_f]:"CUSTOM_TONE_MAPPING"};function Gv(i,e,t,n,s,r){let a=new Jt(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,c=null,l=new ft;l.setAttribute("position",new et([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new et([0,2,0,0,2,0],2));let u=new nl({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new Be(l,u),d=new Hn(-1,1,1,-1,0,1),h=null,m=null,y=!1,g,p=null,S=[],A=!1;this.setSize=function(_,w){a.setSize(_,w),o!==null&&o.setSize(_,w),c!==null&&c.setSize(_,w);for(let T=0;T<S.length;T++){let C=S[T];C.setSize&&C.setSize(_,w)}},this.setEffects=function(_){S=_,A=S.length>0&&S[0].isRenderPass===!0;let w=a.width,T=a.height;S.length>0&&o===null&&(o=new Jt(w,T,{type:$n,depthBuffer:!1,stencilBuffer:!1}),c=new Jt(w,T,{type:$n,depthBuffer:!1,stencilBuffer:!1}));for(let C=0;C<S.length;C++){let x=S[C];x.setSize&&x.setSize(w,T)}},this.begin=function(_,w){if(y||_.toneMapping===Wn&&S.length===0)return!1;if(p=w,w!==null){let T=w.width,C=w.height;(a.width!==T||a.height!==C)&&this.setSize(T,C)}return A===!1&&_.setRenderTarget(a),g=_.toneMapping,_.toneMapping=Wn,!0},this.hasRenderPass=function(){return A},this.end=function(_,w){_.toneMapping=g,y=!0;let T=a,C=o;for(let x=0;x<S.length;x++){let b=S[x];b.enabled!==!1&&(b.render(_,C,T,w),b.needsSwap!==!1&&(T=C,C=C===o?c:o))}if(h!==_.outputColorSpace||m!==_.toneMapping){h=_.outputColorSpace,m=_.toneMapping,u.defines={},nt.getTransfer(h)===gt&&(u.defines.SRGB_TRANSFER="");let x=zv[m];x&&(u.defines[x]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=T.texture,_.setRenderTarget(p),_.render(f,d),p=null,y=!1},this.isCompositing=function(){return y},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var mm=new qt,Hf=new qi(1,1),gm=new ia,xm=new qo,_m=new ca,Zp=[],jp=[],Jp=new Float32Array(16),Qp=new Float32Array(9),em=new Float32Array(4);function Pr(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=Zp[s];if(r===void 0&&(r=new Float32Array(s),Zp[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Gt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Vt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function uc(i,e){let t=jp[e];t===void 0&&(t=new Int32Array(e),jp[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Vv(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Hv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;i.uniform2fv(this.addr,e),Vt(t,e)}}function Wv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Gt(t,e))return;i.uniform3fv(this.addr,e),Vt(t,e)}}function Xv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;i.uniform4fv(this.addr,e),Vt(t,e)}}function qv(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Gt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Vt(t,e)}else{if(Gt(t,n))return;em.set(n),i.uniformMatrix2fv(this.addr,!1,em),Vt(t,n)}}function $v(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Gt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Vt(t,e)}else{if(Gt(t,n))return;Qp.set(n),i.uniformMatrix3fv(this.addr,!1,Qp),Vt(t,n)}}function Yv(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Gt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Vt(t,e)}else{if(Gt(t,n))return;Jp.set(n),i.uniformMatrix4fv(this.addr,!1,Jp),Vt(t,n)}}function Kv(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Zv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;i.uniform2iv(this.addr,e),Vt(t,e)}}function jv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Gt(t,e))return;i.uniform3iv(this.addr,e),Vt(t,e)}}function Jv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;i.uniform4iv(this.addr,e),Vt(t,e)}}function Qv(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function ey(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;i.uniform2uiv(this.addr,e),Vt(t,e)}}function ty(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Gt(t,e))return;i.uniform3uiv(this.addr,e),Vt(t,e)}}function ny(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;i.uniform4uiv(this.addr,e),Vt(t,e)}}function iy(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Hf.compareFunction=t.isReversedDepthBuffer()?ic:nc,r=Hf):r=mm,t.setTexture2D(e||r,s)}function sy(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||xm,s)}function ry(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||_m,s)}function ay(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||gm,s)}function oy(i){switch(i){case 5126:return Vv;case 35664:return Hv;case 35665:return Wv;case 35666:return Xv;case 35674:return qv;case 35675:return $v;case 35676:return Yv;case 5124:case 35670:return Kv;case 35667:case 35671:return Zv;case 35668:case 35672:return jv;case 35669:case 35673:return Jv;case 5125:return Qv;case 36294:return ey;case 36295:return ty;case 36296:return ny;case 35678:case 36198:case 36298:case 36306:case 35682:return iy;case 35679:case 36299:case 36307:return sy;case 35680:case 36300:case 36308:case 36293:return ry;case 36289:case 36303:case 36311:case 36292:return ay}}function ly(i,e){i.uniform1fv(this.addr,e)}function cy(i,e){let t=Pr(e,this.size,2);i.uniform2fv(this.addr,t)}function uy(i,e){let t=Pr(e,this.size,3);i.uniform3fv(this.addr,t)}function fy(i,e){let t=Pr(e,this.size,4);i.uniform4fv(this.addr,t)}function dy(i,e){let t=Pr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function hy(i,e){let t=Pr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function py(i,e){let t=Pr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function my(i,e){i.uniform1iv(this.addr,e)}function gy(i,e){i.uniform2iv(this.addr,e)}function xy(i,e){i.uniform3iv(this.addr,e)}function _y(i,e){i.uniform4iv(this.addr,e)}function vy(i,e){i.uniform1uiv(this.addr,e)}function yy(i,e){i.uniform2uiv(this.addr,e)}function by(i,e){i.uniform3uiv(this.addr,e)}function Sy(i,e){i.uniform4uiv(this.addr,e)}function My(i,e,t){let n=this.cache,s=e.length,r=uc(t,s);Gt(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Hf:a=mm;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function wy(i,e,t){let n=this.cache,s=e.length,r=uc(t,s);Gt(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||xm,r[a])}function Ty(i,e,t){let n=this.cache,s=e.length,r=uc(t,s);Gt(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||_m,r[a])}function Ay(i,e,t){let n=this.cache,s=e.length,r=uc(t,s);Gt(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||gm,r[a])}function Ey(i){switch(i){case 5126:return ly;case 35664:return cy;case 35665:return uy;case 35666:return fy;case 35674:return dy;case 35675:return hy;case 35676:return py;case 5124:case 35670:return my;case 35667:case 35671:return gy;case 35668:case 35672:return xy;case 35669:case 35673:return _y;case 5125:return vy;case 36294:return yy;case 36295:return by;case 36296:return Sy;case 35678:case 36198:case 36298:case 36306:case 35682:return My;case 35679:case 36299:case 36307:return wy;case 35680:case 36300:case 36308:case 36293:return Ty;case 36289:case 36303:case 36311:case 36292:return Ay}}var Wf=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=oy(t.type)}},Xf=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ey(t.type)}},qf=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},Gf=/(\w+)(\])?(\[|\.)?/g;function tm(i,e){i.seq.push(e),i.map[e.id]=e}function Cy(i,e,t){let n=i.name,s=n.length;for(Gf.lastIndex=0;;){let r=Gf.exec(n),a=Gf.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){tm(t,l===void 0?new Wf(o,i,e):new Xf(o,i,e));break}else{let f=t.map[o];f===void 0&&(f=new qf(o),tm(t,f)),t=f}}}var Rr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);Cy(o,c,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function nm(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var Ry=37297,Py=0;function Iy(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var im=new Ye;function Ly(i){nt._getMatrix(im,nt.workingColorSpace,i);let e=`mat3( ${im.elements.map(t=>t.toFixed(4))} )`;switch(nt.getTransfer(i)){case ta:return[e,"LinearTransferOETF"];case gt:return[e,"sRGBTransferOETF"];default:return Le("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function sm(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Iy(i.getShaderSource(e),o)}else return r}function Dy(i,e){let t=Ly(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var Ny={[mf]:"Linear",[gf]:"Reinhard",[xf]:"Cineon",[Ia]:"ACESFilmic",[vf]:"AgX",[yf]:"Neutral",[_f]:"Custom"};function Uy(i,e){let t=Ny[e];return t===void 0?(Le("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var rc=new L;function Fy(){nt.getLuminanceCoefficients(rc);let i=rc.x.toFixed(4),e=rc.y.toFixed(4),t=rc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Oy(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Va).join(`
`)}function By(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function ky(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Va(i){return i!==""}function rm(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function am(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var zy=/^[ \t]*#include +<([\w\d./]+)>/gm;function $f(i){return i.replace(zy,Vy)}var Gy=new Map;function Vy(i,e){let t=tt[e];if(t===void 0){let n=Gy.get(e);if(n!==void 0)t=tt[n],Le('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return $f(t)}var Hy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function om(i){return i.replace(Hy,Wy)}function Wy(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function lm(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}var Xy={[ws]:"SHADOWMAP_TYPE_PCF",[br]:"SHADOWMAP_TYPE_VSM"};function qy(i){return Xy[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var $y={[Ji]:"ENVMAP_TYPE_CUBE",[As]:"ENVMAP_TYPE_CUBE",[La]:"ENVMAP_TYPE_CUBE_UV"};function Yy(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":$y[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Ky={[As]:"ENVMAP_MODE_REFRACTION"};function Zy(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Ky[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var jy={[pf]:"ENVMAP_BLENDING_MULTIPLY",[bp]:"ENVMAP_BLENDING_MIX",[Sp]:"ENVMAP_BLENDING_ADD"};function Jy(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":jy[i.combine]||"ENVMAP_BLENDING_NONE"}function Qy(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function eb(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,c=qy(t),l=Yy(t),u=Zy(t),f=Jy(t),d=Qy(t),h=Oy(t),m=By(r),y=s.createProgram(),g,p,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Va).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Va).join(`
`),p.length>0&&(p+=`
`)):(g=[lm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Va).join(`
`),p=[lm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Wn?"#define TONE_MAPPING":"",t.toneMapping!==Wn?tt.tonemapping_pars_fragment:"",t.toneMapping!==Wn?Uy("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",tt.colorspace_pars_fragment,Dy("linearToOutputTexel",t.outputColorSpace),Fy(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Va).join(`
`)),a=$f(a),a=rm(a,t),a=am(a,t),o=$f(o),o=rm(o,t),o=am(o,t),a=om(a),o=om(o),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,g=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===Pf?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Pf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let A=S+g+a,_=S+p+o,w=nm(s,s.VERTEX_SHADER,A),T=nm(s,s.FRAGMENT_SHADER,_);s.attachShader(y,w),s.attachShader(y,T),t.index0AttributeName!==void 0?s.bindAttribLocation(y,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function C(D){if(i.debug.checkShaderErrors){let F=s.getProgramInfoLog(y)||"",N=s.getShaderInfoLog(w)||"",P=s.getShaderInfoLog(T)||"",U=F.trim(),z=N.trim(),V=P.trim(),j=!0,q=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(j=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,y,w,T);else{let J=sm(s,w,"vertex"),ie=sm(s,T,"fragment");Ve("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+U+`
`+J+`
`+ie)}else U!==""?Le("WebGLProgram: Program Info Log:",U):(z===""||V==="")&&(q=!1);q&&(D.diagnostics={runnable:j,programLog:U,vertexShader:{log:z,prefix:g},fragmentShader:{log:V,prefix:p}})}s.deleteShader(w),s.deleteShader(T),x=new Rr(s,y),b=ky(s,y)}let x;this.getUniforms=function(){return x===void 0&&C(this),x};let b;this.getAttributes=function(){return b===void 0&&C(this),b};let E=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=s.getProgramParameter(y,Ry)),E},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Py++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=w,this.fragmentShader=T,this}var tb=0,Yf=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Kf(e),t.set(e,n)),n}},Kf=class{constructor(e){this.id=tb++,this.code=e,this.usedTimes=0}};function nb(i){return i===es||i===Oa||i===Ba}function ib(i,e,t,n,s,r){let a=new or,o=new Yf,c=new Set,l=[],u=new Map,f=n.logarithmicDepthBuffer,d=n.precision,h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(x){return c.add(x),x===0?"uv":`uv${x}`}function y(x,b,E,D,F,N){let P=D.fog,U=F.geometry,z=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?D.environment:null,V=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,j=e.get(x.envMap||z,V),q=j&&j.mapping===La?j.image.height:null,J=h[x.type];x.precision!==null&&(d=n.getMaxPrecision(x.precision),d!==x.precision&&Le("WebGLProgram.getParameters:",x.precision,"not supported, using",d,"instead."));let ie=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,De=ie!==void 0?ie.length:0,Ae=0;U.morphAttributes.position!==void 0&&(Ae=1),U.morphAttributes.normal!==void 0&&(Ae=2),U.morphAttributes.color!==void 0&&(Ae=3);let dt,st,ct,Z;if(J){let Tt=ci[J];dt=Tt.vertexShader,st=Tt.fragmentShader}else{dt=x.vertexShader,st=x.fragmentShader;let Tt=o.getVertexShaderStage(x),pt=o.getFragmentShaderStage(x);o.update(x,Tt,pt),ct=Tt.id,Z=pt.id}let te=i.getRenderTarget(),_e=i.state.buffers.depth.getReversed(),We=F.isInstancedMesh===!0,Me=F.isBatchedMesh===!0,Xe=!!x.map,_t=!!x.matcap,ne=!!j,ae=!!x.aoMap,oe=!!x.lightMap,le=!!x.bumpMap&&x.wireframe===!1,fe=!!x.normalMap,ze=!!x.displacementMap,ke=!!x.emissiveMap,qe=!!x.metalnessMap,Ke=!!x.roughnessMap,O=x.anisotropy>0,ht=x.clearcoat>0,rt=x.dispersion>0,R=x.retroreflectivity>0,v=x.iridescence>0,G=x.sheen>0,X=x.transmission>0,Y=O&&!!x.anisotropyMap,ce=ht&&!!x.clearcoatMap,ue=ht&&!!x.clearcoatNormalMap,K=ht&&!!x.clearcoatRoughnessMap,ee=v&&!!x.iridescenceMap,de=v&&!!x.iridescenceThicknessMap,Ne=G&&!!x.sheenColorMap,ge=G&&!!x.sheenRoughnessMap,he=!!x.specularMap,Ue=!!x.specularColorMap,Ge=!!x.specularIntensityMap,Ze=X&&!!x.transmissionMap,k=X&&!!x.thicknessMap,pe=!!x.gradientMap,Q=!!x.alphaMap,me=x.alphaTest>0,Se=!!x.alphaHash,se=!!x.extensions,Oe=Wn;x.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(Oe=i.toneMapping);let Pe={shaderID:J,shaderType:x.type,shaderName:x.name,vertexShader:dt,fragmentShader:st,defines:x.defines,customVertexShaderID:ct,customFragmentShaderID:Z,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:d,batching:Me,batchingColor:Me&&F._colorsTexture!==null,instancing:We,instancingColor:We&&F.instanceColor!==null,instancingMorph:We&&F.morphTexture!==null,outputColorSpace:te===null?i.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:nt.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Xe,matcap:_t,envMap:ne,envMapMode:ne&&j.mapping,envMapCubeUVHeight:q,aoMap:ae,lightMap:oe,bumpMap:le,normalMap:fe,displacementMap:ze,emissiveMap:ke,normalMapObjectSpace:fe&&x.normalMapType===Ap,normalMapTangentSpace:fe&&x.normalMapType===tc,packedNormalMap:fe&&x.normalMapType===tc&&nb(x.normalMap.format),metalnessMap:qe,roughnessMap:Ke,anisotropy:O,anisotropyMap:Y,clearcoat:ht,clearcoatMap:ce,clearcoatNormalMap:ue,clearcoatRoughnessMap:K,dispersion:rt,retroreflection:R,iridescence:v,iridescenceMap:ee,iridescenceThicknessMap:de,sheen:G,sheenColorMap:Ne,sheenRoughnessMap:ge,specularMap:he,specularColorMap:Ue,specularIntensityMap:Ge,transmission:X,transmissionMap:Ze,thicknessMap:k,gradientMap:pe,opaque:x.transparent===!1&&x.blending===Sr&&x.alphaToCoverage===!1,alphaMap:Q,alphaTest:me,alphaHash:Se,combine:x.combine,mapUv:Xe&&m(x.map.channel),aoMapUv:ae&&m(x.aoMap.channel),lightMapUv:oe&&m(x.lightMap.channel),bumpMapUv:le&&m(x.bumpMap.channel),normalMapUv:fe&&m(x.normalMap.channel),displacementMapUv:ze&&m(x.displacementMap.channel),emissiveMapUv:ke&&m(x.emissiveMap.channel),metalnessMapUv:qe&&m(x.metalnessMap.channel),roughnessMapUv:Ke&&m(x.roughnessMap.channel),anisotropyMapUv:Y&&m(x.anisotropyMap.channel),clearcoatMapUv:ce&&m(x.clearcoatMap.channel),clearcoatNormalMapUv:ue&&m(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:K&&m(x.clearcoatRoughnessMap.channel),iridescenceMapUv:ee&&m(x.iridescenceMap.channel),iridescenceThicknessMapUv:de&&m(x.iridescenceThicknessMap.channel),sheenColorMapUv:Ne&&m(x.sheenColorMap.channel),sheenRoughnessMapUv:ge&&m(x.sheenRoughnessMap.channel),specularMapUv:he&&m(x.specularMap.channel),specularColorMapUv:Ue&&m(x.specularColorMap.channel),specularIntensityMapUv:Ge&&m(x.specularIntensityMap.channel),transmissionMapUv:Ze&&m(x.transmissionMap.channel),thicknessMapUv:k&&m(x.thicknessMap.channel),alphaMapUv:Q&&m(x.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(fe||O),vertexNormals:!!U.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!U.attributes.uv&&(Xe||Q),fog:!!P,useFog:x.fog===!0,fogExp2:!!P&&P.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||U.attributes.normal===void 0&&fe===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:_e,skinning:F.isSkinnedMesh===!0,hasPositionAttribute:U.attributes.position!==void 0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:De,morphTextureStride:Ae,numSunLights:b.sun.length,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numSunLightShadows:b.sunShadowMap.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numLightProbeGrids:N.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&E.length>0,shadowMapType:i.shadowMap.type,toneMapping:Oe,decodeVideoTexture:Xe&&x.map.isVideoTexture===!0&&nt.getTransfer(x.map.colorSpace)===gt,decodeVideoTextureEmissive:ke&&x.emissiveMap.isVideoTexture===!0&&nt.getTransfer(x.emissiveMap.colorSpace)===gt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===en,flipSided:x.side===ln,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:se&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(se&&x.extensions.multiDraw===!0||Me)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Pe.vertexUv1s=c.has(1),Pe.vertexUv2s=c.has(2),Pe.vertexUv3s=c.has(3),c.clear(),Pe}function g(x){let b=[];if(x.shaderID?b.push(x.shaderID):(b.push(x.customVertexShaderID),b.push(x.customFragmentShaderID)),x.defines!==void 0)for(let E in x.defines)b.push(E),b.push(x.defines[E]);return x.isRawShaderMaterial===!1&&(p(b,x),S(b,x),b.push(i.outputColorSpace)),b.push(x.customProgramCacheKey),b.join()}function p(x,b){x.push(b.precision),x.push(b.outputColorSpace),x.push(b.envMapMode),x.push(b.envMapCubeUVHeight),x.push(b.mapUv),x.push(b.alphaMapUv),x.push(b.lightMapUv),x.push(b.aoMapUv),x.push(b.bumpMapUv),x.push(b.normalMapUv),x.push(b.displacementMapUv),x.push(b.emissiveMapUv),x.push(b.metalnessMapUv),x.push(b.roughnessMapUv),x.push(b.anisotropyMapUv),x.push(b.clearcoatMapUv),x.push(b.clearcoatNormalMapUv),x.push(b.clearcoatRoughnessMapUv),x.push(b.iridescenceMapUv),x.push(b.iridescenceThicknessMapUv),x.push(b.sheenColorMapUv),x.push(b.sheenRoughnessMapUv),x.push(b.specularMapUv),x.push(b.specularColorMapUv),x.push(b.specularIntensityMapUv),x.push(b.transmissionMapUv),x.push(b.thicknessMapUv),x.push(b.combine),x.push(b.fogExp2),x.push(b.sizeAttenuation),x.push(b.morphTargetsCount),x.push(b.morphAttributeCount),x.push(b.numSunLights),x.push(b.numDirLights),x.push(b.numPointLights),x.push(b.numSpotLights),x.push(b.numSpotLightMaps),x.push(b.numHemiLights),x.push(b.numRectAreaLights),x.push(b.numSunLightShadows),x.push(b.numDirLightShadows),x.push(b.numPointLightShadows),x.push(b.numSpotLightShadows),x.push(b.numSpotLightShadowsWithMaps),x.push(b.numLightProbes),x.push(b.shadowMapType),x.push(b.toneMapping),x.push(b.numClippingPlanes),x.push(b.numClipIntersection),x.push(b.depthPacking)}function S(x,b){a.disableAll(),b.instancing&&a.enable(0),b.instancingColor&&a.enable(1),b.instancingMorph&&a.enable(2),b.matcap&&a.enable(3),b.envMap&&a.enable(4),b.normalMapObjectSpace&&a.enable(5),b.normalMapTangentSpace&&a.enable(6),b.clearcoat&&a.enable(7),b.iridescence&&a.enable(8),b.alphaTest&&a.enable(9),b.vertexColors&&a.enable(10),b.vertexAlphas&&a.enable(11),b.vertexUv1s&&a.enable(12),b.vertexUv2s&&a.enable(13),b.vertexUv3s&&a.enable(14),b.vertexTangents&&a.enable(15),b.anisotropy&&a.enable(16),b.alphaHash&&a.enable(17),b.batching&&a.enable(18),b.dispersion&&a.enable(19),b.retroreflection&&a.enable(24),b.batchingColor&&a.enable(20),b.gradientMap&&a.enable(21),b.packedNormalMap&&a.enable(22),b.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),b.numLightProbeGrids>0&&a.enable(22),b.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function A(x){let b=h[x.type],E;if(b){let D=ci[b];E=Hp.clone(D.uniforms)}else E=x.uniforms;return E}function _(x,b){let E=u.get(b);return E!==void 0?++E.usedTimes:(E=new eb(i,b,x,s),l.push(E),u.set(b,E)),E}function w(x){if(--x.usedTimes===0){let b=l.indexOf(x);l[b]=l[l.length-1],l.pop(),u.delete(x.cacheKey),x.destroy()}}function T(x){o.remove(x)}function C(){o.dispose()}return{getParameters:y,getProgramCacheKey:g,getUniforms:A,acquireProgram:_,releaseProgram:w,releaseShaderCache:T,programs:l,dispose:C}}function sb(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function rb(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function cm(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function um(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(d){let h=0;return d.isInstancedMesh&&(h+=2),d.isSkinnedMesh&&(h+=1),h}function o(d,h,m,y,g,p){let S=i[e];return S===void 0?(S={id:d.id,object:d,geometry:h,material:m,materialVariant:a(d),groupOrder:y,renderOrder:d.renderOrder,z:g,group:p},i[e]=S):(S.id=d.id,S.object=d,S.geometry=h,S.material=m,S.materialVariant=a(d),S.groupOrder=y,S.renderOrder=d.renderOrder,S.z=g,S.group=p),e++,S}function c(d,h,m,y,g,p,S){S.reversedDepth===!0&&(g=-g);let A=o(d,h,m,y,g,p);m.transmission>0?n.push(A):m.transparent===!0?s.push(A):t.push(A)}function l(d,h,m,y,g,p){let S=o(d,h,m,y,g,p);m.transmission>0?n.unshift(S):m.transparent===!0?s.unshift(S):t.unshift(S)}function u(d,h){t.length>1&&t.sort(d||rb),n.length>1&&n.sort(h||cm),s.length>1&&s.sort(h||cm)}function f(){for(let d=e,h=i.length;d<h;d++){let m=i[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:f,sort:u}}function ab(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new um,i.set(n,[a])):s>=r.length?(a=new um,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function ob(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new L,color:new be};break;case"SpotLight":t={position:new L,direction:new L,color:new be,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new be,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new be,groundColor:new be};break;case"RectAreaLight":t={color:new be,position:new L,halfWidth:new L,halfHeight:new L};break}return i[e.id]=t,t}}}function lb(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var cb=0;function ub(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function fb(i){let e=new ob,t=lb(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new L);let s=new L,r=new $e,a=new $e;function o(l){let u=0,f=0,d=0;for(let F=0;F<9;F++)n.probe[F].set(0,0,0);let h=0,m=0,y=0,g=0,p=0,S=0,A=0,_=0,w=0,T=0,C=0,x=0,b=0,E=0;l.sort(ub);for(let F=0,N=l.length;F<N;F++){let P=l[F],U=P.color,z=P.intensity,V=P.distance,j=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===es?j=P.shadow.map.texture:j=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)u+=U.r*z,f+=U.g*z,d+=U.b*z;else if(P.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(P.sh.coefficients[q],z);E++}else if(P.isSunLight){let q=e.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let J=P.shadow,ie=t.get(P);ie.shadowIntensity=J.intensity,ie.shadowBias=J.bias,ie.shadowNormalBias=J.normalBias,ie.shadowRadius=J.radius,ie.shadowMapSize.copy(J.mapSize).multiply(J.getFrameExtents()),n.sunShadow[m]=ie,n.sunShadowMap[m]=j;let De=J.getViewportCount();for(let Ae=0;Ae<De;Ae++)n.sunShadowMatrix[y+Ae]=J.getMatrix(Ae),n.sunShadowCascade[y+Ae]=J._cascadeData[Ae];y+=De,m++}n.sun[h]=q,h++}else if(P.isDirectionalLight){let q=e.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let J=P.shadow,ie=t.get(P);ie.shadowIntensity=J.intensity,ie.shadowBias=J.bias,ie.shadowNormalBias=J.normalBias,ie.shadowRadius=J.radius,ie.shadowMapSize=J.mapSize,n.directionalShadow[g]=ie,n.directionalShadowMap[g]=j,n.directionalShadowMatrix[g]=P.shadow.matrix,w++}n.directional[g]=q,g++}else if(P.isSpotLight){let q=e.get(P);q.position.setFromMatrixPosition(P.matrixWorld),q.color.copy(U).multiplyScalar(z),q.distance=V,q.coneCos=Math.cos(P.angle),q.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),q.decay=P.decay,n.spot[S]=q;let J=P.shadow;if(P.map&&(n.spotLightMap[x]=P.map,x++,J.updateMatrices(P),P.castShadow&&b++),n.spotLightMatrix[S]=J.matrix,P.castShadow){let ie=t.get(P);ie.shadowIntensity=J.intensity,ie.shadowBias=J.bias,ie.shadowNormalBias=J.normalBias,ie.shadowRadius=J.radius,ie.shadowMapSize=J.mapSize,n.spotShadow[S]=ie,n.spotShadowMap[S]=j,C++}S++}else if(P.isRectAreaLight){let q=e.get(P);q.color.copy(U).multiplyScalar(z),q.halfWidth.set(P.width*.5,0,0),q.halfHeight.set(0,P.height*.5,0),n.rectArea[A]=q,A++}else if(P.isPointLight){let q=e.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity),q.distance=P.distance,q.decay=P.decay,P.castShadow){let J=P.shadow,ie=t.get(P);ie.shadowIntensity=J.intensity,ie.shadowBias=J.bias,ie.shadowNormalBias=J.normalBias,ie.shadowRadius=J.radius,ie.shadowMapSize=J.mapSize,ie.shadowCameraNear=J.camera.near,ie.shadowCameraFar=J.camera.far,n.pointShadow[p]=ie,n.pointShadowMap[p]=j,n.pointShadowMatrix[p]=P.shadow.matrix,T++}n.point[p]=q,p++}else if(P.isHemisphereLight){let q=e.get(P);q.skyColor.copy(P.color).multiplyScalar(z),q.groundColor.copy(P.groundColor).multiplyScalar(z),n.hemi[_]=q,_++}}A>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=xe.LTC_FLOAT_1,n.rectAreaLTC2=xe.LTC_FLOAT_2):(n.rectAreaLTC1=xe.LTC_HALF_1,n.rectAreaLTC2=xe.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=d;let D=n.hash;(D.sunLength!==h||D.directionalLength!==g||D.pointLength!==p||D.spotLength!==S||D.rectAreaLength!==A||D.hemiLength!==_||D.numSunShadows!==m||D.numDirectionalShadows!==w||D.numPointShadows!==T||D.numSpotShadows!==C||D.numSpotMaps!==x||D.numLightProbes!==E)&&(n.sun.length=h,n.directional.length=g,n.spot.length=S,n.rectArea.length=A,n.point.length=p,n.hemi.length=_,n.sunShadow.length=m,n.sunShadowMap.length=m,n.sunShadowMatrix.length=y,n.sunShadowCascade.length=y,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.directionalShadowMatrix.length=w,n.pointShadow.length=T,n.pointShadowMap.length=T,n.pointShadowMatrix.length=T,n.spotShadow.length=C,n.spotShadowMap.length=C,n.spotLightMatrix.length=C+x-b,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=E,D.sunLength=h,D.directionalLength=g,D.pointLength=p,D.spotLength=S,D.rectAreaLength=A,D.hemiLength=_,D.numSunShadows=m,D.numDirectionalShadows=w,D.numPointShadows=T,D.numSpotShadows=C,D.numSpotMaps=x,D.numLightProbes=E,n.version=cb++)}function c(l,u){let f=0,d=0,h=0,m=0,y=0,g=0,p=u.matrixWorldInverse;for(let S=0,A=l.length;S<A;S++){let _=l[S];if(_.isSunLight){let w=n.sun[f];w.direction.setFromMatrixPosition(_.matrixWorld),w.direction.transformDirection(p),f++}else if(_.isDirectionalLight){let w=n.directional[d];w.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(p),d++}else if(_.isSpotLight){let w=n.spot[m];w.position.setFromMatrixPosition(_.matrixWorld),w.position.applyMatrix4(p),w.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(p),m++}else if(_.isRectAreaLight){let w=n.rectArea[y];w.position.setFromMatrixPosition(_.matrixWorld),w.position.applyMatrix4(p),a.identity(),r.copy(_.matrixWorld),r.premultiply(p),a.extractRotation(r),w.halfWidth.set(_.width*.5,0,0),w.halfHeight.set(0,_.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),y++}else if(_.isPointLight){let w=n.point[h];w.position.setFromMatrixPosition(_.matrixWorld),w.position.applyMatrix4(p),h++}else if(_.isHemisphereLight){let w=n.hemi[g];w.direction.setFromMatrixPosition(_.matrixWorld),w.direction.transformDirection(p),g++}}}return{setup:o,setupView:c,state:n}}function fm(i){let e=new fb(i),t=[],n=[],s=[];function r(d){f.camera=d,t.length=0,n.length=0,s.length=0}function a(d){t.push(d)}function o(d){n.push(d)}function c(d){s.push(d)}function l(){e.setup(t)}function u(d){e.setupView(t,d)}let f={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:l,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function db(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new fm(i),e.set(s,[o])):r>=a.length?(o=new fm(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var hb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,pb=`uniform sampler2D shadow_pass;
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
}`,mb=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],gb=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],dm=new $e,Ga=new L,Vf=new L;function xb(i,e,t){let n=new pr,s=new re,r=new re,a=new yt,o=new il,c=new sl,l={},u=t.maxTextureSize,f={[ai]:ln,[ln]:ai,[en]:en},d=new Mn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new re},radius:{value:4}},vertexShader:hb,fragmentShader:pb}),h=d.clone();h.defines.HORIZONTAL_PASS=1;let m=new ft;m.setAttribute("position",new zt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new Be(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ws;let p=this.type;this.render=function(T,C,x){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;this.type===np&&(Le("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=ws);let b=i.getRenderTarget(),E=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),F=i.state;F.setBlending(oi),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let N=p!==this.type;N&&C.traverse(function(P){P.material&&(Array.isArray(P.material)?P.material.forEach(U=>U.needsUpdate=!0):P.material.needsUpdate=!0)});for(let P=0,U=T.length;P<U;P++){let z=T[P],V=z.shadow;if(V===void 0){Le("WebGLShadowMap:",z,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);let j=V.getFrameExtents();s.multiply(j),r.copy(V.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/j.x),s.x=r.x*j.x,V.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/j.y),s.y=r.y*j.y,V.mapSize.y=r.y));let q=i.state.buffers.depth.getReversed();if(V.camera._reversedDepth=q,V.map===null||N===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===br){if(z.isPointLight){Le("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new Jt(s.x,s.y,{format:es,type:$n,minFilter:Ft,magFilter:Ft,generateMipmaps:!1}),V.map.texture.name=z.name+".shadowMap",V.map.depthTexture=new qi(s.x,s.y,wn),V.map.depthTexture.name=z.name+".shadowMapDepth",V.map.depthTexture.format=ei,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Ut,V.map.depthTexture.magFilter=Ut}else z.isPointLight?(V.map=new oc(s.x),V.map.depthTexture=new Ko(s.x,qn)):(V.map=new Jt(s.x,s.y),V.map.depthTexture=new qi(s.x,s.y,qn)),V.map.depthTexture.name=z.name+".shadowMap",V.map.depthTexture.format=ei,this.type===ws?(V.map.depthTexture.compareFunction=q?ic:nc,V.map.depthTexture.minFilter=Ft,V.map.depthTexture.magFilter=Ft):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Ut,V.map.depthTexture.magFilter=Ut);V.camera.updateProjectionMatrix()}V.map.isWebGLCubeRenderTarget!==!0&&(V.map.width!==s.x||V.map.height!==s.y)&&V.map.setSize(s.x,s.y);let J=V.map.isWebGLCubeRenderTarget?6:V.getViewportCount();z.isPointLight!==!0&&V.updateMatrices(z,x);for(let ie=0;ie<J;ie++){let De=V.getCamera(ie);if(z.isPointLight){let Ae=V.camera,dt=V.matrix,st=z.distance||Ae.far;st!==Ae.far&&(Ae.far=st,Ae.updateProjectionMatrix()),Ga.setFromMatrixPosition(z.matrixWorld),Ae.position.copy(Ga),Vf.copy(Ae.position),Vf.add(mb[ie]),Ae.up.copy(gb[ie]),Ae.lookAt(Vf),Ae.updateMatrixWorld(),dt.makeTranslation(-Ga.x,-Ga.y,-Ga.z),dm.multiplyMatrices(Ae.projectionMatrix,Ae.matrixWorldInverse),V._frustum.setFromProjectionMatrix(dm,Ae.coordinateSystem,Ae.reversedDepth)}if(V.map.isWebGLCubeRenderTarget)i.setRenderTarget(V.map,ie),i.clear();else{ie===0&&(i.setRenderTarget(V.map),i.clear());let Ae=V.getViewport(ie);a.set(r.x*Ae.x,r.y*Ae.y,r.x*Ae.z,r.y*Ae.w),F.viewport(a)}n=V.getFrustum(ie),_(C,x,De,z,this.type)}V.isPointLightShadow!==!0&&this.type===br&&S(V,x),V.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(b,E,D)};function S(T,C){let x=e.update(y);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,h.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,h.needsUpdate=!0),T.mapPass===null?T.mapPass=new Jt(s.x,s.y,{format:es,type:$n}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),d.uniforms.shadow_pass.value=T.map.depthTexture,d.uniforms.resolution.value.set(T.map.width,T.map.height),d.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(C,null,x,d,y,null),h.uniforms.shadow_pass.value=T.mapPass.texture,h.uniforms.resolution.value.set(T.map.width,T.map.height),h.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(C,null,x,h,y,null)}function A(T,C,x,b){let E=null,D=x.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(D!==void 0)E=D;else if(E=x.isPointLight===!0?c:o,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let F=E.uuid,N=C.uuid,P=l[F];P===void 0&&(P={},l[F]=P);let U=P[N];U===void 0&&(U=E.clone(),P[N]=U,C.addEventListener("dispose",w)),E=U}if(E.visible=C.visible,E.wireframe=C.wireframe,b===br?E.side=C.shadowSide!==null?C.shadowSide:C.side:E.side=C.shadowSide!==null?C.shadowSide:f[C.side],E.alphaMap=C.alphaMap,E.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,E.map=C.map,E.clipShadows=C.clipShadows,E.clippingPlanes=C.clippingPlanes,E.clipIntersection=C.clipIntersection,E.displacementMap=C.displacementMap,E.displacementScale=C.displacementScale,E.displacementBias=C.displacementBias,E.wireframeLinewidth=C.wireframeLinewidth,E.linewidth=C.linewidth,x.isPointLight===!0&&E.isMeshDistanceMaterial===!0){let F=i.properties.get(E);F.light=x}return E}function _(T,C,x,b,E){if(T.visible===!1)return;if(T.layers.test(C.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&E===br)&&(!T.frustumCulled||T.intersectsFrustum(n))){T.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,T.matrixWorld);let N=e.update(T),P=T.material;if(Array.isArray(P)){let U=N.groups;for(let z=0,V=U.length;z<V;z++){let j=U[z],q=P[j.materialIndex];if(q&&q.visible){let J=A(T,q,b,E);T.onBeforeShadow(i,T,C,x,N,J,j),i.renderBufferDirect(x,null,N,J,T,j),T.onAfterShadow(i,T,C,x,N,J,j)}}}else if(P.visible){let U=A(T,P,b,E);T.onBeforeShadow(i,T,C,x,N,U,null),i.renderBufferDirect(x,null,N,U,T,null),T.onAfterShadow(i,T,C,x,N,U,null)}}let F=T.children;for(let N=0,P=F.length;N<P;N++)_(F[N],C,x,b,E)}function w(T){T.target.removeEventListener("dispose",w);for(let x in l){let b=l[x],E=T.target.uuid;E in b&&(b[E].dispose(),delete b[E])}}}function _b(i,e){function t(){let k=!1,pe=new yt,Q=null,me=new yt(0,0,0,0);return{setMask:function(Se){Q!==Se&&!k&&(i.colorMask(Se,Se,Se,Se),Q=Se)},setLocked:function(Se){k=Se},setClear:function(Se,se,Oe,Pe,Tt){Tt===!0&&(Se*=Pe,se*=Pe,Oe*=Pe),pe.set(Se,se,Oe,Pe),me.equals(pe)===!1&&(i.clearColor(Se,se,Oe,Pe),me.copy(pe))},reset:function(){k=!1,Q=null,me.set(-1,0,0,0)}}}function n(){let k=!1,pe=!1,Q=null,me=null,Se=null;return{setReversed:function(se){if(pe!==se){let Oe=e.get("EXT_clip_control");se?Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.ZERO_TO_ONE_EXT):Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.NEGATIVE_ONE_TO_ONE_EXT),pe=se;let Pe=Se;Se=null,this.setClear(Pe)}},getReversed:function(){return pe},setTest:function(se){se?te(i.DEPTH_TEST):_e(i.DEPTH_TEST)},setMask:function(se){Q!==se&&!k&&(i.depthMask(se),Q=se)},setFunc:function(se){if(pe&&(se=Op[se]),me!==se){switch(se){case Oo:i.depthFunc(i.NEVER);break;case Bo:i.depthFunc(i.ALWAYS);break;case ko:i.depthFunc(i.LESS);break;case tr:i.depthFunc(i.LEQUAL);break;case zo:i.depthFunc(i.EQUAL);break;case Go:i.depthFunc(i.GEQUAL);break;case Vo:i.depthFunc(i.GREATER);break;case Ho:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}me=se}},setLocked:function(se){k=se},setClear:function(se){Se!==se&&(Se=se,pe&&(se=1-se),i.clearDepth(se))},reset:function(){k=!1,Q=null,me=null,Se=null,pe=!1}}}function s(){let k=!1,pe=null,Q=null,me=null,Se=null,se=null,Oe=null,Pe=null,Tt=null;return{setTest:function(pt){k||(pt?te(i.STENCIL_TEST):_e(i.STENCIL_TEST))},setMask:function(pt){pe!==pt&&!k&&(i.stencilMask(pt),pe=pt)},setFunc:function(pt,Nn,Yn){(Q!==pt||me!==Nn||Se!==Yn)&&(i.stencilFunc(pt,Nn,Yn),Q=pt,me=Nn,Se=Yn)},setOp:function(pt,Nn,Yn){(se!==pt||Oe!==Nn||Pe!==Yn)&&(i.stencilOp(pt,Nn,Yn),se=pt,Oe=Nn,Pe=Yn)},setLocked:function(pt){k=pt},setClear:function(pt){Tt!==pt&&(i.clearStencil(pt),Tt=pt)},reset:function(){k=!1,pe=null,Q=null,me=null,Se=null,se=null,Oe=null,Pe=null,Tt=null}}}let r=new t,a=new n,o=new s,c=new WeakMap,l=new WeakMap,u={},f={},d={},h=new WeakMap,m=[],y=null,g=!1,p=null,S=null,A=null,_=null,w=null,T=null,C=null,x=new be(0,0,0),b=0,E=!1,D=null,F=null,N=null,P=null,U=null,z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),V=!1,j=0,q=i.getParameter(i.VERSION);q.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(q)[1]),V=j>=1):q.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),V=j>=2);let J=null,ie={},De=i.getParameter(i.SCISSOR_BOX),Ae=i.getParameter(i.VIEWPORT),dt=new yt().fromArray(De),st=new yt().fromArray(Ae);function ct(k,pe,Q,me){let Se=new Uint8Array(4),se=i.createTexture();i.bindTexture(k,se),i.texParameteri(k,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(k,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Oe=0;Oe<Q;Oe++)k===i.TEXTURE_3D||k===i.TEXTURE_2D_ARRAY?i.texImage3D(pe,0,i.RGBA,1,1,me,0,i.RGBA,i.UNSIGNED_BYTE,Se):i.texImage2D(pe+Oe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Se);return se}let Z={};Z[i.TEXTURE_2D]=ct(i.TEXTURE_2D,i.TEXTURE_2D,1),Z[i.TEXTURE_CUBE_MAP]=ct(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[i.TEXTURE_2D_ARRAY]=ct(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Z[i.TEXTURE_3D]=ct(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),te(i.DEPTH_TEST),a.setFunc(tr),le(!1),fe(lf),te(i.CULL_FACE),ae(oi);function te(k){u[k]!==!0&&(i.enable(k),u[k]=!0)}function _e(k){u[k]!==!1&&(i.disable(k),u[k]=!1)}function We(k,pe){return d[k]!==pe?(i.bindFramebuffer(k,pe),d[k]=pe,k===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=pe),k===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=pe),!0):!1}function Me(k,pe){let Q=m,me=!1;if(k){Q=h.get(pe),Q===void 0&&(Q=[],h.set(pe,Q));let Se=k.textures;if(Q.length!==Se.length||Q[0]!==i.COLOR_ATTACHMENT0){for(let se=0,Oe=Se.length;se<Oe;se++)Q[se]=i.COLOR_ATTACHMENT0+se;Q.length=Se.length,me=!0}}else Q[0]!==i.BACK&&(Q[0]=i.BACK,me=!0);me&&i.drawBuffers(Q)}function Xe(k){return y!==k?(i.useProgram(k),y=k,!0):!1}let _t={[Ts]:i.FUNC_ADD,[sp]:i.FUNC_SUBTRACT,[rp]:i.FUNC_REVERSE_SUBTRACT};_t[ap]=i.MIN,_t[op]=i.MAX;let ne={[lp]:i.ZERO,[cp]:i.ONE,[up]:i.SRC_COLOR,[df]:i.SRC_ALPHA,[gp]:i.SRC_ALPHA_SATURATE,[pp]:i.DST_COLOR,[dp]:i.DST_ALPHA,[fp]:i.ONE_MINUS_SRC_COLOR,[hf]:i.ONE_MINUS_SRC_ALPHA,[mp]:i.ONE_MINUS_DST_COLOR,[hp]:i.ONE_MINUS_DST_ALPHA,[xp]:i.CONSTANT_COLOR,[_p]:i.ONE_MINUS_CONSTANT_COLOR,[vp]:i.CONSTANT_ALPHA,[yp]:i.ONE_MINUS_CONSTANT_ALPHA};function ae(k,pe,Q,me,Se,se,Oe,Pe,Tt,pt){if(k===oi){g===!0&&(_e(i.BLEND),g=!1);return}if(g===!1&&(te(i.BLEND),g=!0),k!==ip){if(k!==p||pt!==E){if((S!==Ts||w!==Ts)&&(i.blendEquation(i.FUNC_ADD),S=Ts,w=Ts),pt)switch(k){case Sr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case cf:i.blendFunc(i.ONE,i.ONE);break;case uf:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ff:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ve("WebGLState: Invalid blending: ",k);break}else switch(k){case Sr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case cf:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case uf:Ve("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ff:Ve("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ve("WebGLState: Invalid blending: ",k);break}A=null,_=null,T=null,C=null,x.set(0,0,0),b=0,p=k,E=pt}return}Se=Se||pe,se=se||Q,Oe=Oe||me,(pe!==S||Se!==w)&&(i.blendEquationSeparate(_t[pe],_t[Se]),S=pe,w=Se),(Q!==A||me!==_||se!==T||Oe!==C)&&(i.blendFuncSeparate(ne[Q],ne[me],ne[se],ne[Oe]),A=Q,_=me,T=se,C=Oe),(Pe.equals(x)===!1||Tt!==b)&&(i.blendColor(Pe.r,Pe.g,Pe.b,Tt),x.copy(Pe),b=Tt),p=k,E=!1}function oe(k,pe){k.side===en?_e(i.CULL_FACE):te(i.CULL_FACE);let Q=k.side===ln;pe&&(Q=!Q),le(Q),k.blending===Sr&&k.transparent===!1?ae(oi):ae(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),a.setFunc(k.depthFunc),a.setTest(k.depthTest),a.setMask(k.depthWrite),r.setMask(k.colorWrite);let me=k.stencilWrite;o.setTest(me),me&&(o.setMask(k.stencilWriteMask),o.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),o.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),ke(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?te(i.SAMPLE_ALPHA_TO_COVERAGE):_e(i.SAMPLE_ALPHA_TO_COVERAGE)}function le(k){D!==k&&(k?i.frontFace(i.CW):i.frontFace(i.CCW),D=k)}function fe(k){k!==ep?(te(i.CULL_FACE),k!==F&&(k===lf?i.cullFace(i.BACK):k===tp?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):_e(i.CULL_FACE),F=k}function ze(k){k!==N&&(V&&i.lineWidth(k),N=k)}function ke(k,pe,Q){k?(te(i.POLYGON_OFFSET_FILL),(P!==pe||U!==Q)&&(P=pe,U=Q,a.getReversed()&&(pe=-pe),i.polygonOffset(pe,Q))):_e(i.POLYGON_OFFSET_FILL)}function qe(k){k?te(i.SCISSOR_TEST):_e(i.SCISSOR_TEST)}function Ke(k){k===void 0&&(k=i.TEXTURE0+z-1),J!==k&&(i.activeTexture(k),J=k)}function O(k,pe,Q){Q===void 0&&(J===null?Q=i.TEXTURE0+z-1:Q=J);let me=ie[Q];me===void 0&&(me={type:void 0,texture:void 0},ie[Q]=me),(me.type!==k||me.texture!==pe)&&(J!==Q&&(i.activeTexture(Q),J=Q),i.bindTexture(k,pe||Z[k]),me.type=k,me.texture=pe)}function ht(){let k=ie[J];k!==void 0&&k.type!==void 0&&(i.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function rt(){try{i.compressedTexImage2D(...arguments)}catch(k){Ve("WebGLState:",k)}}function R(){try{i.compressedTexImage3D(...arguments)}catch(k){Ve("WebGLState:",k)}}function v(){try{i.texSubImage2D(...arguments)}catch(k){Ve("WebGLState:",k)}}function G(){try{i.texSubImage3D(...arguments)}catch(k){Ve("WebGLState:",k)}}function X(){try{i.compressedTexSubImage2D(...arguments)}catch(k){Ve("WebGLState:",k)}}function Y(){try{i.compressedTexSubImage3D(...arguments)}catch(k){Ve("WebGLState:",k)}}function ce(){try{i.texStorage2D(...arguments)}catch(k){Ve("WebGLState:",k)}}function ue(){try{i.texStorage3D(...arguments)}catch(k){Ve("WebGLState:",k)}}function K(){try{i.texImage2D(...arguments)}catch(k){Ve("WebGLState:",k)}}function ee(){try{i.texImage3D(...arguments)}catch(k){Ve("WebGLState:",k)}}function de(k){return f[k]!==void 0?f[k]:i.getParameter(k)}function Ne(k,pe){f[k]!==pe&&(i.pixelStorei(k,pe),f[k]=pe)}function ge(k){dt.equals(k)===!1&&(i.scissor(k.x,k.y,k.z,k.w),dt.copy(k))}function he(k){st.equals(k)===!1&&(i.viewport(k.x,k.y,k.z,k.w),st.copy(k))}function Ue(k,pe){let Q=l.get(pe);Q===void 0&&(Q=new WeakMap,l.set(pe,Q));let me=Q.get(k);me===void 0&&(me=i.getUniformBlockIndex(pe,k.name),Q.set(k,me))}function Ge(k,pe){let me=l.get(pe).get(k);c.get(pe)!==me&&(i.uniformBlockBinding(pe,me,k.__bindingPointIndex),c.set(pe,me))}function Ze(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},f={},J=null,ie={},d={},h=new WeakMap,m=[],y=null,g=!1,p=null,S=null,A=null,_=null,w=null,T=null,C=null,x=new be(0,0,0),b=0,E=!1,D=null,F=null,N=null,P=null,U=null,dt.set(0,0,i.canvas.width,i.canvas.height),st.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:te,disable:_e,bindFramebuffer:We,drawBuffers:Me,useProgram:Xe,setBlending:ae,setMaterial:oe,setFlipSided:le,setCullFace:fe,setLineWidth:ze,setPolygonOffset:ke,setScissorTest:qe,activeTexture:Ke,bindTexture:O,unbindTexture:ht,compressedTexImage2D:rt,compressedTexImage3D:R,texImage2D:K,texImage3D:ee,pixelStorei:Ne,getParameter:de,updateUBOMapping:Ue,uniformBlockBinding:Ge,texStorage2D:ce,texStorage3D:ue,texSubImage2D:v,texSubImage3D:G,compressedTexSubImage2D:X,compressedTexSubImage3D:Y,scissor:ge,viewport:he,reset:Ze}}function vb(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new re,u=new WeakMap,f=new Set,d,h=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(R,v){return m?new OffscreenCanvas(R,v):sr("canvas")}function g(R,v,G){let X=1,Y=rt(R);if((Y.width>G||Y.height>G)&&(X=G/Math.max(Y.width,Y.height)),X<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){let ce=Math.floor(X*Y.width),ue=Math.floor(X*Y.height);d===void 0&&(d=y(ce,ue));let K=v?y(ce,ue):d;return K.width=ce,K.height=ue,K.getContext("2d").drawImage(R,0,0,ce,ue),Le("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+ce+"x"+ue+")."),K}else return"data"in R&&Le("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),R;return R}function p(R){return R.generateMipmaps}function S(R){i.generateMipmap(R)}function A(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(R,v,G,X,Y,ce=!1){if(R!==null){if(i[R]!==void 0)return i[R];Le("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let ue;X&&(ue=e.get("EXT_texture_norm16"),ue||Le("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let K=v;if(v===i.RED&&(G===i.FLOAT&&(K=i.R32F),G===i.HALF_FLOAT&&(K=i.R16F),G===i.UNSIGNED_BYTE&&(K=i.R8),G===i.UNSIGNED_SHORT&&ue&&(K=ue.R16_EXT),G===i.SHORT&&ue&&(K=ue.R16_SNORM_EXT)),v===i.RED_INTEGER&&(G===i.UNSIGNED_BYTE&&(K=i.R8UI),G===i.UNSIGNED_SHORT&&(K=i.R16UI),G===i.UNSIGNED_INT&&(K=i.R32UI),G===i.BYTE&&(K=i.R8I),G===i.SHORT&&(K=i.R16I),G===i.INT&&(K=i.R32I)),v===i.RG&&(G===i.FLOAT&&(K=i.RG32F),G===i.HALF_FLOAT&&(K=i.RG16F),G===i.UNSIGNED_BYTE&&(K=i.RG8),G===i.UNSIGNED_SHORT&&ue&&(K=ue.RG16_EXT),G===i.SHORT&&ue&&(K=ue.RG16_SNORM_EXT)),v===i.RG_INTEGER&&(G===i.UNSIGNED_BYTE&&(K=i.RG8UI),G===i.UNSIGNED_SHORT&&(K=i.RG16UI),G===i.UNSIGNED_INT&&(K=i.RG32UI),G===i.BYTE&&(K=i.RG8I),G===i.SHORT&&(K=i.RG16I),G===i.INT&&(K=i.RG32I)),v===i.RGB_INTEGER&&(G===i.UNSIGNED_BYTE&&(K=i.RGB8UI),G===i.UNSIGNED_SHORT&&(K=i.RGB16UI),G===i.UNSIGNED_INT&&(K=i.RGB32UI),G===i.BYTE&&(K=i.RGB8I),G===i.SHORT&&(K=i.RGB16I),G===i.INT&&(K=i.RGB32I)),v===i.RGBA_INTEGER&&(G===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),G===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),G===i.UNSIGNED_INT&&(K=i.RGBA32UI),G===i.BYTE&&(K=i.RGBA8I),G===i.SHORT&&(K=i.RGBA16I),G===i.INT&&(K=i.RGBA32I)),v===i.RGB&&(G===i.UNSIGNED_SHORT&&ue&&(K=ue.RGB16_EXT),G===i.SHORT&&ue&&(K=ue.RGB16_SNORM_EXT),G===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),G===i.UNSIGNED_INT_10F_11F_11F_REV&&(K=i.R11F_G11F_B10F)),v===i.RGBA){let ee=ce?ta:nt.getTransfer(Y);G===i.FLOAT&&(K=i.RGBA32F),G===i.HALF_FLOAT&&(K=i.RGBA16F),G===i.UNSIGNED_BYTE&&(K=ee===gt?i.SRGB8_ALPHA8:i.RGBA8),G===i.UNSIGNED_SHORT&&ue&&(K=ue.RGBA16_EXT),G===i.SHORT&&ue&&(K=ue.RGBA16_SNORM_EXT),G===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),G===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function w(R,v){let G;return R?v===null||v===qn||v===Tr?G=i.DEPTH24_STENCIL8:v===wn?G=i.DEPTH32F_STENCIL8:v===wr&&(G=i.DEPTH24_STENCIL8,Le("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===qn||v===Tr?G=i.DEPTH_COMPONENT24:v===wn?G=i.DEPTH_COMPONENT32F:v===wr&&(G=i.DEPTH_COMPONENT16),G}function T(R,v){return p(R)===!0||R.isFramebufferTexture&&R.minFilter!==Ut&&R.minFilter!==Ft?Math.log2(Math.max(v.width,v.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?v.mipmaps.length:1}function C(R){let v=R.target;v.removeEventListener("dispose",C),b(v),v.isVideoTexture&&u.delete(v),v.isHTMLTexture&&f.delete(v)}function x(R){let v=R.target;v.removeEventListener("dispose",x),D(v)}function b(R){let v=n.get(R);if(v.__webglInit===void 0)return;let G=R.source,X=h.get(G);if(X){let Y=X[v.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&E(R),Object.keys(X).length===0&&h.delete(G)}n.remove(R)}function E(R){let v=n.get(R);i.deleteTexture(v.__webglTexture);let G=R.source,X=h.get(G);delete X[v.__cacheKey],a.memory.textures--}function D(R){let v=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(v.__webglFramebuffer[X]))for(let Y=0;Y<v.__webglFramebuffer[X].length;Y++)i.deleteFramebuffer(v.__webglFramebuffer[X][Y]);else i.deleteFramebuffer(v.__webglFramebuffer[X]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[X])}else{if(Array.isArray(v.__webglFramebuffer))for(let X=0;X<v.__webglFramebuffer.length;X++)i.deleteFramebuffer(v.__webglFramebuffer[X]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let X=0;X<v.__webglColorRenderbuffer.length;X++)v.__webglColorRenderbuffer[X]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[X]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let G=R.textures;for(let X=0,Y=G.length;X<Y;X++){let ce=n.get(G[X]);ce.__webglTexture&&(i.deleteTexture(ce.__webglTexture),a.memory.textures--),n.remove(G[X])}n.remove(R)}let F=0;function N(){F=0}function P(){return F}function U(R){F=R}function z(){let R=F;return R>=s.maxTextures&&Le("WebGLTextures: Trying to use "+(R+1)+" texture units while this GPU supports only "+s.maxTextures),F+=1,R}function V(R){let v=[];return v.push(R.wrapS),v.push(R.wrapT),v.push(R.wrapR||0),v.push(R.magFilter),v.push(R.minFilter),v.push(R.anisotropy),v.push(R.internalFormat),v.push(R.format),v.push(R.type),v.push(R.generateMipmaps),v.push(R.premultiplyAlpha),v.push(R.flipY),v.push(R.unpackAlignment),v.push(R.colorSpace),v.join()}function j(R,v){let G=n.get(R);if(R.isVideoTexture&&O(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&G.__version!==R.version){let X=R.image;if(X===null)Le("WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)Le("WebGLRenderer: Texture marked for update but image is incomplete");else{_e(G,R,v);return}}else R.isExternalTexture&&(G.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,G.__webglTexture,i.TEXTURE0+v)}function q(R,v){let G=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&G.__version!==R.version){_e(G,R,v);return}else R.isExternalTexture&&(G.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,G.__webglTexture,i.TEXTURE0+v)}function J(R,v){let G=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&G.__version!==R.version){_e(G,R,v);return}t.bindTexture(i.TEXTURE_3D,G.__webglTexture,i.TEXTURE0+v)}function ie(R,v){let G=n.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&G.__version!==R.version){We(G,R,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture,i.TEXTURE0+v)}let De={[Wi]:i.REPEAT,[Rn]:i.CLAMP_TO_EDGE,[nr]:i.MIRRORED_REPEAT},Ae={[Ut]:i.NEAREST,[xl]:i.NEAREST_MIPMAP_NEAREST,[Es]:i.NEAREST_MIPMAP_LINEAR,[Ft]:i.LINEAR,[Mr]:i.LINEAR_MIPMAP_NEAREST,[Xn]:i.LINEAR_MIPMAP_LINEAR},dt={[Cp]:i.NEVER,[Dp]:i.ALWAYS,[Rp]:i.LESS,[nc]:i.LEQUAL,[Pp]:i.EQUAL,[ic]:i.GEQUAL,[Ip]:i.GREATER,[Lp]:i.NOTEQUAL};function st(R,v){if(v.type===wn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Ft||v.magFilter===Mr||v.magFilter===Es||v.magFilter===Xn||v.minFilter===Ft||v.minFilter===Mr||v.minFilter===Es||v.minFilter===Xn)&&Le("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,De[v.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,De[v.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,De[v.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,Ae[v.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,Ae[v.minFilter]),v.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,dt[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Ut||v.minFilter!==Es&&v.minFilter!==Xn||v.type===wn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){let G=e.get("EXT_texture_filter_anisotropic");i.texParameterf(R,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function ct(R,v){let G=!1;R.__webglInit===void 0&&(R.__webglInit=!0,v.addEventListener("dispose",C));let X=v.source,Y=h.get(X);Y===void 0&&(Y={},h.set(X,Y));let ce=V(v);if(ce!==R.__cacheKey){Y[ce]===void 0&&(Y[ce]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,G=!0),Y[ce].usedTimes++;let ue=Y[R.__cacheKey];ue!==void 0&&(Y[R.__cacheKey].usedTimes--,ue.usedTimes===0&&E(v)),R.__cacheKey=ce,R.__webglTexture=Y[ce].texture}return G}function Z(R,v,G){return Math.floor(Math.floor(R/G)/v)}function te(R,v,G,X){let ce=R.updateRanges;if(ce.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,G,X,v.data);else{ce.sort((Ne,ge)=>Ne.start-ge.start);let ue=0;for(let Ne=1;Ne<ce.length;Ne++){let ge=ce[ue],he=ce[Ne],Ue=ge.start+ge.count,Ge=Z(he.start,v.width,4),Ze=Z(ge.start,v.width,4);he.start<=Ue+1&&Ge===Ze&&Z(he.start+he.count-1,v.width,4)===Ge?ge.count=Math.max(ge.count,he.start+he.count-ge.start):(++ue,ce[ue]=he)}ce.length=ue+1;let K=t.getParameter(i.UNPACK_ROW_LENGTH),ee=t.getParameter(i.UNPACK_SKIP_PIXELS),de=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let Ne=0,ge=ce.length;Ne<ge;Ne++){let he=ce[Ne],Ue=Math.floor(he.start/4),Ge=Math.ceil(he.count/4),Ze=Ue%v.width,k=Math.floor(Ue/v.width),pe=Ge,Q=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Ze),t.pixelStorei(i.UNPACK_SKIP_ROWS,k),t.texSubImage2D(i.TEXTURE_2D,0,Ze,k,pe,Q,G,X,v.data)}R.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,K),t.pixelStorei(i.UNPACK_SKIP_PIXELS,ee),t.pixelStorei(i.UNPACK_SKIP_ROWS,de)}}function _e(R,v,G){let X=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(X=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(X=i.TEXTURE_3D);let Y=ct(R,v),ce=v.source;t.bindTexture(X,R.__webglTexture,i.TEXTURE0+G);let ue=n.get(ce);if(ce.version!==ue.__version||Y===!0){if(t.activeTexture(i.TEXTURE0+G),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){let Q=nt.getPrimaries(nt.workingColorSpace),me=v.colorSpace===Ri?null:nt.getPrimaries(v.colorSpace),Se=v.colorSpace===Ri||Q===me?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se)}t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment);let ee=g(v.image,!1,s.maxTextureSize);ee=ht(v,ee);let de=r.convert(v.format,v.colorSpace),Ne=r.convert(v.type),ge=_(v.internalFormat,de,Ne,v.normalized,v.colorSpace,v.isVideoTexture);st(X,v);let he,Ue=v.mipmaps,Ge=v.isVideoTexture!==!0,Ze=ue.__version===void 0||Y===!0,k=ce.dataReady,pe=T(v,ee);if(v.isDepthTexture)ge=w(v.format===Qi,v.type),Ze&&(Ge?t.texStorage2D(i.TEXTURE_2D,1,ge,ee.width,ee.height):t.texImage2D(i.TEXTURE_2D,0,ge,ee.width,ee.height,0,de,Ne,null));else if(v.isDataTexture)if(Ue.length>0){Ge&&Ze&&t.texStorage2D(i.TEXTURE_2D,pe,ge,Ue[0].width,Ue[0].height);for(let Q=0,me=Ue.length;Q<me;Q++)he=Ue[Q],Ge?k&&t.texSubImage2D(i.TEXTURE_2D,Q,0,0,he.width,he.height,de,Ne,he.data):t.texImage2D(i.TEXTURE_2D,Q,ge,he.width,he.height,0,de,Ne,he.data);v.generateMipmaps=!1}else Ge?(Ze&&t.texStorage2D(i.TEXTURE_2D,pe,ge,ee.width,ee.height),k&&te(v,ee,de,Ne)):t.texImage2D(i.TEXTURE_2D,0,ge,ee.width,ee.height,0,de,Ne,ee.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Ge&&Ze&&t.texStorage3D(i.TEXTURE_2D_ARRAY,pe,ge,Ue[0].width,Ue[0].height,ee.depth);for(let Q=0,me=Ue.length;Q<me;Q++)if(he=Ue[Q],v.format!==Tn)if(de!==null)if(Ge){if(k)if(v.layerUpdates.size>0){let Se=Ff(he.width,he.height,v.format,v.type);for(let se of v.layerUpdates){let Oe=he.data.subarray(se*Se/he.data.BYTES_PER_ELEMENT,(se+1)*Se/he.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,se,he.width,he.height,1,de,Oe)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,0,he.width,he.height,ee.depth,de,he.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Q,ge,he.width,he.height,ee.depth,0,he.data,0,0);else Le("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ge?k&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,0,he.width,he.height,ee.depth,de,Ne,he.data):t.texImage3D(i.TEXTURE_2D_ARRAY,Q,ge,he.width,he.height,ee.depth,0,de,Ne,he.data);v.layerUpdates.size>0&&v.clearLayerUpdates()}else{Ge&&Ze&&t.texStorage2D(i.TEXTURE_2D,pe,ge,Ue[0].width,Ue[0].height);for(let Q=0,me=Ue.length;Q<me;Q++)he=Ue[Q],v.format!==Tn?de!==null?Ge?k&&t.compressedTexSubImage2D(i.TEXTURE_2D,Q,0,0,he.width,he.height,de,he.data):t.compressedTexImage2D(i.TEXTURE_2D,Q,ge,he.width,he.height,0,he.data):Le("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ge?k&&t.texSubImage2D(i.TEXTURE_2D,Q,0,0,he.width,he.height,de,Ne,he.data):t.texImage2D(i.TEXTURE_2D,Q,ge,he.width,he.height,0,de,Ne,he.data)}else if(v.isDataArrayTexture)if(Ge){if(Ze&&t.texStorage3D(i.TEXTURE_2D_ARRAY,pe,ge,ee.width,ee.height,ee.depth),k)if(v.layerUpdates.size>0){let Q=Ff(ee.width,ee.height,v.format,v.type);for(let me of v.layerUpdates){let Se=ee.data.subarray(me*Q/ee.data.BYTES_PER_ELEMENT,(me+1)*Q/ee.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,me,ee.width,ee.height,1,de,Ne,Se)}v.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,de,Ne,ee.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ge,ee.width,ee.height,ee.depth,0,de,Ne,ee.data);else if(v.isData3DTexture)Ge?(Ze&&t.texStorage3D(i.TEXTURE_3D,pe,ge,ee.width,ee.height,ee.depth),k&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,de,Ne,ee.data)):t.texImage3D(i.TEXTURE_3D,0,ge,ee.width,ee.height,ee.depth,0,de,Ne,ee.data);else if(v.isFramebufferTexture){if(Ze)if(Ge)t.texStorage2D(i.TEXTURE_2D,pe,ge,ee.width,ee.height);else{let Q=ee.width,me=ee.height;for(let Se=0;Se<pe;Se++)t.texImage2D(i.TEXTURE_2D,Se,ge,Q,me,0,de,Ne,null),Q>>=1,me>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in i){let Q=i.canvas;if(Q.hasAttribute("layoutsubtree")||Q.setAttribute("layoutsubtree","true"),ee.parentNode!==Q){Q.appendChild(ee),f.add(v),Q.onpaint=me=>{let Se=me.changedElements;for(let se of f)Se.includes(se.image)&&(se.needsUpdate=!0)},Q.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ee);else{let Se=i.RGBA,se=i.RGBA,Oe=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Se,se,Oe,ee)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Ue.length>0){if(Ge&&Ze){let Q=rt(Ue[0]);t.texStorage2D(i.TEXTURE_2D,pe,ge,Q.width,Q.height)}for(let Q=0,me=Ue.length;Q<me;Q++)he=Ue[Q],Ge?k&&t.texSubImage2D(i.TEXTURE_2D,Q,0,0,de,Ne,he):t.texImage2D(i.TEXTURE_2D,Q,ge,de,Ne,he);v.generateMipmaps=!1}else if(Ge){if(Ze){let Q=rt(ee);t.texStorage2D(i.TEXTURE_2D,pe,ge,Q.width,Q.height)}k&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,de,Ne,ee)}else t.texImage2D(i.TEXTURE_2D,0,ge,de,Ne,ee);p(v)&&S(X),ue.__version=ce.version,v.onUpdate&&v.onUpdate(v)}R.__version=v.version}function We(R,v,G){if(v.image.length!==6)return;let X=ct(R,v),Y=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+G);let ce=n.get(Y);if(Y.version!==ce.__version||X===!0){t.activeTexture(i.TEXTURE0+G);let ue=nt.getPrimaries(nt.workingColorSpace),K=v.colorSpace===Ri?null:nt.getPrimaries(v.colorSpace),ee=v.colorSpace===Ri||ue===K?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ee);let de=v.isCompressedTexture||v.image[0].isCompressedTexture,Ne=v.image[0]&&v.image[0].isDataTexture,ge=[];for(let se=0;se<6;se++)!de&&!Ne?ge[se]=g(v.image[se],!0,s.maxCubemapSize):ge[se]=Ne?v.image[se].image:v.image[se],ge[se]=ht(v,ge[se]);let he=ge[0],Ue=r.convert(v.format,v.colorSpace),Ge=r.convert(v.type),Ze=_(v.internalFormat,Ue,Ge,v.normalized,v.colorSpace),k=v.isVideoTexture!==!0,pe=ce.__version===void 0||X===!0,Q=Y.dataReady,me=T(v,he);st(i.TEXTURE_CUBE_MAP,v);let Se;if(de){k&&pe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,me,Ze,he.width,he.height);for(let se=0;se<6;se++){Se=ge[se].mipmaps;for(let Oe=0;Oe<Se.length;Oe++){let Pe=Se[Oe];v.format!==Tn?Ue!==null?k?Q&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Oe,0,0,Pe.width,Pe.height,Ue,Pe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Oe,Ze,Pe.width,Pe.height,0,Pe.data):Le("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):k?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Oe,0,0,Pe.width,Pe.height,Ue,Ge,Pe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Oe,Ze,Pe.width,Pe.height,0,Ue,Ge,Pe.data)}}}else{if(Se=v.mipmaps,k&&pe){Se.length>0&&me++;let se=rt(ge[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,me,Ze,se.width,se.height)}for(let se=0;se<6;se++)if(Ne){k?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,ge[se].width,ge[se].height,Ue,Ge,ge[se].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,Ze,ge[se].width,ge[se].height,0,Ue,Ge,ge[se].data);for(let Oe=0;Oe<Se.length;Oe++){let Tt=Se[Oe].image[se].image;k?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Oe+1,0,0,Tt.width,Tt.height,Ue,Ge,Tt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Oe+1,Ze,Tt.width,Tt.height,0,Ue,Ge,Tt.data)}}else{k?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,Ue,Ge,ge[se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,Ze,Ue,Ge,ge[se]);for(let Oe=0;Oe<Se.length;Oe++){let Pe=Se[Oe];k?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Oe+1,0,0,Ue,Ge,Pe.image[se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Oe+1,Ze,Ue,Ge,Pe.image[se])}}}p(v)&&S(i.TEXTURE_CUBE_MAP),ce.__version=Y.version,v.onUpdate&&v.onUpdate(v)}R.__version=v.version}function Me(R,v,G,X,Y,ce){let ue=r.convert(G.format,G.colorSpace),K=r.convert(G.type),ee=_(G.internalFormat,ue,K,G.normalized,G.colorSpace),de=n.get(v),Ne=n.get(G);if(Ne.__renderTarget=v,!de.__hasExternalTextures){let ge=Math.max(1,v.width>>ce),he=Math.max(1,v.height>>ce);Y===i.TEXTURE_3D||Y===i.TEXTURE_2D_ARRAY?t.texImage3D(Y,ce,ee,ge,he,v.depth,0,ue,K,null):t.texImage2D(Y,ce,ee,ge,he,0,ue,K,null)}t.bindFramebuffer(i.FRAMEBUFFER,R),Ke(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,X,Y,Ne.__webglTexture,0,qe(v)):(Y===i.TEXTURE_2D||Y>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,X,Y,Ne.__webglTexture,ce),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Xe(R,v,G){if(i.bindRenderbuffer(i.RENDERBUFFER,R),v.depthBuffer){let X=v.depthTexture,Y=X&&X.isDepthTexture?X.type:null,ce=w(v.stencilBuffer,Y),ue=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Ke(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,qe(v),ce,v.width,v.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,qe(v),ce,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,ce,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ue,i.RENDERBUFFER,R)}else{let X=v.textures;for(let Y=0;Y<X.length;Y++){let ce=X[Y],ue=r.convert(ce.format,ce.colorSpace),K=r.convert(ce.type),ee=_(ce.internalFormat,ue,K,ce.normalized,ce.colorSpace);Ke(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,qe(v),ee,v.width,v.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,qe(v),ee,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,ee,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function _t(R,v,G){let X=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,R),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Y=n.get(v.depthTexture);if(Y.__renderTarget=v,(!Y.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),X){if(Y.__webglInit===void 0&&(Y.__webglInit=!0,v.depthTexture.addEventListener("dispose",C)),Y.__webglTexture===void 0){Y.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),st(i.TEXTURE_CUBE_MAP,v.depthTexture);let de=r.convert(v.depthTexture.format),Ne=r.convert(v.depthTexture.type),ge;v.depthTexture.format===ei?ge=i.DEPTH_COMPONENT24:v.depthTexture.format===Qi&&(ge=i.DEPTH24_STENCIL8);for(let he=0;he<6;he++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,ge,v.width,v.height,0,de,Ne,null)}}else j(v.depthTexture,0);let ce=Y.__webglTexture,ue=qe(v),K=X?i.TEXTURE_CUBE_MAP_POSITIVE_X+G:i.TEXTURE_2D,ee=v.depthTexture.format===Qi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(v.depthTexture.format===ei)Ke(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ee,K,ce,0,ue):i.framebufferTexture2D(i.FRAMEBUFFER,ee,K,ce,0);else if(v.depthTexture.format===Qi)Ke(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ee,K,ce,0,ue):i.framebufferTexture2D(i.FRAMEBUFFER,ee,K,ce,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ne(R){let v=n.get(R),G=R.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==R.depthTexture){let X=R.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),X){let Y=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,X.removeEventListener("dispose",Y)};X.addEventListener("dispose",Y),v.__depthDisposeCallback=Y}v.__boundDepthTexture=X}if(R.depthTexture&&!v.__autoAllocateDepthBuffer)if(G)for(let X=0;X<6;X++)_t(v.__webglFramebuffer[X],R,X);else{let X=R.texture.mipmaps;X&&X.length>0?_t(v.__webglFramebuffer[0],R,0):_t(v.__webglFramebuffer,R,0)}else if(G){v.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[X]),v.__webglDepthbuffer[X]===void 0)v.__webglDepthbuffer[X]=i.createRenderbuffer(),Xe(v.__webglDepthbuffer[X],R,!1);else{let Y=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ce=v.__webglDepthbuffer[X];i.bindRenderbuffer(i.RENDERBUFFER,ce),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,ce)}}else{let X=R.texture.mipmaps;if(X&&X.length>0?t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),Xe(v.__webglDepthbuffer,R,!1);else{let Y=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ce=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ce),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,ce)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function ae(R,v,G){let X=n.get(R);v!==void 0&&Me(X.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),G!==void 0&&ne(R)}function oe(R){let v=R.texture,G=n.get(R),X=n.get(v);R.addEventListener("dispose",x);let Y=R.textures,ce=R.isWebGLCubeRenderTarget===!0,ue=Y.length>1;if(ue||(X.__webglTexture===void 0&&(X.__webglTexture=i.createTexture()),X.__version=v.version,a.memory.textures++),ce){G.__webglFramebuffer=[];for(let K=0;K<6;K++)if(v.mipmaps&&v.mipmaps.length>0){G.__webglFramebuffer[K]=[];for(let ee=0;ee<v.mipmaps.length;ee++)G.__webglFramebuffer[K][ee]=i.createFramebuffer()}else G.__webglFramebuffer[K]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){G.__webglFramebuffer=[];for(let K=0;K<v.mipmaps.length;K++)G.__webglFramebuffer[K]=i.createFramebuffer()}else G.__webglFramebuffer=i.createFramebuffer();if(ue)for(let K=0,ee=Y.length;K<ee;K++){let de=n.get(Y[K]);de.__webglTexture===void 0&&(de.__webglTexture=i.createTexture(),a.memory.textures++)}if(R.samples>0&&Ke(R)===!1){G.__webglMultisampledFramebuffer=i.createFramebuffer(),G.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let K=0;K<Y.length;K++){let ee=Y[K];G.__webglColorRenderbuffer[K]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,G.__webglColorRenderbuffer[K]);let de=r.convert(ee.format,ee.colorSpace),Ne=r.convert(ee.type),ge=_(ee.internalFormat,de,Ne,ee.normalized,ee.colorSpace,R.isXRRenderTarget===!0),he=qe(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,he,ge,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+K,i.RENDERBUFFER,G.__webglColorRenderbuffer[K])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(G.__webglDepthRenderbuffer=i.createRenderbuffer(),Xe(G.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ce){t.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture),st(i.TEXTURE_CUBE_MAP,v);for(let K=0;K<6;K++)if(v.mipmaps&&v.mipmaps.length>0)for(let ee=0;ee<v.mipmaps.length;ee++)Me(G.__webglFramebuffer[K][ee],R,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ee);else Me(G.__webglFramebuffer[K],R,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0);p(v)&&S(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ue){for(let K=0,ee=Y.length;K<ee;K++){let de=Y[K],Ne=n.get(de),ge=i.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ge=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ge,Ne.__webglTexture),st(ge,de),Me(G.__webglFramebuffer,R,de,i.COLOR_ATTACHMENT0+K,ge,0),p(de)&&S(ge)}t.unbindTexture()}else{let K=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(K=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(K,X.__webglTexture),st(K,v),v.mipmaps&&v.mipmaps.length>0)for(let ee=0;ee<v.mipmaps.length;ee++)Me(G.__webglFramebuffer[ee],R,v,i.COLOR_ATTACHMENT0,K,ee);else Me(G.__webglFramebuffer,R,v,i.COLOR_ATTACHMENT0,K,0);p(v)&&S(K),t.unbindTexture()}R.depthBuffer&&ne(R)}function le(R){let v=R.textures;for(let G=0,X=v.length;G<X;G++){let Y=v[G];if(p(Y)){let ce=A(R),ue=n.get(Y).__webglTexture;t.bindTexture(ce,ue),S(ce),t.unbindTexture()}}}let fe=[],ze=[];function ke(R){if(R.samples>0){if(Ke(R)===!1){let v=R.textures,G=R.width,X=R.height,Y=i.COLOR_BUFFER_BIT,ce=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ue=n.get(R),K=v.length>1;if(K)for(let de=0;de<v.length;de++)t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ue.__webglMultisampledFramebuffer);let ee=R.texture.mipmaps;ee&&ee.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ue.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ue.__webglFramebuffer);for(let de=0;de<v.length;de++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(Y|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(Y|=i.STENCIL_BUFFER_BIT)),K){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ue.__webglColorRenderbuffer[de]);let Ne=n.get(v[de]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ne,0)}i.blitFramebuffer(0,0,G,X,0,0,G,X,Y,i.NEAREST),c===!0&&(fe.length=0,ze.length=0,fe.push(i.COLOR_ATTACHMENT0+de),R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&(fe.push(ce),ze.push(ce),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,ze)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,fe))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),K)for(let de=0;de<v.length;de++){t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.RENDERBUFFER,ue.__webglColorRenderbuffer[de]);let Ne=n.get(v[de]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.TEXTURE_2D,Ne,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ue.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&c){let v=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function qe(R){return Math.min(s.maxSamples,R.samples)}function Ke(R){let v=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function O(R){let v=a.render.frame;u.get(R)!==v&&(u.set(R,v),R.update())}function ht(R,v){let G=R.colorSpace,X=R.format,Y=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||G!==an&&G!==Ri&&(nt.getTransfer(G)===gt?(X!==Tn||Y!==mn)&&Le("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ve("WebGLTextures: Unsupported texture color space:",G)),v}function rt(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=z,this.resetTextureUnits=N,this.getTextureUnits=P,this.setTextureUnits=U,this.setTexture2D=j,this.setTexture2DArray=q,this.setTexture3D=J,this.setTextureCube=ie,this.rebindTextures=ae,this.setupRenderTarget=oe,this.updateRenderTargetMipmap=le,this.updateMultisampleRenderTarget=ke,this.setupDepthRenderbuffer=ne,this.setupFrameBufferTexture=Me,this.useMultisampledRTT=Ke,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function yb(i,e){function t(n,s=Ri){let r,a=nt.getTransfer(s);if(n===mn)return i.UNSIGNED_BYTE;if(n===vl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===yl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===wf)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Tf)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Sf)return i.BYTE;if(n===Mf)return i.SHORT;if(n===wr)return i.UNSIGNED_SHORT;if(n===_l)return i.INT;if(n===qn)return i.UNSIGNED_INT;if(n===wn)return i.FLOAT;if(n===$n)return i.HALF_FLOAT;if(n===Af)return i.ALPHA;if(n===Ef)return i.RGB;if(n===Tn)return i.RGBA;if(n===ei)return i.DEPTH_COMPONENT;if(n===Qi)return i.DEPTH_STENCIL;if(n===bl)return i.RED;if(n===Sl)return i.RED_INTEGER;if(n===es)return i.RG;if(n===Ml)return i.RG_INTEGER;if(n===wl)return i.RGBA_INTEGER;if(n===Da||n===Na||n===Ua||n===Fa)if(a===gt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Da)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Na)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ua)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Fa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Da)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Na)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ua)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Fa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Tl||n===Al||n===El||n===Cl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Tl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Al)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===El)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Cl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Rl||n===Pl||n===Il||n===Ll||n===Dl||n===Oa||n===Nl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Rl||n===Pl)return a===gt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Il)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Ll)return r.COMPRESSED_R11_EAC;if(n===Dl)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Oa)return r.COMPRESSED_RG11_EAC;if(n===Nl)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Ul||n===Fl||n===Ol||n===Bl||n===kl||n===zl||n===Gl||n===Vl||n===Hl||n===Wl||n===Xl||n===ql||n===$l||n===Yl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ul)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Fl)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ol)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Bl)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===kl)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===zl)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Gl)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Vl)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Hl)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Wl)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Xl)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ql)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===$l)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Yl)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Kl||n===Zl||n===jl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Kl)return a===gt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Zl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===jl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Jl||n===Ql||n===Ba||n===ec)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Jl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ql)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ba)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ec)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Tr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var bb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Sb=`
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

}`,Zf=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new ua(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Mn({vertexShader:bb,fragmentShader:Sb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Be(new Vn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},jf=class extends zn{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,f=null,d=null,h=null,m=null,y=typeof XRWebGLBinding<"u",g=new Zf,p={},S=t.getContextAttributes(),A=null,_=null,w=[],T=[],C=new re,x=null,b=null,E=new Xt;E.viewport=new yt;let D=new Xt;D.viewport=new yt;let F=[E,D],N=new hl,P=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let te=w[Z];return te===void 0&&(te=new lr,w[Z]=te),te.getTargetRaySpace()},this.getControllerGrip=function(Z){let te=w[Z];return te===void 0&&(te=new lr,w[Z]=te),te.getGripSpace()},this.getHand=function(Z){let te=w[Z];return te===void 0&&(te=new lr,w[Z]=te),te.getHandSpace()};function z(Z){let te=T.indexOf(Z.inputSource);if(te===-1)return;let _e=w[te];_e!==void 0&&(_e.update(Z.inputSource,Z.frame,l||a),_e.dispatchEvent({type:Z.type,data:Z.inputSource}))}function V(){s.removeEventListener("select",z),s.removeEventListener("selectstart",z),s.removeEventListener("selectend",z),s.removeEventListener("squeeze",z),s.removeEventListener("squeezestart",z),s.removeEventListener("squeezeend",z),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",j);for(let Z=0;Z<w.length;Z++){let te=T[Z];te!==null&&(T[Z]=null,w[Z].disconnect(te))}P=null,U=null,g.reset();for(let Z in p)delete p[Z];if(e.setRenderTarget(A),h=null,d=null,f=null,s=null,_=null,ct.stop(),n.isPresenting=!1,e.setPixelRatio(x),e.setSize(C.width,C.height,!1),b!==null){let Z=b.camera;Z.fov=b.fov,Z.zoom=b.zoom,Z.updateProjectionMatrix(),b=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&Le("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,n.isPresenting===!0&&Le("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(Z){l=Z},this.getBaseLayer=function(){return d!==null?d:h},this.getBinding=function(){return f===null&&y&&(f=new XRWebGLBinding(s,t)),f},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(A=e.getRenderTarget(),s.addEventListener("select",z),s.addEventListener("selectstart",z),s.addEventListener("selectend",z),s.addEventListener("squeeze",z),s.addEventListener("squeezestart",z),s.addEventListener("squeezeend",z),s.addEventListener("end",V),s.addEventListener("inputsourceschange",j),S.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(C),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let _e=null,We=null,Me=null;S.depth&&(Me=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,_e=S.stencil?Qi:ei,We=S.stencil?Tr:qn);let Xe={colorFormat:t.RGBA8,depthFormat:Me,scaleFactor:r};f=this.getBinding(),d=f.createProjectionLayer(Xe),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),_=new Jt(d.textureWidth,d.textureHeight,{format:Tn,type:mn,depthTexture:new qi(d.textureWidth,d.textureHeight,We,void 0,void 0,void 0,void 0,void 0,void 0,_e),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let _e={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};h=new XRWebGLLayer(s,t,_e),s.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),_=new Jt(h.framebufferWidth,h.framebufferHeight,{format:Tn,type:mn,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),ct.setContext(s),ct.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function j(Z){for(let te=0;te<Z.removed.length;te++){let _e=Z.removed[te],We=T.indexOf(_e);We>=0&&(T[We]=null,w[We].disconnect(_e))}for(let te=0;te<Z.added.length;te++){let _e=Z.added[te],We=T.indexOf(_e);if(We===-1){for(let Xe=0;Xe<w.length;Xe++)if(Xe>=T.length){T.push(_e),We=Xe;break}else if(T[Xe]===null){T[Xe]=_e,We=Xe;break}if(We===-1)break}let Me=w[We];Me&&Me.connect(_e)}}let q=new L,J=new L;function ie(Z,te,_e){q.setFromMatrixPosition(te.matrixWorld),J.setFromMatrixPosition(_e.matrixWorld);let We=q.distanceTo(J),Me=te.projectionMatrix.elements,Xe=_e.projectionMatrix.elements,_t=Me[14]/(Me[10]-1),ne=Me[14]/(Me[10]+1),ae=(Me[9]+1)/Me[5],oe=(Me[9]-1)/Me[5],le=(Me[8]-1)/Me[0],fe=(Xe[8]+1)/Xe[0],ze=_t*le,ke=_t*fe,qe=We/(-le+fe),Ke=qe*-le;if(te.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Ke),Z.translateZ(qe),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Me[10]===-1)Z.projectionMatrix.copy(te.projectionMatrix),Z.projectionMatrixInverse.copy(te.projectionMatrixInverse);else{let O=_t+qe,ht=ne+qe,rt=ze-Ke,R=ke+(We-Ke),v=ae*ne/ht*O,G=oe*ne/ht*O;Z.projectionMatrix.makePerspective(rt,R,v,G,O,ht),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function De(Z,te){te===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(te.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let te=Z.near,_e=Z.far;g.texture!==null&&(g.depthNear>0&&(te=g.depthNear),g.depthFar>0&&(_e=g.depthFar)),N.near=D.near=E.near=te,N.far=D.far=E.far=_e,(P!==N.near||U!==N.far)&&(s.updateRenderState({depthNear:N.near,depthFar:N.far}),P=N.near,U=N.far),N.layers.mask=Z.layers.mask|6,E.layers.mask=N.layers.mask&-5,D.layers.mask=N.layers.mask&-3;let We=Z.parent,Me=N.cameras;De(N,We);for(let Xe=0;Xe<Me.length;Xe++)De(Me[Xe],We);Me.length===2?ie(N,E,D):N.projectionMatrix.copy(E.projectionMatrix),b===null&&Z.isPerspectiveCamera&&(b={camera:Z,fov:Z.fov,zoom:Z.zoom}),Ae(Z,N,We)};function Ae(Z,te,_e){_e===null?Z.matrix.copy(te.matrixWorld):(Z.matrix.copy(_e.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(te.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(te.projectionMatrix),Z.projectionMatrixInverse.copy(te.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=xs*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(d===null&&h===null))return c},this.setFoveation=function(Z){c=Z,d!==null&&(d.fixedFoveation=Z),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=Z)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(N)},this.getCameraTexture=function(Z){return p[Z]};let dt=null;function st(Z,te){if(u=te.getViewerPose(l||a),m=te,u!==null){let _e=u.views;h!==null&&(e.setRenderTargetFramebuffer(_,h.framebuffer),e.setRenderTarget(_));let We=!1;_e.length!==N.cameras.length&&(N.cameras.length=0,We=!0);for(let ne=0;ne<_e.length;ne++){let ae=_e[ne],oe=null;if(h!==null)oe=h.getViewport(ae);else{let fe=f.getViewSubImage(d,ae);oe=fe.viewport,ne===0&&(e.setRenderTargetTextures(_,fe.colorTexture,fe.depthStencilTexture),e.setRenderTarget(_))}let le=F[ne];le===void 0&&(le=new Xt,le.layers.enable(ne),le.viewport=new yt,F[ne]=le),le.matrix.fromArray(ae.transform.matrix),le.matrix.decompose(le.position,le.quaternion,le.scale),le.projectionMatrix.fromArray(ae.projectionMatrix),le.projectionMatrixInverse.copy(le.projectionMatrix).invert(),le.viewport.set(oe.x,oe.y,oe.width,oe.height),ne===0&&(N.matrix.copy(le.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),We===!0&&N.cameras.push(le)}let Me=s.enabledFeatures;if(Me&&Me.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&y){f=n.getBinding();let ne=f.getDepthInformation(_e[0]);ne&&ne.isValid&&ne.texture&&g.init(ne,s.renderState)}if(Me&&Me.includes("camera-access")&&y){e.state.unbindTexture(),f=n.getBinding();for(let ne=0;ne<_e.length;ne++){let ae=_e[ne].camera;if(ae){let oe=p[ae];oe||(oe=new ua,p[ae]=oe);let le=f.getCameraImage(ae);oe.sourceTexture=le}}}}for(let _e=0;_e<w.length;_e++){let We=T[_e],Me=w[_e];We!==null&&Me!==void 0&&Me.update(We,te,l||a)}dt&&dt(Z,te),te.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:te}),m=null}let ct=new hm;ct.setAnimationLoop(st),this.setAnimationLoop=function(Z){dt=Z},this.dispose=function(){}}},Mb=new $e,vm=new Ye;vm.set(-1,0,0,0,1,0,0,0,1);function wb(i,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Df(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,S,A,_){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(g,p):p.isMeshLambertMaterial?(r(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(g,p),f(g,p)):p.isMeshPhongMaterial?(r(g,p),u(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(g,p),d(g,p),p.isMeshPhysicalMaterial&&h(g,p,_)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),y(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?c(g,p,S,A):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===ln&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===ln&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let S=e.get(p),A=S.envMap,_=S.envMapRotation;A&&(g.envMap.value=A,g.envMapRotation.value.setFromMatrix4(Mb.makeRotationFromEuler(_)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(vm),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,S,A){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*S,g.scale.value=A*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function f(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function h(g,p,S){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===ln&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.retroreflectivity>0&&(g.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=S.texture,g.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function y(g,p){let S=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(S.matrixWorld),g.nearDistance.value=S.shadow.camera.near,g.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Tb(i,e,t,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(_,w){let T=w.program;n.uniformBlockBinding(_,T)}function l(_,w){let T=s[_.id];T===void 0&&(g(_),T=u(_),s[_.id]=T,_.addEventListener("dispose",S));let C=w.program;n.updateUBOMapping(_,C);let x=e.render.frame;r[_.id]!==x&&(d(_),r[_.id]=x)}function u(_){let w=f();_.__bindingPointIndex=w;let T=i.createBuffer(),C=_.__size,x=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,C,x),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,w,T),T}function f(){for(let _=0;_<o;_++)if(a.indexOf(_)===-1)return a.push(_),_;return Ve("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(_){let w=s[_.id],T=_.uniforms,C=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let x=0,b=T.length;x<b;x++){let E=T[x];if(Array.isArray(E))for(let D=0,F=E.length;D<F;D++)h(E[D],x,D,C);else h(E,x,0,C)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(_,w,T,C){if(y(_,w,T,C)===!0){let x=_.__offset,b=_.value;if(Array.isArray(b)){let E=0;for(let D=0;D<b.length;D++){let F=b[D],N=p(F);m(F,_.__data,E),typeof F!="number"&&typeof F!="boolean"&&!F.isMatrix3&&!ArrayBuffer.isView(F)&&(E+=N.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(b,_.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,x,_.__data)}}function m(_,w,T){typeof _=="number"||typeof _=="boolean"?w[0]=_:_.isMatrix3?(w[0]=_.elements[0],w[1]=_.elements[1],w[2]=_.elements[2],w[3]=0,w[4]=_.elements[3],w[5]=_.elements[4],w[6]=_.elements[5],w[7]=0,w[8]=_.elements[6],w[9]=_.elements[7],w[10]=_.elements[8],w[11]=0):ArrayBuffer.isView(_)?w.set(new _.constructor(_.buffer,_.byteOffset,w.length)):_.toArray(w,T)}function y(_,w,T,C){let x=_.value,b=w+"_"+T;if(C[b]===void 0)return typeof x=="number"||typeof x=="boolean"?C[b]=x:ArrayBuffer.isView(x)?C[b]=x.slice():C[b]=x.clone(),!0;{let E=C[b];if(typeof x=="number"||typeof x=="boolean"){if(E!==x)return C[b]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(E.equals(x)===!1)return E.copy(x),!0}}return!1}function g(_){let w=_.uniforms,T=0,C=16;for(let b=0,E=w.length;b<E;b++){let D=Array.isArray(w[b])?w[b]:[w[b]];for(let F=0,N=D.length;F<N;F++){let P=D[F],U=Array.isArray(P.value)?P.value:[P.value];for(let z=0,V=U.length;z<V;z++){let j=U[z],q=p(j),J=T%C,ie=J%q.boundary,De=J+ie;T+=ie,De!==0&&C-De<q.storage&&(T+=C-De),P.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=T,T+=q.storage}}}let x=T%C;return x>0&&(T+=C-x),_.__size=T,_.__cache={},this}function p(_){let w={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(w.boundary=4,w.storage=4):_.isVector2?(w.boundary=8,w.storage=8):_.isVector3||_.isColor?(w.boundary=16,w.storage=12):_.isVector4?(w.boundary=16,w.storage=16):_.isMatrix3?(w.boundary=48,w.storage=48):_.isMatrix4?(w.boundary=64,w.storage=64):_.isTexture?Le("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(w.boundary=16,w.storage=_.byteLength):Le("WebGLRenderer: Unsupported uniform value type.",_),w}function S(_){let w=_.target;w.removeEventListener("dispose",S);let T=a.indexOf(w.__bindingPointIndex);a.splice(T,1),i.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function A(){for(let _ in s)i.deleteBuffer(s[_]);a=[],s={},r={}}return{bind:c,update:l,dispose:A}}var Ab=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),li=null;function Eb(){return li===null&&(li=new hr(Ab,16,16,es,$n),li.name="DFG_LUT",li.minFilter=Ft,li.magFilter=Ft,li.wrapS=Rn,li.wrapT=Rn,li.generateMipmaps=!1,li.needsUpdate=!0),li}var lc=class{constructor(e={}){let{canvas:t=Np(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:d=!1,outputBufferType:h=mn}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;let y=h,g=new Set([wl,Ml,Sl]),p=new Set([mn,qn,wr,Tr,vl,yl]),S=new Uint32Array(4),A=new Int32Array(4),_=new L,w=null,T=null,C=[],x=[],b=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Wn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let E=this,D=!1,F=null,N=null,P=null,U=null;this._outputColorSpace=Nt;let z=0,V=0,j=null,q=-1,J=null,ie=new yt,De=new yt,Ae=null,dt=new be(0),st=0,ct=t.width,Z=t.height,te=1,_e=null,We=null,Me=new yt(0,0,ct,Z),Xe=new yt(0,0,ct,Z),_t=!1,ne=new pr,ae=!1,oe=!1,le=new $e,fe=new L,ze=new yt,ke={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},qe=!1;function Ke(){return j===null?te:1}let O=n;function ht(M,B){return t.getContext(M,B)}let rt,R,v,G,X,Y,ce,ue,K,ee,de,Ne,ge,he,Ue,Ge,Ze,k,pe,Q,me,Se,se;try{let M={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${pl}`),t.addEventListener("webglcontextlost",Tt,!1),t.addEventListener("webglcontextrestored",pt,!1),t.addEventListener("webglcontextcreationerror",Nn,!1),O===null){let B="webgl2";if(O=ht(B,M),O===null)throw ht(B)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Oe()}catch(M){throw t.removeEventListener("webglcontextlost",Tt,!1),t.removeEventListener("webglcontextrestored",pt,!1),t.removeEventListener("webglcontextcreationerror",Nn,!1),Ve("WebGLRenderer: "+M.message),M}function Oe(){rt=new Nv(O),rt.init(),me=new yb(O,rt),R=new wv(O,rt,e,me),v=new _b(O,rt),R.reversedDepthBuffer&&d&&v.buffers.depth.setReversed(!0),N=O.createFramebuffer(),P=O.createFramebuffer(),U=O.createFramebuffer(),G=new Ov(O),X=new sb,Y=new vb(O,rt,v,X,R,me,G),ce=new Dv(E),ue=new kx(O),Se=new Sv(O,ue),K=new Uv(O,ue,G,Se),ee=new kv(O,K,ue,Se,G),k=new Bv(O,R,Y),Ue=new Tv(X),de=new ib(E,ce,rt,R,Se,Ue),Ne=new wb(E,X),ge=new ab,he=new db(rt),Ze=new bv(E,ce,v,ee,m,c),Ge=new xb(E,ee,R),se=new Tb(O,G,R,v),pe=new Mv(O,rt,G),Q=new Fv(O,rt,G),G.programs=de.programs,E.capabilities=R,E.extensions=rt,E.properties=X,E.renderLists=ge,E.shadowMap=Ge,E.state=v,E.info=G}y!==mn&&(b=new Gv(y,t.width,t.height,o,s,r));let Pe=new jf(E,O);this.xr=Pe,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){let M=rt.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){let M=rt.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return te},this.setPixelRatio=function(M){M!==void 0&&(te=M,this.setSize(ct,Z,!1))},this.getSize=function(M){return M.set(ct,Z)},this.setSize=function(M,B,$=!0){if(Pe.isPresenting){Le("WebGLRenderer: Can't change size while VR device is presenting.");return}ct=M,Z=B,t.width=Math.floor(M*te),t.height=Math.floor(B*te),$===!0&&(t.style.width=M+"px",t.style.height=B+"px"),b!==null&&b.setSize(t.width,t.height),this.setViewport(0,0,M,B)},this.getDrawingBufferSize=function(M){return M.set(ct*te,Z*te).floor()},this.setDrawingBufferSize=function(M,B,$){ct=M,Z=B,te=$,t.width=Math.floor(M*$),t.height=Math.floor(B*$),this.setViewport(0,0,M,B)},this.setEffects=function(M){if(y===mn){Ve("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let B=0;B<M.length;B++)if(M[B].isOutputPass===!0){Le("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}b.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(ie)},this.getViewport=function(M){return M.copy(Me)},this.setViewport=function(M,B,$,H){M.isVector4?Me.set(M.x,M.y,M.z,M.w):Me.set(M,B,$,H),v.viewport(ie.copy(Me).multiplyScalar(te).round())},this.getScissor=function(M){return M.copy(Xe)},this.setScissor=function(M,B,$,H){M.isVector4?Xe.set(M.x,M.y,M.z,M.w):Xe.set(M,B,$,H),v.scissor(De.copy(Xe).multiplyScalar(te).round())},this.getScissorTest=function(){return _t},this.setScissorTest=function(M){v.setScissorTest(_t=M)},this.setOpaqueSort=function(M){_e=M},this.setTransparentSort=function(M){We=M},this.getClearColor=function(M){return M.copy(Ze.getClearColor())},this.setClearColor=function(){Ze.setClearColor(...arguments)},this.getClearAlpha=function(){return Ze.getClearAlpha()},this.setClearAlpha=function(){Ze.setClearAlpha(...arguments)},this.clear=function(M=!0,B=!0,$=!0){let H=0;if(M){let W=!1;if(j!==null){let ye=j.texture.format;W=g.has(ye)}if(W){let ye=j.texture.type,Te=p.has(ye),ve=Ze.getClearColor(),Ce=Ze.getClearAlpha(),Ie=ve.r,Qe=ve.g,at=ve.b;Te?(S[0]=Ie,S[1]=Qe,S[2]=at,S[3]=Ce,O.clearBufferuiv(O.COLOR,0,S)):(A[0]=Ie,A[1]=Qe,A[2]=at,A[3]=Ce,O.clearBufferiv(O.COLOR,0,A))}else H|=O.COLOR_BUFFER_BIT}B&&(H|=O.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),$&&(H|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&O.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),F=M},this.dispose=function(){t.removeEventListener("webglcontextlost",Tt,!1),t.removeEventListener("webglcontextrestored",pt,!1),t.removeEventListener("webglcontextcreationerror",Nn,!1),Ze.dispose(),ge.dispose(),he.dispose(),X.dispose(),ce.dispose(),ee.dispose(),Se.dispose(),se.dispose(),de.dispose(),Pe.dispose(),Pe.removeEventListener("sessionstart",kd),Pe.removeEventListener("sessionend",zd),ss.stop()};function Tt(M){M.preventDefault(),na("WebGLRenderer: Context Lost."),D=!0}function pt(){na("WebGLRenderer: Context Restored."),D=!1;let M=G.autoReset,B=Ge.enabled,$=Ge.autoUpdate,H=Ge.needsUpdate,W=Ge.type;Oe(),G.autoReset=M,Ge.enabled=B,Ge.autoUpdate=$,Ge.needsUpdate=H,Ge.type=W}function Nn(M){Ve("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Yn(M){let B=M.target;B.removeEventListener("dispose",Yn),Km(B)}function Km(M){Zm(M),X.remove(M)}function Zm(M){let B=X.get(M).programs;B!==void 0&&(B.forEach(function($){de.releaseProgram($)}),M.isShaderMaterial&&de.releaseShaderCache(M))}this.renderBufferDirect=function(M,B,$,H,W,ye){B===null&&(B=ke);let Te=W.isMesh&&W.matrixWorld.determinantAffine()<0,ve=Qm(M,B,$,H,W);v.setMaterial(H,Te);let Ce=$.index,Ie=1;if(H.wireframe===!0){if(Ce=K.getWireframeAttribute($),Ce===void 0)return;Ie=2}let Qe=$.drawRange,at=$.attributes.position,Re=Qe.start*Ie,mt=(Qe.start+Qe.count)*Ie;ye!==null&&(Re=Math.max(Re,ye.start*Ie),mt=Math.min(mt,(ye.start+ye.count)*Ie)),Ce!==null?(Re=Math.max(Re,0),mt=Math.min(mt,Ce.count)):at!=null&&(Re=Math.max(Re,0),mt=Math.min(mt,at.count));let Bt=mt-Re;if(Bt<0||Bt===1/0)return;Se.setup(W,H,ve,$,Ce);let Rt,Mt=pe;if(Ce!==null&&(Rt=ue.get(Ce),Mt=Q,Mt.setIndex(Rt)),W.isMesh)H.wireframe===!0?(v.setLineWidth(H.wireframeLinewidth*Ke()),Mt.setMode(O.LINES)):Mt.setMode(O.TRIANGLES);else if(W.isLine){let Yt=H.linewidth;Yt===void 0&&(Yt=1),v.setLineWidth(Yt*Ke()),W.isLineSegments?Mt.setMode(O.LINES):W.isLineLoop?Mt.setMode(O.LINE_LOOP):Mt.setMode(O.LINE_STRIP)}else W.isPoints?Mt.setMode(O.POINTS):W.isSprite&&Mt.setMode(O.TRIANGLES);if(W.isBatchedMesh)if(rt.get("WEBGL_multi_draw"))Mt.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{let Yt=W._multiDrawStarts,we=W._multiDrawCounts,nn=W._multiDrawCount,ut=Ce?ue.get(Ce).bytesPerElement:1,An=X.get(H).currentProgram.getUniforms();for(let Kn=0;Kn<nn;Kn++)An.setValue(O,"_gl_DrawID",Kn),Mt.render(Yt[Kn]/ut,we[Kn])}else if(W.isInstancedMesh)Mt.renderInstances(Re,Bt,W.count);else if($.isInstancedBufferGeometry){let Yt=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,we=Math.min($.instanceCount,Yt);Mt.renderInstances(Re,Bt,we)}else Mt.render(Re,Bt)};function Bd(M,B,$,H){F!==null&&M.isNodeMaterial&&F.setObject(H,M),ae===!0&&Ue.setState(M,$,!1),M.transparent===!0&&M.side===en&&M.forceSinglePass===!1?(M.side=ln,M.needsUpdate=!0,ja(M,B,H),M.side=ai,M.needsUpdate=!0,ja(M,B,H),M.side=en):ja(M,B,H)}this.compile=function(M,B,$=null){$===null&&($=M),F!==null&&F.renderStart(M,B,$),T=he.get($),T.init(B),x.push(T),$.traverseVisible(function(W){W.isLight&&W.layers.test(B.layers)&&(T.pushLight(W),W.castShadow&&T.pushShadow(W))}),M!==$&&M.traverseVisible(function(W){W.isLight&&W.layers.test(B.layers)&&(T.pushLight(W),W.castShadow&&T.pushShadow(W))}),T.setupLights(),F!==null&&F.updateLights(T.state.lightsArray),oe=this.localClippingEnabled,ae=Ue.init(this.clippingPlanes,oe),ae===!0&&Ue.setGlobalState(this.clippingPlanes,B),F!==null&&Ge.render(T.state.shadowsArray,$,B);let H=new Set;return M.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;let ye=W.material;if(ye)if(Array.isArray(ye))for(let Te=0;Te<ye.length;Te++){let ve=ye[Te];Bd(ve,$,B,W),H.add(ve)}else Bd(ye,$,B,W),H.add(ye)}),T=x.pop(),F!==null&&F.renderEnd(),H},this.compileAsync=function(M,B,$=null){let H=this.compile(M,B,$);return new Promise(W=>{function ye(){if(H.forEach(function(Te){let Ce=X.get(Te).currentProgram;(Ce===void 0||Ce.isReady())&&H.delete(Te)}),H.size===0){W(M);return}setTimeout(ye,10)}rt.get("KHR_parallel_shader_compile")!==null?ye():setTimeout(ye,10)})};let Tc=null;function jm(M){Tc&&Tc(M)}function kd(){ss.stop()}function zd(){ss.start()}let ss=new hm;ss.setAnimationLoop(jm),typeof self<"u"&&ss.setContext(self),this.setAnimationLoop=function(M){Tc=M,Pe.setAnimationLoop(M),M===null?ss.stop():ss.start()},Pe.addEventListener("sessionstart",kd),Pe.addEventListener("sessionend",zd),this.render=function(M,B){if(B!==void 0&&B.isCamera!==!0){Ve("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;F!==null&&F.renderStart(M,B);let $=Pe.enabled===!0&&Pe.isPresenting===!0,H=b!==null&&(j===null||$)&&b.begin(E,j);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),Pe.enabled===!0&&Pe.isPresenting===!0&&(b===null||b.isCompositing()===!1)&&(Pe.cameraAutoUpdate===!0&&Pe.updateCamera(B),B=Pe.getCamera()),M.isScene===!0&&M.onBeforeRender(E,M,B,j),T=he.get(M,x.length),T.init(B),T.state.textureUnits=Y.getTextureUnits(),x.push(T),le.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),ne.setFromProjectionMatrix(le,kn,B.reversedDepth),oe=this.localClippingEnabled,ae=Ue.init(this.clippingPlanes,oe),w=ge.get(M,C.length),w.init(),C.push(w),Pe.enabled===!0&&Pe.isPresenting===!0){let Te=E.xr.getDepthSensingMesh();Te!==null&&Ac(Te,B,-1/0,E.sortObjects)}Ac(M,B,0,E.sortObjects),w.finish(),F!==null&&F.updateLights(T.state.lightsArray),E.sortObjects===!0&&w.sort(_e,We),qe=Pe.enabled===!1||Pe.isPresenting===!1||Pe.hasDepthSensing()===!1,qe&&Ze.addToRenderList(w,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ae===!0&&Ue.beginShadows();let W=T.state.shadowsArray;if(Ge.render(W,M,B),ae===!0&&Ue.endShadows(),(H&&b.hasRenderPass())===!1){let Te=w.opaque,ve=w.transmissive;if(T.setupLights(),B.isArrayCamera){let Ce=B.cameras;if(ve.length>0)for(let Ie=0,Qe=Ce.length;Ie<Qe;Ie++){let at=Ce[Ie];Vd(Te,ve,M,at)}qe&&Ze.render(M);for(let Ie=0,Qe=Ce.length;Ie<Qe;Ie++){let at=Ce[Ie];Gd(w,M,at,at.viewport)}}else ve.length>0&&Vd(Te,ve,M,B),qe&&Ze.render(M),Gd(w,M,B)}j!==null&&V===0&&(Y.updateMultisampleRenderTarget(j),Y.updateRenderTargetMipmap(j)),H&&b.end(E),M.isScene===!0&&M.onAfterRender(E,M,B),Se.resetDefaultState(),q=-1,J=null,x.pop(),x.length>0?(T=x[x.length-1],Y.setTextureUnits(T.state.textureUnits),ae===!0&&Ue.setGlobalState(E.clippingPlanes,T.state.camera)):T=null,C.pop(),C.length>0?w=C[C.length-1]:w=null,F!==null&&F.renderEnd()};function Ac(M,B,$,H){if(M.visible===!1)return;if(M.layers.test(B.layers)){if(M.isGroup)$=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(B);else if(M.isLightProbeGrid)T.pushLightProbeGrid(M);else if(M.isLight)T.pushLight(M),M.castShadow&&T.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||M.intersectsFrustum(ne)){H&&ze.setFromMatrixPosition(M.matrixWorld).applyMatrix4(le);let Te=ee.update(M),ve=M.material;ve.visible&&w.push(M,Te,ve,$,ze.z,null,B)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||M.intersectsFrustum(ne))){let Te=ee.update(M),ve=M.material;if(H&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),ze.copy(M.boundingSphere.center)):(Te.boundingSphere===null&&Te.computeBoundingSphere(),ze.copy(Te.boundingSphere.center)),ze.applyMatrix4(M.matrixWorld).applyMatrix4(le)),Array.isArray(ve)){let Ce=Te.groups;for(let Ie=0,Qe=Ce.length;Ie<Qe;Ie++){let at=Ce[Ie],Re=ve[at.materialIndex];Re&&Re.visible&&w.push(M,Te,Re,$,ze.z,at,B)}}else ve.visible&&w.push(M,Te,ve,$,ze.z,null,B)}}let ye=M.children;for(let Te=0,ve=ye.length;Te<ve;Te++)Ac(ye[Te],B,$,H)}function Gd(M,B,$,H){let{opaque:W,transmissive:ye,transparent:Te}=M;T.setupLightsView($),ae===!0&&Ue.setGlobalState(E.clippingPlanes,$),H&&v.viewport(ie.copy(H)),W.length>0&&Za(W,B,$),ye.length>0&&Za(ye,B,$),Te.length>0&&Za(Te,B,$),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function Vd(M,B,$,H){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[H.id]===void 0){let Re=rt.has("EXT_color_buffer_half_float")||rt.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[H.id]=new Jt(1,1,{generateMipmaps:!0,type:Re?$n:mn,minFilter:Xn,samples:Math.max(4,R.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:nt.workingColorSpace})}let ye=T.state.transmissionRenderTarget[H.id],Te=H.viewport||ie;ye.setSize(Te.z*E.transmissionResolutionScale,Te.w*E.transmissionResolutionScale);let ve=E.getRenderTarget(),Ce=E.getActiveCubeFace(),Ie=E.getActiveMipmapLevel();E.setRenderTarget(ye),E.getClearColor(dt),st=E.getClearAlpha(),st<1&&E.setClearColor(16777215,.5),E.clear(),qe&&Ze.render($);let Qe=E.toneMapping;E.toneMapping=Wn;let at=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),T.setupLightsView(H),ae===!0&&Ue.setGlobalState(E.clippingPlanes,H),Za(M,$,H),Y.updateMultisampleRenderTarget(ye),Y.updateRenderTargetMipmap(ye),rt.has("WEBGL_multisampled_render_to_texture")===!1){let Re=!1;for(let mt=0,Bt=B.length;mt<Bt;mt++){let Rt=B[mt],{object:Mt,geometry:Yt,material:we,group:nn}=Rt;if(we.side===en&&Mt.layers.test(H.layers)){let ut=we.side;we.side=ln,we.needsUpdate=!0,Hd(Mt,$,H,Yt,we,nn),we.side=ut,we.needsUpdate=!0,Re=!0}}Re===!0&&(Y.updateMultisampleRenderTarget(ye),Y.updateRenderTargetMipmap(ye))}E.setRenderTarget(ve,Ce,Ie),E.setClearColor(dt,st),at!==void 0&&(H.viewport=at),E.toneMapping=Qe}function Za(M,B,$){let H=B.isScene===!0?B.overrideMaterial:null;for(let W=0,ye=M.length;W<ye;W++){let Te=M[W],{object:ve,geometry:Ce,group:Ie}=Te,Qe=Te.material;Qe.allowOverride===!0&&H!==null&&(Qe=H),ve.layers.test($.layers)&&Hd(ve,B,$,Ce,Qe,Ie)}}function Hd(M,B,$,H,W,ye){F!==null&&W.isNodeMaterial&&F.setObject(M,W),M.onBeforeRender(E,B,$,H,W,ye),M.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),W.onBeforeRender(E,B,$,H,M,ye),W.transparent===!0&&W.side===en&&W.forceSinglePass===!1?(W.side=ln,W.needsUpdate=!0,E.renderBufferDirect($,B,H,W,M,ye),W.side=ai,W.needsUpdate=!0,E.renderBufferDirect($,B,H,W,M,ye),W.side=en):E.renderBufferDirect($,B,H,W,M,ye),M.onAfterRender(E,B,$,H,W,ye)}function ja(M,B,$){B.isScene!==!0&&(B=ke);let H=X.get(M),W=T.state.lights,ye=T.state.shadowsArray,Te=W.state.version,ve=de.getParameters(M,W.state,ye,B,$,T.state.lightProbeGridArray),Ce=de.getProgramCacheKey(ve),Ie=H.programs;H.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?B.environment:null,H.fog=B.fog;let Qe=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;H.envMap=ce.get(M.envMap||H.environment,Qe),H.envMapRotation=H.environment!==null&&M.envMap===null?B.environmentRotation:M.envMapRotation,Ie===void 0&&(M.addEventListener("dispose",Yn),Ie=new Map,H.programs=Ie);let at=Ie.get(Ce);if(at!==void 0){if(H.currentProgram===at&&H.lightsStateVersion===Te)return Xd(M,ve),at}else ve.uniforms=de.getUniforms(M),F!==null&&M.isNodeMaterial&&F.build(M,$,ve),M.onBeforeCompile(ve,E),at=de.acquireProgram(ve,Ce),Ie.set(Ce,at),H.uniforms=ve.uniforms;let Re=H.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Re.clippingPlanes=Ue.uniform),Xd(M,ve),H.needsLights=tg(M),H.lightsStateVersion=Te,H.needsLights&&(Re.ambientLightColor.value=W.state.ambient,Re.lightProbe.value=W.state.probe,Re.sunLights.value=W.state.sun,Re.sunLightShadows.value=W.state.sunShadow,Re.directionalLights.value=W.state.directional,Re.directionalLightShadows.value=W.state.directionalShadow,Re.spotLights.value=W.state.spot,Re.spotLightShadows.value=W.state.spotShadow,Re.rectAreaLights.value=W.state.rectArea,Re.ltc_1.value=W.state.rectAreaLTC1,Re.ltc_2.value=W.state.rectAreaLTC2,Re.pointLights.value=W.state.point,Re.pointLightShadows.value=W.state.pointShadow,Re.hemisphereLights.value=W.state.hemi,Re.sunShadowMatrix.value=W.state.sunShadowMatrix,Re.sunShadowCascade.value=W.state.sunShadowCascade,Re.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Re.spotLightMatrix.value=W.state.spotLightMatrix,Re.spotLightMap.value=W.state.spotLightMap,Re.pointShadowMatrix.value=W.state.pointShadowMatrix),H.lightProbeGrid=T.state.lightProbeGridArray.length>0,H.currentProgram=at,H.uniformsList=null,at}function Wd(M){if(M.uniformsList===null){let B=M.currentProgram.getUniforms();M.uniformsList=Rr.seqWithValue(B.seq,M.uniforms)}return M.uniformsList}function Xd(M,B){let $=X.get(M);$.outputColorSpace=B.outputColorSpace,$.batching=B.batching,$.batchingColor=B.batchingColor,$.instancing=B.instancing,$.instancingColor=B.instancingColor,$.instancingMorph=B.instancingMorph,$.skinning=B.skinning,$.morphTargets=B.morphTargets,$.morphNormals=B.morphNormals,$.morphColors=B.morphColors,$.morphTargetsCount=B.morphTargetsCount,$.numClippingPlanes=B.numClippingPlanes,$.numIntersection=B.numClipIntersection,$.vertexAlphas=B.vertexAlphas,$.vertexTangents=B.vertexTangents,$.toneMapping=B.toneMapping}function Jm(M,B){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;_.setFromMatrixPosition(B.matrixWorld);for(let $=0,H=M.length;$<H;$++){let W=M[$];if(W.texture!==null&&W.boundingBox.containsPoint(_))return W}return null}function Qm(M,B,$,H,W){B.isScene!==!0&&(B=ke),Y.resetTextureUnits();let ye=B.fog,Te=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?B.environment:null,ve=j===null?E.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:nt.workingColorSpace,Ce=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,Ie=ce.get(H.envMap||Te,Ce),Qe=H.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,at=!!$.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Re=!!$.morphAttributes.position,mt=!!$.morphAttributes.normal,Bt=!!$.morphAttributes.color,Rt=Wn;H.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Rt=E.toneMapping);let Mt=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,Yt=Mt!==void 0?Mt.length:0,we=X.get(H),nn=T.state.lights;if(ae===!0&&(oe===!0||M!==J)){let At=M===J&&H.id===q;Ue.setState(H,M,At)}let ut=!1;H.version===we.__version?(we.needsLights&&we.lightsStateVersion!==nn.state.version||we.outputColorSpace!==ve||W.isBatchedMesh&&we.batching===!1||!W.isBatchedMesh&&we.batching===!0||W.isBatchedMesh&&we.batchingColor===!0&&W._colorsTexture===null||W.isBatchedMesh&&we.batchingColor===!1&&W._colorsTexture!==null||W.isInstancedMesh&&we.instancing===!1||!W.isInstancedMesh&&we.instancing===!0||W.isSkinnedMesh&&we.skinning===!1||!W.isSkinnedMesh&&we.skinning===!0||W.isInstancedMesh&&we.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&we.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&we.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&we.instancingMorph===!1&&W.morphTexture!==null||we.envMap!==Ie||H.fog===!0&&we.fog!==ye||we.numClippingPlanes!==void 0&&(we.numClippingPlanes!==Ue.numPlanes||we.numIntersection!==Ue.numIntersection)||we.vertexAlphas!==Qe||we.vertexTangents!==at||we.morphTargets!==Re||we.morphNormals!==mt||we.morphColors!==Bt||we.toneMapping!==Rt||we.morphTargetsCount!==Yt||!!we.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(ut=!0):(ut=!0,we.__version=H.version);let An=we.currentProgram;ut===!0&&(An=ja(H,B,W),F&&H.isNodeMaterial&&F.onUpdateProgram(H,An,we));let Kn=!1,Pi=!1,Fs=!1,St=An.getUniforms(),Dt=we.uniforms;if(v.useProgram(An.program)&&(Kn=!0,Pi=!0,Fs=!0),H.id!==q&&(q=H.id,Pi=!0),we.needsLights){let At=Jm(T.state.lightProbeGridArray,W);we.lightProbeGrid!==At&&(we.lightProbeGrid=At,Pi=!0)}if(Kn||J!==M){v.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),St.setValue(O,"projectionMatrix",M.projectionMatrix),St.setValue(O,"viewMatrix",M.matrixWorldInverse);let Li=St.map.cameraPosition;Li!==void 0&&Li.setValue(O,fe.setFromMatrixPosition(M.matrixWorld)),R.logarithmicDepthBuffer&&St.setValue(O,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&St.setValue(O,"isOrthographic",M.isOrthographicCamera===!0),J!==M&&(J=M,Pi=!0,Fs=!0)}if(we.needsLights&&(nn.state.sunShadowMap.length>0&&St.setValue(O,"sunShadowMap",nn.state.sunShadowMap,Y),nn.state.directionalShadowMap.length>0&&St.setValue(O,"directionalShadowMap",nn.state.directionalShadowMap,Y),nn.state.spotShadowMap.length>0&&St.setValue(O,"spotShadowMap",nn.state.spotShadowMap,Y),nn.state.pointShadowMap.length>0&&St.setValue(O,"pointShadowMap",nn.state.pointShadowMap,Y)),W.isSkinnedMesh){St.setOptional(O,W,"bindMatrix"),St.setOptional(O,W,"bindMatrixInverse");let At=W.skeleton;At&&(At.boneTexture===null&&At.computeBoneTexture(),St.setValue(O,"boneTexture",At.boneTexture,Y))}W.isBatchedMesh&&(St.setOptional(O,W,"batchingTexture"),St.setValue(O,"batchingTexture",W._matricesTexture,Y),St.setOptional(O,W,"batchingIdTexture"),St.setValue(O,"batchingIdTexture",W._indirectTexture,Y),St.setOptional(O,W,"batchingColorTexture"),W._colorsTexture!==null&&St.setValue(O,"batchingColorTexture",W._colorsTexture,Y));let Ii=$.morphAttributes;if((Ii.position!==void 0||Ii.normal!==void 0||Ii.color!==void 0)&&k.update(W,$,An),(Pi||we.receiveShadow!==W.receiveShadow)&&(we.receiveShadow=W.receiveShadow,St.setValue(O,"receiveShadow",W.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&B.environment!==null&&(Dt.envMapIntensity.value=B.environmentIntensity),Dt.dfgLUT!==void 0&&(Dt.dfgLUT.value=Eb()),Pi){if(St.setValue(O,"toneMappingExposure",E.toneMappingExposure),we.needsLights&&eg(Dt,Fs),ye&&H.fog===!0&&Ne.refreshFogUniforms(Dt,ye),Ne.refreshMaterialUniforms(Dt,H,te,Z,T.state.transmissionRenderTarget[M.id]),we.needsLights&&we.lightProbeGrid){let At=we.lightProbeGrid;Dt.probesSH.value=At.texture,Dt.probesMin.value.copy(At.boundingBox.min),Dt.probesMax.value.copy(At.boundingBox.max),Dt.probesResolution.value.copy(At.resolution)}Rr.upload(O,Wd(we),Dt,Y)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Rr.upload(O,Wd(we),Dt,Y),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&St.setValue(O,"center",W.center),St.setValue(O,"modelViewMatrix",W.modelViewMatrix),St.setValue(O,"normalMatrix",W.normalMatrix),St.setValue(O,"modelMatrix",W.matrixWorld),H.uniformsGroups!==void 0){let At=H.uniformsGroups;for(let Li=0,Os=At.length;Li<Os;Li++){let $d=At[Li];se.update($d,An),se.bind($d,An)}}return An}function eg(M,B){M.ambientLightColor.needsUpdate=B,M.lightProbe.needsUpdate=B,M.sunLights.needsUpdate=B,M.sunLightShadows.needsUpdate=B,M.directionalLights.needsUpdate=B,M.directionalLightShadows.needsUpdate=B,M.pointLights.needsUpdate=B,M.pointLightShadows.needsUpdate=B,M.spotLights.needsUpdate=B,M.spotLightShadows.needsUpdate=B,M.rectAreaLights.needsUpdate=B,M.hemisphereLights.needsUpdate=B}function tg(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(M,B,$){let H=X.get(M);H.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),X.get(M.texture).__webglTexture=B,X.get(M.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:$,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,B){let $=X.get(M);$.__webglFramebuffer=B,$.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(M,B=0,$=0){j=M,z=B,V=$;let H=null,W=!1,ye=!1;if(M){let ve=X.get(M);if(ve.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(O.FRAMEBUFFER,ve.__webglFramebuffer),ie.copy(M.viewport),De.copy(M.scissor),Ae=M.scissorTest,v.viewport(ie),v.scissor(De),v.setScissorTest(Ae),q=-1;return}else if(ve.__webglFramebuffer===void 0)Y.setupRenderTarget(M);else if(ve.__hasExternalTextures)Y.rebindTextures(M,X.get(M.texture).__webglTexture,X.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let Qe=M.depthTexture;if(ve.__boundDepthTexture!==Qe){if(Qe!==null&&X.has(Qe)&&(M.width!==Qe.image.width||M.height!==Qe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Y.setupDepthRenderbuffer(M)}}let Ce=M.texture;(Ce.isData3DTexture||Ce.isDataArrayTexture||Ce.isCompressedArrayTexture)&&(ye=!0);let Ie=X.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Ie[B])?H=Ie[B][$]:H=Ie[B],W=!0):M.samples>0&&Y.useMultisampledRTT(M)===!1?H=X.get(M).__webglMultisampledFramebuffer:Array.isArray(Ie)?H=Ie[$]:H=Ie,ie.copy(M.viewport),De.copy(M.scissor),Ae=M.scissorTest}else ie.copy(Me).multiplyScalar(te).floor(),De.copy(Xe).multiplyScalar(te).floor(),Ae=_t;if($!==0&&(H=N),v.bindFramebuffer(O.FRAMEBUFFER,H)&&v.drawBuffers(M,H),v.viewport(ie),v.scissor(De),v.setScissorTest(Ae),W){let ve=X.get(M.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+B,ve.__webglTexture,$)}else if(ye){let ve=B;for(let Ce=0;Ce<M.textures.length;Ce++){let Ie=X.get(M.textures[Ce]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+Ce,Ie.__webglTexture,$,ve)}}else if(M!==null&&$!==0){let ve=X.get(M.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,ve.__webglTexture,$)}q=-1};function qd(M){let B=X.get(M);return(B.__readFormat!==M.format||B.__readType!==M.type)&&(B.__readFormat=M.format,B.__readType=M.type,B.__formatReadable=R.textureFormatReadable(M.format),B.__typeReadable=R.textureTypeReadable(M.type)),B}this.readRenderTargetPixels=function(M,B,$,H,W,ye,Te,ve=0){if(!(M&&M.isWebGLRenderTarget)){Ve("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=X.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Te!==void 0&&(Ce=Ce[Te]),Ce){v.bindFramebuffer(O.FRAMEBUFFER,Ce);try{let Ie=M.textures[ve],Qe=Ie.format,at=Ie.type;M.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+ve);let Re=qd(Ie);if(Re.__formatReadable===!1){Ve("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Re.__typeReadable===!1){Ve("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=M.width-H&&$>=0&&$<=M.height-W&&O.readPixels(B,$,H,W,me.convert(Qe),me.convert(at),ye)}finally{let Ie=j!==null?X.get(j).__webglFramebuffer:null;v.bindFramebuffer(O.FRAMEBUFFER,Ie)}}},this.readRenderTargetPixelsAsync=async function(M,B,$,H,W,ye,Te,ve=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ce=X.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Te!==void 0&&(Ce=Ce[Te]),Ce)if(B>=0&&B<=M.width-H&&$>=0&&$<=M.height-W){v.bindFramebuffer(O.FRAMEBUFFER,Ce);let Ie=M.textures[ve],Qe=Ie.format,at=Ie.type;M.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+ve);let Re=qd(Ie);if(Re.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Re.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let mt=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,mt),O.bufferData(O.PIXEL_PACK_BUFFER,ye.byteLength,O.STREAM_READ),O.readPixels(B,$,H,W,me.convert(Qe),me.convert(at),0),O.bindBuffer(O.PIXEL_PACK_BUFFER,null);let Bt=j!==null?X.get(j).__webglFramebuffer:null;v.bindFramebuffer(O.FRAMEBUFFER,Bt);let Rt=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await Fp(O,Rt,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,mt),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,ye),O.bindBuffer(O.PIXEL_PACK_BUFFER,null),O.deleteBuffer(mt),O.deleteSync(Rt),ye}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,B=null,$=0){let H=Math.pow(2,-$),W=Math.floor(M.image.width*H),ye=Math.floor(M.image.height*H),Te=B!==null?B.x:0,ve=B!==null?B.y:0;Y.setTexture2D(M,0),O.copyTexSubImage2D(O.TEXTURE_2D,$,0,0,Te,ve,W,ye),v.unbindTexture()},this.copyTextureToTexture=function(M,B,$=null,H=null,W=0,ye=0){let Te,ve,Ce,Ie,Qe,at,Re,mt,Bt,Rt=M.isCompressedTexture?M.mipmaps[ye]:M.image;if($!==null)Te=$.max.x-$.min.x,ve=$.max.y-$.min.y,Ce=$.isBox3?$.max.z-$.min.z:1,Ie=$.min.x,Qe=$.min.y,at=$.isBox3?$.min.z:0;else{let Dt=Math.pow(2,-W);Te=Math.floor(Rt.width*Dt),ve=Math.floor(Rt.height*Dt),M.isDataArrayTexture?Ce=Rt.depth:M.isData3DTexture?Ce=Math.floor(Rt.depth*Dt):Ce=1,Ie=0,Qe=0,at=0}H!==null?(Re=H.x,mt=H.y,Bt=H.z):(Re=0,mt=0,Bt=0);let Mt=me.convert(B.format),Yt=me.convert(B.type),we;B.isData3DTexture?(Y.setTexture3D(B,0),we=O.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(Y.setTexture2DArray(B,0),we=O.TEXTURE_2D_ARRAY):(Y.setTexture2D(B,0),we=O.TEXTURE_2D),v.activeTexture(O.TEXTURE0),v.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,B.flipY),v.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),v.pixelStorei(O.UNPACK_ALIGNMENT,B.unpackAlignment);let nn=v.getParameter(O.UNPACK_ROW_LENGTH),ut=v.getParameter(O.UNPACK_IMAGE_HEIGHT),An=v.getParameter(O.UNPACK_SKIP_PIXELS),Kn=v.getParameter(O.UNPACK_SKIP_ROWS),Pi=v.getParameter(O.UNPACK_SKIP_IMAGES);v.pixelStorei(O.UNPACK_ROW_LENGTH,Rt.width),v.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Rt.height),v.pixelStorei(O.UNPACK_SKIP_PIXELS,Ie),v.pixelStorei(O.UNPACK_SKIP_ROWS,Qe),v.pixelStorei(O.UNPACK_SKIP_IMAGES,at);let Fs=M.isDataArrayTexture||M.isData3DTexture,St=B.isDataArrayTexture||B.isData3DTexture;if(M.isDepthTexture){let Dt=X.get(M),Ii=X.get(B),At=X.get(Dt.__renderTarget),Li=X.get(Ii.__renderTarget);v.bindFramebuffer(O.READ_FRAMEBUFFER,At.__webglFramebuffer),v.bindFramebuffer(O.DRAW_FRAMEBUFFER,Li.__webglFramebuffer);for(let Os=0;Os<Ce;Os++)Fs&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,X.get(M).__webglTexture,W,at+Os),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,X.get(B).__webglTexture,ye,Bt+Os)),O.blitFramebuffer(Ie,Qe,Te,ve,Re,mt,Te,ve,O.DEPTH_BUFFER_BIT,O.NEAREST);v.bindFramebuffer(O.READ_FRAMEBUFFER,null),v.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(W!==0||M.isRenderTargetTexture||X.has(M)){let Dt=X.get(M),Ii=X.get(B);v.bindFramebuffer(O.READ_FRAMEBUFFER,P),v.bindFramebuffer(O.DRAW_FRAMEBUFFER,U);for(let At=0;At<Ce;At++)Fs?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Dt.__webglTexture,W,at+At):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Dt.__webglTexture,W),St?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ii.__webglTexture,ye,Bt+At):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Ii.__webglTexture,ye),W!==0?O.blitFramebuffer(Ie,Qe,Te,ve,Re,mt,Te,ve,O.COLOR_BUFFER_BIT,O.NEAREST):St?O.copyTexSubImage3D(we,ye,Re,mt,Bt+At,Ie,Qe,Te,ve):O.copyTexSubImage2D(we,ye,Re,mt,Ie,Qe,Te,ve);v.bindFramebuffer(O.READ_FRAMEBUFFER,null),v.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else St?M.isDataTexture||M.isData3DTexture?O.texSubImage3D(we,ye,Re,mt,Bt,Te,ve,Ce,Mt,Yt,Rt.data):B.isCompressedArrayTexture?O.compressedTexSubImage3D(we,ye,Re,mt,Bt,Te,ve,Ce,Mt,Rt.data):O.texSubImage3D(we,ye,Re,mt,Bt,Te,ve,Ce,Mt,Yt,Rt):M.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,ye,Re,mt,Te,ve,Mt,Yt,Rt.data):M.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,ye,Re,mt,Rt.width,Rt.height,Mt,Rt.data):O.texSubImage2D(O.TEXTURE_2D,ye,Re,mt,Te,ve,Mt,Yt,Rt);v.pixelStorei(O.UNPACK_ROW_LENGTH,nn),v.pixelStorei(O.UNPACK_IMAGE_HEIGHT,ut),v.pixelStorei(O.UNPACK_SKIP_PIXELS,An),v.pixelStorei(O.UNPACK_SKIP_ROWS,Kn),v.pixelStorei(O.UNPACK_SKIP_IMAGES,Pi),ye===0&&B.generateMipmaps&&O.generateMipmap(we),v.unbindTexture()},this.initRenderTarget=function(M){X.get(M).__webglFramebuffer===void 0&&Y.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?Y.setTextureCube(M,0):M.isData3DTexture?Y.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?Y.setTexture2DArray(M,0):Y.setTexture2D(M,0),v.unbindTexture()},this.resetState=function(){z=0,V=0,j=null,v.reset(),Se.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return kn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=nt._getDrawingBufferColorSpace(e),t.unpackColorSpace=nt._getUnpackColorSpace()}};var ym={type:"change"},Qf={type:"start"},Sm={type:"end"},fc=new ti,bm=new rn,Cb=Math.cos(70*ts.DEG2RAD),Ht=new L,gn=2*Math.PI,bt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Jf=1e-6,dc=class extends Pa{constructor(e,t=null){super(e,t),this.state=bt.NONE,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:pn.ROTATE,MIDDLE:pn.DOLLY,RIGHT:pn.PAN},this.touches={ONE:ji.ROTATE,TWO:ji.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new jt,this._lastTargetPosition=new L,this._quat=new jt().setFromUnitVectors(e.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Zi,this._sphericalDelta=new Zi,this._scale=1,this._panOffset=new L,this._rotateStart=new re,this._rotateEnd=new re,this._rotateDelta=new re,this._panStart=new re,this._panEnd=new re,this._panDelta=new re,this._dollyStart=new re,this._dollyEnd=new re,this._dollyDelta=new re,this._dollyDirection=new L,this._mouse=new re,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Pb.bind(this),this._onPointerDown=Rb.bind(this),this._onPointerUp=Ib.bind(this),this._onContextMenu=Bb.bind(this),this._onMouseWheel=Nb.bind(this),this._onKeyDown=Ub.bind(this),this._onTouchStart=Fb.bind(this),this._onTouchMove=Ob.bind(this),this._onMouseDown=Lb.bind(this),this._onMouseMove=Db.bind(this),this._interceptControlDown=kb.bind(this),this._interceptControlUp=zb.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=bt.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let e=this.domElement.getRootNode();e.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),e.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(ym),this.update(),this.state=bt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;Ht.copy(t).sub(this.target),Ht.applyQuaternion(this._quat),this._spherical.setFromVector3(Ht),this.autoRotate&&this.state===bt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=gn:n>Math.PI&&(n-=gn),s<-Math.PI?s+=gn:s>Math.PI&&(s-=gn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Ht.setFromSpherical(this._spherical),Ht.applyQuaternion(this._quatInverse),t.copy(this.target).add(Ht),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=Ht.length();a=this._clampDistance(o*this._scale);let c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let o=new L(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let l=new L(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=Ht.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(fc.origin.copy(this.object.position),fc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(fc.direction))<Cb?this.object.lookAt(this.target):(bm.setFromNormalAndCoplanarPoint(this.object.up,this.target),fc.intersectPlane(bm,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Jf||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Jf||this._lastTargetPosition.distanceToSquared(this.target)>Jf?(this.dispatchEvent(ym),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?gn/60*this.autoRotateSpeed*e:gn/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Ht.setFromMatrixColumn(t,0),Ht.multiplyScalar(-e),this._panOffset.add(Ht)}_panUp(e,t){this.screenSpacePanning===!0?Ht.setFromMatrixColumn(t,1):(Ht.setFromMatrixColumn(t,0),Ht.crossVectors(this.object.up,Ht)),Ht.multiplyScalar(e),this._panOffset.add(Ht)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Ht.copy(s).sub(this.target);let r=Ht.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(gn*this._rotateDelta.x/t.clientHeight),this._rotateUp(gn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(gn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-gn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(gn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-gn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(gn*this._rotateDelta.x/t.clientHeight),this._rotateUp(gn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new re,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function Rb(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Pb(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Ib(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Sm),this.state=bt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Lb(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case pn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=bt.DOLLY;break;case pn.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=bt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=bt.ROTATE}break;case pn.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=bt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=bt.PAN}break;default:this.state=bt.NONE}this.state!==bt.NONE&&this.dispatchEvent(Qf)}function Db(i){switch(this.state){case bt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case bt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case bt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Nb(i){this.enabled===!1||this.enableZoom===!1||this.state!==bt.NONE||(i.preventDefault(),this.dispatchEvent(Qf),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Sm))}function Ub(i){this.enabled!==!1&&this._handleKeyDown(i)}function Fb(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case ji.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=bt.TOUCH_ROTATE;break;case ji.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=bt.TOUCH_PAN;break;default:this.state=bt.NONE}break;case 2:switch(this.touches.TWO){case ji.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=bt.TOUCH_DOLLY_PAN;break;case ji.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=bt.TOUCH_DOLLY_ROTATE;break;default:this.state=bt.NONE}break;default:this.state=bt.NONE}this.state!==bt.NONE&&this.dispatchEvent(Qf)}function Ob(i){switch(this._trackPointer(i),this.state){case bt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case bt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case bt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case bt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=bt.NONE}}function Bb(i){this.enabled!==!1&&i.preventDefault()}function kb(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function zb(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function wm(i,e=!1){let t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,c=new ft,l=0;for(let u=0;u<i.length;++u){let f=i[u],d=0;if(t!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let h in f.attributes){if(!n.has(h))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+h+'" attribute exists among all geometries, or in none of them.'),null;r[h]===void 0&&(r[h]=[]),r[h].push(f.attributes[h]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(o!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let h in f.morphAttributes){if(!s.has(h))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;a[h]===void 0&&(a[h]=[]),a[h].push(f.morphAttributes[h])}if(e){let h;if(t)h=f.index.count;else if(f.attributes.position!==void 0)h=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,h,u),l+=h}}if(t){let u=0,f=[];for(let d=0;d<i.length;++d){let h=i[d].index;for(let m=0;m<h.count;++m)f.push(h.getX(m)+u);u+=i[d].attributes.position.count}c.setIndex(f)}for(let u in r){let f=Mm(r[u]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,f)}for(let u in a){let f=a[u][0].length;if(f!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let d=0;d<f;++d){let h=[];for(let y=0;y<a[u].length;++y)h.push(a[u][y][d]);let m=Mm(h);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(m)}}}return c}function Mm(i){let e,t,n,s=-1,r=0;for(let l=0;l<i.length;++l){let u=i[l];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*t}let a=new e(r),o=new zt(a,t,n),c=0;for(let l=0;l<i.length;++l){let u=i[l];if(u.isInterleavedBufferAttribute){let f=c/t;for(let d=0,h=u.count;d<h;d++)for(let m=0;m<t;m++){let y=u.getComponent(d,m);o.setComponent(d+f,m,y)}}else a.set(u.array,c);c+=u.count*t}return s!==void 0&&(o.gpuType=s),o}function Tm(i,e=1e-4){e=Math.max(e,Number.EPSILON);let t={},n=i.getIndex(),s=i.getAttribute("position"),r=n?n.count:s.count,a=0,o=Object.keys(i.attributes),c={},l={},u=[],f=["getX","getY","getZ","getW"],d=["setX","setY","setZ","setW"];for(let S=0,A=o.length;S<A;S++){let _=o[S],w=i.attributes[_];c[_]=new w.constructor(new w.array.constructor(w.count*w.itemSize),w.itemSize,w.normalized);let T=i.morphAttributes[_];T&&(l[_]||(l[_]=[]),T.forEach((C,x)=>{let b=new C.array.constructor(C.count*C.itemSize);l[_][x]=new C.constructor(b,C.itemSize,C.normalized)}))}let h=e*.5,m=Math.log10(1/e),y=Math.pow(10,m),g=h*y;for(let S=0;S<r;S++){let A=n?n.getX(S):S,_="";for(let w=0,T=o.length;w<T;w++){let C=o[w],x=i.getAttribute(C),b=x.itemSize;for(let E=0;E<b;E++)_+=`${Math.trunc(x[f[E]](A)*y+g)},`}if(_ in t)u.push(t[_]);else{for(let w=0,T=o.length;w<T;w++){let C=o[w],x=i.getAttribute(C),b=i.morphAttributes[C],E=x.itemSize,D=c[C],F=l[C];for(let N=0;N<E;N++){let P=f[N],U=d[N];if(D[U](a,x[P](A)),b)for(let z=0,V=b.length;z<V;z++)F[z][U](a,b[z][P](A))}}t[_]=a,u.push(a),a++}}let p=i.clone();for(let S in i.attributes){let A=c[S];if(p.setAttribute(S,new A.constructor(A.array.slice(0,a*A.itemSize),A.itemSize,A.normalized)),S in l)for(let _=0;_<l[S].length;_++){let w=l[S][_];p.morphAttributes[S][_]=new w.constructor(w.array.slice(0,a*w.itemSize),w.itemSize,w.normalized)}}return p.setIndex(u),p}function ed(i,e){if(e===Cf)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Ar||e===ka){let t=i.getIndex();if(t===null){let r=[],a=i.getAttribute("position");if(a!==void 0){for(let o=0;o<a.count;o++)r.push(o);i.setIndex(r),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,s=[];if(e===Ar)for(let r=1;r<=n;r++)s.push(t.getX(0)),s.push(t.getX(r)),s.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(s.push(t.getX(r)),s.push(t.getX(r+1)),s.push(t.getX(r+2))):(s.push(t.getX(r+2)),s.push(t.getX(r+1)),s.push(t.getX(r)));return s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),i.setIndex(s),i.clearGroups(),i}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}function Am(i){let e=new Map,t=new Map,n=i.clone();return Em(i,n,function(s,r){e.set(r,s),t.set(s,r)}),n.traverse(function(s){if(!s.isSkinnedMesh)return;let r=s,a=e.get(s),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function Em(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)Em(i.children[n],e.children[n],t)}var Xa=class extends ri{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new od(t)}),this.register(function(t){return new ld(t)}),this.register(function(t){return new xd(t)}),this.register(function(t){return new _d(t)}),this.register(function(t){return new vd(t)}),this.register(function(t){return new ud(t)}),this.register(function(t){return new fd(t)}),this.register(function(t){return new dd(t)}),this.register(function(t){return new hd(t)}),this.register(function(t){return new ad(t)}),this.register(function(t){return new pd(t)}),this.register(function(t){return new cd(t)}),this.register(function(t){return new gd(t)}),this.register(function(t){return new md(t)}),this.register(function(t){return new sd(t)}),this.register(function(t){return new hc(t,it.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new hc(t,it.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new yd(t)})}load(e,t,n,s){let r=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let l=Ci.extractUrlBase(e);a=Ci.resolveURL(l,this.path)}else a=Ci.extractUrlBase(e);this.manager.itemStart(e);let o=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new _r(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,a,function(u){t(u),r.manager.itemEnd(e)},o)}catch(u){o(u)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r,a={},o={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Lm){try{a[it.KHR_BINARY_GLTF]=new bd(e)}catch(f){s&&s(f);return}r=JSON.parse(a[it.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new Cd(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let f=this.pluginCallbacks[u](l);f.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[f.name]=f,a[f.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){let f=r.extensionsUsed[u],d=r.extensionsRequired||[];switch(f){case it.KHR_MATERIALS_UNLIT:a[f]=new rd;break;case it.KHR_DRACO_MESH_COMPRESSION:a[f]=new Sd(r,this.dracoLoader);break;case it.KHR_TEXTURE_TRANSFORM:a[f]=new Md;break;case it.KHR_MESH_QUANTIZATION:a[f]=new wd;break;default:d.indexOf(f)>=0&&o[f]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+f+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,s)}parseAsync(e,t){let n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}};function Gb(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}function Ot(i,e,t){let n=i.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}var it={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},sd=class{constructor(e){this.parser=e,this.name=it.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,s=t.cache.get(n);if(s)return s;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,u=new be(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],an);let f=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Ki(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Ms(u),l.distance=f;break;case"spot":l=new Ea(u),l.distance=f,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),ui(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}},rd=class{constructor(){this.name=it.KHR_MATERIALS_UNLIT}getMaterialType(){return Qt}extendParams(e,t,n){let s=[];e.color=new be(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],an),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,Nt))}return Promise.all(s)}},ad=class{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=Ot(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},od=class{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Ot(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){let n=Ot(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(s.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let r=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new re(r,r)}return Promise.all(s)}},ld=class{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Ot(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){let n=Ot(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}},cd=class{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Ot(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){let n=Ot(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(s)}},ud=class{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_SHEEN}getMaterialType(e){return Ot(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){let n=Ot(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(t.sheenColor=new be(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let r=n.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],an)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,Nt)),n.sheenRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(s)}},fd=class{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Ot(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){let n=Ot(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&s.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(s)}},dd=class{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_VOLUME}getMaterialType(e){return Ot(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){let n=Ot(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let r=n.attenuationColor||[1,1,1];return t.attenuationColor=new be().setRGB(r[0],r[1],r[2],an),Promise.all(s)}},hd=class{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_IOR}getMaterialType(e){return Ot(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){let n=Ot(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},pd=class{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Ot(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){let n=Ot(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));let r=n.specularColorFactor||[1,1,1];return t.specularColor=new be().setRGB(r[0],r[1],r[2],an),n.specularColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,Nt)),Promise.all(s)}},md=class{constructor(e){this.parser=e,this.name=it.EXT_MATERIALS_BUMP}getMaterialType(e){return Ot(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){let n=Ot(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&s.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(s)}},gd=class{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Ot(this.parser,e,this.name)!==null?dn:null}extendMaterialParams(e,t){let n=Ot(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&s.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(s)}},xd=class{constructor(e){this.parser=e,this.name=it.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}},_d=class{constructor(e){this.parser=e,this.name=it.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}},vd=class{constructor(e){this.parser=e,this.name=it.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}},hc=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){let c=s.byteOffset||0,l=s.byteLength||0,u=s.count,f=s.byteStride,d=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(u,f,d,s.mode,s.filter).then(function(h){return h.buffer}):a.ready.then(function(){let h=new ArrayBuffer(u*f);return a.decodeGltfBuffer(new Uint8Array(h),u,f,d,s.mode,s.filter),h})})}else return null}},yd=class{constructor(e){this.name=it.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=t.meshes[n.mesh];for(let l of s.primitives)if(l.mode!==Ln.TRIANGLES&&l.mode!==Ln.TRIANGLE_STRIP&&l.mode!==Ln.TRIANGLE_FAN&&l.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],c={};for(let l in a)o.push(this.parser.getDependency("accessor",a[l]).then(u=>(c[l]=u,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{let u=l.pop(),f=u.isGroup?u.children:[u],d=l[0].count,h=[];for(let m of f){let y=new $e,g=new L,p=new jt,S=new L(1,1,1),A=new bn(m.geometry,m.material,d);for(let w=0;w<d;w++)c.TRANSLATION&&g.fromBufferAttribute(c.TRANSLATION,w),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,w),c.SCALE&&S.fromBufferAttribute(c.SCALE,w),A.setMatrixAt(w,y.compose(g,p,S));let _=null;for(let w in c)if(w==="_COLOR_0"){let T=c[w];A.instanceColor=new bi(T.array,T.itemSize,T.normalized)}else if(w!=="TRANSLATION"&&w!=="ROTATION"&&w!=="SCALE"){if(_===null){let C=A.geometry;_=new ft,_.name=C.name;for(let x in C.attributes)_.setAttribute(x,C.attributes[x]);for(let x in C.morphAttributes)_.morphAttributes[x]=C.morphAttributes[x];C.index!==null&&_.setIndex(C.index),_.morphTargetsRelative=C.morphTargetsRelative;for(let x of C.groups)_.addGroup(x.start,x.count,x.materialIndex);C.boundingBox!==null&&(_.boundingBox=C.boundingBox.clone()),C.boundingSphere!==null&&(_.boundingSphere=C.boundingSphere.clone()),_.drawRange.start=C.drawRange.start,_.drawRange.count=C.drawRange.count,_.userData=Object.assign({},C.userData),A.geometry=_}let T=c[w];_.setAttribute(w,new bi(T.array,T.itemSize,T.normalized))}xt.prototype.copy.call(A,m),this.parser.assignFinalMaterial(A),h.push(A)}return u.isGroup?(u.clear(),u.add(...h),u):h[0]}))}},Lm="glTF",Wa=12,Cm={JSON:1313821514,BIN:5130562},bd=class{constructor(e){this.name=it.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Wa),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Lm)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-Wa,r=new DataView(e,Wa),a=0;for(;a<s;){let o=r.getUint32(a,!0);a+=4;let c=r.getUint32(a,!0);if(a+=4,c===Cm.JSON){let l=new Uint8Array(e,Wa+a,o);this.content=n.decode(l)}else if(c===Cm.BIN){let l=Wa+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Sd=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=it.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(let u in a){let f=Ad[u]||u.toLowerCase();o[f]=a[u]}for(let u in e.attributes){let f=Ad[u]||u.toLowerCase();if(a[u]!==void 0){let d=n.accessors[e.attributes[u]],h=Ir[d.componentType];l[f]=h.name,c[f]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(f,d){s.decodeDracoFile(u,function(h){for(let m in h.attributes){let y=h.attributes[m],g=c[m];g!==void 0&&(y.normalized=g)}f(h)},o,l,an,d)})})}},Md=class{constructor(){this.name=it.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let n=Math.cos(e.rotation),s=Math.sin(e.rotation);e.matrix.set(e.repeat.x*n,e.repeat.y*s,e.offset.x,-e.repeat.x*s,e.repeat.y*n,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},wd=class{constructor(){this.name=it.KHR_MESH_QUANTIZATION}},pc=class extends si{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,u=s-t,f=(n-t)/u,d=f*f,h=d*f,m=e*l,y=m-l,g=-2*h+3*d,p=h-d,S=1-g,A=p-d+f;for(let _=0;_!==o;_++){let w=a[y+_+o],T=a[y+_+c]*u,C=a[m+_+o],x=a[m+_]*u;r[_]=S*w+A*T+g*C+p*x}return r}},Vb=new jt,Td=class extends pc{interpolate_(e,t,n,s){let r=super.interpolate_(e,t,n,s);return Vb.fromArray(r).normalize().toArray(r),r}},Ln={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Ir={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Rm={9728:Ut,9729:Ft,9984:xl,9985:Mr,9986:Es,9987:Xn},Pm={33071:Rn,33648:nr,10497:Wi},td={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Ad={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},ns={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Hb={CUBICSPLINE:void 0,LINEAR:gs,STEP:ms},nd={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Wb(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new on({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ai})),i.DefaultMaterial}function Ps(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function ui(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Xb(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,u=e.length;l<u;l++){let f=e[l];if(f.POSITION!==void 0&&(n=!0),f.NORMAL!==void 0&&(s=!0),f.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);let a=[],o=[],c=[];for(let l=0,u=e.length;l<u;l++){let f=e[l];if(n){let d=f.POSITION!==void 0?t.getDependency("accessor",f.POSITION):i.attributes.position;a.push(d)}if(s){let d=f.NORMAL!==void 0?t.getDependency("accessor",f.NORMAL):i.attributes.normal;o.push(d)}if(r){let d=f.COLOR_0!==void 0?t.getDependency("accessor",f.COLOR_0):i.attributes.color;c.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){let u=l[0],f=l[1],d=l[2];return n&&(i.morphAttributes.position=u),s&&(i.morphAttributes.normal=f),r&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function qb(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function $b(i){let e,t=i.extensions&&i.extensions[it.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+id(t.attributes):e=i.indices+":"+id(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+id(i.targets[n]);return e}function id(i){let e="",t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function Ed(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Yb(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var Kb=new $e,Cd=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Gb,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let c=o.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&a<98?this.textureLoader=new Ta(this.options.manager):this.textureLoader=new Ca(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new _r(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:n,userData:{}};return Ps(r,o,s),ui(o,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(let c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let a=t[s].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let s=n.clone(),r=(a,o)=>{let c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(let[l,u]of a.children.entries())r(u,o.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let s=e(t[n]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[it.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,a){n.load(Ci.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){let t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let a=td[s.type],o=Ir[s.componentType],c=s.normalized===!0,l=new o(s.count*a);return Promise.resolve(new zt(l,a,c))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){let o=a[0],c=td[s.type],l=Ir[s.componentType],u=l.BYTES_PER_ELEMENT,f=u*c,d=s.byteOffset||0,h=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,m=s.normalized===!0,y,g;if(h&&h!==f){let p=Math.floor(d/h),S="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count,A=t.cache.get(S);A||(y=new l(o,p*h,s.count*h/u),A=new ur(y,h/u),t.cache.add(S,A)),g=new fr(A,c,d%h/u,m)}else o===null?y=new l(s.count*c):y=new l(o,d,s.count*c),g=new zt(y,c,m);if(s.sparse!==void 0){let p=td.SCALAR,S=Ir[s.sparse.indices.componentType],A=s.sparse.indices.byteOffset||0,_=s.sparse.values.byteOffset||0,w=new S(a[1],A,s.sparse.count*p),T=new l(a[2],_,s.sparse.count*c);o!==null&&(g=new zt(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let C=0,x=w.length;C<x;C++){let b=w[C];if(g.setX(b,T[C*c]),c>=2&&g.setY(b,T[C*c+1]),c>=3&&g.setZ(b,T[C*c+2]),c>=4&&g.setW(b,T[C*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=m}return g})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r],o=this.textureLoader;if(a.uri){let c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){let s=this,r=this.json,a=r.textures[e],o=r.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=a.name||o.name||"",u.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(u.name=o.uri);let d=(r.samplers||{})[a.sampler]||{};return u.magFilter=Rm[d.magFilter]||Ft,u.minFilter=Rm[d.minFilter]||Xn,u.wrapS=Pm[d.wrapS]||Wi,u.wrapT=Pm[d.wrapT]||Wi,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Ut&&u.minFilter!==Ft,s.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(f=>f.clone());let a=s.images[e],o=self.URL||self.webkitURL,c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(f){l=!0;let d=new Blob([f],{type:a.mimeType});return c=o.createObjectURL(d),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let u=Promise.resolve(c).then(function(f){return new Promise(function(d,h){let m=d;t.isImageBitmapLoader===!0&&(m=function(y){let g=new qt(y);g.needsUpdate=!0,d(g)}),t.load(Ci.resolveURL(f,r.path),m,void 0,h)})}).then(function(f){return l===!0&&o.revokeObjectURL(c),ui(f,a),f.userData.mimeType=a.mimeType||Yb(a.uri),f}).catch(function(f){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),f});return this.sourceCache[e]=u,u}assignTexture(e,t,n,s){let r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[it.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[it.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let c=r.associations.get(a);a=r.extensions[it.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new Xi,fn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new Si,fn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(s||r||a){let o="ClonedMaterial:"+n.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return on}loadMaterial(e){let t=this,n=this.json,s=this.extensions,r=n.materials[e],a,o={},c=r.extensions||{},l=[];if(c[it.KHR_MATERIALS_UNLIT]){let f=s[it.KHR_MATERIALS_UNLIT];a=f.getMaterialType(),l.push(f.extendParams(o,r,t))}else{let f=r.pbrMetallicRoughness||{};if(o.color=new be(1,1,1),o.opacity=1,Array.isArray(f.baseColorFactor)){let d=f.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],an),o.opacity=d[3]}f.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",f.baseColorTexture,Nt)),o.metalness=f.metallicFactor!==void 0?f.metallicFactor:1,o.roughness=f.roughnessFactor!==void 0?f.roughnessFactor:1,f.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",f.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",f.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=en);let u=r.alphaMode||nd.OPAQUE;if(u===nd.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===nd.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==Qt&&(l.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new re(1,1),r.normalTexture.scale!==void 0)){let f=r.normalTexture.scale;o.normalScale.set(f,f)}if(r.occlusionTexture!==void 0&&a!==Qt&&(l.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==Qt){let f=r.emissiveFactor;o.emissive=new be().setRGB(f[0],f[1],f[2],an)}return r.emissiveTexture!==void 0&&a!==Qt&&l.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,Nt)),Promise.all(l).then(function(){let f=new a(o);return r.name&&(f.name=r.name),ui(f,r),t.associations.set(f,{materials:e}),r.extensions&&Ps(s,f,r),f})}createUniqueName(e){let t=wt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,s=this.primitiveCache;function r(o){return n[it.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return Im(c,o,t)})}let a=[];for(let o=0,c=e.length;o<c;o++){let l=e[o],u=$b(l),f=s[u];if(f)a.push(f.promise);else{let d;l.extensions&&l.extensions[it.KHR_DRACO_MESH_COMPRESSION]?d=r(l):d=Im(new ft,l,t),l.mode===Ln.TRIANGLE_STRIP?d=d.then(h=>ed(h,ka)):l.mode===Ln.TRIANGLE_FAN&&(d=d.then(h=>ed(h,Ar))),s[u]={primitive:l,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,s=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){let u=a[c].material===void 0?Wb(this.cache):this.getDependency("material",a[c].material);o.push(u)}return o.push(t.loadGeometries(a)),Promise.all(o).then(async function(c){let l=c.slice(0,c.length-1),u=c[c.length-1],f=[];for(let h=0,m=u.length;h<m;h++){let y=u[h],g=a[h],p,S=l[h];if(g.mode===Ln.TRIANGLES||g.mode===Ln.TRIANGLE_STRIP||g.mode===Ln.TRIANGLE_FAN||g.mode===void 0){let A=r.isSkinnedMesh===!0,_=y.hasAttribute("skinIndex")&&y.hasAttribute("skinWeight");A&&_===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),p=A&&_?new oa(y,S):new Be(y,S),p.isSkinnedMesh===!0&&p.normalizeSkinWeights()}else if(g.mode===Ln.LINES)p=new _s(y,S);else if(g.mode===Ln.LINE_STRIP)p=new Gn(y,S);else if(g.mode===Ln.LINE_LOOP)p=new vs(y,S);else if(g.mode===Ln.POINTS)p=new ys(y,S);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(p.geometry.morphAttributes).length>0&&qb(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),ui(p,r),g.extensions&&Ps(s,p,g),t.assignFinalMaterial(p),f.push(p)}for(let h=0,m=f.length;h<m;h++)t.associations.set(f[h],{meshes:e,primitives:h});if(f.length===1)return r.extensions&&Ps(s,f[0],r),f[0];let d=new Ee;r.extensions&&Ps(s,d,r),t.associations.set(d,{meshes:e});for(let h=0,m=f.length;h<m;h++)d.add(f[h]);return d})}loadCamera(e){let t,n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Xt(ts.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new Hn(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),ui(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let r=s.pop(),a=s,o=[],c=[];for(let l=0,u=a.length;l<u;l++){let f=a[l];if(f){o.push(f);let d=new $e;r!==null&&d.fromArray(r.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new la(o,c)})}loadAnimation(e){let t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,a=[],o=[],c=[],l=[],u=[];for(let f=0,d=s.channels.length;f<d;f++){let h=s.channels[f],m=s.samplers[h.sampler],y=h.target,g=y.node,p=s.parameters!==void 0?s.parameters[m.input]:m.input,S=s.parameters!==void 0?s.parameters[m.output]:m.output;y.node!==void 0&&(a.push(this.getDependency("node",g)),o.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",S)),l.push(m),u.push(y))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(f){let d=f[0],h=f[1],m=f[2],y=f[3],g=f[4],p=[];for(let A=0,_=d.length;A<_;A++){let w=d[A],T=h[A],C=m[A],x=y[A],b=g[A];if(w===void 0)continue;w.updateMatrix&&w.updateMatrix();let E=n._createAnimationTracks(w,T,C,x,b);if(E)for(let D=0;D<E.length;D++)p.push(E[D])}let S=new wa(r,void 0,p);return ui(S,s),S})}createNodeMesh(e){let t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){let a=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=s.weights.length;c<l;c++)o.morphTargetInfluences[c]=s.weights[c]}),a})}loadNode(e){let t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=s.children||[];for(let l=0,u=o.length;l<u;l++)a.push(n.getDependency("node",o[l]));let c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){let u=l[0],f=l[1],d=l[2];d!==null&&u.traverse(function(h){h.isSkinnedMesh&&h.bind(d,Kb)});for(let h=0,m=f.length;h<m;h++)u.add(f[h]);if(u.userData.pivot!==void 0&&f.length>0){let h=u.userData.pivot,m=f[0];u.pivot=new L().fromArray(h),u.position.x-=h[0],u.position.y-=h[1],u.position.z-=h[2],m.position.set(0,0,0),delete u.userData.pivot}return u})}_loadNodeShallow(e){let t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"",o=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let u;if(r.isBone===!0?u=new dr:l.length>1?u=new Ee:l.length===1?u=l[0]:u=new xt,u!==l[0])for(let f=0,d=l.length;f<d;f++)u.add(l[f]);if(r.name&&(u.userData.name=r.name,u.name=a),ui(u,r),r.extensions&&Ps(n,u,r),r.matrix!==void 0){let f=new $e;f.fromArray(r.matrix),u.applyMatrix4(f)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);if(!s.associations.has(u))s.associations.set(u,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){let f=s.associations.get(u);s.associations.set(u,{...f})}return s.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],s=this,r=new Ee;n.name&&(r.name=s.createUniqueName(n.name)),ui(r,n),n.extensions&&Ps(t,r,n);let a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(s.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let u=0,f=c.length;u<f;u++){let d=c[u];d.parent!==null?r.add(Am(d)):r.add(d)}let l=u=>{let f=new Map;for(let[d,h]of s.associations)(d instanceof fn||d instanceof qt)&&f.set(d,h);return u.traverse(d=>{let h=s.associations.get(d);h!=null&&f.set(d,h)}),f};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){let a=[],o=e.name?e.name:e.uuid,c=[];function l(h){h.morphTargetInfluences&&c.push(h.name?h.name:h.uuid)}ns[r.path]===ns.weights?(l(e),e.isGroup&&e.children.forEach(l)):c.push(o);let u;switch(ns[r.path]){case ns.weights:u=Ti;break;case ns.rotation:u=Ai;break;case ns.translation:case ns.scale:u=Yi;break;default:switch(n.itemSize){case 1:u=Ti;break;case 2:case 3:default:u=Yi;break}break}let f=s.interpolation!==void 0?Hb[s.interpolation]:gs,d=this._getArrayFromAccessor(n);for(let h=0,m=c.length;h<m;h++){let y=new u(c[h]+"."+ns[r.path],t.array,d,f);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(y),a.push(y)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Ed(t.constructor),s=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let s=this instanceof Ai?Td:pc;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function Zb(i,e,t){let n=e.attributes,s=new yn;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(s.set(new L(c[0],c[1],c[2]),new L(l[0],l[1],l[2])),o.normalized){let u=Ed(Ir[o.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let o=new L,c=new L;for(let l=0,u=r.length;l<u;l++){let f=r[l];if(f.POSITION!==void 0){let d=t.json.accessors[f.POSITION],h=d.min,m=d.max;if(h!==void 0&&m!==void 0){if(c.setX(Math.max(Math.abs(h[0]),Math.abs(m[0]))),c.setY(Math.max(Math.abs(h[1]),Math.abs(m[1]))),c.setZ(Math.max(Math.abs(h[2]),Math.abs(m[2]))),d.normalized){let y=Ed(Ir[d.componentType]);c.multiplyScalar(y)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}i.boundingBox=s;let a=new un;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=a}function Im(i,e,t){let n=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(c){i.setAttribute(o,c)})}for(let a in n){let o=Ad[a]||a.toLowerCase();o in i.attributes||s.push(r(n[a],o))}if(e.indices!==void 0&&!i.index){let a=t.getDependency("accessor",e.indices).then(function(o){i.setIndex(o)});s.push(a)}return nt.workingColorSpace!==an&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${nt.workingColorSpace}" not supported.`),ui(i,e),Zb(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?Xb(i,e.targets,t):i})}var qa=new L;function Dn(i,e,t,n,s,r){let a=2*Math.PI*s/4,o=Math.max(r-2*s,0),c=Math.PI/4;qa.copy(e),qa[n]=0,qa.normalize();let l=.5*a/(a+o),u=1-qa.angleTo(i)/c;return Math.sign(qa[t])===1?u*l:o/(a+o)+l+l*(1-u)}var Is=class i extends In{constructor(e=1,t=1,n=1,s=2,r=.1){let a=s*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:s,radius:r},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let c=new L,l=new L,u=new L(e,t,n).divideScalar(2).subScalar(r),f=this.attributes.position.array,d=this.attributes.normal.array,h=this.attributes.uv.array,m=f.length/6,y=new L,g=.5/a;for(let p=0,S=0;p<f.length;p+=3,S+=2)switch(c.fromArray(f,p),l.copy(c),l.x-=Math.sign(l.x)*g,l.y-=Math.sign(l.y)*g,l.z-=Math.sign(l.z)*g,l.normalize(),f[p+0]=u.x*Math.sign(c.x)+l.x*r,f[p+1]=u.y*Math.sign(c.y)+l.y*r,f[p+2]=u.z*Math.sign(c.z)+l.z*r,d[p+0]=l.x,d[p+1]=l.y,d[p+2]=l.z,Math.floor(p/m)){case 0:y.set(1,0,0),h[S+0]=Dn(y,l,"z","y",r,n),h[S+1]=1-Dn(y,l,"y","z",r,t);break;case 1:y.set(-1,0,0),h[S+0]=1-Dn(y,l,"z","y",r,n),h[S+1]=1-Dn(y,l,"y","z",r,t);break;case 2:y.set(0,1,0),h[S+0]=1-Dn(y,l,"x","z",r,e),h[S+1]=Dn(y,l,"z","x",r,n);break;case 3:y.set(0,-1,0),h[S+0]=1-Dn(y,l,"x","z",r,e),h[S+1]=1-Dn(y,l,"z","x",r,n);break;case 4:y.set(0,0,1),h[S+0]=1-Dn(y,l,"x","y",r,e),h[S+1]=1-Dn(y,l,"y","x",r,t);break;case 5:y.set(0,0,-1),h[S+0]=Dn(y,l,"x","y",r,e),h[S+1]=1-Dn(y,l,"y","x",r,t);break}}static fromJSON(e){return new i(e.width,e.height,e.depth,e.segments,e.radius)}};var gc=new Is(1,1,1,1,.025),Ds=new Map,Um=i=>Array.from(Ds.values()).includes(i);function Et(i,e=!1){let t=i+e;return Ds.has(t)||Ds.set(t,new on({color:i,roughness:.88,metalness:0,...e?{emissive:i,emissiveIntensity:.65}:{}})),Ds.get(t)}function Ns(i,e){let t=`${i}:${e}`;if(!Ds.has(t)){let n=Et(i).clone();n.userData.seasonRole=e,Ds.set(t,n)}return Ds.get(t)}function I(i,e,t,n,s,r,a,o,c=!1){let l=new Be(gc,Et(o,c));return l.position.set(e,t,n),l.scale.set(s,r,a),l.castShadow=!0,l.receiveShadow=!0,i.add(l),l}function lt(i,e,t,n,s,r,a,o=s){let c=new Be(new $i(o,s,r,8),Et(a));return c.position.set(e,t,n),c.castShadow=!0,c.receiveShadow=!0,i.add(c),c}var Fe={wood:"#69543e",beam:"#544536",stone:"#ada58d",cream:"#ead6b0",window:"#f6d590",roof:"#9f533b",green:"#526b51",iron:"#535e55"},Fm=.2135,jb=.235;function Om(i){let e=(t,n=1)=>t+Fm*n+.042-jb;return i==="bench"?[{position:[0,e(0),0],yaw:0}]:i==="park"?[{position:[.4,e(.13,.85),.55],yaw:0}]:i==="gazebo"?[{position:[0,e(.16),-.55],yaw:0}]:[]}function $t(i,e,t,n,s=!1){let r=new Ee;r.position.set(e,t,n),s&&(r.rotation.y=Math.PI/2),i.add(r),I(r,0,0,0,.48,.56,.08,Fe.beam),I(r,0,0,.045,.37,.44,.05,Fe.window,!0),I(r,0,0,.08,.035,.46,.025,Fe.cream),I(r,0,0,.085,.38,.035,.025,Fe.cream),I(r,0,-.31,0,.6,.075,.16,Fe.wood)}function cn(i,e,t,n,s){let a=e*.62,o=new ni;o.moveTo(-e*.43,-.12),o.lineTo(e*.43,-.12),o.lineTo(0,e*.31),o.closePath();let c=new Be(new Mi(o,{depth:t*.86,bevelEnabled:!1}),Et("#dfcba7"));c.position.set(0,n,-t*.43),c.castShadow=!0,c.receiveShadow=!0,i.add(c);for(let l of[-1,1]){let u=I(i,l*e*.25,n+e*.155,0,a,.11,t+.3,s);u.material=Ns(s,"roof"),u.rotation.z=-l*.58;for(let f=0;f<5;f++){let d=l*(f+.5)*e/10,h=n+e*.3-Math.abs(d)*Math.tan(.58);for(let m=0;m<5;m++){let y=f%2?s:new be(s).multiplyScalar(1.07).getStyle(),g=I(i,d,h+.085,(m-2)*(t+.28)/5,e/10+.025,.045,(t+.28)/5-.018,y);g.material=Ns(y,"roof"),g.rotation.z=-l*.58}}}I(i,0,n+e*.325,0,.13,.11,t+.34,Fe.beam);for(let l of[-e*.49,e*.49])I(i,l,n+.04,0,.075,.09,t+.31,"#74644e");for(let l of[-t/2,t/2]){I(i,0,n+.15,l,.08,.52,.08,Fe.beam);for(let u of[-1,1]){let f=I(i,u*e*.21,n+.07,l,e*.53,.055,.06,Fe.beam);f.rotation.z=-u*.58}}}function Dm(i,e,t){let n=["#a6553c","#637969","#637e87","#ae884d"],s=["#ead8b6","#e5d8c3","#c6d0b1","#d9c4a3"];I(i,0,.08,0,1.88,.16,1.88,"#b1ab91"),I(i,0,1.2/2+.15,0,1.58,1.2,1.5,s[e%4]);for(let c of[-.785,.785])for(let l=0;l<7;l++)I(i,(l-3)*.22,.23,c,.212,.14,.045,l%2?"#b5a890":"#c2b59b"),I(i,(l-3)*.22,.38,c,.212,.13,.045,l%2?"#c2b59b":"#b5a890");for(let c of[-.79,.79])for(let l of[-.76,.76])I(i,c,.78,l,.075,1.27,.075,Fe.beam);for(let c of[.25,1.27])I(i,0,c,.765,1.65,.07,.065,Fe.wood);I(i,.18,.55,.798,.45,.88,.018,"#322f2b");let a=new Ee;a.name="door-hinge",a.userData.movingPart=!0,a.position.set(-.03,.55,.85),i.add(a),I(a,.21,0,0,.42,.86,.055,Fe.wood);for(let c of[-.26,.26])I(a,.21,c,.032,.34,.045,.025,"#8f7655");I(a,.34,0,.047,.045,.045,.032,"#ccb36c"),I(i,.18,.13,.91,.62,.13,.25,Fe.stone),$t(i,-.48,.81,.8),$t(i,.8,.81,-.2,!0);for(let c of[-.76,-.2]){I(i,c,.83,.84,.1,.52,.06,["#7b8d70","#8a9c86","#829ca2","#ac9370"][e%4]);for(let l=0;l<5;l++)I(i,c,.62+l*.09,.88,.09,.022,.02,"#65725b")}let o=new Ee;o.rotation.y=Math.PI,i.add(o),$t(o,.37,.88,.79),$t(o,-.36,.88,.79);for(let c of[-.6,.43])I(i,-.79,.8,c,.035,1.15,.065,Fe.beam);cn(i,1.72,1.67,1.4,n[e%4]),I(i,-.52,1.7,-.44,.22,.82,.26,"#aa9f85"),I(i,-.52,2.14,-.44,.3,.1,.32,"#787864");for(let c=0;c<5;c++)I(i,-.52,1.42+c*.13,-.577,.24,.017,.035,"#867c69"),I(i,-.66,1.49+c*.13,-.44,.035,.017,.26,"#867c69");if(t==="house"){let c=I(i,.18,1.13,.99,.69,.065,.48,n[e%4]);c.rotation.x=.15;for(let u of[-.11,.47])I(i,u,.57,1.09,.055,1.02,.055,Fe.wood);if(I(i,.18,.08,1.04,.76,.075,.35,"#c5b89c"),e===1||e===3){let u=new Ee;u.position.set(.34,1.6,.55),u.scale.setScalar(.48),i.add(u),I(u,0,.48,0,.82,.9,.6,"#e9d6b4"),$t(u,0,.53,.33),cn(u,1,.82,.95,n[e%4])}if(e===2)for(let u=0;u<5;u++)I(i,-.835,.35+u*.17,-.3+Math.sin(u)*.17,.085,.14,.12,u%2?"#789366":"#91a977");let l=new Ee;l.position.set(.6,1.07,.85),l.scale.setScalar(.32),i.add(l),I(l,0,0,0,.27,.38,.27,"#f0c176",!0),I(l,0,.22,0,.37,.07,.37,"#616958"),I(l,0,-.24,0,.29,.06,.29,"#616958")}if(t==="bakery"||t==="cafe"){let c=t==="bakery"?"#c78b47":"#688978",l=new Ee;i.add(l),l.position.set(0,1.05,.92);for(let f=0;f<8;f++){let d=I(l,(f-3.5)*.19,0,.06,.185,.07,.46,f%2?"#f0e4c8":c);d.rotation.x=.15,I(l,(f-3.5)*.19,-.085,.275,.185,.13,.035,f%2?"#f0e4c8":c)}if(I(i,0,.36,.91,1.42,.14,.24,Fe.wood),t==="bakery")for(let f=0;f<4;f++)lt(i,(f-1.5)*.24,.49,1,.1,.11,"#c69051");else lt(i,-.52,.5,1,.1,.12,"#e3ddd0"),I(i,-.32,.55,1,.12,.03,.12,"#d8b986");let u=new Ee;u.position.set(-.83,1.1,.95),i.add(u),I(u,0,.12,0,.04,.4,.04,Fe.iron),I(u,0,-.15,0,.36,.24,.07,"#f1e4bc"),lt(u,0,-.145,.06,.065,.03,c).rotation.x=Math.PI/2}I(i,-.48,.42,.88,.5,.14,.17,"#826049");for(let c=0;c<3;c++)I(i,-.63+c*.15,.57,.9,.04,.16,.04,"#748055"),I(i,-.63+c*.15,.66,.9,.105,.07,.1,e%2?"#dfb66a":"#d39889")}function mc(i=0){let e=new Ee;lt(e,0,.49,0,.09,.98,"#77604a",.06);let t=["#73915d","#86a26e","#58775a","#b69b5d"];for(let[n,s,r,a]of[[0,1.33,0,.49],[-.28,1.06,.12,.37],[.29,1.12,-.06,.38],[.03,1.68,-.07,.32]]){let o=new Be(new ii(a,1),Ns(t[i%4],"foliage"));o.position.set(n,s,r),o.scale.set(1.08,1.12,1.04),o.rotation.y=i*.23,o.castShadow=!0,o.receiveShadow=!0,e.add(o)}return e}function Rd(i,e="#ab8352"){for(let t of[-.31,.31])I(i,t,.102,0,.07,.205,.38,Fe.iron),I(i,t,.33,-.17,.06,.32,.06,Fe.iron);for(let t of[-.13,0,.13])I(i,0,Fm-.0325,t,.83,.065,.09,e);for(let t of[.305,.42])I(i,0,t,-.19,.83,.095,.06,e)}function Jb(i,e){lt(i,0,.05,0,.16,.1,Fe.iron),I(i,0,.65,0,.06,1.2,.06,Fe.iron),I(i,0,1.38,0,.25,.3,.25,["#f7d391","#abd3b6","#acc6da","#e8b6ab"][e%4],!0);for(let t of[-.13,.13])for(let n of[-.13,.13])I(i,t,1.38,n,.035,.32,.035,Fe.iron);I(i,0,1.58,0,.35,.08,.35,Fe.iron)}function Ls(i,e,t,n,s=1){let r=new Ee;r.position.set(e,.14,t),r.scale.setScalar(s),i.add(r),lt(r,0,.1,0,.13,.2,"#ad7357",.17),lt(r,0,.205,0,.15,.018,"#62513c");for(let a=0;a<4;a++){let o=a*2.4;I(r,Math.cos(o)*.08,.31,Math.sin(o)*.08,.022,.23,.022,"#698159");let c=new Be(new ii(.068,1),Et(n));c.position.set(Math.cos(o)*.08,.43+a%2*.04,Math.sin(o)*.08),r.add(c)}}function $a(i,e,t,n,s,r){let a=new ni;a.moveTo(-s/2,0),a.lineTo(s/2,0),a.lineTo(s/2,r-s/2),a.absarc(0,r-s/2,s/2,0,Math.PI,!1),a.closePath();let o=new Be(new Mi(a,{depth:.05,bevelEnabled:!1}),Et(Fe.wood));o.position.set(e,t,n),i.add(o);let c=new Be(o.geometry,Et(Fe.window,!0));c.position.set(e,t+.055,n+.055),c.scale.set(.84,.87,.5),i.add(c),I(i,e,t+r*.42,n+.092,.035,r*.72,.024,Fe.cream),I(i,e,t+r*.4,n+.09,s*.82,.035,.022,Fe.cream)}function Nm(i,e,t,n,s,r){let a=e/2,o=t/2,c=e*.23,l=[-a,0,-o,a,0,-o,-c,s,0,a,0,-o,c,s,0,-c,s,0,a,0,-o,a,0,o,c,s,0,a,0,o,-a,0,o,c,s,0,-a,0,o,-c,s,0,c,s,0,-a,0,o,-a,0,-o,-c,s,0];for(let d=0;d<l.length;d+=9)for(let h=0;h<3;h++){let m=l[d+3+h];l[d+3+h]=l[d+6+h],l[d+6+h]=m}let u=new ft().setAttribute("position",new et(l,3));u.computeVertexNormals();let f=new Be(u,Ns(r,"roof"));f.position.y=n,f.castShadow=!0,f.receiveShadow=!0,i.add(f);for(let d of[-o,o])I(i,0,n,d,e+.03,.09,.075,Fe.wood);for(let d of[-a,a])I(i,d,n,0,.075,.09,t,Fe.wood);I(i,0,n+s,0,c*2+.07,.08,.1,Fe.wood);for(let d of[-1,1])for(let h=1;h<4;h++)I(i,0,n+s*(1-h/4)+.012,d*o*h/4,e*(.46+.54*h/4),.02,.025,new be(r).multiplyScalar(1.1).getStyle())}function Qb(i,e,t){if(I(i,0,.07,0,1.9,.14,1.9,"#b4ad97"),e==="bakery"){I(i,-.12,.71,-.15,1.47,1.12,1.22,"#cfb798");for(let l=.27;l<1.17;l+=.15)for(let u=0;u<6;u++)I(i,-.76+u*.245+Math.round(l/.15)%2*.035,l,.47,.224,.12,.035,u%2?"#c49d81":"#d7b89b");$a(i,-.48,.41,.51,.63,.64),I(i,.4,.53,.51,.38,.75,.065,Fe.wood),I(i,.49,.53,.56,.04,.04,.026,"#c5a25d"),cn(i,1.62,1.35,1.3,["#ad6448","#967b58","#737f72","#aa8259"][t%4]),I(i,.7,.56,-.26,.37,.82,1.01,"#b68a6b"),I(i,.68,1.38,-.46,.28,1.22,.29,"#a78066");for(let l=.9;l<1.9;l+=.14)I(i,.68,l,-.612,.29,.022,.027,"#d6b394");I(i,.68,2.04,-.46,.38,.12,.37,"#7c7062");for(let l=0;l<6;l++){let u=I(i,-.22+(l-2.5)*.2,1.06,.79,.194,.07,.53,l%2?"#ede0c0":"#bb874c");u.rotation.x=.17,I(i,-.22+(l-2.5)*.2,.98,1.06,.19,.12,.035,l%2?"#ede0c0":"#bb874c")}I(i,-.36,.43,.88,.85,.07,.32,"#95744e");for(let l=0;l<4;l++){let u=lt(i,-.65+l*.18,.52,.88,.082,.1,"#c99a60");u.scale.z=.65,I(i,-.65+l*.18,.576,.88,.018,.012,.08,"#ead2a2")}let c=new Ee;c.rotation.y=Math.PI,i.add(c),$a(c,.28,.43,.775,.55,.52),I(c,-.5,.29,.79,.32,.24,.24,"#927956");for(let l=0;l<3;l++)I(c,-.51+l*.085,.39,.79,.04,.035,.22,"#bea779");for(let l of[.25,.4])I(i,-.12,l,-.78,1.48,.025,.04,"#b18d70");Ls(i,.72,.89,"#d9bc73",.65);return}if(e==="cafe"){I(i,-.16,1.14,-.18,1.25,1.98,1.22,["#d9d0b6","#d2c2b1","#c7cdbf","#e1d1b2"][t%4]);for(let f of[-.81,.46])I(i,f,1.16,.44,.075,2.03,.09,Fe.beam);I(i,-.16,2.17,-.18,1.44,.13,1.39,"#657c75").material=Ns("#657c75","roof"),I(i,-.16,2.28,-.72,1.4,.21,.07,"#c7bc9f");for(let f of[-.84,.52])I(i,f,2.28,-.18,.07,.21,1.15,"#c7bc9f");$a(i,-.47,.35,.47,.48,.7),I(i,.2,.65,.49,.36,1.02,.06,Fe.wood),$t(i,-.17,1.65,.47),I(i,-.18,1.32,.67,1.21,.07,.45,Fe.wood);for(let f=0;f<6;f++)I(i,-.73+f*.22,1.49,.84,.035,.34,.035,"#536b62");I(i,-.18,1.67,.84,1.2,.045,.045,"#536b62");let c=I(i,.7,.53,-.22,.32,.77,1.2,"#d9ccb1");c.name="coffee-wing",I(i,.7,.96,-.22,.44,.1,1.36,"#657c75"),lt(i,-.64,.41,.99,.21,.045,"#8c7657"),lt(i,-.64,.23,.99,.025,.33,Fe.iron),lt(i,-.65,.48,.99,.045,.08,"#eee2c7"),I(i,-.77,.25,.97,.11,.04,.21,Fe.wood),I(i,.61,1.36,.65,.42,.39,.06,"#5d776e"),lt(i,.6,1.39,.704,.084,.028,"#e7d3ac").rotation.x=Math.PI/2,I(i,.6,1.23,.705,.18,.035,.025,"#e7d3ac"),Ls(i,.56,.94,"#c29190",.8);let l=new Ee;l.rotation.y=Math.PI,i.add(l),$t(l,.16,1.62,.82),$a(l,.16,.36,.82,.65,.71);let u=new Ee;u.rotation.y=-Math.PI/2,i.add(u),$t(u,.25,1.61,.85),I(i,-.17,.3,-.815,1.27,.17,.07,"#b2a38a");return}if(e==="grocer"){I(i,0,.64,-.57,1.66,.99,.43,"#c0ac83");for(let c=0;c<8;c++)I(i,(c-3.5)*.22,.69,-.34,.03,.95,.025,"#957c57");for(let c of[-.82,.82])for(let l of[-.73,.67])I(i,c,.73,l,.095,1.23,.095,Fe.wood);Nm(i,1.97,1.83,1.4,.4,["#75816b","#a7804e","#748991","#a28560"][t%4]);for(let c of[-.59,.59]){I(i,c,.39,.18,.42,.5,1.09,"#a07d52");for(let l=0;l<4;l++){I(i,c,.67,-.2+l*.26,.37,.13,.23,"#b99a69");for(let u=0;u<3;u++){let f=new Be(new ii(.061,1),Et(["#cf9c5f","#a8b86c","#bf7860","#d5ba73"][l]));f.position.set(c+(u-1)*.095,.77,-.2+l*.26),i.add(f)}}}for(let c=.27;c<1.17;c+=.15)I(i,0,c,-.795,1.68,.026,.03,"#9f895f");I(i,.3,.56,-.805,.41,.67,.04,"#8d7654"),I(i,.43,.57,-.84,.045,.045,.025,"#c4ad73"),I(i,0,1.11,.76,.58,.24,.06,"#e8d8b3");for(let c=0;c<3;c++)lt(i,(c-1)*.12,1.12,.8,.053,.025,["#cda16b","#a2ae75","#c07d61"][c]).rotation.x=Math.PI/2;lt(i,-.78,.29,.92,.14,.29,"#c1ae85"),I(i,-.78,.47,.92,.15,.07,.16,"#82996f");return}let n=["#6f897a","#857989","#758b98","#94906b"][t%4],s=["#dabda9","#d4cbb1","#c9d1c7","#e1ceb0"][t%4];I(i,-.58,.89,-.12,.49,1.48,1.42,s);for(let c=.3;c<1.55;c+=.18)I(i,-.58,c,.6,.51,.022,.026,"#b69382");let r=Et("#b9d1c5").clone();Object.assign(r,{transparent:!0,opacity:.62,roughness:.24,depthWrite:!1});let a=(c,l,u,f,d,h)=>{let m=I(i,c,l,u,f,d,h,"#b9d1c5");return m.material=r,m};for(let c of[-.28,.82])a(c,.87,-.12,.025,1.35,1.44);a(.27,.87,.6,1.09,1.35,.025),a(.27,.87,-.83,1.09,1.35,.025);for(let c of[-.3,.26,.83])for(let l of[-.85,.62])I(i,c,.9,l,.055,1.54,.055,n);for(let c of[.25,1.05,1.6])I(i,.27,c,.63,1.17,.04,.05,n);let o=a(.26,1.76,-.12,1.25,.04,1.53);o.rotation.z=-.2;for(let c of[-.86,-.13,.63]){let l=I(i,.26,1.79,c,1.28,.06,.05,n);l.rotation.z=-.2}I(i,-.59,1.73,-.12,.66,.12,1.61,"#866b58"),I(i,-.58,2,-.41,.5,.39,.47,"#d3b79d"),Nm(i,.67,.66,2.23,.23,"#82786d"),I(i,.18,.59,.66,.37,.91,.038,"#839d8a"),a(.18,.75,.7,.26,.49,.015),I(i,-.52,.44,.83,.68,.05,.28,"#a68661");for(let[c,l]of[-.75,-.43,.65].entries())Ls(i,l,.85,["#d399aa","#c4b1d2","#e2bf7c"][c],.82);Ls(i,.59,-.42,"#d5b875",1),Ls(i,.12,-.48,"#c69baa",.7),I(i,-.59,1.32,.67,.32,.29,.04,"#e7d9bd");for(let c=0;c<5;c++){let l=c*Math.PI*2/5;lt(i,-.59+Math.cos(l)*.054,1.33+Math.sin(l)*.054,.706,.038,.022,"#c18e9b").rotation.x=Math.PI/2}lt(i,-.59,1.33,.721,.031,.02,"#d9bc6c").rotation.x=Math.PI/2}function eS(i,e,t){let n=["#718477","#9d6250","#718894","#ae925d"],s=n[t%4],r=["library","greenhouse","boathouse"].includes(e);if(I(i,0,.07,0,r?2.8:1.9,.14,1.9,"#b4ad97"),e==="library"){I(i,0,.86,-.12,2.48,1.44,1.44,"#e3d5b6");for(let u of[-1.21,-.43,.43,1.21])I(i,u,.88,.61,.07,1.5,.06,Fe.beam);for(let u of[.3,1.55])I(i,0,u,.63,2.51,.08,.08,Fe.beam);$t(i,-.82,.91,.66),$t(i,.83,.91,.66),I(i,0,.67,.68,.43,1,.09,Fe.wood),cn(i,2.62,1.62,1.65,s),I(i,0,1.57,.92,.87,.075,.39,s);for(let u of[-.36,.36])I(i,u,.88,1.02,.06,1.5,.06,Fe.wood);I(i,-.75,.42,.9,.69,.05,.23,Fe.wood);for(let u=0;u<6;u++)I(i,-1+u*.09,.54+u%2*.025,.91,.065,.23+u%2*.05,.16,["#8fa591","#b28068","#a9bbbf"][u%3]);let o=new Ee;o.position.set(.7,1.5,.72),i.add(o),I(o,0,0,0,.49,.31,.04,"#e9dfc1");for(let u of[-.1,.1]){let f=I(o,u,0,.034,.19,.2,.025,"#b39666");f.rotation.z=u<0?-.14:.14}Ls(i,1.05,.87,"#d2b473",.72);let c=new Ee;c.rotation.y=Math.PI,i.add(c);for(let u of[-.74,.74])$t(c,u,.98,.87);I(c,0,.34,.89,2.47,.19,.04,"#baac8f");let l=new Ee;l.rotation.y=-Math.PI/2,i.add(l),$a(l,.1,.55,1.27,.66,.89);return}if(e==="greenhouse"){let o=["#698479","#897e6c","#718898","#94916a"][t%4],c=Et(["#b5d4c4","#d5c8d4","#b6ccd6","#d6d6b2"][t%4]).clone();Object.assign(c,{transparent:!0,opacity:.45,roughness:.28,metalness:.08,depthWrite:!1,side:en});let l=(u,f,d,h,m,y)=>{let g=new Be(gc,c);return g.position.set(u,f,d),g.scale.set(h,m,y),g.receiveShadow=!0,i.add(g),g};for(let u of[-1.26,1.26]){l(u,.8,0,.035,1.25,1.56);for(let f of[-.76,0,.76])I(i,u,.8,f,.065,1.29,.065,o)}for(let u of[-.76,.76]){l(0,.8,u,2.47,1.25,.035);for(let f of[-1.26,-.63,0,.63,1.26])I(i,f,.8,u,.055,1.29,.06,o);I(i,0,.28,u,2.55,.06,.07,o)}for(let u of[-1,1]){let f=l(u*.64,1.65,0,1.57,.04,1.64);f.rotation.z=-u*.42;for(let d of[-.8,-.4,0,.4,.8]){let h=I(i,u*.64,1.65,d,1.61,.045,.045,o);h.rotation.z=-u*.42}}I(i,0,1.975,0,.07,.075,1.66,o);for(let u of[-.83,.83]){I(i,u,.42,0,.45,.55,1.18,"#a28159");for(let f=0;f<4;f++)Ls(i,u,-.48+f*.3,t%2?"#d2b26b":"#cf9894",.77)}I(i,0,.64,.79,.46,1.02,.045,"#7a958a"),l(0,.78,.82,.37,.58,.026);return}if(e==="granary"){lt(i,-.43,.91,-.16,.43,1.55,"#c2a97e");for(let l=0;l<12;l++){let u=l*Math.PI/6;I(i,-.43+Math.cos(u)*.432,.9,-.16+Math.sin(u)*.432,.03,1.52,.035,"#947958")}for(let l of[.4,1.17,1.56])lt(i,-.43,l,-.16,.443,.055,"#747d70");let o=new Be(new da(.54,.48,12),Ns(s,"roof"));o.position.set(-.43,1.92,-.16),o.castShadow=!0,i.add(o);let c=new Ee;c.position.set(.48,0,.06),i.add(c),I(c,0,.63,0,.62,.96,1.31,"#b69971"),cn(c,.77,1.4,1.17,s),I(c,0,.52,.69,.36,.73,.06,Fe.wood);for(let l of[-.71,-.38,-.03])lt(i,l,.31,.74,.135,.33,"#d2be8e",.11),I(i,l,.5,.74,.12,.035,.11,"#a68b58");return}if(e==="boathouse"){for(let l=0;l<12;l++)I(i,(l-5.5)*.225,.18,0,.214,.08,1.7,l%2?"#b19a71":"#bea67b");for(let l of[-1.16,1.16])for(let u of[-.72,.72])I(i,l,.87,u,.095,1.54,.095,Fe.wood);I(i,0,.79,-.74,2.38,1.16,.09,"#a99069"),cn(i,2.51,1.7,1.64,s);let o=new ni;o.moveTo(-1.02,0);for(let[l,u]of[[-.67,-.29],[.66,-.24],[1.02,0],[.66,.24],[-.67,.29]])o.lineTo(l,u);o.closePath();let c=new Be(new Mi(o,{depth:.22,bevelEnabled:!0,bevelSize:.025,bevelThickness:.025,bevelSegments:1,steps:1}),Et("#718b89"));c.rotation.x=Math.PI/2,c.position.set(0,.48,.22),c.castShadow=!0,i.add(c),I(i,0,.49,.22,1.6,.03,.37,"#a18761");for(let l of[-.4,.2,.67])I(i,l,.55,.22,.16,.06,.46,"#d2bd91");for(let l of[-.19,.67]){let u=I(i,-.03,.65,l,1.64,.038,.05,"#c6ac7c");u.rotation.y=l<0?.15:-.15,I(i,-.89,.65,l,.23,.04,.13,"#baa074")}lt(i,-1.04,.36,.73,.14,.3,"#957750");return}}function Bm(i,e=0,t=0){let n=new Ee;if(n.name=`${i}-${e}-${t}`,["bakery","cafe","grocer","florist"].includes(i))Qb(n,i,e);else if(["library","greenhouse","granary","boathouse"].includes(i))eS(n,i,e);else if(i==="house")Dm(n,e,i);else if(i==="hall"){I(n,0,.1,0,2.8,.2,2.8,"#b3aa90"),I(n,0,.96,0,2.28,1.72,2.02,"#e3d4b1");for(let a of[-1.13,1.13])I(n,a,1,1.02,.09,1.8,.09,Fe.beam);$t(n,-.7,1.12,1.04),$t(n,.7,1.12,1.04);let s=new Ee;s.rotation.y=Math.PI,n.add(s),$t(s,-.7,1.12,1.04),$t(s,.7,1.12,1.04);for(let a of[-1.18,1.18]){let o=new Ee;o.rotation.y=a<0?-Math.PI/2:Math.PI/2,n.add(o),$t(o,0,1.05,1.17)}I(n,0,.62,1.037,.57,1.06,.02,"#322f2b");let r=new Ee;r.name="door-hinge",r.userData.movingPart=!0,r.position.set(-.275,.62,1.1),n.add(r),I(r,.275,0,0,.55,1.04,.06,Fe.wood),I(r,.45,0,.045,.05,.05,.03,"#ccb36c");for(let a=0;a<3;a++)I(n,0,.06+a*.08,1.24-a*.1,.94,.12,.38,Fe.stone);cn(n,2.55,2.25,1.95,"#63745b"),I(n,0,2.36,-.15,.64,.74,.65,"#e6dbb7"),cn(n,.87,.87,2.76,"#546d54"),I(n,0,2.42,.19,.35,.35,.03,"#f5e9c8"),I(n,0,2.44,.215,.022,.12,.02,Fe.beam),I(n,.055,2.385,.22,.12,.02,.02,Fe.beam),lt(n,-1.29,.85,1.2,.025,1.65,Fe.iron),I(n,-1.07,1.4,1.2,.4,.28,.025,"#c3a36b")}else if(i==="market"){I(n,0,.06,0,2.8,.12,2.8,"#b1aa90");for(let s of[-1.1,1.1])for(let r of[-1,1])I(n,s,.75,r,.1,1.5,.1,Fe.wood);cn(n,2.52,2.5,1.52,"#a77e47");for(let s of[-.75,.75]){I(n,s,.43,.25,.7,.66,1.35,"#9d7951");for(let r=0;r<6;r++)for(let a=0;a<2;a++)I(n,s-.2+a*.3,.82,-.26+r*.19,.15,.12,.14,["#bb7447","#8d9b58","#d2b066"][r%3])}I(n,0,.53,-.85,2.05,.7,.35,"#b0976a")}else if(i==="park"){I(n,0,.055,0,1.93,.11,1.93,"#a8ba7f").material=Ns("#a8ba7f","ground");for(let a of[-.91,.91])I(n,a,.18,-.1,.065,.25,1.7,"#e1d2ac");let s=mc(e);s.scale.setScalar(.82),s.position.set(-.38,.08,-.36),n.add(s);let r=new Ee;r.position.set(.4,.13,.55),Rd(r),r.scale.setScalar(.85),n.add(r),I(n,0,.12,.42,1.7,.035,.34,"#cbbc98");for(let a=0;a<5;a++)I(n,-.6+a*.27,.19,-.79,.13,.12,.13,a%2?"#d9b674":"#b4797c")}else if(i==="bridge"){I(n,0,.08,0,.97,.18,2.28,"#b6ab91");for(let s=0;s<9;s++)I(n,0,.19+.075*Math.sin(s/8*Math.PI),-.96+s*.24,.9,.07,.23,s%2?"#c8bfa5":"#beb499");for(let s of[-.43,.43]){I(n,s,.38,0,.13,.29,2.25,"#ada18a");for(let r of[-.94,0,.94])I(n,s,.48,r,.2,.47,.19,"#b9ad94")}if(e)for(let s of[-.43,.43])for(let r of[-.94,.94])I(n,s,.74,r,.2,.045,.19,["#b9ad94","#718879","#83989e","#bb9c6c"][e%4])}else if(i==="workshop"){Dm(n,t%4,"house");let s=["#a8b6ae","#6eabc0","#c9978b","#a296bf","#d9b362"];if(I(n,0,1.17,.84,.7,.16,.07,s[t],!0),t>0&&(I(n,0,2.05,0,1.06,.75,1.05,"#e6d5b8"),cn(n,1.3,1.3,2.48,s[t]),$t(n,0,2.08,.56)),t>1){let r=I(n,0,1.7,.88,1.64,.12,.38,Fe.wood);r.name="balcony";for(let a=0;a<5;a++)I(n,(a-2)*.33,1.9,1.03,.04,.32,.04,s[t])}if(t>2&&(I(n,-.78,2.17,-.45,.38,1.8,.38,"#ccbfa7"),cn(n,.55,.55,3.1,s[t])),t===4){lt(n,0,3,0,.11,.7,"#d8b466",.04);for(let r of[-.39,.39])I(n,r,2.82,0,.12,.45,.12,"#d8b466");I(n,0,2.78,0,.86,.12,.12,"#d8b466")}}else if(i==="clock"){I(n,0,.1,0,2.65,.2,2.65,Fe.stone);for(let s=0;s<3;s++)I(n,0,.23+s*.12,.1,2.1-s*.25,.15,2.1-s*.25,"#b9b099");I(n,0,1.75,0,1.17,2.8,1.17,"#d4c6a5");for(let s=.6;s<3;s+=.28)I(n,0,s,.592,1.19,.025,.04,"#c1b495");for(let s=0;s<4;s++){let r=new Ee;r.rotation.y=s*Math.PI/2,n.add(r),lt(r,0,2.64,.64,.37,.07,"#f2e4b9").rotation.x=Math.PI/2,I(r,0,2.72,.7,.035,.2,.035,Fe.iron),I(r,.1,2.64,.7,.23,.035,.03,Fe.iron)}cn(n,1.6,1.5,3.23,["#687b63","#8a6867","#728999","#ba965c"][e%4]),lt(n,0,3.94,0,.045,.5,"#bda262")}else if(i==="tree")n.add(mc(e));else if(i==="bench")Rd(n,["#ab8352","#869b7c","#99a9b1","#c5bca4"][e%4]);else if(i==="lamp"||i==="gardenlamp"){if(Jb(n,e),i==="gardenlamp")for(let s=0;s<6;s++){let r=s*Math.PI/3;I(n,Math.cos(r)*.28,.08,Math.sin(r)*.28,.18,.12,.18,"#87a36d")}}else if(i==="flower"){I(n,0,.2,0,.85,.36,.45,"#a57b54");for(let s=0;s<5;s++)I(n,(s-2)*.14,.42,0,.04,.2,.04,"#71835a"),I(n,(s-2)*.14,.55,0,.12,.08,.12,e%2?"#c48da1":"#e1b65e")}else if(i==="picnic"){I(n,0,.55,0,.82,.07,.65,e%2?"#839981":"#a58352");for(let s of[-.33,.33])I(n,s,.28,0,.07,.5,.08,Fe.wood),I(n,s*1.2,.29,0,.14,.06,.68,e%2?"#acbaa0":"#b79763");I(n,-.15,.62,.05,.18,.06,.18,"#d6c3a2")}else if(i==="birdhouse")I(n,0,.6,0,.08,1.2,.08,Fe.wood),I(n,0,1.12,0,.45,.43,.4,"#d6b273"),cn(n,.61,.51,1.34,e%2?"#88a182":"#ab6952"),lt(n,0,1.14,.225,.09,.025,Fe.beam).rotation.x=Math.PI/2;else if(i==="windmill"){I(n,0,.6,0,.39,1.12,.39,"#d4c2a4"),cn(n,.61,.56,1.2,e%2?"#889cac":"#797e5e");let s=new Ee;s.name="fan",s.position.set(0,1.05,.3),n.add(s);for(let r=0;r<4;r++){let a=I(s,0,0,0,.11,1.15,.045,e%2?"#becbd0":"#d9bf91");a.rotation.z=r*Math.PI/4}}else if(i==="statue"){let s=e%2?"#9cbbac":"#c9c4af";I(n,0,.17,0,.72,.34,.72,"#b0ac96"),I(n,0,.7,0,.31,.8,.31,s),I(n,0,1.21,0,.37,.37,.37,s),I(n,-.23,.88,0,.45,.12,.12,s)}else if(i==="barrel"){lt(n,0,.3,0,.23,.58,"#92704c",.21);for(let s of[.1,.46])lt(n,0,s,0,.239,.045,"#62675d");I(n,.29,.08,.05,.13,.14,.46,"#b49a72")}else if(i==="planter"){lt(n,0,.14,0,.3,.28,"#b57958",.35),lt(n,0,.29,0,.3,.025,"#625541");for(let s=0;s<7;s++){let r=s*2.4;I(n,Math.cos(r)*.17,.4,Math.sin(r)*.17,.025,.23,.025,"#6b8b5a");let a=new Be(new ii(.074,1),Et(s%2?"#ddb968":"#c69391"));a.position.set(Math.cos(r)*.17,.54,Math.sin(r)*.17),n.add(a)}}else if(i==="hedge")I(n,0,.25,0,.92,.5,.5,"#65845f"),I(n,0,.51,0,.88,.08,.47,"#7b986b");else if(i==="cart"){I(n,0,.32,0,.6,.15,.7,"#a6885c");for(let s of[-.36,.36])lt(n,s,.18,0,.18,.065,"#6d5d46").rotation.z=Math.PI/2;for(let s of[-.32,.32])I(n,0,.49,s,.64,.24,.06,"#b59b74")}else if(i==="fountain")lt(n,0,.12,0,.87,.22,"#b1b4a5"),lt(n,0,.24,0,.7,.026,"#7aabb0"),lt(n,0,.43,0,.15,.5,"#c6c6b2"),lt(n,0,.67,0,.4,.09,"#c6c6b2");else if(i==="gazebo"){I(n,0,.08,0,1.86,.16,1.86,"#b8b5a5");for(let r of[-.7,.7])for(let a of[-.7,.7])I(n,r,.75,a,.08,1.5,.08,"#967a56");cn(n,1.77,1.77,1.5,"#798c77");let s=new Ee;s.position.set(0,.16,-.55),Rd(s),n.add(s)}return n}function Pd(i,e=0,t=!1){let n=new Ee,s=new Ee,r=["#d6aa85","#b88c6a","#e2b99a"][e%3];I(s,0,.35,0,.19,.25,.14,i),I(s,0,.54,0,.18,.18,.17,r),I(s,0,.635,-.018,.195,.065,.19,e%2?"#5a493d":"#a47b50"),I(s,0,.56,-.075,.18,.1,.035,e%2?"#5a493d":"#a47b50");for(let a of[-.04,.04])I(s,a,.55,.087,.018,.023,.012,"#47443c");I(s,0,.245,0,.2,.035,.145,"#706650"),n.add(fi(s));for(let[a,o]of[["left",-.055],["right",.055]]){let c=new Ee;c.name=`leg-${a}`,c.position.set(o,.235,0);let l=new Ee;t?(I(l,0,-.004,.064,.073,.078,.145,"#53616a"),I(l,0,-.108,.125,.068,.2,.072,"#53616a"),I(l,0,-.218,.149,.084,.055,.12,"#5a483c")):(I(l,0,-.105,0,.073,.2,.085,"#53616a"),I(l,0,-.208,.027,.084,.055,.14,"#5a483c")),c.add(fi(l)),n.add(c);let u=new Ee;u.name=`arm-${a}`,u.position.set(o<0?-.137:.137,.43,0);let f=new Ee;I(f,0,-.073,0,.065,.15,.085,i),I(f,0,-.169,0,.06,.068,.071,r),u.add(fi(f)),t&&(u.rotation.x=-.38),n.add(u)}return n}function fi(i){i.updateMatrixWorld(!0);let e=new Ee;e.name=i.name,e.userData={...i.userData};let t=[];i.traverse(r=>{r.userData.movingPart&&t.push(r)});let n=r=>{let a=r;for(;a&&a!==i;){if(a.userData.movingPart)return a;a=a.parent}},s=(r,a,o)=>{let c=r.matrixWorld.clone().invert(),l=new Map;r.traverse(u=>{if(!(u instanceof Be)||Array.isArray(u.material)||n(u)!==o)return;let f=u.geometry.index?u.geometry.toNonIndexed():u.geometry.clone();f.applyMatrix4(new $e().multiplyMatrices(c,u.matrixWorld));let d=l.get(u.material)||[];d.push(f),l.set(u.material,d)});for(let[u,f]of l){let d=wm(f,!1);if(!d)continue;let h=new Be(Tm(d),u);d.dispose(),h.castShadow=!0,h.receiveShadow=!0,a.add(h),f.forEach(m=>m.dispose())}};s(i,e);for(let r of t){let a=new Ee;a.name=r.name,a.userData={...r.userData},new $e().multiplyMatrices(i.matrixWorld.clone().invert(),r.matrixWorld).decompose(a.position,a.quaternion,a.scale),s(r,a,r),e.add(a)}return e}function km(i,e,t=new Map){let n=i.size,s=new Ee,r=new Ee,a=new Ee,o=4703+n,c=()=>(o=Math.imul(o,1664525)+1013904223>>>0,o/4294967296),l=i.terrain==="meadow"?-1:i.terrain==="valley"?11:5;I(a,n/2,-1.37,n/2,n+.1,.5,n+.1,"#756b54"),I(a,n/2,-.91,n/2,n+.08,.46,n+.08,"#9b8767"),I(a,n/2,-.61,n/2,n+.12,.17,n+.12,"#b1a080");let u=(b,E)=>I(a,n/2,-.29,b,n+.06,.55,E,"#b8a887");l<0?u(n/2,n):(u(l/2,l),u((l+2+n)/2,n-l-2));for(let b=0;b<n;b++)for(let E of[0,n])b%3===0&&I(a,b+.5,-.78,E,.85,.17+c()*.12,.035,"#88775d"),b%2===0&&I(a,b+.7,-1.14,E,.48,.11,.04,"#ab9474");for(let b=0;b<n;b++)for(let E of[0,n])jn(i,.5,b)||I(a,E,-.83,b+.4,.04,.2,.68+c()*.2,"#8e7c62");let f=[],d=[],h=new be,m=(b,E)=>{let D=.94+Math.sin(b*.34+E*.12)*.035+Math.cos(E*.43-b*.17)*.025,F=Fr(e,i,Math.min(n-1,Math.floor(b)),Math.min(n-1,Math.floor(E)));return h.set(F?"#91b474":"#729b71"),l>=0&&h.lerp(new be("#8fa581"),Math.max(0,1-Math.min(Math.abs(E-l),Math.abs(E-l-2))/1.6)*.3),h.multiplyScalar(D)};for(let b=0;b<n;b++)for(let E=0;E<n;E++)if(!jn(i,E,b))for(let[D,F]of[[E,b],[E,b+1],[E+1,b],[E+1,b],[E,b+1],[E+1,b+1]]){f.push(D,.026,F);let N=m(D,F);d.push(N.r,N.g,N.b)}let y=new ft().setAttribute("position",new et(f,3)).setAttribute("color",new et(d,3));y.computeVertexNormals();let g=new Be(y,new on({vertexColors:!0,roughness:.95}));g.material.userData.seasonRole="ground",g.receiveShadow=!0,s.add(g);let p=Et("#d6decf").clone();p.userData.seasonRole="ground";let S=new Be(new Vn(240,240),p);S.rotation.x=-Math.PI/2,S.position.set(n/2,-1.65,n/2),S.receiveShadow=!0,s.add(S);let A={value:0},_=[],w=(b,E,D,F,N=1,P=0)=>{let U=t.get(b);if(!U)return;let z=U.clone();return z.position.set(E,D,F),z.scale.setScalar(N),z.rotation.y=P,s.add(z),z},T=(b,E,D,F)=>{let N=[];for(let z=0;z<n*4;z++){let V=z/4,j=(z+1)/4;for(let[q,J]of[[V,b(V)],[V,E(V)],[j,b(j)],[j,b(j)],[V,E(V)],[j,E(j)]])N.push(q,D,J)}let P=new ft().setAttribute("position",new et(N,3));P.computeVertexNormals();let U=new Be(P,Et(F));U.receiveShadow=!0,s.add(U)};if(l>=0){I(a,n/2,-.43,l+1,n+.17,.12,2.05,"#457b7c");let b=new on({color:"#499a9e",roughness:.23,metalness:.06,transparent:!0,opacity:.94});b.onBeforeCompile=N=>{N.uniforms.townTime=A,N.vertexShader=`uniform float townTime; varying vec3 townPosition;
`+N.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
transformed.z += sin(position.x * 2.1 - townTime * .65) * .006 + sin(position.x * .72 + position.y * 8.3 - townTime * .38) * .003;`).replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
townPosition = (modelMatrix * vec4(transformed, 1.0)).xyz;`),N.fragmentShader=`uniform float townTime; varying vec3 townPosition;
`+N.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
        float depth = min(abs(townPosition.z - ${l.toFixed(1)}), abs(townPosition.z - ${(l+2).toFixed(1)}));
        float flow = sin(townPosition.x * .9 - townTime * .38 + sin(townPosition.z * 5.0)) * .035;
        float ripple = pow(max(0.0, sin(townPosition.x * 3.2 - townTime * .65 + sin(townPosition.z * 12.0) * .4)), 32.0);
        diffuseColor.rgb *= .95 + flow;
        diffuseColor.rgb += vec3(.10,.19,.13) * (1.0 - smoothstep(.1,.48,depth));
        diffuseColor.rgb += vec3(.17,.20,.18) * ripple * .13;`)};let E=new Be(new Vn(n+.15,2,n*6,10),b);E.rotation.x=-Math.PI/2,E.position.set(n/2,-.19,l+1),s.add(E);let D=os(i);for(let N of[-1,1]){let P=N<0?l:l+2,U=-N;T(z=>P+U*(.06+Math.sin(z*.78)*.035),z=>P+U*(.25+Math.sin(z*.78)*.06+Math.sin(z*1.9)*.04),-.16,"#92b6a4"),T(()=>P,z=>P+U*(.14+Math.sin(z*.78)*.035),-.045,"#b0b29a")}for(let N=0;N<n;N++)for(let P of[-1,1]){let U=P<0?l:l+2,z=Math.sin(N*.85)*.05;if(!D.includes(N)&&N%3!==1){for(let V=0;V<4;V++){let j=N+.08+c()*.82,q=U-P*(.06+c()*.14)+z;if(t.has("rock"))w("rock",j,-.15,q,.35+c()*.35,c()*6);else{let J=new Be(new pa(.12+c()*.06,0),Et(V%2?"#a5b2a0":"#bec2ab"));J.position.set(j,-.12,q),J.scale.y=.55,a.add(J)}}for(let V=0;V<6;V++){let j=I(a,N+.18+V*.07,.055+V%2*.025,U-P*.08,.018,.21+c()*.15,.018,"#657f56");j.rotation.z=(c()-.5)*.3,V%2===0&&I(a,j.position.x,.22,U-P*.08,.033,.075,.033,"#927b4e")}}}for(let N of D){let P=new Be(new Vn(.65,1.65),new Qt({color:"#e2dbc0",transparent:!0,opacity:.2,side:en}));P.rotation.x=-Math.PI/2,P.position.set(N+.5,-.18,l+1),s.add(P)}for(let N=0;N<5;N++)I(a,-.36,-.1,l+.1+N*.13,.6,.05,.115,"#a7895c");for(let N of[l+.08,l+.69])I(a,-.63,-.21,N,.09,.47,.09,"#806d51");let F=new Ee;F.name="river-boat",F.position.set(n-5.4,-.15,l+1.14),I(F,0,0,0,.68,.1,.34,"#9d7550");for(let N of[-.33,.33])I(F,N,.07,0,.06,.12,.36,"#b48a5c");for(let N of[-.16,.16])I(F,0,.08,N,.65,.13,.05,"#ac8055");I(F,0,.09,0,.12,.045,.3,"#d0ac75"),s.add(fi(F));for(let N=0;N<3;N++){let P=new Ee,U=new Be(new xr(.08,10,6),Et(N?"#e2d7b5":"#eee4c9"));U.scale.set(1.6,.8,1),P.add(U);let z=new Be(new xr(.047,8,6),Et("#ece1c2"));z.position.set(.095,.068,0),P.add(z),I(P,.14,.064,0,.055,.022,.035,"#c49a56"),s.add(P),_.push(P)}for(let N=0;N<8;N++){let P=new Be(new fa(.045+c()*.035,8),Et("#6a976d"));P.rotation.x=-Math.PI/2,P.position.set(2+c()*(n-4),-.178,l+(N%2?.29:1.7)),s.add(P)}}let C=[];if(i.terrain==="valley"){let b=(P,U)=>{let z=Math.max(0,1-Math.hypot((P-3)/8,(U+7)/7)),V=Math.max(0,1-Math.hypot((P-20)/10,(U+8)/7));return-1.64+Math.max(z*z*4.2,V*V*5.5)},E=[],D=[];for(let P=-14;P<-1;P++)for(let U=-6;U<n+7;U++)for(let[z,V]of[[U,P],[U,P+1],[U+1,P],[U+1,P],[U,P+1],[U+1,P+1]]){let j=b(z,V);E.push(z,j,V);let q=new be("#879e75").multiplyScalar(.9+Math.max(0,j+1.64)*.035);D.push(q.r,q.g,q.b)}let F=new ft().setAttribute("position",new et(E,3)).setAttribute("color",new et(D,3));F.computeVertexNormals();let N=new Be(F,new on({vertexColors:!0,roughness:.95}));N.material.userData.seasonRole="ground",N.receiveShadow=!0,s.add(N);for(let P=-13;P<-1;P+=2)for(let U=-5;U<n+7;U+=2)if(!(b(U+1,P+1)<=-1.6)){if(c()>.39){let V=U+.5+c(),j=P+.4+c();C.push({x:V,y:b(V,j)+.035,z:j,scale:.75+c()*.65,variant:(U+P+100)%3})}c()>.73&&w("boulder",U+.8,b(U+.8,P+.8),P+.8,.8,c()*6)}for(let P of[{x:5,z:4},{x:18,z:4},{x:19,z:19}])for(let U=0;U<22;U++){let z=c()*Math.PI*2,V=Math.sqrt(c())*4.3,j=P.x+Math.cos(z)*V,q=P.z+Math.sin(z)*V;j<.7||q<.7||j>n-.7||q>n-.7||jn(i,Math.floor(j),Math.floor(q))||Math.abs(q-12)<2.5||Fr(e,i,j,q)||C.push({x:j,y:.03,z:q,scale:.64+c()*.65,variant:U%3})}}else for(let b of[-1.1,n+1.1])for(let E=0;E<5;E++)C.push({x:b,y:-1.62,z:1+E*2.2,scale:.75,variant:E%3});let x=new xt;for(let b=0;b<3;b++){let E=t.get(["tree-0","pine","birch"][b]),D=fi(E||mc(b)),F=C.filter(N=>N.variant===b);for(let N of D.children){let P=N.material.clone();P.userData.seasonRole="grove";let U=new bn(N.geometry,P,F.length);U.name="curated-grove",F.forEach((z,V)=>{x.position.set(z.x,z.y,z.z),x.scale.setScalar(z.scale),x.rotation.y=V*1.73,x.updateMatrix(),U.setMatrixAt(V,x.matrix)}),U.castShadow=!0,U.receiveShadow=!0,r.add(U)}}for(let b=0;b<n*3;b++){let E=.3+c()*(n-.6),D=.3+c()*(n-.6);if(!(jn(i,Math.floor(E),Math.floor(D))||i.roads.includes(`${Math.floor(E)},${Math.floor(D)}`)||i.buildings.some(F=>F.placed&&Math.abs(F.x+1-E)<1.6&&Math.abs(F.z+1-D)<1.6)))for(let F=0;F<3;F++){let N=E+(c()-.5)*.35,P=D+(c()-.5)*.35;I(a,N,.08,P,.018,.1,.018,"#74865a"),I(a,N,.145,P,.05,.025,.05,b%3?"#decb91":"#c894a0")}}if(i.terrain==="valley"){if(!e.chapterStars[1])for(let b=14;b<24;b+=2){for(let E of[b,b+1.85])I(a,12.05,.3,E,.075,.58,.075,"#9a8767");for(let E of[.23,.46])I(a,12.05,E,b+.93,.045,.055,1.8,"#b4a280")}if(!e.chapterStars[2]){for(let b=1;b<24;b+=2)if(!(os(i).includes(b)||os(i).includes(b-1))){for(let E of[b,b+1.8])I(a,E,.29,10.65,.075,.56,.075,"#9a8767");for(let E of[.23,.43])I(a,b+.9,E,10.65,1.7,.055,.04,"#b4a280")}}}return s.add(fi(a)),{world:s,forest:r,update(b){A.value=b/1e3,_.forEach((E,D)=>{let F=b*65e-6;E.position.set(n*.28+Math.sin(F)*n*.19-D*.25,-.12+Math.sin(b*.002+D)*.007,l+1+Math.sin(F*1.3)*.28+D*.09),E.rotation.y=Math.cos(F)>0?0:Math.PI})}}}var Id=Math.PI*26/180,Ld=Math.PI*72/180,Dd=Math.PI*40/180,Nd=i=>Math.max(Id,Math.min(Ld,i)),zm=i=>Math.max(.52,Math.min(3.2,i));function Gm(i,e,t){let n=i.deltaMode===1?16:i.deltaMode===2?Math.max(1,t):1,s=Number.isFinite(i.deltaX)?i.deltaX*n:0,r=Number.isFinite(i.deltaY)?i.deltaY*n:0,a=Math.hypot(s,r);return a>120&&(s*=120/a,r*=120/a),i.ctrlKey||i.metaKey?{kind:"zoom",x:0,y:-r*.01}:i.shiftKey?{kind:"pan",x:s,y:r}:e==="mouse"?{kind:"zoom",x:0,y:-r*.0025}:{kind:"orbit",x:-s*.0035,y:-r*.0028}}function xc(i,e=!1,t=18){return e?1:1-Math.exp(-Math.max(0,i)*t)}var Ud=i=>`${i.x},${i.z}`,Lr=(i,e)=>(i%e+e)%e,Vm=i=>({x:-i.z,z:i.x}),_c=(i,e)=>{let t=Math.hypot(e.x-i.x,e.z-i.z);return{x:(e.x-i.x)/t,z:(e.z-i.z)/t}};function Hm(i,e,t){let n=e+i/.32*Math.PI*2,s=t?Math.sin(n):0;return{phase:n,leg:s*.58,arm:t?-s*.35:0,bob:t?Math.abs(Math.sin(n*2))*.009:0}}function tS(i){let e=[];for(let u of i){let[f,d]=u.split(",").map(Number);for(let[h,m,y,g]of[[0,-1,{x:f,z:d},{x:f+1,z:d}],[1,0,{x:f+1,z:d},{x:f+1,z:d+1}],[0,1,{x:f+1,z:d+1},{x:f,z:d+1}],[-1,0,{x:f,z:d+1},{x:f,z:d}]])i.has(`${f+h},${d+m}`)||e.push({a:y,b:g})}let t=new Map;e.forEach((u,f)=>{let d=t.get(Ud(u.a))||[];d.push(f),t.set(Ud(u.a),d)});let n=new Set,s=[];for(let u=0;u<e.length;u++){if(n.has(u))continue;let f=[],d=u;for(;!n.has(d);){n.add(d);let h=e[d];f.push(h.a);let m=_c(h.a,h.b),y=(t.get(Ud(h.b))||[]).filter(g=>!n.has(g)||g===u);if(y.sort((g,p)=>{let S=A=>{let _=_c(e[A].a,e[A].b);return m.x*_.z-m.z*_.x===1?0:m.x*_.x+m.z*_.z===1?1:2};return S(g)-S(p)||g-p}),!y.length)break;d=y[0]}d===u&&f.length>=4&&s.push(f)}let r=u=>u.reduce((f,d,h)=>{let m=u[(h+1)%u.length];return f+d.x*m.z-m.x*d.z},0),a=s.sort((u,f)=>r(f)-r(u))[0];if(!a)return{points:[],lengths:[],length:0};let o=a.filter((u,f)=>{let d=a[(f+a.length-1)%a.length],h=a[(f+1)%a.length];return(u.x-d.x)*(h.z-u.z)!==(u.z-d.z)*(h.x-u.x)}),c=[];o.forEach((u,f)=>{let d=o[(f+o.length-1)%o.length],h=o[(f+1)%o.length],m=_c(d,u),y=_c(u,h),g=Vm(m),p=Vm(y),S={x:u.x+(g.x+p.x)*.24,z:u.z+(g.z+p.z)*.24},A={x:S.x-m.x*.12,z:S.z-m.z*.12},_={x:S.x+y.x*.12,z:S.z+y.z*.12};for(let w=0;w<=8;w++){let T=w/8,C=1-T;c.push({x:C*C*A.x+2*C*T*S.x+T*T*_.x,z:C*C*A.z+2*C*T*S.z+T*T*_.z})}});let l=[0];return c.forEach((u,f)=>{let d=c[(f+1)%c.length];l.push(l[f]+Math.hypot(d.x-u.x,d.z-u.z))}),{points:c,lengths:l,length:l.at(-1)}}function Us(i,e){if(!i.length)return{x:0,z:0,angle:0};let t=Lr(e,i.length),n=0,s=i.points.length-1;for(;n<s;){let c=n+s+1>>1;i.lengths[c]<=t?n=c:s=c-1}let r=i.points[n],a=i.points[(n+1)%i.points.length],o=(t-i.lengths[n])/(i.lengths[n+1]-i.lengths[n]);return{x:r.x+(a.x-r.x)*o,z:r.z+(a.z-r.z)*o,angle:Math.atan2(a.x-r.x,a.z-r.z)}}var vc=class{constructor(e,t,n=32){this.people=[];this.blockers=[];this.track=tS(e),this.random=()=>(n=Math.imul(n,1664525)+1013904223>>>0,n/4294967296);let s=Math.min(t,Math.floor(this.track.length/2.5));for(let r=0;r<s;r++){let a=(r+.37)/s*this.track.length,o=Us(this.track,a);this.people.push({...o,active:!0,distance:a,speed:0,cruiseSpeed:.44+this.random()*.12,travelled:0,totalTravelled:0,pause:this.random(),untilPause:12+this.random()*16,phase:this.random()*6})}}update(e){if(!this.track.length)return;let t=this.people.filter(s=>s.active).sort((s,r)=>s.distance-r.distance),n=t.map(s=>s.distance);this.people.forEach(s=>{s.travelled=0}),t.forEach((s,r)=>{s.pause=Math.max(0,s.pause-e),s.untilPause-=e,s.untilPause<=0&&s.pause===0&&(s.pause=.6+this.random()*1.1,s.untilPause=14+this.random()*18);let a=Math.min(t.length>1?Lr(n[(r+1)%n.length]-n[r],this.track.length):1/0,...this.blockers.map(f=>Lr(f-n[r],this.track.length))),o=Math.max(0,a-.82),c=s.pause?0:Math.min(s.cruiseSpeed,o*1.5);s.speed+=Math.max(-e*1.2,Math.min(e*1.2,c-s.speed)),s.travelled=Math.min(o,s.speed*e),s.totalTravelled+=s.travelled,s.distance=Lr(s.distance+s.travelled,this.track.length);let l=Us(this.track,s.distance);s.x=l.x,s.z=l.z;let u=Math.atan2(Math.sin(l.angle-s.angle),Math.cos(l.angle-s.angle));s.angle+=Math.max(-e*4,Math.min(e*4,u*(1-Math.exp(-e*12))))})}canJoin(e,t=.72){return this.people.filter(n=>n.active).every(n=>Math.min(Lr(n.distance-e,this.track.length),Lr(e-n.distance,this.track.length))>=t)}join(e,t){let n=this.people[e];Object.assign(n,Us(this.track,t),{distance:t,active:!0,speed:0,pause:0,untilPause:20})}};function Wm(i,e){let t=new Ee,n=new Set(i.roads),s=new Set(i.buildings.filter(d=>d.placed).flatMap(d=>Zn(d).map(h=>je(h.x,h.z)))),r=new xt,a=["#b9b6a9","#aaa99d","#c6c1b1","#a9b2a9","#b6ae9e"],o=new bn(new Is(1,1,1,1,.09),Et("#ffffff"),i.roads.length*16),c=new bn(new In(.99,.035,.99),Et("#898e7f"),i.roads.length),l=[],u=0;for(let[d,h]of i.roads.entries()){let m=Fi(h);r.position.set(m.x+.5,.046,m.z+.5),r.scale.setScalar(1),r.rotation.set(0,0,0),r.updateMatrix(),c.setMatrixAt(d,r.matrix);for(let y=0;y<4;y++)for(let g=0;g<4;g++){let p=Math.abs(Math.imul(m.x*19+m.z*43+y*7+g*13,2654435761))>>>0;r.position.set(m.x+.125+g*.25+(p%5-2)*.004,.07+p%3*.002,m.z+.125+y*.25),r.scale.set(.226+p%4*.002,.055,.221+p%3*.003),r.rotation.y=(p%5-2)*.018,r.updateMatrix(),o.setMatrixAt(u,r.matrix);let S=new be(a[p%a.length]);e.connectedRoads.has(h)||S.multiplyScalar(.77),o.setColorAt(u++,S)}for(let[y,g]of[[1,0],[-1,0],[0,1],[0,-1]])if(!n.has(je(m.x+y,m.z+g))&&!s.has(je(m.x+y,m.z+g)))for(let p=0;p<4;p++)l.push({x:m.x+.5+y*.47+(g?(p-1.5)*.245:0),z:m.z+.5+g*.47+(y?(p-1.5)*.245:0),horizontal:g!==0})}let f=new bn(new Is(1,1,1,1,.08),Et("#cfcbba"),l.length);l.forEach((d,h)=>{r.position.set(d.x,.085,d.z),r.rotation.set(0,0,0),r.scale.set(d.horizontal?.235:.075,.09,d.horizontal?.075:.235),r.updateMatrix(),f.setMatrixAt(h,r.matrix)});for(let d of[c,o,f])d.receiveShadow=!0,t.add(d);return t.name="connected-stone-streets",t}var yc=class{constructor(){this.uniforms={spring:{value:0},autumn:{value:0},winter:{value:0}};this.installed=new WeakSet}install(e,t){e.traverse(n=>{if(n instanceof Be)for(let s of Array.isArray(n.material)?n.material:[n.material]){if(!(s instanceof on)||this.installed.has(s))continue;let r=s.userData.seasonRole||t;r&&(this.installed.add(s),s.onBeforeCompile=a=>{a.uniforms.townSpring=this.uniforms.spring,a.uniforms.townAutumn=this.uniforms.autumn,a.uniforms.townWinter=this.uniforms.winter,a.fragmentShader=`uniform float townSpring; uniform float townAutumn; uniform float townWinter;
`+a.fragmentShader;let c=r==="roof"?"diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.78,.85,.88),townWinter*.90);":`float leaf=${r==="grove"?"step(diffuseColor.r*1.12,diffuseColor.g)*step(diffuseColor.b*.95,diffuseColor.g)":"1.0"}; diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.46,.63,.32),townSpring*leaf*.25); diffuseColor.rgb=mix(diffuseColor.rgb,vec3(${r==="ground"?".48,.40,.20":".64,.28,.075"}),townAutumn*leaf*.75); diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.76,.83,.86),townWinter*leaf*.94);`;a.fragmentShader=a.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
`+c)},s.customProgramCacheKey=()=>`town-season-${r}`,s.needsUpdate=!0)}})}update(e,t){for(let n of["spring","autumn","winter"])this.uniforms[n].value+=(+(e===n)-this.uniforms[n].value)*(1-Math.exp(-t*1.8))}get snow(){return this.uniforms.winter.value}};function Fd(i){let e=xn(i),t=-i.rotation*Math.PI/2,n=i.kind==="hall",s=(r,a)=>({x:i.x+e.w/2+r*Math.cos(t)+a*Math.sin(t),z:i.z+e.d/2-r*Math.sin(t)+a*Math.cos(t)});return{id:i.id,outside:s(n?0:.18,n?1.78:1.32),inside:s(n?0:.18,n?.91:.65),yaw:t}}var Xm=(i,e)=>Math.hypot(i.x-e.x,i.z-e.z),qm=(i,e)=>(i%e+e)%e;function Ya(i,e){let t=1/0,n=0;return i.points.forEach((s,r)=>{let a=i.points[(r+1)%i.points.length],o=a.x-s.x,c=a.z-s.z,l=Math.hypot(o,c),u=Math.max(0,Math.min(1,((e.x-s.x)*o+(e.z-s.z)*c)/(l*l))),f=Math.hypot(s.x+o*u-e.x,s.z+c*u-e.z);f<t&&(t=f,n=i.lengths[r]+u*l)}),n}var bc=class{constructor(e,t,n=!1,s=new Map){this.traffic=e;this.doors=t.map(r=>({...r,exit:Ya(e.track,r.outside),open:0,busy:null})),this.residents=e.people.map((r,a)=>{let o=s.get(a),c=this.doors.length?a%this.doors.length:-1,l=n&&c>=0?"sleeping":o?"seated":"walking";return r.active=l==="walking",l==="sleeping"?Object.assign(r,this.doors[c].inside):o&&Object.assign(r,o.position,{angle:o.yaw}),{mode:l,visible:l!=="sleeping",home:c,seat:o,path:[],wait:0,travelled:0,seated:l==="seated"}})}update(e,t){this.traffic.blockers=[],this.residents.forEach((n,s)=>{let r=this.traffic.people[s];if(r.active||(n.joinArc!==void 0&&this.traffic.blockers.push(n.joinArc),!n.visible||n.seated))return;let a=Ya(this.traffic.track,r);Xm(r,Us(this.traffic.track,a))<.46&&this.traffic.blockers.push(a)}),this.traffic.update(e),this.doors.forEach(n=>{let s=n.busy!==null?1:0;n.open+=Math.max(-e*1.8,Math.min(e*1.8,s-n.open))}),this.residents.forEach((n,s)=>{let r=this.traffic.people[s],a=this.doors[n.home];if(n.travelled=r.travelled,n.wait=Math.max(0,n.wait-e),n.mode==="seated"&&t&&a&&(n.mode="standing",n.wait=.45),n.mode==="standing"&&n.wait===0){let o=Ya(this.traffic.track,n.seat.via);this.traffic.canJoin(o,1.5)&&(n.joinArc=o,n.seated=!1,n.mode="joining",n.path=[n.seat.via,Us(this.traffic.track,o)])}if(n.mode==="walking"&&t&&a&&(n.mode="going-home",r.pause=0,r.untilPause=999),n.mode==="walking"&&!t&&n.seat&&(n.mode="going-seat"),n.mode==="going-home"&&!t&&(n.mode="walking"),n.mode==="going-seat"&&t&&(n.mode="going-home"),n.mode==="going-home"&&a&&a.busy===null&&this.atExit(r.distance,a.exit,r.travelled)&&(a.busy=s,r.active=!1,r.speed=0,n.mode="approaching",n.path=[a.outside]),n.mode==="going-seat"&&n.seat&&this.atExit(r.distance,Ya(this.traffic.track,n.seat.via),r.travelled)&&(r.active=!1,n.mode="sitting",n.path=[n.seat.via,n.seat.position]),n.mode==="sleeping"&&!t&&a&&a.busy===null&&this.traffic.canJoin(a.exit,1.5)&&(a.busy=s,n.joinArc=a.exit,n.mode="opening-out",Object.assign(r,a.inside,{angle:a.yaw})),n.mode==="opening-out"&&a.open>=.99&&(n.visible=!0,n.mode="leaving",n.path=[a.outside]),n.path.length){let o=n.path[0],c=Xm(r,o),l=Math.min(c,e*.54);if(c>1e-4){let u=Math.atan2(o.x-r.x,o.z-r.z),f=Math.atan2(Math.sin(u-r.angle),Math.cos(u-r.angle));r.angle+=Math.max(-e*4,Math.min(e*4,f)),r.x+=(o.x-r.x)*l/c,r.z+=(o.z-r.z)*l/c,n.travelled=l,r.totalTravelled+=l}c<=l+1e-5&&n.path.shift()}if(!n.path.length)if(n.mode==="approaching"&&a.open>=.99)n.mode="entering",n.path=[a.inside];else if(n.mode==="entering")n.mode="sleeping",n.visible=!1,a.busy=null;else if(n.mode==="leaving")n.mode="joining",n.path=[Us(this.traffic.track,a.exit)];else if(n.mode==="joining"){let o=Ya(this.traffic.track,r);this.traffic.canJoin(o)&&(this.traffic.join(s,o),n.joinArc=void 0,a?.busy===s&&(a.busy=null),n.mode=t?"going-home":n.seat?"going-seat":"walking")}else n.mode==="sitting"&&(n.mode="seated",n.seated=!0,r.angle=n.seat.yaw)})}atExit(e,t,n){let s=this.traffic.track.length;return Math.min(qm(t-e,s),qm(e-t,s))<Math.max(.045,n*1.5)}};var Ka=new xt,Sc=class{constructor(e,t){this.canvas=e;this.events=t;this.scene=new cr;this.camera=new Hn(-16,16,12,-12,.1,250);this.sun=new Ki("#fff2d6",3.2);this.ambient=new vr("#dbe9eb","#958c63",1.9);this.world=new Ee;this.buildings=new Ee;this.roadGroup=new Ee;this.overlay=new Ee;this.forest=new Ee;this.walkers=[];this.particles=[];this.smoke=new Ee;this.extras=new Ee;this.landings=new Map;this.pulseUntil=0;this.modelCache=new Map;this.modelsLoading=new Set;this.buildingMeshes=new Map;this.sceneryModels=new Map;this.seasons=new yc;this.clockTick=0;this.clockSave=0;this.porchLights=[];this.signature="";this.roadsSignature="";this.terrainSignature="";this.selection=null;this.raycaster=new Ra;this.pointer=new re;this.plane=new rn(new L(0,1,0),0);this.painting=!1;this.cursor=new Ee;this.previewKind=null;this.previewRotation=0;this.tool="inspect";this.lastTime=0;this.lastFrame=0;this.orbitDirection=0;this.orbitSpeed=0;this.orbitStep=0;this.initialFocus=!0;this.reduced=!1;this.pitchStep=0;this.panStep=new re;this.zoomTarget=1;this.pointerInside=!1;this.thumbnails=new Map;this.running=!0;this.paused=!1;this.fps=0;this.frameCount=0;this.fpsTime=0;this.renderer=new lc({canvas:e,antialias:!0,alpha:!1,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=ws,this.renderer.outputColorSpace=Nt,this.renderer.toneMapping=Ia,this.renderer.toneMappingExposure=1.06,this.scene.background=new be("#d9e0ce"),this.scene.fog=new sa("#d9e0ce",80,160),this.sun.position.set(-18,28,14),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048),Object.assign(this.sun.shadow.camera,{left:-24,right:24,top:24,bottom:-24,near:1,far:90}),this.sun.shadow.normalBias=.032,this.sun.shadow.bias=-4e-4,this.scene.add(this.sun,this.ambient,this.world,this.buildings,this.roadGroup,this.overlay,this.forest,this.smoke,this.cursor,this.extras),this.camera.position.set(30,29,44),this.controls=new dc(this.camera,e),this.controls.target.set(9,0,17),this.controls.enableRotate=!1,this.controls.enableDamping=!0,this.controls.dampingFactor=.12,this.controls.enableZoom=!1,this.controls.minPolarAngle=Math.PI/2-Ld,this.controls.maxPolarAngle=Math.PI/2-Id,this.controls.minZoom=.52,this.controls.maxZoom=3.2,this.controls.screenSpacePanning=!1,this.controls.mouseButtons.LEFT=pn.PAN,this.controls.mouseButtons.RIGHT=pn.PAN,this.controls.update(),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(e),e.addEventListener("contextmenu",n=>{n.preventDefault(),this.tool!=="inspect"&&this.events.cancel()}),e.addEventListener("pointerdown",n=>this.down(n)),e.addEventListener("pointermove",n=>this.move(n)),e.addEventListener("pointerup",n=>this.up(n)),e.addEventListener("pointercancel",()=>this.endStroke()),e.addEventListener("wheel",n=>this.wheel(n),{passive:!1}),e.addEventListener("pointerleave",()=>{this.pointerInside=!1,this.painting||(this.cursor.visible=!1,this.events.hover(null))}),document.addEventListener("visibilitychange",()=>{this.paused=document.hidden,this.lastTime=performance.now(),this.paused&&this.stopGesture()}),window.addEventListener("blur",()=>this.stopGesture()),e.addEventListener("webglcontextlost",n=>{n.preventDefault(),this.running=!1,document.getElementById("graphics-error")?.classList.remove("hidden")}),e.addEventListener("webglcontextrestored",()=>{this.running=!0,requestAnimationFrame(n=>this.frame(n)),document.getElementById("graphics-error")?.classList.add("hidden")}),this.resize(),requestAnimationFrame(n=>this.frame(n)),Promise.allSettled(["tree-0","pine","birch","rock","boulder","cart","hedge","fountain","stall"].map(async n=>{let s=await new Xa().loadAsync(`./assets/town/curated/${n}.glb`);s.scene.traverse(r=>{r instanceof Be&&(r.castShadow=!0,r.receiveShadow=!0)}),this.sceneryModels.set(n,s.scene)})).then(()=>{this.board&&this.state&&this.buildTerrain()})}resize(){let e=this.canvas.getBoundingClientRect(),t=e.width/Math.max(1,e.height),n=t<1?16:13;this.camera.left=-n*t,this.camera.right=n*t,this.camera.top=n,this.camera.bottom=-n,this.camera.updateProjectionMatrix(),this.renderer.setSize(e.width,e.height,!1)}setTool(e,t,n,s=0){if(this.tool=e,this.previewKind=t,this.previewRotation=n,this.controls.mouseButtons.LEFT=e==="inspect"||e==="move"&&!t?pn.PAN:null,this.controls.mouseButtons.RIGHT=e==="inspect"?pn.PAN:null,this.controls.mouseButtons.MIDDLE=pn.PAN,this.canvas.style.cursor=e==="inspect"?"grab":"crosshair",this.grid&&(this.grid.visible=e!=="inspect"),this.ghost&&(this.ghost.traverse(r=>{r instanceof Be&&r.material.dispose()}),this.cursor.remove(this.ghost),this.ghost=void 0),t&&(this.ghost=this.model(t,0,s).clone(),this.ghost.traverse(r=>{r instanceof Be&&(r.material=r.material.clone(),Object.assign(r.material,{transparent:!0,opacity:.82,depthWrite:!0}),r.castShadow=!1)}),this.cursor.add(this.ghost),this.ghost.rotation.y=-n*Math.PI/2),this.cursorCell)this.showCursor(this.cursorCell),this.cursor.visible=t!==null;else if(t&&this.board){let r=this.controls.target;this.cursorCell={x:Math.max(0,Math.floor(r.x)),z:Math.max(0,Math.floor(r.z))},this.showCursor(this.cursorCell),this.cursor.visible=!0}}setPreviewValid(e){this.cursor.traverse(t=>{t instanceof Gn&&t.material.color.set(e?"#467b57":"#d86d55")}),this.ghost?.traverse(t=>{if(t instanceof Be){let n=t.material;n.emissive.set(e?"#16371e":"#ae3020"),n.emissiveIntensity=e?.1:.35}})}setWorld(e,t,n){this.state=e,this.board=t,this.evaluation=n,this.reduced=e.settings.reducedMotion||matchMedia("(prefers-reduced-motion: reduce)").matches;let s=`${t.size}:${t.terrain}:${e.chapterStars.map(o=>o>0).join()}`;s!==this.terrainSignature&&(this.terrainSignature=s,this.buildTerrain());let r=JSON.stringify(t.buildings)+e.chapterStars.join()+e.projects.map(o=>`${o.id}:${rs(as(o.tokens)).index}`).join();if(r!==this.signature){this.signature=r,this.buildings.clear(),this.buildingMeshes.clear(),this.porchLights=[];for(let o of t.buildings.filter(c=>c.placed)){let c=e.projects.find(d=>d.id===o.projectId),l=c?rs(as(c.tokens)).index:0,u=this.model(o.kind,o.variant%4,l).clone(),f=xn(o);if(u.position.set(o.x+f.w/2,.04,o.z+f.d/2),u.rotation.y=-o.rotation*Math.PI/2,u.userData.buildingId=o.id,u.traverse(d=>{d.userData.buildingId=o.id}),this.buildings.add(u),this.buildingMeshes.set(o.id,u),o.kind==="house"&&this.porchLights.length<3){let d=new Ms("#ffc47c",0,2.7,2);d.position.set(.52,.87,1.04),u.add(d),this.porchLights.push(d)}}this.seasons.install(this.buildings),this.buildExtras()}let a=e.mode+t.terrain+JSON.stringify(t.buildings.map(o=>[o.id,o.kind,o.x,o.z,o.rotation,o.placed]))+t.roads.join("|")+Array.from(n.connectedRoads).join("|");a!==this.roadsSignature&&(this.roadsSignature=a,this.buildRoads(),this.buildWalkers()),this.drawSelection(),this.renderer.setPixelRatio(e.settings.quality==="low"?1:Math.min(Math.max(devicePixelRatio,e.settings.quality==="high"?1.5:1.25),e.settings.quality==="high"?2.5:2)),this.renderer.shadowMap.enabled=e.settings.quality!=="low",this.initialFocus&&(this.initialFocus=!1,this.focus(t.terrain==="valley"?{x:6,z:17}:{x:6,z:6}))}model(e,t,n){let s=`${e}-${e==="workshop"?n:t}`;if(this.modelCache.has(s)||this.modelCache.set(s,fi(Bm(e,t,n))),!this.modelsLoading.has(s)){this.modelsLoading.add(s);let r=null;new Xa().load(`./assets/town/${r?"curated/"+r:"models/"+s}.glb`,a=>{a.scene.traverse(o=>{o instanceof Be&&(o.castShadow=!0,o.receiveShadow=!0)}),this.thumbnails.delete(`${e}-${t}-${n}`),this.modelCache.set(s,a.scene),this.signature="",this.state&&this.board&&this.evaluation&&this.setWorld(this.state,this.board,this.evaluation),this.previewKind===e&&this.setTool(this.tool,this.previewKind,this.previewRotation,n),this.events.assetsReady?.()},void 0,()=>{})}return this.modelCache.get(s)}thumbnail(e,t=0,n=0){let s=`${e}-${t}-${n}`,r=this.thumbnails.get(s);if(r)return r;let a=new cr;a.background=null,a.add(new vr("#fff5d9","#7b805e",3));let o=new Ki("#fff4df",3);o.position.set(-3,6,5),a.add(o);let c=this.model(e,t,n).clone();a.add(c);let l=e==="clock"?4.2:e==="workshop"&&n>0?3.6:2.4,u=Math.max(Pt[e].w,Pt[e].d,l)*.7,f=new Hn(-u,u,u,-u,.1,40);f.position.set(5,5,7),f.lookAt(0,l*.42,0);let d=384,h=new Jt(d,d);h.samples=4;let m=this.renderer.getRenderTarget();this.renderer.setRenderTarget(h),this.renderer.setClearColor("#ffffff",0),this.renderer.render(a,f);let y=new Uint8Array(d*d*4);this.renderer.readRenderTargetPixels(h,0,0,d,d,y),this.renderer.setRenderTarget(m),h.dispose();let g=document.createElement("canvas");g.width=d,g.height=d;let p=g.getContext("2d"),S=p.createImageData(d,d);for(let _=0;_<d;_++)S.data.set(y.subarray((d-1-_)*d*4,(d-_)*d*4),_*d*4);p.putImageData(S,0,0);let A=g.toDataURL();return this.thumbnails.set(s,A),A}buildTerrain(){let e=this.board,t=e.size;this.clearTransient(this.world),this.clearTransient(this.forest);let n=km(e,this.state,this.sceneryModels);this.world.add(n.world),this.forest.add(n.forest),this.animateLandscape=n.update,this.seasons.install(this.world),this.seasons.install(this.forest),this.snow&&(this.scene.remove(this.snow),this.snow.geometry.dispose(),this.snow.material.dispose());let s=[];for(let a=0;a<160;a++)s.push(a*7.319%t,a*1.771%8,a*11.931%t);this.snow=new ys(new ft().setAttribute("position",new et(s,3)),new Xi({color:"#e6edf1",size:.045,transparent:!0,opacity:0,depthWrite:!1})),this.scene.add(this.snow);let r=[];for(let a=0;a<=t;a++)r.push(0,.037,a,t,.037,a);for(let a=0;a<=t;a++)r.push(a,.037,0,a,.037,t);this.grid=new _s(new ft().setAttribute("position",new et(r,3)),new Si({color:"#536c51",transparent:!0,opacity:.16})),this.grid.visible=this.tool!=="inspect",this.world.add(this.grid)}buildRoads(){this.clearTransient(this.roadGroup),this.roadGroup.add(Wm(this.board,this.evaluation))}buildWalkers(){for(let a of this.walkers)this.scene.remove(a.group),this.clearTransient(a.group);this.walkers=[],this.traffic=void 0,this.life=void 0;let e=this.evaluation.connectedRoads;if(e.size<2)return;let t=[];for(let a of this.board.buildings.filter(o=>o.placed&&this.evaluation.buildings[o.id]?.connected))for(let o of Om(a.kind)){let c=this.buildingMeshes.get(a.id);c.updateMatrixWorld(!0);let l=c.localToWorld(new L(...o.position)),u=Ui(a);t.push({position:{x:l.x,z:l.z},via:{x:u.x+.5,z:u.z+.5},y:l.y,yaw:c.rotation.y+o.yaw})}let n=Math.min(12,Math.max(2,this.evaluation.houses*2)),s=this.board.buildings.filter(a=>a.placed&&a.kind==="house"&&this.evaluation.buildings[a.id]?.connected).map(Fd);s.length||s.push(Fd(this.board.buildings.find(a=>a.placed&&a.kind==="hall"))),this.traffic=new vc(e,n+Math.min(t.length,3));let r=new Map;t.slice(0,Math.min(t.length,3,this.traffic.people.length-2)).forEach((a,o)=>r.set(this.traffic.people.length-1-o,a)),this.life=new bc(this.traffic,s,zr(this.state.worldSeconds,this.state.settings).sleep,r);for(let[a,o]of this.traffic.people.entries()){let c=Pd(["#748b9c","#bb976a","#ba8174","#819373","#ac9ab4"][a%5],a),l=new Ee;l.add(c),l.position.set(o.x,.105,o.z),l.rotation.y=o.angle,this.scene.add(l);let u=["leg-left","leg-right","arm-left","arm-right"].map(d=>c.getObjectByName(d)),f;r.has(a)&&(f=fi(Pd("#a28273",a,!0)),l.add(f)),this.walkers.push({group:l,body:c,seated:f,phase:o.phase,limbs:u})}}select(e){this.selection=e,this.drawSelection()}drawSelection(){if(this.clearTransient(this.overlay),!this.board||!this.evaluation)return;let e=this.board.buildings.find(a=>a.id===this.selection&&a.placed);if(!e)return;let{w:t,d:n}=xn(e);this.outline(this.overlay,e.x,e.z,t,n,"#447457",.12);let s=Ui(e);this.outline(this.overlay,s.x,s.z,1,1,this.evaluation.buildings[e.id]?.connected?"#5e9070":"#bf805c",.13);let r=Pt[e.kind];if(r.service){let a=Ja(this.evaluation.connectedRoads,je(s.x,s.z)),o=Array.from(a).filter(([,u])=>u<=r.range).length,c=new bn(new Vn(.88,.88),new Qt({color:r.service==="food"?"#edce87":"#81bcb3",transparent:!0,opacity:.3,depthWrite:!1}),o),l=0;for(let[u,f]of a)if(f<=r.range){let d=Fi(u);Ka.position.set(d.x+.5,.092,d.z+.5),Ka.rotation.x=-Math.PI/2,Ka.updateMatrix(),c.setMatrixAt(l++,Ka.matrix)}Ka.rotation.set(0,0,0),this.overlay.add(c);for(let u of this.board.buildings.filter(f=>f.placed&&f.kind==="house")){let f=this.evaluation.buildings[u.id],d=xn(u);(f?.[r.service]===e.id||!f?.[r.service])&&this.outline(this.overlay,u.x,u.z,d.w,d.d,f?.[r.service]===e.id?"#6d9465":"#bc795c",.14)}}if(e.kind==="park"){for(let a of this.board.buildings.filter(o=>o.placed&&o.kind==="house"))if(Rc(a,e)<=3){let o=xn(a);this.outline(this.overlay,a.x,a.z,o.w,o.d,"#72a26c",.13)}}}outline(e,t,n,s,r,a,o=.08){let c=[new L(t+.05,o,n+.05),new L(t+s-.05,o,n+.05),new L(t+s-.05,o,n+r-.05),new L(t+.05,o,n+r-.05)];e.add(new vs(new ft().setFromPoints(c),new Si({color:a})))}point(e){let t=this.canvas.getBoundingClientRect();this.pointer.set((e.clientX-t.left)/t.width*2-1,-(e.clientY-t.top)/t.height*2+1),this.raycaster.setFromCamera(this.pointer,this.camera);let n=new L;if(!this.raycaster.ray.intersectPlane(this.plane,n))return null;let s=Math.floor(n.x),r=Math.floor(n.z);return this.board&&s>=0&&r>=0&&s<this.board.size&&r<this.board.size?{x:s,z:r}:null}previewAt(e,t){this.lastPointer={clientX:e,clientY:t};let n=this.canvas.getBoundingClientRect();this.pointerInside=e>=n.left&&e<=n.right&&t>=n.top&&t<=n.bottom;let s=this.point({clientX:e,clientY:t});this.cursor.visible=!!s,this.canvas.dataset.previewCell=s?`${s.x},${s.z}`:"",s&&((s.x!==this.cursorCell?.x||s.z!==this.cursorCell?.z)&&(this.cursorCell=s,this.showCursor(s)),this.events.hover(s))}placeAt(e,t){let n=this.point({clientX:e,clientY:t});n&&this.events.cell(n.x,n.z)}down(e){if(this.focusTarget=void 0,this.pointerDown={x:e.clientX,y:e.clientY,button:e.button},!(e.button!==0||e.shiftKey)&&(this.tool==="road"||this.tool==="erase")){this.painting=!0,this.canvas.setPointerCapture(e.pointerId);let t=this.point(e);t&&(this.events.cell(t.x,t.z),this.lastCell=t)}}move(e){this.lastPointer={clientX:e.clientX,clientY:e.clientY},this.pointerInside=!0;let t=this.point(e);if(this.cursor.visible=!!t&&this.tool!=="inspect"&&!(this.tool==="move"&&!this.previewKind),t&&(this.cursorCell=t,this.showCursor(t)),this.events.hover(t),this.painting&&t&&this.lastCell&&(t.x!==this.lastCell.x||t.z!==this.lastCell.z)){let n=this.lastCell.x,s=this.lastCell.z;for(;n!==t.x;)n+=Math.sign(t.x-n),this.events.cell(n,s);for(;s!==t.z;)s+=Math.sign(t.z-s),this.events.cell(n,s);this.lastCell=t}}up(e){if(this.painting){this.endStroke();return}let t=this.pointerDown;if(this.pointerDown=void 0,!(!t||t.button!==0||Math.hypot(e.clientX-t.x,e.clientY-t.y)>6))if(this.tool==="place"||this.tool==="move"&&this.previewKind){let n=this.point(e);n&&this.events.cell(n.x,n.z)}else{this.point(e);let n=this.raycaster.intersectObjects(this.buildings.children,!0).find(s=>s.object.userData.buildingId);this.events.select(n?.object.userData.buildingId||null)}}endStroke(){this.painting&&this.events.strokeEnd(),this.painting=!1,this.pointerDown=void 0,this.lastCell=void 0}showCursor(e){for(let n of this.cursor.children.filter(s=>s!==this.ghost))this.cursor.remove(n),n instanceof Gn&&(n.geometry.dispose(),n.material.dispose());let t=this.previewKind?xn({kind:this.previewKind,rotation:this.previewRotation}):{w:1,d:1};if(this.cursor.position.set(e.x,.03,e.z),this.outline(this.cursor,0,0,t.w,t.d,"#4e805e",.1),this.ghost&&this.previewKind){this.ghost.position.set(t.w/2,.03,t.d/2);let n=Ui(ot("preview",this.previewKind,0,0,this.previewRotation));this.outline(this.cursor,n.x,n.z,1,1,"#a4874f",.11)}}focus(e){let t=e||(this.board?.terrain==="valley"?{x:6,z:17}:{x:6,z:6});this.focusTarget=new L(t.x,0,t.z),this.zoomTarget=this.board?.terrain!=="valley"?1.15:1.45,this.pitchStep=Dd-this.elevation(),this.orbitStep=0,this.panStep.set(0,0)}overview(){this.board&&(this.focusTarget=new L(this.board.size/2,0,this.board.size/2),this.zoomTarget=this.camera.right/this.camera.top<1?.66:.92,this.pitchStep=Dd-this.elevation(),this.orbitStep=0,this.panStep.set(0,0))}rotate(e){this.orbitStep+=e*.16}holdRotate(e){this.orbitDirection=e,this.orbitStep=0,e||(this.orbitSpeed=0)}zoom(e){this.zoomTarget=zm(this.zoomTarget*e)}elevation(){let e=this.camera.position.clone().sub(this.controls.target);return Math.atan2(e.y,Math.hypot(e.x,e.z))}stopGesture(){this.orbitStep=0,this.pitchStep=0,this.panStep.set(0,0),this.zoomTarget=this.camera.zoom}wheel(e){if(e.preventDefault(),this.painting)return;this.lastPointer={clientX:e.clientX,clientY:e.clientY},this.pointerInside=!0,this.focusTarget=void 0;let t=Gm(e,this.state?.settings.cameraInput||"trackpad",this.canvas.clientHeight);t.kind==="zoom"?this.zoom(Math.exp(t.y)):t.kind==="pan"?this.panStep.add(new re(t.x,t.y)):(this.orbitStep=ts.clamp(this.orbitStep+t.x,-.6,.6),this.pitchStep=Nd(this.elevation()+this.pitchStep+t.y)-this.elevation())}environment(e,t){if(!this.state)return;let n=this.state;n.settings.clockMode==="cycle"&&(n.worldSeconds+=e);let s=zr(n.worldSeconds,n.settings),r=1-Math.exp(-e*2);this.sun.color.lerp(new be("#9fb9d2").lerp(new be("#fff2d6"),s.daylight).lerp(new be("#ffb879"),s.warmth*.65),r),this.sun.intensity+=(.62+s.daylight*2.88-this.sun.intensity)*r,this.ambient.intensity+=(.75+s.daylight*1.15-this.ambient.intensity)*r,this.ambient.color.lerp(new be("#91add3").lerp(new be("#dbe9eb"),s.daylight),r),this.ambient.groundColor.lerp(new be("#344358").lerp(new be("#958c63"),s.daylight),r),this.porchLights.forEach(o=>{o.intensity+=(2.4*(1-s.daylight)-o.intensity)*r}),document.getElementById("town-ui")?.classList.toggle("night",s.daylight<.35);let a=new be("#34465d").lerp(new be("#d9e0ce"),s.daylight).lerp(new be("#d8b49a"),s.warmth*.35);if(this.scene.background.lerp(a,r),this.scene.fog.color.copy(this.scene.background),this.seasons.update(s.season,e),this.snow){this.snow.visible=this.seasons.snow>.02&&!this.reduced;let o=this.snow.material;o.opacity=this.seasons.snow*.7;let c=this.snow.geometry.getAttribute("position");for(let l=0;l<c.count;l++)c.setY(l,(c.getY(l)-e*.35+8)%8);c.needsUpdate=!0}this.life?.update(e,s.sleep);for(let o of this.life?.doors||[]){let c=this.buildingMeshes.get(o.id)?.getObjectByName("door-hinge");c&&(c.rotation.y=-o.open*Math.PI*.46)}for(let[o,c]of this.walkers.entries()){let l=this.traffic.people[o],u=this.life.residents[o],f=Hm(u.travelled,c.phase,!this.reduced&&u.travelled>1e-4);c.phase=f.phase,c.group.visible=u.visible,c.body.visible=!u.seated,c.seated&&(c.seated.visible=u.seated);let d=.105+f.bob,h=this.life.doors[u.home];h&&["entering","leaving","opening-out"].includes(u.mode)&&(d+=.12*Math.min(1,Math.hypot(l.x-h.outside.x,l.z-h.outside.z)/.5)),c.group.position.set(l.x,u.seated?u.seat.y:d,l.z),c.group.rotation.y=l.angle,c.limbs.forEach((m,y)=>{let g=(y<2?f.leg:f.arm)*(y%2?-1:1);m.rotation.x+=(g-m.rotation.x)*(1-Math.exp(-e*16))})}if(t-this.clockTick>1e3){this.clockTick=t;let o=t-this.clockSave>2e4;o&&(this.clockSave=t),this.events.clock?.(n.worldSeconds,o);let c=document.getElementById("world-clock");c&&(c.textContent=s.label)}this.canvas.dataset.worldHour=s.hour.toFixed(2),this.canvas.dataset.season=s.season,this.canvas.dataset.residentActivities=JSON.stringify(this.life?.residents.map(o=>o.mode)||[]),this.canvas.dataset.doorAngles=JSON.stringify(this.life?.doors.map(o=>({id:o.id,open:+o.open.toFixed(2)}))||[])}celebrate(e,t){if(!this.board||this.reduced)return;let n=this.board.buildings.find(r=>r.kind==="hall"),s=t||{x:n.x+1.5,z:n.z+1.5};if(e==="coin"&&(this.pulseUntil=performance.now()+2200),e==="building"&&t)for(let r of this.board.buildings.filter(a=>a.placed&&a.x===Math.floor(t.x)&&a.z===Math.floor(t.z)))this.landings.set(r.id,performance.now());e==="chapter"&&this.zoom(.88);for(let r=0;r<(e==="chapter"?50:e==="coin"?24:14);r++){let a=e==="coin"?new $i(.09,.09,.04,8):new In(.065,.065,.065),o=new Be(a,Et(e==="coin"?"#e7be59":e==="chapter"?["#ddbc77","#8ca579","#b98973"][r%3]:"#c7bd9c"));o.position.set(s.x+(Math.random()-.5)*1.5,e==="coin"?3.5+Math.random()*2:.3,s.z+(Math.random()-.5)),o.castShadow=!0,this.scene.add(o),this.particles.push({mesh:o,velocity:new L((Math.random()-.5)*1.5,e==="coin"?-.8:1+Math.random()*3,(Math.random()-.5)*1.5),life:0,duration:1.7+Math.random()*.7})}this.sound(e==="coin"?740:520)}sound(e){if(!this.state?.settings.muted)try{this.sounds||=new AudioContext,this.sounds.resume();let t=this.sounds.createOscillator(),n=this.sounds.createGain();t.type="sine",t.frequency.setValueAtTime(e,this.sounds.currentTime),n.gain.setValueAtTime(.035,this.sounds.currentTime),n.gain.exponentialRampToValueAtTime(1e-4,this.sounds.currentTime+.25),t.connect(n).connect(this.sounds.destination),t.start(),t.stop(this.sounds.currentTime+.26)}catch{}}frame(e){if(!this.running||(requestAnimationFrame(l=>this.frame(l)),this.paused||e-this.lastFrame<1e3/(this.state?.settings.quality==="low"?30:60)-1))return;let t=Math.min(.06,(e-(this.lastTime||e))/1e3);this.lastTime=e,this.lastFrame=e,this.environment(t,e);let n=this.camera.position.clone(),s=this.controls.target.clone(),r=this.camera.zoom,a=xc(t,this.reduced);if(this.focusTarget){let l=this.focusTarget.clone().sub(this.controls.target).multiplyScalar(xc(t,this.reduced,10));this.controls.target.add(l),this.camera.position.add(l),this.focusTarget.distanceToSquared(this.controls.target)<25e-8&&(this.focusTarget=void 0)}this.orbitDirection&&(this.orbitSpeed=ts.lerp(this.orbitSpeed,this.orbitDirection*.85,1-Math.exp(-t*12)));let o=this.orbitSpeed*t;if(Math.abs(this.orbitStep)>1e-5){let l=this.orbitStep*a;this.orbitStep-=l,o+=l}else this.orbitStep=0;let c=Math.abs(this.pitchStep)>1e-5?this.pitchStep*a:this.pitchStep;if(this.pitchStep-=c,o||c){let l=this.camera.position.clone().sub(this.controls.target),u=Nd(this.elevation()+c),f=new Zi(l.length(),Math.PI/2-u,Math.atan2(l.x,l.z)+o);this.camera.position.copy(this.controls.target).add(l.setFromSpherical(f))}if(this.panStep.lengthSq()>1e-4){let l=this.panStep.clone().multiplyScalar(a);this.panStep.sub(l);let u=new L().setFromMatrixColumn(this.camera.matrix,0),f=new L().crossVectors(this.camera.up,u),d=u.multiplyScalar(-l.x*(this.camera.right-this.camera.left)/this.camera.zoom/this.canvas.clientWidth).addScaledVector(f,l.y*(this.camera.top-this.camera.bottom)/this.camera.zoom/this.canvas.clientHeight);this.controls.target.add(d),this.camera.position.add(d)}else this.panStep.set(0,0);if(Math.abs(Math.log(this.zoomTarget/this.camera.zoom))>1e-5?this.camera.zoom*=Math.exp(Math.log(this.zoomTarget/this.camera.zoom)*a):this.camera.zoom=this.zoomTarget,r!==this.camera.zoom&&this.camera.updateProjectionMatrix(),this.controls.dampingFactor=xc(t,this.reduced,12),this.controls.update(),this.camera.updateMatrixWorld(),this.previewKind&&this.pointerInside&&this.lastPointer&&(n.distanceToSquared(this.camera.position)>1e-8||s.distanceToSquared(this.controls.target)>1e-8||r!==this.camera.zoom)&&this.previewAt(this.lastPointer.clientX,this.lastPointer.clientY),!this.reduced){for(let l of this.board?.buildings||[]){let u=this.buildingMeshes.get(l.id);if(!u)continue;l.kind==="tree"&&(u.rotation.z=Math.sin(e*8e-4+l.x)*.012),l.kind==="workshop"&&u.scale.setScalar(e<this.pulseUntil?1+Math.sin((this.pulseUntil-e)*.012)*.025:1);let f=this.landings.get(l.id);if(f!==void 0){let d=Math.min(1,(e-f)/550);u.position.y=.04+.4*(1-d)**2,u.scale.y=1-.08*Math.sin(d*Math.PI),d===1&&(this.landings.delete(l.id),u.scale.y=1)}}this.animateLandscape?.(e);for(let l of this.particles)l.life+=t,l.velocity.y-=t*2.4,l.mesh.position.addScaledVector(l.velocity,t),l.mesh.rotation.x+=t*3,l.mesh.rotation.z+=t*2,l.mesh.scale.setScalar(Math.max(0,1-Math.max(0,l.life/l.duration-.6)*2.5));if(this.particles=this.particles.filter(l=>l.life<l.duration&&l.mesh.position.y>-.1?!0:(this.scene.remove(l.mesh),l.mesh.geometry.dispose(),!1)),Math.random()<t*2&&this.board){let l=this.board.buildings.find(u=>u.kind==="bakery"&&u.placed);if(l){let u=this.buildingMeshes.get(l.id).localToWorld(new L(-.52,2.16,-.44)),f=new Be(new ii(.06,0),new Qt({color:"#e7e7d6",transparent:!0,opacity:.45,depthWrite:!1}));f.position.copy(u),this.smoke.add(f),f.userData.life=0}}for(let l of[...this.smoke.children])l.userData.life+=t,l.position.y+=t*.26,l.position.x+=t*.12,l.scale.setScalar(1+l.userData.life*.6),l.material.opacity=Math.max(0,.45-l.userData.life*.14),l.userData.life>3.2&&(this.smoke.remove(l),l.geometry.dispose(),l.material.dispose())}if(this.renderer.render(this.scene,this.camera),this.canvas.dataset.cameraAngle=String(Math.round(Math.atan2(this.camera.position.x-this.controls.target.x,this.camera.position.z-this.controls.target.z)*1800/Math.PI)/10),this.canvas.dataset.cameraElevation=String(Math.round(this.elevation()*1800/Math.PI)/10),this.canvas.dataset.cameraZoom=this.camera.zoom.toFixed(4),this.canvas.dataset.cameraTarget=`${this.controls.target.x.toFixed(3)},${this.controls.target.z.toFixed(3)}`,this.fpsTime||(this.fpsTime=e),this.frameCount++,e-this.fpsTime>1500){this.fps=Math.round(this.frameCount*1e3/(e-this.fpsTime)),this.frameCount=0,this.fpsTime=e,this.canvas.dataset.fps=String(this.fps),this.canvas.dataset.triangles=String(this.renderer.info.render.triangles),this.canvas.dataset.pixelRatio=String(this.renderer.getPixelRatio()),this.canvas.dataset.drawCalls=String(this.renderer.info.render.calls);let l=1/0;for(let u=0;u<this.walkers.length;u++)for(let f=u+1;f<this.walkers.length;f++)this.walkers[u].group.visible&&this.walkers[f].group.visible&&(l=Math.min(l,Math.hypot(this.walkers[u].group.position.x-this.walkers[f].group.position.x,this.walkers[u].group.position.z-this.walkers[f].group.position.z)));this.canvas.dataset.npcCount=String(this.walkers.length),this.canvas.dataset.npcMinDistance=Number.isFinite(l)?l.toFixed(3):"none",this.canvas.dataset.npcSample=JSON.stringify(this.walkers.slice(0,3).map(u=>({x:+u.group.position.x.toFixed(3),z:+u.group.position.z.toFixed(3),leg:+u.limbs[0].rotation.x.toFixed(3),arm:+u.limbs[2].rotation.x.toFixed(3)}))),this.canvas.dataset.curatedScenery=String(this.sceneryModels.size),this.canvas.dataset.npcTravel=JSON.stringify(this.traffic?.people.map(u=>+u.totalTravelled.toFixed(2))||[])}}clearTransient(e){let t=new Set,n=new Set;e.traverse(s=>{if(s instanceof Be||s instanceof Gn){s.geometry!==gc&&t.add(s.geometry);for(let r of Array.isArray(s.material)?s.material:[s.material])Um(r)||n.add(r)}}),e.clear();for(let s of t)s.dispose();for(let s of n)s.dispose()}buildExtras(){if(this.clearTransient(this.extras),this.board.terrain!=="valley")return;let e=this.board.buildings.find(s=>s.kind==="hall"),t=this.buildingMeshes.get(e.id),n=new Ee;n.position.copy(t.position),n.rotation.copy(t.rotation),this.extras.add(n);for(let[s,r]of this.state.chapterStars.entries())if(r){let a=s<3?-1.04+s*.3:.44+(s-3)*.3;I(n,a,.15,1.31,.25,.3,.2,"#a99e83");for(let o=0;o<r;o++){let c=new ni;for(let u=0;u<10;u++){let f=Math.PI/2+u*Math.PI/5,d=u%2?.05:.105;u===0?c.moveTo(Math.cos(f)*d,Math.sin(f)*d):c.lineTo(Math.cos(f)*d,Math.sin(f)*d)}c.closePath();let l=new Be(new Mi(c,{depth:.03,bevelEnabled:!1}),Et("#d6b467",!0));l.position.set(a,.4+o*.19,1.31),n.add(l)}}}};var nS={Coins:Hc,RefreshCw:nu,House:so,Route:su,Move:eu,ClipboardList:Gc,Puzzle:tu,BookOpen:Bc,Settings:ru,X:pu,ArrowLeft:Uc,ArrowRight:Fc,RotateCw:iu,ZoomIn:mu,ZoomOut:gu,Focus:$c,Check:kc,Lock:Zc,Star:au,TreeDeciduous:cu,Coffee:Vc,Wheat:hu,ArrowUpRight:Oc,Volume2:fu,VolumeX:du,Sun:ou,Moon:Jc,Sunset:lu,Download:Wc,Upload:uu,Archive:Nc,MousePointer2:Qc,Eraser:Xc,Flag:qc,Hammer:Yc,ChevronRight:zc,Sparkles:ro,MapPin:jc,Info:Kc},Od=new Map;function Ct(i){return Od.has(i)||Od.set(i,Dc(nS[i],{width:20,height:20,"stroke-width":1.65,"aria-hidden":"true"}).outerHTML),Od.get(i)}var is=i=>String(i).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),Mc=i=>`<span class="stars" aria-label="${i} \u9897\u661F">${[0,1,2].map(e=>`<span class="${e<i?"earned":""}">${Ct("Star")}</span>`).join("")}</span>`,He=(i,e,t="",n="",s="")=>`<button type="button" data-action="${i}" class="${n}" ${n.includes("icon-only")?`aria-label="${is(e)}"`:""} ${s}>${t?Ct(t):""}<span>${e}</span></button>`,wc=class{constructor(e,t,n){this.root=e;this.store=t;this.panel=null;this.category="homes";this.selectedId=null;this.tool="inspect";this.pendingKind=null;this.rotation=0;this.hoverCell={x:6,z:17};this.busy=!1;this.toastTimer=0;this.coordinateOpen=!1;this.toastMessage="";this.toastUntil=0;this.progressPanel=0;this.notice="";this.modeChanged=!1;this.heldKeys=new Set;this.heldCameraButton=!1;this.ignoreCameraClickUntil=0;this.e=Bs(t.board),this.scene=new Sc(n,{select:a=>this.select(a),cell:(a,o)=>this.onCell(a,o),hover:a=>this.onHover(a),strokeEnd:()=>this.scene.sound(390),cancel:()=>{this.resetTool(),this.panel=null,this.render()},assetsReady:()=>this.render(),clock:(a,o)=>this.store.clock(a,o)}),t.subscribe(()=>{this.e=Bs(t.board),t.conflict&&(this.notice="\u5DF2\u8F7D\u5165\u53E6\u4E00\u4E2A\u7A97\u53E3\u4FDD\u5B58\u7684\u6700\u65B0\u8FDB\u5EA6\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u64CD\u4F5C",t.conflict=!1,this.resetTool()),this.render()}),e.addEventListener("click",a=>{let o=a.target.closest("[data-action]");o&&!o.disabled&&this.action(o.dataset.action,o)}),e.addEventListener("change",a=>this.change(a)),e.addEventListener("pointerdown",a=>{let o=a.target.closest("[data-action]");a.button===0&&/^camera-(left|right)$/.test(o?.dataset.action||"")&&(a.preventDefault(),this.heldCameraButton=!0,this.scene.holdRotate(o.dataset.action==="camera-left"?-1:1))});let s=()=>{this.heldCameraButton&&(this.heldCameraButton=!1,this.ignoreCameraClickUntil=Date.now()+400,this.scene.holdRotate(this.heldKeys.has("q")?-1:this.heldKeys.has("e")?1:0))};window.addEventListener("pointerup",s),window.addEventListener("pointercancel",s);let r=null;e.addEventListener("pointerdown",a=>{let o=a.target.closest("[data-action]");a.button===0&&o&&!o.disabled&&/^(buy|place-owned):/.test(o.dataset.action)&&(r={x:a.clientX,y:a.clientY,action:o.dataset.action,started:!1})}),window.addEventListener("pointermove",a=>{r&&(!r.started&&Math.hypot(a.clientX-r.x,a.clientY-r.y)>8&&(r.started=!0,this.action(r.action,document.createElement("button"))),r.started&&(a.preventDefault(),this.scene.previewAt(a.clientX,a.clientY)))}),window.addEventListener("pointerup",a=>{let o=r;r=null,o?.started&&(a.preventDefault(),this.scene.placeAt(a.clientX,a.clientY))}),window.addEventListener("pointercancel",()=>{r=null}),window.addEventListener("keydown",a=>this.keydown(a)),window.addEventListener("keyup",a=>{this.heldKeys.delete(a.key.toLowerCase()),this.heldCameraButton||this.scene.holdRotate(this.heldKeys.has("q")?-1:this.heldKeys.has("e")?1:0)}),window.addEventListener("blur",()=>{this.heldKeys.clear(),this.heldCameraButton=!1,this.scene.holdRotate(0)}),document.addEventListener("visibilitychange",()=>{document.hidden&&(this.heldKeys.clear(),this.heldCameraButton=!1,this.scene.holdRotate(0))}),window.addEventListener("pagehide",()=>this.store.commit(!1)),this.render()}thumbnail(e,t=0,n=0){return`<img class="model-preview" src="${this.scene.thumbnail(e,t,n)}" alt="${Pt[e].name}" draggable="false"/>`}resetTool(){this.tool="inspect",this.pendingKind=null,this.pendingId=void 0,this.rotation=0,this.coordinateOpen=!1,this.scene.setTool("inspect",null,0)}setTool(e,t=null,n){this.tool=e,this.pendingKind=t,this.pendingId=n;let s=n?this.store.board.buildings.find(a=>a.id===n):void 0;this.rotation=s?.rotation||0;let r=s?.projectId?this.store.state.projects.find(a=>a.id===s.projectId):void 0;this.scene.setTool(e,t,this.rotation,r?rs(Nr(r.tokens).level).index:0),(e==="road"||e==="erase")&&(this.panel=null),this.render()}select(e){if(!e){this.selectedId=null,this.scene.select(null),this.panel==="detail"&&(this.panel=null),this.render();return}if(this.selectedId=e,this.scene.select(e),this.tool==="move"){let t=this.store.board.buildings.find(n=>n.id===e);this.setTool("move",t.kind,e),this.panel=null}else this.resetTool(),this.panel="detail";this.render()}onHover(e){e&&(this.hoverCell=e);let t=document.getElementById("placement-status");if(!t||!e)return;let n=this.pendingKind?{id:this.pendingId||"preview",kind:this.pendingKind,x:e.x,z:e.z,rotation:this.rotation,placed:!0,variant:0}:null,s=n?Qa(this.store.state,this.store.board,n):null;t.textContent=s||`\u6A2A ${e.x+1} \xB7 \u7EB5 ${e.z+1}${n?" \xB7 \u70B9\u51FB\u653E\u7F6E":" \xB7 \u62D6\u52A8\u94FA\u8DEF"}`,t.classList.toggle("invalid",!!s),this.scene.setPreviewValid(!s)}onCell(e,t){if(this.tool==="road"||this.tool==="erase"){let n=this.store.road(e,t,this.tool==="erase");n?this.toast(n):e===6&&t===17&&this.store.board.terrain==="valley"&&this.e.food>=4&&this.toast("\u9053\u8DEF\u63A5\u901A\u4E86\uFF0C\u9762\u5305\u5DF2\u7ECF\u9001\u5230\u56DB\u6237\u90BB\u5C45\u5BB6")}else if(this.pendingKind){let n=this.pendingId,s=this.store.place(this.pendingKind,e,t,this.rotation,n);if(s){this.toast(s);return}if(this.scene.celebrate("building",{x:e+.5,z:t+.5}),n){let r=this.store.activePuzzle&&this.store.board.buildings.find(a=>a.kind===this.pendingKind&&!a.placed);this.resetTool(),this.panel=null,r&&this.setTool("move",r.kind,r.id)}this.selectedId=null,this.scene.select(null),this.render(),this.toast("\u843D\u6210\u4E86\u3002\u63A5\u4E0A\u95E8\u524D\u7684\u9053\u8DEF\uFF0C\u8BA9\u751F\u6D3B\u5F00\u59CB")}}toolbar(){return`<nav class="town-toolbar" aria-label="\u57CE\u9547\u5DE5\u5177">${He("inspect","\u6D4F\u89C8","MousePointer2",this.tool==="inspect"&&!this.panel?"active":"")}${He("build",this.store.activePuzzle?"\u5EFA\u7B51":"\u5EFA\u8BBE","House",this.panel==="build"||this.panel==="inventory"?"active":"")}${He("road","\u94FA\u8DEF","Route",this.tool==="road"?"active":"")}${He("move","\u642C\u8FC1","Move",this.tool==="move"?"active":"")}<i class="toolbar-divider"></i>${He("quests","\u59D4\u6258","ClipboardList",this.panel==="quests"?"active":"")}${He("puzzles","\u89C4\u5212\u5173","Puzzle",this.panel==="puzzles"?"active":"")}${He("book","\u56FE\u9274","BookOpen",this.panel==="book"?"active":"")}</nav>`}goalHTML(e){return`<ul class="goal-list">${e.map(t=>`<li class="${t.met?"met":""}"><span class="goal-check">${Ct(t.met?"Check":"Flag")}</span><span>${t.label}</span><small>${t.need>1?`${Math.min(t.current,t.need)}/${t.need}`:t.met?"\u5B8C\u6210":"\u5F85\u5B8C\u6210"}</small></li>`).join("")}</ul>`}currentGoal(){let e=this.store.puzzle;if(e)return`<aside class="goal-card puzzle-goal"><span class="small-label">${Ct("Puzzle")} \u514D\u8D39\u89C4\u5212\u5173</span><h2>${e.title}</h2>${this.goalHTML(Ic(e,this.e))}<div class="goal-meta"><span>\u9053\u8DEF <b>${this.e.roadCount}/${e.roadBudget}</b></span>${Mc(kr(e,this.e))}</div>${He("claim-puzzle","\u8BC4\u5B9A\u8FD9\u4E2A\u65B9\u6848","Check","primary small",kr(e,this.e)<=(this.store.state.puzzleStars[e.id]||0)?"disabled":"")}<p class="quiet-note">\u4F7F\u7528\u56FA\u5B9A\u5E93\u5B58\uFF0C\u4E0D\u6D88\u8017\u4E3B\u57CE\u91D1\u5E01</p></aside>`;let t=this.store.state.chapterStars.every(a=>a>0),n=di(this.store.state),s=Ni[n-1],r=eo(n,this.e);return`<aside class="goal-card"><div class="chapter-row"><span class="small-label">${Ct("Flag")} ${t?"\u81EA\u7531\u53D1\u5C55":`\u7B2C ${n} \u7AE0 / 6`}</span>${He("quests","\u67E5\u770B\u59D4\u6258","ArrowUpRight","icon-only")}</div><h2>${t?"\u8FD9\u5C31\u662F\u6211\u4EEC\u7684\u6CB3\u8C37":s.title}</h2>${t?"<p>\u7EE7\u7EED\u5EFA\u9020\u3001\u6311\u6218\u4E09\u661F\uFF0C\u7ED9\u6BCF\u4E2A\u9879\u76EE\u7559\u4E00\u4E2A\u597D\u4F4D\u7F6E\u3002</p>":this.goalHTML(r.base)}<div class="chapter-progress">${[1,2,3,4,5,6].map(a=>`<span class="${this.store.state.chapterStars[a-1]?"done":a===n?"current":""}"></span>`).join("")}</div>${!t&&Or(n,this.e)>this.store.state.chapterStars[n-1]?He("claim-current","\u5B8C\u6210\u59D4\u6258","Check","primary small"):`<p class="quiet-note">${this.e.population} \u4F4D\u90BB\u5C45 \xB7 ${this.e.food} \u680B\u4F4F\u5B85\u83B7\u5F97\u98DF\u7269</p>`}</aside>`}onboarding(){return this.store.state.tutorialDone||this.store.activePuzzle?"":`<aside class="welcome-card"><button class="welcome-close icon-only" data-action="dismiss-tutorial" aria-label="\u5173\u95ED\u5F15\u5BFC">${Ct("X")}</button><span class="small-label">\u7B2C\u4E00\u6B21\u6765\u5230\u6CB3\u8C37</span><h3>\u4E00\u6BB5\u5DE5\u4F5C\uFF0C\u4E00\u70B9\u5C0F\u9547\u7684\u53D8\u5316\u3002</h3><p>token \u6362\u6210\u91D1\u5E01\uFF0C\u91D1\u5E01\u4E70\u6765\u5EFA\u7B51\u3002\u63A5\u597D\u9053\u8DEF\u3001\u7167\u987E\u90BB\u5C45\uFF0C\u518D\u628A\u6CB3\u8C37\u6162\u6162\u53D8\u6210\u4F60\u7684\u6837\u5B50\u3002</p><div class="welcome-steps"><span>${Ct("RefreshCw")} \u540C\u6B65</span>${Ct("ChevronRight")}<span>${Ct("House")} \u5EFA\u8BBE</span>${Ct("ChevronRight")}<span>${Ct("Flag")} \u89E3\u9501</span></div><div class="welcome-actions">${He("connect-start",this.e.food>=4?"\u770B\u770B\u7B2C\u4E00\u4EFD\u59D4\u6258":"\u63A5\u901A\u95E8\u524D\u6700\u540E\u4E00\u683C\u8DEF","Route","primary small")}${this.store.state.mode==="live"?He("demo","\u5148\u73A9\u6F14\u793A","","text-button"):""}</div><small>\u53EF\u968F\u65F6\u79BB\u5F00\uFF0C\u8FDB\u5EA6\u4F1A\u81EA\u52A8\u4FDD\u5B58\u3002</small></aside>`}toolRibbon(){if(this.tool==="inspect")return"";let e={inspect:"\u6D4F\u89C8",road:"\u94FA\u8BBE\u9053\u8DEF",erase:"\u64E6\u9664\u9053\u8DEF",place:"\u653E\u7F6E\u5EFA\u7B51",move:"\u642C\u8FC1\u5EFA\u7B51"};return`<section class="tool-ribbon"><div><b>${this.pendingKind?`${this.pendingId?"\u6446\u653E":"\u5EFA\u8BBE"}${Pt[this.pendingKind].name}`:e[this.tool]}</b><span id="placement-status">${this.tool==="move"&&!this.pendingKind?"\u5148\u70B9\u51FB\u4F60\u60F3\u642C\u8FC1\u7684\u5EFA\u7B51":"\u79FB\u52A8\u9F20\u6807\u9884\u89C8 \xB7 \u5DE6\u952E\u843D\u5730 \xB7 \u53F3\u952E\u53D6\u6D88"}</span></div>${this.pendingKind?He("rotate-preview","\u65CB\u8F6C","RotateCw","ribbon-button"):this.tool==="road"||this.tool==="erase"?He("toggle-erase",this.tool==="erase"?"\u94FA\u8DEF":"\u64E6\u9664",this.tool==="erase"?"Route":"Eraser","ribbon-button"):""}${He("coordinates","\u7CBE\u786E\u5B9A\u4F4D","MapPin","ribbon-button")}${He("inspect","\u5B8C\u6210","Check","ribbon-button")} ${this.coordinateOpen?`<form id="placement-form"><label>\u6A2A\u683C<input name="x" aria-label="\u6A2A\u683C" type="number" min="1" max="${this.store.board.size}" value="${this.hoverCell.x+1}" /></label><label>\u7EB5\u683C<input name="z" aria-label="\u7EB5\u683C" type="number" min="1" max="${this.store.board.size}" value="${this.hoverCell.z+1}" /></label>${He("place-coordinates",this.pendingKind?"\u5728\u6B64\u653E\u7F6E":this.tool==="erase"?"\u64E6\u9664\u6B64\u683C":"\u94FA\u8BBE\u6B64\u683C","","primary small")}<small>\u5EFA\u7B51\u5DE6\u4E0A\u89D2\u7684\u683C\u5B50\uFF1BR \u65CB\u8F6C\uFF0CEsc \u7ED3\u675F</small></form>`:""}</section>`}header(){let e=this.store.state;return`<header class="town-header"><div class="brand">${Ct("House")}<div><h1>Token Town</h1><span>${this.store.activePuzzle?"\u6CB3\u8C37\u89C4\u5212\u684C":"\u4F60\u7684\u6CB3\u8C37\u5C0F\u9547"}</span></div></div><div class="header-actions">${this.store.activePuzzle?He("leave-puzzle","\u56DE\u5230\u5C0F\u9547","ArrowLeft","back-town"):""}<div class="coin-wallet" aria-label="\u91D1\u5E01\u4F59\u989D">${Ct("Coins")}<strong data-testid="coin-balance">${e.coins.toLocaleString("zh-CN")}</strong><span>\u91D1\u5E01</span></div>${He("sync",this.busy?"\u8BFB\u53D6\u4E2D":e.mode==="demo"?"\u6536\u96C6\u6F14\u793A token":"\u540C\u6B65 token","RefreshCw","sync-button",`aria-label="${this.busy?"\u8BFB\u53D6\u4E2D":e.mode==="demo"?"\u6536\u96C6\u6F14\u793A token":"\u540C\u6B65 token"}" ${this.busy?"disabled":""}`)}${He("settings","\u8BBE\u7F6E","Settings","icon-only settings-button")}</div></header><div class="mode-indicator">${e.mode==="demo"?'<span class="mode-dot demo-dot"></span>\u6F14\u793A\u57CE\u9547':'<span class="mode-dot"></span>\u672C\u5730\u57CE\u9547'}${He(e.mode==="demo"?"live":"demo",e.mode==="demo"?"\u5207\u6362\u771F\u5B9E\u8BB0\u5F55":"\u8BD5\u8BD5\u6F14\u793A","","text-button")}${e.history==="ready"?`<span class="last-sync">${e.projects.length} \u4E2A\u9879\u76EE\u4E3A\u8FD9\u91CC\u4F9B\u80FD</span>`:""}<span id="world-clock" class="world-clock">${zr(e.worldSeconds,e.settings).label}</span></div>`}cameraControls(){return`<div class="camera-controls" aria-label="\u955C\u5934\u63A7\u5236">${He("camera-left","\u5DE6\u8F6C\u955C\u5934","ArrowLeft","icon-only")}${He("camera-right","\u53F3\u8F6C\u955C\u5934","ArrowRight","icon-only")}<i></i>${He("zoom-in","\u653E\u5927","ZoomIn","icon-only")}${He("zoom-out","\u7F29\u5C0F","ZoomOut","icon-only")}${He("overview","\u4FEF\u77B0\u6CB3\u8C37","MapPin","icon-only")}${He("focus","\u56DE\u5230\u5C0F\u9547","Focus","icon-only")}</div><span class="camera-hint">${this.store.state.settings.cameraInput==="trackpad"?"\u4E24\u6307\u6ED1\u52A8\u8F6C\u52A8\u89C6\u89D2 \xB7 \u634F\u5408\u7F29\u653E \xB7 Shift + \u6ED1\u52A8\u5E73\u79FB":"\u62D6\u52A8\u6D4F\u89C8 \xB7 \u6EDA\u8F6E\u7F29\u653E \xB7 \u6309\u4F4F Q / E \u65CB\u8F6C"}</span>`}render(){let e=this.store.board;this.scene.setWorld(this.store.state,e,this.e),this.root.innerHTML=`${this.header()}${this.currentGoal()}${this.onboarding()}${this.toolbar()}${this.toolRibbon()}${this.cameraControls()}${this.panel?this.panelHTML():""}<div id="town-toast" class="${Date.now()<this.toastUntil?"visible":""}" role="status" aria-live="polite">${Date.now()<this.toastUntil?`${Ct("Sparkles")}<span>${is(this.toastMessage)}</span>`:""}</div>${this.store.persistenceError||this.notice?`<div class="save-notice" role="alert">${is(this.store.persistenceError||this.notice)}</div>`:""}`,this.scene.select(this.selectedId),this.onHover(this.hoverCell)}panelHTML(){let e={build:"\u5EFA\u4E00\u70B9\u65B0\u751F\u6D3B",inventory:"\u5DF2\u7ECF\u5C5E\u4E8E\u4F60\u7684",quests:"\u6CB3\u8C37\u59D4\u6258",puzzles:"\u6CB3\u8C37\u89C4\u5212\u684C",book:"\u5C0F\u9547\u56FE\u9274",settings:"\u5C0F\u9547\u8BBE\u7F6E",detail:"\u5EFA\u7B51\u8BE6\u60C5",history:"\u8BA9\u5DE5\u4F5C\u70B9\u4EAE\u6CB3\u8C37"},t="";return this.panel==="build"?t=this.buildPanel():this.panel==="inventory"?t=this.inventoryPanel():this.panel==="quests"?t=this.questPanel():this.panel==="puzzles"?t=this.puzzlePanel():this.panel==="book"?t=this.bookPanel():this.panel==="settings"?t=this.settingsPanel():this.panel==="detail"?t=this.detailPanel():t=`<div class="empty-records">${Ct("RefreshCw")}<h3>${this.notice?"\u8FD9\u6B21\u8FD8\u6CA1\u6709\u8BFB\u5230\u8BB0\u5F55":"\u8FD8\u6CA1\u627E\u5230\u672C\u5730 token \u5386\u53F2"}</h3><p>\u8D77\u6B65\u5EFA\u7B51\u548C\u89C4\u5212\u5173\u90FD\u80FD\u7EE7\u7EED\u73A9\u3002\u6709 Claude Code \u6216 Codex \u7684\u672C\u5730\u4F7F\u7528\u8BB0\u5F55\u65F6\uFF0C\u518D\u540C\u6B65\u5230\u8FD9\u5EA7\u57CE\u9547\u3002</p>${He("sync","\u91CD\u65B0\u8BFB\u53D6\u672C\u5730\u8BB0\u5F55","RefreshCw","primary")}${He("demo","\u8FDB\u5165\u72EC\u7ACB\u6F14\u793A\u57CE\u9547","Puzzle","secondary")}<small>\u6F14\u793A\u91D1\u5E01\u4E0E\u771F\u5B9E\u5B58\u6863\u5206\u5F00\u4FDD\u5B58\u3002</small></div>`,`<aside class="town-panel ${this.panel==="settings"?"settings-panel":""}" aria-label="${e[this.panel]}"><div class="panel-heading"><div><span class="small-label">${this.store.activePuzzle?"\u89C4\u5212\u5173":"\u6CB3\u8C37\u5C0F\u9547"}</span><h2>${e[this.panel]}</h2></div>${He("close-panel","\u5173\u95ED\u9762\u677F","X","icon-only")}</div><div class="panel-content">${t}</div></aside>`}buildPanel(){return`<div class="panel-tabs">${[["homes","\u4F4F\u5B85"],["services","\u670D\u52A1"],["landmarks","\u5730\u6807"],["decor","\u88C5\u9970"]].map(([e,t])=>He(`category:${e}`,t,"",this.category===e?"active":"")).join("")}</div><p class="panel-note">\u70B9\u51FB\u5EFA\u7B51\uFF0C\u6A21\u578B\u4F1A\u8DDF\u968F\u9F20\u6807\uFF1B\u4E5F\u53EF\u4EE5\u76F4\u63A5\u62D6\u5230\u7A7A\u5730\u3002\u5DE6\u952E\u653E\u7F6E\uFF0CR \u65CB\u8F6C\uFF0C\u53F3\u952E\u53D6\u6D88\u3002</p><div class="catalog-grid">${Object.values(Pt).filter(e=>e.category===this.category&&e.kind!=="hall"&&e.kind!=="workshop").map(e=>{let t=this.store.unlockedKind(e.kind),n=En.find(s=>s.reward===e.kind);return`<button data-action="buy:${e.kind}" class="catalog-item ${t?"":"locked"} ${this.pendingKind===e.kind&&!this.pendingId?"selected":""}" ${t?"":"disabled"}>${this.thumbnail(e.kind)}<b>${e.name}</b><span class="catalog-price">${Ct(t?"Coins":"Lock")}${t?e.cost:n?`\u89C4\u5212\u5173 ${En.indexOf(n)+1}`:`\u7B2C ${e.chapter} \u7AE0`}</span><small>${e.w} \xD7 ${e.d} \u683C${e.service?` \xB7 ${e.capacity} \u6237`:""}</small></button>`}).join("")}</div>${He("inventory",`\u5DF2\u6536\u7EB3 ${this.store.board.buildings.filter(e=>!e.placed).length} \u680B \xB7 \u514D\u8D39\u6446\u653E`,"Archive","inventory-link")}`}inventoryPanel(){let e=this.store.board,t=e.buildings.filter(s=>!s.placed),n=Array.from(new Set(t.map(s=>s.kind)));return`<p class="panel-note">${this.store.activePuzzle?"\u672C\u5173\u6240\u6709\u5EFA\u7B51\u5DF2\u7ECF\u51C6\u5907\u597D\u3002\u81EA\u7531\u6446\u653E\u3001\u642C\u8FC1\uFF1B\u94FA\u8DEF\u4E5F\u514D\u8D39\u3002":"\u6536\u7EB3\u53EA\u662F\u628A\u5EFA\u7B51\u6682\u65F6\u653E\u56DE\u4ED3\u5E93\u3002\u5DF2\u6709\u5EFA\u7B51\u53EF\u4EE5\u514D\u8D39\u518D\u6B21\u6446\u653E\u3002"}</p>${n.length?`<div class="inventory-list">${n.map(s=>{let r=t.filter(c=>c.kind===s),a=r[0],o=a.projectId?this.store.state.projects.find(c=>c.id===a.projectId):void 0;return`<button data-action="place-owned:${a.id}" class="inventory-row">${this.thumbnail(s,a.variant,o?rs(Nr(o.tokens).level).index:0)}<span><b>${o?is(o.name):Pt[s].name}</b><small>${r.length} \u680B\u53EF\u6446\u653E \xB7 \u514D\u8D39</small></span>${Ct("ArrowUpRight")}</button>`}).join("")}</div>`:`<div class="empty-state">${Ct("Archive")}<p>\u73B0\u5728\u6CA1\u6709\u6536\u7EB3\u7684\u5EFA\u7B51\u3002</p><small>\u70B9\u51FB\u57CE\u9547\u4E2D\u7684\u5EFA\u7B51\uFF0C\u5373\u53EF\u514D\u8D39\u642C\u8FC1\u6216\u6536\u7EB3\u3002</small></div>`}${this.store.activePuzzle?`<div class="puzzle-help"><h3>\u518D\u4E89\u53D6\u4E24\u9897\u661F</h3>${this.goalHTML(Lc(this.store.puzzle,this.e))}<h3>\u89C4\u5212\u63D0\u793A</h3><p>\u5EFA\u7B51\u95E8\u53E3\u7684\u9AD8\u4EAE\u683C\u8981\u63A5\u4E0A\u9053\u8DEF\u3002\u9547\u516C\u6240\u662F\u9053\u8DEF\u8D77\u70B9\uFF0C\u98DF\u7269\u4E0E\u4F11\u95F2\u670D\u52A1\u6CBF\u9053\u8DEF\u4F20\u9012\u3002</p>${He("puzzle-hint","\u7ED9\u6211\u4E00\u70B9\u63D0\u793A","Info","secondary")}${He("restart-puzzle","\u91CD\u65B0\u5E03\u7F6E\u8FD9\u4E00\u5173","RotateCw","text-button")}</div>`:He("build","\u770B\u770B\u65B0\u7684\u5EFA\u7B51","House","secondary")}`}questPanel(){let e=di(this.store.state),t=this.progressPanel||e,n=Ni[t-1],s=eo(t,this.e),r=Or(t,this.e),a=this.store.state.chapterStars[t-1];return this.store.activePuzzle?this.puzzlePanel():`<div class="chapter-selector">${Ni.map(o=>He(`chapter:${o.id}`,String(o.id),"",o.id===t?"active":"",o.id>e?"disabled":"")).join("")}</div><div class="chapter-title"><h3>${n.title}</h3>${Mc(a)}</div><p class="story">${n.story}</p><h4>\u8FD9\u4E00\u7AE0\u7684\u76EE\u6807</h4>${this.goalHTML(s.base)}<h4>\u518D\u597D\u4E00\u70B9</h4>${this.goalHTML(s.bonus)}<div class="reward-line">${Ct("Sparkles")}<span>${n.reward}<small>\u9996\u6B21\u5B8C\u6210\u8865\u8D34 ${n.subsidy} \u91D1\u5E01</small><small>\u989D\u5916\u661F\u7EA7\uFF1A\u89E3\u9501${Pt[Ur[t-1]].name}\u914D\u8272\uFF0C\u8363\u8A89\u82B1\u56ED\u4EAE\u8D77\u7EAA\u5FF5\u661F</small></span></div>${He(`claim-chapter:${t-1}`,r>a?"\u5B8C\u6210\u76EE\u6807\u5E76\u9886\u53D6\u5956\u52B1":a?"\u5DF2\u8BB0\u5F55\u8FD9\u4EFD\u6210\u679C":"\u5148\u8BA9\u76EE\u6807\u4EAE\u8D77\u6765","Check","primary",r<=a?"disabled":"")}<p class="panel-note">\u5DF2\u83B7\u5F97\u7684\u661F\u7EA7\u4E0D\u4F1A\u6D88\u5931\u3002\u91D1\u5E01\u8865\u8D34\u6700\u591A\u4E3A token \u91D1\u5E01\u7684 20%\uFF0C\u672A\u7ED3\u7B97\u90E8\u5206\u4F1A\u5728\u540E\u7EED\u540C\u6B65\u65F6\u8865\u53D1\u3002</p>`}puzzlePanel(){return`<p class="panel-note">\u4E09\u4E94\u5206\u949F\uFF0C\u4E00\u9053\u5C0F\u5C0F\u7684\u89C4\u5212\u9898\u3002\u56FA\u5B9A\u5E93\u5B58\uFF0C\u4E0D\u6D88\u8017\u91D1\u5E01\uFF0C\u4E5F\u4E0D\u7528\u7B49\u5F85 token\u3002</p><div class="puzzle-list">${En.map((e,t)=>`<button data-action="puzzle:${e.id}" class="puzzle-row"><span class="puzzle-number">${t+1}</span><span class="puzzle-copy"><small>${e.family}</small><b>${e.title}</b><span>${e.description}</span>${Mc(this.store.state.puzzleStars[e.id]||0)}</span>${Ct("ChevronRight")}</button>`).join("")}</div><div class="reward-explanation">${Ct("Sparkles")}<p>\u9996\u6B21\u901A\u5173\u89E3\u9501\u88C5\u9970\u84DD\u56FE\uFF0C\u4E09\u661F\u89E3\u9501\u65B0\u914D\u8272\u3002\u84DD\u56FE\u5E26\u56DE\u4E3B\u57CE\uFF0C\u7528\u91D1\u5E01\u5EFA\u9020\u3002</p></div>`}bookPanel(){let e=this.store.state;return`<section class="book-section"><h3>\u9879\u76EE\u5DE5\u574A <span>${e.projects.length}</span></h3><p class="panel-note">\u6BCF\u4E2A\u9879\u76EE\u90FD\u80FD\u6210\u4E3A\u4E00\u680B\u5EFA\u7B51\u3002\u5DE5\u574A\u968F token \u6210\u957F\uFF0C\u4E0D\u989D\u5916\u589E\u52A0\u94F8\u5E01\u500D\u7387\u3002</p>${e.projects.length?e.projects.map(t=>{let n=Nr(t.tokens),s=e.town.buildings.find(r=>r.projectId===t.id);return`<article class="project-row">${this.thumbnail("workshop",0,n.stage.index)}<div><b>${is(t.name)}</b><span class="project-level" style="color:${Yd[n.stage.index]}">Lv.${n.level} \xB7 ${Cc[n.stage.index]}</span><small>${Gr(t.tokens)} token \xB7 ${is(t.provider)}</small><div class="level-progress"><span style="width:${n.progress*100}%"></span></div>${He(s.placed?`find:${s.id}`:`place-owned:${s.id}`,s.placed?"\u53BB\u770B\u770B":"\u514D\u8D39\u6446\u653E","ArrowUpRight","text-button")}</div></article>`}).join(""):`<div class="empty-state">${Ct("House")}<p>\u540C\u6B65 token \u540E\uFF0C\u9879\u76EE\u5DE5\u574A\u4F1A\u6765\u5230\u8FD9\u91CC\u3002</p>${He("sync",e.mode==="demo"?"\u6536\u96C6\u6F14\u793A token":"\u540C\u6B65 token","RefreshCw","secondary")}</div>`}</section><section class="book-section"><h3>\u89C4\u5212\u6536\u85CF</h3><div class="collection-grid">${En.map(t=>`<div class="collection-item ${e.puzzleStars[t.id]?"":"locked"}">${this.thumbnail(t.reward)}<b>${Pt[t.reward].name}</b><small>${(e.puzzleStars[t.id]||0)>0?(e.puzzleStars[t.id]||0)===3?"\u539F\u8272\u4E0E\u4E09\u661F\u914D\u8272\u5DF2\u89E3\u9501":"\u84DD\u56FE\u5DF2\u89E3\u9501":`\u901A\u5173\u300C${t.title}\u300D`}</small></div>`).join("")}</div></section><section class="book-section"><h3>\u6CB3\u8C37\u8363\u8A89</h3><div class="honor-list">${Ni.map((t,n)=>`<div><span>${t.title}<small class="honor-reward">${Pt[Ur[n]].name} \xB7 ${e.chapterStars[n]>=2?e.chapterStars[n]===3?"\u5168\u90E8\u7EAA\u5FF5\u914D\u8272\u5DF2\u89E3\u9501":"\u9996\u6B3E\u7EAA\u5FF5\u914D\u8272\u5DF2\u89E3\u9501":"\u989D\u5916\u661F\u7EA7\u89E3\u9501\u914D\u8272"}</small></span>${Mc(e.chapterStars[n])}</div>`).join("")}</div></section>`}detailPanel(){let e=this.store.board.buildings.find(a=>a.id===this.selectedId);if(!e)return"<p>\u70B9\u51FB\u4E00\u680B\u5EFA\u7B51\uFF0C\u770B\u770B\u5B83\u7684\u751F\u6D3B\u3002</p>";let t=Pt[e.kind],n=this.e.buildings[e.id],s=this.store.state.projects.find(a=>a.id===e.projectId),r=s?Nr(s.tokens):null;return`<div class="detail-model">${this.thumbnail(e.kind,e.variant,r?.stage.index||0)}</div><h3 class="detail-name">${s?is(s.name):t.name}</h3><p class="story">${s?`${Cc[r.stage.index]} \xB7 Lv.${r.level} / 50`:t.description}</p>${n?`<div class="connection-status ${n.connected?"connected":""}">${Ct(n.connected?"Check":"Route")}${n.connected?"\u95E8\u524D\u9053\u8DEF\u5DF2\u63A5\u901A":"\u95E8\u53E3\u9700\u8981\u8FDE\u63A5\u5230\u9547\u516C\u6240\u7684\u9053\u8DEF"}</div>`:""}${e.kind==="house"&&n?`<h4>\u90BB\u5C45\u4EEC\u7684\u751F\u6D3B</h4><div class="needs-list">${[["food","Wheat","\u98DF\u7269",n.food?`${n.foodDistance} \u683C\u6B65\u884C`:"\u9644\u8FD1\u9700\u8981\u9762\u5305\u5E97\u6216\u96C6\u5E02"],["green","TreeDeciduous","\u7EFF\u5730",n.green?"\u516C\u56ED\u5C31\u5728\u9644\u8FD1":"\u4E09\u683C\u5185\u9700\u8981\u4E00\u5EA7\u516C\u56ED"],["leisure","Coffee","\u4F11\u95F2",n.leisure?`${n.leisureDistance} \u683C\u6B65\u884C`:"\u9644\u8FD1\u9700\u8981\u5496\u5561\u9986"]].filter(([a])=>a==="food"||a==="green"&&(this.store.activePuzzle||di(this.store.state)>=2)||a==="leisure"&&(this.store.puzzle?this.store.puzzle.leisureGoal>0:di(this.store.state)>=3)).map(([a,o,c,l])=>`<div class="${n[a]?"met":""}">${Ct(o)}<span><b>${c}</b><small>${l}</small></span>${Ct(n[a]?"Check":"Info")}</div>`).join("")}</div>`:""}${t.service?`<div class="service-summary"><span>\u5DF2\u670D\u52A1 <b>${this.e.serviceUsed[e.id]||0}/${t.capacity} \u6237</b></span><span>\u6700\u8FDC\u6B65\u884C <b>${t.range} \u683C</b></span></div><p class="panel-note">\u573A\u666F\u4E2D\u4EAE\u8D77\u7684\u9053\u8DEF\u5C31\u662F\u670D\u52A1\u8303\u56F4\u3002\u8DDD\u79BB\u6309\u771F\u5B9E\u9053\u8DEF\u8BA1\u7B97\u3002\u7EFF\u6846\u662F\u672C\u5E97\u670D\u52A1\u7684\u4F4F\u5B85\uFF0C\u6A59\u6846\u662F\u4ECD\u7F3A\u5C11\u8FD9\u9879\u670D\u52A1\u7684\u4F4F\u5B85\u3002</p>`:""}${s?`<div class="project-detail"><div><span>\u7D2F\u8BA1 token</span><b>${Gr(s.tokens)}</b></div><div class="level-progress"><span style="width:${r.progress*100}%"></span></div><p>${r.isMax?"\u8FD9\u680B\u5DE5\u574A\u5DF2\u7ECF\u6210\u4E3A\u6CB3\u8C37\u5730\u6807\u3002":`\u8DDD\u79BB Lv.${r.level+1} \u8FD8\u6709 ${Gr(r.toNext)} token`}</p></div>`:""}<div class="detail-actions">${He(`move-building:${e.id}`,"\u514D\u8D39\u642C\u8FC1","Move","secondary")}${e.kind!=="bridge"?He(`rotate-building:${e.id}`,"\u65CB\u8F6C","RotateCw","secondary"):""}${e.kind!=="hall"?He(`stash:${e.id}`,"\u6536\u7EB3","Archive","secondary"):""}${He(`recolor:${e.id}`,"\u6362\u4E2A\u914D\u8272","Sparkles","text-button")}</div>`}settingsPanel(){let e=this.store.state;return`<h3>\u6CB3\u8C37\u7684\u65F6\u5149</h3><label class="setting-row"><span>\u663C\u591C\u81EA\u52A8\u53D8\u5316</span><input type="checkbox" aria-label="\u663C\u591C\u81EA\u52A8\u53D8\u5316" data-setting="clock" ${e.settings.clockMode==="cycle"?"checked":""} /></label><p class="panel-note">\u516D\u5206\u949F\u8FC7\u4E00\u5929\uFF0C\u6BCF\u4E09\u5929\u6362\u4E00\u5B63\u3002\u665A\u4E0A\u90BB\u5C45\u4F1A\u56DE\u5BB6\u7761\u89C9\uFF0C\u6E05\u6668\u518D\u51FA\u95E8\u3002\u79BB\u5F00\u6E38\u620F\u65F6\uFF0C\u65F6\u95F4\u4F1A\u6682\u505C\u3002</p><div class="lighting-buttons">${[["day","Sun","\u767D\u663C"],["sunset","Sunset","\u508D\u665A"],["night","Moon","\u591C\u665A"]].map(([t,n,s])=>He(`lighting:${t}`,s,n,e.settings.clockMode==="fixed"&&e.settings.lighting===t?"active":"")).join("")}</div><div class="lighting-buttons">${He("visit-hour:20","\u770B\u90BB\u5C45\u56DE\u5BB6","Moon")}${He("visit-hour:6","\u8FCE\u63A5\u6E05\u6668","Sunrise")}</div><label class="setting-row"><span>\u5B63\u8282</span><select aria-label="\u5B63\u8282" data-setting="season">${[["cycle","\u968F\u65F6\u95F4\u53D8\u5316"],["spring","\u6625 \xB7 \u65B0\u82BD"],["summer","\u590F \xB7 \u6D53\u7EFF"],["autumn","\u79CB \xB7 \u91D1\u53F6"],["winter","\u51AC \xB7 \u843D\u96EA"]].map(([t,n])=>`<option value="${t}" ${e.settings.season===t?"selected":""}>${n}</option>`).join("")}</select></label><label class="setting-row"><span>\u73AF\u5883\u58F0\u97F3</span><input type="checkbox" data-setting="sound" ${e.settings.muted?"":"checked"} /></label><label class="setting-row"><span>\u51CF\u5C11\u52A8\u6001\u6548\u679C</span><input type="checkbox" data-setting="motion" ${e.settings.reducedMotion?"checked":""} /></label><label class="setting-row"><span>\u753B\u9762\u8D28\u91CF</span><select aria-label="\u753B\u9762\u8D28\u91CF" data-setting="quality"><option value="high" ${e.settings.quality==="high"?"selected":""}>\u7CBE\u7EC6 \xB7 Retina \u6E05\u6670\u753B\u9762</option><option value="medium" ${e.settings.quality==="medium"?"selected":""}>\u4E2D\u7B49 \xB7 \u67D4\u548C\u9634\u5F71</option><option value="low" ${e.settings.quality==="low"?"selected":""}>\u8F7B\u91CF \xB7 \u7701\u7535</option></select></label><h3>\u955C\u5934\u64CD\u4F5C</h3><label class="setting-row"><span>\u63A7\u5236\u65B9\u5F0F</span><select aria-label="\u955C\u5934\u63A7\u5236\u65B9\u5F0F" data-setting="camera"><option value="trackpad" ${e.settings.cameraInput==="trackpad"?"selected":""}>\u89E6\u63A7\u677F</option><option value="mouse" ${e.settings.cameraInput==="mouse"?"selected":""}>\u9F20\u6807</option></select></label><p class="panel-note">${e.settings.cameraInput==="trackpad"?"\u4E24\u6307\u4E0A\u4E0B\u6ED1\u6539\u53D8\u4FEF\u4EF0\uFF0C\u5DE6\u53F3\u6ED1\u65CB\u8F6C\uFF1B\u634F\u5408\u7F29\u653E\uFF0CShift + \u4E24\u6307\u6ED1\u52A8\u5E73\u79FB\u3002":"\u62D6\u52A8\u5E73\u79FB\uFF0C\u6EDA\u8F6E\u7F29\u653E\uFF1B\u6309\u4F4F Q / E \u6216\u955C\u5934\u7BAD\u5934\u8FDE\u7EED\u65CB\u8F6C\u3002"} \u70B9\u51FB\u300C\u56DE\u5230\u5C0F\u9547\u300D\u53EF\u6062\u590D\u8212\u9002\u89C6\u89D2\u3002</p><h3>\u4F60\u7684\u8BB0\u5F55</h3><p class="panel-note">${e.mode==="live"?"\u672C\u5730\u57CE\u9547":"\u6F14\u793A\u57CE\u9547"}\u3002\u8BFB\u53D6\u53EA\u5728\u8FD9\u53F0\u7535\u8111\u4E0A\u8FDB\u884C\uFF0C\u65E0\u9700\u8D26\u53F7\u3002</p>${He(e.mode==="live"?"demo":"live",e.mode==="live"?"\u8FDB\u5165\u72EC\u7ACB\u6F14\u793A\u57CE\u9547":"\u56DE\u5230\u771F\u5B9E\u8BB0\u5F55\u57CE\u9547","RefreshCw","secondary")}<div class="ledger-summary"><div><span>token \u94F8\u5E01</span><b>${e.tokenCoins}</b></div><div><span>\u7ECF\u8425\u8865\u8D34</span><b>${e.subsidyPaid} / ${Br(e)}</b></div><div><span>\u4E0B\u4E00\u679A\u91D1\u5E01</span><b>${e.residue.toLocaleString()} / 10,000</b></div></div><h3>\u5B58\u6863\u4E0E\u5907\u4EFD</h3><p class="panel-note">\u8FDB\u5EA6\u81EA\u52A8\u4FDD\u5B58\u5728\u5F53\u524D\u6D4F\u89C8\u5668\u3002\u6362\u6D4F\u89C8\u5668\u6216\u8BBE\u5907\u524D\uFF0C\u53EF\u4EE5\u5BFC\u51FA\u5907\u4EFD\u3002\u65E7\u8857\u673A\u7248\u5B58\u6863\u4FDD\u7559\u3002</p><div class="save-actions">${He("export","\u5BFC\u51FA\u5B58\u6863","Download","secondary")}${He("import","\u5BFC\u5165\u5B58\u6863","Upload","secondary")}<input id="save-file" type="file" accept="application/json,.json" hidden /></div><h3>\u600E\u4E48\u73A9</h3><p class="panel-note">\u70B9\u51FB\u5EFA\u7B51\u67E5\u770B\u9700\u6C42\uFF1B\u5EFA\u8BBE\u540E\u4E3A\u95E8\u53E3\u63A5\u8DEF\u3002\u94FA\u8DEF\u3001\u642C\u8FC1\u4E0E\u6536\u7EB3\u90FD\u514D\u8D39\u3002\u6309\u4F4F Q / E \u6216\u955C\u5934\u6309\u94AE\u6301\u7EED\u65CB\u8F6C\uFF0C\u677E\u5F00\u505C\u6B62\uFF0CR \u65CB\u8F6C\u5F85\u653E\u5EFA\u7B51\uFF0CEsc \u7ED3\u675F\u64CD\u4F5C\u3002</p>${He("show-tutorial","\u518D\u770B\u4E00\u6B21\u8D77\u6B65\u5F15\u5BFC","Info","text-button")}<a class="legacy-link" href="./arcade.html">\u6253\u5F00\u539F\u8857\u673A\u7248</a>`}async action(e,t){let[n,s]=e.split(":");switch(n){case"inspect":this.resetTool(),this.panel=null;break;case"build":this.panel=this.store.activePuzzle?"inventory":"build";break;case"inventory":this.panel="inventory";break;case"road":this.setTool("road");return;case"move":this.selectedId=null,this.panel=null,this.setTool("move");return;case"toggle-erase":this.setTool(this.tool==="erase"?"road":"erase");return;case"quests":this.panel="quests",this.progressPanel=di(this.store.state);break;case"puzzles":this.panel="puzzles";break;case"book":this.panel="book";break;case"settings":this.panel="settings";break;case"close-panel":this.panel=null;break;case"category":this.category=s;break;case"buy":this.selectedId=null,this.panel=null,this.setTool("place",s);return;case"place-owned":case"move-building":{let r=this.store.board.buildings.find(a=>a.id===s);if(!r){this.toast("\u8BF7\u5148\u56DE\u5230\u4E3B\u57CE\u6446\u653E\u9879\u76EE\u5DE5\u574A");return}this.selectedId=null,this.panel=null,this.setTool("move",r.kind,r.id);return}case"stash":this.store.stash(s),this.selectedId=null,this.panel="inventory",this.toast("\u5DF2\u653E\u56DE\u5E93\u5B58\uFF0C\u968F\u65F6\u53EF\u4EE5\u514D\u8D39\u6446\u56DE\u6765");break;case"rotate-building":{let r=this.store.rotate(s);r&&this.toast(r);break}case"recolor":this.store.recolor(s)||this.toast("\u7EAA\u5FF5\u914D\u8272\u9700\u8981\u5BF9\u5E94\u59D4\u6258\u7684\u989D\u5916\u661F\u7EA7\uFF0C\u89C4\u5212\u88C5\u9970\u9700\u8981\u5BF9\u5E94\u5173\u5361\u4E09\u661F");break;case"rotate-preview":this.pendingKind!=="bridge"&&(this.rotation=(this.rotation+1)%4,this.scene.setTool(this.tool,this.pendingKind,this.rotation));break;case"coordinates":this.coordinateOpen=!this.coordinateOpen;break;case"place-coordinates":{let r=document.getElementById("placement-form"),a=new FormData(r),o=Number(a.get("x"))-1,c=Number(a.get("z"))-1;if(!Number.isInteger(o)||!Number.isInteger(c)||o<0||c<0||o>=this.store.board.size||c>=this.store.board.size){this.toast("\u8BF7\u9009\u62E9\u5730\u56FE\u5185\u7684\u683C\u5B50");return}this.hoverCell={x:o,z:c},this.onCell(o,c);return}case"chapter":this.progressPanel=Number(s);break;case"claim-current":this.claimChapter(di(this.store.state)-1);return;case"claim-chapter":this.claimChapter(Number(s));return;case"puzzle":this.resetTool(),this.selectedId=null,this.hoverCell={x:1,z:1},this.store.enterPuzzle(s),this.panel="inventory",this.scene.focus({x:6,z:6});break;case"leave-puzzle":this.resetTool(),this.selectedId=null,this.store.leavePuzzle(),this.panel=null,this.scene.focus();break;case"restart-puzzle":this.resetTool(),this.selectedId=null,this.store.restartPuzzle(),this.panel="inventory";break;case"puzzle-hint":this.toast(this.store.puzzle?.solution.terrain==="river"?"\u6865\u4F4D\u5728\u6A2A\u7B2C 7 \u683C\u3002\u6CBF\u4E24\u5CB8\u94FA\u4E00\u6761\u8857\uFF0C\u628A\u9547\u516C\u6240\u95E8\u53E3\u63A5\u8FC7\u6765\u3002":"\u8BD5\u8BD5\u628A\u4F4F\u5B85\u95E8\u53E3\u671D\u5411\u540C\u4E00\u6761\u8857\uFF0C\u5546\u5E97\u9760\u8FD1\u8857\u9053\u4E2D\u95F4\u3002\u516C\u56ED\u4E5F\u8981\u63A5\u4E0A\u8DEF\u3002",6500);return;case"claim-puzzle":{let r=this.store.puzzle,a=this.store.claimPuzzle();if(!a||!r)return;this.scene.celebrate("chapter"),this.toast(a.first?`${a.stars} \u661F\u65B9\u6848\uFF01\u300C${Pt[r.reward].name}\u300D\u84DD\u56FE\u5DF2\u5E26\u56DE\u4E3B\u57CE`:`${a.stars} \u661F\u65B9\u6848\u5DF2\u8BB0\u5F55${a.stars===3?"\uFF0C\u65B0\u914D\u8272\u4E5F\u89E3\u9501\u4E86":""}`,5e3),this.render();return}case"find":{let r=this.store.board.buildings.find(a=>a.id===s);if(r){let a=xn(r);this.scene.focus({x:r.x+a.w/2,z:r.z+a.d/2}),this.select(s)}return}case"connect-start":this.e.food>=4?this.panel="quests":(this.store.road(6,17),this.scene.celebrate("building",{x:6.5,z:17.5}),this.toast("\u7B2C\u4E00\u6761\u8857\u63A5\u901A\u4E86\uFF01\u56DB\u6237\u90BB\u5C45\u90FD\u80FD\u4E70\u5230\u9762\u5305"));break;case"dismiss-tutorial":this.store.state.tutorialDone=!0,this.store.commit();return;case"show-tutorial":this.store.state.tutorialDone=!1,this.panel=null,this.store.commit();return;case"demo":case"live":this.resetTool(),this.panel=null,this.selectedId=null,this.modeChanged=!0,this.store.setMode(n),this.scene.focus(),this.toast(n==="demo"?"\u8FDB\u5165\u72EC\u7ACB\u6F14\u793A\u57CE\u9547\uFF0C\u70B9\u51FB\u6536\u96C6\u6F14\u793A token \u83B7\u5F97\u5EFA\u8BBE\u8D44\u91D1":"\u56DE\u5230\u4F60\u7684\u672C\u5730\u57CE\u9547");break;case"sync":await this.sync();return;case"camera-left":Date.now()>=this.ignoreCameraClickUntil&&this.scene.rotate(-1);return;case"camera-right":Date.now()>=this.ignoreCameraClickUntil&&this.scene.rotate(1);return;case"zoom-in":this.scene.zoom(1.2);return;case"zoom-out":this.scene.zoom(1/1.2);return;case"focus":this.scene.focus();return;case"overview":this.scene.overview();return;case"visit-hour":this.store.visitHour(Number(s));return;case"lighting":this.store.updateSettings({clockMode:"fixed",lighting:s});return;case"export":{let r=URL.createObjectURL(new Blob([JSON.stringify(this.store.state,null,2)],{type:"application/json"})),a=document.createElement("a");a.href=r,a.download=`token-town-${this.store.state.mode}.json`,a.click(),setTimeout(()=>URL.revokeObjectURL(r),1e3),this.toast("\u5F53\u524D\u57CE\u9547\u5B58\u6863\u5DF2\u5BFC\u51FA");return}case"import":document.getElementById("save-file")?.click();return}this.render()}claimChapter(e){let t=this.store.claimChapter(e);t&&(this.progressPanel=Math.min(6,e+2),this.scene.celebrate("chapter"),this.toast(`${Ni[e].title} \xB7 ${t.stars} \u661F\u6210\u679C\u5DF2\u8BB0\u5F55${t.subsidy?`\uFF0C\u8865\u8D34 +${t.subsidy} \u91D1\u5E01`:"\uFF0C\u7ECF\u8425\u8865\u8D34\u5C06\u5728 token \u989D\u5EA6\u8DB3\u591F\u65F6\u5230\u8D26"}`,5e3),this.render())}async sync(){if(this.busy)return;this.busy=!0,this.modeChanged=!1;let e=this.store.state.mode;this.render();try{let t=e==="demo"?null:await lh();if(this.modeChanged||this.store.state.mode!==e)return;if(t&&(t.error||t.source==="error")){this.notice="\u8BFB\u53D6\u672C\u5730\u8BB0\u5F55\u5931\u8D25\uFF0C\u8BF7\u786E\u8BA4\u672C\u5730\u670D\u52A1\u6B63\u5728\u8FD0\u884C\u540E\u91CD\u8BD5",this.panel="history";return}if(t&&t.projects.length===0){this.store.state.history="empty",this.store.commit(),this.panel="history",this.notice="";return}let n=e==="demo"?this.store.syncDemo():this.store.sync(t.projects);this.notice="",(n.coins||n.subsidy)&&this.scene.celebrate("coin"),this.toast(n.newTokens?`\u53D1\u73B0 ${Gr(n.newTokens)} \u65B0 token \xB7 +${n.coins} \u91D1\u5E01${n.subsidy?` \xB7 \u8865\u8D34 +${n.subsidy}`:""}${n.newProjects?` \xB7 ${n.newProjects} \u680B\u9879\u76EE\u5DE5\u574A\u5DF2\u5165\u5E93`:""}`:"\u8BB0\u5F55\u5DF2\u7ECF\u540C\u6B65\u8FC7\u4E86\uFF0C\u6CA1\u6709\u91CD\u590D\u53D1\u653E\u91D1\u5E01",5500)}finally{this.busy=!1,this.render()}}change(e){let t=e.target;t.dataset.setting==="clock"&&this.store.updateSettings({clockMode:t.checked?"cycle":"fixed"}),t.dataset.setting==="season"&&this.store.updateSettings({season:t.value}),t.dataset.setting==="sound"&&this.store.updateSettings({muted:!t.checked}),t.dataset.setting==="motion"&&this.store.updateSettings({reducedMotion:t.checked}),t.dataset.setting==="camera"&&this.store.updateSettings({cameraInput:t.value}),t.dataset.setting==="quality"&&this.store.updateSettings({quality:t.value}),t.id==="save-file"&&t.files?.[0]&&t.files[0].text().then(n=>{this.resetTool(),this.selectedId=null,this.store.importSave(n)?this.toast("\u5B58\u6863\u5DF2\u5BFC\u5165"):this.toast("\u6587\u4EF6\u4E0D\u662F\u5F53\u524D\u6A21\u5F0F\u7684\u6709\u6548\u6CB3\u8C37\u5C0F\u9547\u5B58\u6863\uFF0C\u539F\u8FDB\u5EA6\u5DF2\u4FDD\u7559")})}keydown(e){if(e.target.matches("input, select, textarea"))return;e.key==="Escape"&&(this.resetTool(),this.panel=null,this.render());let t=e.key.toLowerCase();(t==="q"||t==="e")&&(e.preventDefault(),this.heldKeys.add(t),this.scene.holdRotate(this.heldKeys.has("q")?-1:1)),e.key.toLowerCase()==="r"&&this.pendingKind&&this.action("rotate-preview",document.createElement("button"))}toast(e,t=3800){this.toastMessage=e,this.toastUntil=Date.now()+t,clearTimeout(this.toastTimer);let n=document.getElementById("town-toast");n&&(n.innerHTML=`${Ct("Sparkles")}<span>${is(e)}</span>`,n.classList.add("visible"),this.toastTimer=window.setTimeout(()=>document.getElementById("town-toast")?.classList.remove("visible"),t))}};var $m=document.getElementById("town-scene"),Ym=document.getElementById("town-ui");if(!($m instanceof HTMLCanvasElement)||!Ym)throw new Error("Token Town: missing town surface");var iS=new URLSearchParams(location.search).get("demo")==="1"||location.hostname.endsWith("github.io");try{let i=new io(iS?"demo":void 0);new wc(Ym,i,$m),document.getElementById("town-loading")?.remove()}catch(i){let e=document.getElementById("town-loading");e&&(e.innerHTML='<h1>\u6CB3\u8C37\u8FD8\u6CA1\u51C6\u5907\u597D</h1><p>\u8BF7\u4F7F\u7528\u652F\u6301 WebGL 2 \u7684\u6D4F\u89C8\u5668\uFF0C\u5E76\u5F00\u542F\u786C\u4EF6\u52A0\u901F\u3002</p><button onclick="location.reload()">\u91CD\u65B0\u6253\u5F00</button>'),console.error(i)}})();
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
