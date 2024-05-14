export const participantTypeOptions = (localeText: any) => [
  {
    label: localeText.temple,
    value: localeText.temple,
  },
  {
    label: localeText.family,
    value: localeText.family,
  },
  {
    label: localeText.publicUser,
    value: localeText.publicUser,
  },
];

export const PAGE = 1;
export const TAKE = 10;

export const formatDate = {
  YYYY_MM_DD_HH_MM: "YYYY-MM-DD HH:mm",
};

export const CHECK_IN_BEFORE = 3 * 60 * 60 * 1000; // 3 hours
