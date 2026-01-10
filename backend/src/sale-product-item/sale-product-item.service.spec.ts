import { Test, TestingModule } from '@nestjs/testing';
import { SaleProductItemService } from './sale-product-item.service';

describe('SaleProductItemService', () => {
  let service: SaleProductItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaleProductItemService],
    }).compile();

    service = module.get<SaleProductItemService>(SaleProductItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
