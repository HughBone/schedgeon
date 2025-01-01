import type { ObjectId } from "mongodb";

export interface DBGroupType {
  _id: ObjectId;
  name: string;
}
