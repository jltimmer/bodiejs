var locations =
  ["Firehouse", "JS Cain's House", "Jail", "Bank",
    "Bakery", "Chinatown", "Town Hall"]

var characters =
  ["You"]

//to see if i can make js cain a character, not treated as an object
var npcs =
  ["Sheriff Hayes", "JS Cain", "Pat Wesley", "William Hang",
    "Mrs. Perry", "Mr. Perry", "Shotgun Johnny"]
    
// State
var location_of =
  {
    "Sheriff Hayes": "Town Hall",
    "JS Cain": "Bank",
    "Pat Wesley": "Bakery",
    "You": "Town Hall",
    "Amulet": "Chinatown",
    "William Hang": "Jail",
    "Insurance Paper": "Bank",
    "Letter": "Wesley House",
    "Mrs. Perry": "Perry House",
    "Shotgun Johnny": "Graveyard",
    "Mr. Perry": "Graveyard",
    "Key": "Sheriff Hayes"
  }

var clothing_on = //for wear function
  {
    "Sheriff Hayes": "",
    "JS Cain": "",
    "Pat Wesley": "",
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
//working on var topics to replace holding something for ask/tell
var topics = {"Hat":"unknown", "Insurance":"unknown", "Letter":"unknown", "Firehouse":"known", "Perrys":"known", "Amulet":"unknown"};
var knowledge =
  {
    ["William Hang"]: "unknown",  
    ["Firehouse"]: "unknown", 
    ["You"]: "unknown", // should be for key, can model using location_of
    ["Pat Wesley"]: "unknown", 
    ["Letter"]: "unknown", //can model using location_of
    ["Mr. Perry"]: "unknown", 
    ["Shotgun Johnny"]: "unknown", 
    ["Hat"]: "unknown", //can model using location_of
    ["Insurance"]: "unknown" //can model using location_of
  }

var hang_knowledge =  
[ 
  {
    topic: "Firehouse",
    quips: 
    [
      { 
      content: "On my way to the bar I passed the firehouse, and heard " +
               "a voice muttering to itself, 'the prop's to break the line'. " +
               "I think I know who it was, but he's a dangerous man. I think he " +
               "saw me that night and I'm sure he'll come for revenge if he knows I sent you. Good luck, friend.",
      id: "firehouse_tampering",
      people_told: []
      }
    ]
  },
  {
    topic: "Amulet",
    quips :
    [
      {
        content: "I lost an amulet last night.",
        id: "amulet_hangs",
        people_told: []
      }
    ]

  }
]

var you_knowledge = 
[
  {
    topic:  "Amulet",
    quips :
    [
      {
        content: "Amulet tester content",
        id: "you_amulet",
        people_told: []
      }
    ]
  },
  {
    topic:  "Perrys",
    quips :
    [
      {
        content: "I am looking for the Perry's",
        id: "you_Perrys",
        people_told: []
      }
    ]
  }
]
var cain_knowledge = [];
var wesley_knowledge = 
[
  {
    topic:  "Perrys",
    quips :
    [
      {//when this content is accessed, ->  locations.push("Perry House"); locations.push("Wesley House");
        content: "<q>You're looking for the Perrys? They're in mourning " +
                 "for their lost property, I suspect.</q> Before you can get " +
                 "in a word, he prattles on, <q>Yes, I represent them and their " +
                 "businesses. I am here to... look for any sign of foul play, and " +
                 "to reclaim any found valuables for the Perry estate. A kind and " +
                 "noble pair they are. If you seek them, check their home on Main " +
                 "Street, but I warn you, they're likely to be in a sad state indeed.</q>",
        id: "you_Perrys",
        people_told: []
      }
    ]
  }
]
var hayes_knowledge = 
[
  {
    topic:  "Firehouse",
    quips :
    [
      {
        content: "You ask the Sheriff to unlock the firehouse.</br></br > " +
                 "The Sheriff responds, <q>" +
                 "Sorry kid, the firehouse is gonna stay locked up " +
                 "tight unless you have a good reason to search it, " +
                 "at the firefighters request.</q>",
        id: "hayes_lock",
        people_told: []
      },
      {
        content:  "</br > You tell the sheriff what Hang told you about " +
                  "the firehouse, and he grimaces.</br ></br >" +
                  "Sheriff Hayes says, <q>I wish he had just told us his story. " +
                  "I can't release him yet, but you should hunt down that lead. " +
                  "Here's the key.</q></br ></br >You pocket it.",
        id: "hayes_lock2",
        people_told: []
      }
    ]
  }
]

var mr_perry_knowledge = 
[
  {
    topic:  "Letter",
    quips :
    [
      {
        content: "You show him the letter.</br></br>He smiles when you show him the " +
                 "letter he sent to Pat Wesley. </br></br><q>Well, you're " +
                 "quite the investigator, aren't you? Unfortunately, " +
                 "that's not going to hold up in court. It's speculative, illegally " +
                 "obtained, and with Wesley on my side no court will indict me on such " +
                 "evidence. Besides. This is a place of constant change. Fires occur " +
                 "naturally, after all - they destroy the dead wood.</q></br></br> He turns away " +
                 "from you.",
        id: "mr_perry_letter",
        people_told: []
      }
    ]
  }
]
var mrs_perry_knowledge = 
[
  {
    topic:  "Insurance",
    quips :
    [
      {
        content: "You pull out the document that Cain gave you and hand it to her. " +
                 "Mrs. Perry is unimpressed.</br></br><q>Well? Why show me what I already " +
                 "know? JS Cain likely told you I was up to no good, eh? He's " +
                 "hated us for years.</q>",
        id: "mrs_perry_insurance",
        people_told: []
      }
    ]
  }
]
var sj_knowledge = 
[
  {
    topic:  "Hat",
    quips :
    [
      {
        content: "You show him the hat you found in the firehouse.</br></br><q>Yeah, " +
                 "that's me hat...</q></br></br>Johnny blinks.</br></br><q>Where'd you find " +
                 "that? I have another but that's my favorite. I got a prop " +
                 "for ya - give it back? Please?</q></br></br>He realizes that he's " +
                 "been made. <q></br></br>Damn. Alright, fine. I was there that night, " +
                 "but you can't pin the arson on me. There's no way I could " +
                 "have set the fire and sabotaged the water main at once. Now, " +
                 "can I at least have my hat back?</q></br></br>You refuse to give him " +
                 "the evidence.",
        id: "sj_hat",
        people_told: []
      }
    ]
  }
]

var character_knowledge = 
[
  {character: "You", knowledge: you_knowledge},
  {character: "William Hang", knowledge: hang_knowledge},
  {character: "JS Cain", knowledge: cain_knowledge},
  {character: "Pat Wesley", knowledge: wesley_knowledge},
  {character: "Sheriff Hayes", knowledge: hayes_knowledge},
  {character: "Mr Perry", knowledge: mr_perry_knowledge},
  {character: "Mrs Perry", knowledge: mrs_perry_knowledge},
  {character: "Shotgun Johnny", knowledge: sj_knowledge}
]

// lookup_knowledge(c) should return knowledge object k for {character: c, knowledge: k }
function lookup_knowledge(c) {
  for(var i = 0; i < character_knowledge.length; i++) {
    if(character_knowledge[i].character == c) {
      return character_knowledge[i].knowledge;
    }
  }
  console.log("Couldn't find knowledge for character " + c);
  return undefined;
}

function find_quips(c, t) {
  for(var i = 0; i < character_knowledge.length; i++) {
    if(character_knowledge[i].character == c) { //now we are at characters knowledge
      var charknowledge = character_knowledge[i].knowledge;
      //console.log(charknowledge);
      for(var j = 0; j < charknowledge.length; j++) {
      //console.log(charknowledge[j]);
        if (charknowledge[j].topic == t) {
          //console.log(charknowledge[j].quips[0].id);
          return charknowledge[j].quips;
        }
      }
      //console.log("Couldn't find quips for topic " + t);
    }
  }
  //console.log("Couldn't find knowledge for character " + c);
  return undefined;
}
//find_quips(c,t) output: array of quip objects, input: c, character string; t, thing string
//returns undefined no topic for specifc character
//assumes knowledge base is declared for every character

function check_people_told(c, quip_Array) {
  for(var i = 0; i < quip_Array.length; i++){
    if(quip_Array[i].people_told.length == 0) {
      return quip_Array[i];
    }
    else {
      for(var j = 0; j < quip_Array[i].people_told.length; j++) {
        if (quip_Array[i].people_told[j] == c){
          return undefined;
        }
      }
     // return quip_Array[i];
    }
    return quip_Array[i];
  }
  return undefined;
}
//check_people_told used in ask, still needs work done to it

//check_people_told
var descriptions =
  [{ thing: "William Hang", descr: "The town cook. He was the last person at the scene of the crime." },
  { thing: "Firehouse", descr: "The town's firehouse. A nearby ditch houses a water valve." },
  { thing: "Pat Wesley", descr: "An attorney in Bodie. He represents the Perry's and their businessses." },
  { thing: "Letter", descr: "A letter from Mr. Perry to his attorney detailing a potential new business venture." },
  { thing: "Mr. Perry", descr: "A tall confident, man with an eyepatch on one eye. Mono County Supervisor." },
  { thing: "Shotgun Johnny", descr: "A short man with a thick cornish accent. He seems to favor round black hats." },
  { thing: "Hat", descr: "A hat found near the tampered-with water valve. The initials SJ are stitched inside." },
  { thing: "Insurance", descr: "The insurance document showing a list of losses from the fire." },
  { thing: "Amulet", descr: "A wooden amulet on a twine string. A faded sketch of a girl is inside." }
  ];

var inventory =
  [{ thing: "Town Hall", descr: "The center of the town of Bodie. The Sheriff is usually here." },
  { thing: "Sheriff Hayes", descr: "The town's Sheriff. You met him when you first arrived. If you need a hint, see him at the Town Hall." },
  ];

var npc_plans =
  {
    "JS Cain":
    [{ op: "go", args: ["JS Cain", "Town Hall"] },
    { op: "talk", args: ["JS Cain", "Sheriff"] },
    { op: "go", args: ["JS Cain", "Bank"] },
    { op: "take", args: ["JS Cain", "Insurance Paper"] }
    //read/examine paper
    ],
    "Shotgun Johnny":
    [{ op: "go", args: ["Shotgun Johnny", "Firehouse"] },
    //examine water valve housing
    { op: "go", args: ["Shotgun Johnny", "Town Hall"] },
    { op: "talk", args: ["Shotgun Johnny", "Sheriff"] },
    { op: "take", args: ["Shotgun Johnny", "Key"] },
    { op: "go", args: ["Shotgun Johnny", "Firehouse"] },
    //open housing
    { op: "take", args: ["Shotgun Johnny", "Hat"] },
    { op: "go", args: ["Shotgun Johnny", "Graveyard"] }
    ]
  };

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
    case "ask": {
      return "Ask " + args[1] + " about " + args[2];
    }
    case "tell": {
      return "Tell " + args[1] + " about " + args[2];
    }
    default: return op + " " + args[args.length - 1];
  }
}

