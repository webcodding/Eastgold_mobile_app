import RobiImage from "../assets/images/robi.png";
import NetflixImage from "../assets/images/netflix.png";
import AirtelImage from "../assets/images/airtel.png";
import AkashImage from "../assets/images/Akash.png";
import BikashImage from "../assets/images/bikas.png";
import MalabarImage from "../assets/images/malabar.png";
import TanishqImage from "../assets/images/tanishq.png";
import GoldCoinImg from "../assets/3.png";
import GoldBarImg from "../assets/4.png";
import GoldIcon from "../assets/1.png";
import GoldHome from "../assets/2.png";
import CashierImg from "../assets/images/cashier.jpg";
import AdminImg from "../assets/images/admin.jpg";
import ManagerImg from "../assets/images/manager.jpg";
import PartnerImg from "../assets/images/partner.jpg";
import UserImg from "../assets/images/user.jpg";
import Cash1 from "../assets/images/cash-1.jpg";
import Cash2 from "../assets/images/cash-2.jpg";
import Cash3 from "../assets/images/cash-3.jpg";
import Cash4 from "../assets/images/cash-4.jpg";
import Cash5 from "../assets/images/cash-5.jpg";
import Cash6 from "../assets/images/cash-6.jpg";
import Cust1 from "../assets/images/cust-1.jpg";
import Cust2 from "../assets/images/cust-2.jpg";
import Cust3 from "../assets/images/cust-3.jpg";
import Cust4 from "../assets/images/cust-4.jpg";
import Cust5 from "../assets/images/cust-5.jpg";
import Cust6 from "../assets/images/cust-7.jpg";
import Cust7 from "../assets/images/cash-7.jpg";
import Mang2 from "../assets/images/manager-2.jpg";
import Mang3 from "../assets/images/manager-3.jpg";
import Mang4 from "../assets/images/manager-4.jpg";
import Mang5 from "../assets/images/manager-5.jpg";
import Mang6 from "../assets/images/manager-6.jpg";
import Mang7 from "../assets/images/manager-7.jpg";
import Mang8 from "../assets/images/manager-8.jpg";
import Mang9 from "../assets/images/manager-9.jpg";
import Mang10 from "../assets/images/manager-10.jpg";
import Restaurent from "../assets/images/Restaurent.jpg";
import Retail from "../assets/images/Retail.jpg";
import Electronics from "../assets/images/electronics.jpg";
import Fitness from "../assets/images/fitness.jpg";
import Grocery from "../assets/images/grocery.jpg";
import Jwellery from "../assets/images/jwellery-store.jpeg";
import Coffee from "../assets/images/coffee-shop.jpg";
import BookStore from "../assets/images/book-store.jpg";
import Bakery from "../assets/images/bakery.jpg";
import TechStore from "../assets/images/tech-store.jpg";
import RestaurentLogo from "../assets/images/restaurent-logo.png";
import BakeryLogo from "../assets/images/bakery-logo.png";
import BookLogo from "../assets/images/book-logo.png";
import CoffeeLogo from "../assets/images/coffee-logo.png";
import ElectronicsLogo from "../assets/images/electronics-logo.png";
import FitnessLogo from "../assets/images/fitness-logo.png";
import GroceryLogo from "../assets/images/grocery-logo.png";
import JwelleryLogo from "../assets/images/jwellery-logo.png";
import RetailLogo from "../assets/images/retail-logo.png";
import TechLogo from "../assets/images/tech-logo.png";
import TanishFounder from "../assets/partners/tanish-partner.jpg";
import FoodFounder from "../assets/partners/food-partner.jpg";
import AmazoneFounder from "../assets/partners/amazone-partner.jpg";

import TanishBrand from "../assets/partners/tanishq-partner.png";
import AmazoneBrand from "../assets/partners/amazone.png";
import FoodpandaBrand from "../assets/partners/foodpanda.png";
import AbsoluteBrand from "../assets/partners/absolute.png";
import AddidasBrand from "../assets/partners/addidas.jpg";
import AirtelBrand from "../assets/partners/airtel.png";
import BergerBrand from "../assets/partners/berger-paint.jpg";
import BurgerBrand from "../assets/partners/burger.jpg";
import HuaweiBrand from "../assets/partners/huawei.png";
import KfcBrand from "../assets/partners/kfc.png";
import NikeBrand from "../assets/partners/nike.jpg";
import SujukiBrand from "../assets/partners/sujuki.jpg";

import Banner1 from "../assets/banner/offer1.jpg";
import Banner2 from "../assets/banner/offer2.jpg";
import Banner3 from "../assets/banner/offer3.jpg";
import Banner4 from "../assets/banner/offer4.jpg";
import Banner5 from "../assets/banner/offer5.jpg";

import { Image, Text, TouchableOpacity, View } from "react-native";

//global Data or Admin selected Data -------------
export const targetSales = {
  weekly: 10000,
  monthly: 100000,
  yearly: 1000000,
};
export const targetGoldSales = {
  weekly: 7000,
  monthly: 20000,
  yearly: 100000,
};
export const notifications = [
  {
    id: 1,
    title: "Gold Prices Surge to Record Highs",
    message: "Gold prices hit all-time highs amidst economic uncertainty...",
    image: GoldCoinImg,
    time: "2024-03-12",
  },
  {
    id: 2,
    title: "Expert Advice: Diversify with Gold",
    message:
      "Financial experts recommend diversifying your portfolio with gold investments...",
    image: GoldIcon,
    timestamp: "2024-03-11",
  },
  {
    id: 3,
    title: "Gold ETFs Gain Popularity",
    message:
      "Exchange-traded funds (ETFs) backed by gold are gaining popularity among investors...",
    image: GoldBarImg,
    timestamp: "2024-03-10",
  },
  {
    id: 4,
    title: "Central Banks Increase Gold Reserves",
    message:
      "Central banks around the world are increasing their gold reserves...",
    image: GoldIcon,
    timestamp: "2024-03-09",
  },
  {
    id: 5,
    title: "Gold Mining Stocks Rally",
    message:
      "Shares of gold mining companies rally as investors bet on higher gold prices...",
    image: GoldHome,
    timestamp: "2024-03-08",
  },
  {
    id: 6,
    title: "Inflation Concerns Boost Gold Demand",
    message: "Rising inflation concerns drive demand for gold as investors...",
    image: GoldCoinImg,
    timestamp: "2024-03-07",
  },
  {
    id: 7,
    title: "Global Uncertainty Spurs Safe-Haven Demand",
    message:
      "Geopolitical tensions and economic uncertainty worldwide fuel demand...",
    image: GoldHome,
    timestamp: "2024-03-06",
  },
  {
    id: 8,
    title: "Gold Futures Reach New Highs",
    message:
      "Gold futures hit new highs as investors seek protection against market...",
    image: GoldBarImg,
    timestamp: "2024-03-05",
  },
  {
    id: 9,
    title: "Analysts Bullish on Gold Outlook",
    message:
      "Market analysts express bullish sentiment on the outlook for gold...",
    image: GoldIcon,
    timestamp: "2024-03-04",
  },
  {
    id: 10,
    title: "Investor Interest in Gold Soars",
    message:
      "Surging investor interest in gold reflects growing concerns over inflation...",
    image: GoldIcon,
    timestamp: "2024-03-03",
  },
];
// ****** When A user register his profile there should insert this type informations *******
export const allUserProfileInfo = {
  cashier: [
    {
      id: 1,
      title: "Cashier",
      name: "David Warner",
      image: CashierImg,
      location: "Chicago, USA",
      number: "+43678988",
      branch: "SEYF, Chicago branch",
      email: "davidwarner23@gmail.com",
      notifications: [],
    },
  ],
  admin: [
    {
      id: 1,
      title: "Admin",
      name: "Jhonson Smith",
      image: AdminImg,
      location: "New York, USA",
      number: "+913834606",
      branch: "SEYF, New York branch",
      email: "jhonsonsmaith067@gmail.com",
      notifications: [],
    },
  ],
  partner: [
    {
      id: 1,
      title: "Partner",
      name: "Clarissa Berner",
      image: PartnerImg,
      location: "Chicago, USA",
      number: "+91438609",
      branch: "SEYF, Chicago branch",
      email: "clarissaberner209@gmail.com",
      notifications: [],
    },
  ],
  manager: [
    {
      id: 1,
      title: "Manager",
      name: "Mathew Bross",
      image: ManagerImg,
      location: "Sydney, Australia",
      number: "+43678988",
      branch: "SEYF, Sydney branch",
      email: "mathew631@gmail.com",
      notifications: [],
    },
  ],
  customer: [
    {
      id: 1,
      title: "Customer",
      name: "Jessica Doson",
      image: UserImg,
      location: "New York, USA",
      number: "+43678988",
      branch: "SEYF, New York branch",
      email: "jessicadoson86@gmail.com",
      notifications: [],
    },
  ],
};
//------------------------------------------End

