(this["webpackJsonprandom-pitch-generator"]=this["webpackJsonprandom-pitch-generator"]||[]).push([[0],{63:function(e,n,a){},65:function(e,n,a){},77:function(e,n,a){"use strict";a.r(n);var t=a(6),c=a(0),r=a.n(c),i=a(15),u=a.n(i),m=(a(63),a(1)),s=a.n(m),b=a(9),f=a(17),o=(a(3),a(7)),l=(a(65),a(124));function j(e){return Object(t.jsx)("div",{className:e.classes.slider,children:Object(t.jsx)(l.a,{defaultValue:2,onChange:e.handleChange,"aria-labelledby":"discrete-slider-small-steps",step:1,valueLabelDisplay:"auto",marks:!0,min:1,max:10})})}var y=a(122),d=a(125);function O(e){return Object(t.jsx)("div",{className:"tad-margin",children:Object(t.jsx)(y.a,{select:!0,label:"Select",value:e.value,onChange:e.handleChange,helperText:e.helperText,variant:"outlined",children:e.list.map((function(e){return Object(t.jsx)(d.a,{value:e.name,children:e.displayName?e.displayName:e.name},e.name)}))})})}a(123);var p=a(118);function C(e){return Object(t.jsx)(p.a,{variant:"h3",component:"h3",children:e.text})}var q=a(119);function h(e){var n=Object(c.useState)(!1),a=Object(o.a)(n,2),r=a[0],i=a[1];return Object(t.jsx)("div",{className:"container-box",children:Object(t.jsx)(q.a,{id:"pitch-button",variant:"contained",color:"primary",onClick:function(){i(!r),e.handleClick(r)},children:r?"Pause":"Play"})})}function D(e){return Object(t.jsx)(p.a,{variant:"h4",component:"h4",children:e.text})}function x(e){return Object(t.jsx)("div",{className:e.classes.slider,children:Object(t.jsx)(l.a,{defaultValue:2,onChange:e.handleChange,"aria-labelledby":"discrete-slider-small-steps",step:1,valueLabelDisplay:"auto",marks:!0,min:0,max:10})})}function A(e){return Object(t.jsx)("div",{className:e.classes.slider,children:Object(t.jsx)(l.a,{defaultValue:120,onChange:e.handleChange,"aria-labelledby":"tempo-markings",step:1,min:0,max:400,valueLabelDisplay:"auto"})})}var G,v=a(120),g=a(121),F=a(30),B=new F.a({urls:(G={A1:"a0.mp3",C2:"c1.mp3","D#2":"ds1.mp3","F#2":"fs1.mp3",A2:"a1.mp3",C3:"c2.mp3","D#3":"ds2.mp3","F#3":"fs2.mp3",A3:"a2.mp3",C4:"c3.mp3","D#4":"ds3.mp3","F#4":"fs3.mp3",A4:"a3.mp3",C5:"c4.mp3","D#5":"ds4.mp3","F#5":"fs4.mp3",A5:"a4.mp3"},Object(f.a)(G,"C5","c5.mp3"),Object(f.a)(G,"D#6","ds5.mp3"),Object(f.a)(G,"F#6","fs5.mp3"),Object(f.a)(G,"A6","a5.mp3"),Object(f.a)(G,"C7","c6.mp3"),Object(f.a)(G,"D#7","ds6.mp3"),Object(f.a)(G,"F#7","fs6.mp3"),Object(f.a)(G,"A7","a6.mp3"),G),baseUrl:"https://ledlamp.github.io/piano-sounds/GreatAndSoftPiano/"}).toDestination(),E=[{name:"C"},{name:"C#",displayName:"C#/Db"},{name:"D"},{name:"D#",displayName:"D#/Eb"},{name:"E"},{name:"F"},{name:"F#",displayName:"F#/Gb"},{name:"G"},{name:"G#",displayName:"G#/Ab"},{name:"A"},{name:"A#",displayName:"A#/Bb"},{name:"B"}],I=["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"],L=function(e,n){var a=n.toUpperCase(),t=I.indexOf(a),c=[];return S.find((function(n){return n.name===e})).pattern.forEach((function(e){c.push(I[(t+e)%I.length])})),c},S=[{name:"Chromatic",notesInC:[],pattern:[0,1,2,3,4,5,6,7,8,9,10,11,12],canLimitOctave:!1},{name:"Major",notesInC:[],pattern:[0,2,4,5,7,9,11,12],canLimitOctave:!1},{name:"Natural Minor",notesInC:[],pattern:[0,2,3,5,7,8,10,12],canLimitOctave:!1},{name:"Harmonic Minor",notesInC:[],pattern:[0,2,3,5,7,8,11,12],canLimitOctave:!1},{name:"Major Pentatonic",notesInC:[],pattern:[0,2,4,7,9,12],canLimitOctave:!1},{name:"Minor Pentatonic",notesInC:[],pattern:[0,3,5,7,10,12],canLimitOctave:!1},{name:"Blues Scale",notesInC:[],pattern:[0,3,5,6,7,10,12],canLimitOctave:!1},{name:"Ionian",notesInC:[],pattern:[0,2,4,5,7,9,11,12],canLimitOctave:!1},{name:"Dorian",notesInC:[],pattern:[0,2,3,5,7,9,10,12],canLimitOctave:!1},{name:"Phrygian",notesInC:[],pattern:[0,1,3,5,7,8,10,12],canLimitOctave:!1},{name:"Lydian",notesInC:[],pattern:[0,2,4,6,7,9,11,12],canLimitOctave:!1},{name:"Mixolydian",notesInC:[],pattern:[0,2,4,5,7,9,10,12],canLimitOctave:!1},{name:"Aeolian",notesInC:[],pattern:[0,2,3,5,7,8,10,12],canLimitOctave:!1},{name:"Locrian",notesInC:[],pattern:[0,1,3,5,6,8,10,12],canLimitOctave:!1},{name:"Whole Tone",notesInC:[],pattern:[0,2,4,6,8,10,12],canLimitOctave:!1}],N=["C0","C#0","D0","D#0","E0","F0","F#0","G0","G#0","A0","A#0","B0","C1","C#1","D1","D#1","E1","F1","F#1","G1","G#1","A1","A#1","B1","C2","C#2","D2","D#2","E2","F2","F#2","G2","G#2","A2","A#2","B2","C3","C#3","D3","D#3","E3","F3","F#3","G3","G#3","A3","A#3","B3","C4","C#4","D4","D#4","E4","F4","F#4","G4","G#4","A4","A#4","B4","C5","C#5","D5","D#5","E5","F5","F#5","G5","G#5","A5","A#5","B5","C6","C#6","D6","D#6","E6","F6","F#6","G6","G#6","A6","A#6","B6","C7","C#7","D7","D#7","E7","F7","F#7","G7","G#7","A7","A#7","B7","C8","C#8","D8","D#8","E8","F8","F#8","G8","G#8","A8","A#8","B8"],w=(new Map([["C0",16.35],["C#0",17.32],["Db0",17.32],["D0",18.35],["D#0",19.45],["Eb0",19.45],["E0",20.6],["F0",21.83],["F#0",23.12],["Gb0",23.12],["G0",24.5],["G#0",25.96],["Ab0",25.96],["A0",27.5],["A#0",29.14],["Bb0",29.14],["B0",30.87],["C1",32.7],["C#1",34.65],["Db1",34.65],["D1",36.71],["D#1",38.89],["Eb1",38.89],["E1",41.2],["F1",43.65],["F#1",46.25],["Gb1",46.25],["G1",49],["G#1",51.91],["Ab1",51.91],["A1",55],["A#1",58.27],["Bb1",58.27],["B1",61.74],["C2",65.41],["C#2",69.3],["Db2",69.3],["D2",73.42],["D#2",77.78],["Eb2",77.78],["E2",82.41],["F2",87.31],["F#2",92.5],["Gb2",92.5],["G2",98],["G#2",103.83],["Ab2",103.83],["A2",110],["A#2",116.54],["Bb2",116.54],["B2",123.47],["C3",130.81],["C#3",138.59],["Db3",138.59],["D3",146.83],["D#3",155.56],["Eb3",155.56],["E3",164.81],["F3",174.61],["F#3",185],["Gb3",185],["G3",196],["G#3",207.65],["Ab3",207.65],["A3",220],["A#3",233.08],["Bb3",233.08],["B3",246.94],["C4",261.63],["C#4",277.18],["Db4",277.18],["D4",293.66],["D#4",311.13],["Eb4",311.13],["E4",329.63],["F4",349.23],["F#4",369.99],["Gb4",369.99],["G4",392],["G#4",415.3],["Ab4",415.3],["A4",440],["A#4",466.16],["Bb4",466.16],["B4",493.88],["C5",523.25],["C#5",554.37],["Db5",554.37],["D5",587.33],["D#5",622.25],["Eb5",622.25],["E5",659.25],["F5",698.46],["F#5",739.99],["Gb5",739.99],["G5",783.99],["G#5",830.61],["Ab5",830.61],["A5",880],["A#5",932.33],["Bb5",932.33],["B5",987.77],["C6",1046.5],["C#6",1108.73],["Db6",1108.73],["D6",1174.66],["D#6",1244.51],["Eb6",1244.51],["E6",1318.51],["F6",1396.91],["F#6",1479.98],["Gb6",1479.98],["G6",1567.98],["G#6",1661.22],["Ab6",1661.22],["A6",1760],["A#6",1864.66],["Bb6",1864.66],["B6",1975.53],["C7",2093],["C#7",2217.46],["Db7",2217.46],["D7",2349.32],["D#7",2489.02],["Eb7",2489.02],["E7",2637.02],["F7",2793.83],["F#7",2959.96],["Gb7",2959.96],["G7",3135.96],["G#7",3322.44],["Ab7",3322.44],["A7",3520],["A#7",3729.31],["Bb7",3729.31],["B7",3951.07],["C8",4186.01],["C#8",4434.92],["Db8",4434.92],["D8",4698.63],["D#8",4978.03],["Eb8",4978.03],["E8",5274.04],["F8",5587.65],["F#8",5919.91],["Gb8",5919.91],["G8",6271.93],["G#8",6644.88],["Ab8",6644.88],["A8",7040],["A#8",7458.62],["Bb8",7458.62],["B8",7902.13]]),new Map([[1,{name:"C0",frequency:16.35}],[2,{name:"C#0/Db0",frequency:17.32}],[3,{name:"D0",frequency:18.35}],[4,{name:"D#0/Eb0",frequency:19.45}],[5,{name:"E0",frequency:20.6}],[6,{name:"F0",frequency:21.83}],[7,{name:"F#0/Gb0",frequency:23.12}],[8,{name:"G0",frequency:24.5}],[9,{name:"G#0/Ab0",frequency:25.96}],[10,{name:"A0",frequency:27.5}],[11,{name:"A#0/Bb0",frequency:29.14}],[12,{name:"B0",frequency:30.87}],[13,{name:"C1",frequency:32.7}],[14,{name:"C#1/Db1",frequency:34.65}],[15,{name:"D1",frequency:36.71}],[16,{name:"D#1/Eb1",frequency:38.89}],[17,{name:"E1",frequency:41.2}],[18,{name:"F1",frequency:43.65}],[19,{name:"F#1/Gb1",frequency:46.25}],[20,{name:"G1",frequency:49}],[21,{name:"G#1/Ab1",frequency:51.91}],[22,{name:"A1",frequency:55}],[23,{name:"A#1/Bb1",frequency:58.27}],[24,{name:"B1",frequency:61.74}],[25,{name:"C2",frequency:65.41}],[26,{name:"C#2/Db2",frequency:69.3}],[27,{name:"D2",frequency:73.42}],[28,{name:"D#2/Eb2",frequency:77.78}],[29,{name:"E2",frequency:82.41}],[30,{name:"F2",frequency:87.31}],[31,{name:"F#2/Gb2",frequency:92.5}],[32,{name:"G2",frequency:98}],[33,{name:"G#2/Ab2",frequency:103.83}],[34,{name:"A2",frequency:110}],[35,{name:"A#2/Bb2",frequency:116.54}],[36,{name:"B2",frequency:123.47}],[37,{name:"C3",frequency:130.81}],[38,{name:"C#3/Db3",frequency:138.59}],[39,{name:"D3",frequency:146.83}],[40,{name:"D#3/Eb3",frequency:155.56}],[41,{name:"E3",frequency:164.81}],[42,{name:"F3",frequency:174.61}],[43,{name:"F#3/Gb3",frequency:185}],[44,{name:"G3",frequency:196}],[45,{name:"G#3/Ab3",frequency:207.65}],[46,{name:"A3",frequency:220}],[47,{name:"A#3/Bb3",frequency:233.08}],[48,{name:"B3",frequency:246.94}],[49,{name:"C4",frequency:261.63}],[50,{name:"C#4/Db4",frequency:277.18}],[51,{name:"D4",frequency:293.66}],[52,{name:"D#4/Eb4",frequency:311.13}],[53,{name:"E4",frequency:329.63}],[54,{name:"F4",frequency:349.23}],[55,{name:"F#4/Gb4",frequency:369.99}],[56,{name:"G4",frequency:392}],[57,{name:"G#4/Ab4",frequency:415.3}],[58,{name:"A4",frequency:440}],[59,{name:"A#4/Bb4",frequency:466.16}],[60,{name:"B4",frequency:493.88}],[61,{name:"C5",frequency:523.25}],[62,{name:"C#5/Db5",frequency:554.37}],[63,{name:"D5",frequency:587.33}],[64,{name:"D#5/Eb5",frequency:622.25}],[65,{name:"E5",frequency:659.25}],[66,{name:"F5",frequency:698.46}],[67,{name:"F#5/Gb5",frequency:739.99}],[68,{name:"G5",frequency:783.99}],[69,{name:"G#5/Ab5",frequency:830.61}],[70,{name:"A5",frequency:880}],[71,{name:"A#5/Bb5",frequency:932.33}],[72,{name:"B5",frequency:987.77}],[73,{name:"C6",frequency:1046.5}],[74,{name:"C#6/Db6",frequency:1108.73}],[75,{name:"D6",frequency:1174.66}],[76,{name:"D#6/Eb6",frequency:1244.51}],[77,{name:"E6",frequency:1318.51}],[78,{name:"F6",frequency:1396.91}],[79,{name:"F#6/Gb6",frequency:1479.98}],[80,{name:"G6",frequency:1567.98}],[81,{name:"G#6/Ab6",frequency:1661.22}],[82,{name:"A6",frequency:1760}],[83,{name:"A#6/Bb6",frequency:1864.66}],[84,{name:"B6",frequency:1975.53}],[85,{name:"C7",frequency:2093}],[86,{name:"C#7/Db7",frequency:2217.46}],[87,{name:"D7",frequency:2349.32}],[88,{name:"D#7/Eb7",frequency:2489.02}],[89,{name:"E7",frequency:2637.02}],[90,{name:"F7",frequency:2793.83}],[91,{name:"F#7/Gb7",frequency:2959.96}],[92,{name:"G7",frequency:3135.96}],[93,{name:"G#7/Ab7",frequency:3322.44}],[94,{name:"A7",frequency:3520}],[95,{name:"A#7/Bb7",frequency:3729.31}],[96,{name:"B7",frequency:3951.07}],[97,{name:"C8",frequency:4186.01}],[98,{name:"C#8/Db8",frequency:4434.92}],[99,{name:"D8",frequency:4698.63}],[100,{name:"D#8/Eb8",frequency:4978.03}],[101,{name:"E8",frequency:5274.04}],[102,{name:"F8",frequency:5587.65}],[103,{name:"F#8/Gb8",frequency:5919.91}],[104,{name:"G8",frequency:6271.93}],[105,{name:"G#8/Ab8",frequency:6644.88}],[106,{name:"A8",frequency:7040}],[107,{name:"A#8/Bb8",frequency:7458.62}],[108,{name:"B8",frequency:7902.13}]]),[{name:0},{name:1},{name:2},{name:3},{name:4},{name:5},{name:6}]);function k(e){return"".concat(e[0]).concat(e[1])}function P(e){return 60/e}var T=Object(v.a)((function(e){return{root:{flexGrow:1,paddingLeft:"20%",paddingRight:"20%"},currentNote:{paddingTop:"10%",paddingBottom:"10%"},button:{marginTop:40,marginBottom:40},title:{marginBottom:50},slider:{width:"33%"}}})),M=[{name:"Piano",sound:"",range:[]}],R=null;function U(){var e=T(),n=Object(c.useState)("Piano"),a=Object(o.a)(n,2),r=a[0],i=a[1],u=Object(c.useState)("C"),m=Object(o.a)(u,2),f=m[0],l=m[1],y=Object(c.useState)(3),d=Object(o.a)(y,2),p=d[0],q=d[1],G=Object(c.useState)("C"),v=Object(o.a)(G,2),I=v[0],U=v[1],V=Object(c.useState)(5),J=Object(o.a)(V,2),K=J[0],H=J[1],W=Object(c.useState)("Chromatic"),z=Object(o.a)(W,2),Q=z[0],X=z[1],Y=Object(c.useState)("C"),Z=Object(o.a)(Y,2),$=Z[0],_=Z[1],ee=Object(c.useState)({drone:!1,octaveLimit:!1}),ne=Object(o.a)(ee,2),ae=(ne[0],ne[1],Object(c.useState)(2)),te=Object(o.a)(ae,2),ce=te[0],re=te[1],ie=Object(c.useState)(2),ue=Object(o.a)(ie,2),me=ue[0],se=ue[1],be=Object(c.useState)(120),fe=Object(o.a)(be,2),oe=fe[0],le=fe[1],je=Object(c.useState)(!1),ye=Object(o.a)(je,2),de=ye[0],Oe=ye[1],pe=Object(c.useState)(P(oe)),Ce=Object(o.a)(pe,2),qe=Ce[0],he=Ce[1],De=Object(c.useState)(ce*qe),xe=Object(o.a)(De,2),Ae=xe[0],Ge=xe[1],ve=Object(c.useState)(me*qe),ge=Object(o.a)(ve,2),Fe=ge[0],Be=ge[1],Ee=Object(c.useState)(Ae+Fe),Ie=Object(o.a)(Ee,2),Le=Ie[0],Se=Ie[1],Ne=function(e,n){var a=k(e),t=k(n);return N.indexOf(t)>=N.indexOf(a)},we=function(){for(var e=N.indexOf(k([f,p])),n=N.indexOf(k([I,K])),a=[],t=function(e,n){for(var a=[],t=L(e,n),c=function(e){t.forEach((function(n){return a.push(n+e)}))},r=0;r<9;r++)c(r);return a}(Q,$),c=e;c<=n;c++){var r=N[c];t.includes(r)&&a.push(r)}for(var i=[],u=0;u<100;u++)i.push(a[Math.floor(Math.random()*a.length)]);return i},ke=Object(c.useState)("wait"),Pe=Object(o.a)(ke,2),Te=Pe[0],Me=Pe[1],Re=function(){L(Q,$)};Object(c.useEffect)((function(){he(P(oe))}),[oe]),Object(c.useEffect)((function(){Ge(ce*qe),Be(me*qe)}),[ce,me,oe]),Object(c.useEffect)((function(){Se(Ae+Fe)}),[Ae,Fe]);var Ue=function(){var e=Object(b.a)(s.a.mark((function e(){var n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,F.d();case 2:if(de){e.next=11;break}return n=B.toDestination(),R=new F.b((function(e,a){n.triggerAttackRelease(a,Ae,e),Me(a)}),we(),Le),Oe(!0),R.start(),F.c.start("+0.25"),e.abrupt("return");case 11:return Oe(!1),F.c.stop(),R.stop(),R.clear(),e.abrupt("return");case 16:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(t.jsx)("div",{className:e.root,children:Object(t.jsxs)(g.a,{container:!0,direction:"column",justify:"center",alignItems:"center",spacing:1,children:[Object(t.jsx)(g.a,{item:!0,className:e.title,xs:12,children:Object(t.jsx)(C,{text:"Noteworthy.music"})}),Object(t.jsx)(g.a,{item:!0,xs:12,children:Object(t.jsx)(D,{text:"Instrument"})}),Object(t.jsx)(g.a,{item:!0,xs:12,children:Object(t.jsx)(O,{value:r,list:M,helperText:"Pick an Instrument",handleChange:function(e){i(e.target.value)}})}),Object(t.jsxs)(g.a,{container:!0,item:!0,direction:"row",justify:"space-evenly",alignItems:"center",children:[Object(t.jsx)(D,{text:"Lower Limit"}),Object(t.jsx)(D,{text:"Upper Limit"})]}),Object(t.jsxs)(g.a,{container:!0,item:!0,direction:"row",justify:"space-evenly",alignItems:"center",children:[Object(t.jsx)(O,{value:f,list:E,helperText:"Pick a Note",handleChange:function(e){Ne([e.target.value,p],[I,K])&&l(e.target.value)}}),Object(t.jsx)(O,{value:p,list:w,helperText:"Pick an Octave",handleChange:function(e){Ne([f,e.target.value],[I,K])&&q(e.target.value)}}),Object(t.jsx)(O,{value:I,list:E,helperText:"Pick a Note",handleChange:function(e){Ne([f,p],[e.target.value,K])&&U(e.target.value)}}),Object(t.jsx)(O,{value:K,list:w,helperText:"Pick an Octave",handleChange:function(e){Ne([f,p],[I,e.target.value])&&H(e.target.value)}})]}),Object(t.jsxs)(g.a,{container:!0,item:!0,direction:"row",justify:"space-around",alignItems:"center",children:[Object(t.jsx)(D,{text:"Scale"}),Object(t.jsx)(D,{text:"Key"})]}),Object(t.jsxs)(g.a,{container:!0,item:!0,direction:"row",justify:"space-around",alignItems:"center",children:[Object(t.jsx)(O,{value:Q,list:S,helperText:"Pick a Scale",handleChange:function(e){X(e.target.value),Re()}}),Object(t.jsx)(O,{value:$,list:E,helperText:"Pick a Key",handleChange:function(e){_(e.target.value),Re()}})]}),Object(t.jsx)(g.a,{container:!0,item:!0,direction:"column",justify:"center",alignItems:"center",spacing:1,children:Object(t.jsx)(D,{text:"Note Length"})}),Object(t.jsxs)(g.a,{container:!0,item:!0,direction:"column",justify:"center",alignItems:"center",spacing:0,children:[Object(t.jsx)(j,{classes:e,value:ce,handleChange:function(e,n){re(n)}}),Object(t.jsx)(D,{text:"Note Rest"}),Object(t.jsx)(x,{classes:e,value:me,handleChange:function(e,n){se(n)}}),Object(t.jsx)(D,{text:"Tempo"}),Object(t.jsx)(A,{classes:e,value:oe,handleChange:function(e,n){le(n)}}),Object(t.jsx)(g.a,{container:!0,className:e.button,item:!0,direction:"row",justify:"center",alignItems:"center",xs:12,spacing:0,children:Object(t.jsx)(h,{handleClick:Ue,playStatus:de})})]}),Object(t.jsx)(g.a,{container:!0,item:!0,direction:"row",justify:"center",alignItems:"center",xs:12,spacing:0,children:Object(t.jsx)(D,{text:Te})})]})})}var V=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,126)).then((function(n){var a=n.getCLS,t=n.getFID,c=n.getFCP,r=n.getLCP,i=n.getTTFB;a(e),t(e),c(e),r(e),i(e)}))};u.a.render(Object(t.jsx)(r.a.StrictMode,{children:Object(t.jsx)(U,{})}),document.getElementById("root")),V()}},[[77,1,2]]]);
//# sourceMappingURL=main.85f26f8f.chunk.js.map