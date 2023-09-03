import { cache } from "react";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getNowAsync = cache(async () =>
  sleep(1000).then(() => new Date().toISOString())
);
