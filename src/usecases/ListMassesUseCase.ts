import { Mass } from '../domain/mass/Mass';
import MassRepository from '../domain/mass/MassRepository';
import UseCase from '../shared/UseCase';

export interface ListMassesQuery {
  filter: string;
}

export default class ListMassesUseCase
  implements UseCase<ListMassesQuery, Mass[]>
{
  constructor(private massRepository: MassRepository) {}

  execute(params?: ListMassesQuery): Mass[] {
    return this.massRepository.findAll(params?.filter);
  }
}
