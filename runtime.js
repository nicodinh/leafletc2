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
		console.log(this.layer);
		
		// Map
		this.map = L.map(this.properties[0] + this.uid, {
			// Map State Options
			center: [this.properties[2], this.properties[3]], // [Latitude , Longitude]
			zoom: this.properties[4],
			layers: null,
			minZoom: this.properties[6],
			maxZoom: this.properties[7],	
			maxBounds: null, // [[Latitude , Longitude], [Latitude , Longitude]]	
			crs: L.CRS.EPSG3857,
			// Interaction Options
			dragging: true,			
			touchZoom: true,			
			scrollWheelZoom: true,			
			doubleClickZoom: true,			
			boxZoom: true,			
			tap: true,			
			tapTolerance: 15,			
			trackResize: true,			
			worldCopyJump: false,			
			closePopupOnClick: true,
			bounceAtZoomLimits: true,
			// Keyboard Navigation Options
			keyboard: true,
			keyboardPanOffset: 80,
			keyboardZoomOffset: 1,
			// Panning Inertia Options
			inertia: true,
			inertiaDeceleration: 3000,
			inertiaMaxSpeed: 1500,
			inertiaThreshold: 14,
			// Control options
			zoomControl: true,
			attributionControl: true,
			// Animation options
			fadeAnimation: true,
			zoomAnimation: true,
			zoomAnimationThreshold: 4,
			markerZoomAnimation: true,
		});
		
		// TileLayer
		var tileLayer = this.properties[1] || 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
		var attribution	= this.properties[37] || 'Map data &copy;';
		
		L.tileLayer(
            tileLayer, {
            attribution: attribution,
            //maxZoom: maxZoom,
            }).addTo(this.map);

		this.updatePosition();
		this.runtime.tickMe(this);
		
		
	};
	
	// from built-in offical button runtime code.
	
	instanceProto.updatePosition = function(first) {
		
		
		/*
		var left = this.layer.layerToCanvas(this.x, this.y, true);	
		var top = this.layer.layerToCanvas(this.x, this.y, false);
		var right = this.layer.layerToCanvas(this.x + this.width, this.y + this.height, true);
		var bottom = this.layer.layerToCanvas(this.x + this.width, this.y + this.height, false);
		*/
		
		
		//var left = this.layer.layerToCanvas(this.x, this.y, true);	
		//var top = this.layer.layerToCanvas(this.x, this.y, false);
		
		var right = this.layer.layerToCanvas(this.x + this.width, this.y + this.height, true);
		var bottom = this.layer.layerToCanvas(this.x + this.width, this.y + this.height, false);
		
		
		
		

		//console.log(this.x);
		//console.log(this.y);

/*
		console.log("left " + left);
		console.log("top " +top);
		console.log("right " +right);
		console.log("bottom " +bottom);
*/
		// Is entirely offscreen or invisible: hide
/*
		if (!this.visible || !this.layer.visible || right <= 0 || bottom <= 0 || left >= this.runtime.width || top >= this.runtime.height)
		{
			jQuery(this.elem).hide();
			return;
		}

		// Truncate to canvas size
		if (left < 1)
			left = 1;
		if (top < 1)
			top = 1;
		if (right >= this.runtime.width)
			right = this.runtime.width - 1;
		if (bottom >= this.runtime.height)
			bottom = this.runtime.height - 1;

		jQuery(this.elem).show();
*/
		
		// left 255  	-> 126
		// top 155 		-> 56
		
		//var left = 126;
		//var top = 56.5;
		
		var left = this.x - (this.width / 2);
		var top = this.y - (this.height / 2);
		
		var offx = left + jQuery(this.runtime.canvas).offset().left;
		var offy = top + jQuery(this.runtime.canvas).offset().top;
		
		//console.log("a " + offx); //668
		//console.log("b " + offy); //393
		//console.log("c " + jQuery(this.runtime.canvas).offset().left); //413
		//console.log("d " + jQuery(this.runtime.canvas).offset().top); //238
		
		jQuery(this.elem).offset({left: offx, top: offy});
		//jQuery(this.elem).width(right - left);
		//jQuery(this.elem).height(bottom - top);
		
		
		/*
		//rounding position & width to avoid jitter
		this.elem.width = Math.round(this.elem.width);
		this.elem.height = Math.round(this.elem.height);
		this.elem.x = Math.round(this.elem.x);
		this.elem.y = Math.round(this.elem.y);
		*/	
	};
	instanceProto.tick = function() {
		this.updatePosition();
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
		alert(myparam);
		
		
		
		/*
		var map = L.map('map').setView([51.505, -0.09], 13);

		L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
			id: 'examples.map-i875mjb7'
		}).addTo(map);


		L.marker([51.5, -0.09]).addTo(map)
			.bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

		L.circle([51.508, -0.11], 500, {
			color: 'red',
			fillColor: '#f03',
			fillOpacity: 0.5
		}).addTo(map).bindPopup("I am a circle.");

		L.polygon([
			[51.509, -0.08],
			[51.503, -0.06],
			[51.51, -0.047]
		]).addTo(map).bindPopup("I am a polygon.");


		var popup = L.popup();

		function onMapClick(e) {
			popup
				.setLatLng(e.latlng)
				.setContent("You clicked the map at " + e.latlng.toString())
				.openOn(map);
		}

		map.on('click', onMapClick);
		*/
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