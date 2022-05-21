import Mass from '../domain/Mass';
import MassRepository from '../domain/MassRepository';
import UseCase from '../../../shared/UseCase';

export interface ListFeaturedMassesQuery {
  size: number;
}

export default class ListFeaturedMassesUseCase
  implements UseCase<ListFeaturedMassesQuery, Mass[]>
{
  constructor(private massRepository: MassRepository) {}

  execute(params: ListFeaturedMassesQuery): Mass[] {
    return this.massRepository.findFeatured(params.size);
  }
}