function displayState() {
  //applyOper(npc_plans["JS Cain"][0]);
  toRender = "";
  state = [];
  // stuff at all locations
  for (var i = 0; i < locations.length; i++) {
    var stuff = whatsAt(locations[i]);
    toRender += "<b>At " + locations[i] + ":</b>";
    if (stuff.length > 0) {
      toRender += "<p>" + stuff.toString() + "<br>";
    }

    toRender += "</p>";
    
    if (i == Math.ceil(locations.length / 2 - 1)) {
      document.getElementById("col1").innerHTML = toRender;
      toRender = "";
    }
  }

  document.getElementById("col2").innerHTML = toRender;
  
  //document.getElementById("state").innerHTML = toRender;
}

function displayInventory() {
  toRender = "Information<br>";
  
  for (var i = 0; i < inventory.length; i++) {
    toRender += "<a onclick=describeThing(" + i + ") href=javascript:void(0);>" + inventory[i].thing + "<br>";
  }


  // inventory of knowledge?
  document.getElementById("information").innerHTML = toRender;

  /*for (var key in descriptions) {
    if (knowledge[key] != "unknown") {
      inventory.push({ thing: key, descr: descriptions[key] });
      delete descriptions[key];
    }
  }*/
  for (var i = 0; i < descriptions.length; i++) {
    if (knowledge[descriptions[i].thing] != "unknown") {
      inventory.push(descriptions[i]);
      descriptions.splice(i, 1);
    }
  }
}

