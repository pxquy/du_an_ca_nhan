export const formatStatus = (status: string) => {
  switch (status) {
    case "1":
      return "Còn sách";

    case "2":
      return "Hết sách";
  }
};
