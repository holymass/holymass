import Mass from '../domain/Mass';
import MassRepository from '../domain/MassRepository';
import UseCase from '../../../shared/UseCase';

export default class ListFeaturedMassesUseCase
  implements UseCase<void, Mass[]>
{
  constructor(private massRepository: MassRepository) {}

  execute(): Mass[] {
    return this.massRepository.findFeatured(3);
  }
}
