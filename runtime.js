// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
// *** CHANGE THE PLUGIN ID HERE *** - must match the "id" property in edittime.js
//          vvvvvvvv
cr.plugins_.Leafletc2 = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	/////////////////////////////////////
	// *** CHANGE THE PLUGIN ID HERE *** - must match the "id" property in edittime.js
	//                            vvvvvvvv
	var pluginProto = cr.plugins_.Leafletc2.prototype;
		
	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function(plugin)
	{
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};

	var typeProto = pluginProto.Type.prototype;

	// called on startup for each object type
	typeProto.onCreate = function()
	{
	};

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;
		
		// any other properties you need, e.g...
		// this.myValue = 0;
	};
	
	var instanceProto = pluginProto.Instance.prototype;

	// called whenever an instance is created
	instanceProto.onCreate = function()
	{
		// note the object is sealed after this call; ensure any properties you'll ever need are set on the object
		// e.g...
		// this.myValue = 0;
	
		// css
		this.css1 = document.createElement("link");
		this.css1.rel = "stylesheet";
		this.css1.type = "text/css";
		this.css1.href = "http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css";
		document.head.appendChild(this.css1);
		
		// map contener
		this.elem = document.createElement("div");
		this.elem.id = "map" + this.uid;
		this.elem.style.width = "" + this.width + "px";
		this.elem.style.height = "" + this.height + "px";
		jQuery(this.elem).appendTo(this.runtime.canvasdiv ? this.runtime.canvasdiv : "body");
		
		console.log(this.properties);
		
		// map options value
		if (this.properties[11] === 0)
			this.crs = L.CRS.EPSG3857;	
		else if (this.properties[11] === 1)
			this.crs = L.CRS.EPSG4326;
		else if (this.properties[11] === 2)
			this.crs = L.CRS.EPSG3395;
		else
			this.crs = L.CRS.Simple;
		
		// map	
		this.map = L.map('map' + this.uid,
		{
			// Map State Options
			center: [this.properties[1], this.properties[2]], // [Latitude , Longitude]
			zoom: this.properties[3],
			layers: null, /* TODO */
			minZoom: this.properties[5],
			maxZoom: this.properties[6],	
			maxBounds: null, /* TODO */ //[[this.properties[7] , this.properties[8]], [this.properties[9] , this.properties[10]]], // [[Latitude , Longitude], [Latitude , Longitude]]	
			crs: this.crs,
			// Interaction Options
			dragging: this.properties[12] === 0 ? true : false,			
			touchZoom: this.properties[13] === 0 ? true : false,			
			scrollWheelZoom: this.properties[14] === 0 ? true : false,			
			doubleClickZoom: this.properties[15] === 0 ? true : false,			
			boxZoom: this.properties[16] === 0 ? true : false,			
			tap: this.properties[17] === 0 ? true : false,			
			tapTolerance: this.properties[18],			
			trackResize: this.properties[19] === 0 ? true : false,			
			worldCopyJump: this.properties[20] === 1 ? false : true,			
			closePopupOnClick: this.properties[21] === 0 ? true : false,
			bounceAtZoomLimits: this.properties[22] === 0 ? true : false,
			// Keyboard Navigation Options
			keyboard: this.properties[23] === 0 ? true : false,
			keyboardPanOffset: this.properties[24],
			keyboardZoomOffset: this.properties[25],
			// Panning Inertia Options
			inertia: this.properties[26] === 0 ? true : false,
			inertiaDeceleration: this.properties[27],
			inertiaMaxSpeed: this.properties[28],
			inertiaThreshold: this.properties[29] === 0 ? 14 : 32,
			// Control options
			zoomControl: this.properties[30] === 0 ? true : false,
			attributionControl: this.properties[31] === 0 ? true : false,
			// Animation options
			fadeAnimation: this.properties[32] === 0 ? true : false,
			zoomAnimation: this.properties[33] === 0 ? true : false,
			zoomAnimationThreshold: this.properties[34],
			markerZoomAnimation: this.properties[35] === 0 ? true : false,
		});
		
		// TileLayer
		var tileLayer = this.properties[0] || 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
		L.tileLayer(
            tileLayer,
			{
				minZoom: this.properties[36],
				maxZoom: this.properties[37],
				maxNativeZoom: null, /* TODO */
				tileSize: this.properties[39],
				subdomains: this.properties[40],
				errorTileUrl: this.properties[41],
				attribution: this.properties[42],
				tms: this.properties[43] === 1 ? false : true,
				continuousWorld: this.properties[44] === 1 ? false : true,
				noWrap: this.properties[45] === 1 ? false : true,
				zoomOffset: this.properties[46],
				zoomReverse: this.properties[47] === 1 ? false : true,
				opacity: this.properties[48],
				zIndex: null, /* TODO */
				unloadInvisibleTiles: this.properties[50] === 1 ? false : true,
				updateWhenIdle: this.properties[51] === 1 ? false : true,
				detectRetina: this.properties[52] === 1 ? false : true,
				reuseTiles: this.properties[53] === 1 ? false : true,
				BoundsLatitudeSouthWest: null,
				BoundsLongitudeSouthWest: null,
				BoundsLatitudeNorthEast: null,
				BoundsLongitudeNorthEast: null,
			}).addTo(this.map);

		this.updatePosition();
		this.runtime.tickMe(this);		
	};
	
	instanceProto.updatePosition = function(first) 
	{	
		var left = this.x - (this.width / 2);
		var top = this.y - (this.height / 2);
		var offx = left + jQuery(this.runtime.canvas).offset().left;
		var offy = top + jQuery(this.runtime.canvas).offset().top;
		jQuery(this.elem).offset({left: offx, top: offy});
	};
	
	instanceProto.tick = function()
	{
		this.updatePosition();
	};
	
	instanceProto.onDestroy = function() {
		if (this.runtime.isDomFree)
			return;

		jQuery(this.elem).remove();
		this.elem = null;
	};
	
	// only called if a layout object - draw to a canvas 2D context
	instanceProto.draw = function(ctx)
	{
	};
	
	// only called if a layout object in WebGL mode - draw to the WebGL context
	// 'glw' is not a WebGL context, it's a wrapper - you can find its methods in GLWrap.js in the install
	// directory or just copy what other plugins do.
	instanceProto.drawGL = function (glw)
	{
	};

	//////////////////////////////////////
	// Conditions
	function Cnds() {};

	// the example condition
	Cnds.prototype.MyCondition = function (myparam)
	{
		// return true if number is positive
		return myparam >= 0;
	};
	
	// ... other conditions here ...
	
	pluginProto.cnds = new Cnds();
	
	//////////////////////////////////////
	// Actions
	function Acts() {};

	// the example action
	Acts.prototype.MyAction = function (myparam)
	{
		// alert the message
		//alert(myparam);
	};
	
	// ... other actions here ...
	
	pluginProto.acts = new Acts();
	
	//////////////////////////////////////
	// Expressions
	function Exps() {};
	
	// the example expression
	Exps.prototype.MyExpression = function (ret)	// 'ret' must always be the first parameter - always return the expression's result through it!
	{
		ret.set_int(1338);				// return our value
		// ret.set_float(0.5);			// for returning floats
		// ret.set_string("Hello");		// for ef_return_string
		// ret.set_any("woo");			// for ef_return_any, accepts either a number or string
	};
	
	// ... other expressions here ...
	
	pluginProto.exps = new Exps();

}());