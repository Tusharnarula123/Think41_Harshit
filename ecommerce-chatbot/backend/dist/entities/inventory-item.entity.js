"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryItem = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("./product.entity");
let InventoryItem = class InventoryItem {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], InventoryItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.id),
    __metadata("design:type", Number)
], InventoryItem.prototype, "product_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], InventoryItem.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], InventoryItem.prototype, "sold_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], InventoryItem.prototype, "cost", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], InventoryItem.prototype, "product_category", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], InventoryItem.prototype, "product_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], InventoryItem.prototype, "product_brand", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], InventoryItem.prototype, "product_retail_price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], InventoryItem.prototype, "product_department", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], InventoryItem.prototype, "product_sku", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], InventoryItem.prototype, "product_distribution_center_id", void 0);
InventoryItem = __decorate([
    (0, typeorm_1.Entity)('inventory_items')
], InventoryItem);
exports.InventoryItem = InventoryItem;
//# sourceMappingURL=inventory-item.entity.js.map