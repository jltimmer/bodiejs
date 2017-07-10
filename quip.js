var amuletSheriffHayes = ["This ole amulet looks like it belongs to someone.", 
      "You should find the owner of this amulet.",
      "Good find, I'm sure the owner of this amulet is out there somewhere."];

var amuletJSCain = ["Never seen this before.","Wish I would have found this amulet."]

function findQuip(npc,thing){

var quip = "";

  if(thing == "Amulet"){

    if(npc == "Sheriff Hayes"){

      quip += "Sheriff Hayes responds, ";

      if(amuletSheriffHayes.length){
        var track = Math.floor(Math.random() * amuletSheriffHayes.length);
        quip += "<q>" + amuletSheriffHayes[track] + "</q>";
        amuletSheriffHayes.splice(track,1);
      }

      else{
        quip += "<q>You have asked enough, now go find the owner.</q>";
      }

    }

    if(npc == "JS Cain"){

      quip += "JS Cain responds, ";

      if(amuletJSCain.length){
        var track = Math.floor(Math.random() * amuletJSCain.length);
        quip += "<q>" + amuletJSCain[track] + "</q>";
        amuletJSCain.splice(track,1);
      }

      else{
        quip += "<q>I have answered you enough.</q>";
      }
    }
    
    if(npc == "Pat Wesley"){}
    if(npc == "William Hang"){}
    if(npc == "Mrs Perry"){}
    if(npc == "Mr Perry"){}
    if(npc == "Shotgun Johnny"){}
  }
  if(thing == "Letter"){
    if(npc == "Sheriff Hayes"){}
    if(npc == "JS Cain"){}
    if(npc == "Pat Wesley"){}
    if(npc == "William Hang"){}
    if(npc == "Mrs Perry"){}
    if(npc == "Mr Perry"){}
    if(npc == "Shotgun Johnny"){}
  }
  if(thing == "Insurance Paper"){
    if(npc == "Sheriff Hayes"){}
    if(npc == "JS Cain"){}
    if(npc == "Pat Wesley"){}
    if(npc == "William Hang"){}
    if(npc == "Mrs Perry"){}
    if(npc == "Mr Perry"){}
    if(npc == "Shotgun Johnny"){}
  }

return quip;
}