// Cashier Dashboard Data---------------------
export const biller = [
  {
    id: 1,
    title: "Robi Axiata",
    image: RobiImage,
    codeId: 1023,
    type: "Utility",
  },
  {
    id: 2,
    title: "Netflix",
    image: NetflixImage,
    codeId: 2029,
    type: "Utility",
  },
  {
    id: 3,
    title: "Airtel",
    image: AirtelImage,
    codeId: 1433,
    type: "Utility",
  },
  {
    id: 4,
    title: "Akash DTH",
    image: AkashImage,
    codeId: 1215,
    type: "Utility",
  },
];

export const allBillers = [
  {
    id: 1,
    title: "Bikash",
    image: BikashImage,
    codeId: 3415,
    type: "Utility",
  },
  {
    id: 2,
    title: "Tanishq",
    image: TanishqImage,
    codeId: 2468,
    type: "Utility",
  },
  {
    id: 3,
    title: "Robi Axiata",
    image: RobiImage,
    codeId: 1023,
    type: "Utility",
  },
  {
    id: 4,
    title: "Netflix",
    image: NetflixImage,
    codeId: 2029,
    type: "Utility",
  },
  {
    id: 5,
    title: "Airtel",
    image: AirtelImage,
    codeId: 1433,
    type: "Utility",
  },
  {
    id: 6,
    title: "Malabar Gold",
    image: MalabarImage,
    codeId: 4126,
    type: "Utility",
  },
  {
    id: 7,
    title: "Akash DTH",
    image: AkashImage,
    codeId: 1215,
    type: "Utility",
  },
];

export const cashierTransections = [
  {
    id: 1,
    userName: "Tanishq",
    payment: "$349",
    codeId: 2468,
    transectionType: "import",
    userImage: TanishqImage,
    date: "03/07/2024",
  },
  {
    id: 2,
    userName: "Bikash",
    payment: "$135",
    codeId: 3415,
    transectionType: "import",
    userImage: BikashImage,
    date: "03/07/2024",
  },
  {
    id: 3,
    userName: "Malabar Gold",
    payment: "$185",
    codeId: 4126,
    transectionType: "export",
    userImage: MalabarImage,
    date: "03/05/2024",
  },
  {
    id: 4,
    userName: "Netflix",
    payment: "$49",
    codeId: 2029,
    transectionType: "export",
    userImage: NetflixImage,
    date: "02/29/2024",
  },
  {
    id: 5,
    userName: "Airtel",
    payment: "$427",
    codeId: 1433,
    transectionType: "import",
    userImage: AirtelImage,
    date: "02/27/2024",
  },
  {
    id: 6,
    userName: "Tanishq",
    payment: "$203",
    codeId: 2468,
    transectionType: "export",
    userImage: TanishqImage,
    date: "02/15/2024",
  },
];
//------------------------------------------End

