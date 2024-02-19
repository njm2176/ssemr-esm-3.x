export const currentARTClients = {
  _data: [
    {
      group: "Dataset 1",
      date: 1558453260000,
      value: 2,
    },
    {
      group: "Dataset 1",
      date: 1558453320000,
      value: 3,
    },
    {
      group: "Dataset 1",
      date: 1558453380000,
      value: 5,
    },
    {
      group: "Dataset 1",
      date: 1558453440000,
      value: 1,
    },
    {
      group: "Dataset 1",
      date: 1558453500000,
      value: 4,
    },
    {
      group: "Dataset 1",
      date: 1558453560000,
      value: 4,
    },
    {
      group: "Dataset 1",
      date: 1558453620000,
      value: 3,
    },
    {
      group: "Dataset 1",
      date: 1558453680000,
      value: 4,
    },
    {
      group: "Dataset 1",
      date: 1558453740000,
      value: 2,
    },
    {
      group: "Dataset 1",
      date: 1558453800000,
      value: 0,
    },
    {
      group: "Dataset 1",
      date: 1558453860000,
      value: 5,
    },
    {
      group: "Dataset 1",
      date: 1558453920000,
      value: 5,
    },
    {
      group: "Dataset 1",
      date: 1558453980000,
      value: 6,
    },
    {
      group: "Dataset 1",
      date: 1558454040000,
      value: 2,
    },
    {
      group: "Dataset 1",
      date: 1558454100000,
      value: 3,
    },
    {
      group: "Dataset 1",
      date: 1558454160000,
      value: 6,
    },
    {
      group: "Dataset 1",
      date: 1558454280000,
      value: 2,
    },
    {
      group: "Dataset 1",
      date: 1558454340000,
      value: 6,
    },
    {
      group: "Dataset 1",
      date: 1558454400000,
      value: 0,
    },
    {
      group: "Dataset 1",
      date: 1558454460000,
      value: 3,
    },
    {
      group: "Dataset 1",
      date: 1558454520000,
      value: 2,
    },
    {
      group: "Dataset 1",
      date: 1558454580000,
      value: 4,
    },
    {
      group: "Dataset 1",
      date: 1558454640000,
      value: 3,
    },
    {
      group: "Dataset 1",
      date: 1558454700000,
      value: 4,
    },
    {
      group: "Dataset 1",
      date: 1558454760000,
      value: 2,
    },
    {
      group: "Dataset 1",
      date: 1558454820000,
      value: 4,
    },
    {
      group: "Dataset 1",
      date: 1558454880000,
      value: 1,
    },
    {
      group: "Dataset 1",
      date: 1558454940000,
      value: 1,
    },
    {
      group: "Dataset 1",
      date: 1558455000000,
      value: 3,
    },
    {
      group: "Dataset 1",
      date: 1558455060000,
      value: 2,
    },
  ],
  get data() {
    return this._data;
  },
  set data(value) {
    this._data = value;
  },
  options: {
    title: "Clients currently receiving ART",
    height: "350px",
    grid: {
      x: {
        enabled: false,
      },
      y: {
        enabled: false,
      },
    },
    axes: {
      bottom: {
        visible: false,
        title: "2019 Annual Sales Figures",
        mapsTo: "date",
        scaleType: "time",
      },
      left: {
        visible: false,
        mapsTo: "value",
        scaleType: "linear",
      },
    },
    color: {
      gradient: {
        enabled: true,
      },
    },
    points: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
  },
};

export const activeClientData = [
  {
    group: "Inactive",
    value: 20000,
  },
  {
    group: "Active",
    value: 65000,
  },
];

export const adultART = [
  {
    group: "1A",
    value: 65000,
  },
  {
    group: "1B",
    value: 29123,
  },
  {
    group: "1C",
    value: 35213,
  },
  {
    group: "2A",
    value: 51213,
  },
  {
    group: "2B",
    value: 16932,
  },
];

export const childART = [
  {
    group: "4A",
    value: 65000,
  },
  {
    group: "4B",
    value: 29123,
  },
  {
    group: "4C",
    value: 35213,
  },
  {
    group: "4E",
    value: 51213,
  },
  {
    group: "4F",
    value: 16932,
  },
];

export const viralLoadCoverage = [
  {
    group: "Inactive",
    value: 20000,
  },
  {
    group: "Active",
    value: 95000,
  },
];

export const viralLoadSuppression = [
  {
    group: "Inactive",
    value: 20000,
  },
  {
    group: "Active",
    value: 105000,
  },
];

