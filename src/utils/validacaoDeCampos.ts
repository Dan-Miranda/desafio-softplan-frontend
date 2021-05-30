import moment from 'moment';

export const validarCpf = (value: string) => {
  const strCPF = value.replace(/[^0-9]/g, '');

  let Soma = 0;
  let Resto;
  let i;
  const sequence = ['00000000000', '11111111111', '22222222222', '33333333333', '44444444444', '55555555555', '66666666666', '77777777777', '88888888888', '99999999999'];

  if (sequence.includes(strCPF)) return false;

  if (strCPF.length !== 11) return false;

  for (i = 1; i <= 9; i += 1) Soma += parseInt(strCPF.substring(i - 1, i), 10) * (11 - i);
  Resto = (Soma * 10) % 11;

  if ((Resto === 10) || (Resto === 11)) { Resto = 0; }
  if (Resto !== parseInt(strCPF.substring(9, 10), 10)) { return false; }

  Soma = 0;
  for (i = 1; i <= 10; i += 1) Soma += parseInt(strCPF.substring(i - 1, i), 10) * (12 - i);
  Resto = (Soma * 10) % 11;

  if ((Resto === 10) || (Resto === 11)) { Resto = 0; }
  if (Resto !== parseInt(strCPF.substring(10, 11), 10)) { return false; }
  return true;
};

export const validarDataNascimento = (data: string) => {
  const dataNascimento = moment(data, 'DD/MM/YYYY');
  console.log(dataNascimento);
  const hoje = moment(new Date(), 'DD/MM/YYYY');

  return dataNascimento.isAfter(hoje);
};

export const validarEmail = (email: string) => {
  if (email.length > 120) {
    return false;
  }
  const emailRegexp = /^[A-Z0-9a-z][-_A-Z0-9a-z]*([.%+][-_A-Z0-9a-z]+)*@[A-Za-z0-9]+([.-][A-Z0-9a-z]+)*\.[A-Za-z]{2,}$/;
  return emailRegexp.test(email);
};

export default {};