// Manager Dashboard Data---------------------
export const sales = {
  weekly: [
    { value: 2800, label: "Sun" },
    { value: 2690, label: "Mon" },
    { value: 1560, label: "Tue" },
    { value: 1200, label: "Wed" },
    { value: 2320, label: "Thu" },
    { value: 600, label: "Fri" },
    { value: 456, label: "Sat" },
  ],
  monthly: [
    { value: 2690, label: "1 Week" },
    { value: 1560, label: "2 Week" },
    { value: 1200, label: "3 Week" },
    { value: 2320, label: "4 Week" },
  ],
  yearly: [
    { value: 2800, label: "Jan" },
    { value: 2690, label: "Feb" },
    { value: 1560, label: "Mar" },
    { value: 1200, label: "Apr" },
    { value: 2320, label: "May" },
    { value: 600, label: "Jun" },
    { value: 456, label: "Jul" },
    { value: 2800, label: "Aug" },
    { value: 2690, label: "Sep" },
    { value: 1560, label: "Oct" },
    { value: 1200, label: "Nov" },
    { value: 2320, label: "Dec" },
  ],
};
export const goldSale = {
  weekly: [
    { value: 320, label: "Sun" },
    { value: 1600, label: "Mon" },
    { value: 1560, label: "Tue" },
    { value: 1200, label: "Wed" },
    { value: 580, label: "Thu" },
    { value: 600, label: "Fri" },
    { value: 456, label: "Sat" },
  ],
  monthly: [
    { value: 347, label: "1 Week" },
    { value: 289, label: "2 Week" },
    { value: 1250, label: "3 Week" },
    { value: 725, label: "4Week" },
  ],
  yearly: [
    { value: 870, label: "Jan" },
    { value: 690, label: "Feb" },
    { value: 1360, label: "Mar" },
    { value: 1200, label: "Apr" },
    { value: 1620, label: "May" },
    { value: 600, label: "Jun" },
    { value: 456, label: "Jul" },
    { value: 1846, label: "Aug" },
    { value: 690, label: "Sep" },
    { value: 560, label: "Oct" },
    { value: 1130, label: "Nov" },
    { value: 1320, label: "Dec" },
  ],
};
const dataPointLabelComponent = (item) => {
  return (
    <View
      style={{
        borderRadius: 10,
        marginLeft: 10,
        marginTop: -20,
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontFamily: "Poppins_Medium",
          fontSize: 9,
        }}
      >
        {`${item.val}`} $
      </Text>

      <Image
        source={item.image}
        style={{
          width: 20,
          height: 20,
          borderRadius: 50,
          objectFit: "cover",
        }}
      />
    </View>
  );
};
export const topCashiers = {
  weekly: [
    {
      value: 2800,
      label: "Sun",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 2800,
          image: Cash1,
        }),
      image: Cash1,
      name: "John Doe",
      location: "New York",
    },
    {
      value: 2690,
      label: "Mon",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 2690,
          image: Cash5,
        }),
      image: Cash5,
      name: "Alice Smith",
      location: "Los Angeles",
    },
    {
      value: 1560,
      label: "Tue",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 1560,
          image: CashierImg,
        }),
      image: CashierImg,
      name: "Bob Johnson",
      location: "Chicago",
    },
    {
      value: 1200,
      label: "Wed",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 1200,
          image: Cash3,
        }),
      image: Cash3,
      name: "Emma Brown",
      location: "San Francisco",
    },
    {
      value: 2320,
      label: "Thu",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 2320,
          image: Cash6,
        }),
      image: Cash6,
      name: "James Wilson",
      location: "Houston",
    },
    {
      value: 600,
      label: "Fri",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 600,
          image: Cash4,
        }),
      image: Cash4,
      name: "Sophia Lee",
      location: "Seattle",
    },
    {
      value: 456,
      label: "Sat",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 456,
          image: Cash2,
          name: "Olivia Anderson",
          location: "Miami",
        }),
      image: Cash2,
      name: "Olivia Anderson",
      location: "Miami",
    },
  ],
  monthly: [
    {
      value: 2690,
      label: "1 Week",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 2800,
          image: CashierImg,
          name: "Bob Johnson",
          location: "Chicago",
        }),
      image: CashierImg,
      name: "Bob Johnson",
      location: "Chicago",
    },
    {
      value: 1560,
      label: "2 Week",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 1560,
          image: Cash3,
          name: "Emma Brown",
          location: "San Francisco",
        }),
      image: Cash3,
      name: "Emma Brown",
      location: "San Francisco",
    },
    {
      value: 1200,
      label: "3 Week",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 1200,
          image: Cash6,
          name: "James Wilson",
          location: "Houston",
        }),
      image: Cash6,
      name: "James Wilson",
      location: "Houston",
    },
    {
      value: 2320,
      label: "4 Week",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 2320,
          image: Cash5,
          name: "Alice Smith",
          location: "Los Angeles",
        }),
      image: Cash5,
      name: "Alice Smith",
      location: "Los Angeles",
    },
  ],
  yearly: [
    {
      value: 2800,
      label: "Jan",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 2800,
          image: Cash4,
          name: "Sophia Lee",
          location: "Seattle",
        }),
      image: Cash4,
      name: "Sophia Lee",
      location: "Seattle",
    },
    {
      value: 2690,
      label: "Feb",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 2690,
          image: CashierImg,
          name: "Bob Johnson",
          location: "Chicago",
        }),
      image: CashierImg,
      name: "Bob Johnson",
      location: "Chicago",
    },
    {
      value: 1560,
      label: "Mar",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 1560,
          image: Cash1,
          name: "John Doe",
          location: "New York",
        }),
      image: Cash1,
      name: "John Doe",
      location: "New York",
    },
    {
      value: 1200,
      label: "Apr",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 1200,
          image: Cash6,
          name: "James Wilson",
          location: "Houston",
        }),
      image: Cash6,
      name: "James Wilson",
      location: "Houston",
    },
    {
      value: 2320,
      label: "May",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 2320,
          image: Cash6,
          name: "James Wilson",
          location: "Houston",
        }),
      image: Cash6,
      name: "James Wilson",
      location: "Houston",
    },
    {
      value: 600,
      label: "Jun",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 600,
          image: Cash3,
          name: "Emma Brown",
          location: "San Francisco",
        }),
      image: Cash3,
      name: "Emma Brown",
      location: "San Francisco",
    },
    {
      value: 456,
      label: "Jul",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 456,
          image: Cash2,
          name: "Olivia Anderson",
          location: "Miami",
        }),
      image: Cash2,
      name: "Olivia Anderson",
      location: "Miami",
    },
    {
      value: 2800,
      label: "Aug",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 2800,
          image: Cash5,
          name: "Alice Smith",
          location: "Los Angeles",
        }),
      image: Cash5,
      name: "Alice Smith",
      location: "Los Angeles",
    },
    {
      value: 2690,
      label: "Sep",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 2690,
          image: Cash4,
          name: "Sophia Lee",
          location: "Seattle",
        }),
      image: Cash4,
      name: "Sophia Lee",
      location: "Seattle",
    },
    {
      value: 1560,
      label: "Oct",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 1560,
          image: CashierImg,
          name: "Bob Johnson",
          location: "Chicago",
        }),
      image: CashierImg,
      name: "Bob Johnson",
      location: "Chicago",
    },
    {
      value: 1200,
      label: "Nov",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 1200,
          image: Cash5,
          name: "Alice Smith",
          location: "Los Angeles",
        }),
      image: Cash5,
      name: "Alice Smith",
      location: "Los Angeles",
    },
    {
      value: 2320,
      label: "Dec",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 2320,
          image: Cash3,
          name: "Emma Brown",
          location: "San Francisco",
        }),
      image: Cash3,
      name: "Emma Brown",
      location: "San Francisco",
    },
  ],
};
export const topCustomers = {
  weekly: [
    {
      value: 2800,
      label: "Sun",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 2800,
          image: Cust1,
          name: "Emily Brown",
          location: "San Francisco",
        }),
      image: Cust1,
      name: "Emily Brown",
      location: "San Francisco",
    },
    {
      value: 2690,
      label: "Mon",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 2690,
          image: Cust5,
          name: "Michael Johnson",
          location: "Houston",
        }),
      image: Cust5,
      name: "Michael Johnson",
      location: "Houston",
    },
    {
      value: 1560,
      label: "Tue",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 1560,
          image: Cust7,
          name: "Sophia Smith",
          location: "Los Angeles",
        }),
      image: Cust7,
      name: "Sophia Smith",
      location: "Los Angeles",
    },
    {
      value: 1200,
      label: "Wed",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 1200,
          image: Cust3,
          name: "John Wilson",
          location: "Chicago",
        }),
      image: Cust3,
      name: "John Wilson",
      location: "Chicago",
    },
    {
      value: 2320,
      label: "Thu",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 2320,
          image: Cust6,
          name: "Olivia Anderson",
          location: "Miami",
        }),
      image: Cust6,
      name: "Olivia Anderson",
      location: "Miami",
    },
    {
      value: 600,
      label: "Fri",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 600,
          image: Cust4,
          name: "Emma Lee",
          location: "Seattle",
        }),
      image: Cust4,
      name: "Emma Lee",
      location: "Seattle",
    },
    {
      value: 456,
      label: "Sat",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 456,
          image: Cust2,
          name: "James Brown",
          location: "New York",
        }),
      image: Cust2,
      name: "James Brown",
      location: "New York",
    },
  ],
  monthly: [
    {
      value: 2690,
      label: "1 Week",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 2800,
          image: Cust7,
          name: "Sophia Smith",
          location: "Los Angeles",
        }),
      image: Cust7,
      name: "Sophia Smith",
      location: "Los Angeles",
    },
    {
      value: 1560,
      label: "2 Week",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 1560,
          image: Cust3,
          name: "John Wilson",
          location: "Chicago",
        }),
      image: Cust3,
      name: "John Wilson",
      location: "Chicago",
    },
    {
      value: 1200,
      label: "3 Week",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 1200,
          image: Cust6,
          name: "Olivia Anderson",
          location: "Miami",
        }),
      image: Cust3,
      name: "John Wilson",
      location: "Chicago",
    },
    {
      value: 2320,
      label: "4 Week",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 2320,
          image: Cust5,
          name: "Michael Johnson",
          location: "Houston",
        }),
      image: Cust5,
      name: "Michael Johnson",
      location: "Houston",
    },
  ],
  yearly: [
    {
      value: 2800,
      label: "Jan",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 2800,
          image: Cust4,
          name: "Emma Lee",
          location: "Seattle",
        }),
      image: Cust4,
      name: "Emma Lee",
      location: "Seattle",
    },
    {
      value: 2690,
      label: "Feb",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 2690,
          image: Cust7,
          name: "Sophia Smith",
          location: "Los Angeles",
        }),
      image: Cust7,
      name: "Sophia Smith",
      location: "Los Angeles",
    },
    {
      value: 1560,
      label: "Mar",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 1560,
          image: Cust1,
          name: "Emily Brown",
          location: "San Francisco",
        }),
      image: Cust1,
      name: "Emily Brown",
      location: "San Francisco",
    },
    {
      value: 1200,
      label: "Apr",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 1200,
          image: Cust6,
          name: "Olivia Anderson",
          location: "Miami",
        }),
      image: Cust6,
      name: "Olivia Anderson",
      location: "Miami",
    },
    {
      value: 2320,
      label: "May",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 2320,
          image: Cust6,
          name: "Olivia Anderson",
          location: "Miami",
        }),
      image: Cust6,
      name: "Olivia Anderson",
      location: "Miami",
    },
    {
      value: 600,
      label: "Jun",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 600,
          image: Cust3,
          name: "John Wilson",
          location: "Chicago",
        }),
      image: Cust3,
      name: "John Wilson",
      location: "Chicago",
    },
    {
      value: 456,
      label: "Jul",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 456,
          image: Cust2,
          name: "James Brown",
          location: "New York",
        }),
      image: Cust2,
      name: "James Brown",
      location: "New York",
    },
    {
      value: 2800,
      label: "Aug",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 2800,
          image: Cust5,
          name: "Michael Johnson",
          location: "Houston",
        }),
      image: Cust5,
      name: "Michael Johnson",
      location: "Houston",
    },
    {
      value: 2690,
      label: "Sep",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 2690,
          image: Cust4,
          name: "Emma Lee",
          location: "Seattle",
        }),
      image: Cust4,
      name: "Emma Lee",
      location: "Seattle",
    },
    {
      value: 1560,
      label: "Oct",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 1560,
          image: Cust7,
          name: "Sophia Smith",
          location: "Los Angeles",
        }),
      image: Cust7,
      name: "Sophia Smith",
      location: "Los Angeles",
    },
    {
      value: 1200,
      label: "Nov",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 1200,
          image: Cust5,
          name: "Michael Johnson",
          location: "Houston",
        }),
      image: Cust5,
      name: "Michael Johnson",
      location: "Houston",
    },
    {
      value: 2320,
      label: "Dec",
      dataPointLabelComponent: () =>
        dataPointLabelComponent({
          val: 2320,
          image: Cust3,
          name: "John Wilson",
          location: "Chicago",
        }),
      image: Cust3,
      name: "John Wilson",
      location: "Chicago",
    },
  ],
};
//------------------------------------------End

// Partner Dashboard Data---------------------

