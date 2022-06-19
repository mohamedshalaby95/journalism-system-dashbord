export interface ICategoryAction {
  type: string;
  payload?: any;
}

export interface Icategory {
  _id: string;
  title: string;
  description:string;
  image:string;
}
