import type { DBMember } from "$lib/types/db_types/DBMember";
import type { DateTime } from "luxon";

export interface TimeSlot {
  // NOTE: id/key is the index
  dateTime: DateTime;
  readableDateTime: string;
  members: DBMember[];
  isSelected: boolean;
  isDisabled: boolean;
}
