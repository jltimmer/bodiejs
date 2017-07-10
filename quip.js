function findQuip(npc,thing){
var quip = "";
  if(thing == "Amulet"){
    if(npc == "Sheriff Hayes"){
      var Array = ["This ole amulet looks like it belongs to someone.", 
      "You should find the owner of this amulet.",
      "Good find, I'm sure the owner of this amulet is out there somewhere."]
      quip += "Sheriff Hayes responds, ";
      var track = Math.floor(Math.random() * Array.length);
      
      quip += "<q>" + Array[track] + "</q>";
       //Array.splice(track,1);
      
       // quip += "<q> You have asked enough, now go find the owner. </q>";
      
     
    }
    if(npc == "JS Cain"){}
    if(npc == "Pat Reddy"){}
    if(npc == "William Hang"){}
    if(npc == "Mrs Perry"){}
    if(npc == "Mr Perry"){}
    if(npc == "Shotgun Johnny"){}
  }
  if(thing == "Letter"){
    if(npc == "Sheriff Hayes"){}
    if(npc == "JS Cain"){}
    if(npc == "Pat Reddy"){}
    if(npc == "William Hang"){}
    if(npc == "Mrs Perry"){}
    if(npc == "Mr Perry"){}
    if(npc == "Shotgun Johnny"){}
  }
  if(thing == "Insurance Paper"){
    if(npc == "Sheriff Hayes"){}
    if(npc == "JS Cain"){}
    if(npc == "Pat Reddy"){}
    if(npc == "William Hang"){}
    if(npc == "Mrs Perry"){}
    if(npc == "Mr Perry"){}
    if(npc == "Shotgun Johnny"){}
  }

return quip;
}