export default (data) => {
  return data.map((item) => {
    const temp1 = item.pinyin.replace(/\d/g, '');
    const temp2 = item.pinyin.split(' ').map((x) => x[0]);
    return {
      ...item,
      pinyin1: temp1.replace(/\s/g, ''),
      pinyin2: temp1.replace(/\s/g, "'"),
      pinyin3: temp2.join(''),
      pinyin4: temp2.join("'"),
    };
  });
};
