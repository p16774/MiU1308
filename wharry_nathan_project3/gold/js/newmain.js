$('#home').on('pageinit', function(){
	//code needed for home page goes here
});	
		
$('#add').on('pageinit', function(){

		var myForm = $('#charForm');
		    myForm.validate({
				
				rules: {
					char_name: { required: true },
					char_race: { required: true },
					char_class: { required: true },
					char_gen: {required: true }
				},
				
				invalidHandler: function(form, validator) {   },
				
				submitHandler: function() {
					var data = myForm.serializeArray();
						storeData(data);
						
				}
	});
	
	
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
			makeSelect.setAttribute("name", "char_race");
			makeSelect.setAttribute("data-native-menu", "false");
			
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
			makeSelect.setAttribute("name", "char_class");
			makeSelect.setAttribute("data-native-menu", "false");

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
	
	
	// Execute Needed Functions and declare variables
	var genValue,
		errMsg = ge('errors');
		
		selRace();
		selClass();
		
		
		// validate character function for editing
		function validate() {
			
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
	
	// Store Data variables and functions **********
	var addChar = ge("charSubmitBtn");		
		
	// Event Listener Calls
	//addChar.addEventListener("click", valChar); // add new character data function

	
	//any other code needed for addItem page goes here
	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){
	
	
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
			editSubmit.addEventListener("click", valChar);
			editSubmit.key = this.key;
			
		};
	
	
	 
};

var getData = function(){
	

};

var storeData = function(data){
					
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
				
		}; // close if conditional for checked value
		
	}; // close for loop to search through the radios
	
}; // end genSelect function



var	deleteItem = function (){
	
	
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
			
};
					
var clearLocal = function(){

};


