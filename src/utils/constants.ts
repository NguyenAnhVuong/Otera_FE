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
export const REJECT_REASON_MAX_LENGTH = 200;
export const BLOCK_REASON_MAX_LENGTH = 200;

export const formatDate = {
  YYYY_MM_DD_HH_mm: "YYYY-MM-DD HH:mm",
  YYYY_MM_DD: "YYYY-MM-DD",
  HH_mm_DD_MM_YYYY: "HH:mm DD/MM/YYYY",
};

export const CHECK_IN_BEFORE = 3 * 60 * 60 * 1000; // 3 hours
