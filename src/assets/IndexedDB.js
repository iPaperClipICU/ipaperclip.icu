/* eslint-disable no-unused-vars */
/**
 * 部分代码改自: https://zhuanlan.zhihu.com/p/429086021
 */

import data from "@/assets/data.json";

const InitDB = async () => {
  const createDB = (db) => {
    // 删除旧的表
    const objStoreNames = db.objectStoreNames;
    if (objStoreNames.length != 0) {
      for (let i = 0; i < objStoreNames.length; i++) {
        db.transaction(objStoreNames[i], "readwrite").deleteObjectStore(
          objStoreNames[i]
        );
      }
    }

    // 创建表
    const objStore_data = db.createObjectStore("data", {
      keyPath: "name", //主键
    });
    const objStore_searchData = db.createObjectStore("searchData", {
      keyPath: "fileName", //主键
    });
    const objStore_config = db.createObjectStore("config", {
      keyPath: "name", //主键
    });

    // 创建索引
    objStore_data.createIndex("name", "name", { unique: false }); //文件夹名 Ex."回形针PaperClip"
    objStore_data.createIndex("tag", "tag"); //Tag Ex.True/False
    objStore_data.createIndex("data", "data", { unique: false }); //Data
    objStore_searchData.createIndex("fileName", "fileName", { unique: false }); //文件名 Ex."Vol.001 XXX"
    objStore_searchData.createIndex("data", "data", { unique: false }); //Data
    objStore_config.createIndex("name", "name", { unique: false }); //配置项名 Ex."Version"
    objStore_config.createIndex("data", "data", { unique: false }); //Data

    // 添加数据
    let objStore_data_data = [];
    let objStore_searchData_data = [];
    let objStore_config_data = [];

    objStore_data_data.push({
      name: "menu",
      tag: false,
      data: data.menuData,
    });
    objStore_config_data.push({
      name: "dig",
      data: data.dig,
    });
    for (const i in data.data) {
      const FilesData = data.data[i];
      // Data
      objStore_data_data.push({
        name: FilesData.name,
        tag: FilesData.tag,
        data: FilesData.data,
      });

      // searchData
      if (FilesData.tag) {
        // 有Tag
        for (const ii in FilesData.data) {
          const TagData = FilesData.data[ii];
          for (const iii in TagData.data) {
            const FileName = TagData.data[iii];
            objStore_searchData_data.push({
              fileName: FileName,
              data: {
                tag: true,
                filesName: FilesData.name,
                tagName: TagData.name,
              },
            });
          }
        }
      } else {
        for (const ii in FilesData.data) {
          const FileName = FilesData.data[ii];
          objStore_searchData_data.push({
            fileName: FileName,
            data: {
              tag: false,
              filesName: FilesData.name,
            },
          });
        }
      }
    }

    /**
     * 新增数据
     * @param {IDBObjectStore} objStore IDBObjectStore
     * @param {Object} data 数据
     */
    const addData = (objStore, data) => {
      const request = objStore.add(data);

      // request.onsuccess = (event) => console.log("数据写入成功");
      request.onerror = (event) => console.log("数据写入失败", event);
    };

    for (const i in objStore_data_data) {
      addData(objStore_data, objStore_data_data[i]);
    }
    for (const i in objStore_searchData_data) {
      addData(objStore_searchData, objStore_searchData_data[i]);
    }
    for (const i in objStore_config_data) {
      addData(objStore_config, objStore_config_data[i]);
    }
  };

  // 获取IDBDatabase
  let db = await openDB("iPaperClipICU", Number(data.version), createDB);
  // 校验dig
  const dig = await getDataByKey(db, "config", "dig");
  if (data.dig != dig.data) {
    // 更新数据库
    console.log("数据库 dig 不一致，更新数据库");
    closeDB(db); //关闭连接
    deleteDBAll("iPaperClipICU"); //删除数据库
    db = await openDB("iPaperClipICU", Number(data.version), createDB); //重新打开
  }

  return Promise.resolve(db);
};

/**
 * 打开数据库
 * @param {String} dbName 数据库的名字
 * @param {String} storeName 仓库名称
 * @param {String} version 数据库的版本
 * @param {Function} onupgradeneeded onupgradeneeded(db:IDBDatabase)
 * @return {IDBDatabase} 该函数会返回一个数据库实例
 */
