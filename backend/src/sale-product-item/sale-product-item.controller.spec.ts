import { Test, TestingModule } from '@nestjs/testing';
import { SaleProductItemController } from './sale-product-item.controller';
import { SaleProductItemService } from './sale-product-item.service';

describe('SaleProductItemController', () => {
  let controller: SaleProductItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaleProductItemController],
      providers: [SaleProductItemService],
    }).compile();

    controller = module.get<SaleProductItemController>(SaleProductItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
