
import { Injectable, OnModuleInit } from '@nestjs/common';
import { parse } from 'csv-parse';
import * as fs from 'fs';
import * as path from 'path';

interface Product {
  id: string;
  name: string;
  retail_price: string;
}

interface Order {
  order_id: string;
  status: string;
  created_at: string;
}

interface OrderItem {
  order_id: string;
  product_id: string;
}

interface InventoryItem {
  id: string;
  product_id: string;
  product_name: string;
  sold_at: string | null;
}

@Injectable()
export class ChatbotService implements OnModuleInit {
  private products: Product[] = [];
  private orders: Order[] = [];
  private orderItems: OrderItem[] = [];
  private inventoryItems: InventoryItem[] = [];

  async onModuleInit() {
    // Load CSV files into memory
    await this.loadCsv('products.csv', (record) => {
      this.products.push({
        id: record.id,
        name: record.name,
        retail_price: record.retail_price,
      });
    });

    await this.loadCsv('orders.csv', (record) => {
      this.orders.push({
        order_id: record.order_id,
        status: record.status,
        created_at: record.created_at,
      });
    });

    await this.loadCsv('order_items.csv', (record) => {
      this.orderItems.push({
        order_id: record.order_id,
        product_id: record.product_id,
      });
    });

    await this.loadCsv('inventory_items.csv', (record) => {
      this.inventoryItems.push({
        id: record.id,
        product_id: record.product_id,
        product_name: record.product_name,
        sold_at: record.sold_at || null,
      });
    });
  }

  private async loadCsv(fileName: string, callback: (record: any) => void): Promise<void> {
    const filePath = path.join(__dirname, '..', '..', 'data', fileName);
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(parse({ columns: true, trim: true }))
        .on('data', callback)
        .on('end', resolve)
        .on('error', reject);
    });
  }

  async processMessage(message: string): Promise<string> {
    const text = message.toLowerCase().trim();

    // Top 5 most sold products query
    if (text.includes('top 5') && text.includes('sold') && text.includes('products')) {
      const productSales = this.inventoryItems
        .filter((item) => item.sold_at !== null)
        .reduce((acc, item) => {
          acc[item.product_id] = (acc[item.product_id] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

      const topProducts = Object.entries(productSales)
        .map(([product_id, unitsSold]) => {
          const product = this.products.find((p) => p.id === product_id);
          return { name: product?.name || 'Unknown', unitsSold };
        })
        .sort((a, b) => b.unitsSold - a.unitsSold)
        .slice(0, 5);

      if (topProducts.length === 0) {
        return 'No sales data available.';
      }

      return `Top 5 most sold products:\n${topProducts
        .map((p, i) => `${i + 1}. ${p.name} - ${p.unitsSold} units sold`)
        .join('\n')}`;
    }

    // Order status query
    const orderIdMatch = text.match(/\d{5}/);
    if (text.includes('order status') && orderIdMatch) {
      const orderId = orderIdMatch[0];
      const order = this.orders.find((o) => o.order_id === orderId);
      if (!order) {
        return 'Order not found. Please check your order ID.';
      }

      const items = this.orderItems
        .filter((oi) => oi.order_id === orderId)
        .map((oi) => {
          const product = this.products.find((p) => p.id === oi.product_id);
          return product?.name || 'Unknown';
        })
        .filter((name) => name !== 'Unknown');

      return `Order ${orderId} is ${order.status}. Items: ${items.join(', ') || 'None'}. Placed on ${order.created_at.split(' ')[0]}.`;
    }

    // Stock query for Classic T-Shirt
    if (text.includes('classic t-shirt') && (text.includes('stock') || text.includes('left'))) {
      const stock = this.inventoryItems.filter(
        (item) => item.product_name.toLowerCase() === 'classic t-shirt' && item.sold_at === null,
      ).length;
      return `Classic T-Shirt has ${stock} units left in stock.`;
    }

    // Return policy query
    if (text.includes('return') || text.includes('refund')) {
      return 'Returns are accepted within 30 days of purchase. Items must be unused with original tags. Contact support to initiate a return.';
    }

    // Product availability query
    if (text.includes('available') || text.includes('stock')) {
      const productNameMatch = text.match(/(?:available|stock)\s+(?:for|of)\s+([a-z\s-]+)/i);
      if (productNameMatch) {
        const productName = productNameMatch[1].trim();
        const product = this.products.find((p) => p.name.toLowerCase() === productName);
        if (!product) {
          return `Product "${productName}" not found.`;
        }
        const stock = this.inventoryItems.filter(
          (item) => item.product_id === product.id && item.sold_at === null,
        ).length;
        return `${product.name} is in stock. Price: $${parseFloat(product.retail_price).toFixed(2)}, Available: ${stock} units.`;
      }
    }

    // General greeting or fallback
    if (text.includes('hi') || text.includes('hello')) {
      return 'Hello! How can I assist you with your shopping today?';
    }

    return "I'm sorry, I didn't understand your request. Try asking about order status, returns, top products, or product availability.";
  }
}