const openDB = (dbName, version, onupgradeneeded) => {
  return new Promise((resolve, reject) => {
    // 兼容浏览器
    const indexedDB =
      window.indexedDB ||
      window.mozIndexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB;

    // 打开数据库，若没有则会创建
    const request = indexedDB.open(dbName, version);

    // 数据库打开成功回调
    request.onsuccess = (event) => {
      const db = event.target.result; // 数据库对象
      console.log("数据库打开成功");
      resolve(db);
    };

    // 数据库打开失败的回调
    request.onerror = (event) => {
      console.log("数据库打开报错", event);
    };

    // 数据库有更新时候的回调
    request.onupgradeneeded = (event) => {
      // 数据库创建或升级的时候会触发
      console.log("onupgradeneeded");
      const db = event.target.result; // 数据库对象

      onupgradeneeded(db);

      // // 创建存储库
      // const objectStore = db.createObjectStore(storeName, {
      //   keyPath: "sequenceId", // 这是主键
      //   // autoIncrement: true // 实现自增
      // });

      // // 创建索引，在后面查询数据的时候可以根据索引查
      // objectStore.createIndex("link", "link", { unique: false });
    };
  });
};

/**
 * 新增数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} data 数据
 */
const addData = (db, storeName, data) => {
  const request = db
    .transaction([storeName], "readwrite") //事务对象 指定表格名称和操作模式（"只读"或"读写"）
    .objectStore(storeName) //仓库对象
    .add(data);

  request.onsuccess = (event) => console.log("数据写入成功");
  request.onerror = (event) => console.log("数据写入失败", event);
};

/**
 * 通过主键读取数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} key 主键值
 */
const getDataByKey = (db, storeName, key) => {
  return new Promise((resolve, reject) => {
    var transaction = db.transaction([storeName]); // 事务
    var objectStore = transaction.objectStore(storeName); // 仓库对象
    var request = objectStore.get(key); // 通过主键获取数据

    request.onerror = (event) => {
      console.log("通过主键读取数据 - 事务失败", event);
    };

    request.onsuccess = (event) => {
      // console.log("主键查询结果: ", request.result);
      resolve(request.result);
    };
  });
};

/**
 * 通过游标读取数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 */
const cursorGetData = (db, storeName) => {
  return new Promise((resolve, reject) => {
    let list = [];
    const request = db
      .transaction(storeName, "readwrite") //事务
      .objectStore(storeName) //仓库对象
      .openCursor(); //指针对象

    // 游标开启成功，逐行读数据
    request.onsuccess = (e) => {
      const cursor = e.target.result;
      if (cursor) {
        // 必须要检查
        list.push(cursor.value);
        cursor.continue(); //遍历了存储对象中的所有内容
      } else {
        // console.log("游标读取的数据：", list);
        resolve(list);
      }
    };
  });
};

/**
 * 通过游标读取数据
 * @param {IDBDatabase} db 数据库实例
 * @param {String} storeName 仓库名称
 * @param {String} keyWorld 查询关键字
 */
const cursorSearchData = (db, storeName, keyWorld) => {
  return new Promise((resolve, reject) => {
    const KW = String(keyWorld.toLocaleLowerCase());
    let list = [];
    const request = db
      .transaction(storeName, "readwrite") //事务
      .objectStore(storeName) //仓库对象
      .openCursor(); //指针对象

    // 游标开启成功，逐行读数据
    request.onsuccess = (e) => {
      const cursor = e.target.result;
      if (cursor) {
        // 必须要检查
        if (cursor.value.indexOf(KW) != -1) list.push(cursor.value);
        cursor.continue(); //遍历了存储对象中的所有内容
      } else {
        // console.log("游标读取的数据：", list);
        resolve(list);
      }
    };
  });
};

/**
 * 删除数据库
 * @param {object} dbName 数据库名称
 */
const deleteDBAll = (dbName) => {
  const deleteRequest = window.indexedDB.deleteDatabase(dbName);

  deleteRequest.onerror = (event) => {
    console.log("删除数据库失败", event);
  };
  deleteRequest.onsuccess = (event) => {
    console.log("删除数据库成功");
  };
};

/**
 * 关闭数据库
 * @param {object} db 数据库实例
 */
const closeDB = (db) => {
  db.close();
  console.log("数据库已关闭");
};

export {
  InitDB,
  openDB,
  addData,
  getDataByKey,
  cursorGetData,
  cursorSearchData,
  deleteDBAll,
  closeDB,
};
