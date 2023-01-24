/**
 * data.json
 */
export type DataType = {
  menuData: ([string] | [string, string[]])[];
  searchData: { [key: string]: [string, string] };
  data: {
    [key: string]:
      | {
          [key: string]: string[][];
        }
      | string[][];
  };
};

export type FileTypeT = "video" | "image" | "audio" | undefined;

export type FilesMenuDataType = {
  search: false;
  hrefHead: string;
  data: string[][];
};

export type Search_FilesMenuDataType = {
  search: true;
  data: {
    name: string;
    hrefHead: string;
    tag: string;
  }[];
};