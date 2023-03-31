export function randomFromArray(list: any[]) {
  return list[Math.floor((Math.random()*list.length))];
}

// transform string to DOS-style program name
export function dosify(name: string) {
  return name.replace(/[^a-z0-9]/gi, '_').toUpperCase().slice(0, 4) + '~1.EXE';
}

// truncate a string to n characters
export function truncate(str: string, n: number){
  return (str.length > n) ? str.slice(0, n-1) + '&hellip;' : str;
}
