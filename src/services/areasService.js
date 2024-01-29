import axios from "axios";
export default new class AreasService {

    async getAll() {
        return await axios.get('https://localhost:5000/api/areas');
    }

    async create(area) {
        return await axios.post('https://localhost:5000/api/areas', area);
    }
};

