var parser=require("./parser.js");
var data=[
    ["",[]],
    [" ",[]],
    ["a",[Symbol("a")]],
    [" a",[Symbol("a")]],
    [" ax ",[Symbol("ax")]],
    ["a b ",[Symbol("a"),Symbol("b")]],
    ["(a b)",[[Symbol("a"),Symbol("b")]]],
    ["(a (b))",[[Symbol("a"),[Symbol("b")]]]],
    ["(a b)",[[Symbol("a"),Symbol("b")]]],
    ["(g 1\"kk\" 4f)(a b())",
     [[Symbol("g"),1,"kk",Symbol("4f")],[Symbol("a"),Symbol("b"),[]]]]
];
function passed(a,b){
    if(a===b)return true;
    var ta = typeof(a);
    if(ta!==typeof(b))return false;
    if(a.length!==b.length)return false;
    if(('object'===ta)&&('number'===typeof(a.length))){
	for(var n=0;n<a.length;n++){
	    if(!passed(a[n],b[n]))
		return false;
	}
	return true;
    }
    if('symbol'===ta)
	return(String(a).slice(7,-1) ===
	       String(b).slice(7,-1));
    return false;
}
function testloop(data,func){
    var f=0;
    for(var n=0;n<data.length;n++){
	var i=data[n][0];
	var o=func(i);
	var e=data[n][1];
	var p=passed(o,e);
	if(p){
	    process.stderr.write('.');
	}else{
	    print('\n==============');
	    print("I:",JSON.stringify(i))
	    print("O:",o)
	    print("E:",e)
	    print('\n--------------');
	    process.stderr.write('F');
	    f+=1;
	}
    }
    return f;
}
var f=testloop(data,parser);
print("\n"+f+" failure(s).")
