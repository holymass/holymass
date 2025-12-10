import Mass from '../domain/Mass';
import MassRepository from '../domain/MassRepository';
import UseCase from '../../../shared/UseCase';

export interface ListUpcomingMassesQuery {
  size: number;
}

export default class ListUpcomingMassesUseCase implements UseCase<
  ListUpcomingMassesQuery,
  Mass[]
> {
  #massRepository: MassRepository;

  constructor() {
    this.#massRepository = new MassRepository();
  }

  execute(params: ListUpcomingMassesQuery): Mass[] {
    return this.#massRepository.findUpcoming(params.size);
  }
}
