/**
 * This file was generated by kysely-codegen.
 * Please do not edit it manually.
 */

import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Products {
  created_at: Generated<Timestamp | null>;
  id: Generated<number>;
  name: string;
  price: number;
}

export interface User {
  createdAt: Generated<Timestamp | null>;
  email: string;
  id: Generated<number>;
  image: string | null;
  name: string;
}

export interface Users {
  createdAt: Generated<Timestamp | null>;
  email: string;
  id: Generated<number>;
  image: string | null;
  name: string;
}

export interface DB {
  products: Products;
  user: User;
  users: Users;
}
