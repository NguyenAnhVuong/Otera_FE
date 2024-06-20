export const participantTypeOptions = (localeText: any) => [
  {
    label: localeText.participantType.familyAdmin,
    value: localeText.participantType.familyAdmin,
  },
  {
    label: localeText.participantType.familyMember,
    value: localeText.participantType.familyMember,
  },
  {
    label: localeText.participantType.publicUser,
    value: localeText.participantType.publicUser,
  },
];

export const PAGE = 1;
export const TAKE = 10;
export const REJECT_REASON_MAX_LENGTH = 200;
export const BLOCK_REASON_MAX_LENGTH = 200;
export const DEBOUNCE_TIME = 500;

export const formatDate = {
  YYYY_MM_DD_HH_mm: "YYYY-MM-DD HH:mm",
  DD_MM_YYYY: "DD-MM-YYYY",
  HH_mm_DD_MM_YYYY: "HH:mm DD/MM/YYYY",
};

export const CHECK_IN_BEFORE = 3 * 60 * 60 * 1000; // 3 hours
