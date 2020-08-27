import Actor, { ActorCreationAttributes } from '../db/models/movie/Actor';

class ActorRepository {

    async getActors(): Promise<Actor[]> {
        return await Actor.findAll();
    }

    async getActorById(id: number): Promise<Actor | null> {
        return await Actor.findOne({ where: { id } });
    }

    async createActor(crateActorPayload: ActorCreationAttributes): Promise<Actor> {

        const { firstName, lastName } = crateActorPayload;

        // Clean copy of specific properties.
        const actorData: ActorCreationAttributes = { firstName, lastName };

        return await Actor.create(actorData);

    }

}

export default ActorRepository;