"use strict";(()=>{var zi=[[1,0],[2,8e3],[5,1e5],[10,1e6],[20,1e7],[35,5e7],[50,5e8]];function Mg(){let i=[];for(let e=1;e<=50;e++){let t=zi[0],n=zi[zi.length-1];for(let u=0;u<zi.length-1;u++)if(e>=zi[u][0]&&e<=zi[u+1][0]){t=zi[u],n=zi[u+1];break}let[s,r]=t,[a,o]=n,c=(e-s)/(a-s),l=r<=0?Math.round(o*c):Math.round(r*Math.pow(o/r,c));i.push(l)}return i[0]=0,i}var kr=Mg(),Gc=[{index:0,key:"starter",name:"STARTER",loLevel:1,hiLevel:4},{index:1,key:"powered",name:"POWERED",loLevel:5,hiLevel:9},{index:2,key:"deluxe",name:"DELUXE",loLevel:10,hiLevel:19},{index:3,key:"neon",name:"NEON",loLevel:20,hiLevel:34},{index:4,key:"legendary",name:"LEGENDARY",loLevel:35,hiLevel:50}];function us(i){let e=Math.max(1,Math.min(50,i));for(let t of Gc)if(e>=t.loLevel&&e<=t.hiLevel)return t;return Gc[Gc.length-1]}function ds(i){let e=1;for(let t=0;t<kr.length;t++)i>=kr[t]&&(e=t+1);return e}function wg(i){return 1+(Math.max(1,Math.min(50,i))-1)/49*.5}function zr(i){let e=ds(i),t=kr[e-1],n=e<kr.length?kr[e]:null,s=us(e),r=wg(e);if(n==null)return{level:e,stage:s,base:t,next:null,progress:1,toNext:0,isMax:!0,multiplier:r};let a=Math.max(0,Math.min(1,(i-t)/(n-t)));return{level:e,stage:s,base:t,next:n,progress:a,toNext:Math.max(0,n-i),isMax:!1,multiplier:r}}var it={wheatfield:{kind:"wheatfield",name:"\u6CB3\u5CB8\u9EA6\u7530",description:"\u6751\u6C11\u64AD\u79CD\u3001\u6536\u5272\uFF0C\u518D\u6CBF\u9053\u8DEF\u628A\u9EA6\u5B50\u9001\u5230\u98CE\u8F66\u78E8\u574A\u3002\u9700\u8981\u4F4F\u5B85\u3001\u78E8\u574A\u548C\u9762\u5305\u5E97\u8FDE\u8DEF\uFF0C\u6700\u591A\u4E09\u4F4D\u6751\u6C11\u52A1\u519C\u3002",cost:6,w:3,d:2,category:"production",chapter:1},mill:{kind:"mill",name:"\u98CE\u8F66\u78E8\u574A",description:"\u63A5\u6536\u9EA6\u7530\u9001\u6765\u7684\u5C0F\u9EA6\uFF0C\u78E8\u6210\u9762\u7C89\uFF0C\u518D\u9001\u5F80\u9762\u5305\u5E97\u3002\u8FDE\u63A5\u4E09\u5904\u5165\u53E3\uFF0C\u7CAE\u98DF\u5C31\u4F1A\u6CBF\u8857\u6D41\u52A8\u3002",cost:32,w:3,d:3,category:"production",chapter:1},hall:{kind:"hall",name:"\u9547\u516C\u6240",description:"\u5C0F\u9547\u7684\u5FC3\u810F\u3002\u6240\u6709\u9053\u8DEF\u4ECE\u8FD9\u91CC\u8FDE\u63A5\u8D77\u6765\u3002",cost:0,w:3,d:3,category:"landmarks",chapter:1},house:{kind:"house",name:"\u6CB3\u8C37\u6728\u5C4B",description:"\u4F4F\u8FDB\u5341\u4F4D\u90BB\u5C45\u3002\u4E3A\u4ED6\u4EEC\u5B89\u6392\u597D\u9053\u8DEF\u3001\u98DF\u7269\u548C\u7EFF\u5730\u3002",cost:8,w:2,d:2,category:"homes",chapter:1},bakery:{kind:"bakery",name:"\u6668\u5149\u9762\u5305\u5E97",description:"\u516B\u683C\u6B65\u884C\u8DDD\u79BB\u5185\uFF0C\u4E3A\u516D\u680B\u4F4F\u5B85\u4F9B\u5E94\u65B0\u9C9C\u9762\u5305\u3002",cost:20,w:2,d:2,category:"services",chapter:1,service:"food",capacity:6,range:8},cafe:{kind:"cafe",name:"\u8F6C\u89D2\u5496\u5561\u9986",description:"\u5341\u683C\u6B65\u884C\u8DDD\u79BB\u5185\uFF0C\u4E3A\u56DB\u680B\u4F4F\u5B85\u63D0\u4F9B\u4F11\u95F2\u670D\u52A1\u3002",cost:30,w:2,d:2,category:"services",chapter:3,service:"leisure",capacity:4,range:10},market:{kind:"market",name:"\u6CB3\u8C37\u96C6\u5E02",description:"\u5341\u4E8C\u683C\u6B65\u884C\u8DDD\u79BB\u5185\uFF0C\u4E3A\u5341\u4E8C\u680B\u4F4F\u5B85\u63D0\u4F9B\u98DF\u7269\u670D\u52A1\u3002",cost:50,w:3,d:3,category:"services",chapter:4,service:"food",capacity:12,range:12},park:{kind:"park",name:"\u7EFF\u836B\u5C0F\u516C\u56ED",description:"\u4E09\u683C\u8303\u56F4\u5185\u7684\u4F4F\u5B85\u90FD\u80FD\u4EAB\u53D7\u7EFF\u5730\u3002\u516C\u56ED\u4E5F\u9700\u8981\u63A5\u901A\u9053\u8DEF\u3002",cost:12,w:2,d:2,category:"services",chapter:1},bridge:{kind:"bridge",name:"\u6CB3\u8C37\u77F3\u6865",description:"\u653E\u5728\u6CB3\u9053\u6807\u8BB0\u7684\u4F4D\u7F6E\uFF0C\u8FDE\u901A\u4E24\u5CB8\u7684\u9053\u8DEF\u3002",cost:40,w:1,d:2,category:"landmarks",chapter:4},clock:{kind:"clock",name:"\u6CB3\u8C37\u949F\u697C",description:"\u4E3A\u7E41\u8363\u7684\u5C0F\u9547\u7559\u4E0B\u4E00\u5EA7\u5171\u540C\u7684\u5730\u6807\u3002",cost:100,w:3,d:3,category:"landmarks",chapter:6},workshop:{kind:"workshop",name:"\u9879\u76EE\u5DE5\u574A",description:"\u5C5E\u4E8E\u4F60\u7684 AI \u9879\u76EE\uFF0C\u968F token \u7528\u91CF\u6210\u957F\u3002",cost:0,w:2,d:2,category:"landmarks",chapter:1},tree:{kind:"tree",name:"\u6986\u6811",description:"\u4E3A\u8857\u89D2\u6DFB\u4E00\u7247\u67D4\u8F6F\u7684\u7EFF\u836B\u3002\u7EAF\u88C5\u9970\u3002",cost:2,w:1,d:1,category:"decor",chapter:2},bench:{kind:"bench",name:"\u6728\u5236\u957F\u6905",description:"\u8BA9\u90BB\u5C45\u4EEC\u505C\u4E0B\u6765\u5750\u4E00\u4F1A\u513F\u3002\u7EAF\u88C5\u9970\u3002",cost:2,w:1,d:1,category:"decor",chapter:2},lamp:{kind:"lamp",name:"\u6696\u5149\u8DEF\u706F",description:"\u508D\u665A\u7684\u8857\u9053\u4E5F\u6709\u6E29\u6696\u7684\u5149\u3002\u7EAF\u88C5\u9970\u3002",cost:3,w:1,d:1,category:"decor",chapter:2},fountain:{kind:"fountain",name:"\u77F3\u780C\u5C0F\u55B7\u6CC9",description:"\u628A\u4E00\u5904\u7A7A\u5730\u5E03\u7F6E\u6210\u8857\u574A\u76F8\u805A\u7684\u5C0F\u5E7F\u573A\u3002\u7EAF\u88C5\u9970\u3002",cost:14,w:2,d:2,category:"decor",chapter:2},cart:{kind:"cart",name:"\u6728\u5236\u624B\u63A8\u8F66",description:"\u4E3A\u5E97\u94FA\u548C\u5EAD\u9662\u6DFB\u4E00\u70B9\u751F\u6D3B\u6C14\u606F\u3002\u7EAF\u88C5\u9970\u3002",cost:5,w:1,d:1,category:"decor",chapter:2},hedge:{kind:"hedge",name:"\u4FEE\u526A\u7EFF\u7BF1",description:"\u4E3A\u8857\u8FB9\u548C\u82B1\u56ED\u52FE\u52D2\u67D4\u8F6F\u7684\u8FB9\u754C\u3002\u7EAF\u88C5\u9970\u3002",cost:3,w:1,d:1,category:"decor",chapter:2},barrel:{kind:"barrel",name:"\u6A61\u6728\u6876",description:"\u6446\u5728\u5DE5\u574A\u8FB9\u7684\u6728\u6876\u4E0E\u67F4\u706B\u3002\u7EAF\u88C5\u9970\u3002",cost:2,w:1,d:1,category:"decor",chapter:2},planter:{kind:"planter",name:"\u9676\u76C6\u82B1\u7C07",description:"\u5728\u77F3\u677F\u8DEF\u65C1\u79CD\u4E0B\u660E\u4EAE\u7684\u5C0F\u82B1\u3002\u7EAF\u88C5\u9970\u3002",cost:4,w:1,d:1,category:"decor",chapter:2},gazebo:{kind:"gazebo",name:"\u6CB3\u5CB8\u51C9\u4EAD",description:"\u4E00\u5904\u6709\u6728\u67F1\u3001\u957F\u6905\u548C\u5761\u5C4B\u9876\u7684\u4F11\u61A9\u89D2\u843D\u3002\u7EAF\u88C5\u9970\u3002",cost:18,w:2,d:2,category:"decor",chapter:2},grocer:{kind:"grocer",name:"\u679C\u852C\u5C0F\u94FA",description:"\u4E5D\u683C\u6B65\u884C\u8303\u56F4\u5185\uFF0C\u4E3A\u516D\u6237\u4F9B\u5E94\u65B0\u9C9C\u98DF\u7269\u3002",cost:24,w:2,d:2,category:"services",chapter:2,service:"food",capacity:6,range:9},florist:{kind:"florist",name:"\u82B1\u827A\u5C0F\u94FA",description:"\u4E5D\u683C\u6B65\u884C\u8303\u56F4\u5185\uFF0C\u4E3A\u56DB\u6237\u63D0\u4F9B\u8D4F\u82B1\u4E0E\u4F11\u95F2\u3002",cost:26,w:2,d:2,category:"services",chapter:3,service:"leisure",capacity:4,range:9},library:{kind:"library",name:"\u6CB3\u8C37\u4E66\u5C4B",description:"\u5341\u683C\u6B65\u884C\u8303\u56F4\u5185\uFF0C\u4E3A\u516D\u6237\u63D0\u4F9B\u9605\u8BFB\u4F11\u95F2\u3002",cost:42,w:3,d:2,category:"services",chapter:3,service:"leisure",capacity:6,range:10},greenhouse:{kind:"greenhouse",name:"\u73BB\u7483\u6E29\u5BA4",description:"\u5E26\u79CD\u690D\u53F0\u3001\u73BB\u7483\u5C4B\u9876\u548C\u722C\u85E4\u7684\u5C0F\u82B1\u623F\u3002\u7EAF\u88C5\u9970\u3002",cost:18,w:3,d:2,category:"decor",chapter:2},granary:{kind:"granary",name:"\u4E30\u6536\u7CAE\u4ED3",description:"\u5706\u5F62\u7CAE\u5854\u3001\u50A8\u85CF\u6728\u5C4B\u548C\u4E00\u6392\u5C0F\u9EA6\u888B\u3002\u7EAF\u88C5\u9970\u3002",cost:16,w:2,d:2,category:"decor",chapter:2},boathouse:{kind:"boathouse",name:"\u6CB3\u5CB8\u8239\u5C4B",description:"\u6728\u677F\u5E73\u53F0\u4E0A\u505C\u7740\u4E00\u8258\u5C0F\u8239\u3002\u653E\u5728\u6CB3\u5CB8\u9646\u5730\u4E0A\u5E03\u7F6E\u5EAD\u9662\uFF0C\u7EAF\u88C5\u9970\u3002",cost:22,w:3,d:2,category:"decor",chapter:2},flower:{kind:"flower",name:"\u7A97\u8FB9\u82B1\u7BB1",description:"\u5C11\u8D70\u5F2F\u8DEF \xB7 \u521D\u6B21\u901A\u5173\u84DD\u56FE\u3002",cost:8,w:1,d:1,category:"decor",chapter:1},picnic:{kind:"picnic",name:"\u91CE\u9910\u684C",description:"\u5F2F\u8DEF\u7684\u5C3D\u5934 \xB7 \u521D\u6B21\u901A\u5173\u84DD\u56FE\u3002",cost:10,w:1,d:1,category:"decor",chapter:1},birdhouse:{kind:"birdhouse",name:"\u5C0F\u9E1F\u4E4B\u5BB6",description:"\u4E00\u5E97\u591A\u7528 \xB7 \u521D\u6B21\u901A\u5173\u84DD\u56FE\u3002",cost:12,w:1,d:1,category:"decor",chapter:1},windmill:{kind:"windmill",name:"\u82B1\u56ED\u98CE\u8F66",description:"\u6070\u5230\u597D\u5904 \xB7 \u521D\u6B21\u901A\u5173\u84DD\u56FE\u3002",cost:18,w:1,d:1,category:"decor",chapter:1},statue:{kind:"statue",name:"\u6CB3\u8C37\u7EAA\u5FF5\u50CF",description:"\u4E00\u6865\u4E24\u5CB8 \xB7 \u521D\u6B21\u901A\u5173\u84DD\u56FE\u3002",cost:20,w:1,d:1,category:"decor",chapter:1},gardenlamp:{kind:"gardenlamp",name:"\u8424\u706B\u82B1\u56ED\u706F",description:"\u6865\u8FB9\u7684\u751F\u6D3B \xB7 \u521D\u6B21\u901A\u5173\u84DD\u56FE\u3002",cost:15,w:1,d:1,category:"decor",chapter:1}},Gi=[{id:1,title:"\u5728\u8FD9\u91CC\u843D\u811A",story:"\u7ED9\u9547\u516C\u6240\u63A5\u4E0A\u6700\u540E\u4E00\u6BB5\u8DEF\u3002\u56DB\u6237\u90BB\u5C45\uFF0C\u7B49\u7740\u7B2C\u4E00\u7089\u9762\u5305\u3002",reward:"\u57FA\u7840\u88C5\u9970\u4E0E\u65B0\u7684\u8857\u574A\u76EE\u6807",subsidy:5},{id:2,title:"\u7EFF\u836B\u8857\u574A",story:"\u518D\u9080\u8BF7\u4E24\u6237\u90BB\u5C45\u3002\u8BA9\u8857\u574A\u4EEC\u51FA\u95E8\u5C31\u80FD\u9047\u89C1\u4E00\u7247\u7EFF\u3002",reward:"\u540C\u5CB8\u6269\u5730\u3001\u8F6C\u89D2\u5496\u5561\u9986",subsidy:10},{id:3,title:"\u70ED\u95F9\u5E02\u96C6",story:"\u9664\u4E86\u9762\u5305\uFF0C\u751F\u6D3B\u4E5F\u9700\u8981\u4E00\u676F\u5496\u5561\u548C\u670B\u53CB\u3002",reward:"\u96C6\u5E02\u3001\u77F3\u6865\u4E0E\u5BF9\u5CB8\u5148\u9063\u5EFA\u8BBE\u533A",subsidy:15},{id:4,title:"\u6CB3\u7684\u53E6\u4E00\u8FB9",story:"\u4E00\u5EA7\u6865\uFF0C\u628A\u6CB3\u4E24\u5CB8\u53D8\u6210\u540C\u4E00\u4E2A\u5BB6\u3002",reward:"\u5B8C\u6574\u5BF9\u5CB8\u5EFA\u8BBE\u533A\u3001\u8DE8\u6CB3\u7EAA\u5FF5\u914D\u8272",subsidy:20},{id:5,title:"\u7D27\u51D1\u800C\u8212\u9002",story:"\u5341\u4E8C\u6237\u90BB\u5C45\uFF0C\u56DB\u5341\u683C\u9053\u8DEF\u3002\u5C11\u7ED5\u4E00\u70B9\u8DEF\uFF0C\u591A\u7559\u4E00\u70B9\u7EFF\u3002",reward:"\u6CB3\u8C37\u949F\u697C\u84DD\u56FE",subsidy:25},{id:6,title:"\u6211\u4EEC\u7684\u6CB3\u8C37",story:"\u5728\u949F\u58F0\u54CD\u8D77\u65F6\uFF0C\u4E3A\u8FD9\u5EA7\u5C0F\u9547\u7559\u4E0B\u4F60\u81EA\u5DF1\u7684\u6837\u5B50\u3002",reward:"\u5168\u56FE\u5F00\u653E\u3001\u81EA\u7531\u53D1\u5C55",subsidy:30}],fh=["#a8b6ae","#6eabc0","#c9978b","#a296bf","#d9b362"],Gr=["tree","bench","lamp","park","bridge","clock"],Vc=["\u6728\u5C4B","\u5DE5\u574A","\u5DE5\u4F5C\u5BA4","\u521B\u4F5C\u9986","\u6CB3\u8C37\u5730\u6807"];var He=(i,e)=>`${i},${e}`,oo=18,zn=i=>{let[e,t]=i.split(",").map(Number);return{x:e,z:t}},_i=i=>Math.min(6,i.chapterStars.findIndex(e=>e===0)<0?7:i.chapterStars.findIndex(e=>e===0)+1);function jt(i){let e=it[i.kind];return i.rotation%2?{w:e.d,d:e.w}:{w:e.w,d:e.d}}function ni(i){let{w:e,d:t}=jt(i),n=[];for(let s=0;s<t;s++)for(let r=0;r<e;r++)n.push({x:i.x+r,z:i.z+s});return n}function Nt(i){let{w:e,d:t}=it[i.kind],n=Math.floor(e/2),s=t,r=i.rotation===0?[n,s]:i.rotation===1?[t-1-s,n]:i.rotation===2?[e-1-n,t-1-s]:[s,e-1-n];return{x:i.x+r[0],z:i.z+r[1]}}function Rn(i,e,t){return e>=0&&e<i.size&&(i.terrain==="valley"?t===11||t===12:i.terrain==="river"?t===5||t===6:!1)}var hs=i=>i.terrain==="valley"?[4,10,16,20]:i.terrain==="river"?[6]:[];function Vr(i,e,t,n){return t<0||n<0||t>=e.size||n>=e.size?!1:e.terrain!=="valley"?!0:n>=13?t<oo||i.chapterStars[1]>0:n>=11?i.chapterStars[2]>0:i.chapterStars[5]>0||t<12&&(i.chapterStars[3]>0||i.chapterStars[2]>0&&n>=3)}function lo(i,e,t){if(!Number.isInteger(t.x)||!Number.isInteger(t.z)||!Number.isInteger(t.rotation)||t.rotation<0||t.rotation>3)return"\u8BF7\u4F7F\u7528\u5730\u56FE\u5185\u7684\u5B8C\u6574\u683C\u5B50\u548C\u56DB\u4E2A\u671D\u5411";let n=new Set(e.buildings.filter(s=>s.placed&&s.id!==t.id).flatMap(s=>ni(s).map(r=>He(r.x,r.z))));if(t.kind==="bridge"){let s=e.terrain==="valley"?11:5;if(e.terrain==="meadow"||t.rotation!==0||t.z!==s||!hs(e).includes(t.x))return"\u77F3\u6865\u9700\u8981\u653E\u5728\u6CB3\u9053\u6807\u8BB0\u7684\u6865\u4F4D\u4E0A"}for(let s of ni(t)){if(!Vr(i,e,s.x,s.z))return"\u8FD9\u7247\u571F\u5730\u8FD8\u6CA1\u6709\u5F00\u653E\uFF0C\u5148\u5B8C\u6210\u5F53\u524D\u59D4\u6258";if(Rn(e,s.x,s.z)!==(t.kind==="bridge"))return"\u5EFA\u7B51\u8981\u653E\u5728\u9646\u5730\u4E0A\uFF0C\u8DE8\u6CB3\u8BF7\u4F7F\u7528\u77F3\u6865";if(n.has(He(s.x,s.z)))return"\u8FD9\u91CC\u5DF2\u7ECF\u6709\u5EFA\u7B51\u4E86\uFF0C\u8BD5\u8BD5\u53E6\u4E00\u5757\u7A7A\u5730";if(e.roads.includes(He(s.x,s.z)))return"\u5148\u64E6\u9664\u8FD9\u91CC\u7684\u9053\u8DEF\uFF0C\u518D\u653E\u7F6E\u5EFA\u7B51"}return null}function hh(i,e,t,n){return Number.isInteger(t)&&Number.isInteger(n)&&Vr(i,e,t,n)&&!Rn(e,t,n)&&!e.buildings.some(s=>s.placed&&ni(s).some(r=>r.x===t&&r.z===n))}function fs(i,e){let t=new Map;if(!i.has(e))return t;let n=[e];t.set(e,0);for(let s=0;s<n.length;s++){let r=zn(n[s]),a=t.get(n[s]);for(let[o,c]of[[1,0],[-1,0],[0,1],[0,-1]]){let l=He(r.x+o,r.z+c);i.has(l)&&!t.has(l)&&(t.set(l,a+1),n.push(l))}}return t}function Hr(i,e){let t=jt(i),n=jt(e);return Math.max(0,i.x-(e.x+n.w-1),e.x-(i.x+t.w-1))+Math.max(0,i.z-(e.z+n.d-1),e.z-(i.z+t.d-1))}function Vs(i){let e=i.buildings.filter(u=>u.placed).sort((u,d)=>u.id.localeCompare(d.id,"en")),t=new Set(e.filter(u=>u.kind!=="bridge").flatMap(u=>ni(u).map(d=>He(d.x,d.z)))),n=new Set(i.roads.filter(u=>!t.has(u)));for(let u of e.filter(d=>d.kind==="bridge"))for(let d of ni(u))n.add(He(d.x,d.z));let s=e.find(u=>u.kind==="hall"),r=s?Nt(s):{x:-1,z:-1},a=new Set(fs(n,He(r.x,r.z)).keys()),o={buildings:{},connectedRoads:a,population:0,houses:0,food:0,leisure:0,green:0,satisfied:0,northFood:0,southFood:0,northSatisfied:0,southSatisfied:0,roadCount:i.roads.length,bridge:!1,clock:!1,serviceUsed:{}};for(let u of e){let d=Nt(u);o.buildings[u.id]={connected:u.kind==="hall"?a.size>0:a.has(He(d.x,d.z)),entrance:d,food:null,leisure:null,green:!1}}let c=e.filter(u=>u.kind==="house"&&o.buildings[u.id].connected);for(let u of["food","leisure"]){let d=e.filter(h=>it[h.kind].service===u&&o.buildings[h.id].connected),f=[];for(let h of d){let p=Nt(h),x=fs(a,He(p.x,p.z));for(let g of c){let m=Nt(g),b=x.get(He(m.x,m.z));b!==void 0&&b<=it[h.kind].range&&f.push({home:g,shop:h,distance:b})}}f.sort((h,p)=>h.distance-p.distance||h.shop.id.localeCompare(p.shop.id,"en")||h.home.id.localeCompare(p.home.id,"en"));for(let{home:h,shop:p,distance:x}of f)o.buildings[h.id][u]||(o.serviceUsed[p.id]||0)>=it[p.kind].capacity||(o.buildings[h.id][u]=p.id,o.buildings[h.id][`${u}Distance`]=x,o.serviceUsed[p.id]=(o.serviceUsed[p.id]||0)+1)}let l=e.filter(u=>u.kind==="park"&&o.buildings[u.id].connected);for(let u of c){let d=o.buildings[u.id];d.green=l.some(f=>Hr(u,f)<=3),o.houses++,o.population+=10,d.food&&(o.food++,u.z<i.size/2?o.northFood++:o.southFood++),d.leisure&&o.leisure++,d.green&&o.green++,d.food&&d.leisure&&d.green&&(o.satisfied++,u.z<i.size/2?o.northSatisfied++:o.southSatisfied++)}return o.bridge=e.some(u=>u.kind==="bridge"&&ni(u).some(d=>a.has(He(d.x,d.z)))),o.clock=e.some(u=>u.kind==="clock"&&o.buildings[u.id].connected),o}var It=(i,e,t)=>({label:i,current:e,need:t,met:e>=t});function co(i,e){switch(i){case 1:return{base:[It("\u56DB\u680B\u4F4F\u5B85\u63A5\u901A\u9053\u8DEF\u5E76\u83B7\u5F97\u9762\u5305",e.food,4)],bonus:[It("\u81F3\u5C11\u4E24\u680B\u4F4F\u5B85\u90BB\u8FD1\u516C\u56ED",e.green,2),It("\u9053\u8DEF\u4E0D\u8D85\u8FC7 16 \u683C",e.roadCount<=16?1:0,1)]};case 2:return{base:[It("\u516D\u680B\u4F4F\u5B85\u83B7\u5F97\u98DF\u7269\u670D\u52A1",e.food,6),It("\u56DB\u680B\u4F4F\u5B85\u90BB\u8FD1\u516C\u56ED",e.green,4)],bonus:[It("\u516D\u680B\u4F4F\u5B85\u90FD\u90BB\u8FD1\u516C\u56ED",e.green,6),It("\u9053\u8DEF\u4E0D\u8D85\u8FC7 24 \u683C",e.roadCount<=24?1:0,1)]};case 3:return{base:[It("\u516B\u680B\u4F4F\u5B85\u83B7\u5F97\u98DF\u7269\u670D\u52A1",e.food,8),It("\u516D\u680B\u4F4F\u5B85\u83B7\u5F97\u4F11\u95F2\u670D\u52A1",e.leisure,6)],bonus:[It("\u516B\u680B\u4F4F\u5B85\u83B7\u5F97\u4F11\u95F2\u670D\u52A1",e.leisure,8),It("\u516D\u680B\u4F4F\u5B85\u6EE1\u8DB3\u5168\u90E8\u9700\u6C42",e.satisfied,6)]};case 4:return{base:[It("\u4E00\u5EA7\u77F3\u6865\u8FDE\u901A\u4E24\u5CB8",e.bridge?1:0,1),It("\u5BF9\u5CB8\u4E24\u680B\u4F4F\u5B85\u83B7\u5F97\u98DF\u7269\u670D\u52A1",e.northFood,2),It("\u539F\u5CB8\u56DB\u680B\u4F4F\u5B85\u83B7\u5F97\u98DF\u7269\u670D\u52A1",e.southFood,4)],bonus:[It("\u5BF9\u5CB8\u56DB\u680B\u4F4F\u5B85\u83B7\u5F97\u98DF\u7269\u670D\u52A1",e.northFood,4),It("\u4E24\u5CB8\u5404\u6709\u4F4F\u5B85\u6EE1\u8DB3\u5168\u90E8\u9700\u6C42",e.northSatisfied>0&&e.southSatisfied>0?1:0,1)]};case 5:return{base:[It("\u5341\u4E8C\u680B\u4F4F\u5B85\u6EE1\u8DB3\u5168\u90E8\u9700\u6C42",e.satisfied,12),It("\u9053\u8DEF\u4E0D\u8D85\u8FC7 40 \u683C",e.roadCount<=40?1:0,1)],bonus:[It("\u9053\u8DEF\u4E0D\u8D85\u8FC7 36 \u683C",e.roadCount<=36?1:0,1),It("\u5341\u56DB\u680B\u4F4F\u5B85\u6EE1\u8DB3\u5168\u90E8\u9700\u6C42",e.satisfied,14)]};default:return{base:[It("\u5341\u516D\u680B\u4F4F\u5B85\u6EE1\u8DB3\u5168\u90E8\u9700\u6C42",e.satisfied,16),It("\u4E24\u5CB8\u5404\u6709\u81F3\u5C11\u56DB\u680B\u6EE1\u610F\u4F4F\u5B85",Math.min(e.northSatisfied,e.southSatisfied),4),It("\u6CB3\u8C37\u949F\u697C\u63A5\u901A\u9053\u8DEF",e.clock?1:0,1)],bonus:[It("\u4E8C\u5341\u680B\u4F4F\u5B85\u6EE1\u8DB3\u5168\u90E8\u9700\u6C42",e.satisfied,20),It("\u9053\u8DEF\u4E0D\u8D85\u8FC7 64 \u683C",e.roadCount<=64?1:0,1)]}}}function Wr(i,e){let t=co(i,e);return t.base.every(n=>n.met)?1+t.bonus.filter(n=>n.met).length:0}function ct(i,e,t,n,s=0){return{id:i,kind:e,x:t,z:n,rotation:s,placed:!0,variant:0}}function ph(){return{size:24,terrain:"valley",buildings:[ct("hall","hall",5,19,2),...[1,3,8].map((e,t)=>({...ct(`home-${t+1}`,"house",e,14),variant:t})),{...ct("home-4","house",9,18,2),variant:3},ct("bakery-1","bakery",6,14),ct("park-1","park",1,18,2)],roads:[...Array.from({length:11},(e,t)=>He(t+1,16)),He(1,17),He(9,17),He(6,18)]}}function Xr(i){return Gi.reduce((e,t,n)=>e+(i.chapterStars[n]>0?t.subsidy:0),0)}function Tg(){return{size:12,terrain:"meadow",buildings:[ct("hall","hall",5,5,2),...[1,3,7,9].map((i,e)=>ct(`h-${e}`,"house",i,1)),ct("bakery","bakery",5,1),ct("park-a","park",1,5,2),ct("park-b","park",8,5,2)],roads:[...Array.from({length:11},(i,e)=>He(e+1,3)),He(6,4),He(1,4),He(8,4)]}}function Ag(){return{size:12,terrain:"meadow",buildings:[ct("hall","hall",9,7,2),...[0,2,4,6,8,10].map((i,e)=>ct(`h-${e}`,"house",i,1)),ct("bakery","bakery",3,4,2),ct("cafe-a","cafe",5,4,2),ct("cafe-b","cafe",9,4,2),ct("park-a","park",1,4,2),ct("park-b","park",7,4,2)],roads:[...Array.from({length:11},(i,e)=>He(e+1,3)),He(11,4),He(11,5),He(11,6),He(10,6)]}}function Eg(){return{size:12,terrain:"river",buildings:[ct("hall","hall",4,9,2),ct("h-a","house",0,1),ct("h-b","house",9,1),ct("h-c","house",0,8,2),ct("h-d","house",9,8,2),ct("bakery-a","bakery",4,1),ct("bakery-b","bakery",2,8,2),ct("cafe-a","cafe",7,1),ct("cafe-b","cafe",7,8,2),ct("park-a","park",2,1),ct("park-b","park",9,10,3),ct("bridge","bridge",6,5)],roads:[...Array.from({length:10},(i,e)=>He(e+1,3)),...Array.from({length:12},(i,e)=>He(e,7)),He(6,4),He(5,8),He(11,8),He(11,9),He(11,10)]}}var mh=Tg(),gh=Ag(),xh=Eg(),Pn=[{id:"short-roads",title:"\u5C11\u8D70\u5F2F\u8DEF",description:"\u56DB\u6237\u90BB\u5C45\uFF0C\u4E00\u5BB6\u9762\u5305\u5E97\u3002\u627E\u5230\u4E00\u6761\u7B80\u5355\u53C8\u8212\u670D\u7684\u8857\u9053\u3002",family:"\u9053\u8DEF\u89C4\u5212",roadBudget:28,efficientBudget:14,required:4,greenGoal:2,leisureGoal:0,reward:"flower",solution:mh},{id:"quiet-street",title:"\u5F2F\u8DEF\u7684\u5C3D\u5934",description:"\u540C\u6837\u7684\u5EFA\u7B51\uFF0C\u66F4\u5C11\u7684\u9053\u8DEF\u3002\u628A\u7A7A\u5730\u7559\u7ED9\u516C\u56ED\u3002",family:"\u9053\u8DEF\u89C4\u5212 \xB7 \u8FDB\u9636",roadBudget:20,efficientBudget:14,required:4,greenGoal:3,leisureGoal:0,reward:"picnic",solution:mh},{id:"one-shop",title:"\u4E00\u5E97\u591A\u7528",description:"\u4E00\u5BB6\u9762\u5305\u5E97\u53EA\u80FD\u670D\u52A1\u516D\u6237\u3002\u4E24\u5BB6\u5496\u5561\u9986\u7684\u8DDD\u79BB\u4E5F\u5F88\u91CD\u8981\u3002",family:"\u670D\u52A1\u8986\u76D6",roadBudget:28,efficientBudget:16,required:6,greenGoal:2,leisureGoal:6,reward:"birdhouse",solution:gh},{id:"just-enough",title:"\u6070\u5230\u597D\u5904",description:"\u8BA9\u516D\u6237\u90BB\u5C45\u90FD\u80FD\u559D\u5230\u5496\u5561\uFF0C\u8FD8\u8981\u7ED9\u7EFF\u836B\u7559\u4E2A\u4F4D\u7F6E\u3002",family:"\u670D\u52A1\u8986\u76D6 \xB7 \u8FDB\u9636",roadBudget:22,efficientBudget:16,required:6,greenGoal:4,leisureGoal:6,reward:"windmill",solution:gh},{id:"one-bridge",title:"\u4E00\u6865\u4E24\u5CB8",description:"\u53EA\u6709\u4E00\u4E2A\u6865\u4F4D\u3002\u8BA9\u5357\u5317\u4E24\u5CB8\u7684\u90BB\u5C45\u5403\u4E0A\u65B0\u9C9C\u9762\u5305\u3002",family:"\u8DE8\u6CB3\u793E\u533A",roadBudget:38,efficientBudget:28,required:4,greenGoal:2,leisureGoal:0,reward:"statue",solution:xh},{id:"riverside",title:"\u6865\u8FB9\u7684\u751F\u6D3B",description:"\u6865\u3001\u9762\u5305\u3001\u5496\u5561\u548C\u7EFF\u5730\u3002\u7528\u6709\u9650\u9053\u8DEF\u8FDE\u8D77\u5B8C\u6574\u7684\u751F\u6D3B\u3002",family:"\u8DE8\u6CB3\u793E\u533A \xB7 \u8FDB\u9636",roadBudget:32,efficientBudget:28,required:4,greenGoal:2,leisureGoal:4,reward:"gardenlamp",solution:xh}];function Hc(i){let e=structuredClone(i.solution);e.roads=[];for(let t of e.buildings)t.kind!=="hall"&&(t.placed=!1);return e}function Wc(i,e){let t=(n,s,r)=>({label:n,current:s,need:r,met:s>=r});return[t(`${i.required} \u680B\u4F4F\u5B85\u63A5\u901A\u9053\u8DEF\u5E76\u83B7\u5F97\u98DF\u7269`,e.food,i.required),...i.solution.terrain==="river"?[t("\u77F3\u6865\u8FDE\u901A\u4E24\u5CB8",e.bridge?1:0,1),t("\u4E24\u5CB8\u90FD\u6709\u4F4F\u5B85\u83B7\u5F97\u98DF\u7269",e.northFood>0&&e.southFood>0?1:0,1)]:[],...i.leisureGoal>0?[t(`${i.leisureGoal} \u680B\u4F4F\u5B85\u83B7\u5F97\u4F11\u95F2\u670D\u52A1`,e.leisure,i.leisureGoal)]:[],t(`\u9053\u8DEF\u4E0D\u8D85\u8FC7 ${i.roadBudget} \u683C`,e.roadCount<=i.roadBudget?1:0,1)]}function qr(i,e){return Wc(i,e).every(t=>t.met)?1+Xc(i,e).filter(t=>t.met).length:0}function Xc(i,e){return[{label:`\u9053\u8DEF\u4E0D\u8D85\u8FC7 ${i.efficientBudget} \u683C`,current:e.roadCount<=i.efficientBudget?1:0,need:1,met:e.roadCount<=i.efficientBudget},{label:`${i.greenGoal} \u680B\u4F4F\u5B85\u90BB\u8FD1\u516C\u56ED`,current:e.green,need:i.greenGoal,met:e.green>=i.greenGoal}]}var Cg=["spring","summer","autumn","winter"],Rg={spring:"\u6625",summer:"\u590F",autumn:"\u79CB",winter:"\u51AC"},Hs=(i,e,t)=>{let n=Math.max(0,Math.min(1,(t-i)/(e-i)));return n*n*(3-2*n)};function Vi(i,e){let t=Math.max(0,i),n=t/360,s=e.clockMode==="fixed"?{day:12,sunset:19,night:23}[e.lighting]:(n+.375)%1*24,r=e.season==="cycle"?Cg[Math.floor(n/3)%4]:e.season,a=Hs(5.5,8,s)*(1-Hs(18,21,s)),o=Math.max(Hs(16,18.5,s)*(1-Hs(19.5,21,s)),Hs(5,6.5,s)*(1-Hs(7,8.5,s))),c=Math.floor(n+.375)+1;return{hour:s,day:c,season:r,daylight:a,warmth:o,sleep:s>=20||s<6,label:`${Rg[r]} \xB7 \u7B2C ${c} \u5929 \xB7 ${String(Math.floor(s)).padStart(2,"0")}:${String(Math.floor(s%1*60)).padStart(2,"0")}`}}function _h(i,e){let t=Math.floor(i/360+.375);return t+e/24<.375&&t++,(t+e/24-.375)*360}var $r=["sowing","growing","harvesting","to-mill","milling","to-bakery","baking","returning"],jr={sowing:"\u64AD\u79CD",growing:"\u9EA6\u82D7\u751F\u957F",harvesting:"\u6536\u5272\u5C0F\u9EA6","to-mill":"\u628A\u9EA6\u5B50\u9001\u5F80\u78E8\u574A",milling:"\u98CE\u8F66\u78E8\u9762","to-bakery":"\u628A\u9762\u7C89\u9001\u5F80\u9762\u5305\u5E97",baking:"\u70D8\u7119\u9762\u5305",returning:"\u56DE\u9EA6\u7530\u51C6\u5907\u4E0B\u4E00\u5B63"},qc=()=>({runs:{},wheat:0,flour:0,bread:0,batches:0,activeSeconds:0});function fo(i,e,t,n){if(n)return"\u591C\u95F4\u4F11\u606F\u4E2D";let s=e.filter(r=>r.bakery?.id===i&&!r.problem).map(r=>t.runs[r.field.id]).filter(Boolean);return s.some(r=>r.phase==="baking")?"\u70D8\u7119\u4E2D":s.some(r=>r.phase==="to-bakery")?"\u9762\u7C89\u6B63\u5728\u9001\u6765":"\u7F3A\u5C11\u539F\u6750\u6599\uFF1A\u9762\u7C89"}function Yr(i,e,t){let n=He(Math.floor(e.x),Math.floor(e.z)),s=He(Math.floor(t.x),Math.floor(t.z));if(!i.has(n)||!i.has(s))return[];let r=[n],a=new Map([[n,null]]);for(let l=0;l<r.length&&!a.has(s);l++){let u=zn(r[l]);for(let[d,f]of[[1,0],[-1,0],[0,1],[0,-1]]){let h=He(u.x+d,u.z+f);i.has(h)&&!a.has(h)&&(a.set(h,r[l]),r.push(h))}}if(!a.has(s))return[];let o=[],c=s;for(;c!==null;){let l=zn(c);o.unshift({x:l.x+.5,z:l.z+.5}),c=a.get(c)}return o}var In=i=>{let e=Nt(i);return{x:e.x+.5,z:e.z+.5}},Kr=i=>{let e=jt(i);return{x:i.x+e.w/2,z:i.z+e.d/2}};function Zr(i,e,t){let n=a=>a.placed&&!!e.buildings[a.id]?.connected,s=i.buildings.filter(a=>a.kind==="mill"&&n(a)),r=i.buildings.filter(a=>a.kind==="bakery"&&n(a));return i.buildings.filter(a=>a.kind==="wheatfield"&&a.placed).sort((a,o)=>a.id.localeCompare(o.id,"en")).map((a,o)=>{let c=(g,m)=>{let b=Nt(g),A=fs(e.connectedRoads,He(b.x,b.z));return[...m].sort((_,w)=>(A.get(He(Nt(_).x,Nt(_).z))??1/0)-(A.get(He(Nt(w).x,Nt(w).z))??1/0)||_.id.localeCompare(w.id,"en"))[0]},l=t.runs[a.id],u=l&&l.phase!=="sowing"?s.find(g=>g.id===l.millId):c(a,s),d=l&&l.phase!=="sowing"?r.find(g=>g.id===l.bakeryId):u?c(u,r):void 0,f=n(a)?o>=Math.min(3,e.houses)?"\u9700\u8981\u8FDE\u8DEF\u4F4F\u5B85\u5B89\u6392\u6751\u6C11\uFF0C\u6700\u591A\u4E09\u4EBA\u52A1\u519C":u?d?"":"\u9700\u8981\u4E00\u5EA7\u8FDE\u8DEF\u7684\u9762\u5305\u5E97":"\u9700\u8981\u4E00\u5EA7\u8FDE\u8DEF\u7684\u98CE\u8F66\u78E8\u574A":"\u9EA6\u7530\u5165\u53E3\u9700\u8981\u8FDE\u5230\u9547\u516C\u6240",h=u&&!f?[Kr(a),...Yr(e.connectedRoads,In(a),In(u))]:[],p=u&&d&&!f?Yr(e.connectedRoads,In(u),In(d)):[],x=d&&!f?[...Yr(e.connectedRoads,In(d),In(a)),Kr(a)]:[];return{field:a,mill:u,bakery:d,toMill:h,toBakery:p,returning:x,problem:f}})}function yh(i){return i.reduce((e,t,n)=>n?e+Math.hypot(t.x-i[n-1].x,t.z-i[n-1].z):e,0)}function Pg(i,e){let t=yh(i)*Math.max(0,Math.min(1,e));for(let n=1;n<i.length;n++){let s=i[n-1],r=i[n],a=Math.hypot(r.x-s.x,r.z-s.z);if(t<=a)return{x:s.x+(r.x-s.x)*t/(a||1),z:s.z+(r.z-s.z)*t/(a||1)};t-=a}return i[i.length-1]||{x:0,z:0}}function uo(i,e,t){return e==="to-mill"||e==="to-bakery"||e==="returning"?Math.max(2,yh(e==="to-mill"?i.toMill:e==="to-bakery"?i.toBakery:i.returning)/.5):{sowing:6,growing:24/{spring:1,summer:1.15,autumn:.85,winter:.45}[t],harvesting:5,milling:8,baking:8}[e]}function vh(i,e,t,n,s,r){if(n||!Number.isFinite(t)||t<0)return[];let a=[];for(let o of i){if(o.problem||!o.mill||!o.bakery)continue;let c=e.runs[o.field.id]||={phase:"sowing",elapsed:0,millId:o.mill.id,bakeryId:o.bakery.id,batches:0};c.phase==="sowing"&&(c.millId=o.mill.id,c.bakeryId=o.bakery.id);let l=!r||r.has(o.field.id)?Math.min(t,1):0;for(;l>0;){let p=uo(o,c.phase,s),x=Math.min(l,Math.max(0,p-c.elapsed));if(c.elapsed+=x,l-=x,c.elapsed<p)break;c.phase==="harvesting"&&(e.wheat+=2),c.phase==="milling"&&(e.wheat=Math.max(0,e.wheat-2),e.flour+=2),c.phase==="baking"&&(e.flour=Math.max(0,e.flour-2),e.bread+=4,e.batches++,c.batches++),c.phase=$r[($r.indexOf(c.phase)+1)%$r.length],c.elapsed=0}let u=c.phase==="to-mill"?o.toMill:c.phase==="to-bakery"?o.toBakery:c.phase==="returning"?o.returning:[],d=u.length?Pg(u,c.elapsed/uo(o,c.phase,s)):["milling"].includes(c.phase)?In(o.mill):c.phase==="baking"?In(o.bakery):Kr(o.field);if(c.phase==="milling"||c.phase==="baking"){let p=c.phase==="milling"?o.mill:o.bakery,x=Kr(p),g=Math.hypot(x.x-d.x,x.z-d.z),m=(x.x-d.x)/g,b=(x.z-d.z)/g,A=[-.38,0,.38][i.indexOf(o)%3];d.x+=m*.48-b*A,d.z+=b*.48+m*A}let f=Kr(o.field),h=c.phase==="milling"?In(o.mill):c.phase==="baking"?In(o.bakery):u.length&&[...u].filter(p=>Math.hypot(p.x-f.x,p.z-f.z)>.001).sort((p,x)=>Math.hypot(p.x-d.x,p.z-d.z)-Math.hypot(x.x-d.x,x.z-d.z))[0]||In(o.field);a.push({fieldId:o.field.id,phase:c.phase,target:d,entrance:h,carrying:c.phase==="to-mill"?"wheat":c.phase==="to-bakery"?"flour":null,harvesting:c.phase==="harvesting"||c.phase==="sowing"})}return a.some(o=>!r||r.has(o.fieldId))&&(e.activeSeconds+=Math.min(t,1)),a}var ho={live:"tokenTown.slot.live.v1",demo:"tokenTown.slot.demo.v1"},bh="tokenTown.mode.v1",ps=i=>{let{revision:e,worldSeconds:t,settings:n,farm:s,...r}=i;return JSON.stringify(r)};function Sh(i){return{version:1,mode:i,revision:0,coins:0,tokenCoins:0,residue:0,subsidyPaid:0,chapterStars:[0,0,0,0,0,0],puzzleStars:{},projects:[],town:ph(),puzzleBoards:{},demoStep:0,nextId:20,tutorialDone:!1,history:"unscanned",worldSeconds:0,farm:qc(),settings:{music:!0,musicVolume:.28,clockMode:"cycle",season:"cycle",muted:!1,lighting:"day",quality:"medium",reducedMotion:!1,cameraInput:"trackpad"}}}function Mh(i){if(!i||!Number.isInteger(i.size)||i.size<8||i.size>24||!["valley","meadow","river"].includes(i.terrain)||!Array.isArray(i.buildings)||!Array.isArray(i.roads))return!1;let e=new Set,t=new Set;for(let n of i.buildings){if(!n||typeof n.id!="string"||e.has(n.id)||!it[n.kind]||!Number.isInteger(n.rotation)||n.rotation<0||n.rotation>3||!Number.isInteger(n.x)||!Number.isInteger(n.z)||typeof n.placed!="boolean"||!Number.isInteger(n.variant)||n.variant<0||n.variant>4||(e.add(n.id),n.placed&&n.kind==="bridge"&&(i.terrain==="meadow"||n.rotation!==0||n.z!==(i.terrain==="valley"?11:5)||!hs(i).includes(n.x))))return!1;if(n.placed)for(let s of ni(n)){let r=He(s.x,s.z);if(s.x<0||s.z<0||s.x>=i.size||s.z>=i.size||t.has(r)||Rn(i,s.x,s.z)!==(n.kind==="bridge"))return!1;t.add(r)}}return i.buildings.filter(n=>n.kind==="hall"&&n.placed).length!==1?!1:i.roads.every(n=>typeof n=="string"&&/^\d+,\d+$/.test(n)&&n.split(",").every(s=>Number(s)<i.size)&&!t.has(n)&&!Rn(i,zn(n).x,zn(n).z))&&new Set(i.roads).size===i.roads.length}function po(i,e){if(!i)return null;try{let t=JSON.parse(i);if(!t||t.version!==1||t.mode!==e||!Mh(t.town)||t.town.size!==24||t.town.terrain!=="valley")return null;for(let s of[t.coins,t.tokenCoins,t.residue,t.subsidyPaid,t.nextId,t.demoStep,t.revision])if(!Number.isSafeInteger(s)||s<0)return null;if(t.residue>=1e4||!Array.isArray(t.chapterStars)||t.chapterStars.length!==6||t.chapterStars.some(s=>!Number.isInteger(s)||s<0||s>3))return null;let n=t.chapterStars.indexOf(0);if(n>=0&&t.chapterStars.slice(n).some(s=>s>0)||!t.puzzleStars||!t.puzzleBoards||Object.values(t.puzzleStars).some(s=>!Number.isInteger(s)||s<0||s>3)||Object.values(t.puzzleBoards).some(s=>!Mh(s))||!Array.isArray(t.projects)||t.projects.some(s=>!s||typeof s.id!="string"||typeof s.name!="string"||!Number.isSafeInteger(s.credited)||s.credited<0||!Number.isSafeInteger(s.tokens)||s.tokens<s.credited)||new Set(t.projects.map(s=>s.id)).size!==t.projects.length||t.projects.some(s=>typeof s.provider!="string"||t.town.buildings.filter(r=>r.kind==="workshop"&&r.projectId===s.id).length!==1)||t.town.buildings.some(s=>s.kind==="workshop"&&!t.projects.some(r=>r.id===s.projectId))||typeof t.tutorialDone!="boolean"||!["unscanned","empty","ready"].includes(t.history)||Array.isArray(t.puzzleStars)||Array.isArray(t.puzzleBoards)||typeof t.puzzleStars!="object"||typeof t.puzzleBoards!="object")return null;for(let[s,r]of Object.entries(t.puzzleBoards)){let a=Pn.find(o=>o.id===s);if(!a||r.size!==a.solution.size||r.terrain!==a.solution.terrain||r.buildings.length!==a.solution.buildings.length||r.roads.length>a.roadBudget||r.buildings.some(o=>!a.solution.buildings.some(c=>c.id===o.id&&c.kind===o.kind)))return null}return Object.keys(t.puzzleStars).some(s=>!Pn.some(r=>r.id===s))||t.subsidyPaid>Math.min(Math.floor(t.tokenCoins/5),Xr(t))||t.coins>t.tokenCoins+t.subsidyPaid||!t.settings||typeof t.settings.muted!="boolean"||typeof t.settings.reducedMotion!="boolean"||!["day","sunset","night"].includes(t.settings.lighting)||!["high","medium","low"].includes(t.settings.quality)||(t.settings.cameraInput??="trackpad",t.settings.clockMode??="cycle",t.settings.season??="cycle",t.worldSeconds??=0,!["cycle","fixed"].includes(t.settings.clockMode)||!["cycle","spring","summer","autumn","winter"].includes(t.settings.season)||!Number.isFinite(t.worldSeconds)||t.worldSeconds<0)||!["trackpad","mouse"].includes(t.settings.cameraInput)||(t.settings.music??=!0,t.settings.musicVolume??=.28,t.farm??=qc(),t.farm.activeSeconds??=0,typeof t.settings.music!="boolean"||!Number.isFinite(t.settings.musicVolume)||t.settings.musicVolume<0||t.settings.musicVolume>1)||!t.farm||!t.farm.runs||Array.isArray(t.farm.runs)||typeof t.farm.runs!="object"||[t.farm.wheat,t.farm.flour,t.farm.bread,t.farm.batches].some(s=>!Number.isSafeInteger(s)||s<0)||!Number.isFinite(t.farm.activeSeconds)||t.farm.activeSeconds<0||Object.values(t.farm.runs).some(s=>!s||!$r.includes(s.phase)||!Number.isFinite(s.elapsed)||s.elapsed<0||typeof s.millId!="string"||typeof s.bakeryId!="string"||!Number.isSafeInteger(s.batches)||s.batches<0)?null:t}catch{return null}}function Th(i){let e=Math.min(Xr(i),Math.floor(i.tokenCoins/5)),t=Math.max(0,e-i.subsidyPaid);return i.subsidyPaid+=t,i.coins+=t,t}function wh(i,e){let t=0,n=0,s=[],r=new Set;for(let l of e){if(!l||typeof l.id!="string"||typeof l.name!="string"||!Number.isFinite(l.tokens)||l.tokens<0||r.has(l.id))continue;r.add(l.id);let u=Math.min(Number.MAX_SAFE_INTEGER,Math.floor(l.tokens)),d=i.projects.find(h=>h.id===l.id);if(!d&&l.legacyId&&!i.projects.some(h=>h.id===l.id)&&(d=i.projects.find(h=>h.id===l.legacyId),d)){let h=d.id;d.id=l.id;for(let p of i.town.buildings)p.projectId===h&&(p.projectId=l.id)}d||(d={id:l.id,name:l.name,provider:l.provider,tokens:0,credited:0},i.projects.push(d),n++,i.town.buildings.push({...ct(`project-${i.nextId++}`,"workshop",0,0),placed:!1,projectId:l.id}));let f=ds(d.tokens);t+=Math.max(0,u-d.credited),d.credited=Math.max(d.credited,u),d.tokens=Math.max(d.tokens,u),d.name=l.name,d.provider=l.provider,ds(d.tokens)>f&&s.push(d.name)}let a=i.residue+t,o=Math.floor(a/1e4);i.residue=a%1e4,i.tokenCoins+=o,i.coins+=o;let c=Th(i);return i.projects.length>0&&(i.history="ready"),{newTokens:t,coins:o,subsidy:c,newProjects:n,grown:s}}function Ig(i){let e=[185e4,104e4,74e4,37e4];return["\u6CB3\u8C37\u7B14\u8BB0","\u7EB8\u98DE\u673A","\u5C0F\u5C0F\u661F\u56FE","\u53E3\u888B\u82B1\u56ED"].map((t,n)=>({id:`demo-project-${n}`,name:t,provider:n%2?"claude":"codex",tokens:e[n]+i*[27e4,23e4,18e4,12e4][n]}))}var mo=class{constructor(e){this.activePuzzle=null;this.persistenceError="";this.conflict=!1;this.listeners=new Set;let t="live";try{localStorage.getItem(bh)==="demo"&&(t="demo")}catch{}this.state=this.read(e||t),this.persistedProgress=ps(this.state),typeof window<"u"&&window.addEventListener("storage",n=>{if(n.key===ho[this.state.mode]&&n.newValue){let s=po(n.newValue,this.state.mode);if(s&&s.revision>this.state.revision)if(ps(s)===this.persistedProgress){let r=JSON.stringify(this.state.settings)!==JSON.stringify(s.settings);this.state.revision=s.revision,this.state.worldSeconds=s.worldSeconds,s.farm.activeSeconds>this.state.farm.activeSeconds&&(this.state.farm=s.farm),this.state.settings=s.settings,r&&this.emit()}else this.state=s,this.persistedProgress=ps(s),this.conflict=!0,this.emit()}})}read(e){try{return po(localStorage.getItem(ho[e]),e)||Sh(e)}catch{return Sh(e)}}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}emit(){for(let e of this.listeners)e()}commit(e=!0){try{let t=po(localStorage.getItem(ho[this.state.mode]),this.state.mode);if(t&&t.revision>this.state.revision)if(ps(t)===this.persistedProgress)this.state.revision=t.revision,t.farm.activeSeconds>this.state.farm.activeSeconds&&(this.state.farm=t.farm);else{this.state=t,this.persistedProgress=ps(t),this.conflict=!0,this.emit();return}this.state.revision++,localStorage.setItem(ho[this.state.mode],JSON.stringify(this.state)),localStorage.setItem(bh,this.state.mode),this.persistenceError="",this.persistedProgress=ps(this.state)}catch{this.persistenceError="\u6D4F\u89C8\u5668\u672A\u80FD\u4FDD\u5B58\u8FDB\u5EA6\uFF0C\u8BF7\u5728\u8BBE\u7F6E\u4E2D\u5BFC\u51FA\u5B58\u6863"}e&&this.emit()}setMode(e){e!==this.state.mode&&(this.state=this.read(e),this.persistedProgress=ps(this.state),this.activePuzzle=null,this.conflict=!1,this.commit())}get board(){return this.activePuzzle?this.state.puzzleBoards[this.activePuzzle]:this.state.town}get puzzle(){return Pn.find(e=>e.id===this.activePuzzle)}unlockedKind(e){if(this.activePuzzle)return this.board.buildings.some(n=>n.kind===e);let t=Pn.find(n=>n.reward===e);return t?(this.state.puzzleStars[t.id]||0)>0:it[e].chapter<=_i(this.state)}sync(e){let t=wh(this.state,e);return this.commit(),t}syncDemo(){let e=wh(this.state,Ig(this.state.demoStep++));return this.commit(),e}road(e,t,n=!1){let s=He(e,t),r=this.board.roads.indexOf(s);return n?(r>=0&&(this.board.roads.splice(r,1),this.commit()),null):r>=0?null:hh(this.state,this.board,e,t)?this.puzzle&&this.board.roads.length>=this.puzzle.roadBudget?`\u672C\u5173\u6700\u591A\u4F7F\u7528 ${this.puzzle.roadBudget} \u683C\u9053\u8DEF\uFF0C\u53EF\u64E6\u9664\u6216\u91CD\u65B0\u89C4\u5212`:(this.board.roads.push(s),this.commit(),null):"\u9053\u8DEF\u9700\u8981\u94FA\u5728\u5DF2\u5F00\u653E\u7684\u7A7A\u5730\u4E0A"}place(e,t,n,s,r){if(!this.unlockedKind(e))return"\u5148\u5B8C\u6210\u5BF9\u5E94\u7684\u59D4\u6258\u6216\u89C4\u5212\u5173\uFF0C\u89E3\u9501\u8FD9\u5F20\u84DD\u56FE";let a=r?this.board.buildings.find(l=>l.id===r&&l.kind===e):void 0;if(r&&!a)return"\u8FD9\u680B\u5EFA\u7B51\u4E0D\u5728\u5F53\u524D\u5E93\u5B58\u4E2D";if(this.activePuzzle&&!a)return"\u89C4\u5212\u5173\u4F7F\u7528\u56FA\u5B9A\u5E93\u5B58\uFF0C\u8BF7\u9009\u62E9\u4E00\u4E2A\u5DF2\u6709\u5EFA\u7B51";let o=a?{...a,x:t,z:n,rotation:s,placed:!0}:{...ct(`building-${this.state.nextId}`,e,t,n,s),variant:e==="house"?this.state.nextId%4:0},c=lo(this.state,this.board,o);if(c)return c;if(a)Object.assign(a,o);else{if(e==="workshop"||e==="hall")return"\u8BF7\u4ECE\u5E93\u5B58\u9009\u62E9\u5DF2\u6709\u7684\u5EFA\u7B51";if(this.state.coins<it[e].cost)return"\u91D1\u5E01\u8FD8\u4E0D\u591F\u3002\u540C\u6B65 token\uFF0C\u6216\u5148\u8BD5\u8BD5\u514D\u8D39\u7684\u89C4\u5212\u5173";this.state.coins-=it[e].cost,this.state.nextId++,this.board.buildings.push(o)}return this.commit(),null}stash(e){let t=this.board.buildings.find(n=>n.id===e);return!t||t.kind==="hall"||!t.placed?!1:(t.placed=!1,this.commit(),!0)}rotate(e){let t=this.board.buildings.find(n=>n.id===e);return t?t.kind==="bridge"?"\u77F3\u6865\u6CBF\u6CB3\u9053\u65B9\u5411\u653E\u7F6E":this.place(t.kind,t.x,t.z,(t.rotation+1)%4,e):"\u5EFA\u7B51\u4E0D\u5B58\u5728"}recolor(e){let t=this.board.buildings.find(a=>a.id===e);if(!t)return!1;let n=Pn.find(a=>a.reward===t.kind);if(n&&(this.state.puzzleStars[n.id]||0)<3||this.activePuzzle)return!1;let s=Gr.indexOf(t.kind),r=this.state.chapterStars[s]||0;return s>=0&&r<2?!1:(t.variant=(t.variant+1)%(n||s>=0&&r===2?2:4),this.commit(),!0)}claimChapter(e){if(this.activePuzzle||e<0||e>=6||e>0&&this.state.chapterStars[e-1]===0)return null;let t=Wr(e+1,Vs(this.state.town));if(t<=this.state.chapterStars[e])return null;this.state.chapterStars[e]=t,e===0&&(this.state.tutorialDone=!0);let n=Th(this.state);return this.commit(),{stars:t,subsidy:n,improved:!0}}enterPuzzle(e){let t=Pn.find(n=>n.id===e);return t?(this.state.puzzleBoards[e]||(this.state.puzzleBoards[e]=Hc(t)),this.activePuzzle=e,this.commit(),!0):!1}leavePuzzle(){this.activePuzzle=null,this.emit()}restartPuzzle(){this.puzzle&&(this.state.puzzleBoards[this.puzzle.id]=Hc(this.puzzle),this.commit())}claimPuzzle(){let e=this.puzzle;if(!e)return null;let t=qr(e,Vs(this.board)),n=this.state.puzzleStars[e.id]||0;return t<=n?null:(this.state.puzzleStars[e.id]=t,this.commit(),{stars:t,first:n===0})}updateSettings(e){Object.assign(this.state.settings,e),this.commit()}clock(e,t=!1){this.state.worldSeconds=e,t&&this.commit(!1)}visitHour(e){this.state.worldSeconds=_h(this.state.worldSeconds,e),this.state.settings.clockMode="cycle",this.commit()}importSave(e){let t=po(e,this.state.mode);return t?(t.revision=this.state.revision,this.state=t,this.activePuzzle=null,this.commit(),!0):!1}};function Ah(i,e,t=!1){return i=i.toLowerCase(),"wasd".includes(i)&&i.length===1?"pan":i==="r"&&e?t?null:"turn-right":i==="q"||i==="e"?e?t?null:i==="q"?"turn-left":"turn-right":"camera-turn":null}function Eh(i){let e=Number(i.has("d"))-Number(i.has("a")),t=Number(i.has("w"))-Number(i.has("s")),n=Math.hypot(e,t)||1;return{x:e/n,y:t/n}}var Ch={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};var Rh=([i,e,t])=>{let n=document.createElementNS("http://www.w3.org/2000/svg",i);return Object.keys(e).forEach(s=>{n.setAttribute(s,String(e[s]))}),t?.length&&t.forEach(s=>{let r=Rh(s);n.appendChild(r)}),n},$c=(i,e={})=>{let t="svg",n={...Ch,...e};return Rh([t,n,i])};var Yc=[["rect",{width:"20",height:"5",x:"2",y:"3",rx:"1"}],["path",{d:"M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"}],["path",{d:"M10 12h4"}]];var Kc=[["path",{d:"m12 19-7-7 7-7"}],["path",{d:"M19 12H5"}]];var jc=[["path",{d:"M5 12h14"}],["path",{d:"m12 5 7 7-7 7"}]];var Zc=[["path",{d:"M7 7h10v10"}],["path",{d:"M7 17 17 7"}]];var Jc=[["path",{d:"M12 5v16"}],["path",{d:"M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z"}]];var Qc=[["path",{d:"M20 6 9 17l-5-5"}]];var eu=[["path",{d:"m9 18 6-6-6-6"}]];var tu=[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"}],["path",{d:"M12 11h4"}],["path",{d:"M12 16h4"}],["path",{d:"M8 11h.01"}],["path",{d:"M8 16h.01"}]];var nu=[["path",{d:"M10 2v2"}],["path",{d:"M14 2v2"}],["path",{d:"M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"}],["path",{d:"M6 2v2"}]];var iu=[["path",{d:"M13.744 17.736a6 6 0 1 1-7.48-7.48"}],["path",{d:"M15 6h1v4"}],["path",{d:"m6.134 14.768.866-.5 2 3.464"}],["circle",{cx:"16",cy:"8",r:"6"}]];var su=[["path",{d:"M12 15V3"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["path",{d:"m7 10 5 5 5-5"}]];var ru=[["path",{d:"M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21"}],["path",{d:"m5.082 11.09 8.828 8.828"}]];var au=[["path",{d:"M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528"}]];var ou=[["circle",{cx:"12",cy:"12",r:"3"}],["path",{d:"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2"}]];var lu=[["path",{d:"m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9"}],["path",{d:"m18 15 4-4"}],["path",{d:"m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"}]];var go=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}]];var cu=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 16v-4"}],["path",{d:"M12 8h.01"}]];var uu=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4"}]];var du=[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"}],["circle",{cx:"12",cy:"10",r:"3"}]];var fu=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"}]];var hu=[["path",{d:"M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"}]];var pu=[["path",{d:"M12 2v20"}],["path",{d:"m15 19-3 3-3-3"}],["path",{d:"m19 9 3 3-3 3"}],["path",{d:"M2 12h20"}],["path",{d:"m5 9-3 3 3 3"}],["path",{d:"m9 5 3-3 3 3"}]];var mu=[["path",{d:"M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z"}]];var gu=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]];var xu=[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}]];var _u=[["circle",{cx:"6",cy:"19",r:"3"}],["path",{d:"M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"}],["circle",{cx:"18",cy:"5",r:"3"}]];var yu=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"}],["circle",{cx:"12",cy:"12",r:"3"}]];var xo=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"}],["path",{d:"M20 2v4"}],["path",{d:"M22 4h-4"}],["circle",{cx:"4",cy:"20",r:"2"}]];var vu=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"}]];var bu=[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 2v2"}],["path",{d:"M12 20v2"}],["path",{d:"m4.93 4.93 1.41 1.41"}],["path",{d:"m17.66 17.66 1.41 1.41"}],["path",{d:"M2 12h2"}],["path",{d:"M20 12h2"}],["path",{d:"m6.34 17.66-1.41 1.41"}],["path",{d:"m19.07 4.93-1.41 1.41"}]];var Su=[["path",{d:"M12 10V2"}],["path",{d:"m4.93 10.93 1.41 1.41"}],["path",{d:"M2 18h2"}],["path",{d:"M20 18h2"}],["path",{d:"m19.07 10.93-1.41 1.41"}],["path",{d:"M22 22H2"}],["path",{d:"m16 6-4 4-4-4"}],["path",{d:"M16 18a4 4 0 0 0-8 0"}]];var Mu=[["path",{d:"M8 19a4 4 0 0 1-2.24-7.32A3.5 3.5 0 0 1 9 6.03V6a3 3 0 1 1 6 0v.04a3.5 3.5 0 0 1 3.24 5.65A4 4 0 0 1 16 19Z"}],["path",{d:"M12 19v3"}]];var wu=[["path",{d:"M12 3v12"}],["path",{d:"m17 8-5-5-5 5"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}]];var Tu=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"}],["path",{d:"M16 9a5 5 0 0 1 0 6"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728"}]];var Au=[["path",{d:"M11 4.702a.7.7 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.7.7 0 0 0 11 19.298z"}],["path",{d:"m16.5 14.5 5-5"}],["path",{d:"m16.5 9.5 5 5"}]];var Eu=[["path",{d:"M2 22 16 8"}],["path",{d:"M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"}],["path",{d:"M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"}],["path",{d:"M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"}],["path",{d:"M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z"}],["path",{d:"M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"}],["path",{d:"M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"}],["path",{d:"M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"}]];var Cu=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];var Ru=[["circle",{cx:"11",cy:"11",r:"8"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65"}],["line",{x1:"11",x2:"11",y1:"8",y2:"14"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11"}]];var Pu=[["circle",{cx:"11",cy:"11",r:"8"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11"}]];function Jr(i){i=Math.floor(i||0);let e=Math.abs(i);return e<1e3?String(i):e<1e6?e<1e4?(i/1e3).toFixed(1)+"K":Math.round(i/1e3)+"K":e<1e9?e<1e7?(i/1e6).toFixed(2)+"M":Math.round(i/1e6)+"M":(i/1e9).toFixed(2)+"B"}async function Ph(){try{let e=await(await fetch("/api/usage",{cache:"no-store"})).json(),t=(e.projects||[]).map(n=>({id:n.id||n.name,name:n.name,provider:n.provider||"claude",tokens:Math.max(0,Math.floor(n.tokens||0)),...n.legacyId?{legacyId:n.legacyId}:{}}));return{source:e.source,projects:t,totals:e.totals}}catch(i){return{source:"error",projects:[],error:String(i)}}}function Qr(i,e,t){let n=it[t.kind],s=t.placed&&!!e.buildings[t.id]?.connected,r={active:s,cells:[],homes:[]};if(!t.placed||!n.service&&t.kind!=="park")return r;let a=Nt(t),o=fs(e.connectedRoads,He(a.x,a.z));if(t.kind==="park"){let{w:c,d:l}=jt(t);if(s)for(let u=Math.max(0,t.z-3);u<Math.min(i.size,t.z+l+3);u++)for(let d=Math.max(0,t.x-3);d<Math.min(i.size,t.x+c+3);d++)Math.max(0,t.x-d,d-(t.x+c-1))+Math.max(0,t.z-u,u-(t.z+l-1))<=3&&!Rn(i,d,u)&&r.cells.push({x:d,z:u})}else s&&(r.cells=[...o].filter(([,c])=>c<=n.range).map(([c])=>zn(c)));for(let c of i.buildings.filter(l=>l.placed&&l.kind==="house")){let l=e.buildings[c.id],u=Nt(c),d=t.kind==="park"?Hr(c,t):o.get(He(u.x,u.z));d===void 0||d>(t.kind==="park"?3:n.range)||r.homes.push({home:c,distance:d,connected:!!l?.connected,served:s&&!!l?.connected&&(t.kind==="park"||l?.[n.service]===t.id)})}return r.homes.sort((c,l)=>c.distance-l.distance||c.home.id.localeCompare(l.home.id,"en")),r}function _o(i){return`${it[i.kind].name} \xB7 \u6A2A ${i.x+1} / \u7EB5 ${i.z+1}`}function Iu(i,e,t,n){let s=e.buildings[t.id];if(!s?.connected)return"\u4F4F\u5B85\u95E8\u53E3\u7684\u9053\u8DEF\u5C1A\u672A\u8FDE\u5230\u9547\u516C\u6240";if(n!=="green"&&s[n]){let d=i.buildings.find(f=>f.id===s[n]);return`${it[d.kind].name} \xB7 \u6B65\u884C ${s[`${n}Distance`]} \u683C`}if(n==="green"&&s.green)return"\u5DF2\u5728\u8FDE\u8DEF\u516C\u56ED\u7684\u4E09\u683C\u8303\u56F4\u5185";let r=i.buildings.filter(d=>d.placed&&(n==="green"?d.kind==="park":it[d.kind].service===n));if(!r.length)return n==="green"?"\u8FD8\u6CA1\u6709\u516C\u56ED\uFF0C\u9700\u5728\u4F4F\u5B85\u4E09\u683C\u5185\u5E03\u7F6E":`\u8FD8\u6CA1\u6709${n==="food"?"\u98DF\u7269":"\u4F11\u95F2"}\u5546\u5E97`;if(n==="green")return r.some(d=>Hr(t,d)<=3)?"\u9644\u8FD1\u516C\u56ED\u5165\u53E3\u5C1A\u672A\u8FDE\u8DEF\uFF0C\u7EFF\u5730\u672A\u751F\u6548":`\u6700\u8FD1\u516C\u56ED\u8DDD\u79BB ${Math.min(...r.map(d=>Hr(t,d)))} \u683C\uFF0C\u9700\u4E0D\u8D85\u8FC7 3 \u683C`;let a=r.filter(d=>e.buildings[d.id]?.connected);if(!a.length)return"\u5546\u5E97\u5165\u53E3\u5C1A\u672A\u8FDE\u5230\u9547\u516C\u6240";let o=Nt(t),c=fs(e.connectedRoads,He(o.x,o.z)),l=a.map(d=>({b:d,distance:c.get(He(Nt(d).x,Nt(d).z))}));if(l.some(({b:d,distance:f})=>f<=it[d.kind].range))return"\u8303\u56F4\u5185\u5546\u5E97\u7684\u5BB9\u91CF\u5DF2\u6EE1\uFF0C\u53EF\u642C\u8FD1\u5176\u4ED6\u5546\u5E97\u6216\u65B0\u589E\u4E00\u5BB6";l.sort((d,f)=>d.distance-it[d.b.kind].range-(f.distance-it[f.b.kind].range)||d.b.id.localeCompare(f.b.id,"en"));let u=l[0];return`${it[u.b.kind].name}\u9700\u8D70 ${u.distance} \u683C\uFF0C\u8D85\u8FC7 ${it[u.b.kind].range} \u683C\u8303\u56F4`}function Lu(i,e,t){if(i===4)return"\u76EE\u6807\u6309\u4E24\u5CB8\u83B7\u5F97\u670D\u52A1\u7684\u4F4F\u5B85\u8BA1\u7B97\uFF0C\u70B9\u51FB\u59D4\u6258\u67E5\u770B\u8BE6\u60C5";let n=[4,6,8,6,12,16][i-1],s=e.buildings.filter(r=>r.placed&&r.kind==="house").length;return s<n?`\u5DF2\u6446\u653E ${s} \u680B\u4F4F\u5B85\uFF0C\u8FD8\u9700\u81F3\u5C11 ${n-s} \u680B\uFF1B\u52A0\u5546\u5E97\u4E0D\u4F1A\u589E\u52A0\u4F4F\u5B85\u6570\u91CF`:t.houses<n?`${s-t.houses} \u680B\u4F4F\u5B85\u672A\u8FDE\u8DEF\uFF0C\u5148\u63A5\u901A\u95E8\u53E3\u5230\u9547\u516C\u6240`:t.food<n?"\u4F4F\u5B85\u98DF\u7269\u5C1A\u672A\u6EE1\u8DB3\uFF1A\u67E5\u770B\u5546\u5E97\u8FDE\u8DEF\u3001\u6B65\u884C\u8303\u56F4\u4E0E\u5BB9\u91CF":i===2&&t.green<4?"\u98DF\u7269\u5DF2\u6EE1\u8DB3\uFF0C\u9700\u8BA9\u56DB\u680B\u4F4F\u5B85\u8FDB\u5165\u8FDE\u8DEF\u516C\u56ED\u7684\u4E09\u683C\u8303\u56F4":i>=3&&t.leisure<(i===3?6:n)?"\u4F4F\u5B85\u8FD8\u7F3A\u4F11\u95F2\uFF1A\u67E5\u770B\u5496\u5561\u9986\u7B49\u8BBE\u65BD\u7684\u6B65\u884C\u8303\u56F4\u4E0E\u5BB9\u91CF":i>=5&&t.green<n?"\u4F4F\u5B85\u8FD8\u7F3A\u7EFF\u5730\uFF1A\u516C\u56ED\u9700\u8FDE\u8DEF\uFF0C\u6700\u8FD1\u8FB9\u7F18\u8DDD\u79BB\u4E0D\u8D85\u8FC7\u4E09\u683C":"\u76EE\u6807\u6309\u83B7\u5F97\u670D\u52A1\u7684\u4F4F\u5B85\u8BA1\u7B97\uFF0C\u540C\u4E00\u9700\u6C42\u6BCF\u680B\u53EA\u8BA1\u4E00\u6B21"}var Al="186",xn={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},ns={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Sp=0,Md=1,Mp=2;var Ps=1,wp=2,Ar=3,di=0,dn=1,nn=2,fi=0,Er=1,wd=2,Td=3,Ad=4,Tp=5;var Is=100,Ap=101,Ep=102,Cp=103,Rp=104,Pp=200,Ip=201,Lp=202,Dp=203,Ed=204,Cd=205,Np=206,Up=207,Fp=208,Op=209,Bp=210,kp=211,zp=212,Gp=213,Vp=214,Ko=0,jo=1,Zo=2,rr=3,Jo=4,Qo=5,el=6,tl=7,Rd=0,Hp=1,Wp=2,jn=0,Pd=1,Id=2,Ld=3,Va=4,Dd=5,Nd=6,Ud=7,ad="attached",Xp="detached",Fd=300,is=301,Ls=302,El=303,Cl=304,Ha=306,ji=1e3,Dn=1001,ar=1002,Ft=1003,Rl=1004;var Ds=1005;var Ot=1006,Cr=1007;var Zn=1008;var _n=1009,Od=1010,Bd=1011,Rr=1012,Pl=1013,Jn=1014,An=1015,Qn=1016,Il=1017,Ll=1018,Pr=1020,kd=35902,zd=35899,Gd=1021,Vd=1022,En=1023,ri=1026,ss=1027,Dl=1028,Nl=1029,rs=1030,Ul=1031;var Fl=1033,Wa=33776,Xa=33777,qa=33778,$a=33779,Ol=35840,Bl=35841,kl=35842,zl=35843,Gl=36196,Vl=37492,Hl=37496,Wl=37488,Xl=37489,Ya=37490,ql=37491,$l=37808,Yl=37809,Kl=37810,jl=37811,Zl=37812,Jl=37813,Ql=37814,ec=37815,tc=37816,nc=37817,ic=37818,sc=37819,rc=37820,ac=37821,oc=36492,lc=36494,cc=36495,uc=36283,dc=36284,Ka=36285,fc=36286;var bs=2300,Ss=2301,qo=2302,od=2303,ld=2400,cd=2401,ud=2402,qp=2500;var Hd=0,ja=1,Ir=2,$p=3200;var hc=0,Yp=1,Fi="",Ut="srgb",cn="srgb-linear",ha="linear",xt="srgb";var $o=7680;var Kp=519,jp=512,Zp=513,Jp=514,pc=515,Qp=516,em=517,mc=518,tm=519,Wd=35044;var Xd="300 es",Xn=2e3,or=2001;function Lg(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Dg(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function lr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function nm(){let i=lr("canvas");return i.style.display="block",i}var Ih={},cr=null;function pa(...i){let e="THREE."+i.shift();cr?cr("log",e,...i):console.log(e,...i)}function im(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function De(...i){i=im(i);let e="THREE."+i.shift();if(cr)cr("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function We(...i){i=im(i);let e="THREE."+i.shift();if(cr)cr("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function vs(...i){let e=i.join(" ");e in Ih||(Ih[e]=!0,De(...i))}function sm(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var rm={[Ko]:jo,[Zo]:el,[Jo]:tl,[rr]:Qo,[jo]:Ko,[el]:Zo,[tl]:Jo,[Qo]:rr},qn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},Zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Lh=1234567,ca=Math.PI/180,Ms=180/Math.PI;function Nn(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Zt[i&255]+Zt[i>>8&255]+Zt[i>>16&255]+Zt[i>>24&255]+"-"+Zt[e&255]+Zt[e>>8&255]+"-"+Zt[e>>16&15|64]+Zt[e>>24&255]+"-"+Zt[t&63|128]+Zt[t>>8&255]+"-"+Zt[t>>16&255]+Zt[t>>24&255]+Zt[n&255]+Zt[n>>8&255]+Zt[n>>16&255]+Zt[n>>24&255]).toLowerCase()}function Je(i,e,t){return Math.max(e,Math.min(t,i))}function qd(i,e){return(i%e+e)%e}function Ng(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Ug(i,e,t){return i!==e?(t-i)/(e-i):0}function ua(i,e,t){return(1-t)*i+t*e}function Fg(i,e,t,n){return ua(i,e,1-Math.exp(-t*n))}function Og(i,e=1){return e-Math.abs(qd(i,e*2)-e)}function Bg(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function kg(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function zg(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Gg(i,e){return i+Math.random()*(e-i)}function Vg(i){return i*(.5-Math.random())}function Hg(i){i!==void 0&&(Lh=i);let e=Lh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Wg(i){return i*ca}function Xg(i){return i*Ms}function qg(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function $g(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Yg(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Kg(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),u=a((e+n)/2),d=r((e-n)/2),f=a((e-n)/2),h=r((n-e)/2),p=a((n-e)/2);switch(s){case"XYX":i.set(o*u,c*d,c*f,o*l);break;case"YZY":i.set(c*f,o*u,c*d,o*l);break;case"ZXZ":i.set(c*d,c*f,o*u,o*l);break;case"XZX":i.set(o*u,c*p,c*h,o*l);break;case"YXY":i.set(c*h,o*u,c*p,o*l);break;case"ZYZ":i.set(c*p,c*h,o*u,o*l);break;default:De("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Wn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function vt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var as={DEG2RAD:ca,RAD2DEG:Ms,generateUUID:Nn,clamp:Je,euclideanModulo:qd,mapLinear:Ng,inverseLerp:Ug,lerp:ua,damp:Fg,pingpong:Og,smoothstep:Bg,smootherstep:kg,randInt:zg,randFloat:Gg,randFloatSpread:Vg,seededRandom:Hg,degToRad:Wg,radToDeg:Xg,isPowerOfTwo:qg,ceilPowerOfTwo:$g,floorPowerOfTwo:Yg,setQuaternionFromProperEuler:Kg,normalize:vt,denormalize:Wn},re=class i{static{i.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Qt=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],u=n[s+2],d=n[s+3],f=r[a+0],h=r[a+1],p=r[a+2],x=r[a+3];if(d!==x||c!==f||l!==h||u!==p){let g=c*f+l*h+u*p+d*x;g<0&&(f=-f,h=-h,p=-p,x=-x,g=-g);let m=1-o;if(g<.9995){let b=Math.acos(g),A=Math.sin(b);m=Math.sin(m*b)/A,o=Math.sin(o*b)/A,c=c*m+f*o,l=l*m+h*o,u=u*m+p*o,d=d*m+x*o}else{c=c*m+f*o,l=l*m+h*o,u=u*m+p*o,d=d*m+x*o;let b=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=b,l*=b,u*=b,d*=b}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],c=n[s+1],l=n[s+2],u=n[s+3],d=r[a],f=r[a+1],h=r[a+2],p=r[a+3];return e[t]=o*p+u*d+c*h-l*f,e[t+1]=c*p+u*f+l*d-o*h,e[t+2]=l*p+u*h+o*f-c*d,e[t+3]=u*p-o*d-c*f-l*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(s/2),d=o(r/2),f=c(n/2),h=c(s/2),p=c(r/2);switch(a){case"XYZ":this._x=f*u*d+l*h*p,this._y=l*h*d-f*u*p,this._z=l*u*p+f*h*d,this._w=l*u*d-f*h*p;break;case"YXZ":this._x=f*u*d+l*h*p,this._y=l*h*d-f*u*p,this._z=l*u*p-f*h*d,this._w=l*u*d+f*h*p;break;case"ZXY":this._x=f*u*d-l*h*p,this._y=l*h*d+f*u*p,this._z=l*u*p+f*h*d,this._w=l*u*d-f*h*p;break;case"ZYX":this._x=f*u*d-l*h*p,this._y=l*h*d+f*u*p,this._z=l*u*p-f*h*d,this._w=l*u*d+f*h*p;break;case"YZX":this._x=f*u*d+l*h*p,this._y=l*h*d+f*u*p,this._z=l*u*p-f*h*d,this._w=l*u*d-f*h*p;break;case"XZY":this._x=f*u*d-l*h*p,this._y=l*h*d-f*u*p,this._z=l*u*p+f*h*d,this._w=l*u*d+f*h*p;break;default:De("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],d=t[10],f=n+o+d;if(f>0){let h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-c)*h,this._y=(r-l)*h,this._z=(a-s)*h}else if(n>o&&n>d){let h=2*Math.sqrt(1+n-o-d);this._w=(u-c)/h,this._x=.25*h,this._y=(s+a)/h,this._z=(r+l)/h}else if(o>d){let h=2*Math.sqrt(1+o-n-d);this._w=(r-l)/h,this._x=(s+a)/h,this._y=.25*h,this._z=(c+u)/h}else{let h=2*Math.sqrt(1+d-n-o);this._w=(a-s)/h,this._x=(r+l)/h,this._y=(c+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Je(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+a*o+s*l-r*c,this._y=s*u+a*c+r*o-n*l,this._z=r*u+a*l+n*c-s*o,this._w=a*u-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){let l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},L=class i{static{i.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Dh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Dh.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),u=2*(o*t-r*s),d=2*(r*n-a*t);return this.x=t+c*l+a*d-o*u,this.y=n+c*u+o*l-r*d,this.z=s+c*d+r*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this.z=Je(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this.z=Je(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Du.copy(this).projectOnVector(e),this.sub(Du)}reflect(e){return this.sub(Du.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Du=new L,Dh=new Qt,Ke=class i{static{i.prototype.isMatrix3=!0}constructor(e,t,n,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){let u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],d=n[7],f=n[2],h=n[5],p=n[8],x=s[0],g=s[3],m=s[6],b=s[1],A=s[4],_=s[7],w=s[2],T=s[5],C=s[8];return r[0]=a*x+o*b+c*w,r[3]=a*g+o*A+c*T,r[6]=a*m+o*_+c*C,r[1]=l*x+u*b+d*w,r[4]=l*g+u*A+d*T,r[7]=l*m+u*_+d*C,r[2]=f*x+h*b+p*w,r[5]=f*g+h*A+p*T,r[8]=f*m+h*_+p*C,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-n*r*u+n*o*c+s*r*l-s*a*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=u*a-o*l,f=o*c-u*r,h=l*r-a*c,p=t*d+n*f+s*h;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/p;return e[0]=d*x,e[1]=(s*l-u*n)*x,e[2]=(o*n-s*a)*x,e[3]=f*x,e[4]=(u*t-s*c)*x,e[5]=(s*r-o*t)*x,e[6]=h*x,e[7]=(n*c-l*t)*x,e[8]=(a*t-n*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return vs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Nu.makeScale(e,t)),this}rotate(e){return vs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Nu.makeRotation(-e)),this}translate(e,t){return vs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Nu.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Nu=new Ke,Nh=new Ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Uh=new Ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function jg(){let i={enabled:!0,workingColorSpace:cn,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===xt&&(s.r=Ti(s.r),s.g=Ti(s.g),s.b=Ti(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===xt&&(s.r=sr(s.r),s.g=sr(s.g),s.b=sr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Fi?ha:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return vs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return vs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[cn]:{primaries:e,whitePoint:n,transfer:ha,toXYZ:Nh,fromXYZ:Uh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Ut},outputColorSpaceConfig:{drawingBufferColorSpace:Ut}},[Ut]:{primaries:e,whitePoint:n,transfer:xt,toXYZ:Nh,fromXYZ:Uh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Ut}}}),i}var nt=jg();function Ti(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function sr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Ws,nl=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ws===void 0&&(Ws=lr("canvas")),Ws.width=e.width,Ws.height=e.height;let s=Ws.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Ws}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=lr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Ti(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ti(t[n]/255)*255):t[n]=Ti(t[n]);return{data:t,width:e.width,height:e.height}}else return De("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Zg=0,ur=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Zg++}),this.uuid=Nn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Uu(s[a].image)):r.push(Uu(s[a]))}else r=Uu(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function Uu(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?nl.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(De("Texture: Unable to serialize Texture."),{})}var Jg=0,Fu=new L,$t=class i extends qn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Dn,s=Dn,r=Ot,a=Zn,o=En,c=_n,l=i.DEFAULT_ANISOTROPY,u=Fi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Jg++}),this.uuid=Nn(),this.name="",this.source=new ur(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new re(0,0),this.repeat=new re(1,1),this.center=new re(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Fu).x}get height(){return this.source.getSize(Fu).y}get depth(){return this.source.getSize(Fu).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){De(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){De(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Fd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ji:e.x=e.x-Math.floor(e.x);break;case Dn:e.x=e.x<0?0:1;break;case ar:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ji:e.y=e.y-Math.floor(e.y);break;case Dn:e.y=e.y<0?0:1;break;case ar:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};$t.DEFAULT_IMAGE=null;$t.DEFAULT_MAPPING=Fd;$t.DEFAULT_ANISOTROPY=1;var bt=class i{static{i.prototype.isVector4=!0}constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,l=c[0],u=c[4],d=c[8],f=c[1],h=c[5],p=c[9],x=c[2],g=c[6],m=c[10];if(Math.abs(u-f)<.01&&Math.abs(d-x)<.01&&Math.abs(p-g)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+x)<.1&&Math.abs(p+g)<.1&&Math.abs(l+h+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let A=(l+1)/2,_=(h+1)/2,w=(m+1)/2,T=(u+f)/4,C=(d+x)/4,y=(p+g)/4;return A>_&&A>w?A<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(A),s=T/n,r=C/n):_>w?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=T/s,r=y/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=C/r,s=y/r),this.set(n,s,r,t),this}let b=Math.sqrt((g-p)*(g-p)+(d-x)*(d-x)+(f-u)*(f-u));return Math.abs(b)<.001&&(b=1),this.x=(g-p)/b,this.y=(d-x)/b,this.z=(f-u)/b,this.w=Math.acos((l+h+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this.z=Je(this.z,e.z,t.z),this.w=Je(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this.z=Je(this.z,e,t),this.w=Je(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},il=class extends qn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ot,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new bt(0,0,e,t),this.scissorTest=!1,this.viewport=new bt(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:n.depth},r=new $t(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Ot,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new ur(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},en=class extends il{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},ma=class extends $t{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ft,this.minFilter=Ft,this.wrapR=Dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var sl=class extends $t{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ft,this.minFilter=Ft,this.wrapR=Dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var Ye=class i{static{i.prototype.isMatrix4=!0}constructor(e,t,n,s,r,a,o,c,l,u,d,f,h,p,x,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,u,d,f,h,p,x,g)}set(e,t,n,s,r,a,o,c,l,u,d,f,h,p,x,g){let m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=c,m[2]=l,m[6]=u,m[10]=d,m[14]=f,m[3]=h,m[7]=p,m[11]=x,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/Xs.setFromMatrixColumn(e,0).length(),r=1/Xs.setFromMatrixColumn(e,1).length(),a=1/Xs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let f=a*u,h=a*d,p=o*u,x=o*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=h+p*l,t[5]=f-x*l,t[9]=-o*c,t[2]=x-f*l,t[6]=p+h*l,t[10]=a*c}else if(e.order==="YXZ"){let f=c*u,h=c*d,p=l*u,x=l*d;t[0]=f+x*o,t[4]=p*o-h,t[8]=a*l,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=h*o-p,t[6]=x+f*o,t[10]=a*c}else if(e.order==="ZXY"){let f=c*u,h=c*d,p=l*u,x=l*d;t[0]=f-x*o,t[4]=-a*d,t[8]=p+h*o,t[1]=h+p*o,t[5]=a*u,t[9]=x-f*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let f=a*u,h=a*d,p=o*u,x=o*d;t[0]=c*u,t[4]=p*l-h,t[8]=f*l+x,t[1]=c*d,t[5]=x*l+f,t[9]=h*l-p,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let f=a*c,h=a*l,p=o*c,x=o*l;t[0]=c*u,t[4]=x-f*d,t[8]=p*d+h,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=h*d+p,t[10]=f-x*d}else if(e.order==="XZY"){let f=a*c,h=a*l,p=o*c,x=o*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=f*d+x,t[5]=a*u,t[9]=h*d-p,t[2]=p*d-h,t[6]=o*u,t[10]=x*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Qg,e,ex)}lookAt(e,t,n){let s=this.elements;return vn.subVectors(e,t),vn.lengthSq()===0&&(vn.z=1),vn.normalize(),Hi.crossVectors(n,vn),Hi.lengthSq()===0&&(Math.abs(n.z)===1?vn.x+=1e-4:vn.z+=1e-4,vn.normalize(),Hi.crossVectors(n,vn)),Hi.normalize(),yo.crossVectors(vn,Hi),s[0]=Hi.x,s[4]=yo.x,s[8]=vn.x,s[1]=Hi.y,s[5]=yo.y,s[9]=vn.y,s[2]=Hi.z,s[6]=yo.z,s[10]=vn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],d=n[5],f=n[9],h=n[13],p=n[2],x=n[6],g=n[10],m=n[14],b=n[3],A=n[7],_=n[11],w=n[15],T=s[0],C=s[4],y=s[8],S=s[12],E=s[1],D=s[5],F=s[9],N=s[13],I=s[2],U=s[6],z=s[10],V=s[14],Z=s[3],q=s[7],J=s[11],ie=s[15];return r[0]=a*T+o*E+c*I+l*Z,r[4]=a*C+o*D+c*U+l*q,r[8]=a*y+o*F+c*z+l*J,r[12]=a*S+o*N+c*V+l*ie,r[1]=u*T+d*E+f*I+h*Z,r[5]=u*C+d*D+f*U+h*q,r[9]=u*y+d*F+f*z+h*J,r[13]=u*S+d*N+f*V+h*ie,r[2]=p*T+x*E+g*I+m*Z,r[6]=p*C+x*D+g*U+m*q,r[10]=p*y+x*F+g*z+m*J,r[14]=p*S+x*N+g*V+m*ie,r[3]=b*T+A*E+_*I+w*Z,r[7]=b*C+A*D+_*U+w*q,r[11]=b*y+A*F+_*z+w*J,r[15]=b*S+A*N+_*V+w*ie,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],d=e[6],f=e[10],h=e[14],p=e[3],x=e[7],g=e[11],m=e[15],b=c*h-l*f,A=o*h-l*d,_=o*f-c*d,w=a*h-l*u,T=a*f-c*u,C=a*d-o*u;return t*(x*b-g*A+m*_)-n*(p*b-g*w+m*T)+s*(p*A-x*w+m*C)-r*(p*_-x*T+g*C)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],c=e[2],l=e[6],u=e[10];return t*(a*u-o*l)-n*(r*u-o*c)+s*(r*l-a*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=e[9],f=e[10],h=e[11],p=e[12],x=e[13],g=e[14],m=e[15],b=t*o-n*a,A=t*c-s*a,_=t*l-r*a,w=n*c-s*o,T=n*l-r*o,C=s*l-r*c,y=u*x-d*p,S=u*g-f*p,E=u*m-h*p,D=d*g-f*x,F=d*m-h*x,N=f*m-h*g,I=b*N-A*F+_*D+w*E-T*S+C*y;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let U=1/I;return e[0]=(o*N-c*F+l*D)*U,e[1]=(s*F-n*N-r*D)*U,e[2]=(x*C-g*T+m*w)*U,e[3]=(f*T-d*C-h*w)*U,e[4]=(c*E-a*N-l*S)*U,e[5]=(t*N-s*E+r*S)*U,e[6]=(g*_-p*C-m*A)*U,e[7]=(u*C-f*_+h*A)*U,e[8]=(a*F-o*E+l*y)*U,e[9]=(n*E-t*F-r*y)*U,e[10]=(p*T-x*_+m*b)*U,e[11]=(d*_-u*T-h*b)*U,e[12]=(o*S-a*D-c*y)*U,e[13]=(t*D-n*S+s*y)*U,e[14]=(x*A-p*w-g*b)*U,e[15]=(u*w-d*A+f*b)*U,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,u=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,u*o+n,u*c-s*a,0,l*c-s*o,u*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,u=a+a,d=o+o,f=r*l,h=r*u,p=r*d,x=a*u,g=a*d,m=o*d,b=c*l,A=c*u,_=c*d,w=n.x,T=n.y,C=n.z;return s[0]=(1-(x+m))*w,s[1]=(h+_)*w,s[2]=(p-A)*w,s[3]=0,s[4]=(h-_)*T,s[5]=(1-(f+m))*T,s[6]=(g+b)*T,s[7]=0,s[8]=(p+A)*C,s[9]=(g-b)*C,s[10]=(1-(f+x))*C,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=Xs.set(s[0],s[1],s[2]).length(),o=Xs.set(s[4],s[5],s[6]).length(),c=Xs.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Gn.copy(this);let l=1/a,u=1/o,d=1/c;return Gn.elements[0]*=l,Gn.elements[1]*=l,Gn.elements[2]*=l,Gn.elements[4]*=u,Gn.elements[5]*=u,Gn.elements[6]*=u,Gn.elements[8]*=d,Gn.elements[9]*=d,Gn.elements[10]*=d,t.setFromRotationMatrix(Gn),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,s,r,a,o=Xn,c=!1){let l=this.elements,u=2*r/(t-e),d=2*r/(n-s),f=(t+e)/(t-e),h=(n+s)/(n-s),p,x;if(c)p=r/(a-r),x=a*r/(a-r);else if(o===Xn)p=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===or)p=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=d,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Xn,c=!1){let l=this.elements,u=2/(t-e),d=2/(n-s),f=-(t+e)/(t-e),h=-(n+s)/(n-s),p,x;if(c)p=1/(a-r),x=a/(a-r);else if(o===Xn)p=-2/(a-r),x=-(a+r)/(a-r);else if(o===or)p=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=d,l[9]=0,l[13]=h,l[2]=0,l[6]=0,l[10]=p,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Xs=new L,Gn=new Ye,Qg=new L(0,0,0),ex=new L(1,1,1),Hi=new L,yo=new L,vn=new L,Fh=new Ye,Oh=new Qt,Ai=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],u=s[9],d=s[2],f=s[6],h=s[10];switch(t){case"XYZ":this._y=Math.asin(Je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Je(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,h),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Je(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,h),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Je(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,h),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Je(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,h));break;case"XZY":this._z=Math.asin(-Je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,h),this._y=0);break;default:De("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Fh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Fh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Oh.setFromEuler(this),this.setFromQuaternion(Oh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Ai.DEFAULT_ORDER="XYZ";var dr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},tx=0,Bh=new L,qs=new Qt,yi=new Ye,vo=new L,ea=new L,nx=new L,ix=new Qt,kh=new L(1,0,0),zh=new L(0,1,0),Gh=new L(0,0,1),Vh={type:"added"},sx={type:"removed"},$s={type:"childadded",child:null},Ou={type:"childremoved",child:null},_t=class i extends qn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:tx++}),this.uuid=Nn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new L,t=new Ai,n=new Qt,s=new L(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ye},normalMatrix:{value:new Ke}}),this.matrix=new Ye,this.matrixWorld=new Ye,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new dr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return qs.setFromAxisAngle(e,t),this.quaternion.multiply(qs),this}rotateOnWorldAxis(e,t){return qs.setFromAxisAngle(e,t),this.quaternion.premultiply(qs),this}rotateX(e){return this.rotateOnAxis(kh,e)}rotateY(e){return this.rotateOnAxis(zh,e)}rotateZ(e){return this.rotateOnAxis(Gh,e)}translateOnAxis(e,t){return Bh.copy(e).applyQuaternion(this.quaternion),this.position.add(Bh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(kh,e)}translateY(e){return this.translateOnAxis(zh,e)}translateZ(e){return this.translateOnAxis(Gh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(yi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?vo.copy(e):vo.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),ea.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yi.lookAt(ea,vo,this.up):yi.lookAt(vo,ea,this.up),this.quaternion.setFromRotationMatrix(yi),s&&(yi.extractRotation(s.matrixWorld),qs.setFromRotationMatrix(yi),this.quaternion.premultiply(qs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(We("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Vh),$s.child=e,this.dispatchEvent($s),$s.child=null):We("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(sx),Ou.child=e,this.dispatchEvent(Ou),Ou.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),yi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),yi.multiply(e.parent.matrixWorld)),e.applyMatrix4(yi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Vh),$s.child=e,this.dispatchEvent($s),$s.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ea,e,nx),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ea,ix,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let d=c[l];r(e.shapes,d)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),d=a(e.shapes),f=a(e.skeletons),h=a(e.animations),p=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),h.length>0&&(n.animations=h),p.length>0&&(n.nodes=p)}return n.object=s,n;function a(o){let c=[];for(let l in o){let u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};_t.DEFAULT_UP=new L(0,1,0);_t.DEFAULT_MATRIX_AUTO_UPDATE=!0;_t.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var we=class extends _t{constructor(){super(),this.isGroup=!0,this.type="Group"}},rx={type:"move"},fr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new we,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new we,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new we,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let x of e.hand.values()){let g=t.getJointPose(x,n),m=this._getHandJoint(l,x);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],f=u.position.distanceTo(d.position),h=.02,p=.005;l.inputState.pinching&&f>h+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=h-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(rx)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new we;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},am={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Wi={h:0,s:0,l:0},bo={h:0,s:0,l:0};function Bu(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var be=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ut){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,nt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=nt.workingColorSpace){return this.r=e,this.g=t,this.b=n,nt.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=nt.workingColorSpace){if(e=qd(e,1),t=Je(t,0,1),n=Je(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Bu(a,r,e+1/3),this.g=Bu(a,r,e),this.b=Bu(a,r,e-1/3)}return nt.colorSpaceToWorking(this,s),this}setStyle(e,t=Ut){function n(r){r!==void 0&&parseFloat(r)<1&&De("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:De("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);De("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ut){let n=am[e.toLowerCase()];return n!==void 0?this.setHex(n,t):De("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ti(e.r),this.g=Ti(e.g),this.b=Ti(e.b),this}copyLinearToSRGB(e){return this.r=sr(e.r),this.g=sr(e.g),this.b=sr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ut){return nt.workingToColorSpace(Jt.copy(this),e),Math.round(Je(Jt.r*255,0,255))*65536+Math.round(Je(Jt.g*255,0,255))*256+Math.round(Je(Jt.b*255,0,255))}getHexString(e=Ut){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=nt.workingColorSpace){nt.workingToColorSpace(Jt.copy(this),t);let n=Jt.r,s=Jt.g,r=Jt.b,a=Math.max(n,s,r),o=Math.min(n,s,r),c,l,u=(o+a)/2;if(o===a)c=0,l=0;else{let d=a-o;switch(l=u<=.5?d/(a+o):d/(2-a-o),a){case n:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-n)/d+2;break;case r:c=(n-s)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=nt.workingColorSpace){return nt.workingToColorSpace(Jt.copy(this),t),e.r=Jt.r,e.g=Jt.g,e.b=Jt.b,e}getStyle(e=Ut){nt.workingToColorSpace(Jt.copy(this),e);let t=Jt.r,n=Jt.g,s=Jt.b;return e!==Ut?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Wi),this.setHSL(Wi.h+e,Wi.s+t,Wi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Wi),e.getHSL(bo);let n=ua(Wi.h,bo.h,t),s=ua(Wi.s,bo.s,t),r=ua(Wi.l,bo.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Jt=new be;be.NAMES=am;var ga=class i{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new be(e),this.near=t,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},hr=class extends _t{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ai,this.environmentIntensity=1,this.environmentRotation=new Ai,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Vn=new L,vi=new L,ku=new L,bi=new L,Ys=new L,Ks=new L,Hh=new L,zu=new L,Gu=new L,Vu=new L,Hu=new bt,Wu=new bt,Xu=new bt,Ki=class i{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Vn.subVectors(e,t),s.cross(Vn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Vn.subVectors(s,t),vi.subVectors(n,t),ku.subVectors(e,t);let a=Vn.dot(Vn),o=Vn.dot(vi),c=Vn.dot(ku),l=vi.dot(vi),u=vi.dot(ku),d=a*l-o*o;if(d===0)return r.set(0,0,0),null;let f=1/d,h=(l*c-o*u)*f,p=(a*u-o*c)*f;return r.set(1-h-p,p,h)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,bi)===null?!1:bi.x>=0&&bi.y>=0&&bi.x+bi.y<=1}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,bi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,bi.x),c.addScaledVector(a,bi.y),c.addScaledVector(o,bi.z),c)}static getInterpolatedAttribute(e,t,n,s,r,a){return Hu.setScalar(0),Wu.setScalar(0),Xu.setScalar(0),Hu.fromBufferAttribute(e,t),Wu.fromBufferAttribute(e,n),Xu.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Hu,r.x),a.addScaledVector(Wu,r.y),a.addScaledVector(Xu,r.z),a}static isFrontFacing(e,t,n,s){return Vn.subVectors(n,t),vi.subVectors(e,t),Vn.cross(vi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Vn.subVectors(this.c,this.b),vi.subVectors(this.a,this.b),Vn.cross(vi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;Ys.subVectors(s,n),Ks.subVectors(r,n),zu.subVectors(e,n);let c=Ys.dot(zu),l=Ks.dot(zu);if(c<=0&&l<=0)return t.copy(n);Gu.subVectors(e,s);let u=Ys.dot(Gu),d=Ks.dot(Gu);if(u>=0&&d<=u)return t.copy(s);let f=c*d-u*l;if(f<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(n).addScaledVector(Ys,a);Vu.subVectors(e,r);let h=Ys.dot(Vu),p=Ks.dot(Vu);if(p>=0&&h<=p)return t.copy(r);let x=h*l-c*p;if(x<=0&&l>=0&&p<=0)return o=l/(l-p),t.copy(n).addScaledVector(Ks,o);let g=u*p-h*d;if(g<=0&&d-u>=0&&h-p>=0)return Hh.subVectors(r,s),o=(d-u)/(d-u+(h-p)),t.copy(s).addScaledVector(Hh,o);let m=1/(g+x+f);return a=x*m,o=f*m,t.copy(n).addScaledVector(Ys,a).addScaledVector(Ks,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Sn=class{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Hn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Hn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Hn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Hn):Hn.fromBufferAttribute(r,a),Hn.applyMatrix4(e.matrixWorld),this.expandByPoint(Hn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),So.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),So.copy(n.boundingBox)),So.applyMatrix4(e.matrixWorld),this.union(So)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Hn),Hn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ta),Mo.subVectors(this.max,ta),js.subVectors(e.a,ta),Zs.subVectors(e.b,ta),Js.subVectors(e.c,ta),Xi.subVectors(Zs,js),qi.subVectors(Js,Zs),ms.subVectors(js,Js);let t=[0,-Xi.z,Xi.y,0,-qi.z,qi.y,0,-ms.z,ms.y,Xi.z,0,-Xi.x,qi.z,0,-qi.x,ms.z,0,-ms.x,-Xi.y,Xi.x,0,-qi.y,qi.x,0,-ms.y,ms.x,0];return!qu(t,js,Zs,Js,Mo)||(t=[1,0,0,0,1,0,0,0,1],!qu(t,js,Zs,Js,Mo))?!1:(wo.crossVectors(Xi,qi),t=[wo.x,wo.y,wo.z],qu(t,js,Zs,Js,Mo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Hn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Hn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Si),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Si=[new L,new L,new L,new L,new L,new L,new L,new L],Hn=new L,So=new Sn,js=new L,Zs=new L,Js=new L,Xi=new L,qi=new L,ms=new L,ta=new L,Mo=new L,wo=new L,gs=new L;function qu(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){gs.fromArray(i,r);let o=s.x*Math.abs(gs.x)+s.y*Math.abs(gs.y)+s.z*Math.abs(gs.z),c=e.dot(gs),l=t.dot(gs),u=n.dot(gs);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}var zt=new L,To=new re,ax=0,Gt=class extends qn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ax++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Wd,this.updateRanges=[],this.gpuType=An,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)To.fromBufferAttribute(this,t),To.applyMatrix3(e),this.setXY(t,To.x,To.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyMatrix3(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyMatrix4(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyNormalMatrix(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.transformDirection(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Wn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=vt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Wn(t,this.array)),t}setX(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Wn(t,this.array)),t}setY(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Wn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Wn(t,this.array)),t}setW(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=vt(t,this.array),n=vt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=vt(t,this.array),n=vt(n,this.array),s=vt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=vt(t,this.array),n=vt(n,this.array),s=vt(s,this.array),r=vt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var xa=class extends Gt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var _a=class extends Gt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var et=class extends Gt{constructor(e,t,n){super(new Float32Array(e),t,n)}},ox=new Sn,na=new L,$u=new L,hn=class{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):ox.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;na.subVectors(e,this.center);let t=na.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(na,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):($u.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(na.copy(e.center).add($u)),this.expandByPoint(na.copy(e.center).sub($u))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},lx=0,Ln=new Ye,Yu=new _t,Qs=new L,bn=new Sn,ia=new Sn,Xt=new L,ft=class i extends qn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:lx++}),this.uuid=Nn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Lg(e)?_a:xa)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ke().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Ln.makeRotationFromQuaternion(e),this.applyMatrix4(Ln),this}rotateX(e){return Ln.makeRotationX(e),this.applyMatrix4(Ln),this}rotateY(e){return Ln.makeRotationY(e),this.applyMatrix4(Ln),this}rotateZ(e){return Ln.makeRotationZ(e),this.applyMatrix4(Ln),this}translate(e,t,n){return Ln.makeTranslation(e,t,n),this.applyMatrix4(Ln),this}scale(e,t,n){return Ln.makeScale(e,t,n),this.applyMatrix4(Ln),this}lookAt(e){return Yu.lookAt(e),Yu.updateMatrix(),this.applyMatrix4(Yu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Qs).negate(),this.translate(Qs.x,Qs.y,Qs.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new et(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&De("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Sn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){We("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];bn.setFromBufferAttribute(r),this.morphTargetsRelative?(Xt.addVectors(this.boundingBox.min,bn.min),this.boundingBox.expandByPoint(Xt),Xt.addVectors(this.boundingBox.max,bn.max),this.boundingBox.expandByPoint(Xt)):(this.boundingBox.expandByPoint(bn.min),this.boundingBox.expandByPoint(bn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&We('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new hn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){We("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){let n=this.boundingSphere.center;if(bn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];ia.setFromBufferAttribute(o),this.morphTargetsRelative?(Xt.addVectors(bn.min,ia.min),bn.expandByPoint(Xt),Xt.addVectors(bn.max,ia.max),bn.expandByPoint(Xt)):(bn.expandByPoint(ia.min),bn.expandByPoint(ia.max))}bn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Xt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Xt));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)Xt.fromBufferAttribute(o,l),c&&(Qs.fromBufferAttribute(e,l),Xt.add(Qs)),s=Math.max(s,n.distanceToSquared(Xt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&We('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){We("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Gt(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],c=[];for(let y=0;y<n.count;y++)o[y]=new L,c[y]=new L;let l=new L,u=new L,d=new L,f=new re,h=new re,p=new re,x=new L,g=new L;function m(y,S,E){l.fromBufferAttribute(n,y),u.fromBufferAttribute(n,S),d.fromBufferAttribute(n,E),f.fromBufferAttribute(r,y),h.fromBufferAttribute(r,S),p.fromBufferAttribute(r,E),u.sub(l),d.sub(l),h.sub(f),p.sub(f);let D=1/(h.x*p.y-p.x*h.y);isFinite(D)&&(x.copy(u).multiplyScalar(p.y).addScaledVector(d,-h.y).multiplyScalar(D),g.copy(d).multiplyScalar(h.x).addScaledVector(u,-p.x).multiplyScalar(D),o[y].add(x),o[S].add(x),o[E].add(x),c[y].add(g),c[S].add(g),c[E].add(g))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let y=0,S=b.length;y<S;++y){let E=b[y],D=E.start,F=E.count;for(let N=D,I=D+F;N<I;N+=3)m(e.getX(N+0),e.getX(N+1),e.getX(N+2))}let A=new L,_=new L,w=new L,T=new L;function C(y){w.fromBufferAttribute(s,y),T.copy(w);let S=o[y];A.copy(S),A.sub(w.multiplyScalar(w.dot(S))).normalize(),_.crossVectors(T,S);let D=_.dot(c[y])<0?-1:1;a.setXYZW(y,A.x,A.y,A.z,D)}for(let y=0,S=b.length;y<S;++y){let E=b[y],D=E.start,F=E.count;for(let N=D,I=D+F;N<I;N+=3)C(e.getX(N+0)),C(e.getX(N+1)),C(e.getX(N+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Gt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,h=n.count;f<h;f++)n.setXYZ(f,0,0,0);let s=new L,r=new L,a=new L,o=new L,c=new L,l=new L,u=new L,d=new L;if(e)for(let f=0,h=e.count;f<h;f+=3){let p=e.getX(f+0),x=e.getX(f+1),g=e.getX(f+2);s.fromBufferAttribute(t,p),r.fromBufferAttribute(t,x),a.fromBufferAttribute(t,g),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),o.fromBufferAttribute(n,p),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,g),o.add(u),c.add(u),l.add(u),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let f=0,h=t.count;f<h;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Xt.fromBufferAttribute(e,t),Xt.normalize(),e.setXYZ(t,Xt.x,Xt.y,Xt.z)}toNonIndexed(){function e(o,c){let l=o.array,u=o.itemSize,d=o.normalized,f=new l.constructor(c.length*u),h=0,p=0;for(let x=0,g=c.length;x<g;x++){o.isInterleavedBufferAttribute?h=c[x]*o.data.stride+o.offset:h=c[x]*u;for(let m=0;m<u;m++)f[p++]=l[h++]}return new Gt(f,u,d)}if(this.index===null)return De("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let c=s[o],l=e(c,n);t.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let u=0,d=l.length;u<d;u++){let f=l[u],h=e(f,n);c.push(h)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let d=0,f=l.length;d<f;d++){let h=l[d];u.push(h.toJSON(e.data))}u.length>0&&(s[c]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let l in s){let u=s[l];this.setAttribute(l,u.clone(t))}let r=e.morphAttributes;for(let l in r){let u=[],d=r[l];for(let f=0,h=d.length;f<h;f++)u.push(d[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,u=a.length;l<u;l++){let d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},pr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Wd,this.updateRanges=[],this.version=0,this.uuid=Nn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Nn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Nn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},on=new L,mr=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)on.fromBufferAttribute(this,t),on.applyMatrix4(e),this.setXYZ(t,on.x,on.y,on.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)on.fromBufferAttribute(this,t),on.applyNormalMatrix(e),this.setXYZ(t,on.x,on.y,on.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)on.fromBufferAttribute(this,t),on.transformDirection(e),this.setXYZ(t,on.x,on.y,on.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Wn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=vt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=vt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=vt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=vt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=vt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Wn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Wn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Wn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Wn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=vt(t,this.array),n=vt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=vt(t,this.array),n=vt(n,this.array),s=vt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=vt(t,this.array),n=vt(n,this.array),s=vt(s,this.array),r=vt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){pa("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Gt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){pa("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Ku=new L,cx=new L,ux=new Ke,ln=class{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Ku.subVectors(n,t).cross(cx.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(Ku),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||ux.getNormalMatrix(e),s=this.coplanarPoint(Ku).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},dx=0,pn=class extends qn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:dx++}),this.uuid=Nn(),this.name="",this.type="Material",this.blending=Er,this.side=di,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ed,this.blendDst=Cd,this.blendEquation=Is,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new be(0,0,0),this.blendAlpha=0,this.depthFunc=rr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Kp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=$o,this.stencilZFail=$o,this.stencilZPass=$o,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){De(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){De(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new be().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new ln().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new re().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new re().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var Mi=new L,ju=new L,Ao=new L,Eo=new L,ai=class{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Mi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Mi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Mi.copy(this.origin).addScaledVector(this.direction,t),Mi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){ju.copy(e).add(t).multiplyScalar(.5),Ao.copy(t).sub(e).normalize(),Eo.copy(this.origin).sub(ju);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Ao),o=Eo.dot(this.direction),c=-Eo.dot(Ao),l=Eo.lengthSq(),u=Math.abs(1-a*a),d,f,h,p;if(u>0)if(d=a*c-o,f=a*o-c,p=r*u,d>=0)if(f>=-p)if(f<=p){let x=1/u;d*=x,f*=x,h=d*(d+a*f+2*o)+f*(a*d+f+2*c)+l}else f=r,d=Math.max(0,-(a*f+o)),h=-d*d+f*(f+2*c)+l;else f=-r,d=Math.max(0,-(a*f+o)),h=-d*d+f*(f+2*c)+l;else f<=-p?(d=Math.max(0,-(-a*r+o)),f=d>0?-r:Math.min(Math.max(-r,-c),r),h=-d*d+f*(f+2*c)+l):f<=p?(d=0,f=Math.min(Math.max(-r,-c),r),h=f*(f+2*c)+l):(d=Math.max(0,-(a*r+o)),f=d>0?r:Math.min(Math.max(-r,-c),r),h=-d*d+f*(f+2*c)+l);else f=a>0?-r:r,d=Math.max(0,-(a*f+o)),h=-d*d+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(ju).addScaledVector(Ao,f),h}intersectSphere(e,t){if(e.radius<0)return null;Mi.subVectors(e.center,this.origin);let n=Mi.dot(this.direction),s=Mi.dot(Mi)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c,l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,s=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,s=(e.min.x-f.x)*l),u>=0?(r=(e.min.y-f.y)*u,a=(e.max.y-f.y)*u):(r=(e.max.y-f.y)*u,a=(e.min.y-f.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-f.z)*d,c=(e.max.z-f.z)*d):(o=(e.max.z-f.z)*d,c=(e.min.z-f.z)*d),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Mi)!==null}intersectTriangle(e,t,n,s,r){let a=this.origin,o=this.direction,c=o.x,l=o.y,u=o.z,d=e.x-a.x,f=e.y-a.y,h=e.z-a.z,p=t.x-a.x,x=t.y-a.y,g=t.z-a.z,m=n.x-a.x,b=n.y-a.y,A=n.z-a.z,_=Math.abs(c),w=Math.abs(l),T=Math.abs(u),C,y,S,E,D,F,N,I,U,z,V,Z;if(_>=w&&_>=T?(S=c,F=d,U=p,Z=m,c>=0?(C=l,y=u,E=f,D=h,N=x,I=g,z=b,V=A):(C=u,y=l,E=h,D=f,N=g,I=x,z=A,V=b)):w>=T?(S=l,F=f,U=x,Z=b,l>=0?(C=u,y=c,E=h,D=d,N=g,I=p,z=A,V=m):(C=c,y=u,E=d,D=h,N=p,I=g,z=m,V=A)):(S=u,F=h,U=g,Z=A,u>=0?(C=c,y=l,E=d,D=f,N=p,I=x,z=m,V=b):(C=l,y=c,E=f,D=d,N=x,I=p,z=b,V=m)),S===0)return null;let q=C/S,J=y/S,ie=1/S,Ue=E-q*F,Ee=D-J*F,ht=N-q*U,rt=I-J*U,ut=z-q*Z,j=V-J*Z,te=ut*rt-j*ht,_e=Ue*j-Ee*ut,Xe=ht*Ee-rt*Ue;if(s){if(te<0||_e<0||Xe<0)return null}else if((te<0||_e<0||Xe<0)&&(te>0||_e>0||Xe>0))return null;let Me=te+_e+Xe;if(Me===0)return null;let qe=ie*(te*F+_e*U+Xe*Z);return(Me>0?qe<0:qe>0)?null:this.at(qe/Me,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},tn=class extends pn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ai,this.combine=Rd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Wh=new Ye,xs=new ai,Co=new hn,Xh=new L,Ro=new L,Po=new L,Io=new L,Zu=new L,Lo=new L,qh=new L,Do=new L,Ne=class extends _t{constructor(e=new ft,t=new tn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){Lo.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let u=o[c],d=r[c];u!==0&&(Zu.fromBufferAttribute(d,e),a?Lo.addScaledVector(Zu,u):Lo.addScaledVector(Zu.sub(t),u))}t.add(Lo)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Co.copy(n.boundingSphere),Co.applyMatrix4(r),xs.copy(e.ray).recast(e.near),!(Co.containsPoint(xs.origin)===!1&&(xs.intersectSphere(Co,Xh)===null||xs.origin.distanceToSquared(Xh)>(e.far-e.near)**2))&&(Wh.copy(r).invert(),xs.copy(e.ray).applyMatrix4(Wh),!(n.boundingBox!==null&&xs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,xs)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,f=r.groups,h=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,x=f.length;p<x;p++){let g=f[p],m=a[g.materialIndex],b=Math.max(g.start,h.start),A=Math.min(o.count,Math.min(g.start+g.count,h.start+h.count));for(let _=b,w=A;_<w;_+=3){let T=o.getX(_),C=o.getX(_+1),y=o.getX(_+2);s=No(this,m,e,n,l,u,d,T,C,y),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let p=Math.max(0,h.start),x=Math.min(o.count,h.start+h.count);for(let g=p,m=x;g<m;g+=3){let b=o.getX(g),A=o.getX(g+1),_=o.getX(g+2);s=No(this,a,e,n,l,u,d,b,A,_),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let p=0,x=f.length;p<x;p++){let g=f[p],m=a[g.materialIndex],b=Math.max(g.start,h.start),A=Math.min(c.count,Math.min(g.start+g.count,h.start+h.count));for(let _=b,w=A;_<w;_+=3){let T=_,C=_+1,y=_+2;s=No(this,m,e,n,l,u,d,T,C,y),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let p=Math.max(0,h.start),x=Math.min(c.count,h.start+h.count);for(let g=p,m=x;g<m;g+=3){let b=g,A=g+1,_=g+2;s=No(this,a,e,n,l,u,d,b,A,_),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}};function fx(i,e,t,n,s,r,a,o){let c;if(e.side===dn?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===di,o),c===null)return null;Do.copy(o),Do.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(Do);return l<t.near||l>t.far?null:{distance:l,point:Do.clone(),object:i}}function No(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,Ro),i.getVertexPosition(c,Po),i.getVertexPosition(l,Io);let u=fx(i,e,t,n,Ro,Po,Io,qh);if(u){let d=new L;Ki.getBarycoord(qh,Ro,Po,Io,d),s&&(u.uv=Ki.getInterpolatedAttribute(s,o,c,l,d,new re)),r&&(u.uv1=Ki.getInterpolatedAttribute(r,o,c,l,d,new re)),a&&(u.normal=Ki.getInterpolatedAttribute(a,o,c,l,d,new L),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let f={a:o,b:c,c:l,normal:new L,materialIndex:0};Ki.getNormal(Ro,Po,Io,f.normal),u.face=f,u.barycoord=d}return u}var sa=new bt,$h=new bt,Yh=new bt,hx=new bt,Kh=new Ye,Uo=new L,Ju=new hn,jh=new Ye,Qu=new ai,ya=class extends Ne{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=ad,this.bindMatrix=new Ye,this.bindMatrixInverse=new Ye,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Sn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Uo),this.boundingBox.expandByPoint(Uo)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new hn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Uo),this.boundingSphere.expandByPoint(Uo)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ju.copy(this.boundingSphere),Ju.applyMatrix4(s),e.ray.intersectsSphere(Ju)!==!1&&(jh.copy(s).invert(),Qu.copy(e.ray).applyMatrix4(jh),!(this.boundingBox!==null&&Qu.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Qu)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new bt,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===ad?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Xp?this.bindMatrixInverse.copy(this.bindMatrix).invert():De("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,s=this.geometry;$h.fromBufferAttribute(s.attributes.skinIndex,e),Yh.fromBufferAttribute(s.attributes.skinWeight,e),t.isVector4?(sa.copy(t),t.set(0,0,0,0)):(sa.set(...t,1),t.set(0,0,0)),sa.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let a=Yh.getComponent(r);if(a!==0){let o=$h.getComponent(r);Kh.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(hx.copy(sa).applyMatrix4(Kh),a)}}return t.isVector4&&(t.w=sa.w),t.applyMatrix4(this.bindMatrixInverse)}},gr=class extends _t{constructor(){super(),this.isBone=!0,this.type="Bone"}},xr=class extends $t{constructor(e=null,t=1,n=1,s,r,a,o,c,l=Ft,u=Ft,d,f){super(null,a,o,c,l,u,s,r,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Zh=new Ye,px=new Ye,va=class i{constructor(e=[],t=[]){this.uuid=Nn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){De("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Ye)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Ye;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:px;Zh.multiplyMatrices(o,t[r]),Zh.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new xr(t,e,e,En,An);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){let r=e.bones[n],a=t[r];a===void 0&&(De("Skeleton: No bone found with UUID:",r),a=new gr),this.bones.push(a),this.boneInverses.push(new Ye().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let a=t[s];e.bones.push(a.uuid);let o=n[s];e.boneInverses.push(o.toArray())}return e}},Ei=class extends Gt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},er=new Ye,Jh=new Ye,Fo=[],Qh=new Sn,mx=new Ye,ra=new Ne,aa=new hn,Mn=class extends Ne{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ei(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,mx)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Sn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,er),Qh.copy(e.boundingBox).applyMatrix4(er),this.boundingBox.union(Qh)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new hn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,er),aa.copy(e.boundingSphere).applyMatrix4(er),this.boundingSphere.union(aa)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(ra.geometry=this.geometry,ra.material=this.material,ra.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),aa.copy(this.boundingSphere),aa.applyMatrix4(n),e.ray.intersectsSphere(aa)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,er),Jh.multiplyMatrices(n,er),ra.matrixWorld=Jh,ra.raycast(e,Fo);for(let a=0,o=Fo.length;a<o;a++){let c=Fo[a];c.instanceId=r,c.object=this,t.push(c)}Fo.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Ei(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new xr(new Float32Array(s*this.count),s,this.count,Dl,An));let r=this.morphTexture.source.data.data,a=0;for(let l=0;l<n.length;l++)a+=n[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=s*e;return r[c]=o,r.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},_s=new hn,gx=new re(.5,.5),Oo=new L,_r=class{constructor(e=new ln,t=new ln,n=new ln,s=new ln,r=new ln,a=new ln){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Xn,n=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],u=r[4],d=r[5],f=r[6],h=r[7],p=r[8],x=r[9],g=r[10],m=r[11],b=r[12],A=r[13],_=r[14],w=r[15];if(s[0].setComponents(l-a,h-u,m-p,w-b).normalize(),s[1].setComponents(l+a,h+u,m+p,w+b).normalize(),s[2].setComponents(l+o,h+d,m+x,w+A).normalize(),s[3].setComponents(l-o,h-d,m-x,w-A).normalize(),n)s[4].setComponents(c,f,g,_).normalize(),s[5].setComponents(l-c,h-f,m-g,w-_).normalize();else if(s[4].setComponents(l-c,h-f,m-g,w-_).normalize(),t===Xn)s[5].setComponents(l+c,h+f,m+g,w+_).normalize();else if(t===or)s[5].setComponents(c,f,g,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),_s.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),_s.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(_s)}intersectsSprite(e){_s.center.set(0,0,0);let t=gx.distanceTo(e.center);return _s.radius=.7071067811865476+t,_s.applyMatrix4(e.matrixWorld),this.intersectsSphere(_s)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Oo.x=s.normal.x>0?e.max.x:e.min.x,Oo.y=s.normal.y>0?e.max.y:e.min.y,Oo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Oo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Ci=class extends pn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new be(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},rl=new L,al=new L,ep=new Ye,oa=new ai,Bo=new hn,ed=new L,tp=new L,$n=class extends _t{constructor(e=new ft,t=new Ci){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)rl.fromBufferAttribute(t,s-1),al.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=rl.distanceTo(al);e.setAttribute("lineDistance",new et(n,1))}else De("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Bo.copy(n.boundingSphere),Bo.applyMatrix4(s),Bo.radius+=r,e.ray.intersectsSphere(Bo)===!1)return;ep.copy(s).invert(),oa.copy(e.ray).applyMatrix4(ep);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){let h=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let x=h,g=p-1;x<g;x+=l){let m=u.getX(x),b=u.getX(x+1),A=ko(this,e,oa,c,m,b,x);A&&t.push(A)}if(this.isLineLoop){let x=u.getX(p-1),g=u.getX(h),m=ko(this,e,oa,c,x,g,p-1);m&&t.push(m)}}else{let h=Math.max(0,a.start),p=Math.min(f.count,a.start+a.count);for(let x=h,g=p-1;x<g;x+=l){let m=ko(this,e,oa,c,x,x+1,x);m&&t.push(m)}if(this.isLineLoop){let x=ko(this,e,oa,c,p-1,h,p-1);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function ko(i,e,t,n,s,r,a){let o=i.geometry.attributes.position;if(rl.fromBufferAttribute(o,s),al.fromBufferAttribute(o,r),t.distanceSqToSegment(rl,al,ed,tp)>n)return;ed.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(ed);if(!(l<e.near||l>e.far))return{distance:l,point:tp.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var np=new L,ip=new L,ws=class extends $n{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)np.fromBufferAttribute(t,s),ip.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+np.distanceTo(ip);e.setAttribute("lineDistance",new et(n,1))}else De("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Ts=class extends $n{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Zi=class extends pn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new be(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},sp=new Ye,dd=new ai,zo=new hn,Go=new L,As=class extends _t{constructor(e=new ft,t=new Zi){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),zo.copy(n.boundingSphere),zo.applyMatrix4(s),zo.radius+=r,e.ray.intersectsSphere(zo)===!1)return;sp.copy(s).invert(),dd.copy(e.ray).applyMatrix4(sp);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,d=n.attributes.position;if(l!==null){let f=Math.max(0,a.start),h=Math.min(l.count,a.start+a.count);for(let p=f,x=h;p<x;p++){let g=l.getX(p);Go.fromBufferAttribute(d,g),rp(Go,g,c,s,e,t,this)}}else{let f=Math.max(0,a.start),h=Math.min(d.count,a.start+a.count);for(let p=f,x=h;p<x;p++)Go.fromBufferAttribute(d,p),rp(Go,p,c,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function rp(i,e,t,n,s,r,a){let o=dd.distanceSqToPoint(i);if(o<t){let c=new L;dd.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var ba=class extends $t{constructor(e=[],t=is,n,s,r,a,o,c,l,u){super(e,t,n,s,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var Ji=class extends $t{constructor(e,t,n=Jn,s,r,a,o=Ft,c=Ft,l,u=ri,d=1){if(u!==ri&&u!==ss)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:e,height:t,depth:d};super(f,s,r,a,o,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ur(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},ol=class extends Ji{constructor(e,t=Jn,n=is,s,r,a=Ft,o=Ft,c,l=ri){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,s,r,a,o,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Sa=class extends $t{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Un=class i extends ft{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],u=[],d=[],f=0,h=0;p("z","y","x",-1,-1,n,t,e,a,r,0),p("z","y","x",1,-1,n,t,-e,a,r,1),p("x","z","y",1,1,e,n,t,s,a,2),p("x","z","y",1,-1,e,n,-t,s,a,3),p("x","y","z",1,-1,e,t,n,s,r,4),p("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new et(l,3)),this.setAttribute("normal",new et(u,3)),this.setAttribute("uv",new et(d,2));function p(x,g,m,b,A,_,w,T,C,y,S){let E=_/C,D=w/y,F=_/2,N=w/2,I=T/2,U=C+1,z=y+1,V=0,Z=0,q=new L;for(let J=0;J<z;J++){let ie=J*D-N;for(let Ue=0;Ue<U;Ue++){let Ee=Ue*E-F;q[x]=Ee*b,q[g]=ie*A,q[m]=I,l.push(q.x,q.y,q.z),q[x]=0,q[g]=0,q[m]=T>0?1:-1,u.push(q.x,q.y,q.z),d.push(Ue/C),d.push(1-J/y),V+=1}}for(let J=0;J<y;J++)for(let ie=0;ie<C;ie++){let Ue=f+ie+U*J,Ee=f+ie+U*(J+1),ht=f+(ie+1)+U*(J+1),rt=f+(ie+1)+U*J;c.push(Ue,Ee,rt),c.push(Ee,ht,rt),Z+=6}o.addGroup(h,Z,S),h+=Z,f+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Ma=class i extends ft{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);let r=[],a=[],o=[],c=[],l=new L,u=new re;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let d=0,f=3;d<=t;d++,f+=3){let h=n+d/t*s;l.x=e*Math.cos(h),l.y=e*Math.sin(h),a.push(l.x,l.y,l.z),o.push(0,0,1),u.x=(a[f]/e+1)/2,u.y=(a[f+1]/e+1)/2,c.push(u.x,u.y)}for(let d=1;d<=t;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new et(a,3)),this.setAttribute("normal",new et(o,3)),this.setAttribute("uv",new et(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Ri=class i extends ft{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let u=[],d=[],f=[],h=[],p=0,x=[],g=n/2,m=0;b(),a===!1&&(e>0&&A(!0),t>0&&A(!1)),this.setIndex(u),this.setAttribute("position",new et(d,3)),this.setAttribute("normal",new et(f,3)),this.setAttribute("uv",new et(h,2));function b(){let _=new L,w=new L,T=0,C=(t-e)/n;for(let y=0;y<=r;y++){let S=[],E=y/r,D=E*(t-e)+e;for(let F=0;F<=s;F++){let N=F/s,I=N*c+o,U=Math.sin(I),z=Math.cos(I);w.x=D*U,w.y=-E*n+g,w.z=D*z,d.push(w.x,w.y,w.z),_.set(U,C,z).normalize(),f.push(_.x,_.y,_.z),h.push(N,1-E),S.push(p++)}x.push(S)}for(let y=0;y<s;y++)for(let S=0;S<r;S++){let E=x[S][y],D=x[S+1][y],F=x[S+1][y+1],N=x[S][y+1];(e>0||S!==0)&&(u.push(E,D,N),T+=3),(t>0||S!==r-1)&&(u.push(D,F,N),T+=3)}l.addGroup(m,T,0),m+=T}function A(_){let w=p,T=new re,C=new L,y=0,S=_===!0?e:t,E=_===!0?1:-1;for(let F=1;F<=s;F++)d.push(0,g*E,0),f.push(0,E,0),h.push(.5,.5),p++;let D=p;for(let F=0;F<=s;F++){let I=F/s*c+o,U=Math.cos(I),z=Math.sin(I);C.x=S*z,C.y=g*E,C.z=S*U,d.push(C.x,C.y,C.z),f.push(0,E,0),T.x=U*.5+.5,T.y=z*.5*E+.5,h.push(T.x,T.y),p++}for(let F=0;F<s;F++){let N=w+F,I=D+F;_===!0?u.push(I,I+1,N):u.push(I+1,I,N),y+=3}l.addGroup(m,y,_===!0?1:2),m+=y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},yr=class i extends Ri{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},wa=class i extends ft{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};let r=[],a=[];o(s),l(n),u(),this.setAttribute("position",new et(r,3)),this.setAttribute("normal",new et(r.slice(),3)),this.setAttribute("uv",new et(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(b){let A=new L,_=new L,w=new L;for(let T=0;T<t.length;T+=3)h(t[T+0],A),h(t[T+1],_),h(t[T+2],w),c(A,_,w,b)}function c(b,A,_,w){let T=w+1,C=[];for(let y=0;y<=T;y++){C[y]=[];let S=b.clone().lerp(_,y/T),E=A.clone().lerp(_,y/T),D=T-y;for(let F=0;F<=D;F++)F===0&&y===T?C[y][F]=S:C[y][F]=S.clone().lerp(E,F/D)}for(let y=0;y<T;y++)for(let S=0;S<2*(T-y)-1;S++){let E=Math.floor(S/2);S%2===0?(f(C[y][E+1]),f(C[y+1][E]),f(C[y][E])):(f(C[y][E+1]),f(C[y+1][E+1]),f(C[y+1][E]))}}function l(b){let A=new L;for(let _=0;_<r.length;_+=3)A.x=r[_+0],A.y=r[_+1],A.z=r[_+2],A.normalize().multiplyScalar(b),r[_+0]=A.x,r[_+1]=A.y,r[_+2]=A.z}function u(){let b=new L;for(let A=0;A<r.length;A+=3){b.x=r[A+0],b.y=r[A+1],b.z=r[A+2];let _=g(b)/2/Math.PI+.5,w=m(b)/Math.PI+.5;a.push(_,1-w)}p(),d()}function d(){for(let b=0;b<a.length;b+=6){let A=a[b+0],_=a[b+2],w=a[b+4],T=Math.max(A,_,w),C=Math.min(A,_,w);T>.9&&C<.1&&(A<.2&&(a[b+0]+=1),_<.2&&(a[b+2]+=1),w<.2&&(a[b+4]+=1))}}function f(b){r.push(b.x,b.y,b.z)}function h(b,A){let _=b*3;A.x=e[_+0],A.y=e[_+1],A.z=e[_+2]}function p(){let b=new L,A=new L,_=new L,w=new L,T=new re,C=new re,y=new re;for(let S=0,E=0;S<r.length;S+=9,E+=6){b.set(r[S+0],r[S+1],r[S+2]),A.set(r[S+3],r[S+4],r[S+5]),_.set(r[S+6],r[S+7],r[S+8]),T.set(a[E+0],a[E+1]),C.set(a[E+2],a[E+3]),y.set(a[E+4],a[E+5]),w.copy(b).add(A).add(_).divideScalar(3);let D=g(w);x(T,E+0,b,D),x(C,E+2,A,D),x(y,E+4,_,D)}}function x(b,A,_,w){w<0&&b.x===1&&(a[A]=b.x-1),_.x===0&&_.z===0&&(a[A]=w/2/Math.PI+.5)}function g(b){return Math.atan2(b.z,-b.x)}function m(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.detail)}},Ta=class i extends wa{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var wn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){De("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,a;t?a=t:a=e*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=n[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===a)return s/(r-1);let u=n[s],f=n[s+1]-u,h=(a-u)/f;return(s+h)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),c=t||(a.isVector2?new re:new L);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new L,s=[],r=[],a=[],o=new L,c=new Ye;for(let h=0;h<=e;h++){let p=h/e;s[h]=this.getTangentAt(p,new L)}r[0]=new L,a[0]=new L;let l=Number.MAX_VALUE,u=Math.abs(s[0].x),d=Math.abs(s[0].y),f=Math.abs(s[0].z);u<=l&&(l=u,n.set(1,0,0)),d<=l&&(l=d,n.set(0,1,0)),f<=l&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let h=1;h<=e;h++){if(r[h]=r[h-1].clone(),a[h]=a[h-1].clone(),o.crossVectors(s[h-1],s[h]),o.length()>Number.EPSILON){o.normalize();let p=Math.acos(Je(s[h-1].dot(s[h]),-1,1));r[h].applyMatrix4(c.makeRotationAxis(o,p))}a[h].crossVectors(s[h],r[h])}if(t===!0){let h=Math.acos(Je(r[0].dot(r[e]),-1,1));h/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(h=-h);for(let p=1;p<=e;p++)r[p].applyMatrix4(c.makeRotationAxis(s[p],h*p)),a[p].crossVectors(s[p],r[p])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},vr=class extends wn{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new re){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+e*r,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),f=c-this.aX,h=l-this.aY;c=f*u-h*d+this.aX,l=f*d+h*u+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},ll=class extends vr{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function $d(){let i=0,e=0,t=0,n=0;function s(r,a,o,c){i=r,e=o,t=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){s(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,u,d){let f=(a-r)/l-(o-r)/(l+u)+(o-a)/u,h=(o-a)/u-(c-a)/(u+d)+(c-o)/d;f*=u,h*=u,s(a,o,f,h)},calc:function(r){let a=r*r,o=a*r;return i+e*r+t*a+n*o}}}var ap=new L,op=new L,td=new $d,nd=new $d,id=new $d,cl=class extends wn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new L){let n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e,o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,u;this.closed||o>0?l=s[(o-1)%r]:(op.subVectors(s[0],s[1]).add(s[0]),l=op);let d=s[o%r],f=s[(o+1)%r];if(this.closed||o+2<r?u=s[(o+2)%r]:(ap.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=ap),this.curveType==="centripetal"||this.curveType==="chordal"){let h=this.curveType==="chordal"?.5:.25,p=Math.pow(l.distanceToSquared(d),h),x=Math.pow(d.distanceToSquared(f),h),g=Math.pow(f.distanceToSquared(u),h);x<1e-4&&(x=1),p<1e-4&&(p=x),g<1e-4&&(g=x),td.initNonuniformCatmullRom(l.x,d.x,f.x,u.x,p,x,g),nd.initNonuniformCatmullRom(l.y,d.y,f.y,u.y,p,x,g),id.initNonuniformCatmullRom(l.z,d.z,f.z,u.z,p,x,g)}else this.curveType==="catmullrom"&&(td.initCatmullRom(l.x,d.x,f.x,u.x,this.tension),nd.initCatmullRom(l.y,d.y,f.y,u.y,this.tension),id.initCatmullRom(l.z,d.z,f.z,u.z,this.tension));return n.set(td.calc(c),nd.calc(c),id.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new L().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function lp(i,e,t,n,s){let r=(n-e)*.5,a=(s-t)*.5,o=i*i,c=i*o;return(2*t-2*n+r+a)*c+(-3*t+3*n-2*r-a)*o+r*i+t}function xx(i,e){let t=1-i;return t*t*e}function _x(i,e){return 2*(1-i)*i*e}function yx(i,e){return i*i*e}function da(i,e,t,n){return xx(i,e)+_x(i,t)+yx(i,n)}function vx(i,e){let t=1-i;return t*t*t*e}function bx(i,e){let t=1-i;return 3*t*t*i*e}function Sx(i,e){return 3*(1-i)*i*i*e}function Mx(i,e){return i*i*i*e}function fa(i,e,t,n,s){return vx(i,e)+bx(i,t)+Sx(i,n)+Mx(i,s)}var Aa=class extends wn{constructor(e=new re,t=new re,n=new re,s=new re){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new re){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(fa(e,s.x,r.x,a.x,o.x),fa(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ul=class extends wn{constructor(e=new L,t=new L,n=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new L){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(fa(e,s.x,r.x,a.x,o.x),fa(e,s.y,r.y,a.y,o.y),fa(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ea=class extends wn{constructor(e=new re,t=new re){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new re){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new re){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},dl=class extends wn{constructor(e=new L,t=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new L){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new L){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ca=class extends wn{constructor(e=new re,t=new re,n=new re){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new re){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(da(e,s.x,r.x,a.x),da(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},fl=class extends wn{constructor(e=new L,t=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new L){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(da(e,s.x,r.x,a.x),da(e,s.y,r.y,a.y),da(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ra=class extends wn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new re){let n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,c=s[a===0?a:a-1],l=s[a],u=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return n.set(lp(o,c.x,l.x,u.x,d.x),lp(o,c.y,l.y,u.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new re().fromArray(s))}return this}},fd=Object.freeze({__proto__:null,ArcCurve:ll,CatmullRomCurve3:cl,CubicBezierCurve:Aa,CubicBezierCurve3:ul,EllipseCurve:vr,LineCurve:Ea,LineCurve3:dl,QuadraticBezierCurve:Ca,QuadraticBezierCurve3:fl,SplineCurve:Ra}),hl=class extends wn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new fd[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){let u=c[l];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new fd[s.type]().fromJSON(s))}return this}},Pa=class extends hl{constructor(e){super(),this.type="Path",this.currentPoint=new re,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Ea(this.currentPoint.clone(),new re(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new Ca(this.currentPoint.clone(),new re(e,t),new re(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){let o=new Aa(this.currentPoint.clone(),new re(e,t),new re(n,s),new re(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Ra(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,o,c){let l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+l,t+u,n,s,r,a,o,c),this}absellipse(e,t,n,s,r,a,o,c){let l=new vr(e,t,n,s,r,a,o,c);if(this.curves.length>0){let d=l.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(l);let u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},oi=class extends Pa{constructor(e){super(e),this.uuid=Nn(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(new Pa().fromJSON(s))}return this}};function wx(i,e,t=2){let n=e&&e.length,s=n?e[0]*t:i.length,r=om(i,0,s,t,!0),a=[];if(!r||r.next===r.prev)return a;let o,c,l;if(n&&(r=Rx(i,e,r,t)),i.length>80*t){o=i[0],c=i[1];let u=o,d=c;for(let f=t;f<s;f+=t){let h=i[f],p=i[f+1];h<o&&(o=h),p<c&&(c=p),h>u&&(u=h),p>d&&(d=p)}l=Math.max(u-o,d-c),l=l!==0?32767/l:0}return Ia(r,a,t,o,c,l,0),a}function om(i,e,t,n,s){let r;if(s===zx(i,e,t,n)>0)for(let a=e;a<t;a+=n)r=cp(a/n|0,i[a],i[a+1],r);else for(let a=t-n;a>=e;a-=n)r=cp(a/n|0,i[a],i[a+1],r);return r&&br(r,r.next)&&(Da(r),r=r.next),r}function Es(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(br(t,t.next)||Lt(t.prev,t,t.next)===0)){if(Da(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Ia(i,e,t,n,s,r,a){if(!i)return;!a&&r&&Nx(i,n,s,r);let o=i;for(;i.prev!==i.next;){let c=i.prev,l=i.next;if(r?Ax(i,n,s,r):Tx(i)){e.push(c.i,i.i,l.i),Da(i),i=l.next,o=l.next;continue}if(i=l,i===o){a?a===1?(i=Ex(Es(i),e),Ia(i,e,t,n,s,r,2)):a===2&&Cx(i,e,t,n,s,r):Ia(Es(i),e,t,n,s,r,1);break}}}function Tx(i){let e=i.prev,t=i,n=i.next;if(Lt(e,t,n)>=0)return!1;let s=e.x,r=t.x,a=n.x,o=e.y,c=t.y,l=n.y,u=Math.min(s,r,a),d=Math.min(o,c,l),f=Math.max(s,r,a),h=Math.max(o,c,l),p=n.next;for(;p!==e;){if(p.x>=u&&p.x<=f&&p.y>=d&&p.y<=h&&la(s,o,r,c,a,l,p.x,p.y)&&Lt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Ax(i,e,t,n){let s=i.prev,r=i,a=i.next;if(Lt(s,r,a)>=0)return!1;let o=s.x,c=r.x,l=a.x,u=s.y,d=r.y,f=a.y,h=Math.min(o,c,l),p=Math.min(u,d,f),x=Math.max(o,c,l),g=Math.max(u,d,f),m=hd(h,p,e,t,n),b=hd(x,g,e,t,n),A=i.prevZ,_=i.nextZ;for(;A&&A.z>=m&&_&&_.z<=b;){if(A.x>=h&&A.x<=x&&A.y>=p&&A.y<=g&&A!==s&&A!==a&&la(o,u,c,d,l,f,A.x,A.y)&&Lt(A.prev,A,A.next)>=0||(A=A.prevZ,_.x>=h&&_.x<=x&&_.y>=p&&_.y<=g&&_!==s&&_!==a&&la(o,u,c,d,l,f,_.x,_.y)&&Lt(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;A&&A.z>=m;){if(A.x>=h&&A.x<=x&&A.y>=p&&A.y<=g&&A!==s&&A!==a&&la(o,u,c,d,l,f,A.x,A.y)&&Lt(A.prev,A,A.next)>=0)return!1;A=A.prevZ}for(;_&&_.z<=b;){if(_.x>=h&&_.x<=x&&_.y>=p&&_.y<=g&&_!==s&&_!==a&&la(o,u,c,d,l,f,_.x,_.y)&&Lt(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function Ex(i,e){let t=i;do{let n=t.prev,s=t.next.next;!br(n,s)&&cm(n,t,t.next,s)&&La(n,s)&&La(s,n)&&(e.push(n.i,t.i,s.i),Da(t),Da(t.next),t=i=s),t=t.next}while(t!==i);return Es(t)}function Cx(i,e,t,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Ox(a,o)){let c=um(a,o);a=Es(a,a.next),c=Es(c,c.next),Ia(a,e,t,n,s,r,0),Ia(c,e,t,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function Rx(i,e,t,n){let s=[];for(let r=0,a=e.length;r<a;r++){let o=e[r]*n,c=r<a-1?e[r+1]*n:i.length,l=om(i,o,c,n,!1);l===l.next&&(l.steiner=!0),s.push(Fx(l))}s.sort(Px);for(let r=0;r<s.length;r++)t=Ix(s[r],t);return t}function Px(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function Ix(i,e){let t=Lx(i,e);if(!t)return e;let n=um(t,i);return Es(n,n.next),Es(t,t.next)}function Lx(i,e){let t=e,n=i.x,s=i.y,r=-1/0,a;if(br(i,t))return t;do{if(br(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let d=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=n&&d>r&&(r=d,a=t.x<t.next.x?t:t.next,d===n))return a}t=t.next}while(t!==e);if(!a)return null;let o=a,c=a.x,l=a.y,u=1/0;t=a;do{if(n>=t.x&&t.x>=c&&n!==t.x&&lm(s<l?n:r,s,c,l,s<l?r:n,s,t.x,t.y)){let d=Math.abs(s-t.y)/(n-t.x);La(t,i)&&(d<u||d===u&&(t.x>a.x||t.x===a.x&&Dx(a,t)))&&(a=t,u=d)}t=t.next}while(t!==o);return a}function Dx(i,e){return Lt(i.prev,i,e.prev)<0&&Lt(e.next,i,i.next)<0}function Nx(i,e,t,n){let s=i;do s.z===0&&(s.z=hd(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Ux(s)}function Ux(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let a=n,o=0;for(let l=0;l<t&&(o++,a=a.nextZ,!!a);l++);let c=t;for(;o>0||c>0&&a;)o!==0&&(c===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,t*=2}while(e>1);return i}function hd(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Fx(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function lm(i,e,t,n,s,r,a,o){return(s-a)*(e-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(n-o)}function la(i,e,t,n,s,r,a,o){return!(i===a&&e===o)&&lm(i,e,t,n,s,r,a,o)}function Ox(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!Bx(i,e)&&(La(i,e)&&La(e,i)&&kx(i,e)&&(Lt(i.prev,i,e.prev)||Lt(i,e.prev,e))||br(i,e)&&Lt(i.prev,i,i.next)>0&&Lt(e.prev,e,e.next)>0)}function Lt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function br(i,e){return i.x===e.x&&i.y===e.y}function cm(i,e,t,n){let s=Ho(Lt(i,e,t)),r=Ho(Lt(i,e,n)),a=Ho(Lt(t,n,i)),o=Ho(Lt(t,n,e));return!!(s!==r&&a!==o||s===0&&Vo(i,t,e)||r===0&&Vo(i,n,e)||a===0&&Vo(t,i,n)||o===0&&Vo(t,e,n))}function Vo(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Ho(i){return i>0?1:i<0?-1:0}function Bx(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&cm(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function La(i,e){return Lt(i.prev,i,i.next)<0?Lt(i,e,i.next)>=0&&Lt(i,i.prev,e)>=0:Lt(i,e,i.prev)<0||Lt(i,i.next,e)<0}function kx(i,e){let t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function um(i,e){let t=pd(i.i,i.x,i.y),n=pd(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function cp(i,e,t,n){let s=pd(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Da(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function pd(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function zx(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}var md=class{static triangulate(e,t,n=2){return wx(e,t,n)}},ys=class i{static area(e){let t=e.length,n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],s=[],r=[];up(e),dp(n,e);let a=e.length;t.forEach(up);for(let c=0;c<t.length;c++)s.push(a),a+=t[c].length,dp(n,t[c]);let o=md.triangulate(n,s);for(let c=0;c<o.length;c+=3)r.push(o.slice(c,c+3));return r}};function up(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function dp(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var Pi=class i extends ft{constructor(e=new oi([new re(.5,.5),new re(-.5,.5),new re(-.5,-.5),new re(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,s=[],r=[];for(let o=0,c=e.length;o<c;o++){let l=e[o];a(l)}this.setAttribute("position",new et(s,3)),this.setAttribute("uv",new et(r,2)),this.computeVertexNormals();function a(o){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,d=t.depth!==void 0?t.depth:1,f=t.bevelEnabled!==void 0?t.bevelEnabled:!0,h=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:h-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3,m=t.extrudePath,b=t.UVGenerator!==void 0?t.UVGenerator:Gx,A,_=!1,w,T,C,y;if(m){A=m.getSpacedPoints(u),_=!0,f=!1;let ne=m.isCatmullRomCurve3?m.closed:!1;w=m.computeFrenetFrames(u,ne),T=new L,C=new L,y=new L}f||(g=0,h=0,p=0,x=0);let S=o.extractPoints(l),E=S.shape,D=S.holes;if(!ys.isClockWise(E)){E=E.reverse();for(let ne=0,ae=D.length;ne<ae;ne++){let oe=D[ne];ys.isClockWise(oe)&&(D[ne]=oe.reverse())}}function N(ne){let oe=10000000000000001e-36,le=ne[0];for(let de=1;de<=ne.length;de++){let Ge=de%ne.length,ke=ne[Ge],$e=ke.x-le.x,je=ke.y-le.y,O=$e*$e+je*je,pt=Math.max(Math.abs(ke.x),Math.abs(ke.y),Math.abs(le.x),Math.abs(le.y)),at=oe*pt*pt;if(O<=at){ne.splice(Ge,1),de--;continue}le=ke}}N(E),D.forEach(N);let I=D.length,U=E;for(let ne=0;ne<I;ne++){let ae=D[ne];E=E.concat(ae)}function z(ne,ae,oe){return ae||We("ExtrudeGeometry: vec does not exist"),ne.clone().addScaledVector(ae,oe)}let V=E.length;function Z(ne,ae,oe){let le,de,Ge,ke=ne.x-ae.x,$e=ne.y-ae.y,je=oe.x-ne.x,O=oe.y-ne.y,pt=ke*ke+$e*$e,at=ke*O-$e*je;if(Math.abs(at)>Number.EPSILON){let R=Math.sqrt(pt),v=Math.sqrt(je*je+O*O),G=ae.x-$e/R,X=ae.y+ke/R,Y=oe.x-O/v,ce=oe.y+je/v,ue=((Y-G)*O-(ce-X)*je)/(ke*O-$e*je);le=G+ke*ue-ne.x,de=X+$e*ue-ne.y;let K=le*le+de*de;if(K<=2)return new re(le,de);Ge=Math.sqrt(K/2)}else{let R=!1;ke>Number.EPSILON?je>Number.EPSILON&&(R=!0):ke<-Number.EPSILON?je<-Number.EPSILON&&(R=!0):Math.sign($e)===Math.sign(O)&&(R=!0),R?(le=-$e,de=ke,Ge=Math.sqrt(pt)):(le=ke,de=$e,Ge=Math.sqrt(pt/2))}return new re(le/Ge,de/Ge)}let q=[];for(let ne=0,ae=U.length,oe=ae-1,le=ne+1;ne<ae;ne++,oe++,le++)oe===ae&&(oe=0),le===ae&&(le=0),q[ne]=Z(U[ne],U[oe],U[le]);let J=[],ie,Ue=q.concat();for(let ne=0,ae=I;ne<ae;ne++){let oe=D[ne];ie=[];for(let le=0,de=oe.length,Ge=de-1,ke=le+1;le<de;le++,Ge++,ke++)Ge===de&&(Ge=0),ke===de&&(ke=0),ie[le]=Z(oe[le],oe[Ge],oe[ke]);J.push(ie),Ue=Ue.concat(ie)}let Ee;if(g===0)Ee=ys.triangulateShape(U,D);else{let ne=[],ae=[];for(let oe=0;oe<g;oe++){let le=oe/g,de=h*Math.cos(le*Math.PI/2),Ge=p*Math.sin(le*Math.PI/2)+x;for(let ke=0,$e=U.length;ke<$e;ke++){let je=z(U[ke],q[ke],Ge);_e(je.x,je.y,-de),le===0&&ne.push(je)}for(let ke=0,$e=I;ke<$e;ke++){let je=D[ke];ie=J[ke];let O=[];for(let pt=0,at=je.length;pt<at;pt++){let R=z(je[pt],ie[pt],Ge);_e(R.x,R.y,-de),le===0&&O.push(R)}le===0&&ae.push(O)}}Ee=ys.triangulateShape(ne,ae)}let ht=Ee.length,rt=p+x;for(let ne=0;ne<V;ne++){let ae=f?z(E[ne],Ue[ne],rt):E[ne];_?(C.copy(w.normals[0]).multiplyScalar(ae.x),T.copy(w.binormals[0]).multiplyScalar(ae.y),y.copy(A[0]).add(C).add(T),_e(y.x,y.y,y.z)):_e(ae.x,ae.y,0)}for(let ne=1;ne<=u;ne++)for(let ae=0;ae<V;ae++){let oe=f?z(E[ae],Ue[ae],rt):E[ae];_?(C.copy(w.normals[ne]).multiplyScalar(oe.x),T.copy(w.binormals[ne]).multiplyScalar(oe.y),y.copy(A[ne]).add(C).add(T),_e(y.x,y.y,y.z)):_e(oe.x,oe.y,d/u*ne)}for(let ne=g-1;ne>=0;ne--){let ae=ne/g,oe=h*Math.cos(ae*Math.PI/2),le=p*Math.sin(ae*Math.PI/2)+x;for(let de=0,Ge=U.length;de<Ge;de++){let ke=z(U[de],q[de],le);_e(ke.x,ke.y,d+oe)}for(let de=0,Ge=D.length;de<Ge;de++){let ke=D[de];ie=J[de];for(let $e=0,je=ke.length;$e<je;$e++){let O=z(ke[$e],ie[$e],le);_?_e(O.x,O.y+A[u-1].y,A[u-1].x+oe):_e(O.x,O.y,d+oe)}}}ut(),j();function ut(){let ne=s.length/3;if(f){let ae=0,oe=V*ae;for(let le=0;le<ht;le++){let de=Ee[le];Xe(de[2]+oe,de[1]+oe,de[0]+oe)}ae=u+g*2,oe=V*ae;for(let le=0;le<ht;le++){let de=Ee[le];Xe(de[0]+oe,de[1]+oe,de[2]+oe)}}else{for(let ae=0;ae<ht;ae++){let oe=Ee[ae];Xe(oe[2],oe[1],oe[0])}for(let ae=0;ae<ht;ae++){let oe=Ee[ae];Xe(oe[0]+V*u,oe[1]+V*u,oe[2]+V*u)}}n.addGroup(ne,s.length/3-ne,0)}function j(){let ne=s.length/3,ae=0;te(U,ae),ae+=U.length;for(let oe=0,le=D.length;oe<le;oe++){let de=D[oe];te(de,ae),ae+=de.length}n.addGroup(ne,s.length/3-ne,1)}function te(ne,ae){let oe=ne.length;for(;--oe>=0;){let le=oe,de=oe-1;de<0&&(de=ne.length-1);for(let Ge=0,ke=u+g*2;Ge<ke;Ge++){let $e=V*Ge,je=V*(Ge+1),O=ae+le+$e,pt=ae+de+$e,at=ae+de+je,R=ae+le+je;Me(O,pt,at,R)}}}function _e(ne,ae,oe){c.push(ne),c.push(ae),c.push(oe)}function Xe(ne,ae,oe){qe(ne),qe(ae),qe(oe);let le=s.length/3,de=b.generateTopUV(n,s,le-3,le-2,le-1);yt(de[0]),yt(de[1]),yt(de[2])}function Me(ne,ae,oe,le){qe(ne),qe(ae),qe(le),qe(ae),qe(oe),qe(le);let de=s.length/3,Ge=b.generateSideWallUV(n,s,de-6,de-3,de-2,de-1);yt(Ge[0]),yt(Ge[1]),yt(Ge[3]),yt(Ge[1]),yt(Ge[2]),yt(Ge[3])}function qe(ne){s.push(c[ne*3+0]),s.push(c[ne*3+1]),s.push(c[ne*3+2])}function yt(ne){r.push(ne.x),r.push(ne.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Vx(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,a=e.shapes.length;r<a;r++){let o=t[e.shapes[r]];n.push(o)}let s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new fd[s.type]().fromJSON(s)),new i(n,e.options)}},Gx={generateTopUV:function(i,e,t,n,s){let r=e[t*3],a=e[t*3+1],o=e[n*3],c=e[n*3+1],l=e[s*3],u=e[s*3+1];return[new re(r,a),new re(o,c),new re(l,u)]},generateSideWallUV:function(i,e,t,n,s,r){let a=e[t*3],o=e[t*3+1],c=e[t*3+2],l=e[n*3],u=e[n*3+1],d=e[n*3+2],f=e[s*3],h=e[s*3+1],p=e[s*3+2],x=e[r*3],g=e[r*3+1],m=e[r*3+2];return Math.abs(o-u)<Math.abs(a-l)?[new re(a,1-c),new re(l,1-d),new re(f,1-p),new re(x,1-m)]:[new re(o,1-c),new re(u,1-d),new re(h,1-p),new re(g,1-m)]}};function Vx(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var li=class i extends wa{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var Yn=class i extends ft{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,u=c+1,d=e/o,f=t/c,h=[],p=[],x=[],g=[];for(let m=0;m<u;m++){let b=m*f-a;for(let A=0;A<l;A++){let _=A*d-r;p.push(_,-b,0),x.push(0,0,1),g.push(A/o),g.push(1-m/c)}}for(let m=0;m<c;m++)for(let b=0;b<o;b++){let A=b+l*m,_=b+l*(m+1),w=b+1+l*(m+1),T=b+1+l*m;h.push(A,_,T),h.push(_,w,T)}this.setIndex(h),this.setAttribute("position",new et(p,3)),this.setAttribute("normal",new et(x,3)),this.setAttribute("uv",new et(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var Sr=class i extends ft{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,u=[],d=new L,f=new L,h=[],p=[],x=[],g=[];for(let m=0;m<=n;m++){let b=[],A=m/n,_=a+A*o,w=e*Math.cos(_),T=Math.sqrt(e*e-w*w),C=0;m===0&&a===0?C=.5/t:m===n&&c===Math.PI&&(C=-.5/t);for(let y=0;y<=t;y++){let S=y/t,E=s+S*r;d.x=-T*Math.cos(E),d.y=w,d.z=T*Math.sin(E),p.push(d.x,d.y,d.z),f.copy(d).normalize(),x.push(f.x,f.y,f.z),g.push(S+C,1-A),b.push(l++)}u.push(b)}for(let m=0;m<n;m++)for(let b=0;b<t;b++){let A=u[m][b+1],_=u[m][b],w=u[m+1][b],T=u[m+1][b+1];(m!==0||a>0)&&h.push(A,_,T),(m!==n-1||c<Math.PI)&&h.push(_,w,T)}this.setIndex(h),this.setAttribute("position",new et(p,3)),this.setAttribute("normal",new et(x,3)),this.setAttribute("uv",new et(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};function Ns(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(fp(s))s.isRenderTargetTexture?(De("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(fp(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function sn(i){let e={};for(let t=0;t<i.length;t++){let n=Ns(i[t]);for(let s in n)e[s]=n[s]}return e}function fp(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Hx(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Yd(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:nt.workingColorSpace}var dm={clone:Ns,merge:sn},Wx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Xx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Tn=class extends pn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Wx,this.fragmentShader=Xx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ns(e.uniforms),this.uniformsGroups=Hx(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new be().setHex(s.value);break;case"v2":this.uniforms[n].value=new re().fromArray(s.value);break;case"v3":this.uniforms[n].value=new L().fromArray(s.value);break;case"v4":this.uniforms[n].value=new bt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Ke().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Ye().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},pl=class extends Tn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},un=class extends pn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new be(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=hc,this.normalScale=new re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ai,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},mn=class extends un{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new re(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Je(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new be(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new be(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new be(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var ml=class extends pn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=$p,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},gl=class extends pn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Yi(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Yo(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}function qx(i){function e(s,r){return i[s]-i[r]}let t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function hp(i,e,t){let n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){let o=t[r]*e;for(let c=0;c!==e;++c)s[a++]=i[o+c]}return s}function $x(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=i[s++];while(r!==void 0)}var ci=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},xl=class extends ci{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ld,endingEnd:ld}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case cd:r=e,o=2*t-n;break;case ud:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case cd:a=e,c=2*n-t;break;case ud:a=1,c=n+s[1]-s[0];break;default:a=e-1,c=t}let l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,h=this._weightNext,p=(n-t)/(s-t),x=p*p,g=x*p,m=-f*g+2*f*x-f*p,b=(1+f)*g+(-1.5-2*f)*x+(-.5+f)*p+1,A=(-1-h)*g+(1.5+h)*x+.5*p,_=h*g-h*x;for(let w=0;w!==o;++w)r[w]=m*a[u+w]+b*a[l+w]+A*a[c+w]+_*a[d+w];return r}},_l=class extends ci{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=(n-t)/(s-t),d=1-u;for(let f=0;f!==o;++f)r[f]=a[l+f]*d+a[c+f]*u;return r}},yl=class extends ci{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},vl=class extends ci{interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=this.inTangents,d=this.outTangents;if(!u||!d){let p=(n-t)/(s-t),x=1-p;for(let g=0;g!==o;++g)r[g]=a[l+g]*x+a[c+g]*p;return r}let f=o*2,h=e-1;for(let p=0;p!==o;++p){let x=a[l+p],g=a[c+p],m=h*f+p*2,b=d[m],A=d[m+1],_=e*f+p*2,w=u[_],T=u[_+1],C=Kx(n,t,b,w,s);r[p]=fm(C,x,A,T,g)}return r}};function fm(i,e,t,n,s){let r=1-i;return r*r*r*e+3*r*r*i*t+3*r*i*i*n+i*i*i*s}function Yx(i,e,t,n,s){let r=1-i;return 3*r*r*(t-e)+6*r*i*(n-t)+3*i*i*(s-n)}function Kx(i,e,t,n,s){let r=(i-e)/(s-e);for(let a=0;a<8;a++){let o=fm(r,e,t,n,s)-i;if(Math.abs(o)<1e-10)break;let c=Yx(r,e,t,n,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-o/c))}return r}var gn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Yi(t,this.TimeBufferType),this.values=Yi(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Yi(e.times,Array),values:Yi(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s),Yo(e.settings)&&(n.settings={inTangents:Yi(e.settings.inTangents,Array),outTangents:Yi(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new yl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new _l(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new xl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new vl(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case bs:t=this.InterpolantFactoryMethodDiscrete;break;case Ss:t=this.InterpolantFactoryMethodLinear;break;case qo:t=this.InterpolantFactoryMethodSmooth;break;case od:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return De("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return bs;case this.InterpolantFactoryMethodLinear:return Ss;case this.InterpolantFactoryMethodSmooth:return qo;case this.InterpolantFactoryMethodBezier:return od}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e;Yo(this.settings)&&(pp(this.settings.inTangents,e),pp(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(We("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(We("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){We("KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){We("KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(s!==void 0&&Dg(s))for(let o=0,c=s.length;o!==c;++o){let l=s[o];if(isNaN(l)){We("KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===qo,r=e.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=e[o],u=e[o+1];if(l!==u&&(o!==1||l!==e[0]))if(s)c=!0;else{let d=o*n,f=d-n,h=d+n;for(let p=0;p!==n;++p){let x=t[d+p];if(x!==t[f+p]||x!==t[h+p]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let d=o*n,f=a*n;for(let h=0;h!==n;++h)t[f+h]=t[d+h]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,Yo(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function pp(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}gn.prototype.ValueTypeName="";gn.prototype.TimeBufferType=Float32Array;gn.prototype.ValueBufferType=Float32Array;gn.prototype.DefaultInterpolation=Ss;var Ii=class extends gn{constructor(e,t,n){super(e,t,n)}};Ii.prototype.ValueTypeName="bool";Ii.prototype.ValueBufferType=Array;Ii.prototype.DefaultInterpolation=bs;Ii.prototype.InterpolantFactoryMethodLinear=void 0;Ii.prototype.InterpolantFactoryMethodSmooth=void 0;var Na=class extends gn{constructor(e,t,n,s){super(e,t,n,s)}};Na.prototype.ValueTypeName="color";var Li=class extends gn{constructor(e,t,n,s){super(e,t,n,s)}};Li.prototype.ValueTypeName="number";var bl=class extends ci{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(s-t),l=e*o;for(let u=l+o;l!==u;l+=4)Qt.slerpFlat(r,0,a,l-o,a,l,c);return r}},Di=class extends gn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new bl(this.times,this.values,this.getValueSize(),e)}};Di.prototype.ValueTypeName="quaternion";Di.prototype.InterpolantFactoryMethodSmooth=void 0;var Ni=class extends gn{constructor(e,t,n){super(e,t,n)}};Ni.prototype.ValueTypeName="string";Ni.prototype.ValueBufferType=Array;Ni.prototype.DefaultInterpolation=bs;Ni.prototype.InterpolantFactoryMethodLinear=void 0;Ni.prototype.InterpolantFactoryMethodSmooth=void 0;var Qi=class extends gn{constructor(e,t,n,s){super(e,t,n,s)}};Qi.prototype.ValueTypeName="vector";var Ua=class{constructor(e="",t=-1,n=[],s=qp){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=Nn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,s=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(Zx(n[a]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(gn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){let r=t.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);let u=qx(c);c=hp(c,1,u),l=hp(l,1,u),!s&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new Li(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){let l=e[o],u=l.name.match(r);if(u&&u.length>1){let d=u[1],f=s[d];f||(s[d]=f=[]),f.push(l)}}let a=[];for(let o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,n));return a}resetDuration(){let e=this.tracks,t=0;for(let n=0,s=e.length;n!==s;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function jx(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Li;case"vector":case"vector2":case"vector3":case"vector4":return Qi;case"color":return Na;case"quaternion":return Di;case"bool":case"boolean":return Ii;case"string":return Ni}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function Zx(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=jx(i.type);if(i.times===void 0){let n=[],s=[];$x(i.keys,n,s,"value"),i.times=n,i.values=s}let t;return e.parse!==void 0?t=e.parse(i):t=new e(i.name,i.times,i.values,i.interpolation),Yo(i.settings)&&(t.settings={inTangents:Yi(i.settings.inTangents,Float32Array),outTangents:Yi(i.settings.outTangents,Float32Array)}),t}var si={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(mp(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!mp(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function mp(i){try{let e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var Sl=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,d){return l.push(u,d),this},this.removeHandler=function(u){let d=l.indexOf(u);return d!==-1&&l.splice(d,2),this},this.getHandler=function(u){for(let d=0,f=l.length;d<f;d+=2){let h=l[d],p=l[d+1];if(h.global&&(h.lastIndex=0),h.test(u))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},hm=new Sl,ui=class{constructor(e){this.manager=e!==void 0?e:hm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};ui.DEFAULT_MATERIAL_NAME="__DEFAULT";var wi={},gd=class extends Error{constructor(e,t){super(e),this.response=t}},Mr=class extends ui{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=si.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(wi[e]!==void 0){wi[e].push({onLoad:t,onProgress:n,onError:s});return}wi[e]=[],wi[e].push({onLoad:t,onProgress:n,onError:s});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&De("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let u=wi[e],d=l.body.getReader(),f=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),h=f?parseInt(f):0,p=h!==0,x=0,g=new ReadableStream({start(m){b();function b(){d.read().then(({done:A,value:_})=>{if(A)m.close();else{x+=_.byteLength;let w=new ProgressEvent("progress",{lengthComputable:p,loaded:x,total:h});for(let T=0,C=u.length;T<C;T++){let y=u[T];y.onProgress&&y.onProgress(w)}m.enqueue(_),b()}},A=>{m.error(A)})}}});return new Response(g)}else throw new gd(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return l.json();default:if(o==="")return l.text();{let d=/charset="?([^;"\s]*)"?/i.exec(o),f=d&&d[1]?d[1].toLowerCase():void 0,h=new TextDecoder(f);return l.arrayBuffer().then(p=>h.decode(p))}}}).then(l=>{si.add(`file:${e}`,l);let u=wi[e];delete wi[e];for(let d=0,f=u.length;d<f;d++){let h=u[d];h.onLoad&&h.onLoad(l)}}).catch(l=>{let u=wi[e];if(u===void 0)throw this.manager.itemError(e),l;delete wi[e];for(let d=0,f=u.length;d<f;d++){let h=u[d];h.onError&&h.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var tr=new WeakMap,Ml=class extends ui{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=si.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let d=tr.get(a);d===void 0&&(d=[],tr.set(a,d)),d.push({onLoad:t,onError:s})}return a}let o=lr("img");function c(){u(),t&&t(this);let d=tr.get(this)||[];for(let f=0;f<d.length;f++){let h=d[f];h.onLoad&&h.onLoad(this)}tr.delete(this),r.manager.itemEnd(e)}function l(d){u(),s&&s(d),si.remove(`image:${e}`);let f=tr.get(this)||[];for(let h=0;h<f.length;h++){let p=f[h];p.onError&&p.onError(d)}tr.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),si.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}};var Fa=class extends ui{constructor(e){super(e)}load(e,t,n,s){let r=new $t,a=new Ml(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}},Cs=class extends _t{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new be(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},wr=class extends Cs{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(_t.DEFAULT_UP),this.updateMatrix(),this.groundColor=new be(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},sd=new Ye,gp=new L,xp=new L,Tr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new re(512,512),this.mapType=_n,this.map=null,this.mapPass=null,this.matrix=new Ye,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new _r,this._frameExtents=new re(1,1),this._viewportCount=1,this._viewports=[new bt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;gp.setFromMatrixPosition(e.matrixWorld),t.position.copy(gp),xp.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(xp),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){sd.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(sd,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;e.coordinateSystem===or||e.reversedDepth?t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),t.multiply(sd)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Wo=new L,Xo=new Qt,ii=new L,Oa=class extends _t{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ye,this.projectionMatrix=new Ye,this.projectionMatrixInverse=new Ye,this.coordinateSystem=Xn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Wo,Xo,ii),ii.x===1&&ii.y===1&&ii.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Wo,Xo,ii.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Wo,Xo,ii),ii.x===1&&ii.y===1&&ii.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Wo,Xo,ii.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},$i=new L,_p=new re,yp=new re,qt=class extends Oa{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Ms*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ca*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ms*2*Math.atan(Math.tan(ca*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){$i.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set($i.x,$i.y).multiplyScalar(-e/$i.z),$i.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set($i.x,$i.y).multiplyScalar(-e/$i.z)}getViewSize(e,t){return this.getViewBounds(e,_p,yp),t.subVectors(yp,_p)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ca*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},xd=class extends Tr{constructor(){super(new qt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=Ms*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},Ba=class extends Cs{constructor(e,t,n=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(_t.DEFAULT_UP),this.updateMatrix(),this.target=new _t,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new xd}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},_d=class extends Tr{constructor(){super(new qt(90,1,.5,500)),this.isPointLightShadow=!0}},Rs=class extends Cs{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new _d}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Kn=class extends Oa{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},yd=class extends Tr{constructor(){super(new Kn(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},es=class extends Cs{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(_t.DEFAULT_UP),this.updateMatrix(),this.target=new _t,this.shadow=new yd}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var Ui=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var rd=new WeakMap,ka=class extends ui{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&De("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&De("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=si.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(l=>{rd.has(a)===!0?(s&&s(rd.get(a)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(l),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);return}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(l){return si.add(`image-bitmap:${e}`,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),rd.set(c,l),si.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});si.add(`image-bitmap:${e}`,c),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var nr=-90,ir=1,wl=class extends _t{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new qt(nr,ir,e,t);s.layers=this.layers,this.add(s);let r=new qt(nr,ir,e,t);r.layers=this.layers,this.add(r);let a=new qt(nr,ir,e,t);a.layers=this.layers,this.add(a);let o=new qt(nr,ir,e,t);o.layers=this.layers,this.add(o);let c=new qt(nr,ir,e,t);c.layers=this.layers,this.add(c);let l=new qt(nr,ir,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(let l of t)this.remove(l);if(e===Xn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===or)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,f,h),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Tl=class extends qt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Kd="\\[\\]\\.:\\/",Jx=new RegExp("["+Kd+"]","g"),jd="[^"+Kd+"]",Qx="[^"+Kd.replace("\\.","")+"]",e0=/((?:WC+[\/:])*)/.source.replace("WC",jd),t0=/(WCOD+)?/.source.replace("WCOD",Qx),n0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",jd),i0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",jd),s0=new RegExp("^"+e0+t0+n0+i0+"$"),r0=["material","materials","bones","map"],vd=class{constructor(e,t,n){let s=n||At.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},At=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Jx,"")}static parseTrackName(e){let t=s0.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);r0.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){De("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){We("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){We("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){We("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){We("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){We("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){We("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){We("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let a=e[s];if(a===void 0){let l=t.nodeName;We("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){We("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){We("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};At.Composite=vd;At.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};At.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};At.prototype.GetterByBindingType=[At.prototype._getValue_direct,At.prototype._getValue_array,At.prototype._getValue_arrayElement,At.prototype._getValue_toArray];At.prototype.SetterByBindingTypeAndVersioning=[[At.prototype._setValue_direct,At.prototype._setValue_direct_setNeedsUpdate,At.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[At.prototype._setValue_array,At.prototype._setValue_array_setNeedsUpdate,At.prototype._setValue_array_setMatrixWorldNeedsUpdate],[At.prototype._setValue_arrayElement,At.prototype._setValue_arrayElement_setNeedsUpdate,At.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[At.prototype._setValue_fromArray,At.prototype._setValue_fromArray_setNeedsUpdate,At.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var T1=new Float32Array(1);var vp=new Ye,za=class{constructor(e,t,n=0,s=1/0){this.ray=new ai(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new dr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):We("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return vp.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(vp),this}intersectObject(e,t=!0,n=[]){return bd(e,this,n,t),n.sort(bp),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)bd(e[s],this,n,t);return n.sort(bp),n}};function bp(i,e){return i.distance-e.distance}function bd(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let a=0,o=r.length;a<o;a++)bd(r[a],e,t,!0)}}var ts=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Je(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Je(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Sd=class i{static{i.prototype.isMatrix2=!0}constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};var Ga=class extends qn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function Zd(i,e,t,n){let s=a0(n);switch(t){case Gd:return i*e;case Dl:return i*e/s.components*s.byteLength;case Nl:return i*e/s.components*s.byteLength;case rs:return i*e*2/s.components*s.byteLength;case Ul:return i*e*2/s.components*s.byteLength;case Vd:return i*e*3/s.components*s.byteLength;case En:return i*e*4/s.components*s.byteLength;case Fl:return i*e*4/s.components*s.byteLength;case Wa:case Xa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case qa:case $a:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Bl:case zl:return Math.max(i,16)*Math.max(e,8)/4;case Ol:case kl:return Math.max(i,8)*Math.max(e,8)/2;case Gl:case Vl:case Wl:case Xl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Hl:case Ya:case ql:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case $l:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Yl:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Kl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case jl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Zl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Jl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Ql:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case ec:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case tc:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case nc:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case ic:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case sc:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case rc:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case ac:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case oc:case lc:case cc:return Math.ceil(i/4)*Math.ceil(e/4)*16;case uc:case dc:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ka:case fc:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function a0(i){switch(i){case _n:case Od:return{byteLength:1,components:1};case Rr:case Bd:case Qn:return{byteLength:2,components:1};case Il:case Ll:return{byteLength:2,components:4};case Jn:case Pl:case An:return{byteLength:4,components:1};case kd:case zd:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Al}}));typeof window<"u"&&(window.__THREE__?De("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Al);function Um(){let i=null,e=!1,t=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function o0(i){let e=new WeakMap;function t(o,c){let l=o.array,u=o.usage,d=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,u),o.onUploadCallback();let h;if(l instanceof Float32Array)h=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)h=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?h=i.HALF_FLOAT:h=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)h=i.SHORT;else if(l instanceof Uint32Array)h=i.UNSIGNED_INT;else if(l instanceof Int32Array)h=i.INT;else if(l instanceof Int8Array)h=i.BYTE;else if(l instanceof Uint8Array)h=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)h=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:h,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,c,l){let u=c.array,d=c.updateRanges;if(i.bindBuffer(l,o),d.length===0)i.bufferSubData(l,0,u);else{d.sort((h,p)=>h.start-p.start);let f=0;for(let h=1;h<d.length;h++){let p=d[f],x=d[h];x.start<=p.start+p.count+1?p.count=Math.max(p.count,x.start+x.count-p.start):(++f,d[f]=x)}d.length=f+1;for(let h=0,p=d.length;h<p;h++){let x=d[h];i.bufferSubData(l,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var l0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,c0=`#ifdef USE_ALPHAHASH
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
#endif`,u0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,d0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,f0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,h0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,p0=`#ifdef USE_AOMAP
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
#endif`,m0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,g0=`#ifdef USE_BATCHING
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
#endif`,x0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,_0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,y0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,v0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,b0=`#ifdef USE_IRIDESCENCE
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
#endif`,S0=`#ifdef USE_BUMPMAP
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
#endif`,M0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,w0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,T0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,A0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,E0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,C0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,R0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,P0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,I0=`#define PI 3.141592653589793
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
} // validated`,L0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,D0=`vec3 transformedNormal = objectNormal;
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
#endif`,N0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,U0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,F0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,O0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,B0="gl_FragColor = linearToOutputTexel( gl_FragColor );",k0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,z0=`#ifdef USE_ENVMAP
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
#endif`,G0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,V0=`#ifdef USE_ENVMAP
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
#endif`,H0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,W0=`#ifdef USE_ENVMAP
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
#endif`,X0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,q0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,$0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Y0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,K0=`#ifdef USE_GRADIENTMAP
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
}`,j0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Z0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,J0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Q0=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,e_=`#ifdef USE_ENVMAP
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
#endif`,t_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,n_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,i_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,s_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,r_=`PhysicalMaterial material;
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
#endif`,a_=`uniform sampler2D dfgLUT;
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
}`,o_=`
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
#endif`,l_=`#if defined( RE_IndirectDiffuse )
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
#endif`,c_=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,u_=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,d_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,f_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,h_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,p_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,m_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,g_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,x_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,__=`#if defined( USE_POINTS_UV )
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
#endif`,y_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,v_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,b_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,S_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,M_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,w_=`#ifdef USE_MORPHTARGETS
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
#endif`,T_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,A_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,E_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,C_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,R_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,P_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,I_=`#ifdef USE_NORMALMAP
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
#endif`,L_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,D_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,N_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,U_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,F_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,O_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,B_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,k_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,z_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,G_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,V_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,H_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,W_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,X_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,q_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,$_=`float getShadowMask() {
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
}`,Y_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,K_=`#ifdef USE_SKINNING
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
#endif`,j_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Z_=`#ifdef USE_SKINNING
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
#endif`,J_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Q_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ey=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ty=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,ny=`#ifdef USE_TRANSMISSION
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
#endif`,iy=`#ifdef USE_TRANSMISSION
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
#endif`,sy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ry=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ay=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,oy=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,ly=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,cy=`uniform sampler2D t2D;
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
}`,uy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,dy=`#ifdef ENVMAP_TYPE_CUBE
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
}`,fy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hy=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,py=`#include <common>
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
}`,my=`#if DEPTH_PACKING == 3200
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
}`,gy=`#define DISTANCE
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
}`,xy=`#define DISTANCE
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
}`,_y=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,yy=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vy=`uniform float scale;
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
}`,by=`uniform vec3 diffuse;
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
}`,Sy=`#include <common>
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
}`,My=`uniform vec3 diffuse;
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
}`,wy=`#define LAMBERT
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
}`,Ty=`#define LAMBERT
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
}`,Ay=`#define MATCAP
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
}`,Ey=`#define MATCAP
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
}`,Cy=`#define NORMAL
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
}`,Ry=`#define NORMAL
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
}`,Py=`#define PHONG
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
}`,Iy=`#define PHONG
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
}`,Ly=`#define STANDARD
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
}`,Dy=`#define STANDARD
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
}`,Ny=`#define TOON
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
}`,Uy=`#define TOON
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
}`,Fy=`uniform float size;
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
}`,Oy=`uniform vec3 diffuse;
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
}`,By=`#include <common>
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
}`,ky=`uniform vec3 color;
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
}`,zy=`uniform float rotation;
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
}`,Gy=`uniform vec3 diffuse;
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
}`,tt={alphahash_fragment:l0,alphahash_pars_fragment:c0,alphamap_fragment:u0,alphamap_pars_fragment:d0,alphatest_fragment:f0,alphatest_pars_fragment:h0,aomap_fragment:p0,aomap_pars_fragment:m0,batching_pars_vertex:g0,batching_vertex:x0,begin_vertex:_0,beginnormal_vertex:y0,bsdfs:v0,iridescence_fragment:b0,bumpmap_pars_fragment:S0,clipping_planes_fragment:M0,clipping_planes_pars_fragment:w0,clipping_planes_pars_vertex:T0,clipping_planes_vertex:A0,color_fragment:E0,color_pars_fragment:C0,color_pars_vertex:R0,color_vertex:P0,common:I0,cube_uv_reflection_fragment:L0,defaultnormal_vertex:D0,displacementmap_pars_vertex:N0,displacementmap_vertex:U0,emissivemap_fragment:F0,emissivemap_pars_fragment:O0,colorspace_fragment:B0,colorspace_pars_fragment:k0,envmap_fragment:z0,envmap_common_pars_fragment:G0,envmap_pars_fragment:V0,envmap_pars_vertex:H0,envmap_physical_pars_fragment:e_,envmap_vertex:W0,fog_vertex:X0,fog_pars_vertex:q0,fog_fragment:$0,fog_pars_fragment:Y0,gradientmap_pars_fragment:K0,lightmap_pars_fragment:j0,lights_lambert_fragment:Z0,lights_lambert_pars_fragment:J0,lights_pars_begin:Q0,lights_toon_fragment:t_,lights_toon_pars_fragment:n_,lights_phong_fragment:i_,lights_phong_pars_fragment:s_,lights_physical_fragment:r_,lights_physical_pars_fragment:a_,lights_fragment_begin:o_,lights_fragment_maps:l_,lights_fragment_end:c_,lightprobes_pars_fragment:u_,logdepthbuf_fragment:d_,logdepthbuf_pars_fragment:f_,logdepthbuf_pars_vertex:h_,logdepthbuf_vertex:p_,map_fragment:m_,map_pars_fragment:g_,map_particle_fragment:x_,map_particle_pars_fragment:__,metalnessmap_fragment:y_,metalnessmap_pars_fragment:v_,morphinstance_vertex:b_,morphcolor_vertex:S_,morphnormal_vertex:M_,morphtarget_pars_vertex:w_,morphtarget_vertex:T_,normal_fragment_begin:A_,normal_fragment_maps:E_,normal_pars_fragment:C_,normal_pars_vertex:R_,normal_vertex:P_,normalmap_pars_fragment:I_,clearcoat_normal_fragment_begin:L_,clearcoat_normal_fragment_maps:D_,clearcoat_pars_fragment:N_,iridescence_pars_fragment:U_,opaque_fragment:F_,packing:O_,premultiplied_alpha_fragment:B_,project_vertex:k_,dithering_fragment:z_,dithering_pars_fragment:G_,roughnessmap_fragment:V_,roughnessmap_pars_fragment:H_,shadowmap_pars_fragment:W_,shadowmap_pars_vertex:X_,shadowmap_vertex:q_,shadowmask_pars_fragment:$_,skinbase_vertex:Y_,skinning_pars_vertex:K_,skinning_vertex:j_,skinnormal_vertex:Z_,specularmap_fragment:J_,specularmap_pars_fragment:Q_,tonemapping_fragment:ey,tonemapping_pars_fragment:ty,transmission_fragment:ny,transmission_pars_fragment:iy,uv_pars_fragment:sy,uv_pars_vertex:ry,uv_vertex:ay,worldpos_vertex:oy,background_vert:ly,background_frag:cy,backgroundCube_vert:uy,backgroundCube_frag:dy,cube_vert:fy,cube_frag:hy,depth_vert:py,depth_frag:my,distance_vert:gy,distance_frag:xy,equirect_vert:_y,equirect_frag:yy,linedashed_vert:vy,linedashed_frag:by,meshbasic_vert:Sy,meshbasic_frag:My,meshlambert_vert:wy,meshlambert_frag:Ty,meshmatcap_vert:Ay,meshmatcap_frag:Ey,meshnormal_vert:Cy,meshnormal_frag:Ry,meshphong_vert:Py,meshphong_frag:Iy,meshphysical_vert:Ly,meshphysical_frag:Dy,meshtoon_vert:Ny,meshtoon_frag:Uy,points_vert:Fy,points_frag:Oy,shadow_vert:By,shadow_frag:ky,sprite_vert:zy,sprite_frag:Gy},xe={common:{diffuse:{value:new be(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ke}},envmap:{envMap:{value:null},envMapRotation:{value:new Ke},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ke},normalScale:{value:new re(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new be(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new L},probesMax:{value:new L},probesResolution:{value:new L}},points:{diffuse:{value:new be(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0},uvTransform:{value:new Ke}},sprite:{diffuse:{value:new be(16777215)},opacity:{value:1},center:{value:new re(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}}},pi={basic:{uniforms:sn([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.fog]),vertexShader:tt.meshbasic_vert,fragmentShader:tt.meshbasic_frag},lambert:{uniforms:sn([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new be(0)},envMapIntensity:{value:1}}]),vertexShader:tt.meshlambert_vert,fragmentShader:tt.meshlambert_frag},phong:{uniforms:sn([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new be(0)},specular:{value:new be(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:tt.meshphong_vert,fragmentShader:tt.meshphong_frag},standard:{uniforms:sn([xe.common,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.roughnessmap,xe.metalnessmap,xe.fog,xe.lights,{emissive:{value:new be(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag},toon:{uniforms:sn([xe.common,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.gradientmap,xe.fog,xe.lights,{emissive:{value:new be(0)}}]),vertexShader:tt.meshtoon_vert,fragmentShader:tt.meshtoon_frag},matcap:{uniforms:sn([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,{matcap:{value:null}}]),vertexShader:tt.meshmatcap_vert,fragmentShader:tt.meshmatcap_frag},points:{uniforms:sn([xe.points,xe.fog]),vertexShader:tt.points_vert,fragmentShader:tt.points_frag},dashed:{uniforms:sn([xe.common,xe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:tt.linedashed_vert,fragmentShader:tt.linedashed_frag},depth:{uniforms:sn([xe.common,xe.displacementmap]),vertexShader:tt.depth_vert,fragmentShader:tt.depth_frag},normal:{uniforms:sn([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,{opacity:{value:1}}]),vertexShader:tt.meshnormal_vert,fragmentShader:tt.meshnormal_frag},sprite:{uniforms:sn([xe.sprite,xe.fog]),vertexShader:tt.sprite_vert,fragmentShader:tt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:tt.background_vert,fragmentShader:tt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ke}},vertexShader:tt.backgroundCube_vert,fragmentShader:tt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:tt.cube_vert,fragmentShader:tt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:tt.equirect_vert,fragmentShader:tt.equirect_frag},distance:{uniforms:sn([xe.common,xe.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:tt.distance_vert,fragmentShader:tt.distance_frag},shadow:{uniforms:sn([xe.lights,xe.fog,{color:{value:new be(0)},opacity:{value:1}}]),vertexShader:tt.shadow_vert,fragmentShader:tt.shadow_frag}};pi.physical={uniforms:sn([pi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ke},clearcoatNormalScale:{value:new re(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ke},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ke},sheen:{value:0},sheenColor:{value:new be(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ke},transmissionSamplerSize:{value:new re},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ke},attenuationDistance:{value:0},attenuationColor:{value:new be(0)},specularColor:{value:new be(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ke},anisotropyVector:{value:new re},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ke}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag};var gc={r:0,b:0,g:0},Vy=new Ye,Fm=new Ke;Fm.set(-1,0,0,0,1,0,0,0,1);function Hy(i,e,t,n,s,r){let a=new be(0),o=s===!0?0:1,c,l,u=null,d=0,f=null;function h(b){let A=b.isScene===!0?b.background:null;if(A&&A.isTexture){let _=b.backgroundBlurriness>0;A=e.get(A,_)}return A}function p(b){let A=!1,_=h(b);_===null?g(a,o):_&&_.isColor&&(g(_,1),A=!0);let w=i.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||A)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function x(b,A){let _=h(A);_&&(_.isCubeTexture||_.mapping===Ha)?(l===void 0&&(l=new Ne(new Un(1,1,1),new Tn({name:"BackgroundCubeMaterial",uniforms:Ns(pi.backgroundCube.uniforms),vertexShader:pi.backgroundCube.vertexShader,fragmentShader:pi.backgroundCube.fragmentShader,side:dn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,T,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=_,l.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Vy.makeRotationFromEuler(A.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Fm),l.material.toneMapped=nt.getTransfer(_.colorSpace)!==xt,(u!==_||d!==_.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,u=_,d=_.version,f=i.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new Ne(new Yn(2,2),new Tn({name:"BackgroundMaterial",uniforms:Ns(pi.background.uniforms),vertexShader:pi.background.vertexShader,fragmentShader:pi.background.fragmentShader,side:di,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.toneMapped=nt.getTransfer(_.colorSpace)!==xt,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(u!==_||d!==_.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=_,d=_.version,f=i.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function g(b,A){b.getRGB(gc,Yd(i)),t.buffers.color.setClear(gc.r,gc.g,gc.b,A,r)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,A=1){a.set(b),o=A,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(b){o=b,g(a,o)},render:p,addToRenderList:x,dispose:m}}function Wy(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null),r=s,a=!1;function o(D,F,N,I,U){let z=!1,V=d(D,I,N,F);r!==V&&(r=V,l(r.object)),z=h(D,I,N,U),z&&p(D,I,N,U),U!==null&&e.update(U,i.ELEMENT_ARRAY_BUFFER),(z||a)&&(a=!1,_(D,F,N,I),U!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(U).buffer))}function c(){return i.createVertexArray()}function l(D){return i.bindVertexArray(D)}function u(D){return i.deleteVertexArray(D)}function d(D,F,N,I){let U=I.wireframe===!0,z=n[F.id];z===void 0&&(z={},n[F.id]=z);let V=D.isInstancedMesh===!0?D.id:0,Z=z[V];Z===void 0&&(Z={},z[V]=Z);let q=Z[N.id];q===void 0&&(q={},Z[N.id]=q);let J=q[U];return J===void 0&&(J=f(c()),q[U]=J),J}function f(D){let F=[],N=[],I=[];for(let U=0;U<t;U++)F[U]=0,N[U]=0,I[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:N,attributeDivisors:I,object:D,attributes:{},index:null}}function h(D,F,N,I){let U=r.attributes,z=F.attributes,V=0,Z=N.getAttributes();for(let q in Z)if(Z[q].location>=0){let ie=U[q],Ue=z[q];if(Ue===void 0&&(q==="instanceMatrix"&&D.instanceMatrix&&(Ue=D.instanceMatrix),q==="instanceColor"&&D.instanceColor&&(Ue=D.instanceColor)),ie===void 0||ie.attribute!==Ue||Ue&&ie.data!==Ue.data)return!0;V++}return r.attributesNum!==V||r.index!==I}function p(D,F,N,I){let U={},z=F.attributes,V=0,Z=N.getAttributes();for(let q in Z)if(Z[q].location>=0){let ie=z[q];ie===void 0&&(q==="instanceMatrix"&&D.instanceMatrix&&(ie=D.instanceMatrix),q==="instanceColor"&&D.instanceColor&&(ie=D.instanceColor));let Ue={};Ue.attribute=ie,ie&&ie.data&&(Ue.data=ie.data),U[q]=Ue,V++}r.attributes=U,r.attributesNum=V,r.index=I}function x(){let D=r.newAttributes;for(let F=0,N=D.length;F<N;F++)D[F]=0}function g(D){m(D,0)}function m(D,F){let N=r.newAttributes,I=r.enabledAttributes,U=r.attributeDivisors;N[D]=1,I[D]===0&&(i.enableVertexAttribArray(D),I[D]=1),U[D]!==F&&(i.vertexAttribDivisor(D,F),U[D]=F)}function b(){let D=r.newAttributes,F=r.enabledAttributes;for(let N=0,I=F.length;N<I;N++)F[N]!==D[N]&&(i.disableVertexAttribArray(N),F[N]=0)}function A(D,F,N,I,U,z,V){V===!0?i.vertexAttribIPointer(D,F,N,U,z):i.vertexAttribPointer(D,F,N,I,U,z)}function _(D,F,N,I){x();let U=I.attributes,z=N.getAttributes(),V=F.defaultAttributeValues;for(let Z in z){let q=z[Z];if(q.location>=0){let J=U[Z];if(J===void 0&&(Z==="instanceMatrix"&&D.instanceMatrix&&(J=D.instanceMatrix),Z==="instanceColor"&&D.instanceColor&&(J=D.instanceColor)),J!==void 0){let ie=J.normalized,Ue=J.itemSize,Ee=e.get(J);if(Ee===void 0)continue;let ht=Ee.buffer,rt=Ee.type,ut=Ee.bytesPerElement,j=rt===i.INT||rt===i.UNSIGNED_INT||J.gpuType===Pl;if(J.isInterleavedBufferAttribute){let te=J.data,_e=te.stride,Xe=J.offset;if(te.isInstancedInterleavedBuffer){for(let Me=0;Me<q.locationSize;Me++)m(q.location+Me,te.meshPerAttribute);D.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let Me=0;Me<q.locationSize;Me++)g(q.location+Me);i.bindBuffer(i.ARRAY_BUFFER,ht);for(let Me=0;Me<q.locationSize;Me++)A(q.location+Me,Ue/q.locationSize,rt,ie,_e*ut,(Xe+Ue/q.locationSize*Me)*ut,j)}else{if(J.isInstancedBufferAttribute){for(let te=0;te<q.locationSize;te++)m(q.location+te,J.meshPerAttribute);D.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let te=0;te<q.locationSize;te++)g(q.location+te);i.bindBuffer(i.ARRAY_BUFFER,ht);for(let te=0;te<q.locationSize;te++)A(q.location+te,Ue/q.locationSize,rt,ie,Ue*ut,Ue/q.locationSize*te*ut,j)}}else if(V!==void 0){let ie=V[Z];if(ie!==void 0)switch(ie.length){case 2:i.vertexAttrib2fv(q.location,ie);break;case 3:i.vertexAttrib3fv(q.location,ie);break;case 4:i.vertexAttrib4fv(q.location,ie);break;default:i.vertexAttrib1fv(q.location,ie)}}}}b()}function w(){S();for(let D in n){let F=n[D];for(let N in F){let I=F[N];for(let U in I){let z=I[U];for(let V in z)u(z[V].object),delete z[V];delete I[U]}}delete n[D]}}function T(D){if(n[D.id]===void 0)return;let F=n[D.id];for(let N in F){let I=F[N];for(let U in I){let z=I[U];for(let V in z)u(z[V].object),delete z[V];delete I[U]}}delete n[D.id]}function C(D){for(let F in n){let N=n[F];for(let I in N){let U=N[I];if(U[D.id]===void 0)continue;let z=U[D.id];for(let V in z)u(z[V].object),delete z[V];delete U[D.id]}}}function y(D){for(let F in n){let N=n[F],I=D.isInstancedMesh===!0?D.id:0,U=N[I];if(U!==void 0){for(let z in U){let V=U[z];for(let Z in V)u(V[Z].object),delete V[Z];delete U[z]}delete N[I],Object.keys(N).length===0&&delete n[F]}}}function S(){E(),a=!0,r!==s&&(r=s,l(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:S,resetDefaultState:E,dispose:w,releaseStatesOfGeometry:T,releaseStatesOfObject:y,releaseStatesOfProgram:C,initAttributes:x,enableAttribute:g,disableUnusedAttributes:b}}function Xy(i,e,t){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function a(c,l,u){u!==0&&(i.drawArraysInstanced(n,c,l,u),t.update(l,n,u))}function o(c,l,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,u);let f=0;for(let h=0;h<u;h++)f+=l[h];t.update(f,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function qy(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let C=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==En&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){let y=C===Qn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==_n&&C!==An&&!y&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",u=c(l);u!==l&&(De("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let d=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&f===!1&&De("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),A=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=i.getParameter(i.MAX_SAMPLES),T=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:h,maxVertexTextures:p,maxTextureSize:x,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:b,maxVaryings:A,maxFragmentUniforms:_,maxSamples:w,samples:T}}function $y(i){let e=this,t=null,n=0,s=!1,r=!1,a=new ln,o=new Ke,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){let h=d.length!==0||f||n!==0||s;return s=f,n=d.length,h},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,h){let p=d.clippingPlanes,x=d.clipIntersection,g=d.clipShadows,m=i.get(d);if(!s||p===null||p.length===0||r&&!g)r?u(null):l();else{let b=r?0:n,A=b*4,_=m.clippingState||null;c.value=_,_=u(p,f,A,h);for(let w=0;w!==A;++w)_[w]=t[w];m.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,f,h,p){let x=d!==null?d.length:0,g=null;if(x!==0){if(g=c.value,p!==!0||g===null){let m=h+x*4,b=f.matrixWorldInverse;o.getNormalMatrix(b),(g===null||g.length<m)&&(g=new Float32Array(m));for(let A=0,_=h;A!==x;++A,_+=4)a.copy(d[A]).applyMatrix4(b,o),a.normal.toArray(g,_),g[_+3]=a.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}var Dr=4,Yy=6,Ky=20,jy=256,Za=new Kn,pm=new be,Jd=null,Qd=0,ef=0,tf=!1,Zy=new L,Us=new L,_c=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:a=256,position:o=Zy}=r;Jd=this._renderer.getRenderTarget(),Qd=this._renderer.getActiveCubeFace(),ef=this._renderer.getActiveMipmapLevel(),tf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=xm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=gm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Jd,Qd,ef),this._renderer.xr.enabled=tf,e.scissorTest=!1,Lr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===is||e.mapping===Ls?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Jd=this._renderer.getRenderTarget(),Qd=this._renderer.getActiveCubeFace(),ef=this._renderer.getActiveMipmapLevel(),tf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ot,minFilter:Ot,generateMipmaps:!1,type:Qn,format:En,colorSpace:cn,depthBuffer:!1},s=mm(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=mm(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Jy(r)),this._blurMaterial=ev(r,e,t),this._ggxMaterial=Qy(r,e,t)}return s}_compileMaterial(e){let t=new Ne(new ft,e);this._renderer.compile(t,Za)}_sceneToCubeUV(e,t,n,s,r){let c=new qt(90,1,t,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,h=d.toneMapping;d.getClearColor(pm),d.toneMapping=jn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ne(new Un,new tn({name:"PMREM.Background",side:dn,depthWrite:!1,depthTest:!1})));let x=this._backgroundBox,g=x.material,m=!1,b=e.background;b?b.isColor&&(g.color.copy(b),e.background=null,m=!0):(g.color.copy(pm),m=!0);for(let A=0;A<6;A++){let _=A%3;_===0?(c.up.set(0,l[A],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[A],r.y,r.z)):_===1?(c.up.set(0,0,l[A]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[A],r.z)):(c.up.set(0,l[A],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[A]));let w=this._cubeSize;Lr(s,_*w,A>2?w:0,w,w),d.setRenderTarget(s),m&&d.render(x,c),d.render(e,c)}d.toneMapping=h,d.autoClear=f,e.background=b}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===is||e.mapping===Ls;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=xm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=gm());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let c=this._cubeSize;Lr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Za)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let c=a.uniforms,l=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-u*u),f=l*1.25,h=d*f,{_lodMax:p}=this,x=this._sizeLods[n],g=3*x*(n>p-Dr?n-p+Dr:0),m=4*(this._cubeSize-x);c.envMap.value=e.texture,c.roughness.value=h,c.mipInt.value=p-t,Lr(r,g,m,3*x,2*x),s.setRenderTarget(r),s.render(o,Za),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=p-n,Lr(e,g,m,3*x,2*x),s.setRenderTarget(e),s.render(o,Za)}_blur(e,t,n,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,a),this._blurPass(r,e,n,n,a)}_blurPass(e,t,n,s,r){let a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[s];c.material=o;let l=o.uniforms;l.envMap.value=e.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-n;let u=this._sizeLods[s],d=3*u*(s>this._lodMax-Dr?s-this._lodMax+Dr:0),f=4*(this._cubeSize-u);Lr(t,d,f,3*u,2*u),a.setRenderTarget(t),a.render(c,Za)}};function Jy(i){let e=[],t=[],n=i,s=i-Dr+1+Yy;for(let r=0;r<s;r++){let a=Math.pow(2,n);e.push(a);let o=1/(a-2),c=-o,l=1+o,u=[c,c,l,c,l,l,c,c,l,l,c,l],d=6,f=6,h=3,p=new Float32Array(h*f*d),x=new Float32Array(h*f*d);for(let m=0;m<d;m++){let b=m%3*2/3-1,A=m>2?0:-1,_=[b,A,0,b+2/3,A,0,b+2/3,A+1,0,b,A,0,b+2/3,A+1,0,b,A+1,0];p.set(_,h*f*m);for(let w=0;w<f;w++){let T=u[w*2]*2-1,C=u[w*2+1]*2-1;m===0?Us.set(1,C,T):m===1?Us.set(-T,1,-C):m===2?Us.set(-T,C,1):m===3?Us.set(-1,C,-T):m===4?Us.set(-T,-1,C):Us.set(T,C,-1),Us.toArray(x,(m*f+w)*h)}}let g=new ft;g.setAttribute("position",new Gt(p,h)),g.setAttribute("outputDirection",new Gt(x,h)),t.push(new Ne(g,null)),n>Dr&&n--}return{lodMeshes:t,sizeLods:e}}function mm(i,e,t){let n=new en(i,e,t);return n.texture.mapping=Ha,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Lr(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Qy(i,e,t){return new Tn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:jy,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:bc(),fragmentShader:`

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
		`,blending:fi,depthTest:!1,depthWrite:!1})}function ev(i,e,t){return new Tn({name:"SphericalGaussianBlur",defines:{SAMPLES:Ky,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:bc(),fragmentShader:`

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
		`,blending:fi,depthTest:!1,depthWrite:!1})}function gm(){return new Tn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:bc(),fragmentShader:`

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
		`,blending:fi,depthTest:!1,depthWrite:!1})}function xm(){return new Tn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:bc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:fi,depthTest:!1,depthWrite:!1})}function bc(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var yc=class extends en{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new ba(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Un(5,5,5),r=new Tn({name:"CubemapFromEquirect",uniforms:Ns(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:dn,blending:fi});r.uniforms.tEquirect.value=t;let a=new Ne(s,r),o=t.minFilter;return t.minFilter===Zn&&(t.minFilter=Ot),new wl(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}};function tv(i){let e=new WeakMap,t=new WeakMap,n=null;function s(f,h=!1){return f==null?null:h?a(f):r(f)}function r(f){if(f&&f.isTexture){let h=f.mapping;if(h===El||h===Cl)if(e.has(f)){let p=e.get(f).texture;return o(p,f.mapping)}else{let p=f.image;if(p&&p.height>0){let x=new yc(p.height);return x.fromEquirectangularTexture(i,f),e.set(f,x),f.addEventListener("dispose",l),o(x.texture,f.mapping)}else return null}}return f}function a(f){if(f&&f.isTexture){let h=f.mapping,p=h===El||h===Cl,x=h===is||h===Ls;if(p||x){let g=t.get(f),m=g!==void 0?g.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==m)return n===null&&(n=new _c(i)),g=p?n.fromEquirectangular(f,g):n.fromCubemap(f,g),g.texture.pmremVersion=f.pmremVersion,t.set(f,g),g.texture;if(g!==void 0)return g.texture;{let b=f.image;return p&&b&&b.height>0||x&&b&&c(b)?(n===null&&(n=new _c(i)),g=p?n.fromEquirectangular(f):n.fromCubemap(f),g.texture.pmremVersion=f.pmremVersion,t.set(f,g),f.addEventListener("dispose",u),g.texture):null}}}return f}function o(f,h){return h===El?f.mapping=is:h===Cl&&(f.mapping=Ls),f}function c(f){let h=0,p=6;for(let x=0;x<p;x++)f[x]!==void 0&&h++;return h===p}function l(f){let h=f.target;h.removeEventListener("dispose",l);let p=e.get(h);p!==void 0&&(e.delete(h),p.dispose())}function u(f){let h=f.target;h.removeEventListener("dispose",u);let p=t.get(h);p!==void 0&&(t.delete(h),p.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function nv(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&vs("WebGLRenderer: "+n+" extension not supported."),s}}}function iv(i,e,t,n){let s={},r=new WeakMap;function a(d){let f=d.target;f.index!==null&&e.remove(f.index);for(let p in f.attributes)e.remove(f.attributes[p]);f.removeEventListener("dispose",a),delete s[f.id];let h=r.get(f);h&&(e.remove(h),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(d,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,t.memory.geometries++),f}function c(d){let f=d.attributes;for(let h in f)e.update(f[h],i.ARRAY_BUFFER)}function l(d){let f=[],h=d.index,p=d.attributes.position,x=0;if(p===void 0)return;if(h!==null){let b=h.array;x=h.version;for(let A=0,_=b.length;A<_;A+=3){let w=b[A+0],T=b[A+1],C=b[A+2];f.push(w,T,T,C,C,w)}}else{let b=p.array;x=p.version;for(let A=0,_=b.length/3-1;A<_;A+=3){let w=A+0,T=A+1,C=A+2;f.push(w,T,T,C,C,w)}}let g=new(p.count>=65535?_a:xa)(f,1);g.version=x;let m=r.get(d);m&&e.remove(m),r.set(d,g)}function u(d){let f=r.get(d);if(f){let h=d.index;h!==null&&f.version<h.version&&l(d)}else l(d);return r.get(d)}return{get:o,update:c,getWireframeAttribute:u}}function sv(i,e,t){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function c(d,f){i.drawElements(n,f,r,d*a),t.update(f,n,1)}function l(d,f,h){h!==0&&(i.drawElementsInstanced(n,f,r,d*a,h),t.update(f,n,h))}function u(d,f,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,h);let x=0;for(let g=0;g<h;g++)x+=f[g];t.update(x,n,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function rv(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:We("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function av(i,e,t){let n=new WeakMap,s=new bt;function r(a,o,c){let l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0,f=n.get(o);if(f===void 0||f.count!==d){let S=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",S)};f!==void 0&&f.texture.dispose();let h=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],b=o.morphAttributes.color||[],A=0;h===!0&&(A=1),p===!0&&(A=2),x===!0&&(A=3);let _=o.attributes.position.count*A,w=1;_>e.maxTextureSize&&(w=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let T=new Float32Array(_*w*4*d),C=new ma(T,_,w,d);C.type=An,C.needsUpdate=!0;let y=A*4;for(let E=0;E<d;E++){let D=g[E],F=m[E],N=b[E],I=_*w*4*E;for(let U=0;U<D.count;U++){let z=U*y;h===!0&&(s.fromBufferAttribute(D,U),T[I+z+0]=s.x,T[I+z+1]=s.y,T[I+z+2]=s.z,T[I+z+3]=0),p===!0&&(s.fromBufferAttribute(F,U),T[I+z+4]=s.x,T[I+z+5]=s.y,T[I+z+6]=s.z,T[I+z+7]=0),x===!0&&(s.fromBufferAttribute(N,U),T[I+z+8]=s.x,T[I+z+9]=s.y,T[I+z+10]=s.z,T[I+z+11]=N.itemSize===4?s.w:1)}}f={count:d,texture:C,size:new re(_,w)},n.set(o,f),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let h=0;for(let x=0;x<l.length;x++)h+=l[x];let p=o.morphTargetsRelative?1:1-h;c.getUniforms().setValue(i,"morphTargetBaseInfluence",p),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function ov(i,e,t,n,s){let r=new WeakMap;function a(l){let u=s.render.frame,d=l.geometry,f=e.get(l,d);if(r.get(f)!==u&&(e.update(f),r.set(f,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==u&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){let h=l.skeleton;r.get(h)!==u&&(h.update(),r.set(h,u))}return f}function o(){r=new WeakMap}function c(l){let u=l.target;u.removeEventListener("dispose",c),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}var lv={[Pd]:"LINEAR_TONE_MAPPING",[Id]:"REINHARD_TONE_MAPPING",[Ld]:"CINEON_TONE_MAPPING",[Va]:"ACES_FILMIC_TONE_MAPPING",[Nd]:"AGX_TONE_MAPPING",[Ud]:"NEUTRAL_TONE_MAPPING",[Dd]:"CUSTOM_TONE_MAPPING"};function cv(i,e,t,n,s,r){let a=new en(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,c=null,l=new ft;l.setAttribute("position",new et([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new et([0,2,0,0,2,0],2));let u=new pl({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new Ne(l,u),f=new Kn(-1,1,1,-1,0,1),h=null,p=null,x=!1,g,m=null,b=[],A=!1;this.setSize=function(_,w){a.setSize(_,w),o!==null&&o.setSize(_,w),c!==null&&c.setSize(_,w);for(let T=0;T<b.length;T++){let C=b[T];C.setSize&&C.setSize(_,w)}},this.setEffects=function(_){b=_,A=b.length>0&&b[0].isRenderPass===!0;let w=a.width,T=a.height;b.length>0&&o===null&&(o=new en(w,T,{type:Qn,depthBuffer:!1,stencilBuffer:!1}),c=new en(w,T,{type:Qn,depthBuffer:!1,stencilBuffer:!1}));for(let C=0;C<b.length;C++){let y=b[C];y.setSize&&y.setSize(w,T)}},this.begin=function(_,w){if(x||_.toneMapping===jn&&b.length===0)return!1;if(m=w,w!==null){let T=w.width,C=w.height;(a.width!==T||a.height!==C)&&this.setSize(T,C)}return A===!1&&_.setRenderTarget(a),g=_.toneMapping,_.toneMapping=jn,!0},this.hasRenderPass=function(){return A},this.end=function(_,w){_.toneMapping=g,x=!0;let T=a,C=o;for(let y=0;y<b.length;y++){let S=b[y];S.enabled!==!1&&(S.render(_,C,T,w),S.needsSwap!==!1&&(T=C,C=C===o?c:o))}if(h!==_.outputColorSpace||p!==_.toneMapping){h=_.outputColorSpace,p=_.toneMapping,u.defines={},nt.getTransfer(h)===xt&&(u.defines.SRGB_TRANSFER="");let y=lv[p];y&&(u.defines[y]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=T.texture,_.setRenderTarget(m),_.render(d,f),m=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var Om=new $t,rf=new Ji(1,1),Bm=new ma,km=new sl,zm=new ba,_m=[],ym=[],vm=new Float32Array(16),bm=new Float32Array(9),Sm=new Float32Array(4);function Ur(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=_m[s];if(r===void 0&&(r=new Float32Array(s),_m[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Vt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Ht(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Sc(i,e){let t=ym[e];t===void 0&&(t=new Int32Array(e),ym[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function uv(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function dv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;i.uniform2fv(this.addr,e),Ht(t,e)}}function fv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Vt(t,e))return;i.uniform3fv(this.addr,e),Ht(t,e)}}function hv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;i.uniform4fv(this.addr,e),Ht(t,e)}}function pv(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Vt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Ht(t,e)}else{if(Vt(t,n))return;Sm.set(n),i.uniformMatrix2fv(this.addr,!1,Sm),Ht(t,n)}}function mv(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Vt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Ht(t,e)}else{if(Vt(t,n))return;bm.set(n),i.uniformMatrix3fv(this.addr,!1,bm),Ht(t,n)}}function gv(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Vt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Ht(t,e)}else{if(Vt(t,n))return;vm.set(n),i.uniformMatrix4fv(this.addr,!1,vm),Ht(t,n)}}function xv(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function _v(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;i.uniform2iv(this.addr,e),Ht(t,e)}}function yv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Vt(t,e))return;i.uniform3iv(this.addr,e),Ht(t,e)}}function vv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;i.uniform4iv(this.addr,e),Ht(t,e)}}function bv(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Sv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;i.uniform2uiv(this.addr,e),Ht(t,e)}}function Mv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Vt(t,e))return;i.uniform3uiv(this.addr,e),Ht(t,e)}}function wv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;i.uniform4uiv(this.addr,e),Ht(t,e)}}function Tv(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(rf.compareFunction=t.isReversedDepthBuffer()?mc:pc,r=rf):r=Om,t.setTexture2D(e||r,s)}function Av(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||km,s)}function Ev(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||zm,s)}function Cv(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Bm,s)}function Rv(i){switch(i){case 5126:return uv;case 35664:return dv;case 35665:return fv;case 35666:return hv;case 35674:return pv;case 35675:return mv;case 35676:return gv;case 5124:case 35670:return xv;case 35667:case 35671:return _v;case 35668:case 35672:return yv;case 35669:case 35673:return vv;case 5125:return bv;case 36294:return Sv;case 36295:return Mv;case 36296:return wv;case 35678:case 36198:case 36298:case 36306:case 35682:return Tv;case 35679:case 36299:case 36307:return Av;case 35680:case 36300:case 36308:case 36293:return Ev;case 36289:case 36303:case 36311:case 36292:return Cv}}function Pv(i,e){i.uniform1fv(this.addr,e)}function Iv(i,e){let t=Ur(e,this.size,2);i.uniform2fv(this.addr,t)}function Lv(i,e){let t=Ur(e,this.size,3);i.uniform3fv(this.addr,t)}function Dv(i,e){let t=Ur(e,this.size,4);i.uniform4fv(this.addr,t)}function Nv(i,e){let t=Ur(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Uv(i,e){let t=Ur(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Fv(i,e){let t=Ur(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Ov(i,e){i.uniform1iv(this.addr,e)}function Bv(i,e){i.uniform2iv(this.addr,e)}function kv(i,e){i.uniform3iv(this.addr,e)}function zv(i,e){i.uniform4iv(this.addr,e)}function Gv(i,e){i.uniform1uiv(this.addr,e)}function Vv(i,e){i.uniform2uiv(this.addr,e)}function Hv(i,e){i.uniform3uiv(this.addr,e)}function Wv(i,e){i.uniform4uiv(this.addr,e)}function Xv(i,e,t){let n=this.cache,s=e.length,r=Sc(t,s);Vt(n,r)||(i.uniform1iv(this.addr,r),Ht(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=rf:a=Om;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function qv(i,e,t){let n=this.cache,s=e.length,r=Sc(t,s);Vt(n,r)||(i.uniform1iv(this.addr,r),Ht(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||km,r[a])}function $v(i,e,t){let n=this.cache,s=e.length,r=Sc(t,s);Vt(n,r)||(i.uniform1iv(this.addr,r),Ht(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||zm,r[a])}function Yv(i,e,t){let n=this.cache,s=e.length,r=Sc(t,s);Vt(n,r)||(i.uniform1iv(this.addr,r),Ht(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Bm,r[a])}function Kv(i){switch(i){case 5126:return Pv;case 35664:return Iv;case 35665:return Lv;case 35666:return Dv;case 35674:return Nv;case 35675:return Uv;case 35676:return Fv;case 5124:case 35670:return Ov;case 35667:case 35671:return Bv;case 35668:case 35672:return kv;case 35669:case 35673:return zv;case 5125:return Gv;case 36294:return Vv;case 36295:return Hv;case 36296:return Wv;case 35678:case 36198:case 36298:case 36306:case 35682:return Xv;case 35679:case 36299:case 36307:return qv;case 35680:case 36300:case 36308:case 36293:return $v;case 36289:case 36303:case 36311:case 36292:return Yv}}var af=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Rv(t.type)}},of=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Kv(t.type)}},lf=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},nf=/(\w+)(\])?(\[|\.)?/g;function Mm(i,e){i.seq.push(e),i.map[e.id]=e}function jv(i,e,t){let n=i.name,s=n.length;for(nf.lastIndex=0;;){let r=nf.exec(n),a=nf.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){Mm(t,l===void 0?new af(o,i,e):new of(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new lf(o),Mm(t,d)),t=d}}}var Nr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);jv(o,c,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function wm(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var Zv=37297,Jv=0;function Qv(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var Tm=new Ke;function eb(i){nt._getMatrix(Tm,nt.workingColorSpace,i);let e=`mat3( ${Tm.elements.map(t=>t.toFixed(4))} )`;switch(nt.getTransfer(i)){case ha:return[e,"LinearTransferOETF"];case xt:return[e,"sRGBTransferOETF"];default:return De("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Am(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Qv(i.getShaderSource(e),o)}else return r}function tb(i,e){let t=eb(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var nb={[Pd]:"Linear",[Id]:"Reinhard",[Ld]:"Cineon",[Va]:"ACESFilmic",[Nd]:"AgX",[Ud]:"Neutral",[Dd]:"Custom"};function ib(i,e){let t=nb[e];return t===void 0?(De("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var xc=new L;function sb(){nt.getLuminanceCoefficients(xc);let i=xc.x.toFixed(4),e=xc.y.toFixed(4),t=xc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function rb(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Qa).join(`
`)}function ab(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function ob(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Qa(i){return i!==""}function Em(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Cm(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var lb=/^[ \t]*#include +<([\w\d./]+)>/gm;function cf(i){return i.replace(lb,ub)}var cb=new Map;function ub(i,e){let t=tt[e];if(t===void 0){let n=cb.get(e);if(n!==void 0)t=tt[n],De('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return cf(t)}var db=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Rm(i){return i.replace(db,fb)}function fb(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Pm(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}var hb={[Ps]:"SHADOWMAP_TYPE_PCF",[Ar]:"SHADOWMAP_TYPE_VSM"};function pb(i){return hb[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var mb={[is]:"ENVMAP_TYPE_CUBE",[Ls]:"ENVMAP_TYPE_CUBE",[Ha]:"ENVMAP_TYPE_CUBE_UV"};function gb(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":mb[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var xb={[Ls]:"ENVMAP_MODE_REFRACTION"};function _b(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":xb[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var yb={[Rd]:"ENVMAP_BLENDING_MULTIPLY",[Hp]:"ENVMAP_BLENDING_MIX",[Wp]:"ENVMAP_BLENDING_ADD"};function vb(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":yb[i.combine]||"ENVMAP_BLENDING_NONE"}function bb(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Sb(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,c=pb(t),l=gb(t),u=_b(t),d=vb(t),f=bb(t),h=rb(t),p=ab(r),x=s.createProgram(),g,m,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Qa).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Qa).join(`
`),m.length>0&&(m+=`
`)):(g=[Pm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Qa).join(`
`),m=[Pm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==jn?"#define TONE_MAPPING":"",t.toneMapping!==jn?tt.tonemapping_pars_fragment:"",t.toneMapping!==jn?ib("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",tt.colorspace_pars_fragment,tb("linearToOutputTexel",t.outputColorSpace),sb(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Qa).join(`
`)),a=cf(a),a=Em(a,t),a=Cm(a,t),o=cf(o),o=Em(o,t),o=Cm(o,t),a=Rm(a),o=Rm(o),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,g=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===Xd?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Xd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let A=b+g+a,_=b+m+o,w=wm(s,s.VERTEX_SHADER,A),T=wm(s,s.FRAGMENT_SHADER,_);s.attachShader(x,w),s.attachShader(x,T),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function C(D){if(i.debug.checkShaderErrors){let F=s.getProgramInfoLog(x)||"",N=s.getShaderInfoLog(w)||"",I=s.getShaderInfoLog(T)||"",U=F.trim(),z=N.trim(),V=I.trim(),Z=!0,q=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(Z=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,w,T);else{let J=Am(s,w,"vertex"),ie=Am(s,T,"fragment");We("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+U+`
`+J+`
`+ie)}else U!==""?De("WebGLProgram: Program Info Log:",U):(z===""||V==="")&&(q=!1);q&&(D.diagnostics={runnable:Z,programLog:U,vertexShader:{log:z,prefix:g},fragmentShader:{log:V,prefix:m}})}s.deleteShader(w),s.deleteShader(T),y=new Nr(s,x),S=ob(s,x)}let y;this.getUniforms=function(){return y===void 0&&C(this),y};let S;this.getAttributes=function(){return S===void 0&&C(this),S};let E=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=s.getProgramParameter(x,Zv)),E},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Jv++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=w,this.fragmentShader=T,this}var Mb=0,uf=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new df(e),t.set(e,n)),n}},df=class{constructor(e){this.id=Mb++,this.code=e,this.usedTimes=0}};function wb(i){return i===rs||i===Ya||i===Ka}function Tb(i,e,t,n,s,r){let a=new dr,o=new uf,c=new Set,l=[],u=new Map,d=n.logarithmicDepthBuffer,f=n.precision,h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(y){return c.add(y),y===0?"uv":`uv${y}`}function x(y,S,E,D,F,N){let I=D.fog,U=F.geometry,z=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?D.environment:null,V=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,Z=e.get(y.envMap||z,V),q=Z&&Z.mapping===Ha?Z.image.height:null,J=h[y.type];y.precision!==null&&(f=n.getMaxPrecision(y.precision),f!==y.precision&&De("WebGLProgram.getParameters:",y.precision,"not supported, using",f,"instead."));let ie=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,Ue=ie!==void 0?ie.length:0,Ee=0;U.morphAttributes.position!==void 0&&(Ee=1),U.morphAttributes.normal!==void 0&&(Ee=2),U.morphAttributes.color!==void 0&&(Ee=3);let ht,rt,ut,j;if(J){let Ct=pi[J];ht=Ct.vertexShader,rt=Ct.fragmentShader}else{ht=y.vertexShader,rt=y.fragmentShader;let Ct=o.getVertexShaderStage(y),mt=o.getFragmentShaderStage(y);o.update(y,Ct,mt),ut=Ct.id,j=mt.id}let te=i.getRenderTarget(),_e=i.state.buffers.depth.getReversed(),Xe=F.isInstancedMesh===!0,Me=F.isBatchedMesh===!0,qe=!!y.map,yt=!!y.matcap,ne=!!Z,ae=!!y.aoMap,oe=!!y.lightMap,le=!!y.bumpMap&&y.wireframe===!1,de=!!y.normalMap,Ge=!!y.displacementMap,ke=!!y.emissiveMap,$e=!!y.metalnessMap,je=!!y.roughnessMap,O=y.anisotropy>0,pt=y.clearcoat>0,at=y.dispersion>0,R=y.retroreflectivity>0,v=y.iridescence>0,G=y.sheen>0,X=y.transmission>0,Y=O&&!!y.anisotropyMap,ce=pt&&!!y.clearcoatMap,ue=pt&&!!y.clearcoatNormalMap,K=pt&&!!y.clearcoatRoughnessMap,ee=v&&!!y.iridescenceMap,fe=v&&!!y.iridescenceThicknessMap,Fe=G&&!!y.sheenColorMap,ge=G&&!!y.sheenRoughnessMap,he=!!y.specularMap,Oe=!!y.specularColorMap,Ve=!!y.specularIntensityMap,Ze=X&&!!y.transmissionMap,k=X&&!!y.thicknessMap,pe=!!y.gradientMap,Q=!!y.alphaMap,me=y.alphaTest>0,Se=!!y.alphaHash,se=!!y.extensions,Be=jn;y.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(Be=i.toneMapping);let Ie={shaderID:J,shaderType:y.type,shaderName:y.name,vertexShader:ht,fragmentShader:rt,defines:y.defines,customVertexShaderID:ut,customFragmentShaderID:j,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:f,batching:Me,batchingColor:Me&&F._colorsTexture!==null,instancing:Xe,instancingColor:Xe&&F.instanceColor!==null,instancingMorph:Xe&&F.morphTexture!==null,outputColorSpace:te===null?i.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:nt.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:qe,matcap:yt,envMap:ne,envMapMode:ne&&Z.mapping,envMapCubeUVHeight:q,aoMap:ae,lightMap:oe,bumpMap:le,normalMap:de,displacementMap:Ge,emissiveMap:ke,normalMapObjectSpace:de&&y.normalMapType===Yp,normalMapTangentSpace:de&&y.normalMapType===hc,packedNormalMap:de&&y.normalMapType===hc&&wb(y.normalMap.format),metalnessMap:$e,roughnessMap:je,anisotropy:O,anisotropyMap:Y,clearcoat:pt,clearcoatMap:ce,clearcoatNormalMap:ue,clearcoatRoughnessMap:K,dispersion:at,retroreflection:R,iridescence:v,iridescenceMap:ee,iridescenceThicknessMap:fe,sheen:G,sheenColorMap:Fe,sheenRoughnessMap:ge,specularMap:he,specularColorMap:Oe,specularIntensityMap:Ve,transmission:X,transmissionMap:Ze,thicknessMap:k,gradientMap:pe,opaque:y.transparent===!1&&y.blending===Er&&y.alphaToCoverage===!1,alphaMap:Q,alphaTest:me,alphaHash:Se,combine:y.combine,mapUv:qe&&p(y.map.channel),aoMapUv:ae&&p(y.aoMap.channel),lightMapUv:oe&&p(y.lightMap.channel),bumpMapUv:le&&p(y.bumpMap.channel),normalMapUv:de&&p(y.normalMap.channel),displacementMapUv:Ge&&p(y.displacementMap.channel),emissiveMapUv:ke&&p(y.emissiveMap.channel),metalnessMapUv:$e&&p(y.metalnessMap.channel),roughnessMapUv:je&&p(y.roughnessMap.channel),anisotropyMapUv:Y&&p(y.anisotropyMap.channel),clearcoatMapUv:ce&&p(y.clearcoatMap.channel),clearcoatNormalMapUv:ue&&p(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:K&&p(y.clearcoatRoughnessMap.channel),iridescenceMapUv:ee&&p(y.iridescenceMap.channel),iridescenceThicknessMapUv:fe&&p(y.iridescenceThicknessMap.channel),sheenColorMapUv:Fe&&p(y.sheenColorMap.channel),sheenRoughnessMapUv:ge&&p(y.sheenRoughnessMap.channel),specularMapUv:he&&p(y.specularMap.channel),specularColorMapUv:Oe&&p(y.specularColorMap.channel),specularIntensityMapUv:Ve&&p(y.specularIntensityMap.channel),transmissionMapUv:Ze&&p(y.transmissionMap.channel),thicknessMapUv:k&&p(y.thicknessMap.channel),alphaMapUv:Q&&p(y.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(de||O),vertexNormals:!!U.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!U.attributes.uv&&(qe||Q),fog:!!I,useFog:y.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||U.attributes.normal===void 0&&de===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:_e,skinning:F.isSkinnedMesh===!0,hasPositionAttribute:U.attributes.position!==void 0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:Ue,morphTextureStride:Ee,numSunLights:S.sun.length,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numSunLightShadows:S.sunShadowMap.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:N.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&E.length>0,shadowMapType:i.shadowMap.type,toneMapping:Be,decodeVideoTexture:qe&&y.map.isVideoTexture===!0&&nt.getTransfer(y.map.colorSpace)===xt,decodeVideoTextureEmissive:ke&&y.emissiveMap.isVideoTexture===!0&&nt.getTransfer(y.emissiveMap.colorSpace)===xt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===nn,flipSided:y.side===dn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:se&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(se&&y.extensions.multiDraw===!0||Me)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Ie.vertexUv1s=c.has(1),Ie.vertexUv2s=c.has(2),Ie.vertexUv3s=c.has(3),c.clear(),Ie}function g(y){let S=[];if(y.shaderID?S.push(y.shaderID):(S.push(y.customVertexShaderID),S.push(y.customFragmentShaderID)),y.defines!==void 0)for(let E in y.defines)S.push(E),S.push(y.defines[E]);return y.isRawShaderMaterial===!1&&(m(S,y),b(S,y),S.push(i.outputColorSpace)),S.push(y.customProgramCacheKey),S.join()}function m(y,S){y.push(S.precision),y.push(S.outputColorSpace),y.push(S.envMapMode),y.push(S.envMapCubeUVHeight),y.push(S.mapUv),y.push(S.alphaMapUv),y.push(S.lightMapUv),y.push(S.aoMapUv),y.push(S.bumpMapUv),y.push(S.normalMapUv),y.push(S.displacementMapUv),y.push(S.emissiveMapUv),y.push(S.metalnessMapUv),y.push(S.roughnessMapUv),y.push(S.anisotropyMapUv),y.push(S.clearcoatMapUv),y.push(S.clearcoatNormalMapUv),y.push(S.clearcoatRoughnessMapUv),y.push(S.iridescenceMapUv),y.push(S.iridescenceThicknessMapUv),y.push(S.sheenColorMapUv),y.push(S.sheenRoughnessMapUv),y.push(S.specularMapUv),y.push(S.specularColorMapUv),y.push(S.specularIntensityMapUv),y.push(S.transmissionMapUv),y.push(S.thicknessMapUv),y.push(S.combine),y.push(S.fogExp2),y.push(S.sizeAttenuation),y.push(S.morphTargetsCount),y.push(S.morphAttributeCount),y.push(S.numSunLights),y.push(S.numDirLights),y.push(S.numPointLights),y.push(S.numSpotLights),y.push(S.numSpotLightMaps),y.push(S.numHemiLights),y.push(S.numRectAreaLights),y.push(S.numSunLightShadows),y.push(S.numDirLightShadows),y.push(S.numPointLightShadows),y.push(S.numSpotLightShadows),y.push(S.numSpotLightShadowsWithMaps),y.push(S.numLightProbes),y.push(S.shadowMapType),y.push(S.toneMapping),y.push(S.numClippingPlanes),y.push(S.numClipIntersection),y.push(S.depthPacking)}function b(y,S){a.disableAll(),S.instancing&&a.enable(0),S.instancingColor&&a.enable(1),S.instancingMorph&&a.enable(2),S.matcap&&a.enable(3),S.envMap&&a.enable(4),S.normalMapObjectSpace&&a.enable(5),S.normalMapTangentSpace&&a.enable(6),S.clearcoat&&a.enable(7),S.iridescence&&a.enable(8),S.alphaTest&&a.enable(9),S.vertexColors&&a.enable(10),S.vertexAlphas&&a.enable(11),S.vertexUv1s&&a.enable(12),S.vertexUv2s&&a.enable(13),S.vertexUv3s&&a.enable(14),S.vertexTangents&&a.enable(15),S.anisotropy&&a.enable(16),S.alphaHash&&a.enable(17),S.batching&&a.enable(18),S.dispersion&&a.enable(19),S.retroreflection&&a.enable(24),S.batchingColor&&a.enable(20),S.gradientMap&&a.enable(21),S.packedNormalMap&&a.enable(22),S.vertexNormals&&a.enable(23),y.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),S.numLightProbeGrids>0&&a.enable(22),S.hasPositionAttribute&&a.enable(23),y.push(a.mask)}function A(y){let S=h[y.type],E;if(S){let D=pi[S];E=dm.clone(D.uniforms)}else E=y.uniforms;return E}function _(y,S){let E=u.get(S);return E!==void 0?++E.usedTimes:(E=new Sb(i,S,y,s),l.push(E),u.set(S,E)),E}function w(y){if(--y.usedTimes===0){let S=l.indexOf(y);l[S]=l[l.length-1],l.pop(),u.delete(y.cacheKey),y.destroy()}}function T(y){o.remove(y)}function C(){o.dispose()}return{getParameters:x,getProgramCacheKey:g,getUniforms:A,acquireProgram:_,releaseProgram:w,releaseShaderCache:T,programs:l,dispose:C}}function Ab(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Eb(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Im(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Lm(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(f){let h=0;return f.isInstancedMesh&&(h+=2),f.isSkinnedMesh&&(h+=1),h}function o(f,h,p,x,g,m){let b=i[e];return b===void 0?(b={id:f.id,object:f,geometry:h,material:p,materialVariant:a(f),groupOrder:x,renderOrder:f.renderOrder,z:g,group:m},i[e]=b):(b.id=f.id,b.object=f,b.geometry=h,b.material=p,b.materialVariant=a(f),b.groupOrder=x,b.renderOrder=f.renderOrder,b.z=g,b.group=m),e++,b}function c(f,h,p,x,g,m,b){b.reversedDepth===!0&&(g=-g);let A=o(f,h,p,x,g,m);p.transmission>0?n.push(A):p.transparent===!0?s.push(A):t.push(A)}function l(f,h,p,x,g,m){let b=o(f,h,p,x,g,m);p.transmission>0?n.unshift(b):p.transparent===!0?s.unshift(b):t.unshift(b)}function u(f,h){t.length>1&&t.sort(f||Eb),n.length>1&&n.sort(h||Im),s.length>1&&s.sort(h||Im)}function d(){for(let f=e,h=i.length;f<h;f++){let p=i[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:d,sort:u}}function Cb(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new Lm,i.set(n,[a])):s>=r.length?(a=new Lm,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Rb(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new L,color:new be};break;case"SpotLight":t={position:new L,direction:new L,color:new be,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new be,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new be,groundColor:new be};break;case"RectAreaLight":t={color:new be,position:new L,halfWidth:new L,halfHeight:new L};break}return i[e.id]=t,t}}}function Pb(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var Ib=0;function Lb(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Db(i){let e=new Rb,t=Pb(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new L);let s=new L,r=new Ye,a=new Ye;function o(l){let u=0,d=0,f=0;for(let F=0;F<9;F++)n.probe[F].set(0,0,0);let h=0,p=0,x=0,g=0,m=0,b=0,A=0,_=0,w=0,T=0,C=0,y=0,S=0,E=0;l.sort(Lb);for(let F=0,N=l.length;F<N;F++){let I=l[F],U=I.color,z=I.intensity,V=I.distance,Z=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===rs?Z=I.shadow.map.texture:Z=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)u+=U.r*z,d+=U.g*z,f+=U.b*z;else if(I.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(I.sh.coefficients[q],z);E++}else if(I.isSunLight){let q=e.get(I);if(q.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let J=I.shadow,ie=t.get(I);ie.shadowIntensity=J.intensity,ie.shadowBias=J.bias,ie.shadowNormalBias=J.normalBias,ie.shadowRadius=J.radius,ie.shadowMapSize.copy(J.mapSize).multiply(J.getFrameExtents()),n.sunShadow[p]=ie,n.sunShadowMap[p]=Z;let Ue=J.getViewportCount();for(let Ee=0;Ee<Ue;Ee++)n.sunShadowMatrix[x+Ee]=J.getMatrix(Ee),n.sunShadowCascade[x+Ee]=J._cascadeData[Ee];x+=Ue,p++}n.sun[h]=q,h++}else if(I.isDirectionalLight){let q=e.get(I);if(q.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let J=I.shadow,ie=t.get(I);ie.shadowIntensity=J.intensity,ie.shadowBias=J.bias,ie.shadowNormalBias=J.normalBias,ie.shadowRadius=J.radius,ie.shadowMapSize=J.mapSize,n.directionalShadow[g]=ie,n.directionalShadowMap[g]=Z,n.directionalShadowMatrix[g]=I.shadow.matrix,w++}n.directional[g]=q,g++}else if(I.isSpotLight){let q=e.get(I);q.position.setFromMatrixPosition(I.matrixWorld),q.color.copy(U).multiplyScalar(z),q.distance=V,q.coneCos=Math.cos(I.angle),q.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),q.decay=I.decay,n.spot[b]=q;let J=I.shadow;if(I.map&&(n.spotLightMap[y]=I.map,y++,J.updateMatrices(I),I.castShadow&&S++),n.spotLightMatrix[b]=J.matrix,I.castShadow){let ie=t.get(I);ie.shadowIntensity=J.intensity,ie.shadowBias=J.bias,ie.shadowNormalBias=J.normalBias,ie.shadowRadius=J.radius,ie.shadowMapSize=J.mapSize,n.spotShadow[b]=ie,n.spotShadowMap[b]=Z,C++}b++}else if(I.isRectAreaLight){let q=e.get(I);q.color.copy(U).multiplyScalar(z),q.halfWidth.set(I.width*.5,0,0),q.halfHeight.set(0,I.height*.5,0),n.rectArea[A]=q,A++}else if(I.isPointLight){let q=e.get(I);if(q.color.copy(I.color).multiplyScalar(I.intensity),q.distance=I.distance,q.decay=I.decay,I.castShadow){let J=I.shadow,ie=t.get(I);ie.shadowIntensity=J.intensity,ie.shadowBias=J.bias,ie.shadowNormalBias=J.normalBias,ie.shadowRadius=J.radius,ie.shadowMapSize=J.mapSize,ie.shadowCameraNear=J.camera.near,ie.shadowCameraFar=J.camera.far,n.pointShadow[m]=ie,n.pointShadowMap[m]=Z,n.pointShadowMatrix[m]=I.shadow.matrix,T++}n.point[m]=q,m++}else if(I.isHemisphereLight){let q=e.get(I);q.skyColor.copy(I.color).multiplyScalar(z),q.groundColor.copy(I.groundColor).multiplyScalar(z),n.hemi[_]=q,_++}}A>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=xe.LTC_FLOAT_1,n.rectAreaLTC2=xe.LTC_FLOAT_2):(n.rectAreaLTC1=xe.LTC_HALF_1,n.rectAreaLTC2=xe.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=f;let D=n.hash;(D.sunLength!==h||D.directionalLength!==g||D.pointLength!==m||D.spotLength!==b||D.rectAreaLength!==A||D.hemiLength!==_||D.numSunShadows!==p||D.numDirectionalShadows!==w||D.numPointShadows!==T||D.numSpotShadows!==C||D.numSpotMaps!==y||D.numLightProbes!==E)&&(n.sun.length=h,n.directional.length=g,n.spot.length=b,n.rectArea.length=A,n.point.length=m,n.hemi.length=_,n.sunShadow.length=p,n.sunShadowMap.length=p,n.sunShadowMatrix.length=x,n.sunShadowCascade.length=x,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.directionalShadowMatrix.length=w,n.pointShadow.length=T,n.pointShadowMap.length=T,n.pointShadowMatrix.length=T,n.spotShadow.length=C,n.spotShadowMap.length=C,n.spotLightMatrix.length=C+y-S,n.spotLightMap.length=y,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=E,D.sunLength=h,D.directionalLength=g,D.pointLength=m,D.spotLength=b,D.rectAreaLength=A,D.hemiLength=_,D.numSunShadows=p,D.numDirectionalShadows=w,D.numPointShadows=T,D.numSpotShadows=C,D.numSpotMaps=y,D.numLightProbes=E,n.version=Ib++)}function c(l,u){let d=0,f=0,h=0,p=0,x=0,g=0,m=u.matrixWorldInverse;for(let b=0,A=l.length;b<A;b++){let _=l[b];if(_.isSunLight){let w=n.sun[d];w.direction.setFromMatrixPosition(_.matrixWorld),w.direction.transformDirection(m),d++}else if(_.isDirectionalLight){let w=n.directional[f];w.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(m),f++}else if(_.isSpotLight){let w=n.spot[p];w.position.setFromMatrixPosition(_.matrixWorld),w.position.applyMatrix4(m),w.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(m),p++}else if(_.isRectAreaLight){let w=n.rectArea[x];w.position.setFromMatrixPosition(_.matrixWorld),w.position.applyMatrix4(m),a.identity(),r.copy(_.matrixWorld),r.premultiply(m),a.extractRotation(r),w.halfWidth.set(_.width*.5,0,0),w.halfHeight.set(0,_.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),x++}else if(_.isPointLight){let w=n.point[h];w.position.setFromMatrixPosition(_.matrixWorld),w.position.applyMatrix4(m),h++}else if(_.isHemisphereLight){let w=n.hemi[g];w.direction.setFromMatrixPosition(_.matrixWorld),w.direction.transformDirection(m),g++}}}return{setup:o,setupView:c,state:n}}function Dm(i){let e=new Db(i),t=[],n=[],s=[];function r(f){d.camera=f,t.length=0,n.length=0,s.length=0}function a(f){t.push(f)}function o(f){n.push(f)}function c(f){s.push(f)}function l(){e.setup(t)}function u(f){e.setupView(t,f)}let d={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:l,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function Nb(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new Dm(i),e.set(s,[o])):r>=a.length?(o=new Dm(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var Ub=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Fb=`uniform sampler2D shadow_pass;
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
}`,Ob=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],Bb=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],Nm=new Ye,Ja=new L,sf=new L;function kb(i,e,t){let n=new _r,s=new re,r=new re,a=new bt,o=new ml,c=new gl,l={},u=t.maxTextureSize,d={[di]:dn,[dn]:di,[nn]:nn},f=new Tn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new re},radius:{value:4}},vertexShader:Ub,fragmentShader:Fb}),h=f.clone();h.defines.HORIZONTAL_PASS=1;let p=new ft;p.setAttribute("position",new Gt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Ne(p,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ps;let m=this.type;this.render=function(T,C,y){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;this.type===wp&&(De("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ps);let S=i.getRenderTarget(),E=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),F=i.state;F.setBlending(fi),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let N=m!==this.type;N&&C.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(U=>U.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,U=T.length;I<U;I++){let z=T[I],V=z.shadow;if(V===void 0){De("WebGLShadowMap:",z,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);let Z=V.getFrameExtents();s.multiply(Z),r.copy(V.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/Z.x),s.x=r.x*Z.x,V.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/Z.y),s.y=r.y*Z.y,V.mapSize.y=r.y));let q=i.state.buffers.depth.getReversed();if(V.camera._reversedDepth=q,V.map===null||N===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===Ar){if(z.isPointLight){De("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new en(s.x,s.y,{format:rs,type:Qn,minFilter:Ot,magFilter:Ot,generateMipmaps:!1}),V.map.texture.name=z.name+".shadowMap",V.map.depthTexture=new Ji(s.x,s.y,An),V.map.depthTexture.name=z.name+".shadowMapDepth",V.map.depthTexture.format=ri,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Ft,V.map.depthTexture.magFilter=Ft}else z.isPointLight?(V.map=new yc(s.x),V.map.depthTexture=new ol(s.x,Jn)):(V.map=new en(s.x,s.y),V.map.depthTexture=new Ji(s.x,s.y,Jn)),V.map.depthTexture.name=z.name+".shadowMap",V.map.depthTexture.format=ri,this.type===Ps?(V.map.depthTexture.compareFunction=q?mc:pc,V.map.depthTexture.minFilter=Ot,V.map.depthTexture.magFilter=Ot):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Ft,V.map.depthTexture.magFilter=Ft);V.camera.updateProjectionMatrix()}V.map.isWebGLCubeRenderTarget!==!0&&(V.map.width!==s.x||V.map.height!==s.y)&&V.map.setSize(s.x,s.y);let J=V.map.isWebGLCubeRenderTarget?6:V.getViewportCount();z.isPointLight!==!0&&V.updateMatrices(z,y);for(let ie=0;ie<J;ie++){let Ue=V.getCamera(ie);if(z.isPointLight){let Ee=V.camera,ht=V.matrix,rt=z.distance||Ee.far;rt!==Ee.far&&(Ee.far=rt,Ee.updateProjectionMatrix()),Ja.setFromMatrixPosition(z.matrixWorld),Ee.position.copy(Ja),sf.copy(Ee.position),sf.add(Ob[ie]),Ee.up.copy(Bb[ie]),Ee.lookAt(sf),Ee.updateMatrixWorld(),ht.makeTranslation(-Ja.x,-Ja.y,-Ja.z),Nm.multiplyMatrices(Ee.projectionMatrix,Ee.matrixWorldInverse),V._frustum.setFromProjectionMatrix(Nm,Ee.coordinateSystem,Ee.reversedDepth)}if(V.map.isWebGLCubeRenderTarget)i.setRenderTarget(V.map,ie),i.clear();else{ie===0&&(i.setRenderTarget(V.map),i.clear());let Ee=V.getViewport(ie);a.set(r.x*Ee.x,r.y*Ee.y,r.x*Ee.z,r.y*Ee.w),F.viewport(a)}n=V.getFrustum(ie),_(C,y,Ue,z,this.type)}V.isPointLightShadow!==!0&&this.type===Ar&&b(V,y),V.needsUpdate=!1}m=this.type,g.needsUpdate=!1,i.setRenderTarget(S,E,D)};function b(T,C){let y=e.update(x);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,h.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),T.mapPass===null?T.mapPass=new en(s.x,s.y,{format:rs,type:Qn}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),f.uniforms.shadow_pass.value=T.map.depthTexture,f.uniforms.resolution.value.set(T.map.width,T.map.height),f.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(C,null,y,f,x,null),h.uniforms.shadow_pass.value=T.mapPass.texture,h.uniforms.resolution.value.set(T.map.width,T.map.height),h.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(C,null,y,h,x,null)}function A(T,C,y,S){let E=null,D=y.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(D!==void 0)E=D;else if(E=y.isPointLight===!0?c:o,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let F=E.uuid,N=C.uuid,I=l[F];I===void 0&&(I={},l[F]=I);let U=I[N];U===void 0&&(U=E.clone(),I[N]=U,C.addEventListener("dispose",w)),E=U}if(E.visible=C.visible,E.wireframe=C.wireframe,S===Ar?E.side=C.shadowSide!==null?C.shadowSide:C.side:E.side=C.shadowSide!==null?C.shadowSide:d[C.side],E.alphaMap=C.alphaMap,E.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,E.map=C.map,E.clipShadows=C.clipShadows,E.clippingPlanes=C.clippingPlanes,E.clipIntersection=C.clipIntersection,E.displacementMap=C.displacementMap,E.displacementScale=C.displacementScale,E.displacementBias=C.displacementBias,E.wireframeLinewidth=C.wireframeLinewidth,E.linewidth=C.linewidth,y.isPointLight===!0&&E.isMeshDistanceMaterial===!0){let F=i.properties.get(E);F.light=y}return E}function _(T,C,y,S,E){if(T.visible===!1)return;if(T.layers.test(C.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&E===Ar)&&(!T.frustumCulled||T.intersectsFrustum(n))){T.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,T.matrixWorld);let N=e.update(T),I=T.material;if(Array.isArray(I)){let U=N.groups;for(let z=0,V=U.length;z<V;z++){let Z=U[z],q=I[Z.materialIndex];if(q&&q.visible){let J=A(T,q,S,E);T.onBeforeShadow(i,T,C,y,N,J,Z),i.renderBufferDirect(y,null,N,J,T,Z),T.onAfterShadow(i,T,C,y,N,J,Z)}}}else if(I.visible){let U=A(T,I,S,E);T.onBeforeShadow(i,T,C,y,N,U,null),i.renderBufferDirect(y,null,N,U,T,null),T.onAfterShadow(i,T,C,y,N,U,null)}}let F=T.children;for(let N=0,I=F.length;N<I;N++)_(F[N],C,y,S,E)}function w(T){T.target.removeEventListener("dispose",w);for(let y in l){let S=l[y],E=T.target.uuid;E in S&&(S[E].dispose(),delete S[E])}}}function zb(i,e){function t(){let k=!1,pe=new bt,Q=null,me=new bt(0,0,0,0);return{setMask:function(Se){Q!==Se&&!k&&(i.colorMask(Se,Se,Se,Se),Q=Se)},setLocked:function(Se){k=Se},setClear:function(Se,se,Be,Ie,Ct){Ct===!0&&(Se*=Ie,se*=Ie,Be*=Ie),pe.set(Se,se,Be,Ie),me.equals(pe)===!1&&(i.clearColor(Se,se,Be,Ie),me.copy(pe))},reset:function(){k=!1,Q=null,me.set(-1,0,0,0)}}}function n(){let k=!1,pe=!1,Q=null,me=null,Se=null;return{setReversed:function(se){if(pe!==se){let Be=e.get("EXT_clip_control");se?Be.clipControlEXT(Be.LOWER_LEFT_EXT,Be.ZERO_TO_ONE_EXT):Be.clipControlEXT(Be.LOWER_LEFT_EXT,Be.NEGATIVE_ONE_TO_ONE_EXT),pe=se;let Ie=Se;Se=null,this.setClear(Ie)}},getReversed:function(){return pe},setTest:function(se){se?te(i.DEPTH_TEST):_e(i.DEPTH_TEST)},setMask:function(se){Q!==se&&!k&&(i.depthMask(se),Q=se)},setFunc:function(se){if(pe&&(se=rm[se]),me!==se){switch(se){case Ko:i.depthFunc(i.NEVER);break;case jo:i.depthFunc(i.ALWAYS);break;case Zo:i.depthFunc(i.LESS);break;case rr:i.depthFunc(i.LEQUAL);break;case Jo:i.depthFunc(i.EQUAL);break;case Qo:i.depthFunc(i.GEQUAL);break;case el:i.depthFunc(i.GREATER);break;case tl:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}me=se}},setLocked:function(se){k=se},setClear:function(se){Se!==se&&(Se=se,pe&&(se=1-se),i.clearDepth(se))},reset:function(){k=!1,Q=null,me=null,Se=null,pe=!1}}}function s(){let k=!1,pe=null,Q=null,me=null,Se=null,se=null,Be=null,Ie=null,Ct=null;return{setTest:function(mt){k||(mt?te(i.STENCIL_TEST):_e(i.STENCIL_TEST))},setMask:function(mt){pe!==mt&&!k&&(i.stencilMask(mt),pe=mt)},setFunc:function(mt,kn,ei){(Q!==mt||me!==kn||Se!==ei)&&(i.stencilFunc(mt,kn,ei),Q=mt,me=kn,Se=ei)},setOp:function(mt,kn,ei){(se!==mt||Be!==kn||Ie!==ei)&&(i.stencilOp(mt,kn,ei),se=mt,Be=kn,Ie=ei)},setLocked:function(mt){k=mt},setClear:function(mt){Ct!==mt&&(i.clearStencil(mt),Ct=mt)},reset:function(){k=!1,pe=null,Q=null,me=null,Se=null,se=null,Be=null,Ie=null,Ct=null}}}let r=new t,a=new n,o=new s,c=new WeakMap,l=new WeakMap,u={},d={},f={},h=new WeakMap,p=[],x=null,g=!1,m=null,b=null,A=null,_=null,w=null,T=null,C=null,y=new be(0,0,0),S=0,E=!1,D=null,F=null,N=null,I=null,U=null,z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),V=!1,Z=0,q=i.getParameter(i.VERSION);q.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(q)[1]),V=Z>=1):q.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),V=Z>=2);let J=null,ie={},Ue=i.getParameter(i.SCISSOR_BOX),Ee=i.getParameter(i.VIEWPORT),ht=new bt().fromArray(Ue),rt=new bt().fromArray(Ee);function ut(k,pe,Q,me){let Se=new Uint8Array(4),se=i.createTexture();i.bindTexture(k,se),i.texParameteri(k,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(k,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Be=0;Be<Q;Be++)k===i.TEXTURE_3D||k===i.TEXTURE_2D_ARRAY?i.texImage3D(pe,0,i.RGBA,1,1,me,0,i.RGBA,i.UNSIGNED_BYTE,Se):i.texImage2D(pe+Be,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Se);return se}let j={};j[i.TEXTURE_2D]=ut(i.TEXTURE_2D,i.TEXTURE_2D,1),j[i.TEXTURE_CUBE_MAP]=ut(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[i.TEXTURE_2D_ARRAY]=ut(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),j[i.TEXTURE_3D]=ut(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),te(i.DEPTH_TEST),a.setFunc(rr),le(!1),de(Md),te(i.CULL_FACE),ae(fi);function te(k){u[k]!==!0&&(i.enable(k),u[k]=!0)}function _e(k){u[k]!==!1&&(i.disable(k),u[k]=!1)}function Xe(k,pe){return f[k]!==pe?(i.bindFramebuffer(k,pe),f[k]=pe,k===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=pe),k===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=pe),!0):!1}function Me(k,pe){let Q=p,me=!1;if(k){Q=h.get(pe),Q===void 0&&(Q=[],h.set(pe,Q));let Se=k.textures;if(Q.length!==Se.length||Q[0]!==i.COLOR_ATTACHMENT0){for(let se=0,Be=Se.length;se<Be;se++)Q[se]=i.COLOR_ATTACHMENT0+se;Q.length=Se.length,me=!0}}else Q[0]!==i.BACK&&(Q[0]=i.BACK,me=!0);me&&i.drawBuffers(Q)}function qe(k){return x!==k?(i.useProgram(k),x=k,!0):!1}let yt={[Is]:i.FUNC_ADD,[Ap]:i.FUNC_SUBTRACT,[Ep]:i.FUNC_REVERSE_SUBTRACT};yt[Cp]=i.MIN,yt[Rp]=i.MAX;let ne={[Pp]:i.ZERO,[Ip]:i.ONE,[Lp]:i.SRC_COLOR,[Ed]:i.SRC_ALPHA,[Bp]:i.SRC_ALPHA_SATURATE,[Fp]:i.DST_COLOR,[Np]:i.DST_ALPHA,[Dp]:i.ONE_MINUS_SRC_COLOR,[Cd]:i.ONE_MINUS_SRC_ALPHA,[Op]:i.ONE_MINUS_DST_COLOR,[Up]:i.ONE_MINUS_DST_ALPHA,[kp]:i.CONSTANT_COLOR,[zp]:i.ONE_MINUS_CONSTANT_COLOR,[Gp]:i.CONSTANT_ALPHA,[Vp]:i.ONE_MINUS_CONSTANT_ALPHA};function ae(k,pe,Q,me,Se,se,Be,Ie,Ct,mt){if(k===fi){g===!0&&(_e(i.BLEND),g=!1);return}if(g===!1&&(te(i.BLEND),g=!0),k!==Tp){if(k!==m||mt!==E){if((b!==Is||w!==Is)&&(i.blendEquation(i.FUNC_ADD),b=Is,w=Is),mt)switch(k){case Er:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case wd:i.blendFunc(i.ONE,i.ONE);break;case Td:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ad:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:We("WebGLState: Invalid blending: ",k);break}else switch(k){case Er:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case wd:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Td:We("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ad:We("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:We("WebGLState: Invalid blending: ",k);break}A=null,_=null,T=null,C=null,y.set(0,0,0),S=0,m=k,E=mt}return}Se=Se||pe,se=se||Q,Be=Be||me,(pe!==b||Se!==w)&&(i.blendEquationSeparate(yt[pe],yt[Se]),b=pe,w=Se),(Q!==A||me!==_||se!==T||Be!==C)&&(i.blendFuncSeparate(ne[Q],ne[me],ne[se],ne[Be]),A=Q,_=me,T=se,C=Be),(Ie.equals(y)===!1||Ct!==S)&&(i.blendColor(Ie.r,Ie.g,Ie.b,Ct),y.copy(Ie),S=Ct),m=k,E=!1}function oe(k,pe){k.side===nn?_e(i.CULL_FACE):te(i.CULL_FACE);let Q=k.side===dn;pe&&(Q=!Q),le(Q),k.blending===Er&&k.transparent===!1?ae(fi):ae(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),a.setFunc(k.depthFunc),a.setTest(k.depthTest),a.setMask(k.depthWrite),r.setMask(k.colorWrite);let me=k.stencilWrite;o.setTest(me),me&&(o.setMask(k.stencilWriteMask),o.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),o.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),ke(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?te(i.SAMPLE_ALPHA_TO_COVERAGE):_e(i.SAMPLE_ALPHA_TO_COVERAGE)}function le(k){D!==k&&(k?i.frontFace(i.CW):i.frontFace(i.CCW),D=k)}function de(k){k!==Sp?(te(i.CULL_FACE),k!==F&&(k===Md?i.cullFace(i.BACK):k===Mp?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):_e(i.CULL_FACE),F=k}function Ge(k){k!==N&&(V&&i.lineWidth(k),N=k)}function ke(k,pe,Q){k?(te(i.POLYGON_OFFSET_FILL),(I!==pe||U!==Q)&&(I=pe,U=Q,a.getReversed()&&(pe=-pe),i.polygonOffset(pe,Q))):_e(i.POLYGON_OFFSET_FILL)}function $e(k){k?te(i.SCISSOR_TEST):_e(i.SCISSOR_TEST)}function je(k){k===void 0&&(k=i.TEXTURE0+z-1),J!==k&&(i.activeTexture(k),J=k)}function O(k,pe,Q){Q===void 0&&(J===null?Q=i.TEXTURE0+z-1:Q=J);let me=ie[Q];me===void 0&&(me={type:void 0,texture:void 0},ie[Q]=me),(me.type!==k||me.texture!==pe)&&(J!==Q&&(i.activeTexture(Q),J=Q),i.bindTexture(k,pe||j[k]),me.type=k,me.texture=pe)}function pt(){let k=ie[J];k!==void 0&&k.type!==void 0&&(i.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function at(){try{i.compressedTexImage2D(...arguments)}catch(k){We("WebGLState:",k)}}function R(){try{i.compressedTexImage3D(...arguments)}catch(k){We("WebGLState:",k)}}function v(){try{i.texSubImage2D(...arguments)}catch(k){We("WebGLState:",k)}}function G(){try{i.texSubImage3D(...arguments)}catch(k){We("WebGLState:",k)}}function X(){try{i.compressedTexSubImage2D(...arguments)}catch(k){We("WebGLState:",k)}}function Y(){try{i.compressedTexSubImage3D(...arguments)}catch(k){We("WebGLState:",k)}}function ce(){try{i.texStorage2D(...arguments)}catch(k){We("WebGLState:",k)}}function ue(){try{i.texStorage3D(...arguments)}catch(k){We("WebGLState:",k)}}function K(){try{i.texImage2D(...arguments)}catch(k){We("WebGLState:",k)}}function ee(){try{i.texImage3D(...arguments)}catch(k){We("WebGLState:",k)}}function fe(k){return d[k]!==void 0?d[k]:i.getParameter(k)}function Fe(k,pe){d[k]!==pe&&(i.pixelStorei(k,pe),d[k]=pe)}function ge(k){ht.equals(k)===!1&&(i.scissor(k.x,k.y,k.z,k.w),ht.copy(k))}function he(k){rt.equals(k)===!1&&(i.viewport(k.x,k.y,k.z,k.w),rt.copy(k))}function Oe(k,pe){let Q=l.get(pe);Q===void 0&&(Q=new WeakMap,l.set(pe,Q));let me=Q.get(k);me===void 0&&(me=i.getUniformBlockIndex(pe,k.name),Q.set(k,me))}function Ve(k,pe){let me=l.get(pe).get(k);c.get(pe)!==me&&(i.uniformBlockBinding(pe,me,k.__bindingPointIndex),c.set(pe,me))}function Ze(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},d={},J=null,ie={},f={},h=new WeakMap,p=[],x=null,g=!1,m=null,b=null,A=null,_=null,w=null,T=null,C=null,y=new be(0,0,0),S=0,E=!1,D=null,F=null,N=null,I=null,U=null,ht.set(0,0,i.canvas.width,i.canvas.height),rt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:te,disable:_e,bindFramebuffer:Xe,drawBuffers:Me,useProgram:qe,setBlending:ae,setMaterial:oe,setFlipSided:le,setCullFace:de,setLineWidth:Ge,setPolygonOffset:ke,setScissorTest:$e,activeTexture:je,bindTexture:O,unbindTexture:pt,compressedTexImage2D:at,compressedTexImage3D:R,texImage2D:K,texImage3D:ee,pixelStorei:Fe,getParameter:fe,updateUBOMapping:Oe,uniformBlockBinding:Ve,texStorage2D:ce,texStorage3D:ue,texSubImage2D:v,texSubImage3D:G,compressedTexSubImage2D:X,compressedTexSubImage3D:Y,scissor:ge,viewport:he,reset:Ze}}function Gb(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new re,u=new WeakMap,d=new Set,f,h=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(R,v){return p?new OffscreenCanvas(R,v):lr("canvas")}function g(R,v,G){let X=1,Y=at(R);if((Y.width>G||Y.height>G)&&(X=G/Math.max(Y.width,Y.height)),X<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){let ce=Math.floor(X*Y.width),ue=Math.floor(X*Y.height);f===void 0&&(f=x(ce,ue));let K=v?x(ce,ue):f;return K.width=ce,K.height=ue,K.getContext("2d").drawImage(R,0,0,ce,ue),De("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+ce+"x"+ue+")."),K}else return"data"in R&&De("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),R;return R}function m(R){return R.generateMipmaps}function b(R){i.generateMipmap(R)}function A(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(R,v,G,X,Y,ce=!1){if(R!==null){if(i[R]!==void 0)return i[R];De("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let ue;X&&(ue=e.get("EXT_texture_norm16"),ue||De("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let K=v;if(v===i.RED&&(G===i.FLOAT&&(K=i.R32F),G===i.HALF_FLOAT&&(K=i.R16F),G===i.UNSIGNED_BYTE&&(K=i.R8),G===i.UNSIGNED_SHORT&&ue&&(K=ue.R16_EXT),G===i.SHORT&&ue&&(K=ue.R16_SNORM_EXT)),v===i.RED_INTEGER&&(G===i.UNSIGNED_BYTE&&(K=i.R8UI),G===i.UNSIGNED_SHORT&&(K=i.R16UI),G===i.UNSIGNED_INT&&(K=i.R32UI),G===i.BYTE&&(K=i.R8I),G===i.SHORT&&(K=i.R16I),G===i.INT&&(K=i.R32I)),v===i.RG&&(G===i.FLOAT&&(K=i.RG32F),G===i.HALF_FLOAT&&(K=i.RG16F),G===i.UNSIGNED_BYTE&&(K=i.RG8),G===i.UNSIGNED_SHORT&&ue&&(K=ue.RG16_EXT),G===i.SHORT&&ue&&(K=ue.RG16_SNORM_EXT)),v===i.RG_INTEGER&&(G===i.UNSIGNED_BYTE&&(K=i.RG8UI),G===i.UNSIGNED_SHORT&&(K=i.RG16UI),G===i.UNSIGNED_INT&&(K=i.RG32UI),G===i.BYTE&&(K=i.RG8I),G===i.SHORT&&(K=i.RG16I),G===i.INT&&(K=i.RG32I)),v===i.RGB_INTEGER&&(G===i.UNSIGNED_BYTE&&(K=i.RGB8UI),G===i.UNSIGNED_SHORT&&(K=i.RGB16UI),G===i.UNSIGNED_INT&&(K=i.RGB32UI),G===i.BYTE&&(K=i.RGB8I),G===i.SHORT&&(K=i.RGB16I),G===i.INT&&(K=i.RGB32I)),v===i.RGBA_INTEGER&&(G===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),G===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),G===i.UNSIGNED_INT&&(K=i.RGBA32UI),G===i.BYTE&&(K=i.RGBA8I),G===i.SHORT&&(K=i.RGBA16I),G===i.INT&&(K=i.RGBA32I)),v===i.RGB&&(G===i.UNSIGNED_SHORT&&ue&&(K=ue.RGB16_EXT),G===i.SHORT&&ue&&(K=ue.RGB16_SNORM_EXT),G===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),G===i.UNSIGNED_INT_10F_11F_11F_REV&&(K=i.R11F_G11F_B10F)),v===i.RGBA){let ee=ce?ha:nt.getTransfer(Y);G===i.FLOAT&&(K=i.RGBA32F),G===i.HALF_FLOAT&&(K=i.RGBA16F),G===i.UNSIGNED_BYTE&&(K=ee===xt?i.SRGB8_ALPHA8:i.RGBA8),G===i.UNSIGNED_SHORT&&ue&&(K=ue.RGBA16_EXT),G===i.SHORT&&ue&&(K=ue.RGBA16_SNORM_EXT),G===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),G===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function w(R,v){let G;return R?v===null||v===Jn||v===Pr?G=i.DEPTH24_STENCIL8:v===An?G=i.DEPTH32F_STENCIL8:v===Rr&&(G=i.DEPTH24_STENCIL8,De("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Jn||v===Pr?G=i.DEPTH_COMPONENT24:v===An?G=i.DEPTH_COMPONENT32F:v===Rr&&(G=i.DEPTH_COMPONENT16),G}function T(R,v){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==Ft&&R.minFilter!==Ot?Math.log2(Math.max(v.width,v.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?v.mipmaps.length:1}function C(R){let v=R.target;v.removeEventListener("dispose",C),S(v),v.isVideoTexture&&u.delete(v),v.isHTMLTexture&&d.delete(v)}function y(R){let v=R.target;v.removeEventListener("dispose",y),D(v)}function S(R){let v=n.get(R);if(v.__webglInit===void 0)return;let G=R.source,X=h.get(G);if(X){let Y=X[v.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&E(R),Object.keys(X).length===0&&h.delete(G)}n.remove(R)}function E(R){let v=n.get(R);i.deleteTexture(v.__webglTexture);let G=R.source,X=h.get(G);delete X[v.__cacheKey],a.memory.textures--}function D(R){let v=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(v.__webglFramebuffer[X]))for(let Y=0;Y<v.__webglFramebuffer[X].length;Y++)i.deleteFramebuffer(v.__webglFramebuffer[X][Y]);else i.deleteFramebuffer(v.__webglFramebuffer[X]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[X])}else{if(Array.isArray(v.__webglFramebuffer))for(let X=0;X<v.__webglFramebuffer.length;X++)i.deleteFramebuffer(v.__webglFramebuffer[X]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let X=0;X<v.__webglColorRenderbuffer.length;X++)v.__webglColorRenderbuffer[X]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[X]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let G=R.textures;for(let X=0,Y=G.length;X<Y;X++){let ce=n.get(G[X]);ce.__webglTexture&&(i.deleteTexture(ce.__webglTexture),a.memory.textures--),n.remove(G[X])}n.remove(R)}let F=0;function N(){F=0}function I(){return F}function U(R){F=R}function z(){let R=F;return R>=s.maxTextures&&De("WebGLTextures: Trying to use "+(R+1)+" texture units while this GPU supports only "+s.maxTextures),F+=1,R}function V(R){let v=[];return v.push(R.wrapS),v.push(R.wrapT),v.push(R.wrapR||0),v.push(R.magFilter),v.push(R.minFilter),v.push(R.anisotropy),v.push(R.internalFormat),v.push(R.format),v.push(R.type),v.push(R.generateMipmaps),v.push(R.premultiplyAlpha),v.push(R.flipY),v.push(R.unpackAlignment),v.push(R.colorSpace),v.join()}function Z(R,v){let G=n.get(R);if(R.isVideoTexture&&O(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&G.__version!==R.version){let X=R.image;if(X===null)De("WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)De("WebGLRenderer: Texture marked for update but image is incomplete");else{_e(G,R,v);return}}else R.isExternalTexture&&(G.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,G.__webglTexture,i.TEXTURE0+v)}function q(R,v){let G=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&G.__version!==R.version){_e(G,R,v);return}else R.isExternalTexture&&(G.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,G.__webglTexture,i.TEXTURE0+v)}function J(R,v){let G=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&G.__version!==R.version){_e(G,R,v);return}t.bindTexture(i.TEXTURE_3D,G.__webglTexture,i.TEXTURE0+v)}function ie(R,v){let G=n.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&G.__version!==R.version){Xe(G,R,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture,i.TEXTURE0+v)}let Ue={[ji]:i.REPEAT,[Dn]:i.CLAMP_TO_EDGE,[ar]:i.MIRRORED_REPEAT},Ee={[Ft]:i.NEAREST,[Rl]:i.NEAREST_MIPMAP_NEAREST,[Ds]:i.NEAREST_MIPMAP_LINEAR,[Ot]:i.LINEAR,[Cr]:i.LINEAR_MIPMAP_NEAREST,[Zn]:i.LINEAR_MIPMAP_LINEAR},ht={[jp]:i.NEVER,[tm]:i.ALWAYS,[Zp]:i.LESS,[pc]:i.LEQUAL,[Jp]:i.EQUAL,[mc]:i.GEQUAL,[Qp]:i.GREATER,[em]:i.NOTEQUAL};function rt(R,v){if(v.type===An&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Ot||v.magFilter===Cr||v.magFilter===Ds||v.magFilter===Zn||v.minFilter===Ot||v.minFilter===Cr||v.minFilter===Ds||v.minFilter===Zn)&&De("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,Ue[v.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,Ue[v.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,Ue[v.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,Ee[v.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,Ee[v.minFilter]),v.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,ht[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Ft||v.minFilter!==Ds&&v.minFilter!==Zn||v.type===An&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){let G=e.get("EXT_texture_filter_anisotropic");i.texParameterf(R,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function ut(R,v){let G=!1;R.__webglInit===void 0&&(R.__webglInit=!0,v.addEventListener("dispose",C));let X=v.source,Y=h.get(X);Y===void 0&&(Y={},h.set(X,Y));let ce=V(v);if(ce!==R.__cacheKey){Y[ce]===void 0&&(Y[ce]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,G=!0),Y[ce].usedTimes++;let ue=Y[R.__cacheKey];ue!==void 0&&(Y[R.__cacheKey].usedTimes--,ue.usedTimes===0&&E(v)),R.__cacheKey=ce,R.__webglTexture=Y[ce].texture}return G}function j(R,v,G){return Math.floor(Math.floor(R/G)/v)}function te(R,v,G,X){let ce=R.updateRanges;if(ce.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,G,X,v.data);else{ce.sort((Fe,ge)=>Fe.start-ge.start);let ue=0;for(let Fe=1;Fe<ce.length;Fe++){let ge=ce[ue],he=ce[Fe],Oe=ge.start+ge.count,Ve=j(he.start,v.width,4),Ze=j(ge.start,v.width,4);he.start<=Oe+1&&Ve===Ze&&j(he.start+he.count-1,v.width,4)===Ve?ge.count=Math.max(ge.count,he.start+he.count-ge.start):(++ue,ce[ue]=he)}ce.length=ue+1;let K=t.getParameter(i.UNPACK_ROW_LENGTH),ee=t.getParameter(i.UNPACK_SKIP_PIXELS),fe=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let Fe=0,ge=ce.length;Fe<ge;Fe++){let he=ce[Fe],Oe=Math.floor(he.start/4),Ve=Math.ceil(he.count/4),Ze=Oe%v.width,k=Math.floor(Oe/v.width),pe=Ve,Q=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Ze),t.pixelStorei(i.UNPACK_SKIP_ROWS,k),t.texSubImage2D(i.TEXTURE_2D,0,Ze,k,pe,Q,G,X,v.data)}R.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,K),t.pixelStorei(i.UNPACK_SKIP_PIXELS,ee),t.pixelStorei(i.UNPACK_SKIP_ROWS,fe)}}function _e(R,v,G){let X=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(X=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(X=i.TEXTURE_3D);let Y=ut(R,v),ce=v.source;t.bindTexture(X,R.__webglTexture,i.TEXTURE0+G);let ue=n.get(ce);if(ce.version!==ue.__version||Y===!0){if(t.activeTexture(i.TEXTURE0+G),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){let Q=nt.getPrimaries(nt.workingColorSpace),me=v.colorSpace===Fi?null:nt.getPrimaries(v.colorSpace),Se=v.colorSpace===Fi||Q===me?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se)}t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment);let ee=g(v.image,!1,s.maxTextureSize);ee=pt(v,ee);let fe=r.convert(v.format,v.colorSpace),Fe=r.convert(v.type),ge=_(v.internalFormat,fe,Fe,v.normalized,v.colorSpace,v.isVideoTexture);rt(X,v);let he,Oe=v.mipmaps,Ve=v.isVideoTexture!==!0,Ze=ue.__version===void 0||Y===!0,k=ce.dataReady,pe=T(v,ee);if(v.isDepthTexture)ge=w(v.format===ss,v.type),Ze&&(Ve?t.texStorage2D(i.TEXTURE_2D,1,ge,ee.width,ee.height):t.texImage2D(i.TEXTURE_2D,0,ge,ee.width,ee.height,0,fe,Fe,null));else if(v.isDataTexture)if(Oe.length>0){Ve&&Ze&&t.texStorage2D(i.TEXTURE_2D,pe,ge,Oe[0].width,Oe[0].height);for(let Q=0,me=Oe.length;Q<me;Q++)he=Oe[Q],Ve?k&&t.texSubImage2D(i.TEXTURE_2D,Q,0,0,he.width,he.height,fe,Fe,he.data):t.texImage2D(i.TEXTURE_2D,Q,ge,he.width,he.height,0,fe,Fe,he.data);v.generateMipmaps=!1}else Ve?(Ze&&t.texStorage2D(i.TEXTURE_2D,pe,ge,ee.width,ee.height),k&&te(v,ee,fe,Fe)):t.texImage2D(i.TEXTURE_2D,0,ge,ee.width,ee.height,0,fe,Fe,ee.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Ve&&Ze&&t.texStorage3D(i.TEXTURE_2D_ARRAY,pe,ge,Oe[0].width,Oe[0].height,ee.depth);for(let Q=0,me=Oe.length;Q<me;Q++)if(he=Oe[Q],v.format!==En)if(fe!==null)if(Ve){if(k)if(v.layerUpdates.size>0){let Se=Zd(he.width,he.height,v.format,v.type);for(let se of v.layerUpdates){let Be=he.data.subarray(se*Se/he.data.BYTES_PER_ELEMENT,(se+1)*Se/he.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,se,he.width,he.height,1,fe,Be)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,0,he.width,he.height,ee.depth,fe,he.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Q,ge,he.width,he.height,ee.depth,0,he.data,0,0);else De("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ve?k&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,0,he.width,he.height,ee.depth,fe,Fe,he.data):t.texImage3D(i.TEXTURE_2D_ARRAY,Q,ge,he.width,he.height,ee.depth,0,fe,Fe,he.data);v.layerUpdates.size>0&&v.clearLayerUpdates()}else{Ve&&Ze&&t.texStorage2D(i.TEXTURE_2D,pe,ge,Oe[0].width,Oe[0].height);for(let Q=0,me=Oe.length;Q<me;Q++)he=Oe[Q],v.format!==En?fe!==null?Ve?k&&t.compressedTexSubImage2D(i.TEXTURE_2D,Q,0,0,he.width,he.height,fe,he.data):t.compressedTexImage2D(i.TEXTURE_2D,Q,ge,he.width,he.height,0,he.data):De("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ve?k&&t.texSubImage2D(i.TEXTURE_2D,Q,0,0,he.width,he.height,fe,Fe,he.data):t.texImage2D(i.TEXTURE_2D,Q,ge,he.width,he.height,0,fe,Fe,he.data)}else if(v.isDataArrayTexture)if(Ve){if(Ze&&t.texStorage3D(i.TEXTURE_2D_ARRAY,pe,ge,ee.width,ee.height,ee.depth),k)if(v.layerUpdates.size>0){let Q=Zd(ee.width,ee.height,v.format,v.type);for(let me of v.layerUpdates){let Se=ee.data.subarray(me*Q/ee.data.BYTES_PER_ELEMENT,(me+1)*Q/ee.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,me,ee.width,ee.height,1,fe,Fe,Se)}v.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,fe,Fe,ee.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ge,ee.width,ee.height,ee.depth,0,fe,Fe,ee.data);else if(v.isData3DTexture)Ve?(Ze&&t.texStorage3D(i.TEXTURE_3D,pe,ge,ee.width,ee.height,ee.depth),k&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,fe,Fe,ee.data)):t.texImage3D(i.TEXTURE_3D,0,ge,ee.width,ee.height,ee.depth,0,fe,Fe,ee.data);else if(v.isFramebufferTexture){if(Ze)if(Ve)t.texStorage2D(i.TEXTURE_2D,pe,ge,ee.width,ee.height);else{let Q=ee.width,me=ee.height;for(let Se=0;Se<pe;Se++)t.texImage2D(i.TEXTURE_2D,Se,ge,Q,me,0,fe,Fe,null),Q>>=1,me>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in i){let Q=i.canvas;if(Q.hasAttribute("layoutsubtree")||Q.setAttribute("layoutsubtree","true"),ee.parentNode!==Q){Q.appendChild(ee),d.add(v),Q.onpaint=me=>{let Se=me.changedElements;for(let se of d)Se.includes(se.image)&&(se.needsUpdate=!0)},Q.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ee);else{let Se=i.RGBA,se=i.RGBA,Be=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Se,se,Be,ee)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Oe.length>0){if(Ve&&Ze){let Q=at(Oe[0]);t.texStorage2D(i.TEXTURE_2D,pe,ge,Q.width,Q.height)}for(let Q=0,me=Oe.length;Q<me;Q++)he=Oe[Q],Ve?k&&t.texSubImage2D(i.TEXTURE_2D,Q,0,0,fe,Fe,he):t.texImage2D(i.TEXTURE_2D,Q,ge,fe,Fe,he);v.generateMipmaps=!1}else if(Ve){if(Ze){let Q=at(ee);t.texStorage2D(i.TEXTURE_2D,pe,ge,Q.width,Q.height)}k&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,fe,Fe,ee)}else t.texImage2D(i.TEXTURE_2D,0,ge,fe,Fe,ee);m(v)&&b(X),ue.__version=ce.version,v.onUpdate&&v.onUpdate(v)}R.__version=v.version}function Xe(R,v,G){if(v.image.length!==6)return;let X=ut(R,v),Y=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+G);let ce=n.get(Y);if(Y.version!==ce.__version||X===!0){t.activeTexture(i.TEXTURE0+G);let ue=nt.getPrimaries(nt.workingColorSpace),K=v.colorSpace===Fi?null:nt.getPrimaries(v.colorSpace),ee=v.colorSpace===Fi||ue===K?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ee);let fe=v.isCompressedTexture||v.image[0].isCompressedTexture,Fe=v.image[0]&&v.image[0].isDataTexture,ge=[];for(let se=0;se<6;se++)!fe&&!Fe?ge[se]=g(v.image[se],!0,s.maxCubemapSize):ge[se]=Fe?v.image[se].image:v.image[se],ge[se]=pt(v,ge[se]);let he=ge[0],Oe=r.convert(v.format,v.colorSpace),Ve=r.convert(v.type),Ze=_(v.internalFormat,Oe,Ve,v.normalized,v.colorSpace),k=v.isVideoTexture!==!0,pe=ce.__version===void 0||X===!0,Q=Y.dataReady,me=T(v,he);rt(i.TEXTURE_CUBE_MAP,v);let Se;if(fe){k&&pe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,me,Ze,he.width,he.height);for(let se=0;se<6;se++){Se=ge[se].mipmaps;for(let Be=0;Be<Se.length;Be++){let Ie=Se[Be];v.format!==En?Oe!==null?k?Q&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Be,0,0,Ie.width,Ie.height,Oe,Ie.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Be,Ze,Ie.width,Ie.height,0,Ie.data):De("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):k?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Be,0,0,Ie.width,Ie.height,Oe,Ve,Ie.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Be,Ze,Ie.width,Ie.height,0,Oe,Ve,Ie.data)}}}else{if(Se=v.mipmaps,k&&pe){Se.length>0&&me++;let se=at(ge[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,me,Ze,se.width,se.height)}for(let se=0;se<6;se++)if(Fe){k?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,ge[se].width,ge[se].height,Oe,Ve,ge[se].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,Ze,ge[se].width,ge[se].height,0,Oe,Ve,ge[se].data);for(let Be=0;Be<Se.length;Be++){let Ct=Se[Be].image[se].image;k?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Be+1,0,0,Ct.width,Ct.height,Oe,Ve,Ct.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Be+1,Ze,Ct.width,Ct.height,0,Oe,Ve,Ct.data)}}else{k?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,Oe,Ve,ge[se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,Ze,Oe,Ve,ge[se]);for(let Be=0;Be<Se.length;Be++){let Ie=Se[Be];k?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Be+1,0,0,Oe,Ve,Ie.image[se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Be+1,Ze,Oe,Ve,Ie.image[se])}}}m(v)&&b(i.TEXTURE_CUBE_MAP),ce.__version=Y.version,v.onUpdate&&v.onUpdate(v)}R.__version=v.version}function Me(R,v,G,X,Y,ce){let ue=r.convert(G.format,G.colorSpace),K=r.convert(G.type),ee=_(G.internalFormat,ue,K,G.normalized,G.colorSpace),fe=n.get(v),Fe=n.get(G);if(Fe.__renderTarget=v,!fe.__hasExternalTextures){let ge=Math.max(1,v.width>>ce),he=Math.max(1,v.height>>ce);Y===i.TEXTURE_3D||Y===i.TEXTURE_2D_ARRAY?t.texImage3D(Y,ce,ee,ge,he,v.depth,0,ue,K,null):t.texImage2D(Y,ce,ee,ge,he,0,ue,K,null)}t.bindFramebuffer(i.FRAMEBUFFER,R),je(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,X,Y,Fe.__webglTexture,0,$e(v)):(Y===i.TEXTURE_2D||Y>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,X,Y,Fe.__webglTexture,ce),t.bindFramebuffer(i.FRAMEBUFFER,null)}function qe(R,v,G){if(i.bindRenderbuffer(i.RENDERBUFFER,R),v.depthBuffer){let X=v.depthTexture,Y=X&&X.isDepthTexture?X.type:null,ce=w(v.stencilBuffer,Y),ue=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;je(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,$e(v),ce,v.width,v.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,$e(v),ce,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,ce,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ue,i.RENDERBUFFER,R)}else{let X=v.textures;for(let Y=0;Y<X.length;Y++){let ce=X[Y],ue=r.convert(ce.format,ce.colorSpace),K=r.convert(ce.type),ee=_(ce.internalFormat,ue,K,ce.normalized,ce.colorSpace);je(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,$e(v),ee,v.width,v.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,$e(v),ee,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,ee,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function yt(R,v,G){let X=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,R),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Y=n.get(v.depthTexture);if(Y.__renderTarget=v,(!Y.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),X){if(Y.__webglInit===void 0&&(Y.__webglInit=!0,v.depthTexture.addEventListener("dispose",C)),Y.__webglTexture===void 0){Y.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),rt(i.TEXTURE_CUBE_MAP,v.depthTexture);let fe=r.convert(v.depthTexture.format),Fe=r.convert(v.depthTexture.type),ge;v.depthTexture.format===ri?ge=i.DEPTH_COMPONENT24:v.depthTexture.format===ss&&(ge=i.DEPTH24_STENCIL8);for(let he=0;he<6;he++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,ge,v.width,v.height,0,fe,Fe,null)}}else Z(v.depthTexture,0);let ce=Y.__webglTexture,ue=$e(v),K=X?i.TEXTURE_CUBE_MAP_POSITIVE_X+G:i.TEXTURE_2D,ee=v.depthTexture.format===ss?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(v.depthTexture.format===ri)je(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ee,K,ce,0,ue):i.framebufferTexture2D(i.FRAMEBUFFER,ee,K,ce,0);else if(v.depthTexture.format===ss)je(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ee,K,ce,0,ue):i.framebufferTexture2D(i.FRAMEBUFFER,ee,K,ce,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ne(R){let v=n.get(R),G=R.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==R.depthTexture){let X=R.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),X){let Y=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,X.removeEventListener("dispose",Y)};X.addEventListener("dispose",Y),v.__depthDisposeCallback=Y}v.__boundDepthTexture=X}if(R.depthTexture&&!v.__autoAllocateDepthBuffer)if(G)for(let X=0;X<6;X++)yt(v.__webglFramebuffer[X],R,X);else{let X=R.texture.mipmaps;X&&X.length>0?yt(v.__webglFramebuffer[0],R,0):yt(v.__webglFramebuffer,R,0)}else if(G){v.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[X]),v.__webglDepthbuffer[X]===void 0)v.__webglDepthbuffer[X]=i.createRenderbuffer(),qe(v.__webglDepthbuffer[X],R,!1);else{let Y=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ce=v.__webglDepthbuffer[X];i.bindRenderbuffer(i.RENDERBUFFER,ce),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,ce)}}else{let X=R.texture.mipmaps;if(X&&X.length>0?t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),qe(v.__webglDepthbuffer,R,!1);else{let Y=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ce=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ce),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,ce)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function ae(R,v,G){let X=n.get(R);v!==void 0&&Me(X.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),G!==void 0&&ne(R)}function oe(R){let v=R.texture,G=n.get(R),X=n.get(v);R.addEventListener("dispose",y);let Y=R.textures,ce=R.isWebGLCubeRenderTarget===!0,ue=Y.length>1;if(ue||(X.__webglTexture===void 0&&(X.__webglTexture=i.createTexture()),X.__version=v.version,a.memory.textures++),ce){G.__webglFramebuffer=[];for(let K=0;K<6;K++)if(v.mipmaps&&v.mipmaps.length>0){G.__webglFramebuffer[K]=[];for(let ee=0;ee<v.mipmaps.length;ee++)G.__webglFramebuffer[K][ee]=i.createFramebuffer()}else G.__webglFramebuffer[K]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){G.__webglFramebuffer=[];for(let K=0;K<v.mipmaps.length;K++)G.__webglFramebuffer[K]=i.createFramebuffer()}else G.__webglFramebuffer=i.createFramebuffer();if(ue)for(let K=0,ee=Y.length;K<ee;K++){let fe=n.get(Y[K]);fe.__webglTexture===void 0&&(fe.__webglTexture=i.createTexture(),a.memory.textures++)}if(R.samples>0&&je(R)===!1){G.__webglMultisampledFramebuffer=i.createFramebuffer(),G.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let K=0;K<Y.length;K++){let ee=Y[K];G.__webglColorRenderbuffer[K]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,G.__webglColorRenderbuffer[K]);let fe=r.convert(ee.format,ee.colorSpace),Fe=r.convert(ee.type),ge=_(ee.internalFormat,fe,Fe,ee.normalized,ee.colorSpace,R.isXRRenderTarget===!0),he=$e(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,he,ge,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+K,i.RENDERBUFFER,G.__webglColorRenderbuffer[K])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(G.__webglDepthRenderbuffer=i.createRenderbuffer(),qe(G.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ce){t.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture),rt(i.TEXTURE_CUBE_MAP,v);for(let K=0;K<6;K++)if(v.mipmaps&&v.mipmaps.length>0)for(let ee=0;ee<v.mipmaps.length;ee++)Me(G.__webglFramebuffer[K][ee],R,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ee);else Me(G.__webglFramebuffer[K],R,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0);m(v)&&b(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ue){for(let K=0,ee=Y.length;K<ee;K++){let fe=Y[K],Fe=n.get(fe),ge=i.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ge=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ge,Fe.__webglTexture),rt(ge,fe),Me(G.__webglFramebuffer,R,fe,i.COLOR_ATTACHMENT0+K,ge,0),m(fe)&&b(ge)}t.unbindTexture()}else{let K=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(K=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(K,X.__webglTexture),rt(K,v),v.mipmaps&&v.mipmaps.length>0)for(let ee=0;ee<v.mipmaps.length;ee++)Me(G.__webglFramebuffer[ee],R,v,i.COLOR_ATTACHMENT0,K,ee);else Me(G.__webglFramebuffer,R,v,i.COLOR_ATTACHMENT0,K,0);m(v)&&b(K),t.unbindTexture()}R.depthBuffer&&ne(R)}function le(R){let v=R.textures;for(let G=0,X=v.length;G<X;G++){let Y=v[G];if(m(Y)){let ce=A(R),ue=n.get(Y).__webglTexture;t.bindTexture(ce,ue),b(ce),t.unbindTexture()}}}let de=[],Ge=[];function ke(R){if(R.samples>0){if(je(R)===!1){let v=R.textures,G=R.width,X=R.height,Y=i.COLOR_BUFFER_BIT,ce=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ue=n.get(R),K=v.length>1;if(K)for(let fe=0;fe<v.length;fe++)t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ue.__webglMultisampledFramebuffer);let ee=R.texture.mipmaps;ee&&ee.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ue.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ue.__webglFramebuffer);for(let fe=0;fe<v.length;fe++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(Y|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(Y|=i.STENCIL_BUFFER_BIT)),K){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ue.__webglColorRenderbuffer[fe]);let Fe=n.get(v[fe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Fe,0)}i.blitFramebuffer(0,0,G,X,0,0,G,X,Y,i.NEAREST),c===!0&&(de.length=0,Ge.length=0,de.push(i.COLOR_ATTACHMENT0+fe),R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&(de.push(ce),Ge.push(ce),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ge)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,de))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),K)for(let fe=0;fe<v.length;fe++){t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.RENDERBUFFER,ue.__webglColorRenderbuffer[fe]);let Fe=n.get(v[fe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.TEXTURE_2D,Fe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ue.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&c){let v=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function $e(R){return Math.min(s.maxSamples,R.samples)}function je(R){let v=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function O(R){let v=a.render.frame;u.get(R)!==v&&(u.set(R,v),R.update())}function pt(R,v){let G=R.colorSpace,X=R.format,Y=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||G!==cn&&G!==Fi&&(nt.getTransfer(G)===xt?(X!==En||Y!==_n)&&De("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):We("WebGLTextures: Unsupported texture color space:",G)),v}function at(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=z,this.resetTextureUnits=N,this.getTextureUnits=I,this.setTextureUnits=U,this.setTexture2D=Z,this.setTexture2DArray=q,this.setTexture3D=J,this.setTextureCube=ie,this.rebindTextures=ae,this.setupRenderTarget=oe,this.updateRenderTargetMipmap=le,this.updateMultisampleRenderTarget=ke,this.setupDepthRenderbuffer=ne,this.setupFrameBufferTexture=Me,this.useMultisampledRTT=je,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Vb(i,e){function t(n,s=Fi){let r,a=nt.getTransfer(s);if(n===_n)return i.UNSIGNED_BYTE;if(n===Il)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ll)return i.UNSIGNED_SHORT_5_5_5_1;if(n===kd)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===zd)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Od)return i.BYTE;if(n===Bd)return i.SHORT;if(n===Rr)return i.UNSIGNED_SHORT;if(n===Pl)return i.INT;if(n===Jn)return i.UNSIGNED_INT;if(n===An)return i.FLOAT;if(n===Qn)return i.HALF_FLOAT;if(n===Gd)return i.ALPHA;if(n===Vd)return i.RGB;if(n===En)return i.RGBA;if(n===ri)return i.DEPTH_COMPONENT;if(n===ss)return i.DEPTH_STENCIL;if(n===Dl)return i.RED;if(n===Nl)return i.RED_INTEGER;if(n===rs)return i.RG;if(n===Ul)return i.RG_INTEGER;if(n===Fl)return i.RGBA_INTEGER;if(n===Wa||n===Xa||n===qa||n===$a)if(a===xt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Wa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Xa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===qa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===$a)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Wa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Xa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===qa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===$a)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ol||n===Bl||n===kl||n===zl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ol)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Bl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===kl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===zl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Gl||n===Vl||n===Hl||n===Wl||n===Xl||n===Ya||n===ql)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Gl||n===Vl)return a===xt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Hl)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Wl)return r.COMPRESSED_R11_EAC;if(n===Xl)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Ya)return r.COMPRESSED_RG11_EAC;if(n===ql)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===$l||n===Yl||n===Kl||n===jl||n===Zl||n===Jl||n===Ql||n===ec||n===tc||n===nc||n===ic||n===sc||n===rc||n===ac)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===$l)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Yl)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Kl)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===jl)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Zl)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Jl)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ql)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ec)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===tc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===nc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ic)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===sc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===rc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ac)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===oc||n===lc||n===cc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===oc)return a===xt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===lc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===cc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===uc||n===dc||n===Ka||n===fc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===uc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===dc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ka)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===fc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Pr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var Hb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Wb=`
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

}`,ff=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Sa(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Tn({vertexShader:Hb,fragmentShader:Wb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ne(new Yn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},hf=class extends qn{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,d=null,f=null,h=null,p=null,x=typeof XRWebGLBinding<"u",g=new ff,m={},b=t.getContextAttributes(),A=null,_=null,w=[],T=[],C=new re,y=null,S=null,E=new qt;E.viewport=new bt;let D=new qt;D.viewport=new bt;let F=[E,D],N=new Tl,I=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let te=w[j];return te===void 0&&(te=new fr,w[j]=te),te.getTargetRaySpace()},this.getControllerGrip=function(j){let te=w[j];return te===void 0&&(te=new fr,w[j]=te),te.getGripSpace()},this.getHand=function(j){let te=w[j];return te===void 0&&(te=new fr,w[j]=te),te.getHandSpace()};function z(j){let te=T.indexOf(j.inputSource);if(te===-1)return;let _e=w[te];_e!==void 0&&(_e.update(j.inputSource,j.frame,l||a),_e.dispatchEvent({type:j.type,data:j.inputSource}))}function V(){s.removeEventListener("select",z),s.removeEventListener("selectstart",z),s.removeEventListener("selectend",z),s.removeEventListener("squeeze",z),s.removeEventListener("squeezestart",z),s.removeEventListener("squeezeend",z),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",Z);for(let j=0;j<w.length;j++){let te=T[j];te!==null&&(T[j]=null,w[j].disconnect(te))}I=null,U=null,g.reset();for(let j in m)delete m[j];if(e.setRenderTarget(A),h=null,f=null,d=null,s=null,_=null,ut.stop(),n.isPresenting=!1,e.setPixelRatio(y),e.setSize(C.width,C.height,!1),S!==null){let j=S.camera;j.fov=S.fov,j.zoom=S.zoom,j.updateProjectionMatrix(),S=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,n.isPresenting===!0&&De("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){o=j,n.isPresenting===!0&&De("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(j){l=j},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(A=e.getRenderTarget(),s.addEventListener("select",z),s.addEventListener("selectstart",z),s.addEventListener("selectend",z),s.addEventListener("squeeze",z),s.addEventListener("squeezestart",z),s.addEventListener("squeezeend",z),s.addEventListener("end",V),s.addEventListener("inputsourceschange",Z),b.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(C),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let _e=null,Xe=null,Me=null;b.depth&&(Me=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,_e=b.stencil?ss:ri,Xe=b.stencil?Pr:Jn);let qe={colorFormat:t.RGBA8,depthFormat:Me,scaleFactor:r};d=this.getBinding(),f=d.createProjectionLayer(qe),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),_=new en(f.textureWidth,f.textureHeight,{format:En,type:_n,depthTexture:new Ji(f.textureWidth,f.textureHeight,Xe,void 0,void 0,void 0,void 0,void 0,void 0,_e),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let _e={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:r};h=new XRWebGLLayer(s,t,_e),s.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),_=new en(h.framebufferWidth,h.framebufferHeight,{format:En,type:_n,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),ut.setContext(s),ut.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function Z(j){for(let te=0;te<j.removed.length;te++){let _e=j.removed[te],Xe=T.indexOf(_e);Xe>=0&&(T[Xe]=null,w[Xe].disconnect(_e))}for(let te=0;te<j.added.length;te++){let _e=j.added[te],Xe=T.indexOf(_e);if(Xe===-1){for(let qe=0;qe<w.length;qe++)if(qe>=T.length){T.push(_e),Xe=qe;break}else if(T[qe]===null){T[qe]=_e,Xe=qe;break}if(Xe===-1)break}let Me=w[Xe];Me&&Me.connect(_e)}}let q=new L,J=new L;function ie(j,te,_e){q.setFromMatrixPosition(te.matrixWorld),J.setFromMatrixPosition(_e.matrixWorld);let Xe=q.distanceTo(J),Me=te.projectionMatrix.elements,qe=_e.projectionMatrix.elements,yt=Me[14]/(Me[10]-1),ne=Me[14]/(Me[10]+1),ae=(Me[9]+1)/Me[5],oe=(Me[9]-1)/Me[5],le=(Me[8]-1)/Me[0],de=(qe[8]+1)/qe[0],Ge=yt*le,ke=yt*de,$e=Xe/(-le+de),je=$e*-le;if(te.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(je),j.translateZ($e),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),Me[10]===-1)j.projectionMatrix.copy(te.projectionMatrix),j.projectionMatrixInverse.copy(te.projectionMatrixInverse);else{let O=yt+$e,pt=ne+$e,at=Ge-je,R=ke+(Xe-je),v=ae*ne/pt*O,G=oe*ne/pt*O;j.projectionMatrix.makePerspective(at,R,v,G,O,pt),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function Ue(j,te){te===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(te.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let te=j.near,_e=j.far;g.texture!==null&&(g.depthNear>0&&(te=g.depthNear),g.depthFar>0&&(_e=g.depthFar)),N.near=D.near=E.near=te,N.far=D.far=E.far=_e,(I!==N.near||U!==N.far)&&(s.updateRenderState({depthNear:N.near,depthFar:N.far}),I=N.near,U=N.far),N.layers.mask=j.layers.mask|6,E.layers.mask=N.layers.mask&-5,D.layers.mask=N.layers.mask&-3;let Xe=j.parent,Me=N.cameras;Ue(N,Xe);for(let qe=0;qe<Me.length;qe++)Ue(Me[qe],Xe);Me.length===2?ie(N,E,D):N.projectionMatrix.copy(E.projectionMatrix),S===null&&j.isPerspectiveCamera&&(S={camera:j,fov:j.fov,zoom:j.zoom}),Ee(j,N,Xe)};function Ee(j,te,_e){_e===null?j.matrix.copy(te.matrixWorld):(j.matrix.copy(_e.matrixWorld),j.matrix.invert(),j.matrix.multiply(te.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(te.projectionMatrix),j.projectionMatrixInverse.copy(te.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Ms*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(f===null&&h===null))return c},this.setFoveation=function(j){c=j,f!==null&&(f.fixedFoveation=j),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=j)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(N)},this.getCameraTexture=function(j){return m[j]};let ht=null;function rt(j,te){if(u=te.getViewerPose(l||a),p=te,u!==null){let _e=u.views;h!==null&&(e.setRenderTargetFramebuffer(_,h.framebuffer),e.setRenderTarget(_));let Xe=!1;_e.length!==N.cameras.length&&(N.cameras.length=0,Xe=!0);for(let ne=0;ne<_e.length;ne++){let ae=_e[ne],oe=null;if(h!==null)oe=h.getViewport(ae);else{let de=d.getViewSubImage(f,ae);oe=de.viewport,ne===0&&(e.setRenderTargetTextures(_,de.colorTexture,de.depthStencilTexture),e.setRenderTarget(_))}let le=F[ne];le===void 0&&(le=new qt,le.layers.enable(ne),le.viewport=new bt,F[ne]=le),le.matrix.fromArray(ae.transform.matrix),le.matrix.decompose(le.position,le.quaternion,le.scale),le.projectionMatrix.fromArray(ae.projectionMatrix),le.projectionMatrixInverse.copy(le.projectionMatrix).invert(),le.viewport.set(oe.x,oe.y,oe.width,oe.height),ne===0&&(N.matrix.copy(le.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),Xe===!0&&N.cameras.push(le)}let Me=s.enabledFeatures;if(Me&&Me.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){d=n.getBinding();let ne=d.getDepthInformation(_e[0]);ne&&ne.isValid&&ne.texture&&g.init(ne,s.renderState)}if(Me&&Me.includes("camera-access")&&x){e.state.unbindTexture(),d=n.getBinding();for(let ne=0;ne<_e.length;ne++){let ae=_e[ne].camera;if(ae){let oe=m[ae];oe||(oe=new Sa,m[ae]=oe);let le=d.getCameraImage(ae);oe.sourceTexture=le}}}}for(let _e=0;_e<w.length;_e++){let Xe=T[_e],Me=w[_e];Xe!==null&&Me!==void 0&&Me.update(Xe,te,l||a)}ht&&ht(j,te),te.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:te}),p=null}let ut=new Um;ut.setAnimationLoop(rt),this.setAnimationLoop=function(j){ht=j},this.dispose=function(){}}},Xb=new Ye,Gm=new Ke;Gm.set(-1,0,0,0,1,0,0,0,1);function qb(i,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,Yd(i)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function s(g,m,b,A,_){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(g,m):m.isMeshLambertMaterial?(r(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(g,m),d(g,m)):m.isMeshPhongMaterial?(r(g,m),u(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(g,m),f(g,m),m.isMeshPhysicalMaterial&&h(g,m,_)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),x(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?c(g,m,b,A):m.isSpriteMaterial?l(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===dn&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===dn&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);let b=e.get(m),A=b.envMap,_=b.envMapRotation;A&&(g.envMap.value=A,g.envMapRotation.value.setFromMatrix4(Xb.makeRotationFromEuler(_)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Gm),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function c(g,m,b,A){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*b,g.scale.value=A*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function l(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function u(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function d(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function f(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function h(g,m,b){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===dn&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.retroreflectivity>0&&(g.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=b.texture,g.transmissionSamplerSize.value.set(b.width,b.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function x(g,m){let b=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(b.matrixWorld),g.nearDistance.value=b.shadow.camera.near,g.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function $b(i,e,t,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(_,w){let T=w.program;n.uniformBlockBinding(_,T)}function l(_,w){let T=s[_.id];T===void 0&&(g(_),T=u(_),s[_.id]=T,_.addEventListener("dispose",b));let C=w.program;n.updateUBOMapping(_,C);let y=e.render.frame;r[_.id]!==y&&(f(_),r[_.id]=y)}function u(_){let w=d();_.__bindingPointIndex=w;let T=i.createBuffer(),C=_.__size,y=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,C,y),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,w,T),T}function d(){for(let _=0;_<o;_++)if(a.indexOf(_)===-1)return a.push(_),_;return We("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(_){let w=s[_.id],T=_.uniforms,C=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let y=0,S=T.length;y<S;y++){let E=T[y];if(Array.isArray(E))for(let D=0,F=E.length;D<F;D++)h(E[D],y,D,C);else h(E,y,0,C)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(_,w,T,C){if(x(_,w,T,C)===!0){let y=_.__offset,S=_.value;if(Array.isArray(S)){let E=0;for(let D=0;D<S.length;D++){let F=S[D],N=m(F);p(F,_.__data,E),typeof F!="number"&&typeof F!="boolean"&&!F.isMatrix3&&!ArrayBuffer.isView(F)&&(E+=N.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(S,_.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,y,_.__data)}}function p(_,w,T){typeof _=="number"||typeof _=="boolean"?w[0]=_:_.isMatrix3?(w[0]=_.elements[0],w[1]=_.elements[1],w[2]=_.elements[2],w[3]=0,w[4]=_.elements[3],w[5]=_.elements[4],w[6]=_.elements[5],w[7]=0,w[8]=_.elements[6],w[9]=_.elements[7],w[10]=_.elements[8],w[11]=0):ArrayBuffer.isView(_)?w.set(new _.constructor(_.buffer,_.byteOffset,w.length)):_.toArray(w,T)}function x(_,w,T,C){let y=_.value,S=w+"_"+T;if(C[S]===void 0)return typeof y=="number"||typeof y=="boolean"?C[S]=y:ArrayBuffer.isView(y)?C[S]=y.slice():C[S]=y.clone(),!0;{let E=C[S];if(typeof y=="number"||typeof y=="boolean"){if(E!==y)return C[S]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(E.equals(y)===!1)return E.copy(y),!0}}return!1}function g(_){let w=_.uniforms,T=0,C=16;for(let S=0,E=w.length;S<E;S++){let D=Array.isArray(w[S])?w[S]:[w[S]];for(let F=0,N=D.length;F<N;F++){let I=D[F],U=Array.isArray(I.value)?I.value:[I.value];for(let z=0,V=U.length;z<V;z++){let Z=U[z],q=m(Z),J=T%C,ie=J%q.boundary,Ue=J+ie;T+=ie,Ue!==0&&C-Ue<q.storage&&(T+=C-Ue),I.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=T,T+=q.storage}}}let y=T%C;return y>0&&(T+=C-y),_.__size=T,_.__cache={},this}function m(_){let w={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(w.boundary=4,w.storage=4):_.isVector2?(w.boundary=8,w.storage=8):_.isVector3||_.isColor?(w.boundary=16,w.storage=12):_.isVector4?(w.boundary=16,w.storage=16):_.isMatrix3?(w.boundary=48,w.storage=48):_.isMatrix4?(w.boundary=64,w.storage=64):_.isTexture?De("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(w.boundary=16,w.storage=_.byteLength):De("WebGLRenderer: Unsupported uniform value type.",_),w}function b(_){let w=_.target;w.removeEventListener("dispose",b);let T=a.indexOf(w.__bindingPointIndex);a.splice(T,1),i.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function A(){for(let _ in s)i.deleteBuffer(s[_]);a=[],s={},r={}}return{bind:c,update:l,dispose:A}}var Yb=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),hi=null;function Kb(){return hi===null&&(hi=new xr(Yb,16,16,rs,Qn),hi.name="DFG_LUT",hi.minFilter=Ot,hi.magFilter=Ot,hi.wrapS=Dn,hi.wrapT=Dn,hi.generateMipmaps=!1,hi.needsUpdate=!0),hi}var vc=class{constructor(e={}){let{canvas:t=nm(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1,outputBufferType:h=_n}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;let x=h,g=new Set([Fl,Ul,Nl]),m=new Set([_n,Jn,Rr,Pr,Il,Ll]),b=new Uint32Array(4),A=new Int32Array(4),_=new L,w=null,T=null,C=[],y=[],S=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=jn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let E=this,D=!1,F=null,N=null,I=null,U=null;this._outputColorSpace=Ut;let z=0,V=0,Z=null,q=-1,J=null,ie=new bt,Ue=new bt,Ee=null,ht=new be(0),rt=0,ut=t.width,j=t.height,te=1,_e=null,Xe=null,Me=new bt(0,0,ut,j),qe=new bt(0,0,ut,j),yt=!1,ne=new _r,ae=!1,oe=!1,le=new Ye,de=new L,Ge=new bt,ke={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},$e=!1;function je(){return Z===null?te:1}let O=n;function pt(M,B){return t.getContext(M,B)}let at,R,v,G,X,Y,ce,ue,K,ee,fe,Fe,ge,he,Oe,Ve,Ze,k,pe,Q,me,Se,se;try{let M={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Al}`),t.addEventListener("webglcontextlost",Ct,!1),t.addEventListener("webglcontextrestored",mt,!1),t.addEventListener("webglcontextcreationerror",kn,!1),O===null){let B="webgl2";if(O=pt(B,M),O===null)throw pt(B)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Be()}catch(M){throw t.removeEventListener("webglcontextlost",Ct,!1),t.removeEventListener("webglcontextrestored",mt,!1),t.removeEventListener("webglcontextcreationerror",kn,!1),We("WebGLRenderer: "+M.message),M}function Be(){at=new nv(O),at.init(),me=new Vb(O,at),R=new qy(O,at,e,me),v=new zb(O,at),R.reversedDepthBuffer&&f&&v.buffers.depth.setReversed(!0),N=O.createFramebuffer(),I=O.createFramebuffer(),U=O.createFramebuffer(),G=new rv(O),X=new Ab,Y=new Gb(O,at,v,X,R,me,G),ce=new tv(E),ue=new o0(O),Se=new Wy(O,ue),K=new iv(O,ue,G,Se),ee=new ov(O,K,ue,Se,G),k=new av(O,R,Y),Oe=new $y(X),fe=new Tb(E,ce,at,R,Se,Oe),Fe=new qb(E,X),ge=new Cb,he=new Nb(at),Ze=new Hy(E,ce,v,ee,p,c),Ve=new kb(E,ee,R),se=new $b(O,G,R,v),pe=new Xy(O,at,G),Q=new sv(O,at,G),G.programs=fe.programs,E.capabilities=R,E.extensions=at,E.properties=X,E.renderLists=ge,E.shadowMap=Ve,E.state=v,E.info=G}x!==_n&&(S=new cv(x,t.width,t.height,o,s,r));let Ie=new hf(E,O);this.xr=Ie,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){let M=at.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){let M=at.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return te},this.setPixelRatio=function(M){M!==void 0&&(te=M,this.setSize(ut,j,!1))},this.getSize=function(M){return M.set(ut,j)},this.setSize=function(M,B,$=!0){if(Ie.isPresenting){De("WebGLRenderer: Can't change size while VR device is presenting.");return}ut=M,j=B,t.width=Math.floor(M*te),t.height=Math.floor(B*te),$===!0&&(t.style.width=M+"px",t.style.height=B+"px"),S!==null&&S.setSize(t.width,t.height),this.setViewport(0,0,M,B)},this.getDrawingBufferSize=function(M){return M.set(ut*te,j*te).floor()},this.setDrawingBufferSize=function(M,B,$){ut=M,j=B,te=$,t.width=Math.floor(M*$),t.height=Math.floor(B*$),this.setViewport(0,0,M,B)},this.setEffects=function(M){if(x===_n){We("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let B=0;B<M.length;B++)if(M[B].isOutputPass===!0){De("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}S.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(ie)},this.getViewport=function(M){return M.copy(Me)},this.setViewport=function(M,B,$,H){M.isVector4?Me.set(M.x,M.y,M.z,M.w):Me.set(M,B,$,H),v.viewport(ie.copy(Me).multiplyScalar(te).round())},this.getScissor=function(M){return M.copy(qe)},this.setScissor=function(M,B,$,H){M.isVector4?qe.set(M.x,M.y,M.z,M.w):qe.set(M,B,$,H),v.scissor(Ue.copy(qe).multiplyScalar(te).round())},this.getScissorTest=function(){return yt},this.setScissorTest=function(M){v.setScissorTest(yt=M)},this.setOpaqueSort=function(M){_e=M},this.setTransparentSort=function(M){Xe=M},this.getClearColor=function(M){return M.copy(Ze.getClearColor())},this.setClearColor=function(){Ze.setClearColor(...arguments)},this.getClearAlpha=function(){return Ze.getClearAlpha()},this.setClearAlpha=function(){Ze.setClearAlpha(...arguments)},this.clear=function(M=!0,B=!0,$=!0){let H=0;if(M){let W=!1;if(Z!==null){let ve=Z.texture.format;W=g.has(ve)}if(W){let ve=Z.texture.type,Ae=m.has(ve),ye=Ze.getClearColor(),Ce=Ze.getClearAlpha(),Le=ye.r,Qe=ye.g,ot=ye.b;Ae?(b[0]=Le,b[1]=Qe,b[2]=ot,b[3]=Ce,O.clearBufferuiv(O.COLOR,0,b)):(A[0]=Le,A[1]=Qe,A[2]=ot,A[3]=Ce,O.clearBufferiv(O.COLOR,0,A))}else H|=O.COLOR_BUFFER_BIT}B&&(H|=O.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),$&&(H|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&O.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),F=M},this.dispose=function(){t.removeEventListener("webglcontextlost",Ct,!1),t.removeEventListener("webglcontextrestored",mt,!1),t.removeEventListener("webglcontextcreationerror",kn,!1),Ze.dispose(),ge.dispose(),he.dispose(),X.dispose(),ce.dispose(),ee.dispose(),Se.dispose(),se.dispose(),fe.dispose(),Ie.dispose(),Ie.removeEventListener("sessionstart",ih),Ie.removeEventListener("sessionend",sh),cs.stop()};function Ct(M){M.preventDefault(),pa("WebGLRenderer: Context Lost."),D=!0}function mt(){pa("WebGLRenderer: Context Restored."),D=!1;let M=G.autoReset,B=Ve.enabled,$=Ve.autoUpdate,H=Ve.needsUpdate,W=Ve.type;Be(),G.autoReset=M,Ve.enabled=B,Ve.autoUpdate=$,Ve.needsUpdate=H,Ve.type=W}function kn(M){We("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function ei(M){let B=M.target;B.removeEventListener("dispose",ei),gg(B)}function gg(M){xg(M),X.remove(M)}function xg(M){let B=X.get(M).programs;B!==void 0&&(B.forEach(function($){fe.releaseProgram($)}),M.isShaderMaterial&&fe.releaseShaderCache(M))}this.renderBufferDirect=function(M,B,$,H,W,ve){B===null&&(B=ke);let Ae=W.isMesh&&W.matrixWorld.determinantAffine()<0,ye=vg(M,B,$,H,W);v.setMaterial(H,Ae);let Ce=$.index,Le=1;if(H.wireframe===!0){if(Ce=K.getWireframeAttribute($),Ce===void 0)return;Le=2}let Qe=$.drawRange,ot=$.attributes.position,Re=Qe.start*Le,gt=(Qe.start+Qe.count)*Le;ve!==null&&(Re=Math.max(Re,ve.start*Le),gt=Math.min(gt,(ve.start+ve.count)*Le)),Ce!==null?(Re=Math.max(Re,0),gt=Math.min(gt,Ce.count)):ot!=null&&(Re=Math.max(Re,0),gt=Math.min(gt,ot.count));let kt=gt-Re;if(kt<0||kt===1/0)return;Se.setup(W,H,ye,$,Ce);let Pt,Tt=pe;if(Ce!==null&&(Pt=ue.get(Ce),Tt=Q,Tt.setIndex(Pt)),W.isMesh)H.wireframe===!0?(v.setLineWidth(H.wireframeLinewidth*je()),Tt.setMode(O.LINES)):Tt.setMode(O.TRIANGLES);else if(W.isLine){let Kt=H.linewidth;Kt===void 0&&(Kt=1),v.setLineWidth(Kt*je()),W.isLineSegments?Tt.setMode(O.LINES):W.isLineLoop?Tt.setMode(O.LINE_LOOP):Tt.setMode(O.LINE_STRIP)}else W.isPoints?Tt.setMode(O.POINTS):W.isSprite&&Tt.setMode(O.TRIANGLES);if(W.isBatchedMesh)if(at.get("WEBGL_multi_draw"))Tt.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{let Kt=W._multiDrawStarts,Te=W._multiDrawCounts,an=W._multiDrawCount,dt=Ce?ue.get(Ce).bytesPerElement:1,Cn=X.get(H).currentProgram.getUniforms();for(let ti=0;ti<an;ti++)Cn.setValue(O,"_gl_DrawID",ti),Tt.render(Kt[ti]/dt,Te[ti])}else if(W.isInstancedMesh)Tt.renderInstances(Re,kt,W.count);else if($.isInstancedBufferGeometry){let Kt=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,Te=Math.min($.instanceCount,Kt);Tt.renderInstances(Re,kt,Te)}else Tt.render(Re,kt)};function nh(M,B,$,H){F!==null&&M.isNodeMaterial&&F.setObject(H,M),ae===!0&&Oe.setState(M,$,!1),M.transparent===!0&&M.side===nn&&M.forceSinglePass===!1?(M.side=dn,M.needsUpdate=!0,ao(M,B,H),M.side=di,M.needsUpdate=!0,ao(M,B,H),M.side=nn):ao(M,B,H)}this.compile=function(M,B,$=null){$===null&&($=M),F!==null&&F.renderStart(M,B,$),T=he.get($),T.init(B),y.push(T),$.traverseVisible(function(W){W.isLight&&W.layers.test(B.layers)&&(T.pushLight(W),W.castShadow&&T.pushShadow(W))}),M!==$&&M.traverseVisible(function(W){W.isLight&&W.layers.test(B.layers)&&(T.pushLight(W),W.castShadow&&T.pushShadow(W))}),T.setupLights(),F!==null&&F.updateLights(T.state.lightsArray),oe=this.localClippingEnabled,ae=Oe.init(this.clippingPlanes,oe),ae===!0&&Oe.setGlobalState(this.clippingPlanes,B),F!==null&&Ve.render(T.state.shadowsArray,$,B);let H=new Set;return M.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;let ve=W.material;if(ve)if(Array.isArray(ve))for(let Ae=0;Ae<ve.length;Ae++){let ye=ve[Ae];nh(ye,$,B,W),H.add(ye)}else nh(ve,$,B,W),H.add(ve)}),T=y.pop(),F!==null&&F.renderEnd(),H},this.compileAsync=function(M,B,$=null){let H=this.compile(M,B,$);return new Promise(W=>{function ve(){if(H.forEach(function(Ae){let Ce=X.get(Ae).currentProgram;(Ce===void 0||Ce.isReady())&&H.delete(Ae)}),H.size===0){W(M);return}setTimeout(ve,10)}at.get("KHR_parallel_shader_compile")!==null?ve():setTimeout(ve,10)})};let kc=null;function _g(M){kc&&kc(M)}function ih(){cs.stop()}function sh(){cs.start()}let cs=new Um;cs.setAnimationLoop(_g),typeof self<"u"&&cs.setContext(self),this.setAnimationLoop=function(M){kc=M,Ie.setAnimationLoop(M),M===null?cs.stop():cs.start()},Ie.addEventListener("sessionstart",ih),Ie.addEventListener("sessionend",sh),this.render=function(M,B){if(B!==void 0&&B.isCamera!==!0){We("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;F!==null&&F.renderStart(M,B);let $=Ie.enabled===!0&&Ie.isPresenting===!0,H=S!==null&&(Z===null||$)&&S.begin(E,Z);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),Ie.enabled===!0&&Ie.isPresenting===!0&&(S===null||S.isCompositing()===!1)&&(Ie.cameraAutoUpdate===!0&&Ie.updateCamera(B),B=Ie.getCamera()),M.isScene===!0&&M.onBeforeRender(E,M,B,Z),T=he.get(M,y.length),T.init(B),T.state.textureUnits=Y.getTextureUnits(),y.push(T),le.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),ne.setFromProjectionMatrix(le,Xn,B.reversedDepth),oe=this.localClippingEnabled,ae=Oe.init(this.clippingPlanes,oe),w=ge.get(M,C.length),w.init(),C.push(w),Ie.enabled===!0&&Ie.isPresenting===!0){let Ae=E.xr.getDepthSensingMesh();Ae!==null&&zc(Ae,B,-1/0,E.sortObjects)}zc(M,B,0,E.sortObjects),w.finish(),F!==null&&F.updateLights(T.state.lightsArray),E.sortObjects===!0&&w.sort(_e,Xe),$e=Ie.enabled===!1||Ie.isPresenting===!1||Ie.hasDepthSensing()===!1,$e&&Ze.addToRenderList(w,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ae===!0&&Oe.beginShadows();let W=T.state.shadowsArray;if(Ve.render(W,M,B),ae===!0&&Oe.endShadows(),(H&&S.hasRenderPass())===!1){let Ae=w.opaque,ye=w.transmissive;if(T.setupLights(),B.isArrayCamera){let Ce=B.cameras;if(ye.length>0)for(let Le=0,Qe=Ce.length;Le<Qe;Le++){let ot=Ce[Le];ah(Ae,ye,M,ot)}$e&&Ze.render(M);for(let Le=0,Qe=Ce.length;Le<Qe;Le++){let ot=Ce[Le];rh(w,M,ot,ot.viewport)}}else ye.length>0&&ah(Ae,ye,M,B),$e&&Ze.render(M),rh(w,M,B)}Z!==null&&V===0&&(Y.updateMultisampleRenderTarget(Z),Y.updateRenderTargetMipmap(Z)),H&&S.end(E),M.isScene===!0&&M.onAfterRender(E,M,B),Se.resetDefaultState(),q=-1,J=null,y.pop(),y.length>0?(T=y[y.length-1],Y.setTextureUnits(T.state.textureUnits),ae===!0&&Oe.setGlobalState(E.clippingPlanes,T.state.camera)):T=null,C.pop(),C.length>0?w=C[C.length-1]:w=null,F!==null&&F.renderEnd()};function zc(M,B,$,H){if(M.visible===!1)return;if(M.layers.test(B.layers)){if(M.isGroup)$=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(B);else if(M.isLightProbeGrid)T.pushLightProbeGrid(M);else if(M.isLight)T.pushLight(M),M.castShadow&&T.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||M.intersectsFrustum(ne)){H&&Ge.setFromMatrixPosition(M.matrixWorld).applyMatrix4(le);let Ae=ee.update(M),ye=M.material;ye.visible&&w.push(M,Ae,ye,$,Ge.z,null,B)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||M.intersectsFrustum(ne))){let Ae=ee.update(M),ye=M.material;if(H&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Ge.copy(M.boundingSphere.center)):(Ae.boundingSphere===null&&Ae.computeBoundingSphere(),Ge.copy(Ae.boundingSphere.center)),Ge.applyMatrix4(M.matrixWorld).applyMatrix4(le)),Array.isArray(ye)){let Ce=Ae.groups;for(let Le=0,Qe=Ce.length;Le<Qe;Le++){let ot=Ce[Le],Re=ye[ot.materialIndex];Re&&Re.visible&&w.push(M,Ae,Re,$,Ge.z,ot,B)}}else ye.visible&&w.push(M,Ae,ye,$,Ge.z,null,B)}}let ve=M.children;for(let Ae=0,ye=ve.length;Ae<ye;Ae++)zc(ve[Ae],B,$,H)}function rh(M,B,$,H){let{opaque:W,transmissive:ve,transparent:Ae}=M;T.setupLightsView($),ae===!0&&Oe.setGlobalState(E.clippingPlanes,$),H&&v.viewport(ie.copy(H)),W.length>0&&ro(W,B,$),ve.length>0&&ro(ve,B,$),Ae.length>0&&ro(Ae,B,$),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function ah(M,B,$,H){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[H.id]===void 0){let Re=at.has("EXT_color_buffer_half_float")||at.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[H.id]=new en(1,1,{generateMipmaps:!0,type:Re?Qn:_n,minFilter:Zn,samples:Math.max(4,R.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:nt.workingColorSpace})}let ve=T.state.transmissionRenderTarget[H.id],Ae=H.viewport||ie;ve.setSize(Ae.z*E.transmissionResolutionScale,Ae.w*E.transmissionResolutionScale);let ye=E.getRenderTarget(),Ce=E.getActiveCubeFace(),Le=E.getActiveMipmapLevel();E.setRenderTarget(ve),E.getClearColor(ht),rt=E.getClearAlpha(),rt<1&&E.setClearColor(16777215,.5),E.clear(),$e&&Ze.render($);let Qe=E.toneMapping;E.toneMapping=jn;let ot=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),T.setupLightsView(H),ae===!0&&Oe.setGlobalState(E.clippingPlanes,H),ro(M,$,H),Y.updateMultisampleRenderTarget(ve),Y.updateRenderTargetMipmap(ve),at.has("WEBGL_multisampled_render_to_texture")===!1){let Re=!1;for(let gt=0,kt=B.length;gt<kt;gt++){let Pt=B[gt],{object:Tt,geometry:Kt,material:Te,group:an}=Pt;if(Te.side===nn&&Tt.layers.test(H.layers)){let dt=Te.side;Te.side=dn,Te.needsUpdate=!0,oh(Tt,$,H,Kt,Te,an),Te.side=dt,Te.needsUpdate=!0,Re=!0}}Re===!0&&(Y.updateMultisampleRenderTarget(ve),Y.updateRenderTargetMipmap(ve))}E.setRenderTarget(ye,Ce,Le),E.setClearColor(ht,rt),ot!==void 0&&(H.viewport=ot),E.toneMapping=Qe}function ro(M,B,$){let H=B.isScene===!0?B.overrideMaterial:null;for(let W=0,ve=M.length;W<ve;W++){let Ae=M[W],{object:ye,geometry:Ce,group:Le}=Ae,Qe=Ae.material;Qe.allowOverride===!0&&H!==null&&(Qe=H),ye.layers.test($.layers)&&oh(ye,B,$,Ce,Qe,Le)}}function oh(M,B,$,H,W,ve){F!==null&&W.isNodeMaterial&&F.setObject(M,W),M.onBeforeRender(E,B,$,H,W,ve),M.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),W.onBeforeRender(E,B,$,H,M,ve),W.transparent===!0&&W.side===nn&&W.forceSinglePass===!1?(W.side=dn,W.needsUpdate=!0,E.renderBufferDirect($,B,H,W,M,ve),W.side=di,W.needsUpdate=!0,E.renderBufferDirect($,B,H,W,M,ve),W.side=nn):E.renderBufferDirect($,B,H,W,M,ve),M.onAfterRender(E,B,$,H,W,ve)}function ao(M,B,$){B.isScene!==!0&&(B=ke);let H=X.get(M),W=T.state.lights,ve=T.state.shadowsArray,Ae=W.state.version,ye=fe.getParameters(M,W.state,ve,B,$,T.state.lightProbeGridArray),Ce=fe.getProgramCacheKey(ye),Le=H.programs;H.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?B.environment:null,H.fog=B.fog;let Qe=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;H.envMap=ce.get(M.envMap||H.environment,Qe),H.envMapRotation=H.environment!==null&&M.envMap===null?B.environmentRotation:M.envMapRotation,Le===void 0&&(M.addEventListener("dispose",ei),Le=new Map,H.programs=Le);let ot=Le.get(Ce);if(ot!==void 0){if(H.currentProgram===ot&&H.lightsStateVersion===Ae)return ch(M,ye),ot}else ye.uniforms=fe.getUniforms(M),F!==null&&M.isNodeMaterial&&F.build(M,$,ye),M.onBeforeCompile(ye,E),ot=fe.acquireProgram(ye,Ce),Le.set(Ce,ot),H.uniforms=ye.uniforms;let Re=H.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Re.clippingPlanes=Oe.uniform),ch(M,ye),H.needsLights=Sg(M),H.lightsStateVersion=Ae,H.needsLights&&(Re.ambientLightColor.value=W.state.ambient,Re.lightProbe.value=W.state.probe,Re.sunLights.value=W.state.sun,Re.sunLightShadows.value=W.state.sunShadow,Re.directionalLights.value=W.state.directional,Re.directionalLightShadows.value=W.state.directionalShadow,Re.spotLights.value=W.state.spot,Re.spotLightShadows.value=W.state.spotShadow,Re.rectAreaLights.value=W.state.rectArea,Re.ltc_1.value=W.state.rectAreaLTC1,Re.ltc_2.value=W.state.rectAreaLTC2,Re.pointLights.value=W.state.point,Re.pointLightShadows.value=W.state.pointShadow,Re.hemisphereLights.value=W.state.hemi,Re.sunShadowMatrix.value=W.state.sunShadowMatrix,Re.sunShadowCascade.value=W.state.sunShadowCascade,Re.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Re.spotLightMatrix.value=W.state.spotLightMatrix,Re.spotLightMap.value=W.state.spotLightMap,Re.pointShadowMatrix.value=W.state.pointShadowMatrix),H.lightProbeGrid=T.state.lightProbeGridArray.length>0,H.currentProgram=ot,H.uniformsList=null,ot}function lh(M){if(M.uniformsList===null){let B=M.currentProgram.getUniforms();M.uniformsList=Nr.seqWithValue(B.seq,M.uniforms)}return M.uniformsList}function ch(M,B){let $=X.get(M);$.outputColorSpace=B.outputColorSpace,$.batching=B.batching,$.batchingColor=B.batchingColor,$.instancing=B.instancing,$.instancingColor=B.instancingColor,$.instancingMorph=B.instancingMorph,$.skinning=B.skinning,$.morphTargets=B.morphTargets,$.morphNormals=B.morphNormals,$.morphColors=B.morphColors,$.morphTargetsCount=B.morphTargetsCount,$.numClippingPlanes=B.numClippingPlanes,$.numIntersection=B.numClipIntersection,$.vertexAlphas=B.vertexAlphas,$.vertexTangents=B.vertexTangents,$.toneMapping=B.toneMapping}function yg(M,B){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;_.setFromMatrixPosition(B.matrixWorld);for(let $=0,H=M.length;$<H;$++){let W=M[$];if(W.texture!==null&&W.boundingBox.containsPoint(_))return W}return null}function vg(M,B,$,H,W){B.isScene!==!0&&(B=ke),Y.resetTextureUnits();let ve=B.fog,Ae=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?B.environment:null,ye=Z===null?E.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:nt.workingColorSpace,Ce=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,Le=ce.get(H.envMap||Ae,Ce),Qe=H.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,ot=!!$.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Re=!!$.morphAttributes.position,gt=!!$.morphAttributes.normal,kt=!!$.morphAttributes.color,Pt=jn;H.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(Pt=E.toneMapping);let Tt=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,Kt=Tt!==void 0?Tt.length:0,Te=X.get(H),an=T.state.lights;if(ae===!0&&(oe===!0||M!==J)){let Rt=M===J&&H.id===q;Oe.setState(H,M,Rt)}let dt=!1;H.version===Te.__version?(Te.needsLights&&Te.lightsStateVersion!==an.state.version||Te.outputColorSpace!==ye||W.isBatchedMesh&&Te.batching===!1||!W.isBatchedMesh&&Te.batching===!0||W.isBatchedMesh&&Te.batchingColor===!0&&W._colorsTexture===null||W.isBatchedMesh&&Te.batchingColor===!1&&W._colorsTexture!==null||W.isInstancedMesh&&Te.instancing===!1||!W.isInstancedMesh&&Te.instancing===!0||W.isSkinnedMesh&&Te.skinning===!1||!W.isSkinnedMesh&&Te.skinning===!0||W.isInstancedMesh&&Te.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Te.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Te.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Te.instancingMorph===!1&&W.morphTexture!==null||Te.envMap!==Le||H.fog===!0&&Te.fog!==ve||Te.numClippingPlanes!==void 0&&(Te.numClippingPlanes!==Oe.numPlanes||Te.numIntersection!==Oe.numIntersection)||Te.vertexAlphas!==Qe||Te.vertexTangents!==ot||Te.morphTargets!==Re||Te.morphNormals!==gt||Te.morphColors!==kt||Te.toneMapping!==Pt||Te.morphTargetsCount!==Kt||!!Te.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(dt=!0):(dt=!0,Te.__version=H.version);let Cn=Te.currentProgram;dt===!0&&(Cn=ao(H,B,W),F&&H.isNodeMaterial&&F.onUpdateProgram(H,Cn,Te));let ti=!1,Oi=!1,zs=!1,Mt=Cn.getUniforms(),Dt=Te.uniforms;if(v.useProgram(Cn.program)&&(ti=!0,Oi=!0,zs=!0),H.id!==q&&(q=H.id,Oi=!0),Te.needsLights){let Rt=yg(T.state.lightProbeGridArray,W);Te.lightProbeGrid!==Rt&&(Te.lightProbeGrid=Rt,Oi=!0)}if(ti||J!==M){v.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),Mt.setValue(O,"projectionMatrix",M.projectionMatrix),Mt.setValue(O,"viewMatrix",M.matrixWorldInverse);let ki=Mt.map.cameraPosition;ki!==void 0&&ki.setValue(O,de.setFromMatrixPosition(M.matrixWorld)),R.logarithmicDepthBuffer&&Mt.setValue(O,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&Mt.setValue(O,"isOrthographic",M.isOrthographicCamera===!0),J!==M&&(J=M,Oi=!0,zs=!0)}if(Te.needsLights&&(an.state.sunShadowMap.length>0&&Mt.setValue(O,"sunShadowMap",an.state.sunShadowMap,Y),an.state.directionalShadowMap.length>0&&Mt.setValue(O,"directionalShadowMap",an.state.directionalShadowMap,Y),an.state.spotShadowMap.length>0&&Mt.setValue(O,"spotShadowMap",an.state.spotShadowMap,Y),an.state.pointShadowMap.length>0&&Mt.setValue(O,"pointShadowMap",an.state.pointShadowMap,Y)),W.isSkinnedMesh){Mt.setOptional(O,W,"bindMatrix"),Mt.setOptional(O,W,"bindMatrixInverse");let Rt=W.skeleton;Rt&&(Rt.boneTexture===null&&Rt.computeBoneTexture(),Mt.setValue(O,"boneTexture",Rt.boneTexture,Y))}W.isBatchedMesh&&(Mt.setOptional(O,W,"batchingTexture"),Mt.setValue(O,"batchingTexture",W._matricesTexture,Y),Mt.setOptional(O,W,"batchingIdTexture"),Mt.setValue(O,"batchingIdTexture",W._indirectTexture,Y),Mt.setOptional(O,W,"batchingColorTexture"),W._colorsTexture!==null&&Mt.setValue(O,"batchingColorTexture",W._colorsTexture,Y));let Bi=$.morphAttributes;if((Bi.position!==void 0||Bi.normal!==void 0||Bi.color!==void 0)&&k.update(W,$,Cn),(Oi||Te.receiveShadow!==W.receiveShadow)&&(Te.receiveShadow=W.receiveShadow,Mt.setValue(O,"receiveShadow",W.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&B.environment!==null&&(Dt.envMapIntensity.value=B.environmentIntensity),Dt.dfgLUT!==void 0&&(Dt.dfgLUT.value=Kb()),Oi){if(Mt.setValue(O,"toneMappingExposure",E.toneMappingExposure),Te.needsLights&&bg(Dt,zs),ve&&H.fog===!0&&Fe.refreshFogUniforms(Dt,ve),Fe.refreshMaterialUniforms(Dt,H,te,j,T.state.transmissionRenderTarget[M.id]),Te.needsLights&&Te.lightProbeGrid){let Rt=Te.lightProbeGrid;Dt.probesSH.value=Rt.texture,Dt.probesMin.value.copy(Rt.boundingBox.min),Dt.probesMax.value.copy(Rt.boundingBox.max),Dt.probesResolution.value.copy(Rt.resolution)}Nr.upload(O,lh(Te),Dt,Y)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Nr.upload(O,lh(Te),Dt,Y),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&Mt.setValue(O,"center",W.center),Mt.setValue(O,"modelViewMatrix",W.modelViewMatrix),Mt.setValue(O,"normalMatrix",W.normalMatrix),Mt.setValue(O,"modelMatrix",W.matrixWorld),H.uniformsGroups!==void 0){let Rt=H.uniformsGroups;for(let ki=0,Gs=Rt.length;ki<Gs;ki++){let dh=Rt[ki];se.update(dh,Cn),se.bind(dh,Cn)}}return Cn}function bg(M,B){M.ambientLightColor.needsUpdate=B,M.lightProbe.needsUpdate=B,M.sunLights.needsUpdate=B,M.sunLightShadows.needsUpdate=B,M.directionalLights.needsUpdate=B,M.directionalLightShadows.needsUpdate=B,M.pointLights.needsUpdate=B,M.pointLightShadows.needsUpdate=B,M.spotLights.needsUpdate=B,M.spotLightShadows.needsUpdate=B,M.rectAreaLights.needsUpdate=B,M.hemisphereLights.needsUpdate=B}function Sg(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return Z},this.setRenderTargetTextures=function(M,B,$){let H=X.get(M);H.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),X.get(M.texture).__webglTexture=B,X.get(M.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:$,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,B){let $=X.get(M);$.__webglFramebuffer=B,$.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(M,B=0,$=0){Z=M,z=B,V=$;let H=null,W=!1,ve=!1;if(M){let ye=X.get(M);if(ye.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(O.FRAMEBUFFER,ye.__webglFramebuffer),ie.copy(M.viewport),Ue.copy(M.scissor),Ee=M.scissorTest,v.viewport(ie),v.scissor(Ue),v.setScissorTest(Ee),q=-1;return}else if(ye.__webglFramebuffer===void 0)Y.setupRenderTarget(M);else if(ye.__hasExternalTextures)Y.rebindTextures(M,X.get(M.texture).__webglTexture,X.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let Qe=M.depthTexture;if(ye.__boundDepthTexture!==Qe){if(Qe!==null&&X.has(Qe)&&(M.width!==Qe.image.width||M.height!==Qe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Y.setupDepthRenderbuffer(M)}}let Ce=M.texture;(Ce.isData3DTexture||Ce.isDataArrayTexture||Ce.isCompressedArrayTexture)&&(ve=!0);let Le=X.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Le[B])?H=Le[B][$]:H=Le[B],W=!0):M.samples>0&&Y.useMultisampledRTT(M)===!1?H=X.get(M).__webglMultisampledFramebuffer:Array.isArray(Le)?H=Le[$]:H=Le,ie.copy(M.viewport),Ue.copy(M.scissor),Ee=M.scissorTest}else ie.copy(Me).multiplyScalar(te).floor(),Ue.copy(qe).multiplyScalar(te).floor(),Ee=yt;if($!==0&&(H=N),v.bindFramebuffer(O.FRAMEBUFFER,H)&&v.drawBuffers(M,H),v.viewport(ie),v.scissor(Ue),v.setScissorTest(Ee),W){let ye=X.get(M.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+B,ye.__webglTexture,$)}else if(ve){let ye=B;for(let Ce=0;Ce<M.textures.length;Ce++){let Le=X.get(M.textures[Ce]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+Ce,Le.__webglTexture,$,ye)}}else if(M!==null&&$!==0){let ye=X.get(M.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,ye.__webglTexture,$)}q=-1};function uh(M){let B=X.get(M);return(B.__readFormat!==M.format||B.__readType!==M.type)&&(B.__readFormat=M.format,B.__readType=M.type,B.__formatReadable=R.textureFormatReadable(M.format),B.__typeReadable=R.textureTypeReadable(M.type)),B}this.readRenderTargetPixels=function(M,B,$,H,W,ve,Ae,ye=0){if(!(M&&M.isWebGLRenderTarget)){We("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=X.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Ae!==void 0&&(Ce=Ce[Ae]),Ce){v.bindFramebuffer(O.FRAMEBUFFER,Ce);try{let Le=M.textures[ye],Qe=Le.format,ot=Le.type;M.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+ye);let Re=uh(Le);if(Re.__formatReadable===!1){We("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Re.__typeReadable===!1){We("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=M.width-H&&$>=0&&$<=M.height-W&&O.readPixels(B,$,H,W,me.convert(Qe),me.convert(ot),ve)}finally{let Le=Z!==null?X.get(Z).__webglFramebuffer:null;v.bindFramebuffer(O.FRAMEBUFFER,Le)}}},this.readRenderTargetPixelsAsync=async function(M,B,$,H,W,ve,Ae,ye=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ce=X.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Ae!==void 0&&(Ce=Ce[Ae]),Ce)if(B>=0&&B<=M.width-H&&$>=0&&$<=M.height-W){v.bindFramebuffer(O.FRAMEBUFFER,Ce);let Le=M.textures[ye],Qe=Le.format,ot=Le.type;M.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+ye);let Re=uh(Le);if(Re.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Re.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let gt=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,gt),O.bufferData(O.PIXEL_PACK_BUFFER,ve.byteLength,O.STREAM_READ),O.readPixels(B,$,H,W,me.convert(Qe),me.convert(ot),0),O.bindBuffer(O.PIXEL_PACK_BUFFER,null);let kt=Z!==null?X.get(Z).__webglFramebuffer:null;v.bindFramebuffer(O.FRAMEBUFFER,kt);let Pt=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await sm(O,Pt,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,gt),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,ve),O.bindBuffer(O.PIXEL_PACK_BUFFER,null),O.deleteBuffer(gt),O.deleteSync(Pt),ve}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,B=null,$=0){let H=Math.pow(2,-$),W=Math.floor(M.image.width*H),ve=Math.floor(M.image.height*H),Ae=B!==null?B.x:0,ye=B!==null?B.y:0;Y.setTexture2D(M,0),O.copyTexSubImage2D(O.TEXTURE_2D,$,0,0,Ae,ye,W,ve),v.unbindTexture()},this.copyTextureToTexture=function(M,B,$=null,H=null,W=0,ve=0){let Ae,ye,Ce,Le,Qe,ot,Re,gt,kt,Pt=M.isCompressedTexture?M.mipmaps[ve]:M.image;if($!==null)Ae=$.max.x-$.min.x,ye=$.max.y-$.min.y,Ce=$.isBox3?$.max.z-$.min.z:1,Le=$.min.x,Qe=$.min.y,ot=$.isBox3?$.min.z:0;else{let Dt=Math.pow(2,-W);Ae=Math.floor(Pt.width*Dt),ye=Math.floor(Pt.height*Dt),M.isDataArrayTexture?Ce=Pt.depth:M.isData3DTexture?Ce=Math.floor(Pt.depth*Dt):Ce=1,Le=0,Qe=0,ot=0}H!==null?(Re=H.x,gt=H.y,kt=H.z):(Re=0,gt=0,kt=0);let Tt=me.convert(B.format),Kt=me.convert(B.type),Te;B.isData3DTexture?(Y.setTexture3D(B,0),Te=O.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(Y.setTexture2DArray(B,0),Te=O.TEXTURE_2D_ARRAY):(Y.setTexture2D(B,0),Te=O.TEXTURE_2D),v.activeTexture(O.TEXTURE0),v.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,B.flipY),v.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),v.pixelStorei(O.UNPACK_ALIGNMENT,B.unpackAlignment);let an=v.getParameter(O.UNPACK_ROW_LENGTH),dt=v.getParameter(O.UNPACK_IMAGE_HEIGHT),Cn=v.getParameter(O.UNPACK_SKIP_PIXELS),ti=v.getParameter(O.UNPACK_SKIP_ROWS),Oi=v.getParameter(O.UNPACK_SKIP_IMAGES);v.pixelStorei(O.UNPACK_ROW_LENGTH,Pt.width),v.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Pt.height),v.pixelStorei(O.UNPACK_SKIP_PIXELS,Le),v.pixelStorei(O.UNPACK_SKIP_ROWS,Qe),v.pixelStorei(O.UNPACK_SKIP_IMAGES,ot);let zs=M.isDataArrayTexture||M.isData3DTexture,Mt=B.isDataArrayTexture||B.isData3DTexture;if(M.isDepthTexture){let Dt=X.get(M),Bi=X.get(B),Rt=X.get(Dt.__renderTarget),ki=X.get(Bi.__renderTarget);v.bindFramebuffer(O.READ_FRAMEBUFFER,Rt.__webglFramebuffer),v.bindFramebuffer(O.DRAW_FRAMEBUFFER,ki.__webglFramebuffer);for(let Gs=0;Gs<Ce;Gs++)zs&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,X.get(M).__webglTexture,W,ot+Gs),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,X.get(B).__webglTexture,ve,kt+Gs)),O.blitFramebuffer(Le,Qe,Ae,ye,Re,gt,Ae,ye,O.DEPTH_BUFFER_BIT,O.NEAREST);v.bindFramebuffer(O.READ_FRAMEBUFFER,null),v.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(W!==0||M.isRenderTargetTexture||X.has(M)){let Dt=X.get(M),Bi=X.get(B);v.bindFramebuffer(O.READ_FRAMEBUFFER,I),v.bindFramebuffer(O.DRAW_FRAMEBUFFER,U);for(let Rt=0;Rt<Ce;Rt++)zs?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Dt.__webglTexture,W,ot+Rt):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Dt.__webglTexture,W),Mt?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Bi.__webglTexture,ve,kt+Rt):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Bi.__webglTexture,ve),W!==0?O.blitFramebuffer(Le,Qe,Ae,ye,Re,gt,Ae,ye,O.COLOR_BUFFER_BIT,O.NEAREST):Mt?O.copyTexSubImage3D(Te,ve,Re,gt,kt+Rt,Le,Qe,Ae,ye):O.copyTexSubImage2D(Te,ve,Re,gt,Le,Qe,Ae,ye);v.bindFramebuffer(O.READ_FRAMEBUFFER,null),v.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else Mt?M.isDataTexture||M.isData3DTexture?O.texSubImage3D(Te,ve,Re,gt,kt,Ae,ye,Ce,Tt,Kt,Pt.data):B.isCompressedArrayTexture?O.compressedTexSubImage3D(Te,ve,Re,gt,kt,Ae,ye,Ce,Tt,Pt.data):O.texSubImage3D(Te,ve,Re,gt,kt,Ae,ye,Ce,Tt,Kt,Pt):M.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,ve,Re,gt,Ae,ye,Tt,Kt,Pt.data):M.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,ve,Re,gt,Pt.width,Pt.height,Tt,Pt.data):O.texSubImage2D(O.TEXTURE_2D,ve,Re,gt,Ae,ye,Tt,Kt,Pt);v.pixelStorei(O.UNPACK_ROW_LENGTH,an),v.pixelStorei(O.UNPACK_IMAGE_HEIGHT,dt),v.pixelStorei(O.UNPACK_SKIP_PIXELS,Cn),v.pixelStorei(O.UNPACK_SKIP_ROWS,ti),v.pixelStorei(O.UNPACK_SKIP_IMAGES,Oi),ve===0&&B.generateMipmaps&&O.generateMipmap(Te),v.unbindTexture()},this.initRenderTarget=function(M){X.get(M).__webglFramebuffer===void 0&&Y.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?Y.setTextureCube(M,0):M.isData3DTexture?Y.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?Y.setTexture2DArray(M,0):Y.setTexture2D(M,0),v.unbindTexture()},this.resetState=function(){z=0,V=0,Z=null,v.reset(),Se.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Xn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=nt._getDrawingBufferColorSpace(e),t.unpackColorSpace=nt._getUnpackColorSpace()}};var Vm={type:"change"},mf={type:"start"},Wm={type:"end"},Mc=new ai,Hm=new ln,jb=Math.cos(70*as.DEG2RAD),Wt=new L,yn=2*Math.PI,St={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},pf=1e-6,wc=class extends Ga{constructor(e,t=null){super(e,t),this.state=St.NONE,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:xn.ROTATE,MIDDLE:xn.DOLLY,RIGHT:xn.PAN},this.touches={ONE:ns.ROTATE,TWO:ns.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new Qt,this._lastTargetPosition=new L,this._quat=new Qt().setFromUnitVectors(e.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ts,this._sphericalDelta=new ts,this._scale=1,this._panOffset=new L,this._rotateStart=new re,this._rotateEnd=new re,this._rotateDelta=new re,this._panStart=new re,this._panEnd=new re,this._panDelta=new re,this._dollyStart=new re,this._dollyEnd=new re,this._dollyDelta=new re,this._dollyDirection=new L,this._mouse=new re,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Jb.bind(this),this._onPointerDown=Zb.bind(this),this._onPointerUp=Qb.bind(this),this._onContextMenu=aS.bind(this),this._onMouseWheel=nS.bind(this),this._onKeyDown=iS.bind(this),this._onTouchStart=sS.bind(this),this._onTouchMove=rS.bind(this),this._onMouseDown=eS.bind(this),this._onMouseMove=tS.bind(this),this._interceptControlDown=oS.bind(this),this._interceptControlUp=lS.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=St.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let e=this.domElement.getRootNode();e.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),e.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Vm),this.update(),this.state=St.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;Wt.copy(t).sub(this.target),Wt.applyQuaternion(this._quat),this._spherical.setFromVector3(Wt),this.autoRotate&&this.state===St.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=yn:n>Math.PI&&(n-=yn),s<-Math.PI?s+=yn:s>Math.PI&&(s-=yn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Wt.setFromSpherical(this._spherical),Wt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Wt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=Wt.length();a=this._clampDistance(o*this._scale);let c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let o=new L(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let l=new L(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=Wt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Mc.origin.copy(this.object.position),Mc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Mc.direction))<jb?this.object.lookAt(this.target):(Hm.setFromNormalAndCoplanarPoint(this.object.up,this.target),Mc.intersectPlane(Hm,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>pf||8*(1-this._lastQuaternion.dot(this.object.quaternion))>pf||this._lastTargetPosition.distanceToSquared(this.target)>pf?(this.dispatchEvent(Vm),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?yn/60*this.autoRotateSpeed*e:yn/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Wt.setFromMatrixColumn(t,0),Wt.multiplyScalar(-e),this._panOffset.add(Wt)}_panUp(e,t){this.screenSpacePanning===!0?Wt.setFromMatrixColumn(t,1):(Wt.setFromMatrixColumn(t,0),Wt.crossVectors(this.object.up,Wt)),Wt.multiplyScalar(e),this._panOffset.add(Wt)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Wt.copy(s).sub(this.target);let r=Wt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(yn*this._rotateDelta.x/t.clientHeight),this._rotateUp(yn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(yn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-yn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(yn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-yn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(yn*this._rotateDelta.x/t.clientHeight),this._rotateUp(yn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new re,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function Zb(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Jb(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Qb(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Wm),this.state=St.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function eS(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case xn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=St.DOLLY;break;case xn.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=St.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=St.ROTATE}break;case xn.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=St.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=St.PAN}break;default:this.state=St.NONE}this.state!==St.NONE&&this.dispatchEvent(mf)}function tS(i){switch(this.state){case St.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case St.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case St.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function nS(i){this.enabled===!1||this.enableZoom===!1||this.state!==St.NONE||(i.preventDefault(),this.dispatchEvent(mf),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Wm))}function iS(i){this.enabled!==!1&&this._handleKeyDown(i)}function sS(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case ns.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=St.TOUCH_ROTATE;break;case ns.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=St.TOUCH_PAN;break;default:this.state=St.NONE}break;case 2:switch(this.touches.TWO){case ns.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=St.TOUCH_DOLLY_PAN;break;case ns.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=St.TOUCH_DOLLY_ROTATE;break;default:this.state=St.NONE}break;default:this.state=St.NONE}this.state!==St.NONE&&this.dispatchEvent(mf)}function rS(i){switch(this._trackPointer(i),this.state){case St.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case St.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case St.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case St.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=St.NONE}}function aS(i){this.enabled!==!1&&i.preventDefault()}function oS(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function lS(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function qm(i,e=!1){let t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,c=new ft,l=0;for(let u=0;u<i.length;++u){let d=i[u],f=0;if(t!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let h in d.attributes){if(!n.has(h))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+h+'" attribute exists among all geometries, or in none of them.'),null;r[h]===void 0&&(r[h]=[]),r[h].push(d.attributes[h]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let h in d.morphAttributes){if(!s.has(h))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;a[h]===void 0&&(a[h]=[]),a[h].push(d.morphAttributes[h])}if(e){let h;if(t)h=d.index.count;else if(d.attributes.position!==void 0)h=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,h,u),l+=h}}if(t){let u=0,d=[];for(let f=0;f<i.length;++f){let h=i[f].index;for(let p=0;p<h.count;++p)d.push(h.getX(p)+u);u+=i[f].attributes.position.count}c.setIndex(d)}for(let u in r){let d=Xm(r[u]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,d)}for(let u in a){let d=a[u][0].length;if(d!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let f=0;f<d;++f){let h=[];for(let x=0;x<a[u].length;++x)h.push(a[u][x][f]);let p=Xm(h);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(p)}}}return c}function Xm(i){let e,t,n,s=-1,r=0;for(let l=0;l<i.length;++l){let u=i[l];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*t}let a=new e(r),o=new Gt(a,t,n),c=0;for(let l=0;l<i.length;++l){let u=i[l];if(u.isInterleavedBufferAttribute){let d=c/t;for(let f=0,h=u.count;f<h;f++)for(let p=0;p<t;p++){let x=u.getComponent(f,p);o.setComponent(f+d,p,x)}}else a.set(u.array,c);c+=u.count*t}return s!==void 0&&(o.gpuType=s),o}function $m(i,e=1e-4){e=Math.max(e,Number.EPSILON);let t={},n=i.getIndex(),s=i.getAttribute("position"),r=n?n.count:s.count,a=0,o=Object.keys(i.attributes),c={},l={},u=[],d=["getX","getY","getZ","getW"],f=["setX","setY","setZ","setW"];for(let b=0,A=o.length;b<A;b++){let _=o[b],w=i.attributes[_];c[_]=new w.constructor(new w.array.constructor(w.count*w.itemSize),w.itemSize,w.normalized);let T=i.morphAttributes[_];T&&(l[_]||(l[_]=[]),T.forEach((C,y)=>{let S=new C.array.constructor(C.count*C.itemSize);l[_][y]=new C.constructor(S,C.itemSize,C.normalized)}))}let h=e*.5,p=Math.log10(1/e),x=Math.pow(10,p),g=h*x;for(let b=0;b<r;b++){let A=n?n.getX(b):b,_="";for(let w=0,T=o.length;w<T;w++){let C=o[w],y=i.getAttribute(C),S=y.itemSize;for(let E=0;E<S;E++)_+=`${Math.trunc(y[d[E]](A)*x+g)},`}if(_ in t)u.push(t[_]);else{for(let w=0,T=o.length;w<T;w++){let C=o[w],y=i.getAttribute(C),S=i.morphAttributes[C],E=y.itemSize,D=c[C],F=l[C];for(let N=0;N<E;N++){let I=d[N],U=f[N];if(D[U](a,y[I](A)),S)for(let z=0,V=S.length;z<V;z++)F[z][U](a,S[z][I](A))}}t[_]=a,u.push(a),a++}}let m=i.clone();for(let b in i.attributes){let A=c[b];if(m.setAttribute(b,new A.constructor(A.array.slice(0,a*A.itemSize),A.itemSize,A.normalized)),b in l)for(let _=0;_<l[b].length;_++){let w=l[b][_];m.morphAttributes[b][_]=new w.constructor(w.array.slice(0,a*w.itemSize),w.itemSize,w.normalized)}}return m.setIndex(u),m}function gf(i,e){if(e===Hd)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Ir||e===ja){let t=i.getIndex();if(t===null){let r=[],a=i.getAttribute("position");if(a!==void 0){for(let o=0;o<a.count;o++)r.push(o);i.setIndex(r),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,s=[];if(e===Ir)for(let r=1;r<=n;r++)s.push(t.getX(0)),s.push(t.getX(r)),s.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(s.push(t.getX(r)),s.push(t.getX(r+1)),s.push(t.getX(r+2))):(s.push(t.getX(r+2)),s.push(t.getX(r+1)),s.push(t.getX(r)));return s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),i.setIndex(s),i.clearGroups(),i}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}function Ym(i){let e=new Map,t=new Map,n=i.clone();return Km(i,n,function(s,r){e.set(r,s),t.set(s,r)}),n.traverse(function(s){if(!s.isSkinnedMesh)return;let r=s,a=e.get(s),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function Km(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)Km(i.children[n],e.children[n],t)}var no=class extends ui{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Mf(t)}),this.register(function(t){return new wf(t)}),this.register(function(t){return new Df(t)}),this.register(function(t){return new Nf(t)}),this.register(function(t){return new Uf(t)}),this.register(function(t){return new Af(t)}),this.register(function(t){return new Ef(t)}),this.register(function(t){return new Cf(t)}),this.register(function(t){return new Rf(t)}),this.register(function(t){return new Sf(t)}),this.register(function(t){return new Pf(t)}),this.register(function(t){return new Tf(t)}),this.register(function(t){return new Lf(t)}),this.register(function(t){return new If(t)}),this.register(function(t){return new vf(t)}),this.register(function(t){return new Tc(t,st.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new Tc(t,st.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new Ff(t)})}load(e,t,n,s){let r=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let l=Ui.extractUrlBase(e);a=Ui.resolveURL(l,this.path)}else a=Ui.extractUrlBase(e);this.manager.itemStart(e);let o=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new Mr(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,a,function(u){t(u),r.manager.itemEnd(e)},o)}catch(u){o(u)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r,a={},o={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===eg){try{a[st.KHR_BINARY_GLTF]=new Of(e)}catch(d){s&&s(d);return}r=JSON.parse(a[st.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new Wf(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let d=this.pluginCallbacks[u](l);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[d.name]=d,a[d.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){let d=r.extensionsUsed[u],f=r.extensionsRequired||[];switch(d){case st.KHR_MATERIALS_UNLIT:a[d]=new bf;break;case st.KHR_DRACO_MESH_COMPRESSION:a[d]=new Bf(r,this.dracoLoader);break;case st.KHR_TEXTURE_TRANSFORM:a[d]=new kf;break;case st.KHR_MESH_QUANTIZATION:a[d]=new zf;break;default:f.indexOf(d)>=0&&o[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,s)}parseAsync(e,t){let n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}};function cS(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}function Bt(i,e,t){let n=i.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}var st={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},vf=class{constructor(e){this.parser=e,this.name=st.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,s=t.cache.get(n);if(s)return s;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,u=new be(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],cn);let d=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new es(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Rs(u),l.distance=d;break;case"spot":l=new Ba(u),l.distance=d,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),mi(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}},bf=class{constructor(){this.name=st.KHR_MATERIALS_UNLIT}getMaterialType(){return tn}extendParams(e,t,n){let s=[];e.color=new be(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],cn),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,Ut))}return Promise.all(s)}},Sf=class{constructor(e){this.parser=e,this.name=st.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=Bt(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},Mf=class{constructor(e){this.parser=e,this.name=st.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Bt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Bt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(s.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let r=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new re(r,r)}return Promise.all(s)}},wf=class{constructor(e){this.parser=e,this.name=st.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Bt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Bt(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}},Tf=class{constructor(e){this.parser=e,this.name=st.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Bt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Bt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(s)}},Af=class{constructor(e){this.parser=e,this.name=st.KHR_MATERIALS_SHEEN}getMaterialType(e){return Bt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Bt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(t.sheenColor=new be(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let r=n.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],cn)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,Ut)),n.sheenRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(s)}},Ef=class{constructor(e){this.parser=e,this.name=st.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Bt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Bt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&s.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(s)}},Cf=class{constructor(e){this.parser=e,this.name=st.KHR_MATERIALS_VOLUME}getMaterialType(e){return Bt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Bt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let r=n.attenuationColor||[1,1,1];return t.attenuationColor=new be().setRGB(r[0],r[1],r[2],cn),Promise.all(s)}},Rf=class{constructor(e){this.parser=e,this.name=st.KHR_MATERIALS_IOR}getMaterialType(e){return Bt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Bt(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},Pf=class{constructor(e){this.parser=e,this.name=st.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Bt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Bt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));let r=n.specularColorFactor||[1,1,1];return t.specularColor=new be().setRGB(r[0],r[1],r[2],cn),n.specularColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,Ut)),Promise.all(s)}},If=class{constructor(e){this.parser=e,this.name=st.EXT_MATERIALS_BUMP}getMaterialType(e){return Bt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Bt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&s.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(s)}},Lf=class{constructor(e){this.parser=e,this.name=st.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Bt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Bt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&s.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(s)}},Df=class{constructor(e){this.parser=e,this.name=st.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}},Nf=class{constructor(e){this.parser=e,this.name=st.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}},Uf=class{constructor(e){this.parser=e,this.name=st.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}},Tc=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){let c=s.byteOffset||0,l=s.byteLength||0,u=s.count,d=s.byteStride,f=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(u,d,f,s.mode,s.filter).then(function(h){return h.buffer}):a.ready.then(function(){let h=new ArrayBuffer(u*d);return a.decodeGltfBuffer(new Uint8Array(h),u,d,f,s.mode,s.filter),h})})}else return null}},Ff=class{constructor(e){this.name=st.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=t.meshes[n.mesh];for(let l of s.primitives)if(l.mode!==Fn.TRIANGLES&&l.mode!==Fn.TRIANGLE_STRIP&&l.mode!==Fn.TRIANGLE_FAN&&l.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],c={};for(let l in a)o.push(this.parser.getDependency("accessor",a[l]).then(u=>(c[l]=u,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{let u=l.pop(),d=u.isGroup?u.children:[u],f=l[0].count,h=[];for(let p of d){let x=new Ye,g=new L,m=new Qt,b=new L(1,1,1),A=new Mn(p.geometry,p.material,f);for(let w=0;w<f;w++)c.TRANSLATION&&g.fromBufferAttribute(c.TRANSLATION,w),c.ROTATION&&m.fromBufferAttribute(c.ROTATION,w),c.SCALE&&b.fromBufferAttribute(c.SCALE,w),A.setMatrixAt(w,x.compose(g,m,b));let _=null;for(let w in c)if(w==="_COLOR_0"){let T=c[w];A.instanceColor=new Ei(T.array,T.itemSize,T.normalized)}else if(w!=="TRANSLATION"&&w!=="ROTATION"&&w!=="SCALE"){if(_===null){let C=A.geometry;_=new ft,_.name=C.name;for(let y in C.attributes)_.setAttribute(y,C.attributes[y]);for(let y in C.morphAttributes)_.morphAttributes[y]=C.morphAttributes[y];C.index!==null&&_.setIndex(C.index),_.morphTargetsRelative=C.morphTargetsRelative;for(let y of C.groups)_.addGroup(y.start,y.count,y.materialIndex);C.boundingBox!==null&&(_.boundingBox=C.boundingBox.clone()),C.boundingSphere!==null&&(_.boundingSphere=C.boundingSphere.clone()),_.drawRange.start=C.drawRange.start,_.drawRange.count=C.drawRange.count,_.userData=Object.assign({},C.userData),A.geometry=_}let T=c[w];_.setAttribute(w,new Ei(T.array,T.itemSize,T.normalized))}_t.prototype.copy.call(A,p),this.parser.assignFinalMaterial(A),h.push(A)}return u.isGroup?(u.clear(),u.add(...h),u):h[0]}))}},eg="glTF",to=12,jm={JSON:1313821514,BIN:5130562},Of=class{constructor(e){this.name=st.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,to),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==eg)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-to,r=new DataView(e,to),a=0;for(;a<s;){let o=r.getUint32(a,!0);a+=4;let c=r.getUint32(a,!0);if(a+=4,c===jm.JSON){let l=new Uint8Array(e,to+a,o);this.content=n.decode(l)}else if(c===jm.BIN){let l=to+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Bf=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=st.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(let u in a){let d=Vf[u]||u.toLowerCase();o[d]=a[u]}for(let u in e.attributes){let d=Vf[u]||u.toLowerCase();if(a[u]!==void 0){let f=n.accessors[e.attributes[u]],h=Fr[f.componentType];l[d]=h.name,c[d]=f.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(d,f){s.decodeDracoFile(u,function(h){for(let p in h.attributes){let x=h.attributes[p],g=c[p];g!==void 0&&(x.normalized=g)}d(h)},o,l,cn,f)})})}},kf=class{constructor(){this.name=st.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let n=Math.cos(e.rotation),s=Math.sin(e.rotation);e.matrix.set(e.repeat.x*n,e.repeat.y*s,e.offset.x,-e.repeat.x*s,e.repeat.y*n,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},zf=class{constructor(){this.name=st.KHR_MESH_QUANTIZATION}},Ac=class extends ci{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,u=s-t,d=(n-t)/u,f=d*d,h=f*d,p=e*l,x=p-l,g=-2*h+3*f,m=h-f,b=1-g,A=m-f+d;for(let _=0;_!==o;_++){let w=a[x+_+o],T=a[x+_+c]*u,C=a[p+_+o],y=a[p+_]*u;r[_]=b*w+A*T+g*C+m*y}return r}},uS=new Qt,Gf=class extends Ac{interpolate_(e,t,n,s){let r=super.interpolate_(e,t,n,s);return uS.fromArray(r).normalize().toArray(r),r}},Fn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Fr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Zm={9728:Ft,9729:Ot,9984:Rl,9985:Cr,9986:Ds,9987:Zn},Jm={33071:Dn,33648:ar,10497:ji},xf={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Vf={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},os={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},dS={CUBICSPLINE:void 0,LINEAR:Ss,STEP:bs},_f={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function fS(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new un({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:di})),i.DefaultMaterial}function Fs(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function mi(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function hS(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,u=e.length;l<u;l++){let d=e[l];if(d.POSITION!==void 0&&(n=!0),d.NORMAL!==void 0&&(s=!0),d.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);let a=[],o=[],c=[];for(let l=0,u=e.length;l<u;l++){let d=e[l];if(n){let f=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):i.attributes.position;a.push(f)}if(s){let f=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):i.attributes.normal;o.push(f)}if(r){let f=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):i.attributes.color;c.push(f)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){let u=l[0],d=l[1],f=l[2];return n&&(i.morphAttributes.position=u),s&&(i.morphAttributes.normal=d),r&&(i.morphAttributes.color=f),i.morphTargetsRelative=!0,i})}function pS(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function mS(i){let e,t=i.extensions&&i.extensions[st.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+yf(t.attributes):e=i.indices+":"+yf(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+yf(i.targets[n]);return e}function yf(i){let e="",t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function Hf(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function gS(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var xS=new Ye,Wf=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new cS,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let c=o.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&a<98?this.textureLoader=new Fa(this.options.manager):this.textureLoader=new ka(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Mr(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:n,userData:{}};return Fs(r,o,s),mi(o,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(let c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let a=t[s].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let s=n.clone(),r=(a,o)=>{let c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(let[l,u]of a.children.entries())r(u,o.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let s=e(t[n]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[st.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,a){n.load(Ui.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){let t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let a=xf[s.type],o=Fr[s.componentType],c=s.normalized===!0,l=new o(s.count*a);return Promise.resolve(new Gt(l,a,c))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){let o=a[0],c=xf[s.type],l=Fr[s.componentType],u=l.BYTES_PER_ELEMENT,d=u*c,f=s.byteOffset||0,h=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,p=s.normalized===!0,x,g;if(h&&h!==d){let m=Math.floor(f/h),b="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+m+":"+s.count,A=t.cache.get(b);A||(x=new l(o,m*h,s.count*h/u),A=new pr(x,h/u),t.cache.add(b,A)),g=new mr(A,c,f%h/u,p)}else o===null?x=new l(s.count*c):x=new l(o,f,s.count*c),g=new Gt(x,c,p);if(s.sparse!==void 0){let m=xf.SCALAR,b=Fr[s.sparse.indices.componentType],A=s.sparse.indices.byteOffset||0,_=s.sparse.values.byteOffset||0,w=new b(a[1],A,s.sparse.count*m),T=new l(a[2],_,s.sparse.count*c);o!==null&&(g=new Gt(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let C=0,y=w.length;C<y;C++){let S=w[C];if(g.setX(S,T[C*c]),c>=2&&g.setY(S,T[C*c+1]),c>=3&&g.setZ(S,T[C*c+2]),c>=4&&g.setW(S,T[C*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=p}return g})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r],o=this.textureLoader;if(a.uri){let c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){let s=this,r=this.json,a=r.textures[e],o=r.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=a.name||o.name||"",u.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(u.name=o.uri);let f=(r.samplers||{})[a.sampler]||{};return u.magFilter=Zm[f.magFilter]||Ot,u.minFilter=Zm[f.minFilter]||Zn,u.wrapS=Jm[f.wrapS]||ji,u.wrapT=Jm[f.wrapT]||ji,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Ft&&u.minFilter!==Ot,s.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());let a=s.images[e],o=self.URL||self.webkitURL,c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(d){l=!0;let f=new Blob([d],{type:a.mimeType});return c=o.createObjectURL(f),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let u=Promise.resolve(c).then(function(d){return new Promise(function(f,h){let p=f;t.isImageBitmapLoader===!0&&(p=function(x){let g=new $t(x);g.needsUpdate=!0,f(g)}),t.load(Ui.resolveURL(d,r.path),p,void 0,h)})}).then(function(d){return l===!0&&o.revokeObjectURL(c),mi(d,a),d.userData.mimeType=a.mimeType||gS(a.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),d});return this.sourceCache[e]=u,u}assignTexture(e,t,n,s){let r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[st.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[st.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let c=r.associations.get(a);a=r.extensions[st.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new Zi,pn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new Ci,pn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(s||r||a){let o="ClonedMaterial:"+n.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return un}loadMaterial(e){let t=this,n=this.json,s=this.extensions,r=n.materials[e],a,o={},c=r.extensions||{},l=[];if(c[st.KHR_MATERIALS_UNLIT]){let d=s[st.KHR_MATERIALS_UNLIT];a=d.getMaterialType(),l.push(d.extendParams(o,r,t))}else{let d=r.pbrMetallicRoughness||{};if(o.color=new be(1,1,1),o.opacity=1,Array.isArray(d.baseColorFactor)){let f=d.baseColorFactor;o.color.setRGB(f[0],f[1],f[2],cn),o.opacity=f[3]}d.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",d.baseColorTexture,Ut)),o.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,o.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",d.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",d.metallicRoughnessTexture))),a=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=nn);let u=r.alphaMode||_f.OPAQUE;if(u===_f.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===_f.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==tn&&(l.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new re(1,1),r.normalTexture.scale!==void 0)){let d=r.normalTexture.scale;o.normalScale.set(d,d)}if(r.occlusionTexture!==void 0&&a!==tn&&(l.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==tn){let d=r.emissiveFactor;o.emissive=new be().setRGB(d[0],d[1],d[2],cn)}return r.emissiveTexture!==void 0&&a!==tn&&l.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,Ut)),Promise.all(l).then(function(){let d=new a(o);return r.name&&(d.name=r.name),mi(d,r),t.associations.set(d,{materials:e}),r.extensions&&Fs(s,d,r),d})}createUniqueName(e){let t=At.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,s=this.primitiveCache;function r(o){return n[st.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return Qm(c,o,t)})}let a=[];for(let o=0,c=e.length;o<c;o++){let l=e[o],u=mS(l),d=s[u];if(d)a.push(d.promise);else{let f;l.extensions&&l.extensions[st.KHR_DRACO_MESH_COMPRESSION]?f=r(l):f=Qm(new ft,l,t),l.mode===Fn.TRIANGLE_STRIP?f=f.then(h=>gf(h,ja)):l.mode===Fn.TRIANGLE_FAN&&(f=f.then(h=>gf(h,Ir))),s[u]={primitive:l,promise:f},a.push(f)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,s=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){let u=a[c].material===void 0?fS(this.cache):this.getDependency("material",a[c].material);o.push(u)}return o.push(t.loadGeometries(a)),Promise.all(o).then(async function(c){let l=c.slice(0,c.length-1),u=c[c.length-1],d=[];for(let h=0,p=u.length;h<p;h++){let x=u[h],g=a[h],m,b=l[h];if(g.mode===Fn.TRIANGLES||g.mode===Fn.TRIANGLE_STRIP||g.mode===Fn.TRIANGLE_FAN||g.mode===void 0){let A=r.isSkinnedMesh===!0,_=x.hasAttribute("skinIndex")&&x.hasAttribute("skinWeight");A&&_===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),m=A&&_?new ya(x,b):new Ne(x,b),m.isSkinnedMesh===!0&&m.normalizeSkinWeights()}else if(g.mode===Fn.LINES)m=new ws(x,b);else if(g.mode===Fn.LINE_STRIP)m=new $n(x,b);else if(g.mode===Fn.LINE_LOOP)m=new Ts(x,b);else if(g.mode===Fn.POINTS)m=new As(x,b);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(m.geometry.morphAttributes).length>0&&pS(m,r),m.name=t.createUniqueName(r.name||"mesh_"+e),mi(m,r),g.extensions&&Fs(s,m,g),t.assignFinalMaterial(m),d.push(m)}for(let h=0,p=d.length;h<p;h++)t.associations.set(d[h],{meshes:e,primitives:h});if(d.length===1)return r.extensions&&Fs(s,d[0],r),d[0];let f=new we;r.extensions&&Fs(s,f,r),t.associations.set(f,{meshes:e});for(let h=0,p=d.length;h<p;h++)f.add(d[h]);return f})}loadCamera(e){let t,n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new qt(as.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new Kn(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),mi(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let r=s.pop(),a=s,o=[],c=[];for(let l=0,u=a.length;l<u;l++){let d=a[l];if(d){o.push(d);let f=new Ye;r!==null&&f.fromArray(r.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new va(o,c)})}loadAnimation(e){let t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,a=[],o=[],c=[],l=[],u=[];for(let d=0,f=s.channels.length;d<f;d++){let h=s.channels[d],p=s.samplers[h.sampler],x=h.target,g=x.node,m=s.parameters!==void 0?s.parameters[p.input]:p.input,b=s.parameters!==void 0?s.parameters[p.output]:p.output;x.node!==void 0&&(a.push(this.getDependency("node",g)),o.push(this.getDependency("accessor",m)),c.push(this.getDependency("accessor",b)),l.push(p),u.push(x))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(d){let f=d[0],h=d[1],p=d[2],x=d[3],g=d[4],m=[];for(let A=0,_=f.length;A<_;A++){let w=f[A],T=h[A],C=p[A],y=x[A],S=g[A];if(w===void 0)continue;w.updateMatrix&&w.updateMatrix();let E=n._createAnimationTracks(w,T,C,y,S);if(E)for(let D=0;D<E.length;D++)m.push(E[D])}let b=new Ua(r,void 0,m);return mi(b,s),b})}createNodeMesh(e){let t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){let a=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=s.weights.length;c<l;c++)o.morphTargetInfluences[c]=s.weights[c]}),a})}loadNode(e){let t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=s.children||[];for(let l=0,u=o.length;l<u;l++)a.push(n.getDependency("node",o[l]));let c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){let u=l[0],d=l[1],f=l[2];f!==null&&u.traverse(function(h){h.isSkinnedMesh&&h.bind(f,xS)});for(let h=0,p=d.length;h<p;h++)u.add(d[h]);if(u.userData.pivot!==void 0&&d.length>0){let h=u.userData.pivot,p=d[0];u.pivot=new L().fromArray(h),u.position.x-=h[0],u.position.y-=h[1],u.position.z-=h[2],p.position.set(0,0,0),delete u.userData.pivot}return u})}_loadNodeShallow(e){let t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"",o=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let u;if(r.isBone===!0?u=new gr:l.length>1?u=new we:l.length===1?u=l[0]:u=new _t,u!==l[0])for(let d=0,f=l.length;d<f;d++)u.add(l[d]);if(r.name&&(u.userData.name=r.name,u.name=a),mi(u,r),r.extensions&&Fs(n,u,r),r.matrix!==void 0){let d=new Ye;d.fromArray(r.matrix),u.applyMatrix4(d)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);if(!s.associations.has(u))s.associations.set(u,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){let d=s.associations.get(u);s.associations.set(u,{...d})}return s.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],s=this,r=new we;n.name&&(r.name=s.createUniqueName(n.name)),mi(r,n),n.extensions&&Fs(t,r,n);let a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(s.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let u=0,d=c.length;u<d;u++){let f=c[u];f.parent!==null?r.add(Ym(f)):r.add(f)}let l=u=>{let d=new Map;for(let[f,h]of s.associations)(f instanceof pn||f instanceof $t)&&d.set(f,h);return u.traverse(f=>{let h=s.associations.get(f);h!=null&&d.set(f,h)}),d};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){let a=[],o=e.name?e.name:e.uuid,c=[];function l(h){h.morphTargetInfluences&&c.push(h.name?h.name:h.uuid)}os[r.path]===os.weights?(l(e),e.isGroup&&e.children.forEach(l)):c.push(o);let u;switch(os[r.path]){case os.weights:u=Li;break;case os.rotation:u=Di;break;case os.translation:case os.scale:u=Qi;break;default:switch(n.itemSize){case 1:u=Li;break;case 2:case 3:default:u=Qi;break}break}let d=s.interpolation!==void 0?dS[s.interpolation]:Ss,f=this._getArrayFromAccessor(n);for(let h=0,p=c.length;h<p;h++){let x=new u(c[h]+"."+os[r.path],t.array,f,d);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(x),a.push(x)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Hf(t.constructor),s=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let s=this instanceof Di?Gf:Ac;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function _S(i,e,t){let n=e.attributes,s=new Sn;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(s.set(new L(c[0],c[1],c[2]),new L(l[0],l[1],l[2])),o.normalized){let u=Hf(Fr[o.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let o=new L,c=new L;for(let l=0,u=r.length;l<u;l++){let d=r[l];if(d.POSITION!==void 0){let f=t.json.accessors[d.POSITION],h=f.min,p=f.max;if(h!==void 0&&p!==void 0){if(c.setX(Math.max(Math.abs(h[0]),Math.abs(p[0]))),c.setY(Math.max(Math.abs(h[1]),Math.abs(p[1]))),c.setZ(Math.max(Math.abs(h[2]),Math.abs(p[2]))),f.normalized){let x=Hf(Fr[f.componentType]);c.multiplyScalar(x)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}i.boundingBox=s;let a=new hn;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=a}function Qm(i,e,t){let n=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(c){i.setAttribute(o,c)})}for(let a in n){let o=Vf[a]||a.toLowerCase();o in i.attributes||s.push(r(n[a],o))}if(e.indices!==void 0&&!i.index){let a=t.getDependency("accessor",e.indices).then(function(o){i.setIndex(o)});s.push(a)}return nt.workingColorSpace!==cn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${nt.workingColorSpace}" not supported.`),mi(i,e),_S(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?hS(i,e.targets,t):i})}var io=new L;function On(i,e,t,n,s,r){let a=2*Math.PI*s/4,o=Math.max(r-2*s,0),c=Math.PI/4;io.copy(e),io[n]=0,io.normalize();let l=.5*a/(a+o),u=1-io.angleTo(i)/c;return Math.sign(io[t])===1?u*l:o/(a+o)+l+l*(1-u)}var Os=class i extends Un{constructor(e=1,t=1,n=1,s=2,r=.1){let a=s*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:s,radius:r},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let c=new L,l=new L,u=new L(e,t,n).divideScalar(2).subScalar(r),d=this.attributes.position.array,f=this.attributes.normal.array,h=this.attributes.uv.array,p=d.length/6,x=new L,g=.5/a;for(let m=0,b=0;m<d.length;m+=3,b+=2)switch(c.fromArray(d,m),l.copy(c),l.x-=Math.sign(l.x)*g,l.y-=Math.sign(l.y)*g,l.z-=Math.sign(l.z)*g,l.normalize(),d[m+0]=u.x*Math.sign(c.x)+l.x*r,d[m+1]=u.y*Math.sign(c.y)+l.y*r,d[m+2]=u.z*Math.sign(c.z)+l.z*r,f[m+0]=l.x,f[m+1]=l.y,f[m+2]=l.z,Math.floor(m/p)){case 0:x.set(1,0,0),h[b+0]=On(x,l,"z","y",r,n),h[b+1]=1-On(x,l,"y","z",r,t);break;case 1:x.set(-1,0,0),h[b+0]=1-On(x,l,"z","y",r,n),h[b+1]=1-On(x,l,"y","z",r,t);break;case 2:x.set(0,1,0),h[b+0]=1-On(x,l,"x","z",r,e),h[b+1]=On(x,l,"z","x",r,n);break;case 3:x.set(0,-1,0),h[b+0]=1-On(x,l,"x","z",r,e),h[b+1]=1-On(x,l,"z","x",r,n);break;case 4:x.set(0,0,1),h[b+0]=1-On(x,l,"x","y",r,e),h[b+1]=1-On(x,l,"y","x",r,t);break;case 5:x.set(0,0,-1),h[b+0]=On(x,l,"x","y",r,e),h[b+1]=1-On(x,l,"y","x",r,t);break}}static fromJSON(e){return new i(e.width,e.height,e.depth,e.segments,e.radius)}};var Cc=new Os(1,1,1,1,.025),ks=new Map,ig=i=>Array.from(ks.values()).includes(i);function wt(i,e=!1){let t=i+e;return ks.has(t)||ks.set(t,new un({color:i,roughness:.88,metalness:0,...e?{emissive:i,emissiveIntensity:.65}:{}})),ks.get(t)}function ls(i,e){let t=`${i}:${e}`;if(!ks.has(t)){let n=wt(i).clone();n.userData.seasonRole=e,ks.set(t,n)}return ks.get(t)}function P(i,e,t,n,s,r,a,o,c=!1){let l=new Ne(Cc,wt(o,c));return l.position.set(e,t,n),l.scale.set(s,r,a),l.castShadow=!0,l.receiveShadow=!0,i.add(l),l}function lt(i,e,t,n,s,r,a,o=s){let c=new Ne(new Ri(o,s,r,8),wt(a));return c.position.set(e,t,n),c.castShadow=!0,c.receiveShadow=!0,i.add(c),c}var Pe={wood:"#69543e",beam:"#544536",stone:"#ada58d",cream:"#ead6b0",window:"#f6d590",roof:"#9f533b",green:"#526b51",iron:"#535e55"},sg=.2135,yS=.235;function rg(i){let e=(t,n=1)=>t+sg*n+.042-yS;return i==="bench"?[{position:[0,e(0),0],yaw:0}]:i==="park"?[{position:[.4,e(.13,.85),.55],yaw:0}]:i==="gazebo"?[{position:[0,e(.16),-.55],yaw:0}]:[]}function Yt(i,e,t,n,s=!1){let r=new we;r.position.set(e,t,n),s&&(r.rotation.y=Math.PI/2),i.add(r),P(r,0,0,0,.48,.56,.08,Pe.beam),P(r,0,0,.045,.37,.44,.05,Pe.window,!0),P(r,0,0,.08,.035,.46,.025,Pe.cream),P(r,0,0,.085,.38,.035,.025,Pe.cream),P(r,0,-.31,0,.6,.075,.16,Pe.wood)}function rn(i,e,t,n,s){let a=e*.62,o=new oi;o.moveTo(-e*.43,-.12),o.lineTo(e*.43,-.12),o.lineTo(0,e*.31),o.closePath();let c=new Ne(new Pi(o,{depth:t*.86,bevelEnabled:!1}),wt("#dfcba7"));c.position.set(0,n,-t*.43),c.castShadow=!0,c.receiveShadow=!0,i.add(c);for(let l of[-1,1]){let u=P(i,l*e*.25,n+e*.155,0,a,.11,t+.3,s);u.material=ls(s,"roof"),u.rotation.z=-l*.58;for(let d=0;d<5;d++){let f=l*(d+.5)*e/10,h=n+e*.3-Math.abs(f)*Math.tan(.58);for(let p=0;p<5;p++){let x=d%2?s:new be(s).multiplyScalar(1.07).getStyle(),g=P(i,f,h+.085,(p-2)*(t+.28)/5,e/10+.025,.045,(t+.28)/5-.018,x);g.material=ls(x,"roof"),g.rotation.z=-l*.58}}}P(i,0,n+e*.325,0,.13,.11,t+.34,Pe.beam);for(let l of[-e*.49,e*.49])P(i,l,n+.04,0,.075,.09,t+.31,"#74644e");for(let l of[-t/2,t/2]){P(i,0,n+.15,l,.08,.52,.08,Pe.beam);for(let u of[-1,1]){let d=P(i,u*e*.21,n+.07,l,e*.53,.055,.06,Pe.beam);d.rotation.z=-u*.58}}}function tg(i,e,t){let n=["#a6553c","#637969","#637e87","#ae884d"],s=["#ead8b6","#e5d8c3","#c6d0b1","#d9c4a3"];P(i,0,.08,0,1.88,.16,1.88,"#b1ab91"),P(i,0,1.2/2+.15,0,1.58,1.2,1.5,s[e%4]);for(let c of[-.785,.785])for(let l=0;l<7;l++)P(i,(l-3)*.22,.23,c,.212,.14,.045,l%2?"#b5a890":"#c2b59b"),P(i,(l-3)*.22,.38,c,.212,.13,.045,l%2?"#c2b59b":"#b5a890");for(let c of[-.79,.79])for(let l of[-.76,.76])P(i,c,.78,l,.075,1.27,.075,Pe.beam);for(let c of[.25,1.27])P(i,0,c,.765,1.65,.07,.065,Pe.wood);P(i,.18,.55,.798,.45,.88,.018,"#322f2b");let a=new we;a.name="door-hinge",a.userData.movingPart=!0,a.position.set(-.03,.55,.85),i.add(a),P(a,.21,0,0,.42,.86,.055,Pe.wood);for(let c of[-.26,.26])P(a,.21,c,.032,.34,.045,.025,"#8f7655");P(a,.34,0,.047,.045,.045,.032,"#ccb36c"),P(i,.18,.13,.91,.62,.13,.25,Pe.stone),Yt(i,-.48,.81,.8),Yt(i,.8,.81,-.2,!0);for(let c of[-.76,-.2]){P(i,c,.83,.84,.1,.52,.06,["#7b8d70","#8a9c86","#829ca2","#ac9370"][e%4]);for(let l=0;l<5;l++)P(i,c,.62+l*.09,.88,.09,.022,.02,"#65725b")}let o=new we;o.rotation.y=Math.PI,i.add(o),Yt(o,.37,.88,.79),Yt(o,-.36,.88,.79);for(let c of[-.6,.43])P(i,-.79,.8,c,.035,1.15,.065,Pe.beam);rn(i,1.72,1.67,1.4,n[e%4]),P(i,-.52,1.7,-.44,.22,.82,.26,"#aa9f85"),P(i,-.52,2.14,-.44,.3,.1,.32,"#787864");for(let c=0;c<5;c++)P(i,-.52,1.42+c*.13,-.577,.24,.017,.035,"#867c69"),P(i,-.66,1.49+c*.13,-.44,.035,.017,.26,"#867c69");if(t==="house"){let c=P(i,.18,1.13,.99,.69,.065,.48,n[e%4]);c.rotation.x=.15;for(let u of[-.11,.47])P(i,u,.57,1.09,.055,1.02,.055,Pe.wood);if(P(i,.18,.08,1.04,.76,.075,.35,"#c5b89c"),e===1||e===3){let u=new we;u.position.set(.34,1.6,.55),u.scale.setScalar(.48),i.add(u),P(u,0,.48,0,.82,.9,.6,"#e9d6b4"),Yt(u,0,.53,.33),rn(u,1,.82,.95,n[e%4])}if(e===2)for(let u=0;u<5;u++)P(i,-.835,.35+u*.17,-.3+Math.sin(u)*.17,.085,.14,.12,u%2?"#789366":"#91a977");let l=new we;l.position.set(.6,1.07,.85),l.scale.setScalar(.32),i.add(l),P(l,0,0,0,.27,.38,.27,"#f0c176",!0),P(l,0,.22,0,.37,.07,.37,"#616958"),P(l,0,-.24,0,.29,.06,.29,"#616958")}if(t==="bakery"||t==="cafe"){let c=t==="bakery"?"#c78b47":"#688978",l=new we;i.add(l),l.position.set(0,1.05,.92);for(let d=0;d<8;d++){let f=P(l,(d-3.5)*.19,0,.06,.185,.07,.46,d%2?"#f0e4c8":c);f.rotation.x=.15,P(l,(d-3.5)*.19,-.085,.275,.185,.13,.035,d%2?"#f0e4c8":c)}if(P(i,0,.36,.91,1.42,.14,.24,Pe.wood),t==="bakery")for(let d=0;d<4;d++)lt(i,(d-1.5)*.24,.49,1,.1,.11,"#c69051");else lt(i,-.52,.5,1,.1,.12,"#e3ddd0"),P(i,-.32,.55,1,.12,.03,.12,"#d8b986");let u=new we;u.position.set(-.83,1.1,.95),i.add(u),P(u,0,.12,0,.04,.4,.04,Pe.iron),P(u,0,-.15,0,.36,.24,.07,"#f1e4bc"),lt(u,0,-.145,.06,.065,.03,c).rotation.x=Math.PI/2}P(i,-.48,.42,.88,.5,.14,.17,"#826049");for(let c=0;c<3;c++)P(i,-.63+c*.15,.57,.9,.04,.16,.04,"#748055"),P(i,-.63+c*.15,.66,.9,.105,.07,.1,e%2?"#dfb66a":"#d39889")}function Ec(i=0){let e=new we;lt(e,0,.49,0,.09,.98,"#77604a",.06);let t=["#73915d","#86a26e","#58775a","#b69b5d"];for(let[n,s,r,a]of[[0,1.33,0,.49],[-.28,1.06,.12,.37],[.29,1.12,-.06,.38],[.03,1.68,-.07,.32]]){let o=new Ne(new li(a,1),ls(t[i%4],"foliage"));o.position.set(n,s,r),o.scale.set(1.08,1.12,1.04),o.rotation.y=i*.23,o.castShadow=!0,o.receiveShadow=!0,e.add(o)}return e}function Xf(i,e="#ab8352"){for(let t of[-.31,.31])P(i,t,.102,0,.07,.205,.38,Pe.iron),P(i,t,.33,-.17,.06,.32,.06,Pe.iron);for(let t of[-.13,0,.13])P(i,0,sg-.0325,t,.83,.065,.09,e);for(let t of[.305,.42])P(i,0,t,-.19,.83,.095,.06,e)}function vS(i,e){lt(i,0,.05,0,.16,.1,Pe.iron),P(i,0,.65,0,.06,1.2,.06,Pe.iron),P(i,0,1.38,0,.25,.3,.25,["#f7d391","#abd3b6","#acc6da","#e8b6ab"][e%4],!0);for(let t of[-.13,.13])for(let n of[-.13,.13])P(i,t,1.38,n,.035,.32,.035,Pe.iron);P(i,0,1.58,0,.35,.08,.35,Pe.iron)}function Bs(i,e,t,n,s=1){let r=new we;r.position.set(e,.14,t),r.scale.setScalar(s),i.add(r),lt(r,0,.1,0,.13,.2,"#ad7357",.17),lt(r,0,.205,0,.15,.018,"#62513c");for(let a=0;a<4;a++){let o=a*2.4;P(r,Math.cos(o)*.08,.31,Math.sin(o)*.08,.022,.23,.022,"#698159");let c=new Ne(new li(.068,1),wt(n));c.position.set(Math.cos(o)*.08,.43+a%2*.04,Math.sin(o)*.08),r.add(c)}}function Or(i,e,t,n,s,r){let a=new oi;a.moveTo(-s/2,0),a.lineTo(s/2,0),a.lineTo(s/2,r-s/2),a.absarc(0,r-s/2,s/2,0,Math.PI,!1),a.closePath();let o=new Ne(new Pi(a,{depth:.05,bevelEnabled:!1}),wt(Pe.wood));o.position.set(e,t,n),i.add(o);let c=new Ne(o.geometry,wt(Pe.window,!0));c.position.set(e,t+.055,n+.055),c.scale.set(.84,.87,.5),i.add(c),P(i,e,t+r*.42,n+.092,.035,r*.72,.024,Pe.cream),P(i,e,t+r*.4,n+.09,s*.82,.035,.022,Pe.cream)}function ng(i,e,t,n,s,r){let a=e/2,o=t/2,c=e*.23,l=[-a,0,-o,a,0,-o,-c,s,0,a,0,-o,c,s,0,-c,s,0,a,0,-o,a,0,o,c,s,0,a,0,o,-a,0,o,c,s,0,-a,0,o,-c,s,0,c,s,0,-a,0,o,-a,0,-o,-c,s,0];for(let f=0;f<l.length;f+=9)for(let h=0;h<3;h++){let p=l[f+3+h];l[f+3+h]=l[f+6+h],l[f+6+h]=p}let u=new ft().setAttribute("position",new et(l,3));u.computeVertexNormals();let d=new Ne(u,ls(r,"roof"));d.position.y=n,d.castShadow=!0,d.receiveShadow=!0,i.add(d);for(let f of[-o,o])P(i,0,n,f,e+.03,.09,.075,Pe.wood);for(let f of[-a,a])P(i,f,n,0,.075,.09,t,Pe.wood);P(i,0,n+s,0,c*2+.07,.08,.1,Pe.wood);for(let f of[-1,1])for(let h=1;h<4;h++)P(i,0,n+s*(1-h/4)+.012,f*o*h/4,e*(.46+.54*h/4),.02,.025,new be(r).multiplyScalar(1.1).getStyle())}function bS(i,e,t){if(P(i,0,.07,0,1.9,.14,1.9,"#b4ad97"),e==="bakery"){P(i,-.12,.71,-.15,1.47,1.12,1.22,"#cfb798");for(let l=.27;l<1.17;l+=.15)for(let u=0;u<6;u++)P(i,-.76+u*.245+Math.round(l/.15)%2*.035,l,.47,.224,.12,.035,u%2?"#c49d81":"#d7b89b");Or(i,-.48,.41,.51,.63,.64),P(i,.4,.53,.51,.38,.75,.065,Pe.wood),P(i,.49,.53,.56,.04,.04,.026,"#c5a25d"),rn(i,1.62,1.35,1.3,["#ad6448","#967b58","#737f72","#aa8259"][t%4]),P(i,.7,.56,-.26,.37,.82,1.01,"#b68a6b"),P(i,.68,1.38,-.46,.28,1.22,.29,"#a78066");for(let l=.9;l<1.9;l+=.14)P(i,.68,l,-.612,.29,.022,.027,"#d6b394");P(i,.68,2.04,-.46,.38,.12,.37,"#7c7062");for(let l=0;l<6;l++){let u=P(i,-.22+(l-2.5)*.2,1.06,.79,.194,.07,.53,l%2?"#ede0c0":"#bb874c");u.rotation.x=.17,P(i,-.22+(l-2.5)*.2,.98,1.06,.19,.12,.035,l%2?"#ede0c0":"#bb874c")}P(i,-.36,.43,.88,.85,.07,.32,"#95744e");for(let l=0;l<4;l++){let u=lt(i,-.65+l*.18,.52,.88,.082,.1,"#c99a60");u.scale.z=.65,P(i,-.65+l*.18,.576,.88,.018,.012,.08,"#ead2a2")}let c=new we;c.rotation.y=Math.PI,i.add(c),Or(c,.28,.43,.775,.55,.52),P(c,-.5,.29,.79,.32,.24,.24,"#927956");for(let l=0;l<3;l++)P(c,-.51+l*.085,.39,.79,.04,.035,.22,"#bea779");for(let l of[.25,.4])P(i,-.12,l,-.78,1.48,.025,.04,"#b18d70");Bs(i,.72,.89,"#d9bc73",.65);return}if(e==="cafe"){P(i,-.16,1.14,-.18,1.25,1.98,1.22,["#d9d0b6","#d2c2b1","#c7cdbf","#e1d1b2"][t%4]);for(let d of[-.81,.46])P(i,d,1.16,.44,.075,2.03,.09,Pe.beam);P(i,-.16,2.17,-.18,1.44,.13,1.39,"#657c75").material=ls("#657c75","roof"),P(i,-.16,2.28,-.72,1.4,.21,.07,"#c7bc9f");for(let d of[-.84,.52])P(i,d,2.28,-.18,.07,.21,1.15,"#c7bc9f");Or(i,-.47,.35,.47,.48,.7),P(i,.2,.65,.49,.36,1.02,.06,Pe.wood),Yt(i,-.17,1.65,.47),P(i,-.18,1.32,.67,1.21,.07,.45,Pe.wood);for(let d=0;d<6;d++)P(i,-.73+d*.22,1.49,.84,.035,.34,.035,"#536b62");P(i,-.18,1.67,.84,1.2,.045,.045,"#536b62");let c=P(i,.7,.53,-.22,.32,.77,1.2,"#d9ccb1");c.name="coffee-wing",P(i,.7,.96,-.22,.44,.1,1.36,"#657c75"),lt(i,-.64,.41,.99,.21,.045,"#8c7657"),lt(i,-.64,.23,.99,.025,.33,Pe.iron),lt(i,-.65,.48,.99,.045,.08,"#eee2c7"),P(i,-.77,.25,.97,.11,.04,.21,Pe.wood),P(i,.61,1.36,.65,.42,.39,.06,"#5d776e"),lt(i,.6,1.39,.704,.084,.028,"#e7d3ac").rotation.x=Math.PI/2,P(i,.6,1.23,.705,.18,.035,.025,"#e7d3ac"),Bs(i,.56,.94,"#c29190",.8);let l=new we;l.rotation.y=Math.PI,i.add(l),Yt(l,.16,1.62,.82),Or(l,.16,.36,.82,.65,.71);let u=new we;u.rotation.y=-Math.PI/2,i.add(u),Yt(u,.25,1.61,.85),P(i,-.17,.3,-.815,1.27,.17,.07,"#b2a38a");return}if(e==="grocer"){P(i,0,.64,-.57,1.66,.99,.43,"#c0ac83");for(let c=0;c<8;c++)P(i,(c-3.5)*.22,.69,-.34,.03,.95,.025,"#957c57");for(let c of[-.82,.82])for(let l of[-.73,.67])P(i,c,.73,l,.095,1.23,.095,Pe.wood);ng(i,1.97,1.83,1.4,.4,["#75816b","#a7804e","#748991","#a28560"][t%4]);for(let c of[-.59,.59]){P(i,c,.39,.18,.42,.5,1.09,"#a07d52");for(let l=0;l<4;l++){P(i,c,.67,-.2+l*.26,.37,.13,.23,"#b99a69");for(let u=0;u<3;u++){let d=new Ne(new li(.061,1),wt(["#cf9c5f","#a8b86c","#bf7860","#d5ba73"][l]));d.position.set(c+(u-1)*.095,.77,-.2+l*.26),i.add(d)}}}for(let c=.27;c<1.17;c+=.15)P(i,0,c,-.795,1.68,.026,.03,"#9f895f");P(i,.3,.56,-.805,.41,.67,.04,"#8d7654"),P(i,.43,.57,-.84,.045,.045,.025,"#c4ad73"),P(i,0,1.11,.76,.58,.24,.06,"#e8d8b3");for(let c=0;c<3;c++)lt(i,(c-1)*.12,1.12,.8,.053,.025,["#cda16b","#a2ae75","#c07d61"][c]).rotation.x=Math.PI/2;lt(i,-.78,.29,.92,.14,.29,"#c1ae85"),P(i,-.78,.47,.92,.15,.07,.16,"#82996f");return}let n=["#6f897a","#857989","#758b98","#94906b"][t%4],s=["#dabda9","#d4cbb1","#c9d1c7","#e1ceb0"][t%4];P(i,-.58,.89,-.12,.49,1.48,1.42,s);for(let c=.3;c<1.55;c+=.18)P(i,-.58,c,.6,.51,.022,.026,"#b69382");let r=wt("#b9d1c5").clone();Object.assign(r,{transparent:!0,opacity:.62,roughness:.24,depthWrite:!1});let a=(c,l,u,d,f,h)=>{let p=P(i,c,l,u,d,f,h,"#b9d1c5");return p.material=r,p};for(let c of[-.28,.82])a(c,.87,-.12,.025,1.35,1.44);a(.27,.87,.6,1.09,1.35,.025),a(.27,.87,-.83,1.09,1.35,.025);for(let c of[-.3,.26,.83])for(let l of[-.85,.62])P(i,c,.9,l,.055,1.54,.055,n);for(let c of[.25,1.05,1.6])P(i,.27,c,.63,1.17,.04,.05,n);let o=a(.26,1.76,-.12,1.25,.04,1.53);o.rotation.z=-.2;for(let c of[-.86,-.13,.63]){let l=P(i,.26,1.79,c,1.28,.06,.05,n);l.rotation.z=-.2}P(i,-.59,1.73,-.12,.66,.12,1.61,"#866b58"),P(i,-.58,2,-.41,.5,.39,.47,"#d3b79d"),ng(i,.67,.66,2.23,.23,"#82786d"),P(i,.18,.59,.66,.37,.91,.038,"#839d8a"),a(.18,.75,.7,.26,.49,.015),P(i,-.52,.44,.83,.68,.05,.28,"#a68661");for(let[c,l]of[-.75,-.43,.65].entries())Bs(i,l,.85,["#d399aa","#c4b1d2","#e2bf7c"][c],.82);Bs(i,.59,-.42,"#d5b875",1),Bs(i,.12,-.48,"#c69baa",.7),P(i,-.59,1.32,.67,.32,.29,.04,"#e7d9bd");for(let c=0;c<5;c++){let l=c*Math.PI*2/5;lt(i,-.59+Math.cos(l)*.054,1.33+Math.sin(l)*.054,.706,.038,.022,"#c18e9b").rotation.x=Math.PI/2}lt(i,-.59,1.33,.721,.031,.02,"#d9bc6c").rotation.x=Math.PI/2}function SS(i,e,t){let n=["#718477","#9d6250","#718894","#ae925d"],s=n[t%4],r=["library","greenhouse","boathouse"].includes(e);if(P(i,0,.07,0,r?2.8:1.9,.14,1.9,"#b4ad97"),e==="library"){P(i,0,.86,-.12,2.48,1.44,1.44,"#e3d5b6");for(let u of[-1.21,-.43,.43,1.21])P(i,u,.88,.61,.07,1.5,.06,Pe.beam);for(let u of[.3,1.55])P(i,0,u,.63,2.51,.08,.08,Pe.beam);Yt(i,-.82,.91,.66),Yt(i,.83,.91,.66),P(i,0,.67,.68,.43,1,.09,Pe.wood),rn(i,2.62,1.62,1.65,s),P(i,0,1.57,.92,.87,.075,.39,s);for(let u of[-.36,.36])P(i,u,.88,1.02,.06,1.5,.06,Pe.wood);P(i,-.75,.42,.9,.69,.05,.23,Pe.wood);for(let u=0;u<6;u++)P(i,-1+u*.09,.54+u%2*.025,.91,.065,.23+u%2*.05,.16,["#8fa591","#b28068","#a9bbbf"][u%3]);let o=new we;o.position.set(.7,1.5,.72),i.add(o),P(o,0,0,0,.49,.31,.04,"#e9dfc1");for(let u of[-.1,.1]){let d=P(o,u,0,.034,.19,.2,.025,"#b39666");d.rotation.z=u<0?-.14:.14}Bs(i,1.05,.87,"#d2b473",.72);let c=new we;c.rotation.y=Math.PI,i.add(c);for(let u of[-.74,.74])Yt(c,u,.98,.87);P(c,0,.34,.89,2.47,.19,.04,"#baac8f");let l=new we;l.rotation.y=-Math.PI/2,i.add(l),Or(l,.1,.55,1.27,.66,.89);return}if(e==="greenhouse"){let o=["#698479","#897e6c","#718898","#94916a"][t%4],c=wt(["#b5d4c4","#d5c8d4","#b6ccd6","#d6d6b2"][t%4]).clone();Object.assign(c,{transparent:!0,opacity:.45,roughness:.28,metalness:.08,depthWrite:!1,side:nn});let l=(u,d,f,h,p,x)=>{let g=new Ne(Cc,c);return g.position.set(u,d,f),g.scale.set(h,p,x),g.receiveShadow=!0,i.add(g),g};for(let u of[-1.26,1.26]){l(u,.8,0,.035,1.25,1.56);for(let d of[-.76,0,.76])P(i,u,.8,d,.065,1.29,.065,o)}for(let u of[-.76,.76]){l(0,.8,u,2.47,1.25,.035);for(let d of[-1.26,-.63,0,.63,1.26])P(i,d,.8,u,.055,1.29,.06,o);P(i,0,.28,u,2.55,.06,.07,o)}for(let u of[-1,1]){let d=l(u*.64,1.65,0,1.57,.04,1.64);d.rotation.z=-u*.42;for(let f of[-.8,-.4,0,.4,.8]){let h=P(i,u*.64,1.65,f,1.61,.045,.045,o);h.rotation.z=-u*.42}}P(i,0,1.975,0,.07,.075,1.66,o);for(let u of[-.83,.83]){P(i,u,.42,0,.45,.55,1.18,"#a28159");for(let d=0;d<4;d++)Bs(i,u,-.48+d*.3,t%2?"#d2b26b":"#cf9894",.77)}P(i,0,.64,.79,.46,1.02,.045,"#7a958a"),l(0,.78,.82,.37,.58,.026);return}if(e==="granary"){lt(i,-.43,.91,-.16,.43,1.55,"#c2a97e");for(let l=0;l<12;l++){let u=l*Math.PI/6;P(i,-.43+Math.cos(u)*.432,.9,-.16+Math.sin(u)*.432,.03,1.52,.035,"#947958")}for(let l of[.4,1.17,1.56])lt(i,-.43,l,-.16,.443,.055,"#747d70");let o=new Ne(new yr(.54,.48,12),ls(s,"roof"));o.position.set(-.43,1.92,-.16),o.castShadow=!0,i.add(o);let c=new we;c.position.set(.48,0,.06),i.add(c),P(c,0,.63,0,.62,.96,1.31,"#b69971"),rn(c,.77,1.4,1.17,s),P(c,0,.52,.69,.36,.73,.06,Pe.wood);for(let l of[-.71,-.38,-.03])lt(i,l,.31,.74,.135,.33,"#d2be8e",.11),P(i,l,.5,.74,.12,.035,.11,"#a68b58");return}if(e==="boathouse"){for(let l=0;l<12;l++)P(i,(l-5.5)*.225,.18,0,.214,.08,1.7,l%2?"#b19a71":"#bea67b");for(let l of[-1.16,1.16])for(let u of[-.72,.72])P(i,l,.87,u,.095,1.54,.095,Pe.wood);P(i,0,.79,-.74,2.38,1.16,.09,"#a99069"),rn(i,2.51,1.7,1.64,s);let o=new oi;o.moveTo(-1.02,0);for(let[l,u]of[[-.67,-.29],[.66,-.24],[1.02,0],[.66,.24],[-.67,.29]])o.lineTo(l,u);o.closePath();let c=new Ne(new Pi(o,{depth:.22,bevelEnabled:!0,bevelSize:.025,bevelThickness:.025,bevelSegments:1,steps:1}),wt("#718b89"));c.rotation.x=Math.PI/2,c.position.set(0,.48,.22),c.castShadow=!0,i.add(c),P(i,0,.49,.22,1.6,.03,.37,"#a18761");for(let l of[-.4,.2,.67])P(i,l,.55,.22,.16,.06,.46,"#d2bd91");for(let l of[-.19,.67]){let u=P(i,-.03,.65,l,1.64,.038,.05,"#c6ac7c");u.rotation.y=l<0?.15:-.15,P(i,-.89,.65,l,.23,.04,.13,"#baa074")}lt(i,-1.04,.36,.73,.14,.3,"#957750");return}}function MS(i,e,t){if(e==="wheatfield"){P(i,0,.045,0,2.9,.09,1.9,"#927554");for(let l of[-.88,.88])P(i,0,.1,l,2.85,.085,.055,"#af9872");for(let l of[-1.4,1.4])for(let u of[-.88,.88])P(i,l,.24,u,.065,.46,.065,Pe.wood),P(i,l,.46,u,.1,.05,.1,"#b29771");let o=new we;o.name="crop-patch",o.userData.movingPart=!0,o.position.y=.1,i.add(o);for(let l of[-1,1])for(let u=0;u<4;u++)for(let d=0;d<5;d++){let f=l*(.4+u*.23),h=(d-2)*.31;P(i,f,.098,h,.028,.018,.22,"#70593f");for(let p of[-.04,.035]){P(o,f+p,.21,h,.017,.4,.017,"#96a55b");let x=P(o,f+p,.41,h,.06,.15,.048,["#dfbb6c","#d6aa56","#d9bd7a","#e1c78b"][t%4]);x.rotation.z=l*.13}}P(i,1.11,.23,.69,.38,.16,.28,"#987953");for(let l=0;l<3;l++)P(i,1.11,.35+l*.02,.68,.3,.08,.2,"#d6b777");let c=P(i,-1.34,.33,.68,.022,.58,.023,Pe.wood);c.rotation.z=.25,P(i,-1.4,.56,.68,.2,.024,.065,"#7b8272");return}P(i,0,.09,0,2.86,.18,2.86,"#b9b09a");let n=new Ne(new Ri(.56,.81,1.9,16),wt("#ddccb0"));n.position.set(-.18,1.03,-.22),n.castShadow=!0,n.receiveShadow=!0,i.add(n);for(let o=0;o<8;o++)for(let c=0;c<16;c++){let l=c*Math.PI/8+o%2*Math.PI/16,u=.81-o*.026,d=P(i,-.18+Math.sin(l)*u,.25+o*.2,-.22+Math.cos(l)*u,Math.PI*u/8*.87,.17,.055,o%2?"#c6b79d":"#bcae96");d.rotation.y=l}let s=new Ne(new yr(.84,.85,8),ls(["#8f6550","#778771","#6b8290","#a48a62"][t%4],"roof"));s.position.set(-.18,2.4,-.22),s.castShadow=!0,i.add(s),P(i,-.18,.57,.55,.4,.81,.065,Pe.wood),P(i,-.18,.16,.74,.65,.11,.36,"#a79c87"),Or(i,-.18,1.14,.49,.36,.47);let r=new we;r.name="mill-fan",r.userData.movingPart=!0,r.position.set(-.18,2.2,.71),i.add(r);for(let o=0;o<4;o++){let c=new we;c.rotation.z=o*Math.PI/2,r.add(c),P(c,0,.72,0,.055,1.55,.055,Pe.beam),P(c,.12,.92,.025,.28,.9,.035,"#e0d1ab");for(let l=0;l<5;l++)P(c,.12,.58+l*.17,.052,.29,.027,.02,"#a89062")}lt(r,0,0,.06,.11,.14,"#897358").rotation.x=Math.PI/2;let a=new we;a.position.set(.85,0,-.35),i.add(a),P(a,0,.49,0,.68,.82,1.4,"#a58860"),rn(a,.8,1.51,.99,"#8c7759");for(let o of[.85,1.09])lt(i,.63,.24,o,.14,.39,"#cbbc93",.11),P(i,.63,.44,o,.13,.08,.13,"#a59475");P(i,-1.02,.3,-.99,.47,.47,.42,"#97764c");for(let o of[.14,.3,.46])P(i,-1.02,o,-.76,.5,.055,.055,"#b29870")}function ag(i,e=0,t=0){let n=new we;if(n.name=`${i}-${e}-${t}`,i==="wheatfield"||i==="mill")MS(n,i,e);else if(["bakery","cafe","grocer","florist"].includes(i))bS(n,i,e);else if(["library","greenhouse","granary","boathouse"].includes(i))SS(n,i,e);else if(i==="house")tg(n,e,i);else if(i==="hall"){P(n,0,.1,0,2.8,.2,2.8,"#b3aa90"),P(n,0,.96,0,2.28,1.72,2.02,"#e3d4b1");for(let a of[-1.13,1.13])P(n,a,1,1.02,.09,1.8,.09,Pe.beam);Yt(n,-.7,1.12,1.04),Yt(n,.7,1.12,1.04);let s=new we;s.rotation.y=Math.PI,n.add(s),Yt(s,-.7,1.12,1.04),Yt(s,.7,1.12,1.04);for(let a of[-1.18,1.18]){let o=new we;o.rotation.y=a<0?-Math.PI/2:Math.PI/2,n.add(o),Yt(o,0,1.05,1.17)}P(n,0,.62,1.037,.57,1.06,.02,"#322f2b");let r=new we;r.name="door-hinge",r.userData.movingPart=!0,r.position.set(-.275,.62,1.1),n.add(r),P(r,.275,0,0,.55,1.04,.06,Pe.wood),P(r,.45,0,.045,.05,.05,.03,"#ccb36c");for(let a=0;a<3;a++)P(n,0,.06+a*.08,1.24-a*.1,.94,.12,.38,Pe.stone);rn(n,2.55,2.25,1.95,"#63745b"),P(n,0,2.36,-.15,.64,.74,.65,"#e6dbb7"),rn(n,.87,.87,2.76,"#546d54"),P(n,0,2.42,.19,.35,.35,.03,"#f5e9c8"),P(n,0,2.44,.215,.022,.12,.02,Pe.beam),P(n,.055,2.385,.22,.12,.02,.02,Pe.beam),lt(n,-1.29,.85,1.2,.025,1.65,Pe.iron),P(n,-1.07,1.4,1.2,.4,.28,.025,"#c3a36b")}else if(i==="market"){P(n,0,.06,0,2.8,.12,2.8,"#b1aa90");for(let s of[-1.1,1.1])for(let r of[-1,1])P(n,s,.75,r,.1,1.5,.1,Pe.wood);rn(n,2.52,2.5,1.52,"#a77e47");for(let s of[-.75,.75]){P(n,s,.43,.25,.7,.66,1.35,"#9d7951");for(let r=0;r<6;r++)for(let a=0;a<2;a++)P(n,s-.2+a*.3,.82,-.26+r*.19,.15,.12,.14,["#bb7447","#8d9b58","#d2b066"][r%3])}P(n,0,.53,-.85,2.05,.7,.35,"#b0976a")}else if(i==="park"){P(n,0,.055,0,1.93,.11,1.93,"#a8ba7f").material=ls("#a8ba7f","ground");for(let a of[-.91,.91])P(n,a,.18,-.1,.065,.25,1.7,"#e1d2ac");let s=Ec(e);s.scale.setScalar(.82),s.position.set(-.38,.08,-.36),n.add(s);let r=new we;r.position.set(.4,.13,.55),Xf(r),r.scale.setScalar(.85),n.add(r),P(n,0,.12,.42,1.7,.035,.34,"#cbbc98");for(let a=0;a<5;a++)P(n,-.6+a*.27,.19,-.79,.13,.12,.13,a%2?"#d9b674":"#b4797c")}else if(i==="bridge"){P(n,0,.08,0,.97,.18,2.28,"#b6ab91");for(let s=0;s<9;s++)P(n,0,.19+.075*Math.sin(s/8*Math.PI),-.96+s*.24,.9,.07,.23,s%2?"#c8bfa5":"#beb499");for(let s of[-.43,.43]){P(n,s,.38,0,.13,.29,2.25,"#ada18a");for(let r of[-.94,0,.94])P(n,s,.48,r,.2,.47,.19,"#b9ad94")}if(e)for(let s of[-.43,.43])for(let r of[-.94,.94])P(n,s,.74,r,.2,.045,.19,["#b9ad94","#718879","#83989e","#bb9c6c"][e%4])}else if(i==="workshop"){tg(n,t%4,"house");let s=["#a8b6ae","#6eabc0","#c9978b","#a296bf","#d9b362"];if(P(n,0,1.17,.84,.7,.16,.07,s[t],!0),t>0&&(P(n,0,2.05,0,1.06,.75,1.05,"#e6d5b8"),rn(n,1.3,1.3,2.48,s[t]),Yt(n,0,2.08,.56)),t>1){let r=P(n,0,1.7,.88,1.64,.12,.38,Pe.wood);r.name="balcony";for(let a=0;a<5;a++)P(n,(a-2)*.33,1.9,1.03,.04,.32,.04,s[t])}if(t>2&&(P(n,-.78,2.17,-.45,.38,1.8,.38,"#ccbfa7"),rn(n,.55,.55,3.1,s[t])),t===4){lt(n,0,3,0,.11,.7,"#d8b466",.04);for(let r of[-.39,.39])P(n,r,2.82,0,.12,.45,.12,"#d8b466");P(n,0,2.78,0,.86,.12,.12,"#d8b466")}}else if(i==="clock"){P(n,0,.1,0,2.65,.2,2.65,Pe.stone);for(let s=0;s<3;s++)P(n,0,.23+s*.12,.1,2.1-s*.25,.15,2.1-s*.25,"#b9b099");P(n,0,1.75,0,1.17,2.8,1.17,"#d4c6a5");for(let s=.6;s<3;s+=.28)P(n,0,s,.592,1.19,.025,.04,"#c1b495");for(let s=0;s<4;s++){let r=new we;r.rotation.y=s*Math.PI/2,n.add(r),lt(r,0,2.64,.64,.37,.07,"#f2e4b9").rotation.x=Math.PI/2,P(r,0,2.72,.7,.035,.2,.035,Pe.iron),P(r,.1,2.64,.7,.23,.035,.03,Pe.iron)}rn(n,1.6,1.5,3.23,["#687b63","#8a6867","#728999","#ba965c"][e%4]),lt(n,0,3.94,0,.045,.5,"#bda262")}else if(i==="tree")n.add(Ec(e));else if(i==="bench")Xf(n,["#ab8352","#869b7c","#99a9b1","#c5bca4"][e%4]);else if(i==="lamp"||i==="gardenlamp"){if(vS(n,e),i==="gardenlamp")for(let s=0;s<6;s++){let r=s*Math.PI/3;P(n,Math.cos(r)*.28,.08,Math.sin(r)*.28,.18,.12,.18,"#87a36d")}}else if(i==="flower"){P(n,0,.2,0,.85,.36,.45,"#a57b54");for(let s=0;s<5;s++)P(n,(s-2)*.14,.42,0,.04,.2,.04,"#71835a"),P(n,(s-2)*.14,.55,0,.12,.08,.12,e%2?"#c48da1":"#e1b65e")}else if(i==="picnic"){P(n,0,.55,0,.82,.07,.65,e%2?"#839981":"#a58352");for(let s of[-.33,.33])P(n,s,.28,0,.07,.5,.08,Pe.wood),P(n,s*1.2,.29,0,.14,.06,.68,e%2?"#acbaa0":"#b79763");P(n,-.15,.62,.05,.18,.06,.18,"#d6c3a2")}else if(i==="birdhouse")P(n,0,.6,0,.08,1.2,.08,Pe.wood),P(n,0,1.12,0,.45,.43,.4,"#d6b273"),rn(n,.61,.51,1.34,e%2?"#88a182":"#ab6952"),lt(n,0,1.14,.225,.09,.025,Pe.beam).rotation.x=Math.PI/2;else if(i==="windmill"){P(n,0,.6,0,.39,1.12,.39,"#d4c2a4"),rn(n,.61,.56,1.2,e%2?"#889cac":"#797e5e");let s=new we;s.name="fan",s.position.set(0,1.05,.3),n.add(s);for(let r=0;r<4;r++){let a=P(s,0,0,0,.11,1.15,.045,e%2?"#becbd0":"#d9bf91");a.rotation.z=r*Math.PI/4}}else if(i==="statue"){let s=e%2?"#9cbbac":"#c9c4af";P(n,0,.17,0,.72,.34,.72,"#b0ac96"),P(n,0,.7,0,.31,.8,.31,s),P(n,0,1.21,0,.37,.37,.37,s),P(n,-.23,.88,0,.45,.12,.12,s)}else if(i==="barrel"){lt(n,0,.3,0,.23,.58,"#92704c",.21);for(let s of[.1,.46])lt(n,0,s,0,.239,.045,"#62675d");P(n,.29,.08,.05,.13,.14,.46,"#b49a72")}else if(i==="planter"){lt(n,0,.14,0,.3,.28,"#b57958",.35),lt(n,0,.29,0,.3,.025,"#625541");for(let s=0;s<7;s++){let r=s*2.4;P(n,Math.cos(r)*.17,.4,Math.sin(r)*.17,.025,.23,.025,"#6b8b5a");let a=new Ne(new li(.074,1),wt(s%2?"#ddb968":"#c69391"));a.position.set(Math.cos(r)*.17,.54,Math.sin(r)*.17),n.add(a)}}else if(i==="hedge")P(n,0,.25,0,.92,.5,.5,"#65845f"),P(n,0,.51,0,.88,.08,.47,"#7b986b");else if(i==="cart"){P(n,0,.32,0,.6,.15,.7,"#a6885c");for(let s of[-.36,.36])lt(n,s,.18,0,.18,.065,"#6d5d46").rotation.z=Math.PI/2;for(let s of[-.32,.32])P(n,0,.49,s,.64,.24,.06,"#b59b74")}else if(i==="fountain")lt(n,0,.12,0,.87,.22,"#b1b4a5"),lt(n,0,.24,0,.7,.026,"#7aabb0"),lt(n,0,.43,0,.15,.5,"#c6c6b2"),lt(n,0,.67,0,.4,.09,"#c6c6b2");else if(i==="gazebo"){P(n,0,.08,0,1.86,.16,1.86,"#b8b5a5");for(let r of[-.7,.7])for(let a of[-.7,.7])P(n,r,.75,a,.08,1.5,.08,"#967a56");rn(n,1.77,1.77,1.5,"#798c77");let s=new we;s.position.set(0,.16,-.55),Xf(s),n.add(s)}return n}function qf(i,e=0,t=!1){let n=new we,s=new we,r=["#d6aa85","#b88c6a","#e2b99a"][e%3];P(s,0,.35,0,.19,.25,.14,i),P(s,0,.54,0,.18,.18,.17,r),P(s,0,.635,-.018,.195,.065,.19,e%2?"#5a493d":"#a47b50"),P(s,0,.56,-.075,.18,.1,.035,e%2?"#5a493d":"#a47b50");for(let a of[-.04,.04])P(s,a,.55,.087,.018,.023,.012,"#47443c");P(s,0,.245,0,.2,.035,.145,"#706650"),n.add(gi(s));for(let[a,o]of[["left",-.055],["right",.055]]){let c=new we;c.name=`leg-${a}`,c.position.set(o,.235,0);let l=new we;t?(P(l,0,-.004,.064,.073,.078,.145,"#53616a"),P(l,0,-.108,.125,.068,.2,.072,"#53616a"),P(l,0,-.218,.149,.084,.055,.12,"#5a483c")):(P(l,0,-.105,0,.073,.2,.085,"#53616a"),P(l,0,-.208,.027,.084,.055,.14,"#5a483c")),c.add(gi(l)),n.add(c);let u=new we;u.name=`arm-${a}`,u.position.set(o<0?-.137:.137,.43,0);let d=new we;P(d,0,-.073,0,.065,.15,.085,i),P(d,0,-.169,0,.06,.068,.071,r),u.add(gi(d)),t&&(u.rotation.x=-.38),n.add(u)}return n}function gi(i){i.updateMatrixWorld(!0);let e=new we;e.name=i.name,e.userData={...i.userData};let t=[];i.traverse(r=>{r.userData.movingPart&&t.push(r)});let n=r=>{let a=r;for(;a&&a!==i;){if(a.userData.movingPart)return a;a=a.parent}},s=(r,a,o)=>{let c=r.matrixWorld.clone().invert(),l=new Map;r.traverse(u=>{if(!(u instanceof Ne)||Array.isArray(u.material)||n(u)!==o)return;let d=u.geometry.index?u.geometry.toNonIndexed():u.geometry.clone();d.applyMatrix4(new Ye().multiplyMatrices(c,u.matrixWorld));let f=l.get(u.material)||[];f.push(d),l.set(u.material,f)});for(let[u,d]of l){let f=qm(d,!1);if(!f)continue;let h=new Ne($m(f),u);f.dispose(),h.castShadow=!0,h.receiveShadow=!0,a.add(h),d.forEach(p=>p.dispose())}};s(i,e);for(let r of t){let a=new we;a.name=r.name,a.userData={...r.userData},new Ye().multiplyMatrices(i.matrixWorld.clone().invert(),r.matrixWorld).decompose(a.position,a.quaternion,a.scale),s(r,a,r),e.add(a)}return e}function og(i,e,t=new Map){let n=i.size,s=new we,r=new we,a=new we,o=4703+n,c=()=>(o=Math.imul(o,1664525)+1013904223>>>0,o/4294967296),l=i.terrain==="meadow"?-1:i.terrain==="valley"?11:5;P(a,n/2,-1.37,n/2,n+.1,.5,n+.1,"#756b54"),P(a,n/2,-.91,n/2,n+.08,.46,n+.08,"#9b8767"),P(a,n/2,-.61,n/2,n+.12,.17,n+.12,"#b1a080");let u=(S,E)=>P(a,n/2,-.29,S,n+.06,.55,E,"#b8a887");l<0?u(n/2,n):(u(l/2,l),u((l+2+n)/2,n-l-2));for(let S=0;S<n;S++)for(let E of[0,n])S%3===0&&P(a,S+.5,-.78,E,.85,.17+c()*.12,.035,"#88775d"),S%2===0&&P(a,S+.7,-1.14,E,.48,.11,.04,"#ab9474");for(let S=0;S<n;S++)for(let E of[0,n])Rn(i,.5,S)||P(a,E,-.83,S+.4,.04,.2,.68+c()*.2,"#8e7c62");let d=[],f=[],h=new be,p=(S,E)=>{let D=.94+Math.sin(S*.34+E*.12)*.035+Math.cos(E*.43-S*.17)*.025,F=Vr(e,i,Math.min(n-1,Math.floor(S)),Math.min(n-1,Math.floor(E)));return h.set(F?"#91b474":"#729b71"),l>=0&&h.lerp(new be("#8fa581"),Math.max(0,1-Math.min(Math.abs(E-l),Math.abs(E-l-2))/1.6)*.3),h.multiplyScalar(D)};for(let S=0;S<n;S++)for(let E=0;E<n;E++)if(!Rn(i,E,S))for(let[D,F]of[[E,S],[E,S+1],[E+1,S],[E+1,S],[E,S+1],[E+1,S+1]]){d.push(D,.026,F);let N=p(D,F);f.push(N.r,N.g,N.b)}let x=new ft().setAttribute("position",new et(d,3)).setAttribute("color",new et(f,3));x.computeVertexNormals();let g=new Ne(x,new un({vertexColors:!0,roughness:.95}));g.material.userData.seasonRole="ground",g.receiveShadow=!0,s.add(g);let m=wt("#d6decf").clone();m.userData.seasonRole="ground";let b=new Ne(new Yn(240,240),m);b.rotation.x=-Math.PI/2,b.position.set(n/2,-1.65,n/2),b.receiveShadow=!0,s.add(b);let A={value:0},_=[],w=(S,E,D,F,N=1,I=0)=>{let U=t.get(S);if(!U)return;let z=U.clone();return z.position.set(E,D,F),z.scale.setScalar(N),z.rotation.y=I,s.add(z),z},T=(S,E,D,F)=>{let N=[];for(let z=0;z<n*4;z++){let V=z/4,Z=(z+1)/4;for(let[q,J]of[[V,S(V)],[V,E(V)],[Z,S(Z)],[Z,S(Z)],[V,E(V)],[Z,E(Z)]])N.push(q,D,J)}let I=new ft().setAttribute("position",new et(N,3));I.computeVertexNormals();let U=new Ne(I,wt(F));U.receiveShadow=!0,s.add(U)};if(l>=0){P(a,n/2,-.43,l+1,n+.17,.12,2.05,"#457b7c");let S=new un({color:"#499a9e",roughness:.23,metalness:.06,transparent:!0,opacity:.94});S.onBeforeCompile=N=>{N.uniforms.townTime=A,N.vertexShader=`uniform float townTime; varying vec3 townPosition;
`+N.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
transformed.z += sin(position.x * 2.1 - townTime * .65) * .006 + sin(position.x * .72 + position.y * 8.3 - townTime * .38) * .003;`).replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
townPosition = (modelMatrix * vec4(transformed, 1.0)).xyz;`),N.fragmentShader=`uniform float townTime; varying vec3 townPosition;
`+N.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
        float depth = min(abs(townPosition.z - ${l.toFixed(1)}), abs(townPosition.z - ${(l+2).toFixed(1)}));
        float flow = sin(townPosition.x * .9 - townTime * .38 + sin(townPosition.z * 5.0)) * .035;
        float ripple = pow(max(0.0, sin(townPosition.x * 3.2 - townTime * .65 + sin(townPosition.z * 12.0) * .4)), 32.0);
        diffuseColor.rgb *= .95 + flow;
        diffuseColor.rgb += vec3(.10,.19,.13) * (1.0 - smoothstep(.1,.48,depth));
        diffuseColor.rgb += vec3(.17,.20,.18) * ripple * .13;`)};let E=new Ne(new Yn(n+.15,2,n*6,10),S);E.rotation.x=-Math.PI/2,E.position.set(n/2,-.19,l+1),s.add(E);let D=hs(i);for(let N of[-1,1]){let I=N<0?l:l+2,U=-N;T(z=>I+U*(.06+Math.sin(z*.78)*.035),z=>I+U*(.25+Math.sin(z*.78)*.06+Math.sin(z*1.9)*.04),-.16,"#92b6a4"),T(()=>I,z=>I+U*(.14+Math.sin(z*.78)*.035),-.045,"#b0b29a")}for(let N=0;N<n;N++)for(let I of[-1,1]){let U=I<0?l:l+2,z=Math.sin(N*.85)*.05;if(!D.includes(N)&&N%3!==1){for(let V=0;V<4;V++){let Z=N+.08+c()*.82,q=U-I*(.06+c()*.14)+z;if(t.has("rock"))w("rock",Z,-.15,q,.35+c()*.35,c()*6);else{let J=new Ne(new Ta(.12+c()*.06,0),wt(V%2?"#a5b2a0":"#bec2ab"));J.position.set(Z,-.12,q),J.scale.y=.55,a.add(J)}}for(let V=0;V<6;V++){let Z=P(a,N+.18+V*.07,.055+V%2*.025,U-I*.08,.018,.21+c()*.15,.018,"#657f56");Z.rotation.z=(c()-.5)*.3,V%2===0&&P(a,Z.position.x,.22,U-I*.08,.033,.075,.033,"#927b4e")}}}for(let N of D){let I=new Ne(new Yn(.65,1.65),new tn({color:"#e2dbc0",transparent:!0,opacity:.2,side:nn}));I.rotation.x=-Math.PI/2,I.position.set(N+.5,-.18,l+1),s.add(I)}for(let N=0;N<5;N++)P(a,-.36,-.1,l+.1+N*.13,.6,.05,.115,"#a7895c");for(let N of[l+.08,l+.69])P(a,-.63,-.21,N,.09,.47,.09,"#806d51");let F=new we;F.name="river-boat",F.position.set(n-5.4,-.15,l+1.14),P(F,0,0,0,.68,.1,.34,"#9d7550");for(let N of[-.33,.33])P(F,N,.07,0,.06,.12,.36,"#b48a5c");for(let N of[-.16,.16])P(F,0,.08,N,.65,.13,.05,"#ac8055");P(F,0,.09,0,.12,.045,.3,"#d0ac75"),s.add(gi(F));for(let N=0;N<3;N++){let I=new we,U=new Ne(new Sr(.08,10,6),wt(N?"#e2d7b5":"#eee4c9"));U.scale.set(1.6,.8,1),I.add(U);let z=new Ne(new Sr(.047,8,6),wt("#ece1c2"));z.position.set(.095,.068,0),I.add(z),P(I,.14,.064,0,.055,.022,.035,"#c49a56"),s.add(I),_.push(I)}for(let N=0;N<8;N++){let I=new Ne(new Ma(.045+c()*.035,8),wt("#6a976d"));I.rotation.x=-Math.PI/2,I.position.set(2+c()*(n-4),-.178,l+(N%2?.29:1.7)),s.add(I)}}let C=[];if(i.terrain==="valley"){let S=(I,U)=>{let z=Math.max(0,1-Math.hypot((I-3)/8,(U+7)/7)),V=Math.max(0,1-Math.hypot((I-20)/10,(U+8)/7));return-1.64+Math.max(z*z*4.2,V*V*5.5)},E=[],D=[];for(let I=-14;I<-1;I++)for(let U=-6;U<n+7;U++)for(let[z,V]of[[U,I],[U,I+1],[U+1,I],[U+1,I],[U,I+1],[U+1,I+1]]){let Z=S(z,V);E.push(z,Z,V);let q=new be("#879e75").multiplyScalar(.9+Math.max(0,Z+1.64)*.035);D.push(q.r,q.g,q.b)}let F=new ft().setAttribute("position",new et(E,3)).setAttribute("color",new et(D,3));F.computeVertexNormals();let N=new Ne(F,new un({vertexColors:!0,roughness:.95}));N.material.userData.seasonRole="ground",N.receiveShadow=!0,s.add(N);for(let I=-13;I<-1;I+=2)for(let U=-5;U<n+7;U+=2)if(!(S(U+1,I+1)<=-1.6)){if(c()>.39){let V=U+.5+c(),Z=I+.4+c();C.push({x:V,y:S(V,Z)+.035,z:Z,scale:.75+c()*.65,variant:(U+I+100)%3})}c()>.73&&w("boulder",U+.8,S(U+.8,I+.8),I+.8,.8,c()*6)}for(let I of[{x:5,z:4},{x:18,z:4},{x:19,z:19}])for(let U=0;U<22;U++){let z=c()*Math.PI*2,V=Math.sqrt(c())*4.3,Z=I.x+Math.cos(z)*V,q=I.z+Math.sin(z)*V;Z<.7||q<.7||Z>n-.7||q>n-.7||Rn(i,Math.floor(Z),Math.floor(q))||Math.abs(q-12)<2.5||Vr(e,i,Z,q)||C.push({x:Z,y:.03,z:q,scale:.64+c()*.65,variant:U%3})}}else for(let S of[-1.1,n+1.1])for(let E=0;E<5;E++)C.push({x:S,y:-1.62,z:1+E*2.2,scale:.75,variant:E%3});let y=new _t;for(let S=0;S<3;S++){let E=t.get(["tree-0","pine","birch"][S]),D=gi(E||Ec(S)),F=C.filter(N=>N.variant===S);for(let N of D.children){let I=N.material.clone();I.userData.seasonRole="grove";let U=new Mn(N.geometry,I,F.length);U.name="curated-grove",F.forEach((z,V)=>{y.position.set(z.x,z.y,z.z),y.scale.setScalar(z.scale),y.rotation.y=V*1.73,y.updateMatrix(),U.setMatrixAt(V,y.matrix)}),U.castShadow=!0,U.receiveShadow=!0,r.add(U)}}for(let S=0;S<n*3;S++){let E=.3+c()*(n-.6),D=.3+c()*(n-.6);if(!(Rn(i,Math.floor(E),Math.floor(D))||i.roads.includes(`${Math.floor(E)},${Math.floor(D)}`)||i.buildings.some(F=>F.placed&&Math.abs(F.x+1-E)<1.6&&Math.abs(F.z+1-D)<1.6)))for(let F=0;F<3;F++){let N=E+(c()-.5)*.35,I=D+(c()-.5)*.35;P(a,N,.08,I,.018,.1,.018,"#74865a"),P(a,N,.145,I,.05,.025,.05,S%3?"#decb91":"#c894a0")}}if(i.terrain==="valley"){if(!e.chapterStars[1])for(let S=14;S<24;S+=2){for(let E of[S,S+1.85])P(a,oo+.05,.3,E,.075,.58,.075,"#9a8767");for(let E of[.23,.46])P(a,oo+.05,E,S+.93,.045,.055,1.8,"#b4a280")}if(!e.chapterStars[2]){for(let S=1;S<24;S+=2)if(!(hs(i).includes(S)||hs(i).includes(S-1))){for(let E of[S,S+1.8])P(a,E,.29,10.65,.075,.56,.075,"#9a8767");for(let E of[.23,.43])P(a,S+.9,E,10.65,1.7,.055,.04,"#b4a280")}}}return s.add(gi(a)),{world:s,forest:r,update(S){A.value=S/1e3,_.forEach((E,D)=>{let F=S*65e-6;E.position.set(n*.28+Math.sin(F)*n*.19-D*.25,-.12+Math.sin(S*.002+D)*.007,l+1+Math.sin(F*1.3)*.28+D*.09),E.rotation.y=Math.cos(F)>0?0:Math.PI})}}}var $f=Math.PI*26/180,Yf=Math.PI*72/180,Kf=Math.PI*40/180,jf=i=>Math.max($f,Math.min(Yf,i)),lg=i=>Math.max(.52,Math.min(3.2,i));function cg(i,e,t){let n=i.deltaMode===1?16:i.deltaMode===2?Math.max(1,t):1,s=Number.isFinite(i.deltaX)?i.deltaX*n:0,r=Number.isFinite(i.deltaY)?i.deltaY*n:0,a=Math.hypot(s,r);return a>120&&(s*=120/a,r*=120/a),i.ctrlKey||i.metaKey?{kind:"zoom",x:0,y:-r*.01}:i.shiftKey?{kind:"pan",x:s,y:r}:e==="mouse"?{kind:"zoom",x:0,y:-r*.0025}:{kind:"orbit",x:-s*.0035,y:-r*.0028}}function Rc(i,e=!1,t=18){return e?1:1-Math.exp(-Math.max(0,i)*t)}var Zf=i=>`${i.x},${i.z}`,Br=(i,e)=>(i%e+e)%e,ug=i=>({x:-i.z,z:i.x}),Pc=(i,e)=>{let t=Math.hypot(e.x-i.x,e.z-i.z);return{x:(e.x-i.x)/t,z:(e.z-i.z)/t}};function wS(i,e,t){return e.every((n,s)=>s===t||Math.hypot(n.x-i.x,n.z-i.z)>=.35)}function fg(i,e,t){let n=e+i/.32*Math.PI*2,s=t?Math.sin(n):0;return{phase:n,leg:s*.58,arm:t?-s*.35:0,bob:t?Math.abs(Math.sin(n*2))*.009:0}}function dg(i){let e=[];for(let u of i){let[d,f]=u.split(",").map(Number);for(let[h,p,x,g]of[[0,-1,{x:d,z:f},{x:d+1,z:f}],[1,0,{x:d+1,z:f},{x:d+1,z:f+1}],[0,1,{x:d+1,z:f+1},{x:d,z:f+1}],[-1,0,{x:d,z:f+1},{x:d,z:f}]])i.has(`${d+h},${f+p}`)||e.push({a:x,b:g})}let t=new Map;e.forEach((u,d)=>{let f=t.get(Zf(u.a))||[];f.push(d),t.set(Zf(u.a),f)});let n=new Set,s=[];for(let u=0;u<e.length;u++){if(n.has(u))continue;let d=[],f=u;for(;!n.has(f);){n.add(f);let h=e[f];d.push(h.a);let p=Pc(h.a,h.b),x=(t.get(Zf(h.b))||[]).filter(g=>!n.has(g)||g===u);if(x.sort((g,m)=>{let b=A=>{let _=Pc(e[A].a,e[A].b);return p.x*_.z-p.z*_.x===1?0:p.x*_.x+p.z*_.z===1?1:2};return b(g)-b(m)||g-m}),!x.length)break;f=x[0]}f===u&&d.length>=4&&s.push(d)}let r=u=>u.reduce((d,f,h)=>{let p=u[(h+1)%u.length];return d+f.x*p.z-p.x*f.z},0),a=s.sort((u,d)=>r(d)-r(u))[0];if(!a)return{points:[],lengths:[],length:0};let o=a.filter((u,d)=>{let f=a[(d+a.length-1)%a.length],h=a[(d+1)%a.length];return(u.x-f.x)*(h.z-u.z)!==(u.z-f.z)*(h.x-u.x)}),c=[];o.forEach((u,d)=>{let f=o[(d+o.length-1)%o.length],h=o[(d+1)%o.length],p=Pc(f,u),x=Pc(u,h),g=ug(p),m=ug(x),b={x:u.x+(g.x+m.x)*.24,z:u.z+(g.z+m.z)*.24},A={x:b.x-p.x*.12,z:b.z-p.z*.12},_={x:b.x+x.x*.12,z:b.z+x.z*.12};for(let w=0;w<=8;w++){let T=w/8,C=1-T;c.push({x:C*C*A.x+2*C*T*b.x+T*T*_.x,z:C*C*A.z+2*C*T*b.z+T*T*_.z})}});let l=[0];return c.forEach((u,d)=>{let f=c[(d+1)%c.length];l.push(l[d]+Math.hypot(f.x-u.x,f.z-u.z))}),{points:c,lengths:l,length:l.at(-1)}}function Bn(i,e){if(!i.length)return{x:0,z:0,angle:0};let t=Br(e,i.length),n=0,s=i.points.length-1;for(;n<s;){let c=n+s+1>>1;i.lengths[c]<=t?n=c:s=c-1}let r=i.points[n],a=i.points[(n+1)%i.points.length],o=(t-i.lengths[n])/(i.lengths[n+1]-i.lengths[n]);return{x:r.x+(a.x-r.x)*o,z:r.z+(a.z-r.z)*o,angle:Math.atan2(a.x-r.x,a.z-r.z)}}function TS(i,e){let t=1/0,n=0;return i.points.forEach((s,r)=>{let a=i.points[(r+1)%i.points.length],o=a.x-s.x,c=a.z-s.z,l=Math.hypot(o,c);if(!l)return;let u=Math.max(0,Math.min(1,((e.x-s.x)*o+(e.z-s.z)*c)/(l*l))),d=Math.hypot(s.x+o*u-e.x,s.z+c*u-e.z);d<t&&(t=d,n=i.lengths[r]+u*l)}),n}var Ic=class{constructor(e,t,n=32){this.people=[];this.blockers=[];this.track=dg(e),this.random=()=>(n=Math.imul(n,1664525)+1013904223>>>0,n/4294967296);let s=Math.min(t,Math.floor(this.track.length/2.5));for(let r=0;r<s;r++){let a=(r+.37)/s*this.track.length,o=Bn(this.track,a);this.people.push({...o,active:!0,distance:a,speed:0,cruiseSpeed:.44+this.random()*.12,travelled:0,totalTravelled:0,pause:this.random(),untilPause:12+this.random()*16,phase:this.random()*6})}}retarget(e){this.track=dg(e);for(let t of this.people)t.distance=TS(this.track,t),t.retargeting=this.track.length>0&&Math.hypot(t.x-Bn(this.track,t.distance).x,t.z-Bn(this.track,t.distance).z)>.005;this.blockers=[]}update(e){if(this.people.forEach(s=>{s.travelled=0}),!this.track.length)return;let t=this.people.filter(s=>s.active).sort((s,r)=>s.distance-r.distance),n=t.map(s=>s.distance);this.people.forEach(s=>{s.travelled=0}),t.forEach((s,r)=>{if(s.retargeting){let d=Bn(this.track,s.distance),f=Math.hypot(d.x-s.x,d.z-s.z),h=Math.min(f,e*.54),p={x:s.x+(d.x-s.x)*h/(f||1),z:s.z+(d.z-s.z)*h/(f||1)};if(wS(p,t,r)){if(h>1e-5){let x=Math.atan2(d.x-s.x,d.z-s.z),g=Math.atan2(Math.sin(x-s.angle),Math.cos(x-s.angle));s.angle+=Math.max(-e*4,Math.min(e*4,g))}s.x=p.x,s.z=p.z,s.travelled=h,s.totalTravelled+=h,f<=h+.005&&(s.retargeting=!1)}return}s.pause=Math.max(0,s.pause-e),s.untilPause-=e,s.untilPause<=0&&s.pause===0&&(s.pause=.6+this.random()*1.1,s.untilPause=14+this.random()*18);let a=Math.min(t.length>1?Br(n[(r+1)%n.length]-n[r],this.track.length):1/0,...this.blockers.map(d=>Br(d-n[r],this.track.length))),o=Math.max(0,a-.82),c=s.pause?0:Math.min(s.cruiseSpeed,o*1.5);s.speed+=Math.max(-e*1.2,Math.min(e*1.2,c-s.speed)),s.travelled=Math.min(o,s.speed*e),s.totalTravelled+=s.travelled,s.distance=Br(s.distance+s.travelled,this.track.length);let l=Bn(this.track,s.distance);s.x=l.x,s.z=l.z;let u=Math.atan2(Math.sin(l.angle-s.angle),Math.cos(l.angle-s.angle));s.angle+=Math.max(-e*4,Math.min(e*4,u*(1-Math.exp(-e*12))))})}canJoin(e,t=.72){return this.people.filter(n=>n.active).every(n=>Math.min(Br(n.distance-e,this.track.length),Br(e-n.distance,this.track.length))>=t)}join(e,t){let n=this.people[e];Object.assign(n,Bn(this.track,t),{distance:t,active:!0,speed:0,pause:0,untilPause:20})}};function hg(i,e){let t=new we,n=new Set(i.roads),s=new Set(i.buildings.filter(f=>f.placed).flatMap(f=>ni(f).map(h=>He(h.x,h.z)))),r=new _t,a=["#b9b6a9","#aaa99d","#c6c1b1","#a9b2a9","#b6ae9e"],o=new Mn(new Os(1,1,1,1,.09),wt("#ffffff"),i.roads.length*16),c=new Mn(new Un(.99,.035,.99),wt("#898e7f"),i.roads.length),l=[],u=0;for(let[f,h]of i.roads.entries()){let p=zn(h);r.position.set(p.x+.5,.046,p.z+.5),r.scale.setScalar(1),r.rotation.set(0,0,0),r.updateMatrix(),c.setMatrixAt(f,r.matrix);for(let x=0;x<4;x++)for(let g=0;g<4;g++){let m=Math.abs(Math.imul(p.x*19+p.z*43+x*7+g*13,2654435761))>>>0;r.position.set(p.x+.125+g*.25+(m%5-2)*.004,.07+m%3*.002,p.z+.125+x*.25),r.scale.set(.226+m%4*.002,.055,.221+m%3*.003),r.rotation.y=(m%5-2)*.018,r.updateMatrix(),o.setMatrixAt(u,r.matrix);let b=new be(a[m%a.length]);e.connectedRoads.has(h)||b.multiplyScalar(.77),o.setColorAt(u++,b)}for(let[x,g]of[[1,0],[-1,0],[0,1],[0,-1]])if(!n.has(He(p.x+x,p.z+g))&&!s.has(He(p.x+x,p.z+g)))for(let m=0;m<4;m++)l.push({x:p.x+.5+x*.47+(g?(m-1.5)*.245:0),z:p.z+.5+g*.47+(x?(m-1.5)*.245:0),horizontal:g!==0})}let d=new Mn(new Os(1,1,1,1,.08),wt("#cfcbba"),l.length);l.forEach((f,h)=>{r.position.set(f.x,.085,f.z),r.rotation.set(0,0,0),r.scale.set(f.horizontal?.235:.075,.09,f.horizontal?.075:.235),r.updateMatrix(),d.setMatrixAt(h,r.matrix)});for(let f of[c,o,d])f.receiveShadow=!0,t.add(f);return t.name="connected-stone-streets",t}var Lc=class{constructor(){this.uniforms={spring:{value:0},autumn:{value:0},winter:{value:0}};this.installed=new WeakSet}install(e,t){e.traverse(n=>{if(n instanceof Ne)for(let s of Array.isArray(n.material)?n.material:[n.material]){if(!(s instanceof un)||this.installed.has(s))continue;let r=s.userData.seasonRole||t;r&&(this.installed.add(s),s.onBeforeCompile=a=>{a.uniforms.townSpring=this.uniforms.spring,a.uniforms.townAutumn=this.uniforms.autumn,a.uniforms.townWinter=this.uniforms.winter,a.fragmentShader=`uniform float townSpring; uniform float townAutumn; uniform float townWinter;
`+a.fragmentShader;let c=r==="roof"?"diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.78,.85,.88),townWinter*.90);":`float leaf=${r==="grove"?"step(diffuseColor.r*1.12,diffuseColor.g)*step(diffuseColor.b*.95,diffuseColor.g)":"1.0"}; diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.46,.63,.32),townSpring*leaf*.25); diffuseColor.rgb=mix(diffuseColor.rgb,vec3(${r==="ground"?".48,.40,.20":".64,.28,.075"}),townAutumn*leaf*.75); diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.76,.83,.86),townWinter*leaf*.94);`;a.fragmentShader=a.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
`+c)},s.customProgramCacheKey=()=>`town-season-${r}`,s.needsUpdate=!0)}})}update(e,t){for(let n of["spring","autumn","winter"])this.uniforms[n].value+=(+(e===n)-this.uniforms[n].value)*(1-Math.exp(-t*1.8))}get snow(){return this.uniforms.winter.value}};function Qf(i){let e=jt(i),t=-i.rotation*Math.PI/2,n=i.kind==="hall",s=(r,a)=>({x:i.x+e.w/2+r*Math.cos(t)+a*Math.sin(t),z:i.z+e.d/2-r*Math.sin(t)+a*Math.cos(t)});return{id:i.id,outside:s(n?0:.18,n?1.78:1.32),inside:s(n?0:.18,n?.91:.65),yaw:t}}var Dc=(i,e)=>Math.hypot(i.x-e.x,i.z-e.z),Jf=(i,e)=>(i%e+e)%e;function xi(i,e){let t=1/0,n=0;return i.points.forEach((s,r)=>{let a=i.points[(r+1)%i.points.length],o=a.x-s.x,c=a.z-s.z,l=Math.hypot(o,c),u=Math.max(0,Math.min(1,((e.x-s.x)*o+(e.z-s.z)*c)/(l*l))),d=Math.hypot(s.x+o*u-e.x,s.z+c*u-e.z);d<t&&(t=d,n=i.lengths[r]+u*l)}),n}var Nc=class{constructor(e,t,n=!1,s=new Map){this.traffic=e;this.jobs=new Map;this.routesDirty=!1;this.doors=t.map(r=>({...r,exit:xi(e.track,r.outside),open:0,busy:null})),this.residents=e.people.map((r,a)=>{let o=s.get(a),c=this.doors.length?a%this.doors.length:-1,l=n&&c>=0?"sleeping":o?"seated":"walking";return r.active=l==="walking",l==="sleeping"?Object.assign(r,this.doors[c].inside):o&&Object.assign(r,o.position,{angle:o.yaw}),{mode:l,visible:l!=="sleeping",home:c,seat:o,path:[],wait:0,travelled:0,seated:l==="seated"}})}assignJobs(e,t){this.workRoute=t;let n=this.residents.map((r,a)=>({r,i:a})).filter(({r})=>!r.seat),s=new Map;e.forEach((r,a)=>{let o=n[a];if(!o)return;let{r:c,i:l}=o,u=this.traffic.people[l];s.set(l,r),(c.mode==="walking"||c.mode==="working"&&(this.routesDirty||this.jobs.get(l)?.fieldId!==r.fieldId))&&(c.mode="working",u.active=!1,u.speed=0,c.path=[...t(u,r.entrance),r.target])}),this.residents.forEach((r,a)=>{r.mode==="working"&&!s.has(a)&&(r.mode="joining",r.path=[],r.joinArc=void 0)}),this.jobs=s,this.routesDirty=!1}retarget(e,t){this.routesDirty=!0;let n=this.residents.map(r=>this.doors[r.home]?.id),s=e.map(r=>{let a=this.doors.find(o=>o.id===r.id);return a?Object.assign(a,r,{exit:xi(this.traffic.track,r.outside)}):{...r,exit:xi(this.traffic.track,r.outside),open:0,busy:null}});this.doors.splice(0,this.doors.length,...s),this.residents.forEach((r,a)=>{let o=this.doors.findIndex(c=>c.id===n[a]);if(r.home=o>=0?o:this.doors.length?a%this.doors.length:-1,r.mode==="joining"?(r.joinArc=void 0,r.path=[]):r.joinArc!==void 0&&(r.joinArc=xi(this.traffic.track,this.traffic.people[a])),r.seat?.id){let c=t.find(l=>l.id===r.seat.id);c?r.seat=c:(r.seated&&(r.seated=!1,r.mode="joining",r.path=[Bn(this.traffic.track,xi(this.traffic.track,this.traffic.people[a]))]),r.seat=void 0)}})}update(e,t){this.traffic.blockers=[],this.residents.forEach((n,s)=>{let r=this.traffic.people[s];if(r.active||(n.joinArc!==void 0&&this.traffic.blockers.push(n.joinArc),!n.visible||n.seated))return;let a=xi(this.traffic.track,r);Dc(r,Bn(this.traffic.track,a))<.46&&this.traffic.blockers.push(a)}),this.traffic.update(e),this.doors.forEach(n=>{let s=n.busy!==null?1:0;n.open+=Math.max(-e*1.8,Math.min(e*1.8,s-n.open))}),this.residents.forEach((n,s)=>{let r=this.traffic.people[s],a=this.doors[n.home];if(n.travelled=r.travelled,n.wait=Math.max(0,n.wait-e),n.mode==="joining"&&n.joinArc===void 0&&this.traffic.track.length){let o=xi(this.traffic.track,r);for(let c=0;c<this.traffic.track.length;c+=.5){let l=Jf(o+c,this.traffic.track.length);if(!this.traffic.canJoin(l,1.5))continue;n.joinArc=l;let u=Bn(this.traffic.track,l);n.path=[...this.workRoute?.(r,u)||[],u];break}if(n.joinArc===void 0)return}if(n.mode==="working"&&!n.path.length){let o=this.jobs.get(s);o&&Dc(r,o.target)>.015&&(n.path=[o.target])}if(n.mode==="seated"&&t&&a&&(n.mode="standing",n.wait=.45),n.mode==="standing"&&n.wait===0){let o=xi(this.traffic.track,n.seat.via);this.traffic.canJoin(o,1.5)&&(n.joinArc=o,n.seated=!1,n.mode="joining",n.path=[n.seat.via,Bn(this.traffic.track,o)])}if(n.mode==="walking"&&t&&a&&(n.mode="going-home",r.pause=0,r.untilPause=999),n.mode==="walking"&&!t&&n.seat&&(n.mode="going-seat"),n.mode==="going-home"&&!t&&(n.mode="walking"),n.mode==="going-seat"&&t&&(n.mode="going-home"),n.mode==="going-home"&&a&&a.busy===null&&this.atExit(r.distance,a.exit,r.travelled)&&(a.busy=s,r.active=!1,r.speed=0,n.mode="approaching",n.path=[a.outside]),n.mode==="going-seat"&&n.seat&&this.atExit(r.distance,xi(this.traffic.track,n.seat.via),r.travelled)&&(r.active=!1,n.mode="sitting",n.path=[n.seat.via,n.seat.position]),n.mode==="sleeping"&&!t&&a&&a.busy===null&&this.traffic.canJoin(a.exit,1.5)&&(a.busy=s,n.joinArc=a.exit,n.mode="opening-out",Object.assign(r,a.inside,{angle:a.yaw})),n.mode==="opening-out"&&a.open>=.99&&(n.visible=!0,n.mode="leaving",n.path=[a.outside]),n.path.length){let o=n.path[0],c=Dc(r,o),l=Math.min(c,e*.54);if(c>1e-4){let u={x:r.x+(o.x-r.x)*l/c,z:r.z+(o.z-r.z)*l/c};if(n.mode==="working"&&this.traffic.people.some((h,p)=>p!==s&&this.residents[p].visible&&Dc(u,h)<.23))return;let d=Math.atan2(o.x-r.x,o.z-r.z),f=Math.atan2(Math.sin(d-r.angle),Math.cos(d-r.angle));r.angle+=Math.max(-e*4,Math.min(e*4,f)),r.x=u.x,r.z=u.z,n.travelled=l,r.totalTravelled+=l}c<=l+1e-5&&n.path.shift()}if(!n.path.length)if(n.mode==="approaching"&&a.open>=.99)n.mode="entering",n.path=[a.inside];else if(n.mode==="entering")n.mode="sleeping",n.visible=!1,a.busy=null;else if(n.mode==="leaving")n.mode="joining",n.path=[Bn(this.traffic.track,a.exit)];else if(n.mode==="joining"){let o=xi(this.traffic.track,r);this.traffic.canJoin(o)&&(this.traffic.join(s,o),n.joinArc=void 0,a?.busy===s&&(a.busy=null),n.mode=t?"going-home":n.seat?"going-seat":"walking")}else n.mode==="sitting"&&(n.mode="seated",n.seated=!0,r.angle=n.seat.yaw)})}atExit(e,t,n){let s=this.traffic.track.length;return Math.min(Jf(t-e,s),Jf(e-t,s))<Math.max(.045,n*1.5)}};var eh={spring:{title:"Heartwarming",source:"./assets/town/audio/spring.mp3"},summer:{title:"Carefree",source:"./assets/town/audio/summer.mp3"},autumn:{title:"At Rest",source:"./assets/town/audio/autumn.mp3"},winter:{title:"Relaxing Piano Music",source:"./assets/town/audio/winter.mp3"}},Uc=class{constructor(){this.unlocked=!1;let e=()=>{this.unlocked=!0;for(let t of[this.current,this.incoming])t&&(t.blocked=!1);this.latest&&this.update(this.latest.season,this.latest.settings,0)};document.addEventListener("pointerdown",e,{passive:!0}),document.addEventListener("keydown",e),document.addEventListener("visibilitychange",()=>{document.hidden&&(this.current?.audio.pause(),this.incoming?.audio.pause())})}channel(e,t){let n=document.createElement("audio");n.src=eh[e].source,n.preload="auto",n.volume=0,n.dataset.season=e,n.setAttribute("aria-label",`\u5B63\u8282\u97F3\u4E50 ${eh[e].title}`),document.body.append(n);let s={audio:n,season:e,gain:t,failed:!1,blocked:!1,pending:!1};return n.addEventListener("error",()=>{s.failed=!0}),s}update(e,t,n){if(this.latest={season:e,settings:t},!(this.unlocked&&t.music&&!t.muted&&!document.hidden)){this.current?.audio.pause(),this.incoming?.audio.pause(),this.status(!t.music||t.muted?"\u97F3\u4E50\u5DF2\u5173\u95ED":this.unlocked?"\u97F3\u4E50\u5DF2\u6682\u505C":"\u70B9\u51FB\u57CE\u9547\u5F00\u542F\u97F3\u4E50");return}this.current||(this.current=this.channel(e,1)),this.incoming&&this.incoming.season!==e&&(this.incoming.audio.remove(),this.incoming.audio.pause(),this.incoming=void 0);let r=this.current;!this.incoming&&(r.season!==e||r.audio.ended||Number.isFinite(r.audio.duration)&&r.audio.duration-r.audio.currentTime<3)&&(this.incoming=this.channel(e,0));for(let o of[this.current,this.incoming])o&&!o.failed&&!o.blocked&&!o.pending&&o.audio.paused&&!(o===this.current&&o.audio.ended&&this.incoming)&&(o.pending=!0,o.audio.play().catch(()=>{o.blocked=!0}).finally(()=>{o.pending=!1}));if(this.incoming&&!this.incoming.audio.paused&&this.incoming.audio.readyState>=2){let o=n/3;this.incoming.gain=Math.min(1,this.incoming.gain+o),r.gain=Math.max(0,1-this.incoming.gain),this.incoming.gain>=1&&(r.audio.pause(),r.audio.remove(),this.current=this.incoming,this.incoming=void 0)}for(let o of[this.current,this.incoming])o&&(o.audio.volume=Math.max(0,Math.min(1,t.musicVolume*o.gain)));let a=this.incoming||this.current;this.status(a.failed?"\u97F3\u4E50\u6682\u65F6\u65E0\u6CD5\u64AD\u653E":a.audio.paused?"\u70B9\u51FB\u57CE\u9547\u5F00\u542F\u97F3\u4E50":`\u6B63\u5728\u64AD\u653E \xB7 ${eh[a.season].title}`)}status(e){let t=document.getElementById("music-status");t&&t.textContent!==e&&(t.textContent=e)}};var so=new _t,Fc=class{constructor(e,t){this.canvas=e;this.events=t;this.scene=new hr;this.camera=new Kn(-16,16,12,-12,.1,250);this.sun=new es("#fff2d6",3.2);this.ambient=new wr("#dbe9eb","#958c63",1.9);this.world=new we;this.buildings=new we;this.roadGroup=new we;this.overlay=new we;this.forest=new we;this.walkers=[];this.particles=[];this.smoke=new we;this.extras=new we;this.landings=new Map;this.pulseUntil=0;this.modelCache=new Map;this.modelsLoading=new Set;this.buildingMeshes=new Map;this.sceneryModels=new Map;this.seasons=new Lc;this.clockTick=0;this.clockSave=0;this.porchLights=[];this.farms=[];this.music=new Uc;this.signature="";this.roadsSignature="";this.terrainSignature="";this.selection=null;this.raycaster=new za;this.pointer=new re;this.plane=new ln(new L(0,1,0),0);this.painting=!1;this.cursor=new we;this.previewKind=null;this.previewRotation=0;this.previewStage=0;this.previewVariant=0;this.tool="inspect";this.lastTime=0;this.lastFrame=0;this.orbitDirection=0;this.orbitSpeed=0;this.orbitStep=0;this.initialFocus=!0;this.reduced=!1;this.pitchStep=0;this.panStep=new re;this.zoomTarget=1;this.pointerInside=!1;this.thumbnails=new Map;this.running=!0;this.paused=!1;this.fps=0;this.frameCount=0;this.fpsTime=0;this.keyboardMove=new re;this.keyboardApplied=!1;this.renderer=new vc({canvas:e,antialias:!0,alpha:!1,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Ps,this.renderer.outputColorSpace=Ut,this.renderer.toneMapping=Va,this.renderer.toneMappingExposure=1.06,this.scene.background=new be("#d9e0ce"),this.scene.fog=new ga("#d9e0ce",80,160),this.sun.position.set(-18,28,14),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048),Object.assign(this.sun.shadow.camera,{left:-24,right:24,top:24,bottom:-24,near:1,far:90}),this.sun.shadow.normalBias=.032,this.sun.shadow.bias=-4e-4,this.scene.add(this.sun,this.ambient,this.world,this.buildings,this.roadGroup,this.overlay,this.forest,this.smoke,this.cursor,this.extras),this.camera.position.set(30,29,44),this.controls=new wc(this.camera,e),this.controls.target.set(9,0,17),this.controls.enableRotate=!1,this.controls.enableDamping=!0,this.controls.dampingFactor=.12,this.controls.enableZoom=!1,this.controls.minPolarAngle=Math.PI/2-Yf,this.controls.maxPolarAngle=Math.PI/2-$f,this.controls.minZoom=.52,this.controls.maxZoom=3.2,this.controls.screenSpacePanning=!1,this.controls.mouseButtons.LEFT=xn.PAN,this.controls.mouseButtons.RIGHT=xn.PAN,this.controls.update(),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(e),e.addEventListener("contextmenu",n=>{n.preventDefault(),this.tool!=="inspect"&&this.events.cancel()}),e.addEventListener("pointerdown",n=>this.down(n)),e.addEventListener("pointermove",n=>this.move(n)),e.addEventListener("pointerup",n=>this.up(n)),e.addEventListener("pointercancel",()=>this.endStroke()),e.addEventListener("wheel",n=>this.wheel(n),{passive:!1}),e.addEventListener("pointerleave",()=>{this.pointerInside=!1,this.painting||(this.cursor.visible=!1,this.events.hover(null))}),document.addEventListener("visibilitychange",()=>{this.paused=document.hidden,this.lastTime=performance.now(),this.paused&&this.stopGesture()}),window.addEventListener("blur",()=>this.stopGesture()),e.addEventListener("webglcontextlost",n=>{n.preventDefault(),this.running=!1,document.getElementById("graphics-error")?.classList.remove("hidden")}),e.addEventListener("webglcontextrestored",()=>{this.running=!0,requestAnimationFrame(n=>this.frame(n)),document.getElementById("graphics-error")?.classList.add("hidden")}),this.resize(),requestAnimationFrame(n=>this.frame(n)),Promise.allSettled(["tree-0","pine","birch","rock","boulder","cart","hedge","fountain","stall"].map(async n=>{let s=await new no().loadAsync(`./assets/town/curated/${n}.glb`);s.scene.traverse(r=>{r instanceof Ne&&(r.castShadow=!0,r.receiveShadow=!0)}),this.sceneryModels.set(n,s.scene)})).then(()=>{this.board&&this.state&&this.buildTerrain()})}resize(){let e=this.canvas.getBoundingClientRect(),t=e.width/Math.max(1,e.height),n=t<1?16:13;this.camera.left=-n*t,this.camera.right=n*t,this.camera.top=n,this.camera.bottom=-n,this.camera.updateProjectionMatrix(),this.renderer.setSize(e.width,e.height,!1)}setTool(e,t,n,s=this.previewStage,r=this.previewVariant){if(this.tool=e,this.previewKind=t,this.previewRotation=n,this.previewStage=s,this.previewVariant=r,this.canvas.dataset.previewRotation=String(n),this.controls.mouseButtons.LEFT=e==="inspect"||e==="move"&&!t?xn.PAN:null,this.controls.mouseButtons.RIGHT=e==="inspect"?xn.PAN:null,this.controls.mouseButtons.MIDDLE=xn.PAN,this.canvas.style.cursor=e==="inspect"?"grab":"crosshair",this.grid&&(this.grid.visible=e!=="inspect"),this.ghost&&(this.ghost.traverse(a=>{a instanceof Ne&&a.material.dispose()}),this.cursor.remove(this.ghost),this.ghost=void 0),t&&(this.ghost=this.model(t,r,s).clone(),this.ghost.traverse(a=>{a instanceof Ne&&(a.material=a.material.clone(),Object.assign(a.material,{transparent:!0,opacity:.82,depthWrite:!0}),a.castShadow=!1)}),this.cursor.add(this.ghost),this.ghost.rotation.y=-n*Math.PI/2),this.cursorCell)this.showCursor(this.cursorCell),this.cursor.visible=t!==null;else if(t&&this.board){let a=this.controls.target;this.cursorCell={x:Math.max(0,Math.floor(a.x)),z:Math.max(0,Math.floor(a.z))},this.showCursor(this.cursorCell),this.cursor.visible=!0}}setPreviewValid(e){this.cursor.traverse(t=>{t instanceof $n&&t.material.color.set(e?"#467b57":"#d86d55")}),this.ghost?.traverse(t=>{if(t instanceof Ne){let n=t.material;n.emissive.set(e?"#16371e":"#ae3020"),n.emissiveIntensity=e?.1:.35}})}setWorld(e,t,n){this.state=e,this.board=t,this.evaluation=n,this.reduced=e.settings.reducedMotion||matchMedia("(prefers-reduced-motion: reduce)").matches,this.farms=t===e.town?Zr(t,n,e.farm):[];let s=`${t.size}:${t.terrain}:${e.chapterStars.map(o=>o>0).join()}`;s!==this.terrainSignature&&(this.terrainSignature=s,this.buildTerrain());let r=JSON.stringify(t.buildings)+e.chapterStars.join()+e.projects.map(o=>`${o.id}:${us(ds(o.tokens)).index}`).join();if(r!==this.signature){this.signature=r,this.buildings.clear(),this.buildingMeshes.clear(),this.porchLights=[];for(let o of t.buildings.filter(c=>c.placed)){let c=e.projects.find(f=>f.id===o.projectId),l=c?us(ds(c.tokens)).index:0,u=this.model(o.kind,o.variant%4,l).clone(),d=jt(o);if(u.position.set(o.x+d.w/2,.04,o.z+d.d/2),u.rotation.y=-o.rotation*Math.PI/2,u.userData.buildingId=o.id,u.traverse(f=>{f.userData.buildingId=o.id}),this.buildings.add(u),this.buildingMeshes.set(o.id,u),o.kind==="house"&&this.porchLights.length<3){let f=new Rs("#ffc47c",0,2.7,2);f.position.set(.52,.87,1.04),u.add(f),this.porchLights.push(f)}}this.seasons.install(this.buildings),this.buildExtras()}let a=e.mode+t.terrain+JSON.stringify(t.buildings.map(o=>[o.id,o.kind,o.x,o.z,o.rotation,o.placed]))+t.roads.join("|")+Array.from(n.connectedRoads).join("|");a!==this.roadsSignature&&(this.roadsSignature=a,this.buildRoads(),this.buildWalkers()),this.drawSelection(),this.renderer.setPixelRatio(e.settings.quality==="low"?1:Math.min(Math.max(devicePixelRatio,e.settings.quality==="high"?1.5:1.25),e.settings.quality==="high"?2.5:2)),this.renderer.shadowMap.enabled=e.settings.quality!=="low",this.initialFocus&&(this.initialFocus=!1,this.focus(t.terrain==="valley"?{x:6,z:17}:{x:6,z:6}))}model(e,t,n){let s=`${e}-${e==="workshop"?n:t}`;if(this.modelCache.has(s)||this.modelCache.set(s,gi(ag(e,t,n))),!this.modelsLoading.has(s)){this.modelsLoading.add(s);let r=null;new no().load(`./assets/town/${r?"curated/"+r:"models/"+s}.glb`,a=>{a.scene.traverse(o=>{o instanceof Ne&&(o.castShadow=!0,o.receiveShadow=!0)}),this.thumbnails.delete(`${e}-${t}-${n}`),this.modelCache.set(s,a.scene),this.signature="",this.state&&this.board&&this.evaluation&&this.setWorld(this.state,this.board,this.evaluation),this.previewKind===e&&this.previewStage===n&&this.previewVariant===t&&this.setTool(this.tool,this.previewKind,this.previewRotation,n,t),this.events.assetsReady?.()},void 0,()=>{})}return this.modelCache.get(s)}thumbnail(e,t=0,n=0){let s=`${e}-${t}-${n}`,r=this.thumbnails.get(s);if(r)return r;let a=new hr;a.background=null,a.add(new wr("#fff5d9","#7b805e",3));let o=new es("#fff4df",3);o.position.set(-3,6,5),a.add(o);let c=this.model(e,t,n).clone();a.add(c);let l=e==="mill"?3.8:e==="clock"?4.2:e==="workshop"&&n>0?3.6:2.4,u=Math.max(it[e].w,it[e].d,l)*.7,d=new Kn(-u,u,u,-u,.1,40);d.position.set(5,5,7),d.lookAt(0,l*.42,0);let f=384,h=new en(f,f);h.samples=4;let p=this.renderer.getRenderTarget();this.renderer.setRenderTarget(h),this.renderer.setClearColor("#ffffff",0),this.renderer.render(a,d);let x=new Uint8Array(f*f*4);this.renderer.readRenderTargetPixels(h,0,0,f,f,x),this.renderer.setRenderTarget(p),h.dispose();let g=document.createElement("canvas");g.width=f,g.height=f;let m=g.getContext("2d"),b=m.createImageData(f,f);for(let _=0;_<f;_++)b.data.set(x.subarray((f-1-_)*f*4,(f-_)*f*4),_*f*4);m.putImageData(b,0,0);let A=g.toDataURL();return this.thumbnails.set(s,A),A}buildTerrain(){let e=this.board,t=e.size;this.clearTransient(this.world),this.clearTransient(this.forest);let n=og(e,this.state,this.sceneryModels);this.world.add(n.world),this.forest.add(n.forest),this.animateLandscape=n.update,this.seasons.install(this.world),this.seasons.install(this.forest),this.snow&&(this.scene.remove(this.snow),this.snow.geometry.dispose(),this.snow.material.dispose());let s=[];for(let a=0;a<160;a++)s.push(a*7.319%t,a*1.771%8,a*11.931%t);this.snow=new As(new ft().setAttribute("position",new et(s,3)),new Zi({color:"#e6edf1",size:.045,transparent:!0,opacity:0,depthWrite:!1})),this.scene.add(this.snow);let r=[];for(let a=0;a<=t;a++)r.push(0,.037,a,t,.037,a);for(let a=0;a<=t;a++)r.push(a,.037,0,a,.037,t);this.grid=new ws(new ft().setAttribute("position",new et(r,3)),new Ci({color:"#536c51",transparent:!0,opacity:.16})),this.grid.visible=this.tool!=="inspect",this.world.add(this.grid)}buildRoads(){this.clearTransient(this.roadGroup),this.roadGroup.add(hg(this.board,this.evaluation))}buildWalkers(){let e=this.evaluation.connectedRoads,t=[];for(let a of this.board.buildings.filter(o=>o.placed&&this.evaluation.buildings[o.id]?.connected))for(let[o,c]of rg(a.kind).entries()){let l=this.buildingMeshes.get(a.id);l.updateMatrixWorld(!0);let u=l.localToWorld(new L(...c.position)),d=Nt(a);t.push({id:`${a.id}:${o}`,position:{x:u.x,z:u.z},via:{x:d.x+.5,z:d.z+.5},y:u.y,yaw:l.rotation.y+c.yaw})}let n=Math.min(12,Math.max(2,this.evaluation.houses*2)),s=this.board.buildings.filter(a=>a.placed&&a.kind==="house"&&this.evaluation.buildings[a.id]?.connected).map(Qf);if(s.length||s.push(Qf(this.board.buildings.find(a=>a.placed&&a.kind==="hall"))),this.traffic&&this.walkerBoard===this.board){this.traffic.retarget(e),this.life.retarget(s,t);return}for(let a of this.walkers)this.scene.remove(a.group),this.clearTransient(a.group);if(this.walkers=[],this.traffic=void 0,this.life=void 0,this.walkerBoard=this.board,e.size<2)return;this.traffic=new Ic(e,n+Math.min(t.length,3));let r=new Map;t.slice(0,Math.min(t.length,3,this.traffic.people.length-2)).forEach((a,o)=>r.set(this.traffic.people.length-1-o,a)),this.life=new Nc(this.traffic,s,Vi(this.state.worldSeconds,this.state.settings).sleep,r);for(let[a,o]of this.traffic.people.entries()){let c=qf(["#748b9c","#bb976a","#ba8174","#819373","#ac9ab4"][a%5],a),l=new we;l.add(c),l.position.set(o.x,.105,o.z),l.rotation.y=o.angle,this.scene.add(l);let u=["leg-left","leg-right","arm-left","arm-right"].map(h=>c.getObjectByName(h)),d=new we;d.visible=!1,l.add(d),P(d,0,.26,.16,.18,.18,.13,"#ceb981"),P(d,0,.36,.16,.13,.05,.11,"#e0d1ae");let f;r.has(a)&&(f=gi(qf("#a28273",a,!0)),l.add(f)),this.walkers.push({group:l,body:c,cargo:d,seated:f,phase:o.phase,limbs:u})}}select(e){this.selection=e,this.drawSelection()}drawSelection(){if(this.clearTransient(this.overlay),!this.board||!this.evaluation)return;let e=this.board.buildings.find(a=>a.id===this.selection&&a.placed);if(!e)return;let{w:t,d:n}=jt(e);this.outline(this.overlay,e.x,e.z,t,n,"#376844",.22,-.035);let s=Nt(e);this.outline(this.overlay,s.x,s.z,1,1,this.evaluation.buildings[e.id]?.connected?"#5e9070":"#bf805c",.13);let r=it[e.kind];if(r.service||e.kind==="park"){let a=Qr(this.board,this.evaluation,e);if(a.cells.length){let c=e.kind==="park"?"#82b659":r.service==="food"?"#edce87":"#81bcb3",l=new Mn(new Yn(.88,.88),new tn({color:c,transparent:!0,opacity:.38,depthWrite:!1}),a.cells.length);a.cells.forEach((u,d)=>{so.position.set(u.x+.5,.14,u.z+.5),so.rotation.set(-Math.PI/2,0,0),so.updateMatrix(),l.setMatrixAt(d,so.matrix)}),so.rotation.set(0,0,0),this.overlay.add(l)}let o=new Set(a.homes.filter(c=>c.served).map(c=>c.home.id));for(let c of this.board.buildings.filter(l=>l.placed&&l.kind==="house")){let l=this.evaluation.buildings[c.id],u=jt(c),d=e.kind==="park"?l?.green:l?.[r.service];(o.has(c.id)||!d)&&this.outline(this.overlay,c.x,c.z,u.w,u.d,o.has(c.id)?"#376844":"#c47c42",.23,-.035)}}}outline(e,t,n,s,r,a,o=.08,c=.05){let l=[new L(t+c,o,n+c),new L(t+s-c,o,n+c),new L(t+s-c,o,n+r-c),new L(t+c,o,n+r-c)];e.add(new Ts(new ft().setFromPoints(l),new Ci({color:a})))}point(e){let t=this.canvas.getBoundingClientRect();this.pointer.set((e.clientX-t.left)/t.width*2-1,-(e.clientY-t.top)/t.height*2+1),this.raycaster.setFromCamera(this.pointer,this.camera);let n=new L;if(!this.raycaster.ray.intersectPlane(this.plane,n))return null;let s=Math.floor(n.x),r=Math.floor(n.z);return this.board&&s>=0&&r>=0&&s<this.board.size&&r<this.board.size?{x:s,z:r}:null}previewAt(e,t){this.lastPointer={clientX:e,clientY:t};let n=this.canvas.getBoundingClientRect();this.pointerInside=e>=n.left&&e<=n.right&&t>=n.top&&t<=n.bottom;let s=this.point({clientX:e,clientY:t});this.cursor.visible=!!s,this.canvas.dataset.previewCell=s?`${s.x},${s.z}`:"",s&&((s.x!==this.cursorCell?.x||s.z!==this.cursorCell?.z)&&(this.cursorCell=s,this.showCursor(s)),this.events.hover(s))}placeAt(e,t){let n=this.point({clientX:e,clientY:t});n&&this.events.cell(n.x,n.z)}down(e){if(this.focusTarget=void 0,this.pointerDown={x:e.clientX,y:e.clientY,button:e.button},!(e.button!==0||e.shiftKey)&&(this.tool==="road"||this.tool==="erase")){this.painting=!0,this.canvas.setPointerCapture(e.pointerId);let t=this.point(e);t&&(this.events.cell(t.x,t.z),this.lastCell=t)}}move(e){this.lastPointer={clientX:e.clientX,clientY:e.clientY},this.pointerInside=!0;let t=this.point(e);if(this.cursor.visible=!!t&&this.tool!=="inspect"&&!(this.tool==="move"&&!this.previewKind),t&&(this.cursorCell=t,this.showCursor(t)),this.events.hover(t),this.painting&&t&&this.lastCell&&(t.x!==this.lastCell.x||t.z!==this.lastCell.z)){let n=this.lastCell.x,s=this.lastCell.z;for(;n!==t.x;)n+=Math.sign(t.x-n),this.events.cell(n,s);for(;s!==t.z;)s+=Math.sign(t.z-s),this.events.cell(n,s);this.lastCell=t}}up(e){if(this.painting){this.endStroke();return}let t=this.pointerDown;if(this.pointerDown=void 0,!(!t||t.button!==0||Math.hypot(e.clientX-t.x,e.clientY-t.y)>6))if(this.tool==="place"||this.tool==="move"&&this.previewKind){let n=this.point(e);n&&this.events.cell(n.x,n.z)}else{this.point(e);let n=this.raycaster.intersectObjects(this.buildings.children,!0).find(s=>s.object.userData.buildingId);this.events.select(n?.object.userData.buildingId||null)}}endStroke(){this.painting&&this.events.strokeEnd(),this.painting=!1,this.pointerDown=void 0,this.lastCell=void 0}showCursor(e){for(let n of this.cursor.children.filter(s=>s!==this.ghost))this.cursor.remove(n),n instanceof $n&&(n.geometry.dispose(),n.material.dispose());let t=this.previewKind?jt({kind:this.previewKind,rotation:this.previewRotation}):{w:1,d:1};if(this.cursor.position.set(e.x,.03,e.z),this.outline(this.cursor,0,0,t.w,t.d,"#4e805e",.1),this.ghost&&this.previewKind){this.ghost.position.set(t.w/2,.03,t.d/2);let n=Nt(ct("preview",this.previewKind,0,0,this.previewRotation));this.outline(this.cursor,n.x,n.z,1,1,"#a4874f",.11)}}focus(e){let t=e||(this.board?.terrain==="valley"?{x:6,z:17}:{x:6,z:6});this.focusTarget=new L(t.x,0,t.z),this.zoomTarget=this.board?.terrain!=="valley"?1.15:1.45,this.pitchStep=Kf-this.elevation(),this.orbitStep=0,this.panStep.set(0,0)}overview(){this.board&&(this.focusTarget=new L(this.board.size/2,0,this.board.size/2),this.zoomTarget=this.camera.right/this.camera.top<1?.66:.92,this.pitchStep=Kf-this.elevation(),this.orbitStep=0,this.panStep.set(0,0))}rotate(e){this.orbitStep+=e*.16}holdRotate(e){this.orbitDirection=e,this.orbitStep=0,e||(this.orbitSpeed=0)}holdPan(e,t){!e&&!t&&this.keyboardMove.lengthSq()&&!this.keyboardApplied&&this.panKeyboard(.025/this.camera.zoom),(this.keyboardMove.x!==e||this.keyboardMove.y!==t)&&(this.keyboardApplied=!1),this.keyboardMove.set(e,t),(e||t)&&(this.focusTarget=void 0)}panKeyboard(e){let t=new L().setFromMatrixColumn(this.camera.matrix,0);t.y=0,t.normalize();let n=new L().crossVectors(this.camera.up,t).normalize(),s=t.multiplyScalar(this.keyboardMove.x).addScaledVector(n,this.keyboardMove.y).multiplyScalar(e);this.controls.target.add(s),this.camera.position.add(s),this.keyboardApplied=!0}zoom(e){this.zoomTarget=lg(this.zoomTarget*e)}elevation(){let e=this.camera.position.clone().sub(this.controls.target);return Math.atan2(e.y,Math.hypot(e.x,e.z))}stopGesture(){this.orbitStep=0,this.pitchStep=0,this.panStep.set(0,0),this.zoomTarget=this.camera.zoom}wheel(e){if(e.preventDefault(),this.painting)return;this.lastPointer={clientX:e.clientX,clientY:e.clientY},this.pointerInside=!0,this.focusTarget=void 0;let t=cg(e,this.state?.settings.cameraInput||"trackpad",this.canvas.clientHeight);t.kind==="zoom"?this.zoom(Math.exp(t.y)):t.kind==="pan"?this.panStep.add(new re(t.x,t.y)):(this.orbitStep=as.clamp(this.orbitStep+t.x,-.6,.6),this.pitchStep=jf(this.elevation()+this.pitchStep+t.y)-this.elevation())}environment(e,t){if(!this.state)return;let n=this.state;n.settings.clockMode==="cycle"&&(n.worldSeconds+=e);let s=Vi(n.worldSeconds,n.settings),r=1-Math.exp(-e*2);this.music.update(s.season,n.settings,e),this.sun.color.lerp(new be("#9fb9d2").lerp(new be("#fff2d6"),s.daylight).lerp(new be("#ffb879"),s.warmth*.65),r),this.sun.intensity+=(.62+s.daylight*2.88-this.sun.intensity)*r,this.ambient.intensity+=(.75+s.daylight*1.15-this.ambient.intensity)*r,this.ambient.color.lerp(new be("#91add3").lerp(new be("#dbe9eb"),s.daylight),r),this.ambient.groundColor.lerp(new be("#344358").lerp(new be("#958c63"),s.daylight),r),this.porchLights.forEach(l=>{l.intensity+=(2.4*(1-s.daylight)-l.intensity)*r}),document.getElementById("town-ui")?.classList.toggle("night",s.daylight<.35);let a=new be("#34465d").lerp(new be("#d9e0ce"),s.daylight).lerp(new be("#d8b49a"),s.warmth*.35);if(this.scene.background.lerp(a,r),this.scene.fog.color.copy(this.scene.background),this.seasons.update(s.season,e),this.snow){this.snow.visible=this.seasons.snow>.02&&!this.reduced;let l=this.snow.material;l.opacity=this.seasons.snow*.7;let u=this.snow.geometry.getAttribute("position");for(let d=0;d<u.count;d++)u.setY(d,(u.getY(d)-e*.35+8)%8);u.needsUpdate=!0}let o=new Set;for(let[l,u]of this.life?.jobs||[]){let d=this.traffic.people[l],f=this.life.residents[l];f.mode==="working"&&!f.path.length&&Math.hypot(d.x-u.target.x,d.z-u.target.z)<.15&&o.add(u.fieldId)}let c=vh(this.farms,n.farm,e,s.sleep,s.season,o);this.life?.assignJobs(c,(l,u)=>{let d=this.evaluation.connectedRoads;if(!d.size)return[];let f=[...d].map(h=>{let[p,x]=h.split(",").map(Number);return{x:p+.5,z:x+.5}}).sort((h,p)=>Math.hypot(h.x-l.x,h.z-l.z)-Math.hypot(p.x-l.x,p.z-l.z))[0];return Yr(d,f,u)}),this.life?.update(e,s.sleep);for(let l of this.farms){let u=n.farm.runs[l.field.id],d=this.buildingMeshes.get(l.field.id)?.getObjectByName("crop-patch");if(d){let f=u?.phase==="growing"?Math.min(1,u.elapsed/uo(l,"growing",s.season)):u?.phase==="sowing"?.12:u?.phase==="harvesting"?1:.06;d.scale.y=.12+f*.88}if(l.mill){let f=this.buildingMeshes.get(l.mill.id)?.getObjectByName("mill-fan");f&&!this.reduced&&(f.rotation.z+=e*(u?.phase==="milling"&&!s.sleep?1.2:.13))}}for(let l of this.life?.doors||[]){let u=this.buildingMeshes.get(l.id)?.getObjectByName("door-hinge");u&&(u.rotation.y=-l.open*Math.PI*.46)}for(let[l,u]of this.walkers.entries()){let d=this.traffic.people[l],f=this.life.residents[l],h=fg(f.travelled,u.phase,!this.reduced&&f.travelled>1e-4);u.phase=h.phase,u.group.visible=f.visible,u.body.visible=!f.seated,u.seated&&(u.seated.visible=f.seated);let p=.105+h.bob,x=this.life.doors[f.home];x&&["entering","leaving","opening-out"].includes(f.mode)&&(p+=.12*Math.min(1,Math.hypot(d.x-x.outside.x,d.z-x.outside.z)/.5)),u.group.position.set(d.x,f.seated?f.seat.y:p,d.z),u.group.rotation.y=d.angle;let g=this.life.jobs.get(l),m=f.mode==="working";u.cargo.visible=m&&!!g?.carrying,u.cargo.children.forEach(b=>{b instanceof Ne&&(b.material=wt(g?.carrying==="flour"?"#e9dfc1":"#c8a769"))}),u.limbs.forEach((b,A)=>{let _=A>=2&&m&&g?.carrying?-.85:A>=2&&m&&g?.harvesting&&!f.path.length&&!this.reduced?-.45+Math.sin(t*.004+l)*.3:(A<2?h.leg:h.arm)*(A%2?-1:1);b.rotation.x+=(_-b.rotation.x)*(1-Math.exp(-e*16))})}if(t-this.clockTick>1e3){this.clockTick=t;let l=t-this.clockSave>2e4;l&&(this.clockSave=t),this.events.clock?.(n.worldSeconds,l);let u=document.getElementById("world-clock");u&&(u.textContent=s.label),this.updateFarmLabels(s.sleep)}this.canvas.dataset.worldHour=s.hour.toFixed(2),this.canvas.dataset.season=s.season,this.canvas.dataset.residentActivities=JSON.stringify(this.life?.residents.map(l=>l.mode)||[]),this.canvas.dataset.doorAngles=JSON.stringify(this.life?.doors.map(l=>({id:l.id,open:+l.open.toFixed(2)}))||[]),this.canvas.dataset.farm=JSON.stringify(n.farm),this.canvas.dataset.residents=JSON.stringify(this.traffic?.people.map((l,u)=>({id:u,x:+l.x.toFixed(3),z:+l.z.toFixed(3),travelled:+l.totalTravelled.toFixed(3)}))||[])}updateFarmLabels(e){if(this.state){for(let t of["wheat","flour","bread"])document.querySelectorAll(`[data-farm-stock="${t}"]`).forEach(n=>n.textContent=String(this.state.farm[t]));for(let t of this.farms){let n=this.state.farm.runs[t.field.id];document.querySelectorAll("[data-farm-field]").forEach(s=>{s.dataset.farmField===t.field.id&&(s.textContent=t.problem||(e?"\u90BB\u5C45\u4F11\u606F\u4E2D \xB7 \u6E05\u6668\u7EE7\u7EED":n?jr[n.phase]:"\u51C6\u5907\u64AD\u79CD"))})}document.querySelectorAll("[data-bakery-material]").forEach(t=>{t.textContent=fo(t.dataset.bakeryMaterial,this.farms,this.state.farm,e)})}}celebrate(e,t){if(!this.board||this.reduced)return;let n=this.board.buildings.find(r=>r.kind==="hall"),s=t||{x:n.x+1.5,z:n.z+1.5};if(e==="coin"&&(this.pulseUntil=performance.now()+2200),e==="building"&&t)for(let r of this.board.buildings.filter(a=>a.placed&&a.x===Math.floor(t.x)&&a.z===Math.floor(t.z)))this.landings.set(r.id,performance.now());e==="chapter"&&this.zoom(.88);for(let r=0;r<(e==="chapter"?50:e==="coin"?24:14);r++){let a=e==="coin"?new Ri(.09,.09,.04,8):new Un(.065,.065,.065),o=new Ne(a,wt(e==="coin"?"#e7be59":e==="chapter"?["#ddbc77","#8ca579","#b98973"][r%3]:"#c7bd9c"));o.position.set(s.x+(Math.random()-.5)*1.5,e==="coin"?3.5+Math.random()*2:.3,s.z+(Math.random()-.5)),o.castShadow=!0,this.scene.add(o),this.particles.push({mesh:o,velocity:new L((Math.random()-.5)*1.5,e==="coin"?-.8:1+Math.random()*3,(Math.random()-.5)*1.5),life:0,duration:1.7+Math.random()*.7})}this.sound(e==="coin"?740:520)}sound(e){if(!this.state?.settings.muted)try{this.sounds||=new AudioContext,this.sounds.resume();let t=this.sounds.createOscillator(),n=this.sounds.createGain();t.type="sine",t.frequency.setValueAtTime(e,this.sounds.currentTime),n.gain.setValueAtTime(.035,this.sounds.currentTime),n.gain.exponentialRampToValueAtTime(1e-4,this.sounds.currentTime+.25),t.connect(n).connect(this.sounds.destination),t.start(),t.stop(this.sounds.currentTime+.26)}catch{}}frame(e){if(!this.running||(requestAnimationFrame(l=>this.frame(l)),this.paused||e-this.lastFrame<1e3/(this.state?.settings.quality==="low"?30:60)-1))return;let t=Math.min(.06,(e-(this.lastTime||e))/1e3);this.lastTime=e,this.lastFrame=e,this.environment(t,e);let n=this.camera.position.clone(),s=this.controls.target.clone(),r=this.camera.zoom,a=Rc(t,this.reduced);if(this.keyboardMove.lengthSq()&&this.panKeyboard(t*5/this.camera.zoom),this.focusTarget){let l=this.focusTarget.clone().sub(this.controls.target).multiplyScalar(Rc(t,this.reduced,10));this.controls.target.add(l),this.camera.position.add(l),this.focusTarget.distanceToSquared(this.controls.target)<25e-8&&(this.focusTarget=void 0)}this.orbitDirection&&(this.orbitSpeed=as.lerp(this.orbitSpeed,this.orbitDirection*.85,1-Math.exp(-t*12)));let o=this.orbitSpeed*t;if(Math.abs(this.orbitStep)>1e-5){let l=this.orbitStep*a;this.orbitStep-=l,o+=l}else this.orbitStep=0;let c=Math.abs(this.pitchStep)>1e-5?this.pitchStep*a:this.pitchStep;if(this.pitchStep-=c,o||c){let l=this.camera.position.clone().sub(this.controls.target),u=jf(this.elevation()+c),d=new ts(l.length(),Math.PI/2-u,Math.atan2(l.x,l.z)+o);this.camera.position.copy(this.controls.target).add(l.setFromSpherical(d))}if(this.panStep.lengthSq()>1e-4){let l=this.panStep.clone().multiplyScalar(a);this.panStep.sub(l);let u=new L().setFromMatrixColumn(this.camera.matrix,0),d=new L().crossVectors(this.camera.up,u),f=u.multiplyScalar(-l.x*(this.camera.right-this.camera.left)/this.camera.zoom/this.canvas.clientWidth).addScaledVector(d,l.y*(this.camera.top-this.camera.bottom)/this.camera.zoom/this.canvas.clientHeight);this.controls.target.add(f),this.camera.position.add(f)}else this.panStep.set(0,0);if(Math.abs(Math.log(this.zoomTarget/this.camera.zoom))>1e-5?this.camera.zoom*=Math.exp(Math.log(this.zoomTarget/this.camera.zoom)*a):this.camera.zoom=this.zoomTarget,r!==this.camera.zoom&&this.camera.updateProjectionMatrix(),this.controls.dampingFactor=Rc(t,this.reduced,12),this.controls.update(),this.camera.updateMatrixWorld(),this.previewKind&&this.pointerInside&&this.lastPointer&&(n.distanceToSquared(this.camera.position)>1e-8||s.distanceToSquared(this.controls.target)>1e-8||r!==this.camera.zoom)&&this.previewAt(this.lastPointer.clientX,this.lastPointer.clientY),!this.reduced){for(let l of this.board?.buildings||[]){let u=this.buildingMeshes.get(l.id);if(!u)continue;l.kind==="tree"&&(u.rotation.z=Math.sin(e*8e-4+l.x)*.012),l.kind==="workshop"&&u.scale.setScalar(e<this.pulseUntil?1+Math.sin((this.pulseUntil-e)*.012)*.025:1);let d=this.landings.get(l.id);if(d!==void 0){let f=Math.min(1,(e-d)/550);u.position.y=.04+.4*(1-f)**2,u.scale.y=1-.08*Math.sin(f*Math.PI),f===1&&(this.landings.delete(l.id),u.scale.y=1)}}this.animateLandscape?.(e);for(let l of this.particles)l.life+=t,l.velocity.y-=t*2.4,l.mesh.position.addScaledVector(l.velocity,t),l.mesh.rotation.x+=t*3,l.mesh.rotation.z+=t*2,l.mesh.scale.setScalar(Math.max(0,1-Math.max(0,l.life/l.duration-.6)*2.5));if(this.particles=this.particles.filter(l=>l.life<l.duration&&l.mesh.position.y>-.1?!0:(this.scene.remove(l.mesh),l.mesh.geometry.dispose(),!1)),Math.random()<t*2&&this.board){let l=this.board.buildings.find(u=>u.kind==="bakery"&&u.placed);if(l){let u=this.buildingMeshes.get(l.id).localToWorld(new L(-.52,2.16,-.44)),d=new Ne(new li(.06,0),new tn({color:"#e7e7d6",transparent:!0,opacity:.45,depthWrite:!1}));d.position.copy(u),this.smoke.add(d),d.userData.life=0}}for(let l of[...this.smoke.children])l.userData.life+=t,l.position.y+=t*.26,l.position.x+=t*.12,l.scale.setScalar(1+l.userData.life*.6),l.material.opacity=Math.max(0,.45-l.userData.life*.14),l.userData.life>3.2&&(this.smoke.remove(l),l.geometry.dispose(),l.material.dispose())}if(this.renderer.render(this.scene,this.camera),this.canvas.dataset.cameraAngle=String(Math.round(Math.atan2(this.camera.position.x-this.controls.target.x,this.camera.position.z-this.controls.target.z)*1800/Math.PI)/10),this.canvas.dataset.cameraElevation=String(Math.round(this.elevation()*1800/Math.PI)/10),this.canvas.dataset.cameraZoom=this.camera.zoom.toFixed(4),this.canvas.dataset.cameraTarget=`${this.controls.target.x.toFixed(3)},${this.controls.target.z.toFixed(3)}`,this.fpsTime||(this.fpsTime=e),this.frameCount++,e-this.fpsTime>1500){this.fps=Math.round(this.frameCount*1e3/(e-this.fpsTime)),this.frameCount=0,this.fpsTime=e,this.canvas.dataset.fps=String(this.fps),this.canvas.dataset.triangles=String(this.renderer.info.render.triangles),this.canvas.dataset.pixelRatio=String(this.renderer.getPixelRatio()),this.canvas.dataset.drawCalls=String(this.renderer.info.render.calls);let l=1/0;for(let u=0;u<this.walkers.length;u++)for(let d=u+1;d<this.walkers.length;d++)this.walkers[u].group.visible&&this.walkers[d].group.visible&&(l=Math.min(l,Math.hypot(this.walkers[u].group.position.x-this.walkers[d].group.position.x,this.walkers[u].group.position.z-this.walkers[d].group.position.z)));this.canvas.dataset.npcCount=String(this.walkers.length),this.canvas.dataset.npcMinDistance=Number.isFinite(l)?l.toFixed(3):"none",this.canvas.dataset.npcSample=JSON.stringify(this.walkers.slice(0,3).map(u=>({x:+u.group.position.x.toFixed(3),z:+u.group.position.z.toFixed(3),leg:+u.limbs[0].rotation.x.toFixed(3),arm:+u.limbs[2].rotation.x.toFixed(3)}))),this.canvas.dataset.curatedScenery=String(this.sceneryModels.size),this.canvas.dataset.npcTravel=JSON.stringify(this.traffic?.people.map(u=>+u.totalTravelled.toFixed(2))||[])}}clearTransient(e){let t=new Set,n=new Set;e.traverse(s=>{if(s instanceof Ne||s instanceof $n){s.geometry!==Cc&&t.add(s.geometry);for(let r of Array.isArray(s.material)?s.material:[s.material])ig(r)||n.add(r)}}),e.clear();for(let s of t)s.dispose();for(let s of n)s.dispose()}buildExtras(){if(this.clearTransient(this.extras),this.board.terrain!=="valley")return;let e=this.board.buildings.find(s=>s.kind==="hall"),t=this.buildingMeshes.get(e.id),n=new we;n.position.copy(t.position),n.rotation.copy(t.rotation),this.extras.add(n);for(let[s,r]of this.state.chapterStars.entries())if(r){let a=s<3?-1.04+s*.3:.44+(s-3)*.3;P(n,a,.15,1.31,.25,.3,.2,"#a99e83");for(let o=0;o<r;o++){let c=new oi;for(let u=0;u<10;u++){let d=Math.PI/2+u*Math.PI/5,f=u%2?.05:.105;u===0?c.moveTo(Math.cos(d)*f,Math.sin(d)*f):c.lineTo(Math.cos(d)*f,Math.sin(d)*f)}c.closePath();let l=new Ne(new Pi(c,{depth:.03,bevelEnabled:!1}),wt("#d6b467",!0));l.position.set(a,.4+o*.19,1.31),n.add(l)}}}};var AS={Coins:iu,RefreshCw:gu,House:go,Route:_u,Move:pu,ClipboardList:tu,Puzzle:mu,BookOpen:Jc,Settings:yu,X:Cu,ArrowLeft:Kc,ArrowRight:jc,RotateCw:xu,ZoomIn:Ru,ZoomOut:Pu,Focus:ou,Check:Qc,Lock:uu,Star:vu,TreeDeciduous:Mu,Coffee:nu,Wheat:Eu,ArrowUpRight:Zc,Volume2:Tu,VolumeX:Au,Sun:bu,Moon:fu,Sunset:Su,Download:su,Upload:wu,Archive:Yc,MousePointer2:hu,Eraser:ru,Flag:au,Hammer:lu,ChevronRight:eu,Sparkles:xo,MapPin:du,Info:cu},th=new Map;function Et(i){return th.has(i)||th.set(i,$c(AS[i],{width:20,height:20,"stroke-width":1.65,"aria-hidden":"true"}).outerHTML),th.get(i)}var fn=i=>String(i).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),Oc=i=>`<span class="stars" aria-label="${i} \u9897\u661F">${[0,1,2].map(e=>`<span class="${e<i?"earned":""}">${Et("Star")}</span>`).join("")}</span>`,ze=(i,e,t="",n="",s="")=>`<button type="button" data-action="${i}" class="${n}" ${n.includes("icon-only")?`aria-label="${fn(e)}"`:""} ${s}>${t?Et(t):""}<span>${e}</span></button>`,Bc=class{constructor(e,t,n){this.root=e;this.store=t;this.panel=null;this.category="homes";this.selectedId=null;this.tool="inspect";this.pendingKind=null;this.rotation=0;this.hoverCell={x:6,z:17};this.busy=!1;this.toastTimer=0;this.coordinateOpen=!1;this.toastMessage="";this.toastUntil=0;this.progressPanel=0;this.notice="";this.modeChanged=!1;this.heldKeys=new Set;this.heldCameraButton=!1;this.ignoreCameraClickUntil=0;this.e=Vs(t.board),this.scene=new Fc(n,{select:a=>this.select(a),cell:(a,o)=>this.onCell(a,o),hover:a=>this.onHover(a),strokeEnd:()=>this.scene.sound(390),cancel:()=>{this.resetTool(),this.panel=null,this.render()},assetsReady:()=>this.render(),clock:(a,o)=>this.store.clock(a,o)}),t.subscribe(()=>{this.e=Vs(t.board),t.conflict&&(this.notice="\u5DF2\u8F7D\u5165\u53E6\u4E00\u4E2A\u7A97\u53E3\u4FDD\u5B58\u7684\u6700\u65B0\u8FDB\u5EA6\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u64CD\u4F5C",t.conflict=!1,this.resetTool()),this.render()}),e.addEventListener("click",a=>{let o=a.target.closest("[data-action]");o&&!o.disabled&&this.action(o.dataset.action,o)}),e.addEventListener("focusin",a=>{a.target.closest("input,select,textarea,[contenteditable]")&&(this.heldKeys.clear(),this.syncCameraKeys())}),e.addEventListener("change",a=>this.change(a)),e.addEventListener("pointerdown",a=>{let o=a.target.closest("[data-action]");a.button===0&&/^camera-(left|right)$/.test(o?.dataset.action||"")&&(a.preventDefault(),this.heldCameraButton=!0,this.scene.holdRotate(o.dataset.action==="camera-left"?-1:1))});let s=()=>{this.heldCameraButton&&(this.heldCameraButton=!1,this.ignoreCameraClickUntil=Date.now()+400,this.syncCameraKeys())};window.addEventListener("pointerup",s),window.addEventListener("pointercancel",s);let r=null;e.addEventListener("pointerdown",a=>{let o=a.target.closest("[data-action]");a.button===0&&o&&!o.disabled&&/^(buy|place-owned):/.test(o.dataset.action)&&(r={x:a.clientX,y:a.clientY,action:o.dataset.action,started:!1})}),window.addEventListener("pointermove",a=>{r&&(!r.started&&Math.hypot(a.clientX-r.x,a.clientY-r.y)>8&&(r.started=!0,this.action(r.action,document.createElement("button"))),r.started&&(a.preventDefault(),this.scene.previewAt(a.clientX,a.clientY)))}),window.addEventListener("pointerup",a=>{let o=r;r=null,o?.started&&(a.preventDefault(),this.scene.placeAt(a.clientX,a.clientY))}),window.addEventListener("pointercancel",()=>{r=null}),window.addEventListener("keydown",a=>this.keydown(a)),window.addEventListener("keyup",a=>{this.heldKeys.delete(a.key.toLowerCase()),this.syncCameraKeys()}),window.addEventListener("blur",()=>{this.heldKeys.clear(),this.heldCameraButton=!1,this.scene.holdRotate(0),this.scene.holdPan(0,0)}),document.addEventListener("visibilitychange",()=>{document.hidden&&(this.heldKeys.clear(),this.heldCameraButton=!1,this.scene.holdRotate(0),this.scene.holdPan(0,0))}),window.addEventListener("pagehide",()=>this.store.commit(!1)),this.render()}thumbnail(e,t=0,n=0){return`<img class="model-preview" src="${this.scene.thumbnail(e,t,n)}" alt="${it[e].name}" draggable="false"/>`}resetTool(){this.tool="inspect",this.pendingKind=null,this.pendingId=void 0,this.rotation=0,this.coordinateOpen=!1,this.syncCameraKeys(),this.scene.setTool("inspect",null,0)}setTool(e,t=null,n){this.tool=e,this.pendingKind=t,this.pendingId=n,this.syncCameraKeys();let s=n?this.store.board.buildings.find(a=>a.id===n):void 0;this.rotation=s?.rotation||0;let r=s?.projectId?this.store.state.projects.find(a=>a.id===s.projectId):void 0;this.scene.setTool(e,t,this.rotation,r?us(zr(r.tokens).level).index:0,s?.variant||0),(e==="road"||e==="erase")&&(this.panel=null),this.render()}select(e){if(!e){this.selectedId=null,this.scene.select(null),this.panel==="detail"&&(this.panel=null),this.render();return}if(this.selectedId=e,this.scene.select(e),this.tool==="move"){let t=this.store.board.buildings.find(n=>n.id===e);this.setTool("move",t.kind,e),this.panel=null}else this.resetTool(),this.panel="detail";this.render()}onHover(e){e&&(this.hoverCell=e);let t=document.getElementById("placement-status");if(!t||!e)return;let n=this.pendingKind?{id:this.pendingId||"preview",kind:this.pendingKind,x:e.x,z:e.z,rotation:this.rotation,placed:!0,variant:0}:null,s=n?lo(this.store.state,this.store.board,n):null;t.textContent=s||`\u6A2A ${e.x+1} \xB7 \u7EB5 ${e.z+1}${n?" \xB7 \u70B9\u51FB\u653E\u7F6E":" \xB7 \u62D6\u52A8\u94FA\u8DEF"}`,t.classList.toggle("invalid",!!s),this.scene.setPreviewValid(!s)}onCell(e,t){if(this.tool==="road"||this.tool==="erase"){let n=this.store.road(e,t,this.tool==="erase");n?this.toast(n):e===6&&t===17&&this.store.board.terrain==="valley"&&this.e.food>=4&&this.toast("\u9053\u8DEF\u63A5\u901A\u4E86\uFF0C\u9762\u5305\u5DF2\u7ECF\u9001\u5230\u56DB\u6237\u90BB\u5C45\u5BB6")}else if(this.pendingKind){let n=this.pendingId,s=this.store.place(this.pendingKind,e,t,this.rotation,n);if(s){this.toast(s);return}if(this.scene.celebrate("building",{x:e+.5,z:t+.5}),n){let r=this.store.activePuzzle&&this.store.board.buildings.find(a=>a.kind===this.pendingKind&&!a.placed);this.resetTool(),this.panel=null,r&&this.setTool("move",r.kind,r.id)}this.selectedId=null,this.scene.select(null),this.render(),this.toast("\u843D\u6210\u4E86\u3002\u63A5\u4E0A\u95E8\u524D\u7684\u9053\u8DEF\uFF0C\u8BA9\u751F\u6D3B\u5F00\u59CB")}}toolbar(){return`<nav class="town-toolbar" aria-label="\u57CE\u9547\u5DE5\u5177">${ze("inspect","\u6D4F\u89C8","MousePointer2",this.tool==="inspect"&&!this.panel?"active":"")}${ze("build",this.store.activePuzzle?"\u5EFA\u7B51":"\u5EFA\u8BBE","House",this.panel==="build"||this.panel==="inventory"?"active":"")}${ze("road","\u94FA\u8DEF","Route",this.tool==="road"?"active":"")}${ze("move","\u642C\u8FC1","Move",this.tool==="move"?"active":"")}<i class="toolbar-divider"></i>${ze("quests","\u59D4\u6258","ClipboardList",this.panel==="quests"?"active":"")}${ze("puzzles","\u89C4\u5212\u5173","Puzzle",this.panel==="puzzles"?"active":"")}${this.store.activePuzzle?"":ze("production","\u519C\u4E8B","Wheat",this.panel==="production"?"active":"")}${ze("book","\u56FE\u9274","BookOpen",this.panel==="book"?"active":"")}</nav>`}goalHTML(e){return`<ul class="goal-list">${e.map(t=>`<li class="${t.met?"met":""}"><span class="goal-check">${Et(t.met?"Check":"Flag")}</span><span>${t.label}</span><small>${t.need>1?`${Math.min(t.current,t.need)}/${t.need}`:t.met?"\u5B8C\u6210":"\u5F85\u5B8C\u6210"}</small></li>`).join("")}</ul>`}currentGoal(){let e=this.store.puzzle;if(e)return`<aside class="goal-card puzzle-goal"><span class="small-label">${Et("Puzzle")} \u514D\u8D39\u89C4\u5212\u5173</span><h2>${e.title}</h2>${this.goalHTML(Wc(e,this.e))}<div class="goal-meta"><span>\u9053\u8DEF <b>${this.e.roadCount}/${e.roadBudget}</b></span>${Oc(qr(e,this.e))}</div>${ze("claim-puzzle","\u8BC4\u5B9A\u8FD9\u4E2A\u65B9\u6848","Check","primary small",qr(e,this.e)<=(this.store.state.puzzleStars[e.id]||0)?"disabled":"")}<p class="quiet-note">\u4F7F\u7528\u56FA\u5B9A\u5E93\u5B58\uFF0C\u4E0D\u6D88\u8017\u4E3B\u57CE\u91D1\u5E01</p></aside>`;let t=this.store.state.chapterStars.every(a=>a>0),n=_i(this.store.state),s=Gi[n-1],r=co(n,this.e);return`<aside class="goal-card"><div class="chapter-row"><span class="small-label">${Et("Flag")} ${t?"\u81EA\u7531\u53D1\u5C55":`\u7B2C ${n} \u7AE0 / 6`}</span>${ze("quests","\u67E5\u770B\u59D4\u6258","ArrowUpRight","icon-only")}</div><h2>${t?"\u8FD9\u5C31\u662F\u6211\u4EEC\u7684\u6CB3\u8C37":s.title}</h2>${t?"<p>\u7EE7\u7EED\u5EFA\u9020\u3001\u6311\u6218\u4E09\u661F\uFF0C\u7ED9\u6BCF\u4E2A\u9879\u76EE\u7559\u4E00\u4E2A\u597D\u4F4D\u7F6E\u3002</p>":this.goalHTML(r.base)}<div class="chapter-progress">${[1,2,3,4,5,6].map(a=>`<span class="${this.store.state.chapterStars[a-1]?"done":a===n?"current":""}"></span>`).join("")}</div>${!t&&Wr(n,this.e)>this.store.state.chapterStars[n-1]?ze("claim-current","\u5B8C\u6210\u59D4\u6258","Check","primary small"):`<p class="quiet-note">${this.e.population} \u4F4D\u90BB\u5C45 \xB7 ${this.e.food} \u680B\u4F4F\u5B85\u83B7\u5F97\u98DF\u7269</p><p class="goal-hint">${Lu(n,this.store.board,this.e)}</p>`}</aside>`}onboarding(){return this.store.state.tutorialDone||this.store.activePuzzle?"":`<aside class="welcome-card"><button class="welcome-close icon-only" data-action="dismiss-tutorial" aria-label="\u5173\u95ED\u5F15\u5BFC">${Et("X")}</button><span class="small-label">\u7B2C\u4E00\u6B21\u6765\u5230\u6CB3\u8C37</span><h3>\u4E00\u6BB5\u5DE5\u4F5C\uFF0C\u4E00\u70B9\u5C0F\u9547\u7684\u53D8\u5316\u3002</h3><p>token \u6362\u6210\u91D1\u5E01\uFF0C\u91D1\u5E01\u4E70\u6765\u5EFA\u7B51\u3002\u63A5\u597D\u9053\u8DEF\u3001\u7167\u987E\u90BB\u5C45\uFF0C\u518D\u628A\u6CB3\u8C37\u6162\u6162\u53D8\u6210\u4F60\u7684\u6837\u5B50\u3002</p><div class="welcome-steps"><span>${Et("RefreshCw")} \u540C\u6B65</span>${Et("ChevronRight")}<span>${Et("House")} \u5EFA\u8BBE</span>${Et("ChevronRight")}<span>${Et("Flag")} \u89E3\u9501</span></div><div class="welcome-actions">${ze("connect-start",this.e.food>=4?"\u770B\u770B\u7B2C\u4E00\u4EFD\u59D4\u6258":"\u63A5\u901A\u95E8\u524D\u6700\u540E\u4E00\u683C\u8DEF","Route","primary small")}${this.store.state.mode==="live"?ze("demo","\u5148\u73A9\u6F14\u793A","","text-button"):""}</div><small>\u53EF\u968F\u65F6\u79BB\u5F00\uFF0C\u8FDB\u5EA6\u4F1A\u81EA\u52A8\u4FDD\u5B58\u3002</small></aside>`}toolRibbon(){if(this.tool==="inspect")return"";let e={inspect:"\u6D4F\u89C8",road:"\u94FA\u8BBE\u9053\u8DEF",erase:"\u64E6\u9664\u9053\u8DEF",place:"\u653E\u7F6E\u5EFA\u7B51",move:"\u642C\u8FC1\u5EFA\u7B51"};return`<section class="tool-ribbon"><div><b>${this.pendingKind?`${this.pendingId?"\u6446\u653E":"\u5EFA\u8BBE"}${it[this.pendingKind].name}`:e[this.tool]}</b><span id="placement-status">${this.tool==="move"&&!this.pendingKind?"\u5148\u70B9\u51FB\u4F60\u60F3\u642C\u8FC1\u7684\u5EFA\u7B51":"\u79FB\u52A8\u9F20\u6807\u9884\u89C8 \xB7 \u5DE6\u952E\u843D\u5730 \xB7 \u53F3\u952E\u53D6\u6D88"}</span></div>${this.pendingKind?`<small class="rotation-hint">Q / E \xB7 \u671D${["\u5357","\u897F","\u5317","\u4E1C"][this.rotation]}</small>`:""}${this.pendingKind?ze("rotate-preview","\u65CB\u8F6C","RotateCw","ribbon-button"):this.tool==="road"||this.tool==="erase"?ze("toggle-erase",this.tool==="erase"?"\u94FA\u8DEF":"\u64E6\u9664",this.tool==="erase"?"Route":"Eraser","ribbon-button"):""}${ze("coordinates","\u7CBE\u786E\u5B9A\u4F4D","MapPin","ribbon-button")}${ze("inspect","\u5B8C\u6210","Check","ribbon-button")} ${this.coordinateOpen?`<form id="placement-form"><label>\u6A2A\u683C<input name="x" aria-label="\u6A2A\u683C" type="number" min="1" max="${this.store.board.size}" value="${this.hoverCell.x+1}" /></label><label>\u7EB5\u683C<input name="z" aria-label="\u7EB5\u683C" type="number" min="1" max="${this.store.board.size}" value="${this.hoverCell.z+1}" /></label>${ze("place-coordinates",this.pendingKind?"\u5728\u6B64\u653E\u7F6E":this.tool==="erase"?"\u64E6\u9664\u6B64\u683C":"\u94FA\u8BBE\u6B64\u683C","","primary small")}<small>\u5EFA\u7B51\u5DE6\u4E0A\u89D2\u7684\u683C\u5B50\uFF1BQ / E \u65CB\u8F6C\uFF0CEsc \u7ED3\u675F</small></form>`:""}</section>`}header(){let e=this.store.state;return`<header class="town-header"><div class="brand">${Et("House")}<div><h1>Token Town</h1><span>${this.store.activePuzzle?"\u6CB3\u8C37\u89C4\u5212\u684C":"\u4F60\u7684\u6CB3\u8C37\u5C0F\u9547"}</span></div></div><div class="header-actions">${this.store.activePuzzle?ze("leave-puzzle","\u56DE\u5230\u5C0F\u9547","ArrowLeft","back-town"):""}<div class="coin-wallet" aria-label="\u91D1\u5E01\u4F59\u989D">${Et("Coins")}<strong data-testid="coin-balance">${e.coins.toLocaleString("zh-CN")}</strong><span>\u91D1\u5E01</span></div>${ze("sync",this.busy?"\u8BFB\u53D6\u4E2D":e.mode==="demo"?"\u6536\u96C6\u6F14\u793A token":"\u540C\u6B65 token","RefreshCw","sync-button",`aria-label="${this.busy?"\u8BFB\u53D6\u4E2D":e.mode==="demo"?"\u6536\u96C6\u6F14\u793A token":"\u540C\u6B65 token"}" ${this.busy?"disabled":""}`)}${ze("settings","\u8BBE\u7F6E","Settings","icon-only settings-button")}</div></header><div class="mode-indicator">${e.mode==="demo"?'<span class="mode-dot demo-dot"></span>\u6F14\u793A\u57CE\u9547':'<span class="mode-dot"></span>\u672C\u5730\u57CE\u9547'}${ze(e.mode==="demo"?"live":"demo",e.mode==="demo"?"\u5207\u6362\u771F\u5B9E\u8BB0\u5F55":"\u8BD5\u8BD5\u6F14\u793A","","text-button")}${e.history==="ready"?`<span class="last-sync">${e.projects.length} \u4E2A\u9879\u76EE\u4E3A\u8FD9\u91CC\u4F9B\u80FD</span>`:""}<span id="world-clock" class="world-clock">${Vi(e.worldSeconds,e.settings).label}</span></div>`}cameraControls(){return`<div class="camera-controls" aria-label="\u955C\u5934\u63A7\u5236">${ze("camera-left","\u5DE6\u8F6C\u955C\u5934","ArrowLeft","icon-only")}${ze("camera-right","\u53F3\u8F6C\u955C\u5934","ArrowRight","icon-only")}<i></i>${ze("zoom-in","\u653E\u5927","ZoomIn","icon-only")}${ze("zoom-out","\u7F29\u5C0F","ZoomOut","icon-only")}${ze("overview","\u4FEF\u77B0\u6CB3\u8C37","MapPin","icon-only")}${ze("focus","\u56DE\u5230\u5C0F\u9547","Focus","icon-only")}</div><span class="camera-hint">${this.store.state.settings.cameraInput==="trackpad"?"WASD \u79FB\u52A8 \xB7 \u4E24\u6307\u8F6C\u52A8 \xB7 \u634F\u5408\u7F29\u653E":"WASD \u79FB\u52A8 \xB7 \u6EDA\u8F6E\u7F29\u653E \xB7 Q / E \u8F6C\u955C\u5934"}</span>`}render(){let e=this.root.querySelector(".town-panel"),t=e?.getAttribute("aria-label"),n=e?.querySelector(".panel-content")?.scrollTop||0,s=document.activeElement?.dataset.setting,r=this.store.board;this.scene.setWorld(this.store.state,r,this.e),this.root.innerHTML=`${this.header()}${this.currentGoal()}${this.onboarding()}${this.toolbar()}${this.toolRibbon()}${this.cameraControls()}${this.panel?this.panelHTML():""}<div id="town-toast" class="${Date.now()<this.toastUntil?"visible":""}" role="status" aria-live="polite">${Date.now()<this.toastUntil?`${Et("Sparkles")}<span>${fn(this.toastMessage)}</span>`:""}</div>${this.store.persistenceError||this.notice?`<div class="save-notice" role="alert">${fn(this.store.persistenceError||this.notice)}</div>`:""}`,this.scene.select(this.selectedId),this.onHover(this.hoverCell);let a=this.root.querySelector(".town-panel");if(a&&a.getAttribute("aria-label")===t){let o=a.querySelector(".panel-content");o&&(o.scrollTop=n),s&&this.root.querySelector(`[data-setting="${s}"]`)?.focus({preventScroll:!0})}}panelHTML(){let e={build:"\u5EFA\u4E00\u70B9\u65B0\u751F\u6D3B",inventory:"\u5DF2\u7ECF\u5C5E\u4E8E\u4F60\u7684",quests:"\u6CB3\u8C37\u59D4\u6258",puzzles:"\u6CB3\u8C37\u89C4\u5212\u684C",book:"\u5C0F\u9547\u56FE\u9274",production:"\u4ECE\u9EA6\u7530\u5230\u9910\u684C",settings:"\u5C0F\u9547\u8BBE\u7F6E",detail:"\u5EFA\u7B51\u8BE6\u60C5",history:"\u8BA9\u5DE5\u4F5C\u70B9\u4EAE\u6CB3\u8C37"},t="";return this.panel==="build"?t=this.buildPanel():this.panel==="inventory"?t=this.inventoryPanel():this.panel==="quests"?t=this.questPanel():this.panel==="puzzles"?t=this.puzzlePanel():this.panel==="book"?t=this.bookPanel():this.panel==="production"?t=this.productionPanel():this.panel==="settings"?t=this.settingsPanel():this.panel==="detail"?t=this.detailPanel():t=`<div class="empty-records">${Et("RefreshCw")}<h3>${this.notice?"\u8FD9\u6B21\u8FD8\u6CA1\u6709\u8BFB\u5230\u8BB0\u5F55":"\u8FD8\u6CA1\u627E\u5230\u672C\u5730 token \u5386\u53F2"}</h3><p>\u8D77\u6B65\u5EFA\u7B51\u548C\u89C4\u5212\u5173\u90FD\u80FD\u7EE7\u7EED\u73A9\u3002\u6709 Claude Code \u6216 Codex \u7684\u672C\u5730\u4F7F\u7528\u8BB0\u5F55\u65F6\uFF0C\u518D\u540C\u6B65\u5230\u8FD9\u5EA7\u57CE\u9547\u3002</p>${ze("sync","\u91CD\u65B0\u8BFB\u53D6\u672C\u5730\u8BB0\u5F55","RefreshCw","primary")}${ze("demo","\u8FDB\u5165\u72EC\u7ACB\u6F14\u793A\u57CE\u9547","Puzzle","secondary")}<small>\u6F14\u793A\u91D1\u5E01\u4E0E\u771F\u5B9E\u5B58\u6863\u5206\u5F00\u4FDD\u5B58\u3002</small></div>`,`<aside class="town-panel ${this.panel==="settings"?"settings-panel":""}" aria-label="${e[this.panel]}"><div class="panel-heading"><div><span class="small-label">${this.store.activePuzzle?"\u89C4\u5212\u5173":"\u6CB3\u8C37\u5C0F\u9547"}</span><h2>${e[this.panel]}</h2></div>${ze("close-panel","\u5173\u95ED\u9762\u677F","X","icon-only")}</div><div class="panel-content">${t}</div></aside>`}buildPanel(){return`<div class="panel-tabs">${[["homes","\u4F4F\u5B85"],["production","\u519C\u4E8B"],["services","\u670D\u52A1"],["landmarks","\u5730\u6807"],["decor","\u88C5\u9970"]].map(([e,t])=>ze(`category:${e}`,t,"",this.category===e?"active":"")).join("")}</div><p class="panel-note">\u70B9\u51FB\u5EFA\u7B51\uFF0C\u6A21\u578B\u4F1A\u8DDF\u968F\u9F20\u6807\uFF1B\u4E5F\u53EF\u4EE5\u76F4\u63A5\u62D6\u5230\u7A7A\u5730\u3002\u5DE6\u952E\u653E\u7F6E\uFF0CQ / E \u65CB\u8F6C\uFF0C\u53F3\u952E\u53D6\u6D88\u3002</p><div class="catalog-grid">${Object.values(it).filter(e=>e.category===this.category&&e.kind!=="hall"&&e.kind!=="workshop").map(e=>{let t=this.store.unlockedKind(e.kind),n=Pn.find(s=>s.reward===e.kind);return`<button data-action="buy:${e.kind}" class="catalog-item ${t?"":"locked"} ${this.pendingKind===e.kind&&!this.pendingId?"selected":""}" ${t?"":"disabled"}>${this.thumbnail(e.kind)}<b>${e.name}</b><span class="catalog-price">${Et(t?"Coins":"Lock")}${t?e.cost:n?`\u89C4\u5212\u5173 ${Pn.indexOf(n)+1}`:`\u7B2C ${e.chapter} \u7AE0`}</span><small>${e.w} \xD7 ${e.d} \u683C${e.service?` \xB7 ${e.capacity} \u6237`:""}</small></button>`}).join("")}</div>${ze("inventory",`\u5DF2\u6536\u7EB3 ${this.store.board.buildings.filter(e=>!e.placed).length} \u680B \xB7 \u514D\u8D39\u6446\u653E`,"Archive","inventory-link")}`}inventoryPanel(){let e=this.store.board,t=e.buildings.filter(s=>!s.placed),n=Array.from(new Set(t.map(s=>s.kind)));return`<p class="panel-note">${this.store.activePuzzle?"\u672C\u5173\u6240\u6709\u5EFA\u7B51\u5DF2\u7ECF\u51C6\u5907\u597D\u3002\u81EA\u7531\u6446\u653E\u3001\u642C\u8FC1\uFF1B\u94FA\u8DEF\u4E5F\u514D\u8D39\u3002":"\u6536\u7EB3\u53EA\u662F\u628A\u5EFA\u7B51\u6682\u65F6\u653E\u56DE\u4ED3\u5E93\u3002\u5DF2\u6709\u5EFA\u7B51\u53EF\u4EE5\u514D\u8D39\u518D\u6B21\u6446\u653E\u3002"}</p>${n.length?`<div class="inventory-list">${n.map(s=>{let r=t.filter(c=>c.kind===s),a=r[0],o=a.projectId?this.store.state.projects.find(c=>c.id===a.projectId):void 0;return`<button data-action="place-owned:${a.id}" class="inventory-row">${this.thumbnail(s,a.variant,o?us(zr(o.tokens).level).index:0)}<span><b>${o?fn(o.name):it[s].name}</b><small>${r.length} \u680B\u53EF\u6446\u653E \xB7 \u514D\u8D39</small></span>${Et("ArrowUpRight")}</button>`}).join("")}</div>`:`<div class="empty-state">${Et("Archive")}<p>\u73B0\u5728\u6CA1\u6709\u6536\u7EB3\u7684\u5EFA\u7B51\u3002</p><small>\u70B9\u51FB\u57CE\u9547\u4E2D\u7684\u5EFA\u7B51\uFF0C\u5373\u53EF\u514D\u8D39\u642C\u8FC1\u6216\u6536\u7EB3\u3002</small></div>`}${this.store.activePuzzle?`<div class="puzzle-help"><h3>\u518D\u4E89\u53D6\u4E24\u9897\u661F</h3>${this.goalHTML(Xc(this.store.puzzle,this.e))}<h3>\u89C4\u5212\u63D0\u793A</h3><p>\u5EFA\u7B51\u95E8\u53E3\u7684\u9AD8\u4EAE\u683C\u8981\u63A5\u4E0A\u9053\u8DEF\u3002\u9547\u516C\u6240\u662F\u9053\u8DEF\u8D77\u70B9\uFF0C\u98DF\u7269\u4E0E\u4F11\u95F2\u670D\u52A1\u6CBF\u9053\u8DEF\u4F20\u9012\u3002</p>${ze("puzzle-hint","\u7ED9\u6211\u4E00\u70B9\u63D0\u793A","Info","secondary")}${ze("restart-puzzle","\u91CD\u65B0\u5E03\u7F6E\u8FD9\u4E00\u5173","RotateCw","text-button")}</div>`:ze("build","\u770B\u770B\u65B0\u7684\u5EFA\u7B51","House","secondary")}`}questPanel(){let e=_i(this.store.state),t=this.progressPanel||e,n=Gi[t-1],s=co(t,this.e),r=Wr(t,this.e),a=this.store.state.chapterStars[t-1];return this.store.activePuzzle?this.puzzlePanel():`<div class="chapter-selector">${Gi.map(o=>ze(`chapter:${o.id}`,String(o.id),"",o.id===t?"active":"",o.id>e?"disabled":"")).join("")}</div><div class="chapter-title"><h3>${n.title}</h3>${Oc(a)}</div><p class="story">${n.story}</p><h4>\u8FD9\u4E00\u7AE0\u7684\u76EE\u6807</h4>${this.goalHTML(s.base)}${this.coverageAudit(t)}<h4>\u518D\u597D\u4E00\u70B9</h4>${this.goalHTML(s.bonus)}<div class="reward-line">${Et("Sparkles")}<span>${n.reward}<small>\u9996\u6B21\u5B8C\u6210\u8865\u8D34 ${n.subsidy} \u91D1\u5E01</small><small>\u989D\u5916\u661F\u7EA7\uFF1A\u89E3\u9501${it[Gr[t-1]].name}\u914D\u8272\uFF0C\u8363\u8A89\u82B1\u56ED\u4EAE\u8D77\u7EAA\u5FF5\u661F</small></span></div>${ze(`claim-chapter:${t-1}`,r>a?"\u5B8C\u6210\u76EE\u6807\u5E76\u9886\u53D6\u5956\u52B1":a?"\u5DF2\u8BB0\u5F55\u8FD9\u4EFD\u6210\u679C":"\u5148\u8BA9\u76EE\u6807\u4EAE\u8D77\u6765","Check","primary",r<=a?"disabled":"")}<p class="panel-note">\u5DF2\u83B7\u5F97\u7684\u661F\u7EA7\u4E0D\u4F1A\u6D88\u5931\u3002\u91D1\u5E01\u8865\u8D34\u6700\u591A\u4E3A token \u91D1\u5E01\u7684 20%\uFF0C\u672A\u7ED3\u7B97\u90E8\u5206\u4F1A\u5728\u540E\u7EED\u540C\u6B65\u65F6\u8865\u53D1\u3002</p>`}puzzlePanel(){return`<p class="panel-note">\u4E09\u4E94\u5206\u949F\uFF0C\u4E00\u9053\u5C0F\u5C0F\u7684\u89C4\u5212\u9898\u3002\u56FA\u5B9A\u5E93\u5B58\uFF0C\u4E0D\u6D88\u8017\u91D1\u5E01\uFF0C\u4E5F\u4E0D\u7528\u7B49\u5F85 token\u3002</p><div class="puzzle-list">${Pn.map((e,t)=>`<button data-action="puzzle:${e.id}" class="puzzle-row"><span class="puzzle-number">${t+1}</span><span class="puzzle-copy"><small>${e.family}</small><b>${e.title}</b><span>${e.description}</span>${Oc(this.store.state.puzzleStars[e.id]||0)}</span>${Et("ChevronRight")}</button>`).join("")}</div><div class="reward-explanation">${Et("Sparkles")}<p>\u9996\u6B21\u901A\u5173\u89E3\u9501\u88C5\u9970\u84DD\u56FE\uFF0C\u4E09\u661F\u89E3\u9501\u65B0\u914D\u8272\u3002\u84DD\u56FE\u5E26\u56DE\u4E3B\u57CE\uFF0C\u7528\u91D1\u5E01\u5EFA\u9020\u3002</p></div>`}bookPanel(){let e=this.store.state;return`<section class="book-section"><h3>\u9879\u76EE\u5DE5\u574A <span>${e.projects.length}</span></h3><p class="panel-note">\u6BCF\u4E2A\u9879\u76EE\u90FD\u80FD\u6210\u4E3A\u4E00\u680B\u5EFA\u7B51\u3002\u5DE5\u574A\u968F token \u6210\u957F\uFF0C\u4E0D\u989D\u5916\u589E\u52A0\u94F8\u5E01\u500D\u7387\u3002</p>${e.projects.length?e.projects.map(t=>{let n=zr(t.tokens),s=e.town.buildings.find(r=>r.projectId===t.id);return`<article class="project-row">${this.thumbnail("workshop",0,n.stage.index)}<div><b>${fn(t.name)}</b><span class="project-level" style="color:${fh[n.stage.index]}">Lv.${n.level} \xB7 ${Vc[n.stage.index]}</span><small>${Jr(t.tokens)} token \xB7 ${fn(t.provider)}</small><div class="level-progress"><span style="width:${n.progress*100}%"></span></div>${ze(s.placed?`find:${s.id}`:`place-owned:${s.id}`,s.placed?"\u53BB\u770B\u770B":"\u514D\u8D39\u6446\u653E","ArrowUpRight","text-button")}</div></article>`}).join(""):`<div class="empty-state">${Et("House")}<p>\u540C\u6B65 token \u540E\uFF0C\u9879\u76EE\u5DE5\u574A\u4F1A\u6765\u5230\u8FD9\u91CC\u3002</p>${ze("sync",e.mode==="demo"?"\u6536\u96C6\u6F14\u793A token":"\u540C\u6B65 token","RefreshCw","secondary")}</div>`}</section><section class="book-section"><h3>\u89C4\u5212\u6536\u85CF</h3><div class="collection-grid">${Pn.map(t=>`<div class="collection-item ${e.puzzleStars[t.id]?"":"locked"}">${this.thumbnail(t.reward)}<b>${it[t.reward].name}</b><small>${(e.puzzleStars[t.id]||0)>0?(e.puzzleStars[t.id]||0)===3?"\u539F\u8272\u4E0E\u4E09\u661F\u914D\u8272\u5DF2\u89E3\u9501":"\u84DD\u56FE\u5DF2\u89E3\u9501":`\u901A\u5173\u300C${t.title}\u300D`}</small></div>`).join("")}</div></section><section class="book-section"><h3>\u6CB3\u8C37\u8363\u8A89</h3><div class="honor-list">${Gi.map((t,n)=>`<div><span>${t.title}<small class="honor-reward">${it[Gr[n]].name} \xB7 ${e.chapterStars[n]>=2?e.chapterStars[n]===3?"\u5168\u90E8\u7EAA\u5FF5\u914D\u8272\u5DF2\u89E3\u9501":"\u9996\u6B3E\u7EAA\u5FF5\u914D\u8272\u5DF2\u89E3\u9501":"\u989D\u5916\u661F\u7EA7\u89E3\u9501\u914D\u8272"}</small></span>${Oc(e.chapterStars[n])}</div>`).join("")}</div></section>`}coverageAudit(e){let t=this.store.board,n=t.buildings.filter(a=>a.placed&&a.kind==="house"),s=e>=3?["food","green","leisure"]:e>=2?["food","green"]:["food"],r={food:"\u98DF\u7269",green:"\u7EFF\u5730",leisure:"\u4F11\u95F2"};return`<section class="coverage-audit" aria-label="\u670D\u52A1\u4E0E\u76EE\u6807\u8BA1\u7B97"><h4>\u8FDB\u5EA6\u4E3A\u4EC0\u4E48\u6CA1\u589E\u52A0\uFF1F</h4><p class="panel-note">${Lu(e,t,this.e)}</p><div class="coverage-totals"><span>\u5DF2\u6446\u4F4F\u5B85 <b>${n.length}</b></span><span>\u63A5\u901A\u9053\u8DEF <b>${this.e.houses}</b></span><span>\u98DF\u7269\u6EE1\u8DB3 <b>${this.e.food}</b></span><span>\u7EFF\u5730\u6EE1\u8DB3 <b>${this.e.green}</b></span></div><p class="panel-note">\u8FDB\u5EA6\u6570\u7684\u662F\u83B7\u5F97\u670D\u52A1\u7684\u4F4F\u5B85\u3002\u540C\u4E00\u680B\u4F4F\u5B85\u88AB\u591A\u5BB6\u5E97\u6216\u591A\u4E2A\u516C\u56ED\u8986\u76D6\uFF0C\u540C\u4E00\u9879\u9700\u6C42\u4E5F\u53EA\u8BA1\u4E00\u6B21\u3002\u9879\u76EE\u5DE5\u574A\u3001\u5546\u5E97\u90FD\u4E0D\u7B97\u4F4F\u5B85\u3002</p>${ze("build-homes","\u5EFA\u4F4F\u5B85","House","secondary small")}<details><summary>\u9010\u680B\u67E5\u770B\u4F4F\u5B85\u9700\u6C42 \xB7 \u70B9\u51FB\u5B9A\u4F4D</summary><div class="coverage-homes">${n.map(a=>`<button data-action="find:${fn(a.id)}" class="coverage-home"><b>${_o(a)}</b>${s.map(o=>`<span class="${this.e.buildings[a.id]?.[o]?"met":"missing"}">${r[o]}\uFF1A${Iu(t,this.e,a,o)}</span>`).join("")}</button>`).join("")}</div></details><details><summary>\u67E5\u770B\u6BCF\u4E2A\u670D\u52A1\u8BBE\u65BD \xB7 \u70B9\u51FB\u770B\u8303\u56F4</summary><div class="coverage-homes">${t.buildings.filter(a=>a.placed&&(it[a.kind].service||a.kind==="park")).map(a=>{let o=it[a.kind],c=Qr(t,this.e,a),l=c.homes.filter(u=>u.served).length;return`<button data-action="find:${fn(a.id)}" class="coverage-home"><b>${_o(a)}</b><span class="${c.active?"met":"missing"}">${c.active?`\u5DF2\u670D\u52A1 ${l}${o.capacity?`/${o.capacity}`:""} \u680B \xB7 ${a.kind==="park"?"\u8FB9\u7F18\u4E09\u683C":`\u6B65\u884C ${o.range} \u683C`}`:"\u5165\u53E3\u672A\u8FDE\u8DEF\uFF0C\u670D\u52A1\u672A\u751F\u6548"}</span></button>`}).join("")}</div></details></section>`}coveragePanel(e){let t=it[e.kind],n=Qr(this.store.board,this.e,e),s=n.homes.filter(a=>a.served).length,r=n.active?n.homes.filter(a=>a.connected).length:0;return`<div class="service-summary"><span>\u5DF2\u670D\u52A1\u4F4F\u5B85 <b>${s}${t.capacity?`/${t.capacity}`:""} \u680B</b></span><span>\u8303\u56F4\u5185\u8FDE\u8DEF\u4F4F\u5B85 <b>${r} \u680B</b></span><span>${e.kind==="park"?"\u6700\u8FD1\u5360\u5730\u8FB9\u7F18":"\u6700\u8FDC\u9053\u8DEF\u6B65\u884C"} <b>${e.kind==="park"?3:t.range} \u683C</b></span></div><p class="panel-note">${n.active?e.kind==="park"?"\u6D45\u7EFF\u683C\u662F\u516C\u56ED\u4E09\u683C\u8303\u56F4\u3002\u7EFF\u6846\u4F4F\u5B85\u5DF2\u83B7\u5F97\u7EFF\u5730\uFF1B\u6A59\u6846\u4F4F\u5B85\u4ECD\u7F3A\u7EFF\u5730\u3002\u516C\u56ED\u6CA1\u6709\u5BB9\u91CF\u4E0A\u9650\uFF0C\u591A\u5EA7\u8986\u76D6\u540C\u4E00\u680B\u53EA\u8BA1\u4E00\u6B21\u3002":"\u4EAE\u8D77\u7684\u9053\u8DEF\u662F\u5B9E\u9645\u6B65\u884C\u8303\u56F4\u3002\u7EFF\u6846\u7531\u672C\u5E97\u670D\u52A1\uFF1B\u6A59\u6846\u4ECD\u7F3A\u8FD9\u9879\u670D\u52A1\u3002\u591A\u5BB6\u5E97\u670D\u52A1\u540C\u4E00\u680B\u53EA\u8BA1\u4E00\u6B21\u3002":"\u5165\u53E3\u672A\u8FDE\u5230\u9547\u516C\u6240\uFF0C\u5F53\u524D\u670D\u52A1\u6CA1\u6709\u751F\u6548\u3002\u95E8\u53E3\u6A59\u6846\u9700\u8981\u63A5\u4E0A\u9053\u8DEF\u3002"}${n.active&&s===0?"<br>\u5C1A\u672A\u670D\u52A1\u65B0\u4F4F\u5B85\uFF1A\u9644\u8FD1\u6CA1\u6709\u7B26\u5408\u6761\u4EF6\u7684\u4F4F\u5B85\uFF0C\u6216\u5B83\u4EEC\u5DF2\u7531\u5176\u4ED6\u5546\u5E97\u6EE1\u8DB3\u3002":""}</p>${n.homes.length?`<div class="coverage-homes">${n.homes.map(a=>`<button data-action="find:${fn(a.home.id)}" class="coverage-home"><b>${_o(a.home)}</b><span class="${a.served?"met":"missing"}">${a.distance} \u683C \xB7 ${a.served?"\u5DF2\u7531\u672C\u8BBE\u65BD\u670D\u52A1":a.connected?n.active?this.e.buildings[a.home.id][t.service]?"\u5DF2\u7531\u5176\u4ED6\u5546\u5E97\u670D\u52A1\uFF0C\u4E0D\u91CD\u590D\u589E\u52A0\u8FDB\u5EA6":"\u672C\u5E97\u5BB9\u91CF\u5DF2\u6EE1":"\u672C\u8BBE\u65BD\u5165\u53E3\u672A\u8FDE\u8DEF":"\u4F4F\u5B85\u5165\u53E3\u672A\u8FDE\u8DEF"}</span></button>`).join("")}</div>`:""}`}detailPanel(){let e=this.store.board.buildings.find(a=>a.id===this.selectedId);if(!e)return"<p>\u70B9\u51FB\u4E00\u680B\u5EFA\u7B51\uFF0C\u770B\u770B\u5B83\u7684\u751F\u6D3B\u3002</p>";let t=it[e.kind],n=this.e.buildings[e.id],s=this.store.state.projects.find(a=>a.id===e.projectId),r=s?zr(s.tokens):null;return`<div class="detail-model">${this.thumbnail(e.kind,e.variant,r?.stage.index||0)}</div><h3 class="detail-name">${s?fn(s.name):t.name}</h3><p class="story">${s?`${Vc[r.stage.index]} \xB7 Lv.${r.level} / 50`:t.description}</p>${n?`<div class="connection-status ${n.connected?"connected":""}">${Et(n.connected?"Check":"Route")}${n.connected?"\u95E8\u524D\u9053\u8DEF\u5DF2\u63A5\u901A":"\u95E8\u53E3\u9700\u8981\u8FDE\u63A5\u5230\u9547\u516C\u6240\u7684\u9053\u8DEF"}</div>`:""}${e.kind==="house"&&n?`<h4>\u90BB\u5C45\u4EEC\u7684\u751F\u6D3B</h4><div class="needs-list">${[["food","Wheat","\u98DF\u7269"],["green","TreeDeciduous","\u7EFF\u5730"],["leisure","Coffee","\u4F11\u95F2"]].filter(([a])=>a==="food"||a==="green"&&(this.store.activePuzzle||_i(this.store.state)>=2)||a==="leisure"&&(this.store.puzzle?this.store.puzzle.leisureGoal>0:_i(this.store.state)>=3)).map(([a,o,c])=>`<div class="${n[a]?"met":""}">${Et(o)}<span><b>${c}</b><small>${Iu(this.store.board,this.e,e,a)}</small></span>${Et(n[a]?"Check":"Info")}</div>`).join("")}</div>`:""}${["wheatfield","mill","bakery"].includes(e.kind)&&!this.store.activePuzzle?this.productionDetail(e):""}${t.service||e.kind==="park"?this.coveragePanel(e):""}${s?`<div class="project-detail"><div><span>\u7D2F\u8BA1 token</span><b>${Jr(s.tokens)}</b></div><div class="level-progress"><span style="width:${r.progress*100}%"></span></div><p>${r.isMax?"\u8FD9\u680B\u5DE5\u574A\u5DF2\u7ECF\u6210\u4E3A\u6CB3\u8C37\u5730\u6807\u3002":`\u8DDD\u79BB Lv.${r.level+1} \u8FD8\u6709 ${Jr(r.toNext)} token`}</p></div>`:""}<div class="detail-actions">${ze(`move-building:${e.id}`,"\u514D\u8D39\u642C\u8FC1","Move","secondary")}${e.kind!=="bridge"?ze(`rotate-building:${e.id}`,"\u65CB\u8F6C","RotateCw","secondary"):""}${e.kind!=="hall"?ze(`stash:${e.id}`,"\u6536\u7EB3","Archive","secondary"):""}${ze(`recolor:${e.id}`,"\u6362\u4E2A\u914D\u8272","Sparkles","text-button")}</div>`}productionPanel(){let e=this.store.state,t=Zr(e.town,this.e,e.farm),n=Vi(e.worldSeconds,e.settings).sleep;return`<p class="story">\u9EA6\u7530\u3001\u98CE\u8F66\u78E8\u574A\u548C\u9762\u5305\u5E97\u90FD\u63A5\u4E0A\u9053\u8DEF\uFF0C\u90BB\u5C45\u5C31\u4F1A\u4ECE\u64AD\u79CD\u5FD9\u5230\u70D8\u7119\u3002</p><div class="farm-flow"><span>\u9EA6\u7530</span><b>\u2192</b><span>\u98CE\u8F66\u78E8\u574A</span><b>\u2192</b><span>\u9762\u5305\u5E97</span></div><div class="farm-stocks">${[["wheat","\u5C0F\u9EA6"],["flour","\u9762\u7C89"],["bread","\u9762\u5305"]].map(([s,r])=>`<div><span>${r}</span><b data-farm-stock="${s}">${e.farm[s]}</b></div>`).join("")}</div>${t.length?`<div class="farm-list">${t.map(s=>`<button class="farm-row" data-action="find:${fn(s.field.id)}">${this.thumbnail("wheatfield")}<span><b>\u6CB3\u5CB8\u9EA6\u7530</b><small data-farm-field="${fn(s.field.id)}">${s.problem||(n?"\u90BB\u5C45\u4F11\u606F\u4E2D \xB7 \u6E05\u6668\u7EE7\u7EED":e.farm.runs[s.field.id]?jr[e.farm.runs[s.field.id].phase]:"\u51C6\u5907\u64AD\u79CD")}</small></span>${Et("ArrowUpRight")}</button>`).join("")}</div>`:'<div class="empty-state"><p>\u7B2C\u4E00\u5757\u9EA6\u7530\uFF0C\u8FD8\u7B49\u7740\u4F60\u64AD\u79CD\u3002</p><small>\u9EA6\u7530 6 \u91D1\u5E01\uFF0C\u98CE\u8F66\u78E8\u574A 32 \u91D1\u5E01\uFF1B\u73B0\u6709\u9762\u5305\u5E97\u53EF\u4EE5\u76F4\u63A5\u4F7F\u7528\u3002</small></div>'}<p class="panel-note">\u6BCF\u8F6E\u6536\u83B7 2 \u4EFD\u9EA6\u5B50\uFF0C\u78E8\u6210 2 \u4EFD\u9762\u7C89\uFF0C\u70E4\u51FA 4 \u4E2A\u9762\u5305\u3002\u6700\u591A\u4E09\u4F4D\u90BB\u5C45\u52A1\u519C\uFF1B\u591C\u95F4\u6682\u505C\uFF0C\u6E05\u6668\u63A5\u7740\u5E72\u3002\u590F\u5929\u9EA6\u82D7\u957F\u5F97\u66F4\u5FEB\uFF0C\u51AC\u5929\u66F4\u6162\u3002</p>${ze("build-farms","\u5E03\u7F6E\u9EA6\u7530\u4E0E\u78E8\u574A","Wheat","primary")}<p class="panel-note">\u519C\u4E8B\u6536\u83B7\u4FDD\u5B58\u5728\u672C\u5730\uFF0C\u4E0D\u6D88\u8017\u91D1\u5E01\uFF0C\u4E0D\u4EA7\u751F\u989D\u5916\u91D1\u5E01\u3002\u9762\u5305\u5E97\u539F\u6709\u7684\u4F4F\u5B85\u670D\u52A1\u7EE7\u7EED\u6709\u6548\u3002</p>`}productionDetail(e){let t=this.store.state.farm,n=Zr(this.store.state.town,this.e,t),s=n.find(o=>o.field.id===e.id||o.mill?.id===e.id||o.bakery?.id===e.id),r=s&&t.runs[s.field.id],a=s?.problem||(Vi(this.store.state.worldSeconds,this.store.state.settings).sleep?"\u90BB\u5C45\u4F11\u606F\u4E2D \xB7 \u6E05\u6668\u7EE7\u7EED":r?jr[r.phase]:"\u51C6\u5907\u64AD\u79CD");return`<h4>\u9EA6\u7530\u5230\u9910\u684C</h4><div class="production-status">${e.kind==="bakery"?`<span data-bakery-material="${fn(e.id)}">${fo(e.id,n,t,Vi(this.store.state.worldSeconds,this.store.state.settings).sleep)}</span>`:""}${s?`<small data-farm-field="${fn(s.field.id)}">${a}</small>`:"<small>\u5E03\u7F6E\u9EA6\u7530\u4E0E\u98CE\u8F66\u78E8\u574A\uFF0C\u63A5\u901A\u5B83\u4EEC\u95E8\u524D\u7684\u9053\u8DEF\u3002</small>"}</div>${ze("production","\u67E5\u770B\u519C\u4E8B\u6D41\u7A0B","Wheat","text-button")}`}settingsPanel(){let e=this.store.state;return`<h3>\u6CB3\u8C37\u7684\u65F6\u5149</h3><label class="setting-row"><span>\u663C\u591C\u81EA\u52A8\u53D8\u5316</span><input type="checkbox" aria-label="\u663C\u591C\u81EA\u52A8\u53D8\u5316" data-setting="clock" ${e.settings.clockMode==="cycle"?"checked":""} /></label><p class="panel-note">\u516D\u5206\u949F\u8FC7\u4E00\u5929\uFF0C\u6BCF\u4E09\u5929\u6362\u4E00\u5B63\u3002\u665A\u4E0A\u90BB\u5C45\u4F1A\u56DE\u5BB6\u7761\u89C9\uFF0C\u6E05\u6668\u518D\u51FA\u95E8\u3002\u79BB\u5F00\u6E38\u620F\u65F6\uFF0C\u65F6\u95F4\u4F1A\u6682\u505C\u3002</p><div class="lighting-buttons">${[["day","Sun","\u767D\u663C"],["sunset","Sunset","\u508D\u665A"],["night","Moon","\u591C\u665A"]].map(([t,n,s])=>ze(`lighting:${t}`,s,n,e.settings.clockMode==="fixed"&&e.settings.lighting===t?"active":"")).join("")}</div><div class="lighting-buttons">${ze("visit-hour:20","\u770B\u90BB\u5C45\u56DE\u5BB6","Moon")}${ze("visit-hour:6","\u8FCE\u63A5\u6E05\u6668","Sunrise")}</div><label class="setting-row"><span>\u5B63\u8282</span><select aria-label="\u5B63\u8282" data-setting="season">${[["cycle","\u968F\u65F6\u95F4\u53D8\u5316"],["spring","\u6625 \xB7 \u65B0\u82BD"],["summer","\u590F \xB7 \u6D53\u7EFF"],["autumn","\u79CB \xB7 \u91D1\u53F6"],["winter","\u51AC \xB7 \u843D\u96EA"]].map(([t,n])=>`<option value="${t}" ${e.settings.season===t?"selected":""}>${n}</option>`).join("")}</select></label><h3>\u56DB\u5B63\u8F7B\u97F3\u4E50</h3><label class="setting-row"><span>\u80CC\u666F\u97F3\u4E50</span><input type="checkbox" aria-label="\u80CC\u666F\u97F3\u4E50" data-setting="music" ${e.settings.music?"checked":""} /></label><label class="setting-row"><span>\u97F3\u4E50\u97F3\u91CF</span><input type="range" aria-label="\u97F3\u4E50\u97F3\u91CF" data-setting="music-volume" min="0" max="100" step="1" value="${Math.round(e.settings.musicVolume*100)}" /></label><p id="music-status" class="panel-note">\u70B9\u51FB\u57CE\u9547\u5F00\u542F\u97F3\u4E50</p><p class="panel-note">\u6625\u65E5\u94A2\u7434\u3001\u590F\u65E5\u6C11\u8C23\u3001\u79CB\u65E5\u6162\u65CB\u5F8B\u3001\u51AC\u65E5\u8F7B\u94A2\u7434\u3002\u6362\u5B63\u4F1A\u6E10\u53D8\u5207\u6362\u3002</p><p class="music-credit">\u97F3\u4E50\uFF1AKevin MacLeod (incompetech.com) \xB7 <a href="./assets/town/audio/credits.html" target="_blank" rel="noopener">\u66F2\u76EE\u4E0E CC BY 4.0 \u6388\u6743</a></p><label class="setting-row"><span>\u5168\u90E8\u58F0\u97F3</span><input type="checkbox" data-setting="sound" ${e.settings.muted?"":"checked"} /></label><label class="setting-row"><span>\u51CF\u5C11\u52A8\u6001\u6548\u679C</span><input type="checkbox" data-setting="motion" ${e.settings.reducedMotion?"checked":""} /></label><label class="setting-row"><span>\u753B\u9762\u8D28\u91CF</span><select aria-label="\u753B\u9762\u8D28\u91CF" data-setting="quality"><option value="high" ${e.settings.quality==="high"?"selected":""}>\u7CBE\u7EC6 \xB7 Retina \u6E05\u6670\u753B\u9762</option><option value="medium" ${e.settings.quality==="medium"?"selected":""}>\u4E2D\u7B49 \xB7 \u67D4\u548C\u9634\u5F71</option><option value="low" ${e.settings.quality==="low"?"selected":""}>\u8F7B\u91CF \xB7 \u7701\u7535</option></select></label><h3>\u955C\u5934\u64CD\u4F5C</h3><label class="setting-row"><span>\u63A7\u5236\u65B9\u5F0F</span><select aria-label="\u955C\u5934\u63A7\u5236\u65B9\u5F0F" data-setting="camera"><option value="trackpad" ${e.settings.cameraInput==="trackpad"?"selected":""}>\u89E6\u63A7\u677F</option><option value="mouse" ${e.settings.cameraInput==="mouse"?"selected":""}>\u9F20\u6807</option></select></label><p class="panel-note">${e.settings.cameraInput==="trackpad"?"\u4E24\u6307\u4E0A\u4E0B\u6ED1\u6539\u53D8\u4FEF\u4EF0\uFF0C\u5DE6\u53F3\u6ED1\u65CB\u8F6C\uFF1B\u634F\u5408\u7F29\u653E\uFF0CShift + \u4E24\u6307\u6ED1\u52A8\u5E73\u79FB\u3002":"\u62D6\u52A8\u5E73\u79FB\uFF0C\u6EDA\u8F6E\u7F29\u653E\uFF1B\u6309\u4F4F Q / E \u6216\u955C\u5934\u7BAD\u5934\u8FDE\u7EED\u65CB\u8F6C\u3002"} \u70B9\u51FB\u300C\u56DE\u5230\u5C0F\u9547\u300D\u53EF\u6062\u590D\u8212\u9002\u89C6\u89D2\u3002</p><h3>\u4F60\u7684\u8BB0\u5F55</h3><p class="panel-note">${e.mode==="live"?"\u672C\u5730\u57CE\u9547":"\u6F14\u793A\u57CE\u9547"}\u3002\u8BFB\u53D6\u53EA\u5728\u8FD9\u53F0\u7535\u8111\u4E0A\u8FDB\u884C\uFF0C\u65E0\u9700\u8D26\u53F7\u3002</p>${ze(e.mode==="live"?"demo":"live",e.mode==="live"?"\u8FDB\u5165\u72EC\u7ACB\u6F14\u793A\u57CE\u9547":"\u56DE\u5230\u771F\u5B9E\u8BB0\u5F55\u57CE\u9547","RefreshCw","secondary")}<div class="ledger-summary"><div><span>token \u94F8\u5E01</span><b>${e.tokenCoins}</b></div><div><span>\u7ECF\u8425\u8865\u8D34</span><b>${e.subsidyPaid} / ${Xr(e)}</b></div><div><span>\u4E0B\u4E00\u679A\u91D1\u5E01</span><b>${e.residue.toLocaleString()} / 10,000</b></div></div><h3>\u5B58\u6863\u4E0E\u5907\u4EFD</h3><p class="panel-note">\u8FDB\u5EA6\u81EA\u52A8\u4FDD\u5B58\u5728\u5F53\u524D\u6D4F\u89C8\u5668\u3002\u6362\u6D4F\u89C8\u5668\u6216\u8BBE\u5907\u524D\uFF0C\u53EF\u4EE5\u5BFC\u51FA\u5907\u4EFD\u3002\u65E7\u8857\u673A\u7248\u5B58\u6863\u4FDD\u7559\u3002</p><div class="save-actions">${ze("export","\u5BFC\u51FA\u5B58\u6863","Download","secondary")}${ze("import","\u5BFC\u5165\u5B58\u6863","Upload","secondary")}<input id="save-file" type="file" accept="application/json,.json" hidden /></div><h3>\u600E\u4E48\u73A9</h3><p class="panel-note">\u70B9\u51FB\u5EFA\u7B51\u67E5\u770B\u9700\u6C42\uFF1B\u5EFA\u8BBE\u540E\u4E3A\u95E8\u53E3\u63A5\u8DEF\u3002\u94FA\u8DEF\u3001\u642C\u8FC1\u4E0E\u6536\u7EB3\u90FD\u514D\u8D39\u3002\u6309\u4F4F Q / E \u6216\u955C\u5934\u6309\u94AE\u6301\u7EED\u65CB\u8F6C\uFF0C\u677E\u5F00\u505C\u6B62\uFF0C\u6446\u653E\u65F6 Q / E \u65CB\u8F6C\u5EFA\u7B51\uFF0CWASD \u79FB\u52A8\u955C\u5934\uFF0CEsc \u7ED3\u675F\u64CD\u4F5C\u3002</p>${ze("show-tutorial","\u518D\u770B\u4E00\u6B21\u8D77\u6B65\u5F15\u5BFC","Info","text-button")}`}async action(e,t){let[n,s]=e.split(":");switch(n){case"inspect":this.resetTool(),this.panel=null;break;case"build":this.panel=this.store.activePuzzle?"inventory":"build";break;case"build-homes":this.category="homes",this.panel="build";break;case"inventory":this.panel="inventory";break;case"road":this.setTool("road");return;case"move":this.selectedId=null,this.panel=null,this.setTool("move");return;case"toggle-erase":this.setTool(this.tool==="erase"?"road":"erase");return;case"quests":this.panel="quests",this.progressPanel=_i(this.store.state);break;case"puzzles":this.panel="puzzles";break;case"book":this.panel="book";break;case"settings":this.panel="settings";break;case"production":this.panel="production";break;case"build-farms":this.category="production",this.panel="build";break;case"close-panel":this.panel=null;break;case"category":this.category=s;break;case"buy":this.selectedId=null,this.panel=null,this.setTool("place",s);return;case"place-owned":case"move-building":{let r=this.store.board.buildings.find(a=>a.id===s);if(!r){this.toast("\u8BF7\u5148\u56DE\u5230\u4E3B\u57CE\u6446\u653E\u9879\u76EE\u5DE5\u574A");return}this.selectedId=null,this.panel=null,this.setTool("move",r.kind,r.id);return}case"stash":this.store.stash(s),this.selectedId=null,this.panel="inventory",this.toast("\u5DF2\u653E\u56DE\u5E93\u5B58\uFF0C\u968F\u65F6\u53EF\u4EE5\u514D\u8D39\u6446\u56DE\u6765");break;case"rotate-building":{let r=this.store.rotate(s);r&&this.toast(r);break}case"recolor":this.store.recolor(s)||this.toast("\u7EAA\u5FF5\u914D\u8272\u9700\u8981\u5BF9\u5E94\u59D4\u6258\u7684\u989D\u5916\u661F\u7EA7\uFF0C\u89C4\u5212\u88C5\u9970\u9700\u8981\u5BF9\u5E94\u5173\u5361\u4E09\u661F");break;case"rotate-preview":this.pendingKind!=="bridge"&&(this.rotation=(this.rotation+1)%4,this.scene.setTool(this.tool,this.pendingKind,this.rotation));break;case"coordinates":this.coordinateOpen=!this.coordinateOpen;break;case"place-coordinates":{let r=document.getElementById("placement-form"),a=new FormData(r),o=Number(a.get("x"))-1,c=Number(a.get("z"))-1;if(!Number.isInteger(o)||!Number.isInteger(c)||o<0||c<0||o>=this.store.board.size||c>=this.store.board.size){this.toast("\u8BF7\u9009\u62E9\u5730\u56FE\u5185\u7684\u683C\u5B50");return}this.hoverCell={x:o,z:c},this.onCell(o,c);return}case"chapter":this.progressPanel=Number(s);break;case"claim-current":this.claimChapter(_i(this.store.state)-1);return;case"claim-chapter":this.claimChapter(Number(s));return;case"puzzle":this.resetTool(),this.selectedId=null,this.hoverCell={x:1,z:1},this.store.enterPuzzle(s),this.panel="inventory",this.scene.focus({x:6,z:6});break;case"leave-puzzle":this.resetTool(),this.selectedId=null,this.store.leavePuzzle(),this.panel=null,this.scene.focus();break;case"restart-puzzle":this.resetTool(),this.selectedId=null,this.store.restartPuzzle(),this.panel="inventory";break;case"puzzle-hint":this.toast(this.store.puzzle?.solution.terrain==="river"?"\u6865\u4F4D\u5728\u6A2A\u7B2C 7 \u683C\u3002\u6CBF\u4E24\u5CB8\u94FA\u4E00\u6761\u8857\uFF0C\u628A\u9547\u516C\u6240\u95E8\u53E3\u63A5\u8FC7\u6765\u3002":"\u8BD5\u8BD5\u628A\u4F4F\u5B85\u95E8\u53E3\u671D\u5411\u540C\u4E00\u6761\u8857\uFF0C\u5546\u5E97\u9760\u8FD1\u8857\u9053\u4E2D\u95F4\u3002\u516C\u56ED\u4E5F\u8981\u63A5\u4E0A\u8DEF\u3002",6500);return;case"claim-puzzle":{let r=this.store.puzzle,a=this.store.claimPuzzle();if(!a||!r)return;this.scene.celebrate("chapter"),this.toast(a.first?`${a.stars} \u661F\u65B9\u6848\uFF01\u300C${it[r.reward].name}\u300D\u84DD\u56FE\u5DF2\u5E26\u56DE\u4E3B\u57CE`:`${a.stars} \u661F\u65B9\u6848\u5DF2\u8BB0\u5F55${a.stars===3?"\uFF0C\u65B0\u914D\u8272\u4E5F\u89E3\u9501\u4E86":""}`,5e3),this.render();return}case"find":{let r=this.store.board.buildings.find(a=>a.id===s);if(r){let a=jt(r);this.scene.focus({x:r.x+a.w/2,z:r.z+a.d/2}),this.select(s)}return}case"connect-start":this.e.food>=4?this.panel="quests":(this.store.road(6,17),this.scene.celebrate("building",{x:6.5,z:17.5}),this.toast("\u7B2C\u4E00\u6761\u8857\u63A5\u901A\u4E86\uFF01\u56DB\u6237\u90BB\u5C45\u90FD\u80FD\u4E70\u5230\u9762\u5305"));break;case"dismiss-tutorial":this.store.state.tutorialDone=!0,this.store.commit();return;case"show-tutorial":this.store.state.tutorialDone=!1,this.panel=null,this.store.commit();return;case"demo":case"live":this.resetTool(),this.panel=null,this.selectedId=null,this.modeChanged=!0,this.store.setMode(n),this.scene.focus(),this.toast(n==="demo"?"\u8FDB\u5165\u72EC\u7ACB\u6F14\u793A\u57CE\u9547\uFF0C\u70B9\u51FB\u6536\u96C6\u6F14\u793A token \u83B7\u5F97\u5EFA\u8BBE\u8D44\u91D1":"\u56DE\u5230\u4F60\u7684\u672C\u5730\u57CE\u9547");break;case"sync":await this.sync();return;case"camera-left":Date.now()>=this.ignoreCameraClickUntil&&this.scene.rotate(-1);return;case"camera-right":Date.now()>=this.ignoreCameraClickUntil&&this.scene.rotate(1);return;case"zoom-in":this.scene.zoom(1.2);return;case"zoom-out":this.scene.zoom(1/1.2);return;case"focus":this.scene.focus();return;case"overview":this.scene.overview();return;case"visit-hour":this.store.visitHour(Number(s));return;case"lighting":this.store.updateSettings({clockMode:"fixed",lighting:s});return;case"export":{let r=URL.createObjectURL(new Blob([JSON.stringify(this.store.state,null,2)],{type:"application/json"})),a=document.createElement("a");a.href=r,a.download=`token-town-${this.store.state.mode}.json`,a.click(),setTimeout(()=>URL.revokeObjectURL(r),1e3),this.toast("\u5F53\u524D\u57CE\u9547\u5B58\u6863\u5DF2\u5BFC\u51FA");return}case"import":document.getElementById("save-file")?.click();return}this.render()}claimChapter(e){let t=this.store.claimChapter(e);t&&(this.progressPanel=Math.min(6,e+2),this.scene.celebrate("chapter"),this.toast(`${Gi[e].title} \xB7 ${t.stars} \u661F\u6210\u679C\u5DF2\u8BB0\u5F55${t.subsidy?`\uFF0C\u8865\u8D34 +${t.subsidy} \u91D1\u5E01`:"\uFF0C\u7ECF\u8425\u8865\u8D34\u5C06\u5728 token \u989D\u5EA6\u8DB3\u591F\u65F6\u5230\u8D26"}`,5e3),this.render())}async sync(){if(this.busy)return;this.busy=!0,this.modeChanged=!1;let e=this.store.state.mode;this.render();try{let t=e==="demo"?null:await Ph();if(this.modeChanged||this.store.state.mode!==e)return;if(t&&(t.error||t.source==="error")){this.notice="\u8BFB\u53D6\u672C\u5730\u8BB0\u5F55\u5931\u8D25\uFF0C\u8BF7\u786E\u8BA4\u672C\u5730\u670D\u52A1\u6B63\u5728\u8FD0\u884C\u540E\u91CD\u8BD5",this.panel="history";return}if(t&&t.projects.length===0){this.store.state.history="empty",this.store.commit(),this.panel="history",this.notice="";return}let n=e==="demo"?this.store.syncDemo():this.store.sync(t.projects);this.notice="",(n.coins||n.subsidy)&&this.scene.celebrate("coin"),this.toast(n.newTokens?`\u53D1\u73B0 ${Jr(n.newTokens)} \u65B0 token \xB7 +${n.coins} \u91D1\u5E01${n.subsidy?` \xB7 \u8865\u8D34 +${n.subsidy}`:""}${n.newProjects?` \xB7 ${n.newProjects} \u680B\u9879\u76EE\u5DE5\u574A\u5DF2\u5165\u5E93`:""}`:"\u8BB0\u5F55\u5DF2\u7ECF\u540C\u6B65\u8FC7\u4E86\uFF0C\u6CA1\u6709\u91CD\u590D\u53D1\u653E\u91D1\u5E01",5500)}finally{this.busy=!1,this.render()}}change(e){let t=e.target;t.dataset.setting==="clock"&&this.store.updateSettings({clockMode:t.checked?"cycle":"fixed"}),t.dataset.setting==="season"&&this.store.updateSettings({season:t.value}),t.dataset.setting==="music"&&this.store.updateSettings({music:t.checked}),t.dataset.setting==="music-volume"&&this.store.updateSettings({musicVolume:Number(t.value)/100}),t.dataset.setting==="sound"&&this.store.updateSettings({muted:!t.checked}),t.dataset.setting==="motion"&&this.store.updateSettings({reducedMotion:t.checked}),t.dataset.setting==="camera"&&this.store.updateSettings({cameraInput:t.value}),t.dataset.setting==="quality"&&this.store.updateSettings({quality:t.value}),t.id==="save-file"&&t.files?.[0]&&t.files[0].text().then(n=>{this.resetTool(),this.selectedId=null,this.store.importSave(n)?this.toast("\u5B58\u6863\u5DF2\u5BFC\u5165"):this.toast("\u6587\u4EF6\u4E0D\u662F\u5F53\u524D\u6A21\u5F0F\u7684\u6709\u6548\u6CB3\u8C37\u5C0F\u9547\u5B58\u6863\uFF0C\u539F\u8FDB\u5EA6\u5DF2\u4FDD\u7559")})}syncCameraKeys(){this.heldCameraButton||this.scene.holdRotate(this.pendingKind?0:this.heldKeys.has("q")?-1:this.heldKeys.has("e")?1:0);let e=Eh(this.heldKeys);this.scene.holdPan(e.x,e.y)}keydown(e){if(e.target.closest('input, select, textarea, [contenteditable="true"]')||e.isComposing||e.metaKey||e.ctrlKey||e.altKey)return;if(e.key==="Escape"){this.resetTool(),this.panel=null,this.render();return}let t=e.key.toLowerCase(),n=Ah(t,!!this.pendingKind,e.repeat);if(n){if(e.preventDefault(),n==="turn-left"||n==="turn-right"){if(this.pendingKind==="bridge")return;this.rotation=(this.rotation+(n==="turn-left"?3:1))%4,this.scene.setTool(this.tool,this.pendingKind,this.rotation),this.render();return}this.heldKeys.add(t),this.syncCameraKeys()}}toast(e,t=3800){this.toastMessage=e,this.toastUntil=Date.now()+t,clearTimeout(this.toastTimer);let n=document.getElementById("town-toast");n&&(n.innerHTML=`${Et("Sparkles")}<span>${fn(e)}</span>`,n.classList.add("visible"),this.toastTimer=window.setTimeout(()=>document.getElementById("town-toast")?.classList.remove("visible"),t))}};var pg=document.getElementById("town-scene"),mg=document.getElementById("town-ui");if(!(pg instanceof HTMLCanvasElement)||!mg)throw new Error("Token Town: missing town surface");var ES=new URLSearchParams(location.search).get("demo")==="1"||location.hostname.endsWith("github.io");try{let i=new mo(ES?"demo":void 0);new Bc(mg,i,pg),document.getElementById("town-loading")?.remove()}catch(i){let e=document.getElementById("town-loading");e&&(e.innerHTML='<h1>\u6CB3\u8C37\u8FD8\u6CA1\u51C6\u5907\u597D</h1><p>\u8BF7\u4F7F\u7528\u652F\u6301 WebGL 2 \u7684\u6D4F\u89C8\u5668\uFF0C\u5E76\u5F00\u542F\u786C\u4EF6\u52A0\u901F\u3002</p><button onclick="location.reload()">\u91CD\u65B0\u6253\u5F00</button>'),console.error(i)}})();
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
