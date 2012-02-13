/**
 * @requires OpenLayers/Format.js
 */

/**
 * Class: OpenLayers.Format.Waypoint
 * Read OziExplorer Waypoint File (.wpt)
 *
 * Inherits from:
 *  - <OpenLayers.Format>
 */
OpenLayers.Format.Waypoint = OpenLayers.Class(OpenLayers.Format, {
    // http://www.caching.ru/help_ozi/fileformats.html
    // http://www.slovenia-pgopen.com/downloads/Kobarid_Lijak.wpt

    read: function(data) {
        // Line 1 : File type and version information
        // Line 2 : Geodetic Datum used for the Lat/Lon positions for each waypoint
        // Line 3 : Reserved for future use
        // Line 4 : GPS Symbol set - not used yet

        // FIXME
        this.externalProjection = new OpenLayers.Projection("EPSG:4326");

        var lines = data.split('\n');
        var features = [];
        for (var i = 4, len = lines.length; i < len; i++) {
            var waypoint = lines[i].split(',');
            var fid = waypoint[0];
            var geom = new OpenLayers.Geometry.Point(waypoint[3], waypoint[2]);

            if (this.internalProjection && this.externalProjection) {
                geom.transform(this.externalProjection, this.internalProjection);
            }

            features.push(new OpenLayers.Feature.Vector(geom, {
                name: waypoint[1],
                description: waypoint[10],
                altitude: waypoint[14]
                // ...
            }));
        }
        return features;
    },

    CLASS_NAME: "OpenLayers.Format.Waypoint"
});