function describeThing(t) {
  var display_text = inventory[t].descr;
  document.getElementById("description").innerHTML = display_text;
  render();
}

function displayChoices() {
  // current_choices = generate_choices();
  toRenderAction = "";
  toRenderConversation = "";
  for (var i = 0; i < current_choices.length; i++) {
    var choice = current_choices[i];
    var last_character;
    if (choice.args[0] != last_character) {
      toRenderAction += "<br>" + "Actions for " + choice.args[0] + "<br>";
      toRenderConversation += "<br>" + "Conversation for " + choice.args[0] + "<br>";
    }
    //seperate operators for conversation and action
    if (choice.op == "talk" || choice.op == "ask" || choice.op == "tell"){
      toRenderConversation += "<a onclick=selectChoice(" + i + ") href=javascript:void(0);>" + choiceToString(choice) + "</a><br>";
    }
    else{
      toRenderAction += "<a onclick=selectChoice(" + i + ") href=javascript:void(0);>" + choiceToString(choice) + "</a><br>";
    }
    last_character = choice.args[0];
  }
  document.getElementById("actions").innerHTML = toRenderAction;
  document.getElementById("conversation").innerHTML = toRenderConversation;
}

function render() {
  current_choices = generate_choices();
  displayState();
  displayInventory();
  displayChoices();
}

