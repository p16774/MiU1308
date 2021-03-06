// JavaScript Document

/*

*********************
Author: Nathan Wharry
Title: Project 2 - D&D Character Sheet - Javascript
Term: MiU 1308
*********************

*/

// Wait for DOM to fully load
window.addEventListener("DOMContentLoaded", function() {
	
	// Functions for creation of elements **********
	
	// pull hash if available
	var display = window.location.hash,
		current_path = window.location.pathname.split('/').pop();
				
	function chooseDisplay(display) {
		
		switch(display) {
			
			case "#disp":
						
				// run our display data function			
				showChar();
				
				break;
			
			case "#clear":
			
				// run clear data function
				deleteChar();
				
				break;
			
			case "#name":
				
				// check current loaded page and redirect as needed
				if (current_path != "browse.html") {
					
					// navigate to the browse page
					window.location.assign("browse.html#name");
					
				} else {
					
					// run browse function
					browseName();
					
				}; // end if statement to validate current page
				
				
				break;
			
			default:
			
				if(current_path === "additem.html") {
					

					
				}; // end if to determine page
			
				break;
			
		}; // end switch display
			
	}; // end chooseDisplay function

	// getElementById Function
	function ge(x) {
		
		var myElement = document.getElementById(x);
		return myElement;
		
	};
	
	// Create Select Element for Race Selection
	function selRace() {
		
		// define needed variables		
		var races = ["--Choose A Race--", "Human", "Elf", "Dwarf", "Gnomes", "Half-Elf", "Half-Orc", "Halfling"],
			formTag = document.getElementsByTagName("form"),
			selectLi = ge("select_race"),
			makeSelect = document.createElement("select");
			makeSelect.setAttribute("id", "char_race");
			
		// Loop through races array and make our options
		for(var i=0, j=races.length; i<j; i++) {
			
			var makeOption = document.createElement("option");
			var optText = races[i];
			
			// Create our Option Tags
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			
			// Attach Option into Select Element
			makeSelect.appendChild(makeOption);
			
		};
		
		selectLi.appendChild(makeSelect);		
			
	}; // end selRace function
	
	// Create Select Element for Class Selection
	function selClass() {
		
		// define needed variables		
		var classes = ["--Choose A Class--", "Cleric", "Fighter", "Paladin", "Ranger", "Rogue", "Warlock", "Warlord", "Wizard", "------", "Avenger", "Barbarian", "Bard", "Druid", "Invoker", "Shaman", "Sorcerer", "Warden", "------", "Ardent", "Battlemind", "Monk", "Psion", "Runepriest", "Seeker"],
			formTag = document.getElementsByTagName("form"),
			selectLi = ge("select_class"),
			makeSelect = document.createElement("select");
			makeSelect.setAttribute("id", "char_class");
			
		// Loop through races array and make our options
		for(var i=0, j=classes.length; i<j; i++) {
			
			var makeOption = document.createElement("option");
			var optText = classes[i];
			
			// Create our Option Tags
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			
			// Attach Option into Select Element
			makeSelect.appendChild(makeOption);
			
		};
		
		selectLi.appendChild(makeSelect);		
			
	};
		
		
	// find selected radio button (gender)
	function genSelect() {
		
		// declare variables
		var radios = document.forms[1].char_gen;
				
		// loop through to get selected radio button
		for (var i=0; i<radios.length; i++) {
			
			// validate what is checked first
			if(radios[i].checked) {
					
					//assign value if checked
					genValue = radios[i].value;
					
			};
			
		};
		
	};
	
	function storeChar(key) {
				
		// pull in our argument for editing characters
		if (!key) {
						
			// create random number for unique id in local storage
			var id = Math.floor(Math.random()*10000000);
			var edit = false;
			
		} else {
			
			// use previous key to update character
			var id = key;
			var edit = true;
			
		};
		
		// run needed data functions
		genSelect();
				
		// gather our form fields and save our data
		var item				= {};
			item.char_name		= ["Name", ge("char_name").value];
			item.char_race		= ["Race", ge("char_race").value];
			item.char_gen		= ["Gender", genValue];
			item.char_class		= ["Class", ge("char_class").value];
			item.char_age		= ["Age", ge("char_age").value];
			item.char_weigh		= ["Weight", ge("char_weigh").value];
			item.char_birth		= ["BirthDay", ge("char_birth").value];
			item.char_desc		= ["Description", ge("char_desc").value];
			item.version		= ["Version", ge("version").value];	
			
			// variablize our stringify
			var itemData = JSON.stringify(item);
									
		// save our data into local storage
		localStorage.setItem(id, itemData);
		
		// validation to change the alert message
		if (edit === true) {
			
			alert("Character Updated Successfully!");
			
		} else {
			
			alert("New Character Created and Saved Successfully!");
			
		};
		
	};
			
	// function to toggle our form
	function toggleControls(n) {
		
		// switch element to display data or display form
		switch(n) {
			
			case "on":
				
				// hide the form and show the links
				ge('char_form').style.display = "none";
				
				break;
				
			case "off":

				// hide the form and show the links
				ge('char_form').style.display = "block";
				ge('charData').style.display = "none";

				break;
				
			default:
				return false;
				
		}; // close switch element
		
		
	};
	
	
	// Display Data variables and functions **********
	
	var displayChar = ge("navDisp");
	
	var showChar = function () {
				
		// toggle our display
		//toggleControls("on");
		
		// remove all display data divs
		if (document.getElementById('dispData') != null) {
			
			remDiv = document.getElementById('dispData');
			remDiv.parentNode.removeChild(remDiv);
			
		};
		
		// If statement to make sure we have data to display
		
			if (localStorage.length === 0) {
				
				alert("No character data to display so I created some for you!");
				
				// create testing data
				autoPopulate();
				
				// refresh page to load data that was just added
				showChar();
				
			} else {   
				
				// create our elements that will be used
				var dispDivMain = document.createElement("div"),
					dispPage = ge('charDisplay');
										
				// set up our main collapsible set div	
				dispDivMain.setAttribute("id", "dispData");
				dispDivMain.setAttribute("data-role", "collapsible-set");
				dispDivMain.setAttribute("data-inset", "false");
				
				// attach main div to our content				
				dispPage.appendChild(dispDivMain);
								
				// Loop through localStorage
				for(var i=0, j=localStorage.length; i<j; i++) {
					
					// create our seperate div elements for the characters and header element
					var dispDivInner = document.createElement("div"),
						dispCharHdr = document.createElement("h3");
					
					// set attributes to our new inner div and attach to main div then attach our character header to inner div
					dispDivInner.setAttribute("data-role", "collapsible");
					dispDivMain.appendChild(dispDivInner);
					dispDivInner.appendChild(dispCharHdr);
					
					// extract our data
					var key = localStorage.key(i),
						value = localStorage.getItem(key);
						
					// recreate our object from our localStorage data
					var obj = JSON.parse(value);

					// create img tag and data and attach to document h3 element
					var charItemHdr = "<img src=\"img/" + obj.char_gen[1] + ".png\" />" + obj.char_name[1];
					dispCharHdr.innerHTML = charItemHdr;
					
					// create our inner formatted set list element
					var charItemInnerUL = document.createElement("ul"),
						charItemInnerLI = document.createElement("li"),
						charItemInnerHdr = document.createElement("h4");
						charItemInnerA = document.createElement("a");
						charItemAside = document.createElement("p");
						
					// set up our element attributes
					charItemInnerUL.setAttribute("data-role", "listview");
					charItemInnerUL.setAttribute("data-inset", "true");
					charItemInnerA.setAttribute("href", "#edit");
					charItemAside.setAttribute("class", "ui-li-aside");
					
					// append elements to our InnerDiv
					dispDivInner.appendChild(charItemInnerUL);
					charItemInnerUL.appendChild(charItemInnerLI);
					charItemInnerHdr.innerHTML = obj.char_name[1];
					charItemInnerLI.appendChild(charItemInnerHdr);
					charItemInnerLI.appendChild(charItemInnerA);
					charItemInnerLI.appendChild(charItemAside);
					charItemAside.innerHTML = "<strong>Click to Edit &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>";

					// loop through data for proper itemization
					for(var n in obj) {
						
						if ( (n === "char_name") || (n === "version") ) {
							
							// do nothing since we don't need these
							
						} else {
							
							// create our paragraphs and attach our elements
							var charItemInnerP = document.createElement("p");
							charItemInnerLI.appendChild(charItemInnerP);
							
							// create our actual text
							var optSubText = obj[n][0] + ": " + obj[n][1];
							charItemInnerP.innerHTML = optSubText;
							charItemInnerLI.appendChild(charItemInnerP);
							
						}; // end our inner formatted list item
						
					}; // end for in loop
					
					// create our link element for deletion and attach to list item
					var charItemInnerDelA = document.createElement("a");
					charItemInnerDelA.setAttribute("href", "#del");
					charItemInnerLI.appendChild(charItemInnerDelA);
					
					// set our keys and make sure we have our eventListeners
					charItemInnerA.key = key;
					charItemInnerA.addEventListener("click", editItem);
					charItemInnerDelA.key = key;
					charItemInnerDelA.addEventListener("click", delItem);
					
									
				}; // end for loop through localStorage
				
			}; // end if statement for displaying data
			
		}; // end function for displaying data
		
				
		
		// create function to insert testing data
		function autoPopulate() {
			
			// Pull JSON data and store it into localStorage from our json.js file
			for (var n in json) {
				
				// create our unique identifier
				var id = Math.floor(Math.random()*10000000);
				
				// store data
				localStorage.setItem(id, JSON.stringify(json[n]));
				
			}; // end for/in loop
			
		}; // end autoPopulate function
		
		
		
		// fuction to make it edit our items
		function editItem() {
			
			// get data from local storage with our character information
			var value = localStorage.getItem(this.key);
				item = JSON.parse(value);
							
			// turn our toggle controls off to display form
			//toggleControls("off");
			
			// populate our data with the item to be edited
			ge('char_name').value = item.char_name[1];
			ge('char_race').value = item.char_race[1];
			
			var radios = document.forms[0].char_gen;
			
			// loop through to get selected radio button
			for (var i=0; i<radios.length; i++) {
				
				// validate what is checked first
				if(radios[i].value == "Male" && item.char_gen[1] == "Male") {
						
					//assign value if checked
					radios[i].setAttribute("checked", "checked");
						
				} else if (radios[i].value == "Female" && item.char_gen[1] == "Female") {
					
					//assign value if checked
					radios[i].setAttribute("checked", "checked");
					
				}; // end validation for what is checked
				
			};

			ge('char_class').value = item.char_class[1];
			ge('char_age').value = item.char_age[1];
			ge('char_weigh').value = item.char_weigh[1];
			ge('number').innerHTML = item.char_weigh[1]; // remember to change our display to show the correct slide position
			ge('char_birth').value = item.char_birth[1];
			ge('char_desc').value = item.char_desc[1];
			
			// change our submit button properties to edit data
			//addChar.removeEventListener("click", valChar);
			ge('char_submit').value = "Edit Character";
			var editSubmit = ge('char_submit');
			
			// create new event listener to run a new edit function and save key value for proper character editing
			//editSubmit.addEventListener("click", valChar);
			editSubmit.key = this.key;
			
		};
		
		// delete selected character from localStorage
		function delItem () {
			
			// get data from local storage with our character information
			var value = localStorage.getItem(this.key);
				item = JSON.parse(value);
										
			// populate our data with the item to be edited
			var charName = item.char_name[1];
			
			// make sure we really want to delete the character
			var ask = confirm("Are you sure you want to delete " + charName + " from the database?");
			
			// check conditional to delete or not delete
			if (ask) {
				
				//remove from local storage
				localStorage.removeItem(this.key);
				alert("Character Removed.");
				
				// reload the page
				showChar();
								
			} else {
				
				//alert that our data has not been deleted
				alert("No characters have been removed!");
				
			};
			
		};
		
		
		// validate character function for editing
		function valChar(e) {
			
			// elements we need to validate in our form
			var getCharName = ge("char_name");
			var getCharRace = ge("char_race");
			var getCharClass = ge("char_class");
			var getCharWeight = ge("char_weigh");
			
			// reset our error messages array
			errMsg.innerHTML = "";
			getCharName.style.border = "";
			getCharRace.style.border = "";
			getCharClass.style.border = "";
			getCharWeight.style.border = "";

			// error messages
			var errMessages = [];
			
			// Name Validation
			if (getCharName.value === "") {
				
				// name error message
				var nameError = "Please enter a character name.";
				getCharName.style.border = "1px solid #FFFF00";
				errMessages.push(nameError);
				
			};

			// Race Validation
			if (getCharRace.value == "--Choose A Race--") {
				
				// race error message
				var raceError = "Please select a valid race.";
				getCharRace.style.border = "1px solid #FFFF00";
				errMessages.push(raceError);
				
			};
			
			// Class Validation
			if (getCharClass.value === "--Choose A Class--" || getCharClass.value === "------") {
				
				// class error message
				var classError = "Please choose a character class.";
				getCharClass.style.border = "1px solid #FFFF00";
				errMessages.push(classError);
				
			};
			
			// Weight Validation
			if (getCharWeight.value == "0") {
				
				// weight error message
				var weightError = "Please move slider for proper weight";
				getCharWeight.style.border = "1px solid #FFFF00";
				errMessages.push(weightError);
				
			};
			
			// check for errors and display
			if (errMessages.length >= 1) {
				
				// loop through array of error message in case there is more than 1
				for(var i=0, j=errMessages.length; i<j; i++) {
					
					var errText = document.createElement('li');
					errText.innerHTML = errMessages[i];
					errMsg.appendChild(errText);
					
				}; // end for loop to display all errors
				
				// stop form from doing anything if we have errors
				e.preventDefault();
				return false;
				
			} else {
				
				alert('form has validated');
				
				// run our store data function if field validate
				storeChar(this.key);
				
			};
			
		};
		
	
	// Clear Data variables and functions **********
	
	var clearChar = ge("charClearInfo");
	
	var deleteChar = function() {
		
			if (localStorage.length === 0) {
				
				alert("No current data to clear.");
				
			} else {
				
				// make sure we really want to delete all data
				var ask = confirm("Are you sure you want to clear the entire character database?");
				
				// check conditional to delete or not delete
				if (ask) {
					
					localStorage.clear();
					alert("Database Cleared! All characters removed.");
					window.location.assign("index.html");
					return false;
					
				} else {
					
					//alert that our data has not been deleted
					alert("Database Saved! No characters removed.");
					window.location.assign("index.html");
					return false;
					
				}; // end confirm if statement
								
			}; // end else statement to check for data
		
		}; // end delete database function
		
	
	// Execute the search parameters under the search page
	function charSearch(e) {
		
		alert('you made it here');
		
	};
	
	// Browse by Name
	function browseName() {
		
		//develop proper sorting functions
				
		
	};
		
		
	// Execute Needed Functions and declare variables
	var genValue,
		errMsg = ge('errors');
		
		selRace();
		selClass();
		
	// Search Feature to be designed. **********
	
	var searchBox = ge("charSearchBtn");		
	
	// Store Data variables and functions **********
	
	var addChar = ge("charSubmitBtn");		
		
	// Event Listener Calls
	displayChar.addEventListener("click", showChar); // display data function
	clearChar.addEventListener("click", deleteChar); // clear ALL local storage data
	addChar.addEventListener("click", valChar); // add new character data function
	//searchBox.addEventListener("click", charSearch); // run the search parameters
	


}); // End DOM Loaded Function