export const cls = (...str: string[]): string => str.join(" ");

interface IFileToUrl {
  fileId: string;
  variant: "avatar" | "product" | "public";
}

export const fileToUrl = ({ fileId, variant }: IFileToUrl): string =>
  `https://imagedelivery.net/ZYLViq3IecpAakTgPse5sg/${fileId}/${variant}`;
