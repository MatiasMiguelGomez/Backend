import { userDtoTransformer } from '../../users/dto/user.dto.js';

export const currentSession = user => {
  return userDtoTransformer(user);
};