function selectChoice(index) {

  var display_text = applyOper(current_choices[index]);

  document.getElementById("response").innerHTML = display_text;

  // current_choices = generate_choices();
  render();
}


function cmdToAction(cmd) {
  var { op, args } = cmd;

  switch (op) {
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
    case "ask": {
      return ask(args[0], args[1], args[2]);
    }
    case "tell": {
      return tell(args[0], args[1], args[2]);
    }
    default: return undefined;
  }
}

// returns text to display upon applying cmd
function applyOper(cmd) {

  var displayText = "Action not defined!"; // to return at the end

  var action = cmdToAction(cmd);

  if (action != undefined) {
    action.text = action.effects(); //call effects and set text
    displayText = action.text;
  }
  return displayText;
}

function whatsAt(loc) {
  var things = [];
  for (var thing in location_of) {
    if (location_of[thing] == loc) {
      things.push(thing);
    }
  }
  return things;
}

function generate_choices() {
  choices = [];
  // for each character, see what they can do
  for (var ci in characters) {
    var c = characters[ci];
    var loc = location_of[c];
    var things = whatsAt(loc);
    var things_held = whatsAt(c);

    //things at location of each character
    for (var ti in things) {
      var thing = things[ti];
      //taking it
      //if (characters.indexOf(thing) < 0 && npcs.indexOf(thing) < 0 && 
      //    loc == location_of[thing]) {
      if (take(c, thing).applies) {
        choices.push({ op: "take", args: [c, thing] });
      }
      else {
        // talking to it
        //if(thing != c && location_of[c] == location_of[thing]) {
        if (talk(c, thing).applies) {
          choices.push({ op: "talk", args: [c, thing] });
        }
      }
    } // end loop over things at location of c

    // giving it
    for (var thi in things_held) {
      thing_held = things_held[thi];

      for (var ci2 in npcs) {
        var c2 = npcs[ci2];
        //if (c != c2 && loc == location_of[c2] && c == location_of[thing_held]) {
        if (give(c, c2, thing_held).applies) {
          choices.push({ op: "give", args: [c, c2, thing_held] });
        }
      /*  if (ask(c, c2, thing_held).applies) {
          choices.push({ op: "ask", args: [c, c2, thing_held] });
        }
        if (tell(c, c2, thing_held).applies) {
          choices.push({ op: "tell", args: [c, c2, thing_held] });
        }
      */
      }
    }
    // places to move
    for (var li in locations) {
      var l = locations[li];
      //if(l != loc) {
      if (go(c, l).applies) {
        choices.push({ op: "go", args: [c, l] });
      }
    }
    //for (var i = 0; i < lookup_knowledge(c).length; i++) {
    for (var topic in topics) {
      //var topic = lookup_knowledge(c)[i].topic;
      var t = topic;
      for (var ci2 in npcs) {
        var c2 = npcs[ci2];
        if (ask(c, c2, t).applies) {
          choices.push({ op: "ask", args: [c, c2, t] });
        }
        if (tell(c, c2, t).applies) {
          choices.push({ op: "tell", args: [c, c2, t] });
        }
      }
    }
   /* for (var topic in topics) {
      var t = topics[topic];  

      for (var ci2 in npcs) {
        var c2 = npcs[ci2]
        if (ask(c, c2, t).applies) {
          choices.push({ op: "ask", args: [c, c2, t] });
        }
        if (tell(c, c2, t).applies) {
          choices.push({ op: "tell", args: [c, c2, t] });
        }

      }
    }*/


  } //end loop over characters
  return choices;

}

