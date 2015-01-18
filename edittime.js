function GetPluginSettings()
{
	return {
		"name":			"Leafletc2",				// as appears in 'insert object' dialog, can be changed as long as "id" stays the same
		"id":			"Leafletc2",				// this is used to identify this plugin and is saved to the project; never change it
		"version":		"0.1",					// (float in x.y format) Plugin version - C2 shows compatibility warnings based on this
		"description":	"leaftletjs plugin for Construct 2",
		"author":		"AZARI Nicolas",
		"help url":		"https://github.com/nicodinh/leafletc2",
		"category":		"General",				// Prefer to re-use existing categories, but you can set anything here
		"type":			"world",				// either "world" (appears in layout and is drawn), else "object"
		"rotatable":	false,					// only used when "type" is "world".  Enables an angle property on the object.
		"flags":		0,						// uncomment lines to enable flags...
					//	| pf_singleglobal		// exists project-wide, e.g. mouse, keyboard.  "type" must be "object".
					//	| pf_texture			// object has a single texture (e.g. tiled background)
					//	| pf_position_aces		// compare/set/get x, y...
					//	| pf_size_aces			// compare/set/get width, height...
					//	| pf_angle_aces			// compare/set/get angle (recommended that "rotatable" be set to true)
					//	| pf_appearance_aces	// compare/set/get visible, opacity...
					//	| pf_tiling				// adjusts image editor features to better suit tiled images (e.g. tiled background)
					//	| pf_animations			// enables the animations system.  See 'Sprite' for usage
					//	| pf_zorder_aces		// move to top, bottom, layer...
					//  | pf_nosize				// prevent resizing in the editor
					//	| pf_effects			// allow WebGL shader effects to be added
					//  | pf_predraw			// set for any plugin which draws and is not a sprite (i.e. does not simply draw
												// a single non-tiling image the size of the object) - required for effects to work properly
		//"dependency":	"leaflet-src.js"		
		"dependency":	"leaflet.js"
	};
};

////////////////////////////////////////
// Parameter types:
// AddNumberParam(label, description [, initial_string = "0"])			// a number
// AddStringParam(label, description [, initial_string = "\"\""])		// a string
// AddAnyTypeParam(label, description [, initial_string = "0"])			// accepts either a number or string
// AddCmpParam(label, description)										// combo with equal, not equal, less, etc.
// AddComboParamOption(text)											// (repeat before "AddComboParam" to add combo items)
// AddComboParam(label, description [, initial_selection = 0])			// a dropdown list parameter
// AddObjectParam(label, description)									// a button to click and pick an object type
// AddLayerParam(label, description)									// accepts either a layer number or name (string)
// AddLayoutParam(label, description)									// a dropdown list with all project layouts
// AddKeybParam(label, description)										// a button to click and press a key (returns a VK)
// AddAnimationParam(label, description)								// a string intended to specify an animation name
// AddAudioFileParam(label, description)								// a dropdown list with all imported project audio files

////////////////////////////////////////
// Conditions

// AddCondition(id,					// any positive integer to uniquely identify this condition
//				flags,				// (see docs) cf_none, cf_trigger, cf_fake_trigger, cf_static, cf_not_invertible,
//									// cf_deprecated, cf_incompatible_with_triggers, cf_looping
//				list_name,			// appears in event wizard list
//				category,			// category in event wizard list
//				display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//				description,		// appears in event wizard dialog when selected
//				script_name);		// corresponding runtime function name
				
// example				
AddNumberParam("Number", "Enter a number to test if positive.");
AddCondition(0, cf_none, "Is number positive", "My category", "{0} is positive", "Description for my condition!", "MyCondition");

////////////////////////////////////////
// Actions

// AddAction(id,				// any positive integer to uniquely identify this action
//			 flags,				// (see docs) af_none, af_deprecated
//			 list_name,			// appears in event wizard list
//			 category,			// category in event wizard list
//			 display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//			 description,		// appears in event wizard dialog when selected
//			 script_name);		// corresponding runtime function name

// example
AddStringParam("Message", "Enter a string to alert.");
AddAction(0, af_none, "Alert", "My category", "Alert {0}", "Description for my action!", "MyAction");

////////////////////////////////////////
// Expressions

// AddExpression(id,			// any positive integer to uniquely identify this expression
//				 flags,			// (see docs) ef_none, ef_deprecated, ef_return_number, ef_return_string,
//								// ef_return_any, ef_variadic_parameters (one return flag must be specified)
//				 list_name,		// currently ignored, but set as if appeared in event wizard
//				 category,		// category in expressions panel
//				 exp_name,		// the expression name after the dot, e.g. "foo" for "myobject.foo" - also the runtime function name
//				 description);	// description in expressions panel

