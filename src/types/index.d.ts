/**
 * data.json
 */
export type DataType = {
  menuData: ([string] | [string, string[]])[];
  searchData: { [key: string]: [string, string | null, string | null, number] };
  data: {
    [key: string]:
      | {
          [key: string]: string[][];
        }
      | string[][];
  };
};

export type FileTypes = "video" | "image" | "audio" | undefined;

export type FilesMenuDataType = {
  needPagination: boolean; // 是否需要分页
  data: {
    name: string;
    type: FileTypes;
    href: string;
    size: number;
  }[][];
};

export type FileCardDataType = {
  fileName: string;
  fileType: FileTypes;
  fileUrl: string;
};

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
