export const converterData = (data: string) => {
  const dataSeparada = data.split('/');

  return new Date(Number(dataSeparada[2]),
    Number(dataSeparada[1]) - 1,
    Number(dataSeparada[0]));
};

export default {};