export const highViralLoad = [
  {
    group: "1 Months",
    value: 65000,
  },
  {
    group: "2 Months",
    value: 29123,
  },
  {
    group: "3 Months",
    value: 35213,
  },
  {
    group: "4 Months",
    value: 51213,
  },
  {
    group: "5 Months",
    value: 16932,
  },
  {
    group: "6 Months",
    value: 16932,
  },
];

export const waterfallDummyData = [
  {
    group: "FY23Q3 TX_CURR",
    value: [0, 60000],
  },
  {
    group: "TX NEW,FY23Q3",
    value: [60000, 45000],
  },
  {
    group: "TX_RTT,FY23Q3",
    value: [60000, 50000],
  },
  {
    group: "Potential TX_CURR",
    value: [60000, 40000],
  },
  {
    group: "TX_ML Death, FY23Q3",
    value: [60000, 57000],
  },
  {
    group: "TX_ML Self Transfer",
    value: [60000, 59500],
  },
  {
    group: "TX_ML_REFUSAL/STOPPED",
    value: [60000, 49000],
  },
  {
    group: "TX_ML_IIT(on art <3months)",
    value: [60000, 51000],
  },
  {
    group: "TX_ML_IIT(on art 3 + months)",
    value: [60000, 50000],
  },
  {
    group: "Calculated",
    value: [60000, 45000],
  },
  {
    group: "Unattributed loss/gain",
    value: [60000, 12000],
  },
  {
    group: "Repeated TX_CURR, FY23Q3",
    value: [60000, 43000],
  },
];

export const dummy = {
  results: [
    {
      uuid: "d2a5da7e-7962-491c-b9e5-f37ada37ef4b",
      name: "Test User",
      identifier: "10003E0",
      sex: "M",
      dateEnrolled: "2024-02-14 05:14:04",
      childOrAdolescent: true,
      pregnantAndBreastfeeding: false,
      returningFromIT: false,
      returningToTreatment: false,
    },
    {
      uuid: "2d61ad12-ac7b-42d2-9f56-c11648fa680b",
      name: "Test Test",
      identifier: "10003LJ",
      sex: "M",
      dateEnrolled: "2024-02-14 05:14:04",
      childOrAdolescent: true,
      pregnantAndBreastfeeding: false,
      returningFromIT: false,
      returningToTreatment: false,
    },
    {
      uuid: "8128f265-8b5e-4510-b0d2-2faf8f45d373",
      name: "Catarina Ayor Zenab",
      identifier: "10004JM",
      sex: "F",
      dateEnrolled: "2024-02-14 05:14:04",
      childOrAdolescent: true,
      pregnantAndBreastfeeding: false,
      returningFromIT: false,
      returningToTreatment: true,
    },
    {
      uuid: "5e8f1b7e-1233-42ca-8dfd-aea517c5abe9",
      name: "Taban John Deng",
      identifier: "10004ND",
      sex: "M",
      dateEnrolled: "2024-02-14 05:14:04",
      childOrAdolescent: true,
      pregnantAndBreastfeeding: false,
      returningFromIT: false,
      returningToTreatment: false,
    },
    {
      uuid: "7a54e192-8d13-4ac2-ad5b-8e39b2ed3c1d",
      name: "Mathiang Yak Anek",
      identifier: "10004KK",
      sex: "F",
      dateEnrolled: "2024-02-14 05:14:04",
      childOrAdolescent: true,
      pregnantAndBreastfeeding: false,
      returningFromIT: true,
      returningToTreatment: false,
    },
    {
      uuid: "340b22e9-cb1d-4ac1-a045-355cdba7b363",
      name: "Joseph Bol Deng",
      identifier: "10004LH",
      sex: "M",
      dateEnrolled: "2024-02-14 05:14:04",
      childOrAdolescent: true,
      pregnantAndBreastfeeding: false,
      returningFromIT: false,
      returningToTreatment: true,
    },
    {
      uuid: "340b22e9-cb1d-4ac1-a045-355cdba7b363",
      name: "Joseph Bol Deng",
      identifier: "10004LH",
      sex: "M",
      dateEnrolled: "2024-02-14 05:14:04",
      childOrAdolescent: true,
      pregnantAndBreastfeeding: true,
      returningFromIT: false,
      returningToTreatment: true,
    },
    {
      uuid: "340b22e9-cb1d-4ac1-a045-355cdba7b363",
      name: "Joseph Bol Deng",
      identifier: "10004LH",
      sex: "M",
      dateEnrolled: "2024-02-14 05:14:04",
      childOrAdolescent: false,
      pregnantAndBreastfeeding: false,
      returningFromIT: false,
      returningToTreatment: true,
    },
    {
      uuid: "340b22e9-cb1d-4ac1-a045-355cdba7b363",
      name: "Joseph Bol Deng",
      identifier: "10004LH",
      sex: "M",
      dateEnrolled: "2024-02-14 05:14:04",
      childOrAdolescent: true,
      pregnantAndBreastfeeding: false,
      returningFromIT: false,
      returningToTreatment: true,
    },
    {
      uuid: "340b22e9-cb1d-4ac1-a045-355cdba7b363",
      name: "Joseph Bol Deng",
      identifier: "10004LH",
      sex: "M",
      dateEnrolled: "2024-02-14 05:14:04",
      childOrAdolescent: false,
      pregnantAndBreastfeeding: false,
      returningFromIT: false,
      returningToTreatment: false,
    },
    {
      uuid: "340b22e9-cb1d-4ac1-a045-355cdba7b363",
      name: "Joseph Bol Deng",
      identifier: "10004LH",
      sex: "M",
      dateEnrolled: "2024-02-14 05:14:04",
      childOrAdolescent: true,
      pregnantAndBreastfeeding: false,
      returningFromIT: false,
      returningToTreatment: true,
    },
    {
      uuid: "340b22e9-cb1d-4ac1-a045-355cdba7b363",
      name: "Joseph Bol Deng",
      identifier: "10004LH",
      sex: "M",
      dateEnrolled: "2024-02-14 05:14:04",
      childOrAdolescent: false,
      pregnantAndBreastfeeding: false,
      returningFromIT: false,
      returningToTreatment: false,
    },
    {
      uuid: "340b22e9-cb1d-4ac1-a045-355cdba7b363",
      name: "Joseph Bol Deng",
      identifier: "10004LH",
      sex: "M",
      dateEnrolled: "2024-02-14 05:14:04",
      childOrAdolescent: false,
      pregnantAndBreastfeeding: true,
      returningFromIT: false,
      returningToTreatment: false,
    },
  ],
  summary: {
    groupYear: {
      Jan: 10,
      Feb: 80,
      Mar: 6,
      Apr: 20,
      May: 20,
      Jun: 90,
      Jul: 20,
      Aug: 120,
      Sep: 20,
      Oct: 40,
      Nov: 200,
      Dec: 210,
    },
    groupMonth: {
      Week1: 90,
      Week2: 105,
      Week3: 20,
      Week4: 70,
    },
    groupWeek: {
      Mon: 70,
      Tue: 80,
      Wed: 100,
      Thu: 5,
      Fri: 15,
    },
  },
};

