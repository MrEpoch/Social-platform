// place files you want to import through the `$lib` alias in this folder.

export const wait = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
