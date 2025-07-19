// src/models/BitpSymbol.ts
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  Default,
  AllowNull,
  Unique,
} from "sequelize-typescript";

export interface BitpSymbolFields {
  id?: number;
  name: string;
  status?: number;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  quotePrecision?: number;
  exchange?: string;
  logo?: string;
}

@Table({
  tableName: "bitpsymbols",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export default class BitpSymbol extends Model<BitpSymbolFields> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING(50))
  declare name: string;

  @Default(1)
  @AllowNull(false)
  @Column(DataType.SMALLINT)
  declare status: number;

  @AllowNull(true)
  @Column(DataType.TEXT)
  declare description?: string;

  @Default(0)
  @AllowNull(false)
  @Column({ field: "quote_precision", type: DataType.SMALLINT })
  declare quotePrecision: number;

  @Default("Bitpin")
  @AllowNull(false)
  @Column(DataType.STRING(100))
  declare exchange: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  declare logo?: string;

  /** Helper to normalize incoming API symbols */
  public static normalize(apiSym: string) {
    return apiSym.replace(/_/g, "").toUpperCase();
  }
}
