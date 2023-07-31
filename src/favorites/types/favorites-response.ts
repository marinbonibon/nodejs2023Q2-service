import { Artist } from '../../artist/types/artist';
import { Album } from '../../album/types/album';
import { Track } from '../../track/types/track';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
