import { getCurrentUserService } from '../server/services/userService';

describe('getCurrentUserService', () => {
  it('should throw if user not found', async () => {
    await expect(getCurrentUserService('nonexistentid')).rejects.toThrow('User not found');
  });
  // Add more tests for valid user, stats, etc.
});
