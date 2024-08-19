import { ThemeName } from "../common";

type TSelectColor = {
  bgColor: string;
  textColor: string;
  titleColor: string;
};

export const selectColors = (theme: ThemeName): TSelectColor => {
  let selectedColors: TSelectColor = {
    bgColor: "#b7b8cc",
    textColor: "#272731",
    titleColor: "#b70570",
  };

  switch (theme) {
    case "dark":
      selectedColors = {
        bgColor: "#17172a",
        textColor: "#c6cbf7",
        titleColor: "#2fb5ff",
      };
      break;
    case "light":
      selectedColors = {
        bgColor: "#e8e8f3",
        textColor: "#090d34",
        titleColor: "#033651",
      };
      break;
  }

  return selectedColors;
};

export const isOpenedOnMobile = () => {
  const mobileOSs = ["iphone", "android"];
  let isMobile = false;
  for (let i = 0; i < mobileOSs.length; i++) {
    if (navigator.userAgent.toLocaleLowerCase().includes(mobileOSs[i])) {
      isMobile = true;
      break;
    }
  }
  return isMobile;
};

type TBookInfo = {
  name: string;
  page?: number;
  file?: string;
};

export const getBooksDb = async (): Promise<IDBDatabase> => {
  let db;
  await new Promise((resolve, reject) => {
    const request = indexedDB.open("books", 1);
    request.onupgradeneeded = () => {
      db = request.result;
      db.createObjectStore("book", { keyPath: "name" });
    };
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onerror = (e) => {
      reject(e);
    };
  });

  return db!;
};

export const getObjectStore = async (name: string): Promise<IDBObjectStore> => {
  const db = await getBooksDb();
  const transaction = db.transaction(name, "readwrite");
  const store = transaction.objectStore(name);
  return store;
};

export const getAllBooks = async (): Promise<TBookInfo[]> => {
  const bookStore = await getObjectStore("book");

  const books: TBookInfo[] = await new Promise((resolve, reject) => {
    bookStore.getAll().onsuccess = (e: any) => {
      resolve(e.target.result);
    };
    bookStore.getAll().onerror = (e) => {
      reject(e);
    };
  });

  return books;
};

export const storeBookInfo = async (bookInfo: TBookInfo): Promise<void> => {
  const books = await getAllBooks();
  const bookStore = await getObjectStore("book");
  const book = books.find((book) => book.name === bookInfo.name);
  // If the books is already stored update reading progress only/page
  if (book && bookInfo.page) {
    book.page = bookInfo.page;
    bookStore.put(book);
  } else {
    bookStore.add(bookInfo);
  }
};

export const getBookInfo = async (): Promise<TBookInfo> => {
  const books = await getAllBooks();
  const bookName = getBookName();
  const book = books.find((book) => book.name === bookName) ?? {};
  return book as TBookInfo;
};

export const getBookName = (): string => {
  const pathname = location.pathname;
  const fileName = decodeURI(pathname.substring(1));
  return fileName;
};

export const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
    } catch (error) {
      reject(error);
    }
  });
