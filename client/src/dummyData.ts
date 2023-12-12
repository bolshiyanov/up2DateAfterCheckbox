export const boatsTypes = [
  {
    key: "01",
    value: "01",
    name: "Boat Normal",
  },
  {
    key: "02",
    value: "02",
    name: "Boat big",
  },
  {
    key: "03",
    value: "03",
    name: "Boat small",
  },
];

export const portsTypes = [
  {
    key: "01",
    value: "01",
    name: "Puerto Colon",
  },
  {
    key: "02",
    value: "02",
    name: "Los Gigantes",
  },
  {
    key: "03",
    value: "03",
    name: "Los Cristianos",
  },
];

export const ridesTypes = [
  {
    key: "01",
    value: "01",
    name: "Boats Rides",
    startPoints: [
      {
        key: "01",
        value: "01",
        name: "Puerto Colon",
      },
      {
        key: "02",
        value: "02",
        name: "Los Gigantes",
      },
    ],
    categorias: [
      {
        key: "01",
        value: "01",
        name: "Catamarans",
      },
      {
        key: "02",
        value: "02",
        name: " Sailin",
      },
      {
        key: "03",
        value: "03",
        name: "Motor yachts",
      },
      {
        key: "04",
        value: "04",
        name: "Fishing",
      },
      {
        key: "05",
        value: "05",
        name: "Rent a boat",
      },
      {
        key: "06",
        value: "06",
        name: "Motor yachts",
      },
      {
        key: "07",
        value: "07",
        name: "Submarine",
      },
      {
        key: "08",
        value: "08",
        name: "other",
      },
    ],
  },
  {
    key: "02",
    value: "02",
    name: " Watersports Rides",
    startPoints: [
      {
        key: "01",
        value: "01",
        name: "Puerto Colon",
      },
      {
        key: "02",
        value: "02",
        name: "Los Gigantes",
      },
    ],
    categorias: [
      {
        key: "01",
        value: "01",
        name: "Jetski",
      },
      {
        key: "02",
        value: "02",
        name: "Diving",
      },
      {
        key: "03",
        value: "03",
        name: " Surfing",
      },
      {
        key: "04",
        value: "04",
        name: " other",
      },
    ],
  },
  {
    key: "03",
    value: "03",
    name: "Air Rides",
    startPoints: [
      {
        key: "01",
        value: "01",
        name: "Tenerife Sur",
      },
    ],
    categorias: [
      {
        key: "01",
        value: "01",
        name: "Paragliding",
      },
      {
        key: "02",
        value: "02",
        name: "Helicopter",
      },
    ],
  },
  {
    key: "04",
    value: "04",
    name: "Wheels Rides",
    startPoints: [
      {
        key: "01",
        value: "01",
        name: "Tenerife Sur",
      },
    ],
    categorias: [
      {
        key: "01",
        value: "01",
        name: "Stars",
      },
      {
        key: "02",
        value: "02",
        name: "Quads",
      },
      {
        key: "03",
        value: "03",
        name: "Buggy",
      },
      {
        key: "04",
        value: "04",
        name: "other",
      },
    ],
  },
];

export const allTimes: { [key: string]: string }[] = [
  { "01": "00:00" },
  { "02": "00:30" },
  { "03": "01:00" },
  { "04": "01:30" },
  { "05": "02:00" },
  { "06": "02:30" },
  { "07": "03:00" },
  { "08": "03:30" },
  { "09": "04:00" },
  { "10": "04:30" },
  { "11": "05:00" },
  { "12": "05:30" },
  { "13": "06:00" },
  { "14": "06:30" },
  { "15": "07:00" },
  { "16": "07:30" },
  { "17": "08:00" },
  { "18": "08:30" },
  { "19": "09:00" },
  { "20": "09:30" },
  { "21": "10:00" },
  { "22": "10:30" },
  { "23": "11:00" },
  { "24": "11:30" },
  { "25": "12:00" },
  { "26": "12:30" },
  { "27": "13:00" },
  { "28": "13:30" },
  { "29": "14:00" },
  { "30": "14:30" },
  { "31": "15:00" },
  { "32": "15:30" },
  { "33": "16:00" },
  { "34": "16:30" },
  { "35": "17:00" },
  { "36": "17:30" },
  { "37": "18:00" },
  { "38": "18:30" },
  { "39": "19:00" },
  { "40": "19:30" },
  { "41": "20:00" },
  { "42": "20:30" },
  { "43": "21:00" },
  { "44": "21:30" },
  { "45": "22:00" },
  { "46": "22:30" },
  { "47": "23:00" },
  { "48": "23:30" },
  { "extra0": "Extra off"}
];

export const morning: { [key: string]: string }[] = [
  
  { "15": "07:00" },
  { "16": "07:30" },
  { "17": "08:00" },
  { "18": "08:30" },
  { "19": "09:00" },
  { "20": "09:30" },
  { "21": "10:00" },
  { "22": "10:30" },
  { "23": "11:00" },
  { "24": "11:30" },
  { "m": "All morning" },
  { "m0": "Morning off"}
];

export const afternoon: { [key: string]: string }[] = [
  { "25": "12:00" },
  { "26": "12:30" },
  { "27": "13:00" },
  { "28": "13:30" },
  { "29": "14:00" },
  { "30": "14:30" },
  { "31": "15:00" },
  { "32": "15:30" },
  { "a": "All afternoon" },
  { "a0": "Afternoo off"}
];

export const evening: { [key: string]: string }[] = [
  { "33": "16:00" },
  { "34": "16:30" },
  { "35": "17:00" },
  { "36": "17:30" },
  { "37": "18:00" },
  { "38": "18:30" },
  { "39": "19:00" },
  { "40": "19:30" },
  { "41": "20:00" },
  { "42": "20:30" },
  { "43": "21:00" },
  { "44": "21:30" },
  { "45": "22:00" },
  { "46": "22:30" },
  { "47": "23:00" },
  { "e": "All evening" },
  { "e1": "From 16:00 to 20:00"},
  { "e0": "Evening off"}
  ,
];
