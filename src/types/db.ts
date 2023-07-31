import { User } from '../user/types/user';
import { Track } from '../track/types/track';

export interface Db {
  user: User[];
  artist: [];
  track: Track[];
  favorites: [];
}
