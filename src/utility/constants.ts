// VALIDATION MESSAGES
export const VALIDATION_ERROR_INCORRECT = 'This field has incorrect value';
export const VALIDATION_ERROR_REQUIRED = 'This field is required';

// INPUT LIMITS
export const MAX_LENGTH_LONG = 1000;
export const MAX_LENGTH_DEFAULT = 30;
export const MAX_LENGTH_NPI = 10;
export const MIN_LENGTH_DEFAULT = 1;
export const MAX_LENGTH_ADDRESS = 100;
export const TEXT_AREA_MIN_ROWS = 3;
export const TEXT_AREA_MAX_ROWS = Number.MAX_VALUE;
export const TEXT_AREA_MAX_LENGTH = 10000;

// INPUT PATTERNS
export const INPUT_PATTERN_EMAIL = /^[+a-zA-Z0-9-_.@]+$/gi;
export const INPUT_PATTERN_PASSWORD = /[^\s]+$/gi;
export const INPUT_PATTERN_ALPHANUMERIC = /^[a-z0-9]+$/gi;
export const INPUT_PATTERN_ALPHANUMERIC_DOT = /^[a-z0-9.]+$/gi;
export const INPUT_PATTERN_ALPHANUMERIC_SPECIAL = /^[a-z0-9.*\-#]+$/gi;
export const INPUT_PATTERN_NUMBER = /^[0-9]+$/gi;
export const INPUT_PATTERN_DECIMAL = /^[0-9]+\.[0-9]{0,2}$/gi;
export const INPUT_PATTERN_TWO_WORDS = /^[a-z]+(\s)?([a-z]+)?$/gi;
export const INPUT_PATTERN_WORDS = /^[a-z\s]+$/gi;
export const INPUT_PATTERN_ONSET_NUMBER = /^([1-9]|[0-9][0-2])+$/gi;
export const INPUT_PATTERN_ALPHANUMERIC_SPACE = /^[a-z0-9\s]+$/gi;
export const INPUT_PATTERN_ADDRESS_LINES = /^[a-z0-9.\s,]+$/gi;
export const INPUT_PATTERN_URL = /^[a-z0-9._:/-]+$/gi;

// VALIDATION PATTERNS
export const VALIDATION_PATTERN_EMAIL = /^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
