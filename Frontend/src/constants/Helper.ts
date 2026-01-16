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
export const formatGender = (gender: string) => {
  switch (gender) {
    case "1":
      return "Nam";

    case "2":
      return "Nữ";
  }
};

export const formatStatusUser = (status: string) => {
  switch (status) {
    case "1":
      return "Hoạt động";

    case "2":
      return "Bị khoá";
  }
};