// example
AddExpression(0, ef_return_number, "Leet expression", "My category", "MyExpression", "Return the number 1337.");

////////////////////////////////////////
ACESDone();

////////////////////////////////////////
// Array of property grid properties for this plugin
// new cr.Property(ept_integer,		name,	initial_value,	description)		// an integer value
// new cr.Property(ept_float,		name,	initial_value,	description)		// a float value
// new cr.Property(ept_text,		name,	initial_value,	description)		// a string
// new cr.Property(ept_color,		name,	initial_value,	description)		// a color dropdown
// new cr.Property(ept_font,		name,	"Arial,-16", 	description)		// a font with the given face name and size
// new cr.Property(ept_combo,		name,	"Item 1",		description, "Item 1|Item 2|Item 3")	// a dropdown list (initial_value is string of initially selected item)
// new cr.Property(ept_link,		name,	link_text,		description, "firstonly")		// has no associated value; simply calls "OnPropertyChanged" on click
// property_list[1].name = Map State Option

var property_list = [
	new cr.Property(ept_text, 		"tileLayer",	"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",	"An example property."),
	
	new cr.Property(ept_section,	"Map State Options",			""),
	new cr.Property(ept_float,		"centerLatitude",	 			51.505,	"Initial geographical center latitude of the map."),
	new cr.Property(ept_float,		"centerLongitude",				-0.09,	"Initial geographical center longitude of the map."),
	new cr.Property(ept_integer,	"zoom",							11,		"Initial map zoom."),
	new cr.Property(ept_text,		"layers",						null,	"Layers that will be added to the map initially.", "", true),
	new cr.Property(ept_integer,	"minZoom",						0,		"Minimum zoom level of the map. Overrides any minZoom set on map layers."),
	new cr.Property(ept_integer,	"maxZoom",						18,		"Maximum zoom level of the map. This overrides any maxZoom set on map layers."),
	new cr.Property(ept_text,		"maxBoundsLatitudeSouthWest",	null,	"When this option is set, the map restricts the view to the given geographical bounds, bouncing the user back when he tries to pan outside the view.", "", true), // type float
	new cr.Property(ept_text,		"maxBoundsLongitudeSouthWest",	null,	"When this option is set, the map restricts the view to the given geographical bounds, bouncing the user back when he tries to pan outside the view.", "", true), // type float	
	new cr.Property(ept_text,		"maxBoundsLatitudeNorthEast",	null,	"When this option is set, the map restricts the view to the given geographical bounds, bouncing the user back when he tries to pan outside the view.", "", true), // type float
	new cr.Property(ept_text,		"maxBoundsLongitudeNorthEast",	null,	"When this option is set, the map restricts the view to the given geographical bounds, bouncing the user back when he tries to pan outside the view.", "", true), // type float
	new cr.Property(ept_combo,		"crs",	"L.CRS.EPSG3857",	"Coordinate Reference System to use. Don't change this if you're not sure what it means.",	"L.CRS.EPSG3857|L.CRS.EPSG4326|L.CRS.EPSG3395|L.CRS.Simple"), // type CRS (not String)
	
	new cr.Property(ept_section,	"Interaction Options",	""),
	new cr.Property(ept_combo,		"dragging",					"True",		"Whether the map be draggable with mouse/touch or not.", "True|False"),
	new cr.Property(ept_combo,		"touchZoom",				"True",		"Whether the map can be zoomed by touch-dragging with two fingers.", "True|False"),
	new cr.Property(ept_combo,		"scrollWheelZoom",			"True",		"Whether the map can be zoomed by using the mouse wheel. If passed 'center', it will zoom to the center of the view regardless of where the mouse was.", "True|False"),
	new cr.Property(ept_combo,		"doubleClickZoom",			"True",		"Whether the map can be zoomed in by double clicking on it and zoomed out by double clicking while holding shift. If passed 'center', double-click zoom will zoom to the center of the view regardless of where the mouse was.", "True|False"),
	new cr.Property(ept_combo,		"boxZoom",					"True",		"Whether the map can be zoomed to a rectangular area specified by dragging the mouse while pressing shift.", "True|False"),
	new cr.Property(ept_combo,		"tap",						"True",		"Enables mobile hacks for supporting instant taps (fixing 200ms click delay on iOS/Android) and touch holds (fired as contextmenu events).", "True|False"),
	new cr.Property(ept_integer,	"tapTolerance",	    		15,			"The max number of pixels a user can shift his finger during touch for it to be considered a valid tap."),
	new cr.Property(ept_combo,		"trackResize",				"True",		"Whether the map automatically handles browser window resize to update itself.", "True|False"),
	new cr.Property(ept_combo,		"worldCopyJump",			"False",	"With this option enabled, the map tracks when you pan to another 'copy' of the world and seamlessly jumps to the original one so that all overlays like markers and vector layers are still visible.", "True|False"),
	new cr.Property(ept_combo,		"closePopupOnClick", 		"True",		"Set it to false if you don't want popups to close when user clicks the map.", "True|False"),
	new cr.Property(ept_combo,		"bounceAtZoomLimits", 		"True",		"Set it to false if you don't want the map to zoom beyond min/max zoom and then bounce back when pinch-zooming.", "True|False"),
	
	new cr.Property(ept_section,	"Keyboard Navigation Options",			""),
	new cr.Property(ept_combo,		"keyboard",					"True",		"Makes the map focusable and allows users to navigate the map with keyboard arrows and +/- keys.", "True|False"),
	new cr.Property(ept_integer,	"keyboardPanOffset",	 	80,		"Amount of pixels to pan when pressing an arrow key."),
	new cr.Property(ept_integer,	"keyboardZoomOffset",	 	1,			"Number of zoom levels to change when pressing + or - key."),
	
	new cr.Property(ept_section,	"Panning Inertia Options",	""),
	new cr.Property(ept_combo,		"inertia",					"True",		"If enabled, panning of the map will have an inertia effect where the map builds momentum while dragging and continues moving in the same direction for some time. Feels especially nice on touch devices.", "True|False"),
	new cr.Property(ept_integer,	"inertiaDeceleration",	    3000,		"The rate with which the inertial movement slows down, in pixels/second²."),
	new cr.Property(ept_integer,	"inertiaMaxSpeed",	    	1500,		"Max speed of the inertial movement, in pixels/second."),
	new cr.Property(ept_combo,		"inertiaThreshold",	    	"14",		"Number of milliseconds that should pass between stopping the movement and releasing the mouse or touch to prevent inertial movement. 32 for touch devices and 14 for the rest by default.", "14|32"), // type int
	
	new cr.Property(ept_section,	"Control options",			""),
	new cr.Property(ept_combo,		"zoomControl",				"True",			"Whether the zoom control is added to the map by default.", "True|False"),
	new cr.Property(ept_combo,		"attributionControl",		"True",			"Whether the attribution control is added to the map by default.", "True|False"),
	
	new cr.Property(ept_section,	"Animation options",		""),
	new cr.Property(ept_combo,		"fadeAnimation",			"True",	"Whether the tile fade animation is enabled. By default it's enabled in all browsers that support CSS3 Transitions except Android.", "True|False"),
	new cr.Property(ept_combo,		"zoomAnimation",			"True",	"Whether the tile zoom animation is enabled. By default it's enabled in all browsers that support CSS3 Transitions except Android.", "True|False"),
	new cr.Property(ept_integer,	"zoomAnimationThreshold",	1,			"Won't animate zoom if the zoom difference exceeds this value."),
	new cr.Property(ept_combo,		"markerZoomAnimation",		"True",	"Whether markers animate their zoom with the zoom animation, if disabled they will disappear for the length of the animation. By default it's enabled in all browsers that support CSS3 Transitions except Android.", "True|False"),
	
	new cr.Property(ept_section,	"TileLayer Options",		""),	
	new cr.Property(ept_integer,	"minZoom",	    			0,			"Minimum zoom number."),
	new cr.Property(ept_integer,	"maxZoom",	    			18,			"Maximum zoom number."), 
	new cr.Property(ept_text,		"maxNativeZoom",			null,		"Maximum zoom number the tiles source has available. If it is specified, the tiles on all zoom levels higher than maxNativeZoom will be loaded from maxZoom level and auto-scaled.", "", true),// type int
	new cr.Property(ept_integer,	"tileSize",	    			256,		"Tile size (width and height in pixels, assuming tiles are square)."),
	new cr.Property(ept_text, 		"subdomains",				"abc",		"Subdomains of the tile service. Can be passed in the form of one string (where each letter is a subdomain name) or an array of strings."),
	new cr.Property(ept_text, 		"errorTileUrl",				"",			"URL to the tile image to show in place of the tile that failed to load."),
	new cr.Property(ept_text, 		"attribution",				"Construct 2 &copy;",		"e.g. '© Mapbox' — the string used by the attribution control, describes the layer data."),
	new cr.Property(ept_combo,		"tms",	    				"False",			"If true, inverses Y axis numbering for tiles (turn this on for TMS services)", "True|False"), 
	new cr.Property(ept_combo,		"continuousWorld",			"False",			"If set to true, the tile coordinates won't be wrapped by world width (-180 to 180 longitude) or clamped to lie within world height (-90 to 90). Use this if you use Leaflet for maps that don't reflect the real world (e.g. game, indoor or photo maps).", "True|False"), 
	new cr.Property(ept_combo,		"noWrap",	    			"False",			"If set to true, the tiles just won't load outside the world width (-180 to 180 longitude) instead of repeating.", "True|False"), 
	new cr.Property(ept_integer,	"zoomOffset",	    		0,			"The zoom number used in tile URLs will be offset with this value."), 
	new cr.Property(ept_combo,		"zoomReverse",	   			"False",			"If set to true, the zoom number used in tile URLs will be reversed (maxZoom - zoom instead of zoom)", "True|False"), 
	new cr.Property(ept_float,		"opacity",	    			1.0,		"The opacity of the tile layer."), 
	new cr.Property(ept_text,		"zIndex",	    			null,		"The explicit zIndex of the tile layer. Not set by default.", "", true), // type int
	new cr.Property(ept_combo,		"unloadInvisibleTiles",		"False",	"If true, all the tiles that are not visible after panning are removed (for better performance). true by default on mobile WebKit, otherwise false.", "True|False"), // type bool
	new cr.Property(ept_combo,		"updateWhenIdle",	    	"False",	"If false, new tiles are loaded during panning, otherwise only after it (for better performance). true by default on mobile WebKit, otherwise false.", "True|False"), // type bool
	new cr.Property(ept_combo,		"detectRetina",	    		"False",	"If true and user is on a retina display, it will request four tiles of half the specified size and a bigger zoom level in place of one to utilize the high resolution.", "True|False"), 
	new cr.Property(ept_combo,		"reuseTiles",	    		"False",	"If true, all the tiles that are not visible after panning are placed in a reuse queue from which they will be fetched when new tiles become visible (as opposed to dynamically creating new ones). This will in theory keep memory usage low and eliminate the need for reserving new memory whenever a new tile is needed.", "True|False"), 
	new cr.Property(ept_text,		"BoundsLatitudeSouthWest",	null,		"When this option is set, the TileLayer only loads tiles that are in the given geographical bounds.", "", true), // type float
	new cr.Property(ept_text,		"BoundsLongitudeSouthWest",	null,		"When this option is set, the TileLayer only loads tiles that are in the given geographical bounds.", "", true), // type float	
	new cr.Property(ept_text,		"BoundsLatitudeNorthEast",	null,		"When this option is set, the TileLayer only loads tiles that are in the given geographical bounds.", "", true), // type float
	new cr.Property(ept_text,		"BoundsLongitudeNorthEast",	null,		"When this option is set, the TileLayer only loads tiles that are in the given geographical bounds.", "", true), // type float

	];
	
