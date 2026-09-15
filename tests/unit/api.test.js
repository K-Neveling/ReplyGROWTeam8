import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../src/app.js';

describe('API Endpoints (Unit/Integration)', () => {
  describe('GET /api/v1/health', () => {
    it('should return 200 OK with UP status', async () => {
      const res = await request(app).get('/api/v1/health');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe('UP');
    });
  });

  describe('GET /api/v1/projects', () => {
    it('should return 200 OK and list projects array', async () => {
      const res = await request(app).get('/api/v1/projects');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should filter projects by category', async () => {
      const res = await request(app).get('/api/v1/projects').query({ category: 'Sustainability' });
      expect(res.status).toBe(200);
      expect(res.body.data.every((p) => p.category === 'Sustainability')).toBe(true);
    });
  });

  describe('POST /api/v1/projects', () => {
    it('should create a new project when valid data is supplied', async () => {
      const payload = {
        title: 'Accessible Sound Visualizer',
        category: 'Assistive Tech',
        description:
          'Transforms environmental sound frequencies into dynamic color waves for deaf individuals.',
      };

      const res = await request(app).post('/api/v1/projects').send(payload);
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe(payload.title);
      expect(res.body.data.id).toBeDefined();
    });

    it('should return 400 Bad Request when validation fails', async () => {
      const invalidPayload = {
        title: 'A', // too short
        description: 'short', // too short
      };

      const res = await request(app).post('/api/v1/projects').send(invalidPayload);
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('VALIDATION_ERROR');
      expect(res.body.error.details.length).toBeGreaterThan(0);
    });
  });

  describe('404 Error Handler', () => {
    it('should return structured 404 JSON for undefined API endpoints', async () => {
      const res = await request(app).get('/api/v1/unknown-route');
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('NOT_FOUND');
    });
  });
});
