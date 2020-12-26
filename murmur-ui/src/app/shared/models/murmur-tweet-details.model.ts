import { Post } from './post.model';

export interface MurmurTweetDetails extends Post {
  userDisplayName: string;
  canDelete: boolean;
  isLiked: boolean;
  likeCount: number;
}
