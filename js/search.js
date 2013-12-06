// JavaScript Document

/*

*********************
Author: Nathan Wharry
Title: Project 3 - D&D Character Sheet - Browse Javascript
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
		
		// populate or pull localStorage correctly
		if (localStorage.length === 0) {
			
			alert("Sorry, no characters to search through. Please go to the Add Character page and create a few first.");
						
		} else { 
						
			// loop through our localStorage to restructure our object
			for(var i=0, j=localStorage.length; i<j; i++) {
			
				// extract our data
				var key = localStorage.key(i),
					value = localStorage.getItem(key);
					
				// recreate our object from our localStorage data
				var charInfo = new Object,
					obj = JSON.parse(value);
					
				// make sure we keep our key value for edit function
				charInfo['Key'] = key;
				
				// loop through each object and push it into a singular array
				for (var n in obj) {
					
					// create object
					charInfo[obj[n][0]] = obj[n][1];	
					
				}; // close object creation
			
				// push object into our array
				sortArray.push(charInfo);
				
				// sort by character name for good design
				var searchSorted = sortArray.sort(sortBy('Name', false, function(a){return a.toUpperCase()}));				
			
			}; // close loop through localStorage
			
			// run our sort for browsing
			
			searchChar(searchSorted);
						
		}; // close for/else to autopopulate
		
	}; // close pullLocalStorage function


	// display our searchable list
	function searchChar(searchSorted) {
		
		var sortData = searchSorted;			
						
		// remove all display data divs
		if (document.getElementById('searchList') != null) {
			
			//remDiv = document.getElementById('searchList');
			//remDiv.parentNode.removeChild(remDiv);
			
			// create our array for LI elements
			var charSearchData = new Array;
			
			for(var i=0, j=sortData.length; i<j; i++) {
					
				// extract our data
				var key = sortData.Key,
					obj = sortData[i];
				
				charSearchData.push("<li data-filtertext='" + obj.Name + " " + obj.Race + " " + obj.Class + " " + obj.Gender + " " + obj.Age + " " + obj.Description + "'>" + obj.Name + "</li>");
				
			};
			
		// push our array into the html
		$('#searchList').html(charSearchData);
			
		// refresh our listview
		$('#searchList').listview("refresh");
			
		};		
		
		
		/*				
		// create our elements that will be used
		var searchUL = document.createElement("ul"),
			searchPage = ge('searchDisplay');
								
		// set up our main collapsible set div	
		searchUL.setAttribute("id", "searchList");
		searchUL.setAttribute("data-role", "listview");
		searchUL.setAttribute("data-filter", "true");
		searchUL.setAttribute("data-filter-placeholder", "Search for any data...");
		searchUL.setAttribute("data-inset", "true");
		
		// attach main ul to our content				
		searchPage.appendChild(searchUL);
								
		// Loop through localStorage
		for(var i=0, j=sortData.length; i<j; i++) {
				
			// create our seperate li element for out searchable content
			var searchLI = document.createElement("li");
												
			// extract our data
			var key = sortData.Key,
				obj = sortData[i];
				
			// create the filter text variable that will hold our filter text
			var filterText = obj.Name + " " + obj.Race + " " + obj.Class + " " + obj.Gender + " " + obj.Age + " " + obj.Description;
			
			// make our filter attributes
			searchLI.setAttribute("data-filtertext", filterText);			
			
			// add the list element to our UL
			searchUL.appendChild(searchLI);
			
			// add the name to our innerHTML of the LI
			searchLI.innerHTML = obj.Name;
																
		}; // end for loop through localStorage
		
		// refresh our data
		$('#searchDisplay ul').listview("refresh");
		
		*/
										
	}; // end function for displaying data
	
	
	// call our pullLocalStorage to populate our page
	pullLocalStorage();


});