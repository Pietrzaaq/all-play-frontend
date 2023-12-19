import axios from "axios";
export default new class AreasService {

    async getAll() {
        return await axios.get('https://localhost:5000/areas');
    }

    async create(sportEvent) {
        return await axios.post('https://localhost:5000/areas', sportEvent);
    }
};

