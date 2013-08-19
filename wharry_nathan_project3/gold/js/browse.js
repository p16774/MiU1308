// JavaScript Document

/*

*********************
Author: Nathan Wharry
Title: Project 2 - D&D Character Sheet - Browse Javascript
Term: MiU 1308
*********************

*/

// Wait for DOM to fully load
window.addEventListener("DOMContentLoaded", function() {
	
	// getElementById Function
	function ge(x) {
		
		var myElement = document.getElementById(x);
		return myElement;
		
	};
	
	var showChar = function () {
						
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
	
	function sortBy(sortField, sortReverse, dataType) {
		
		// create sort function to allow any field to be sorted
		var id = function (x) { return dataType ? dataType(x[sortField]) : x[sortField]};
		
		return function (a,b) {

			var A = id(a), B = id(b);
			return ((A < B) ? -1 : (A > B) ? 1 : 0) * [1,-1][+!!sortReverse];
			
		}; // close function that allow multiple sort types
		
	}; // close sortArray function
	
	
	// function for pulling data and turning into sortable array
	function pullLocalStorage () {
		
		// create our array that we'll store our singlular object
		var sortArray = new Array;
		
		// loop through our localStorage to restructure our object
		for(var i=0, j=localStorage.length; i<j; i++) {
		
			// extract our data
			var key = localStorage.key(i),
				value = localStorage.getItem(key);
				
			// recreate our object from our localStorage data
			var charInfo = new Object,
				obj = JSON.parse(value);
			
			// loop through each object and push it into a singular array
			for (var n in obj) {
				
				// create object
				charInfo[obj[n][0]] = obj[n][1];	
				
			}; // close object creation
		
			// push object into our array
			sortArray.push(charInfo);
		
		}; // close loop through localStorage
		
		// send back the built array
		return sortArray;
		
	}; // close pullLocalStorage function
		
			
	// function to sort localStorage by string
	function byText(sortArray, sortField) {
		
		// evaluate the array and sort properly
		return sortArray.sort(sortBy(sortField, false, function(a){return a.toUpperCase()}));				
		
	};
	
	
	// function to sort localStorage by number
	function byNumber(sortArray, sortField) {
		
		// evaluate the array and sort properly
		return sortArray.sort(sortBy(sortField, false, parseInt));				

	}; 
	
	
	// browse functions
	function browseType(sortField) {
		
		// call localStorage
		var sortArray = pullLocalStorage();
		
		switch(sortField) {
						
			case "#name":
						
				// sort the array by name		
				return byText(sortArray, 'Name');
				
				break;
			
			case "#race":
			
				// sort the array by name		
				return byText(sortArray, 'Race');
				
				break;
			
			case "#class":
				
				// sort the array by name		
				return byText(sortArray, 'Class');
				
				break;

			case "#gender":
			
				// sort the array by name		
				return byText(sortArray, 'Gender');
				
				break;
				
			case "#status":
			
				// sort the array by name		
				return byText(sortArray, 'Status');
				
				break;
			
		}; // end switch display
		
	}; // close browse function
	
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
				window.location.reload();
								
			} else {
				
				//alert that our data has not been deleted
				alert("No characters have been removed!");
				window.location.reload();
				
			};
			
		};
	
	showChar();

}); // end Wait For Page to Load function