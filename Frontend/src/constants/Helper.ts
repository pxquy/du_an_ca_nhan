export const formatStatus = (status: string) => {
  switch (status) {
    case "1":
      return "Còn sách";

    case "2":
      return "Hết sách";
  }
};

export const formatStatusBorrow = (status: string) => {
  switch (status) {
    case "1":
      return "Đang mượn";

    case "2":
      return "Đã trả";

    case "3":
      return "Trả trễ";
  }
};
