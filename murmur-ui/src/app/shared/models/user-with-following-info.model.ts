import { User } from './user.model';

export interface UserWithFollowingInfo extends User {
  isFollowing: boolean;
}
