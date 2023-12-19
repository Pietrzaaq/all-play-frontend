﻿export default class Area  {
    constructor(
        name,
        streetAddress,
        isOutdoorArea = false,
        latitude,
        longitude
    ) {
        this.name = name;
        this.streetAddress = streetAddress;
        this.isOutdoorArea = isOutdoorArea;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}