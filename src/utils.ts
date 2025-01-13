export const generateHash = (len:number):String => {
  const s = 'nycikgerabxahsmhzbfjolqrp47452960318';
  let ans = ''
  for(let i=0;i<len;i++) {
    ans = ans + s[Math.floor(Math.random()*s.length)]
  }
  return ans;
}