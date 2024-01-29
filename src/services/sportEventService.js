import axios from "axios";
export default new class SportEventService {
    
    async getAll() {
        return await axios.get('https://localhost:5000/api/sport-events');
    }

    async create(sportEvent) {
        return await axios.post('https://localhost:5000/api/sport-events', sportEvent);
    }
};

