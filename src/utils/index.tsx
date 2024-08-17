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
  page: number;
};

export const storeBookInfo = (bookInfo: TBookInfo): void => {
  const books: TBookInfo[] = JSON.parse(localStorage.getItem("books") ?? "[]");
  // update book's info if was saved before.
  const book = books?.find((book) => book.name == bookInfo.name);
  if (book) book.page = bookInfo.page;
  else books.push(bookInfo);
  localStorage.setItem("books", JSON.stringify(books));
};

export const getBookInfo = (bookName: string): TBookInfo => {
  const books = localStorage.getItem("books")!;
  const parsedBooks = JSON.parse(books);
  return parsedBooks?.find((book: TBookInfo) => book.name == bookName) || {};
};

export const getBookName = (): string => {
  const pathname = location.pathname;
  const name = decodeURI(pathname.substring(1));
  return name;
};
