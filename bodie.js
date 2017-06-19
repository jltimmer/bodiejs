var locations = 
  ["Firehouse", "JS Cain's House", "Jail", "Bank",
    "Bakery", "Chinatown", "Sheriff Location", "TownHall"]

var characters =
    ["You"]

//to see if i can make js cain a character, not treated as an object
var nonobjects =
    ["Sheriff Hayes", "JS Cain", "Pat Reddy"]

// State
var location_of =
  { "Sheriff Hayes": "Sheriff location",
    "JS Cain": "Bank",
    "Pat Reddy": "Bakery",
    "You": "TownHall"
    
  }

var clothing_on =
    {
        "Sheriff Hayes": "",
        "JS Cain": "",
        "Pat Reddy": "",
        "You": ""
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
    var { op, args } = c;
    var str = "";

    switch (op) {
        case "grasp": {
            return "Grasp " + args[1];
        }
        case "ignore": {
            return "Ignore " + args[1];
        }
        case "go": {
            return "Go to " + args[1];
        }
        case "talk": {
            return "Talk to " + args[1];
        }
        case "give": {
            return "Give " + args[2] + " to " + args[1];
        }
        case "wear": {
            return "Wear " + args[1];
        }
        default: return op + " " + args[args.length - 1];
    }
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
        var last_character;
        if (choice.args[0] != last_character) {
            toRender += "<br>" + "Actions for " + choice.args[0] + "<br>";
        }
        toRender += "<a onclick=selectChoice(" + i + ") href=javascript:void(0);>" + choiceToString(choice) + "</a><br>";

        last_character = choice.args[0];
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
    var things_held = whatsAt(c);

    //things at location of each character
    for(var ti in things) {
      var thing = things[ti];
      // taking it
      /*  choices.push({op:"take", args:[c, thing]});
      }*/
      //added to include grasp
      if(characters.indexOf(thing) < 0) {
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

    // giving it
    for (var thi in things_held) {
        thing_held = things_held[thi];

        for (var ci2 in characters) {
            var c2 = characters[ci2];
            if (c != c2 && loc == location_of[c2]) {
                choices.push({ op: "give", args: [c, c2, thing_held] });
            }
        }
    }

    // wearing it
    for (var thi in things_held) {
        thing_held = things_held[thi];

        if (clothing_on[c] != thing_held) {
            choices.push({ op: "wear", args: [c, thing_held] });
        }
    }

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

  var text = "Awkwardly and flushed, Cain lowers his hand. " +
             "<q>Yes, well.</q> Anger flashes for a moment " +
             "behind his pale eyes. <q>What brings you to my town?</q>";

  return {applies:applies, effects:effects, text:text};

}

//function for grasp
function grasp(agent, thing) {

  var applies = location_of[agent] == location_of[thing];

  function effects() {
    location_of[thing] = agent;
  }
  
  var text = "You grip his hand firmly and shake. <br /><br />" +
            "<br /> <q>You've come at a particularly " +
            "unfortunate time. Bodie never offers the comforts " +
            "of the city, but it's usually more... welcoming than " +
            "this.</q><br /> He gestures out the window at the burned street. " +
            "<q>Luckily for everyone I had this bank constructed with " +
            "brick and steel. They call it 'Jim Cain's luck', but " +
            "luck has nothing to do with it. Anyways. What brings you to my town?</q>";

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

function wear(agent, thing) {

    var applies = agent == location_of[thing];
    var text;

    function effects() {
        clothing_on[agent] = thing;
    }

    if (clothing_on[agent] == "") {
        text = agent + " wears " + thing;
    }
    else {
        text = agent + " takes off " + clothing_on[agent] + " and wears " + thing;
    }

    return { applies: applies, effects: effects, text: text };

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

function give(agent1, agent2, thing) {
    var loc = location_of[agent1];
    var applies = agent1 == location_of[thing] && loc == location_of[agent2];

    function effects() {
        location_of[thing] = agent2

        if (clothing_on[agent1] == thing) {
            clothing_on[agent1] = "";
        }
    }

    var text = agent1 + " gives " + thing + " to " + agent2;

    return { applies: applies, effects: effects, text: text };

}