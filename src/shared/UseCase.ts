export default interface UseCase<P, R> {
  execute(params?: P): R;
}
