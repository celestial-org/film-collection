class PhimApi {
  baseUrl: string;
  constructor() {
    this.baseUrl = "https://phimapi.com";
  }

  async get(slug: string) {
    const resp = await fetch(this.baseUrl + "/phim/" + slug);
    const data = await resp.json();
    return data;
  }

  async search(keyword: string, page: number = 1) {
    const resp = await fetch(
      this.baseUrl + "/v1/api/tim-kiem?keyword=" + keyword + "&page=" + page
    );
    const data = await resp.json();
    return data.data.items;
  }

  async getList(
    selectedValue: string,
    isCategory: boolean = false,
    page: number = 1
  ) {
    if (selectedValue === "latest" || selectedValue === "all") {
      const resp = await fetch(
        this.baseUrl + "/danh-sach/phim-moi-cap-nhat?page=" + page
      );
      const data = await resp.json();
      return data.items;
    } else {
      const resp = await fetch(
        isCategory
          ? this.baseUrl + "/v1/api/the-loai/" + selectedValue + "?page=" + page
          : this.baseUrl +
              "/v1/api/danh-sach/" +
              selectedValue +
              "?page=" +
              page
      );
      const data = await resp.json();
      return data.data.items;
    }
  }
}

const topics = [
  {
    name: "Mới Cập Nhật",
    slug: "latest",
  },
  {
    name: "Phim Điện Ảnh",
    slug: "phim-le",
  },
  {
    name: "Chương Trình Truyền Hình",
    slug: "phim-bo",
  },
  {
    name: "Phim Hoạt Hình",
    slug: "hoat-hinh",
  },
  {
    name: "TV Shows",
    slug: "tv-shows",
  },
];

const fetchCategories = async () => {
  const resp = await fetch("https://phimapi.com/the-loai");
  return await resp.json();
};

export { PhimApi, topics, fetchCategories };
