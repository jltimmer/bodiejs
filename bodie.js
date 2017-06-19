var locations = 
  ["Firehouse", "JS Cain's House", "Jail", "Bank",
    "Bakery", "Chinatown", "Sheriff Location", "TownHall"]

var characters =
  ["You"]

// State
var location_of =
  { "Sheriff Hayes": "Sheriff location",
    "JS Cain": "Bank",
    "Pat Reddy": "Bakery",
    "You": "TownHall"
    
  }


var conversation_log =
  {
    "Firehouse": [],
    "JS Cain's House": [],
    "Jail": [],
    "Bank": [],
    "Bakery": [],
    "Chinatown": [],
    "Sheriff Location": [],
    "TownHall": [],
  }

var current_choices;


function choiceToString(c) {
  var {op, args} = c;
  var str = op+"(";
  str = op+"("+ args.toString() + ")";
  return str;
}

function displayState() {
  toRender = "";

  // stuff at all locations
  for (var i = 0; i < locations.length; i++) {
    var stuff = whatsAt(locations[i]);
    toRender += "<b>At "+locations[i]+":</b>";
    if(stuff.length > 0) {
      toRender += "<p>"+ stuff.toString() + "<br>";
    }

    if(conversation_log[locations[i]].length > 0) {
      toRender += conversation_log[locations[i]][0];
      toRender += "<br>";
    }
    toRender += "</p>";
  }
  document.getElementById("state").innerHTML = toRender;

}

function displayChoices() {
  // current_choices = generate_choices();
  toRender = "";
  for (var i = 0; i < current_choices.length; i++) {
    var choice = current_choices[i];
    toRender += ""+i+": "+choiceToString(choice)+"<br>";
  }
  document.getElementById("choices").innerHTML = toRender;
}

function render() {
  current_choices = generate_choices();
  displayState();
  displayChoices();
}

function selectChoice(index) {

  var display_text = applyOper(current_choices[index]);

  document.getElementById("response").innerHTML = display_text;
  
  // current_choices = generate_choices();
  render();
}

window.onload = function() {
var applyButton = document.getElementById("applyChoice");
applyButton.addEventListener("Click", function () {

  var index = document.getElementById("selectChoice").value;
  
  var display_text = applyOper(current_choices[index]);

  document.getElementById("response").innerHTML = display_text;
  
  // current_choices = generate_choices();
  render();


});
}



function cmdToAction(cmd) {
  var {op, args} = cmd;

  switch(op) {
    //case "take": {
    //  return take(args[0], args[1]);
    //}
    case "grasp": {
      return grasp(args[0], args[1]);
    }
    case "ignore": {
      return grasp(args[0], args[1]);
    }
    case "go": { 
      return go(args[0], args[1]);
    }
    case "talk": {
      return talk(args[0], args[1]);
    }
 
    default: return undefined;
  }
}

// returns text to display upon applying cmd
function applyOper(cmd) {

  var displayText = "Action not defined!"; // to return at the end

  var action = cmdToAction(cmd);
  
  if(action != undefined && action.applies) { 
    action.effects();
    displayText = action.text;
  }
  return displayText;
}

function whatsAt(loc) {
  var things = [];
  for(var thing in location_of) {
    if(location_of[thing] == loc) {
      things.push(thing);
    }
  }
  return things;
}

function generate_choices () {
  choices = [];
  // for each character, see what they can do
  for(var ci in characters) {
    var c = characters[ci];
    var loc = location_of[c];
    var things = whatsAt(loc);
    for(var ti in things) {
      var thing = things[ti];
      //if(characters.indexOf(thing) < 0) {
        // taking it
      //  choices.push({op:"take", args:[c, thing]});
      //}
      //added to include grasp
      if(characters.indexOf(thing) < 0){
        // grasping person
        //makes sure grasp and ignore only visible if in bank 
        if(loc == "Bank"){
        choices.push({op:"grasp", args:[c, thing]});
        choices.push({op:"ignore", args:[c, thing]});
        }
      }
      else {
        // talking to it
        if(thing != c) {
          choices.push({op:"talk", args:[c, thing]});
        }
      }
    } // end loop over things at location of c

    // places to move
    for(var li in locations) {
      var l = locations[li];
      if(l != loc) {
        choices.push({op:"go", args:[c, l]});
      }
    }


  } //end loop over characters
  return choices;
  
}

function begin() { render(); }


