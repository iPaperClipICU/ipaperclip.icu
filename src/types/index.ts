export type Data = {
  menuData: ([string] | [string, string[]])[];
  searchData: { [key: string]: [string, string | null, string | null, number] };
  data: {
    [key: string]:
      | {
          [key: string]: string[];
        }
      | string[];
  };
};

export type FilesListData = {
  name: string;
  uri: string;
  type: "video" | "audio" | "image" | undefined;
}[];

export type FileData = {
  name: string;
  type: "video" | "audio" | "image" | undefined;
  fileUri: string;
  tagName: string;
  docUrl: string | null;
};
