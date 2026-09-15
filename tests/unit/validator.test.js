import { describe, it, expect } from 'vitest';
import { isValidEmail, sanitizeString, validateSubmission } from '../../src/utils/validator.js';

describe('Validator Utilities', () => {
  describe('isValidEmail()', () => {
    it('should return true for valid email formats', () => {
      expect(isValidEmail('team8@reply.com')).toBe(true);
      expect(isValidEmail('user.name+hackathon@sub.domain.org')).toBe(true);
    });

    it('should return false for invalid formats or non-strings', () => {
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('@missinguser.com')).toBe(false);
      expect(isValidEmail(null)).toBe(false);
      expect(isValidEmail(12345)).toBe(false);
    });
  });

  describe('sanitizeString()', () => {
    it('should strip angle brackets and trim whitespace', () => {
      const raw = '  <script>alert("hack")</script> Hello World  ';
      const clean = sanitizeString(raw);
      expect(clean).not.toContain('<');
      expect(clean).not.toContain('>');
      expect(clean).toBe('scriptalert("hack")/script Hello World');
    });

    it('should respect maxLength constraint', () => {
      const text = 'abcdefghij';
      expect(sanitizeString(text, 5)).toBe('abcde');
    });

    it('should handle non-string input gracefully', () => {
      expect(sanitizeString(null)).toBe('');
      expect(sanitizeString(undefined)).toBe('');
    });
  });

  describe('validateSubmission()', () => {
    it('should validate complete valid submissions', () => {
      const result = validateSubmission({
        title: 'Project Title',
        description: 'Valid description that is longer than 10 chars.',
        email: 'test@reply.com',
      });
      expect(result.isValid).toBe(true);
      expect(result.errors.length).toBe(0);
    });

    it('should reject titles shorter than 3 characters', () => {
      const result = validateSubmission({
        title: 'Hi',
        description: 'Valid description text here.',
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Title must be at least 3 characters long.');
    });

    it('should reject descriptions shorter than 10 characters', () => {
      const result = validateSubmission({
        title: 'Valid Title',
        description: 'Short',
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Description must be at least 10 characters long.');
    });
  });
});
