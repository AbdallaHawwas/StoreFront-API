// import { product, productStore } from '../product';

// const store = new productStore()

// describe("product Model", () => {
//   it('should have an index method', () => {
//     expect(store.index).toBeDefined();
//   });

//   it('should have a show method', () => {
//     expect(store.show).toBeDefined();
//   });

//   it('should have a create method', () => {
//     expect(store.create).toBeDefined();
//   });

//   it('should have a update method', () => {
//     expect(store.update).toBeDefined();
//   });

//   it('should have a delete method', () => {
//     expect(store.delete).toBeDefined();
//   });

//   it('create method should add a product', async () => {
//     const result = await store.create({
//         name:"test product",
//         price:33
//     });
//     expect(result).toEqual({
//       id: 1,
//       name:"test product",
//       price:33
//     });
//   });

//   it('index method should return a list of products', async () => {
//     const result = await store.index();
//     expect(result).toEqual(
//       id: 1,
//       name:"test product",
//       price:33
//     );
//   });

//   it('show method should return the correct product', async () => {
//     const result = await store.show(1);
//     expect(result).toEqual({
//       id: 1,
//       name:"test product",
//       price:33
//     });
//   });

//   it('delete method should remove the product', async () => {
//     store.delete(1);
//     const result = await store.index()

//     expect(result).toEqual([]);
//   });
// });