export const viralCascade = {
  results: {
    highVl: [{}, {}],
    eac1Attended: [{}, {}],
    eac2Attended: [{}, {}],
    eac3Attended: [{}, {}],
    repeatVlSampleCollected: [{}, {}],
    persistentHighVl: [{}, {}],
    artSwitch: [{}, {}],
  },
  summary: {
    groupYear: [
      {
        highVl: 20,
      },
      {
        eac1Attended: 2,
      },
      {
        eac2Attended: 0,
      },
      {
        eac3Attended: 0,
      },
      {
        repeatVlSampleCollected: 0,
      },
      {
        persistentHighVl: 0,
      },
      {
        artSwitch: 0,
      },
    ],
  },
};

export const adultArtDummy = {
  results: [
    {
      "1A": [{}, {}],
    },
    {
      "1B": [{}, {}],
    },
    {
      "2A": [{}, {}],
    },
    {
      "2C": [{}, {}],
    },
  ],
  summary: {
    groupYear: {
      "1A": 20,
      "1B": 2,
      "2A": 8,
    },
    groupMonth: {
      "1A": 5,
      "1B": 35,
      "2A": 50,
      "2B": 27,
    },
    groupWeek: {
      "1A": 9,
      "1B": 27,
      "2A": 45,
      "2C": 1,
    },
  },
};

export const childArtDummy = {
  results: [
    {
      "1A": [{}, {}],
    },
    {
      "1B": [{}, {}],
    },
    {
      "2A": [{}, {}],
    },
    {
      "2C": [{}, {}],
    },
  ],
  summary: {
    groupYear: {
      "4A": 12,
      "4B": 7,
      "4C": 16,
      "4E": 34,
      "4D": 28,
      "4F": 6,
    },
    groupMonth: {
      "4A": 65,
      "4B": 40,
      "4C": 50,
      "4E": 20,
      "4D": 13,
      "4F": 12,
    },
    groupWeek: {
      "4A": 65,
      "4B": 14,
      "4C": 2,
      "4E": 9,
      "4D": 4,
      "4F": 2,
    },
  },
};
