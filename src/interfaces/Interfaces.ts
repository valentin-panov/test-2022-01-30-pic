export interface Status {
  status: 'idle' | 'pending' | 'success' | 'error';
  error: string;
}

export interface InPicture {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface InAlbum {
  albumId: number;
  pictures: InPicture[];
}

export interface InAlbums extends Status {
  albums: InAlbum[];
}