function begin() { render(); }

function ask(agent, npc, topic) {
  var applies = (location_of[agent] == location_of[npc]) && (topics[topic] == "known") && (find_quips(npc, topic)!= undefined) && (check_people_told(agent, find_quips(npc, topic)) != undefined);
  var text = "";
  function effects() {

    var quipArray = find_quips(npc, topic);
    var check = check_people_told(agent, quipArray);
    text += check.content;
    check.people_told.push(agent);
  return text;
  }
  return { applies: applies, effects: effects, text: text };
}


function tell(agent, npc, topic) {
  var applies = (location_of[agent] == location_of[npc]) && (find_quips(agent, topic)!= undefined) && (check_people_told(npc, find_quips(agent, topic)) != undefined);
  var text = "";
  function effects() { 
      //  var quips = find_quips(agent, topic);
        //var neww = check_people_told(agent, quips);
       // console.log(find_quips(agent, topic));
       // console.log(check_people_told(npc, find_quips(agent, topic)));
        var rat = check_people_told(npc, find_quips(agent, topic));
        
        text += rat.content; 
        rat.people_told.push(npc);
       // console.log(find_quips(agent, topic));
       // console.log(check_people_told(npc, find_quips(agent, topic)));
        if (find_quips(npc, topic) != undefined) {
          find_quips(npc,topic).push({content: rat.content, id: rat.id, people_told: [agent]});
        }
        else {
          lookup_knowledge(npc).push({topic: topic, quips: [{content: rat.content, id: rat.id, people_told: [agent]}]});   
        }
  return text;
  }
return { applies: applies, effects: effects, text: text };
}


function take(agent, thing) {

  var applies = (location_of[agent] == location_of[thing]) && (characters.indexOf(thing) < 0) &&
    (npcs.indexOf(thing) < 0);
  var text = "";

  function effects() {
    location_of[thing] = agent;
    var text = agent + " take the " + thing + ".";

    if (thing == "Amulet") {//thing is amulet
      knowledge["William Hang"] = "has";
    }

    if (thing == "Insurance Paper") {
      text = "</br ></br >JS Cain reaches to his desk and " +
             "pulls a sheet of paper from a file. <q>Here's a " +
             "partial list of losses for the citizens of the town. " +
             "The damage is huge, exceeding 88,000 dollars...</q>" +
             "</br ></br >" + agent + " take the " + thing + ".</br ></br >" +
             "Cain continues, <q>I already see something fishy. Notice " +
             "that Mrs. Perry lost less than almost anyone? Considering " +
             "that a good number of the lost buildings were in direct " +
             "competition with Perry... Something seems off. I suggest " +
             "you look around her bakery.</q>";
             knowledge["Insurance"] = "known";
    }
    else if (thing == "Letter") {
      text = "You unfold the letter, and see a sketch of " +
             "something called the U.S. Hotel, along with an " +
             "address on Main Street.</br></br>The letter reads</br></br>" +
             "<q>Pat,</br>This is Palmyre's sketch of our new business, " +
             "and where we'd like it to be. We think that it'd be a fantastic " +
             "addition to Bodie's Main Street, and bring quite a pretty penny " +
             "to everyone involved. We'd like to consider it not only the best " +
             "hotel in the county, but a roaring center of trade. Now, if only " +
             "that old man would sell us the rights to his land, we could move " +
             "forward with the plan...</br>Earnestly,</br>James</q>";
             knowledge["Letter"] = "known";
    }

    return text;
  }

  return { applies: applies, effects: effects, text: text };

}


