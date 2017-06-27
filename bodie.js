var locations = 
  ["Firehouse", "JS Cain's House", "Jail", "Bank",
    "Bakery", "Chinatown", "Town Hall"]

var characters =
    ["You"]

//to see if i can make js cain a character, not treated as an object
var npcs =
    ["Sheriff Hayes", "JS Cain", "Pat Reddy", "William Hang", 
    "Mrs Perry", "Mr Perry", "Shotgun Johnny"]

// State
var location_of =
  { "Sheriff Hayes": "Town Hall",
    "JS Cain": "Bank",
    "Pat Reddy": "Bakery",
    "You": "Town Hall",
    "Amulet": "Chinatown",
    "William Hang": "Jail",
    "Insurance Paper": "Bank",
    "Letter": "Reddy House",
    "Mrs Perry": "Perry House",
    "Shotgun Johnny": "Graveyard",
    "Mr Perry": "Graveyard"
  }

var clothing_on =
    {
        "Sheriff Hayes": "key",
        "JS Cain": "",
        "Pat Reddy": "",
        "You": ""
    }

var locations_visited = [];

var conversation_log =
  {
    "Firehouse": [],
    "JS Cain's House": [],
    "Jail": [],
    "Bank": [],
    "Bakery": [],
    "Chinatown": [],
    "Town Hall": [],
    "Sheriff Hayes": [],
    "William Hang": [],
  }

var inventory =
{ 
  WilliamHang: 0, 
  SheriffHayes: 0, 
  Firehouse: 0,
  You: 0,
  PatReddy: 0
}

var current_choices;


