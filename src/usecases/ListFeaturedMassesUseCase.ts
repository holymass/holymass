import { Mass } from '../domain/mass/Mass';
import MassRepository from '../domain/mass/MassRepository';
import UseCase from '../shared/UseCase';

export default class ListFeaturedMassesUseCase
  implements UseCase<void, Mass[]>
{
  constructor(private massRepository: MassRepository) {}

  execute(): Mass[] {
    return this.massRepository.findFeatured(3);
  }
}
