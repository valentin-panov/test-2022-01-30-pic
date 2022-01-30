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

export interface InPictures extends Status {
  pictures: InPicture[];
}