/*
function take(agent, thing) {

  var applies = location_of[agent] == location_of[thing];

  function effects() {
    location_of[thing] = agent;
  }

  var text = agent+" takes the "+thing+".";

  return {applies:applies, effects:effects, text:text};

}
*/

//function for ignoring
function ignore(agent, thing) {

  var applies = location_of[agent] == location_of[thing];

  function effects() {
    location_of[thing] = agent;
  }

  var text = agent+" ignore "+thing+".";

  return {applies:applies, effects:effects, text:text};

}

//function for grasp
function grasp(agent, thing) {

  var applies = location_of[agent] == location_of[thing];

  function effects() {
    location_of[thing] = agent;
  }

  var text = agent+" grasps "+thing+".";

  return {applies:applies, effects:effects, text:text};

}


function go(agent, place) {

  var applies = true; // for now

  function effects() {
    location_of[agent] = place;
  }
  //incorporating specific story line
  if(place == "Firehouse"){
    var text = "The firehouse is empty today, the sun " +
                "gleaming off of its bell. Of interest " +
                "is a ditch containing what seems to be " +
                "the housing for a water valve. You try " +
                "to look inside, but you're stopped by a heavy lock.";
  }
  else if(place == "JS Cain's House"){
    var text = "You knock on the door to no avail. " +
               "Peering into the lavish windows, " +
               "you see that nobody's home." +
               "You should check elsewhere.";

  }
  else if(place == "Jail"){
    var text = "The Jail is empty at the moment. " +
               "Head back to town center. ";
  }
  else if(place == "Bank"){
    var text = "You enter the imposing Bodie Bank, " +
               "the most modern and expensive of all " +
               "the buildings in town. The safe stands " +
               "severe in the center, between brick and " +
               "steel bar. Facing the opposite wall is a " +
               "redwood desk. <br /><br />" +

               "Sitting there is a straight backed man with " +
               "salt and pepper hair, furiously filing documents " +
               "and flipping through files. He jerks to a stop as " +
               "you approach, and stands, stiffly. He turns to you " +
               "and you notice his gaunt face and pale eyes. " +
               "<q>Greetings</q>, he says in a soft lilt. " +
               "<q>My name is James Stuart Cain.</q> He paces " +
               "towards you and offers his hand.";
  }
  else if(place == "Bakery"){
    var text = "You enter the ruins of the bakery. Scorched " +
               "bricks litter the ground, and white ash is " +
               "mixed into the dirt. The blaze that took out " +
               "half of Bodie started here. You see gnarled " +
               "cast iron about, indicating you're in the kitchen." +
               "<br /><br /> As you make your way through the " +
               "kitchen, you come across a one armed, portly man. " +
               "He is wearing a suit, despite the ashy ruin you " +
               "two stand in. Before you can say anything, he " +
               "notices you, and begins to speak rapidly. <br /><br />" +
               "<q>Oh, hello! Pat Reddy, at your service,</q><br /><br />" +
               "he says in an irish brogue, whiskers quivering " +
               "when he smirks.<br /><br /> <q>How can I help you?</q> ";
  }
  else if(place == "Chinatown"){
    var text = "You're struck by the massive amount of damage done " +
               "to the Chinatown of Bodie, north of town. It seems " +
               "that the fire truly torched the neighborhood.<br />You " +
               "recall a faint memory of a celebration here, with " +
               "brightly colored ribbons hanging over the streets " +
               "and a huge parade. Only an echo remains, in the few " +
               "red roofed homes miraculously left standing. <br /><br />" +
               "You investigate the nearest shack, torched on the " +
               "outside but fairly preserved inside. On a ramshackle " +
               "desk is a wooden amulet, on a twine string. Perplexed, " +
               "you pick it up. A faded sketch of a girl is inside. " +
               "You pocket the amulet. <br /><br /> This is a desolate place.";
  }
  else if(place == "Sheriff Location"){
    var text = "Sheriff Hayes smiles at you. <br /><br /><br /> " +
               "Yes? How can I help you?";
  }
  else{
    var text = agent+" goes to "+place;
  }
  return {applies:applies, effects:effects, text:text};

}


function talk(agent1, agent2) {

  var loc = location_of[agent1];
  var applies = loc == location_of[agent2];

  function effects() {
    var line = agent1+" says hello to "+agent2;
    conversation_log[loc] = [line];
  }

  return {applies:applies, effects:effects, text:""};

}

