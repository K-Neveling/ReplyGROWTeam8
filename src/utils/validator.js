/**
 * Data validation utilities for API payloads and user inputs.
 */

/**
 * Validates whether an email address format is acceptable.
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  if (typeof email !== 'string') return false;
  const trimmed = email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(trimmed);
}

/**
 * Sanitizes and trims input string, preventing basic XSS characters.
 * @param {unknown} input
 * @param {number} [maxLength=255]
 * @returns {string}
 */
export function sanitizeString(input, maxLength = 255) {
  if (typeof input !== 'string') return '';
  return input.trim().slice(0, maxLength).replace(/[<>]/g, '');
}

/**
 * Validates a hackathon idea / task submission.
 * @param {Record<string, unknown>} payload
 * @returns {{ isValid: boolean, errors: string[] }}
 */
export function validateSubmission(payload) {
  const errors = [];

  if (!payload || typeof payload !== 'object') {
    return { isValid: false, errors: ['Payload must be an object.'] };
  }

  const title = sanitizeString(payload.title, 100);
  if (!title || title.length < 3) {
    errors.push('Title must be at least 3 characters long.');
  }

  const description = sanitizeString(payload.description, 500);
  if (!description || description.length < 10) {
    errors.push('Description must be at least 10 characters long.');
  }

  if (payload.email && !isValidEmail(String(payload.email))) {
    errors.push('Invalid email format.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
