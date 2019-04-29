import { UtilsService } from '../shared/services/utilities/utils.service';
import { RedrawService } from '../shared/services/ui/redraw.service';

export class AddressObject {
    street1: string;
    street2: string;
    city: string;
    state: string;
    zip: string;
}

export class DistanceObject {
    white: number;
    yellow: number;
    red: number;
    blue: number;
    other: number;

    constructor(r?: number, y?: number, w?: number, b?: number, o?: number) {
        if (r) { this.red = r; }
        if (y) { this.yellow = r; }
        if (w) { this.white = r; }
        if (b) { this.blue = r; }
        if (o) { this.other = r; }
    }
}

export class GpsObject {
    lat: number;
    lng: number;
    distance: number;
    distanceAlongPath: number;

    constructor(latVal: number, lngVal: number, distanceVal?: number, distanceAlongPathVal?: number) {
        this.lat = latVal;
        this.lng = lngVal;
        if (distanceVal) { this.distance = distanceVal; }
        if (distanceAlongPathVal) { this.distanceAlongPath = distanceAlongPathVal; }
    }
}

export class PointOfInterestObject {
    name: string;
    shortName: string;
    gps: GpsObject;

    constructor(nameVal: string, shortNameVal?: string, gpsVal?: object) {
        this.name = nameVal;
        if (shortNameVal) { this.shortName = shortNameVal; }
        if (gpsVal) {
            this.gps = new GpsObject(gpsVal['lat'], gpsVal['lng'], gpsVal['distance'], gpsVal['distanceAlongPath']);
        }
    }
}

export class HoleObject {
    name: string;
    description: string;
    distance: DistanceObject;
    totalDistanceAlongPath: number;
    poi: Array<PointOfInterestObject>;

    private _utils: UtilsService;

    constructor(nameVal: string, descriptionVal?: string) {
        this._utils = new UtilsService();
        this.name = nameVal;
        if (descriptionVal) { this.description = descriptionVal; }
        this.distance = new DistanceObject();
        this.poi = new Array<PointOfInterestObject>();
    }

    addPoi(name: string, shortName: string, obj): HoleObject {
        this.poi.push(new PointOfInterestObject(name, shortName, obj));
        return this;
    }
    setDistance(obj: object): HoleObject {
        if (obj['red']) { this.distance.red = obj['red']; }
        if (obj['r']) { this.distance.red = obj['r']; }
        if (obj['blue']) { this.distance.blue = obj['blue']; }
        if (obj['b']) { this.distance.blue = obj['b']; }
        if (obj['yellow']) { this.distance.yellow = obj['yellow']; }
        if (obj['y']) { this.distance.yellow = obj['y']; }
        if (obj['white']) { this.distance.white = obj['white']; }
        if (obj['w']) { this.distance.white = obj['w']; }
        if (obj['other']) { this.distance.other = obj['other']; }
        if (obj['o']) { this.distance.other = obj['o']; }
        return this;
    }

    recalculateDistances(): HoleObject {
        /* Loop through POIs calculating distance to pin.
        Also calculate each POIs distance along the path.
        */
        // first, walk list forward setting each POIs distance from the pin.
        let tmpText, newTmpText;
        for (let i = 0; i < this.poi.length; i++) {
            this.poi[i].gps.distance =
            this._utils.yardsBetweenPoints( { lat: this.poi[i].gps.lat, lng: this.poi[i].gps.lng },
                { lat: this.poi[this.poi.length - 1].gps.lat, lng: this.poi[this.poi.length - 1].gps.lng } );

            /* Since I'm walking the object, add spaces to shortTitle for vertical display. */
            tmpText = this.poi[i].shortName;
            newTmpText = '';
            for (let j = 0; j < tmpText.length; j++) {
                newTmpText += tmpText[j] + ' ';
            }
            this.poi[i].shortName = newTmpText;
        }

        // next, walk the list backward adding distance of each point along path

        let totalDist = 0;
        for (let i = this.poi.length - 1; i > 0; i--) {
            totalDist += this._utils.yardsBetweenPoints( { lat: this.poi[i].gps.lat, lng: this.poi[i].gps.lng },
                                                         { lat: this.poi[i - 1].gps.lat, lng: this.poi[i - 1].gps.lng } );
            this.poi[i - 1].gps.distanceAlongPath = totalDist;
        }
        this.totalDistanceAlongPath = totalDist;
        return this;
    }
}

export class GolfCourseObject {
    name: string;
    description: string;
    address: AddressObject;
    holes: Array<HoleObject>;

    currentHole: HoleObject;
    currentHoleIndex: number;

    protected _redrawService: RedrawService;

    constructor(nameVal: string, descriptionVal?: string, obj?: object) {
        this.name = nameVal;
        this._redrawService = new RedrawService();

        if (obj) {
            this.address = new AddressObject();
            if (obj['street1']) { this.address.street1 = obj['street1']; }
            if (obj['street2']) { this.address.street1 = obj['street2']; }
            if (obj['city']) { this.address.street1 = obj['city']; }
            if (obj['state']) { this.address.street1 = obj['state']; }
            if (obj['zip']) { this.address.street1 = obj['zip']; }
        }
        if (descriptionVal) { this.description = descriptionVal; }
        this.holes = new Array<HoleObject>();
    }

    setCurrentHole(holeNum: number) {
        if (holeNum > 0 || holeNum < this.holes.length) {
            this.currentHoleIndex = holeNum;
            this.currentHole = this.holes[this.currentHoleIndex - 1];
            // console.log('setCurrentHole(' + holeNum + ')');
            this._redrawService.forceRedraw();
        }
    }
    addHole(holeVal: HoleObject): GolfCourseObject {
        this.holes.push(holeVal);
        this.currentHoleIndex = this.holes.length - 1;
        this.currentHole = this.holes[this.currentHoleIndex];
        return this;
    }
}

