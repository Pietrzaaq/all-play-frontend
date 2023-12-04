import axios from "axios";
export default new class SportEventService {
    
    async getAll() {
        return await axios.get('sport-events');
    }

    async create(sportEvent) {
        return await axios.post('sport-events', sportEvent);
    }
};

