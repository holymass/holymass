import Mass from '../domain/Mass';
import MassRepository from '../domain/MassRepository';
import UseCase from '../../../shared/UseCase';

export interface ListMassesQuery {
  filter?: string;
  liturgicalYear?: string;
}

export default class ListMassesUseCase implements UseCase<
  ListMassesQuery,
  Mass[]
> {
  #massRepository: MassRepository;

  constructor() {
    this.#massRepository = new MassRepository();
  }

  execute(params: ListMassesQuery): Mass[] {
    const { filter = '', liturgicalYear = '' } = params;
    return this.#massRepository.findAll(filter, liturgicalYear);
  }
}
