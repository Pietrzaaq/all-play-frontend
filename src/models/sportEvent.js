export default class SportEvent  {
    constructor(
        areaId,
        sportType,
        createdBy,
        creationDate,
        eventStartDate,
        eventEndDate
    ) {
        this.areaId = areaId;
        this.sportType = sportType;
        this.createdBy = createdBy;
        this.creationDate = creationDate;
        this.eventStartDate = eventStartDate;
        this.eventEndDate = eventEndDate;
    }
}