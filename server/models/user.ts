//user data
export interface User {
  id?: string;
  name: string;
  email: string;
  avatar?: string;

  role: "admin" | "client";

  track?: string;
  domain?: string;
  tier?: string;
  cohort?: string;

  startDate?: string;
  endDate?: string;

  createdAt?: Date;
  updatedAt?: Date;
}