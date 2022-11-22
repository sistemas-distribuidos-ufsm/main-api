import { ApiProperty } from '@nestjs/swagger';

export class FiltersDto {
  @ApiProperty({ required: true, default: 100 })
  limit: number;

  @ApiProperty({ required: true, default: 0 })
  offset: number;
}
