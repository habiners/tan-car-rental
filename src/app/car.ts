export interface Car {
  carId: number;
  brandName: string;
  carName: string;

  nWheels: number;
  ratePerHr: number;

  isRented: boolean;
  imgUrl: string;

  dateRented?: Date;
  dateDeadline?: Date;
}
