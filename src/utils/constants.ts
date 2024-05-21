export const participantTypeOptions = (localeText: any) => [
  {
    label: localeText.temple.title,
    value: localeText.temple.title,
  },
  {
    label: localeText.family.title,
    value: localeText.family.title,
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
