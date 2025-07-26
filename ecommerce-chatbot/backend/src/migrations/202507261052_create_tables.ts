
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables202507261100 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE distribution_centers (
        id INT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        latitude FLOAT NOT NULL,
        longitude FLOAT NOT NULL
      );

      CREATE TABLE products (
        id INT PRIMARY KEY,
        cost FLOAT NOT NULL,
        category VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        brand VARCHAR(255) NOT NULL,
        retail_price FLOAT NOT NULL,
        department VARCHAR(255) NOT NULL,
        sku VARCHAR(255) NOT NULL,
        distribution_center_id INT NOT NULL,
        FOREIGN KEY (distribution_center_id) REFERENCES distribution_centers(id)
      );

      CREATE TABLE inventory_items (
        id INT PRIMARY KEY,
        product_id INT NOT NULL,
        created_at DATETIME NOT NULL,
        sold_at DATETIME NULL,
        cost FLOAT NOT NULL,
        product_category VARCHAR(255) NOT NULL,
        product_name VARCHAR(255) NOT NULL,
        product_brand VARCHAR(255) NOT NULL,
        product_retail_price FLOAT NOT NULL,
        product_department VARCHAR(255) NOT NULL,
        product_sku VARCHAR(255) NOT NULL,
        product_distribution_center_id INT NOT NULL,
        FOREIGN KEY (product_id) REFERENCES products(id),
        FOREIGN KEY (product_distribution_center_id) REFERENCES distribution_centers(id)
      );

      CREATE TABLE users (
        id INT PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        age INT NOT NULL,
        gender VARCHAR(50) NOT NULL,
        state VARCHAR(100) NOT NULL,
        street_address VARCHAR(255) NOT NULL,
        postal_code VARCHAR(20) NOT NULL,
        city VARCHAR(100) NOT NULL,
        country VARCHAR(100) NOT NULL,
        latitude FLOAT NOT NULL,
        longitude FLOAT NOT NULL,
        traffic_source VARCHAR(255) NOT NULL,
        created_at DATETIME NOT NULL
      );

      CREATE TABLE orders (
        order_id INT PRIMARY KEY,
        user_id INT NOT NULL,
        status VARCHAR(50) NOT NULL,
        gender VARCHAR(50) NOT NULL,
        created_at DATETIME NOT NULL,
        returned_at DATETIME NULL,
        shipped_at DATETIME NULL,
        delivered_at DATETIME NULL,
        num_of_item INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );

      CREATE TABLE order_items (
        id INT PRIMARY KEY,
        order_id INT NOT NULL,
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        inventory_item_id INT NOT NULL,
        status VARCHAR(50) NOT NULL,
        created_at DATETIME NOT NULL,
        shipped_at DATETIME NULL,
        delivered_at DATETIME NULL,
        returned_at DATETIME NULL,
        FOREIGN KEY (order_id) REFERENCES orders(order_id),
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (product_id) REFERENCES products(id),
        FOREIGN KEY (inventory_item_id) REFERENCES inventory_items(id)
      );

      CREATE TABLE conversations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        session_id VARCHAR(255) NOT NULL,
        messages JSON NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );

      CREATE INDEX idx_conversations_user_id ON conversations(user_id);
      CREATE INDEX idx_inventory_items_sold_at ON inventory_items(sold_at);
      CREATE INDEX idx_orders_order_id ON orders(order_id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE conversations`);
    await queryRunner.query(`DROP TABLE order_items`);
    await queryRunner.query(`DROP TABLE orders`);
    await queryRunner.query(`DROP TABLE users`);
    await queryRunner.query(`DROP TABLE inventory_items`);
    await queryRunner.query(`DROP TABLE products`);
    await queryRunner.query(`DROP TABLE distribution_centers`);
  }
}
