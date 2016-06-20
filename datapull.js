

//var searchterm = ["bicycle", "automobile", ""];
//var searchterm = ["hypnotism", "homeopathic", ""];
//var searchterm = ["oil+well", "national+park", ""];
//var searchterm = ["communism", "capitalism", ""];
//var searchterm = ["democrat", "republican", ""];
//var searchterm = ["depression", "asylum", ""];
//var searchterm = ["opera", "theater+theatre", ""];
//var searchterm = ["creationism", "evolution", ""];
//var searchterm = ["riot", "protest", ""];
//var searchterm = ["mormonism", "christian+science", ""];
//var searchterm = ["darwinism", "christian+science", ""];
//var searchterm = ["mark+twain", "christian+science", ""];
//var searchterm = ["darwin", "christian+science", ""];
//var searchterm = ["mark+twain", "charles+dickens", ""];
//var searchterm = ["scalawag", "adventuress", ""];
//var searchterm = ["evangelicalism", "mormonism", ""];
//var searchterm = ["liberalism", "communism", ""];
//var searchterm = ["freud", "hypnotism", ""];
//var searchterm = ["banjo", "brass+band", ""];
//var searchterm = ["scalawag", "carpetbagger", ""];
//var searchterm = ["protestant", "catholic", ""];
//var searchterm = ["evangelical", "mormon", ""];
//var searchterm = ["psychology", "hypnotism", ""];
//var searchterm = ["cravat", "bloomer", ""];
//var searchterm = ["cravat", "kimono", ""];
//var searchterm = ["trumpet", "banjo", ""];
//var searchterm = ["hoop+skirt", "kimono", ""];
//var searchterm = ["cornet", "banjo", ""];
//var searchterm = ["cravat", "hoop+skirt", ""];
//var searchterm = ["bustle", "kimono", ""];
//var searchterm = ["circus", "baseball", ""];
//var searchterm = ["irish", "chinese", ""];
//var searchterm = ["public+school", "asylum", ""];
//var searchterm = ["gold+mine", "oil+well", ""];
//var searchterm = ["homesteader", "immigrant", ""];
//var searchterm = ["abolitionist", "suffragist", ""];
//var searchterm = ["temperance", "prohibition", ""];
//var searchterm = ["opera", "film", ""];
//var searchterm = ["darwin", "christian+science", ""];
//var searchterm = ["crinoline", "kimono", ""];
//var searchterm = ["opera", "motion+picture", ""];
//var searchterm = ["opera", "theater", ""];
var searchterm = ["creationism", "darwinism", ""];

var state = ["Oregon", "Minnesota", "Ohio", "New+York", "California", "Nebraska", "Kentucky", "Pennsylvania", "Utah", "Kansas", "Tennessee", "Virginia", "Arizona", "Texas", "Louisiana", "South+Carolina"];
//var state = ["New+York", "Pennsylvania", "Ohio", "Virginia", "South+Carolina", "Kentucky", "Oregon", "California"];

var i = 1836;
var l =0;
var j =0;
var dataset = [];
var fs = require("fs");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function call(i,l,j){
  if( i == 1915 && l ==2 && j == 14){
    dataset.push({
      key: i,
      state: state[j],
      search: searchterm[l],
      count: 6614
    });
    
    if(j<state.length - 1) { j++;} else{ j =0; l++;};
    if(l >= searchterm.length){ l = 0; i++;}
    console.log("one", i,l,j); 
    setTimeout(function() { call(i,l,j); }, 200);
  }
  // else if( i == 1915 && l ==0 && j == 14){
  //   dataset.push({
  //     key: i,
  //     state: state[j],
  //     search: searchterm[l],
  //     count: 560
  //   });
  //   
  //   if(j<state.length - 1) { j++;} else{ j =0; l++;};
  //   if(l >= searchterm.length){ l = 0; i++;}
  //   console.log("two", i,l,j); 
  //   setTimeout(function() { console.log("here");call(i,l,j); }, 200);
  // }
  else {
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", data);
  oReq.open("GET", "http://chroniclingamerica.loc.gov/search/pages/results/?state=" + state[j] + "&dateFilterType=yearRange&date1=" +i+ "&date2=" + i+ "&proxtext=" + searchterm[l] + "&proxdistance=5&rows=1&searchType=advanced&format=json");
  oReq.send();
 };
};


function data() {
  console.log("data", i,l,j);
  var f = this.responseText;
  var b = JSON.parse(f);
  //(i == 1915 && l ==0 && j == 14) || 
  
  if( (i == 1915 && l ==2 && j == 14)){
    if(j<state.length - 1) { j++;} else{ j =0; l++;};
    if(l >= searchterm.length){ l = 0; i++;}
    console.log("set", i,l,j); 
    setTimeout(function() { call(i,l,j); }, 200);
  }
  else{
    dataset.push({
      key: i,
      state: state[j],
      search: searchterm[l],
      count: b.totalItems
    });
    
    if(j<state.length - 1) { j++;} else{ j =0; l++;};
    if(l >= searchterm.length){ l = 0; i++;}
    if( i < 1923){ console.log("set", i,l,j); setTimeout(function() { call(i,l,j); }, 200);} else{ console.log("done"); fs.writeFile( searchterm[0] +".json", JSON.stringify( dataset), "utf8");};    
};
};
call(i,l,j);