function go(agent, place) {

  var applies = location_of[agent] != place;
  var text = "";

  function effects() {
    location_of[agent] = place;
    var text = "";

    //incorporating specific story line
    if (place == "Firehouse") {
      if (knowledge["You"] == "unknown") {
        text = "The firehouse is empty today, the sun " +
               "gleaming off of its bell. Of interest " +
               "is a ditch containing what seems to be " +
               "the housing for a water valve. You try " +
               "to look inside, but you're stopped by a heavy lock.";
               knowledge["Firehouse"] = "known";
      }
      else {
        text = "You use the key the sheriff gave you to open up " +
               "the lock on the valve housing.</br ></br>You remove the " +
               "cover, and sure enough, there's obvious evidence of " +
               "tampering. You see a flat black hat inside the valve " +
               "housing as well, similar to a sun hat. Stitched onto " +
               "the brim is a monogram, <q>SJ</q>. You grab it. ";
               
               knowledge["Hat"] = "known";
      }
    }
    else if (place == "JS Cain's House") {
      text = "You knock on the door to no avail. " +
             "Peering into the lavish windows, " +
             "you see that nobody's home." +
             "You should check elsewhere.";

    }
    else if (place == "Jail") {
      if (knowledge["William Hang"] == "unknown") {//amulet is not in possesion of you
        text = "The man in the jail cell looks almost asleep. " +
               "</br ></br >Check somewhere else. ";
      }
      else if (knowledge["William Hang"] == "has") {
        text = "Hang looks awake, so you ask about " +
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
      else if (knowledge["William Hang"] == "given") {
        text = "You've already spoken to the cook. He is turned " +
               "away, in the corner of the cell.";
      }
    }
    else if (place == "Bank") {
      text = "You enter the imposing Bodie Bank, " +
             "the most modern and expensive of all " +
             "the buildings in town. The safe stands " +
             "severe in the center, between brick and " +
             "steel bar. Facing the opposite wall is a " +
             "redwood desk. <br /><br />" +

             "Sitting there is a straight backed man with " +
             "salt and pepper hair, furiously filing documents " +
             "and flipping through files. He jerks to a stop as " +
             "you approach, and stands, stiffly. He turns to you " +
             "and you notice his gaunt face and pale eyes. ";
    }
    else if (place == "Bakery") {
      text = "You enter the ruins of the bakery. Scorched " +
             "bricks litter the ground, and white ash is " +
             "mixed into the dirt. The blaze that took out " +
             "half of Bodie started here. You see gnarled " +
             "cast iron about, indicating you're in the kitchen." +
             "<br /><br /> As you make your way through the " +
             "kitchen, you come across a one armed, portly man. " +
             "He is wearing a suit, despite the ashy ruin you " +
             "two stand in.";
    }
    else if (place == "Chinatown") {
      text = "You're struck by the massive amount of damage done " +
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
             "<br /><br /> This is a desolate place.";
    }
    else if (place == "Perry House") {
      text = "Poking your head through the doorframe, you see a woman " +
             "in a rocking chair, head buried in her hands. Hearing the " +
             "draft, she looks up and sees you. Her face is lined with " +
             "stress and weathered by sun.</br>";
    }
    else if (place == "Wesley House") {
      text = "The Wesley house is austere and well kept. You go to knock on " +
             "the door, but at the first rap the door creaks open. " +
             "</br></br>You go inside the " + place + ".</br></br> You see a letter.";

    }
    else {
      text = agent + " go to " + place;
    }

    return text;
  }

  return { applies: applies, effects: effects, text: text };

}

function wear(agent, thing) {

  var applies = (agent == location_of[thing]) && (clothing_on(agent) != thing);
  var text = "";

  function effects() {
    clothing_on[agent] = thing;
    var text = "";

    if (clothing_on[agent] == "") {
      text = agent + " wears " + thing;
    }
    else {
      text = agent + " takes off " + clothing_on[agent] + " and wears " + thing;
    }

    return text;
  }

  return { applies: applies, effects: effects, text: text };

}

function talk(agent1, agent2) {

  var loc = location_of[agent1];
  var applies = loc == location_of[agent2] && agent1 != agent2;
  var text = "";

  function effects() {

    var text = agent2 + " says hello to " + agent1 + "</br ></br >";
    //text += findTalk(npc, );
    if (agent2 == "Sheriff Hayes") {
      if ((knowledge["William Hang"] == "given") && (knowledge["Firehouse"] == "known")) {
        if (knowledge["You"] == "unknown") {
          text += "</br > You tell the sheriff what Hang told you about " +
                  "the firehouse, and he grimaces.</br ></br >" +
                  "Sheriff Hayes says, <q>I wish he had just told us his story. " +
                  "I can't release him yet, but you should hunt down that lead. " +
                  "Here's the key.</q></br ></br >You pocket it.";
                  knowledge["You"] = "known";
        }
        else if (knowledge["You"] == "known") {
          text = "Congratulations you have enough evidence to accuse William Hang of arson.</br></br>";
          if(knowledge["Hat"] == "known"){
            text += "Congratulations you have enough evidence to accuse Shotgun Johnny of arson.</br></br>";
          }
          if((knowledge["Letter"] == "known") && (knowledge["Insurance"] == "known")){
            text += "Congratulations you have enough evidence to accuse Shotgun Johnny and the Perrys of arson.</br></br>"
          }
        }
      }
      else if (knowledge["Firehouse"] == "known") {
        text = "You ask the Sheriff to unlock the firehouse.</br></br > " +
               "The Sheriff responds, <q>" +
               "Sorry kid, the firehouse is gonna stay locked up " +
               "tight unless you have a good reason to search it, " +
               "at the firefighters request.</q>";
      }
    }
    else if (agent2 == "Pat Wesley") {
      if (knowledge["Pat Wesley"] == "unknown") {
        text = "You ask Pat Wesley to give you some information about the Perrys.</br></br>" +
               "<q>They're in mourning " +
               "for their lost property, I suspect.</q></br ></br > Before you can get " +
               "in a word, he prattles on, </br ></br ><q>Yes, I represent them and " +
               "their businesses. I am here to... look for any sign of " +
               "foul play, and to reclaim any found valuables for the Perry " +
               "estate. A kind and noble pair they are. If you seek them, " +
               "check their home on Main Street, but I warn you, they're " +
               "likely to be in a sad state indeed.</q></br ></br >" +
               "<b>You now have access to the Perry and Wesley House</b>";
        locations.push("Perry House");
        locations.push("Wesley House");
        knowledge["Pat Wesley"] = "known";
      }
    }

    else if (agent2 == "Mr. Perry") {
      if (knowledge["Mr. Perry"] == "unknown") {
        text = "The man with the eyepatch stands straight and tall over " +
               "a squared off patch of land. He seems to be about sixty, " +
               "with a strong physique and confident demeanor. He stares " +
               "silently at the square. As you approach him, he looks you " +
               "in the eyes and says, <q>This is the spot I've picked for " +
               "my grave. You may find that odd, but somebody will have " +
               "to do it. I've decided to take the task into my own hands.</q> " +
               "</br></br><q>My name is James Perry. Mono County Supervisor. And you're " +
               "the deputy who's been looking into the fire.</q>";
               knowledge["Mr. Perry"] = "known";
      }
      else if ((knowledge["Mr. Perry"] == "known") && (knowledge["Letter"] == "known")) {
        text = "You show him the letter.</br></br>He smiles when you show him the " +
               "letter he sent to Pat Wesley. </br></br><q>Well, you're " +
               "quite the investigator, aren't you? Unfortunately, " +
               "that's not going to hold up in court. It's speculative, illegally " +
               "obtained, and with Wesley on my side no court will indict me on such " +
               "evidence. Besides. This is a place of constant change. Fires occur " +
               "naturally, after all - they destroy the dead wood.</q></br></br> He turns away " +
               "from you.";
      }
    }
    else if (agent2 == "Shotgun Johnny") {
      if (knowledge["Shotgun Johnny"] == "unknown") {
        text = "The short man strikes a comical figure, with a bulldog face " +
               "and a round black hat, similar to a sun hat.</br>You begin to " +
               "walk towards the man, but as you do, he saunters towards you " +
               "instead, breaking off his conversation. The tall man turns " +
               "back to the patch of land, brooding.</br>In a thick cornish " +
               "accent, he hollers, <q>Hello! I see you eyeing me. Well, I " +
               "decided I'd come over here, eye you instead. The prop's to " +
               "see how you like it.</q> He gets right up in your face. <q>They " +
               "call me Shotgun Johnny. Wanna guess why?</q> Menace flickers " +
               "in his eyes.</br></br>A tense moment passes, and he suddenly breaks out " +
               "in laughter.</br></br><q>Nah, I'm playin' with ya. What is it you want to say?</q>" +
               "There's still a bit of edge in his voice.";
               knowledge["Shotgun Johnny"] = "known";
      }
      else if ((knowledge["Hat"] == "known") && (knowledge["Shotgun Johnny"] == "known")) {
        text = "You show him the hat you found in the firehouse.</br></br><q>Yeah, " +
               "that's me hat...</q></br></br>Johnny blinks.</br></br><q>Where'd you find " +
               "that? I have another but that's my favorite. I got a prop " +
               "for ya - give it back? Please?</q></br></br>He realizes that he's " +
               "been made. <q></br></br>Damn. Alright, fine. I was there that night, " +
               "but you can't pin the arson on me. There's no way I could " +
               "have set the fire and sabotaged the water main at once. Now, " +
               "can I at least have my hat back?</q></br></br>You refuse to give him " +
               "the evidence.";
      }
    }
    else if ((agent2 == "Mrs. Perry") && (knowledge["Insurance"] == "known")) {
      text = "You pull out the document that Cain gave you and hand it to her. " +
             "Mrs. Perry is unimpressed.</br></br><q>Well? Why show me what I already " +
             "know? JS Cain likely told you I was up to no good, eh? He's " +
             "hated us for years.</q>";
    }

    return text;
  }

  return { applies: applies, effects: effects, text: text };
}

function give(agent1, agent2, thing) {

  var loc = location_of[agent1];
  var applies = (agent1 != agent2) && (agent1 == location_of[thing]) && (loc == location_of[agent2]);
  var text = "";

  //if npc given thing, i want npc to be "wearing" thing
  function effects() {
    var text = "";
    var graveYardAccess = 0;
    //graveYardAccess variable gives conditions for giving amulet, if we need to include another give this function needs to be edited
    if (thing == "Amulet" && agent2 == "William Hang") {
      graveYardAccess = 1;
    }

    if (graveYardAccess == 0) { }
    else {
      location_of[thing] = agent2
      locations.push("Graveyard");
      knowledge["William Hang"] = "given";
      if (clothing_on[agent1] == thing) {
        clothing_on[agent1] = "";
      }
    }
    if (graveYardAccess == 0) {
      text = "You try to hand the " + thing + " to " + agent2 + ".</br></br>" +
             agent2 + " responds, <q>No thank you, this " + thing + " is not mine.</q>";
    }
    else {
      text = agent1 + " give " + thing + " to " + agent2;
    }
    if (graveYardAccess > 0) {
      text += ". </br></br> <b>You now have access to the Graveyard.</b>";
    }

    return text;
  }

  return { applies: applies, effects: effects, text: text };
}