export const partnerBranches = [
  {
    id: 1,
    location: "Sydney, Australia",
    category: "Restaurant",
    category_img: RestaurentLogo,
    branch_name: "The Delight Coffee House",
    branch_img: Restaurent,
    discount: "30%",
    gold_earn: "24gm",
    rating: 3.4,
    manager: {
      name: "Mathew Bross",
      image: ManagerImg,
      number: "+43678988",
      userType: "Manager",
    },
    cashier: [
      {
        id: 1,
        image: Cash1,
        name: "John Doe",
        number: "+1234567890",
        userType: "Cashier",
      },
      {
        id: 2,
        image: Cash5,
        name: "Emma Brown",
        number: "+1234567891",
        userType: "Cashier",
      },
    ],
    customer: [
      {
        id: 1,
        image: Cust3,
        name: "James Brown",
        number: "+1234567892",
        userType: "Customer",
      },
      {
        id: 2,
        image: Cust7,
        name: "Sophia Smith",
        number: "+1234567893",
        userType: "Customer",
      },
      {
        id: 3,
        image: Cust5,
        name: "Olivia Anderson",
        number: "+1234567894",
        userType: "Customer",
      },
    ],
  },
  {
    id: 4,
    location: "London, England",
    category: "Bakery",
    category_img: BakeryLogo,
    branch_name: "The Flour Box",
    branch_img: Bakery,
    discount: "35%",
    gold_earn: "18gm",
    rating: 4.2,
    manager: {
      name: "Charles Baker",
      image: Mang4,
      number: "+442078901234",
      userType: "Manager",
    },
    cashier: [
      {
        id: 7,
        image: Cash6,
        name: "Olivia Green",
        number: "+442078901235",
        userType: "Cashier",
      },
      {
        id: 8,
        image: CashierImg,
        name: "William Johnson",
        number: "+442078901236",
        userType: "Cashier",
      },
    ],
    customer: [
      {
        id: 10,
        image: Cust1,
        name: "Emily Davies",
        number: "+442078901237",
        userType: "Customer",
      },
      {
        id: 11,
        image: Cust7,
        name: "Alexander Thompson",
        number: "+442078901238",
        userType: "Customer",
      },
      {
        id: 12,
        image: Cust3,
        name: "Victoria Jones",
        number: "+442078901239",
        userType: "Customer",
      },
    ],
  },
  {
    id: 10,
    location: "São Paulo, Brazil",
    category: "Coffee Shop",
    category_img: CoffeeLogo,
    branch_name: "Café Brasileiro",
    branch_img: Coffee,
    discount: "15%",
    gold_earn: "28gm",
    rating: 4.6,
    manager: {
      name: "Gabriela Oliveira",
      image: Mang10,
      number: "+5511987654321",
      userType: "Manager",
    },
    cashier: [
      {
        id: 19,
        image: Cash4,
        name: "Lucas Silva",
        userType: "Cashier",
        number: "+442078901239",
      },
      {
        id: 20,
        image: Cash2,
        name: "Isabela Santos",
        userType: "Cashier",
        number: "+442078901239",
      },
    ],
    customer: [
      {
        id: 28,
        image: Cust1,
        name: "Matheus Costa",
        userType: "Customer",
        number: "+442078901239",
      },
      {
        id: 29,
        image: Cust5,
        name: "Ana Rodrigues",
        userType: "Customer",
        number: "+442078901239",
      },
      {
        id: 30,
        image: Cust2,
        name: "Mariana Lima",
        userType: "Customer",
        number: "+442078901239",
      },
    ],
  },
];
export const managers = [
  {
    id: 1,
    name: "Mathew Bross",
    image: ManagerImg,
    number: "+43678988",
    userType: "Manager",
  },
  {
    id: 2,
    name: "Charles Baker",
    image: Mang4,
    number: "+442078901234",
    userType: "Manager",
  },
  {
    id: 3,
    name: "Gabriela Oliveira",
    image: Mang10,
    number: "+5511987654321",
    userType: "Manager",
  },
];
export const cashiers = [
  {
    id: 1,
    image: Cash1,
    name: "John Doe",
    number: "+1234567890",
    userType: "Cashier",
  },
  {
    id: 2,
    image: Cash5,
    name: "Emma Brown",
    number: "+1234567891",
    userType: "Cashier",
  },
  {
    id: 7,
    image: Cash6,
    name: "Olivia Green",
    number: "+442078901235",
    userType: "Cashier",
  },
  {
    id: 8,
    image: Cash3,
    name: "William Johnson",
    number: "+442078901236",
    userType: "Cashier",
  },
  {
    id: 19,
    image: Cash4,
    name: "Lucas Silva",
    userType: "Cashier",
    number: "+442078901239",
  },
  {
    id: 20,
    image: Cash2,
    name: "Isabela Santos",
    userType: "Cashier",
    number: "+442078901239",
  },
];
//------------------------------------------End

// Customer/User Dashboard Data---------------------
export const categories = [
  {
    id: 1,
    category: "KFC",
    category_img: KfcBrand,
  },
  {
    id: 2,
    category: "Restaurant",
    category_img: RestaurentLogo,
  },
  {
    id: 3,
    category: "Retail",
    category_img: RetailLogo,
  },
  {
    id: 4,
    category: "Electronics",
    category_img: ElectronicsLogo,
  },
  {
    id: 5,
    category: "Bakery",
    category_img: BakeryLogo,
  },
  {
    id: 6,
    category: "Grocery",
    category_img: GroceryLogo,
  },
  {
    id: 7,
    category: "Tech Store",
    category_img: TechLogo,
  },
  {
    id: 8,
    category: "Fitness Center",
    category_img: FitnessLogo,
  },
  {
    id: 9,
    category: "Bookstore",
    category_img: BookLogo,
  },
  {
    id: 10,
    category: "Jewelry Store",
    category_img: JwelleryLogo,
  },
  {
    id: 11,
    category: "Coffee Shop",
    category_img: CoffeeLogo,
  },
];

