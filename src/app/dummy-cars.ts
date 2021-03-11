import { Car } from './car';
import DateTimeFunctions from './date-functions';

export var DummyCars: Car[] = [
  {
    carId: 1,
    carName: 'Nissan Skyline GT-R',
    imgUrl:
      'https://upload.wikimedia.org/wikipedia/commons/0/06/Nissan_Skyline_GT-R_R34_V_Spec_II.jpg',
    isRented: false,
    nWheels: 4,
    ratePerHr: 9800,
    dateDeadline: null,
    dateRented: null,
    dateReturned: null,
  },
  {
    carId: 2,
    carName: 'Ford Mustang',
    imgUrl:
      'https://cnet3.cbsistatic.com/img/3vwkGb5WITg4dttXkrXYps_kyFg=/1240x775/2020/09/30/3bbaa877-fd32-45dc-84c2-2c685adef434/2020-ford-mustang-shelby-gt350-heritage-edition-3.jpg',
    isRented: false,
    nWheels: 4,
    ratePerHr: 1000,
    dateDeadline: null,
    dateRented: null,
    dateReturned: null,
  },
  {
    carId: 3,
    carName: 'Toyota Supra',
    imgUrl:
      'https://s3.amazonaws.com/toyota-cms-media/wp-content/uploads/2019/03/2020_Supra_LaunchEdition_01_DA98A3EF24330A1E359D4DA496D4CF667DC03BAE-1500x1000.jpg',
    isRented: true,
    nWheels: 4,
    ratePerHr: 500,
    dateDeadline: DateTimeFunctions.subtractHours(new Date(), 6),
    dateRented: DateTimeFunctions.subtractHours(new Date(), 12),
    dateReturned: null,
  },
  {
    carId: 4,
    carName: 'Lightning McQueen',
    imgUrl:
      'https://static.wikia.nocookie.net/disney/images/4/46/Profile_-_Lightning_McQueen.jpg',
    isRented: true,
    nWheels: 4,
    ratePerHr: 100000000,
    dateDeadline: DateTimeFunctions.subtractHours(new Date(), 8),
    dateRented: DateTimeFunctions.subtractHours(new Date(), 3),
    dateReturned: null,
  },
  {
    carId: 5,
    carName: 'Honda Civic',
    imgUrl:
      'https://upload.wikimedia.org/wikipedia/commons/1/19/Brazilian_Honda_Civic_touring_2017_%28cropped%29.jpg',
    isRented: false,
    nWheels: 4,
    ratePerHr: 800,
    dateDeadline: null,
    dateRented: null,
    dateReturned: null,
  },
  {
    carId: 6,
    carName: 'Ferrari SF90 Stradale',
    imgUrl:
      'https://upload.wikimedia.org/wikipedia/commons/1/13/Red_2019_Ferrari_SF90_Stradale_%2848264238897%29_%28cropped%29.jpg',
    isRented: false,
    nWheels: 4,
    ratePerHr: 980,
    dateDeadline: null,
    dateRented: null,
    dateReturned: null,
  },
  {
    carId: 7,
    carName: 'Automobili Lamborghini',
    imgUrl:
      'https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/homepage/families-gallery/mobile/Aventador_SVJ_cc-verde_alceo-Leirion_Forged_20_21_Shiny_Black-red_caliper-sceneplate_env.png',
    isRented: false,
    nWheels: 4,
    ratePerHr: 420,
    dateDeadline: null,
    dateRented: null,
    dateReturned: null,
  },
  {
    carId: 8,
    carName: 'The Rock',
    imgUrl:
      'https://i.imgur.com/RqphCr2.jpg',
    isRented: false,
    nWheels: 4,
    ratePerHr: 690,
    dateDeadline: null,
    dateRented: null,
    dateReturned: null,
  },
  {
    carId: 9,
    carName: 'Subaru WRX',
    imgUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/SUBARU_WRX_STI_%28VA%29_Color_by_WR_Blue-Pearl_%28cropped%29.jpg/1920px-SUBARU_WRX_STI_%28VA%29_Color_by_WR_Blue-Pearl_%28cropped%29.jpg',
    isRented: true,
    nWheels: 4,
    ratePerHr: 550,
    dateDeadline: DateTimeFunctions.addHours(new Date(), 1),
    dateRented: DateTimeFunctions.subtractHours(new Date(), 2),
    dateReturned: null,
  },
  {
    carId: 10,
    carName: 'Mr. Bean',
    imgUrl:
      'https://img-comment-fun.9cache.com/media/aDjwnEx/a2KRxZq3_700w_0.jpg',
    isRented: true,
    nWheels: 4,
    ratePerHr: 9999999,
    dateDeadline: DateTimeFunctions.subtractHours(new Date(), 1),
    dateRented: DateTimeFunctions.subtractHours(new Date(), 10),
    dateReturned: null,
  },
]
