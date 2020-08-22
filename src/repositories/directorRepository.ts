import Director, { DirectorCreationAttributes } from '../db/models/movie/Director';

class DirectorRepository {

    async getDirectors(): Promise<Director[]> {
        return await Director.findAll();
    }

    async getDirectorById(id: number): Promise<Director | null> {
        return await Director.findOne({ where: { id } });
    }

    async createDirector(crateDirectorPayload: DirectorCreationAttributes): Promise<Director> {

        const { firstName, lastName } = crateDirectorPayload;

        // Clean copy of specific properties.
        const directorData: DirectorCreationAttributes = { firstName, lastName };

        return await Director.create(directorData);

    }

}

const directorRepository = Object.freeze(new DirectorRepository());

export default directorRepository;