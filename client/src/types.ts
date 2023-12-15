export type ErrorWithMessage = {
  status: number;
  data: {
    message: string;
  };
};

export type Item = {
  id: string | null;
  rideFoto: string | null;
  rideName: string | null;
  afternoonFriday: string | null;
  afternoonMonday: string | null;
  afternoonSaturday: string | null;
  afternoonSunday: string | null;
  afternoonThursday: string | null;
  afternoonTuesday: string | null;
  afternoonWednesday: string | null;
  eveningFriday: string | null;
  eveningMonday: string | null;
  eveningSaturday: string | null;
  eveningSunday: string | null;
  eveningThursday: string | null;
  eveningTuesday: string | null;
  eveningWednesday: string | null;
  extraFriday: string | null;
  extraMonday: string | null;
  extraSaturday: string | null;
  extraSunday: string | null;
  extraThursday: string | null;
  extraTuesday: string | null;
  extraWednesday: string | null;
  morningFriday: string | null;
  morningMonday: string | null;
  morningSaturday: string | null;
  morningSunday: string | null;
  morningThursday: string | null;
  morningTuesday: string | null;
  morningWednesday: string | null;

  extraIsAvailableFriday: boolean | null;
  extraIsAvailableMonday: boolean | null;
  extraIsAvailableSaturday: boolean | null;
  extraIsAvailableSunday: boolean | null;
  extraIsAvailableThursday: boolean | null;
  extraIsAvailableWednesday: boolean | null;

  isAvailableFridayAfternoon: boolean | null;
  isAvailableFridayEvening: boolean | null;
  isAvailableFridayMorning: boolean | null;
  isAvailableMondayAfternoon: boolean | null;
  isAvailableMondayEvening: boolean | null;
  isAvailableMondayMorning: boolean | null;
  isAvailableSaturdayAfternoon: boolean | null;
  isAvailableSaturdayEvening: boolean | null;
  isAvailableSaturdayMorning: boolean | null;
  isAvailableSundayAfternoon: boolean | null;
  isAvailableSundayEvening: boolean | null;
  isAvailableSundayMorning: boolean | null;
  isAvailableThursdayAfternoon: boolean | null;
  isAvailableThursdayEvening: boolean | null;
  isAvailableThursdayMorning: boolean | null;
  isAvailableTuesdayAfternoon: boolean | null;
  isAvailableTuesdayEvening: boolean | null;
  isAvailableTuesdayMorning: boolean | null;
  isAvailableWednesdayAfternoon: boolean | null;
  isAvailableWednesdayEvening: boolean | null;
  isAvailableWednesdayMorning: boolean | null;
};
