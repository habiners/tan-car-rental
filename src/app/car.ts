export interface Car {
  carId: number;
  carName: string;

  nWheels: number;
  ratePerHr: number;

  isRented: boolean;
  imgUrl: string;

  dateRented?: Date;
  dateDeadline?: Date;
  // dateReturned?: Date;

}
