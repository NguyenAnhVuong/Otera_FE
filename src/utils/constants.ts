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
  YYYY_MM_DD: "YYYY-MM-DD",
  HH_mm_DD_MM_YYYY: "HH:mm DD/MM/YYYY",
};

export const CHECK_IN_BEFORE = 3 * 60 * 60 * 1000; // 3 hours

// Tiptap text color picker
export const colorPickerOptions = [
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#cddc39",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ff5722",
  "#795548",
  "#607d8b",
];
