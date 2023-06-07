import { describe, it, expect } from 'vitest'
import { mapPathToRoute } from './serverRouter';

describe('serverRoutes', () => {
  describe('mapPathToRoute', () => {
    it('should return the correct index route', () => {
      expect(mapPathToRoute('../pages/index.tsx')).toBe('/');
    });
    it('should return the correct argument route', () => {
      expect(mapPathToRoute('../pages/users/[user].tsx')).toBe('/users/:user');
    });
    it('should return the correct argument route', () => {
      expect(mapPathToRoute('../pages/users/index.tsx')).toBe('/users');
    });
  });
});