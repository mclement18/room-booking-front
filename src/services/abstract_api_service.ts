export abstract class AbstractApiService<Data = unknown> {
  public abstract create(dto: object): Promise<Data | undefined>;

  public abstract update(id: number, dto: object): Promise<Data | undefined>;

  public abstract delete(id: number): Promise<Data | undefined>;
}