// Called by IDE when a new object type is to be created
function CreateIDEObjectType()
{
	return new IDEObjectType();
}

// Class representing an object type in the IDE
function IDEObjectType()
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new object instance of this type is to be created
IDEObjectType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance);
}

// Class representing an individual instance of an object in the IDE
function IDEInstance(instance, type)
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
	
	// Save the constructor parameters
	this.instance = instance;
	this.type = type;
	
	// Set the default property values from the property table
	this.properties = {};
	
	for (var i = 0; i < property_list.length; i++)
	{
		this.properties[property_list[i].name] = property_list[i].initial_value;
		//alert(property_list[i].initial_value);
	}	
	// Plugin-specific variables
	// this.myValue = 0...
}

// Called when inserted via Insert Object Dialog for the first time
IDEInstance.prototype.OnInserted = function()
{
}

// Called when double clicked in layout
IDEInstance.prototype.OnDoubleClicked = function()
{
}

// Called after a property has been changed in the properties bar
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
/*
	if (property_name === "crs")
	{
		if (this.properties["crs"] === "L.CRS.EPSG3857") 
		{
			alert(this.properties[property_list[12].name]);	
		}
	
	}
*/
}

// For rendered objects to load fonts or textures
IDEInstance.prototype.OnRendererInit = function(renderer)
{
}

// Called to draw self in the editor if a layout object
IDEInstance.prototype.Draw = function(renderer)
{
}

// For rendered objects to release fonts or textures
IDEInstance.prototype.OnRendererReleased = function(renderer)
{
}