export class Master {
    planet: PlanetObject;
    courseList: Array<GolfCourseObject>;

    constructor() {
        this.planet = new PlanetObject('Earth');

        const c = this.planet.addCountry('United States of America', 'USA');

        const gc = new GolfCourseObject('1234 Sherwood', 'Testing GoPro Course', {
            street1: '1234 Sherwood Road',
            city: 'Shoreview',
            state: 'MN',
            zip: '55126'
        });

        let hole;

        hole = new HoleObject('1st Hole');
        hole.setDistance({ w: 444, y: 403, r: 397, b: 341});
        hole.addPoi( 'Tee Position', 'Tee', { lat: 45.084115, lng: -93.100149, distance:  0, distanceAlongPath: 0} );
        hole.addPoi( 'Fairway 1', '300', { lat: 45.083951, lng: -93.099239, distance: 0, distanceAlongPath: 0 } );
        hole.addPoi( 'Fairway 2', '250', { lat: 45.083914, lng: -93.098498, distance: 0, distanceAlongPath: 0 } );
        hole.addPoi( 'Fairway 3', '200', { lat: 45.084038, lng: -93.097262, distance: 0, distanceAlongPath: 0 } );
        hole.addPoi( 'Fairway 4', '150', { lat: 45.084159, lng: -93.096433, distance: 0, distanceAlongPath: 0 } );
        hole.addPoi( 'Fairway 5', '100', { lat: 45.084239, lng: -93.095752, distance: 0, distanceAlongPath: 0 } );
        hole.addPoi( 'Center Green', 'Green', { lat: 45.084291, lng: -93.095573, distance: 0, distanceAlongPath: 0 } );
        hole.addPoi( 'Pin', 'Pin', { lat: 45.084302, lng: -93.095467, distance: 0, distanceAlongPath: 0 } );
        gc.addHole(hole);

        hole = new HoleObject('2nd Hole');
        hole.setDistance({ w: 333, y: 322, r: 311, b: 300});
        hole.addPoi( 'Tee Position', 'Tee', { lat: 45.084115, lng: -93.100149, distance:  0, distanceAlongPath: 0} );
        hole.addPoi( 'Fairway 1', '300', { lat: 45.083951, lng: -93.099239, distance: 0, distanceAlongPath: 0 } );
        hole.addPoi( 'Fairway 2', '250', { lat: 45.083914, lng: -93.098498, distance: 0, distanceAlongPath: 0 } );
        hole.addPoi( 'Center Green', 'Green', { lat: 45.084291, lng: -93.095573, distance: 0, distanceAlongPath: 0 } );
        hole.addPoi( 'Pin', 'Pin', { lat: 45.084302, lng: -93.095467, distance: 0, distanceAlongPath: 0 } );
        gc.addHole(hole);

        hole = new HoleObject('3rd Hole');
        hole.setDistance({ w: 444, y: 403, r: 397, b: 341});
        hole.addPoi( 'Tee Position', 'Tee', { lat: 45.084115, lng: -93.100149, distance:  0, distanceAlongPath: 0} );
        hole.addPoi( 'Fairway 4', '150', { lat: 45.084159, lng: -93.096433, distance: 0, distanceAlongPath: 0 } );
        hole.addPoi( 'Fairway 5', '100', { lat: 45.084239, lng: -93.095752, distance: 0, distanceAlongPath: 0 } );
        hole.addPoi( 'Pin', 'Pin', { lat: 45.084302, lng: -93.095467, distance: 0, distanceAlongPath: 0 } );
        gc.addHole(hole);

        c.addCourse(gc);

        this.courseList = c.courses;
    }
}

export class CountryObject {
    name: string;
    shortName: string;
    courses: Array<GolfCourseObject>;

    currentCourse: GolfCourseObject;
    currentCourseIndex: number;

    constructor(nameVal: string, shortNameVal: string) {
        this.name = nameVal;
        this.shortName = shortNameVal;
        this.courses = new Array<GolfCourseObject>();
    }

    addCourse(courseVal: GolfCourseObject): CountryObject {
        this.courses.push(courseVal);
        this.currentCourseIndex = this.courses.length - 1;
        this.currentCourse = this.courses[this.currentCourseIndex];
        return this;
    }
    getCourse(nameVal: string): GolfCourseObject {
        if (this.courses.length < 1) { return null; }
        for (let i = 0; i < this.courses.length; i++) {
            if (this.courses[i].name === nameVal) { return this.courses[i] ; }
        }
        return null;
    }
}


export class PlanetObject {
    name: string;
    countries: Array<CountryObject>;
    currentCountryIndex: number;
    currentCountry: CountryObject;

    constructor(planetName: string) {
        this.name = planetName;
        this.countries = new Array<CountryObject>();
    }
    addCountry(nameVal: string, shortNameVal: string): CountryObject {
        this.countries.push(new CountryObject(nameVal, shortNameVal));
        this.currentCountryIndex = this.countries.length - 1;
        this.currentCountry = this.countries[this.currentCountryIndex];
        return this.currentCountry;
    }
    getCountry(nameVal: string, shortNameVal?: string): CountryObject {
        if (this.countries.length < 1) { return null; }
        for (let i = 0; i < this.countries.length; i++) {
            if ((shortNameVal ? this.countries[i].shortName : this.countries[i].name) === (shortNameVal ? shortNameVal : nameVal)) {
                return this.countries[i];
            }
        }
        return null;
    }
}
