export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  productUrl: string;
  material: string;
  description: string;
  brand: "Huy Thanh" | "PNJ" | "Lili" | "Pandora";
}

export const EARRINGS_DATA: Product[] = [
  {
    id: "1",
    name: "Bông tai Huy Thành Jewelry BTBZ049",
    imageUrl: "/earrings/1.webp",
    productUrl: "https://huythanhjewelry.vn/products/bong-tai-btbz049?grade=10K",
    material: "Vàng 10K",
    description: "Thiết kế tinh tế, sang trọng từ Huy Thành Jewelry.",
    brand: "Huy Thanh"
  },
  {
    id: "2",
    name: "Bông tai Huy Thành Jewelry BTBZ044",
    imageUrl: "/earrings/2.webp",
    productUrl: "https://huythanhjewelry.vn/products/bong-tai-btbz044?grade=10K",
    material: "Vàng 10K",
    description: "Kiểu dáng hiện đại, tôn lên nét thanh lịch của phái đẹp.",
    brand: "Huy Thanh"
  },
  {
    id: "3",
    name: "Bông tai Huy Thành Jewelry BTBZ052",
    imageUrl: "/earrings/3.webp",
    productUrl: "https://huythanhjewelry.vn/products/bong-tai-btbz052?grade=10K",
    material: "Vàng 10K",
    description: "Điểm nhấn lấp lánh cho ngày 20/10 trọn vẹn.",
    brand: "Huy Thanh"
  },
  {
    id: "4",
    name: "Bông tai Huy Thành Jewelry BTBZ053",
    imageUrl: "/earrings/4.webp",
    productUrl: "https://huythanhjewelry.vn/products/bong-tai-btbz053?grade=10K",
    material: "Vàng 10K",
    description: "Sản phẩm cao cấp chất lượng từ Huy Thành Jewelry.",
    brand: "Huy Thanh"
  },
  {
    id: "5",
    name: "Bông tai Huy Thành Jewelry BTZ033",
    imageUrl: "/earrings/5.webp",
    productUrl: "https://huythanhjewelry.vn/products/bong-tai-btz033?grade=10K",
    material: "Vàng Tây",
    description: "Mẫu bông tai kinh điển dễ phối đồ và cực kỳ sang trọng.",
    brand: "Huy Thanh"
  },
  {
    id: "6",
    name: "Bông tai bạc đính đá Disney PNJ",
    imageUrl: "/earrings/6.png",
    productUrl: "https://www.pnj.com.vn/site/san-pham/bong-tai-bac-dinh-da-disney-pnj-xmxmw060491.html",
    material: "Bạc đính đá",
    description: "Sản phẩm chính hãng Disney PNJ trẻ trung và đáng yêu.",
    brand: "PNJ"
  },
  {
    id: "7",
    name: "Bông tai vàng trắng 10K đính đá ECZ PNJ",
    imageUrl: "/earrings/7.png",
    productUrl: "https://www.pnj.com.vn/site/san-pham/bong-tai-vang-trang-10k-dinh-da-ecz-pnj-xm00w000115.html",
    material: "Vàng trắng 10K & ECZ",
    description: "Đá ECZ lấp lánh rực rỡ từ thương hiệu PNJ.",
    brand: "PNJ"
  },
  {
    id: "8",
    name: "Bông tai vàng trắng Ý 18K PNJ",
    imageUrl: "/earrings/8.png",
    productUrl: "https://www.pnj.com.vn/site/san-pham/bong-tai-vang-trang-y-18k-pnj-0000w000186.html",
    material: "Vàng trắng Ý 18K",
    description: "Đẳng cấp và quý phái chuẩn phong cách Ý.",
    brand: "PNJ"
  },
  {
    id: "9",
    name: "Bông tai vàng trắng 8K đính đá Style by PNJ",
    imageUrl: "/earrings/9.png",
    productUrl: "https://www.pnj.com.vn/site/san-pham/bong-tai-vang-trang-8k-dinh-da-ecz-style-by-pnj-xmxmw003896.html",
    material: "Vàng trắng 8K",
    description: "Phong cách trẻ trung, hiện đại dành cho nàng.",
    brand: "PNJ"
  },
  {
    id: "10",
    name: "Bông tai vàng 10K đính đá Style by PNJ",
    imageUrl: "/earrings/10.png",
    productUrl: "https://www.pnj.com.vn/site/san-pham/bong-tai-vang-10k-dinh-da-ecz-style-by-pnj-xm00x000083.html",
    material: "Vàng 10K",
    description: "Thiết kế cá tính và thời thượng.",
    brand: "PNJ"
  },
  {
    id: "11",
    name: "Bông tai vàng trắng 8K Style by PNJ",
    imageUrl: "/earrings/11.png",
    productUrl: "https://www.pnj.com.vn/site/san-pham/bong-tai-vang-trang-8k-dinh-da-ecz-style-by-pnj-xmxmw004053.html",
    material: "Vàng trắng 8K",
    description: "Mẫu phụ kiện hoàn hảo cho outfit hàng ngày.",
    brand: "PNJ"
  },
  {
    id: "12",
    name: "Bông tai bạc nữ đính kim cương Moissanite Nicole LILI",
    imageUrl: "/earrings/12.webp",
    productUrl: "https://lili.vn/san-pham/bong-tai-bac-nu-dinh-kim-cuong-moissanite-nicole-lili_160534/",
    material: "Bạc & Moissanite",
    description: "Lấp lánh tựa kim cương tự nhiên từ LILI.",
    brand: "Lili"
  },
  {
    id: "13",
    name: "Khuyên tai bạc hình giọt nước Moissanite LILI",
    imageUrl: "/earrings/13.webp",
    productUrl: "https://lili.vn/san-pham/khuyen-tai-bac-nu-dinh-kim-cuong-moissanite-hinh-giot-nuoc-lili_516736/",
    material: "Bạc & Moissanite",
    description: "Kiểu dáng giọt nước thanh mảnh và quyến rũ.",
    brand: "Lili"
  },
  {
    id: "14",
    name: "Bông tai bạc nữ giọt nước Tessa LILI",
    imageUrl: "/earrings/14.webp",
    productUrl: "https://lili.vn/san-pham/bong-tai-bac-nu-dinh-kim-cuong-moissanite-giot-nuoc-tessa-lili_160512/",
    material: "Bạc cao cấp",
    description: "Tôn vinh nét đẹp dịu dàng của người phụ nữ.",
    brand: "Lili"
  },
  {
    id: "15",
    name: "Khuyên tai bạc nữ tròn Esperanza LILI",
    imageUrl: "/earrings/15.webp",
    productUrl: "https://lili.vn/san-pham/khuyen-tai-bac-nu-tron-esperanza-lili_546568/",
    material: "Bạc S925",
    description: "Vòng tròn đơn giản nhưng không bao giờ lỗi mốt.",
    brand: "Lili"
  },
  {
    id: "16",
    name: "Khuyên tai bạc tim Moissanite Carwyn LILI",
    imageUrl: "/earrings/16.webp",
    productUrl: "https://lili.vn/san-pham/khuyen-tai-bac-nu-dinh-kim-cuong-moissanite-trai-tim-carwyn-lili_422658/",
    material: "Bạc & Moissanite",
    description: "Biểu tượng trái tim ngọt ngào và lãng mạn.",
    brand: "Lili"
  },
  {
    id: "17",
    name: "Hoa tai Pandora Timeless trái tim pha lê đỏ Cherries",
    imageUrl: "/earrings/17.webp",
    productUrl: "https://pandora.norbreeze.vn/products/hoa-tai-pandora-timeless-bac-trai-tim-pha-le-do-cherries-jubilee",
    material: "Bạc & Pha lê đỏ",
    description: "Sắc đỏ rực rỡ từ bộ sưu tập Pandora Timeless.",
    brand: "Pandora"
  },
  {
    id: "18",
    name: "Hoa tai Pandora Timeless trái tim gắn kết",
    imageUrl: "/earrings/18.webp",
    productUrl: "https://pandora.norbreeze.vn/products/hoa-tai-pandora-timeless-bac-trai-tim-gan-ket",
    material: "Bạc chính hãng",
    description: "Gắn kết yêu thương trong từng đường nét thiết kế.",
    brand: "Pandora"
  },
  {
    id: "19",
    name: "Hoa tai Pandora Moments trái tim đính đá",
    imageUrl: "/earrings/19.webp",
    productUrl: "https://pandora.norbreeze.vn/products/hoa-tai-pandora-moments-bac-trai-tim-dinh-da",
    material: "Bạc đính đá",
    description: "Lấp lánh và sang trọng chuẩn thương hiệu Pandora.",
    brand: "Pandora"
  },
  {
    id: "20",
    name: "Hoa tai Pandora bạc trái tim thuần khiết",
    imageUrl: "/earrings/20.webp",
    productUrl: "https://pandora.norbreeze.vn/products/hoa-tai-pandora-bac-trai-tim-thuan-khiet",
    material: "Bạc cao cấp",
    description: "Sự tinh khôi và thuần khiết trong tình yêu.",
    brand: "Pandora"
  },
  {
    id: "21",
    name: "Hoa tai bạc Pandora trái tim cánh bướm gắn kết",
    imageUrl: "/earrings/21.webp",
    productUrl: "https://pandora.norbreeze.vn/products/hoa-tai-bac-pandora-trai-tim-canh-buom-gan-ket",
    material: "Bạc S925",
    description: "Cánh bướm và trái tim hòa quyện tuyệt đẹp.",
    brand: "Pandora"
  },
  {
    id: "22",
    name: "Hoa tai Pandora Moments mạ vàng hồng trái tim vô cực",
    imageUrl: "/earrings/22.webp",
    productUrl: "https://pandora.norbreeze.vn/products/hoa-tai-pandora-moments-ma-vang-hong-14k-trai-tim-vo-cuc-lap-lanh-tinh-yeu-bat-tan",
    material: "Mạ vàng hồng 14K",
    description: "Tình yêu bất tận với sắc vàng hồng quý phái.",
    brand: "Pandora"
  },
  {
    id: "23",
    name: "Hoa tai Pandora Signature hạt chuỗi tinh giản",
    imageUrl: "/earrings/23.webp",
    productUrl: "https://pandora.norbreeze.vn/products/hoa-tai-pandora-signature-bac-hat-chuoi-tinh-gian",
    material: "Bạc chính hãng",
    description: "Phong cách tối giản tinh tế từ Pandora Signature.",
    brand: "Pandora"
  }
];

export type Earring = Product;
