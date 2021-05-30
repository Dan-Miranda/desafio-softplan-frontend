export function formatarCPF(valor: string) {
  let cpf = removerCaracteresDeStringNumerico(valor).slice(0, 11);

  if (cpf.length > 9) {
    cpf = cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
  } else if (cpf.length > 6) {
    cpf = cpf.replace(/^(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
  } else if (cpf.length > 3) {
    cpf = cpf.replace(/^(\d{3})(\d{0,3})/, '$1.$2');
  }
  return cpf;
}

export function formatarData(valor: string) {
  let date: string = removerCaracteresDeStringNumerico(valor).slice(0, 8);

  if (date.length > 4) {
    date = date.replace(/^(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3');
  } else if (date.length > 2) {
    date = date.replace(/^(\d{2})(\d{0,2})/, '$1/$2');
  }
  return date;
}

export function removerCaracteresDeStringNumerico(valor: string) {
  return valor.replace(/[^0-9]/g, '');
}

export default {};
