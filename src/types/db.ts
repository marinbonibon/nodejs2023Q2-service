import { User } from '../user/types/user';
import { Track } from '../track/types/track';
import { Artist } from '../artist/types/artist';
import { Album } from '../album/types/album';
import { Favorites } from '../favorites/types/favorites';

export interface Db {
  user: User[];
  artist: Artist[];
  track: Track[];
  album: Album[];
  favorites: Favorites;
}
