/* eslint-disable */
type AsyncReturnType<T> = T extends (...args: any[]) => Promise<infer R>
  ? R
  : any;

type Filter<T, U> = T extends U ? T : never;

export type InferNextProps<T> = Filter<
  AsyncReturnType<T>,
  { props: any }
>["props"];

export default InferNextProps;