export const allPartnersOffers = [
  {
    id: 1,
    partner: "Food panda",
    brand_logo: FoodpandaBrand,
    partner_img: FoodFounder,
    partner_name: "Liya Watson",
    location: "Chicago, USA",
    number: "+91438609",
    branches: [
      {
        id: 1,
        location: "Sydney, Australia",
        category: "Restaurant",
        category_img: RestaurentLogo,
        branch_name: "The Delight Coffee House",
        branch_img: Restaurent,
        discount: "30%",
        gold_earn: "24gm",
        rating: 3.4,
        manager: {
          id: 101,
          name: "Mathew Bross",
          image: ManagerImg,
          number: "+43678988",
          userType: "Manager",
        },
        cashier: [
          {
            id: 102,
            image: Cash1,
            name: "John Doe",
            number: "+1234567890",
            userType: "Cashier",
          },
          {
            id: 103,
            image: Cash5,
            name: "Emma Brown",
            number: "+1234567891",
            userType: "Cashier",
          },
        ],
        customer: [
          {
            id: 104,
            image: Cust3,
            name: "James Brown",
            number: "+1234567892",
            userType: "Customer",
          },
          {
            id: 105,
            image: Cust7,
            name: "Sophia Smith",
            number: "+1234567893",
            userType: "Customer",
          },
          {
            id: 106,
            image: Cust5,
            name: "Olivia Anderson",
            number: "+1234567894",
            userType: "Customer",
          },
        ],
      },
      {
        id: 2,
        location: "London, England",
        category: "Bakery",
        category_img: BakeryLogo,
        branch_name: "The Flour Box",
        branch_img: Bakery,
        discount: "35%",
        gold_earn: "18gm",
        rating: 4.2,
        manager: {
          id: 201,
          name: "Charles Baker",
          image: Mang4,
          number: "+442078901234",
          userType: "Manager",
        },
        cashier: [
          {
            id: 202,
            image: Cash6,
            name: "Olivia Green",
            number: "+442078901235",
            userType: "Cashier",
          },
          {
            id: 204,
            image: CashierImg,
            name: "William Johnson",
            number: "+442078901236",
            userType: "Cashier",
          },
        ],
        customer: [
          {
            id: 205,
            image: Cust1,
            name: "Emily Davies",
            number: "+442078901237",
            userType: "Customer",
          },
          {
            id: 206,
            image: Cust7,
            name: "Alexander Thompson",
            number: "+442078901238",
            userType: "Customer",
          },
          {
            id: 207,
            image: Cust3,
            name: "Victoria Jones",
            number: "+442078901239",
            userType: "Customer",
          },
        ],
      },
      {
        id: 3,
        location: "São Paulo, Brazil",
        category: "Coffee Shop",
        category_img: CoffeeLogo,
        branch_name: "Café Brasileiro",
        branch_img: Coffee,
        discount: "15%",
        gold_earn: "28gm",
        rating: 4.6,
        manager: {
          id: 301,
          name: "Gabriela Oliveira",
          image: Mang10,
          number: "+5511987654321",
          userType: "Manager",
        },
        cashier: [
          {
            id: 302,
            image: Cash4,
            name: "Lucas Silva",
            userType: "Cashier",
            number: "+442078901239",
          },
          {
            id: 303,
            image: Cash2,
            name: "Isabela Santos",
            userType: "Cashier",
            number: "+442078901239",
          },
        ],
        customer: [
          {
            id: 304,
            image: Cust1,
            name: "Matheus Costa",
            userType: "Customer",
            number: "+442078901239",
          },
          {
            id: 305,
            image: Cust5,
            name: "Ana Rodrigues",
            userType: "Customer",
            number: "+442078901239",
          },
          {
            id: 306,
            image: Cust2,
            name: "Mariana Lima",
            userType: "Customer",
            number: "+442078901239",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    partner: "Amazon",
    brand_logo: AmazoneBrand,
    partner_img: AmazoneFounder,
    partner_name: "Jack Ma",
    location: "Tokyo, Japan",
    number: "+26843854",
    branches: [
      {
        id: 4,
        location: "Los Angeles, USA",
        category: "Fitness Center",
        category_img: FitnessLogo,
        branch_name: "FitZone Gym",
        branch_img: Fitness,
        discount: "18%",
        gold_earn: "20gm",
        rating: 3.8,
        manager: {
          id: 401,
          name: "Michael Smith",
          image: Mang7,
          number: "+15555555555",
          userType: "Manager",
        },
        cashier: [
          {
            id: 402,
            image: Cash4,
            name: "Jessica Taylor",
            userType: "Cashier",
            number: "+442078901239",
          },
          {
            id: 403,
            image: Cash6,
            name: "Christopher Clark",
            userType: "Cashier",
            number: "+442078901239",
          },
        ],
        customer: [
          {
            id: 404,
            image: Cust3,
            name: "Emily Wilson",
            userType: "Customer",
            number: "+442078901239",
          },
          {
            id: 405,
            image: Cust5,
            name: "Daniel Brown",
            userType: "Customer",
            number: "+442078901239",
          },
          {
            id: 406,
            image: Cust7,
            name: "Ashley Martinez",
            userType: "Customer",
            number: "+442078901239",
          },
        ],
      },
      {
        id: 5,
        location: "Toronto, Canada",
        category: "Bookstore",
        category_img: BookLogo,
        branch_name: "Book Haven",
        branch_img: BookStore,
        discount: "40%",
        gold_earn: "31gm",
        rating: 3.9,
        manager: {
          id: 501,
          name: "Jennifer Li",
          image: Mang8,
          number: "+14165551234",
          userType: "Manager",
          number: "+442078901239",
        },
        cashier: [
          {
            id: 502,
            image: Cash5,
            name: "Ethan Wilson",
            userType: "Cashier",
            number: "+442078901239",
          },
          {
            id: 503,
            image: Cash1,
            name: "Emma Thompson",
            userType: "Cashier",
            number: "+442078901239",
          },
        ],
        customer: [
          {
            id: 504,
            image: Cust4,
            name: "Liam Robinson",
            userType: "Customer",
            number: "+442078901239",
          },
          {
            id: 505,
            image: Cust6,
            name: "Isabella Garcia",
            number: "+1234567898",
            userType: "Customer",
          },
          {
            id: 506,
            image: Cust7,
            name: "Olivia King",
            userType: "Customer",
            number: "+442078901239",
          },
          {
            id: 507,
            image: Cust3,
            name: "Lucas Nguyen",
            userType: "Customer",
            number: "+442078901239",
          },
        ],
      },
      {
        id: 6,
        location: "Paris, France",
        category: "Grocery",
        category_img: GroceryLogo,
        branch_name: "Le Marché Frais",
        branch_img: Grocery,
        discount: "20%",
        gold_earn: "25gm",
        rating: 4.4,
        manager: {
          id: 601,
          name: "Isabelle Dupont",
          image: Mang5,
          number: "+33145678901",
          userType: "Manager",
        },
        cashier: [
          {
            id: 602,
            image: Cash2,
            name: "Jean Pierre",
            number: "+33145678902",
            userType: "Cashier",
          },
          {
            id: 603,
            image: Cash5,
            name: "Marie Dupont",
            number: "+33145678903",
            userType: "Cashier",
          },
        ],
        customer: [
          {
            id: 604,
            image: Cust7,
            name: "Luc Leblanc",
            number: "+33145678904",
            userType: "Customer",
          },
          {
            id: 605,
            image: Cust1,
            name: "Sophie Dubois",
            number: "+33145678905",
            userType: "Customer",
          },
          {
            id: 607,
            image: Cust5,
            name: "Etienne Martin",
            number: "+33145678906",
            userType: "Customer",
          },
          {
            id: 608,
            image: Cust6,
            name: "Isabella Garcia",
            number: "+1234567898",
            userType: "Customer",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    partner: "Tanishq",
    brand_logo: TanishBrand,
    partner_img: TanishFounder,
    partner_name: "Mukesh Ambani",
    location: "Mumbai, India",
    number: "+91438609",
    branches: [
      {
        id: 7,
        location: "Mumbai, India",
        category: "Jewelry Store",
        category_img: JwelleryLogo,
        branch_name: "Golden Gems",
        branch_img: Jwellery,
        discount: "30%",
        gold_earn: "24gm",
        rating: 4.5,
        manager: {
          id: 701,
          name: "Priya Patel",
          image: Mang9,
          number: "+912345678901",
          userType: "Manager",
          number: "+442078901239",
        },
        cashier: [
          {
            id: 702,
            image: CashierImg,
            name: "Raj Sharma",
            userType: "Cashier",
            number: "+442078901239",
          },
          {
            id: 703,
            image: Cash6,
            name: "Ananya Gupta",
            userType: "Cashier",
            number: "+442078901239",
          },
        ],
        customer: [
          {
            id: 704,
            image: Cust2,
            name: "Aarav Singh",
            userType: "Customer",
            number: "+442078901239",
          },
          {
            id: 705,
            image: Cust5,
            name: "Isha Patel",
            userType: "Customer",
            number: "+442078901239",
          },
          {
            id: 706,
            image: Cust6,
            name: "Kabir Verma",
            userType: "Customer",
            number: "+442078901239",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    partner: "Huawei",
    brand_logo: HuaweiBrand,
    partner_img: "",
    partner_name: "Jhon Doe",
    location: "Los Angles, New york",
    number: "+91438609",
    branches: [
      {
        id: 8,
        location: "Berlin, Germany",
        category: "Tech Store",
        category_img: TechLogo,
        branch_name: "Gadget Emporium",
        branch_img: TechStore,
        discount: "10%",
        gold_earn: "17gm",
        rating: 4.8,
        manager: {
          id: 801,
          name: "Klaus Müller",
          image: Mang6,
          number: "+491234567890",
          userType: "Manager",
        },
        cashier: [
          {
            id: 802,
            image: Cash1,
            name: "Anna Schmidt",
            userType: "Cashier",
            number: "+442078901239",
          },
          {
            id: 803,
            image: CashierImg,
            name: "Mark Weber",
            userType: "Cashier",
            number: "+442078901239",
          },
        ],
        customer: [
          {
            id: 804,
            image: Cust2,
            name: "Julia Wagner",
            userType: "Customer",
            number: "+442078901239",
          },
          {
            id: 805,
            image: Cust4,
            name: "Andreas Becker",
            userType: "Customer",
            number: "+442078901239",
          },
          {
            id: 806,
            image: Cust6,
            name: "Hannah Richter",
            userType: "Customer",
            number: "+442078901239",
          },
          {
            id: 807,
            image: Cust3,
            name: "Isabella Garcia",
            number: "+1234567898",
            userType: "Customer",
          },
          {
            id: 808,
            image: Cust7,
            name: "Aarav Singh",
            userType: "Customer",
            number: "+442078901239",
          },
        ],
      },
      {
        id: 9,
        location: "Tokyo, Japan",
        category: "Electronics",
        category_img: ElectronicsLogo,
        branch_name: "Tech Heaven",
        branch_img: Electronics,
        discount: "45%",
        gold_earn: "33gm",
        rating: 4.3,
        manager: {
          id: 901,
          name: "Aiko Tanaka",
          image: Mang3,
          number: "+81123456789",
          userType: "Manager",
        },
        cashier: [
          {
            id: 902,
            image: Cash3,
            name: "Hiro Suzuki",
            number: "+81123456790",
            userType: "Cashier",
          },
          {
            id: 903,
            image: Cash6,
            name: "Hana Watanabe",
            number: "+81123456791",
            userType: "Cashier",
          },
        ],
        customer: [
          {
            id: 904,
            image: Cust4,
            name: "Kenzo Sato",
            number: "+81123456792",
            userType: "Customer",
          },
          {
            id: 905,
            image: Cust2,
            name: "Aisha Nakamura",
            number: "+81123456793",
            userType: "Customer",
          },
          {
            id: 906,
            image: Cust5,
            name: "Takeshi Inoue",
            number: "+81123456794",
            userType: "Customer",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    partner: "Adiddas",
    brand_logo: AddidasBrand,
    partner_img: "",
    partner_name: "Stieve",
    location: "Los Angles, New york",
    number: "+91438609",
    branches: [
      {
        id: 10,
        location: "New York, USA",
        category: "Retail",
        category_img: RetailLogo,
        branch_name: "Fashion Avenue",
        branch_img: Retail,
        discount: "32%",
        gold_earn: "18gm",
        rating: 4.7,
        manager: {
          id: 1001,
          name: "Sarah Lee",
          image: Mang2,
          number: "+1234567890",
          userType: "Manager",
        },
        cashier: [
          {
            id: 1002,
            image: Cash2,
            name: "David Miller",
            number: "+1234567895",
            userType: "Cashier",
          },
          {
            id: 1003,
            image: Cash4,
            name: "Emily Garcia",
            number: "+1234567896",
            userType: "Cashier",
          },
        ],
        customer: [
          {
            id: 1004,
            image: Cust1,
            name: "Michael Jones",
            number: "+1234567897",
            userType: "Customer",
          },

          {
            id: 1005,
            image: Cust2,
            name: "William Davis",
            number: "+1234567899",
            userType: "Customer",
          },
        ],
      },
    ],
  },
  {
    id: 6,
    partner: "Absolute new york",
    brand_logo: AbsoluteBrand,
    partner_img: "",
    partner_name: "Stieve",
    location: "Los Angles, New york",
    number: "+91438609",
    branches: [
      {
        id: 11,
        location: "Mumbai, India",
        category: "Jewelry Store",
        category_img: JwelleryLogo,
        branch_name: "Golden Gems",
        branch_img: Jwellery,
        discount: "50%",
        gold_earn: "54gm",
        rating: 4.8,
        manager: {
          id: 1101,
          name: "Priya Patel",
          image: Mang9,
          number: "+912345678901",
          userType: "Manager",
          number: "+442078901239",
        },
        cashier: [
          {
            id: 1102,
            image: CashierImg,
            name: "Raj Sharma",
            userType: "Cashier",
            number: "+442078901239",
          },
          {
            id: 1103,
            image: Cash6,
            name: "Ananya Gupta",
            userType: "Cashier",
            number: "+442078901239",
          },
        ],
        customer: [
          {
            id: 1104,
            image: Cust2,
            name: "Aarav Singh",
            userType: "Customer",
            number: "+442078901239",
          },
          {
            id: 1105,
            image: Cust5,
            name: "Isha Patel",
            userType: "Customer",
            number: "+442078901239",
          },
          {
            id: 1106,
            image: Cust6,
            name: "Kabir Verma",
            userType: "Customer",
            number: "+442078901239",
          },
        ],
      },
    ],
  },
  // {
  //   id: 7,
  //   partner: "Nike",
  //   brand_logo: NikeBrand,
  //   partner_img: "",
  //   partner_name: "Stieve",
  //   location: "Los Angles, New york",
  //   number: "+91438609",
  //   branches: [],
  // },
  // {
  //   id: 8,
  //   partner: "KFC",
  //   brand_logo: KfcBrand,
  //   partner_img: "",
  //   partner_name: "Stieve",
  //   location: "Los Angles, New york",
  //   number: "+91438609",
  //   branches: [],
  // },
  // {
  //   id: 9,
  //   partner: "Airtel",
  //   brand_logo: AirtelBrand,
  //   partner_img: "",
  //   partner_name: "Stieve",
  //   location: "Los Angles, New york",
  //   number: "+91438609",
  //   branches: [],
  // },
  // {
  //   id: 10,
  //   partner: "Berger Paint",
  //   brand_logo: BergerBrand,
  //   partner_img: "",
  //   partner_name: "Stieve",
  //   location: "Los Angles, New york",
  //   number: "+91438609",
  //   branches: [],
  // },
  // {
  //   id: 11,
  //   partner: "Sujuki",
  //   brand_logo: SujukiBrand,
  //   partner_img: "",
  //   partner_name: "Stieve",
  //   location: "Los Angles, New york",
  //   number: "+91438609",
  //   branches: [],
  // },
  // {
  //   id: 12,
  //   partner: "Berger King",
  //   brand_logo: BurgerBrand,
  //   partner_img: "",
  //   partner_name: "Stieve",
  //   location: "Los Angles, New york",
  //   number: "+91438609",
  //   branches: [],
  // },
];
export const promotionBanner = [
  {
    img: Banner1,
  },
  {
    img: Banner2,
  },
  {
    img: Banner3,
  },
  {
    img: Banner4,
  },
  {
    img: Banner5,
  },
];
//------------------------------------------End

// Admin Dashboard Data---------------------
export const hotOffers = [
  {
    id: 4,
    partner: "Huawei",
    brand_logo: HuaweiBrand,
    partner_img: "",
    partner_name: "Jhon Doe",
    location: "Los Angles, New york",
    number: "+91438609",
    branches: [
      {
        id: 8,
        location: "Berlin, Germany",
        category: "Tech Store",
        category_img: TechLogo,
        branch_name: "Gadget Emporium",
        branch_img: TechStore,
        discount: "10%",
        gold_earn: "17gm",
        rating: 4.8,
        manager: {
          id: 801,
          name: "Klaus Müller",
          image: Mang6,
          number: "+491234567890",
          userType: "Manager",
        },
        cashier: [
          {
            id: 802,
            image: Cash1,
            name: "Anna Schmidt",
            userType: "Cashier",
            number: "+442078901239",
          },
          {
            id: 803,
            image: CashierImg,
            name: "Mark Weber",
            userType: "Cashier",
            number: "+442078901239",
          },
        ],
        customer: [
          {
            id: 804,
            image: Cust2,
            name: "Julia Wagner",
            userType: "Customer",
            number: "+442078901239",
          },
          {
            id: 805,
            image: Cust4,
            name: "Andreas Becker",
            userType: "Customer",
            number: "+442078901239",
          },
          {
            id: 806,
            image: Cust6,
            name: "Hannah Richter",
            userType: "Customer",
            number: "+442078901239",
          },
          {
            id: 807,
            image: Cust3,
            name: "Isabella Garcia",
            number: "+1234567898",
            userType: "Customer",
          },
          {
            id: 808,
            image: Cust7,
            name: "Aarav Singh",
            userType: "Customer",
            number: "+442078901239",
          },
        ],
      },
      {
        id: 9,
        location: "Tokyo, Japan",
        category: "Electronics",
        category_img: ElectronicsLogo,
        branch_name: "Tech Heaven",
        branch_img: Electronics,
        discount: "45%",
        gold_earn: "33gm",
        rating: 4.3,
        manager: {
          id: 901,
          name: "Aiko Tanaka",
          image: Mang3,
          number: "+81123456789",
          userType: "Manager",
        },
        cashier: [
          {
            id: 902,
            image: Cash3,
            name: "Hiro Suzuki",
            number: "+81123456790",
            userType: "Cashier",
          },
          {
            id: 903,
            image: Cash6,
            name: "Hana Watanabe",
            number: "+81123456791",
            userType: "Cashier",
          },
        ],
        customer: [
          {
            id: 904,
            image: Cust4,
            name: "Kenzo Sato",
            number: "+81123456792",
            userType: "Customer",
          },
          {
            id: 905,
            image: Cust2,
            name: "Aisha Nakamura",
            number: "+81123456793",
            userType: "Customer",
          },
          {
            id: 906,
            image: Cust5,
            name: "Takeshi Inoue",
            number: "+81123456794",
            userType: "Customer",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    partner: "Tanishq",
    brand_logo: TanishBrand,
    partner_img: TanishFounder,
    partner_name: "Mukesh Ambani",
    location: "Mumbai, India",
    number: "+91438609",
    branches: [
      {
        id: 7,
        location: "Mumbai, India",
        category: "Jewelry Store",
        category_img: JwelleryLogo,
        branch_name: "Golden Gems",
        branch_img: Jwellery,
        discount: "30%",
        gold_earn: "24gm",
        rating: 4.5,
        manager: {
          id: 701,
          name: "Priya Patel",
          image: Mang9,
          number: "+912345678901",
          userType: "Manager",
          number: "+442078901239",
        },
        cashier: [
          {
            id: 702,
            image: CashierImg,
            name: "Raj Sharma",
            userType: "Cashier",
            number: "+442078901239",
          },
          {
            id: 703,
            image: Cash6,
            name: "Ananya Gupta",
            userType: "Cashier",
            number: "+442078901239",
          },
        ],
        customer: [
          {
            id: 704,
            image: Cust2,
            name: "Aarav Singh",
            userType: "Customer",
            number: "+442078901239",
          },
          {
            id: 705,
            image: Cust5,
            name: "Isha Patel",
            userType: "Customer",
            number: "+442078901239",
          },
          {
            id: 706,
            image: Cust6,
            name: "Kabir Verma",
            userType: "Customer",
            number: "+442078901239",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    partner: "Amazon",
    brand_logo: AmazoneBrand,
    partner_img: AmazoneFounder,
    partner_name: "Jack Ma",
    location: "Tokyo, Japan",
    number: "+26843854",
    branches: [
      {
        id: 4,
        location: "Los Angeles, USA",
        category: "Fitness Center",
        category_img: FitnessLogo,
        branch_name: "FitZone Gym",
        branch_img: Fitness,
        discount: "18%",
        gold_earn: "20gm",
        rating: 3.8,
        manager: {
          id: 401,
          name: "Michael Smith",
          image: Mang7,
          number: "+15555555555",
          userType: "Manager",
        },
        cashier: [
          {
            id: 402,
            image: Cash4,
            name: "Jessica Taylor",
            userType: "Cashier",
            number: "+442078901239",
          },
          {
            id: 403,
            image: Cash6,
            name: "Christopher Clark",
            userType: "Cashier",
            number: "+442078901239",
          },
        ],
        customer: [
          {
            id: 404,
            image: Cust3,
            name: "Emily Wilson",
            userType: "Customer",
            number: "+442078901239",
          },
          {
            id: 405,
            image: Cust5,
            name: "Daniel Brown",
            userType: "Customer",
            number: "+442078901239",
          },
          {
            id: 406,
            image: Cust7,
            name: "Ashley Martinez",
            userType: "Customer",
            number: "+442078901239",
          },
        ],
      },
      {
        id: 5,
        location: "Toronto, Canada",
        category: "Bookstore",
        category_img: BookLogo,
        branch_name: "Book Haven",
        branch_img: BookStore,
        discount: "40%",
        gold_earn: "31gm",
        rating: 3.9,
        manager: {
          id: 501,
          name: "Jennifer Li",
          image: Mang8,
          number: "+14165551234",
          userType: "Manager",
          number: "+442078901239",
        },
        cashier: [
          {
            id: 502,
            image: Cash5,
            name: "Ethan Wilson",
            userType: "Cashier",
            number: "+442078901239",
          },
          {
            id: 503,
            image: Cash1,
            name: "Emma Thompson",
            userType: "Cashier",
            number: "+442078901239",
          },
        ],
        customer: [
          {
            id: 504,
            image: Cust4,
            name: "Liam Robinson",
            userType: "Customer",
            number: "+442078901239",
          },
          {
            id: 505,
            image: Cust6,
            name: "Isabella Garcia",
            number: "+1234567898",
            userType: "Customer",
          },
          {
            id: 506,
            image: Cust7,
            name: "Olivia King",
            userType: "Customer",
            number: "+442078901239",
          },
          {
            id: 507,
            image: Cust3,
            name: "Lucas Nguyen",
            userType: "Customer",
            number: "+442078901239",
          },
        ],
      },
      {
        id: 6,
        location: "Paris, France",
        category: "Grocery",
        category_img: GroceryLogo,
        branch_name: "Le Marché Frais",
        branch_img: Grocery,
        discount: "20%",
        gold_earn: "25gm",
        rating: 4.4,
        manager: {
          id: 601,
          name: "Isabelle Dupont",
          image: Mang5,
          number: "+33145678901",
          userType: "Manager",
        },
        cashier: [
          {
            id: 602,
            image: Cash2,
            name: "Jean Pierre",
            number: "+33145678902",
            userType: "Cashier",
          },
          {
            id: 603,
            image: Cash5,
            name: "Marie Dupont",
            number: "+33145678903",
            userType: "Cashier",
          },
        ],
        customer: [
          {
            id: 604,
            image: Cust7,
            name: "Luc Leblanc",
            number: "+33145678904",
            userType: "Customer",
          },
          {
            id: 605,
            image: Cust1,
            name: "Sophie Dubois",
            number: "+33145678905",
            userType: "Customer",
          },
          {
            id: 607,
            image: Cust5,
            name: "Etienne Martin",
            number: "+33145678906",
            userType: "Customer",
          },
          {
            id: 608,
            image: Cust6,
            name: "Isabella Garcia",
            number: "+1234567898",
            userType: "Customer",
          },
        ],
      },
    ],
  },
];
export const allPartners = [
  {
    id: 1,
    partner: "Food panda",
    brand_logo: FoodpandaBrand,
    partner_img: FoodFounder,
    partner_name: "Liya Watson",
    location: "Chicago, USA",
    number: "+91438609",
    branches: [
      {
        id: 1,
        location: "Sydney, Australia",
        category: "Restaurant",
        category_img: RestaurentLogo,
        branch_name: "The Delight Coffee House",
        branch_img: Restaurent,
        discount: "30%",
        gold_earn: "24gm",
        rating: 3.4,
        manager: {
          id: 101,
          name: "Mathew Bross",
          image: ManagerImg,
          number: "+43678988",
          userType: "Manager",
        },
        cashier: [
          {
            id: 102,
            image: Cash1,
            name: "John Doe",
            number: "+1234567890",
            userType: "Cashier",
          },
          {
            id: 103,
            image: Cash5,
            name: "Emma Brown",
            number: "+1234567891",
            userType: "Cashier",
          },
        ],
        customer: [
          {
            id: 104,
            image: Cust3,
            name: "James Brown",
            number: "+1234567892",
            userType: "Customer",
          },
          {
            id: 105,
            image: Cust7,
            name: "Sophia Smith",
            number: "+1234567893",
            userType: "Customer",
          },
          {
            id: 106,
            image: Cust5,
            name: "Olivia Anderson",
            number: "+1234567894",
            userType: "Customer",
          },
        ],
      },
      {
        id: 2,
        location: "London, England",
        category: "Bakery",
        category_img: BakeryLogo,
        branch_name: "The Flour Box",
        branch_img: Bakery,
        discount: "35%",
        gold_earn: "18gm",
        rating: 4.2,
        manager: {
          id: 201,
          name: "Charles Baker",
          image: Mang4,
          number: "+442078901234",
          userType: "Manager",
        },
        cashier: [
          {
            id: 202,
            image: Cash6,
            name: "Olivia Green",
            number: "+442078901235",
            userType: "Cashier",
          },
          {
            id: 204,
            image: CashierImg,
            name: "William Johnson",
            number: "+442078901236",
            userType: "Cashier",
          },
        ],
        customer: [
          {
            id: 205,
            image: Cust1,
            name: "Emily Davies",
            number: "+442078901237",
            userType: "Customer",
          },
          {
            id: 206,
            image: Cust7,
            name: "Alexander Thompson",
            number: "+442078901238",
            userType: "Customer",
          },
          {
            id: 207,
            image: Cust3,
            name: "Victoria Jones",
            number: "+442078901239",
            userType: "Customer",
          },
        ],
      },
      {
        id: 3,
        location: "São Paulo, Brazil",
        category: "Coffee Shop",
        category_img: CoffeeLogo,
        branch_name: "Café Brasileiro",
        branch_img: Coffee,
        discount: "15%",
        gold_earn: "28gm",
        rating: 4.6,
        manager: {
          id: 301,
          name: "Gabriela Oliveira",
          image: Mang10,
          number: "+5511987654321",
          userType: "Manager",
        },
        cashier: [
          {
            id: 302,
            image: Cash4,
            name: "Lucas Silva",
            userType: "Cashier",
            number: "+442078901239",
          },
          {
            id: 303,
            image: Cash2,
            name: "Isabela Santos",
            userType: "Cashier",
            number: "+442078901239",
          },
        ],
        customer: [
          {
            id: 304,
            image: Cust1,
            name: "Matheus Costa",
            userType: "Customer",
            number: "+442078901239",
          },
          {
            id: 305,
            image: Cust5,
            name: "Ana Rodrigues",
            userType: "Customer",
            number: "+442078901239",
          },
          {
            id: 306,
            image: Cust2,
            name: "Mariana Lima",
            userType: "Customer",
            number: "+442078901239",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    partner: "Amazon",
    brand_logo: AmazoneBrand,
    partner_img: AmazoneFounder,
    partner_name: "Jack Ma",
    location: "Tokyo, Japan",
    number: "+26843854",
    branches: [
      {
        id: 4,
        location: "Los Angeles, USA",
        category: "Fitness Center",
        category_img: FitnessLogo,
        branch_name: "FitZone Gym",
        branch_img: Fitness,
        discount: "18%",
        gold_earn: "20gm",
        rating: 3.8,
        manager: {
          id: 401,
          name: "Michael Smith",
          image: Mang7,
          number: "+15555555555",
          userType: "Manager",
        },
        cashier: [
          {
            id: 402,
            image: Cash4,
            name: "Jessica Taylor",
            userType: "Cashier",
            number: "+442078901239",
          },
          {
            id: 403,
            image: Cash6,
            name: "Christopher Clark",
            userType: "Cashier",
            number: "+442078901239",
          },
        ],
        customer: [
          {
            id: 404,
            image: Cust3,
            name: "Emily Wilson",
            userType: "Customer",
            number: "+442078901239",
          },
          {
            id: 405,
            image: Cust5,
            name: "Daniel Brown",
            userType: "Customer",
            number: "+442078901239",
          },
          {
            id: 406,
            image: Cust7,
            name: "Ashley Martinez",
            userType: "Customer",
            number: "+442078901239",
          },
        ],
      },
      {
        id: 5,
        location: "Toronto, Canada",
        category: "Bookstore",
        category_img: BookLogo,
        branch_name: "Book Haven",
        branch_img: BookStore,
        discount: "40%",
        gold_earn: "31gm",
        rating: 3.9,
        manager: {
          id: 501,
          name: "Jennifer Li",
          image: Mang8,
          number: "+14165551234",
          userType: "Manager",
          number: "+442078901239",
        },
        cashier: [
          {
            id: 502,
            image: Cash5,
            name: "Ethan Wilson",
            userType: "Cashier",
            number: "+442078901239",
          },
          {
            id: 503,
            image: Cash1,
            name: "Emma Thompson",
            userType: "Cashier",
            number: "+442078901239",
          },
        ],
        customer: [
          {
            id: 504,
            image: Cust4,
            name: "Liam Robinson",
            userType: "Customer",
            number: "+442078901239",
          },
          {
            id: 505,
            image: Cust6,
            name: "Isabella Garcia",
            number: "+1234567898",
            userType: "Customer",
          },
          {
            id: 506,
            image: Cust7,
            name: "Olivia King",
            userType: "Customer",
            number: "+442078901239",
          },
          {
            id: 507,
            image: Cust3,
            name: "Lucas Nguyen",
            userType: "Customer",
            number: "+442078901239",
          },
        ],
      },
      {
        id: 6,
        location: "Paris, France",
        category: "Grocery",
        category_img: GroceryLogo,
        branch_name: "Le Marché Frais",
        branch_img: Grocery,
        discount: "20%",
        gold_earn: "25gm",
        rating: 4.4,
        manager: {
          id: 601,
          name: "Isabelle Dupont",
          image: Mang5,
          number: "+33145678901",
          userType: "Manager",
        },
        cashier: [
          {
            id: 602,
            image: Cash2,
            name: "Jean Pierre",
            number: "+33145678902",
            userType: "Cashier",
          },
          {
            id: 603,
            image: Cash5,
            name: "Marie Dupont",
            number: "+33145678903",
            userType: "Cashier",
          },
        ],
        customer: [
          {
            id: 604,
            image: Cust7,
            name: "Luc Leblanc",
            number: "+33145678904",
            userType: "Customer",
          },
          {
            id: 605,
            image: Cust1,
            name: "Sophie Dubois",
            number: "+33145678905",
            userType: "Customer",
          },
          {
            id: 607,
            image: Cust5,
            name: "Etienne Martin",
            number: "+33145678906",
            userType: "Customer",
          },
          {
            id: 608,
            image: Cust6,
            name: "Isabella Garcia",
            number: "+1234567898",
            userType: "Customer",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    partner: "Tanishq",
    brand_logo: TanishBrand,
    partner_img: TanishFounder,
    partner_name: "Mukesh Ambani",
    location: "Mumbai, India",
    number: "+91438609",
    branches: [
      {
        id: 7,
        location: "Mumbai, India",
        category: "Jewelry Store",
        category_img: JwelleryLogo,
        branch_name: "Golden Gems",
        branch_img: Jwellery,
        discount: "30%",
        gold_earn: "24gm",
        rating: 4.5,
        manager: {
          id: 701,
          name: "Priya Patel",
          image: Mang9,
          number: "+912345678901",
          userType: "Manager",
          number: "+442078901239",
        },
        cashier: [
          {
            id: 702,
            image: CashierImg,
            name: "Raj Sharma",
            userType: "Cashier",
            number: "+442078901239",
          },
          {
            id: 703,
            image: Cash6,
            name: "Ananya Gupta",
            userType: "Cashier",
            number: "+442078901239",
          },
        ],
        customer: [
          {
            id: 704,
            image: Cust2,
            name: "Aarav Singh",
            userType: "Customer",
            number: "+442078901239",
          },
          {
            id: 705,
            image: Cust5,
            name: "Isha Patel",
            userType: "Customer",
            number: "+442078901239",
          },
          {
            id: 706,
            image: Cust6,
            name: "Kabir Verma",
            userType: "Customer",
            number: "+442078901239",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    partner: "Huawei",
    brand_logo: HuaweiBrand,
    partner_img: "",
    partner_name: "Jhon Doe",
    location: "Los Angles, New york",
    number: "+91438609",
    branches: [
      {
        id: 8,
        location: "Berlin, Germany",
        category: "Tech Store",
        category_img: TechLogo,
        branch_name: "Gadget Emporium",
        branch_img: TechStore,
        discount: "10%",
        gold_earn: "17gm",
        rating: 4.8,
        manager: {
          id: 801,
          name: "Klaus Müller",
          image: Mang6,
          number: "+491234567890",
          userType: "Manager",
        },
        cashier: [
          {
            id: 802,
            image: Cash1,
            name: "Anna Schmidt",
            userType: "Cashier",
            number: "+442078901239",
          },
          {
            id: 803,
            image: CashierImg,
            name: "Mark Weber",
            userType: "Cashier",
            number: "+442078901239",
          },
        ],
        customer: [
          {
            id: 804,
            image: Cust2,
            name: "Julia Wagner",
            userType: "Customer",
            number: "+442078901239",
          },
          {
            id: 805,
            image: Cust4,
            name: "Andreas Becker",
            userType: "Customer",
            number: "+442078901239",
          },
          {
            id: 806,
            image: Cust6,
            name: "Hannah Richter",
            userType: "Customer",
            number: "+442078901239",
          },
          {
            id: 807,
            image: Cust3,
            name: "Isabella Garcia",
            number: "+1234567898",
            userType: "Customer",
          },
          {
            id: 808,
            image: Cust7,
            name: "Aarav Singh",
            userType: "Customer",
            number: "+442078901239",
          },
        ],
      },
      {
        id: 9,
        location: "Tokyo, Japan",
        category: "Electronics",
        category_img: ElectronicsLogo,
        branch_name: "Tech Heaven",
        branch_img: Electronics,
        discount: "45%",
        gold_earn: "33gm",
        rating: 4.3,
        manager: {
          id: 901,
          name: "Aiko Tanaka",
          image: Mang3,
          number: "+81123456789",
          userType: "Manager",
        },
        cashier: [
          {
            id: 902,
            image: Cash3,
            name: "Hiro Suzuki",
            number: "+81123456790",
            userType: "Cashier",
          },
          {
            id: 903,
            image: Cash6,
            name: "Hana Watanabe",
            number: "+81123456791",
            userType: "Cashier",
          },
        ],
        customer: [
          {
            id: 904,
            image: Cust4,
            name: "Kenzo Sato",
            number: "+81123456792",
            userType: "Customer",
          },
          {
            id: 905,
            image: Cust2,
            name: "Aisha Nakamura",
            number: "+81123456793",
            userType: "Customer",
          },
          {
            id: 906,
            image: Cust5,
            name: "Takeshi Inoue",
            number: "+81123456794",
            userType: "Customer",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    partner: "Adiddas",
    brand_logo: AddidasBrand,
    partner_img: "",
    partner_name: "Stieve",
    location: "Big Ben,London ",
    number: "+91438609",
    branches: [
      {
        id: 10,
        location: "New York, USA",
        category: "Retail",
        category_img: RetailLogo,
        branch_name: "Fashion Avenue",
        branch_img: Retail,
        discount: "32%",
        gold_earn: "18gm",
        rating: 4.7,
        manager: {
          id: 1001,
          name: "Sarah Lee",
          image: Mang2,
          number: "+1234567890",
          userType: "Manager",
        },
        cashier: [
          {
            id: 1002,
            image: Cash2,
            name: "David Miller",
            number: "+1234567895",
            userType: "Cashier",
          },
          {
            id: 1003,
            image: Cash4,
            name: "Emily Garcia",
            number: "+1234567896",
            userType: "Cashier",
          },
        ],
        customer: [
          {
            id: 1004,
            image: Cust1,
            name: "Michael Jones",
            number: "+1234567897",
            userType: "Customer",
          },

          {
            id: 1005,
            image: Cust2,
            name: "William Davis",
            number: "+1234567899",
            userType: "Customer",
          },
        ],
      },
    ],
  },
  {
    id: 6,
    partner: "Absolute new york",
    brand_logo: AbsoluteBrand,
    partner_img: "",
    partner_name: "Stieve",
    location: "Valencia, Spain",
    number: "+91438609",
    branches: [
      {
        id: 11,
        location: "Mumbai, India",
        category: "Jewelry Store",
        category_img: JwelleryLogo,
        branch_name: "Golden Gems",
        branch_img: Jwellery,
        discount: "50%",
        gold_earn: "54gm",
        rating: 4.8,
        manager: {
          id: 1101,
          name: "Priya Patel",
          image: Mang9,
          number: "+912345678901",
          userType: "Manager",
          number: "+442078901239",
        },
        cashier: [
          {
            id: 1102,
            image: CashierImg,
            name: "Raj Sharma",
            userType: "Cashier",
            number: "+442078901239",
          },
          {
            id: 1103,
            image: Cash6,
            name: "Ananya Gupta",
            userType: "Cashier",
            number: "+442078901239",
          },
        ],
        customer: [
          {
            id: 1104,
            image: Cust2,
            name: "Aarav Singh",
            userType: "Customer",
            number: "+442078901239",
          },
          {
            id: 1105,
            image: Cust5,
            name: "Isha Patel",
            userType: "Customer",
            number: "+442078901239",
          },
          {
            id: 1106,
            image: Cust6,
            name: "Kabir Verma",
            userType: "Customer",
            number: "+442078901239",
          },
        ],
      },
    ],
  },
  {
    id: 7,
    partner: "Nike",
    brand_logo: NikeBrand,
    partner_img: "",
    partner_name: "Stieve",
    location: "Wuhan, China",
    branches: [],
  },
  {
    id: 8,
    partner: "KFC",
    brand_logo: KfcBrand,
    partner_img: "",
    partner_name: "Stieve",
    location: "Malacca City, Malaysia",
    number: "+91438609",
    branches: [],
  },
  {
    id: 9,
    partner: "Airtel",
    brand_logo: AirtelBrand,
    partner_img: "",
    partner_name: "Stieve",
    location: "Jurong, Singapore",
    number: "+91438609",
    branches: [],
  },
  {
    id: 10,
    partner: "Berger Paint",
    brand_logo: BergerBrand,
    partner_img: "",
    partner_name: "Stieve",
    location: "Time Square, New york",
    number: "+91438609",
    branches: [],
  },
  {
    id: 11,
    partner: "Sujuki",
    brand_logo: SujukiBrand,
    partner_img: "",
    partner_name: "Stieve",
    location: "Camden, London",
    number: "+91438609",
    branches: [],
  },
  {
    id: 12,
    partner: "Burger King",
    brand_logo: BurgerBrand,
    partner_img: "",
    partner_name: "Stieve",
    location: "Kuching, Malaysia",
    number: "+91438609",
    branches: [],
  },
];
//------------------------------------------End
