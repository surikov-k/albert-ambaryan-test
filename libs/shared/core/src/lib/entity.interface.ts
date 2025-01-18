export type EntityIdType = string;
export type PlainObject = Record<string, unknown>;

export interface Entity<T extends EntityIdType, ObjectType = PlainObject> {
  id?: T;
  toPlainObject(): ObjectType;
}
