Math.radians = function(degrees) {
    return degrees * Math.PI / 180;
  };
   
  Math.degrees = function(radians) {
    return radians * 180 / Math.PI;
  };
function measure(lat1, lon1, lat2, lon2){ 
    var R = 6378.137; // Radius of earth in KM
    var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d * 1000; // meters
}
//implementation of haversine formula by bburns.km (stack-overflow)
//Not working properly yet: creates a map and adapts it to the user's data
var map = class
{
    constructor(style_map)
    {
        this.style = style_map;
        this.max_lat = 0;
        this.max_lon = 0;
        this.min_lat = 1000;
        this.min_lon = 1000;
        this.zoom = 0;
        this.bottom;
        this.top ;
        this.right;
        this.left;
        this.diff_x;
        this.diff_y;
        this.mapTexture;
    }
    MakeMap()
    {
        for (let index = 0; index < elements.length; index++) 
        {
            if (elements[index].lat > this.max_lat)
                this.max_lat = elements[index].lat;
            if (elements[index].lat < this.min_lat)
                this.min_lat = elements[index].lat;
            if (elements[index].lon > this.max_lon)
                this.max_lon = elements[index].lon;
            if (elements[index].lon < this.min_lon)
                this.min_lon = elements[index].lon;
        }
        
        this.center_lat = (this.min_lat + this.max_lat)/2;
        this.center_lon = (this.min_lon + this.max_lon)/2;  

        this.S = Math.max(measure(this.center_lat,this.min_lon,this.center_lat,this.max_lon),measure(this.min_lat,this.center_lon,this.max_lat,this.center_lon));
        this.FindBoundaries();
        this.S = this.S/1280;
        this.ComputeZoom();
        this.mapTexture = new THREE.TextureLoader().load("https://api.mapbox.com/styles/v1/mapbox/"+this.style+"-v9/static/"+String(this.center_lon)+","+String(this.center_lat)+","+String(this.zoom)+",00.00,0.00/1280x1280@2x?access_token=pk.eyJ1Ijoic3F1ZWVsZSIsImEiOiJjamNlbmtxemIxZzVlMnFwZWIxNm5md2Q4In0.R-YjyLggEEUANk2GRTjN1A");

    }

    ComputeZoom()
    {
        var C = 40075000;
        var compar = (Math.cos(this.max_lat)*C)/this.S;
        while (Math.pow(2,this.zoom+8)<=compar)
        {
            this.zoom +=0.1;
        }
    }

    FindBoundaries()
    {
        if(measure(Math.radians(this.center_lat),Math.radians(this.min_lon),Math.radians(this.center_lat),Math.radians(this.max_lon)) <= measure(Math.radians(this.min_lat),Math.radians(this.center_lon),Math.radians(this.max_lat),Math.radians(this.center_lon)))
        {
            this.left = this.min_lon;
            this.right = this.max_lon;
            var compar = measure(Math.radians(this.min_lat),Math.radians(this.center_lon),Math.radians(this.max_lat),Math.radians(this.center_lon));
            while(measure(Math.radians(this.center_lat),Math.radians(this.left),Math.radians(this.center_lat),Math.radians(this.right)) < compar )
            {
                this.left -= 0.000001;
                this.right += 0.000001;
            }
            this.top = this.max_lat;
            this.bot = this.min_lat;
        }
        else
        {
            this.bot = this.min_lat;
            this.top = this.max_lat;
            var compar = measure(this.center_lat,this.min_lon,this.center_lat,this.max_lon);
            while(measure(this.bot,this.center_lon,this.top,this.center_lon) < compar )
            {
                this.bot -= 0.00001;
                this.top += 0.00001;
            }
            this.right = this.max_lon;
            this.left = this.min_lon;
        }
    }

}