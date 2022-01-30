import { InAlbum, InPicture } from '../interfaces/Interfaces';

export const splitResponse = (rawData: InPicture[]): InAlbum[] => {
  const output: InAlbum[] = [];
  rawData.forEach((obj) => {
    const arrIdx = output.findIndex((arrEl) => arrEl.albumId === obj.albumId);
    if (arrIdx === -1) {
      output.push({ albumId: obj.albumId, pictures: [obj] });
    } else {
      output[arrIdx].pictures.push(obj);
    }
  });
  return output;
};
