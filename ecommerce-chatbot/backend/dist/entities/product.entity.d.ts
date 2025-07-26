import { InventoryItem } from './inventory-item.entity';
export declare class Product {
    id: number;
    cost: number;
    category: string;
    name: string;
    brand: string;
    retail_price: number;
    department: string;
    sku: string;
    distribution_center_id: number;
    inventoryItems: InventoryItem[];
}
