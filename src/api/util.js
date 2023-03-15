export function deepClone(target) {
  // 定义一个变量
  let result
  // 如果当前需要深拷贝的是一个对象的话
  if (typeof target === 'object') {
    // 如果是一个数组的话
    if (Array.isArray(target)) {
      result = [] // 将result赋值为一个数组，并且执行遍历
      for (let i in target) {
        // 递归克隆数组中的每一项
        result.push(deepClone(target[i]))
      }
      // 判断如果当前的值是null的话；直接赋值为null
    } else if (target === null) {
      result = null
      // 判断如果当前的值是一个RegExp对象的话，直接赋值    
    } else if (target.constructor === RegExp) {
      result = target
    } else {
      // 否则是普通对象，直接for in循环，递归赋值对象的所有值
      result = {}
      for (let i in target) {
        result[i] = deepClone(target[i]);
      }
    }
    // 如果不是对象的话，就是基本数据类型，那么直接赋值
  } else {
    result = target
  }
  // 返回最终结果
  return result
}

const filter = {
  formatDate: function(value,args) {
      var dt = new Date(value);
      if(args == 'yyyy-M-d') {// yyyy-M-d
          let year = dt.getFullYear();
          let month = dt.getMonth() + 1;
          let date = dt.getDate();
          return `${year}-${month}-${date}`;
      } else if(args == 'yyyy-M-d H:m:s'){// yyyy-M-d H:m:s
          let year = dt.getFullYear();
          let month = dt.getMonth() + 1;
          let date = dt.getDate();
          let hour = dt.getHours();
          let minute = dt.getMinutes();
          let second = dt.getSeconds();
          return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
      } else if(args == 'yyyy-MM-dd') {// yyyy-MM-dd
          let year = dt.getFullYear();
          let month = (dt.getMonth() + 1).toString().padStart(2,'0');
          let date = dt.getDate().toString().padStart(2,'0');
          return `${year}-${month}-${date}`;
      } else {// yyyy-MM-dd HH:mm:ss
          let year = dt.getFullYear();
          let month = (dt.getMonth() + 1).toString().padStart(2,'0');
          let date = dt.getDate().toString().padStart(2,'0');
          let hour = dt.getHours().toString().padStart(2,'0');
          let minute = dt.getMinutes().toString().padStart(2,'0');
          let second = dt.getSeconds().toString().padStart(2,'0');
          return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
      }
  }
}
export default filter;
