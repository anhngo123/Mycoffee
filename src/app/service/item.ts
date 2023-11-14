export interface Item{
    id: string;
    name: string;
    image: string;
    type: string;
    quantity: number;
    price: number;
    comments?: Comment[];
    branch: string;
    description: string;
}

export interface Comment{
    id: string;
    username: string;
    text: string;
}