function choiceToString(c) {
    var { op, args } = c;
    var str = "";

    switch (op) {
        case "take": {
            return "Take " + args[1];
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
    case "take": {
      return take(args[0], args[1]);
    }
    case "go": { 
      return go(args[0], args[1]);
    }
    case "talk": {
      return talk(args[0], args[1]);
    }
    case "give": {
      return give(args[0], args[1], args[2]);
    }
    case "wear": {
      return wear(args[0], args[1]);
    }
    default: return undefined;
  }
}

// returns text to display upon applying cmd
function applyOper(cmd) {

  var displayText = "Action not defined!"; // to return at the end

  var action = cmdToAction(cmd);
  
  if(action != undefined) { 
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
       //taking it
      if (characters.indexOf(thing) < 0 && npcs.indexOf(thing) < 0 && 
          loc == location_of[thing]) {
        choices.push({op:"take", args:[c, thing]});
      }
      else {
        // talking to it
        if(thing != c && location_of[c] == location_of[thing]) {
          choices.push({op:"talk", args:[c, thing]});
        }
      }
    } // end loop over things at location of c

    // giving it
    for (var thi in things_held) {
        thing_held = things_held[thi];

        for (var ci2 in npcs) {
            var c2 = npcs[ci2];
            if (c != c2 && loc == location_of[c2] && c == location_of[thing_held]) {
                choices.push({ op: "give", args: [c, c2, thing_held] });
            }
        }
    }
   /*
    // wearing it
    for (var thi in things_held) {
        thing_held = things_held[thi];

        if (clothing_on[c] != thing_held && c == location_of[thing_held]) {
            choices.push({ op: "wear", args: [c, thing_held] });
        }
    }*/

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



function take(agent, thing) {

  function effects() {
    location_of[thing] = agent;
  }
  if(thing == "Amulet"){//thing is amulet
    inventory.WilliamHang ++;
  }

  var text = agent+" take the "+thing+".";
  if(thing == "Insurance Paper"){
    var text = "</br ></br >JS Cain reaches to his desk and " +
                "pulls a sheet of paper from a file. <q>Here's a " +
                "partial list of losses for the citizens of the town. " +
                "The damage is huge, exceeding 88,000 dollars...</q>" +
                "</br ></br >" + agent +" take the "+thing+".</br ></br >" +
                "Cain continues, <q>I already see something fishy. Notice " +
                "that Mrs. Perry lost less than almost anyone? Considering " +
                "that a good number of the lost buildings were in direct " +
                "competition with Perry... Something seems off. I suggest " +
                "you look around her bakery.</q>";
  }
  else if(thing == "Letter"){
    var text = "You unfold the letter, and see a sketch of " +
               "something called the U.S. Hotel, along with an " +
               "address on Main Street.</br></br>The letter reads</br></br>" +
               "<q>Pat,</br>This is Palmyre's sketch of our new business, " +
               "and where we'd like it to be. We think that it'd be a fantastic " +
               "addition to Bodie's Main Street, and bring quite a pretty penny " +
               "to everyone involved. We'd like to consider it not only the best " +
               "hotel in the county, but a roaring center of trade. Now, if only " +
               "that old man would sell us the rights to his land, we could move " +
               "forward with the plan...</br>Earnestly,</br>James</q>";
  }

  return {effects:effects, text:text};

}

/*
function ignore(agent, thing) {

  var applies = location_of[agent] == location_of[thing];

  function effects() {
    //checks if the thing the agent wants to grab is a 'human' object
    var set = 0;
    for(var i=0; i<npcs.length;i++){

      if(thing == npcs[i]){
        var set = 1
      }

    }
    if(set == 0){

      location_of[thing] = agent;
      
    }
  }

  var text = "Awkwardly and flushed, Cain lowers his hand. " +
             "<q>Yes, well.</q> Anger flashes for a moment " +
             "behind his pale eyes. <q>What brings you to my town?</q>";

  return {applies:applies, effects:effects, text:text};

}
*/

/*
function grasp(agent, thing) {

  var applies = location_of[agent] == location_of[thing];


  function effects() {
    //checks if the thing the agent wants to grab is a 'human' object
    var set = 0;
    for(var i=0; i<npcs.length;i++){

      if(thing == npcs[i]){
        var set = 1
      }

    }
    if(set == 0){

      location_of[thing] = agent;

    }
  }
  
  var text = "You grip his hand firmly and shake. <br /><br />" +
            "<br /> <q>You've come at a particularly " +
            "unfortunate time. Bodie never offers the comforts " +
            "of the city, but it's usually more... welcoming than " +
            "this.</q><br /> He gestures out the window at the burned street. " +
            "<q>Luckily for everyone I had this bank constructed with " +
            "brick and steel. They call it 'Jim Cain's luck', but " +
            "luck has nothing to do with it. Anyways. What brings you to my town?</q>";
  //resembling twine game          
  //var insurance = 1; 
  var grasp_or_ignore = 1;

  return {applies:applies, effects:effects, text:text};
}
*/

function go(agent, place) {
    
  var text = "";
  function effects() {
    location_of[agent] = place;
  }
  //incorporating specific story line
  if(place == "Firehouse"){
  if(inventory.You == 0){
    text = "The firehouse is empty today, the sun " +
                "gleaming off of its bell. Of interest " +
                "is a ditch containing what seems to be " +
                "the housing for a water valve. You try " +
                "to look inside, but you're stopped by a heavy lock.";
    inventory.Firehouse ++;
    }
    else{
    text = "You use the key the sheriff gave you to open up " +
           "the lock on the valve housing.</br ></br>You remove the " +
           "cover, and sure enough, there's obvious evidence of " +
           "tampering. You see a flat black hat inside the valve " +
           "housing as well, similar to a sun hat. Stitched onto " +
           "the brim is a monogram, <q>SJ</q>. You grab it. ";
    }
  }
  else if(place == "JS Cain's House"){
    var text = "You knock on the door to no avail. " +
               "Peering into the lavish windows, " +
               "you see that nobody's home." +
               "You should check elsewhere.";

  }
  else if(place == "Jail"){
    if(inventory.WilliamHang == 0){//amulet is not in possesion of you
      var text = "The man in the jail cell looks almost asleep. " +
                 "</br ></br >Check somewhere else. ";
    }
    else if(inventory.WilliamHang == 1){
      var text = "Hang looks more awake, so you ask about " +
                 "the events of the night, but he refuses to talk about that. <q>All I " +
                 "want is to find my family,</q> is all you  " +
                 "can get out of him. You reply that he's going " +
                 "to have to help you out before you can make that " +
                 "happen. He sits silently on the other side of the bars. " +
                 "Absently, you pull out the amulet you found and take " +
                 "another look. </br ></br >Hang's eyes go wide. <q>My god, " +
                 "that survived the fire? I never suspected - thank you. " +
                 "Please, can I have it?</q> ";
    }
    else if(inventory.WilliamHang == 2){
      var text = "You've already spoken to the cook. He is turned " +
                 "away, in the corner of the cell.";
    }
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
  /*else if(place == "Sheriff Location"){
    var text = "Sheriff Hayes smiles at you. <br /><br /><br /> " +
               "Yes? How can I help you?";
  }*/
  else{
    var text = agent+" go to "+place;
  }
  return {effects:effects, text:text};

}

function wear(agent, thing) {
    
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

    return { effects: effects, text: text };

}

function talk(agent1, agent2) {
    

  function effects() {
   // var line = agent1+" says hello to "+agent2;
   // conversation_log[loc] = [line];
  }
  var text = agent2 + " says hello to " + agent1 + " ^.^</br ></br >";

  if((inventory.WilliamHang == 2) && (inventory.Firehouse > 0)){
    if(agent2 == "Sheriff Hayes"){
      if(inventory.You == 0){
        text += "</br > You tell the sheriff what Hang told you about " +
            "the firehouse, and he grimaces.</br ></br >" +
            "Sheriff Hayes says, <q>I wish he had just told us his story. " +
            "I can't release him yet, but you should hunt down that lead. " +
            "Here's the key.</q></br ></br >You pocket it.";
        inventory.You++;
      }
      else{
        text = agent2 + " says hello to " + agent1 + " ^.^</br ></br >";
      }
    }
  }
  else if(agent2 == "Pat Reddy"){
    if(inventory.PatReddy == 0){
    text = "<q>The only other thing I can talk about is the Perrys. They're in mourning " +
           "for their lost property, I suspect.</q></br ></br > Before you can get " +
           "in a word, he prattles on, </br ></br ><q>Yes, I represent them and " +
           "their businesses. I am here to... look for any sign of " +
           "foul play, and to reclaim any found valuables for the Perry " +
           "estate. A kind and noble pair they are. If you seek them, " +
           "check their home on Main Street, but I warn you, they're " +
           "likely to be in a sad state indeed.</q></br ></br >" +
           "<b>You now have access to the Perry and Reddy House</b>";
    locations.push("Perry House");
    locations.push("Reddy House");  
    inventory.PatReddy ++;
    }
  }
  else if(inventory.Firehouse == 1){
    //need to allow only Sheriff Hayes to say this
    if(agent2 == "Sheriff Hayes"){ 
      text += "</br > Sorry kid, the firehouse is gonna stay locked up " +
              "tight unless you have a good reason to search it," +
              " at the firefighters request." ;
    }
  }

  return {effects:effects, text:text};

}

function give(agent1, agent2, thing) {
    
    var graveYardAccess = 0;
    //graveYardAccess variable gives conditions for giving amulet, if we need to include another give this function needs to be edited
    if(thing == "Amulet" && agent2 == "William Hang"){
      graveYardAccess = 1;
    }
    //if npc given thing, i want npc to be "wearing" thing
    function effects() {
        if(graveYardAccess == 0){}
        else{
        location_of[thing] = agent2
        locations.push("Graveyard");
        inventory.WilliamHang ++;
          if (clothing_on[agent1] == thing) {
             clothing_on[agent1] = "";
          }
        }           
    }
    if(graveYardAccess==0){
      var text = "No thank you, this " + thing + " is not mine.";
    }
    else{
      var text = agent1 + " give " + thing + " to " + agent2;
    }
    if (graveYardAccess > 0){
       text += ". </br></br> <b>You now have access to the Graveyard.</b>" ;
    }
    
    return { effects: effects, text: text };
}