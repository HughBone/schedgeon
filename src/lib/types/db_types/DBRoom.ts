import type { DBMember, DBMemberOld } from "$lib/types/db_types/DBMember";
import type { DBGroupType } from "$lib/types/db_types/DBGroupType";
import type { ObjectId } from "mongodb";

interface DBScheduleOld {
  dates: number[];
  times: {
    begin: number;
    end: number;
    total: number;
  };
}

export interface DBRoomOld {
  _id: ObjectId;
  name: string;
  owner_id: string;
  schedule: DBScheduleOld;
  groups: string[];
  members: DBMemberOld[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DBDay {
  startEpoch: number;
  endEpoch: number;
}

export interface DBRoom {
  _id: ObjectId;
  name: string;
  ownerId: ObjectId;
  roomDaysDB: DBDay[];
  groups: DBGroupType[];
  members: DBMember[];
  createdAt: Date;
  updatedAt: Date;
}
