export interface recipe {
  id: string;
  name: string;
  nameLowercase: string,
  ingredients: { id: number, value: string, quantity: number }[]; // Sử dụng kiểu dữ liệu string[] cho ingredients
  instructions: string;
  itemQuantity: {agency: string, quantity: number}[];
}
